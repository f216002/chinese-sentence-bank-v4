/* ---- Firebase backend (V4 independent site) ----
   Project: my-chinese-sentence-bank-v3 (same project, isolated data).
   V4 data lives under v4_-prefixed collections/paths so it never
   collides with v2 or v3 data. Reads are public; writes need an approved
   teacher (Google sign-in + admin approval). The Firebase app is
   initialized by v4-auth.js (window.V4_FIREBASE_CONFIG); reused here. */
/* One-time migration still talks to the retired Apps Script backend. */
const OLD_API_URL = 'https://script.google.com/macros/s/AKfycbw9trkW9RNCRSwWou_51Q-FP6aL7Lp8sy3zizSG83fzN1Urtd3ZiMc47RUfHDBTIMJfDw/exec';
const SENTENCES_COL = 'v4_sentences';
const META_COL = 'v4_meta';
const SETTINGS_DOC = 'settings';
const AUDIO_PREFIX = 'v4_audio/';

/* ---- Per-teacher data isolation（2026-09-26） ----
   v4_sentences：共版課程（第一～六冊），所有人可讀；寫入只有管理員能做，
     且僅限內容包／翻譯包匯入。日常的編輯／刪除／錄音，連管理員也只寫個人覆寫層。
   v4_teachers/{uid}/sentences：每位老師的個人句庫＋他自己加的「補充」，只有本人（與管理員）能讀寫。
   v4_teachers/{uid}/overrides：任何人（含管理員）對共版課程的個人覆寫（編輯／刪除／錄音），
     doc ID＝共版文件 ID，{deleted:true} 表示該老師自己隱藏此句，其他欄位表示覆寫內容。
     只影響該老師自己的畫面。 */
const TEACHER_COL = 'v4_teachers';
const TEACHER_SENTENCES_SUB = 'sentences';
const TEACHER_OVERRIDES_SUB = 'overrides';

function currentTeacherUid() {
  const a = window.V4_ACCESS;
  return (a && a.user && a.user.uid) || '';
}
function isV4AdminUser() {
  return !!(window.V4_ACCESS && window.V4_ACCESS.isAdmin);
}
function teacherSentencesRef(uid) {
  return fbDb.collection(TEACHER_COL).doc(uid).collection(TEACHER_SENTENCES_SUB);
}
function teacherOverridesRef(uid) {
  return fbDb.collection(TEACHER_COL).doc(uid).collection(TEACHER_OVERRIDES_SUB);
}
/* 內容包／翻譯包匯入：只有管理員能寫共版課程。 */
function requireAdminAccess() {
  const me = requireApprovedAccess();
  if (!isV4AdminUser()) throw new Error('只有管理員可以執行此操作。');
  return me;
}
/* 補充記錄：有 seq 且 tags 含「補充」。 */
function isSupplementData(d) {
  return !!d && d.seq != null && /補充/.test(String(d.tags || ''));
}
/* 個人錄音路徑：v4_audio/{uid}/{recordId}.{ext} */
function teacherAudioPath(uid, recordId, ext) {
  return `${AUDIO_PREFIX}${uid}/${recordId}.${ext}`;
}

let fbDb = null, fbAuth = null, fbStorage = null, fbFieldValue = null;
let firebaseInitError = '';
try {
  if (!window.firebase) throw new Error('Firebase SDK failed to load.');
  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(window.V4_FIREBASE_CONFIG || {});
  }
  fbDb = window.firebase.firestore();
  fbAuth = window.firebase.auth();
  fbStorage = window.firebase.storage();
  fbFieldValue = window.firebase.firestore.FieldValue;
} catch (err) {
  firebaseInitError = (err && err.message) || String(err);
}

/* 寫入前檢查：必須是已核准的老師（Google 登入＋管理員核准）。
   未通過時丟出中文錯誤，由各呼叫端顯示在對話框訊息區。 */
function requireApprovedAccess() {
  if (firebaseInitError) throw new Error(firebaseInitError);
  if (window.v4RequireApproved) return window.v4RequireApproved();
  throw new Error('登入功能尚未就緒，請重新整理頁面。');
}

const serverTimestamp = () => fbFieldValue.serverTimestamp();

/* Firestore document -> sentence object used by the UI.
   recordId is the Firestore document id (old Sheet Record IDs are kept as
   document ids during migration, so existing links keep working).
   _owner: 'shared' = 共版課程；uid 字串 = 該老師個人命名空間的文件。 */
function docToSentence(id, d, owner) {
  d = d || {};
  const audioPath = d.audioPath || '';
  return {
    _owner: owner || 'shared',
    recordId: id,
    sourceLanguage: d.sourceLanguage || 'hi',
    hindiSentence: d.hindiSentence || '',
    chineseSentence: d.chineseSentence || '',
    pinyin: d.pinyin || '',
    romanHindi: d.romanHindi || '',
    hindiExplanation: d.hindiExplanation || '',
    category: d.category || 'Other',
    tags: d.tags || '',
    aiSource: d.aiSource || '',
    originalPaste: d.originalPaste || '',
    favorite: !!d.favorite,
    i18n: (d.i18n && typeof d.i18n === 'object') ? d.i18n : {},
    audioPath,
    audioMime: d.audioMime || '',
    standardAudioUrl: audioPath, /* truthy marker: existing UI checks keep working */
    createdAt: d.createdAt || null,
    updatedAt: d.updatedAt || null,
    seq: (d.seq == null ? null : d.seq),
  };
}

/* UI fields -> Firestore document data for a new sentence. */
function sentenceDocData(fields) {
  return {
    sourceLanguage: fields.sourceLanguage || 'hi',
    hindiSentence: fields.hindiSentence || '',
    chineseSentence: fields.chineseSentence || '',
    pinyin: fields.pinyin || '',
    romanHindi: fields.romanHindi || '',
    hindiExplanation: fields.hindiExplanation || '',
    category: fields.category || 'Other',
    tags: fields.tags || '',
    aiSource: fields.aiSource || '',
    originalPaste: fields.originalPaste || '',
    favorite: false,
    audioPath: '',
    audioMime: '',
    /* 課程內容包順序號：課號 × 100000 ＋ 包內序號；非課程記錄為 null。 */
    seq: (fields.seq == null ? null : fields.seq),
    /* 個人命名空間文件的擁有人 uid；共版課程為空字串。 */
    ownerUid: fields.ownerUid || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

/* 課程記錄按內容包順序號排列（課號×100000＋包內序號）；個人句庫（無序號者）按建立時間倒序排列，最新在最上方。 */
function sortSentencesBySeq(list) {
  list.sort((a, b) => {
    const aIsCourse = (a.seq != null);
    const bIsCourse = (b.seq != null);
    if (aIsCourse && bIsCourse) return a.seq - b.seq;
    if (aIsCourse) return -1;
    if (bIsCourse) return 1;
    /* 個人句子：最新在上。優先用 createdAt，其次用 recordId（內含日期，字典序即時間序）。 */
    const aTime = (a.createdAt && typeof a.createdAt.toMillis === 'function') ? a.createdAt.toMillis() : 0;
    const bTime = (b.createdAt && typeof b.createdAt.toMillis === 'function') ? b.createdAt.toMillis() : 0;
    if (aTime !== bTime) return bTime - aTime;
    return String(b.recordId || '').localeCompare(String(a.recordId || ''));
  });
  return list;
}

/* 覆寫層 doc 不參與合併的鍵。 */
const OVERLAY_SKIP_KEYS = { deleted: 1, updatedAt: 1, ownerUid: 1 };
function applyOverlay(sentence, overlay) {
  if (!overlay) return sentence;
  Object.keys(overlay).forEach(k => {
    if (!OVERLAY_SKIP_KEYS[k]) sentence[k] = overlay[k];
  });
  sentence._hasOverlay = true;
  /* 衍生欄位重算：覆寫層若帶了老師自己的錄音（audioPath），必須同步到
     standardAudioUrl。播放鍵／下載鍵／錄音狀態判斷都只看 standardAudioUrl，
     而它在 docToSentence 時是從共版層算出來的；不重算的話，頁面重整後老師
     在共版卡片上的錄音就會失效（播放退回瀏覽器發音、下載鍵隱藏）。 */
  if (sentence.audioPath) {
    sentence.standardAudioUrl = sentence.audioPath;
  } else if (Object.prototype.hasOwnProperty.call(overlay, 'audioPath')) {
    sentence.standardAudioUrl = '';
  }
  return sentence;
}

/* 統一載入：共版課程（套用老師個人覆寫）＋老師個人命名空間（個人句庫＋補充）。
   未登入或無權限時只載入共版課程。 */
async function fetchAllSentences() {
  const uid = currentTeacherUid();
  const lang = state.sourceLanguage || 'hi';
  /* 共版句庫：優先用靜態 JSON（快）；失敗才退回 Firestore 全量讀取。 */
  let sharedSentences;
  try {
    sharedSentences = await loadSharedBank(lang);
  } catch (err) {
    console.warn('Static bank unavailable, falling back to Firestore:', (err && err.message) || err);
    const snap = await fbDb.collection(SENTENCES_COL).get();
    sharedSentences = [];
    snap.docs.forEach(d => {
      const data = d.data() || {};
      if (isSupplementData(data)) return;
      sharedSentences.push(docToSentence(d.id, data, 'shared'));
    });
  }
  let personalDocs = [];
  const overlayMap = new Map();
  if (uid) {
    try {
      const [psnap, osnap] = await Promise.all([
        teacherSentencesRef(uid).get(),
        teacherOverridesRef(uid).get(),
      ]);
      personalDocs = psnap.docs;
      osnap.docs.forEach(d => overlayMap.set(d.id, d.data() || {}));
    } catch (err) {
      /* 尚未核准或無權限：只顯示共版內容，不擋整頁。 */
      console.warn('Personal layer unavailable:', (err && err.message) || err);
    }
  }
  const list = [];
  const hiddenShared = [];
  /* 歌曲／禮節卡需讀取個人錄音覆寫：存入全域供 songLineToSentence 使用。 */
  state.overlayMap = overlayMap;
  sharedSentences.forEach(s => {
    const ov = overlayMap.get(s.recordId);
    if (ov && ov.deleted) { hiddenShared.push(s); return; } /* 該老師個人隱藏的共版句子 */
    list.push(applyOverlay(s, ov));
  });
  personalDocs.forEach(d => list.push(docToSentence(d.id, d.data(), uid)));
  state.hiddenShared = sortSentencesBySeq(hiddenShared);
  /* 老師各單元自訂卡片順序：一次讀取整個 cardOrder 子集合（只有拖曳過的單元才有文件）。 */
  try { state.unitOrders = uid ? await loadAllUnitOrders(uid) : {}; }
  catch (err) { console.warn('unitOrders unavailable:', (err && err.message) || err); state.unitOrders = {}; }
  return sortSentencesBySeq(list);
}

/* 全量讀取去重（2026-10-05）：iPhone 上 10,777 筆全量讀取很慢，
   登入時 refreshPersonalLayer 與 loadBank 可能同時觸發全量讀取，
   併發的兩份 10k 文件會把手機記憶體撐爆，Safari 報「重複發生問題」崩潰。
   用同一個 in-flight promise 去重，後來者等待進行中的讀取，不另起爐灶。
   （呼叫時機保證 UID 已確定：loadBank 先等 whenAccessReady，
   refreshPersonalLayer 由登入事件觸發，故併發者 UID 一致。） */
let fullLoadPromise = null;
function loadFullBank() {
  if (!fullLoadPromise) {
    fullLoadPromise = fetchAllSentences().finally(() => { fullLoadPromise = null; });
  }
  return fullLoadPromise;
}

/* ---- 靜態句庫 JSON（2026-10-05） ----
   共版 10,777 句預先匯出為 GitHub Pages 靜態檔，按老師母語分語言
   （v4-bank/v4-bank-{lang}.json，每種約 2-4MB gzip，手機幾秒下載完），
   取代 10k 次 Firestore 讀取（手機上要 2 分鐘＋貴＋易崩潰）。
   個人層（老師自己的句子／覆寫）仍走 Firestore（量小）。
   課程元數據（lesson/section 等）已在匯出時預解析，不用再帶 4MB 原文。 */
const VBANK_DIR = 'v4-bank/';
/* 六冊遷移 Storage（2026-10-09）：句庫本體改放 Firebase Storage；2026-10-10 鎖死：
   Storage 完全不公開，前端經 Cloud Function getBankFileUrl 驗證老師身份後拿下載票。
   manifest 留 GitHub Pages（只含檔名與版本，無實際句庫內容）。 */
/* ---- 第七冊《五百字說華語》中柬文版（2026-10-09） ----
   高棉文限定教材，不進公開 repo，放 Firebase Storage。
   Cheng 上傳後此 URL 生效；上傳路徑：v4-book7/v4-book7-km.json（公開讀取）。 */
/* BOOK7_URL 已退役（2026-10-10）：改走 getBankFileUrl 下載票，不再寫死 token。 */
const BOOK7_VERSION = '20261010-02'; /* 第七冊更新時同步 bump，觸發 km 快取失效 */
let vbankManifestCache = null;
const vbankBankCache = {}; /* lang -> processed sentences */
async function vbankManifest() {
  if (!vbankManifestCache) {
    const r = await fetch(VBANK_DIR + 'manifest.json', {cache: 'no-cache'});
    if (!r.ok) throw new Error('manifest ' + r.status);
    vbankManifestCache = await r.json();
  }
  return vbankManifestCache;
}
function vbankRowToSentence(fields, row, lang) {
  const o = {};
  for (let i = 0; i < fields.length; i++) o[fields[i]] = row[i];
  const hasTr = !!(o.i18n_s || o.i18n_r || o.i18n_e);
  return {
    _owner: 'shared',
    recordId: o.id,
    sourceLanguage: lang,
    vocabKind: o.vocabKind || '',
    hindiSentence: o.hindiSentence || '',
    chineseSentence: o.chineseSentence || '',
    pinyin: o.pinyin || '',
    romanHindi: o.romanHindi || '',
    hindiExplanation: o.hindiExplanation || '',
    category: o.category || 'Other',
    tags: o.tags || '',
    aiSource: '',
    originalPaste: '',
    favorite: false,
    i18n: hasTr ? { [lang]: {s: o.i18n_s || '', r: o.i18n_r || '', e: o.i18n_e || ''} } : {},
    audioPath: o.audioPath || '',
    audioMime: '',
    standardAudioUrl: o.audioPath || '',
    createdAt: null,
    updatedAt: null,
    seq: (o.seq == null ? null : o.seq),
    _meta: { lesson: String(o.lesson || ''), section: o.section || '', speaker: o.speaker || '', pos: o.pos || '', zhuyin: o.zhuyin || '' },
  };
}
/* 經 Storage SDK 取得檔案下載網址（2026-10-10，Storage 鎖死後專用）。
   規則要求 request.auth != null，未登入會拋錯，由呼叫方處理。 */
async function getBankFileUrl(path) {
  const ref = firebase.storage().ref(path);
  return await ref.getDownloadURL();
}
async function loadSharedBank(lang) {
  lang = lang || state.sourceLanguage || 'hi';
  if (vbankBankCache[lang]) return vbankBankCache[lang];
  const m = await vbankManifest();
  const file = (m.langs && m.langs[lang]) || (m.langs && m.langs.hi);
  if (!file) throw new Error('no bank file for ' + lang);
  const signedUrl = await getBankFileUrl('v4-bank/' + file);
  const r = await fetch(signedUrl);
  if (!r.ok) throw new Error('bank file ' + r.status);
  analyticsMarkBankDownload(lang); /* 使用統計：本次真的下載了句庫檔（流量估算用） */
  const j = await r.json();
  const sentences = j.rows.map(row => vbankRowToSentence(j.f, row, lang));
  /* 第七冊：高棉文模式時經下載票加載《五百字說華語》中柬文版（701–730）。 */
  if (lang === 'km') {
    try {
      const b7url = await getBankFileUrl('v4-book7/v4-book7-km.json');
      const b7r = await fetch(b7url, {cache: 'no-cache'});
      if (b7r.ok) {
        const b7 = await b7r.json();
        (b7.rows || []).forEach(row => sentences.push(vbankRowToSentence(b7.f, row, 'km')));
        analyticsMarkBankDownload('km-book7');
      }
    } catch (e) { console.warn('Book7 unavailable:', (e && e.message) || e); }
  }
  vbankBankCache[lang] = sentences;
  return sentences;
}

async function reloadSentences() {
  state.sentences = await loadFullBank();
  personalLayerUid = currentTeacherUid();
  $('sentenceCount').textContent = state.sentences.length;
  saveBankCache(state.bankVersion);
}

/* 目前已載入個人層的 uid（''＝未載入）。登入／登出／換帳號時重載。 */
let personalLayerUid = null;
/* 等待 v4-access 就緒（登入狀態確認完成），最多等 15 秒。 */
function whenAccessReady() {
  return new Promise(resolve => {
    const done = () => resolve(window.V4_ACCESS || {});
    const a = window.V4_ACCESS;
    if (a && a.ready) return done();
    const h = () => {
      const b = window.V4_ACCESS;
      if (b && b.ready) { window.removeEventListener('v4-access-changed', h); done(); }
    };
    window.addEventListener('v4-access-changed', h);
    setTimeout(() => { window.removeEventListener('v4-access-changed', h); done(); }, 15000);
  });
}
/* 登入狀態變化時重載個人層（只在 uid 變化時真正重載）。 */
async function refreshPersonalLayer() {
  const uid = currentTeacherUid();
  if (uid === personalLayerUid) return;
  try {
    await reloadSentences();
    renderSentences();
    renderCourse();
  } catch (err) {
    console.warn('refreshPersonalLayer failed:', (err && err.message) || err);
  }
}

/* 課程某課下一個順序號（手動新增補充句子用）。 */
function nextCourseSeq(lessonNum) {
  const base = Number(lessonNum) * 100000;
  let max = 0;
  lessonRecords(lessonNum).forEach(s => {
    if (s.seq != null && s.seq >= base && s.seq < base + 100000) max = Math.max(max, s.seq - base);
  });
  return base + max + 1;
}

function defaultSettings() {
  return {
    bankName: 'Bridge Language Academy',
    ownerName: '',
    defaultVoice: 'zh-TW',
    speechRate: 0.85,
    categories: 'Daily Life, School, Home, Restaurant, Shopping, Bank, Hospital, Travel, Train & Bus, Airport, Work, Friends, Other',
  };
}
const SAMPLE = `HINDI:\nमुझे बैंक से पैसे निकालने हैं।\n\nCHINESE:\n我要去銀行領錢。\n\nPINYIN:\nWǒ yào qù yínháng lǐng qián.\n\nROMAN:\nMujhe bank se paise nikaalne hain.\n\nEXPLANATION:\n我要 (wǒ yào) का अर्थ है “मैं ... करना चाहता/चाहती हूँ।”\n去 (qù) का अर्थ “जाना” है।\n銀行 (yínháng) का अर्थ “बैंक” है।\n領錢 (lǐng qián) का अर्थ बैंक से पैसे निकालना है।\n中文語序 (Zhōngwén yǔxù): 主語 (zhǔyǔ) + 要 (yào) + 去 (qù) + 地點 (dìdiǎn) + 動作 (dòngzuò)。\n\nCATEGORY:\nBank`;
const AI_PROMPT = `You are a Taiwanese Mandarin teacher for a Hindi-speaking beginner. Convert the Hindi sentence below into natural Traditional Chinese used in Taiwan.\n\nHINDI SENTENCE:\n[Paste one Hindi sentence here]\n\nReturn ONLY the following labelled sections. Do not add an introduction or conclusion. Never insert notes, corrections, or commentary inside a section; each section must contain only what that section asks for. Keep every label exactly as written and do not add Markdown symbols such as ** around the labels.\n\nHINDI:\n[Repeat the original Hindi sentence]\n\nCHINESE:\n[One natural Traditional Chinese sentence used in Taiwan]\n\nPINYIN:\n[Hanyu Pinyin with tone marks for the complete Chinese sentence]\n\nEXPLANATION:\n[Explain every Chinese word and the grammar in clear Hindi. Whenever any Chinese character, word, phrase, or example appears, immediately add its pinyin in parentheses. Use Traditional Chinese only.]\n\nCATEGORY:\n[Choose exactly one: Daily Life, School, Home, Restaurant, Shopping, Bank, Hospital, Travel, Train & Bus, Airport, Work, Friends, Other]\n\nTAGS:\n[Three to five short English keywords separated by commas]\n\nAI SOURCE:\n[Write ChatGPT or Gemini]`;


const state = { sentences: [], hiddenShared: [], categories: [], selectedCategories: new Set(), settings: {}, preview: null, sourceLanguage: 'hi', bankVersion: null, unitOrders: {},
  bookSet: (() => { try { return localStorage.getItem('v4_bookset') || 'tw'; } catch(e) { return 'tw'; } })() };
const $ = (id) => document.getElementById(id);
/* Bilingual UI helper: Chinese (primary) + English (secondary, smaller). */
/* 中文為主的雙語無障礙標籤，例如：播放德文發音 (Play German pronunciation) */
function bilingualLabel(zh, en) { return en ? `${zh} (${en})` : zh; }

function setBilingualText(el, zh, en) {
  if (!el) return;
  el.innerHTML = '';
  el.appendChild(document.createTextNode(zhConvert(zh)));
  if (en) {
    const sub = document.createElement('span');
    sub.className = 'en-sub';
    sub.textContent = en;
    el.appendChild(document.createTextNode(' '));
    el.appendChild(sub);
  }
}
const sentenceModelAudio = new Audio();
const teacherAudioCache = new Map();
const cardRecordings = new Map();
let activeCardRecorder = null;
let activeCardStream = null;
let activeCardButton = null;
let pendingDeleteSentence = null;
let pendingEditSentence = null;

/* Multilingual paste parser (ported from V3). Accepts the language-neutral
   SOURCE / ROMANIZATION labels plus every legacy per-language label, so old
   Hindi pastes keep working. Horizontal whitespace only around labels: an
   empty ROMANIZATION section must not swallow the next line's label. */
function parsePaste(text) {
  const labels = ['SOURCE', 'HINDI', 'TAMIL', 'THAI', 'KHMER', 'VIETNAMESE', 'INDONESIAN', 'NEPALI', 'BENGALI', 'BANGLA', 'SPANISH', 'ENGLISH', 'CHINESE', 'PINYIN', 'ROMANIZATION', 'ROMAN', 'EXPLANATION', 'CATEGORY', 'TAGS', 'AI SOURCE', 'LESSON', 'SECTION', 'SPEAKER', 'POS', 'ZHUYIN'];
  const found = {};
  const horizontalSpace = '[^\\S\\r\\n]*';
  const pattern = new RegExp(`(?:^|\\r?\\n)${horizontalSpace}(?:\\*\\*)?${horizontalSpace}(${labels.join('|')})${horizontalSpace}:?${horizontalSpace}(?:\\*\\*)?${horizontalSpace}:?${horizontalSpace}`, 'gi');
  const matches = [...text.matchAll(pattern)];
  matches.forEach((match, index) => {
    const key = match[1].toUpperCase();
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    found[key] = text.slice(start, end).trim();
  });
  const profile = v4GetLanguageProfile(state.sourceLanguage);
  const legacySource = profile.legacyLabels.map(label => found[label]).find(Boolean) || '';
  const sourceSentence = found.SOURCE || legacySource || found.HINDI || found.TAMIL || found.THAI || found.KHMER || found.VIETNAMESE || found.INDONESIAN || found.NEPALI || found.BENGALI || found.BANGLA || found.SPANISH || found.ENGLISH || '';
  const romanization = found.ROMANIZATION || found.ROMAN || '';
  return {
    sourceLanguage: profile.code,
    hindiSentence: sourceSentence, chineseSentence: found.CHINESE || '',
    pinyin: found.PINYIN || '', romanHindi: romanization, hindiExplanation: found.EXPLANATION || '',
    category: found.CATEGORY || 'Other', tags: found.TAGS || '',
    aiSource: found['AI SOURCE'] || 'ChatGPT / Gemini', originalPaste: text,
    lesson: found.LESSON || '', section: found.SECTION || '', speaker: found.SPEAKER || '',
    pos: found.POS || '', zhuyin: found.ZHUYIN || ''
  };
}

/* Currently selected student mother tongue. Falls back to Hindi. */
function v4Profile() {
  return v4GetLanguageProfile(state.sourceLanguage);
}

function sourceLanguageFor(sentence) {
  return (sentence && sentence.sourceLanguage) || 'hi';
}

/* Apply a language profile to the prompt builder UI and remember it. */
async function applyV4LanguageProfile(code) {
  const profile = v4GetLanguageProfile(code);
  const langChanged = profile.code !== state.sourceLanguage;
  state.sourceLanguage = profile.code;
  try { localStorage.setItem('v4SourceLanguage', profile.code); } catch (_) {}
  const select = $('v4SourceLanguage');
  if (select) select.value = profile.code;
  const topSelect = $('v4TopbarLanguage');
  if (topSelect) topSelect.value = profile.code;
  /* 2026-10-08：新增句子輸入框一律是中文句子（待教），標籤固定不再隨語言切換。 */
  if ($('promptInputLabel')) setBilingualText($('promptInputLabel'), '請輸入你要教的中文句子', 'Chinese sentence you want to teach');
  if ($('promptSentence')) $('promptSentence').placeholder = '';
  if ($('generatedPrompt')) $('generatedPrompt').value = '';
  if ($('generatedPromptPanel')) $('generatedPromptPanel').classList.add('hidden');
  if ($('promptMessage')) $('promptMessage').textContent = '';
  /* 換語言要換句庫 JSON（2026-10-05）：有資料才重載，否則等 loadBank。 */
  if (langChanged && state.sentences.length) {
    try {
      await reloadSentences();
    } catch (err) {
      console.warn('Language bank reload failed:', (err && err.message) || err);
    }
  }
  /* 課程跟著老師選的語言即時切換。 */
  try { if (typeof renderCourse === 'function' && $('courseSection')) renderCourse(); } catch (_) {}
  /* 句庫搜尋結果裡的課程卡片標籤也要跟著換語言。 */
  try { if (typeof renderSentences === 'function' && $('sentenceGrid')) renderSentences(); } catch (_) {}
  renderToneGlosses();
  updateSearchHelp();
  updateFooterAbout();
}

/* 發音實驗室四聲卡片的母語對照跟隨語言切換（英文對照保留）。 */
function renderToneGlosses() {
  const profile = v4Profile();
  const gloss = profile.toneGloss || [];
  const enGloss = ['mother', 'hemp', 'horse', 'scold'];
  for (let i = 1; i <= 4; i++) {
    const el = $('toneGloss' + i);
    if (el) el.textContent = enGloss[i - 1] + ' · ' + (gloss[i - 1] || enGloss[i - 1]);
  }
}

/* 句庫搜尋提示跟隨語言切換。 */
function updateSearchHelp() {
  const profile = v4Profile();
  setBilingualText($('searchHelp'),
    `搜尋${profile.nameZh || profile.name}、中文、拼音、解說、主題和標籤。由左至右計算。`,
    `Searches ${profile.name}, Chinese, pinyin, explanations, topics and tags. Calculated left to right.`);
}

/* 頁尾介紹跟隨語言切換。 */
function updateFooterAbout() {
  const profile = v4Profile();
  setBilingualText($('footerAbout'),
    `給${profile.nameZh || profile.name}初學者學繁體中文（台灣國語）的免費學習筆記本。老師功能需要 Google 登入及管理員核准。`,
    `A free learning notebook for ${profile.name}-speaking beginners studying Traditional Chinese (Taiwanese Mandarin). Teacher features require Google sign-in and admin approval.`);
}

function buildPrompt() {
  const sentence = $('promptSentence').value.trim();
  const profile = v4Profile();
  if (!sentence) {
    setBilingualText($('promptMessage'), `請先輸入一句${profile.nameZh || profile.name}或中文句子。`, `Type one ${profile.name} or Chinese sentence first.`);
    $('promptSentence').focus();
    return '';
  }
  const prompt = v4BuildLanguagePrompt(profile, sentence);
  $('generatedPrompt').value = prompt;
  $('generatedPromptPanel').classList.remove('hidden');
  $('promptMessage').textContent = '';
  $('promptCopyStatus').textContent = '';
  $('generatedPromptPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
  return prompt;
}

function decodeMobileClipboardText(text) {
  let value = String(text || '').trim();
  for (let pass = 0; pass < 3; pass += 1) {
    const encodedBytes = value.match(/%[0-9a-f]{2}/gi) || [];
    if (encodedBytes.length < 3) break;
    try {
      const decoded = decodeURIComponent(value.replace(/\+/g, '%20'));
      if (decoded === value) break;
      value = decoded;
    } catch (_) {
      break;
    }
  }
  return value;
}

async function copyPromptText() {
  const prompt = $('generatedPrompt').value || buildPrompt();
  if (!prompt) return false;
  try {
    await navigator.clipboard.writeText(prompt);
  } catch (_) {
    $('generatedPrompt').focus();
    $('generatedPrompt').select();
    if (!document.execCommand('copy')) {
      setBilingualText($('promptCopyStatus'), '請手動選取提示詞並複製。', 'Select the prompt and copy it manually.');
      return false;
    }
  }
  setBilingualText($('promptCopyStatus'), '已複製提示詞！', 'Prompt copied!');
  setTimeout(() => { $('promptCopyStatus').textContent = ''; }, 1800);
  return true;
}

function copyAndOpen(url) {
  const prompt = $('generatedPrompt').value || buildPrompt();
  if (!prompt) return;
  const isMobile = window.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    copyPromptText().then(copied => {
      if (copied) window.location.assign(url);
    });
    return;
  }
  const newPage = window.open(url, '_blank', 'noopener,noreferrer');
  copyPromptText();
  if (!newPage) setBilingualText($('promptCopyStatus'), '已複製提示詞。請允許彈出視窗，再開啟 AI 網站。', 'Prompt copied. Please allow pop-ups, then open the AI website.');
}

function romanHindiFor(sentence) {
  if (sentence.romanHindi) return sentence.romanHindi;
  if (!sentence.originalPaste) return '';
  return parsePaste(sentence.originalPaste).romanHindi;
}

/* ---- 課程多語言顯示（V4 第二階段） ----
   課程記錄（seq != null）跟著老師在「Students' native language」選的語言顯示：
   有 i18n 翻譯就用翻譯，沒有就退回印地語原文。個人句庫句子不受影響。 */
function isCourseRecord(s) { return !!(s && s.seq != null); }
function courseI18n(s) {
  const lang = state.sourceLanguage || 'hi';
  return (s && s.i18n && s.i18n[lang]) || null;
}
function displaySource(s) {
  const tr = isCourseRecord(s) ? courseI18n(s) : null;
  return (tr && tr.s) || s.hindiSentence || '';
}
function displayRoman(s) {
  if (isCourseRecord(s)) {
    const tr = courseI18n(s);
    if (tr) return tr.r || '';
    return s.romanHindi || '';
  }
  return romanHindiFor(s);
}
function displayExplanation(s) {
  const tr = isCourseRecord(s) ? courseI18n(s) : null;
  return (tr && tr.e) || s.hindiExplanation || '';
}
function displayProfile(s) {
  return v4GetLanguageProfile(isCourseRecord(s) ? (state.sourceLanguage || 'hi') : sourceLanguageFor(s));
}

function setModelAudioStatus(button, message) {
  const card = button.closest('.sentence-card');
  const status = card && card.querySelector('.card-recording-status');
  if (status) status.textContent = message;
}

function playTeacherAudioUrl(audioUrl, button) {
  sentenceModelAudio.pause();
  sentenceModelAudio.currentTime = 0;
  sentenceModelAudio.src = audioUrl;
  button.classList.add('speaking');
  setModelAudioStatus(button, 'Playing the teacher recording…');
  sentenceModelAudio.onended = () => {
    button.classList.remove('speaking');
    setModelAudioStatus(button, 'Teacher recording finished.');
  };
  sentenceModelAudio.onerror = () => {
    button.classList.remove('speaking');
    setModelAudioStatus(button, 'The teacher recording could not be played.');
  };
  sentenceModelAudio.play().catch(() => {
    button.classList.remove('speaking');
    setModelAudioStatus(button, 'Tap the play button again to hear the teacher recording.');
  });
}

async function playSentenceModel(sentence, button) {
  if (!sentence.standardAudioUrl) {
    speakChinese(sentence.chineseSentence, button);
    return;
  }

  const cachedUrl = teacherAudioCache.get(sentence.recordId);
  if (cachedUrl) {
    playTeacherAudioUrl(cachedUrl, button);
    return;
  }

  button.disabled = true;
  setModelAudioStatus(button, 'Loading the teacher recording…');
  try {
    const url = await fbStorage.ref(sentence.audioPath || sentence.standardAudioUrl).getDownloadURL();
    teacherAudioCache.set(sentence.recordId, url);
    button.disabled = false;
    playTeacherAudioUrl(url, button);
  } catch (_) {
    button.disabled = false;
    setModelAudioStatus(button, 'Teacher recording unavailable.');
  }
}

async function getNaturalVoiceStream() {
  const supported = navigator.mediaDevices.getSupportedConstraints
    ? navigator.mediaDevices.getSupportedConstraints()
    : {};
  const audio = {};
  ['autoGainControl', 'echoCancellation', 'noiseSuppression'].forEach(name => {
    if (supported[name]) audio[name] = {exact:false};
  });
  if (supported.channelCount) audio.channelCount = {ideal:1};
  if (supported.sampleRate) audio.sampleRate = {ideal:48000};
  if (supported.sampleSize) audio.sampleSize = {ideal:16};

  try {
    return await navigator.mediaDevices.getUserMedia({audio});
  } catch (error) {
    if (error && (error.name === 'NotAllowedError' || error.name === 'SecurityError')) throw error;
    ['autoGainControl', 'echoCancellation', 'noiseSuppression'].forEach(name => {
      if (supported[name]) audio[name] = {ideal:false};
    });
    return navigator.mediaDevices.getUserMedia({audio});
  }
}

function createVoiceRecorder(stream) {
  try {
    return new MediaRecorder(stream, {audioBitsPerSecond:128000});
  } catch (_) {
    return new MediaRecorder(stream);
  }
}

function audioBufferPeak(audioBuffer) {
  let peak = 0;
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
    const samples = audioBuffer.getChannelData(channel);
    for (let index = 0; index < samples.length; index += 1) {
      peak = Math.max(peak, Math.abs(samples[index]));
    }
  }
  return peak;
}

async function kWeightedBuffer(audioBuffer) {
  const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OfflineContext) return audioBuffer;
  const context = new OfflineContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );
  const source = context.createBufferSource();
  source.buffer = audioBuffer;

  // Web Audio approximation of the ITU-R BS.1770 K-weighting filters.
  const shelf = context.createBiquadFilter();
  shelf.type = 'highshelf';
  shelf.frequency.value = 1681.974;
  shelf.gain.value = 4;

  const highpass = context.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = 38.135;
  highpass.Q.value = 0.5003;

  source.connect(shelf);
  shelf.connect(highpass);
  highpass.connect(context.destination);
  source.start();
  return context.startRendering();
}

function blockEnergy(audioBuffer, start, length) {
  let energy = 0;
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
    const samples = audioBuffer.getChannelData(channel);
    const end = Math.min(samples.length, start + length);
    let channelEnergy = 0;
    for (let index = start; index < end; index += 1) {
      channelEnergy += samples[index] * samples[index];
    }
    energy += channelEnergy / Math.max(1, end - start);
  }
  return energy;
}

function energyToLufs(energy) {
  return -0.691 + 10 * Math.log10(Math.max(energy, 1e-12));
}

function measureIntegratedLufs(audioBuffer) {
  const blockLength = Math.max(1, Math.round(audioBuffer.sampleRate * 0.4));
  const step = Math.max(1, Math.round(audioBuffer.sampleRate * 0.1));
  const energies = [];
  if (audioBuffer.length <= blockLength) {
    energies.push(blockEnergy(audioBuffer, 0, audioBuffer.length));
  } else {
    for (let start = 0; start + blockLength <= audioBuffer.length; start += step) {
      energies.push(blockEnergy(audioBuffer, start, blockLength));
    }
  }

  const aboveAbsoluteGate = energies.filter(energy => energyToLufs(energy) > -70);
  if (!aboveAbsoluteGate.length) return -70;
  const preliminaryEnergy = aboveAbsoluteGate.reduce((sum, value) => sum + value, 0) / aboveAbsoluteGate.length;
  const relativeGate = energyToLufs(preliminaryEnergy) - 10;
  const gated = aboveAbsoluteGate.filter(energy => energyToLufs(energy) > relativeGate);
  const integratedEnergy = gated.reduce((sum, value) => sum + value, 0) / Math.max(1, gated.length);
  return energyToLufs(integratedEnergy);
}

function encodeMonoWav(audioBuffer, gain) {
  const length = audioBuffer.length;
  const channelCount = audioBuffer.numberOfChannels;
  const output = new ArrayBuffer(44 + length * 2);
  const view = new DataView(output);
  const writeText = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };
  writeText(0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeText(8, 'WAVE');
  writeText(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, audioBuffer.sampleRate, true);
  view.setUint32(28, audioBuffer.sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, 'data');
  view.setUint32(40, length * 2, true);

  const channels = Array.from(
    {length: channelCount},
    (_, channel) => audioBuffer.getChannelData(channel)
  );
  let offset = 44;
  for (let index = 0; index < length; index += 1) {
    let sample = 0;
    for (let channel = 0; channel < channelCount; channel += 1) {
      sample += channels[channel][index];
    }
    sample = (sample / channelCount) * gain;
    sample = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }
  return new Blob([output], {type:'audio/wav'});
}

// Seconds trimmed from the end of every teacher recording, so the
// keyboard/mouse click of pressing "Stop" never ends up in the saved audio.
const RECORDING_TAIL_TRIM_SECONDS = 0.2;

// Return a copy of audioBuffer with the last trimSeconds removed.
// Returns the original buffer when it is too short to trim safely.
function trimRecordingTail(context, audioBuffer, trimSeconds) {
  if (!trimSeconds || trimSeconds <= 0) return audioBuffer;
  const trimSamples = Math.floor(audioBuffer.sampleRate * trimSeconds);
  // Keep at least 0.3s of audio; never trim a very short recording.
  const minKeepSamples = Math.floor(audioBuffer.sampleRate * 0.3);
  if (audioBuffer.length <= trimSamples + minKeepSamples) return audioBuffer;
  const keptLength = audioBuffer.length - trimSamples;
  const trimmed = context.createBuffer(
    audioBuffer.numberOfChannels,
    keptLength,
    audioBuffer.sampleRate
  );
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
    trimmed.getChannelData(channel).set(
      audioBuffer.getChannelData(channel).subarray(0, keptLength)
    );
  }
  return trimmed;
}

