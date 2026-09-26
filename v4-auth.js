/* ---- V4 Google 登入（移植自 V3，獨立運作） ----
   【暫時模式】為配合自動化匯入，暫用整頁跳轉登入（signInWithRedirect），
   匯入完成後改回彈出視窗（signInWithPopup）。
   Firebase app 由此檔初始化（window.V4_FIREBASE_CONFIG），app.js 沿用。
   登入狀態發布到 window.V4_AUTH，並觸發 v4-auth-changed 事件。 */
(function () {
  'use strict';

  window.V4_FIREBASE_CONFIG = {
    apiKey: 'AIzaSyChpInXumwIWaOrR4cU8KhNm1NK5-RdgQw',
    authDomain: 'my-chinese-sentence-bank-v3.firebaseapp.com',
    projectId: 'my-chinese-sentence-bank-v3',
    storageBucket: 'my-chinese-sentence-bank-v3.firebasestorage.app',
    messagingSenderId: '178850974896',
    appId: '1:178850974896:web:f1d40b2ed4e7218b553f75'
  };
  /* 管理員（與 V3 相同）。後台審核頁只認這個 Google 帳號。 */
  window.V4_ADMIN_EMAIL = 'f216002@gmail.com';

  function $(id) { return document.getElementById(id); }

  var auth = null;
  try {
    if (!window.firebase) throw new Error('Firebase SDK 載入失敗。');
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(window.V4_FIREBASE_CONFIG);
    }
    auth = window.firebase.auth();
  } catch (err) {
    var msg = $('v4AuthMessage');
    if (msg) msg.textContent = '登入功能暫時無法使用，請重新整理頁面。';
    window.V4_AUTH = Object.freeze({ ready: false, user: null });
    return;
  }
  window.V4_AUTH_INSTANCE = auth;

  var provider = new window.firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  var signInButton = $('v4GoogleSignIn');
  var signOutButton = $('v4GoogleSignOut');
  var accountPanel = $('v4TeacherAccount');
  var accountPhoto = $('v4AccountPhoto');
  var accountName = $('v4AccountName');
  var accountEmail = $('v4AccountEmail');
  var authMessage = $('v4AuthMessage');
  var adminButton = $('v4AdminButton');

  function setAuthMessage(message, isError) {
    if (!authMessage) return;
    authMessage.textContent = message || '';
    authMessage.classList.toggle('error', !!isError);
  }

  function isAdminEmail(email) {
    return String(email || '').toLowerCase() === String(window.V4_ADMIN_EMAIL).toLowerCase();
  }

  function publishAuthState(user) {
    window.V4_AUTH = Object.freeze({
      ready: true,
      user: user ? Object.freeze({
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      }) : null
    });
    window.dispatchEvent(new CustomEvent('v4-auth-changed', { detail: window.V4_AUTH }));
  }

  function showSignedOut() {
    if (signInButton) { signInButton.hidden = false; signInButton.disabled = false; }
    if (signOutButton) signOutButton.hidden = true;
    if (accountPanel) accountPanel.hidden = true;
    if (adminButton) adminButton.hidden = true;
    if (accountPhoto) accountPhoto.removeAttribute('src');
    if (accountName) accountName.textContent = '';
    if (accountEmail) accountEmail.textContent = '';
    setAuthMessage('');
  }

  function showSignedIn(user) {
    if (signInButton) signInButton.hidden = true;
    if (signOutButton) { signOutButton.hidden = false; signOutButton.disabled = false; }
    if (accountPanel) accountPanel.hidden = false;
    if (adminButton) adminButton.hidden = !isAdminEmail(user.email);
    if (accountName) accountName.textContent = user.displayName || '老師';
    if (accountEmail) accountEmail.textContent = user.email || '';
    if (accountPhoto) {
      if (user.photoURL) { accountPhoto.src = user.photoURL; accountPhoto.alt = ''; }
      else { accountPhoto.removeAttribute('src'); }
    }
    setAuthMessage('');
  }

  if (signInButton) {
    signInButton.addEventListener('click', function () {
      signInButton.disabled = true;
      setAuthMessage('正在前往 Google 登入…');
      /* 【暫時模式】整頁跳轉登入，同一分頁完成。 */
      auth.signInWithRedirect(provider).catch(function (error) {
        var code = (error && error.code) || '';
        if (code === 'auth/unauthorized-domain') {
          setAuthMessage('此網域尚未在 Firebase 授權，請聯繫管理員。', true);
        } else if (code === 'auth/operation-not-supported-in-this-environment') {
          setAuthMessage('請用 Safari 或 Chrome 直接開啟本網站再登入。', true);
        } else {
          setAuthMessage('Google 登入失敗：' + ((error && error.message) || code), true);
        }
        if (!auth.currentUser) signInButton.disabled = false;
      });
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener('click', function () {
      signOutButton.disabled = true;
      auth.signOut().catch(function (error) {
        setAuthMessage('登出失敗：' + ((error && error.message) || error.code), true);
      }).finally(function () { signOutButton.disabled = false; });
    });
  }

  window.V4_AUTH = Object.freeze({ ready: false, user: null });
  /* 【暫時模式】用 LOCAL persistence，讓跳轉登入的中間狀態在跨站跳轉後仍保留。 */
  auth.setPersistence(window.firebase.auth.Auth.Persistence.LOCAL).catch(function () {});
  /* 【暫時模式】處理跳轉登入返回的結果；onAuthStateChanged 會接著發布登入狀態。 */
  auth.getRedirectResult().catch(function (error) {
    var code = (error && error.code) || '';
    setAuthMessage('Google 登入失敗：' + ((error && error.message) || code), true);
    if (signInButton) signInButton.disabled = false;
  });
  auth.onAuthStateChanged(function (user) {
    if (user && user.isAnonymous) {
      /* 舊版的匿名登入已退役：清掉殘留的匿名 session，回到未登入狀態。 */
      auth.signOut();
      return;
    }
    if (user) showSignedIn(user); else showSignedOut();
    publishAuthState(user);
  });
})();

