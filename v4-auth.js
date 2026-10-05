/* ---- V4 Google 登入（移植自 V3，獨立運作） ----
   V4 部署於 GitHub Pages，一律使用彈出視窗登入（signInWithPopup）。
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

  /* ---- 內建瀏覽器偵測（2026-10-05） ----
     LINE / Facebook / Instagram 等 App 內建瀏覽器會隔離儲存空間，
     Firebase 彈出視窗登入在裡面跑不起來（會卡死在 missing initial state 錯誤頁）。
     偵測到就攔截登入，顯示引導頁請用戶轉到 Safari / Chrome。 */
  function detectInAppBrowser() {
    var ua = navigator.userAgent || '';
    if (/Line\//i.test(ua)) return 'LINE';
    if (/FBAN\/|FBAV\//i.test(ua)) return 'Facebook';
    if (/Instagram/i.test(ua)) return 'Instagram';
    if (/MicroMessenger/i.test(ua)) return 'WeChat';
    return null;
  }

  function showWebviewGuide(appName) {
    var old = $('v4WebviewGuide');
    if (old) old.remove();
    var siteUrl = location.origin + location.pathname;
    var overlay = document.createElement('div');
    overlay.id = 'v4WebviewGuide';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.55);' +
      'display:flex;align-items:center;justify-content:center;padding:24px;';
    var card = document.createElement('div');
    card.style.cssText = 'background:#fffdf8;border-radius:16px;max-width:420px;width:100%;' +
      'padding:24px;color:#2b2620;font-size:.95rem;line-height:1.7;';
    card.innerHTML =
      '<h3 style="margin:0 0 10px;font-size:1.1rem;">請用 Safari / Chrome 開啟再登入</h3>' +
      '<p style="margin:0 0 10px;">您正在「' + appName + '」的內建瀏覽器中，Google 登入在這裡無法使用，這是 App 本身的限制，不是網站故障。</p>' +
      '<p style="margin:0 0 6px;font-weight:700;">請這樣做：</p>' +
      '<ol style="margin:0 0 12px;padding-left:22px;">' +
      '<li>先複製本站網址（按下面按鈕）</li>' +
      '<li>iPhone 打開 Safari，Android 手機打開 Chrome</li>' +
      '<li>在網址列貼上網址，開啟網站後再登入</li>' +
      '</ol>' +
      '<p style="margin:0 0 12px;word-break:break-all;font-size:.82rem;color:#8a7f6a;">' + siteUrl + '</p>';
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = '複製網站網址';
    copyBtn.style.cssText = 'font:inherit;cursor:pointer;border-radius:10px;border:1px solid #d8cdb4;' +
      'background:#fff;color:#2b2620;padding:10px 20px;width:100%;margin-bottom:8px;';
    var copyMsg = document.createElement('div');
    copyMsg.style.cssText = 'font-size:.85rem;color:#2e7d32;min-height:1.4em;margin-bottom:8px;text-align:center;';
    copyBtn.addEventListener('click', function () {
      function done(ok) {
        copyMsg.textContent = ok ? '已複製！去 Safari／Chrome 貼上開啟吧。' : '複製失敗，請長按上方網址手動複製。';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(siteUrl).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = siteUrl;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        try { done(document.execCommand('copy')); } catch (e) { done(false); }
        ta.remove();
      }
    });
    card.appendChild(copyBtn);
    card.appendChild(copyMsg);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '我知道了';
    btn.style.cssText = 'font:inherit;cursor:pointer;border-radius:10px;border:1px solid #d8cdb4;' +
      'background:#2b2620;color:#fff;padding:10px 20px;width:100%;';
    btn.addEventListener('click', function () { overlay.remove(); });
    card.appendChild(btn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
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
      var inApp = detectInAppBrowser();
      if (inApp) { showWebviewGuide(inApp); return; }
      signInButton.disabled = true;
      setAuthMessage('正在開啟 Google 登入…');
      auth.signInWithPopup(provider).catch(function (error) {
        var code = (error && error.code) || '';
        if (code === 'auth/popup-blocked') {
          setAuthMessage('彈出視窗被阻擋，請允許本網站的彈出視窗後再試一次。', true);
        } else if (code === 'auth/popup-closed-by-user') {
          setAuthMessage('已關閉 Google 登入視窗。');
        } else if (code === 'auth/cancelled-popup-request') {
          setAuthMessage('登入被中斷，請再按一次登入。');
        } else if (code === 'auth/unauthorized-domain') {
          setAuthMessage('此網域尚未在 Firebase 授權，請聯繫管理員。', true);
        } else if (code === 'auth/operation-not-supported-in-this-environment') {
          setAuthMessage('請用 Safari 或 Chrome 直接開啟本網站再登入。', true);
        } else {
          setAuthMessage('Google 登入失敗：' + ((error && error.message) || code), true);
        }
      }).finally(function () {
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

