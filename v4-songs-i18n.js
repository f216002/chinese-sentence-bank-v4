/* V4 中文歌曲歌詞翻譯（AI 校對草稿，待老師審定）
   結構：V4_SONGS_I18N[songId][lineIdx][lang] = { s: 譯句, r: 羅馬拼音, e: 解說 }
   16 語全齊：hi/ta/th/km/vi/id/ne/bn/es/en/de/my/ko/ja/si/fa */
const V4_SONGS_I18N = {
  "buyuge": [
    {
      "hi": {
        "s": "सफ़ेद लहरें उछलती हैं, मैं नहीं डरता।",
        "r": "Safed lahrein uchalti hain, main nahin darta.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "en": {
        "s": "White waves surge and roll, I am not afraid.",
        "r": "",
        "e": "滔滔 describes waves surging; 不怕 means 'not afraid'."
      },
      "ta": {
        "s": "வெள்ளை அலைகள் பொங்கி எழுகின்றன, நான் அஞ்சவில்லை.",
        "r": "veḷḷai alaikaḷ poṅki eḻukiṉṟaṉa, nāṉ añcavillai.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "th": {
        "s": "คลื่นขาวโหมกระหน่ำ ฉันไม่กลัว",
        "r": "khluen khao hom kratham chan mai klua",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "km": {
        "s": "រលកសកំពុងបោកបក់ ខ្ញុំមិនខ្លាចទេ",
        "r": "rɔlɔɔk sɑ kɑmpuŋ baokbɑk kʰɲom mɨn kʰlaac te",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "vi": {
        "s": "Sóng trắng cuồn cuộn dâng cao, tôi chẳng sợ.",
        "r": "",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "id": {
        "s": "Ombak putih bergulung-gulung, aku tidak takut.",
        "r": "",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "ne": {
        "s": "सेता छालहरू उर्लिरहेका छन्, म डराउँदिनँ।",
        "r": "setā chhālharū urlirahekā chhan, ma ḍarāũdinã.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "bn": {
        "s": "সাদা ঢেউ ফুঁসে উঠছে, আমি ভয় পাই না।",
        "r": "sādā ḍheu phũse uṭhche, āmi bhoy pāi nā.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "es": {
        "s": "Las olas blancas rugen, no tengo miedo.",
        "r": "",
        "e": "滔滔形容波浪翻滾的樣子；不怕＝不害怕。"
      },
      "de": {
        "s": "Die weißen Wellen toben, ich habe keine Angst.",
        "r": "",
        "e": "滔滔形容波浪翻滾的樣子；不怕＝不害怕。"
      },
      "my": {
        "s": "လှိုင်းဖြူများ ကြီးမားစွာ လိမ့်နေတယ်၊ ကျွန်တော် မကြောက်ဘူး။",
        "r": "Hlaing-phyu mya gyi-ma-zwa leik-ne-te, kyan-taw ma-kyauk-bu.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "ko": {
        "s": "흰 물결이 거세게 밀려와도, 나는 무섭지 않아.",
        "r": "Huin mulgyeori geosage millyeowado, naneun museopji ana.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "ja": {
        "s": "白波が高くうねっても、私は怖くない。",
        "r": "Shironami ga takaku unettemo, watashi wa kowakunai.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "si": {
        "s": "සුදු රළ විශාල ලෙස නැග එයි, මම බය නැහැ.",
        "r": "Sudu rala vishala lesa naga ei, mama baya naha.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      "fa": {
        "s": "امواج سفید خروشان می‌غلتند، من نمی‌ترسم.",
        "r": "Amvâj-e sefid-e xurushân mi-qaltand, man nemi-tarsam.",
        "e": "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      }
    },
    {
      "hi": {
        "s": "पतवार सँभालकर आगे की ओर बढ़ो।",
        "r": "Patvaar sambhaalkar aage ki or badho.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "en": {
        "s": "Take the helm and row forward.",
        "r": "",
        "e": "掌起舵兒 means 'take hold of the rudder'; 往前划 means 'row forward'."
      },
      "ta": {
        "s": "சுக்கானைப் பிடித்து முன்னோக்கித் துடுப்புப் போடு.",
        "r": "cukkāṉaip piṭittu muṉṉōkkit tuṭuppup pōṭu.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "th": {
        "s": "จับหางเสือแล้วพายไปข้างหน้า",
        "r": "chap hang suea laeo phai pai khang na",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "km": {
        "s": "កាន់ចង្កូតហើយចែវទៅមុខ",
        "r": "kan cɑngkuut haəy cɛɛv tɨw muk",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "vi": {
        "s": "Nắm lấy bánh lái, chèo về phía trước.",
        "r": "",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "id": {
        "s": "Pegang kemudi dan dayung ke depan.",
        "r": "",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "ne": {
        "s": "पतवार समातेर अगाडि बढ।",
        "r": "patwār samātera agāḍi baḍha.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "bn": {
        "s": "হাল ধরো, সামনে বেয়ে চলো।",
        "r": "hāl dharo, sāmne beye chalo.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "es": {
        "s": "Toma el timón y rema hacia adelante.",
        "r": "",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "de": {
        "s": "Nimm das Ruder in die Hand und rudere vorwärts.",
        "r": "",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "my": {
        "s": "လှော်တက်ကို ကိုင်ပြီး ရှေ့ကို လှော်ခတ်။",
        "r": "Hlaw-tet ko kaing-pi she-ko hlah-khat.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "ko": {
        "s": "키를 잡고 앞으로 노를 저어라.",
        "r": "Kireul japgo apeuro noreul jeoeora.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "ja": {
        "s": "舵を取って、前へ漕ぎ進め。",
        "r": "Kaji o totte, mae e kogi-susume.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "si": {
        "s": "රුල් එක අල්ලාගෙන ඉදිරියට ඔරු පදින්න.",
        "r": "Rul eka allagena idiriyata oru padinna.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      "fa": {
        "s": "سکان را بگیر و به جلو پارو بزن.",
        "r": "Sokkân râ begir o be jelou pârou bezan.",
        "e": "掌起舵兒＝握住船舵；往前划＝向前划船。"
      }
    },
    {
      "hi": {
        "s": "जाल पानी में डालो, ऐ मछुआरो।",
        "r": "Jaal paani mein daalo, ai machhuaaro.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "en": {
        "s": "Cast the net into the water, oh fishermen.",
        "r": "",
        "e": "撒網 means 'cast the fishing net'; 漁家 means 'fishermen'."
      },
      "ta": {
        "s": "வலையை நீரில் வீசுங்கள், மீனவர்களே.",
        "r": "valaiyai nīril vīcuṅkaḷ, mīṉavarkaḷē.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "th": {
        "s": "ทอดแห่ลงน้ำเถิด ชาวประมงทั้งหลาย",
        "r": "thot hae long nam thoet chao pramong thang lai",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "km": {
        "s": "បោះសន្ទូចចូលទឹកទៅ ពួកអ្នកនេសាទអើយ",
        "r": "bah sɑntouc coul tɨk tɨw puək neak neesaat aəy",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "vi": {
        "s": "Quăng lưới xuống nước nào, hỡi các ngư dân.",
        "r": "",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "id": {
        "s": "Tebarkan jala ke dalam air, wahai para nelayan.",
        "r": "",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "ne": {
        "s": "जाल पानीमा फ्याँक, हे मछुवाहरू।",
        "r": "jāl pānīmā phyā̃ka, he machhuwāharū.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "bn": {
        "s": "জাল জলে ফেলো, হে জেলেরা।",
        "r": "jāl jale phelo, he jelera.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "es": {
        "s": "Echad la red al agua, pescadores.",
        "r": "",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "de": {
        "s": "Werft das Netz ins Wasser, ihr Fischer.",
        "r": "",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "my": {
        "s": "ကွန်ကို ရေထဲ ပစ်ချ၊ ငါးဖမ်းသမားတို့။",
        "r": "Kun ko ye-hte pyit-cha, nga-phan-tha-ma do.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "ko": {
        "s": "그물을 물에 던져라, 어부들이여.",
        "r": "Geumureul mure deonjyeora, eobudeuriyeo.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "ja": {
        "s": "網を水に投げ入れろ、漁師たちよ。",
        "r": "Ami o mizu ni nage-irero, ryōshi-tachiyo.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "si": {
        "s": "දැල වතුරට දමන්න, ධීවරයනි.",
        "r": "Dala vaturata damanna, dhivarayani.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      },
      "fa": {
        "s": "تور را به آب بینداز، ای ماهیگیران.",
        "r": "Tour râ be âb biyandâz, ey mâhigirân.",
        "e": "撒網＝撒下漁網；漁家＝漁民。"
      }
    },
    {
      "hi": {
        "s": "बड़ी मछली पकड़कर ज़ोर से हँसो।",
        "r": "Badi machhli pakadkar zor se hanso.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "en": {
        "s": "Catch a big fish and laugh heartily.",
        "r": "",
        "e": "捕 means 'to catch'; 笑哈哈 is the sound of hearty laughter."
      },
      "ta": {
        "s": "பெரிய மீனைப் பிடித்து மகிழ்ச்சியாய்ச் சிரி.",
        "r": "periya mīṉaip piṭittu makiḻcciyāyc ciri.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "th": {
        "s": "จับปลาตัวใหญ่ได้แล้วหัวเราะอย่างมีความสุข",
        "r": "chap pla tua yai dai laeo hua ro yang mi khwam suk",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "km": {
        "s": "ចាប់បានត្រីធំហើយសើចយ៉ាងសប្បាយ",
        "r": "cɑp baan trəy tʰom haəy səɨc yɨəng sɑbbaay",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "vi": {
        "s": "Bắt được cá to, cười ha hả vui vẻ.",
        "r": "",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "id": {
        "s": "Tangkap ikan besar, tertawa riang.",
        "r": "",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "ne": {
        "s": "ठूलो माछा समातेर रमाइलो गरी हाँस।",
        "r": "ṭhūlo māchhā samātera ramāilo garī hā̃sa.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "bn": {
        "s": "বড় মাছ ধরে আনন্দে হাসো।",
        "r": "baṛo māch dhore ānande hãso.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "es": {
        "s": "Atrapa un pez grande y ríe a carcajadas.",
        "r": "",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "de": {
        "s": "Fange einen großen Fisch und lache herzlich.",
        "r": "",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "my": {
        "s": "ငါးကြီးတစ်ကောင် ဖမ်းပြီး ရယ်မောလိုက်။",
        "r": "Nga-gyi ta-kaung phan-pi ye-maw-lait.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "ko": {
        "s": "큰 물고기 한 마리 잡고 하하 웃어라.",
        "r": "Keun mulgogi han mari japgo haha useora.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "ja": {
        "s": "大きな魚を捕まえて、ハハと笑おう。",
        "r": "Ōkina sakana o tsukamaete, haha to waraō.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "si": {
        "s": "ලොකු මාළුවෙක් අල්ලා සිනාසෙන්න.",
        "r": "Loku maluvek alla sinasenn.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      "fa": {
        "s": "ماهی بزرگی بگیر و بلند بخند.",
        "r": "Mâhi-ye bozorgi begir o boland bexand.",
        "e": "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      }
    },
    {
      "hi": {
        "s": "हैयो इयो इयो हेंग हैयो!",
        "r": "Haiyo iyo iyo heng haiyo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "en": {
        "s": "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "r": "",
        "e": "A work chant with no literal meaning, sung while rowing."
      },
      "ta": {
        "s": "ஹாய்-யோ, யி-யோ, யி-யோ, ஹெங், ஹாய்-யோ!",
        "r": "hāy-yō, yi-yō, yi-yō, heṅ, hāy-yō!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "th": {
        "s": "ไฮโย ยีโย ยีโย เฮิง ไฮโย!",
        "r": "hai yo yi yo yi yo heng hai yo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "km": {
        "s": "ហៃយោ យីយោ យីយោ ហេង ហៃយោ!",
        "r": "haiyo yiyo yiyo heng haiyo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "vi": {
        "s": "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "r": "",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "id": {
        "s": "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "r": "",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "ne": {
        "s": "हैयो, यियो, यियो, हेङ, हैयो!",
        "r": "haiyo, yiyo, yiyo, heṅ, haiyo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "bn": {
        "s": "হাইয়ো, ইয়ো, ইয়ো, হেং, হাইয়ো!",
        "r": "hāiyo, iyo, iyo, heṅ, hāiyo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "es": {
        "s": "¡Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "r": "",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "de": {
        "s": "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "r": "",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "my": {
        "s": "ဟိုင်း-ယို၊ ရီ-ယို၊ ရီ-ယို၊ ဟင်း၊ ဟိုင်း-ယို!",
        "r": "Haing-yo, yi-yo, yi-yo, hin, haing-yo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "ko": {
        "s": "하이요, 이요, 이요, 헹, 하이요!",
        "r": "Haiyo, iyo, iyo, heng, haiyo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "ja": {
        "s": "ハイヨー、イーヨー、イーヨー、ヘン、ハイヨー！",
        "r": "Haiyō, īyō, īyō, hen, haiyō!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "si": {
        "s": "හයි-යෝ, යි-යෝ, යි-යෝ, හෙං, හයි-යෝ!",
        "r": "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      "fa": {
        "s": "های-یو، یی-یو، یی-یو، هنگ، های-یو!",
        "r": "Hây-yo, yi-yo, yi-yo, heng, hây-yo!",
        "e": "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      }
    }
  ],
  "lanhuacao": [
    {
      "hi": {
        "s": "मैं पहाड़ों से आया हूँ, ऑर्किड घास साथ लाया हूँ।",
        "r": "Main pahaadon se aaya hoon, orchid ghaas saath laaya hoon.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "en": {
        "s": "I come from the mountains, bringing orchid plants with me.",
        "r": "",
        "e": "從山中來 means 'come from the mountains'; 蘭花草 is the orchid plant."
      },
      "ta": {
        "s": "நான் மலையிலிருந்து வந்தேன், ஆர்க்கிட் செடியைக் கொண்டு வந்தேன்.",
        "r": "nāṉ malaiyiliruntu vantēṉ, ārkkiṭ ceṭiyaik koṇṭu vantēṉ.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "th": {
        "s": "ฉันมาจากภูเขา นำต้นกล้วยไม้มาด้วย",
        "r": "chan ma chak phu khao nam ton kluai mai ma duai",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "km": {
        "s": "ខ្ញុំមកពីភ្នំ នាំយកដើមអ័រគីដេមកជាមួយ",
        "r": "kʰɲom mɔɔk pii pʰnom nɔɔm yɔɔk dəəm ɑɑkiidee mɔɔk ciemuəy",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "vi": {
        "s": "Tôi từ trong núi đến, mang theo cây lan.",
        "r": "",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "id": {
        "s": "Aku datang dari gunung, membawa tanaman anggrek.",
        "r": "",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "ne": {
        "s": "म पहाडबाट आएँ, अर्किडको बिरुवा ल्याएँ।",
        "r": "ma pahāḍbāṭa āẽ, arkiḍko biruwā lyāẽ.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "bn": {
        "s": "আমি পাহাড় থেকে এসেছি, অর্কিড গাছ নিয়ে এসেছি।",
        "r": "āmi pāhāṛ theke esechi, orkiḍ gāch niye esechi.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "es": {
        "s": "Vengo de las montañas, trayendo orquídeas conmigo.",
        "r": "",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "de": {
        "s": "Ich komme aus den Bergen und bringe Orchideen mit.",
        "r": "",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "my": {
        "s": "ကျွန်တော် တောင်တန်းတွေကနေ လာတယ်၊ သစ်ခွပင်တွေ ယူလာတယ်။",
        "r": "Kyan-taw taung-tan-dwe ka-ne la-te, thit-khwa-pin-dwe yu-la-te.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "ko": {
        "s": "나는 산에서 왔네, 난초를 가지고.",
        "r": "Naneun saneseo wanne, nancho-reul gajigo.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "ja": {
        "s": "私は山から来た、蘭の草を持って。",
        "r": "Watashi wa yama kara kita, ran no kusa o motte.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "si": {
        "s": "මම කන්දෙන් ආවා, ඕකිඩ් පැළෑටි අරගෙන.",
        "r": "Mama kanden ava, okid palati aran.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      "fa": {
        "s": "من از کوهستان آمده‌ام، با گیاه ارکیده.",
        "r": "Man az kouhestân âmade-am, bâ giyâh-e orkide.",
        "e": "從山中來＝從山裡來；蘭花草＝蘭花。"
      }
    },
    {
      "hi": {
        "s": "छोटे बगीचे में लगाओ, फूल जल्दी खिलने की आशा में।",
        "r": "Chhote bageeche mein lagao, phool jaldi khilne ki aasha mein.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "en": {
        "s": "Plant it in the small garden, hoping the flowers bloom early.",
        "r": "",
        "e": "種 means 'to plant'; 希望花開早 expresses the wish for early blooming."
      },
      "ta": {
        "s": "சிறு தோட்டத்தில் நட்டேன், பூ சீக்கிரம் மலரும் என்று நம்பி.",
        "r": "ciṟu tōṭṭattil naṭṭēṉ, pū cīkkiram malarum eṉṟu nampi.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "th": {
        "s": "ปลูกไว้ในสวนเล็กๆ หวังว่าดอกจะบานเร็ว",
        "r": "pluk wai nai suan lek lek wang wa dok cha ban reo",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "km": {
        "s": "ដាំក្នុងសួនតូច សង្ឃឹមថាផ្កានឹងរីកឆាប់ៗ",
        "r": "dam knoŋ suən touc sɑngkʰɨm tʰaa pʰkaa nɨng riik cʰap cʰap",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "vi": {
        "s": "Trồng trong vườn nhỏ, mong hoa nở sớm.",
        "r": "",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "id": {
        "s": "Tanam di kebun kecil, berharap bunga cepat mekar.",
        "r": "",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "ne": {
        "s": "सानो बगैँचामा रोपेँ, फूल चाँडै फुल्ने आशामा।",
        "r": "sāno bagaĩcāmā ropẽ, phūl cā̃ḍai phulne āśāmā.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "bn": {
        "s": "ছোট বাগানে লাগালাম, ফুল তাড়াতাড়ি ফুটবে এই আশায়।",
        "r": "choṭo bāgāne lāgālām, phul tāṛātāṛi phuṭbe ei āśāy.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "es": {
        "s": "Plántala en el pequeño jardín, esperando que florezca pronto.",
        "r": "",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "de": {
        "s": "Pflanze sie in den kleinen Garten, in der Hoffnung auf frühe Blüte.",
        "r": "",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "my": {
        "s": "ဥယျာဉ်ငယ်ထဲ စိုက်၊ ပန်းစောစောပွင့်ဖို့ မျှော်လင့်။",
        "r": "U-yin-nge hte sait, pan saw-saw pwint-pho myaw-lint.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "ko": {
        "s": "작은 뜰에 심고, 꽃이 일찍 피기를 바라네.",
        "r": "Jageun tteure simgo, kkochi iljjik pigireul barane.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "ja": {
        "s": "小さな庭に植え、花が早く咲くことを願う。",
        "r": "Chiisana niwa ni ue, hana ga hayaku saku koto o negau.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "si": {
        "s": "පුංචි වත්තේ සිටුවා, මල් ඉක්මනින් පිපේවායි ප්‍රාර්ථනා කරමි.",
        "r": "Punchi vatte situva, mal ikmanin pipevai prarthana karami.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      },
      "fa": {
        "s": "در باغچه کوچک بکار، به امید آنکه گل زود بشکفد.",
        "r": "Dar bâqche-ye kouchak bekâr, be omid-e ânke gol zoud beshekafad.",
        "e": "種＝種植；希望花開早＝盼望花早點開。"
      }
    },
    {
      "hi": {
        "s": "दिन में तीन बार देखो, फूलों का मौसम बीत जाने तक।",
        "r": "Din mein teen baar dekho, phoolon ka mausam beet jaane tak.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "en": {
        "s": "I look at it three times a day, until the flowering season has passed.",
        "r": "",
        "e": "一日看三回 means 'look three times a day'; 看得花時過 means 'watch until blooming time passes'."
      },
      "ta": {
        "s": "நாள்தோறும் மூன்று முறை பார்த்தேன், பூக்கும் காலம் கடந்து போகும்வரை.",
        "r": "nāḷtōṟum mūṉṟu muṟai pārttēṉ, pūkkum kālam kaṭantu pōkumvarai.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "th": {
        "s": "วันหนึ่งดูสามครั้ง ดูจนพ้นฤดูดอกไม้บาน",
        "r": "wan nueng du sam khrang du chon phon rue du dok mai ban",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "km": {
        "s": "មួយថ្ងៃមើលបីដង មើលរហូតផុតរដូវផ្ការីក",
        "r": "muəy tʰŋay məəl bəy dɑng məəl rɔhoot pʰut rədow pʰkaa riik",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "vi": {
        "s": "Mỗi ngày ngắm ba lần, ngắm đến khi mùa hoa qua đi.",
        "r": "",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "id": {
        "s": "Sehari kulihat tiga kali, hingga musim bunga berlalu.",
        "r": "",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "ne": {
        "s": "दिनमा तीनपटक हेरेँ, फूल फुल्ने बेला बितुन्जेल।",
        "r": "dinamā tīnapṭak herẽ, phūl phulne belā bitunjel.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "bn": {
        "s": "দিনে তিনবার দেখি, ফুলের মৌসুম পেরিয়ে যাওয়া পর্যন্ত।",
        "r": "dine tinbār dekhi, phuler moushum periye yāoyā paryanta.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "es": {
        "s": "La miro tres veces al día, hasta que pasa la época de floración.",
        "r": "",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "de": {
        "s": "Ich schaue dreimal am Tag nach ihr, bis die Blütezeit vorbei ist.",
        "r": "",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "my": {
        "s": "တစ်နေ့ သုံးကြိမ် ကြည့်တယ်၊ ပန်းပွင့်ချိန် ကုန်သွားတဲ့အထိ။",
        "r": "Ta-ne thone-kyein kyi-te, pan-pwint-cheit kohn-thwa-de a-hti.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "ko": {
        "s": "하루에 세 번 들여다보며, 꽃 피는 시절이 지나가네.",
        "r": "Harue se beon deuryeodabomyeo, kkot pineun sijeori jinagane.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "ja": {
        "s": "一日に三度見て、花の時が過ぎるのを見た。",
        "r": "Ichinichi ni sando mite, hana no toki ga sugiru no o mita.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "si": {
        "s": "දිනකට තුන් වරක් බලමි, මල් කාලය ගෙවී යන තුරු.",
        "r": "Dinakata tun varak balami, mal kalaya gevi yana turu.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      "fa": {
        "s": "روزی سه بار نگاهش می‌کنم، تا زمان گلدهی بگذرد.",
        "r": "Rouzi se bâr negâhash mikonam, tâ zamân-e goldehi bogzarad.",
        "e": "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      }
    },
    {
      "hi": {
        "s": "पर ऑर्किड में अब भी एक भी कली नहीं?",
        "r": "Par orchid mein ab bhi ek bhi kali nahin?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "en": {
        "s": "But the orchid still has not a single bud?",
        "r": "",
        "e": "卻依然 means 'still'; 苞 means 'flower bud'; 無一個 means 'not even one'."
      },
      "ta": {
        "s": "ஆனால் ஆர்க்கிட் அப்படியே இருக்கிறது, ஒரு மொட்டுகூட இல்லையா?",
        "r": "āṉāl ārkkiṭ appaṭiyē irukkiṟatu, oru moṭṭukūṭa illaiyā?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "th": {
        "s": "แต่กล้วยไม้ก็ยังเหมือนเดิม ไม่มีแม้แต่ตาดอกเดียว?",
        "r": "tae kluai mai ko yang muean doem mai mi mae tae ta dok diao?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "km": {
        "s": "តែអ័រគីដេនៅដដែល គ្មានសូម្បីតែមួយផ្កា?",
        "r": "tae ɑɑkiidee nɨw dɑdael kmien sowpieŋ tae muəy pʰkaa?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "vi": {
        "s": "Nhưng cây lan vẫn y nguyên, chẳng có lấy một nụ?",
        "r": "",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "id": {
        "s": "Tapi anggrek tetap begitu, tak ada satu kuntum pun?",
        "r": "",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "ne": {
        "s": "तर अर्किड उस्तै छ, एउटा कोपिला पनि छैन?",
        "r": "tara arkiḍ ustai chha, euṭā kopilā pani chhaina?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "bn": {
        "s": "কিন্তু অর্কিড তেমনই আছে, একটিও কুঁড়ি নেই?",
        "r": "kintu orkiḍ temni āche, ekṭio kũṛi nei?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "es": {
        "s": "Pero la orquídea sigue sin tener ni un solo capullo.",
        "r": "",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "de": {
        "s": "Doch die Orchidee hat immer noch keine einzige Knospe?",
        "r": "",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "my": {
        "s": "ဒါပေမယ့် သစ်ခွမှာ အဖူးတစ်ဖူးမှ မရှိသေးဘူးလား?",
        "r": "Da-pe-me thit-khwa hma a-phu ta-phu-hma ma-shi-the-bu-la?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "ko": {
        "s": "그런데 난초는 여전히, 꽃봉오리 하나 없구나?",
        "r": "Geureonde nancho-neun yeojeonhi, kkotbongori hana eopguna?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "ja": {
        "s": "しかし蘭は依然として、つぼみ一つもないのか？",
        "r": "Shikashi ran wa izentoshite, tsubomi hitotsu mo nai no ka?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "si": {
        "s": "නමුත් ඕකිඩ් තවමත්, මල් පොහොට්ටුවක්වත් නැද්ද?",
        "r": "Namut okid tavamat, mal pohotuvakvat nadda?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      "fa": {
        "s": "اما ارکیده هنوز حتی یک غنچه هم ندارد؟",
        "r": "Ammâ orkide hanouz hattâ yek qonche ham nadârad?",
        "e": "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      }
    },
    {
      "hi": {
        "s": "पलक झपकते ही शरद ऋतु आ गई, ऑर्किड को गरम कमरे में ले जाओ।",
        "r": "Palak jhapakte hi sharad ritu aa gayi, orchid ko garam kamre mein le jao.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "en": {
        "s": "In the blink of an eye autumn arrives; move the orchid into the warm room.",
        "r": "",
        "e": "轉眼 means 'in a blink'; 移蘭入暖房 means 'move the orchid into a warm room'."
      },
      "ta": {
        "s": "கண் இமைக்கும் நேரத்தில் இலையுதிர் காலம் வந்தது, ஆர்க்கிட்டை வெதுவெதுப்பான அறைக்கு மாற்றினேன்.",
        "r": "kaṇ imaikkum nērattil ilaiyutir kālam vantatu, ārkkiṭṭai vetuvetuppāṉa aṟaikku māṟṟiṉēṉ.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "th": {
        "s": "พริบตาเดียวฤดูใบไม้ร่วงก็มาถึง ย้ายกล้วยไม้เข้าห้องอุ่น",
        "r": "phrip ta diao rue du bai mai ruang ko ma thueng yai kluai mai khao hong un",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "km": {
        "s": "បើកភ្នែកបិទភ្នែករដូវស្លឹកឈើជ្រុះមកដល់ ផ្លាស់អ័រគីដេចូលបន្ទប់ក្តៅ",
        "r": "bəək pʰneek bət pʰneek rədow slɨk cʰəə crʊh mɔɔk dɑl pʰlas ɑɑkiidee coul bɑntup kdaw",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "vi": {
        "s": "Chớp mắt đã sang thu, chuyển lan vào phòng ấm.",
        "r": "",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "id": {
        "s": "Dalam sekejap musim gugur tiba, pindahkan anggrek ke ruangan hangat.",
        "r": "",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "ne": {
        "s": "आँख झिमिक्क गर्दा शरद ऋतु आयो, अर्किडलाई न्यानो कोठामा सारेँ।",
        "r": "ā̃kha jhimikka gardā śarad ritu āyo, arkiḍlāī nyāno koṭhāmā sārẽ.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "bn": {
        "s": "চোখের পলকে শরৎ এলো, অর্কিড সরিয়ে নিলাম উষ্ণ ঘরে।",
        "r": "chokher palke śarat elo, orkiḍ śoriye nilām uṣṇo ghare.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "es": {
        "s": "En un abrir y cerrar de ojos llega el otoño; traslada la orquídea al invernadero.",
        "r": "",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "de": {
        "s": "Im Handumdrehen kommt der Herbst; bring die Orchidee ins warme Zimmer.",
        "r": "",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "my": {
        "s": "မျက်စိတစ်မှိတ်အတွင်း ဆောင်းဦးရောက်လာ၊ သစ်ခွကို နွေးတဲ့အခန်းထဲ ရွှေ့။",
        "r": "Myet-si ta-hmeit a-twin saung-u yaut-la, thit-khwa ko nwe-de a-khan-hte shwe.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "ko": {
        "s": "눈 깜짝할 새 가을이 오고, 난초를 따뜻한 방으로 옮기네.",
        "r": "Nun kkamjjakhal sae gaeuri ogo, nancho-reul ttatteutan bang-euro omgine.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "ja": {
        "s": "瞬く間に秋が来て、蘭を暖かい部屋に移す。",
        "r": "Matataku ma ni aki ga kite, ran o atatakai heya ni utsusu.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "si": {
        "s": "ඇසිපිය හෙළන සැණින් සරත් සමය එයි; ඕකිඩ් උණුසුම් කාමරයට ගෙන යන්න.",
        "r": "Asipiya helana sanin sarat samaya ei; okid unusum kamarayata gena yanna.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      "fa": {
        "s": "در یک چشم به هم زدن پاییز می‌رسد؛ ارکیده را به اتاق گرم منتقل کن.",
        "r": "Dar yek cheshm be ham zadan pâyiz mi-resad; orkide râ be otâq-e garm montaquel kon.",
        "e": "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      }
    },
    {
      "hi": {
        "s": "हर सुबह स्नेह से देखभाल करो, हर रात कभी न भूलो।",
        "r": "Har subah sneh se dekhbhaal karo, har raat kabhi na bhoolo.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "en": {
        "s": "Morning after morning I care for it tenderly; night after night I never forget.",
        "r": "",
        "e": "朝朝 means 'every morning'; 顧惜 means 'to cherish'; 夜夜不相忘 means 'never forget, night after night'."
      },
      "ta": {
        "s": "காலைதோறும் அன்புடன் பேணினேன், இரவுதோறும் மறக்கவில்லை.",
        "r": "kālaitōṟum aṉpuṭaṉ pēṇiṉēṉ, iravutōṟum maṟakkavillai.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "th": {
        "s": "ทุกเช้าเฝ้าดูแลด้วยความรัก ทุกคืนไม่เคยลืม",
        "r": "thuk chao fao du lae duai khwam rak thuk khuen mai khoei luem",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "km": {
        "s": "ព្រឹកៗមើលថែដោយក្តីស្រឡាញ់ យប់ៗមិនភ្លេចឡើយ",
        "r": "prɨk prɨk məəl tʰae daoy kdəy srɑlaɲ yop yop mɨn pʰleec laəy",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "vi": {
        "s": "Sớm sớm chăm sóc thương yêu, đêm đêm chẳng quên.",
        "r": "",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "id": {
        "s": "Setiap pagi kurawat dengan kasih, setiap malam tak kulupa.",
        "r": "",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "ne": {
        "s": "बिहानबिहान मायाले स्याहारेँ, रातरात कहिल्यै नबिर्सेँ।",
        "r": "bihānabihāna māyāle syāhārẽ, rātarāta kahilyai nabirsẽ.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "bn": {
        "s": "প্রতিটি সকালে স্নেহে যত্ন নিলাম, প্রতি রাতে কখনো ভুলিনি।",
        "r": "proṭiṭi śokāle snehe yatno nilām, proti rāte kakhano bhulini.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "es": {
        "s": "Mañana tras mañana la cuido con ternura; noche tras noche nunca la olvido.",
        "r": "",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "de": {
        "s": "Morgen für Morgen pflege ich sie liebevoll; Nacht für Nacht vergesse ich sie nie.",
        "r": "",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "my": {
        "s": "မနက်တိုင်း ဂရုတစိုက် ပြုစု၊ ညတိုင်း ဘယ်တော့မှ မမေ့။",
        "r": "Ma-net-taing ga-ru-ta-sait pyu-su, nya-taing be-daw-hma ma-me.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "ko": {
        "s": "아침마다 정성껏 돌보고, 밤마다 잊지 않네.",
        "r": "Achim-mada jeongseongkkeot dolbogo, bam-mada itji anne.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "ja": {
        "s": "朝な朝な慈しみ育て、夜な夜な忘れない。",
        "r": "Asa na asa na itsukushimi-sodate, yoru na yoru na wasurenai.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "si": {
        "s": "උදෑසනින් උදෑසන ආදරයෙන් රැකබලා ගනිමි; රාත්‍රියෙන් රාත්‍රිය කිසිදා අමතක නොකරමි.",
        "r": "Udasenin udasena adarayen rakabala ganimi; ratriyen ratriya kisida amatka nokarami.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      "fa": {
        "s": "هر صبح با مهر از آن نگهداری می‌کنم؛ هر شب هرگز فراموشش نمی‌کنم.",
        "r": "Har sobh bâ mehr az ân negahdâri mikonam; har shab hargez farâmoushash nemikonam.",
        "e": "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      }
    },
    {
      "hi": {
        "s": "वसंत में फूल खिलने की प्रतीक्षा में, पुरानी इच्छा पूरी हो सके।",
        "r": "Vasant mein phool khilne ki prateeksha mein, puraani ichchha poori ho sake.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "en": {
        "s": "Awaiting the spring blossoms, hoping my long-cherished wish will come true.",
        "r": "",
        "e": "期待 means 'to await'; 宿願 is a 'long-held wish'; 償 means 'to fulfill'."
      },
      "ta": {
        "s": "வசந்தத்தில் பூ மலரும் என்று எதிர்பார்த்து, நீண்ட நாள் ஆசை நிறைவேறும்.",
        "r": "vacantattil pū malarum eṉṟu etirpārttu, nīṇṭa nāḷ ācai niṟaivēṟum.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "th": {
        "s": "รอคอยดอกไม้บานในฤดูใบไม้ผลิ หวังให้ความปรารถนาเก่าแก่สมหวัง",
        "r": "ro khoi dok mai ban nai rue du bai mai phli wang hai khwam pratthana kao kae som wang",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "km": {
        "s": "រង់ចាំផ្ការីកនៅរដូវផ្ការីក សង្ឃឹមថាបំណងចាស់នឹងបានសម្រេច",
        "r": "rɔŋcam pʰkaa riik nɨw rədow pʰkaa riik sɑngkʰɨm tʰaa bɑmnɑng caah nɨng baan sɑmrec",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "vi": {
        "s": "Mong chờ hoa xuân nở, nguyện ước xưa được thành.",
        "r": "",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "id": {
        "s": "Menanti bunga musim semi mekar, semoga keinginan lama terkabul.",
        "r": "",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "ne": {
        "s": "वसन्तमा फूल फुल्ने प्रतीक्षामा, पुरानो इच्छा पूरा होस्।",
        "r": "vasantamā phūl phulne pratīkṣāmā, purāno ichchhā pūrā hos.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "bn": {
        "s": "বসন্তে ফুল ফোটার অপেক্ষায়, পুরনো ইচ্ছা পূর্ণ হোক।",
        "r": "basante phul phoṭār apekṣāy, purono icchā pūrṇo hok.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "es": {
        "s": "Espero las flores de primavera, ojalá se cumpla mi antiguo deseo.",
        "r": "",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "de": {
        "s": "Ich erwarte die Frühlingsblüte, möge mein langgehegter Wunsch in Erfüllung gehen.",
        "r": "",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "my": {
        "s": "နွေဦးပန်းပွင့်ဖို့ မျှော်လင့်၊ ကြာမြင့်တဲ့ဆန္ဒ ပြည့်ဝပါစေ။",
        "r": "Nwe-u pan-pwint-pho myaw-lint, kya-myint-de sa-nda pyi-wa-pa-se.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "ko": {
        "s": "봄꽃 피기를 기다리며, 오랜 소원이 이루어지기를.",
        "r": "Bomkkot pigireul gidarimyeo, oraen sowoni irueojigireul.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "ja": {
        "s": "春の花開くのを待ち、長年の願いが叶いますように。",
        "r": "Haru no hana hiraku no o machi, naganen no negai ga kanaimasu yō ni.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "si": {
        "s": "වසන්ත මල් පිපෙනු බලාපොරොත්තු වෙමි; දිගුකාලීන පැතුම ඉටුවේවා.",
        "r": "Vasant mal pipenu balaporottu vemi; digukalina patuma ituveva.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      "fa": {
        "s": "در انتظار شکفتن گل‌های بهاری، باشد که آرزوی دیرینه‌ام برآورده شود.",
        "r": "Dar entezâr-e shekaftan-e gol-hâ-ye bahâri, bâshad ke ârezu-ye dirine-am barâvarde shavad.",
        "e": "期待＝盼望；宿願＝長久的心願；償＝實現。"
      }
    },
    {
      "hi": {
        "s": "आँगन फूलों के गुच्छों से भरा है, बहुत सुगंध फैली है।",
        "r": "Aangan phoolon ke guchchhon se bhara hai, bahut sugandh phaili hai.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "en": {
        "s": "The courtyard is full of clustered blossoms, blooming so fragrant.",
        "r": "",
        "e": "滿庭 means 'the whole courtyard'; 簇簇 describes flowers in clusters; 香 means 'fragrant'."
      },
      "ta": {
        "s": "முற்றம் முழுவதும் பூங்கொத்துகள் நிறைந்து, மிகவும் மணமாய் மலர்ந்தன.",
        "r": "muṟṟam muḻuvatum pūṅkottukaḷ niṟaintu, mikavum maṇamāy malarntaṉa.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "th": {
        "s": "ทั่วทั้งลานเต็มไปด้วยช่อดอกไม้ บานสะพรั่งส่งกลิ่นหอมมาก",
        "r": "thua thang lan tem pai duai cho dok mai ban saphrang song klin hom mak",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "km": {
        "s": "ពេញទីធ្លាពោរពេញដោយចង្កោមផ្កា រីកយ៉ាងក្រអូប",
        "r": "peɲ tii tʰlea poo peɲ daoy cɑngkoom pʰkaa riik yɨəng krɑʔoop",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "vi": {
        "s": "Đầy sân hoa từng chùm, nở thơm ngát.",
        "r": "",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "id": {
        "s": "Seluruh halaman penuh rangkaian bunga, mekar sangat harum.",
        "r": "",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "ne": {
        "s": "आँगनभरि फूलका गुच्छाहरू, साह्रै बास्नादार फुले।",
        "r": "ā̃ganbhari phūlakā guchchhāharū, sāhrai bāsnādāra phule.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "bn": {
        "s": "উঠোন ভরে ফুলের থোকা, খুব সুগন্ধে ফুটেছে।",
        "r": "uṭhon bhare phuler thokā, khub sugandhe phuṭeche.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "es": {
        "s": "El patio está lleno de flores en racimos, qué fragancia tan intensa.",
        "r": "",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "de": {
        "s": "Der ganze Hof ist voller Blütenbüschel, so herrlich duftend.",
        "r": "",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "my": {
        "s": "ဝင်းတစ်ခုလုံး ပန်းအုပ်အုပ်တွေ ပြည့်နေ၊ အရမ်းမွှေး။",
        "r": "Win ta-khu-lon pan-out-out-dwe pyi-ne, a-yan hmwe.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "ko": {
        "s": "뜰 가득 꽃이 다닥다닥, 향기가 그윽하구나.",
        "r": "Tteul gadeuk kkochi dadak-dadak, hyanggiga geugeukhaguna.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "ja": {
        "s": "庭いっぱいに花がむらむらと、なんともよい香り。",
        "r": "Niwa ippai ni hana ga muramura to, nantomo yoi kaori.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "si": {
        "s": "මිදුල පුරා මල් පොකුරු පිරී ඇත, මොනතරම් සුවඳද.",
        "r": "Midula pura mal pokuru piri ata, monataram suvandada.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      "fa": {
        "s": "حیاط پر از خوشه‌های گل است، چه عطر دل‌انگیزی.",
        "r": "Hayât por az xoushe-hâ-ye gol ast, che atr-e del-angizí.",
        "e": "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      }
    }
  ],
  "talang": [
    {
      "hi": {
        "s": "छोटा-सा बादल धीरे-धीरे चला आया।",
        "r": "Chhota-sa baadal dheere-dheere chala aaya.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "en": {
        "s": "A tiny little cloud slowly drifts over.",
        "r": "",
        "e": "小小的 means 'tiny'; 走過來 here describes the cloud drifting toward us."
      },
      "ta": {
        "s": "சிறு மேகம் மெதுவாய் மிதந்து வருகிறது.",
        "r": "ciṟu mēkam metuvāy mitantu varukiṟatu.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "th": {
        "s": "เมฆก้อนเล็กๆ ค่อยๆ ลอยมา",
        "r": "mek kon lek lek khoi khoi loi ma",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "km": {
        "s": "ពពកតូចមួយរសាត់មកយឺតៗ",
        "r": "pɔpɔɔk touc muəy rɔsat mɔɔk yɨɨt yɨɨt",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "vi": {
        "s": "Đám mây nho nhỏ, chầm chậm bay đến.",
        "r": "",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "id": {
        "s": "Awan kecil perlahan melayang datang.",
        "r": "",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "ne": {
        "s": "सानो बादलको टुक्रा बिस्तारै आयो।",
        "r": "sāno bādalko ṭukrā bistārai āyo.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "bn": {
        "s": "ছোট্ট এক টুকরো মেঘ ধীরে ধীরে ভেসে এলো।",
        "r": "choṭṭo ek ṭukro megh dhīre dhīre bheśe elo.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "es": {
        "s": "Una nubecita pequeña viene flotando despacio.",
        "r": "",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "de": {
        "s": "Ein winziges Wölkchen treibt langsam heran.",
        "r": "",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "my": {
        "s": "တိမ်တိုက်သေးသေးလေး ဖြည်းဖြည်းချင်း ရွေ့လာတယ်။",
        "r": "Tein-tite thay-thay-lay phye-phye-chin shwe-la-te.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "ko": {
        "s": "조그만 구름 한 조각이 살살 다가오네.",
        "r": "Jogeuman gureum han jogagi salsal dagaone.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "ja": {
        "s": "小さな雲ひとつが、ゆっくりと流れてくる。",
        "r": "Chiisana kumo hitotsu ga, yukkuri to nagarete-kuru.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "si": {
        "s": "පුංචි වලාකුළු කැබැල්ලක් හෙමිහිට පාවී එයි.",
        "r": "Punchi valakulu kaballak hemiheeta pavi ei.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      "fa": {
        "s": "تکه‌ابر کوچکی آرام آرام شناور می‌آید.",
        "r": "Tekke-abr-e kouchaki ârâm ârâm shenâvar mi-âyad.",
        "e": "小小的＝小小地；走過來是說雲慢慢飄過來。"
      }
    },
    {
      "hi": {
        "s": "कृपया थोड़ी देर पैर आराम करो, क्षण भर रुको।",
        "r": "Kripya thodi der pair aaraam karo, kshan bhar ruko.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "en": {
        "s": "Please rest your feet a while, stop for a moment.",
        "r": "",
        "e": "歇歇腳 means 'rest one's feet'; 暫時停下來 means 'pause for a while'."
      },
      "ta": {
        "s": "கொஞ்சம் கால்களுக்கு ஓய்வு கொடுங்கள், சற்று நில்லுங்கள்.",
        "r": "koñcam kālkaḷukku ōyvu koṭuṅkaḷ, caṟṟu nilluṅkaḷ.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "th": {
        "s": "ขอให้พักเท้าหน่อย หยุดสักครู่เถิด",
        "r": "kho hai phak thao noi yut sak khru thoet",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "km": {
        "s": "សូមសម្រាកជើងបន្តិច ឈប់មួយភ្លែតសិន",
        "r": "soom sɑmreak cəəng bɑntəc cʰup muəy pʰleet sən",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "vi": {
        "s": "Xin hãy nghỉ chân một lát, tạm dừng lại đã.",
        "r": "",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "id": {
        "s": "Istirahatkan kaki sejenak, berhentilah sebentar.",
        "r": "",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "ne": {
        "s": "कृपया खुट्टा केहीबेर आराम गर, एकछिन रोक।",
        "r": "kṛpayā khuṭṭā kehībera ārām gara, ekchhin roka.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "bn": {
        "s": "দয়া করে পা দুটো একটু জিরিয়ে নাও, ক্ষণিক থামো।",
        "r": "dayā kare pā duṭo ekṭu jiriye nāo, kṣoṇik thāmo.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "es": {
        "s": "Por favor, descansen los pies un rato, deténganse un momento.",
        "r": "",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "de": {
        "s": "Bitte ruht eure Füße ein wenig aus, haltet einen Moment inne.",
        "r": "",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "my": {
        "s": "ခြေထောက်တွေ ခဏနား၊ ခေတ္တရပ်လိုက်ပါ။",
        "r": "Chay-htauk-dwe kha-na na, khay-ta yat-lait-pa.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "ko": {
        "s": "발 좀 쉬었다 가세요, 잠시 멈추세요.",
        "r": "Bal jom swieotda gaseyo, jamsi meomchuseyo.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "ja": {
        "s": "どうぞ足を休めて、しばらく立ち止まって。",
        "r": "Dōzo ashi o yasumete, shibaraku tachidomatte.",
        "e": "どうぞ足を休めて、しばらく立ち止まって。"
      },
      "si": {
        "s": "කරුණාකර පාද ටිකක් විවේක ගන්න, මොහොතක් නවතින්න.",
        "r": "Karunakara pada tikak viveka ganna, mohotak navatinna.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      "fa": {
        "s": "لطفاً پاهایتان را کمی استراحت دهید، لحظه‌ای بایستید.",
        "r": "Lotfan pâhâyatân râ kami esterâhat dahid, lahze-i bâyistid.",
        "e": "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      }
    },
    {
      "hi": {
        "s": "पहाड़ पर पहाड़ी फूल खिले हैं, इसलिए मैं पहाड़ आया।",
        "r": "Pahaad par pahaadi phool khile hain, isliye main pahaad aaya.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "en": {
        "s": "The mountain flowers are blooming, that's why I came up the mountain.",
        "r": "",
        "e": "山花兒開 means 'mountain flowers bloom'; 才 here gives the reason for coming."
      },
      "ta": {
        "s": "மலையில் மலைப்பூக்கள் மலர்ந்துள்ளன, அதனால்தான் நான் மலைக்கு வந்தேன்.",
        "r": "malaiyil malaippūkkaḷ malarntuḷḷaṉa, ataṉāltāṉ nāṉ malaikku vantēṉ.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "th": {
        "s": "ดอกไม้บนภูเขากำลังบาน ฉันจึงขึ้นมาบนภูเขา",
        "r": "dok mai bon phu khao kamlang ban chan chueng khuen ma bon phu khao",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "km": {
        "s": "ផ្កាភ្នំកំពុងរីក ទើបខ្ញុំមកភ្នំ",
        "r": "pʰkaa pʰnom kɑmpuŋ riik tɨb kʰɲom mɔɔk pʰnom",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "vi": {
        "s": "Hoa trên núi đang nở, nên tôi mới lên núi.",
        "r": "",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "id": {
        "s": "Bunga gunung sedang mekar, makanya aku datang ke gunung.",
        "r": "",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "ne": {
        "s": "पहाडमा पहाडी फूल फुलेका छन्, त्यसैले म पहाड आएँ।",
        "r": "pahāḍmā pahāḍī phūl phulekā chhan, tyasaile ma pahāḍ āẽ.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "bn": {
        "s": "পাহাড়ে পাহাড়ি ফুল ফুটেছে, তাই আমি পাহাড়ে এলাম।",
        "r": "pāhāṛe pāhāṛi phul phuṭeche, tāi āmi pāhāṛe elām.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "es": {
        "s": "Las flores de la montaña están en flor, por eso subí a la montaña.",
        "r": "",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "de": {
        "s": "Die Bergblumen blühen, darum bin ich auf den Berg gekommen.",
        "r": "",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "my": {
        "s": "တောင်ပေါ်က တောင်ပန်းတွေ ပွင့်နေလို့၊ ကျွန်တော် တောင်ပေါ် တက်လာတာ။",
        "r": "Taung-paw ka taung-pan-dwe pwint-ne-lo, kyan-taw taung-paw tet-la-ta.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "ko": {
        "s": "산에 산꽃이 피었기에, 나는 산에 올라왔네.",
        "r": "Sane sankkochi pieotgie, naneun sane ollawanne.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "ja": {
        "s": "山に山の花が咲いたから、私は山に登ってきた。",
        "r": "Yama ni yama no hana ga saita kara, watashi wa yama ni nobotte-kita.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "si": {
        "s": "කන්දේ කඳු මල් පිපී ඇති නිසා, මම කන්දට ආවා.",
        "r": "Kande kandu mal pipi ati nisa, mama kandata ava.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      },
      "fa": {
        "s": "گل‌های کوهستان شکفته‌اند، به همین دلیل به کوه آمدم.",
        "r": "Gol-hâ-ye kouhestân shekafte-and, be hamin dalil be kouh âmadam.",
        "e": "山花兒開＝山花開了；才是表示來的原因。"
      }
    },
    {
      "hi": {
        "s": "अरे, तुम भी पहाड़ पर फूल खिलते देखने आए हो।",
        "r": "Are, tum bhi pahaad par phool khilte dekhne aaye ho.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "en": {
        "s": "So it turns out you also came up the mountain to see the flowers bloom.",
        "r": "",
        "e": "原來嘛 expresses pleasant surprise; 也是 means 'also'."
      },
      "ta": {
        "s": "ஓ, நீயும் மலைப்பூக்கள் மலர்வதைப் பார்க்க மலைக்கு வந்திருக்கிறாய்!",
        "r": "ō, nīyum malaippūkkaḷ malarvataip pārkka malaikku vantirukkiṟāy!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "th": {
        "s": "อ๋อ ที่แท้เธอก็ขึ้นภูเขามาดูดอกไม้บานเหมือนกัน",
        "r": "o thi thae thoe ko khuen phu khao ma du dok mai ban muean kan",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "km": {
        "s": "អូ តើអ្នកក៏មកភ្នំមើលផ្ការីកដែរ!",
        "r": "ʔoo taə neak kɑɑ mɔɔk pʰnom məəl pʰkaa riik dae!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "vi": {
        "s": "À, hóa ra bạn cũng lên núi ngắm hoa nở!",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "id": {
        "s": "Oh, ternyata kamu juga naik gunung melihat bunga mekar!",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "ne": {
        "s": "अहो, तिमी पनि पहाडी फूल फुलेको हेर्न पहाड आएका!",
        "r": "aho, timī pani pahāḍī phūl phuleko herna pahāḍ āekā!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "bn": {
        "s": "ওহো, তুমিও পাহাড়ি ফুল ফোটা দেখতে পাহাড়ে এসেছ!",
        "r": "oho, tumio pāhāṛi phul phoṭā dekhte pāhāṛe esecho!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "es": {
        "s": "Vaya, resulta que tú también subiste a ver florecer las montañas.",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "de": {
        "s": "Ach so, du bist also auch auf den Berg gekommen, um die Blüte zu sehen.",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "my": {
        "s": "သြော်၊ မင်းလည်း တောင်ပန်းပွင့်တာ ကြည့်ဖို့ တောင်တက်လာတာပဲ။",
        "r": "Aw, min le taung-pan pwint-ta kyi-pho taung-tet-la-ta-be.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "ko": {
        "s": "아, 너도 산꽃 피는 걸 보러 산에 올라왔구나.",
        "r": "A, neodo sankkot pineun geol boreo sane ollawanne.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "ja": {
        "s": "あら、あなたも山の花が咲くのを見に山に登ってきたのね。",
        "r": "Ara, anata mo yama no hana ga saku no o mi ni yama ni nobotte-kita no ne.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "si": {
        "s": "අනේ, ඔබත් කඳු මල් පිපෙනු බලන්න කන්දට ඇවිත්.",
        "r": "Ane, obat kandu mal pipenu balanna kandata avit.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      "fa": {
        "s": "آهان، پس تو هم برای دیدن شکفتن گل‌های کوه به کوه آمدی.",
        "r": "Âhân, pas tou ham barâ-ye didan-e shekaftan-e gol-hâ-ye kouh be kouh âmadi.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      }
    },
    {
      "hi": {
        "s": "हल्की-सी हवा धीरे-धीरे चली आई।",
        "r": "Halki-si hawa dheere-dheere chali aayi.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "en": {
        "s": "A gentle little breeze slowly drifts over.",
        "r": "",
        "e": "一陣風 is a gust of wind; 走過來 describes the breeze coming toward us."
      },
      "ta": {
        "s": "சிறு காற்று மெதுவாய் வீசி வருகிறது.",
        "r": "ciṟu kāṟṟu metuvāy vīci varukiṟatu.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "th": {
        "s": "ลมพัดเบาๆ ค่อยๆ พัดมา",
        "r": "lom phat bao bao khoi khoi phat ma",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "km": {
        "s": "ខ្យល់តិចៗបក់មកយឺតៗ",
        "r": "kʰyɑl təc təc bɑk mɔɔk yɨɨt yɨɨt",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "vi": {
        "s": "Cơn gió nho nhỏ, chầm chậm thổi đến.",
        "r": "",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "id": {
        "s": "Angin sepoi-sepoi perlahan berhembus datang.",
        "r": "",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "ne": {
        "s": "मसिनो हावाको झोक्का बिस्तारै आयो।",
        "r": "masino hāwāko jhokkā bistārai āyo.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "bn": {
        "s": "ছোট্ট এক ঝলক হাওয়া ধীরে ধীরে বয়ে এলো।",
        "r": "choṭṭo ek jhalak hāoyā dhīre dhīre baye elo.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "es": {
        "s": "Una brisa ligera viene flotando despacio.",
        "r": "",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "de": {
        "s": "Ein leichter Windhauch weht langsam heran.",
        "r": "",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "my": {
        "s": "လေညင်းသေးသေးလေး ဖြည်းဖြည်းချင်း တိုက်လာတယ်။",
        "r": "Le-nyin thay-thay-lay phye-phye-chin tite-la-te.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "ko": {
        "s": "살랑이는 작은 바람이 살살 불어오네.",
        "r": "Sallangineun jageun barami salsal bureone.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "ja": {
        "s": "小さな風ひとつが、ゆっくりと吹いてくる。",
        "r": "Chiisana kaze hitotsu ga, yukkuri to fuite-kuru.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "si": {
        "s": "පුංචි සුළං රැල්ලක් හෙමිහිට හමා එයි.",
        "r": "Punchi sulan rallak hemiheeta hama ei.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      "fa": {
        "s": "نسیم ملایمی آرام آرام می‌وزد و می‌آید.",
        "r": "Nasim-e molâyemi ârâm ârâm mi-vazad o mi-âyad.",
        "e": "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      }
    },
    {
      "hi": {
        "s": "समुद्र पर लहरों के फूल खिले हैं, इसलिए मैं समुद्र तट आया।",
        "r": "Samudra par laharon ke phool khile hain, isliye main samudra tat aaya.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "en": {
        "s": "The sea spray blooms like flowers, that's why I came to the seaside.",
        "r": "",
        "e": "浪花開 likens waves to blooming flowers; 才 gives the reason for coming to the sea."
      },
      "ta": {
        "s": "கடலில் அலைப்பூக்கள் மலர்கின்றன, அதனால்தான் நான் கடற்கரைக்கு வந்தேன்.",
        "r": "kaṭalil alaippūkkaḷ malarkiṉṟaṉa, ataṉāltāṉ nāṉ kaṭaṟkaraikku vantēṉ.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "th": {
        "s": "ฟองคลื่นในทะเลกำลังบาน ฉันจึงมาที่ชายทะเล",
        "r": "fong khluen nai thale kamlang ban chan chueng ma thi chai thale",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "km": {
        "s": "រលកសមុទ្រកំពុងរីកដូចផ្កា ទើបខ្ញុំមកមាត់សមុទ្រ",
        "r": "rɔlɔɔk sɑmot kɑmpuŋ riik douch pʰkaa tɨb kʰɲom mɔɔk meat sɑmot",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "vi": {
        "s": "Hoa sóng trên biển đang nở, nên tôi mới ra biển.",
        "r": "",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "id": {
        "s": "Bunga ombak di laut sedang mekar, makanya aku datang ke pantai.",
        "r": "",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "ne": {
        "s": "समुद्रमा छालका फूलहरू फुलिरहेका छन्, त्यसैले म समुद्र किनार आएँ।",
        "r": "samudramā chhālakā phūlharū phulirahekā chhan, tyasaile ma samudra kināra āẽ.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "bn": {
        "s": "সাগরে ঢেউয়ের ফুল ফুটছে, তাই আমি সাগরপাড়ে এলাম।",
        "r": "sāgare ḍheuer phul phuṭche, tāi āmi sāgarpāṛe elām.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "es": {
        "s": "La espuma del mar florece como flores, por eso vine a la orilla.",
        "r": "",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "de": {
        "s": "Die Gischt blüht wie Blumen, darum bin ich ans Meer gekommen.",
        "r": "",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "my": {
        "s": "ပင်လယ်လှိုင်းပန်းတွေ ပွင့်နေလို့၊ ကျွန်တော် ပင်လယ်ကမ်းခြေ လာတာ။",
        "r": "Pin-le hlaing-pan-dwe pwint-ne-lo, kyan-taw pin-le kan-chay la-ta.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "ko": {
        "s": "바다에 물꽃이 피었기에, 나는 바닷가에 왔네.",
        "r": "Badae mulkkochi pieotgie, naneun badatgae wanne.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "ja": {
        "s": "海に波の花が咲いたから、私は海辺に来た。",
        "r": "Umi ni nami no hana ga saita kara, watashi wa umibe ni kita.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "si": {
        "s": "මුහුදේ රළ මල් පිපී ඇති නිසා, මම වෙරළට ආවා.",
        "r": "Muhude rala mal pipi ati nisa, mama veralata ava.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      "fa": {
        "s": "کف دریا چون گل شکفته است، به همین دلیل به ساحل آمدم.",
        "r": "Kaf-e daryâ chon gol shekafte ast, be hamin dalil be sâhel âmadam.",
        "e": "浪花開是把浪花比作花開；才是表示來的原因。"
      }
    },
    {
      "hi": {
        "s": "अरे, तुम्हें भी लहरें पसंद हैं, इसलिए तुम समुद्र तट आए।",
        "r": "Are, tumhen bhi laharen pasand hain, isliye tum samudra tat aaye.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "en": {
        "s": "So it turns out you also love the sea spray, that's why you came to the seaside.",
        "r": "",
        "e": "原來嘛 expresses pleasant surprise; 愛浪花 means 'love the sea spray'."
      },
      "ta": {
        "s": "ஓ, நீயும் அலைகளை விரும்பி கடற்கரைக்கு வந்திருக்கிறாய்!",
        "r": "ō, nīyum alaikaḷai virumpi kaṭaṟkaraikku vantirukkiṟāy!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "th": {
        "s": "อ๋อ ที่แท้เธอก็ชอบฟองคลื่นจึงมาที่ชายทะเล",
        "r": "o thi thae thoe ko chop fong khluen chueng ma thi chai thale",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "km": {
        "s": "អូ តើអ្នកក៏ស្រឡាញ់រលកទើបមកមាត់សមុទ្រ!",
        "r": "ʔoo taə neak kɑɑ srɑlaɲ rɔlɔɔk tɨb mɔɔk meat sɑmot!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "vi": {
        "s": "À, hóa ra bạn cũng yêu hoa sóng nên mới ra biển!",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "id": {
        "s": "Oh, ternyata kamu juga suka ombak makanya datang ke pantai!",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "ne": {
        "s": "अहो, तिमीलाई पनि छाल मनपर्छ, त्यसैले समुद्र किनार आएका!",
        "r": "aho, timīlāī pani chhāl manaparchha, tyasaile samudra kināra āekā!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "bn": {
        "s": "ওহো, তুমিও ঢেউ ভালোবাসো, তাই সাগরপাড়ে এসেছ!",
        "r": "oho, tumio ḍheu bhālobāso, tāi sāgarpāṛe esecho!",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "es": {
        "s": "Vaya, resulta que a ti también te encanta la espuma, por eso viniste a la orilla.",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "de": {
        "s": "Ach so, du liebst also auch die Gischt, darum bist du ans Meer gekommen.",
        "r": "",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "my": {
        "s": "သြော်၊ မင်းလည်း လှိုင်းပန်းတွေ ချစ်လို့ ပင်လယ်ကမ်းခြေ လာတာပဲ။",
        "r": "Aw, min le hlaing-pan-dwe chit-lo pin-le kan-chay la-ta-be.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "ko": {
        "s": "아, 너도 물결을 사랑해서 바닷가에 왔구나.",
        "r": "A, neodo mulgyeoreul saranghaeseo badatgae wanne.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "ja": {
        "s": "あら、あなたも波の花が好きで海辺に来たのね。",
        "r": "Ara, anata mo nami no hana ga suki de umibe ni kita no ne.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "si": {
        "s": "අනේ, ඔබත් රළ මල් වලට ආදරෙයි, ඒ නිසයි වෙරළට ඇවිත් තියෙන්නේ.",
        "r": "Ane, obat rala mal valata adarei, e nisai veralata avit tiyenne.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      "fa": {
        "s": "آهان، پس تو هم کف دریا را دوست داری، به همین دلیل به ساحل آمدی.",
        "r": "Âhân, pas tou ham kaf-e daryâ râ doust dâri, be hamin dalil be sâhel âmadi.",
        "e": "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      }
    }
  ]
};
