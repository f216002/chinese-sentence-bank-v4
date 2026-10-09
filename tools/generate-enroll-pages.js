#!/usr/bin/env node
'use strict';
/* ---- 全球中文班招生頁：靜態產生器 ----
   讀取 Firestore `enrollPages` 中 status=published 的文件，
   以 tools/enroll-template.html 為公版，逐位老師渲染成
   enroll/{slug}/index.html（含專屬 og 預覽標籤）。
   家長瀏覽的是純靜態頁，零 Firestore 讀取。

   用法：
     node tools/generate-enroll-pages.js                 # 正式：讀 Firestore
     node tools/generate-enroll-pages.js --fixture=tools/enroll-fixture.json  # 測試

   設計要點：
   - 抓取失敗（throw）時絕不清空輸出目錄，避免一次網路抖動刪掉全站招生頁。
   - 老師填寫的所有文字都做 HTML 跳脫；JSON 以 application/json 內嵌並跳脫 </。
*/
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'my-chinese-sentence-bank-v3'; // 與 V4 共用 Firebase 專案
const BASE_URL = 'https://f216002.github.io/chinese-sentence-bank-v4';
const DEFAULT_OG_IMAGE = BASE_URL + '/hero-banner.jpg';
const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(REPO_ROOT, 'enroll');
const TEMPLATE_FILE = path.join(__dirname, 'enroll-template.html');
const CSS_FILE = path.join(__dirname, 'enroll-page.css');
const SLUG_RE = /^[a-z0-9-]{3,30}$/;
const SOCIAL_LABELS = { whatsapp: 'WhatsApp', telegram: 'Telegram', line: 'LINE' };

/* ---- 公開頁固定 UI 字串（17 語言） ----
   公開頁為固定雙語：對外語言在前、中文在後；老師姓名、地址等專有名詞不翻譯。
   weekdays[0]=星期一 … weekdays[6]=星期日。 */
