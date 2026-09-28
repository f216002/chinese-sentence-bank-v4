/*
 * My Chinese Sentence Bank V4 language profiles.
 *
 * Ported from V3's language-config.js (final version, 2026-09-22), adapted
 * for V4's classic-script loading. Ten student mother tongues; Hindi remains
 * the default for compatibility with the existing V4 sentence bank.
 *
 * Each profile carries everything the prompt builder, the paste parser and
 * the card renderer need: display names, input hints, whether the language
 * needs a Latin-script romanization section, and legacy paste labels.
 */
var V4_LANGUAGE_PROFILES = {
  hi: {
    code: 'hi',
    name: 'Hindi',
    nameZh: '印地文',
    toneGloss: ['माँ', 'सन', 'घोड़ा', 'डाँटना'],
    nativeName: 'हिन्दी',
    locale: 'hi-IN',
    region: 'India',
    inputHelp: 'Hindi, Romanized Hindi, or Chinese sentence',
    inputHelpZh: '印地文、印地文羅馬拼音或中文句子',
    inputPlaceholder: 'क्योंकि तुमने अभी देना नहीं सीखा।\nKyonki tumne abhi dena nahin seekha.\nor: 因為你還沒學會給予。',
    romanizationName: 'Roman Hindi',
    requiresRomanization: true,
    legacyLabels: ['HINDI']
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nameZh: '坦米爾文',
    toneGloss: ['அம்மா', 'சணல்', 'குதிரை', 'திட்டு'],
    nativeName: 'தமிழ்',
    locale: 'ta-IN',
    region: 'India and Sri Lanka',
    inputHelp: 'Tamil or Chinese sentence',
    inputHelpZh: '坦米爾文或中文句子',
    inputPlaceholder: 'தமிழ் வாக்கியத்தை இங்கே உள்ளிடவும்\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Tamil Romanization',
    requiresRomanization: true,
    legacyLabels: ['TAMIL']
  },
  th: {
    code: 'th',
    name: 'Thai',
    nameZh: '泰文',
    toneGloss: ['แม่', 'ป่าน', 'ม้า', 'ด่า'],
    nativeName: 'ไทย',
    locale: 'th-TH',
    region: 'Thailand',
    inputHelp: 'Thai or Chinese sentence',
    inputHelpZh: '泰文或中文句子',
    inputPlaceholder: 'ใส่ประโยคภาษาไทยที่นี่\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Thai Romanization',
    requiresRomanization: true,
    legacyLabels: ['THAI']
  },
  km: {
    code: 'km',
    name: 'Khmer',
    nameZh: '高棉文',
    toneGloss: ['ម្ដាយ', 'កញ្ឆា', 'សេះ', 'ជេរ'],
    nativeName: 'ខ្មែរ',
    locale: 'km-KH',
    region: 'Cambodia',
    inputHelp: 'Khmer or Chinese sentence',
    inputHelpZh: '高棉文或中文句子',
    inputPlaceholder: 'សូមបញ្ចូលប្រយោគភាសាខ្មែរនៅទីនេះ\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Khmer Romanization',
    requiresRomanization: true,
    legacyLabels: ['KHMER']
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nameZh: '越南文',
    toneGloss: ['mẹ', 'cây gai dầu', 'ngựa', 'mắng'],
    nativeName: 'Tiếng Việt',
    locale: 'vi-VN',
    region: 'Vietnam',
    inputHelp: 'Vietnamese or Chinese sentence',
    inputHelpZh: '越南文或中文句子',
    inputPlaceholder: 'Nhập một câu tiếng Việt ở đây.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Romanization',
    requiresRomanization: false,
    legacyLabels: ['VIETNAMESE']
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nameZh: '印尼文',
    toneGloss: ['ibu', 'rami', 'kuda', 'memarahi'],
    nativeName: 'Bahasa Indonesia',
    locale: 'id-ID',
    region: 'Indonesia',
    inputHelp: 'Indonesian or Chinese sentence',
    inputHelpZh: '印尼文或中文句子',
    inputPlaceholder: 'Masukkan satu kalimat bahasa Indonesia di sini.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Romanization',
    requiresRomanization: false,
    legacyLabels: ['INDONESIAN']
  },
  ne: {
    code: 'ne',
    name: 'Nepali',
    nameZh: '尼泊爾文',
    toneGloss: ['आमा', 'भाङ', 'घोडा', 'गाली'],
    nativeName: 'नेपाली',
    locale: 'ne-NP',
    region: 'Nepal',
    inputHelp: 'Nepali, Romanized Nepali, or Chinese sentence',
    inputHelpZh: '尼泊爾文、尼泊爾文羅馬拼音或中文句子',
    inputPlaceholder: 'यहाँ नेपाली वाक्य लेख्नुहोस्।\nYahā̃ Nepālī vākya lekhnuhos.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Roman Nepali',
    requiresRomanization: true,
    legacyLabels: ['NEPALI']
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nameZh: '孟加拉文',
    toneGloss: ['মা', 'শণ', 'ঘোড়া', 'বকা'],
    nativeName: 'বাংলা',
    locale: 'bn-BD',
    region: 'Bangladesh and India',
    inputHelp: 'Bengali, Romanized Bengali, or Chinese sentence',
    inputHelpZh: '孟加拉文、孟加拉文羅馬拼音或中文句子',
    inputPlaceholder: 'এখানে একটি বাংলা বাক্য লিখুন।\nEkhāne ēkaṭi Bānlā bākya likhuna.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Roman Bengali',
    requiresRomanization: true,
    legacyLabels: ['BENGALI', 'BANGLA']
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nameZh: '西班牙文',
    toneGloss: ['madre', 'cáñamo', 'caballo', 'regañar'],
    nativeName: 'Español',
    locale: 'es-ES',
    region: 'Spanish-speaking regions',
    inputHelp: 'Spanish or Chinese sentence',
    inputHelpZh: '西班牙文或中文句子',
    inputPlaceholder: 'Escriba aquí una oración en español.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Romanization',
    requiresRomanization: false,
    legacyLabels: ['SPANISH']
  },
  en: {
    code: 'en',
    name: 'English',
    nameZh: '英文',
    toneGloss: ['mother', 'hemp', 'horse', 'scold'],
    nativeName: 'English',
    locale: 'en-US',
    region: 'International',
    inputHelp: 'English or Chinese sentence',
    inputHelpZh: '英文或中文句子',
    inputPlaceholder: 'Enter one English sentence here.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Romanization',
    requiresRomanization: false,
    legacyLabels: ['ENGLISH']
  },
  de: {
    code: 'de',
    name: 'German',
    nameZh: '德文',
    toneGloss: ['Mutter', 'Hanf', 'Pferd', 'schimpfen'],
    nativeName: 'Deutsch',
    locale: 'de-DE',
    region: 'Germany',
    inputHelp: 'German or Chinese sentence',
    inputHelpZh: '德文或中文句子',
    inputPlaceholder: 'Gib hier einen deutschen Satz ein.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Romanization',
    requiresRomanization: false,
    legacyLabels: ['GERMAN']
  },
  my: {
    code: 'my',
    name: 'Burmese',
    nameZh: '緬甸文',
    toneGloss: ['အမေ', 'လျှော်', 'မြင်း', 'ဆဲဆိုသည်'],
    nativeName: 'မြန်မာ',
    locale: 'my-MM',
    region: 'Myanmar',
    inputHelp: 'Burmese or Chinese sentence',
    inputHelpZh: '緬甸文或中文句子',
    inputPlaceholder: 'မြန်မာစာကြောင်းတစ်ကြောင်း ထည့်ပါ။\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Burmese Romanization',
    requiresRomanization: true,
    legacyLabels: ['BURMESE']
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nameZh: '韓文',
    toneGloss: ['엄마', '삼', '말', '꾸짖다'],
    nativeName: '한국어',
    locale: 'ko-KR',
    region: 'Korea',
    inputHelp: 'Korean or Chinese sentence',
    inputHelpZh: '韓文或中文句子',
    inputPlaceholder: '여기에 한국어 문장을 입력하세요.\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Korean Romanization',
    requiresRomanization: true,
    legacyLabels: ['KOREAN']
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nameZh: '日文',
    toneGloss: ['お母さん', '麻', '馬', '叱る'],
    nativeName: '日本語',
    locale: 'ja-JP',
    region: 'Japan',
    inputHelp: 'Japanese or Chinese sentence',
    inputHelpZh: '日文或中文句子',
    inputPlaceholder: 'ここに日本語の文を入力してください。\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Japanese Romanization',
    requiresRomanization: true,
    legacyLabels: ['JAPANESE']
  },
  si: {
    code: 'si',
    name: 'Sinhala',
    nameZh: '僧伽羅文',
    toneGloss: ['අම්මා', 'කංසා', 'අශ්වයා', 'බනිනවා'],
    nativeName: 'සිංහල',
    locale: 'si-LK',
    region: 'Sri Lanka',
    inputHelp: 'Sinhala or Chinese sentence',
    inputHelpZh: '僧伽羅文或中文句子',
    inputPlaceholder: 'මෙහි සිංහල වාක්‍යයක් ඇතුළත් කරන්න。\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Sinhala Romanization',
    requiresRomanization: true,
    legacyLabels: ['SINHALA']
  },
  fa: {
    code: 'fa',
    name: 'Persian',
    nameZh: '波斯文',
    toneGloss: ['مادر', 'شاهدانه', 'اسب', 'سرزنش'],
    nativeName: 'فارسی',
    locale: 'fa-IR',
    region: 'Iran',
    inputHelp: 'Persian or Chinese sentence',
    inputHelpZh: '波斯文或中文句子',
    inputPlaceholder: 'یک جمله فارسی در اینجا وارد کنید。\nor: 請在這裡輸入中文句子。',
    romanizationName: 'Persian Romanization',
    requiresRomanization: true,
    legacyLabels: ['PERSIAN', 'FARSI']
  }
};