async function normalizeTeacherRecording(blob) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return {blob, mimeType:blob.type || 'audio/webm', normalized:false};
  const context = new AudioContextClass();
  try {
    let audioBuffer = await context.decodeAudioData((await blob.arrayBuffer()).slice(0));
    // Trim the tail (e.g. the keyboard click when pressing Stop) before any other processing.
    audioBuffer = trimRecordingTail(context, audioBuffer, RECORDING_TAIL_TRIM_SECONDS);
    const weighted = await kWeightedBuffer(audioBuffer);
    const measuredLufs = measureIntegratedLufs(weighted);
    const peak = audioBufferPeak(audioBuffer);
    if (!Number.isFinite(measuredLufs) || peak <= 0) {
      return {blob, mimeType:blob.type || 'audio/webm', normalized:false};
    }

    const targetGain = Math.pow(10, (-16 - measuredLufs) / 20);
    const peakLimit = Math.pow(10, -1 / 20) / peak;
    // Never add more than 18 dB. The -1 dBFS ceiling always has priority.
    const gain = Math.max(0.01, Math.min(targetGain, peakLimit, Math.pow(10, 18 / 20)));
    const normalizedBlob = encodeMonoWav(audioBuffer, gain);
    const resultingLufs = measuredLufs + 20 * Math.log10(gain);
    return {
      blob: normalizedBlob,
      mimeType: 'audio/wav',
      normalized: true,
      measuredLufs,
      resultingLufs
    };
  } finally {
    await context.close();
  }
}

async function toggleCardRecording(node, sentence, preview) {
  const recordButton = node.querySelector('.card-record-button');
  const playButton = node.querySelector('.card-play-button');
  const saveButton = node.querySelector('.card-save-model-button');
  const status = node.querySelector('.card-recording-status');

  if (activeCardRecorder && activeCardRecorder.state === 'recording') {
    if (activeCardButton !== recordButton) {
      setBilingualText(status, '另一張卡片正在錄音，請先停止。', 'Another card is recording. Stop it first.');
      return;
    }
    activeCardRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices || !window.MediaRecorder) {
    setBilingualText(status, '這裡不支援錄音，請用 Chrome、Edge 或 Safari。', 'Recording is not supported here. Try Chrome, Edge, or Safari.');
    return;
  }

  try {
    const stream = await getNaturalVoiceStream();
    const chunks = [];
    const recorder = createVoiceRecorder(stream);
    activeCardRecorder = recorder;
    activeCardStream = stream;
    activeCardButton = recordButton;
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    recorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      const rawBlob = new Blob(chunks, {type:recorder.mimeType || 'audio/webm'});
      setBilingualText(status, '正在平衡錄音音量…', 'Balancing recording volume…');
      let processed = {blob:rawBlob, mimeType:rawBlob.type || 'audio/webm', normalized:false};
      try {
        processed = await normalizeTeacherRecording(rawBlob);
      } catch (error) {
        console.warn('Teacher recording normalization failed; using original audio.', error);
      }
      const key = sentence.recordId || `preview-${sentence.chineseSentence}`;
      const previous = cardRecordings.get(key);
      if (previous && previous.url) URL.revokeObjectURL(previous.url);
      const recording = {
        blob: processed.blob,
        url: URL.createObjectURL(processed.blob),
        mimeType: processed.mimeType
      };
      cardRecordings.set(key, recording);
      playButton.disabled = false;
      /* 有 recordId 即可儲存（歌曲／禮節卡亦同）；AI 預覽無 recordId，保持停用。 */
      saveButton.disabled = !sentence.recordId;
      /* 有新錄音：清除上一版的「已儲存」標記，按鍵恢復原樣。 */
      modelSavedRecordIds.delete(sentence.recordId);
      resetModelSaveButton(saveButton);
      recordButton.classList.remove('recording');
      setBilingualText(recordButton, '● 重新錄音', '● Record again');
      status.textContent = processed.normalized
        ? 'Recording ready. Volume balanced to about -16 LUFS with -1 dB peak protection. Last 0.2s trimmed.'
        : 'Recording ready. Original audio was kept.';
      activeCardRecorder = null;
      activeCardStream = null;
      activeCardButton = null;
    };
    recorder.start();
    recordButton.classList.add('recording');
    setBilingualText(recordButton, '■ 停止錄音', '■ Stop recording');
    setBilingualText(status, '錄音中…已關閉自動音量控制，請與麥克風保持穩定距離。', 'Recording… Automatic volume control is off. Keep a steady distance from the microphone.');
    setTimeout(() => {
      if (activeCardRecorder === recorder && recorder.state === 'recording') recorder.stop();
    }, 30000);
  } catch (_) {
    setBilingualText(status, '未取得麥克風權限。', 'Microphone permission was not allowed.');
  }
}

function recordingForSentence(sentence) {
  return cardRecordings.get(sentence.recordId || `preview-${sentence.chineseSentence}`);
}

/* 2026-10-08：存為示範不再彈窗——按鍵直接顯示紅色「儲存中…」，完成顯示「已儲存」。 */
const modelSavedRecordIds = new Set();

/* 把存為示範按鍵恢復成初始樣子（圖示卡＝💾；句子卡＝存為示範）。 */
function resetModelSaveButton(button) {
  button.classList.remove('saving', 'saved');
  if (button.classList.contains('icon-button')) {
    button.textContent = '💾';
  } else {
    setBilingualText(button, '存為示範', 'Save as model');
  }
}

/* 卡片建立時：本 session 已存過示範錄音的，顯示「已儲存」。 */
function paintModelSaveButton(button, sentence) {
  if (sentence && sentence.recordId && modelSavedRecordIds.has(sentence.recordId)) {
    setBilingualText(button, '已儲存', 'Saved');
    button.classList.add('saved');
  }
}

/* 老師錄音上傳＋寫入（免彈窗版）：回傳 Promise。 */
async function uploadModelRecording(sentence, recording) {
  const me = requireApprovedAccess();
  const uid = me.uid;
  const mime = recording.mimeType || 'audio/webm';
  const ext = mime.includes('mp4') ? 'm4a' : mime.includes('wav') ? 'wav' : 'webm';
  /* 個人句子→該老師個人音檔區；共版課程錄音→錄音者自己的個人音檔區＋個人覆寫層
     （管理員也一樣，只影響自己的畫面；共版錄音的變更走內容包）。 */
  const isPersonal = sentence._owner && sentence._owner !== 'shared';
  const path = teacherAudioPath(isPersonal ? sentence._owner : uid, sentence.recordId, ext);
  await fbStorage.ref(path).put(recording.blob, { contentType: mime });
  const audioFields = { audioPath: path, audioMime: mime, updatedAt: serverTimestamp() };
  if (isPersonal) {
    await teacherSentencesRef(sentence._owner).doc(sentence.recordId).update(audioFields);
  } else {
    await teacherOverridesRef(uid).doc(sentence.recordId).set(audioFields, { merge: true });
  }
  const saved = state.sentences.find(row => row.recordId === sentence.recordId);
  if (saved) { saved.audioPath = path; saved.audioMime = mime; saved.standardAudioUrl = path; }
  teacherAudioCache.delete(sentence.recordId);
}

/* 按下存為示範：按鍵顯示紅色「儲存中…」；完成顯示「已儲存」。不彈窗。 */
async function saveModelAudioInline(button, sentence, node) {
  const recording = recordingForSentence(sentence);
  if (!recording || !sentence.recordId) return;
  if (button.classList.contains('saving')) return;
  const status = node.querySelector('.card-recording-status');
  button.classList.remove('saved');
  setBilingualText(button, '儲存中…', 'Saving…');
  button.classList.add('saving');
  try {
    await uploadModelRecording(sentence, recording);
    modelSavedRecordIds.add(sentence.recordId);
    button.classList.remove('saving');
    button.classList.add('saved');
    setBilingualText(button, '已儲存', 'Saved');
    renderSentences();
    try { if (typeof renderCourse === 'function') renderCourse(); } catch (_) {}
    /* 課程課文分頁也要即時重繪，否則下載鍵要等重整才出現。 */
  } catch (err) {
    resetModelSaveButton(button);
    if (status) setBilingualText(status, `老師錄音儲存失敗：${(err && err.message) || '未知錯誤。'}`, `Save failed: ${(err && err.message) || 'Unknown error.'}`);
  }
}

function openDeleteDialog(sentence) {
  if (!sentence.recordId) return;
  pendingDeleteSentence = sentence;
  $('deleteSentenceText').textContent = sentence.chineseSentence || sentence.hindiSentence || 'Untitled sentence';
  $('deleteRecordId').textContent = sentence.recordId;
  $('deleteMessage').textContent = '';
  $('confirmDelete').disabled = false;
  $('deleteDialog').showModal();
}

async function submitDeleteSentence() {
  if (!pendingDeleteSentence) { $('deleteDialog').close(); return; }

  const sentence = pendingDeleteSentence;
  const button = $('confirmDelete');
  button.disabled = true;
  setBilingualText($('deleteMessage'), '正在刪除句子…', 'Deleting sentence…');

  try {
    const me = requireApprovedAccess();
    const uid = me.uid;
    const isPersonal = sentence._owner && sentence._owner !== 'shared';
    const audioPath = sentence.audioPath || '';
    /* 錄音檔：只刪自己錄在個人區的（v4_audio/{uid}/ 開頭）；
       共用錄音永遠不刪，以免影響其他老師。 */
    const ownAudio = isPersonal || audioPath.indexOf(`${AUDIO_PREFIX}${uid}/`) === 0;
    if (audioPath && ownAudio) {
      try { await fbStorage.ref(audioPath).delete(); } catch (_) { /* already gone */ }
    }
    teacherAudioCache.delete(sentence.recordId);
    if (isPersonal) {
      await teacherSentencesRef(sentence._owner).doc(sentence.recordId).delete();
    } else {
      /* 任何人刪除共版課程句子（含管理員）：只在個人覆寫層標記，不影響他人。 */
      await teacherOverridesRef(uid).doc(sentence.recordId)
        .set({ deleted: true, updatedAt: serverTimestamp() }, { merge: true });
    }
    state.sentences = state.sentences.filter(row => row.recordId !== sentence.recordId);
    $('sentenceCount').textContent = state.sentences.length;
    saveBankCache(state.bankVersion); /* 同步快取，否則下次開頁（快取命中）被刪的句子會復活 */
    renderSentences();
    renderCourse(); /* 課程課文分頁也要即時重繪，避免刪掉的卡片殘留 */
    pendingDeleteSentence = null;
    setBilingualText($('deleteMessage'), '句子已刪除。', 'Sentence deleted.');
    setTimeout(() => $('deleteDialog').close(), 650);
  } catch (err) {
    button.disabled = false;
    setBilingualText($('deleteMessage'), `刪除失敗：${(err && err.message) || '未知錯誤。'}`, `Delete failed: ${(err && err.message) || 'Unknown error.'}`);
  }
}

/* Edit sentence: rebuild the record through create + delete, because the
   backend has no update action. The old record is removed only after the
   new version is confirmed saved. */
function openEditDialog(sentence) {
  if (!sentence.recordId) return;
  pendingEditSentence = sentence;
  const editProfile = v4GetLanguageProfile(sourceLanguageFor(sentence));
  if ($('editHindiLabel')) setBilingualText($('editHindiLabel'), (editProfile.nameZh || editProfile.name) + '句子', editProfile.name + ' sentence');
  if ($('editRomanLabel')) setBilingualText($('editRomanLabel'), (editProfile.nameZh || editProfile.name) + '羅馬拼音', editProfile.romanizationName);
  if ($('editExplanationLabel')) setBilingualText($('editExplanationLabel'), (editProfile.nameZh || editProfile.name) + '解說', editProfile.name + ' explanation');
  $('editHindi').setAttribute('lang', editProfile.locale);
  $('editRoman').setAttribute('lang', editProfile.locale + '-Latn');
  $('editExplanation').setAttribute('lang', editProfile.locale);
  /* 課程記錄：編輯框讀取當前語言的翻譯（displaySource/displayRoman/displayExplanation），
     不是寫死的 hindiSentence 欄位（2026-10-10 修：16 語全有此 bug）。 */
  const isCourse = isCourseRecord(sentence);
  $('editHindi').value = isCourse ? displaySource(sentence) : (sentence.hindiSentence || '');
  $('editChinese').value = sentence.chineseSentence || '';
  $('editPinyin').value = sentence.pinyin || '';
  $('editRoman').value = isCourse ? displayRoman(sentence) : romanHindiFor(sentence);
  $('editExplanation').value = isCourse ? displayExplanation(sentence) : (sentence.hindiExplanation || '');
  $('editCategory').value = sentence.category || 'Other';
  $('editTags').value = sentence.tags || '';
  $('editAiSource').value = sentence.aiSource || 'ChatGPT / Gemini';
  const list = $('editCategoryList');
  list.innerHTML = '';
  (state.categories || []).forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    list.appendChild(option);
  });
  setBilingualText($('editRecordNote'), `正在編輯記錄 ${sentence.recordId}。變更會直接更新這筆記錄；老師錄音會保留。`, `Editing record ${sentence.recordId}. Changes update this record in place; any teacher recording stays attached.`);
  const hasAudio = !!(sentence.standardAudioUrl || teacherAudioCache.get(sentence.recordId) || recordingForSentence(sentence));
  $('editAudioNote').classList.toggle('hidden', !hasAudio);
  $('editMessage').textContent = '';
  $('confirmEdit').disabled = false;
  setBilingualText($('confirmEdit'), '儲存變更', 'Save changes');
  updateEditWarnings();
  $('editDialog').showModal();
  setTimeout(() => $('editHindi').focus(), 50);
}

/* 各分頁新增句子：前往頁面上方的 AI 新增流程（Create your AI prompt → Paste the AI answer），
   儲存時 submitSentence 會依 courseState.pendingSection 自動歸入該課該分頁（只存老師個人帳號）。 */
function goToAiFlowForSection(lessonNum, section) {
  if (typeof courseState !== 'undefined') {
    courseState.lesson = lessonNum;
    courseState.pendingSection = section;
  }
  const target = document.getElementById('createPrompt');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const msg = $('promptMessage');
  if (msg) setBilingualText(msg, `為${lessonShortLabel(lessonNum)}「${section}」新增句子：請在下方輸入句子並完成 AI 流程，儲存後會自動歸入該課「${section}」分頁，只儲存在你的帳號下，不影響公版教材。`, `Adding a sentence to ${lessonShortLabel(lessonNum)} "${section}": type the sentence below and complete the AI flow. It will be filed under this lesson's "${section}" tab, saved to your account only.`);
  setTimeout(() => { const ta = $('promptSentence'); if (ta) ta.focus({ preventScroll: true }); }, 650);
}

/* 新增補充句子：直接前往頁面上方的 AI 新增流程（Create your AI prompt → Paste the AI answer），
   不再跳出表單。送出時 submitSentence 會依 courseState.lesson 自動歸入該課「補充」。 */
function goToAiFlowForSupp(lessonNum) {
  goToAiFlowForSection(lessonNum, '補充');
}