const UI_STRINGS = {
  zh: { seal: '招生', open: '招生中', intro: '課程介紹', schedule: '上課時間', startDate: '開課日期', location: '上課地點', openMap: '在 Google 地圖開啟', gallery: '精彩瞬間', video: '影片介紹', groups: '加入群組', enrollNow: '立即報名', enrollTitle: '中文班招生', daily: '每天', weekly: '每週', footer: '中文班招生專頁', weekdays: ['一', '二', '三', '四', '五', '六', '日'] },
  hi: { seal: 'प्रवेश', open: 'प्रवेश जारी है', intro: 'पाठ्यक्रम परिचय', schedule: 'कक्षा समय', startDate: 'प्रारंभ तिथि', location: 'कक्षा स्थान', openMap: 'Google मानचित्र में खोलें', gallery: 'झलकियाँ', video: 'वीडियो परिचय', groups: 'समूहों से जुड़ें', enrollNow: 'अभी नामांकन करें', enrollTitle: 'चीनी कक्षा प्रवेश', daily: 'प्रतिदिन', weekly: 'हर सप्ताह', footer: 'चीनी कक्षा प्रवेश पृष्ठ', weekdays: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'] },
  ta: { seal: 'சேர்க்கை', open: 'சேர்க்கை நடைபெறுகிறது', intro: 'பாட அறிமுகம்', schedule: 'வகுப்பு நேரம்', startDate: 'தொடக்க தேதி', location: 'வகுப்பு இடம்', openMap: 'Google வரைபடத்தில் திறக்கவும்', gallery: 'சிறப்பு தருணங்கள்', video: 'வீடியோ அறிமுகம்', groups: 'குழுக்களில் சேரவும்', enrollNow: 'இப்போதே சேரவும்', enrollTitle: 'சீன வகுப்பு சேர்க்கை', daily: 'தினமும்', weekly: 'ஒவ்வொரு வாரமும்', footer: 'சீன வகுப்பு சேர்க்கை பக்கம்', weekdays: ['திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி', 'ஞாயிறு'] },
  th: { seal: 'รับสมัคร', open: 'กำลังรับสมัคร', intro: 'แนะนำหลักสูตร', schedule: 'ตารางเรียน', startDate: 'วันที่เริ่มเรียน', location: 'สถานที่เรียน', openMap: 'เปิดใน Google Maps', gallery: 'ภาพประทับใจ', video: 'วิดีโอแนะนำ', groups: 'เข้าร่วมกลุ่ม', enrollNow: 'สมัครเลย', enrollTitle: 'รับสมัครเรียนภาษาจีน', daily: 'ทุกวัน', weekly: 'ทุกสัปดาห์', footer: 'หน้าแนะนำการรับสมัครเรียนภาษาจีน', weekdays: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'] },
  km: { seal: 'ចុះឈ្មោះ', open: 'កំពុងទទួលចុះឈ្មោះ', intro: 'ការណែនាំវគ្គសិក្សា', schedule: 'កាលវិភាគសិក្សា', startDate: 'ថ្ងៃចាប់ផ្តើម', location: 'ទីតាំងថ្នាក់រៀន', openMap: 'បើកក្នុង Google Maps', gallery: 'រូបភាពសកម្មភាព', video: 'វីដេអូណែនាំ', groups: 'ចូលរួមក្រុម', enrollNow: 'ចុះឈ្មោះឥឡូវនេះ', enrollTitle: 'ការទទួលចុះឈ្មោះចូលរៀនភាសាចិន', daily: 'រៀងរាល់ថ្ងៃ', weekly: 'រៀងរាល់សប្តាហ៍', footer: 'ទំព័រទទួលចុះឈ្មោះចូលរៀនភាសាចិន', weekdays: ['ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍', 'អាទិត្យ'] },
  vi: { seal: 'Tuyển sinh', open: 'Đang tuyển sinh', intro: 'Giới thiệu khóa học', schedule: 'Lịch học', startDate: 'Ngày khai giảng', location: 'Địa điểm lớp học', openMap: 'Mở trong Google Maps', gallery: 'Khoảnh khắc', video: 'Video giới thiệu', groups: 'Tham gia nhóm', enrollNow: 'Đăng ký ngay', enrollTitle: 'Tuyển sinh lớp tiếng Trung', daily: 'Hằng ngày', weekly: 'Hằng tuần', footer: 'Trang tuyển sinh lớp tiếng Trung', weekdays: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'] },
  id: { seal: 'Penerimaan', open: 'Sedang menerima siswa', intro: 'Pengenalan kursus', schedule: 'Jadwal kelas', startDate: 'Tanggal mulai', location: 'Lokasi kelas', openMap: 'Buka di Google Maps', gallery: 'Momen berharga', video: 'Video perkenalan', groups: 'Gabung grup', enrollNow: 'Daftar sekarang', enrollTitle: 'Penerimaan kelas bahasa Mandarin', daily: 'Setiap hari', weekly: 'Setiap minggu', footer: 'Halaman penerimaan kelas bahasa Mandarin', weekdays: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] },
  ne: { seal: 'भर्ना', open: 'भर्ना खुला छ', intro: 'पाठ्यक्रम परिचय', schedule: 'कक्षा समय', startDate: 'सुरु मिति', location: 'कक्षा स्थान', openMap: 'Google नक्सामा खोल्नुहोस्', gallery: 'झलकहरू', video: 'भिडियो परिचय', groups: 'समूहमा जोडिनुहोस्', enrollNow: 'अहिले भर्ना गर्नुहोस्', enrollTitle: 'चिनियाँ कक्षा भर्ना', daily: 'दैनिक', weekly: 'हरेक हप्ता', footer: 'चिनियाँ कक्षा भर्ना पृष्ठ', weekdays: ['सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार', 'आइतबार'] },
  bn: { seal: 'ভর্তি', open: 'ভর্তি চলছে', intro: 'কোর্স পরিচিতি', schedule: 'ক্লাসের সময়', startDate: 'শুরুর তারিখ', location: 'ক্লাসের ঠিকানা', openMap: 'Google ম্যাপে খুলুন', gallery: 'সুন্দর মুহূর্ত', video: 'ভিডিও পরিচিতি', groups: 'গ্রুপে যোগ দিন', enrollNow: 'এখনই ভর্তি হোন', enrollTitle: 'চীনা ক্লাসে ভর্তি', daily: 'প্রতিদিন', weekly: 'প্রতি সপ্তাহে', footer: 'চীনা ক্লাসে ভর্তির পাতা', weekdays: ['সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার', 'রবিবার'] },
  es: { seal: 'Inscripciones', open: 'Inscripciones abiertas', intro: 'Presentación del curso', schedule: 'Horario de clases', startDate: 'Fecha de inicio', location: 'Ubicación del aula', openMap: 'Abrir en Google Maps', gallery: 'Momentos', video: 'Videos', groups: 'Únete a los grupos', enrollNow: 'Inscríbete ahora', enrollTitle: 'Inscripciones al curso de chino', daily: 'Todos los días', weekly: 'Cada semana', footer: 'Página de inscripción al curso de chino', weekdays: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'] },
  en: { seal: 'Admissions', open: 'Now enrolling', intro: 'About the course', schedule: 'Class schedule', startDate: 'Start date', location: 'Classroom', openMap: 'Open in Google Maps', gallery: 'Moments', video: 'Videos', groups: 'Join our groups', enrollNow: 'Enroll now', enrollTitle: 'Chinese class enrollment', daily: 'Every day', weekly: 'Every', footer: 'Chinese class enrollment page', weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  de: { seal: 'Anmeldung', open: 'Jetzt anmelden', intro: 'Kursvorstellung', schedule: 'Unterrichtszeiten', startDate: 'Kursbeginn', location: 'Unterrichtsort', openMap: 'In Google Maps öffnen', gallery: 'Eindrücke', video: 'Videos', groups: 'Gruppen beitreten', enrollNow: 'Jetzt anmelden', enrollTitle: 'Anmeldung zum Chinesischkurs', daily: 'Täglich', weekly: 'Wöchentlich', footer: 'Anmeldeseite für den Chinesischkurs', weekdays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] },
  my: { seal: 'ကျောင်းအပ်', open: 'ကျောင်းအပ်လက်ခံနေပါသည်', intro: 'သင်တန်းမိတ်ဆက်', schedule: 'သင်တန်းအချိန်ဇယား', startDate: 'စတင်မည့်ရက်', location: 'သင်တန်းနေရာ', openMap: 'Google Maps တွင်ဖွင့်ပါ', gallery: 'အမှတ်တရပုံများ', video: 'ဗီဒီယိုမိတ်ဆက်', groups: 'ဂရုများသို့ဝင်ရောက်ပါ', enrollNow: 'ယခုပင်အပ်နှံပါ', enrollTitle: 'တရုတ်ဘာသာသင်တန်းကျောင်းအပ်လက်ခံခြင်း', daily: 'နေ့တိုင်း', weekly: 'အပတ်တိုင်း', footer: 'တရုတ်ဘာသာသင်တန်းကျောင်းအပ်လက်ခံခြင်းစာမျက်နှာ', weekdays: ['တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ', 'တနင်္ဂနွေ'] },
  ko: { seal: '모집', open: '모집 중', intro: '과정 소개', schedule: '수업 시간', startDate: '개강일', location: '수업 장소', openMap: 'Google 지도에서 열기', gallery: '생생한 순간', video: '영상 소개', groups: '그룹 참여하기', enrollNow: '지금 신청하기', enrollTitle: '중국어 수업 모집', daily: '매일', weekly: '매주', footer: '중국어 수업 모집 페이지', weekdays: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'] },
  ja: { seal: '募集', open: '募集中', intro: 'コース紹介', schedule: '授業時間', startDate: '開講日', location: '教室の場所', openMap: 'Google マップで開く', gallery: '授業の様子', video: '動画紹介', groups: 'グループに参加', enrollNow: '今すぐ申し込む', enrollTitle: '中国語クラス募集', daily: '毎日', weekly: '毎週', footer: '中国語クラス募集ページ', weekdays: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'] },
  si: { seal: 'ඇතුළත් කිරීම්', open: 'ඇතුළත් කිරීම් සිදුවෙමින් පවතී', intro: 'පාඨමාලා හැඳින්වීම', schedule: 'පන්ති කාලසටහන', startDate: 'ආරම්භක දිනය', location: 'පන්ති ස්ථානය', openMap: 'Google සිතියමෙන් විවෘත කරන්න', gallery: 'මතකයන්', video: 'වීඩියෝ හැඳින්වීම', groups: 'කණ්ඩායම්වලට සම්බන්ධ වන්න', enrollNow: 'දැන්ම ඇතුළත් වන්න', enrollTitle: 'චීන පන්ති ඇතුළත් කිරීම්', daily: 'දිනපතා', weekly: 'සෑම සතියකම', footer: 'චීන පන්ති ඇතුළත් කිරීමේ පිටුව', weekdays: ['සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා', 'ඉරිදා'] },
  fa: { seal: 'ثبت‌نام', open: 'در حال ثبت‌نام', intro: 'معرفی دوره', schedule: 'برنامه کلاسی', startDate: 'تاریخ شروع', location: 'محل کلاس', openMap: 'باز کردن در Google Maps', gallery: 'لحظه‌ها', video: 'معرفی ویدیویی', groups: 'عضویت در گروه‌ها', enrollNow: 'همین حالا ثبت‌نام کنید', enrollTitle: 'ثبت‌نام کلاس زبان چینی', daily: 'هر روز', weekly: 'هر هفته', footer: 'صفحه ثبت‌نام کلاس زبان چینی', weekdays: ['دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه'] },
};
/* 取 UI 字串：指定語言 → 中文 → 英文 → 鍵名本身 */
function t(lang, key) {
  if (UI_STRINGS[lang] && UI_STRINGS[lang][key] !== undefined) return UI_STRINGS[lang][key];
  if (UI_STRINGS.zh[key] !== undefined) return UI_STRINGS.zh[key];
  if (UI_STRINGS.en[key] !== undefined) return UI_STRINGS.en[key];
  return key;
}
/* 雙語小標：對外語言在前、中文在後；兩者相同時只顯示一次 */
function bilingualLabel(local, zh) {
  if (!local || local === zh) return escHtml(zh);
  return '<span class="lb-local">' + escHtml(local) + '</span> <span class="lb-zh">' + escHtml(zh) + '</span>';
}

function arg(name) {
  const prefix = name + '=';
  const hit = process.argv.find((a) => a.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : null;
}

/* Firestore REST 值 → 純 JS */
function fvToJs(v) {
  if (v == null || v.nullValue !== undefined) return null;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.integerValue !== undefined) return parseInt(v.integerValue, 10);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.timestampValue !== undefined) return v.timestampValue;
  if (v.arrayValue !== undefined) return (v.arrayValue.values || []).map(fvToJs);
  if (v.mapValue !== undefined) {
    const out = {};
    const fields = v.mapValue.fields || {};
    for (const k of Object.keys(fields)) out[k] = fvToJs(fields[k]);
    return out;
  }
  return null;
}

function isPublishable(p) {
  return p && p.status === 'published' && SLUG_RE.test(p.slug || '');
}
function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escAttr(s) {
  return escHtml(s).replace(/'/g, '&#39;');
}
function stripNewlines(s) {
  return String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
}
function truncate(s, n) {
  s = stripNewlines(s);
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function extractYouTubeId(url) {
  if (!url) return '';
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?[^#]*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return m ? m[1] : '';
}

async function fetchPublished() {
  const url =
    'https://firestore.googleapis.com/v1/projects/' + PROJECT_ID +
    '/databases/(default)/documents/enrollPages?pageSize=300';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Firestore REST 讀取失敗，HTTP ' + res.status);
  const body = await res.json();
  const docs = (body.documents || []).map((d) => fvToJs({ mapValue: { fields: d.fields } }));
  return docs.filter((p) => p && p.status === 'published' && SLUG_RE.test(p.slug || ''));
}

/* 從 Google 地圖網址提取經緯度（與後台 enrollExtractMapsLatLng 同規則，另加 /search/lat,lng） */
function extractLatLng(url) {
  const u = String(url || '');
  let m = u.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,|$|[^\d.])/);
  if (m) return { lat: m[1], lng: m[2] };
  m = u.match(/[?&](?:q|query|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: m[1], lng: m[2] };
  m = u.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: m[1], lng: m[2] };
  m = u.match(/\/search\/(-?\d+(?:\.\d+)?)[,+\s]*(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: m[1], lng: m[2] };
  return null;
}
/* 短網址（maps.app.goo.gl／goo.gl）跟隨轉址還原成長網址再取座標；失敗則回退 */
async function resolveMapsCoords(p) {
  if (p.mapsLat && p.mapsLng) return { lat: String(p.mapsLat), lng: String(p.mapsLng) };
  const url = String(p.mapsUrl || '');
  const direct = extractLatLng(url);
  if (direct) return direct;
  if (!/goo\.gl/i.test(url)) return null;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const c = extractLatLng(res.url || '');
    if (c) { console.log('短網址還原座標：' + p.slug + ' → ' + c.lat + ',' + c.lng); return c; }
  } catch (e) { console.warn('短網址還原失敗：' + p.slug); }
  return null;
}

/* 整理成樣板需要的資料；回傳 null 表示資料不足、跳過此頁 */
async function buildPageData(p) {
  if (!p.nameZh && !p.nameEn) return null;
  /* 課程介紹：新 introZh 優先，相容舊 intros.zh；外文用老師手填的 introLocal，舊 AI 譯文 introTranslated 僅作退路 */
  const introZh = String(p.introZh || (p.intros && p.intros.zh) || '').trim();
  if (!introZh) return null;
  const displayLang = UI_STRINGS[p.defaultLang] ? p.defaultLang : 'zh';
  let introLocal = introZh;
  if (displayLang !== 'zh') {
    const tr = (String(p.introLocal || '').trim()
      || ((p.introLang === displayLang && p.introTranslated) ? p.introTranslated : '')
      || (p.intros && p.intros[displayLang]) || '').trim();
    if (tr) introLocal = tr;
  }
  const images = (Array.isArray(p.images) ? p.images : []).filter(Boolean).slice(0, 9);
  /* 影片：新 videoIds 陣列優先，相容舊的單一 videoId／videoUrl */
  const videoIds = (Array.isArray(p.videoIds) ? p.videoIds : []).filter(Boolean).slice(0, 5);
  if (!videoIds.length) {
    const legacy = p.videoId || extractYouTubeId(p.videoUrl);
    if (legacy) videoIds.push(legacy);
  }
  const socials = (Array.isArray(p.socials) ? p.socials : [])
    .filter((s) => s && s.url)
    .slice(0, 8)
    .map((s) => ({
      type: SOCIAL_LABELS[s.type] ? s.type : 'whatsapp',
      label: stripNewlines(s.label) || SOCIAL_LABELS[s.type] || 'WhatsApp',
      url: String(s.url),
    }));

  const classNameZh = stripNewlines(p.classNameZh) || stripNewlines(p.className);
  const ogTitle = (classNameZh ? classNameZh + '｜' : '') +
    stripNewlines(p.nameZh || p.nameEn) + ' ' + t(displayLang, 'enrollTitle');
  const ogDescription = truncate(introLocal, 140);
  const coords = await resolveMapsCoords(p);

  return {
    slug: p.slug,
    nameZh: stripNewlines(p.nameZh),
    nameEn: stripNewlines(p.nameEn),
    classNameZh: stripNewlines(p.classNameZh) || stripNewlines(p.className),
    classNameLocal: stripNewlines(p.classNameLocal),
    photoUrl: p.photoUrl || '',
    country: stripNewlines(p.country),
    city: stripNewlines(p.city),
    address: stripNewlines(p.address),
    mapsUrl: p.mapsUrl || '',
    mapsLat: (coords && coords.lat) || '',
    mapsLng: (coords && coords.lng) || '',
    startDate: p.startDate || '',
    weekdays: (Array.isArray(p.weekdays) ? p.weekdays : []).filter((n) => n >= 1 && n <= 7).sort(),
    timeStart: p.timeStart || '',
    timeEnd: p.timeEnd || '',
    displayLang,
    introZh,
    introLocal,
    images,
    videoIds,
    socials,
    formUrl: p.formUrl || '#',
    ogTitle,
    ogDescription,
    ogImage: p.photoUrl || DEFAULT_OG_IMAGE,
    canonical: BASE_URL + '/enroll/' + p.slug + '/',
  };
}

function formatDate(iso, lang) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return '';
  if (lang === 'zh') {
    return parseInt(m[1], 10) + '年' + parseInt(m[2], 10) + '月' + parseInt(m[3], 10) + '日';
  }
  return m[1] + '-' + m[2] + '-' + m[3]; // 非中文一律 ISO 數字日期，全球通用無歧義
}
function formatWeekdays(days, lang) {
  if (!days || !days.length) return '';
  if (days.length === 7) return t(lang, 'daily');
  const names = t(lang, 'weekdays');
  const sep = lang === 'zh' ? '、' : ', ';
  return t(lang, 'weekly') + ' ' + days.map((d) => names[d - 1]).join(sep);
}
/* 純文字轉段落：空行分段、段內單換行轉 <br>，全部跳脫 */
function renderParas(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => '<p>' + escHtml(para).replace(/\n/g, '<br>') + '</p>')
    .join('');
}

/* 雙語段落標題：對外語言在前、中文在後 */
function renderSection(titleLocal, titleZh, innerHtml) {
  if (!innerHtml) return '';
  return (
    '<section class="section" aria-label="' + escAttr(titleLocal) + '">' +
    '<h2 class="section-title"><span class="sec-local">' + escHtml(titleLocal) + '</span>' +
    (titleLocal === titleZh ? '' : '<span class="sec-zh">' + escHtml(titleZh) + '</span>') +
    '</h2>' +
    innerHtml +
    '</section>'
  );
}

function renderPage(pd, template, css) {
  const lang = pd.displayLang;
  const location = [pd.country, pd.city].filter(Boolean).join(' · ');

  const heroPhoto = pd.photoUrl
    ? '<img class="hero-photo" src="' + escAttr(pd.photoUrl) + '" alt="' + escAttr(pd.nameZh || pd.nameEn) + '">'
    : '';

  /* 課程介紹：對外語言在前、中文在後（中文是給老師看的對照）；
     文人排版：硃砂豎線引文＋「學」字淡印＋細線分隔，不用白底卡片 */
  const introHtml = renderSection(
    t(lang, 'intro'), '課程介紹',
    '<div class="intro-art"><span class="intro-mark" aria-hidden="true">學</span>' +
      '<div class="intro-verse">' + renderParas(pd.introLocal) + '</div>' +
      (lang === 'zh'
        ? ''
        : '<div class="intro-sep" aria-hidden="true"></div>' +
          '<div class="intro-zh-text">' + renderParas(pd.introZh) + '</div>') +
      '</div>'
  );

  /* 上課時間：開課日期＋星期＋時段 */
  const scheduleHtml =
    pd.startDate || pd.weekdays.length || (pd.timeStart && pd.timeEnd)
      ? renderSection(
          t(lang, 'schedule'), '上課時間',
          '<div class="schedule-card">' +
            (pd.startDate
              ? '<p><strong>' + bilingualLabel(t(lang, 'startDate'), '開課日期') + '</strong>：' +
                escHtml(formatDate(pd.startDate, lang)) + '</p>'
              : '') +
            (pd.weekdays.length || (pd.timeStart && pd.timeEnd)
              ? '<p><strong>' + bilingualLabel(t(lang, 'schedule'), '上課時間') + '</strong>：' +
                escHtml(
                  formatWeekdays(pd.weekdays, lang) +
                    (pd.timeStart && pd.timeEnd ? ' ' + pd.timeStart + '–' + pd.timeEnd : '')
                ).trim() +
                '</p>'
              : '') +
            '</div>'
        )
      : '';

  /* 上課地點：有經緯度就用座標（內嵌＋開啟連結都用座標，確保紅點定位），否則用地址查詢／老師原始連結 */
  const hasCoords = pd.mapsLat && pd.mapsLng;
  const mapsOpenUrl = hasCoords
    ? 'https://www.google.com/maps/search/?api=1&query=' + pd.mapsLat + ',' + pd.mapsLng
    : pd.mapsUrl;
  const locationHtml = pd.address
    ? renderSection(
        t(lang, 'location'), '上課地點',
        '<p class="map-address">' + escHtml(pd.address) + '</p>' +
          '<div class="map-wrap"><iframe src="' + escAttr(
            hasCoords
              ? 'https://www.google.com/maps?q=' + pd.mapsLat + ',' + pd.mapsLng + '&z=16&output=embed'
              : 'https://www.google.com/maps?q=' + encodeURIComponent(pd.address) + '&output=embed'
          ) + '" title="教室地圖" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
          (mapsOpenUrl
            ? '<a class="map-open" href="' + escAttr(mapsOpenUrl) + '" target="_blank" rel="noopener">' +
              bilingualLabel(t(lang, 'openMap'), '在 Google 地圖開啟') + '</a>'
            : '')
      )
    : '';

  const galleryHtml = pd.images.length
    ? renderSection(
        t(lang, 'gallery'), '精彩瞬間',
        '<div class="gallery">' +
          pd.images.map((u, i) =>
            '<a class="g-thumb" href="#g' + i + '"><img src="' + escAttr(u) + '" alt="課程照片 ' + (i + 1) + '" loading="lazy"></a>'
          ).join('') +
          '</div>' +
          pd.images.map((u, i) => {
            const n = pd.images.length;
            const nav = n > 1
              ? '<a class="lb-prev" href="#g' + ((i - 1 + n) % n) + '" aria-label="上一張">‹</a>' +
                '<a class="lb-next" href="#g' + ((i + 1) % n) + '" aria-label="下一張">›</a>'
              : '';
            return '<div class="lightbox" id="g' + i + '" role="dialog" aria-label="課程照片 ' + (i + 1) + '">' +
              '<a class="lb-close" href="#!" aria-label="關閉"></a>' +
              '<a class="lb-x" href="#!" aria-label="關閉">✕</a>' + nav +
              '<input class="lb-zoom" type="checkbox" id="gz' + i + '" aria-hidden="true" tabindex="-1">' +
              '<label class="lb-stage" for="gz' + i + '"><img src="' + escAttr(u) + '" alt="課程照片 ' + (i + 1) + '" title="點擊放大／縮小"></label>' +
              '</div>';
          }).join('')
      )
    : '';

  const videoHtml = pd.videoIds.length
    ? renderSection(
        t(lang, 'video'), '影片介紹',
        '<div class="video-list">' +
          pd.videoIds
            .map(
              (id) =>
                '<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/' +
                escAttr(id) +
                '" title="課程介紹影片" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
            )
            .join('') +
          '</div>'
      )
    : '';

  const socialsHtml = pd.socials.length
    ? renderSection(
        t(lang, 'groups'), '加入群組',
        '<div class="social-list">' +
          pd.socials
            .map(
              (s) =>
                '<a class="social-btn" href="' + escAttr(s.url) + '" target="_blank" rel="noopener">' +
                '<span class="social-tag">' + escHtml(SOCIAL_LABELS[s.type]) + '</span>' +
                '<span>' + escHtml(s.label) + '<small>' + escAttr(s.url) + '</small></span></a>'
            )
            .join('') +
          '</div>'
      )
    : '';

  const openBadge =
    '<span class="badge-open"><span class="pill-local">' + escHtml(t(lang, 'open')) + '</span>' +
    (lang === 'zh' ? '' : '<span class="pill-zh">招生中</span>') + '</span>';
  const ctaHtml =
    '<a class="cta-button" href="' + escAttr(pd.formUrl) + '" target="_blank" rel="noopener">' +
    '<span class="cta-local">' + escHtml(t(lang, 'enrollNow')) + '</span>' +
    (lang === 'zh' ? '' : '<span class="cta-zh">立即報名</span>') + '</a>';
  const footerHtml = lang === 'zh'
    ? escHtml(t('zh', 'footer'))
    : escHtml(t(lang, 'footer')) + ' <span class="ft-zh">中文班招生專頁</span>';

  return template
    .split('{{HTML_LANG}}').join(lang === 'zh' ? 'zh-Hant' : escAttr(lang))
    .split('{{OG_TITLE}}').join(escHtml(pd.ogTitle))
    .split('{{OG_DESCRIPTION}}').join(escAttr(pd.ogDescription))
    .split('{{OG_IMAGE}}').join(escAttr(pd.ogImage))
    .split('{{CANONICAL_URL}}').join(escAttr(pd.canonical))
    .split('{{INLINE_CSS}}').join(css)
    .split('{{HERO_PHOTO}}').join(heroPhoto)
    .split('{{HERO_TITLE}}').join(escHtml(pd.classNameZh || pd.nameZh || pd.nameEn))
    .split('{{HERO_CLASS_LOCAL}}').join(pd.classNameZh && pd.classNameLocal
      ? '<p class="hero-class-local">' + escHtml(pd.classNameLocal) + '</p>'
      : '')
    .split('{{HERO_TEACHER}}').join(pd.classNameZh
      ? '<p class="hero-teacher">' + escHtml(pd.nameZh || pd.nameEn) + '</p>'
      : '')
    .split('{{OPEN_BADGE}}').join(openBadge)
    .split('{{LOCATION_LINE}}').join(escHtml(location))
    .split('{{INTRO_HTML}}').join(introHtml)
    .split('{{SCHEDULE_HTML}}').join(scheduleHtml)
    .split('{{LOCATION_HTML}}').join(locationHtml)
    .split('{{GALLERY_HTML}}').join(galleryHtml)
    .split('{{VIDEO_HTML}}').join(videoHtml)
    .split('{{SOCIALS_HTML}}').join(socialsHtml)
    .split('{{CTA_HTML}}').join(ctaHtml)
    .split('{{FOOTER_HTML}}').join(footerHtml);
}

async function main() {
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  ['{{INLINE_CSS}}', '{{INTRO_HTML}}', '{{HERO_TITLE}}', '{{HERO_CLASS_LOCAL}}', '{{HERO_TEACHER}}', '{{CTA_HTML}}'].forEach((t) => {
    if (!template.includes(t)) throw new Error('樣板缺少佔位符 ' + t);
  });

  const fixturePath = arg('--fixture');
  let rawPages;
  if (fixturePath) {
    rawPages = JSON.parse(fs.readFileSync(path.resolve(fixturePath), 'utf8')).filter(isPublishable);
    console.log('測試模式：使用 fixture，共 ' + rawPages.length + ' 筆');
  } else {
    rawPages = await fetchPublished(); // 失敗即 throw，不清空輸出
  }

  /* slug 去重：後勝出，並警告 */
  const bySlug = new Map();
  rawPages.forEach((p) => {
    if (isPublishable(p)) {
      if (bySlug.has(p.slug)) console.warn('警告：重複 slug「' + p.slug + '」，以後者為準');
      bySlug.set(p.slug, p);
    }
  });

  const rendered = [];
  for (const p of bySlug.values()) {
    const pd = await buildPageData(p);
    if (!pd) {
      console.warn('跳過：資料不足（缺姓名或課程介紹），slug=' + p.slug);
      continue;
    }
    rendered.push({ slug: pd.slug, html: renderPage(pd, template, css) });
  }

  /* 整目錄重建：只有走到這裡（抓取成功）才清空，避免误删 */
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  rendered.forEach((r) => {
    const dir = path.join(OUT_DIR, r.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), r.html, 'utf8');
  });

  console.log(
    '完成：讀取 ' + rawPages.length + ' 筆，發布 ' + rendered.length + ' 頁 → ' + OUT_DIR
  );
}

main().catch((err) => {
  console.error('產生失敗：' + (err && err.message ? err.message : err));
  process.exit(1);
});
