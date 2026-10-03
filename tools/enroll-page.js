/* ---- 招生公開頁前端：語言切換（內嵌進每位老師的靜態頁） ----
   無外部依賴、無 Firebase；老師內容以 textContent 寫入，避免 XSS。 */
(function () {
  'use strict';

  var LANG_NAMES = {
    hi: 'हिन्दी', ta: 'தமிழ்', th: 'ไทย', km: 'ខ្មែរ',
    vi: 'Tiếng Việt', id: 'Bahasa Indonesia', ne: 'नेपाली', bn: 'বাংলা',
    es: 'Español', en: 'English', de: 'Deutsch', my: 'မြန်မာ',
    ko: '한국어', ja: '日本語', si: 'සිංහල', fa: 'فارسی', zh: '中文'
  };

  function $(id) { return document.getElementById(id); }

  var dataEl = $('enroll-data');
  if (!dataEl) return;
  var data;
  try { data = JSON.parse(dataEl.textContent); }
  catch (e) { return; }

  function firstValue(map) {
    if (!map) return '';
    var keys = Object.keys(map);
    return keys.length ? map[keys[0]] : '';
  }

  /* 取值順序：指定語言 → 老師預設語言 → 中文 → 英文 → 第一個有的 */
  function pickText(map, lang) {
    if (!map) return '';
    return map[lang] || map[data.defaultLang] || map.zh || map.en || firstValue(map);
  }

  function availableLangs() {
    var set = {};
    Object.keys(data.intros || {}).forEach(function (l) { set[l] = true; });
    if (data.defaultLang) set[data.defaultLang] = true;
    var langs = Object.keys(set);
    if (!langs.length) langs = ['zh'];
    /* 預設語言排第一 */
    langs.sort(function (a, b) {
      if (a === data.defaultLang) return -1;
      if (b === data.defaultLang) return 1;
      return 0;
    });
    return langs;
  }

  function teacherName(lang) {
    if (lang === 'zh' || /^zh/.test(lang)) return data.nameZh || data.nameEn || '';
    return data.nameEn || data.nameZh || '';
  }

  function renderParagraphs(container, text) {
    container.textContent = '';
    String(text || '').split(/\n{2,}|\r\n\r\n/).forEach(function (para) {
      var p = document.createElement('p');
      /* 段內單換行轉 <br>，仍用 textContent 逐段寫入 */
      var lines = para.split(/\n/);
      lines.forEach(function (line, i) {
        if (i > 0) p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(line));
      });
      container.appendChild(p);
    });
  }

  function render(lang) {
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : lang);
    var nameEl = $('enroll-teacher-name');
    if (nameEl) nameEl.textContent = teacherName(lang);
    var introEl = $('enroll-intro');
    if (introEl) renderParagraphs(introEl, pickText(data.intros, lang));
    var pills = document.querySelectorAll('.lang-pill');
    pills.forEach(function (pill) {
      pill.setAttribute('aria-pressed', pill.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('enroll-lang-' + data.slug, lang); } catch (e) {}
  }

  function initialLang(langs) {
    try {
      var saved = localStorage.getItem('enroll-lang-' + data.slug);
      if (saved && langs.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || 'en').toLowerCase().replace('_', '-');
    var short = nav.split('-')[0];
    if (langs.indexOf(nav) !== -1) return nav;
    if (langs.indexOf(short) !== -1) return short;
    return data.defaultLang && langs.indexOf(data.defaultLang) !== -1 ? data.defaultLang : langs[0];
  }

  function buildPills(langs) {
    var row = $('enroll-lang-row');
    if (!row) return;
    row.textContent = '';
    langs.forEach(function (lang) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lang-pill';
      b.setAttribute('data-lang', lang);
      b.setAttribute('aria-pressed', 'false');
      b.textContent = LANG_NAMES[lang] || lang;
      b.addEventListener('click', function () { render(lang); });
      row.appendChild(b);
    });
  }

  var langs = availableLangs();
  buildPills(langs);
  render(initialLang(langs));
})();