function updateEditWarnings() {
  const box = $('editWarnings');
  const warnings = [];
  const pinyinText = $('editPinyin').value.trim();
  const pinyinIssues = validatePinyin(pinyinText);
  pinyinIssues.slice(0, 8).forEach(issue => warnings.push(`Pinyin: ${issue}.`));
  if (pinyinIssues.length > 8) warnings.push(`…and ${pinyinIssues.length - 8} more pinyin issues.`);
  if (pinyinText && !/^[A-ZĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/.test(pinyinText)) warnings.push('Pinyin: the first syllable usually starts with a capital letter.');
  const chinese = $('editChinese').value.trim();
  const hindi = $('editHindi').value.trim();
  const excludeId = pendingEditSentence ? pendingEditSentence.recordId : null;
  if (chinese) {
    const exactDupe = state.sentences.find(s => s.recordId !== excludeId && (s.chineseSentence || '').trim() === chinese);
    if (exactDupe) warnings.push(`This Chinese sentence already exists as another record${exactDupe.recordId ? ` (${exactDupe.recordId})` : ''}. Saving is blocked until you change it.`);
  }
  if (hindi) {
    const hindiDupe = state.sentences.find(s => s.recordId !== excludeId && (s.hindiSentence || '').trim() === hindi && (s.chineseSentence || '').trim() !== chinese);
    if (hindiDupe) warnings.push(`The same ${parsedProfile.name} sentence already exists with a different Chinese translation${hindiDupe.recordId ? ` (${hindiDupe.recordId})` : ''}. Check which version is correct before saving.`);
  }
  if (!warnings.length) { box.classList.add('hidden'); box.innerHTML = ''; return; }
  box.classList.remove('hidden');
  box.innerHTML = '<strong>儲存前請檢查： <span class="en-sub">Please check before saving:</span></strong>';
  const list = document.createElement('ul');
  warnings.forEach(w => { const li = document.createElement('li'); li.textContent = w; list.appendChild(li); });
  box.appendChild(list);
}

function buildEditedPaste() {
  const lines = [
    ['HINDI', $('editHindi').value.trim()],
    ['CHINESE', $('editChinese').value.trim()],
    ['PINYIN', $('editPinyin').value.trim()],
    ['ROMAN', $('editRoman').value.trim()],
    ['EXPLANATION', $('editExplanation').value.trim()],
    ['CATEGORY', $('editCategory').value.trim() || 'Other'],
    ['TAGS', $('editTags').value.trim()],
    ['AI SOURCE', $('editAiSource').value.trim() || 'ChatGPT / Gemini'],
  ];
  /* Keep course labels so editing a lesson record does not drop it from the course view. */
  if (pendingEditSentence) {
    const meta = courseMeta(pendingEditSentence);
    if (meta.lesson) lines.push(['LESSON', meta.lesson]);
    if (meta.section) lines.push(['SECTION', meta.section]);
    if (meta.speaker) lines.push(['SPEAKER', meta.speaker]);
    if (meta.pos) lines.push(['POS', meta.pos]);
    if (meta.zhuyin) lines.push(['ZHUYIN', meta.zhuyin]);
  }
  return lines.map(([label, value]) => `${label}: ${value}`).join('\n');
}

/* Edit sentence: Firebase supports true in-place updates, so editing keeps the
   same recordId and any attached teacher recording. */
async function submitEdit() {
  if (!pendingEditSentence) { $('editDialog').close(); return; }
  const original = pendingEditSentence;
  const editSaveProfile = v4GetLanguageProfile(sourceLanguageFor(original));
  const edited = {
    sourceLanguage: editSaveProfile.code,
    hindiSentence: $('editHindi').value.trim(),
    chineseSentence: $('editChinese').value.trim(),
    pinyin: $('editPinyin').value.trim(),
    romanHindi: $('editRoman').value.trim(),
    hindiExplanation: $('editExplanation').value.trim(),
  };
  /* 2026-10-10：允許空白欄位儲存（老師可能只改部分欄位，如第七冊解說尚未補上時）。
     重複檢查保留（資料完整性）。 */
  const exactDupe = state.sentences.find(s => s.recordId !== original.recordId && (s.chineseSentence || '').trim() === edited.chineseSentence && edited.chineseSentence);
  if (exactDupe) { setBilingualText($('editMessage'), `已擋下：這個中文句子已存在（記錄 ${exactDupe.recordId || '另一筆記錄'}）。`, `Blocked: this Chinese sentence already exists as record ${exactDupe.recordId || 'another record'}.`); return; }

  const button = $('confirmEdit');
  button.disabled = true;
  setBilingualText($('editMessage'), '正在儲存變更…', 'Saving changes…');

  const content = buildEditedPaste();
  const data = sentenceDocData({
    ...edited,
    category: $('editCategory').value.trim() || 'Other',
    tags: $('editTags').value.trim(),
    aiSource: $('editAiSource').value.trim() || 'ChatGPT / Gemini',
    originalPaste: content,
    /* 原地編輯保留原順序號。 */
    seq: original.seq != null ? original.seq : null,
  });

  try {
    const me = requireApprovedAccess();
    const uid = me.uid;
    /* 原地更新：保留 recordId、建立時間與錄音，只換內容欄位。 */
    const { createdAt, audioPath, audioMime, favorite, ...contentFields } = data;
    const isPersonal = original._owner && original._owner !== 'shared';
    if (isPersonal) {
      await teacherSentencesRef(original._owner).doc(original.recordId).update(contentFields);
    } else {
      /* 任何人編輯共版課程句子（含管理員）：寫入個人覆寫層，只影響自己的畫面。
         共版內容的變更走內容包／翻譯包匯入（管理員專用）。 */
      await teacherOverridesRef(uid).doc(original.recordId)
        .set({ ...contentFields, updatedAt: serverTimestamp() }, { merge: true });
    }
    /* 本地更新（省錢）：把寫入的欄位直接套用到記憶體中的句子，不再全量重讀。 */
    Object.assign(original, {
      sourceLanguage: data.sourceLanguage,
      hindiSentence: data.hindiSentence,
      chineseSentence: data.chineseSentence,
      pinyin: data.pinyin,
      romanHindi: data.romanHindi,
      hindiExplanation: data.hindiExplanation,
      category: data.category,
      tags: data.tags,
      aiSource: data.aiSource,
      originalPaste: data.originalPaste,
      seq: data.seq,
    });
    courseMetaCache.clear();
    $('sentenceCount').textContent = state.sentences.length;
    saveBankCache(state.bankVersion);
    renderSentences();
    renderCourse();
    pendingEditSentence = null;
    setBilingualText($('editMessage'), '變更已儲存。', 'Changes saved.');
    setTimeout(() => $('editDialog').close(), 700);
  } catch (err) {
    button.disabled = false;
    setBilingualText($('editMessage'), `儲存失敗：${(err && err.message) || '未知錯誤。'}`, `Save failed: ${(err && err.message) || 'Unknown error.'}`);
  }
}

function createCard(sentence, preview = false) {
  const node = $('cardTemplate').content.firstElementChild.cloneNode(true);
  /* 老師個人新增的句子卡：外框顏色與公版教材區分（CSS .personal-card）。 */
  if (!preview && sentence._owner && sentence._owner !== 'shared') node.classList.add('personal-card');
  /* 歌曲／禮節卡：有 recordId 但不可編輯刪除，錄音儲存需啟用（與中文句子卡一致）。 */
  const isSongOrRitual = /^(song|ritual)-/.test(String(sentence.recordId || ''));
  const noEdit = preview || isSongOrRitual;
  node.querySelector('.category-pill').textContent = sentence.category || 'Other';
  node.querySelector('.record-id').textContent = (preview && !isSongOrRitual) ? 'PREVIEW' : sentence.recordId || '';
  /* 課程記錄加註來源（課名＋分頁），方便在全域搜尋結果中辨識。 */
  if (!preview) {
    const meta = courseMeta(sentence);
    if (meta.lesson) {
      const badge = document.createElement('span');
      badge.className = 'category-pill lesson-badge';
      badge.textContent = `${lessonLabel(Number(meta.lesson))}${meta.section ? '・' + meta.section : ''}`;
      badge.style.marginLeft = '6px';
      node.querySelector('.category-pill').after(badge);
    }
  }
  const deleteButton = node.querySelector('.card-delete-button');
  deleteButton.hidden = noEdit;
  if (!noEdit) deleteButton.addEventListener('click', () => openDeleteDialog(sentence));
  const editButton = node.querySelector('.card-edit-button');
  editButton.hidden = noEdit;
  if (!noEdit) editButton.addEventListener('click', () => openEditDialog(sentence));
  const cardProfile = displayProfile(sentence);
  const hindiEl = node.querySelector('.hindi');
  hindiEl.textContent = displaySource(sentence);
  hindiEl.setAttribute('lang', cardProfile.locale);
  /* 外語發音鈕：走 Azure TTS（2026-10-10 恢復）。 */
  const foreignSpeak = node.querySelector('.speak-foreign-button');
  if (foreignSpeak) {
    foreignSpeak.title = '外語發音 (Azure) ' + cardProfile.name;
    foreignSpeak.addEventListener('click', () => speakForeign(sentence, foreignSpeak));
  }
  const roman = displayRoman(sentence);
  const romanLine = node.querySelector('.roman-hindi');
  romanLine.textContent = roman ? `${cardProfile.romanizationName}: ${roman}` : '';
  romanLine.hidden = !roman;
  romanLine.setAttribute('lang', cardProfile.locale + '-Latn');
  const chineseEl = node.querySelector('.chinese');
  chineseEl.textContent = zhConvert(sentence.chineseSentence);
  chineseEl.setAttribute('lang', getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant');
  node.querySelector('.pinyin').textContent = sentence.pinyin;
  const explanationEl = node.querySelector('.explanation');
  explanationEl.textContent = displayExplanation(sentence) || 'No explanation added.';
  explanationEl.setAttribute('lang', cardProfile.locale);
  /* 解說區標題跟隨顯示語言（模板預設寫 "Hindi explanation"）。 */
  const explSummary = node.querySelector('details summary');
  if (explSummary) {
    const nameZh = cardProfile.nameZh || cardProfile.name;
    explSummary.innerHTML = escapeHtml(nameZh) + '解說 <span class="en-sub">' + escapeHtml(cardProfile.name) + ' explanation</span> <span>＋</span>';
  }
  const tags = [...new Set(String(sentence.tags || '').split(/[,;|]/).map(t => t.trim().toLowerCase()).filter(Boolean))];
  node.querySelector('.tags').innerHTML = tags.map(tag => `<span class="tag"></span>`).join('');
  node.querySelectorAll('.tag').forEach((el, i) => { el.textContent = tags[i]; });
  const speak = node.querySelector('.speak-button');
  speak.title = sentence.standardAudioUrl ? '老師示範發音 (Play teacher model voice)' : '瀏覽器發音 (Play browser voice)';
  speak.addEventListener('click', () => playSentenceModel(sentence, speak));
  const dlButton = node.querySelector('.download-button');
  dlButton.hidden = !sentence.standardAudioUrl;
  dlButton.addEventListener('click', () => downloadTeacherAudio(sentence, dlButton));
  const recordButton = node.querySelector('.card-record-button');
  const playButton = node.querySelector('.card-play-button');
  const saveModelButton = node.querySelector('.card-save-model-button');
  recordButton.addEventListener('click', () => toggleCardRecording(node, sentence, preview));
  playButton.addEventListener('click', () => {
    const recording = recordingForSentence(sentence);
    if (recording) new Audio(recording.url).play();
  });
  saveModelButton.addEventListener('click', () => saveModelAudioInline(saveModelButton, sentence, node));
  paintModelSaveButton(saveModelButton, sentence);
  return node;
}

function speakChinese(text, button) {
  if (!('speechSynthesis' in window)) return alert('這個瀏覽器不支援語音播放，請用 Chrome、Edge 或 Safari。\nSpeech is not supported in this browser. Please try Chrome, Edge or Safari.');
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.settings.defaultVoice || 'zh-TW';
  utterance.rate = Number(state.settings.speechRate) || 0.85;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(v => v.lang.toLowerCase() === 'zh-tw') || voices.find(v => v.lang.toLowerCase().startsWith('zh')) || null;
  utterance.onstart = () => button.classList.add('speaking');
  utterance.onend = utterance.onerror = () => button.classList.remove('speaking');
  speechSynthesis.speak(utterance);
}

/* 外語發音：經 Cloud Function synthesizeV4Source 走 Azure TTS（2026-10-10 恢復，Cheng 要求）。
   中文仍用瀏覽器語音（speakChinese），外語才走 Azure。
   2026-10-10 音量修正：Azure 各語音原始音量不一致＋神經語音句尾自然衰減，
   播放時經 Web Audio DynamicsCompressor 即時壓縮，平衡大小聲。 */
let _synthFn = null;
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}
async function speakForeign(sentence, button) {
  const text = displaySource(sentence);
  if (!text || !text.trim()) return;
  const profile = displayProfile(sentence);
  const locale = profile.locale || 'hi-IN';
  button.disabled = true;
  button.classList.add('speaking');
  try {
    if (!_synthFn) {
      _synthFn = firebase.app().functions('us-east1').httpsCallable('synthesizeV4Source', { timeout: 60000 });
    }
    const res = await _synthFn({ locale, text: text.trim() });
    const data = (res && res.data) || {};
    if (!data.audioBase64) throw new Error('empty audio');
    const url = 'data:' + (data.contentType || 'audio/mpeg') + ';base64,' + data.audioBase64;
    const audio = new Audio(url);
    /* 音量平衡：MediaElement → Compressor → 喇叭，壓平忽大忽小。 */
    const ctx = getAudioCtx();
    const src = ctx.createMediaElementSource(audio);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 12;
    comp.ratio.value = 4;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;
    src.connect(comp);
    comp.connect(ctx.destination);
    audio.onended = audio.onerror = () => { button.classList.remove('speaking'); button.disabled = false; };
    await audio.play();
  } catch (err) {
    button.classList.remove('speaking');
    button.disabled = false;
    alert('外語語音播放失敗：' + ((err && err.message) || '未知錯誤') + '\nForeign voice failed: ' + ((err && err.message) || 'unknown error'));
  }
}


/* Pronunciation Lab: listening, recording, pitch direction and homophones. */
const toneModels = {
  1: { text:'媽', curve:[0.78,0.79,0.78,0.79,0.78] },
  2: { text:'麻', curve:[0.28,0.36,0.49,0.65,0.82] },
  3: { text:'馬', curve:[0.55,0.36,0.24,0.38,0.68] },
  4: { text:'罵', curve:[0.84,0.67,0.49,0.31,0.17] }
};

const homophoneFamilies = {
  shi4: [
    {char:'是',pinyin:'shì',meaning:'to be / होना',word:'是的',wordPinyin:'shì de',wordMeaning:'yes'},
    {char:'事',pinyin:'shì',meaning:'matter / बात',word:'事情',wordPinyin:'shìqing',wordMeaning:'matter; event'},
    {char:'市',pinyin:'shì',meaning:'market / बाज़ार',word:'市場',wordPinyin:'shìchǎng',wordMeaning:'market'},
    {char:'室',pinyin:'shì',meaning:'room / कमरा',word:'教室',wordPinyin:'jiàoshì',wordMeaning:'classroom'},
    {char:'試',pinyin:'shì',meaning:'test; try / परीक्षा; कोशिश',word:'考試',wordPinyin:'kǎoshì',wordMeaning:'exam'},
    {char:'式',pinyin:'shì',meaning:'form; pattern / रूप',word:'方式',wordPinyin:'fāngshì',wordMeaning:'method; way'},
    {char:'世',pinyin:'shì',meaning:'world; generation / संसार',word:'世界',wordPinyin:'shìjiè',wordMeaning:'world'},
    {char:'視',pinyin:'shì',meaning:'to see; to view / देखना',word:'電視',wordPinyin:'diànshì',wordMeaning:'television'}
  ],
  yi4: [
    {char:'意',pinyin:'yì',meaning:'meaning; idea / अर्थ; विचार',word:'意思',wordPinyin:'yìsi',wordMeaning:'meaning'},
    {char:'易',pinyin:'yì',meaning:'easy; change / आसान; बदलना',word:'容易',wordPinyin:'róngyì',wordMeaning:'easy'},
    {char:'義',pinyin:'yì',meaning:'justice; meaning / न्याय; अर्थ',word:'意義',wordPinyin:'yìyì',wordMeaning:'significance'},
    {char:'藝',pinyin:'yì',meaning:'art; skill / कला',word:'藝術',wordPinyin:'yìshù',wordMeaning:'art'},
    {char:'議',pinyin:'yì',meaning:'discuss / चर्चा',word:'建議',wordPinyin:'jiànyì',wordMeaning:'suggestion'},
    {char:'憶',pinyin:'yì',meaning:'remember / स्मरण',word:'回憶',wordPinyin:'huíyì',wordMeaning:'memory'},
    {char:'異',pinyin:'yì',meaning:'different / अलग',word:'差異',wordPinyin:'chāyì',wordMeaning:'difference'},
    {char:'億',pinyin:'yì',meaning:'one hundred million / दस करोड़',word:'一億',wordPinyin:'yí yì',wordMeaning:'100 million'}
  ],
  gong1: [
    {char:'工',pinyin:'gōng',meaning:'work / काम',word:'工作',wordPinyin:'gōngzuò',wordMeaning:'work'},
    {char:'公',pinyin:'gōng',meaning:'public / सार्वजनिक',word:'公園',wordPinyin:'gōngyuán',wordMeaning:'park'},
    {char:'功',pinyin:'gōng',meaning:'achievement / उपलब्धि',word:'成功',wordPinyin:'chénggōng',wordMeaning:'succeed'},
    {char:'宮',pinyin:'gōng',meaning:'palace / महल',word:'故宮',wordPinyin:'Gùgōng',wordMeaning:'Palace Museum'},
    {char:'供',pinyin:'gōng',meaning:'provide / प्रदान करना',word:'提供',wordPinyin:'tígōng',wordMeaning:'provide'},
    {char:'攻',pinyin:'gōng',meaning:'attack / हमला',word:'攻擊',wordPinyin:'gōngjí',wordMeaning:'attack'},
    {char:'弓',pinyin:'gōng',meaning:'bow / धनुष',word:'弓箭',wordPinyin:'gōngjiàn',wordMeaning:'bow and arrow'},
    {char:'恭',pinyin:'gōng',meaning:'respectful / आदरपूर्ण',word:'恭喜',wordPinyin:'gōngxǐ',wordMeaning:'congratulations'}
  ]
};

const contextQuestions = [
  {sentence:'我＿＿學生。',pinyin:'Wǒ shì xuéshēng.',options:['是','事','市','試'],answer:'是',explain:'是 (shì) means “to be”: I am a student.'},
  {sentence:'我明天要考＿＿。',pinyin:'Wǒ míngtiān yào kǎoshì.',options:['室','試','市','事'],answer:'試',explain:'考試 (kǎoshì) is the complete word for “exam”.'},
  {sentence:'老師在教＿＿。',pinyin:'Lǎoshī zài jiàoshì.',options:['是','世','室','視'],answer:'室',explain:'教室 (jiàoshì) means “classroom”.'},
  {sentence:'這個字是什麼＿＿思？',pinyin:'Zhège zì shì shénme yìsi?',options:['意','易','藝','議'],answer:'意',explain:'意思 (yìsi) means “meaning”.'},
  {sentence:'謝謝你的建＿＿。',pinyin:'Xièxie nǐ de jiànyì.',options:['憶','議','義','億'],answer:'議',explain:'建議 (jiànyì) means “suggestion”.'},
  {sentence:'他在銀行＿＿作。',pinyin:'Tā zài yínháng gōngzuò.',options:['工','公','功','宮'],answer:'工',explain:'工作 (gōngzuò) means “work”.'}
];

let recorder = null;
let recordedChunks = [];
let recordedUrl = '';
let quizIndex = 0;
let quizAnswered = 0;
let quizCorrect = 0;
const standardToneAudio = new Audio();
let activeToneButton = null;

function speakLabText(text, button) {
  const original = button && button.textContent;
  speakChinese(text, button || document.createElement('button'));
  if (button) {
    setBilingualText(button, '♪ 播放中', '♪ Playing');
    setTimeout(() => { button.textContent = original; }, 1200);
  }
}

function resetToneAudioButton() {
  if (!activeToneButton) return;
  activeToneButton.textContent = activeToneButton.dataset.label;
  activeToneButton.classList.remove('playing');
  activeToneButton = null;
}

function playStandardTone(src, button, fallbackText) {
  standardToneAudio.pause();
  standardToneAudio.currentTime = 0;
  resetToneAudioButton();
  if (!button.dataset.label) button.dataset.label = button.textContent;
  activeToneButton = button;
  setBilingualText(button, '♪ 播放中', '♪ Playing');
  button.classList.add('playing');
  standardToneAudio.src = src;
  standardToneAudio.play().catch(() => {
    resetToneAudioButton();
    speakLabText(fallbackText, button);
  });
}

standardToneAudio.addEventListener('ended', resetToneAudioButton);
standardToneAudio.addEventListener('error', resetToneAudioButton);

function showLabPanel(panel) {
  const tone = panel === 'tone';
  $('tonePractice').classList.toggle('hidden', !tone);
  $('homophonePractice').classList.toggle('hidden', tone);
  $('toneTab').classList.toggle('active', tone);
  $('homophoneTab').classList.toggle('active', !tone);
  $('toneTab').setAttribute('aria-selected', String(tone));
  $('homophoneTab').setAttribute('aria-selected', String(!tone));
}

function drawPitch(reference, student = []) {
  const canvas = $('pitchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height, pad = 30;
  ctx.clearRect(0,0,w,h); ctx.fillStyle = '#fffaf2'; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = '#dedbd2'; ctx.lineWidth = 1;
  for (let i=1;i<5;i++) { const y=pad+(h-pad*2)*i/5; ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke(); }
  const line = (values,color,width) => {
    if (!values.length) return;
    ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath();
    values.forEach((v,i) => { const x=pad+(w-pad*2)*(i/(values.length-1||1)); const y=h-pad-v*(h-pad*2); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.stroke();
  };
  line(reference,'#0b706b',7); line(student,'#d94a36',4);
}

function autocorrelate(buffer, sampleRate) {
  let rms=0; for (let i=0;i<buffer.length;i++) rms+=buffer[i]*buffer[i]; rms=Math.sqrt(rms/buffer.length);
  if (rms < 0.012) return -1;
  let bestOffset=-1, bestCorrelation=0;
  const minOffset=Math.floor(sampleRate/450), maxOffset=Math.min(Math.floor(sampleRate/70),buffer.length-1);
  for (let offset=minOffset;offset<=maxOffset;offset++) {
    let corr=0; for (let i=0;i<buffer.length-offset;i++) corr+=buffer[i]*buffer[i+offset];
    corr/=buffer.length-offset;
    if (corr>bestCorrelation) { bestCorrelation=corr; bestOffset=offset; }
  }
  return bestCorrelation>0.005 ? sampleRate/bestOffset : -1;
}

async function analyseRecording(blob) {
  const data = await blob.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audio = await audioCtx.decodeAudioData(data.slice(0));
  const samples = audio.getChannelData(0), windowSize=2048, step=Math.max(512,Math.floor(samples.length/60));
  const pitches=[];
  for (let start=0;start+windowSize<samples.length;start+=step) {
    const pitch=autocorrelate(samples.subarray(start,start+windowSize),audio.sampleRate);
    if (pitch>70&&pitch<450) pitches.push(pitch);
  }
  await audioCtx.close();
  if (pitches.length<3) throw new Error('Not enough clear voice was detected.');
  const sorted=[...pitches].sort((a,b)=>a-b), low=sorted[Math.floor(sorted.length*.1)], high=sorted[Math.floor(sorted.length*.9)];
  const span=Math.max(20,high-low), normalized=pitches.map(v=>Math.max(.05,Math.min(.95,(v-low)/span)));
  const smoothed=normalized.map((v,i,a)=>a.slice(Math.max(0,i-2),i+3).reduce((s,n)=>s+n,0)/a.slice(Math.max(0,i-2),i+3).length);
  drawPitch(toneModels[$('practiceTone').value].curve,smoothed);
}

async function toggleRecording() {
  if (recorder && recorder.state === 'recording') { recorder.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    setBilingualText($('recordingStatus'), '這裡不支援錄音，請用 Chrome 或 Safari。', 'Recording is not supported here. Try Chrome or Safari.'); return;
  }
  try {
    const stream=await getNaturalVoiceStream();
    recordedChunks=[]; recorder=createVoiceRecorder(stream);
    recorder.ondataavailable=e=>{if(e.data.size) recordedChunks.push(e.data);};
    recorder.onstop=async()=>{
      stream.getTracks().forEach(t=>t.stop());
      const blob=new Blob(recordedChunks,{type:recorder.mimeType||'audio/webm'});
      if(recordedUrl) URL.revokeObjectURL(recordedUrl); recordedUrl=URL.createObjectURL(blob);
      $('recordedAudio').src=recordedUrl; $('playRecording').disabled=false;
      $('recordTone').classList.remove('recording'); setBilingualText($('recordTone'), '● 開始錄音', '● Start recording');
      setBilingualText($('recordingStatus'), '錄音就緒，比較兩條線。', 'Recording ready. Compare the two lines.');
      try { await analyseRecording(blob); } catch(e) { $('recordingStatus').textContent=e.message+' Try again in a quiet place.'; }
    };
    recorder.start(); $('recordTone').classList.add('recording'); setBilingualText($('recordTone'), '■ 停止錄音', '■ Stop recording');
    setBilingualText($('recordingStatus'), '錄音中…已關閉自動音量控制，請把音節唸約一秒。', 'Recording… Automatic volume control is off. Say the syllable for about one second.');
    setTimeout(()=>{if(recorder&&recorder.state==='recording')recorder.stop();},3500);
  } catch (_) { setBilingualText($('recordingStatus'), '未取得麥克風權限，請允許後再試一次。', 'Microphone permission was not allowed. Please allow it and try again.'); }
}

function renderHomophones(key='shi4') {
  const mount=$('homophoneGrid'); mount.innerHTML='';
  homophoneFamilies[key].forEach(item=>{
    const card=document.createElement('article'); card.className='homophone-card';
    const top=document.createElement('div'); top.className='homophone-top';
    const char=document.createElement('span'); char.className='homophone-character'; char.textContent=item.char;
    const play=document.createElement('button'); play.type='button'; play.className='homophone-speak'; play.textContent='▶'; play.setAttribute('aria-label',`Listen to ${item.word}`); play.addEventListener('click',()=>speakLabText(item.word,play));
    top.append(char,play); card.append(top);
    const py=document.createElement('strong'); py.textContent=item.pinyin; card.append(py);
    const meaning=document.createElement('small'); meaning.textContent=item.meaning; card.append(meaning);
    const word=document.createElement('p'); word.className='homophone-word'; word.textContent=`${item.word} · ${item.wordPinyin}`; card.append(word);
    const wordMeaning=document.createElement('small'); wordMeaning.textContent=item.wordMeaning; card.append(wordMeaning); mount.append(card);
  });
}

function updateQuizProgress() {
  const total = contextQuestions.length;
  setBilingualText($('quizProgress'), `第 ${(quizIndex % total) + 1} 題，共 ${total} 題 · 得分 ${quizCorrect}/${quizAnswered}`, `Question ${(quizIndex % total) + 1} of ${total} · Score ${quizCorrect}/${quizAnswered}`);
}
function renderQuiz() {
  const q=contextQuestions[quizIndex%contextQuestions.length]; $('quizQuestion').textContent=q.sentence; $('quizPinyin').textContent=q.pinyin;
  $('quizFeedback').textContent=''; updateQuizProgress(); const mount=$('quizOptions'); mount.innerHTML='';
  q.options.forEach(option=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.addEventListener('click',()=>{
    mount.querySelectorAll('button').forEach(x=>x.disabled=true); const right = option===q.answer;
    b.classList.add(right?'correct':'wrong');
    if(!right)[...mount.children].find(x=>x.textContent===q.answer)?.classList.add('correct');
    quizAnswered += 1; if (right) quizCorrect += 1; updateQuizProgress();
    setBilingualText($('quizFeedback'), `${right ? '答對了。' : '試著讀出完整的詞。'}${q.explain || ''}`, `${right ? 'Correct. ' : 'Try to read the complete word. '}${q.explain || ''}`);
    speakLabText(q.sentence.replace('＿＿',q.answer),document.createElement('button'));
  });mount.append(b);});
}

function initPronunciationLab() {
  if (!$('pronunciationLab')) return;
  $('toneTab').addEventListener('click',()=>showLabPanel('tone'));
  $('homophoneTab').addEventListener('click',()=>showLabPanel('homophone'));
  document.querySelectorAll('.tone-card').forEach(card=>card.querySelectorAll('.tone-audio').forEach(button=>button.addEventListener('click',()=>playStandardTone(button.dataset.audio,button,card.dataset.text))));
  $('practiceTone').addEventListener('change',()=>drawPitch(toneModels[$('practiceTone').value].curve));
  $('hearPracticeTone').addEventListener('click',e=>{const tone=$('practiceTone').value;playStandardTone(`audio/tones/ma-tone-${tone}-once.mp3`,e.currentTarget,toneModels[tone].text);});
  $('recordTone').addEventListener('click',toggleRecording);
  $('playRecording').addEventListener('click',()=>$('recordedAudio').play());
  document.querySelectorAll('.sound-chip').forEach(chip=>chip.addEventListener('click',()=>{document.querySelectorAll('.sound-chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');renderHomophones(chip.dataset.sound);}));
  $('nextQuiz').addEventListener('click',()=>{quizIndex++;renderQuiz();});
  drawPitch(toneModels[1].curve); renderHomophones(); renderQuiz();
}

function renderFilters() {
  const mount = $('topicOptions');
  mount.innerHTML = '';
  state.selectedCategories = new Set(state.categories.map(normalizeSearchText));
  state.categories.forEach((category, index) => {
    const label = document.createElement('label');
    label.className = 'topic-option';
    label.innerHTML = `<input type="checkbox" value=""><span class="check-circle" aria-hidden="true"></span><span class="topic-name"></span>`;
    const input = label.querySelector('input');
    input.value = category;
    input.checked = true;
    input.id = `topic-${index}`;
    label.querySelector('.topic-name').textContent = category;
    input.addEventListener('change', () => {
      const key = normalizeSearchText(category);
      if (input.checked) state.selectedCategories.add(key);
      else state.selectedCategories.delete(key);
      updateTopicPicker();
      renderSentences();
    });
    mount.appendChild(label);
  });
  updateTopicPicker();
}

function normalizeSearchText(value) {
  return String(value || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

function sentenceTopics(sentence) {
  const known = new Set(state.categories.map(normalizeSearchText));
  const values = [sentence.category].concat(String(sentence.tags || '').split(/[,;|]/));
  return new Set(values.map(normalizeSearchText).filter(value => known.has(value)));
}

function matchesKeywordExpression(haystack) {
  const terms = ['keywordA', 'keywordB', 'keywordC'].map(id => normalizeSearchText($(id).value));
  const operations = [$('operatorAB').value, $('operatorBC').value];
  let result = null;
  terms.forEach((term, index) => {
    if (!term) return;
    const found = haystack.includes(term);
    if (result === null) result = found;
    else result = operations[index - 1] === 'OR' ? result || found : result && found;
  });
  return result === null ? true : result;
}

function updateTopicPicker() {
  const total = state.categories.length;
  const selected = state.selectedCategories.size;
  const all = $('topicAll');
  all.checked = total > 0 && selected === total;
  all.indeterminate = selected > 0 && selected < total;
  $('topicSummary').textContent = selected === total ? 'All topics' : selected === 0 ? 'Any topic' : `${selected} topics selected`;
}

/* Course metadata: parsed from the record's original paste text so it works
   no matter how the backend stores the new LESSON/SECTION/SPEAKER/POS/ZHUYIN labels. */
const courseMetaCache = new Map();
function courseMeta(sentence) {
  if (!sentence) return { lesson: '', section: '', speaker: '', pos: '', zhuyin: '' };
  /* 靜態 JSON 已預解析（2026-10-05）：直接取用，不用再解析 4MB 原文。 */
  if (sentence._meta) return sentence._meta;
  const key = sentence.recordId || sentence.originalPaste || '';
  if (courseMetaCache.has(key)) return courseMetaCache.get(key);
  const parsed = parsePaste(sentence.originalPaste || '');
  /* section 只取第一行：少數目標記錄的原始貼文夾帶 "# SECTION: ..." 註解行
     （如 509/510/607/609/610），不清除會導致 === '目標' 比對失敗、
     卡片與內頁標題退回英文。 */
  const meta = {
    lesson: String(parsed.lesson || '').trim(),
    section: String(parsed.section || '').split('\n')[0].trim(),
    speaker: String(parsed.speaker || '').trim(),
    pos: String(parsed.pos || '').trim(),
    zhuyin: String(parsed.zhuyin || '').trim()
  };
  courseMetaCache.set(key, meta);
  return meta;
}

function renderSentences() {
  /* 搜尋：有关键字时搜尋全資料庫（含課程記錄）；無搜尋條件時只顯示個人句庫。
     v20260925-23: 徹底簡化邏輯，確保課程記錄能被搜到。 */
  const kwA = normalizeSearchText($('keywordA').value);
  const kwB = normalizeSearchText($('keywordB').value);
  const kwC = normalizeSearchText($('keywordC').value);
  const hasKeyword = !!(kwA || kwB || kwC);
  const totalCats = (state.categories || []).length;
  const selCats = state.selectedCategories.size;
  const hasTopicFilter = selCats > 0 && selCats < totalCats;
  const searching = hasKeyword || hasTopicFilter;

  const opAB = $('operatorAB') ? $('operatorAB').value : 'AND';
  const opBC = $('operatorBC') ? $('operatorBC').value : 'AND';

  const visible = [];
  for (const s of state.sentences) {
    const isCourse = (s.seq != null);
    if (isCourse && !searching) continue; /* 非搜尋時跳過課程記錄 */

    if (searching) {
      const haystack = normalizeSearchText(
        [s.recordId, s.hindiSentence, romanHindiFor(s), s.chineseSentence, s.pinyin, s.hindiExplanation, s.category, s.tags].join(' ')
      );
      /* 關鍵字匹配 */
      let kwMatch = true;
      const terms = [kwA, kwB, kwC].filter(Boolean);
      if (terms.length > 0) {
        kwMatch = haystack.includes(terms[0]);
        if (terms.length > 1) {
          const m2 = haystack.includes(terms[1]);
          kwMatch = (opAB === 'OR') ? (kwMatch || m2) : (kwMatch && m2);
        }
        if (terms.length > 2) {
          const m3 = haystack.includes(terms[2]);
          kwMatch = (opBC === 'OR') ? (kwMatch || m3) : (kwMatch && m3);
        }
      }
      if (!kwMatch) continue;

      /* 主題匹配：只有部分選取時才過濾 */
      if (hasTopicFilter) {
        const known = new Set((state.categories || []).map(normalizeSearchText));
        const sTopics = [s.category].concat(String(s.tags || '').split(/[,;|]/))
          .map(normalizeSearchText).filter(t => known.has(t));
        const anyMatch = sTopics.some(t => state.selectedCategories.has(t));
        if (!anyMatch) continue;
      }
    }
    visible.push(s);
  }

  /* 搜尋歌曲歌詞：有关键字時一併搜尋歌曲的每句歌詞。
     印地文專屬歌曲僅在印地文模式納入。 */
  if (searching && typeof V4_SONGS !== 'undefined') {
    const terms = [kwA, kwB, kwC].filter(Boolean);
    const isHindi = (state.sourceLanguage || 'hi') === 'hi';
    for (const song of V4_SONGS) {
      if (song.hindiOnly && !isHindi) continue;
      song.lines.forEach((line, idx) => {
        const s = songLineToSentence(song, line, idx);
        const haystack = normalizeSearchText(
          [s.recordId, s.hindiSentence, romanHindiFor(s), s.chineseSentence, s.pinyin, s.hindiExplanation, s.category, s.tags].join(' ')
        );
        let kwMatch = true;
        if (terms.length > 0) {
          kwMatch = haystack.includes(terms[0]);
          if (terms.length > 1) {
            const m2 = haystack.includes(terms[1]);
            kwMatch = (opAB === 'OR') ? (kwMatch || m2) : (kwMatch && m2);
          }
          if (terms.length > 2) {
            const m3 = haystack.includes(terms[2]);
            kwMatch = (opBC === 'OR') ? (kwMatch || m3) : (kwMatch && m3);
          }
        }
        if (!kwMatch) return;
        if (hasTopicFilter) {
          const known = new Set((state.categories || []).map(normalizeSearchText));
          const sTopics = [s.category].concat(String(s.tags || '').split(/[,;|]/))
            .map(normalizeSearchText).filter(t => known.has(t));
          const anyMatch = sTopics.some(t => state.selectedCategories.has(t));
          if (!anyMatch) return;
        }
        visible.push(s);
      });
    }
  }

  const grid = $('sentenceGrid'); grid.innerHTML = '';
  if (searching) {
    /* 搜尋結果：只編號，不開放拖曳。 */
    renderNumberedStatic(grid, visible, (s) => createCard(s));
  } else {
    /* 個人句庫：編號＋↑↓移動鈕排序（順序存老師個人帳號）。 */
    renderNumberedUnit(grid, visible, {
      unitKey: 'library',
      buildCard: (s) => createCard(s),
      canDrag: () => !!currentTeacherUid()
    });
  }
  setBilingualText($('resultCount'), `${visible.length} 句`, `${visible.length} shown`);
  $('emptyState').classList.toggle('hidden', visible.length > 0);
  if (!visible.length) {
    if (searching) {
      setBilingualText($('emptyStateTitle'), '沒有符合的句子', 'No matching sentences');
      setBilingualText($('emptyStateHint'), '試試其他關鍵字或分類。', 'Try another keyword or category.');
    } else {
      setBilingualText($('emptyStateTitle'), '這裡還沒有句子', 'No sentences here yet');
      setBilingualText($('emptyStateHint'), '用上面的 AI 流程新增第一句；登入後你新增的句子會顯示在這裡。', 'Use the AI flow above to add your first sentence. Sentences you add after signing in appear here.');
    }
  }
}

/* Pinyin quality check: every syllable must be a real Hanyu Pinyin syllable
   and the tone mark must sit on the correct vowel (a > o > e > iu/ui). */
const PINYIN_BASE = new Set(('a ai an ang ao ba bai ban bang bao bei ben beng bi bian biao bie bin bing bo bu ca cai can cang cao ce cen ceng cha chai chan chang chao che chen cheng chi chong chou chu chua chuai chuan chuang chui chun chuo ci cong cou cu cuan cui cun cuo da dai dan dang dao de dei den deng di dia dian diao die ding diu dong dou du duan dui dun duo e ei en eng er fa fan fang fei fen feng fo fou fu ga gai gan gang gao ge gei gen geng gong gou gu gua guai guan guang gui gun guo ha hai han hang hao he hei hen heng hong hou hu hua huai huan huang hui hun huo ji jia jian jiang jiao jie jin jing jiong jiu ju juan jue jun ka kai kan kang kao ke kei ken keng kong kou ku kua kuai kuan kuang kui kun kuo la lai lan lang lao le lei leng li lia lian liang liao lie lin ling liu long lou lu luan lun luo lv lve ma mai man mang mao me mei men meng mi mian miao mie min ming miu mo mou mu na nai nan nang nao ne nei nen neng ni nian niang niao nie nin ning niu nong nou nu nuan nuo nv nve o ou pa pai pan pang pao pei pen peng pi pian piao pie pin ping po pou pu qi qia qian qiang qiao qie qin qing qiong qiu qu quan que qun ran rang rao re ren reng ri rong rou ru rua ruan rui run ruo sa sai san sang sao se sen seng sha shai shan shang shao she shei shen sheng shi shou shu shua shuai shuan shuang shui shun shuo si song sou su suan sui sun suo ta tai tan tang tao te tei teng ti tian tiao tie ting tong tou tu tuan tui tun tuo wa wai wan wang wei wen weng wo wu xi xia xian xiang xiao xie xin xing xiong xiu xu xuan xue xun ya yan yang yao ye yi yin ying yo yong you yu yuan yue yun za zai zan zang zao ze zei zen zeng zha zhai zhan zhang zhao zhe zhei zhen zheng zhi zhong zhou zhu zhua zhuai zhuan zhuang zhui zhun zhuo zi zong zou zu zuan zui zun zuo').split(' '));
const TONE_VOWELS = 'āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ';
const TONE_TO_BASE = { 'ā':'a','á':'a','ǎ':'a','à':'a','ē':'e','é':'e','ě':'e','è':'e','ī':'i','í':'i','ǐ':'i','ì':'i','ō':'o','ó':'o','ǒ':'o','ò':'o','ū':'u','ú':'u','ǔ':'u','ù':'u','ǖ':'v','ǘ':'v','ǚ':'v','ǜ':'v' };
function stripToneMarks(syllable) {
  return syllable.toLowerCase().replace(/ü/g, 'v').replace(new RegExp('[' + TONE_VOWELS + ']', 'g'), ch => TONE_TO_BASE[ch] || ch);
}
function toneMarkPositionOk(syllable) {
  const lower = syllable.toLowerCase();
  let marked = -1;
  for (let i = 0; i < lower.length; i += 1) {
    if (TONE_VOWELS.includes(lower[i])) { marked = i; break; }
  }
  if (marked === -1) return true; /* no tone mark, e.g. neutral tone */
  const base = stripToneMarks(syllable);
  const markedVowel = stripToneMarks(syllable[marked]);
  let expected;
  if (base.includes('a')) expected = 'a';
  else if (base.includes('o')) expected = 'o';
  else if (base.includes('e')) expected = 'e';
  else if (base.includes('iu')) expected = 'u';
  else if (base.includes('ui')) expected = 'i';
  else expected = markedVowel; /* single-vowel syllable such as shì or lǜ */
  return markedVowel === expected;
}
/* Split a tone-stripped pinyin word (e.g. "zhongwen") into real syllables. */
function segmentPinyin(base) {
  const memo = {};
  function rec(i) {
    if (i >= base.length) return [];
    if (Object.prototype.hasOwnProperty.call(memo, i)) return memo[i];
    for (let len = Math.min(6, base.length - i); len >= 1; len -= 1) {
      const syl = base.slice(i, i + len);
      const core = (syl.length > 2 && syl.endsWith('r') && !PINYIN_BASE.has(syl)) ? syl.slice(0, -1) : syl; /* erhua */
      if (PINYIN_BASE.has(core)) {
        const rest = rec(i + len);
        if (rest) return (memo[i] = [syl].concat(rest));
      }
    }
    return (memo[i] = null);
  }
  return rec(0);
}
function validatePinyin(pinyinText) {
  const issues = [];
  const tokens = String(pinyinText || '')
    .split(/[\s'’]+/)
    .map(t => t.replace(new RegExp('[^A-Za-z' + TONE_VOWELS + 'üÜ]', 'g'), ''))
    .filter(Boolean);
  tokens.forEach(token => {
    const base = stripToneMarks(token).toLowerCase();
    const syllables = segmentPinyin(base);
    if (!syllables) { issues.push(`“${token}” is not valid pinyin`); return; }
    let pos = 0;
    syllables.forEach(syl => {
      const original = token.slice(pos, pos + syl.length);
      pos += syl.length;
      if (!toneMarkPositionOk(original)) issues.push(`“${original}” has the tone mark on the wrong vowel`);
    });
  });
  return issues;
}

function handlePreview() {
  const pastedText = $('pasteInput').value.trim();
  const text = decodeMobileClipboardText(pastedText);
  if (!text) { setBilingualText($('parseMessage'), '請先貼上 AI 的回答。', 'Paste an AI answer first.'); return; }
  if (text !== pastedText) $('pasteInput').value = text;
  const parsed = parsePaste(text);
  const parsedProfile = v4GetLanguageProfile(parsed.sourceLanguage);
  const requiredFields = [[parsedProfile.name,parsed.hindiSentence],['Chinese',parsed.chineseSentence],['Pinyin',parsed.pinyin],['Explanation',parsed.hindiExplanation]];
  if (parsedProfile.requiresRomanization) requiredFields.splice(3, 0, [parsedProfile.romanizationName,parsed.romanHindi]);
  const missing = requiredFields.filter(([,v]) => !v).map(([k]) => k);
  if (missing.length) { setBilingualText($('parseMessage'), `請補上這些標記段落：${missing.join('、')}。`, `Please add these labelled parts: ${missing.join(', ')}.`); return; }
  /* Duplicate check: only block if the same Chinese sentence already exists in the
     SAME location (same lesson supplement, or My Sentence Bank). A sentence in a
     lesson supplement does not block adding it to My Sentence Bank, and vice versa. */
  const chinese = parsed.chineseSentence.trim();
  const hindi = parsed.hindiSentence.trim();
  const targetLesson = (typeof courseState !== 'undefined' && courseState.lesson > 0) ? String(courseState.lesson) : '';
  const exactDupe = state.sentences.find(s => {
    if ((s.chineseSentence || '').trim() !== chinese) return false;
    const m = courseMeta(s);
    const sLesson = m.lesson || '';
    // Same location: both in the same lesson, or both in personal bank (no lesson)
    return targetLesson ? (sLesson === targetLesson) : !sLesson;
  });
  if (exactDupe) {
    const dupeMeta = courseMeta(exactDupe);
    const location = dupeMeta.lesson ? `${lessonLabel(Number(dupeMeta.lesson))}${dupeMeta.section ? '「' + dupeMeta.section + '」' : ''}` : 'My Sentence Bank';
    $('parseMessage').textContent = `This Chinese sentence already exists in ${location}${exactDupe.recordId ? ` (${exactDupe.recordId})` : ''}. Saving it again would create a duplicate.`;
    return;
  }
  const hindiDupe = state.sentences.find(s => (s.hindiSentence || '').trim() === hindi && (s.chineseSentence || '').trim() !== chinese);
  /* Pinyin quality check. */
  const pinyinIssues = validatePinyin(parsed.pinyin);
  const warnings = [];
  if (hindiDupe) warnings.push(`The same ${parsedProfile.name} sentence already exists with a different Chinese translation${hindiDupe.recordId ? ` (${hindiDupe.recordId})` : ''}. Check which version is correct before saving.`);
  pinyinIssues.slice(0, 8).forEach(issue => warnings.push(`Pinyin: ${issue}.`));
  if (pinyinIssues.length > 8) warnings.push(`…and ${pinyinIssues.length - 8} more pinyin issues.`);
  if (!/^[A-ZĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ]/.test(parsed.pinyin.trim())) warnings.push('Pinyin: the first syllable usually starts with a capital letter.');
  state.preview = parsed; state.previewWarnings = warnings; $('parseMessage').textContent = '';
  const mount = $('previewCard'); mount.innerHTML = '';
  if (warnings.length) {
    const box = document.createElement('div');
    box.className = 'preview-warnings';
    box.setAttribute('role', 'status');
    box.innerHTML = '<strong>儲存前請檢查： <span class="en-sub">Please check before saving:</span></strong>';
    const list = document.createElement('ul');
    warnings.forEach(w => { const li = document.createElement('li'); li.textContent = w; list.appendChild(li); });
    box.appendChild(list);
    mount.appendChild(box);
  }
  mount.appendChild(createCard(parsed, true));
  $('previewPanel').classList.remove('hidden'); $('previewPanel').scrollIntoView({behavior:'smooth',block:'start'});
}

function receiveBank(data) {
  window.__sentenceBankLoaded = true;
  if (!data || !data.success) return showApiError('The API returned an error.');
  state.settings = data.settings || {}; state.sentences = data.sentences || [];
  state.categories = String(state.settings.categories || '').split(',').map(s => s.trim()).filter(Boolean);
  const DEFAULT_BANK_NAMES = ['My Chinese Sentence Bank', 'Bridge Language Academy'];
  if (state.settings.bankName && !DEFAULT_BANK_NAMES.includes(state.settings.bankName)) { $('bankName').textContent = state.settings.bankName; document.title = state.settings.bankName; }
  else { setBilingualText($('bankName'), '語橋學苑', 'Bridge Language Academy'); document.title = '語橋學苑 Bridge Language Academy'; }
  if (state.settings.ownerName && state.settings.ownerName !== 'Your Name') { setBilingualText($('ownerName'), `為 ${state.settings.ownerName} 製作`, `Made for ${state.settings.ownerName}`); $('ownerName').classList.remove('hidden'); }
  else $('ownerName').classList.add('hidden');
  $('sentenceCount').textContent = state.sentences.length; $('categoryCount').textContent = state.categories.length;
  $('apiStatus').className = 'live-status ready'; $('apiStatus').innerHTML = '<i></i> Firebase 已連線 <span class="en-sub">Firebase connected</span>';
  renderFilters(); renderSentences(); renderCourse();
  saveBankCache(data.bankVersion);
}

function showApiError(message, canRetry) {
  $('apiStatus').className = 'live-status error'; $('apiStatus').innerHTML = '<i></i> 連線有問題 <span class="en-sub">Connection problem</span>';
  const grid = $('sentenceGrid');
  grid.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'loading-card';
  card.textContent = message + ' ';
  if (canRetry) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'secondary-button'; setBilingualText(button, '再試一次', 'Try again');
    button.addEventListener('click', () => {
      grid.innerHTML = '<div class="loading-card">載入句子中… <span class="en-sub">Loading your sentences…</span></div>';
      loadBank();
    });
    card.appendChild(button);
  } else {
    card.appendChild(document.createTextNode('Refresh the page to try again.'));
  }
  grid.appendChild(card);
}

/* Last successful bank data, kept on this device as an offline fallback. */
/* 快取按老師帳號隔離：不同帳號不共用快取，避免 A 的個人句子出現在 B 的離線快取。 */
function bankCacheKey() {
  const uid = (typeof personalLayerUid === 'string' && personalLayerUid)
    ? personalLayerUid
    : (currentTeacherUid() || 'anon');
  return 'csbCachedBankV4v2:' + uid; /* v2：2026-10-02 起含 bankVersion，舊快取作廢 */
}
function saveBankCache(bankVersion) {
  try {
    localStorage.setItem(bankCacheKey(), JSON.stringify({
      settings: state.settings, sentences: state.sentences,
      categories: state.categories, savedAt: Date.now(),
      bankVersion: bankVersion != null ? bankVersion : null,
      lang: state.sourceLanguage || 'hi',
      unitOrders: state.unitOrders || {}
    }));
    try { localStorage.removeItem('csbCachedBankV4'); } catch (_) {} /* 清掉舊版共用快取 */
  } catch (_) {}
}
function loadBankCache() {
  try {
    const data = JSON.parse(localStorage.getItem(bankCacheKey()));
    if (!data || !Array.isArray(data.sentences)) return null;
    if (data.unitOrders && typeof data.unitOrders === 'object') state.unitOrders = data.unitOrders;
    return data;
  } catch (_) { return null; }
}
function describeCacheAge(savedAt) {
  const minutes = Math.max(0, Math.round((Date.now() - (savedAt || Date.now())) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return minutes + ' min ago';
  const hours = Math.round(minutes / 60);
  return hours < 24 ? hours + ' h ago' : Math.round(hours / 24) + ' d ago';
}

/* 儲存句子：先檢查老師身分（Google 登入＋管理員核准），通過才寫入。 */
function trySaveSentence() {
  if (!state.preview) return;
  try {
    requireApprovedAccess();
  } catch (err) {
    $('saveMessage').textContent = (err && err.message) || '請先用 Google 登入。';
    return;
  }
  $('saveMessage').textContent = '';
  submitSentence();
}

async function submitSentence() {
  if (!state.preview) return;

  $('saveButton').disabled = true;
  setBilingualText($('saveMessage'), '正在儲存句子…', 'Saving sentence…');
  const submitted = { ...state.preview };

  /* 若正在瀏覽某一課（courseState.lesson > 0），AI 新增的句子歸入該課指定分頁
     （courseState.pendingSection；各分頁「新增句子」按鈕設定，未設定時預設「補充」）；
     若未開啟任何課程，則按原規則歸入個人句庫。 */
  const activeLesson = (typeof courseState !== 'undefined' && courseState.lesson > 0) ? courseState.lesson : 0;
  const section = activeLesson > 0 ? ((typeof courseState !== 'undefined' && courseState.pendingSection) || '補充') : '';
  if (activeLesson > 0) {
    const pasteBase = String(submitted.originalPaste || '').trim();
    submitted.originalPaste = pasteBase + `\nLESSON: ${activeLesson}\nSECTION: ${section}`;
    submitted.category = '課程';
    submitted.tags = `${lessonShortLabel(activeLesson)}, ${section}`;
    submitted.seq = nextCourseSeq(activeLesson);
    if (typeof courseState !== 'undefined') courseState.pendingSection = null;
  }

  try {
    const me = requireApprovedAccess();
    const uid = me.uid;
    /* 個人句庫與課程「補充」一律寫入該老師的個人命名空間，不影響其他老師。 */
    const docData = sentenceDocData({ ...submitted, ownerUid: uid });
    const docRef = await teacherSentencesRef(uid).add(docData);
    /* 本地更新（省錢）：新句子直接併入記憶體＋更新快取，不再全量重讀 10,777 筆。 */
    const newSentence = docToSentence(docRef.id, docData, uid);
    const nowMs = Date.now();
    newSentence.createdAt = { toMillis: () => nowMs, seconds: Math.floor(nowMs / 1000), nanoseconds: (nowMs % 1000) * 1e6 };
    state.sentences.push(newSentence);
    state.sentences = sortSentencesBySeq(state.sentences);
    $('sentenceCount').textContent = state.sentences.length;
    saveBankCache(state.bankVersion);
    renderSentences();
    if (activeLesson > 0) { courseMetaCache.clear(); renderCourse(); }
    if (activeLesson > 0) setBilingualText($('saveMessage'), `已儲存至${lessonShortLabel(activeLesson)}「${section}」（只在你的帳號顯示）。`, `Saved to ${lessonShortLabel(activeLesson)} "${section}" (visible in your account only).`);
    else setBilingualText($('saveMessage'), '儲存成功！', 'Saved successfully!');
    $('saveButton').disabled = false;
    $('pasteInput').value = ''; $('previewPanel').classList.add('hidden');
    setTimeout(() => { if (activeLesson > 0) { $('courseSection').scrollIntoView({behavior:'smooth'}); } else { $('libraryTitle').scrollIntoView({behavior:'smooth'}); } }, 800);
  } catch (err) {
    $('saveButton').disabled = false;
    setBilingualText($('saveMessage'), `儲存失敗：${(err && err.message) || '未知錯誤。'}`, `Save failed: ${(err && err.message) || 'Unknown error.'}`);
  }
}

async function loadBank(attempt = 1) {
  const MAX_ATTEMPTS = 3;
  window.__sentenceBankLoaded = false;
  $('apiStatus').className = 'live-status';
  $('apiStatus').innerHTML = attempt > 1 ? `<i></i> Retrying… (${attempt}/${MAX_ATTEMPTS})` : '<i></i> Connecting';
  if (firebaseInitError) {
    handleBankFailure(attempt, MAX_ATTEMPTS, `Firebase could not start: ${firebaseInitError}`);
    return;
  }
  try {
    /* 省錢機制（2026-10-02）：先只讀 1 筆設定檔比對 bankVersion，
       版本一致就用本機快取（本次載入僅 1 次讀取），版本變了才全量抓取。
       任何寫入 v4_sentences 的匯入腳本都必須同步更新 bankVersion，否則快取不會失效。
       2026-10-03 修正：必須先等登入狀態就緒（whenAccessReady）再查快取，
       否則快取鍵會以 'anon' 查不到該老師的個人快取，且隨後的 refreshPersonalLayer
       會因 uid 變化（'' → 真實 uid）再全量重讀一次——等於每次冷啟動花 2 次全量讀取，
       修復完全無效。設定檔讀取與等待登入並行執行，不增加載入時間。 */
    const [manifest, settingsSnap] = await Promise.all([
      vbankManifest().catch(() => null),
      fbDb.collection(META_COL).doc(SETTINGS_DOC).get(),
      whenAccessReady(),
    ]);
    personalLayerUid = currentTeacherUid();
    const settings = settingsSnap.exists ? { ...defaultSettings(), ...settingsSnap.data() } : defaultSettings();
    /* 版本號改用靜態句庫 manifest（2026-10-05）：Firestore 的 bankVersion 從未成功寫入，
       此處以 manifest.version 為準；拿不到 manifest 時退回舊邏輯。 */
    const serverVersion = (manifest && manifest.version) || settings.bankVersion || null;
    /* 第七冊有獨立版本：km 模式時併入版本字串，第七冊更新才會觸發 km 快取失效。 */
    const effectiveVersion = (state.sourceLanguage === 'km' && serverVersion)
      ? serverVersion + '|b7-' + BOOK7_VERSION : serverVersion;
    state.bankVersion = effectiveVersion;
    const cached = loadBankCache();
    let sentences;
    const cacheLang = (cached && cached.lang) || 'hi';
    if (cached && Array.isArray(cached.sentences) && (cached.bankVersion || null) === effectiveVersion && cacheLang === (state.sourceLanguage || 'hi')) {
      sentences = cached.sentences; /* 快取命中：本次只花 1 次讀取 */
    } else {
      sentences = await loadFullBank(); /* 版本變更或無快取：全量抓取（去重併發） */
    }
    receiveBank({ success: true, settings, sentences, bankVersion: serverVersion });
    /* 登入狀態已於上方就緒；保留此呼叫以防載入過程中帳號又發生變化
      （uid 一致時 refreshPersonalLayer 會直接返回，不重讀）。 */
    whenAccessReady().then(() => refreshPersonalLayer());
  } catch (err) {
    handleBankFailure(attempt, MAX_ATTEMPTS, `Could not reach Firebase: ${(err && err.message) || 'unknown error'}.`);
  }
}

function handleBankFailure(attempt, maxAttempts, message) {
  if (attempt < maxAttempts) {
    setTimeout(() => loadBank(attempt + 1), attempt * 2000);
    return;
  }
  const cached = loadBankCache();
  if (cached) {
    receiveBank({ success: true, settings: cached.settings, sentences: cached.sentences });
    $('apiStatus').className = 'live-status error';
    $('apiStatus').innerHTML = `<i></i> Showing saved copy (${describeCacheAge(cached.savedAt)})`;
    const notice = document.createElement('div');
    notice.className = 'cache-notice';
    notice.innerHTML = '你目前離線，顯示句庫上次儲存的版本。 <span class="en-sub">You are offline. Showing the last saved copy of your sentence bank.</span> ';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'text-button'; setBilingualText(button, '再試一次', 'Try again');
    button.addEventListener('click', () => {
      $('sentenceGrid').innerHTML = '<div class="loading-card">載入句子中… <span class="en-sub">Loading your sentences…</span></div>';
      loadBank();
    });
    notice.appendChild(button);
    $('sentenceGrid').prepend(notice);
    return;
  }
  showApiError(message + ' ', true);
}

$('startButton').addEventListener('click', () => $('createPrompt').scrollIntoView({behavior:'smooth'}));
$('refreshButton').addEventListener('click', () => {
  $('refreshButton').disabled = true;
  $('refreshButton').textContent = '…';
  window.location.reload();
});
$('generatePrompt').addEventListener('click', buildPrompt);
/* Students' native language: restore the teacher's last choice, default Hindi. */
(function initV4LanguageSelector() {
  let saved = 'hi';
  try { saved = localStorage.getItem('v4SourceLanguage') || 'hi'; } catch (_) {}
  /* Topbar quick switcher: build options from the shared language profiles. */
  const topSelect = $('v4TopbarLanguage');
  if (topSelect && typeof V4_LANGUAGE_PROFILES === 'object') {
    Object.keys(V4_LANGUAGE_PROFILES).forEach(code => {
      const p = V4_LANGUAGE_PROFILES[code];
      const opt = document.createElement('option');
      opt.value = p.code;
      opt.textContent = (p.nativeName ? p.nativeName + ' · ' : '') + p.name;
      topSelect.appendChild(opt);
    });
    topSelect.addEventListener('change', () => applyV4LanguageProfile(topSelect.value));
  }
  applyV4LanguageProfile(saved);
  const select = $('v4SourceLanguage');
  if (select) select.addEventListener('change', () => applyV4LanguageProfile(select.value));
  /* 簡繁切換（2026-10-10，Cheng 要求）：預設繁體，切簡體時全站中文轉簡體。 */
  const zhModeSelect = $('v4ZhMode');
  if (zhModeSelect) {
    zhModeSelect.value = getZhMode();
    zhModeSelect.addEventListener('change', () => {
      setZhMode(zhModeSelect.value);
      renderSentences();
      if (typeof renderLessons === 'function') renderLessons();
      /* 全站 UI 文字轉換（含靜態標籤、按鈕、標題等） */
      setTimeout(applyZhModeToPage, 100);
    });
    /* 頁面載入時若為簡體模式，轉換全站 */
    if (getZhMode() === 'simp') {
      setTimeout(applyZhModeToPage, 500);
    }
  }
})();
$('clearPrompt').addEventListener('click', () => {
  $('promptSentence').value = '';
  $('generatedPrompt').value = '';
  $('generatedPromptPanel').classList.add('hidden');
  $('promptMessage').textContent = '';
  $('promptCopyStatus').textContent = '';
  $('promptSentence').focus();
});
$('promptSentence').addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') buildPrompt();
});
$('copyGeneratedPrompt').addEventListener('click', copyPromptText);
$('openChatGPT').addEventListener('click', () => copyAndOpen('https://chatgpt.com/'));
$('openGemini').addEventListener('click', () => copyAndOpen('https://gemini.google.com/app'));
$('sampleButton').addEventListener('click', () => { $('pasteInput').value = SAMPLE; $('pasteInput').focus(); });
$('pasteInput').addEventListener('paste', () => {
  setTimeout(() => {
    const pastedText = $('pasteInput').value;
    const decoded = decodeMobileClipboardText(pastedText);
    if (decoded !== pastedText.trim()) {
      $('pasteInput').value = decoded;
      setBilingualText($('parseMessage'), '手機編碼文字已自動解碼，現在可以預覽。', 'Mobile encoded text was decoded automatically. You can preview it now.');
    }
  }, 0);
});
$('clearButton').addEventListener('click', () => { $('pasteInput').value = ''; $('parseMessage').textContent = ''; $('previewPanel').classList.add('hidden'); });
$('previewButton').addEventListener('click', handlePreview);
['keywordA','keywordB','keywordC'].forEach(id => $(id).addEventListener('input', renderSentences));
['operatorAB','operatorBC'].forEach(id => $(id).addEventListener('change', renderSentences));
$('topicToggle').addEventListener('click', () => {
  const open = !$('topicMenu').classList.contains('hidden');
  $('topicMenu').classList.toggle('hidden', open);
  $('topicToggle').setAttribute('aria-expanded', String(!open));
});
$('topicAll').addEventListener('change', () => {
  const shouldSelectAll = $('topicAll').checked;
  state.selectedCategories = new Set(shouldSelectAll ? state.categories.map(normalizeSearchText) : []);
  $('topicOptions').querySelectorAll('input').forEach(input => { input.checked = shouldSelectAll; });
  updateTopicPicker(); renderSentences();
});
document.addEventListener('click', event => {
  if (!$('topicPicker').contains(event.target)) {
    $('topicMenu').classList.add('hidden');
    $('topicToggle').setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    $('topicMenu').classList.add('hidden');
    $('topicToggle').setAttribute('aria-expanded', 'false');
  }
});
$('saveButton').addEventListener('click', trySaveSentence);
$('confirmDelete').addEventListener('click', submitDeleteSentence);
['confirmMove', 'cancelMove', 'closeMoveConfirm'].forEach(id => {
  const el = $(id);
  if (el) el.addEventListener('click', id === 'confirmMove' ? confirmMove : cancelMove);
});
const moveDlg = $('moveConfirmDialog');
if (moveDlg) moveDlg.addEventListener('cancel', cancelMove);
$('closeDelete').addEventListener('click', () => { pendingDeleteSentence = null; $('deleteDialog').close(); });
$('confirmEdit').addEventListener('click', submitEdit);
$('closeEdit').addEventListener('click', () => { pendingEditSentence = null; setBilingualText($('confirmEdit'), '儲存變更', 'Save changes'); $('editDialog').close(); });
$('closeRitualDoc').addEventListener('click', () => $('ritualDocDialog').close());
['editHindi', 'editChinese', 'editPinyin', 'editRoman', 'editExplanation'].forEach(id => $(id).addEventListener('input', updateEditWarnings));
initPronunciationLab();
loadBank();

/* ================= Course module: 當代中文課程 ================= */
/* 課號規則：1–15 ＝第二冊，101–115 ＝第一冊（第一冊第 X 課記為 100+X），201–212 ＝第三冊（第三冊第 X 課記為 200+X），301–312 ＝第四冊（第四冊第 X 課記為 300+X），501–510 ＝第五冊（第五冊第 X 課記為 500+X）。 */
function bookOf(n) { n = Number(n); return n >= 701 ? 7 : (n >= 601 ? 6 : (n >= 501 ? 5 : (n >= 301 ? 4 : (n >= 201 ? 3 : (n >= 101 ? 1 : 2))))); }
function bookLessonNum(n) { n = Number(n); return n >= 701 ? n - 700 : (n >= 601 ? n - 600 : (n >= 501 ? n - 500 : (n >= 301 ? n - 300 : (n >= 201 ? n - 200 : (n >= 101 ? n - 100 : n))))); }
function lessonLabel(n) {
  const b = bookOf(n), k = bookLessonNum(n);
  if (b === 7) return `第七冊第 ${k} 課`;
  if (b === 6) return `第六冊第 ${k} 課`;
  if (b === 5) return `第五冊第 ${k} 課`;
  if (b === 4) return `第四冊第 ${k} 課`;
  if (b === 3) return `第三冊第 ${k} 課`;
  if (b === 1) return `第一冊第 ${k} 課`;
  return `第二冊第 ${n} 課`;
}
function lessonShortLabel(n) {
  const b = bookOf(n), k = bookLessonNum(n);
  if (b === 7) return `第七冊第${k}課`;
  if (b === 6) return `第六冊第${k}課`;
  if (b === 5) return `第五冊第${k}課`;
  if (b === 4) return `第四冊第${k}課`;
  if (b === 3) return `第三冊第${k}課`;
  if (b === 1) return `第一冊第${k}課`;
  return `第二冊第${n}課`;
}
function bookTitle(n) {
  const b = bookOf(n);
  if (b === 7) return '五百字說華語';
  if (b === 6) return '第六冊';
  if (b === 5) return '第五冊';
  if (b === 4) return '第四冊';
  if (b === 3) return '第三冊';
  if (b === 1) return '第一冊';
  return '第二冊';
}
const COURSE_LESSONS = [
  { n: 101, zh: '歡迎你來臺灣！', en: 'Welcome to Taiwan!', topic: '自我介紹' },
  { n: 102, zh: '我的家人', en: 'My Family', topic: '家人' },
  { n: 103, zh: '週末做什麼？', en: 'What Are You Doing Over the Weekend?', topic: '休閒' },
  { n: 104, zh: '請問一共多少錢？', en: 'Excuse Me. How Much Does That Cost in Total?', topic: '購物' },
  { n: 105, zh: '牛肉麵真好吃', en: 'Beef Noodles Are Really Delicious', topic: '飲食' },
  { n: 106, zh: '他們學校在山上', en: 'Their School Is Up in the Mountains', topic: '方位' },
  { n: 107, zh: '早上九點去KTV', en: "Going to KTV at 9 O'clock in the Morning", topic: '時間' },
  { n: 108, zh: '坐火車去臺南', en: 'Taking a Train to Tainan', topic: '交通' },
  { n: 109, zh: '放假去哪裡玩？', en: 'Where Will You Go for the Holidays?', topic: '假期' },
  { n: 110, zh: '臺灣的水果很好吃', en: 'The Fruit in Taiwan Tastes Really Good', topic: '外貌' },
  { n: 111, zh: '我要租房子', en: 'I Would Like to Rent a Place', topic: '租屋' },
  { n: 112, zh: '你在臺灣學多久的中文？', en: 'How Long Have You Been Studying Chinese in Taiwan?', topic: '學習' },
  { n: 113, zh: '生日快樂', en: 'Happy Birthday', topic: '社交' },
  { n: 114, zh: '天氣這麼冷！', en: "It's So Cold!", topic: '天氣' },
  { n: 115, zh: '我很不舒服', en: "I Don't Feel Well", topic: '生病' },
  { n: 1, zh: '請問，到師大怎麼走？', en: 'Excuse Me. How Do You Get to Shida?', topic: '問路' },
  { n: 2, zh: '還是坐捷運吧！', en: 'Take the MRT Instead!', topic: '交通' },
  { n: 3, zh: '你的中文進步了！', en: 'Your Chinese Has Improved!', topic: '學習' },
  { n: 4, zh: '我打工，我教法文', en: 'I Work Part-Time Teaching French', topic: '打工' },
  { n: 5, zh: '吃喜酒', en: 'Attending a Wedding Banquet', topic: '婚禮' },
  { n: 6, zh: '我打算搬到學校附近', en: 'I Plan to Move Near the School', topic: '搬家' },
  { n: 7, zh: '垃圾車來了！', en: 'The Garbage Truck Is Here!', topic: '環保' },
  { n: 8, zh: '學功夫', en: 'Learning Kung Fu', topic: '運動' },
  { n: 9, zh: '那個城市好漂亮', en: 'That City Is So Beautiful', topic: '旅遊' },
  { n: 10, zh: '歡迎到我家來包餃子', en: 'Welcome to My Home for Dumplings', topic: '飲食' },
  { n: 11, zh: '台灣好玩的地方真多', en: 'Taiwan Has So Many Fun Places', topic: '觀光' },
  { n: 12, zh: '怎麼吃才健康？', en: 'How to Eat Healthily?', topic: '健康' },
  { n: 13, zh: '我的手機掉了', en: 'I Lost My Cell Phone', topic: '意外' },
  { n: 14, zh: '我要開始找工作了', en: "I'm Going to Start Job Hunting", topic: '求職' },
  { n: 15, zh: '過春節', en: 'Celebrating Spring Festival', topic: '節慶' },
  { n: 201, zh: '開學了', en: 'School Is Starting', topic: '開學' },
  { n: 202, zh: '八折起', en: 'Starting at 20% Off', topic: '購物' },
  { n: 203, zh: '外套帶了沒有？', en: 'Did You Bring Your Coat?', topic: '生活' },
  { n: 204, zh: '我愛台灣的人情味', en: 'I Love the Human Touch of Taiwan', topic: '人情' },
  { n: 205, zh: '現在流行什麼？', en: "What's in Fashion Now?", topic: '流行' },
  { n: 206, zh: '到鄉下住一晚！', en: 'A Night in the Countryside!', topic: '鄉村' },
  { n: 207, zh: '我最親的家「人」', en: 'My Closest "Family"', topic: '家庭' },
  { n: 208, zh: '我想做自己', en: 'I Want to Be Myself', topic: '自我' },
  { n: 209, zh: '網購時代', en: 'The Age of Online Shopping', topic: '網購' },
  { n: 210, zh: '我住院了', en: 'I Am in the Hospital', topic: '醫療' },
  { n: 211, zh: '台灣故事', en: 'Stories of Taiwan', topic: '歷史' },
  { n: 212, zh: '我要去投票', en: "I'm Going to Vote", topic: '選舉' },
  { n: 301, zh: '十七歲還是二十五歲？', en: '17 or 25-Years Old?', topic: '網路' },
  { n: 302, zh: '眼睛、耳朵的饗宴', en: 'A Feast for the Eyes and Ears', topic: '藝術' },
  { n: 303, zh: '雲端科技', en: 'Cloud Technology', topic: '科技' },
  { n: 304, zh: '床該擺哪裡？', en: 'Where Should the Bed Go?', topic: '風水' },
  { n: 305, zh: '有夢最美', en: 'Pursuing Your Dreams', topic: '夢想' },
  { n: 306, zh: '天搖地動', en: 'Shaking Heavens and Trembling Earth', topic: '地震' },
  { n: 307, zh: '大學生的事', en: 'College Student Matters', topic: '大學' },
  { n: 308, zh: '他們的選擇', en: 'Their Choice', topic: '家庭' },
  { n: 309, zh: '再談台灣故事', en: 'More on the Story of Taiwan', topic: '歷史' },
  { n: 310, zh: '應徵', en: 'Applying for a Job', topic: '求職' },
  { n: 311, zh: '文化、種族的大熔爐', en: 'The Big Cultural and Ethnic Melting Pot', topic: '文化' },
  { n: 312, zh: '期待美好的未來', en: 'Looking Forward to a Beautiful Future', topic: '未來' },
  { n: 501, zh: '言論自由的界線', en: 'The Boundaries of Free Speech', topic: '言論' },
  { n: 502, zh: '關於基改食品，我有話要說', en: 'Speaking Up About GM Food', topic: '食安' },
  { n: 503, zh: '整型好不好', en: 'Is Plastic Surgery a Good Idea?', topic: '整型' },
  { n: 504, zh: '傳統與現代', en: 'Tradition and Modernity', topic: '文化' },
  { n: 505, zh: '代理孕母，帶來幸福？', en: 'Surrogate Motherhood: Happiness?', topic: '倫理' },
  { n: 506, zh: '死刑的存廢', en: 'The Death Penalty Debate', topic: '死刑' },
  { n: 507, zh: '增富人稅＝減窮人苦？', en: 'Taxing the Rich to Help the Poor?', topic: '稅制' },
  { n: 508, zh: '左右為難的難民問題', en: 'The Refugee Dilemma', topic: '難民' },
  { n: 509, zh: '有核到底可不可？', en: 'Nuclear Power: Yes or No?', topic: '核能' },
  { n: 510, zh: '同性婚姻合法化', en: 'Legalizing Same-Sex Marriage', topic: '婚姻' },
  { n: 601, zh: '職校教育', en: 'Vocational Education', topic: '教育' },
  { n: 602, zh: '科技與生活', en: 'Technology and Life', topic: '科技' },
  { n: 603, zh: '舞蹈藝術', en: 'The Art of Dance', topic: '藝術' },
  { n: 604, zh: '做人與心法', en: 'Being Human and Mindset', topic: '人生' },
  { n: 605, zh: '國際語言', en: 'International Language', topic: '語言' },
  { n: 606, zh: '貓熊角色', en: 'The Panda Role', topic: '貓熊' },
  { n: 607, zh: '感情世界', en: 'The Emotional World', topic: '感情' },
  { n: 608, zh: '奧運黑洞', en: 'The Olympic Black Hole', topic: '奧運' },
  { n: 609, zh: '鄉關何處', en: 'Where Is Home?', topic: '鄉愁' },
  { n: 610, zh: '智慧與能力', en: 'Wisdom and Ability', topic: '智慧' },
  { n: 701, zh: '您早', en: 'Good Morning', topic: '問候', book7: true },
  { n: 702, zh: '您好嗎？', en: 'How Are You?', topic: '問候', book7: true },
  { n: 703, zh: '這是什麼？', en: 'What Is This?', topic: '物品', book7: true },
  { n: 704, zh: '你到哪裡去？', en: 'Where Are You Going?', topic: '方向', book7: true },
  { n: 705, zh: '誰是老師？', en: 'Who Is the Teacher?', topic: '學校', book7: true },
  { n: 706, zh: '幾個學生？', en: 'How Many Students?', topic: '學校', book7: true },
  { n: 707, zh: '學校真大', en: 'The School Is Really Big', topic: '學校', book7: true },
  { n: 708, zh: '差不多', en: 'More or Less', topic: '程度', book7: true },
  { n: 709, zh: '介紹', en: 'Introductions', topic: '社交', book7: true },
  { n: 710, zh: '學了多久？', en: 'How Long Have You Studied?', topic: '學習', book7: true },
  { n: 711, zh: '一星期幾次？', en: 'How Many Times a Week?', topic: '頻率', book7: true },
  { n: 712, zh: '唱華語歌', en: 'Singing Chinese Songs', topic: '娛樂', book7: true },
  { n: 713, zh: '後天幾號？', en: 'What Is the Date the Day After Tomorrow?', topic: '時間', book7: true },
  { n: 714, zh: '隨你的方便', en: 'Whenever Is Convenient for You', topic: '社交', book7: true },
  { n: 715, zh: '你喜歡畫畫嗎？', en: 'Do You Like Drawing?', topic: '興趣', book7: true },
  { n: 716, zh: '到哪裡去買？', en: 'Where to Buy?', topic: '購物', book7: true },
  { n: 717, zh: '多少錢一枝？', en: 'How Much Is One?', topic: '購物', book7: true },
  { n: 718, zh: '來不及了', en: 'Running Late', topic: '時間', book7: true },
  { n: 719, zh: '讓你們久等了', en: 'Sorry to Keep You Waiting', topic: '社交', book7: true },
  { n: 720, zh: '試試看', en: 'Give It a Try', topic: '嘗試', book7: true },
  { n: 721, zh: '打電話', en: 'Making a Phone Call', topic: '電話', book7: true },
  { n: 722, zh: '等他回話', en: 'Waiting for His Reply', topic: '電話', book7: true },
  { n: 723, zh: '怎麼打不通呢？', en: 'Why Can’t I Get Through?', topic: '電話', book7: true },
  { n: 724, zh: '我家有六口人', en: 'Six People in My Family', topic: '家庭', book7: true },
  { n: 725, zh: '到我家來玩', en: 'Come Visit My Home', topic: '家庭', book7: true },
  { n: 726, zh: '迷路', en: 'Lost', topic: '方向', book7: true },
  { n: 727, zh: '怎麼走？', en: 'How Do I Get There?', topic: '方向', book7: true },
  { n: 728, zh: '買衣服', en: 'Buying Clothes', topic: '購物', book7: true },
  { n: 729, zh: '到海邊去', en: 'Going to the Beach', topic: '旅遊', book7: true },
  { n: 730, zh: '孩子多大了？', en: 'How Old Are the Children?', topic: '家庭', book7: true }
];
/* HSK 課程（2026-10-10，大陸教材）。n=801-815 為 HSK 1。 */
const HSK_COURSE_LESSONS = [
  { n: 801, zh: '你好', en: 'Hello', topic: '問候', hsk: 1 },
  { n: 802, zh: '谢谢你', en: 'Thank you', topic: '感謝', hsk: 1 },
  { n: 803, zh: '你叫什么名字', en: "What's your name", topic: '姓名', hsk: 1 },
  { n: 804, zh: '她是我的汉语老师', en: 'She is my Chinese teacher', topic: '介紹', hsk: 1 },
  { n: 805, zh: '她女儿今年二十岁', en: 'Her daughter is 20 years old this year', topic: '年齡', hsk: 1 },
  { n: 806, zh: '我会说汉语', en: 'I can speak Chinese', topic: '語言', hsk: 1 },
  { n: 807, zh: '今天几号', en: "What's the date today", topic: '日期', hsk: 1 },
  { n: 808, zh: '我想喝茶', en: "I'd like some tea", topic: '飲食', hsk: 1 },
  { n: 809, zh: '你儿子在哪儿工作', en: 'Where does your son work', topic: '工作', hsk: 1 },
  { n: 810, zh: '我能坐这儿吗', en: 'Can I sit here', topic: '請求', hsk: 1 },
  { n: 811, zh: '现在几点', en: "What's the time now", topic: '時間', hsk: 1 },
  { n: 812, zh: '明天天气怎么样', en: 'What will the weather be like tomorrow', topic: '天氣', hsk: 1 },
  { n: 813, zh: '他在学做中国菜呢', en: 'He is learning to cook Chinese food', topic: '學習', hsk: 1 },
  { n: 814, zh: '她买了不少衣服', en: 'She has bought quite a few clothes', topic: '購物', hsk: 1 },
  { n: 815, zh: '我是坐飞机来的', en: 'I came here by air', topic: '交通', hsk: 1 },
];
/* 合併到 COURSE_LESSONS，方便現有課程邏輯直接使用。 */
HSK_COURSE_LESSONS.forEach(l => COURSE_LESSONS.push(l));
const COURSE_TABS = ['課文', '生詞', '語法', '練習', '文化', '溫習', '應用', '補充'];
/* 分頁籤顯示用英文（內部 key 保持中文）。 */
const COURSE_TAB_EN = { '課文': 'Text', '生詞': 'Vocabulary', '語法': 'Grammar', '練習': 'Practice', '文化': 'Culture', '溫習': 'Review', '應用': 'Application', '補充': 'Supplement' };
const COURSE_PACK_LESSONS = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610];

/* ---- 中文歌曲（V4 歌曲區）：自製 MV＋逐句歌詞教學 ----
   影片在 Firebase Storage 的 songs/ 下（公開讀取），歌詞去重後內嵌。
   踏浪「請你們歇歇腳呀,暫時停下來」重複出現，只保留一筆。
   每句歌詞為完整句子物件（含拼音＋16 語翻譯＋解說），用 createCard() 渲染，
   與課文句子卡功能完全相同（發音、錄音、語言切換皆可用）。 */
const V4_SONGS = [
  {
    id: 'youai',
    title: '有愛',
    videoType: 'youtube',
    youtubeId: 'cqv_yBLwmjw',
    lines: [
      { zh: '有愛勇敢跨出來', py: 'yǒu ài yǒng gǎn kuà chū lái' },
      { zh: '有愛大家一起來', py: 'yǒu ài dà jiā yì qǐ lái' },
      { zh: '有愛深入自明白', py: 'yǒu ài shēn rù zì míng bái' },
      { zh: '有愛投入是應該', py: 'yǒu ài tóu rù shì yīng gāi' },
      { zh: '成己成人切磋揣', py: 'chéng jǐ chéng rén qiē cuō chuǎi' },
      { zh: '達己達人步步邁', py: 'dá jǐ dá rén bù bù mài' },
      { zh: '有愛沒有災', py: 'yǒu ài méi yǒu zāi' },
      { zh: '有愛無傷害', py: 'yǒu ài wú shāng hài' },
      { zh: '有愛化陰霾', py: 'yǒu ài huà yīn mái' },
      { zh: '人生路撥雲見日開', py: 'rén shēng lù bō yún jiàn rì kāi' },
      { zh: '修道路活躍通四海', py: 'xiū dào lù huó yuè tōng sì hǎi' },
      { zh: '暢達無阻礙', py: 'chàng dá wú zǔ ài' },
      { zh: '醍醐得灌溉', py: 'tí hú dé guàn gài' },
      { zh: '法喜滿胸懷', py: 'fǎ xǐ mǎn xiōng huái' },
      { zh: '吉祥如意栽', py: 'jí xiáng rú yì zāi' },
      { zh: '萬事平安泰', py: 'wàn shì píng ān tài' },
      { zh: '天人共喝采', py: 'tiān rén gòng hè cǎi' },
    ],
  },
  {
    id: 'talang',
    title: '踏浪',
    videoType: 'storage',
    videoPath: 'songs/踏浪.mp4',
    lines: [
      { zh: '小小的一片雲呀,慢慢地走過來', py: 'xiǎo xiǎo de yī piàn yún ya, màn màn de zǒu guò lái' },
      { zh: '請你們歇歇腳呀,暫時停下來', py: 'qǐng nǐ men xiē xie jiǎo ya, zàn shí tíng xià lái' },
      { zh: '山上的山花兒開呀,我才到山上來', py: 'shān shàng de shān huā er kāi ya, wǒ cái dào shān shàng lái' },
      { zh: '原來嘛你也是上山看那山花兒開', py: 'yuán lái ma nǐ yě shì shàng shān kàn nà shān huā er kāi' },
      { zh: '小小的一陣風呀慢慢地走過來', py: 'xiǎo xiǎo de yī zhèn fēng ya màn màn de zǒu guò lái' },
      { zh: '海上的浪花開呀我才到海邊來', py: 'hǎi shàng de làng huā kāi ya wǒ cái dào hǎi biān lái' },
      { zh: '原來嘛你也愛浪花才到海邊來', py: 'yuán lái ma nǐ yě ài làng huā cái dào hǎi biān lái' },
    ],
  },
  {
    id: 'xiaoxingxing',
    title: '小星星',
    videoType: 'youtube',
    youtubeId: '8_lmeiVtRnU',
    lines: [
      { zh: '一閃一閃亮晶晶,滿天都是小星星', py: 'yī shǎn yī shǎn liàng jīng jīng, mǎn tiān dōu shì xiǎo xīng xing' },
      { zh: '掛在天上放光明,好像許多小眼睛', py: 'guà zài tiān shàng fàng guāng míng, hǎo xiàng xǔ duō xiǎo yǎn jing' },
    ],
  },
  {
    id: 'xiaolaoshu',
    title: '小老鼠',
    videoType: 'youtube',
    youtubeId: '7gQIYMhmCXY',
    lines: [
      { zh: '小老鼠，上燈台', py: 'xiǎo lǎo shǔ, shàng dēng tái' },
      { zh: '偷油吃，下不來', py: 'tōu yóu chī, xià bù lái' },
      { zh: '喵喵喵，貓來了', py: 'miāo miāo miāo, māo lái le' },
      { zh: '嘰哩咕嚕滾下來', py: 'jī lī gū lū gǔn xià lái' },
    ],
  },
  {
    id: 'wodejia',
    title: '我的家',
    videoType: 'youtube',
    youtubeId: 'A9Y9Lqq9Fag',
    lines: [
      { zh: '我家門前有小河，後面有山坡；', py: 'wǒ jiā mén qián yǒu xiǎo hé, hòu miàn yǒu shān pō;' },
      { zh: '山坡上面野花多，野花紅似火。', py: 'shān pō shàng miàn yě huā duō, yě huā hóng sì huǒ.' },
      { zh: '小河裡，有白鵝，', py: 'xiǎo hé lǐ, yǒu bái é,' },
      { zh: '鵝兒戲綠波；', py: 'é er xì lǜ bō;' },
      { zh: '戲弄綠波，鵝兒快樂，', py: 'xì nòng lǜ bō, é er kuài lè,' },
      { zh: '昂首唱清歌。', py: 'áng shǒu chàng qīng gē.' },
    ],
  },
  {
    id: 'molihua',
    title: '茉莉花',
    videoType: 'youtube',
    youtubeId: 'n66vlWaV6rQ',
    lines: [
      { zh: '好一朵美麗的茉莉花，', py: 'hǎo yī duǒ měi lì de mò lì huā,' },
      { zh: '芬芳美麗滿枝椏，', py: 'fēn fāng měi lì mǎn zhī yā,' },
      { zh: '又白又香人人誇，', py: 'yòu bái yòu xiāng rén rén kuā,' },
      { zh: '讓我來將你摘下，送給別人家，', py: 'ràng wǒ lái jiāng nǐ zhāi xià, sòng gěi bié rén jiā,' },
      { zh: '茉莉花啊茉莉花。', py: 'mò lì huā a mò lì huā.' },
    ],
  },
  {
    id: 'zhuaniqiu',
    title: '抓泥鰍',
    videoType: 'youtube',
    youtubeId: '7j2tm3gEvYc',
    lines: [
      { zh: '池塘的水滿了,雨也停了', py: 'chí táng de shuǐ mǎn le, yǔ yě tíng le' },
      { zh: '田邊的稀泥裡到處是泥鰍', py: 'tián biān de xī ní lǐ dào chù shì ní qiū' },
      { zh: '天天我等著你,等著你捉泥鰍', py: 'tiān tiān wǒ děng zhe nǐ, děng zhe nǐ zhuō ní qiū' },
      { zh: '大哥哥好不好咱們去捉泥鰍?', py: 'dà gē ge hǎo bù hǎo zán men qù zhuō ní qiū?' },
      { zh: '小牛的哥哥帶著他捉泥鰍', py: 'xiǎo niú de gē ge dài zhe tā zhuō ní qiū' },
    ],
  },
  {
    id: 'zaofeiji',
    title: '造飛機',
    videoType: 'youtube',
    youtubeId: 'eFt5haezIEc',
    lines: [
      { zh: '造飛機，造飛機，來到青草地', py: 'zào fēi jī, zào fēi jī, lái dào qīng cǎo dì' },
      { zh: '蹲下去，蹲下去，我做推進器', py: 'dūn xià qù, dūn xià qù, wǒ zuò tuī jìn qì' },
      { zh: '蹲下去，蹲下去，你做飛機翼', py: 'dūn xià qù, dūn xià qù, nǐ zuò fēi jī yì' },
      { zh: '彎著腰，彎著腰，飛機做得奇', py: 'wān zhe yāo, wān zhe yāo, fēi jī zuò de qí' },
      { zh: '飛上去，飛上去，飛到白雲裡', py: 'fēi shàng qù, fēi shàng qù, fēi dào bái yún lǐ' },
    ],
  },
  {
    id: 'poshuige',
    title: '潑水歌',
    videoType: 'youtube',
    youtubeId: 'GnXGAjbWk78',
    lines: [
      { zh: '昨天我打從你門前過,你正提著水桶往外潑', py: 'zuó tiān wǒ dǎ cóng nǐ mén qián guò, nǐ zhèng tí zhe shuǐ tǒng wǎng wài pō' },
      { zh: '潑在我的皮鞋上,路上的行人笑呵呵呵', py: 'pō zài wǒ de pí xié shàng, lù shàng de xíng rén xiào hē hē hē' },
      { zh: '你什麼話也沒有對我說', py: 'nǐ shén me huà yě méi yǒu duì wǒ shuō' },
      { zh: '你只是瞇著眼睛望著我', py: 'nǐ zhǐ shì mī zhe yǎn jing wàng zhe wǒ' },
      { zh: '嚕啦啦 嚕啦啦 嚕啦嚕拉勒', py: 'lū lā lā lū lā lā lū lā lū lā lè' },
      { zh: '嚕啦 嚕啦 嚕啦 嚕啦嚕啦勒', py: 'lū lā lū lā lū lā lū lā lū lā lè' },
      { zh: '嚕啦 嚕啦 嚕啦勒', py: 'lū lā lū lā lū lā lè' },
    ],
  },
  {
    id: 'buyuge',
    title: '捕魚歌',
    videoType: 'storage',
    videoPath: 'songs/捕魚歌.mp4',
    lines: [
      { zh: '白浪滔滔我不怕', py: 'bái làng tāo tāo wǒ bù pà' },
      { zh: '掌起舵兒往前划', py: 'zhǎng qǐ duò er wǎng qián huá' },
      { zh: '撒網下水到漁家啊', py: 'sā wǎng xià shuǐ dào yú jiā a' },
      { zh: '捕條大魚笑哈哈', py: 'bǔ tiáo dà yú xiào hā hā' },
      { zh: '嗨喲一喲一喲哼嗨喲', py: 'hāi yō yī yō yī yō hēng hāi yō' },
    ],
  },
  {
    id: 'zhufuge',
    title: '祝福歌',
    videoType: 'youtube',
    youtubeId: 'k5jV5dcKJvo',
    lines: [
      { zh: '朋友我永遠祝福您！', py: 'péng you wǒ yǒng yuǎn zhù fú nín!' },
      { zh: '朋友我永遠祝福您！', py: 'péng you wǒ yǒng yuǎn zhù fú nín!' },
      { zh: '祝福您健康！', py: 'zhù fú nín jiàn kāng!' },
      { zh: '祝福您快樂！', py: 'zhù fú nín kuài lè!' },
      { zh: '朋友我永遠祝福您！', py: 'péng you wǒ yǒng yuǎn zhù fú nín!' },
    ],
  },
  {
    id: 'lanhuacao',
    title: '蘭花草',
    videoType: 'storage',
    videoPath: 'songs/蘭花草.mp4',
    lines: [
      { zh: '我從山中來，帶著蘭花草；', py: 'wǒ cóng shān zhōng lái, dài zhe lán huā cǎo;' },
      { zh: '種在小園中，希望花開早。', py: 'zhòng zài xiǎo yuán zhōng, xī wàng huā kāi zǎo.' },
      { zh: '一日看三回，看得花時過；', py: 'yī rì kàn sān huí, kàn de huā shí guò;' },
      { zh: '蘭花卻依然，苞也無一個？', py: 'lán huā què yī rán, bāo yě wú yī gè?' },
      { zh: '轉眼秋天到，移蘭入暖房；', py: 'zhuǎn yǎn qiū tiān dào, yí lán rù nuǎn fáng;' },
      { zh: '朝朝頻顧惜、夜夜不相忘。', py: 'zhāo zhāo pín gù xī, yè yè bù xiāng wàng.' },
      { zh: '期待春花開，能將宿願償；', py: 'qī dài chūn huā kāi, néng jiāng sù yuàn cháng;' },
      { zh: '滿庭花簇簇，開得許多香。', py: 'mǎn tíng huā cù cù, kāi de xǔ duō xiāng.' },
    ],
  },
  {
    id: 'huanyingge',
    title: '歡迎歌',
    videoType: 'youtube',
    youtubeId: 'skPlTOIDTNU',
    lines: [
      { zh: '真正高興的見到您', py: 'zhēn zhèng gāo xìng de jiàn dào nín' },
      { zh: '滿心歡喜地歡迎您', py: 'mǎn xīn huān xǐ de huān yíng nín' },
      { zh: '歡迎！歡迎！', py: 'huān yíng! huān yíng!' },
      { zh: '我們歡迎您！', py: 'wǒ men huān yíng nín!' },
    ],
  },
  {
    id: 'liangzhilaohu',
    title: '兩隻老虎',
    videoType: 'youtube',
    youtubeId: 'kUh93CKtkmI',
    lines: [
      { zh: '兩隻老虎，兩隻老虎，', py: 'liǎng zhī lǎo hǔ, liǎng zhī lǎo hǔ,' },
      { zh: '跑得快，跑得快，', py: 'pǎo de kuài, pǎo de kuài,' },
      { zh: '一隻沒有耳朵，一隻沒有尾巴，', py: 'yī zhī méi yǒu ěr duo, yī zhī méi yǒu wěi ba,' },
      { zh: '真奇怪！真奇怪！', py: 'zhēn qí guài! zhēn qí guài!' },
    ],
  },
  {
    id: 'weishengmingjiazhi',
    title: '為生命加值',
    videoType: 'youtube',
    youtubeId: '1TkYPTGN9kI',
    lines: [
      { zh: '生命沒有例外，但問自己如何培栽', py: 'shēng mìng méi yǒu lì wài，dàn wèn zì jǐ rú hé péi zāi' },
      { zh: '價值沒有得買，但問自己如何開採', py: 'jià zhí méi yǒu dé mǎi，dàn wèn zì jǐ rú hé kāi cǎi' },
      { zh: '人生不重來，好戲即刻開拍', py: 'rén shēng bú zhòng lái，hǎo xì jí kè kāi pāi' },
      { zh: '雖然沒有氣派，但我有氣概', py: 'suī rán méi yǒu qì pài，dàn wǒ yǒu qì gài' },
      { zh: '脾氣毛病改，謹慎謙恭藹', py: 'pí qì máo bìng gǎi，jǐn shèn qiān gōng ǎi' },
      { zh: '積極向前邁', py: 'jī jí xiàng qián mài' },
      { zh: '雖然沒有錢財，但我有長才', py: 'suī rán méi yǒu qián cái，dàn wǒ yǒu zhǎng cái' },
      { zh: '精進不懈怠，思路不阻塞', py: 'jīng jìn bú xiè dài，sī lù bù zǔ sè' },
      { zh: '事事不依賴', py: 'shì shì bù yī lài' },
      { zh: '心中有主宰，敬重小事心恆耐', py: 'xīn zhōng yǒu zhǔ zǎi，jìng zhòng xiǎo shì xīn héng nài' },
      { zh: '一言一語，都合乎道的風采', py: 'yì yán yí yǔ，dōu hé hū dào de fēng cǎi' },
      { zh: '寬廣拓展開，把握當下不留白', py: 'kuān guǎng tuò zhǎn kāi，bǎ wò dāng xià bù liú bái' },
      { zh: '一舉一動都做到最精彩', py: 'yí jǔ yí dòng dōu zuò dào zuì jīng cǎi' },
    ],
  },
  {
    id: 'woniu',
    title: '蝸牛與黃鸝鳥',
    videoType: 'youtube',
    youtubeId: 'hnkDF7ZsKJg',
    lines: [
      { zh: '阿門 阿前 一棵葡萄樹', py: 'ā mén ā qián yī kē pú táo shù' },
      { zh: '阿嫩 阿嫩 綠的剛發芽', py: 'ā nèn ā nèn lǜ de gāng fā yá' },
      { zh: '蝸牛背著那重重的殼', py: 'wō niú bēi zhe nà zhòng zhòng de ké' },
      { zh: '一步一步地往上爬', py: 'yī bù yī bù de wǎng shàng pá' },
      { zh: '阿樹 阿上 兩隻黃鸝鳥', py: 'ā shù ā shàng liǎng zhī huáng lí niǎo' },
      { zh: '阿嘻 阿嘻哈哈 在笑它', py: 'ā xī ā xī hā hā zài xiào tā' },
      { zh: '葡萄成熟還早地很呀', py: 'pú táo chéng shú hái zǎo de hěn ya' },
      { zh: '現在上來要幹什麼', py: 'xiàn zài shàng lái yào gàn shén me' },
      { zh: '阿黃 阿黃鸝鳥 不要笑', py: 'ā huáng ā huáng lí niǎo bù yào xiào' },
      { zh: '等我爬上它就成熟了', py: 'děng wǒ pá shàng tā jiù chéng shú le' },
    ],
  },
  {
    id: 'tingwoshuo',
    title: '聽我說謝謝你',
    videoType: 'youtube',
    youtubeId: '8JqTMsTWngM',
    lines: [
      { zh: '送給你小心心', py: 'sòng gěi nǐ xiǎo xīn xīn' },
      { zh: '送你花一朵', py: 'sòng nǐ huā yī duǒ' },
      { zh: '你在我生命中,太多的感動', py: 'nǐ zài wǒ shēng mìng zhōng, tài duō de gǎn dòng' },
      { zh: '你是我的天使,一路指引我', py: 'nǐ shì wǒ de tiān shǐ, yī lù zhǐ yǐn wǒ' },
      { zh: '無論歲月變幻,愛你唱成歌', py: 'wú lùn suì yuè biàn huàn, ài nǐ chàng chéng gē' },
      { zh: '聽我說謝謝你', py: 'tīng wǒ shuō xiè xie nǐ' },
      { zh: '因為有你,溫暖了四季', py: 'yīn wèi yǒu nǐ, wēn nuǎn le sì jì' },
      { zh: '謝謝你!', py: 'xiè xie nǐ!' },
      { zh: '感謝有你', py: 'gǎn xiè yǒu nǐ' },
      { zh: '世界更美麗', py: 'shì jiè gèng měi lì' },
      { zh: '我要謝謝你', py: 'wǒ yào xiè xie nǐ' },
      { zh: '因為有你', py: 'yīn wèi yǒu nǐ' },
      { zh: '愛常在心底', py: 'ài cháng zài xīn dǐ' },
      { zh: '把幸福傳遞', py: 'bǎ xìng fú chuán dì' },
    ],
  },
  {
    id: 'yuer',
    title: '魚兒魚兒水中游',
    videoType: 'youtube',
    youtubeId: 'IVj3zU6WnwQ',
    lines: [
      { zh: '魚兒魚兒水中游，', py: 'yú er yú er shuǐ zhōng yóu,' },
      { zh: '游來游去樂悠悠。', py: 'yóu lái yóu qù lè yōu yōu.' },
      { zh: '倦了臥水草，', py: 'juàn le wò shuǐ cǎo,' },
      { zh: '餓了覓小蟲。', py: 'è le mì xiǎo chóng.' },
      { zh: '樂悠悠，樂悠悠，', py: 'lè yōu yōu, lè yōu yōu,' },
      { zh: '水晶世界真自由。', py: 'shuǐ jīng shì jiè zhēn zì yóu.' },
    ],
  },
  {
    id: 'nixiaoqilai',
    title: '你笑起來真好看',
    videoType: 'youtube',
    youtubeId: 'oS9kCw-TTs8',
    lines: [
      { zh: '想去遠方的山川', py: 'xiǎng qù yuǎn fāng de shān chuān' },
      { zh: '想去海邊看海鷗', py: 'xiǎng qù hǎi biān kàn hǎi ōu' },
      { zh: '不管風雨有多少', py: 'bù guǎn fēng yǔ yǒu duō shǎo' },
      { zh: '有你就足夠', py: 'yǒu nǐ jiù zú gòu' },
      { zh: '喜歡看你的嘴角', py: 'xǐ huān kàn nǐ de zuǐ jiǎo' },
      { zh: '喜歡看你的眉梢', py: 'xǐ huān kàn nǐ de méi shāo' },
      { zh: '白雲掛在那藍天', py: 'bái yún guà zài nà lán tiān' },
      { zh: '像你的微笑', py: 'xiàng nǐ de wēi xiào' },
      { zh: '你笑起來真好看', py: 'nǐ xiào qǐ lái zhēn hǎo kàn' },
      { zh: '像春天的花一樣', py: 'xiàng chūn tiān de huā yī yàng' },
      { zh: '把所有的煩惱所有的憂愁', py: 'bǎ suǒ yǒu de fán nǎo suǒ yǒu de yōu chóu' },
      { zh: '統統都吹散', py: 'tǒng tǒng dōu chuī sàn' },
      { zh: '像夏天的陽光', py: 'xiàng xià tiān de yáng guāng' },
      { zh: '整個世界全部的時光', py: 'zhěng gè shì jiè quán bù de shí guāng' },
      { zh: '美得像畫卷', py: 'měi de xiàng huà juàn' },
    ],
  },
  {
    id: 'miaojijingshen-hindi',
    title: '妙極精神(Hindi版)',
    videoType: 'youtube',
    youtubeId: 'I39L20xlwe0',
    /* 印地文專屬歌曲：僅在選擇印地文時顯示於最後，不參與排序編號。 */
    hindiOnly: true,
    lines: [
      { zh: '「樞紐」為我們付出特別的愛', py: '「shū niǔ」wèi wǒ men fù chū tè bié de ài',
        i18n: { hi: { s: 'Shuniu ne diya humein vishesh prem', r: 'Shuniu ne diya humein vishesh prem',
          e: 'Shuniu Bao Guang Chong Zheng Dao Chang ke Hui Ming ke uttaradhikari aur Dao Chang ke neta hain. Unhone humein bahut vishesh prem diya hai.' } } },
      { zh: '他的恩澤深如大河之壩', py: 'tā de ēn zé shēn rú dà hé zhī bà',
        i18n: { hi: { s: 'Uska ehsaan gehra jaise dariya ka khem', r: 'Uska ehsaan gehra jaise dariya ka khem',
          e: 'Unke upkar bahut gehre hain, jaise badi nadi ka bandh. Hum unke rini hain.' } } },
      { zh: '一滴水成了泉源，帶來了寶藏', py: 'yī dī shuǐ chéng le quán yuán，dài lái le bǎo cáng',
        i18n: { hi: { s: 'Boond ne diya jharna ban kar dhan', r: 'Boond ne diya jharna ban kar dhan',
          e: 'Ek boond ne jharna ban kar humein dhan diya. Chhoti si kripa bhi mahaan ban sakti hai.' } } },
      { zh: '為了報恩，我的心奔跑不息', py: 'wèi le bào ēn，wǒ de xīn bēn pǎo bù xī',
        i18n: { hi: { s: 'Rinn chukane ko daudta hoon main man', r: 'Rinn chukane ko daudta hoon main man',
          e: 'Rinn chukane ke liye mera man daudta hai. Humein Shuniu ke upkar ka badla chukana chahiye.' } } },
      { zh: '他跨越大海，帶著誓願前行', py: 'tā kuà yuè dà hǎi，dài zhù shì yuàn qián xíng',
        i18n: { hi: { s: 'Samundar paar le gaya apna vachan', r: 'Samundar paar le gaya apna vachan',
          e: 'Unhone samundar paar kiya, apne vachan ko lekar. Dao ke prachar ke liye unhone kathin yatra ki.' } } },
      { zh: '他所承受的痛苦，都是為了慈悲的使命', py: 'tā suǒ chéng shòu de tòng kǔ，dōu shì wèi le cí bēi de shǐ mìng',
        i18n: { hi: { s: 'Dukh saha sab kuch keval daya mein rachan', r: 'Dukh saha sab kuch keval daya mein rachan',
          e: 'Unhone jo dukh saha, woh keval daya ke mission ke liye tha. Karuna se unhone sab sahan kiya.' } } },
      { zh: '流過的血與淚，誰能真正體會', py: 'liú guò de xuè yǔ lèi，shuí néng zhēn zhèng tǐ huì',
        i18n: { hi: { s: 'Khoon aur aansu baha, kisne jaana', r: 'Khoon aur aansu baha, kisne jaana',
          e: 'Unhone khoon aur aansu bahaye, lekin kisne jana? Unke tyag ko koi poori tarah nahi samajh saka.' } } },
      { zh: '那滿懷慈悲的記憶，我們要銘記在心', py: 'nà mǎn huái cí bēi de jì yì，wǒ men yào míng jì zài xīn',
        i18n: { hi: { s: 'Karuna bhari yaadein, dil mein nibhaana', r: 'Karuna bhari yaadein, dil mein nibhaana',
          e: 'Karuna se bhari yaadon ko humein dil mein nibhana chahiye. Unki shiksha ko hamesha yaad rakhen.' } } },
    ],
  },
  {
    id: 'woshiyinduren',
    title: '我是印度人',
    videoType: 'youtube',
    youtubeId: 'Fxns_NVhhWg',
    /* 印地文專屬歌曲：僅在選擇印地文時顯示於最後，不參與排序編號。 */
    hindiOnly: true,
    lines: [
      { zh: '我是印度人，正在學中文', py: 'wǒ shì yìn dù rén，zhèng zài xué zhōng wén' },
      { zh: '一二三四五，你我大家好', py: 'yī èr sān sì wǔ，nǐ wǒ dà jiā hǎo' },
      { zh: '六七八九十，平安你好嗎', py: 'liù qī bā jiǔ shí，píng ān nǐ hǎo ma' },
      { zh: '我是印度人，同學老師好', py: 'wǒ shì yìn dù rén，tóng xué lǎo shī hǎo' },
      { zh: '高興認識你，天天都快樂', py: 'gāo xìng rèn shí nǐ，tiān tiān dōu kuài lè' },
    ],
  },
  {
    id: 'zhuanihiu-hindi',
    title: '抓泥鰍Hindi',
    videoType: 'youtube',
    youtubeId: 'oBFvaV6WDDI',
    /* 印地文專屬歌曲（無歌詞卡）：僅在選擇印地文時顯示於最後，不參與排序編號。 */
    hindiOnly: true,
    lines: [],
  },
  {
    id: 'woniu-hindi',
    title: '蝸牛與黃鸝鳥Hindi',
    videoType: 'youtube',
    youtubeId: '2_9gyaHhhAg',
    /* 印地文專屬歌曲（無歌詞卡）：僅在選擇印地文時顯示於最後，不參與排序編號。 */
    hindiOnly: true,
    lines: [],
  }
];

/* 合併歌曲翻譯：v4-songs-i18n.js 的 V4_SONGS_I18N 寫入各行 line.i18n。 */
if (typeof V4_SONGS_I18N !== 'undefined') {
  V4_SONGS.forEach(song => {
    const arr = V4_SONGS_I18N[song.id];
    if (!arr) return;
    song.lines.forEach((line, i) => { if (arr[i]) line.i18n = arr[i]; });
  });
}

/* 歌詞行轉句子物件：供 createCard() 使用；搜尋時亦納入（見 renderBank 歌曲搜尋段）。 */
function songLineToSentence(song, line, idx) {
  const recordId = `song-${song.id}-${idx + 1}`;
  const s = {
    chineseSentence: line.zh,
    pinyin: line.py,
    hindiSentence: (line.i18n && line.i18n.hi && line.i18n.hi.s) || '',
    romanHindi: (line.i18n && line.i18n.hi && line.i18n.hi.r) || '',
    hindiExplanation: (line.i18n && line.i18n.hi && line.i18n.hi.e) || '',
    i18n: line.i18n || {},
    category: '歌曲',
    tags: `中文歌曲,${song.title}`,
    recordId,
    /* seq: 0 讓 isCourseRecord() 判為 true，語言切換才會讀 i18n；歌詞物件即時產生、不進 bank，無副作用。 */
    seq: 0,
  };
  /* 套用老師個人錄音覆寫（若曾錄過此句）。 */
  const ov = (typeof state !== 'undefined' && state.overlayMap) ? state.overlayMap.get(recordId) : null;
  if (ov) {
    if (ov.audioPath) { s.audioPath = ov.audioPath; s.standardAudioUrl = ov.audioPath; }
    if (ov.audioMime) s.audioMime = ov.audioMime;
  }
  return s;
}

const courseState = { lesson: 0, tab: '課文', song: null, ritual: null, ritualGroup: null, page: 'home' };

/* 課程解鎖＝老師審核通過（Google 登入＋管理員核准），取代舊的 PIN。 */
function isCourseUnlocked() {
  return !!(window.V4_ACCESS && window.V4_ACCESS.status === 'approved');
}

/* 依審核狀態更新課程鎖定區的說明文字。 */
function updateCourseLockMessage() {
  const msg = $('courseLockMessage');
  if (!msg) return;
  const status = (window.V4_ACCESS && window.V4_ACCESS.status) || 'checking';
  const map = {
    checking: ['正在確認登入狀態…', 'Checking sign-in status…'],
    'signed-out': ['', ''],
    pending: ['已送出老師申請，等待管理員核准。核准後重新整理頁面即可解鎖課程。', 'Teacher application submitted, waiting for admin approval. Refresh the page after approval to unlock the course.'],
    rejected: ['申請未通過，請聯繫管理員。', 'Application was not approved. Please contact the administrator.'],
    suspended: ['帳號目前暫停使用，請聯繫管理員。', 'This account is currently suspended. Please contact the administrator.'],
    error: ['身分確認失敗，請重新整理頁面再試。', 'Identity check failed. Please refresh the page and try again.'],
    approved: ['', '']
  };
  const pair = map[status] || ['', ''];
  setBilingualText(msg, pair[0], pair[1]);
  msg.style.display = (pair[0] || pair[1]) ? '' : 'none';
}

/* 登入狀態變化時重繪課程區（解鎖／上鎖即時反應），並重載個人資料層。 */
window.addEventListener('v4-access-changed', () => {
  updateCourseLockMessage();
  if (typeof renderCourse === 'function') renderCourse();
  if (typeof refreshPersonalLayer === 'function') refreshPersonalLayer();
});

/* HSK 句庫載入（2026-10-10）：大陸教材專用，格式相容 v4-bank。 */
let hskBankCache = null;
async function loadHskBank() {
  if (hskBankCache) return hskBankCache;
  const url = await getBankFileUrl('v4-hsk/v4-hsk1-bank.json');
  const r = await fetch(url);
  if (!r.ok) throw new Error('HSK bank ' + r.status);
  const data = await r.json();
  const fields = Object.keys(data.f).sort((a, b) => data.f[a] - data.f[b]);
  hskBankCache = data.rows.map(row => vbankRowToSentence(fields, row, state.sourceLanguage || 'hi'));
  return hskBankCache;
}
function lessonRecords(n) {
  const key = String(n);
  /* HSK 課程（801-815）：從 HSK 快取取，否則從主句庫取。 */
  if (n >= 801 && n <= 815 && hskBankCache) {
    return hskBankCache.filter(s => courseMeta(s).lesson === key);
  }
  return state.sentences.filter(s => courseMeta(s).lesson === key);
}

/* ---- 使用統計：老師登入登出＋頁面停留（管理員儀表板，2026-10-07） ----
   每個 session 在 v4_analytics_sessions 寫一筆：
   登入時建立（含帳號、時間），心跳每 5 分鐘更新進度，登出／關頁時結算。
   上次沒正常登出的 session，下次登入時自動結算（orphanClosed）。
   流量為估算值：bankDownloaded＝本次真的下載了句庫 JSON（非快取命中）。 */
const ANALYTICS_COL = 'v4_analytics_sessions';
const analytics = {
  sessionId: null, uid: '', loginAt: 0,
  currentSection: '', sectionEnterAt: 0, sections: [],
  bankDownloaded: false, bankLang: '', heartbeatTimer: null
};
function analyticsSectionName() {
  try {
    if (courseState.lesson > 0) return '課本';
    if (courseState.song) return '歌曲';
    if (courseState.ritual) return '禮節';
    const p = courseState.page;
    if (p === 'books') return '課本';
    if (p === 'songs') return '歌曲';
    if (p === 'rituals' || p === 'ritual-group' || p === 'ritual-subgroup') return '禮節';
  } catch (_) {}
  return '首頁';
}
function analyticsCloseSection(now) {
  if (analytics.currentSection && analytics.sectionEnterAt) {
    analytics.sections.push({
      name: analytics.currentSection,
      enterAt: new Date(analytics.sectionEnterAt),
      exitAt: new Date(now),
      seconds: Math.max(0, Math.round((now - analytics.sectionEnterAt) / 1000))
    });
  }
  analytics.currentSection = '';
  analytics.sectionEnterAt = 0;
}
function analyticsTrackSection() {
  if (!analytics.sessionId) return;
  const name = analyticsSectionName();
  if (name === analytics.currentSection) return;
  const now = Date.now();
  analyticsCloseSection(now);
  analytics.currentSection = name;
  analytics.sectionEnterAt = now;
}
function analyticsSnapshot() {
  const now = Date.now();
  return {
    sections: analytics.sections.slice(),
    durationSec: Math.max(0, Math.round((now - analytics.loginAt) / 1000)),
    bankDownloaded: analytics.bankDownloaded,
    bankLang: analytics.bankLang
  };
}
function analyticsSaveProgress() {
  if (!analytics.sessionId) return;
  const snap = analyticsSnapshot();
  try {
    fbDb.collection(ANALYTICS_COL).doc(analytics.sessionId).update({
      sections: snap.sections,
      durationSec: snap.durationSec,
      bankDownloaded: snap.bankDownloaded,
      bankLang: snap.bankLang
    }).catch(function () {});
  } catch (_) {}
}
function analyticsCloseOrphans(uid) {
  try {
    fbDb.collection(ANALYTICS_COL)
      .where('uid', '==', uid)
      .get().then(function (qsnap) {
        qsnap.forEach(function (doc) {
          if (doc.id === analytics.sessionId) return;
          const d = doc.data() || {};
          if (d.logoutAt) return; /* 已結算，跳過（單一欄位查詢免複合索引） */
          const loginMs = (d.loginAt && d.loginAt.toMillis) ? d.loginAt.toMillis() : 0;
          const dur = loginMs ? Math.max(0, Math.round((Date.now() - loginMs) / 1000)) : 0;
          doc.ref.update({ logoutAt: new Date(), durationSec: dur, orphanClosed: true }).catch(function () {});
        });
      }).catch(function () {});
  } catch (_) {}
}
function analyticsStartSession(user) {
  const uid = user.uid;
  const now = Date.now();
  analyticsCloseOrphans(uid);
  analytics.sessionId = uid + '_' + now;
  analytics.uid = uid;
  analytics.loginAt = now;
  analytics.currentSection = '';
  analytics.sectionEnterAt = 0;
  analytics.sections = [];
  analytics.bankDownloaded = false;
  analytics.bankLang = '';
  analyticsTrackSection();
  try {
    fbDb.collection(ANALYTICS_COL).doc(analytics.sessionId).set({
      uid: uid,
      email: user.email || '',
      displayName: user.displayName || '',
      loginAt: new Date(now),
      logoutAt: null,
      durationSec: 0,
      sections: [],
      bankDownloaded: false,
      bankLang: '',
      userAgent: String(navigator.userAgent || '').slice(0, 200),
      createdAt: new Date(now)
    }).catch(function (err) { console.warn('analytics session create failed:', err); });
  } catch (err) { console.warn('analytics session create failed:', err); }
  if (analytics.heartbeatTimer) clearInterval(analytics.heartbeatTimer);
  analytics.heartbeatTimer = setInterval(analyticsSaveProgress, 5 * 60 * 1000);
}
function analyticsEndSession() {
  if (!analytics.sessionId) return;
  const now = Date.now();
  analyticsCloseSection(now);
  const snap = analyticsSnapshot();
  const id = analytics.sessionId;
  analytics.sessionId = null;
  if (analytics.heartbeatTimer) { clearInterval(analytics.heartbeatTimer); analytics.heartbeatTimer = null; }
  try {
    fbDb.collection(ANALYTICS_COL).doc(id).update({
      logoutAt: new Date(now),
      durationSec: snap.durationSec,
      sections: snap.sections,
      bankDownloaded: snap.bankDownloaded,
      bankLang: snap.bankLang
    }).catch(function () {});
  } catch (_) {}
}
function analyticsMarkBankDownload(lang) {
  analytics.bankDownloaded = true;
  if (lang) analytics.bankLang = lang;
}
/* 登入狀態變化 → 開／關 session；關頁時盡力結算。 */
(function initAnalyticsAuthHook() {
  let lastUid = null;
  function onAccess(a) {
    const user = a && a.user ? a.user : null;
    const uid = user ? user.uid : '';
    if (uid === lastUid) return;
    if (lastUid && analytics.sessionId) analyticsEndSession();
    lastUid = uid;
    if (uid && user) analyticsStartSession(user);
  }
  try {
    const cur = window.V4_ACCESS;
    if (cur && cur.ready) onAccess(cur);
  } catch (_) {}
  window.addEventListener('v4-access-changed', function (e) { onAccess(e.detail || {}); });
  window.addEventListener('pagehide', function () { analyticsEndSession(); });
})();

function renderCourse() {
  analyticsTrackSection();
  const lock = $('courseLock'), body = $('courseBody');
  if (!lock || !body) return;
  if (!isCourseUnlocked()) {
    lock.classList.remove('hidden'); body.classList.add('hidden');
    updateCourseLockMessage();
    return;
  }
  lock.classList.add('hidden'); body.classList.remove('hidden');
  if (courseState.song) renderSongView(courseState.song);
  else if (courseState.ritual) renderRitualView(courseState.ritual);
  else if (courseState.lesson > 0) renderLessonView();
  else if (courseState.page === 'books') renderBooksGrid();
  else if (courseState.page === 'songs') renderSongsGrid();
  else if (courseState.page === 'rituals') renderRitualsGrid();
  else if (courseState.page === 'ritual-group') renderRitualGroupView(courseState.ritualGroup);
  else if (courseState.page === 'ritual-subgroup') renderRitualSubgroupView(courseState.ritualGroup, courseState.ritualSubgroup);
  else renderCourseHome();
}

/* 首頁：四大選項——中文課本 / 中文歌曲 / 道場禮節 / 學外語。 */
function renderCourseHome() {
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  const bookCount = COURSE_LESSONS.length;
  const songCount = V4_SONGS.length;
  const songLines = V4_SONGS.reduce((n, s) => n + s.lines.length, 0);
  const ritualCount = V4_RITUALS.length;
  const ritualLines = V4_RITUALS.reduce((n, r) => n + r.sections.reduce((m, s) => m + s.lines.length, 0), 0);
  const homeOpts = [
    { page: 'books', icon: '📚', zh: '中文課本', en: 'Textbooks', desc: `${bookCount} 課 <span class="en-sub">${bookCount} lessons</span>`, aria: '中文課本，六冊課程' },
    { page: 'songs', icon: '🎵', zh: '中文歌曲', en: 'Songs', desc: `${songCount} 首歌曲 · ${songLines} 句歌詞 <span class="en-sub">${songCount} songs</span>`, aria: '中文歌曲' },
    { page: 'rituals', icon: '🙏', zh: '道場禮節', en: 'Rituals', desc: `${ritualCount} 套禮節 · ${ritualLines} 句 <span class="en-sub">${ritualCount} rituals</span>`, aria: '道場禮節' },
    { href: 'https://f216002.github.io/language-learning/', icon: '🌍', zh: '學外語', en: 'Language Learning', desc: `16 種語言 <span class="en-sub">16 languages</span>`, aria: '學外語，老師個人外語學習空間' },
  ];
  homeOpts.forEach(opt => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card home-option-card';
    card.innerHTML = `
      <span class="home-option-icon">${opt.icon}</span>
      <span class="home-option-zh" lang="zh-Hant">${opt.zh}</span>
      <span class="en-sub home-option-en">${opt.en}</span>
      <span class="lesson-topic">${opt.desc}</span>`;
    card.setAttribute('aria-label', opt.aria);
    card.addEventListener('click', () => {
      if (opt.href) { window.location.href = opt.href; return; }
      courseState.page = opt.page; renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* 回首頁按鈕（課本頁／歌曲頁共用）。 */
function makeHomeBackButton() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'secondary-button grid-back-button';
  setBilingualText(btn, '← 回首頁', '← Home');
  btn.addEventListener('click', () => { courseState.page = 'home'; renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' }); });
  const row = document.createElement('div');
  row.className = 'grid-back-row';
  row.appendChild(btn);
  return row;
}

/* 中文課本頁：六冊課程卡（歌曲區已移至中文歌曲頁）。 */
function renderBooksGrid() {
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  grid.appendChild(makeHomeBackButton());
  const divider = document.createElement('div');
  divider.className = 'book-divider';
  divider.textContent = '中文課本';
  grid.appendChild(divider);
  /* 台灣／大陸教材切換（2026-10-10，Cheng 要求） */
  const setTabs = document.createElement('div');
  setTabs.className = 'bookset-tabs';
  setTabs.innerHTML = `
    <button type="button" class="bookset-tab ${state.bookSet !== 'cn' ? 'active' : ''}" data-set="tw">台灣 1-6 冊</button>
    <button type="button" class="bookset-tab ${state.bookSet === 'cn' ? 'active' : ''}" data-set="cn">大陸 1-6 冊</button>
  `;
  setTabs.querySelectorAll('.bookset-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.bookSet = btn.dataset.set;
      try { localStorage.setItem('v4_bookset', state.bookSet); } catch(e) {}
      renderBooksGrid();
      if (getZhMode() === 'simp') setTimeout(applyZhModeToPage, 100);
    });
  });
  grid.appendChild(setTabs);
  /* 大陸冊：HSK 教材（2026-10-10，HSK 1 已上架，與 1-7 冊同功能）。 */
  if (state.bookSet === 'cn') {
    const hskDivider = document.createElement('div');
    hskDivider.className = 'book-divider';
    hskDivider.textContent = 'HSK 1';
    grid.appendChild(hskDivider);
    HSK_COURSE_LESSONS.forEach(lesson => {
      const card = document.createElement('button');
      card.className = 'lesson-card';
      card.innerHTML = `
        <span class="lesson-n">HSK 1 第 ${lesson.n - 800} 課</span>
        <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(lesson.zh))}</span>
        <span class="lesson-en">${escapeHtml(lesson.en)}</span>
      `;
      card.addEventListener('click', () => openHskLesson(lesson.n));
      grid.appendChild(card);
    });
    return;
  }
  let lastBook = 0;
  const showBook7 = (state.sourceLanguage || 'hi') === 'km'; /* 第七冊只在高棉文出現 */
  COURSE_LESSONS.forEach(lesson => {
    if (lesson.book7 && !showBook7) return;
    const bk = bookOf(lesson.n);
    if (bk !== lastBook) {
      lastBook = bk;
      const bookDivider = document.createElement('div');
      bookDivider.className = 'book-divider';
      bookDivider.textContent = bookTitle(lesson.n);
      grid.appendChild(bookDivider);
    }
    const recs = lessonRecords(lesson.n);
    const hasPack = COURSE_PACK_LESSONS.includes(lesson.n);
    /* 卡片第二行跟著「學生的母語」顯示標題譯句（取第一筆「目標」記錄，無翻譯退印地語；無記錄時沿用英文標題）。 */
    const titleRec = recs.find(s => (courseMeta(s).section || '') === '目標');
    const titleT = titleRec ? (displaySource(titleRec) || lesson.en) : lesson.en;
    const titleLang = titleRec ? displayProfile(titleRec).locale : 'en';
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card' + (recs.length ? '' : ' lesson-card-empty');
    card.innerHTML = `
      <span class="lesson-num">${lessonLabel(lesson.n)}</span>
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${zhConvert(lesson.zh)}</span>
      <span class="lesson-i18n" lang="${titleLang}">${escapeHtml(titleT)}</span>
      <span class="lesson-topic">${lesson.topic}</span>
      <span class="lesson-status">${recs.length ? `已匯入 ${recs.length} 條 <span class="en-sub">${recs.length} imported</span>` : (hasPack ? '尚未匯入' : '準備中')}</span>`;
    card.setAttribute('aria-label', `${lessonLabel(lesson.n)} ${zhConvert(lesson.zh)}`);
    if (recs.length) {
      card.addEventListener('click', () => { courseState.lesson = lesson.n; courseState.tab = '課文'; courseState.page = 'books'; renderLessonView(); });
    } else {
      card.disabled = true;
      card.title = hasPack ? '課程匯入中，請稍等30秒 (Importing, please wait 30 seconds)' : '內容準備中 (Content coming soon)';
    }
    grid.appendChild(card);
  });
}

/* 中文歌曲頁：歌曲卡。 */
function renderSongsGrid() {
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  grid.appendChild(makeHomeBackButton());
  const songDivider = document.createElement('div');
  songDivider.className = 'book-divider';
  songDivider.textContent = '中文歌曲';
  grid.appendChild(songDivider);
  const isHindi = (state.sourceLanguage || 'hi') === 'hi';
  /* 一般歌曲：依序編號；印地文專屬歌曲僅在印地文模式顯示於最後，不編號。 */
  const normalSongs = V4_SONGS.filter(s => !s.hindiOnly);
  const hindiSongs = V4_SONGS.filter(s => s.hindiOnly && isHindi);
  const renderSongCard = (song, seqNum) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card song-card';
    const seqHtml = seqNum != null ? `<span class="song-seq">${seqNum}</span>` : '';
    const linesLabel = song.lines.length > 0
      ? `${song.lines.length} 句歌詞 <span class="en-sub">${song.lines.length} lines</span>`
      : `印地文歌曲 <span class="en-sub">Hindi song</span>`;
    card.innerHTML = `
      <span class="lesson-num">🎵 <span class="en-sub">Song</span></span>
      ${seqHtml}
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(song.title))}</span>
      <span class="lesson-topic">${linesLabel}</span>`;
    card.setAttribute('aria-label', `中文歌曲 ${song.title}`);
    card.addEventListener('click', () => { courseState.song = song.id; courseState.lesson = 0; courseState.page = 'songs'; renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' }); });
    grid.appendChild(card);
  };
  normalSongs.forEach((song, idx) => renderSongCard(song, idx + 1));
  hindiSongs.forEach(song => renderSongCard(song, null));
}

/* 相容舊調用：清掉 song/lesson 後回到目前所在層級的總覽。 */
function renderLessonGrid() {
  courseState.song = null;
  courseState.ritual = null;
  courseState.ritualGroup = null;
  courseState.lesson = 0;
  renderCourse();
}

function openLesson(n) {
  courseState.lesson = n; courseState.tab = '課文'; courseState.page = 'books';
  renderLessonView();
  $('courseSection').scrollIntoView({ behavior: 'smooth' });
}

/* HSK 課程：載入句庫後用現有課程視圖顯示（2026-10-10，與 1-7 冊同功能）。 */
/* HSK 電子書閱讀器（2026-10-10）：顯示課文頁圖片，點句子彈出句子卡。 */
let ebookState = { lesson: 0, pageIndex: 0, pages: [], regions: [] };
async function openHskEbook(n) {
  const view = $('lessonView');
  const grid = $('lessonGrid');
  if (view) view.classList.remove('hidden');
  if (grid) grid.classList.add('hidden');
  /* 保留原有結構，只清空內容區，避免刪除 lessonBackButton */
  const header = $('lessonHeader');
  const tabs = $('lessonTabs');
  const content = $('lessonContent');
  if (header) header.innerHTML = '';
  if (tabs) tabs.innerHTML = '';
  if (content) content.innerHTML = '<p class="section-note">載入電子書… <span class="en-sub">Loading e-book…</span></p>';
  try {
    await loadHskBank();
    /* 載入頁面對應檔（目前只有第一課有） */
    const lessonNum = n - 800;
    const pageFile = `v4-hsk/pages/hsk1-l${String(lessonNum).padStart(2, '0')}-pages.json`;
    let pageData = null;
    try {
      const url = await getBankFileUrl(pageFile);
      const r = await fetch(url);
      if (r.ok) pageData = await r.json();
    } catch (e) { /* 沒有對應檔就用句子列表 */ }
    if (pageData && pageData.pages && pageData.pages.length) {
      ebookState = { lesson: n, pageIndex: 0, pages: pageData.pages, title: pageData.title };
      renderEbookPage();
    } else {
      /* 沒有電子書頁面時，退回句子列表 */
      courseState.lesson = n; courseState.tab = '課文'; courseState.page = 'books';
      renderLessonView();
    }
  } catch (e) {
    const content = $('lessonContent');
    if (content) content.innerHTML = `<p class="section-note">載入失敗：${escapeHtml(e.message)} <span class="en-sub">Load failed</span></p>`;
  }
  const cs = $('courseSection');
  if (cs) cs.scrollIntoView({ behavior: 'smooth' });
}
async function renderEbookPage() {
  const page = ebookState.pages[ebookState.pageIndex];
  const imgUrl = await getBankFileUrl(page.image);
  const lesson = HSK_COURSE_LESSONS.find(l => l.n === ebookState.lesson);
  let regionsHtml = '';
  (page.regions || []).forEach((reg, i) => {
    regionsHtml += `<div class="ebook-region" data-idx="${i}" style="left:${reg.x}%;top:${reg.y}%;width:${reg.w}%;height:${reg.h}%;" title="${escapeHtml(reg.zh)}"></div>`;
  });
  /* 使用 lessonContent 區域，不破壞 lessonBackButton */
  const content = $('lessonContent');
  const header = $('lessonHeader');
  if (header) {
    header.innerHTML = `
      <div class="lesson-header-top"><span class="lesson-num">HSK 1 第 ${ebookState.lesson - 800} 課</span></div>
      <h3 class="lesson-header-zh">${escapeHtml(lesson ? lesson.zh : '')}</h3>
      <p class="lesson-header-en">${escapeHtml(lesson ? lesson.en : '')} <span class="en-sub">電子書 E-book</span></p>
    `;
  }
  const tabs = $('lessonTabs');
  if (tabs) tabs.innerHTML = '';
  if (content) {
    content.innerHTML = `
      <div class="ebook-viewer">
        <div class="ebook-page">
          <img src="${imgUrl}" alt="課文頁" />
          ${regionsHtml}
        </div>
        <div class="ebook-nav">
          <button id="ebookPrev" ${ebookState.pageIndex === 0 ? 'disabled' : ''}>← 上一頁</button>
          <span class="ebook-page-num">${ebookState.pageIndex + 1} / ${ebookState.pages.length}</span>
          <button id="ebookNext" ${ebookState.pageIndex >= ebookState.pages.length - 1 ? 'disabled' : ''}>下一頁 →</button>
        </div>
      </div>
      <p class="section-note" style="text-align:center;margin-top:12px;">點句子可看詳細解說 <span class="en-sub">Tap a sentence for details</span></p>
    `;
    const prevBtn = $('ebookPrev');
    const nextBtn = $('ebookNext');
    if (prevBtn && !prevBtn.disabled) prevBtn.addEventListener('click', () => {
      ebookState.pageIndex--; renderEbookPage();
    });
    if (nextBtn && !nextBtn.disabled) nextBtn.addEventListener('click', () => {
      ebookState.pageIndex++; renderEbookPage();
    });
    content.querySelectorAll('.ebook-region').forEach(el => {
      el.addEventListener('click', () => {
        const reg = page.regions[Number(el.dataset.idx)];
        openSentenceModal(reg.sentenceId);
      });
    });
  }
  /* 返回按鈕：回到課程總覽 */
  const backBtn = $('lessonBackButton');
  if (backBtn) {
    backBtn.textContent = '← 回課程總覽';
    backBtn.onclick = () => {
      $('lessonView').classList.add('hidden');
      renderBooksGrid();
    };
  }
}
/* 句子卡彈窗：用現有 createCard 渲染，關閉回到電子書。 */
async function openSentenceModal(sentenceId) {
  /* 從 HSK 快取找句子 */
  const sentence = hskBankCache.find(s => s.recordId === sentenceId);
  if (!sentence) return;
  let modal = $('sentenceModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sentenceModal';
    modal.className = 'sentence-modal hidden';
    modal.innerHTML = `
      <div class="sentence-modal-content">
        <button class="sentence-modal-close" id="sentenceModalClose">✕</button>
        <div id="sentenceModalBody"></div>
      </div>
    `;
    document.body.appendChild(modal);
    $('sentenceModalClose').addEventListener('click', closeSentenceModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSentenceModal();
    });
  }
  const body = $('sentenceModalBody');
  body.innerHTML = '';
  const card = createCard(sentence, true);
  body.appendChild(card);
  modal.classList.remove('hidden');
}
function closeSentenceModal() {
  const modal = $('sentenceModal');
  if (modal) modal.classList.add('hidden');
}
async function openHskLesson(n) {
  /* 第一課有電子書，其他課用句子列表 */
  if (n === 801) {
    openHskEbook(n);
  } else {
    try {
      await loadHskBank();
      courseState.lesson = n;
      courseState.tab = '課文';
      courseState.page = 'books';
      renderLessonView();
      $('courseSection').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      const view = $('lessonView');
      view.classList.remove('hidden');
      $('lessonGrid').classList.add('hidden');
      view.innerHTML = `<p class="section-note">載入失敗：${escapeHtml(e.message)} <span class="en-sub">Load failed</span></p>`;
    }
  }
}

/* 歌曲內頁：上方 MV 播放器（可全螢幕）＋下方逐句歌詞卡片。 */
async function renderSongView(songId) {
  const song = V4_SONGS.find(s => s.id === songId);
  if (!song) { courseState.song = null; renderLessonGrid(); return; }
  $('lessonGrid').classList.add('hidden');
  const view = $('lessonView');
  view.classList.remove('hidden');
  const backBtn = $('lessonBackButton');
  backBtn.textContent = '← 回歌曲列表';
  const header = $('lessonHeader');
  header.innerHTML = `<h3 lang="zh-Hant">🎵 ${escapeHtml(song.title)}</h3>`;
  $('lessonTabs').innerHTML = '';
  const content = $('lessonContent');
  content.innerHTML = '<p class="section-note">影片載入中… <span class="en-sub">Loading video…</span></p>';
  const lyricsGrid = document.createElement('div');
  lyricsGrid.className = 'sentence-grid song-lyrics';
  /* 整首歌＝最小單元：歌詞卡編號＋↑↓移動鈕排序（順序存老師個人帳號）。 */
  const songSentences = song.lines.map((line, i) => songLineToSentence(song, line, i));
  renderNumberedUnit(lyricsGrid, songSentences, {
    unitKey: `song_${songId}`,
    buildCard: (s) => createCard(s, false)
  });
  /* YouTube 歌曲：用 iframe 嵌入；Storage 歌曲：用 SDK 取下載網址播 HTML5 video。 */
  if (song.videoType === 'audio' && song.audioPath) {
    content.innerHTML = `
      <div class="song-video-wrap">
        <audio class="song-audio" controls preload="metadata" src="${song.audioPath}" aria-label="${escapeHtml(song.title)} 音檔"></audio>
      </div>`;
  } else if (song.videoType === 'youtube' && song.youtubeId) {
    content.innerHTML = `
      <div class="song-video-wrap">
        <iframe class="song-youtube" src="https://www.youtube.com/embed/${song.youtubeId}" title="${escapeHtml(song.title)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
  } else {
    /* Storage 鎖死（2026-10-10）：經下載票取影片網址。 */
    let videoUrl = '';
    try {
      videoUrl = await getBankFileUrl(song.videoPath);
    } catch (e) {
      content.innerHTML = '<p class="section-note">影片載入失敗，請檢查網路後重整。 <span class="en-sub">Video failed to load.</span></p>';
      return;
    }
    content.innerHTML = `
      <div class="song-video-wrap">
        <video id="songVideo" controls playsinline preload="metadata" src="${videoUrl}" aria-label="${escapeHtml(song.title)} MV"></video>
      </div>`;
  }
  content.appendChild(lyricsGrid);
}

/* V4 道場禮節（AI 校對草稿，待老師審定）
   結構：V4_RITUALS 為禮節陣列；每禮節含 sections（段落），每段含 lines。
   參駕禮／辭駕禮：單一段落，附 Meta 0.8x 全程朗讀音檔（audio/rituals/）。
   燒香禮：五段落（叩首／愿懺文／懇求／叩首／禮畢），音檔待老師錄製。
   16 語翻譯在 v4-rituals-i18n.js 的 V4_RITUALS_I18N，key 為禮節 id，順序與 lines 扁平展開一致。 */
const V4_RITUALS = [
  {
    id: "canjia",
    title: "參駕禮",
    groupId: "canjia-cijia",
    groupTitle: "參辭駕禮節",
    audioPath: "audio/rituals/canjia.mp3",
    sections: [
      {
        title: null,
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝參駕五叩首", py: "míng míng shàng dì cān jià wǔ kòu shǒu" },
          { zh: "諸天神聖三叩首", py: "zhū tiān shén shèng sān kòu shǒu" },
          { zh: "彌勒祖師三叩首", py: "mí lè zǔ shī sān kòu shǒu" },
          { zh: "南海古佛一叩", py: "nán hǎi gǔ fó yī kòu" },
          { zh: "活佛師尊一叩", py: "huó fó shī zūn yī kòu" },
          { zh: "月慧菩薩一叩", py: "yuè huì pú sà yī kòu" },
          { zh: "師尊一叩", py: "shī zūn yī kòu" },
          { zh: "師母一叩", py: "shī mǔ yī kòu" },
          { zh: "點傳師一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "前人大眾一叩首", py: "qián rén dà zhòng yī kòu shǒu" },
          { zh: "起", py: "qǐ" },
          { zh: "作揖", py: "zuò yī" },
          { zh: "放手鞠躬", py: "fàng shǒu jū gōng" },
          { zh: "參駕禮畢", py: "cān jià lǐ bì" },
          { zh: "退", py: "tuì" },
        ],
      },
    ],
  },
  {
    id: "cijia",
    title: "辭駕禮",
    groupId: "canjia-cijia",
    groupTitle: "參辭駕禮節",
    audioPath: "audio/rituals/cijia.mp3",
    sections: [
      {
        title: null,
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝辭駕五叩首", py: "míng míng shàng dì cí jià wǔ kòu shǒu" },
          { zh: "諸天神聖三叩首", py: "zhū tiān shén shèng sān kòu shǒu" },
          { zh: "彌勒祖師三叩首", py: "mí lè zǔ shī sān kòu shǒu" },
          { zh: "南海古佛一叩", py: "nán hǎi gǔ fó yī kòu" },
          { zh: "活佛師尊一叩", py: "huó fó shī zūn yī kòu" },
          { zh: "月慧菩薩一叩", py: "yuè huì pú sà yī kòu" },
          { zh: "師尊一叩", py: "shī zūn yī kòu" },
          { zh: "師母一叩", py: "shī mǔ yī kòu" },
          { zh: "點傳師一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "前人大眾一叩首", py: "qián rén dà zhòng yī kòu shǒu" },
          { zh: "起", py: "qǐ" },
          { zh: "作揖", py: "zuò yī" },
          { zh: "放手鞠躬", py: "fàng shǒu jū gōng" },
          { zh: "辭駕禮畢", py: "cí jià lǐ bì" },
          { zh: "退", py: "tuì" },
        ],
      },
    ],
  },
  {
    id: "shaoxiang",
    title: "燒香禮",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    /* 燒香禮：乾道、坤道各一份完整版文件（平常日早香）。 */
    docIds: ["shaoxiang-qiandao", "shaoxiang-kundao"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "（乾）餘蘊（姓名）", py: "(qián) yú yùn (xìng míng)" },
          { zh: "（坤）信士", py: "(kūn) xìn shì" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，早香／午香／晚香，禮畢，退！", py: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng / wǔ xiāng / wǎn xiāng, lǐ bì, tuì!" },
        ],
      },
    ],
  },
{
    id: "shaoxiang-pingchangri-qiandao-zaoxiang",
    title: "乾道平常日早香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-qiandao"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，早香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-pingchangri-kundao-zaoxiang",
    title: "坤道平常日早香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-kundao"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名", py: "yuàn chàn wén (gè bào gè míng" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，早香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì," },
        ],
      },
    ],
  },
{
    id: "shaoxiang-pingchangri-qiandao-wuxiang",
    title: "乾道平常日午香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-pingchangri-qiandao-wuxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，午香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-pingchangri-kundao-wuxiang",
    title: "坤道平常日午香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-pingchangri-kundao-wuxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名", py: "yuàn chàn wén (gè bào gè míng" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，午香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-pingchangri-qiandao-wanxiang",
    title: "乾道平常日晚香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-pingchangri-qiandao-wanxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，晚香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-pingchangri-kundao-wanxiang",
    title: "坤道平常日晚香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-pingchangri-kundao-wanxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 五叩首", py: "tiān dì jūn qīn shī wǔ kòu shǒu" },
          { zh: "諸天神聖 五叩首", py: "zhū tiān shén shèng wǔ kòu shǒu" },
          { zh: "彌勒祖師 五叩首", py: "mí lè zǔ shī wǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名", py: "yuàn chàn wén (gè bào gè míng" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 五叩首", py: "jīn gōng zǔ shī wǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，晚香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-qiandao-zaoxiang",
    title: "乾道初一十五早香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-qiandao-zaoxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，早香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-kundao-zaoxiang",
    title: "坤道初一十五早香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-kundao-zaoxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，早香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-qiandao-wuxiang",
    title: "乾道初一十五午香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-qiandao-wuxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，午香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-kundao-wuxiang",
    title: "坤道初一十五午香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-kundao-wuxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，午香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-qiandao-wanxiang",
    title: "乾道初一十五晚香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-qiandao-wanxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "餘蘊（報自己姓名）", py: "yú yùn (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，晚香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì," },
        ],
      },
    ],
  },
  {
    id: "shaoxiang-chuyishiwu-kundao-wanxiang",
    title: "坤道初一十五晚香燒香禮節",
    groupId: null,
    groupTitle: null,
    audioPath: null,
    docIds: ["shaoxiang-chuyishiwu-kundao-wanxiang"],
    sections: [
      {
        title: "叩首",
        lines: [
          { zh: "作揖，跪", py: "zuò yī, guì" },
          { zh: "明明上帝 十叩首", py: "míng míng shàng dì shí kòu shǒu" },
          { zh: "天地君親師 九叩首", py: "tiān dì jūn qīn shī jiǔ kòu shǒu" },
          { zh: "諸天神聖 九叩首", py: "zhū tiān shén shèng jiǔ kòu shǒu" },
          { zh: "彌勒祖師 九叩首", py: "mí lè zǔ shī jiǔ kòu shǒu" },
          { zh: "南海古佛 五叩首", py: "nán hǎi gǔ fó wǔ kòu shǒu" },
          { zh: "各教聖人 五叩首", py: "gè jiào shèng rén wǔ kòu shǒu" },
          { zh: "活佛師尊 五叩首", py: "huó fó shī zūn wǔ kòu shǒu" },
          { zh: "月慧菩薩 五叩首", py: "yuè huì pú sà wǔ kòu shǒu" },
          { zh: "各位法律主 五叩首", py: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu" },
          { zh: "長生大帝 五叩首", py: "cháng shēng dà dì wǔ kòu shǒu" },
          { zh: "灶君 三叩首", py: "zào jūn sān kòu shǒu" },
          { zh: "師尊 三叩首", py: "shī zūn sān kòu shǒu" },
          { zh: "師母 三叩首", py: "shī mǔ sān kòu shǒu" },
          { zh: "鎮殿元帥 三叩首", py: "zhèn diàn yuán shuài sān kòu shǒu" },
          { zh: "鎮殿將軍 三叩首", py: "zhèn diàn jiāng jūn sān kòu shǒu" },
          { zh: "教化菩薩 三叩首", py: "jiào huà pú sà sān kòu shǒu" },
          { zh: "各位大仙 三叩首", py: "gè wèi dà xiān sān kòu shǒu" },
          { zh: "道長 一叩", py: "dào zhǎng yī kòu" },
          { zh: "前人 一叩", py: "qián rén yī kòu" },
          { zh: "點傳師 一叩", py: "diǎn chuán shī yī kòu" },
          { zh: "引保師 一叩", py: "yǐn bǎo shī yī kòu" },
          { zh: "自己祖先 一叩首", py: "zì jǐ zǔ xiān yī kòu shǒu" },
        ],
      },
      {
        title: "愿懺文",
        lines: [
          { zh: "愿懺文（各報各名）", py: "yuàn chàn wén (gè bào gè míng)" },
          { zh: "信士（報自己姓名）", py: "xìn shì (bào zì jǐ xìng míng)" },
          { zh: "虔心跪在", py: "qián xīn guì zài" },
          { zh: "明明上帝蓮下，幸受真傳，三叩首", py: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu" },
          { zh: "彌勒祖師，妙法無邊，護庇眾生", py: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng" },
          { zh: "懺悔佛前，改過自新，", py: "chàn huǐ fó qián, gǎi guò zì xīn," },
          { zh: "同註天盤，三叩首", py: "tóng zhù tiān pán, sān kòu shǒu" },
          { zh: "凡係佛堂，顛倒錯亂", py: "fán xì fó táng, diān dào cuò luàn" },
          { zh: "望祈祖師，赦罪容寬，十叩首", py: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu" },
          { zh: "南無阿彌十佛天元，十叩首", py: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu" },
        ],
      },
      {
        title: "懇求",
        lines: [
          { zh: "起，作揖，跪，懇求", py: "qǐ, zuò yī, guì, kěn qiú" },
          { zh: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", py: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào" },
          { zh: "院長大人慈悲，免去一切，考魔災劫，", py: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié," },
          { zh: "並求諸天神聖慈悲，特別加靈，撥機顯化，", py: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà," },
          { zh: "以搭幫助，大道宏展！一百叩首", py: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu" },
        ],
      },
      {
        title: "叩首",
        lines: [
          { zh: "金公祖師 九叩首", py: "jīn gōng zǔ shī jiǔ kòu shǒu" },
          { zh: "天然古佛 五叩首", py: "tiān rán gǔ fó wǔ kòu shǒu" },
          { zh: "中華聖母 五叩首", py: "zhōng huá shèng mǔ wǔ kòu shǒu" },
          { zh: "院長大人 三叩首", py: "yuàn zhǎng dà rén sān kòu shǒu" },
          { zh: "潘道長 三叩首", py: "pān dào zhǎng sān kòu shǒu" },
          { zh: "妙極大帝 三叩首", py: "miào jí dà dì sān kòu shǒu" },
          { zh: "各位先賢 三叩首", py: "gè wèi xiān xián sān kòu shǒu" },
        ],
      },
      {
        title: "禮畢",
        lines: [
          { zh: "起，作揖，放手鞠躬，晚香禮畢，", py: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì," },
        ],
      },
    ],
  },
];

/* 參駕／辭駕完整版文件：上執禮＋下執禮左右對照，中文＋拼音（供老師教學／學生練習，可下載） */
const V4_RITUAL_DOCS = {
  "canjia": {
    title: "參駕禮節",
    docTitle: "參駕禮節（完整版）",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝參駕五叩首", shangPy: "míng míng shàng dì cān jià wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 3,
        shang: "諸天神聖三叩首", shangPy: "zhū tiān shén shèng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 4,
        shang: "彌勒祖師三叩首", shangPy: "mí lè zǔ shī sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 5,
        shang: "南海古佛一叩", shangPy: "nán hǎi gǔ fó yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 6,
        shang: "活佛師尊一叩", shangPy: "huó fó shī zūn yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 7,
        shang: "月慧菩薩一叩", shangPy: "yuè huì pú sà yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 8,
        shang: "師尊一叩", shangPy: "shī zūn yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 9,
        shang: "師母一叩", shangPy: "shī mǔ yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 10,
        shang: "點傳師一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 11,
        shang: "引保師一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 12,
        shang: "前人大眾一叩首", shangPy: "qián rén dà zhòng yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 13,
        shang: "起", shangPy: "qǐ",
        xia: "", xiaPy: "" },
      { seq: 14,
        shang: "作揖", shangPy: "zuò yī",
        xia: "", xiaPy: "" },
      { seq: 15,
        shang: "放手鞠躬", shangPy: "fàng shǒu jū gōng",
        xia: "", xiaPy: "" },
      { seq: 16,
        shang: "參駕禮畢", shangPy: "cān jià lǐ bì",
        xia: "", xiaPy: "" },
      { seq: 17,
        shang: "退", shangPy: "tuì",
        xia: "", xiaPy: "" },
    ],
  },
  "cijia": {
    title: "辭駕禮節",
    docTitle: "辭駕禮節（完整版）",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝辭駕五叩首", shangPy: "míng míng shàng dì cí jià wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 3,
        shang: "諸天神聖三叩首", shangPy: "zhū tiān shén shèng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 4,
        shang: "彌勒祖師三叩首", shangPy: "mí lè zǔ shī sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 5,
        shang: "南海古佛一叩", shangPy: "nán hǎi gǔ fó yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 6,
        shang: "活佛師尊一叩", shangPy: "huó fó shī zūn yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 7,
        shang: "月慧菩薩一叩", shangPy: "yuè huì pú sà yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 8,
        shang: "師尊一叩", shangPy: "shī zūn yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 9,
        shang: "師母一叩", shangPy: "shī mǔ yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 10,
        shang: "點傳師一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 11,
        shang: "引保師一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 12,
        shang: "前人大眾一叩首", shangPy: "qián rén dà zhòng yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 13,
        shang: "起", shangPy: "qǐ",
        xia: "", xiaPy: "" },
      { seq: 14,
        shang: "作揖", shangPy: "zuò yī",
        xia: "", xiaPy: "" },
      { seq: 15,
        shang: "放手鞠躬", shangPy: "fàng shǒu jū gōng",
        xia: "", xiaPy: "" },
      { seq: 16,
        shang: "辭駕禮畢", shangPy: "cí jià lǐ bì",
        xia: "", xiaPy: "" },
      { seq: 17,
        shang: "退", shangPy: "tuì",
        xia: "", xiaPy: "" },
    ],
  },
  "shaoxiang-qiandao": {
    title: "乾道平常日早香燒香禮節",
    docTitle: "乾道平常日早香燒香禮節（完整版）",
    buttonLabel: "📄 乾道平常日早香內容",
    audioPath: "audio/rituals/shaoxiang-qiandao.mp3?v=20261001",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，早香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-kundao": {
    title: "坤道平常日早香燒香禮節",
    docTitle: "坤道平常日早香燒香禮節（完整版）",
    buttonLabel: "📄 坤道平常日早香內容",
    audioPath: "audio/rituals/shaoxiang-kundao.mp3?v=20261001",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名", shangPy: "yuàn chàn wén (gè bào gè míng",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，早香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
"shaoxiang-pingchangri-qiandao-wuxiang": {
    title: "乾道平常日午香燒香禮節",
    docTitle: "乾道平常日午香燒香禮節（完整版）",
    buttonLabel: "📄 乾道午香內容",
    audioPath: "audio/rituals/shaoxiang-pingchangri-qiandao-wuxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，午香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-pingchangri-kundao-wuxiang": {
    title: "坤道平常日午香燒香禮節",
    docTitle: "坤道平常日午香燒香禮節（完整版）",
    buttonLabel: "📄 坤道午香內容",
    audioPath: "audio/rituals/shaoxiang-pingchangri-kundao-wuxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名", shangPy: "yuàn chàn wén (gè bào gè míng",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，午香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-pingchangri-qiandao-wanxiang": {
    title: "乾道平常日晚香燒香禮節",
    docTitle: "乾道平常日晚香燒香禮節（完整版）",
    buttonLabel: "📄 乾道晚香內容",
    audioPath: "audio/rituals/shaoxiang-pingchangri-qiandao-wanxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，晚香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-pingchangri-kundao-wanxiang": {
    title: "坤道平常日晚香燒香禮節",
    docTitle: "坤道平常日晚香燒香禮節（完整版）",
    buttonLabel: "📄 坤道晚香內容",
    audioPath: "audio/rituals/shaoxiang-pingchangri-kundao-wanxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 五叩首", shangPy: "tiān dì jūn qīn shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 五叩首", shangPy: "zhū tiān shén shèng wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 五叩首", shangPy: "mí lè zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名", shangPy: "yuàn chàn wén (gè bào gè míng",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 五叩首", shangPy: "jīn gōng zǔ shī wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，晚香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-qiandao-zaoxiang": {
    title: "乾道初一十五早香燒香禮節",
    docTitle: "乾道初一十五早香燒香禮節（完整版）",
    buttonLabel: "📄 乾道初一十五早香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-qiandao-zaoxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，早香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-kundao-zaoxiang": {
    title: "坤道初一十五早香燒香禮節",
    docTitle: "坤道初一十五早香燒香禮節（完整版）",
    buttonLabel: "📄 坤道初一十五早香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-kundao-zaoxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，早香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, zǎo xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-qiandao-wuxiang": {
    title: "乾道初一十五午香燒香禮節",
    docTitle: "乾道初一十五午香燒香禮節（完整版）",
    buttonLabel: "📄 乾道初一十五午香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-qiandao-wuxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，午香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-kundao-wuxiang": {
    title: "坤道初一十五午香燒香禮節",
    docTitle: "坤道初一十五午香燒香禮節（完整版）",
    buttonLabel: "📄 坤道初一十五午香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-kundao-wuxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，午香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǔ xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-qiandao-wanxiang": {
    title: "乾道初一十五晚香燒香禮節",
    docTitle: "乾道初一十五晚香燒香禮節（完整版）",
    buttonLabel: "📄 乾道初一十五晚香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-qiandao-wanxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "餘蘊（報自己姓名）", shangPy: "yú yùn (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，晚香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
  "shaoxiang-chuyishiwu-kundao-wanxiang": {
    title: "坤道初一十五晚香燒香禮節",
    docTitle: "坤道初一十五晚香燒香禮節（完整版）",
    buttonLabel: "📄 坤道初一十五晚香內容",
    audioPath: "audio/rituals/shaoxiang-chuyishiwu-kundao-wanxiang.mp3",
    steps: [
      { seq: 1,
        shang: "作揖，跪", shangPy: "zuò yī, guì",
        xia: "—", xiaPy: "" },
      { seq: 2,
        shang: "明明上帝 十叩首", shangPy: "míng míng shàng dì shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 3,
        shang: "天地君親師 九叩首", shangPy: "tiān dì jūn qīn shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 4,
        shang: "諸天神聖 九叩首", shangPy: "zhū tiān shén shèng jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 5,
        shang: "彌勒祖師 九叩首", shangPy: "mí lè zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 6,
        shang: "南海古佛 五叩首", shangPy: "nán hǎi gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 7,
        shang: "各教聖人 五叩首", shangPy: "gè jiào shèng rén wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 8,
        shang: "活佛師尊 五叩首", shangPy: "huó fó shī zūn wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 9,
        shang: "月慧菩薩 五叩首", shangPy: "yuè huì pú sà wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 10,
        shang: "各位法律主 五叩首", shangPy: "gè wèi fǎ lǜ zhǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 11,
        shang: "長生大帝 五叩首", shangPy: "cháng shēng dà dì wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 12,
        shang: "灶君 三叩首", shangPy: "zào jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 13,
        shang: "師尊 三叩首", shangPy: "shī zūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 14,
        shang: "師母 三叩首", shangPy: "shī mǔ sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 15,
        shang: "鎮殿元帥 三叩首", shangPy: "zhèn diàn yuán shuài sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 16,
        shang: "鎮殿將軍 三叩首", shangPy: "zhèn diàn jiāng jūn sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 17,
        shang: "教化菩薩 三叩首", shangPy: "jiào huà pú sà sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 18,
        shang: "各位大仙 三叩首", shangPy: "gè wèi dà xiān sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 19,
        shang: "道長 一叩", shangPy: "dào zhǎng yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 20,
        shang: "前人 一叩", shangPy: "qián rén yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 21,
        shang: "點傳師 一叩", shangPy: "diǎn chuán shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 22,
        shang: "引保師 一叩", shangPy: "yǐn bǎo shī yī kòu",
        xia: "一叩", xiaPy: "yī kòu" },
      { seq: 23,
        shang: "自己祖先 一叩首", shangPy: "zì jǐ zǔ xiān yī kòu shǒu",
        xia: "一叩首", xiaPy: "yī kòu shǒu" },
      { seq: 24,
        shang: "愿懺文（各報各名）", shangPy: "yuàn chàn wén (gè bào gè míng)",
        xia: "", xiaPy: "" },
      { seq: 25,
        shang: "信士（報自己姓名）", shangPy: "xìn shì (bào zì jǐ xìng míng)",
        xia: "", xiaPy: "" },
      { seq: 26,
        shang: "虔心跪在", shangPy: "qián xīn guì zài",
        xia: "", xiaPy: "" },
      { seq: 27,
        shang: "明明上帝蓮下，幸受真傳，三叩首", shangPy: "míng míng shàng dì lián xià, xìng shòu zhēn chuán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 28,
        shang: "彌勒祖師，妙法無邊，護庇眾生", shangPy: "mí lè zǔ shī, miào fǎ wú biān, hù bì zhòng shēng",
        xia: "", xiaPy: "" },
      { seq: 29,
        shang: "懺悔佛前，改過自新，", shangPy: "chàn huǐ fó qián, gǎi guò zì xīn,",
        xia: "", xiaPy: "" },
      { seq: 30,
        shang: "同註天盤，三叩首", shangPy: "tóng zhù tiān pán, sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 31,
        shang: "凡係佛堂，顛倒錯亂", shangPy: "fán xì fó táng, diān dào cuò luàn",
        xia: "", xiaPy: "" },
      { seq: 32,
        shang: "望祈祖師，赦罪容寬，十叩首", shangPy: "wàng qí zǔ shī, shè zuì róng kuān, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 33,
        shang: "南無阿彌十佛天元，十叩首", shangPy: "nán wú ā mí shí fó tiān yuán, shí kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩、十叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu, shí kòu shǒu" },
      { seq: 34,
        shang: "起，作揖，跪，懇求", shangPy: "qǐ, zuò yī, guì, kěn qiú",
        xia: "", xiaPy: "" },
      { seq: 35,
        shang: "老母大開宏恩，祖師宏慈，師尊，母親老大人，大恩大德多普照", shangPy: "lǎo mǔ dà kāi hóng ēn, zǔ shī hóng cí, shī zūn, mǔ qīn lǎo dà rén, dà ēn dà dé duō pǔ zhào",
        xia: "", xiaPy: "" },
      { seq: 36,
        shang: "院長大人慈悲，免去一切，考魔災劫，", shangPy: "yuàn zhǎng dà rén cí bēi, miǎn qù yī qiè, kǎo mó zāi jié,",
        xia: "", xiaPy: "" },
      { seq: 37,
        shang: "並求諸天神聖慈悲，特別加靈，撥機顯化，", shangPy: "bìng qiú zhū tiān shén shèng cí bēi, tè bié jiā líng, bō jī xiǎn huà,",
        xia: "", xiaPy: "" },
      { seq: 38,
        shang: "以搭幫助，大道宏展！一百叩首", shangPy: "yǐ dā bāng zhù, dà dào hóng zhǎn! yì bǎi kòu shǒu",
        xia: "一、再、三、四、五、六、七、八、九、一、一、再、三、四、五、六、七、八、九、再、一、再、三、四、五、六、七、八、九、三、一、再、三、四、五、六、七、八、九、四、一、再、三、四、五、六、七、八、九、五、一、再、三、四、五、六、七、八、九、六、一、再、三、四、五、六、七、八、九、七、一、再、三、四、五、六、七、八、九、八、一、再、三、四、五、六、七、八、九、九、一、再、三、四、五、六、七、八、九、一百叩首", xiaPy: "yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, zài, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sān, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, sì, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, wǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, liù, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, qī, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, bā, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, jiǔ, yī, zài, sān, sì, wǔ, liù, qī, bā, jiǔ, yī bǎi kòu shǒu" },
      { seq: 39,
        shang: "金公祖師 九叩首", shangPy: "jīn gōng zǔ shī jiǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩、六叩、七叩、八叩、九叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu, liù kòu, qī kòu, bā kòu, jiǔ kòu shǒu" },
      { seq: 40,
        shang: "天然古佛 五叩首", shangPy: "tiān rán gǔ fó wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 41,
        shang: "中華聖母 五叩首", shangPy: "zhōng huá shèng mǔ wǔ kòu shǒu",
        xia: "一叩、再叩、三叩、四叩、五叩首", xiaPy: "yī kòu, zài kòu, sān kòu, sì kòu, wǔ kòu shǒu" },
      { seq: 42,
        shang: "院長大人 三叩首", shangPy: "yuàn zhǎng dà rén sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 43,
        shang: "潘道長 三叩首", shangPy: "pān dào zhǎng sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 44,
        shang: "妙極大帝 三叩首", shangPy: "miào jí dà dì sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 45,
        shang: "各位先賢 三叩首", shangPy: "gè wèi xiān xián sān kòu shǒu",
        xia: "一叩、再叩、三叩首", xiaPy: "yī kòu, zài kòu, sān kòu shǒu" },
      { seq: 46,
        shang: "起，作揖，放手鞠躬，晚香禮畢，", shangPy: "qǐ, zuò yī, fàng shǒu jū gōng, wǎn xiāng lǐ bì,",
        xia: "退！", xiaPy: "tuì!" },
    ],
  },
};

/* 道場禮節群組（三層導覽）：參辭駕禮節含參駕禮、辭駕禮；燒香禮節下分平常日／初一十五兩個子群組，各含6個禮節。 */
const V4_RITUAL_GROUPS = [
  { id: 'canjia-cijia', title: '參辭駕禮節', icon: '🙏', rituals: ['canjia', 'cijia'] },
  {
    id: 'shaoxiang', title: '燒香禮節', icon: '🕯️',
    subgroups: [
      {
        id: 'shaoxiang-pingchangri', title: '平常日燒香禮節',
        rituals: [
          'shaoxiang-pingchangri-qiandao-zaoxiang',
          'shaoxiang-pingchangri-kundao-zaoxiang',
          'shaoxiang-pingchangri-qiandao-wuxiang',
          'shaoxiang-pingchangri-kundao-wuxiang',
          'shaoxiang-pingchangri-qiandao-wanxiang',
          'shaoxiang-pingchangri-kundao-wanxiang',
        ],
      },
      {
        id: 'shaoxiang-chuyishiwu', title: '初一十五燒香禮節',
        rituals: [
          'shaoxiang-chuyishiwu-qiandao-zaoxiang',
          'shaoxiang-chuyishiwu-kundao-zaoxiang',
          'shaoxiang-chuyishiwu-qiandao-wuxiang',
          'shaoxiang-chuyishiwu-kundao-wuxiang',
          'shaoxiang-chuyishiwu-qiandao-wanxiang',
          'shaoxiang-chuyishiwu-kundao-wanxiang',
        ],
      },
    ],
  },
];

/* 合併禮節翻譯：v4-rituals-i18n.js 的 V4_RITUALS_I18N 寫入各行 line.i18n（依 sections 扁平順序）。 */
if (typeof V4_RITUALS_I18N !== 'undefined') {
  V4_RITUALS.forEach(ritual => {
    const arr = V4_RITUALS_I18N[ritual.id];
    if (!arr) return;
    let idx = 0;
    ritual.sections.forEach(sec => {
      sec.lines.forEach(line => { if (arr[idx]) line.i18n = arr[idx]; idx++; });
    });
  });
}

/* 禮節行轉句子物件：供 createCard() 使用（非課程記錄，不進搜尋）。 */
function ritualLineToSentence(ritual, line, idx) {
  const recordId = `ritual-${ritual.id}-${idx + 1}`;
  const s = {
    chineseSentence: line.zh,
    pinyin: line.py,
    hindiSentence: (line.i18n && line.i18n.hi && line.i18n.hi.s) || '',
    romanHindi: (line.i18n && line.i18n.hi && line.i18n.hi.r) || '',
    hindiExplanation: (line.i18n && line.i18n.hi && line.i18n.hi.e) || '',
    i18n: line.i18n || {},
    category: '禮節',
    tags: `道場禮節,${ritual.title}`,
    recordId,
    /* seq: 0 讓 isCourseRecord() 判為 true，語言切換才會讀 i18n；物件即時產生、不進 bank，無副作用。 */
    seq: 0,
  };
  const ov = (typeof state !== 'undefined' && state.overlayMap) ? state.overlayMap.get(recordId) : null;
  if (ov) {
    if (ov.audioPath) { s.audioPath = ov.audioPath; s.standardAudioUrl = ov.audioPath; }
    if (ov.audioMime) s.audioMime = ov.audioMime;
  }
  return s;
}

/* 道場禮節首頁：群組卡（參辭駕禮節／燒香禮）。 */
function renderRitualsGrid() {
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  grid.appendChild(makeHomeBackButton());
  const divider = document.createElement('div');
  divider.className = 'book-divider';
  divider.textContent = '道場禮節';
  grid.appendChild(divider);
  V4_RITUAL_GROUPS.forEach(group => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card';
    const getRituals = (g) => {
      if (g.subgroups) return g.subgroups.flatMap(sg => sg.rituals);
      return g.rituals || [];
    };
    const ritualCount = group.direct ? 1 : getRituals(group).length;
    const lineCount = getRituals(group).reduce((n, rid) => {
      const r = V4_RITUALS.find(x => x.id === rid);
      return n + (r ? r.sections.reduce((m, s) => m + s.lines.length, 0) : 0);
    }, 0);
    card.innerHTML = `
      <span class="lesson-num">${group.icon} <span class="en-sub">Ritual</span></span>
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(group.title))}</span>
      <span class="lesson-topic">${lineCount} 句 <span class="en-sub">${lineCount} lines</span></span>`;
    card.setAttribute('aria-label', `道場禮節 ${group.title}`);
    card.addEventListener('click', () => {
      courseState.lesson = 0; courseState.song = null;
      courseState.ritual = null; courseState.ritualGroup = group.id; courseState.ritualSubgroup = null;
      courseState.page = 'ritual-group';
      renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* 禮節群組頁：若有子群組（燒香禮節）顯示子群組卡，否則顯示禮節卡。 */
function renderRitualGroupView(groupId) {
  const group = V4_RITUAL_GROUPS.find(g => g.id === groupId);
  if (!group) { courseState.page = 'rituals'; renderCourse(); return; }
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'secondary-button grid-back-button';
  setBilingualText(backBtn, '← 回道場禮節', '← Rituals');
  backBtn.addEventListener('click', () => { courseState.page = 'rituals'; courseState.ritualGroup = null; courseState.ritualSubgroup = null; renderCourse(); });
  const backRow = document.createElement('div');
  backRow.className = 'grid-back-row';
  backRow.appendChild(backBtn);
  grid.appendChild(backRow);
  const divider = document.createElement('div');
  divider.className = 'book-divider';
  divider.textContent = group.title;
  grid.appendChild(divider);
  /* 燒香禮節：顯示平常日／初一十五兩個子群組 */
  if (group.subgroups) {
    group.subgroups.forEach(sg => {
      const lineCount = sg.rituals.reduce((n, rid) => {
        const r = V4_RITUALS.find(x => x.id === rid);
        return n + (r ? r.sections.reduce((m, s) => m + s.lines.length, 0) : 0);
      }, 0);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'lesson-card';
      card.innerHTML = `
      <span class="lesson-num">🕯️ <span class="en-sub">Ritual</span></span>
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(sg.title))}</span>
      <span class="lesson-topic">${sg.rituals.length} 個禮節・${lineCount} 句 <span class="en-sub">${sg.rituals.length} rites</span></span>`;
      card.setAttribute('aria-label', `${group.title} ${sg.title}`);
      card.addEventListener('click', () => {
        courseState.ritual = null; courseState.ritualGroup = group.id; courseState.ritualSubgroup = sg.id;
        courseState.page = 'ritual-subgroup'; courseState.lesson = 0; courseState.song = null;
        renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
      });
      grid.appendChild(card);
    });
    return;
  }
  group.rituals.forEach(rid => {
    const ritual = V4_RITUALS.find(r => r.id === rid);
    if (!ritual) return;
    const lineCount = ritual.sections.reduce((n, s) => n + s.lines.length, 0);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card';
    card.innerHTML = `
      <span class="lesson-num">🙏 <span class="en-sub">Ritual</span></span>
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(ritual.title))}</span>
      <span class="lesson-topic">${lineCount} 句 <span class="en-sub">${lineCount} lines</span></span>`;
    card.setAttribute('aria-label', `${group.title} ${ritual.title}`);
    card.addEventListener('click', () => {
      courseState.ritual = rid; courseState.page = 'ritual'; courseState.lesson = 0; courseState.song = null;
      renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* 燒香禮節子群組頁：顯示該子群組下的6個禮節（乾道早午晚香、坤道早午晚香）。 */
function renderRitualSubgroupView(groupId, subgroupId) {
  const group = V4_RITUAL_GROUPS.find(g => g.id === groupId);
  const sg = group && group.subgroups ? group.subgroups.find(s => s.id === subgroupId) : null;
  if (!sg) { courseState.page = 'ritual-group'; renderCourse(); return; }
  $('lessonView').classList.add('hidden');
  const grid = $('lessonGrid');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'secondary-button grid-back-button';
  setBilingualText(backBtn, `← 回${group.title}`, '← Back');
  backBtn.addEventListener('click', () => { courseState.page = 'ritual-group'; courseState.ritualSubgroup = null; renderCourse(); });
  const backRow = document.createElement('div');
  backRow.className = 'grid-back-row';
  backRow.appendChild(backBtn);
  grid.appendChild(backRow);
  const divider = document.createElement('div');
  divider.className = 'book-divider';
  divider.textContent = sg.title;
  grid.appendChild(divider);
  sg.rituals.forEach(rid => {
    const ritual = V4_RITUALS.find(r => r.id === rid);
    if (!ritual) return;
    const lineCount = ritual.sections.reduce((n, s) => n + s.lines.length, 0);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-card';
    card.innerHTML = `
      <span class="lesson-num">🕯️ <span class="en-sub">Ritual</span></span>
      <span class="lesson-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${escapeHtml(zhConvert(ritual.title))}</span>
      <span class="lesson-topic">${lineCount} 句 <span class="en-sub">${lineCount} lines</span></span>`;
    card.setAttribute('aria-label', `${sg.title} ${ritual.title}`);
    card.addEventListener('click', () => {
      courseState.ritual = rid; courseState.page = 'ritual'; courseState.lesson = 0; courseState.song = null;
      renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* 禮節內頁：上方音檔播放器（參辭駕禮）或錄音準備中（燒香禮）＋下方逐句卡片。 */
async function renderRitualView(ritualId) {
  const ritual = V4_RITUALS.find(r => r.id === ritualId);
  if (!ritual) { courseState.ritual = null; courseState.page = 'rituals'; renderCourse(); return; }
  $('lessonGrid').classList.add('hidden');
  const view = $('lessonView');
  view.classList.remove('hidden');
  const backBtn = $('lessonBackButton');
  /* 三層導覽返回：子群組→群組→道場禮節 */
  let backTarget = 'rituals', backLabel = '← 回道場禮節';
  if (courseState.ritualSubgroup) {
    const g = V4_RITUAL_GROUPS.find(x => x.id === courseState.ritualGroup);
    const sg = g && g.subgroups ? g.subgroups.find(s => s.id === courseState.ritualSubgroup) : null;
    if (sg) { backTarget = 'ritual-subgroup'; backLabel = `← 回${sg.title}`; }
  } else if (courseState.ritualGroup) {
    backTarget = 'ritual-group'; backLabel = '← 回道場禮節';
  } else if (ritual.groupId) {
    backTarget = 'ritual-group'; backLabel = `← 回${ritual.groupTitle}`;
  }
  setBilingualText(backBtn, backLabel, '← Back');
  backBtn.onclick = () => {
    courseState.ritual = null;
    courseState.page = backTarget;
    renderCourse(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
  };
  const header = $('lessonHeader');
  header.innerHTML = `<h3 lang="zh-Hant">🙏 ${escapeHtml(ritual.title)}</h3>`;
  $('lessonTabs').innerHTML = '';
  const content = $('lessonContent');
  content.innerHTML = '';
  /* 製作「內容」按鍵：開啟完整版文件（上執禮＋下執禮左右對照，可下載）。 */
  const makeRitualDocButton = (docId) => {
    const doc = V4_RITUAL_DOCS[docId];
    if (!doc) return null;
    const docBtn = document.createElement('button');
    docBtn.type = 'button';
    docBtn.className = 'ritual-doc-button';
    const enMap = { canjia: 'Arrival rite text', cijia: 'Farewell rite text',
      'shaoxiang-qiandao': 'Qiandao morning rite text', 'shaoxiang-kundao': 'Kundao morning rite text' };
    setBilingualText(docBtn, doc.buttonLabel || `📄 ${doc.title}內容`, `📄 ${enMap[docId] || 'Rite text'}`);
    docBtn.addEventListener('click', () => showRitualDoc(docId));
    return docBtn;
  };
  /* 音檔：參辭駕禮用 repo 內 MP3；燒香禮尚無錄音，但有乾道／坤道完整版文件按鍵。 */
  const ritualDocIds = ritual.docIds || (V4_RITUAL_DOCS[ritualId] ? [ritualId] : []);
  if (ritual.audioPath) {
    const audioWrap = document.createElement('div');
    audioWrap.className = 'song-video-wrap';
    const audio = document.createElement('audio');
    audio.id = 'ritualAudio';
    audio.controls = true;
    audio.preload = 'metadata';
    audio.src = ritual.audioPath;
    audio.setAttribute('aria-label', `${ritual.title} 朗讀`);
    audioWrap.appendChild(audio);
    /* 參駕／辭駕：音檔旁加「內容」按鍵，開啟完整版文件（上執禮＋下執禮左右對照，可下載）。 */
    ritualDocIds.forEach(id => { const b = makeRitualDocButton(id); if (b) audioWrap.appendChild(b); });
    content.appendChild(audioWrap);
  } else if (ritualDocIds.length) {
    /* 燒香禮：乾道／坤道各一列，音檔在左、內容按鍵在右（比照參辭駕模式）。 */
    ritualDocIds.forEach(id => {
      const doc = V4_RITUAL_DOCS[id];
      const rowWrap = document.createElement('div');
      rowWrap.className = 'song-video-wrap';
      if (doc && doc.audioPath) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'metadata';
        audio.src = doc.audioPath;
        audio.setAttribute('aria-label', `${doc.title} 朗讀`);
        rowWrap.appendChild(audio);
      }
      const b = makeRitualDocButton(id);
      if (b) rowWrap.appendChild(b);
      content.appendChild(rowWrap);
    });
  } else {
    const note = document.createElement('p');
    note.className = 'section-note';
    setBilingualText(note, '🎙️ 錄音準備中，敬請期待', '🎙️ Audio coming soon');
    content.appendChild(note);
  }
  let globalIdx = 0;
  ritual.sections.forEach((sec, secIdx) => {
    if (sec.title) {
      const secDivider = document.createElement('div');
      secDivider.className = 'book-divider';
      secDivider.textContent = sec.title;
      content.appendChild(secDivider);
    }
    const grid = document.createElement('div');
    grid.className = 'sentence-grid song-lyrics';
    const secSentences = sec.lines.map(line => {
      const s = ritualLineToSentence(ritual, line, globalIdx);
      globalIdx++;
      return s;
    });
    /* 禮節段落＝最小單元：段落內編號＋↑↓移動鈕排序（順序存老師個人帳號）。 */
    renderNumberedUnit(grid, secSentences, {
      unitKey: `ritual_${ritualId}_sec${secIdx}`,
      buildCard: (s) => createCard(s, false)
    });
    content.appendChild(grid);
  });
}

/* 參駕／辭駕完整版文件：dialog 顯示上執禮＋下執禮左右對照（中文＋拼音），可下載獨立 HTML。 */
function showRitualDoc(ritualId) {
  const doc = V4_RITUAL_DOCS[ritualId];
  if (!doc) return;
  const dlg = $('ritualDocDialog');
  $('ritualDocTitle').textContent = doc.docTitle;
  const body = $('ritualDocBody');
  body.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'ritual-doc-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>序</th><th>上執禮 <span class="en-sub">Leader</span></th><th>下執禮 <span class="en-sub">Assembly</span></th></tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  doc.steps.forEach(st => {
    const tr = document.createElement('tr');
    const tdSeq = document.createElement('td');
    tdSeq.className = 'ritual-doc-seq';
    tdSeq.textContent = st.seq;
    tr.appendChild(tdSeq);
    [['shang', 'shangPy'], ['xia', 'xiaPy']].forEach(([zhKey, pyKey]) => {
      const td = document.createElement('td');
      td.className = 'ritual-doc-cell';
      if (st[zhKey]) {
        const zhDiv = document.createElement('div');
        zhDiv.className = 'ritual-doc-zh';
        zhDiv.lang = 'zh-Hant';
        zhDiv.textContent = st[zhKey];
        td.appendChild(zhDiv);
        const pyDiv = document.createElement('div');
        pyDiv.className = 'ritual-doc-py';
        pyDiv.textContent = st[pyKey];
        td.appendChild(pyDiv);
      } else {
        td.innerHTML = '<span class="ritual-doc-empty">—</span>';
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  body.appendChild(table);
  $('ritualDocDownload').onclick = () => downloadRitualDoc(ritualId);
  dlg.showModal();
}

/* 下載完整版文件為獨立 HTML（可列印、中文＋拼音、上下執禮左右對照）。 */
function downloadRitualDoc(ritualId) {
  const doc = V4_RITUAL_DOCS[ritualId];
  if (!doc) return;
  const rows = doc.steps.map(st => {
    const shangCell = st.shang
      ? `<div class="zh">${escapeHtml(st.shang)}</div><div class="py">${escapeHtml(st.shangPy)}</div>`
      : '<span class="empty">—</span>';
    const xiaCell = st.xia
      ? `<div class="zh">${escapeHtml(st.xia)}</div><div class="py">${escapeHtml(st.xiaPy)}</div>`
      : '<span class="empty">—</span>';
    return `<tr><td class="seq">${st.seq}</td><td>${shangCell}</td><td>${xiaCell}</td></tr>`;
  }).join('\n');
  const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(doc.docTitle)}</title>
<style>
body{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;max-width:900px;margin:0 auto;padding:32px 20px;color:#222}
h1{text-align:center;font-size:26px;margin-bottom:8px}
p.note{text-align:center;color:#666;font-size:13px;margin-bottom:24px}
table{width:100%;border-collapse:collapse}
th,td{border:1px solid #bbb;padding:10px 12px;vertical-align:top;text-align:left}
th{background:#f0ebe0}
td.seq{text-align:center;width:44px;color:#666}
.zh{font-size:18px;line-height:1.5}
.py{color:#c0392b;font-size:14px;margin-top:4px}
.empty{color:#aaa}
@media print{body{padding:0} p.note{display:none}}
</style>
</head>
<body>
<h1>${escapeHtml(doc.docTitle)}</h1>
<p class="note">上執禮・下執禮左右對照｜一行中文、一行拼音｜供老師教學、學生練習使用</p>
<table>
<thead><tr><th>序</th><th>上執禮</th><th>下執禮</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${ritualId}-rite-full.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

function renderLessonView() {
  const n = courseState.lesson;
  const lesson = COURSE_LESSONS.find(l => l.n === n);
  if (!lesson) { renderLessonGrid(); return; }
  /* 進入／重繪課程頁時清除上次「新增句子」的分頁指定，避免誤歸類。 */
  if (typeof courseState !== 'undefined') courseState.pendingSection = null;
  $('lessonGrid').classList.add('hidden');
  const view = $('lessonView');
  view.classList.remove('hidden');
  $('lessonBackButton').textContent = '← 回課程總覽';
  const recs = lessonRecords(n);
  const bySection = {};
  recs.forEach(s => {
    const sec = courseMeta(s).section || '課文';
    (bySection[sec] = bySection[sec] || []).push(s);
  });

  const header = $('lessonHeader');
  const goals = bySection['目標'] || [];
  /* 課程標題譯句：取第一筆「目標」記錄的翻譯（displaySource／displayRoman，無翻譯退印地語），顯示在英文標題下方。 */
  const g0 = goals[0];
  const g0p = g0 ? displayProfile(g0) : null;
  const titleT = g0 ? displaySource(g0) : '';
  const titleR = g0 ? displayRoman(g0) : '';
  header.innerHTML = `
    <div class="lesson-header-top"><span class="lesson-num">${lessonLabel(lesson.n)}</span><span class="lesson-topic">${lesson.topic}</span></div>
    <h3 class="lesson-header-zh" lang="${getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant'}">${zhConvert(lesson.zh)}</h3>
    <p class="lesson-header-en">${lesson.en}</p>
    ${titleT ? `<p class="lesson-header-i18n" lang="${g0p.locale}">${escapeHtml(titleT)}</p>` : ''}
    ${titleR ? `<p class="lesson-header-roman">${escapeHtml(titleR)}</p>` : ''}
    ${goals.map(s => { const gp = displayProfile(s); const gt = displayExplanation(s) || displaySource(s); return `<div class="lesson-goals"><strong>學習目標 <span class="en-sub">Learning goals</span></strong><p lang="${gp.locale}">${escapeHtml(gt)}</p></div>`; }).join('')}`;

  const tabs = $('lessonTabs');
  tabs.innerHTML = '';
  /* 2026-10-10：溫習／應用只在第七冊顯示（六冊無此分頁，避免空分頁）。 */
  const isBook7 = bookOf(courseState.lesson) === 7;
  const visibleTabs = COURSE_TABS.filter(tab => isBook7 || (tab !== '溫習' && tab !== '應用'));
  visibleTabs.forEach(tab => {
    const count = (bySection[tab] || []).length;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lesson-tab' + (courseState.tab === tab ? ' active' : '');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', courseState.tab === tab ? 'true' : 'false');
    setBilingualText(button, `${tab}${count ? ` ${count}` : ''}`, `${COURSE_TAB_EN[tab] || tab}${count ? ` ${count}` : ''}`);
    button.addEventListener('click', () => { courseState.tab = tab; renderLessonView(); });
    tabs.appendChild(button);
  });

  const content = $('lessonContent');
  content.innerHTML = '';
  const tabRecs = bySection[courseState.tab] || [];
  /* 補充分頁永遠顯示：即使還沒有內容，老師也要能按「新增」。 */
  if (courseState.tab === '補充') { renderSuppTab(content, tabRecs, n); renderHiddenRestore(content, n); return; }
  /* 課文／生詞／語法／練習／文化：頂部加上老師個人「新增句子」列（登入才顯示）。 */
  renderLessonAddBar(content, n, courseState.tab);
  if (!tabRecs.length) {
    const empty = document.createElement('div');
    empty.className = 'loading-card';
    empty.id = 'lessonEmptyNote';
    setBilingualText(empty, '這個單元還沒有內容。', 'No content in this section yet.');
    content.appendChild(empty);
    renderHiddenRestore(content, n);
    return;
  }
  if (courseState.tab === '課文') renderTextTab(content, tabRecs, n);
  else if (courseState.tab === '生詞') renderVocabTab(content, tabRecs, n);
  else if (courseState.tab === '語法') renderGrammarTab(content, tabRecs, n);
  else renderInfoTab(content, tabRecs, courseState.tab, n);
  renderHiddenRestore(content, n);
}

/* ---- 各分頁新增句子列：登入的老師可在本課本分頁新增個人句子 ---- */
function renderLessonAddBar(content, lessonNum, section) {
  const uid = currentTeacherUid();
  if (!uid) return;
  const bar = document.createElement('div');
  bar.className = 'supp-bar';
  const hint = document.createElement('p');
  hint.className = 'supp-hint';
  const secLabel = { '課文': '課文', '生詞': '生詞', '語法': '語法', '練習': '練習', '文化': '文化' }[section] || section;
  setBilingualText(hint, `老師為本課「${secLabel}」新增的個人句子：只儲存在你的帳號下，跟著本課走，不影響公版教材。`, `Your personal sentences for this lesson's "${secLabel}": saved to your account only, staying with this lesson, without affecting the shared textbooks.`);
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'primary-button';
  setBilingualText(addButton, '＋ 新增句子', '＋ Add a sentence');
  addButton.addEventListener('click', () => goToAiFlowForSection(lessonNum, section));
  bar.appendChild(hint);
  bar.appendChild(addButton);
  content.appendChild(bar);
}

/* ---- 已隱藏的共版卡片：老師可自行恢復顯示 ---- */
function renderHiddenRestore(content, lessonNum) {
  const uid = currentTeacherUid();
  if (!uid) return;
  const hidden = (state.hiddenShared || []).filter(s => courseMeta(s).lesson === String(lessonNum));
  if (!hidden.length) return;
  const box = document.createElement('details');
  box.className = 'hidden-restore';
  const summary = document.createElement('summary');
  setBilingualText(summary, `已隱藏 ${hidden.length} 張卡片（只對你隱藏，點開可恢復）`, `${hidden.length} hidden card${hidden.length > 1 ? 's' : ''} (hidden for you only — open to restore)`);
  box.appendChild(summary);
  hidden.forEach(s => {
    const row = document.createElement('div');
    row.className = 'hidden-restore-row';
    const label = document.createElement('span');
    label.textContent = s.chineseSentence || s.recordId || '';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'secondary-button';
    setBilingualText(btn, '恢復顯示', 'Restore');
    btn.addEventListener('click', () => restoreHiddenCard(s.recordId, btn));
    row.appendChild(label);
    row.appendChild(btn);
    box.appendChild(row);
  });
  content.appendChild(box);
}

async function restoreHiddenCard(sharedId, button) {
  const uid = currentTeacherUid();
  if (!uid || !sharedId) return;
  button.disabled = true;
  try {
    /* 只清除 deleted 旗標，保留老師的其他覆寫（如編輯內容）。 */
    await teacherOverridesRef(uid).doc(sharedId).update({ deleted: fbFieldValue.delete(), updatedAt: serverTimestamp() });
    /* 本地更新（省錢）：把句子從隱藏清單移回句庫，不再全量重讀。 */
    const restoredIdx = state.hiddenShared.findIndex(s => s.recordId === sharedId);
    if (restoredIdx >= 0) {
      const restored = state.hiddenShared.splice(restoredIdx, 1)[0];
      state.sentences.push(restored);
      state.sentences = sortSentencesBySeq(state.sentences);
      $('sentenceCount').textContent = state.sentences.length;
      saveBankCache(state.bankVersion);
    }
    renderCourse();
  } catch (err) {
    button.disabled = false;
    setBilingualText(button, '恢復失敗，請重試', `Restore failed: ${(err && err.message) || 'Unknown error.'}`);
  }
}

function escapeHtml(text) {
  return String(text || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function tagList(s) {
  return String(s.tags || '').split(/[,;|]/).map(t => t.trim()).filter(Boolean);
}

/* ---- 課文：對話／短文 ---- */
function textGroupName(s) {
  const tags = tagList(s);
  for (const name of ['對話一', '對話二', '對話三', '對話', '短文']) {
    if (tags.includes(name)) return name;
  }
  return '課文';
}

/* ============ 句子卡編號＋拖曳排序（2026-10-02） ============
   編號：每張卡上方置中顯示該最小單元內的順序號。
   拖曳：登入老師長按卡片（約0.4秒）後外框發亮，可上下拖曳換位；
         放開後自動重新編號，順序存入該老師個人帳號（cardOrder），公版不動。 */

/* 卡片內部編號：置於卡片框內頂部、左右置中。 */
function addCardNumber(card, num) {
  const el = document.createElement('div');
  el.className = 'card-num-in';
  el.textContent = num;
  el.setAttribute('aria-hidden', 'true');
  card.insertBefore(el, card.firstChild);
  return el;
}

/* 依老師自訂順序排列；一律回傳新陣列（不動原陣列）。
   未在順序表的新卡片維持原相對順序、排在最後。 */
function applyUnitOrder(recs, orderArr) {
  if (!orderArr || !orderArr.length) return recs.slice();
  const idx = new Map();
  orderArr.forEach((id, i) => { const k = String(id); if (!idx.has(k)) idx.set(k, i); });
  return recs.slice().sort((a, b) => {
    const ia = idx.has(String(a.recordId)) ? idx.get(String(a.recordId)) : Infinity;
    const ib = idx.has(String(b.recordId)) ? idx.get(String(b.recordId)) : Infinity;
    return ia - ib;
  });
}

/* 讀取老師全部自訂單元順序：v4_teachers/{uid}/cardOrder/{unitKey} = {order:[recordId]} */
function loadAllUnitOrders(uid) {
  if (!uid) return Promise.resolve({});
  return fbDb.collection('v4_teachers').doc(uid).collection('cardOrder').get().then(snap => {
    const orders = {};
    snap.docs.forEach(d => {
      const arr = d.data() && d.data().order;
      if (Array.isArray(arr) && arr.length) orders[d.id] = arr.map(String);
    });
    return orders;
  });
}

/* 儲存某單元順序：同步更新記憶體＋本機快取，避免重整閃回舊順序。 */
function saveUnitOrder(uid, unitKey, recordIds) {
  if (!uid || !unitKey) return Promise.resolve();
  const arr = recordIds.map(String);
  state.unitOrders[unitKey] = arr;
  try { saveBankCache(state.bankVersion); } catch (_) {}
  return fbDb.collection('v4_teachers').doc(uid).collection('cardOrder').doc(unitKey)
    .set({ order: arr, updatedAt: serverTimestamp() })
    .catch(err => console.warn('cardOrder save failed:', (err && err.message) || err));
}

/* ============ 句子卡上下移動順序（2026-10-02 改版） ============
   長按拖曳已取消，改為每張卡片內的 ↑ ↓ 按鈕（放在「編輯」左邊）。
   點擊後卡片發光＋跳出確認框，使用者按「確定」才真正換位；
   課程順序原則上不容隨意更動。順序存老師個人帳號（cardOrder），公版不動。 */
let pendingMove = null; /* {container, card, dir, unitKey, uid} */

function movableCards(container) {
  return Array.from(container.querySelectorAll(':scope > .mv-card'));
}

function renumberCards(container) {
  movableCards(container).forEach((card, i) => {
    const n = card.querySelector(':scope > .card-num-in');
    if (n) n.textContent = i + 1;
  });
}

/* 首張的 ↑、末張的 ↓ 停用。 */
function refreshMoveButtons(container) {
  const cards = movableCards(container);
  cards.forEach((card, i) => {
    const up = card.querySelector('.move-up');
    const down = card.querySelector('.move-down');
    if (up) up.disabled = (i === 0);
    if (down) down.disabled = (i === cards.length - 1);
  });
}

/* 在卡片內加入 ↑ ↓ 按鈕：句子卡放 .card-admin 內「編輯」左邊；
   生詞卡放 .vocab-actions 內編輯鈕左邊；說明卡放 .info-actions 內編輯鈕左邊。 */
function addMoveButtons(card) {
  const mkBtn = (cls, label, title) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'icon-button move-btn ' + cls;
    b.textContent = label;
    b.setAttribute('aria-label', title);
    b.title = title;
    return b;
  };
  const up = mkBtn('move-up', '↑', '上移 (Move up)');
  const down = mkBtn('move-down', '↓', '下移 (Move down)');
  const admin = card.querySelector('.card-admin');
  if (admin) {
    const editBtn = admin.querySelector('.card-edit-button');
    if (editBtn) { admin.insertBefore(down, editBtn); admin.insertBefore(up, down); }
    else { admin.appendChild(up); admin.appendChild(down); }
    return;
  }
  const vActions = card.querySelector('.vocab-actions');
  if (vActions) {
    const editBtn = vActions.querySelector('.vocab-edit');
    if (editBtn) { vActions.insertBefore(down, editBtn); vActions.insertBefore(up, down); }
    else { vActions.appendChild(up); vActions.appendChild(down); }
    return;
  }
  const iActions = card.querySelector('.info-actions');
  if (iActions) {
    const editBtn = iActions.querySelector('.info-edit');
    if (editBtn) { iActions.insertBefore(down, editBtn); iActions.insertBefore(up, down); }
    else { iActions.appendChild(up); iActions.appendChild(down); }
  }
}

/* 事件委派：容器只綁定一次，opts 每次更新。 */
function attachMoveHandlers(container, unitKey, uid) {
  container._moveOpts = { unitKey, uid };
  if (container.dataset.moveBound === '1') return;
  container.dataset.moveBound = '1';
  container.addEventListener('click', (e) => {
    const btn = e.target.closest ? e.target.closest('.move-up, .move-down') : null;
    if (!btn || !container.contains(btn) || btn.disabled) return;
    const card = btn.closest('.mv-card');
    if (!card) return;
    const o = container._moveOpts || {};
    if (!o.unitKey || !o.uid) return;
    const dir = btn.classList.contains('move-up') ? -1 : 1;
    requestMove(container, card, dir, o.unitKey, o.uid);
  });
}

function requestMove(container, card, dir, unitKey, uid) {
  const cards = movableCards(container);
  const i = cards.indexOf(card);
  const j = i + dir;
  if (j < 0 || j >= cards.length) return;
  card.classList.add('card-glow');
  pendingMove = { container, card, dir, unitKey, uid };
  const dlg = $('moveConfirmDialog');
  if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
  else if (window.confirm('確定要改變句子卡順序嗎？')) confirmMove();
  else cancelMove();
}

function confirmMove() {
  const m = pendingMove;
  pendingMove = null;
  const dlg = $('moveConfirmDialog');
  if (dlg && dlg.open) dlg.close();
  if (!m) return;
  const { container, card, dir, unitKey, uid } = m;
  card.classList.remove('card-glow');
  const cards = movableCards(container);
  const i = cards.indexOf(card);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= cards.length) return;
  const other = cards[j];
  if (dir < 0) container.insertBefore(card, other);
  else container.insertBefore(card, other.nextSibling);
  renumberCards(container);
  refreshMoveButtons(container);
  const ids = movableCards(container).map(c => c.dataset.recordId).filter(Boolean);
  saveUnitOrder(uid, unitKey, ids);
  /* 換位後讓被移動的卡片回到可視範圍。 */
  try { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (_) {}
}

function cancelMove() {
  if (pendingMove) pendingMove.card.classList.remove('card-glow');
  pendingMove = null;
  const dlg = $('moveConfirmDialog');
  if (dlg && dlg.open) dlg.close();
}

/* 渲染一個「編號＋可移動順序」卡片單元。
   container: 卡片容器；recs: 句子陣列（會依老師自訂順序就地重排，讓連播等閉包吃到新順序）。
   opts: { unitKey, buildCard(s)->卡片元素, canDrag()->bool }。
   編號在卡片框內頂部置中；登入老師的卡片另有 ↑ ↓ 移動鈕（按鈕要再次確認才換位）。 */
function renderNumberedUnit(container, recs, opts) {
  opts = opts || {};
  const uid = currentTeacherUid();
  const order = (uid && opts.unitKey && state.unitOrders[opts.unitKey]) || null;
  const ordered = applyUnitOrder(recs, order);
  recs.length = 0;
  ordered.forEach(s => recs.push(s));
  const canMove = !!(opts.unitKey && uid && (!opts.canDrag || opts.canDrag()));
  ordered.forEach((s, i) => {
    const card = opts.buildCard(s);
    addCardNumber(card, i + 1);
    card.classList.add('mv-card');
    card.dataset.recordId = String(s.recordId);
    if (canMove) addMoveButtons(card);
    container.appendChild(card);
  });
  if (canMove) {
    attachMoveHandlers(container, opts.unitKey, uid);
    refreshMoveButtons(container);
  }
  return ordered;
}

/* 只編號不移動（搜尋結果、訪客視角）。 */
function renderNumberedStatic(container, recs, buildCard) {
  recs.forEach((s, i) => {
    const card = buildCard(s);
    addCardNumber(card, i + 1);
    container.appendChild(card);
  });
}

function renderTextTab(content, recs, lessonNum) {
  const groups = {};
  recs.forEach(s => {
    const g = textGroupName(s);
    (groups[g] = groups[g] || []).push(s);
  });
  Object.keys(groups).sort((a, b) => {
    const order = ['對話一', '對話二', '對話三', '對話', '短文', '課文'];
    return order.indexOf(a) - order.indexOf(b);
  }).forEach(groupName => {
    const lines = groups[groupName];
    const section = document.createElement('div');
    section.className = 'text-group';
    const head = document.createElement('div');
    head.className = 'text-group-head';
    const title = document.createElement('h4');
    title.textContent = groupName;
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'secondary-button text-play-button';
    playButton.textContent = '▶ 連播';
    playButton.setAttribute('aria-label', bilingualLabel(`連播${groupName}`, `Play ${groupName}`));
    playButton.title = '連播全部 (Play all)';
    playButton.addEventListener('click', () => playTextGroup(lines, playButton));
    /* 合併複習：選範圍（預設整組）→ 整合段落面板 → 連續播放。 */
    const mergeWrap = document.createElement('span');
    mergeWrap.className = 'merge-range';
    const mergeCount = lines.length;
    mergeWrap.innerHTML =
      '從第 <input type="number" class="merge-from" min="1" max="' + mergeCount + '" value="1" aria-label="從第幾句"> ' +
      '句到第 <input type="number" class="merge-to" min="1" max="' + mergeCount + '" value="' + mergeCount + '" aria-label="到第幾句"> 句 ';
    const mergeBtn = document.createElement('button');
    mergeBtn.type = 'button';
    mergeBtn.className = 'secondary-button merge-review-btn';
    mergeBtn.innerHTML = '合併複習 <span class="en-sub">Review</span>';
    mergeBtn.setAttribute('aria-label', bilingualLabel(`合併複習${groupName}`, `Merge review ${groupName}`));
    mergeBtn.title = '選取範圍合併成段落複習 (Merge a range into a passage)';
    mergeBtn.addEventListener('click', () => {
      const fromEl = mergeWrap.querySelector('.merge-from');
      const toEl = mergeWrap.querySelector('.merge-to');
      let from = Math.max(1, Math.min(mergeCount, parseInt(fromEl.value, 10) || 1));
      let to = Math.max(1, Math.min(mergeCount, parseInt(toEl.value, 10) || mergeCount));
      if (from > to) { const t = from; from = to; to = t; }
      fromEl.value = from; toEl.value = to;
      openMergeReview(groupName, lines.slice(from - 1, to), from, to);
    });
    mergeWrap.appendChild(mergeBtn);
    const headBtns = document.createElement('div');
    headBtns.className = 'text-group-btns';
    headBtns.appendChild(mergeWrap); headBtns.appendChild(playButton);
    head.appendChild(title); head.appendChild(headBtns);
    section.appendChild(head);
    /* 對話分組＝最小單元：組內編號＋↑↓移動鈕排序（順序存老師個人帳號）。 */
    renderNumberedUnit(section, lines, {
      unitKey: `L${lessonNum}_text_${groupName}`,
      buildCard: (s) => {
        const card = createCard(s);
        const speaker = courseMeta(s).speaker;
        if (speaker) {
          const badge = document.createElement('div');
          badge.className = 'script-speaker';
          badge.textContent = speaker;
          badge.setAttribute('lang', 'zh-Hant');
          card.insertBefore(badge, card.firstChild);
        }
        return card;
      }
    });
    content.appendChild(section);
  });
}

/* ---- 生詞：緊湊單字卡 ---- */
function vocabGroupName(s) {
  const tags = tagList(s);
  if (tags.includes('生詞一')) return '生詞一';
  if (tags.includes('生詞二')) return '生詞二';
  return '生詞';
}

function renderVocabTab(content, recs, lessonNum) {
  const groups = {};
  recs.forEach(s => {
    const g = vocabGroupName(s);
    (groups[g] = groups[g] || []).push(s);
  });
  ['生詞一', '生詞二', '生詞'].filter(g => groups[g]).forEach(groupName => {
    const head = document.createElement('h4');
    head.className = 'text-group-head-title';
    head.textContent = `${groupName}（${groups[groupName].length}）`;
    content.appendChild(head);
    const grid = document.createElement('div');
    grid.className = 'vocab-grid';
    /* 2026-10-10：第七冊單字用緊湊生詞卡，詞組／例句用完整句子卡（依 vocabKind 區分）。 */
    renderNumberedUnit(grid, groups[groupName], {
      unitKey: `L${lessonNum}_vocab_${groupName}`,
      buildCard: (s) => (s.vocabKind === 'phrase' ? createCard(s) : createVocabCard(s))
    });
    content.appendChild(grid);
  });
}

function createVocabCard(sentence) {
  const meta = courseMeta(sentence);
  const node = document.createElement('div');
  node.className = 'vocab-card';
  /* 2026-10-02：老師個人新增的生詞卡，外框與公版區分（同句子卡的暖金色）。 */
  if (sentence._owner && sentence._owner !== 'shared') node.classList.add('personal-card');
  node.innerHTML = `
    <div class="vocab-top"><span class="vocab-word" lang="zh-Hant"></span>${meta.pos ? `<span class="vocab-pos">${escapeHtml(meta.pos)}</span>` : ''}</div>
    <div class="vocab-pinyin"></div>
    ${meta.zhuyin ? `<div class="vocab-zhuyin" lang="zh-Hant"></div>` : ''}
    <div class="vocab-hindi-row"><span class="vocab-hindi" lang="hi"></span></div>
    <div class="vocab-roman"></div>
    <div class="vocab-example"></div>
    <div class="vocab-actions">
      <button type="button" class="icon-button vocab-speak" aria-label="播放中文發音 (Play Chinese)" title="播放中文發音 (Play Chinese)">🔊</button>
      <button type="button" class="icon-button vocab-download" aria-label="下載老師錄音 (Download recording)" title="下載老師錄音 (Download recording)" hidden>⤓</button>
      <button type="button" class="icon-button card-record-button" aria-label="錄下你的聲音 (Record your voice)" title="錄音 (Record)">🎙</button>
      <button type="button" class="icon-button card-play-button" aria-label="播放我的錄音 (Play my recording)" title="播放錄音 (Play recording)">▶</button>
      <button type="button" class="icon-button card-save-model-button" aria-label="Save as teacher model" title="Save as teacher model">💾</button>
      <button type="button" class="icon-button vocab-edit" aria-label="Edit" title="Edit">✏️</button>
    </div>
    <div class="card-recording-status vocab-status" aria-live="polite"></div>`;
  node.querySelector('.vocab-word').textContent = zhConvert(sentence.chineseSentence) || '';
  node.querySelector('.vocab-word').setAttribute('lang', getZhMode() === 'simp' ? 'zh-Hans' : 'zh-Hant');
  node.querySelector('.vocab-pinyin').textContent = sentence.pinyin || '';
  const zhuyinEl = node.querySelector('.vocab-zhuyin');
  if (zhuyinEl) zhuyinEl.textContent = meta.zhuyin;
  const vocabProfile = displayProfile(sentence);
  node.querySelector('.vocab-hindi').textContent = displaySource(sentence);
  node.querySelector('.vocab-hindi').setAttribute('lang', vocabProfile.locale);
  const roman = displayRoman(sentence);
  const romanEl = node.querySelector('.vocab-roman');
  romanEl.textContent = roman || '';
  romanEl.hidden = !roman;
  romanEl.setAttribute('lang', vocabProfile.locale + '-Latn');
  const exampleEl = node.querySelector('.vocab-example');
  exampleEl.textContent = displayExplanation(sentence);
  exampleEl.hidden = !displayExplanation(sentence);
  node.querySelector('.vocab-speak').addEventListener('click', e => playSentenceModel(sentence, e.currentTarget));
  const vocabDl = node.querySelector('.vocab-download');
  vocabDl.hidden = !sentence.standardAudioUrl;
  vocabDl.addEventListener('click', () => downloadTeacherAudio(sentence, vocabDl));
  node.querySelector('.card-record-button').addEventListener('click', () => toggleCardRecording(node, sentence, false));
  node.querySelector('.card-play-button').addEventListener('click', () => {
    const recording = recordingForSentence(sentence);
    if (recording) new Audio(recording.url).play();
  });
  const vocabSaveButton = node.querySelector('.card-save-model-button');
  vocabSaveButton.addEventListener('click', () => saveModelAudioInline(vocabSaveButton, sentence, node));
  paintModelSaveButton(vocabSaveButton, sentence);
  node.querySelector('.vocab-edit').addEventListener('click', () => openEditDialog(sentence));
  return node;
}

/* ---- 語法：句型＋例句 ---- */
function renderGrammarTab(content, recs, lessonNum) {
  const groups = {};
  recs.forEach(s => {
    const tags = tagList(s);
    const key = tags.find(t => new RegExp(`^L${lessonNum}-G\\d+$`, 'i').test(t)) || '其他';
    (groups[key] = groups[key] || []).push(s);
  });
  Object.keys(groups).sort().forEach(key => {
    const items = groups[key];
    /* 2026-10-02 修復：句型標題只認公版「句型」卡。老師個人新增的句子（_owner 非 shared）
       永遠渲染為例句卡，不可被誤當成句型標題（否則會變成無按鈕的素卡）。 */
    const isPersonal = (s) => s._owner && s._owner !== 'shared';
    const point = items.find(s => !isPersonal(s) && tagList(s).some(t => t === '句型'))
               || items.find(s => !isPersonal(s));
    const examples = point ? items.filter(s => s !== point) : items.slice();
    const block = document.createElement('div');
    block.className = 'grammar-block';
    if (point) {
      const head = document.createElement('div');
      head.className = 'grammar-point';
      head.innerHTML = `
      <div class="grammar-pattern" lang="zh-Hant"></div>
      <div class="grammar-pinyin"></div>
      <div class="grammar-hindi" lang="hi"></div>
      <div class="grammar-function" lang="hi"></div>`;
      const grammarProfile = displayProfile(point);
      head.querySelector('.grammar-pattern').textContent = point.chineseSentence || '';
      head.querySelector('.grammar-pinyin').textContent = point.pinyin || '';
      const grammarHindiEl = head.querySelector('.grammar-hindi');
      grammarHindiEl.textContent = displaySource(point);
      grammarHindiEl.setAttribute('lang', grammarProfile.locale);
      const funcEl = head.querySelector('.grammar-function');
      funcEl.textContent = displayExplanation(point);
      funcEl.hidden = !displayExplanation(point);
      funcEl.setAttribute('lang', grammarProfile.locale);
      block.appendChild(head);
    }
    /* 語法點＝最小單元：句型標題不編號，例句組內編號＋↑↓移動鈕排序。 */
    renderNumberedUnit(block, examples, {
      unitKey: `L${lessonNum}_grammar_${key}`,
      buildCard: (s) => createCard(s)
    });
    content.appendChild(block);
  });
}

/* ---- 練習／文化：說明卡 ---- */
function renderInfoTab(content, recs, tabName, lessonNum) {
  /* 練習／文化整頁＝最小單元：編號＋↑↓移動鈕排序。 */
  renderNumberedUnit(content, recs, {
    unitKey: `L${lessonNum}_${tabName}`,
    buildCard: (s) => {
      const card = document.createElement('div');
      card.className = 'info-card';
      /* 2026-10-02：老師個人新增的說明卡，外框與公版區分（同句子卡的暖金色）。 */
      if (s._owner && s._owner !== 'shared') card.classList.add('personal-card');
      card.innerHTML = `
        <div class="info-kicker">${tabName} <span class="en-sub">${COURSE_TAB_EN[tabName] || ''}</span></div>
        <div class="info-zh-row"><h4 class="info-zh" lang="zh-Hant"></h4><button type="button" class="icon-button info-speak" aria-label="播放中文發音 (Play Chinese)" title="播放中文發音 (Play Chinese)">🔊</button></div>
        <div class="info-hi-row"><p class="info-hi" lang="hi"></p></div>
        <p class="info-explain" lang="hi"></p>
        <div class="info-actions">
          <button type="button" class="icon-button info-download" aria-label="下載老師錄音 (Download recording)" title="下載老師錄音 (Download recording)" hidden>⤓</button>
          <button type="button" class="icon-button card-record-button" aria-label="錄下你的聲音 (Record your voice)" title="錄音 (Record)">🎙</button>
          <button type="button" class="icon-button card-play-button" aria-label="播放我的錄音 (Play my recording)" title="播放錄音 (Play recording)">▶</button>
          <button type="button" class="icon-button card-save-model-button" aria-label="存為示範 (Save as teacher model)" title="存為示範 (Save as teacher model)">💾</button>
          <button type="button" class="icon-button info-edit" aria-label="編輯 (Edit)" title="編輯 (Edit)">✏️</button>
        </div>
        <div class="card-recording-status info-status" aria-live="polite"></div>`;
      const infoProfile = displayProfile(s);
      card.querySelector('.info-zh').textContent = s.chineseSentence || '';
      const infoHiEl = card.querySelector('.info-hi');
      infoHiEl.textContent = displaySource(s);
      infoHiEl.setAttribute('lang', infoProfile.locale);
      const explainEl = card.querySelector('.info-explain');
      explainEl.textContent = displayExplanation(s);
      explainEl.hidden = !displayExplanation(s);
      explainEl.setAttribute('lang', infoProfile.locale);
      /* 發音／錄音：與句子卡、生詞卡同一套函式。 */
      card.querySelector('.info-speak').addEventListener('click', e => playSentenceModel(s, e.currentTarget));
      const infoDl = card.querySelector('.info-download');
      infoDl.hidden = !s.standardAudioUrl;
      infoDl.addEventListener('click', () => downloadTeacherAudio(s, infoDl));
      card.querySelector('.card-record-button').addEventListener('click', () => toggleCardRecording(card, s, false));
      card.querySelector('.card-play-button').addEventListener('click', () => {
        const recording = recordingForSentence(s);
        if (recording) new Audio(recording.url).play();
      });
      const infoSaveButton = card.querySelector('.card-save-model-button');
      infoSaveButton.addEventListener('click', () => saveModelAudioInline(infoSaveButton, s, card));
      paintModelSaveButton(infoSaveButton, s);
      card.querySelector('.info-edit').addEventListener('click', () => openEditDialog(s));
      return card;
    }
  });
}

/* ---- 補充：老師針對本課臨時加的句子 ---- */
function renderSuppTab(content, recs, lessonNum) {
  const bar = document.createElement('div');
  bar.className = 'supp-bar';
  const hint = document.createElement('p');
  hint.className = 'supp-hint';
  setBilingualText(hint, '老師針對本課補充的句子：課堂上臨時加的例句、學生問到的句子，都可以記在這裡，跟著本課走。按右方按鈕前往上方的 AI 新增流程，完成後句子會自動歸入本課「補充」。', 'Sentences you add for this lesson: examples added in class or questions from students can be noted here and stay with this lesson. Use the button on the right to go to the AI flow above; finished sentences are automatically filed under this lesson\u2019s \u201cSupplement\u201d tab.');
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'primary-button';
  setBilingualText(addButton, '＋ 新增補充句子', '＋ Add a supplementary sentence');
  addButton.addEventListener('click', () => goToAiFlowForSupp(lessonNum));
  bar.appendChild(hint);
  bar.appendChild(addButton);
  content.appendChild(bar);
  if (!recs.length) {
    const empty = document.createElement('div');
    empty.className = 'loading-card';
    setBilingualText(empty, '還沒有補充內容，按上面按鈕新增第一句。', 'No supplementary content yet. Use the button above to add the first sentence.');
    content.appendChild(empty);
    return;
  }
  /* 補充整頁＝最小單元：編號＋↑↓移動鈕排序。 */
  renderNumberedUnit(content, recs, {
    unitKey: `L${lessonNum}_supp`,
    buildCard: (s) => {
      const card = createCard(s);
      const speaker = courseMeta(s).speaker;
      if (speaker) {
        const badge = document.createElement('div');
        badge.className = 'script-speaker';
        badge.textContent = speaker;
        badge.setAttribute('lang', 'zh-Hant');
        card.insertBefore(badge, card.firstChild);
      }
      return card;
    }
  });
}

/* ---- 課文連播 ---- */
let textPlay = { playing: false, queue: [], index: 0 };
function stopTextPlay() {
  textPlay.playing = false;
  try { speechSynthesis.cancel(); } catch (_) {}
  document.querySelectorAll('.text-play-button.text-playing').forEach(b => {
    b.classList.remove('text-playing');
    b.textContent = '▶ 連播';
    b.title = '連播全部 (Play all)';
  });
}
async function fetchTeacherAudioUrl(sentence) {
  if (!sentence.standardAudioUrl) return null;
  const cached = teacherAudioCache.get(sentence.recordId);
  if (cached) return cached;
  try {
    const url = await fbStorage.ref(sentence.audioPath || sentence.standardAudioUrl).getDownloadURL();
    teacherAudioCache.set(sentence.recordId, url);
    return url;
  } catch (_) {
    return null;
  }
}
/* 下載老師錄音檔：只有 Storage 真的有檔案的句子才顯示下載鈕
  （瀏覽器 TTS 即時發音沒有檔案可下載）。 */
async function downloadTeacherAudio(sentence, button) {
  const url = await fetchTeacherAudioUrl(sentence);
  if (!url) return;
  // 檔名用中文句子（清理不合法字元，過長截斷）
  const rawSentence = sentence.chineseSentence || sentence.recordId || 'recording';
  let baseName = String(rawSentence).replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 10) || 'recording';
  let fileName = baseName;
  // 根據實際音檔格式修正副檔名（舊檔可能存成.webm但內容是wav）
  try {
    if (button) button.disabled = true;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('fetch failed');
    const blob = await resp.blob();
    const actualMime = blob.type || sentence.audioMime || '';
    const correctExt = actualMime.includes('wav') ? 'wav' : actualMime.includes('mp4') ? 'm4a' : actualMime.includes('webm') ? 'webm' : 'wav';
    fileName = fileName.replace(/\.(webm|wav|m4a|mp3)$/i, '') + '.' + correctExt;
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objUrl), 10000);
  } catch (_) {
    /* 跨域抓檔失敗時退回新分頁開啟，使用者再手動儲存。 */
    window.open(url, '_blank', 'noopener');
  } finally {
    if (button) button.disabled = false;
  }
}
function playTextGroup(lines, button) {
  if (textPlay.playing) { stopTextPlay(); return; }
  stopTextPlay();
  textPlay = { playing: true, queue: lines.slice(), index: 0 };
  button.classList.add('text-playing');
  button.textContent = '⏹ 停止';
  button.title = '停止 (Stop)';
  playNextTextLine();
}
async function playNextTextLine() {
  if (!textPlay.playing) return;
  if (textPlay.index >= textPlay.queue.length) { stopTextPlay(); return; }
  const s = textPlay.queue[textPlay.index];
  const audioUrl = await fetchTeacherAudioUrl(s);
  if (!textPlay.playing) return;
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.onended = audio.onerror = () => { textPlay.index += 1; playNextTextLine(); };
    try { await audio.play(); } catch (_) { textPlay.index += 1; playNextTextLine(); }
  } else {
    try {
      const utterance = new SpeechSynthesisUtterance(s.chineseSentence || '');
      utterance.lang = state.settings.defaultVoice || 'zh-TW';
      utterance.rate = Number(state.settings.speechRate) || 0.85;
      utterance.onend = utterance.onerror = () => { textPlay.index += 1; playNextTextLine(); };
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (_) { textPlay.index += 1; playNextTextLine(); }
  }
}