function v4GetLanguageProfile(code) {
  return V4_LANGUAGE_PROFILES[code] || V4_LANGUAGE_PROFILES.hi;
}

/* Seven language-neutral section headers, exactly as in V3's final version:
   SOURCE, CHINESE, PINYIN, ROMANIZATION, EXPLANATION, CATEGORY, TAGS.
   Only the ROMANIZATION instruction varies: non-Latin scripts need a full
   Latin-script romanization; Latin-script languages leave it empty. */
function v4BuildLanguagePrompt(profile, sentence) {
  var romanizationInstruction = profile.requiresRomanization
    ? 'ROMANIZATION:\nProvide a complete Latin-script romanization of the ' + profile.name + ' sentence.'
    : 'ROMANIZATION:\nLeave this section empty because the source language already uses Latin script.';

  return 'Role Persona: You are a professional Taiwanese Mandarin teacher whose native language is ' + profile.name + '. Your beginner students are from ' + profile.region + '. Conduct all explanations in warm, clear and professional ' + profile.name + '.\n\nCore Task: If I provide ' + profile.name + ', translate it into natural spoken Traditional Chinese as used in Taiwan. If I provide Chinese, translate it into natural ' + profile.name + '. Then explain the vocabulary and grammatical structure in ' + profile.name + '.\n\nFormatting and Output Guidelines: Return exactly the seven section headers below in this order. Put every header on its own line exactly as written. Do not add Markdown symbols, an introduction, a conclusion, a note, or an additional section. Never insert notes, corrections, or commentary inside a section; each section must contain only what that section asks for.\n\nSOURCE:\nWrite the complete ' + profile.name + ' sentence. If the input is Chinese, translate it into natural ' + profile.name + '.\n\nCHINESE:\nProvide an accurate, natural translation using Traditional Chinese characters exclusively and wording commonly used in Taiwan.\n\nPINYIN:\nProvide complete Hanyu Pinyin with correct tone marks and punctuation.\n\n' + romanizationInstruction + '\n\nEXPLANATION:\nExplain the full meaning, important words, useful phrases, measure words, word order and grammar in ' + profile.name + '. Whenever Chinese appears, always show the Traditional Chinese, Pinyin and ' + profile.name + ' meaning together in this format: 漢字 (pīnyīn) - ' + profile.name + ' explanation.\n\nCATEGORY:\nChoose exactly one: Daily Life, School, Home, Restaurant, Shopping, Bank, Hospital, Travel, Train & Bus, Airport, Work, Friends, Other\n\nTAGS:\nProvide 3 to 6 short English search keywords separated by commas.\n\nSentence to be explained:\n' + sentence;
}
