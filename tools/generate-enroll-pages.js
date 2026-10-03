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
const JS_FILE = path.join(__dirname, 'enroll-page.js');
const SLUG_RE = /^[a-z0-9-]{3,30}$/;
const SOCIAL_LABELS = { whatsapp: 'WhatsApp', telegram: 'Telegram', line: 'LINE' };

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

/* 整理成樣板需要的資料；回傳 null 表示資料不足、跳過此頁 */
function buildPageData(p) {
  const intros = {};
  Object.keys(p.intros || {}).forEach((k) => {
    const t = stripNewlines(p.intros[k]);
    if (t) intros[k] = p.intros[k];
  });
  if (!p.nameZh && !p.nameEn) return null;
  if (!Object.keys(intros).length) return null;

  const defaultLang = (p.defaultLang && intros[p.defaultLang]) ? p.defaultLang : Object.keys(intros)[0];
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

  const ogTitle = stripNewlines(p.nameZh || p.nameEn) + ' 中文班招生';
  const ogDescription = truncate(intros[defaultLang] || '', 140);

  return {
    slug: p.slug,
    nameZh: stripNewlines(p.nameZh),
    nameEn: stripNewlines(p.nameEn),
    photoUrl: p.photoUrl || '',
    country: stripNewlines(p.country),
    city: stripNewlines(p.city),
    address: stripNewlines(p.address),
    mapsUrl: p.mapsUrl || '',
    mapsLat: p.mapsLat || '',
    mapsLng: p.mapsLng || '',
    defaultLang,
    intros,
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

function renderSection(title, enSub, innerHtml) {
  if (!innerHtml) return '';
  return (
    '<section class="section" aria-label="' + escAttr(title) + '">' +
    '<h2 class="section-title">' + escHtml(title) + ' <span class="en-sub">' + escHtml(enSub) + '</span></h2>' +
    innerHtml +
    '</section>'
  );
}

function renderPage(pd, template, css, js) {
  const location = [pd.country, pd.city].filter(Boolean).join(' · ');

  const heroPhoto = pd.photoUrl
    ? '<img class="hero-photo" src="' + escAttr(pd.photoUrl) + '" alt="' + escAttr(pd.nameZh || pd.nameEn) + '">'
    : '';

  /* 上課地點：有經緯度就用座標內嵌，否則用地址查詢；按鈕一律連老師原始分享連結 */
  const locationHtml = pd.address
    ? renderSection(
        '上課地點', 'Classroom',
        '<p class="map-address">' + escHtml(pd.address) + '</p>' +
          '<div class="map-wrap"><iframe src="' + escAttr(
            pd.mapsLat && pd.mapsLng
              ? 'https://www.google.com/maps?q=' + pd.mapsLat + ',' + pd.mapsLng + '&z=16&output=embed'
              : 'https://www.google.com/maps?q=' + encodeURIComponent(pd.address) + '&output=embed'
          ) + '" title="教室地圖" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
          (pd.mapsUrl
            ? '<a class="map-open" href="' + escAttr(pd.mapsUrl) + '" target="_blank" rel="noopener">在 Google 地圖開啟<span class="en-sub">Open in Google Maps</span></a>'
            : '')
      )
    : '';

  const galleryHtml = pd.images.length
    ? renderSection(
        '精彩瞬間', 'Moments',
        '<div class="gallery">' +
          pd.images.map((u, i) => '<img src="' + escAttr(u) + '" alt="課程照片 ' + (i + 1) + '" loading="lazy">').join('') +
          '</div>'
      )
    : '';

  const videoHtml = pd.videoIds.length
    ? renderSection(
        '影片介紹', 'Videos',
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
        '加入群組', 'Join us',
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

  const pageDataJson = JSON.stringify({
    slug: pd.slug,
    nameZh: pd.nameZh,
    nameEn: pd.nameEn,
    defaultLang: pd.defaultLang,
    intros: pd.intros,
  }).replace(/<\//g, '<\\/');

  return template
    .split('{{HTML_LANG}}').join(pd.defaultLang === 'zh' ? 'zh-Hant' : escAttr(pd.defaultLang))
    .split('{{OG_TITLE}}').join(escHtml(pd.ogTitle))
    .split('{{OG_DESCRIPTION}}').join(escAttr(pd.ogDescription))
    .split('{{OG_IMAGE}}').join(escAttr(pd.ogImage))
    .split('{{CANONICAL_URL}}').join(escAttr(pd.canonical))
    .split('{{INLINE_CSS}}').join(css)
    .split('{{INLINE_JS}}').join(js)
    .split('{{HERO_PHOTO}}').join(heroPhoto)
    .split('{{LOCATION_LINE}}').join(escHtml(location))
    .split('{{LOCATION_HTML}}').join(locationHtml)
    .split('{{GALLERY_HTML}}').join(galleryHtml)
    .split('{{VIDEO_HTML}}').join(videoHtml)
    .split('{{SOCIALS_HTML}}').join(socialsHtml)
    .split('{{FORM_URL}}').join(escAttr(pd.formUrl))
    .split('{{PAGE_DATA_JSON}}').join(pageDataJson);
}

async function main() {
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  const js = fs.readFileSync(JS_FILE, 'utf8');
  ['{{INLINE_CSS}}', '{{INLINE_JS}}', '{{PAGE_DATA_JSON}}'].forEach((t) => {
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
    const pd = buildPageData(p);
    if (!pd) {
      console.warn('跳過：資料不足（缺姓名或課程介紹），slug=' + p.slug);
      continue;
    }
    rendered.push({ slug: pd.slug, html: renderPage(pd, template, css, js) });
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