/* ---- 合併複習：選範圍 → 整合段落面板 → 連續播放 ---- */
let mergePlay = { playing: false, lines: [], index: 0, lineEls: [], passageEl: null, audioEl: null };
function stopMergedReview() {
  mergePlay.playing = false;
  try { speechSynthesis.cancel(); } catch (_) {}
  try { if (mergePlay.audioEl) mergePlay.audioEl.pause(); } catch (_) {}
  mergePlay.audioEl = null;
  mergePlay.lineEls.forEach(el => el.classList.remove('mr-playing'));
  const btn = document.querySelector('#mergeReviewDialog .mr-play-btn');
  if (btn) { btn.classList.remove('playing'); btn.innerHTML = '▶ 連續播放 <span class="en-sub">Play all</span>'; }
}
function highlightMergedLine(idx) {
  mergePlay.lineEls.forEach((el, i) => el.classList.toggle('mr-playing', i === idx));
  const el = mergePlay.lineEls[idx];
  /* 播到哪一句，就把該句提到段落最上面（投影時下方常被擋住）。 */
  if (el && mergePlay.passageEl) mergePlay.passageEl.prepend(el);
}
async function playNextMergedLine() {
  if (!mergePlay.playing) return;
  if (mergePlay.index >= mergePlay.lines.length) { stopMergedReview(); return; }
  const s = mergePlay.lines[mergePlay.index];
  highlightMergedLine(mergePlay.index);
  const audioUrl = await fetchTeacherAudioUrl(s);
  if (!mergePlay.playing) return;
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    mergePlay.audioEl = audio;
    audio.onended = audio.onerror = () => { mergePlay.index += 1; playNextMergedLine(); };
    try { await audio.play(); } catch (_) { mergePlay.index += 1; playNextMergedLine(); }
  } else {
    try {
      const utterance = new SpeechSynthesisUtterance(s.chineseSentence || '');
      utterance.lang = state.settings.defaultVoice || 'zh-TW';
      utterance.rate = Number(state.settings.speechRate) || 0.85;
      utterance.onend = utterance.onerror = () => { mergePlay.index += 1; playNextMergedLine(); };
      speechSynthesis.speak(utterance);
    } catch (_) { mergePlay.index += 1; playNextMergedLine(); }
  }
}
function toggleMergedPlay() {
  if (mergePlay.playing) { stopMergedReview(); return; }
  stopTextPlay(); /* 與整組連播互斥 */
  try { speechSynthesis.cancel(); } catch (_) {}
  mergePlay.playing = true;
  mergePlay.index = 0;
  /* 每次從頭播都先恢復原始順序（上一輪可能把句子提到上面過）。 */
  if (mergePlay.passageEl) mergePlay.lineEls.forEach(el => mergePlay.passageEl.appendChild(el));
  mergePlay.lineEls.forEach(el => el.classList.remove('mr-playing'));
  const btn = document.querySelector('#mergeReviewDialog .mr-play-btn');
  if (btn) { btn.classList.add('playing'); btn.innerHTML = '⏹ 停止 <span class="en-sub">Stop</span>'; }
  playNextMergedLine();
}
function openMergeReview(groupName, selLines, fromNum, toNum) {
  stopMergedReview();
  stopTextPlay();
  let dlg = document.getElementById('mergeReviewDialog');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'mergeReviewDialog';
    document.body.appendChild(dlg);
    dlg.addEventListener('close', stopMergedReview);
  }
  const passageHtml = selLines.map(s => {
    const speaker = courseMeta(s).speaker;
    const spk = speaker ? '<span class="mr-speaker">' + escapeHtml(speaker) + '：</span>' : '';
    return '<div class="mr-line">' +
      '<div class="mr-line-main">' + spk + '<span class="mr-text" lang="zh-Hant">' + escapeHtml(s.chineseSentence || '') + '</span></div>' +
      (s.pinyin ? '<div class="mr-pinyin">' + escapeHtml(s.pinyin) + '</div>' : '') +
      '</div>';
  }).join('');
  dlg.innerHTML =
    '<button class="dialog-close" id="closeMergeReview" aria-label="關閉合併複習視窗">×</button>' +
    '<span class="step">合併複習 <span class="en-sub">MERGE REVIEW</span></span>' +
    '<h2>' + escapeHtml(groupName) + '：第' + fromNum + '–' + toNum + '句 <span class="en-sub">' + selLines.length + ' lines</span></h2>' +
    '<button type="button" class="primary-button mr-play-btn">▶ 連續播放 <span class="en-sub">Play all</span></button>' +
    '<div class="mr-passage">' + passageHtml + '</div>';
  mergePlay = { playing: false, lines: selLines.slice(), index: 0, lineEls: Array.from(dlg.querySelectorAll('.mr-line')), passageEl: dlg.querySelector('.mr-passage'), audioEl: null };
  dlg.querySelector('#closeMergeReview').addEventListener('click', () => dlg.close());
  dlg.querySelector('.mr-play-btn').addEventListener('click', toggleMergedPlay);
  dlg.showModal();
}

