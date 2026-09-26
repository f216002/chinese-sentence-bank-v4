/* ---- V4 後台審核（移植自 V3，集合獨立） ----
   管理 v4_accessRequests（申請）與 v4_approvedTeachers（核准名單）。
   只有 f216002@gmail.com 能開啟此頁；其餘登入者會看到拒絕訊息。
   依賴：Firebase compat SDK ＋ v4-auth.js（先載入，已初始化 app）。 */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  var auth = null;
  var db = null;
  try {
    if (!window.firebase || !window.firebase.apps.length) throw new Error('Firebase 尚未初始化。');
    auth = window.firebase.auth();
    db = window.firebase.firestore();
  } catch (err) {
    var blocked = $('adminBlocked');
    if (blocked) { blocked.hidden = false; $('blockedMessage').textContent = 'Firebase 初始化失敗，請重新整理頁面。'; }
    return;
  }

  var FieldValue = window.firebase.firestore.FieldValue;
  var ADMIN_EMAIL = String(window.V4_ADMIN_EMAIL || 'f216002@gmail.com').toLowerCase();

  var els = {
    signIn: $('adminSignIn'),
    signOut: $('adminSignOut'),
    blocked: $('adminBlocked'),
    blockedMessage: $('blockedMessage'),
    app: $('adminApp'),
    account: $('adminAccount'),
    tabs: $('adminTabs'),
    requestsBody: $('requestsTableBody'),
    teachersBody: $('teachersTableBody'),
    requestsEmpty: $('requestsEmpty'),
    teachersEmpty: $('teachersEmpty'),
    requestCount: $('requestCount'),
    teacherCount: $('teacherCount'),
    rejectModal: $('rejectModal'),
    rejectNote: $('rejectNote'),
    rejectCancel: $('rejectCancel'),
    rejectConfirm: $('rejectConfirm'),
    toast: $('toast')
  };

  var activeTab = 'requests';
  var requestsUnsub = null;
  var teachersUnsub = null;
  var pendingRejectId = null;
  var teacherCache = new Map();

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fmtDate(ts) {
    if (!ts) return '—';
    try {
      var d = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
      return d.toLocaleString('zh-TW', { hour12: false });
    } catch (_) { return '—'; }
  }

  function showToast(message, isError) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.toggle('error', !!isError);
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { els.toast.hidden = true; }, 4000);
  }

  function isAdmin(user) {
    return !!user && String(user.email || '').toLowerCase() === ADMIN_EMAIL;
  }

  /* ---------- 申請列表 ---------- */

  function statusBadge(status) {
    var map = { pending: ['待審核', 'pending'], approved: ['已核准', 'approved'], rejected: ['已拒絕', 'rejected'] };
    var entry = map[status] || [status || '—', ''];
    return '<span class="status-badge ' + entry[1] + '">' + escapeHtml(entry[0]) + '</span>';
  }

  function renderRequests(snapshot) {
    var rows = [];
    snapshot.forEach(function (docSnap) {
      var data = docSnap.data() || {};
      var id = docSnap.id;
      rows.push(
        '<tr>' +
        '<td><div class="cell-main">' + escapeHtml(data.displayName || '未具名') + '</div>' +
        '<div class="cell-sub">' + escapeHtml(data.email || '') + '</div></td>' +
        '<td class="mono">' + escapeHtml(id) + '</td>' +
        '<td>' + fmtDate(data.requestedAt) + '</td>' +
        '<td>' + statusBadge(data.status) + '</td>' +
        '<td class="actions">' +
        (data.status === 'pending'
          ? '<button type="button" data-approve="' + escapeHtml(id) + '">核准</button>' +
            '<button type="button" class="danger" data-reject="' + escapeHtml(id) + '">拒絕</button>'
          : '') +
        '<button type="button" class="ghost" data-delete-request="' + escapeHtml(id) + '">刪除</button>' +
        '</td></tr>'
      );
    });
    els.requestsBody.innerHTML = rows.join('');
    els.requestsEmpty.hidden = rows.length > 0;
    els.requestCount.textContent = rows.length + ' 筆';
  }

  /* ---------- 教師列表 ---------- */

  function teacherStatusBadge(data) {
    if (data.active) return '<span class="status-badge approved">使用中</span>';
    var label = data.status === 'rejected' ? '已拒絕' : '已暫停';
    return '<span class="status-badge ' + (data.status === 'rejected' ? 'rejected' : 'suspended') + '">' + label + '</span>';
  }

  function renderTeachers(snapshot) {
    teacherCache.clear();
    var rows = [];
    snapshot.forEach(function (docSnap) {
      var data = docSnap.data() || {};
      var id = docSnap.id;
      teacherCache.set(id, data);
      rows.push(
        '<tr>' +
        '<td><div class="cell-main">' + escapeHtml(data.displayName || '未具名') + '</div>' +
        '<div class="cell-sub">' + escapeHtml(data.email || '') + '</div></td>' +
        '<td class="mono">' + escapeHtml(id) + '</td>' +
        '<td>' + fmtDate(data.approvedAt) + '</td>' +
        '<td>' + teacherStatusBadge(data) + '</td>' +
        '<td class="actions">' +
        (data.active
          ? '<button type="button" class="warn" data-suspend="' + escapeHtml(id) + '">暫停</button>'
          : '<button type="button" data-restore="' + escapeHtml(id) + '">恢復</button>') +
        '<button type="button" class="danger" data-delete-teacher="' + escapeHtml(id) + '">刪除</button>' +
        '</td></tr>'
      );
    });
    els.teachersBody.innerHTML = rows.join('');
    els.teachersEmpty.hidden = rows.length > 0;
    els.teacherCount.textContent = rows.length + ' 位';
  }

  /* ---------- 操作 ---------- */

  async function approveRequest(id) {
    var reqRef = db.collection('v4_accessRequests').doc(id);
    var snap = await reqRef.get();
    if (!snap.exists) { showToast('找不到這筆申請。', true); return; }
    var data = snap.data() || {};
    if (data.status !== 'pending') { showToast('這筆申請已經處理過了。', true); return; }
    var teacherRef = db.collection('v4_approvedTeachers').doc(id);
    var teacherSnap = await teacherRef.get();
    if (teacherSnap.exists && (teacherSnap.data() || {}).active === true) {
      showToast('這位老師已經在核准名單中。', true);
      return;
    }
    var now = FieldValue.serverTimestamp();
    await teacherRef.set({
      uid: data.uid || id,
      email: data.email || '',
      displayName: data.displayName || '',
      photoURL: data.photoURL || '',
      active: true,
      status: 'approved',
      approvedAt: now,
      updatedAt: now
    });
    await reqRef.update({ status: 'approved', updatedAt: now });
    showToast('已核准 ' + (data.displayName || data.email || id) + '。');
  }

  async function setRequestStatus(id, status, note) {
    var update = { status: status, updatedAt: FieldValue.serverTimestamp() };
    if (note != null) update.adminNote = note;
    await db.collection('v4_accessRequests').doc(id).update(update);
    if (status === 'rejected') {
      var teacherRef = db.collection('v4_approvedTeachers').doc(id);
      var teacherSnap = await teacherRef.get();
      if (teacherSnap.exists) {
        await teacherRef.update({ active: false, status: 'rejected', updatedAt: FieldValue.serverTimestamp() });
      }
    }
  }

  async function deleteRequest(id) {
    if (!window.confirm('確定刪除這筆申請？此動作無法復原。')) return;
    await db.collection('v4_accessRequests').doc(id).delete();
    showToast('已刪除申請。');
  }

  async function setTeacherStatus(id, active) {
    var data = teacherCache.get(id) || {};
    await db.collection('v4_approvedTeachers').doc(id).update({
      active: active,
      status: active ? 'approved' : 'suspended',
      updatedAt: FieldValue.serverTimestamp()
    });
    showToast(active ? '已恢復 ' + (data.displayName || id) + ' 的使用權。' : '已暫停 ' + (data.displayName || id) + ' 的使用權。');
  }

  async function deleteTeacher(id) {
    var data = teacherCache.get(id) || {};
    var label = data.displayName || data.email || id;
    if (!window.confirm('確定從核准名單刪除「' + label + '」？對方將立即失去老師權限。此動作無法復原。')) return;
    await db.collection('v4_approvedTeachers').doc(id).delete();
    showToast('已刪除 ' + label + '。');
  }

  function openRejectModal(id) {
    pendingRejectId = id;
    els.rejectNote.value = '';
    els.rejectModal.hidden = false;
    setTimeout(function () { els.rejectNote.focus(); }, 50);
  }

  function closeRejectModal() {
    pendingRejectId = null;
    els.rejectModal.hidden = true;
  }

  /* ---------- 事件 ---------- */

  function bindAction(el, attr, handler) {
    el.addEventListener('click', function (event) {
      var target = event.target.closest('[' + attr + ']');
      if (!target) return;
      var id = target.getAttribute(attr);
      handler(id).catch(function (error) {
        console.error('Admin action failed:', error);
        showToast('操作失敗：' + ((error && error.message) || '未知錯誤'), true);
      });
    });
  }

  function initAdmin() {
    bindAction(els.requestsBody, 'data-approve', approveRequest);
    bindAction(els.requestsBody, 'data-reject', function (id) { openRejectModal(id); return Promise.resolve(); });
    bindAction(els.requestsBody, 'data-delete-request', deleteRequest);
    bindAction(els.teachersBody, 'data-suspend', function (id) { return setTeacherStatus(id, false); });
    bindAction(els.teachersBody, 'data-restore', function (id) { return setTeacherStatus(id, true); });
    bindAction(els.teachersBody, 'data-delete-teacher', deleteTeacher);

    requestsUnsub = db.collection('v4_accessRequests').orderBy('requestedAt', 'desc')
      .onSnapshot(renderRequests, function (error) {
        console.error('Requests snapshot failed:', error);
        showToast('讀取申請列表失敗。', true);
      });
    teachersUnsub = db.collection('v4_approvedTeachers').orderBy('approvedAt', 'desc')
      .onSnapshot(renderTeachers, function (error) {
        console.error('Teachers snapshot failed:', error);
        showToast('讀取教師列表失敗。', true);
      });
  }

  function showTab(name) {
    activeTab = name;
    var buttons = els.tabs.querySelectorAll('button');
    buttons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === name);
    });
    $('tabRequests').hidden = name !== 'requests';
    $('tabTeachers').hidden = name !== 'teachers';
  }

  /* ---------- 啟動 ---------- */

  if (els.tabs) {
    els.tabs.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-tab]');
      if (btn) showTab(btn.getAttribute('data-tab'));
    });
  }
  if (els.rejectCancel) els.rejectCancel.addEventListener('click', closeRejectModal);
  if (els.rejectModal) {
    els.rejectModal.addEventListener('click', function (event) {
      if (event.target === els.rejectModal) closeRejectModal();
    });
  }
  if (els.rejectConfirm) {
    els.rejectConfirm.addEventListener('click', function () {
      var id = pendingRejectId;
      var note = els.rejectNote.value.trim();
      if (!id) { closeRejectModal(); return; }
      setRequestStatus(id, 'rejected', note).then(function () {
        closeRejectModal();
        showToast('已拒絕申請。');
      }).catch(function (error) {
        console.error('Reject failed:', error);
        showToast('拒絕失敗：' + ((error && error.message) || '未知錯誤'), true);
      });
    });
  }

  var provider = new window.firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  if (els.signIn) {
    els.signIn.addEventListener('click', function () {
      auth.signInWithPopup(provider).catch(function (error) {
        showToast('登入失敗：' + ((error && error.message) || error.code), true);
      });
    });
  }
  if (els.signOut) {
    els.signOut.addEventListener('click', function () {
      auth.signOut().catch(function (error) {
        showToast('登出失敗：' + ((error && error.message) || error.code), true);
      });
    });
  }

  auth.onAuthStateChanged(function (user) {
    if (isAdmin(user)) {
      els.blocked.hidden = true;
      els.app.hidden = false;
      if (els.account) els.account.textContent = '管理員：' + (user.email || '');
      if (!requestsUnsub) initAdmin();
      showTab(activeTab);
    } else {
      if (requestsUnsub) { requestsUnsub(); requestsUnsub = null; }
      if (teachersUnsub) { teachersUnsub(); teachersUnsub = null; }
      els.app.hidden = true;
      els.blocked.hidden = false;
      if (els.blockedMessage) {
        els.blockedMessage.textContent = user
          ? '此 Google 帳號（' + (user.email || '未知') + '）不是管理員，無法使用後台。'
          : '請先用管理員 Google 帳號登入。';
      }
    }
  });
})();
