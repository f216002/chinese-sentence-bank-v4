/**
 * bankVersion 統一更新工具（2026-10-03）
 *
 * 用途：任何寫入 v4_sentences 的匯入腳本，完成後必須用本工具更新 bankVersion，
 * 否則各老師瀏覽器的本機快取不會失效、看不到新內容。
 *
 * 防護：更新前檢查 24 小時內的 bump 次數；若已有 ≥3 次，直接拒絕執行並大聲警告
 * （可能是腳本失控或重複執行）。這是費用防護的第一道關卡。
 *
 * 用法：
 *   node bump_bankversion.js --version 20261003-xyz --reason "第一冊新增泰文翻譯"
 *
 * 認證：同目錄需有 service-account.json（Firebase Admin SDK）。
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const MAX_BUMPS_PER_24H = 3;
const HISTORY_KEEP = 20;

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i += 2) {
    const k = args[i].replace(/^--/, '');
    out[k] = args[i + 1];
  }
  return out;
}

async function main() {
  const { version, reason } = parseArgs();
  if (!version) {
    console.error('用法：node bump_bankversion.js --version <新版本號> --reason "<原因>"');
    process.exit(2);
  }

  const serviceAccountPath = path.join(__dirname, 'service-account.json');
  if (!fs.existsSync(serviceAccountPath)) {
    console.error('找不到 service-account.json，請先下載並放置於 tools/ 目錄');
    process.exit(1);
  }
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({ credential: admin.cert(serviceAccount), projectId: 'my-chinese-sentence-bank-v3' });
  const db = getFirestore();
  const settingsRef = db.collection('v4_meta').doc('settings');

  const snap = await settingsRef.get();
  const data = snap.exists ? snap.data() : {};
  const oldVersion = data.bankVersion || null;
  const history = Array.isArray(data.bankVersionHistory) ? data.bankVersionHistory : [];

  /* ---- 防護：24 小時內已 bump 太多次就拒絕 ---- */
  const now = Date.now();
  const recent = history.filter(h => (now - (h.at || 0)) < 24 * 3600 * 1000);
  if (recent.length >= MAX_BUMPS_PER_24H) {
    console.error('');
    console.error('⛔⛔⛔ bankVersion 更新被拒絕：24 小時內已有 ' + recent.length + ' 次更新！');
    console.error('這可能是腳本失控重複執行。請檢查原因後再手動處理，不要強行繞過。');
    console.error('最近更新記錄：');
    recent.forEach(h => console.error('  - ' + new Date(h.at).toLocaleString() + '  ' + h.version + '  ' + (h.reason || '')));
    console.error('');
    process.exit(3);
  }

  if (oldVersion === version) {
    console.log('bankVersion 已經是 ' + version + '，無需更新。');
    process.exit(0);
  }

  const entry = { at: now, version, reason: reason || '', prev: oldVersion };
  const newHistory = [entry, ...history].slice(0, HISTORY_KEEP);

  await settingsRef.set(
    { bankVersion: version, bankVersionHistory: newHistory },
    { merge: true }
  );

  console.log('');
  console.log('✓ bankVersion 已更新：' + (oldVersion || '(無)') + ' → ' + version);
  console.log('  原因：' + (reason || '(未填)'));
  console.log('  24 小時內累計更新：' + (recent.length + 1) + ' 次');
  console.log('  各老師下次開頁會全量重讀一次（正常，內容已更新）。');
  console.log('');
}

main().catch(err => {
  console.error('執行失敗：', err && err.message ? err.message : err);
  process.exit(1);
});