/* ---- 內容包匯入 ---- */
let packRecordsCache = [];
let packTranslationMode = false; /* 翻譯包：只寫入 i18n.{lang}，不動印地語原文 */
function splitPackRecords(text) {
  return String(text || '').split(/^===RECORD===$/m).map(s => s.trim()).filter(s => s && !s.startsWith('#'));
}
async function loadPackPreview() {
  const fileInput = $('packFileInput');
  const file = fileInput && fileInput.files && fileInput.files[0];
  const info = $('packInfo');
  const importButton = $('packImportButton');
  importButton.disabled = true;
  packRecordsCache = [];
  if (!file) { info.textContent = '請先選擇內容包 .txt 檔案（例如 packs/lesson-01.txt）。'; return; }
  info.textContent = '讀取中…';
  try {
    const text = await file.text();
    const records = splitPackRecords(text);
    if (!records.length) throw new Error('檔案中沒有找到記錄');
    if (records.some(r => /(^|\n)TRANSLATION_LANG:/.test(r))) {
      await loadTranslationPreview(records);
      return;
    }
    packTranslationMode = false;
    const lessonKey = String(parsePaste(records[0]).lesson || '');
    const updateMode = $('importUpdateCheckbox').checked;
    const lessonNum = Number(lessonKey) || 0;
    /* 比對鍵：課＋節＋中文＋說話人＋解釋；中文鍵作後備，避免重複寫入。 */
    const matchKey = (lesson, section, chinese, speaker, expl) =>
      [lesson, section, chinese, speaker, expl].join('‖');
    const existingByKey = new Map();
    const existingByChinese = new Map();
    lessonRecords(lessonKey).forEach(s => {
      const m = courseMeta(s);
      existingByKey.set(matchKey(m.lesson, m.section, (s.chineseSentence || '').trim(), m.speaker, (s.hindiExplanation || '').trim()), s);
      const ck = (s.chineseSentence || '').trim();
      if (ck && !existingByChinese.has(ck)) existingByChinese.set(ck, s);
    });
    const items = [];
    records.forEach((r, idx) => {
      const p = parsePaste(r);
      if (!p.chineseSentence) return;
      const ck = p.chineseSentence.trim();
      const old = existingByKey.get(matchKey(lessonKey, (p.section || '').trim(), ck, (p.speaker || '').trim(), (p.hindiExplanation || '').trim()))
        || existingByChinese.get(ck);
      if (old && !updateMode) return; /* 已存在且未勾更新：跳過 */
      items.push({
        content: r,
        oldRecordId: old ? old.recordId : null,
        hasAudio: !!(old && (old.standardAudioUrl || teacherAudioCache.get(old.recordId) || recordingForSentence(old))),
        seq: lessonNum ? lessonNum * 100000 + (idx + 1) : null, /* 內容包內順序 */
      });
    });
    packRecordsCache = items;
    const updates = items.filter(i => i.oldRecordId).length;
    const fresh = items.length - updates;
    const lessonLabelText = lessonKey ? lessonLabel(Number(lessonKey)) : '內容包';
    info.textContent = `${lessonLabelText}：${records.length} 條記錄，${fresh} 條新增${updates ? `，${updates} 條更新（取代舊記錄）` : ''}。`;
    importButton.disabled = items.length === 0;
  } catch (err) {
    info.textContent = `讀取失敗：${err.message}。`;
  }
}
/* ---- 翻譯包：課程多語言翻譯匯入 ----
   記錄格式：
     LESSON / SECTION / CHINESE / SPEAKER / EXPLANATION（比對鍵用，EXPLANATION 為原文印地語解說）
     TRANSLATION_LANG / T_SOURCE / T_ROMAN / T_EXPL（要寫入的翻譯）
   只對已存在的課程記錄做 batch.update({ 'i18n.{lang}': {...} })，不新增、不動原文。 */
const TRANSLATION_LABELS = ['LESSON', 'SECTION', 'CHINESE', 'SPEAKER', 'EXPLANATION', 'TRANSLATION_LANG', 'T_SOURCE', 'T_ROMAN', 'T_EXPL'];
function parseTranslationRecord(r) {
  const out = {};
  const labelAlt = TRANSLATION_LABELS.join('|');
  /* v20260928: 值可跨行（來源 SECTION 偶有內嵌換行，如「生詞\n\n# SECTION: 易混淆語詞」）。
     舊寫法 (?=\n(?:labels):|\s*$) 會在第一個 \n 處截斷（\s*$ 在多行模式下可匹配行尾），
     導致多行錨點退回中文備援配對、撞到同課同中文句時寫錯位置。
     新寫法要求下一個標籤必須在行首（\n^），結尾改用 (?![\s\S])（字串真正結尾），
     單行記錄行為與舊版完全一致（已用 node 實證）。 */
  TRANSLATION_LABELS.forEach(label => {
    const m = String(r).match(new RegExp('^' + label + ':\\s*([\\s\\S]*?)(?=\\n^(?:' + labelAlt + '):|(?![\\s\\S]))', 'm'));
    out[label] = m ? m[1].trim() : '';
  });
  return out;
}
async function loadTranslationPreview(records) {
  const info = $('packInfo');
  const importButton = $('packImportButton');
  importButton.disabled = true;
  packRecordsCache = [];
  packTranslationMode = true;
  const matchKey = (lesson, section, chinese, speaker, expl) =>
    [lesson, section, chinese, speaker, expl].join('‖');
  const byLesson = new Map();
  records.forEach(r => {
    const t = parseTranslationRecord(r);
    if (!t.CHINESE || !t.TRANSLATION_LANG) return;
    const lesson = String(t.LESSON || '').trim();
    if (!byLesson.has(lesson)) byLesson.set(lesson, []);
    byLesson.get(lesson).push(t);
  });
  const items = [];
  let matched = 0, skipped = 0;
  for (const [lesson, list] of byLesson) {
    const existingByKey = new Map();
    const existingByChinese = new Map();
    lessonRecords(lesson).forEach(s => {
      const m = courseMeta(s);
      existingByKey.set(matchKey(m.lesson, m.section, (s.chineseSentence || '').trim(), m.speaker, (s.hindiExplanation || '').trim()), s);
      const ck = (s.chineseSentence || '').trim();
      if (ck && !existingByChinese.has(ck)) existingByChinese.set(ck, s);
    });
    list.forEach(t => {
      const ck = t.CHINESE.trim();
      const old = existingByKey.get(matchKey(lesson, t.SECTION.trim(), ck, t.SPEAKER.trim(), t.EXPLANATION.trim()))
        || existingByChinese.get(ck);
      if (!old) { skipped += 1; return; }
      items.push({
        translation: true,
        oldRecordId: old.recordId,
        lang: t.TRANSLATION_LANG.trim(),
        s: t.T_SOURCE, r: t.T_ROMAN, e: t.T_EXPL,
      });
      matched += 1;
    });
  }
  packRecordsCache = items;
  const langs = [...new Set(items.map(i => i.lang))];
  const lessons = [...byLesson.keys()].filter(Boolean).sort();
  info.textContent = `翻譯包：${matched} 組翻譯（${lessons.length} 課：${lessons.join('、')}；${langs.length} 語：${langs.join('、')}），只寫入各語言翻譯欄位、不動印地語原文${skipped ? `；${skipped} 組找不到對應句子（略過）` : ''}。`;
  importButton.disabled = items.length === 0;
}
/* 內容包批次匯入：整包一次寫入 Firestore。
   更新模式＝原地 update（保留 recordId、錄音、建立時間），不再建新刪舊。 */
async function importPackRecords() {
  const progress = $('importProgress');
  try {
    requireAdminAccess();
  } catch (err) {
    progress.textContent = (err && err.message) || '請先用 Google 登入。';
    return;
  }
  if (!packRecordsCache.length) { progress.textContent = '沒有可匯入的記錄。'; return; }
  if (packTranslationMode) { await importTranslationRecords(); return; }
  const button = $('packImportButton');
  button.disabled = true;
  const total = packRecordsCache.length;
  let added = 0, updated = 0;
  progress.textContent = `批次寫入中 0/${total}…`;
  try {
    requireAdminAccess();
    const BATCH_LIMIT = 450; /* Firestore 每批上限 500 */
    let batch = fbDb.batch();
    let ops = 0;
    const commitIfFull = async () => {
      if (ops >= BATCH_LIMIT) { await batch.commit(); batch = fbDb.batch(); ops = 0; }
    };
    for (const item of packRecordsCache) {
      const parsed = parsePaste(item.content);
      const data = sentenceDocData({
        hindiSentence: parsed.hindiSentence || '',
        chineseSentence: parsed.chineseSentence || '',
        pinyin: parsed.pinyin || '',
        romanHindi: parsed.romanHindi || '',
        hindiExplanation: parsed.hindiExplanation || '',
        category: parsed.category || '課程',
        tags: parsed.tags || '',
        aiSource: parsed.aiSource || '當代中文課程2',
        originalPaste: item.content,
        seq: item.seq,
      });
      if (item.oldRecordId) {
        /* 更新：只換內容欄位，保留 recordId、建立時間與錄音。 */
        const { createdAt, audioPath, audioMime, favorite, ...contentFields } = data;
        batch.update(fbDb.collection(SENTENCES_COL).doc(item.oldRecordId), contentFields);
        updated += 1;
      } else {
        batch.set(fbDb.collection(SENTENCES_COL).doc(), data);
        added += 1;
      }
      ops += 1;
      if ((added + updated) % 50 === 0) progress.textContent = `批次寫入中 ${added + updated}/${total}…`;
      await commitIfFull();
    }
    if (ops) await batch.commit();
    await reloadSentences();
    courseMetaCache.clear();
    renderSentences();
    renderCourse();
    packRecordsCache = [];
    progress.textContent = `完成：新增 ${added} 條${updated ? `，更新 ${updated} 條` : ''}。`;
  } catch (err) {
    progress.textContent = `匯入失敗：${(err && err.message) || '未知錯誤'}。請重整後再試。`;
  }
}
async function importTranslationRecords() {
  const progress = $('importProgress');
  const button = $('packImportButton');
  try {
    requireAdminAccess();
  } catch (err) {
    progress.textContent = (err && err.message) || '請先用 Google 登入。';
    return;
  }
  button.disabled = true;
  const total = packRecordsCache.length;
  let done = 0;
  progress.textContent = `翻譯寫入中 0/${total}…`;
  try {
    requireAdminAccess();
    const BATCH_LIMIT = 450; /* Firestore 每批上限 500 */
    let batch = fbDb.batch();
    let ops = 0;
    for (const item of packRecordsCache) {
      const field = {};
      field['i18n.' + item.lang] = { s: item.s || '', r: item.r || '', e: item.e || '', updatedAt: new Date().toISOString() };
      batch.update(fbDb.collection(SENTENCES_COL).doc(item.oldRecordId), field);
      ops += 1; done += 1;
      if (done % 200 === 0) progress.textContent = `翻譯寫入中 ${done}/${total}…`;
      if (ops >= BATCH_LIMIT) { await batch.commit(); batch = fbDb.batch(); ops = 0; }
    }
    if (ops) await batch.commit();
    await reloadSentences();
    courseMetaCache.clear();
    renderSentences();
    renderCourse();
    packRecordsCache = [];
    packTranslationMode = false;
    progress.textContent = `完成：寫入 ${done} 組翻譯。`;
  } catch (err) {
    progress.textContent = `匯入失敗：${(err && err.message) || '未知錯誤'}。請重整後再試。`;
  }
  button.disabled = false;
}

/* Course UI wiring */
$('lessonBackButton').addEventListener('click', () => {
  /* 禮節頁面由各自的 onclick 處理返回，避免跳層 */
  if (courseState.page && courseState.page.startsWith('ritual')) return;
  courseState.song = null; courseState.lesson = 0; renderLessonGrid(); $('courseSection').scrollIntoView({ behavior: 'smooth' });
});
/* 2026-09-29：內容包匯入區塊已刪除（Cheng 確認不再手動上傳內容包），loadPackPreview/importPackRecords 保留為 dead code。 */
document.addEventListener('keydown', e => { if (e.key === 'Escape' && textPlay.playing) stopTextPlay(); });


/* ===== 我的招生頁（2026-10-03）=====
   審核通過的老師在此編輯公開招生頁，寫入 enrollPages/{uid}；
   網址代號唯一性由 enrollSlugs/{slug} 保證；
   GitHub Action 定時把已發布文件渲染成 enroll/{slug}/ 靜態頁。
   寫入前一律經 requireApprovedAccess()；家長瀏覽端免登入。 */
const ENROLL_PAGES_COL = 'enrollPages';
const ENROLL_SLUGS_COL = 'enrollSlugs';
const ENROLL_STORAGE_PREFIX = 'enroll/';
const ENROLL_SLUG_RE = /^[a-z0-9-]{3,30}$/;
const ENROLL_SOCIAL_TYPES = ['whatsapp', 'telegram', 'line'];
const ENROLL_SOCIAL_NAMES = { whatsapp: 'WhatsApp', telegram: 'Telegram', line: 'LINE' };
const ENROLL_MAPS_URL_RE = /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i;
const ENROLL_LANGS = ['zh', 'hi', 'ta', 'th', 'km', 'vi', 'id', 'ne', 'bn', 'es', 'en', 'de', 'my', 'ko', 'ja', 'si', 'fa'];
const ENROLL_PAGE_BASE = 'enroll/';

let enrollState = { loaded: false, uid: '', oldSlug: '', photoUrl: '', images: [] };

function enrollLangName(code) {
  if (code === 'zh') return '中文 · Chinese';
  try {
    const p = v4GetLanguageProfile(code);
    return (p.nativeName || code) + ' · ' + (p.nameZh || p.name || code);
  } catch (e) { return code; }
}
function enrollMsg(text, isError) {
  const el = $('enrollMessage');
  el.textContent = text || '';
  el.classList.toggle('error', !!isError);
}
function enrollIsApproved() {
  return !!(window.V4_ACCESS && window.V4_ACCESS.status === 'approved');
}
function refreshEnrollVisibility() {
  $('enrollManager').classList.toggle('hidden', !enrollIsApproved());
  if (enrollIsApproved() && !enrollState.loaded) loadEnrollDoc();
  if (!enrollIsApproved()) { enrollState.loaded = false; }
}

function enrollLangOptions(selected) {
  return ENROLL_LANGS.map((c) =>
    '<option value="' + c + '"' + (c === selected ? ' selected' : '') + '>' + enrollLangName(c) + '</option>'
  ).join('');
}
function enrollAddSocialRow(type, label, url) {
  const wrap = $('enrollSocials');
  const row = document.createElement('div');
  row.className = 'enroll-dynamic-row enroll-social-row';
  const typeOpts = ENROLL_SOCIAL_TYPES.map((t) =>
    '<option value="' + t + '"' + (t === type ? ' selected' : '') + '>' + ENROLL_SOCIAL_NAMES[t] + '</option>'
  ).join('');
  row.innerHTML =
    '<select class="enroll-social-type" aria-label="平台">' + typeOpts + '</select>' +
    '<input class="enroll-social-label" autocomplete="off" placeholder="名稱，例如：中文班家長群">' +
    '<input class="enroll-social-url" autocomplete="off" placeholder="連結，例如：https://chat.whatsapp.com/…">' +
    '<button class="text-button enroll-remove" type="button" aria-label="刪除此連結">刪除</button>';
  row.querySelector('.enroll-social-label').value = label || '';
  row.querySelector('.enroll-social-url').value = url || '';
  row.querySelector('.enroll-remove').addEventListener('click', () => row.remove());
  wrap.appendChild(row);
}

const ENROLL_WEEKDAYS = [1, 2, 3, 4, 5, 6, 7];
const ENROLL_WEEKDAY_NAMES = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '日' };
function enrollBuildWeekdays() {
  const box = $('enrollWeekdays');
  if (!box || box.dataset.built) return;
  box.dataset.built = '1';
  ENROLL_WEEKDAYS.forEach((d) => {
    const lab = document.createElement('label');
    lab.className = 'enroll-check';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = d;
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(' 星期' + ENROLL_WEEKDAY_NAMES[d]));
    box.appendChild(lab);
  });
}
function enrollCollectWeekdays() {
  const days = [];
  document.querySelectorAll('#enrollWeekdays input:checked').forEach((cb) => {
    days.push(parseInt(cb.value, 10));
  });
  return days.sort((a, b) => a - b);
}
function enrollSetWeekdays(days) {
  document.querySelectorAll('#enrollWeekdays input').forEach((cb) => {
    cb.checked = days.indexOf(parseInt(cb.value, 10)) !== -1;
  });
}

function enrollAddVideoRow(url) {
  const wrap = $('enrollVideos');
  if (wrap.querySelectorAll('.enroll-dynamic-row').length >= 5) {
    enrollMsg('影片最多 5 部。', true);
    return;
  }
  const row = document.createElement('div');
  row.className = 'enroll-dynamic-row enroll-video-row';
  row.innerHTML =
    '<input class="enroll-video-url" autocomplete="off" placeholder="貼上 YouTube 連結 (Paste a YouTube link)">' +
    '<button class="text-button enroll-remove" type="button" aria-label="刪除此影片">刪除</button>';
  row.querySelector('.enroll-video-url').value = url || '';
  row.querySelector('.enroll-remove').addEventListener('click', () => row.remove());
  wrap.appendChild(row);
}
function enrollCollectVideos() {
  const ids = [];
  document.querySelectorAll('#enrollVideos .enroll-video-url').forEach((input) => {
    const id = enrollExtractYouTubeId(input.value.trim());
    if (id && ids.indexOf(id) === -1) ids.push(id);
  });
  return ids.slice(0, 5);
}

function enrollCollectSocials() {
  const socials = [];
  document.querySelectorAll('#enrollSocials .enroll-dynamic-row').forEach((row) => {
    const url = row.querySelector('.enroll-social-url').value.trim();
    if (!url) return;
    socials.push({
      type: row.querySelector('.enroll-social-type').value,
      label: row.querySelector('.enroll-social-label').value.trim(),
      url: url,
    });
  });
  return socials;
}

/* 圖片前端壓縮：最長邊 maxDim，JPEG 0.82 */
function enrollCompressImage(file, maxDim) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let w = img.naturalWidth, h = img.naturalHeight;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      w = Math.round(w * scale); h = Math.round(h * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('圖片壓縮失敗')), 'image/jpeg', 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('圖片讀取失敗')); };
    img.src = objectUrl;
  });
}
async function enrollUploadBlob(blob, uid, kind) {
  const path = ENROLL_STORAGE_PREFIX + uid + '/' + kind + '-' + Date.now() + '.jpg';
  await fbStorage.ref(path).put(blob, { contentType: 'image/jpeg' });
  return await fbStorage.ref(path).getDownloadURL();
}
function enrollRenderThumbs() {
  const photoBox = $('enrollPhotoPreview');
  photoBox.textContent = '';
  if (enrollState.photoUrl) {
    const img = document.createElement('img');
    img.src = enrollState.photoUrl; img.alt = '個人照片預覽';
    photoBox.appendChild(img);
  }
  const imgBox = $('enrollImagesPreview');
  imgBox.textContent = '';
  enrollState.images.forEach((url, i) => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = url; img.alt = '課程圖片預覽 ' + (i + 1); img.loading = 'lazy';
    const del = document.createElement('button');
    del.type = 'button'; del.className = 'enroll-thumb-del'; del.textContent = '×';
    del.setAttribute('aria-label', '刪除這張圖片');
    del.addEventListener('click', () => { enrollState.images.splice(i, 1); enrollRenderThumbs(); });
    fig.appendChild(img); fig.appendChild(del);
    imgBox.appendChild(fig);
  });
}

let enrollSlugTimer = null;
async function enrollCheckSlug() {
  const hint = $('enrollSlugHint');
  const slug = $('enrollSlug').value.trim().toLowerCase();
  $('enrollSlug').value = slug;
  if (!slug) { hint.textContent = ''; hint.className = 'field-hint'; return; }
  if (!ENROLL_SLUG_RE.test(slug)) {
    hint.textContent = '格式不符：3–30 個字元，小寫英文、數字、連字號。';
    hint.className = 'field-hint enroll-hint-bad';
    return;
  }
  if (slug === enrollState.oldSlug && enrollState.oldSlug) {
    hint.textContent = '這是你目前的代號，可以繼續使用。';
    hint.className = 'field-hint enroll-hint-ok';
    return;
  }
  hint.textContent = '檢查中…';
  hint.className = 'field-hint';
  try {
    const snap = await fbDb.collection(ENROLL_SLUGS_COL).doc(slug).get();
    if (snap.exists) {
      hint.textContent = '這個代號已經有人用了，換一個吧。';
      hint.className = 'field-hint enroll-hint-bad';
    } else {
      hint.textContent = '這個代號可以用！招生頁網址：' + ENROLL_PAGE_BASE + slug + '/';
      hint.className = 'field-hint enroll-hint-ok';
    }
  } catch (e) {
    hint.textContent = '檢查失敗：' + (e.message || '未知錯誤');
    hint.className = 'field-hint enroll-hint-bad';
  }
}

function enrollExtractYouTubeId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?[^#]*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
}
/* 從 Google 地圖分享連結擷取經緯度；短網址無法解析時回傳 null（改用地址查詢內嵌） */
function enrollExtractMapsLatLng(url) {
  const u = String(url || '');
  let m = u.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,|$|[^\d.])/);
  if (m) return { lat: m[1], lng: m[2] };
  m = u.match(/[?&](?:q|query)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: m[1], lng: m[2] };
  m = u.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: m[1], lng: m[2] };
  return null;
}

async function loadEnrollDoc() {
  const user = requireApprovedAccess();
  enrollState.uid = user.uid;
  enrollMsg('載入中…');
  try {
    const snap = await fbDb.collection(ENROLL_PAGES_COL).doc(user.uid).get();
    const d = snap.exists ? (snap.data() || {}) : {};
    enrollState.oldSlug = d.slug || '';
    enrollState.photoUrl = d.photoUrl || '';
    enrollState.images = Array.isArray(d.images) ? d.images.slice(0, 9) : [];
    $('enrollNameZh').value = d.nameZh || '';
    $('enrollClassNameZh').value = d.classNameZh || d.className || '';
    $('enrollClassNameLocal').value = d.classNameLocal || '';
    $('enrollNameEn').value = d.nameEn || '';
    $('enrollCountry').value = d.country || '';
    $('enrollCity').value = d.city || '';
    $('enrollAddress').value = d.address || '';
    $('enrollMapsUrl').value = d.mapsUrl || '';
    $('enrollStartDate').value = d.startDate || '';
    $('enrollTimeStart').value = d.timeStart || '';
    $('enrollTimeEnd').value = d.timeEnd || '';
    enrollSetWeekdays(Array.isArray(d.weekdays) ? d.weekdays : []);
    $('enrollSlug').value = d.slug || '';
    $('enrollDefaultLang').value = d.defaultLang || 'zh';
    $('enrollVideos').textContent = '';
    const vids = (Array.isArray(d.videoIds) && d.videoIds.length ? d.videoIds
      : (d.videoId ? [d.videoId] : [])).slice(0, 5);
    if (vids.length) vids.forEach((id) => enrollAddVideoRow('https://www.youtube.com/watch?v=' + id));
    else if (d.videoUrl) enrollAddVideoRow(d.videoUrl);
    $('enrollFormUrl').value = d.formUrl || '';
    /* 課程介紹：新 introZh 優先，相容舊 intros.zh；外文用老師手填的 introLocal，舊 AI 譯文 introTranslated 預填方便修正 */
    $('enrollIntroZh').value = d.introZh || (d.intros && d.intros.zh) || '';
    $('enrollIntroLocal').value = d.introLocal || d.introTranslated || '';
    enrollUpdateIntroLocalLang();
    $('enrollSocials').textContent = '';
    (d.socials || []).forEach((s) => enrollAddSocialRow(s.type, s.label, s.url));
    enrollRenderThumbs();
    enrollUpdatePreviewButton(d.status);
    enrollMsg(snap.exists ? '' : '還沒有招生頁，從下方開始建立吧。');
    enrollCheckSlug();
  } catch (e) {
    enrollMsg('載入失敗：' + (e.message || '未知錯誤'), true);
  }
  enrollState.loaded = true;
}
function enrollUpdatePreviewButton(status) {
  const btn = $('enrollPreview');
  const unpub = $('enrollUnpublish');
  const slug = ($('enrollSlug').value || '').trim();
  const live = status === 'published' && slug;
  btn.classList.toggle('hidden', !live);
  unpub.classList.toggle('hidden', !live);
  if (live) btn.href = ENROLL_PAGE_BASE + slug + '/';
}

function enrollValidate(status) {
  const nameZh = $('enrollNameZh').value.trim();
  const slug = $('enrollSlug').value.trim().toLowerCase();
  const introZh = $('enrollIntroZh').value.trim();
  const introLocal = $('enrollIntroLocal').value.trim();
  const displayLang = $('enrollDefaultLang').value;
  const socials = enrollCollectSocials();
  const formUrl = $('enrollFormUrl').value.trim();
  const address = $('enrollAddress').value.trim();
  const mapsUrl = $('enrollMapsUrl').value.trim();
  const startDate = $('enrollStartDate').value;
  const timeStart = $('enrollTimeStart').value;
  const timeEnd = $('enrollTimeEnd').value;
  const weekdays = enrollCollectWeekdays();
  if (!ENROLL_SLUG_RE.test(slug)) throw new Error('網址代號格式不符：3–30 個字元，小寫英文、數字、連字號。');
  if (status === 'published') {
    if (!nameZh) throw new Error('發布需要填寫「中文姓名」。');
    if (!introZh) throw new Error('發布需要填寫「課程介紹（中文）」。');
    if (displayLang !== 'zh' && !introLocal) throw new Error('發布需要填寫「課程介紹（外文）」。');
    if (!startDate) throw new Error('發布需要填寫「開課日期」。');
    if (!weekdays.length) throw new Error('發布需要至少選擇一個「上課星期」。');
    if (!timeStart || !timeEnd) throw new Error('發布需要填寫「上課時間」（幾點到幾點）。');
    if (timeEnd <= timeStart) throw new Error('結束時間必須晚於開始時間。');
    if (!address) throw new Error('發布需要填寫「教室地址」。');
    if (!mapsUrl) throw new Error('發布需要填寫「Google 地圖定位」連結。');
    if (!ENROLL_MAPS_URL_RE.test(mapsUrl)) throw new Error('Google 地圖連結格式不正確，請貼上 Google 地圖 App 的分享連結。');
    if (!formUrl && !socials.length) throw new Error('發布需要填寫 Google 表單連結或至少一個群組連結。');
  }
  return { nameZh, slug, introZh, introLocal, displayLang, socials, formUrl, address, mapsUrl, startDate, weekdays, timeStart, timeEnd };
}

async function enrollSave(status) {
  const user = requireApprovedAccess();
  enrollMsg(status === 'published' ? '發布中…' : '儲存中…');
  let v;
  try { v = enrollValidate(status); }
  catch (e) { enrollMsg(e.message, true); return; }
  /* 代號被搶註檢查（自己的舊代號除外） */
  if (v.slug !== enrollState.oldSlug) {
    try {
      const snap = await fbDb.collection(ENROLL_SLUGS_COL).doc(v.slug).get();
      if (snap.exists) { enrollMsg('這個網址代號剛被別人用了，換一個再試。', true); enrollCheckSlug(); return; }
    } catch (e) { enrollMsg('代號檢查失敗：' + (e.message || '未知錯誤'), true); return; }
  }
  const mapsLatLng = enrollExtractMapsLatLng(v.mapsUrl);
  /* 課程介紹外文由老師手動翻譯貼上，不再自動翻譯 */
  const data = {
    slug: v.slug,
    status: status,
    nameZh: v.nameZh,
    nameEn: $('enrollNameEn').value.trim(),
    classNameZh: $('enrollClassNameZh').value.trim(),
    classNameLocal: $('enrollClassNameLocal').value.trim(),
    photoUrl: enrollState.photoUrl,
    country: $('enrollCountry').value.trim(),
    city: $('enrollCity').value.trim(),
    address: v.address,
    mapsUrl: v.mapsUrl,
    mapsLat: mapsLatLng ? mapsLatLng.lat : '',
    mapsLng: mapsLatLng ? mapsLatLng.lng : '',
    startDate: v.startDate,
    weekdays: v.weekdays,
    timeStart: v.timeStart,
    timeEnd: v.timeEnd,
    defaultLang: v.displayLang,
    introZh: v.introZh,
    introLocal: v.introLocal,
    images: enrollState.images,
    videoIds: enrollCollectVideos(),
    videoId: '', // 舊欄位清空，改用 videoIds（產生器仍相容舊資料）
    videoUrl: '',
    socials: v.socials,
    formUrl: v.formUrl,
    updatedAt: serverTimestamp(),
  };
  if (status === 'published') {
    data.publishedAt = serverTimestamp();
    data.intros = fbFieldValue.delete(); // 舊多語言欄位已由 introZh＋introLocal 取代
  }
  try {
    const batch = fbDb.batch();
    batch.set(fbDb.collection(ENROLL_PAGES_COL).doc(user.uid), data, { merge: true });
    if (enrollState.oldSlug && enrollState.oldSlug !== v.slug) {
      batch.delete(fbDb.collection(ENROLL_SLUGS_COL).doc(enrollState.oldSlug));
    }
    if (v.slug !== enrollState.oldSlug) {
      batch.set(fbDb.collection(ENROLL_SLUGS_COL).doc(v.slug), { uid: user.uid });
    }
    await batch.commit();
    enrollState.oldSlug = v.slug;
    enrollUpdatePreviewButton(status);
    enrollMsg(status === 'published'
      ? '已發布，約 3 分鐘後上線'
      : '草稿已儲存。');
    enrollCheckSlug();
  } catch (e) {
    enrollMsg('儲存失敗：' + (e.message || '未知錯誤'), true);
  }
}
async function enrollUnpublish() {
  const user = requireApprovedAccess();
  if (!confirm('確定要下架招生頁嗎？家長將無法再瀏覽，代號會為你保留。')) return;
  enrollMsg('下架中…');
  try {
    await fbDb.collection(ENROLL_PAGES_COL).doc(user.uid).set(
      { status: 'unpublished', updatedAt: serverTimestamp() }, { merge: true });
    enrollUpdatePreviewButton('unpublished');
    enrollMsg('已下架。');
  } catch (e) {
    enrollMsg('下架失敗：' + (e.message || '未知錯誤'), true);
  }
}

/* 外文介紹欄：標籤顯示對外語言名稱；「產生翻譯提示詞」一鍵複製，給 ChatGPT／Gemini 用 */
function enrollIntroLangName() {
  const code = ($('enrollDefaultLang') && $('enrollDefaultLang').value) || 'zh';
  if (code === 'zh') return '中文';
  try {
    const p = v4GetLanguageProfile(code);
    return p.nameZh || p.name || code;
  } catch (e) { return code; }
}
function enrollUpdateIntroLocalLang() {
  const name = enrollIntroLangName();
  const el1 = $('enrollIntroLocalLang');
  const el2 = $('enrollIntroLocalLang2');
  if (el1) el1.textContent = name;
  if (el2) el2.textContent = name;
}
function enrollBuildTranslatePrompt() {
  const name = enrollIntroLangName();
  const zh = $('enrollIntroZh').value.trim();
  return '請將以下中文課程介紹翻譯成' + name +
    '（用於中文班招生宣傳，語氣親切自然，符合當地人的表達習慣）：\n\n' +
    (zh || '（請在此貼上中文介紹）') +
    '\n\n要求：只回傳譯文，不要加任何解釋或前言。';
}
async function enrollCopyTranslatePrompt() {
  try {
    await navigator.clipboard.writeText(enrollBuildTranslatePrompt());
    return true;
  } catch (_) {
    enrollMsg('複製失敗，請檢查瀏覽器權限後重試。', true);
    return false;
  }
}
/* 沿用 V4 新增句子的模式：先複製提示詞，再開啟 AI 網站（手機版直接跳轉） */
function enrollCopyAndOpen(url) {
  const isMobile = window.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    enrollCopyTranslatePrompt().then((copied) => { if (copied) window.location.assign(url); });
    return;
  }
  const newPage = window.open(url, '_blank', 'noopener,noreferrer');
  enrollCopyTranslatePrompt();
  if (!newPage) enrollMsg('已複製提示詞。請允許彈出視窗，再開啟 AI 網站。', true);
}
function initEnrollManager() {
  if (!($('enrollManager'))) return;
  $('enrollDefaultLang').innerHTML = enrollLangOptions('zh');
  enrollUpdateIntroLocalLang();
  $('enrollDefaultLang').addEventListener('change', enrollUpdateIntroLocalLang);
  $('enrollOpenChatGPT').addEventListener('click', () => enrollCopyAndOpen('https://chatgpt.com/'));
  $('enrollOpenGemini').addEventListener('click', () => enrollCopyAndOpen('https://gemini.google.com/app'));
  enrollBuildWeekdays();
  $('enrollWeekAll').addEventListener('click', () => enrollSetWeekdays([1, 2, 3, 4, 5, 6, 7]));
  $('enrollWeekNone').addEventListener('click', () => enrollSetWeekdays([]));
  $('enrollAddVideo').addEventListener('click', () => enrollAddVideoRow(''));
  $('enrollAddSocial').addEventListener('click', () => enrollAddSocialRow('whatsapp', '', ''));
  /* 預覽前先檢查靜態頁是否已產生，避免直接撞上 GitHub 404 */
  $('enrollPreview').addEventListener('click', async (e) => {
    e.preventDefault();
    const slug = ($('enrollSlug').value || '').trim();
    if (!slug) return;
    const url = ENROLL_PAGE_BASE + slug + '/';
    enrollMsg('檢查頁面狀態…');
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) {
        enrollMsg('');
        window.open(url, '_blank', 'noopener');
      } else {
        enrollMsg('靜態頁產生中：發布後約 3 分鐘上線，請稍後再試。若超過 10 分鐘仍是這樣，請聯繫管理員。', true);
      }
    } catch (err) {
      window.open(url, '_blank', 'noopener');
    }
  });
  $('enrollSlug').addEventListener('input', () => {
    clearTimeout(enrollSlugTimer);
    enrollSlugTimer = setTimeout(enrollCheckSlug, 600);
  });
  $('enrollPhoto').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const user = requireApprovedAccess();
    enrollMsg('照片上傳中…');
    try {
      const blob = await enrollCompressImage(file, 800);
      enrollState.photoUrl = await enrollUploadBlob(blob, user.uid, 'photo');
      enrollRenderThumbs();
      enrollMsg('照片已上傳，記得按「儲存草稿」或「發布」。');
    } catch (err) { enrollMsg('照片上傳失敗：' + (err.message || '未知錯誤'), true); }
    e.target.value = '';
  });
  $('enrollImages').addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []).slice(0, 9 - enrollState.images.length);
    if (!files.length) { enrollMsg('圖片已達上限 9 張。', true); e.target.value = ''; return; }
    const user = requireApprovedAccess();
    enrollMsg('圖片上傳中…');
    try {
      for (const file of files) {
        const blob = await enrollCompressImage(file, 1280);
        enrollState.images.push(await enrollUploadBlob(blob, user.uid, 'img'));
      }
      enrollRenderThumbs();
      enrollMsg('圖片已上傳，記得按「儲存草稿」或「發布」。');
    } catch (err) { enrollMsg('圖片上傳失敗：' + (err.message || '未知錯誤'), true); }
    e.target.value = '';
  });
  $('enrollSaveDraft').addEventListener('click', () => enrollSave('draft'));
  $('enrollPublish').addEventListener('click', () => enrollSave('published'));
  $('enrollUnpublish').addEventListener('click', enrollUnpublish);
  window.addEventListener('v4-access-changed', refreshEnrollVisibility);
  refreshEnrollVisibility();
}
initEnrollManager();
