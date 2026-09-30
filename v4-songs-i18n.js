/* V4 中文歌曲歌詞翻譯（AI 校對草稿，待老師審定）
   結構：V4_SONGS_I18N[songId][lineIdx][lang] = { s: 譯句, r: 羅馬拼音, e: 解說 }
   16 語全齊：hi/ta/th/km/vi/id/ne/bn/es/en/de/my/ko/ja/si/fa
   舊 3 首（buyuge/lanhuacao/talang）原樣保留；新增 12 首（83 句）2026-09-29 */
const V4_SONGS_I18N = {
  buyuge: [
    {
      hi: {
        s: "सफ़ेद लहरें उछलती हैं, मैं नहीं डरता।",
        r: "Safed lahrein uchalti hain, main nahin darta.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      en: {
        s: "White waves surge and roll, I am not afraid.",
        r: "",
        e: "滔滔 describes waves surging; 不怕 means 'not afraid'."
      },
      ta: {
        s: "வெள்ளை அலைகள் பொங்கி எழுகின்றன, நான் அஞ்சவில்லை.",
        r: "veḷḷai alaikaḷ poṅki eḻukiṉṟaṉa, nāṉ añcavillai.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      th: {
        s: "คลื่นขาวโหมกระหน่ำ ฉันไม่กลัว",
        r: "khluen khao hom kratham chan mai klua",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      km: {
        s: "រលកសកំពុងបោកបក់ ខ្ញុំមិនខ្លាចទេ",
        r: "rɔlɔɔk sɑ kɑmpuŋ baokbɑk kʰɲom mɨn kʰlaac te",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      vi: {
        s: "Sóng trắng cuồn cuộn dâng cao, tôi chẳng sợ.",
        r: "",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      id: {
        s: "Ombak putih bergulung-gulung, aku tidak takut.",
        r: "",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      ne: {
        s: "सेता छालहरू उर्लिरहेका छन्, म डराउँदिनँ।",
        r: "setā chhālharū urlirahekā chhan, ma ḍarāũdinã.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      bn: {
        s: "সাদা ঢেউ ফুঁসে উঠছে, আমি ভয় পাই না।",
        r: "sādā ḍheu phũse uṭhche, āmi bhoy pāi nā.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      es: {
        s: "Las olas blancas rugen, no tengo miedo.",
        r: "",
        e: "滔滔形容波浪翻滾的樣子；不怕＝不害怕。"
      },
      de: {
        s: "Die weißen Wellen toben, ich habe keine Angst.",
        r: "",
        e: "滔滔形容波浪翻滾的樣子；不怕＝不害怕。"
      },
      my: {
        s: "လှိုင်းဖြူများ ကြီးမားစွာ လိမ့်နေတယ်၊ ကျွန်တော် မကြောက်ဘူး။",
        r: "Hlaing-phyu mya gyi-ma-zwa leik-ne-te, kyan-taw ma-kyauk-bu.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      ko: {
        s: "흰 물결이 거세게 밀려와도, 나는 무섭지 않아.",
        r: "Huin mulgyeori geosage millyeowado, naneun museopji ana.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      ja: {
        s: "白波が高くうねっても、私は怖くない。",
        r: "Shironami ga takaku unettemo, watashi wa kowakunai.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      si: {
        s: "සුදු රළ විශාල ලෙස නැග එයි, මම බය නැහැ.",
        r: "Sudu rala vishala lesa naga ei, mama baya naha.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      },
      fa: {
        s: "امواج سفید خروشان می‌غلتند، من نمی‌ترسم.",
        r: "Amvâj-e sefid-e xurushân mi-qaltand, man nemi-tarsam.",
        e: "滔滔是波浪翻滾的樣子；不怕＝不害怕。"
      }
    },
    {
      hi: {
        s: "पतवार सँभालकर आगे की ओर बढ़ो।",
        r: "Patvaar sambhaalkar aage ki or badho.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      en: {
        s: "Take the helm and row forward.",
        r: "",
        e: "掌起舵兒 means 'take hold of the rudder'; 往前划 means 'row forward'."
      },
      ta: {
        s: "சுக்கானைப் பிடித்து முன்னோக்கித் துடுப்புப் போடு.",
        r: "cukkāṉaip piṭittu muṉṉōkkit tuṭuppup pōṭu.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      th: {
        s: "จับหางเสือแล้วพายไปข้างหน้า",
        r: "chap hang suea laeo phai pai khang na",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      km: {
        s: "កាន់ចង្កូតហើយចែវទៅមុខ",
        r: "kan cɑngkuut haəy cɛɛv tɨw muk",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      vi: {
        s: "Nắm lấy bánh lái, chèo về phía trước.",
        r: "",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      id: {
        s: "Pegang kemudi dan dayung ke depan.",
        r: "",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      ne: {
        s: "पतवार समातेर अगाडि बढ।",
        r: "patwār samātera agāḍi baḍha.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      bn: {
        s: "হাল ধরো, সামনে বেয়ে চলো।",
        r: "hāl dharo, sāmne beye chalo.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      es: {
        s: "Toma el timón y rema hacia adelante.",
        r: "",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      de: {
        s: "Nimm das Ruder in die Hand und rudere vorwärts.",
        r: "",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      my: {
        s: "လှော်တက်ကို ကိုင်ပြီး ရှေ့ကို လှော်ခတ်။",
        r: "Hlaw-tet ko kaing-pi she-ko hlah-khat.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      ko: {
        s: "키를 잡고 앞으로 노를 저어라.",
        r: "Kireul japgo apeuro noreul jeoeora.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      ja: {
        s: "舵を取って、前へ漕ぎ進め。",
        r: "Kaji o totte, mae e kogi-susume.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      si: {
        s: "රුල් එක අල්ලාගෙන ඉදිරියට ඔරු පදින්න.",
        r: "Rul eka allagena idiriyata oru padinna.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      },
      fa: {
        s: "سکان را بگیر و به جلو پارو بزن.",
        r: "Sokkân râ begir o be jelou pârou bezan.",
        e: "掌起舵兒＝握住船舵；往前划＝向前划船。"
      }
    },
    {
      hi: {
        s: "जाल पानी में डालो, ऐ मछुआरो।",
        r: "Jaal paani mein daalo, ai machhuaaro.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      en: {
        s: "Cast the net into the water, oh fishermen.",
        r: "",
        e: "撒網 means 'cast the fishing net'; 漁家 means 'fishermen'."
      },
      ta: {
        s: "வலையை நீரில் வீசுங்கள், மீனவர்களே.",
        r: "valaiyai nīril vīcuṅkaḷ, mīṉavarkaḷē.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      th: {
        s: "ทอดแห่ลงน้ำเถิด ชาวประมงทั้งหลาย",
        r: "thot hae long nam thoet chao pramong thang lai",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      km: {
        s: "បោះសន្ទូចចូលទឹកទៅ ពួកអ្នកនេសាទអើយ",
        r: "bah sɑntouc coul tɨk tɨw puək neak neesaat aəy",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      vi: {
        s: "Quăng lưới xuống nước nào, hỡi các ngư dân.",
        r: "",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      id: {
        s: "Tebarkan jala ke dalam air, wahai para nelayan.",
        r: "",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      ne: {
        s: "जाल पानीमा फ्याँक, हे मछुवाहरू।",
        r: "jāl pānīmā phyā̃ka, he machhuwāharū.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      bn: {
        s: "জাল জলে ফেলো, হে জেলেরা।",
        r: "jāl jale phelo, he jelera.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      es: {
        s: "Echad la red al agua, pescadores.",
        r: "",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      de: {
        s: "Werft das Netz ins Wasser, ihr Fischer.",
        r: "",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      my: {
        s: "ကွန်ကို ရေထဲ ပစ်ချ၊ ငါးဖမ်းသမားတို့။",
        r: "Kun ko ye-hte pyit-cha, nga-phan-tha-ma do.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      ko: {
        s: "그물을 물에 던져라, 어부들이여.",
        r: "Geumureul mure deonjyeora, eobudeuriyeo.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      ja: {
        s: "網を水に投げ入れろ、漁師たちよ。",
        r: "Ami o mizu ni nage-irero, ryōshi-tachiyo.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      si: {
        s: "දැල වතුරට දමන්න, ධීවරයනි.",
        r: "Dala vaturata damanna, dhivarayani.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      },
      fa: {
        s: "تور را به آب بینداز، ای ماهیگیران.",
        r: "Tour râ be âb biyandâz, ey mâhigirân.",
        e: "撒網＝撒下漁網；漁家＝漁民。"
      }
    },
    {
      hi: {
        s: "बड़ी मछली पकड़कर ज़ोर से हँसो।",
        r: "Badi machhli pakadkar zor se hanso.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      en: {
        s: "Catch a big fish and laugh heartily.",
        r: "",
        e: "捕 means 'to catch'; 笑哈哈 is the sound of hearty laughter."
      },
      ta: {
        s: "பெரிய மீனைப் பிடித்து மகிழ்ச்சியாய்ச் சிரி.",
        r: "periya mīṉaip piṭittu makiḻcciyāyc ciri.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      th: {
        s: "จับปลาตัวใหญ่ได้แล้วหัวเราะอย่างมีความสุข",
        r: "chap pla tua yai dai laeo hua ro yang mi khwam suk",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      km: {
        s: "ចាប់បានត្រីធំហើយសើចយ៉ាងសប្បាយ",
        r: "cɑp baan trəy tʰom haəy səɨc yɨəng sɑbbaay",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      vi: {
        s: "Bắt được cá to, cười ha hả vui vẻ.",
        r: "",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      id: {
        s: "Tangkap ikan besar, tertawa riang.",
        r: "",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      ne: {
        s: "ठूलो माछा समातेर रमाइलो गरी हाँस।",
        r: "ṭhūlo māchhā samātera ramāilo garī hā̃sa.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      bn: {
        s: "বড় মাছ ধরে আনন্দে হাসো।",
        r: "baṛo māch dhore ānande hãso.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      es: {
        s: "Atrapa un pez grande y ríe a carcajadas.",
        r: "",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      de: {
        s: "Fange einen großen Fisch und lache herzlich.",
        r: "",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      my: {
        s: "ငါးကြီးတစ်ကောင် ဖမ်းပြီး ရယ်မောလိုက်။",
        r: "Nga-gyi ta-kaung phan-pi ye-maw-lait.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      ko: {
        s: "큰 물고기 한 마리 잡고 하하 웃어라.",
        r: "Keun mulgogi han mari japgo haha useora.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      ja: {
        s: "大きな魚を捕まえて、ハハと笑おう。",
        r: "Ōkina sakana o tsukamaete, haha to waraō.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      si: {
        s: "ලොකු මාළුවෙක් අල්ලා සිනාසෙන්න.",
        r: "Loku maluvek alla sinasenn.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      },
      fa: {
        s: "ماهی بزرگی بگیر و بلند بخند.",
        r: "Mâhi-ye bozorgi begir o boland bexand.",
        e: "捕＝捕捉；笑哈哈＝開懷大笑的聲音。"
      }
    },
    {
      hi: {
        s: "हैयो इयो इयो हेंग हैयो!",
        r: "Haiyo iyo iyo heng haiyo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      en: {
        s: "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        r: "",
        e: "A work chant with no literal meaning, sung while rowing."
      },
      ta: {
        s: "ஹாய்-யோ, யி-யோ, யி-யோ, ஹெங், ஹாய்-யோ!",
        r: "hāy-yō, yi-yō, yi-yō, heṅ, hāy-yō!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      th: {
        s: "ไฮโย ยีโย ยีโย เฮิง ไฮโย!",
        r: "hai yo yi yo yi yo heng hai yo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      km: {
        s: "ហៃយោ យីយោ យីយោ ហេង ហៃយោ!",
        r: "haiyo yiyo yiyo heng haiyo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      vi: {
        s: "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        r: "",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      id: {
        s: "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        r: "",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      ne: {
        s: "हैयो, यियो, यियो, हेङ, हैयो!",
        r: "haiyo, yiyo, yiyo, heṅ, haiyo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      bn: {
        s: "হাইয়ো, ইয়ো, ইয়ো, হেং, হাইয়ো!",
        r: "hāiyo, iyo, iyo, heṅ, hāiyo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      es: {
        s: "¡Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        r: "",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      de: {
        s: "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        r: "",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      my: {
        s: "ဟိုင်း-ယို၊ ရီ-ယို၊ ရီ-ယို၊ ဟင်း၊ ဟိုင်း-ယို!",
        r: "Haing-yo, yi-yo, yi-yo, hin, haing-yo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      ko: {
        s: "하이요, 이요, 이요, 헹, 하이요!",
        r: "Haiyo, iyo, iyo, heng, haiyo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      ja: {
        s: "ハイヨー、イーヨー、イーヨー、ヘン、ハイヨー！",
        r: "Haiyō, īyō, īyō, hen, haiyō!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      si: {
        s: "හයි-යෝ, යි-යෝ, යි-යෝ, හෙං, හයි-යෝ!",
        r: "Hai-yo, yi-yo, yi-yo, heng, hai-yo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      },
      fa: {
        s: "های-یو، یی-یو، یی-یو، هنگ، های-یو!",
        r: "Hây-yo, yi-yo, yi-yo, heng, hây-yo!",
        e: "這是勞動號子，沒有實際意思，是划船時喊的口號。"
      }
    }
  ],
  lanhuacao: [
    {
      hi: {
        s: "मैं पहाड़ों से आया हूँ, ऑर्किड घास साथ लाया हूँ।",
        r: "Main pahaadon se aaya hoon, orchid ghaas saath laaya hoon.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      en: {
        s: "I come from the mountains, bringing orchid plants with me.",
        r: "",
        e: "從山中來 means 'come from the mountains'; 蘭花草 is the orchid plant."
      },
      ta: {
        s: "நான் மலையிலிருந்து வந்தேன், ஆர்க்கிட் செடியைக் கொண்டு வந்தேன்.",
        r: "nāṉ malaiyiliruntu vantēṉ, ārkkiṭ ceṭiyaik koṇṭu vantēṉ.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      th: {
        s: "ฉันมาจากภูเขา นำต้นกล้วยไม้มาด้วย",
        r: "chan ma chak phu khao nam ton kluai mai ma duai",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      km: {
        s: "ខ្ញុំមកពីភ្នំ នាំយកដើមអ័រគីដេមកជាមួយ",
        r: "kʰɲom mɔɔk pii pʰnom nɔɔm yɔɔk dəəm ɑɑkiidee mɔɔk ciemuəy",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      vi: {
        s: "Tôi từ trong núi đến, mang theo cây lan.",
        r: "",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      id: {
        s: "Aku datang dari gunung, membawa tanaman anggrek.",
        r: "",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      ne: {
        s: "म पहाडबाट आएँ, अर्किडको बिरुवा ल्याएँ।",
        r: "ma pahāḍbāṭa āẽ, arkiḍko biruwā lyāẽ.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      bn: {
        s: "আমি পাহাড় থেকে এসেছি, অর্কিড গাছ নিয়ে এসেছি।",
        r: "āmi pāhāṛ theke esechi, orkiḍ gāch niye esechi.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      es: {
        s: "Vengo de las montañas, trayendo orquídeas conmigo.",
        r: "",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      de: {
        s: "Ich komme aus den Bergen und bringe Orchideen mit.",
        r: "",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      my: {
        s: "ကျွန်တော် တောင်တန်းတွေကနေ လာတယ်၊ သစ်ခွပင်တွေ ယူလာတယ်။",
        r: "Kyan-taw taung-tan-dwe ka-ne la-te, thit-khwa-pin-dwe yu-la-te.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      ko: {
        s: "나는 산에서 왔네, 난초를 가지고.",
        r: "Naneun saneseo wanne, nancho-reul gajigo.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      ja: {
        s: "私は山から来た、蘭の草を持って。",
        r: "Watashi wa yama kara kita, ran no kusa o motte.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      si: {
        s: "මම කන්දෙන් ආවා, ඕකිඩ් පැළෑටි අරගෙන.",
        r: "Mama kanden ava, okid palati aran.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      },
      fa: {
        s: "من از کوهستان آمده‌ام، با گیاه ارکیده.",
        r: "Man az kouhestân âmade-am, bâ giyâh-e orkide.",
        e: "從山中來＝從山裡來；蘭花草＝蘭花。"
      }
    },
    {
      hi: {
        s: "छोटे बगीचे में लगाओ, फूल जल्दी खिलने की आशा में।",
        r: "Chhote bageeche mein lagao, phool jaldi khilne ki aasha mein.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      en: {
        s: "Plant it in the small garden, hoping the flowers bloom early.",
        r: "",
        e: "種 means 'to plant'; 希望花開早 expresses the wish for early blooming."
      },
      ta: {
        s: "சிறு தோட்டத்தில் நட்டேன், பூ சீக்கிரம் மலரும் என்று நம்பி.",
        r: "ciṟu tōṭṭattil naṭṭēṉ, pū cīkkiram malarum eṉṟu nampi.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      th: {
        s: "ปลูกไว้ในสวนเล็กๆ หวังว่าดอกจะบานเร็ว",
        r: "pluk wai nai suan lek lek wang wa dok cha ban reo",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      km: {
        s: "ដាំក្នុងសួនតូច សង្ឃឹមថាផ្កានឹងរីកឆាប់ៗ",
        r: "dam knoŋ suən touc sɑngkʰɨm tʰaa pʰkaa nɨng riik cʰap cʰap",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      vi: {
        s: "Trồng trong vườn nhỏ, mong hoa nở sớm.",
        r: "",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      id: {
        s: "Tanam di kebun kecil, berharap bunga cepat mekar.",
        r: "",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      ne: {
        s: "सानो बगैँचामा रोपेँ, फूल चाँडै फुल्ने आशामा।",
        r: "sāno bagaĩcāmā ropẽ, phūl cā̃ḍai phulne āśāmā.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      bn: {
        s: "ছোট বাগানে লাগালাম, ফুল তাড়াতাড়ি ফুটবে এই আশায়।",
        r: "choṭo bāgāne lāgālām, phul tāṛātāṛi phuṭbe ei āśāy.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      es: {
        s: "Plántala en el pequeño jardín, esperando que florezca pronto.",
        r: "",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      de: {
        s: "Pflanze sie in den kleinen Garten, in der Hoffnung auf frühe Blüte.",
        r: "",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      my: {
        s: "ဥယျာဉ်ငယ်ထဲ စိုက်၊ ပန်းစောစောပွင့်ဖို့ မျှော်လင့်။",
        r: "U-yin-nge hte sait, pan saw-saw pwint-pho myaw-lint.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      ko: {
        s: "작은 뜰에 심고, 꽃이 일찍 피기를 바라네.",
        r: "Jageun tteure simgo, kkochi iljjik pigireul barane.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      ja: {
        s: "小さな庭に植え、花が早く咲くことを願う。",
        r: "Chiisana niwa ni ue, hana ga hayaku saku koto o negau.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      si: {
        s: "පුංචි වත්තේ සිටුවා, මල් ඉක්මනින් පිපේවායි ප්‍රාර්ථනා කරමි.",
        r: "Punchi vatte situva, mal ikmanin pipevai prarthana karami.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      },
      fa: {
        s: "در باغچه کوچک بکار، به امید آنکه گل زود بشکفد.",
        r: "Dar bâqche-ye kouchak bekâr, be omid-e ânke gol zoud beshekafad.",
        e: "種＝種植；希望花開早＝盼望花早點開。"
      }
    },
    {
      hi: {
        s: "दिन में तीन बार देखो, फूलों का मौसम बीत जाने तक।",
        r: "Din mein teen baar dekho, phoolon ka mausam beet jaane tak.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      en: {
        s: "I look at it three times a day, until the flowering season has passed.",
        r: "",
        e: "一日看三回 means 'look three times a day'; 看得花時過 means 'watch until blooming time passes'."
      },
      ta: {
        s: "நாள்தோறும் மூன்று முறை பார்த்தேன், பூக்கும் காலம் கடந்து போகும்வரை.",
        r: "nāḷtōṟum mūṉṟu muṟai pārttēṉ, pūkkum kālam kaṭantu pōkumvarai.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      th: {
        s: "วันหนึ่งดูสามครั้ง ดูจนพ้นฤดูดอกไม้บาน",
        r: "wan nueng du sam khrang du chon phon rue du dok mai ban",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      km: {
        s: "មួយថ្ងៃមើលបីដង មើលរហូតផុតរដូវផ្ការីក",
        r: "muəy tʰŋay məəl bəy dɑng məəl rɔhoot pʰut rədow pʰkaa riik",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      vi: {
        s: "Mỗi ngày ngắm ba lần, ngắm đến khi mùa hoa qua đi.",
        r: "",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      id: {
        s: "Sehari kulihat tiga kali, hingga musim bunga berlalu.",
        r: "",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      ne: {
        s: "दिनमा तीनपटक हेरेँ, फूल फुल्ने बेला बितुन्जेल।",
        r: "dinamā tīnapṭak herẽ, phūl phulne belā bitunjel.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      bn: {
        s: "দিনে তিনবার দেখি, ফুলের মৌসুম পেরিয়ে যাওয়া পর্যন্ত।",
        r: "dine tinbār dekhi, phuler moushum periye yāoyā paryanta.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      es: {
        s: "La miro tres veces al día, hasta que pasa la época de floración.",
        r: "",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      de: {
        s: "Ich schaue dreimal am Tag nach ihr, bis die Blütezeit vorbei ist.",
        r: "",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      my: {
        s: "တစ်နေ့ သုံးကြိမ် ကြည့်တယ်၊ ပန်းပွင့်ချိန် ကုန်သွားတဲ့အထိ။",
        r: "Ta-ne thone-kyein kyi-te, pan-pwint-cheit kohn-thwa-de a-hti.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      ko: {
        s: "하루에 세 번 들여다보며, 꽃 피는 시절이 지나가네.",
        r: "Harue se beon deuryeodabomyeo, kkot pineun sijeori jinagane.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      ja: {
        s: "一日に三度見て、花の時が過ぎるのを見た。",
        r: "Ichinichi ni sando mite, hana no toki ga sugiru no o mita.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      si: {
        s: "දිනකට තුන් වරක් බලමි, මල් කාලය ගෙවී යන තුරු.",
        r: "Dinakata tun varak balami, mal kalaya gevi yana turu.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      },
      fa: {
        s: "روزی سه بار نگاهش می‌کنم، تا زمان گلدهی بگذرد.",
        r: "Rouzi se bâr negâhash mikonam, tâ zamân-e goldehi bogzarad.",
        e: "一日看三回＝一天看三次；看得花時過＝看到花期過了。"
      }
    },
    {
      hi: {
        s: "पर ऑर्किड में अब भी एक भी कली नहीं?",
        r: "Par orchid mein ab bhi ek bhi kali nahin?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      en: {
        s: "But the orchid still has not a single bud?",
        r: "",
        e: "卻依然 means 'still'; 苞 means 'flower bud'; 無一個 means 'not even one'."
      },
      ta: {
        s: "ஆனால் ஆர்க்கிட் அப்படியே இருக்கிறது, ஒரு மொட்டுகூட இல்லையா?",
        r: "āṉāl ārkkiṭ appaṭiyē irukkiṟatu, oru moṭṭukūṭa illaiyā?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      th: {
        s: "แต่กล้วยไม้ก็ยังเหมือนเดิม ไม่มีแม้แต่ตาดอกเดียว?",
        r: "tae kluai mai ko yang muean doem mai mi mae tae ta dok diao?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      km: {
        s: "តែអ័រគីដេនៅដដែល គ្មានសូម្បីតែមួយផ្កា?",
        r: "tae ɑɑkiidee nɨw dɑdael kmien sowpieŋ tae muəy pʰkaa?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      vi: {
        s: "Nhưng cây lan vẫn y nguyên, chẳng có lấy một nụ?",
        r: "",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      id: {
        s: "Tapi anggrek tetap begitu, tak ada satu kuntum pun?",
        r: "",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      ne: {
        s: "तर अर्किड उस्तै छ, एउटा कोपिला पनि छैन?",
        r: "tara arkiḍ ustai chha, euṭā kopilā pani chhaina?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      bn: {
        s: "কিন্তু অর্কিড তেমনই আছে, একটিও কুঁড়ি নেই?",
        r: "kintu orkiḍ temni āche, ekṭio kũṛi nei?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      es: {
        s: "Pero la orquídea sigue sin tener ni un solo capullo.",
        r: "",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      de: {
        s: "Doch die Orchidee hat immer noch keine einzige Knospe?",
        r: "",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      my: {
        s: "ဒါပေမယ့် သစ်ခွမှာ အဖူးတစ်ဖူးမှ မရှိသေးဘူးလား?",
        r: "Da-pe-me thit-khwa hma a-phu ta-phu-hma ma-shi-the-bu-la?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      ko: {
        s: "그런데 난초는 여전히, 꽃봉오리 하나 없구나?",
        r: "Geureonde nancho-neun yeojeonhi, kkotbongori hana eopguna?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      ja: {
        s: "しかし蘭は依然として、つぼみ一つもないのか？",
        r: "Shikashi ran wa izentoshite, tsubomi hitotsu mo nai no ka?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      si: {
        s: "නමුත් ඕකිඩ් තවමත්, මල් පොහොට්ටුවක්වත් නැද්ද?",
        r: "Namut okid tavamat, mal pohotuvakvat nadda?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      },
      fa: {
        s: "اما ارکیده هنوز حتی یک غنچه هم ندارد؟",
        r: "Ammâ orkide hanouz hattâ yek qonche ham nadârad?",
        e: "卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"
      }
    },
    {
      hi: {
        s: "पलक झपकते ही शरद ऋतु आ गई, ऑर्किड को गरम कमरे में ले जाओ।",
        r: "Palak jhapakte hi sharad ritu aa gayi, orchid ko garam kamre mein le jao.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      en: {
        s: "In the blink of an eye autumn arrives; move the orchid into the warm room.",
        r: "",
        e: "轉眼 means 'in a blink'; 移蘭入暖房 means 'move the orchid into a warm room'."
      },
      ta: {
        s: "கண் இமைக்கும் நேரத்தில் இலையுதிர் காலம் வந்தது, ஆர்க்கிட்டை வெதுவெதுப்பான அறைக்கு மாற்றினேன்.",
        r: "kaṇ imaikkum nērattil ilaiyutir kālam vantatu, ārkkiṭṭai vetuvetuppāṉa aṟaikku māṟṟiṉēṉ.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      th: {
        s: "พริบตาเดียวฤดูใบไม้ร่วงก็มาถึง ย้ายกล้วยไม้เข้าห้องอุ่น",
        r: "phrip ta diao rue du bai mai ruang ko ma thueng yai kluai mai khao hong un",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      km: {
        s: "បើកភ្នែកបិទភ្នែករដូវស្លឹកឈើជ្រុះមកដល់ ផ្លាស់អ័រគីដេចូលបន្ទប់ក្តៅ",
        r: "bəək pʰneek bət pʰneek rədow slɨk cʰəə crʊh mɔɔk dɑl pʰlas ɑɑkiidee coul bɑntup kdaw",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      vi: {
        s: "Chớp mắt đã sang thu, chuyển lan vào phòng ấm.",
        r: "",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      id: {
        s: "Dalam sekejap musim gugur tiba, pindahkan anggrek ke ruangan hangat.",
        r: "",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      ne: {
        s: "आँख झिमिक्क गर्दा शरद ऋतु आयो, अर्किडलाई न्यानो कोठामा सारेँ।",
        r: "ā̃kha jhimikka gardā śarad ritu āyo, arkiḍlāī nyāno koṭhāmā sārẽ.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      bn: {
        s: "চোখের পলকে শরৎ এলো, অর্কিড সরিয়ে নিলাম উষ্ণ ঘরে।",
        r: "chokher palke śarat elo, orkiḍ śoriye nilām uṣṇo ghare.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      es: {
        s: "En un abrir y cerrar de ojos llega el otoño; traslada la orquídea al invernadero.",
        r: "",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      de: {
        s: "Im Handumdrehen kommt der Herbst; bring die Orchidee ins warme Zimmer.",
        r: "",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      my: {
        s: "မျက်စိတစ်မှိတ်အတွင်း ဆောင်းဦးရောက်လာ၊ သစ်ခွကို နွေးတဲ့အခန်းထဲ ရွှေ့။",
        r: "Myet-si ta-hmeit a-twin saung-u yaut-la, thit-khwa ko nwe-de a-khan-hte shwe.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      ko: {
        s: "눈 깜짝할 새 가을이 오고, 난초를 따뜻한 방으로 옮기네.",
        r: "Nun kkamjjakhal sae gaeuri ogo, nancho-reul ttatteutan bang-euro omgine.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      ja: {
        s: "瞬く間に秋が来て、蘭を暖かい部屋に移す。",
        r: "Matataku ma ni aki ga kite, ran o atatakai heya ni utsusu.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      si: {
        s: "ඇසිපිය හෙළන සැණින් සරත් සමය එයි; ඕකිඩ් උණුසුම් කාමරයට ගෙන යන්න.",
        r: "Asipiya helana sanin sarat samaya ei; okid unusum kamarayata gena yanna.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      },
      fa: {
        s: "در یک چشم به هم زدن پاییز می‌رسد؛ ارکیده را به اتاق گرم منتقل کن.",
        r: "Dar yek cheshm be ham zadan pâyiz mi-resad; orkide râ be otâq-e garm montaquel kon.",
        e: "轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"
      }
    },
    {
      hi: {
        s: "हर सुबह स्नेह से देखभाल करो, हर रात कभी न भूलो।",
        r: "Har subah sneh se dekhbhaal karo, har raat kabhi na bhoolo.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      en: {
        s: "Morning after morning I care for it tenderly; night after night I never forget.",
        r: "",
        e: "朝朝 means 'every morning'; 顧惜 means 'to cherish'; 夜夜不相忘 means 'never forget, night after night'."
      },
      ta: {
        s: "காலைதோறும் அன்புடன் பேணினேன், இரவுதோறும் மறக்கவில்லை.",
        r: "kālaitōṟum aṉpuṭaṉ pēṇiṉēṉ, iravutōṟum maṟakkavillai.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      th: {
        s: "ทุกเช้าเฝ้าดูแลด้วยความรัก ทุกคืนไม่เคยลืม",
        r: "thuk chao fao du lae duai khwam rak thuk khuen mai khoei luem",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      km: {
        s: "ព្រឹកៗមើលថែដោយក្តីស្រឡាញ់ យប់ៗមិនភ្លេចឡើយ",
        r: "prɨk prɨk məəl tʰae daoy kdəy srɑlaɲ yop yop mɨn pʰleec laəy",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      vi: {
        s: "Sớm sớm chăm sóc thương yêu, đêm đêm chẳng quên.",
        r: "",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      id: {
        s: "Setiap pagi kurawat dengan kasih, setiap malam tak kulupa.",
        r: "",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      ne: {
        s: "बिहानबिहान मायाले स्याहारेँ, रातरात कहिल्यै नबिर्सेँ।",
        r: "bihānabihāna māyāle syāhārẽ, rātarāta kahilyai nabirsẽ.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      bn: {
        s: "প্রতিটি সকালে স্নেহে যত্ন নিলাম, প্রতি রাতে কখনো ভুলিনি।",
        r: "proṭiṭi śokāle snehe yatno nilām, proti rāte kakhano bhulini.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      es: {
        s: "Mañana tras mañana la cuido con ternura; noche tras noche nunca la olvido.",
        r: "",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      de: {
        s: "Morgen für Morgen pflege ich sie liebevoll; Nacht für Nacht vergesse ich sie nie.",
        r: "",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      my: {
        s: "မနက်တိုင်း ဂရုတစိုက် ပြုစု၊ ညတိုင်း ဘယ်တော့မှ မမေ့။",
        r: "Ma-net-taing ga-ru-ta-sait pyu-su, nya-taing be-daw-hma ma-me.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      ko: {
        s: "아침마다 정성껏 돌보고, 밤마다 잊지 않네.",
        r: "Achim-mada jeongseongkkeot dolbogo, bam-mada itji anne.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      ja: {
        s: "朝な朝な慈しみ育て、夜な夜な忘れない。",
        r: "Asa na asa na itsukushimi-sodate, yoru na yoru na wasurenai.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      si: {
        s: "උදෑසනින් උදෑසන ආදරයෙන් රැකබලා ගනිමි; රාත්‍රියෙන් රාත්‍රිය කිසිදා අමතක නොකරමි.",
        r: "Udasenin udasena adarayen rakabala ganimi; ratriyen ratriya kisida amatka nokarami.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      },
      fa: {
        s: "هر صبح با مهر از آن نگهداری می‌کنم؛ هر شب هرگز فراموشش نمی‌کنم.",
        r: "Har sobh bâ mehr az ân negahdâri mikonam; har shab hargez farâmoushash nemikonam.",
        e: "朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"
      }
    },
    {
      hi: {
        s: "वसंत में फूल खिलने की प्रतीक्षा में, पुरानी इच्छा पूरी हो सके।",
        r: "Vasant mein phool khilne ki prateeksha mein, puraani ichchha poori ho sake.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      en: {
        s: "Awaiting the spring blossoms, hoping my long-cherished wish will come true.",
        r: "",
        e: "期待 means 'to await'; 宿願 is a 'long-held wish'; 償 means 'to fulfill'."
      },
      ta: {
        s: "வசந்தத்தில் பூ மலரும் என்று எதிர்பார்த்து, நீண்ட நாள் ஆசை நிறைவேறும்.",
        r: "vacantattil pū malarum eṉṟu etirpārttu, nīṇṭa nāḷ ācai niṟaivēṟum.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      th: {
        s: "รอคอยดอกไม้บานในฤดูใบไม้ผลิ หวังให้ความปรารถนาเก่าแก่สมหวัง",
        r: "ro khoi dok mai ban nai rue du bai mai phli wang hai khwam pratthana kao kae som wang",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      km: {
        s: "រង់ចាំផ្ការីកនៅរដូវផ្ការីក សង្ឃឹមថាបំណងចាស់នឹងបានសម្រេច",
        r: "rɔŋcam pʰkaa riik nɨw rədow pʰkaa riik sɑngkʰɨm tʰaa bɑmnɑng caah nɨng baan sɑmrec",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      vi: {
        s: "Mong chờ hoa xuân nở, nguyện ước xưa được thành.",
        r: "",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      id: {
        s: "Menanti bunga musim semi mekar, semoga keinginan lama terkabul.",
        r: "",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      ne: {
        s: "वसन्तमा फूल फुल्ने प्रतीक्षामा, पुरानो इच्छा पूरा होस्।",
        r: "vasantamā phūl phulne pratīkṣāmā, purāno ichchhā pūrā hos.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      bn: {
        s: "বসন্তে ফুল ফোটার অপেক্ষায়, পুরনো ইচ্ছা পূর্ণ হোক।",
        r: "basante phul phoṭār apekṣāy, purono icchā pūrṇo hok.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      es: {
        s: "Espero las flores de primavera, ojalá se cumpla mi antiguo deseo.",
        r: "",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      de: {
        s: "Ich erwarte die Frühlingsblüte, möge mein langgehegter Wunsch in Erfüllung gehen.",
        r: "",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      my: {
        s: "နွေဦးပန်းပွင့်ဖို့ မျှော်လင့်၊ ကြာမြင့်တဲ့ဆန္ဒ ပြည့်ဝပါစေ။",
        r: "Nwe-u pan-pwint-pho myaw-lint, kya-myint-de sa-nda pyi-wa-pa-se.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      ko: {
        s: "봄꽃 피기를 기다리며, 오랜 소원이 이루어지기를.",
        r: "Bomkkot pigireul gidarimyeo, oraen sowoni irueojigireul.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      ja: {
        s: "春の花開くのを待ち、長年の願いが叶いますように。",
        r: "Haru no hana hiraku no o machi, naganen no negai ga kanaimasu yō ni.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      si: {
        s: "වසන්ත මල් පිපෙනු බලාපොරොත්තු වෙමි; දිගුකාලීන පැතුම ඉටුවේවා.",
        r: "Vasant mal pipenu balaporottu vemi; digukalina patuma ituveva.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      },
      fa: {
        s: "در انتظار شکفتن گل‌های بهاری، باشد که آرزوی دیرینه‌ام برآورده شود.",
        r: "Dar entezâr-e shekaftan-e gol-hâ-ye bahâri, bâshad ke ârezu-ye dirine-am barâvarde shavad.",
        e: "期待＝盼望；宿願＝長久的心願；償＝實現。"
      }
    },
    {
      hi: {
        s: "आँगन फूलों के गुच्छों से भरा है, बहुत सुगंध फैली है।",
        r: "Aangan phoolon ke guchchhon se bhara hai, bahut sugandh phaili hai.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      en: {
        s: "The courtyard is full of clustered blossoms, blooming so fragrant.",
        r: "",
        e: "滿庭 means 'the whole courtyard'; 簇簇 describes flowers in clusters; 香 means 'fragrant'."
      },
      ta: {
        s: "முற்றம் முழுவதும் பூங்கொத்துகள் நிறைந்து, மிகவும் மணமாய் மலர்ந்தன.",
        r: "muṟṟam muḻuvatum pūṅkottukaḷ niṟaintu, mikavum maṇamāy malarntaṉa.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      th: {
        s: "ทั่วทั้งลานเต็มไปด้วยช่อดอกไม้ บานสะพรั่งส่งกลิ่นหอมมาก",
        r: "thua thang lan tem pai duai cho dok mai ban saphrang song klin hom mak",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      km: {
        s: "ពេញទីធ្លាពោរពេញដោយចង្កោមផ្កា រីកយ៉ាងក្រអូប",
        r: "peɲ tii tʰlea poo peɲ daoy cɑngkoom pʰkaa riik yɨəng krɑʔoop",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      vi: {
        s: "Đầy sân hoa từng chùm, nở thơm ngát.",
        r: "",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      id: {
        s: "Seluruh halaman penuh rangkaian bunga, mekar sangat harum.",
        r: "",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      ne: {
        s: "आँगनभरि फूलका गुच्छाहरू, साह्रै बास्नादार फुले।",
        r: "ā̃ganbhari phūlakā guchchhāharū, sāhrai bāsnādāra phule.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      bn: {
        s: "উঠোন ভরে ফুলের থোকা, খুব সুগন্ধে ফুটেছে।",
        r: "uṭhon bhare phuler thokā, khub sugandhe phuṭeche.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      es: {
        s: "El patio está lleno de flores en racimos, qué fragancia tan intensa.",
        r: "",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      de: {
        s: "Der ganze Hof ist voller Blütenbüschel, so herrlich duftend.",
        r: "",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      my: {
        s: "ဝင်းတစ်ခုလုံး ပန်းအုပ်အုပ်တွေ ပြည့်နေ၊ အရမ်းမွှေး။",
        r: "Win ta-khu-lon pan-out-out-dwe pyi-ne, a-yan hmwe.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      ko: {
        s: "뜰 가득 꽃이 다닥다닥, 향기가 그윽하구나.",
        r: "Tteul gadeuk kkochi dadak-dadak, hyanggiga geugeukhaguna.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      ja: {
        s: "庭いっぱいに花がむらむらと、なんともよい香り。",
        r: "Niwa ippai ni hana ga muramura to, nantomo yoi kaori.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      si: {
        s: "මිදුල පුරා මල් පොකුරු පිරී ඇත, මොනතරම් සුවඳද.",
        r: "Midula pura mal pokuru piri ata, monataram suvandada.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      },
      fa: {
        s: "حیاط پر از خوشه‌های گل است، چه عطر دل‌انگیزی.",
        r: "Hayât por az xoushe-hâ-ye gol ast, che atr-e del-angizí.",
        e: "滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"
      }
    }
  ],
  talang: [
    {
      hi: {
        s: "छोटा-सा बादल धीरे-धीरे चला आया।",
        r: "Chhota-sa baadal dheere-dheere chala aaya.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      en: {
        s: "A tiny little cloud slowly drifts over.",
        r: "",
        e: "小小的 means 'tiny'; 走過來 here describes the cloud drifting toward us."
      },
      ta: {
        s: "சிறு மேகம் மெதுவாய் மிதந்து வருகிறது.",
        r: "ciṟu mēkam metuvāy mitantu varukiṟatu.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      th: {
        s: "เมฆก้อนเล็กๆ ค่อยๆ ลอยมา",
        r: "mek kon lek lek khoi khoi loi ma",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      km: {
        s: "ពពកតូចមួយរសាត់មកយឺតៗ",
        r: "pɔpɔɔk touc muəy rɔsat mɔɔk yɨɨt yɨɨt",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      vi: {
        s: "Đám mây nho nhỏ, chầm chậm bay đến.",
        r: "",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      id: {
        s: "Awan kecil perlahan melayang datang.",
        r: "",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      ne: {
        s: "सानो बादलको टुक्रा बिस्तारै आयो।",
        r: "sāno bādalko ṭukrā bistārai āyo.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      bn: {
        s: "ছোট্ট এক টুকরো মেঘ ধীরে ধীরে ভেসে এলো।",
        r: "choṭṭo ek ṭukro megh dhīre dhīre bheśe elo.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      es: {
        s: "Una nubecita pequeña viene flotando despacio.",
        r: "",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      de: {
        s: "Ein winziges Wölkchen treibt langsam heran.",
        r: "",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      my: {
        s: "တိမ်တိုက်သေးသေးလေး ဖြည်းဖြည်းချင်း ရွေ့လာတယ်။",
        r: "Tein-tite thay-thay-lay phye-phye-chin shwe-la-te.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      ko: {
        s: "조그만 구름 한 조각이 살살 다가오네.",
        r: "Jogeuman gureum han jogagi salsal dagaone.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      ja: {
        s: "小さな雲ひとつが、ゆっくりと流れてくる。",
        r: "Chiisana kumo hitotsu ga, yukkuri to nagarete-kuru.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      si: {
        s: "පුංචි වලාකුළු කැබැල්ලක් හෙමිහිට පාවී එයි.",
        r: "Punchi valakulu kaballak hemiheeta pavi ei.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      },
      fa: {
        s: "تکه‌ابر کوچکی آرام آرام شناور می‌آید.",
        r: "Tekke-abr-e kouchaki ârâm ârâm shenâvar mi-âyad.",
        e: "小小的＝小小地；走過來是說雲慢慢飄過來。"
      }
    },
    {
      hi: {
        s: "कृपया थोड़ी देर पैर आराम करो, क्षण भर रुको।",
        r: "Kripya thodi der pair aaraam karo, kshan bhar ruko.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      en: {
        s: "Please rest your feet a while, stop for a moment.",
        r: "",
        e: "歇歇腳 means 'rest one's feet'; 暫時停下來 means 'pause for a while'."
      },
      ta: {
        s: "கொஞ்சம் கால்களுக்கு ஓய்வு கொடுங்கள், சற்று நில்லுங்கள்.",
        r: "koñcam kālkaḷukku ōyvu koṭuṅkaḷ, caṟṟu nilluṅkaḷ.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      th: {
        s: "ขอให้พักเท้าหน่อย หยุดสักครู่เถิด",
        r: "kho hai phak thao noi yut sak khru thoet",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      km: {
        s: "សូមសម្រាកជើងបន្តិច ឈប់មួយភ្លែតសិន",
        r: "soom sɑmreak cəəng bɑntəc cʰup muəy pʰleet sən",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      vi: {
        s: "Xin hãy nghỉ chân một lát, tạm dừng lại đã.",
        r: "",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      id: {
        s: "Istirahatkan kaki sejenak, berhentilah sebentar.",
        r: "",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      ne: {
        s: "कृपया खुट्टा केहीबेर आराम गर, एकछिन रोक।",
        r: "kṛpayā khuṭṭā kehībera ārām gara, ekchhin roka.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      bn: {
        s: "দয়া করে পা দুটো একটু জিরিয়ে নাও, ক্ষণিক থামো।",
        r: "dayā kare pā duṭo ekṭu jiriye nāo, kṣoṇik thāmo.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      es: {
        s: "Por favor, descansen los pies un rato, deténganse un momento.",
        r: "",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      de: {
        s: "Bitte ruht eure Füße ein wenig aus, haltet einen Moment inne.",
        r: "",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      my: {
        s: "ခြေထောက်တွေ ခဏနား၊ ခေတ္တရပ်လိုက်ပါ။",
        r: "Chay-htauk-dwe kha-na na, khay-ta yat-lait-pa.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      ko: {
        s: "발 좀 쉬었다 가세요, 잠시 멈추세요.",
        r: "Bal jom swieotda gaseyo, jamsi meomchuseyo.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      ja: {
        s: "どうぞ足を休めて、しばらく立ち止まって。",
        r: "Dōzo ashi o yasumete, shibaraku tachidomatte.",
        e: "どうぞ足を休めて、しばらく立ち止まって。"
      },
      si: {
        s: "කරුණාකර පාද ටිකක් විවේක ගන්න, මොහොතක් නවතින්න.",
        r: "Karunakara pada tikak viveka ganna, mohotak navatinna.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      },
      fa: {
        s: "لطفاً پاهایتان را کمی استراحت دهید، لحظه‌ای بایستید.",
        r: "Lotfan pâhâyatân râ kami esterâhat dahid, lahze-i bâyistid.",
        e: "歇歇腳＝休息一下；暫時停下來＝先停一會兒。"
      }
    },
    {
      hi: {
        s: "पहाड़ पर पहाड़ी फूल खिले हैं, इसलिए मैं पहाड़ आया।",
        r: "Pahaad par pahaadi phool khile hain, isliye main pahaad aaya.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      en: {
        s: "The mountain flowers are blooming, that's why I came up the mountain.",
        r: "",
        e: "山花兒開 means 'mountain flowers bloom'; 才 here gives the reason for coming."
      },
      ta: {
        s: "மலையில் மலைப்பூக்கள் மலர்ந்துள்ளன, அதனால்தான் நான் மலைக்கு வந்தேன்.",
        r: "malaiyil malaippūkkaḷ malarntuḷḷaṉa, ataṉāltāṉ nāṉ malaikku vantēṉ.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      th: {
        s: "ดอกไม้บนภูเขากำลังบาน ฉันจึงขึ้นมาบนภูเขา",
        r: "dok mai bon phu khao kamlang ban chan chueng khuen ma bon phu khao",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      km: {
        s: "ផ្កាភ្នំកំពុងរីក ទើបខ្ញុំមកភ្នំ",
        r: "pʰkaa pʰnom kɑmpuŋ riik tɨb kʰɲom mɔɔk pʰnom",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      vi: {
        s: "Hoa trên núi đang nở, nên tôi mới lên núi.",
        r: "",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      id: {
        s: "Bunga gunung sedang mekar, makanya aku datang ke gunung.",
        r: "",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      ne: {
        s: "पहाडमा पहाडी फूल फुलेका छन्, त्यसैले म पहाड आएँ।",
        r: "pahāḍmā pahāḍī phūl phulekā chhan, tyasaile ma pahāḍ āẽ.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      bn: {
        s: "পাহাড়ে পাহাড়ি ফুল ফুটেছে, তাই আমি পাহাড়ে এলাম।",
        r: "pāhāṛe pāhāṛi phul phuṭeche, tāi āmi pāhāṛe elām.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      es: {
        s: "Las flores de la montaña están en flor, por eso subí a la montaña.",
        r: "",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      de: {
        s: "Die Bergblumen blühen, darum bin ich auf den Berg gekommen.",
        r: "",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      my: {
        s: "တောင်ပေါ်က တောင်ပန်းတွေ ပွင့်နေလို့၊ ကျွန်တော် တောင်ပေါ် တက်လာတာ။",
        r: "Taung-paw ka taung-pan-dwe pwint-ne-lo, kyan-taw taung-paw tet-la-ta.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      ko: {
        s: "산에 산꽃이 피었기에, 나는 산에 올라왔네.",
        r: "Sane sankkochi pieotgie, naneun sane ollawanne.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      ja: {
        s: "山に山の花が咲いたから、私は山に登ってきた。",
        r: "Yama ni yama no hana ga saita kara, watashi wa yama ni nobotte-kita.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      si: {
        s: "කන්දේ කඳු මල් පිපී ඇති නිසා, මම කන්දට ආවා.",
        r: "Kande kandu mal pipi ati nisa, mama kandata ava.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      },
      fa: {
        s: "گل‌های کوهستان شکفته‌اند، به همین دلیل به کوه آمدم.",
        r: "Gol-hâ-ye kouhestân shekafte-and, be hamin dalil be kouh âmadam.",
        e: "山花兒開＝山花開了；才是表示來的原因。"
      }
    },
    {
      hi: {
        s: "अरे, तुम भी पहाड़ पर फूल खिलते देखने आए हो।",
        r: "Are, tum bhi pahaad par phool khilte dekhne aaye ho.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      en: {
        s: "So it turns out you also came up the mountain to see the flowers bloom.",
        r: "",
        e: "原來嘛 expresses pleasant surprise; 也是 means 'also'."
      },
      ta: {
        s: "ஓ, நீயும் மலைப்பூக்கள் மலர்வதைப் பார்க்க மலைக்கு வந்திருக்கிறாய்!",
        r: "ō, nīyum malaippūkkaḷ malarvataip pārkka malaikku vantirukkiṟāy!",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      th: {
        s: "อ๋อ ที่แท้เธอก็ขึ้นภูเขามาดูดอกไม้บานเหมือนกัน",
        r: "o thi thae thoe ko khuen phu khao ma du dok mai ban muean kan",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      km: {
        s: "អូ តើអ្នកក៏មកភ្នំមើលផ្ការីកដែរ!",
        r: "ʔoo taə neak kɑɑ mɔɔk pʰnom məəl pʰkaa riik dae!",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      vi: {
        s: "À, hóa ra bạn cũng lên núi ngắm hoa nở!",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      id: {
        s: "Oh, ternyata kamu juga naik gunung melihat bunga mekar!",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      ne: {
        s: "अहो, तिमी पनि पहाडी फूल फुलेको हेर्न पहाड आएका!",
        r: "aho, timī pani pahāḍī phūl phuleko herna pahāḍ āekā!",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      bn: {
        s: "ওহো, তুমিও পাহাড়ি ফুল ফোটা দেখতে পাহাড়ে এসেছ!",
        r: "oho, tumio pāhāṛi phul phoṭā dekhte pāhāṛe esecho!",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      es: {
        s: "Vaya, resulta que tú también subiste a ver florecer las montañas.",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      de: {
        s: "Ach so, du bist also auch auf den Berg gekommen, um die Blüte zu sehen.",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      my: {
        s: "သြော်၊ မင်းလည်း တောင်ပန်းပွင့်တာ ကြည့်ဖို့ တောင်တက်လာတာပဲ။",
        r: "Aw, min le taung-pan pwint-ta kyi-pho taung-tet-la-ta-be.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      ko: {
        s: "아, 너도 산꽃 피는 걸 보러 산에 올라왔구나.",
        r: "A, neodo sankkot pineun geol boreo sane ollawanne.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      ja: {
        s: "あら、あなたも山の花が咲くのを見に山に登ってきたのね。",
        r: "Ara, anata mo yama no hana ga saku no o mi ni yama ni nobotte-kita no ne.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      si: {
        s: "අනේ, ඔබත් කඳු මල් පිපෙනු බලන්න කන්දට ඇවිත්.",
        r: "Ane, obat kandu mal pipenu balanna kandata avit.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      },
      fa: {
        s: "آهان، پس تو هم برای دیدن شکفتن گل‌های کوه به کوه آمدی.",
        r: "Âhân, pas tou ham barâ-ye didan-e shekaftan-e gol-hâ-ye kouh be kouh âmadi.",
        e: "原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"
      }
    },
    {
      hi: {
        s: "हल्की-सी हवा धीरे-धीरे चली आई।",
        r: "Halki-si hawa dheere-dheere chali aayi.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      en: {
        s: "A gentle little breeze slowly drifts over.",
        r: "",
        e: "一陣風 is a gust of wind; 走過來 describes the breeze coming toward us."
      },
      ta: {
        s: "சிறு காற்று மெதுவாய் வீசி வருகிறது.",
        r: "ciṟu kāṟṟu metuvāy vīci varukiṟatu.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      th: {
        s: "ลมพัดเบาๆ ค่อยๆ พัดมา",
        r: "lom phat bao bao khoi khoi phat ma",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      km: {
        s: "ខ្យល់តិចៗបក់មកយឺតៗ",
        r: "kʰyɑl təc təc bɑk mɔɔk yɨɨt yɨɨt",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      vi: {
        s: "Cơn gió nho nhỏ, chầm chậm thổi đến.",
        r: "",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      id: {
        s: "Angin sepoi-sepoi perlahan berhembus datang.",
        r: "",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      ne: {
        s: "मसिनो हावाको झोक्का बिस्तारै आयो।",
        r: "masino hāwāko jhokkā bistārai āyo.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      bn: {
        s: "ছোট্ট এক ঝলক হাওয়া ধীরে ধীরে বয়ে এলো।",
        r: "choṭṭo ek jhalak hāoyā dhīre dhīre baye elo.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      es: {
        s: "Una brisa ligera viene flotando despacio.",
        r: "",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      de: {
        s: "Ein leichter Windhauch weht langsam heran.",
        r: "",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      my: {
        s: "လေညင်းသေးသေးလေး ဖြည်းဖြည်းချင်း တိုက်လာတယ်။",
        r: "Le-nyin thay-thay-lay phye-phye-chin tite-la-te.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      ko: {
        s: "살랑이는 작은 바람이 살살 불어오네.",
        r: "Sallangineun jageun barami salsal bureone.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      ja: {
        s: "小さな風ひとつが、ゆっくりと吹いてくる。",
        r: "Chiisana kaze hitotsu ga, yukkuri to fuite-kuru.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      si: {
        s: "පුංචි සුළං රැල්ලක් හෙමිහිට හමා එයි.",
        r: "Punchi sulan rallak hemiheeta hama ei.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      },
      fa: {
        s: "نسیم ملایمی آرام آرام می‌وزد و می‌آید.",
        r: "Nasim-e molâyemi ârâm ârâm mi-vazad o mi-âyad.",
        e: "一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"
      }
    },
    {
      hi: {
        s: "समुद्र पर लहरों के फूल खिले हैं, इसलिए मैं समुद्र तट आया।",
        r: "Samudra par laharon ke phool khile hain, isliye main samudra tat aaya.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      en: {
        s: "The sea spray blooms like flowers, that's why I came to the seaside.",
        r: "",
        e: "浪花開 likens waves to blooming flowers; 才 gives the reason for coming to the sea."
      },
      ta: {
        s: "கடலில் அலைப்பூக்கள் மலர்கின்றன, அதனால்தான் நான் கடற்கரைக்கு வந்தேன்.",
        r: "kaṭalil alaippūkkaḷ malarkiṉṟaṉa, ataṉāltāṉ nāṉ kaṭaṟkaraikku vantēṉ.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      th: {
        s: "ฟองคลื่นในทะเลกำลังบาน ฉันจึงมาที่ชายทะเล",
        r: "fong khluen nai thale kamlang ban chan chueng ma thi chai thale",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      km: {
        s: "រលកសមុទ្រកំពុងរីកដូចផ្កា ទើបខ្ញុំមកមាត់សមុទ្រ",
        r: "rɔlɔɔk sɑmot kɑmpuŋ riik douch pʰkaa tɨb kʰɲom mɔɔk meat sɑmot",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      vi: {
        s: "Hoa sóng trên biển đang nở, nên tôi mới ra biển.",
        r: "",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      id: {
        s: "Bunga ombak di laut sedang mekar, makanya aku datang ke pantai.",
        r: "",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      ne: {
        s: "समुद्रमा छालका फूलहरू फुलिरहेका छन्, त्यसैले म समुद्र किनार आएँ।",
        r: "samudramā chhālakā phūlharū phulirahekā chhan, tyasaile ma samudra kināra āẽ.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      bn: {
        s: "সাগরে ঢেউয়ের ফুল ফুটছে, তাই আমি সাগরপাড়ে এলাম।",
        r: "sāgare ḍheuer phul phuṭche, tāi āmi sāgarpāṛe elām.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      es: {
        s: "La espuma del mar florece como flores, por eso vine a la orilla.",
        r: "",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      de: {
        s: "Die Gischt blüht wie Blumen, darum bin ich ans Meer gekommen.",
        r: "",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      my: {
        s: "ပင်လယ်လှိုင်းပန်းတွေ ပွင့်နေလို့၊ ကျွန်တော် ပင်လယ်ကမ်းခြေ လာတာ။",
        r: "Pin-le hlaing-pan-dwe pwint-ne-lo, kyan-taw pin-le kan-chay la-ta.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      ko: {
        s: "바다에 물꽃이 피었기에, 나는 바닷가에 왔네.",
        r: "Badae mulkkochi pieotgie, naneun badatgae wanne.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      ja: {
        s: "海に波の花が咲いたから、私は海辺に来た。",
        r: "Umi ni nami no hana ga saita kara, watashi wa umibe ni kita.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      si: {
        s: "මුහුදේ රළ මල් පිපී ඇති නිසා, මම වෙරළට ආවා.",
        r: "Muhude rala mal pipi ati nisa, mama veralata ava.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      },
      fa: {
        s: "کف دریا چون گل شکفته است، به همین دلیل به ساحل آمدم.",
        r: "Kaf-e daryâ chon gol shekafte ast, be hamin dalil be sâhel âmadam.",
        e: "浪花開是把浪花比作花開；才是表示來的原因。"
      }
    },
    {
      hi: {
        s: "अरे, तुम्हें भी लहरें पसंद हैं, इसलिए तुम समुद्र तट आए।",
        r: "Are, tumhen bhi laharen pasand hain, isliye tum samudra tat aaye.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      en: {
        s: "So it turns out you also love the sea spray, that's why you came to the seaside.",
        r: "",
        e: "原來嘛 expresses pleasant surprise; 愛浪花 means 'love the sea spray'."
      },
      ta: {
        s: "ஓ, நீயும் அலைகளை விரும்பி கடற்கரைக்கு வந்திருக்கிறாய்!",
        r: "ō, nīyum alaikaḷai virumpi kaṭaṟkaraikku vantirukkiṟāy!",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      th: {
        s: "อ๋อ ที่แท้เธอก็ชอบฟองคลื่นจึงมาที่ชายทะเล",
        r: "o thi thae thoe ko chop fong khluen chueng ma thi chai thale",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      km: {
        s: "អូ តើអ្នកក៏ស្រឡាញ់រលកទើបមកមាត់សមុទ្រ!",
        r: "ʔoo taə neak kɑɑ srɑlaɲ rɔlɔɔk tɨb mɔɔk meat sɑmot!",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      vi: {
        s: "À, hóa ra bạn cũng yêu hoa sóng nên mới ra biển!",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      id: {
        s: "Oh, ternyata kamu juga suka ombak makanya datang ke pantai!",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      ne: {
        s: "अहो, तिमीलाई पनि छाल मनपर्छ, त्यसैले समुद्र किनार आएका!",
        r: "aho, timīlāī pani chhāl manaparchha, tyasaile samudra kināra āekā!",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      bn: {
        s: "ওহো, তুমিও ঢেউ ভালোবাসো, তাই সাগরপাড়ে এসেছ!",
        r: "oho, tumio ḍheu bhālobāso, tāi sāgarpāṛe esecho!",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      es: {
        s: "Vaya, resulta que a ti también te encanta la espuma, por eso viniste a la orilla.",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      de: {
        s: "Ach so, du liebst also auch die Gischt, darum bist du ans Meer gekommen.",
        r: "",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      my: {
        s: "သြော်၊ မင်းလည်း လှိုင်းပန်းတွေ ချစ်လို့ ပင်လယ်ကမ်းခြေ လာတာပဲ။",
        r: "Aw, min le hlaing-pan-dwe chit-lo pin-le kan-chay la-ta-be.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      ko: {
        s: "아, 너도 물결을 사랑해서 바닷가에 왔구나.",
        r: "A, neodo mulgyeoreul saranghaeseo badatgae wanne.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      ja: {
        s: "あら、あなたも波の花が好きで海辺に来たのね。",
        r: "Ara, anata mo nami no hana ga suki de umibe ni kita no ne.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      si: {
        s: "අනේ, ඔබත් රළ මල් වලට ආදරෙයි, ඒ නිසයි වෙරළට ඇවිත් තියෙන්නේ.",
        r: "Ane, obat rala mal valata adarei, e nisai veralata avit tiyenne.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      },
      fa: {
        s: "آهان، پس تو هم کف دریا را دوست داری، به همین دلیل به ساحل آمدی.",
        r: "Âhân, pas tou ham kaf-e daryâ râ doust dâri, be hamin dalil be sâhel âmadi.",
        e: "原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"
      }
    }
  ],
  yuer: [
    {
      hi: {
        s: "छोटी मछली, छोटी मछली पानी में तैर रही है",
        r: "chhoṭī machhalī, chhoṭī machhalī pānī meṅ tair rahī hai",
        e: "yú-'ér का मतलब है 'छोटी मछली' (ér लगने से शब्द मधुर और बच्चों जैसा लगता है); yóu का मतलब है 'तैरना'।"
      },
      ta: {
        s: "சிறு மீன், சிறு மீன் தண்ணீரில் நீந்துகிறது",
        r: "ciṟu mīṉ, ciṟu mīṉ taṇṇīril nīntukiṟatu",
        e: "yú-'ér என்றால் 'சிறு மீன்' (ér என்பது குழந்தைப் பாடல்களில் செல்லமாகச் சேர்க்கும் சொல்); yóu என்றால் 'நீந்து'."
      },
      th: {
        s: "เจ้าปลาตัวน้อยว่ายน้ำอยู่ในน้ำ",
        r: "jao pla tua noi wai nam yu nai nam",
        e: "yú-'ér แปลว่า ปลาตัวน้อย (ér เป็นคำเติมท้ายทำให้เสียงน่ารัก มักใช้ในเพลงเด็ก); yóu แปลว่า ว่ายน้ำ"
      },
      km: {
        s: "ត្រីតូចៗហែលក្នុងទឹក,",
        r: "trəy touc-touc heel knoŋ tɨk,",
        e: "មានន័យថាត្រីតូចៗ; គឺហែលនៅក្នុងទឹក។"
      },
      vi: {
        s: "Cá nhỏ cá nhỏ bơi trong nước,",
        r: "",
        e: "nghĩa là cá nhỏ; là bơi trong nước."
      },
      id: {
        s: "Ikan kecil berenang di dalam air,",
        r: "",
        e: "artinya ikan kecil; artinya berenang di dalam air."
      },
      ne: {
        s: "सानासाना माछा पानीमा पौडन्छन्,",
        r: "sānā-sānā māchhā pānīmā pauḍanchhan,",
        e: "भनेको साना माछा; भनेको पानीमा पौडनु हो।"
      },
      bn: {
        s: "মাছ, মাছ পানিতে সাঁতার কাটে",
        r: "māch, māch pānīte sām̐tār kāṭe",
        e: "মাছ পানির মধ্যে সাঁতার কাটে। অর্থ ছোট মাছ, ভালোবাসা প্রকাশ করে।"
      },
      es: {
        s: "Pececitos, pececitos, nadad en el agua",
        r: "",
        e: "Los pececitos nadan en el agua."
      },
      en: {
        s: "Little fish, little fish, swimming in the water",
        r: "",
        e: "yú-'ér (yú'ér) means 'little fish' — ér (ér) is an affectionate diminutive common in children's songs; yóu (yóu) means 'to swim'."
      },
      de: {
        s: "Fischlein, Fischlein, schwimmt im Wasser",
        r: "",
        e: "Fische schwimmen im Wasser."
      },
      my: {
        s: "ငါးလေးတွေ ရေထဲမှာ ကူးနေတယ်",
        r: "nga-lay-dwe yay-hte-hma ku-nay-dal",
        e: "ငါးလေးတွေ ရေထဲမှာ ကူးနေတယ်။ 「ငါးလေး」ဆိုတာ ချစ်စရာကောင်းတဲ့ ငါးကလေးကို ဆိုလိုတယ်။"
      },
      ko: {
        s: "물고기야 물고기야 물속에서 헤엄쳐.",
        r: "Mulgogiya mulgogiya mulsogeseo heeomchyeo.",
        e: "는 물고기를 귀엽게 부르는 말이다; 는 물속에서 헤엄친다는 뜻이다."
      },
      ja: {
        s: "お魚よお魚よ、水の中を泳ぐ。",
        r: "Osakana yo osakana yo, mizu no naka o oyogu.",
        e: "魚をかわいく呼ぶ言い方である; 水中を泳ぐという意味である。"
      },
      si: {
        s: "මාළුන් මාළුන් වතුරේ පිහිනයි.",
        r: "Malun malun vature pihinayi.",
        e: "යනු මාළුන්ට ආදරයෙන් කතා කරන වචනයයි; යනු වතුරේ පිහිනනවා යන්නයි."
      },
      fa: {
        s: "ماهی‌ها ماهی‌ها در آب شنا می‌کنند.",
        r: "Mâhi-hâ mâhi-hâ dar âb shenâ mikonand.",
        e: "نامی ناز برای ماهی است؛ یعنی در آب شنا کردن."
      }
    },
    {
      hi: {
        s: "इधर-उधर तैरती है, बहुत खुश, बेफिक्र",
        r: "idhar-udhar tairtī hai, bahut khuś, befikr",
        e: "yóu-lái-yóu-qù का मतलब है 'इधर-उधर तैरना'; lè-yōu-yōu का मतलब है 'बहुत खुश और बेफिक्र'।"
      },
      ta: {
        s: "இங்கும் அங்கும் நீந்தி மகிழ்ச்சியாக இருக்கிறது",
        r: "iṅkum aṅkum nīnti makiḻcciyāka irukkiṟatu",
        e: "yóu-lái-yóu-qù என்றால் 'இங்கும் அங்கும் நீந்து'; lè-yōu-yōu என்றால் 'மகிழ்ச்சியான, கவலையற்ற'."
      },
      th: {
        s: "ว่ายไปว่ายมาช่างสุขใจเบิกบาน",
        r: "wai pai wai ma chang suk jai boek ban",
        e: "yóu-lái-yóu-qù แปลว่า ว่ายไปว่ายมา; lè-yōu-yōu แปลว่า สบายใจ มีความสุข"
      },
      km: {
        s: "ហែលទៅហែលមកយ៉ាងសប្បាយរីករាយ។",
        r: "heel tɨw heel mɔɔk yɨəŋ sɑbbaay riikriəy.",
        e: "គឺហែលទៅមក; គឺសប្បាយចិត្ត។"
      },
      vi: {
        s: "Bơi qua bơi lại thật vui vẻ.",
        r: "",
        e: "là bơi qua bơi lại; là vui vẻ thảnh thơi."
      },
      id: {
        s: "Berenang ke sana ke mari dengan riang.",
        r: "",
        e: "artinya berenang ke sana ke mari; artinya riang gembira."
      },
      ne: {
        s: "यताउता पौडँदै रमाइलो मान्दै।",
        r: "yatā-utā pauḍãdai ramāilo māndai.",
        e: "भनेको यताउता पौडनु; भनेको आनन्दित हुनु हो।"
      },
      bn: {
        s: "ঘুরে ঘুরে সাঁতরে বেড়ায় আনন্দে",
        r: "ghure ghure sām̐tare beṛāẏ ānande",
        e: "এদিক-ওদিক সাঁতার কেটে আনন্দে ঘুরে বেড়ায়। অর্থ খুশি ও নিরুদ্বেগ।"
      },
      es: {
        s: "Nadan de aquí para allá, felices y sin penas",
        r: "",
        e: "Nadan felices de un lado a otro, sin preocupaciones."
      },
      en: {
        s: "Swimming back and forth, happy and carefree",
        r: "",
        e: "yóu-lái-yóu-qù means 'swimming here and there'; lè-yōu-yōu means 'joyful and carefree' — the repeated yōu-yōu (yōuyōu) suggests a relaxed, swaying feeling."
      },
      de: {
        s: "Hin und her, so sorgenfrei und froh",
        r: "",
        e: "Sie schwimmen froh hin und her, ganz ohne Sorgen."
      },
      my: {
        s: "ဒီဘက်ဟိုဘက် ကူးရင်း ပျော်နေတယ်",
        r: "di-bet ho-bet ku-yin pyaw-nay-dal",
        e: "ဒီဘက်ဟိုဘက် ကူးရင်း ပျော်ရွှင်နေတယ်။ စိုးရိမ်မှုကင်းတဲ့ ပျော်ရွှင်မှုကို ဖော်ပြတယ်။"
      },
      ko: {
        s: "왔다 갔다 헤엄치며 즐겁구나.",
        r: "Watda gatda heeomchimyeo jeulgeopgune.",
        e: "는 이리저리 헤엄친다는 뜻이다; 는 근심 없이 즐거운 느낌을 나타낸다."
      },
      ja: {
        s: "行ったり来たり泳いで、のんびり楽しい。",
        r: "Ittari kitari oyoide, nonbiri tanoshii.",
        e: "あちこち泳ぐという意味である; のんびりした楽しい気持ちを表す。"
      },
      si: {
        s: "එහා මෙහා පිහිනමින් සතුටින්.",
        r: "Eha meha pihinamin satutin.",
        e: "යනු එහා මෙහා පිහිනනවා යන්නයි; යනු කරදර නැති සතුටු හැඟීමයි."
      },
      fa: {
        s: "این‌سو و آن‌سو شنا می‌کنند، شاد و بی‌خیال.",
        r: "In-su o ân-su shenâ mikonand, shâd o bi-xiyâl.",
        e: "یعنی این‌سو و آن‌سو شنا کردن؛ احساس شادی بی‌خیال را می‌رساند."
      }
    },
    {
      hi: {
        s: "थक गई तो जल-घास पर लेट जाती है",
        r: "thak gaī to jal-ghās par leṭ jātī hai",
        e: "juàn-le का मतलब है 'थक गई तो'; wò का मतलब है 'लेट जाना'; shuǐ-cǎo का मतलब है 'पानी की घास'।"
      },
      ta: {
        s: "சோர்வானால் நீர்ச்செடிகளில் படுத்து ஓய்வெடுக்கும்",
        r: "cōrvāṉāl nīrccetaḷil paṭuttu ōyveṭukkum",
        e: "juàn-le என்றால் 'சோர்வானால்'; wò என்றால் 'படுத்து ஓய்வெடு'; shuǐ-cǎo என்றால் 'நீர்த்தாவரங்கள்'."
      },
      th: {
        s: "เหนื่อยแล้วก็นอนพักบนหญ้าน้ำ",
        r: "nueai laeo ko non phak bon ya nam",
        e: "juàn-le แปลว่า เมื่อเหนื่อย; wò แปลว่า นอนลง; shuǐ-cǎo แปลว่า พืชน้ำหรือหญ้าน้ำ"
      },
      km: {
        s: "ហត់ហើយក៏សម្រាកលើស្មៅទឹក,",
        r: "hɑt haəy kɑɑ sɑmreak ləə smaaw tɨk,",
        e: "គឺហត់នឿយ; គឺដេកលើស្មៅក្នុងទឹក។"
      },
      vi: {
        s: "Mệt rồi nằm nghỉ trên cỏ nước,",
        r: "",
        e: "là mệt mỏi; là nằm trên cỏ dưới nước."
      },
      id: {
        s: "Lelah lalu berbaring di rumput air,",
        r: "",
        e: "artinya lelah; artinya berbaring di rumput air."
      },
      ne: {
        s: "थाकेपछि पानीको झारमा सुत्छन्,",
        r: "thākepachhi pānīko jhāramā sutchhan,",
        e: "भनेको थाक्नु; भनेको पानीको झारमा सुत्नु हो।"
      },
      bn: {
        s: "ক্লান্ত হলে জলজ ঘাসে শুয়ে পড়ে",
        r: "klānta hale jalaj ghāse śuẏe paṛe",
        e: "ক্লান্ত হলে জলজ ঘাসের মধ্যে শুয়ে বিশ্রাম নেয়।"
      },
      es: {
        s: "Cansados, se acuestan en las algas",
        r: "",
        e: "Si se cansan, descansan acostados entre las algas."
      },
      en: {
        s: "When tired, it rests on the water grass",
        r: "",
        e: "juàn-le means 'when tired' (le marks a new state); wò means 'to lie down'; shuǐ-cǎo means 'water plants'."
      },
      de: {
        s: "Müde ruhen sie im Wassergraut",
        r: "",
        e: "Wenn sie müde sind, ruhen sie im Wassergras."
      },
      my: {
        s: "မောရင် ရေညှိတွေကြား လှဲနားတယ်",
        r: "maw-yin yay-hnyi-dwe-kya hle-na-day",
        e: "မောလာရင် ရေညှိတွေကြားမှာ လှဲပြီး နားတယ်။"
      },
      ko: {
        s: "피곤하면 수초에 누워.",
        r: "Pigonhamyeon suchoye nuwo.",
        e: "는 피곤할 때라는 뜻이다; 는 눕는다는 뜻이다; 는 물풀이다."
      },
      ja: {
        s: "疲れたら水草に横たわる。",
        r: "Tsukaretara mizukusa ni yokotawaru.",
        e: "疲れた時という意味である; 横たわるという意味である; 水草である。"
      },
      si: {
        s: "වෙහෙසට පත් වූ විට දිය පැළෑටි මත නිදාගනියි.",
        r: "Vehesata pat vu vita diya palati mata nidaganiyi.",
        e: "යනු වෙහෙස වූ විට යන්නයි; යනු නිදාගන්නවා යන්නයි; යනු දිය පැළෑටියි."
      },
      fa: {
        s: "خسته که شدند روی علف‌های آبی دراز می‌کشند.",
        r: "Xaste ke shodand rouy-e alaf-hâ-ye âbi derâz mikeshand.",
        e: "یعنی وقتی خسته شدند؛ یعنی دراز کشیدن؛ یعنی علف آبی."
      }
    },
    {
      hi: {
        s: "भूख लगी तो छोटे-छोटे कीड़े खोजती है",
        r: "bhūkh lagī to chhoṭe-chhoṭe kīṛe khojtī hai",
        e: "è-le का मतलब है 'भूख लगी तो'; mì का मतलब है 'खोजना'; xiǎo-chóng का मतलब है 'छोटे कीड़े'।"
      },
      ta: {
        s: "பசித்தால் சிறு பூச்சிகளைத் தேடும்",
        r: "pacittāl ciṟu pūccikaḷait tēṭum",
        e: "è-le என்றால் 'பசித்தால்'; mì என்றால் 'தேடு'; xiǎo-chóng என்றால் 'சிறு பூச்சிகள்'."
      },
      th: {
        s: "หิวแล้วก็หาหนอนตัวเล็ก ๆ กิน",
        r: "hio laeo ko ha non tua lek lek kin",
        e: "è-le แปลว่า เมื่อหิว; mì แปลว่า ค้นหา; xiǎo-chóng แปลว่า แมลงตัวเล็ก ๆ"
      },
      km: {
        s: "ឃ្លានហើយក៏រកសត្វល្អិតតូចៗស៊ី។",
        r: "khlien haəy kɑɑ rɔɔk sɑt lʔɨt touc-touc sii.",
        e: "គឺឃ្លាន; គឺរកសត្វល្អិតតូចៗ។"
      },
      vi: {
        s: "Đói rồi tìm sâu bọ nhỏ ăn.",
        r: "",
        e: "là đói bụng; là tìm côn trùng nhỏ."
      },
      id: {
        s: "Lapar lalu mencari serangga kecil.",
        r: "",
        e: "artinya lapar; artinya mencari serangga kecil."
      },
      ne: {
        s: "भोक लागेपछि साना कीरा खोज्छन्।",
        r: "bhok lāgepachhi sānā kīrā khojchhan.",
        e: "भनेको भोक लाग्नु; भनेको साना कीरा खोज्नु हो।"
      },
      bn: {
        s: "ক্ষুধা লাগলে ছোট পোকা খুঁজে খায়",
        r: "kṣudhā lāgle chōṭa pōkā khum̐je khāẏ",
        e: "ক্ষুধা লাগলে ছোট পোকামাকড় খুঁজে খায়। অর্থ খোঁজা।"
      },
      es: {
        s: "Hambrientos, buscan bichitos",
        r: "",
        e: "Con hambre, buscan insectos pequeños para comer."
      },
      en: {
        s: "When hungry, it looks for little bugs",
        r: "",
        e: "è-le means 'when hungry'; mì means 'to seek, look for'; xiǎo-chóng means 'little insects'."
      },
      de: {
        s: "Hungrig suchen sie kleine Würmchen",
        r: "",
        e: "Hungrig suchen sie nach kleinen Insekten zum Fressen."
      },
      my: {
        s: "ဆာရင် ပိုးကောင်လေးတွေ ရှာစားတယ်",
        r: "hsa-yin po-kaun-lay-dwe sha-sa-day",
        e: "ဆာလာရင် ပိုးကောင်လေးတွေ ရှာပြီး စားတယ်။"
      },
      ko: {
        s: "배고프면 작은 벌레를 찾아 먹어.",
        r: "Baegopeumyeon jageun beollereul chaja meogeo.",
        e: "는 배고플 때라는 뜻이다; 는 찾는다는 뜻이다; 은 작은 벌레이다."
      },
      ja: {
        s: "お腹がすいたら小さな虫を探す。",
        r: "Onaka ga suitara chiisana mushi o sagasu.",
        e: "お腹がすいた時という意味である; 探すという意味である; 小さな虫である。"
      },
      si: {
        s: "බඩගිනි වූ විට පොඩි කෘමීන් සොයයි.",
        r: "Badagini vu vita podi krumin soyayi.",
        e: "යනු බඩගිනි වූ විට යන්නයි; යනු සොයනවා යන්නයි; යනු පොඩි කෘමීන්ය."
      },
      fa: {
        s: "گرسنه که شدند حشره‌های کوچک پیدا می‌کنند.",
        r: "Gorosne ke shodand hashare-hâ-ye kouchak peydâ mikonand.",
        e: "یعنی وقتی گرسنه شدند؛ یعنی پیدا کردن؛ یعنی حشره کوچک."
      }
    },
    {
      hi: {
        s: "बहुत खुश, बहुत खुश",
        r: "bahut khuś, bahut khuś",
        e: "lè-yōu-yōu का मतलब है 'बहुत खुश और बेफिक्र'; दोहराने से गाना और मज़ेदार लगता है।"
      },
      ta: {
        s: "மகிழ்ச்சியாக, மகிழ்ச்சியாக",
        r: "makiḻcciyāka, makiḻcciyāka",
        e: "lè-yōu-yōu என்றால் 'மகிழ்ச்சியாக, கவலையற்று'; மீண்டும் சொல்வது பாடலை உற்சாகமாக்குகிறது."
      },
      th: {
        s: "สุขใจจริง ๆ สุขใจจริง ๆ",
        r: "suk jai jing jing suk jai jing jing",
        e: "lè-yōu-yōu แปลว่า สบายใจมีความสุข; การพูดซ้ำทำให้เพลงสนุกขึ้น"
      },
      km: {
        s: "សប្បាយរីករាយ, សប្បាយរីករាយ,",
        r: "sɑbbaay riikriəy, sɑbbaay riikriəy,",
        e: "គឺសប្បាយចិត្តយ៉ាងខ្លាំង (ពាក្យដដែលៗដើម្បីច្រៀង)។"
      },
      vi: {
        s: "Vui vẻ, vui vẻ,",
        r: "",
        e: "là vui vẻ thảnh thơi (lặp lại để hát)."
      },
      id: {
        s: "Riang gembira, riang gembira,",
        r: "",
        e: "artinya riang gembira (diulang untuk dinyanyikan)."
      },
      ne: {
        s: "रमाइलो, रमाइलो,",
        r: "ramāilo, ramāilo,",
        e: "भनेको आनन्दित हुनु (गाउनका लागि दोहोरिएको) हो।"
      },
      bn: {
        s: "আনন্দে, আনন্দে",
        r: "ānande, ānande",
        e: "আনন্দ আর নিরুদ্বেগের পুনরাবৃত্ত প্রকাশ।"
      },
      es: {
        s: "Felices, felices",
        r: "",
        e: "Repite la alegría y la despreocupación."
      },
      en: {
        s: "Happy and carefree, happy and carefree",
        r: "",
        e: "lè-yōu-yōu means 'happy and carefree'; repeating it makes the song cheerful and easy to sing."
      },
      de: {
        s: "Froh und frei, froh und frei",
        r: "",
        e: "Wiederholung der Freude und Sorglosigkeit."
      },
      my: {
        s: "ပျော်ပျော်၊ ပျော်ပျော်",
        r: "pyaw-pyaw, pyaw-pyaw",
        e: "ပျော်ရွှင်မှုကို ထပ်ခါထပ်ခါ ဖော်ပြတယ်။"
      },
      ko: {
        s: "즐겁구나, 즐겁구나,",
        r: "Jeulgeopgune, jeulgeopgune,",
        e: "는 즐겁고 근심 없다는 후렴으로, 글자 그대로의 뜻보다 기쁨을 나타낸다."
      },
      ja: {
        s: "楽しいな、楽しいな、",
        r: "Tanoshii na, tanoshii na,",
        e: "楽しくのんびりしたリフレインで、文字通りの意味より喜びを表す。"
      },
      si: {
        s: "සතුටින්, සතුටින්,",
        r: "Satutin, satutin,",
        e: "යනු සතුටු කරදර නැති පද වැලකි; වචනාර්ථයට වඩා සතුට පළ කරයි."
      },
      fa: {
        s: "شاد و خوش، شاد و خوش،",
        r: "Shâd o xosh, shâd o xosh,",
        e: "ترجیع‌بند شاد و بی‌خیال است؛ بیشتر شادی را می‌رساند تا معنای لفظی."
      }
    },
    {
      hi: {
        s: "काँच जैसी साफ़ दुनिया में कितनी आज़ादी है",
        r: "kāṅch jaisī sāf duniyā meṅ kitnī āzādī hai",
        e: "shuǐ-jīng का मतलब है 'काँच / स्फटिक' (यहाँ साफ़ पानी को दर्शाता है); shì-jiè का मतलब है 'दुनिया'; zì-yóu का मतलब है 'आज़ादी'।"
      },
      ta: {
        s: "படிக உலகில் எவ்வளவு சுதந்திரம்!",
        r: "paṭika ulakil evvaḷavu cutantiram!",
        e: "shuǐ-jīng என்றால் 'படிகம்' (இங்கு தெளிந்த நீரைக் குறிக்கிறது); shì-jiè என்றால் 'உலகம்'; zì-yóu என்றால் 'சுதந்திரம்'."
      },
      th: {
        s: "โลกใสดั่งคริสตัลอิสระเหลือเกิน",
        r: "lok sai dang khrit sat itsara luea koen",
        e: "shuǐ-jīng แปลว่า คริสตัล (ในที่นี้หมายถึงน้ำใส); shì-jiè แปลว่า โลก; zì-yóu แปลว่า อิสระ"
      },
      km: {
        s: "ពិភពក្នុងទឹកថ្លាដូចកញ្ចក់ពិតជាសេរី។",
        r: "piipup knong tɨk tʰlaa douch kɑɲcɑk pət cee səyrii.",
        e: "គឺពិភពក្នុងទឹកថ្លា; គឺសេរីពិតប្រាកដ។"
      },
      vi: {
        s: "Thế giới trong vắt dưới nước thật tự do.",
        r: "",
        e: "là thế giới trong suốt dưới nước; là thật tự do."
      },
      id: {
        s: "Dunia sebening kristal di air sungguh bebas.",
        r: "",
        e: "artinya dunia sebening kristal di air; artinya sungguh bebas."
      },
      ne: {
        s: "स्फटिकजस्तो संसार साँच्चै स्वतन्त्र छ।",
        r: "sphaṭikajastо sansār sā̃ccai swatantra chha.",
        e: "भनेको स्फटिकजस्तो सफा पानीको संसार; भनेको साँच्चै स्वतन्त्र हो।"
      },
      bn: {
        s: "স্ফটিক-জগতে সত্যিই স্বাধীন",
        r: "sphaṭik-jagate satyi svādhīn",
        e: "পানির জগৎ স্ফটিকের মতো স্বচ্ছ, সেখানে মাছ সত্যিই স্বাধীন।"
      },
      es: {
        s: "En el mundo de cristal, ¡qué libres son!",
        r: "",
        e: "El agua es como un cristal transparente; los peces son verdaderamente libres."
      },
      en: {
        s: "In this crystal world, so free!",
        r: "",
        e: "shuǐ-jīng means 'crystal' (here it describes the clear water); shì-jiè means 'world'; zì-yóu means 'free, freedom'."
      },
      de: {
        s: "In der Kristallwelt so wahrhaft frei",
        r: "",
        e: "Das Wasser ist wie Kristall; die Fische sind wahrhaft frei."
      },
      my: {
        s: "မှန်ကြည်လောကမှာ တကယ့်လွတ်လပ်တယ်",
        r: "hman-kyi-lawka-hma ta-ke lut-lat-day",
        e: "ရေလောကဟာ မှန်လိုကြည်လင်တယ်၊ အဲဒီမှာ ငါးတွေက တကယ့်ကို လွတ်လပ်တယ်။"
      },
      ko: {
        s: "수정 같은 세상, 정말 자유로워.",
        r: "Sujeong gateun sesang, jeongmal jayurowo.",
        e: "는 맑은 물을 수정에 비유한 말이다; 는 정말 자유롭다는 뜻이다."
      },
      ja: {
        s: "水晶の世界は本当に自由だ。",
        r: "Suishō no sekai wa hontō ni jiyū da.",
        e: "澄んだ水を水晶に例えた言葉である; 本当に自由という意味である。"
      },
      si: {
        s: "පළිඟු ලෝකය ඇත්තටම නිදහස්.",
        r: "Palingu lokaya attatama nidahas.",
        e: "යනු පැහැදිලි වතුර පළිඟුවට සමාන කළ වචනයයි; යනු ඇත්තටම නිදහස් යන්නයි."
      },
      fa: {
        s: "دنیای بلورین واقعاً آزاد است.",
        r: "Donyâ-ye bolourin vâghe'an âzâd ast.",
        e: "آب زلال را به بلور تشبیه کرده است؛ یعنی واقعاً آزاد."
      }
    }
  ],
  woniu: [
    {
      hi: {
        s: "आमेन आकियान, एक अंगूर की बेल",
        r: "āmen āqiyān, ek aṅgūr kī bel",
        e: "ā-mén-ā-qián का कोई अर्थ नहीं है; यह गाने की धुन के लिए जोड़ा गया प्यारा शब्द है (chèn-cí); yī-kē-pú-táo-shù का मतलब है 'एक अंगूर की बेल' (kē पेड़ों की गिनती का शब्द है)।"
      },
      ta: {
        s: "அ-மென் அ-கியான், ஒரு திராட்சைச் செடி",
        r: "a-meṉ a-kiyāṉ, oru tirāṭcaic ceti",
        e: "ā-mén-ā-qián என்பதற்கு அர்த்தம் இல்லை; இது பாடல் இசைக்காகச் சேர்க்கப்பட்ட சொல் (chèn-cí); yī-kē-pú-táo-shù என்றால் 'ஒரு திராட்சைச் செடி'."
      },
      th: {
        s: "อาเหมิน อาเฉียน เถาองุ่นหนึ่งต้น",
        r: "a men a chian thao ongun neung ton",
        e: "ā-mén-ā-qián ไม่มีความหมาย เป็นคำเติมเพื่อให้เข้าทำนองเพลง (chèn-cí); yī-kē-pú-táo-shù แปลว่า เถาองุ่นหนึ่งต้น"
      },
      km: {
        s: "អាម៉ឹន អាមុខ ដើមទំពាំងបាយជូរមួយដើម",
        r: "aamɨn aamuk dəəm tɔmpiaŋ-baaycuu muəy dəəm",
        e: "ជាពាក្យសម្រាប់ច្រៀង គ្មានន័យពិត; គឺដើមទំពាំងបាយជូរ។"
      },
      vi: {
        s: "A-môn a-tiền, một cây nho",
        r: "",
        e: "là từ đệm khi hát, không có nghĩa thực; là cây nho."
      },
      id: {
        s: "A-men a-qian, sebatang pohon anggur",
        r: "",
        e: "adalah kata pelengkap nyanyian, tidak ada arti; artinya pohon anggur."
      },
      ne: {
        s: "अमन अछ्यान, अङ्गुरको एउटा बोट",
        r: "aman achhyān, aṅgurko euṭā boṭ",
        e: "गाउनका लागि थपिएका शब्द हुन्, वास्तविक अर्थ छैन; भनेको अङ्गुरको बोट हो।"
      },
      bn: {
        s: "আমেন আছেন, একটি আঙুরগাছ",
        r: "āmen āchen, ekṭi āṁgurgāch",
        e: "「আমেন আছেন」 অর্থহীন গানের পদাংশ, মজার জন্য গাওয়া হয়। এখানে একটি আঙুরগাছের কথা বলা হচ্ছে।"
      },
      es: {
        s: "A men, a qian: una parra",
        r: "",
        e: "«A men, a qian» son palabras de relleno sin significado, cantadas por diversión. Aquí hay una parra."
      },
      en: {
        s: "Ah-men ah-qian, a grapevine",
        r: "",
        e: "ā-mén-ā-qián has no meaning — it is a filler word (chèn-cí) added for the melody of the children's song; yī-kē-pú-táo-shù means 'a grapevine' (kē is the measure word for trees)."
      },
      de: {
        s: "A men, a qian: ein Weinstock",
        r: "",
        e: "«A men, a qian» sind sinnlose Füllwörter zum Spaß. Hier steht ein Weinstock."
      },
      my: {
        s: "အာမင် အာချန်၊ စပျစ်ပင်တစ်ပင်",
        r: "a-min a-chan, sa-pyit-pin-ta-pin",
        e: "「အာမင် အာချန်」ဟာ အဓိပ္ပာယ်မရှိတဲ့ သီချင်းအပိုစကား၊ ပျော်ဖို့ သီဆိုတယ်။ ဒီမှာ စပျစ်ပင်တစ်ပင် ရှိတယ်။"
      },
      ko: {
        s: "아먼 아첸, 포도나무 한 그루",
        r: "A-meon a-chen, podonamu han geuru",
        e: "은 뜻이 없는 리듬 맞추기 소리이다; 는 포도나무 한 그루라는 뜻이다."
      },
      ja: {
        s: "アーメン アーチェン、一本のブドウの木",
        r: "Āmen āchen, ippon no budō no ki",
        e: "意味のないリズム合わせの音である; ブドウの木一本という意味である。"
      },
      si: {
        s: "අමෙන් අචෙන් මිදි වැලක්",
        r: "Amen achen midi valak",
        e: "යනු තේරුමක් නැති රිද්මයට කියන ශබ්දයකි; යනු මිදි වැලක් යන්නයි."
      },
      fa: {
        s: "آمن آچن، یک درخت انگور",
        r: "Âman âchan, yek deraxt-e angour",
        e: "صدای ریتمیک بی‌معناست؛ یعنی یک درخت انگور."
      }
    },
    {
      hi: {
        s: "आनेन आनेन, हरी-हरी नई कोंपलें फूटी हैं",
        r: "ānen ānen, harī-harī naī kompleṅ phūṭī haiṅ",
        e: "ā-nèn-ā-nèn chèn-cí है, इसका कोई अर्थ नहीं; lǜ-de-gāng-fā-yá का मतलब है 'हरी कोंपलें अभी-अभी फूटी हैं'।"
      },
      ta: {
        s: "அ-நென் அ-நென், பசுமையாக இப்போதுதான் துளிர்த்தது",
        r: "a-neṉ a-neṉ, pacumaiyāka ippōtutāṉ tuḷirttatu",
        e: "ā-nèn-ā-nèn என்பது அர்த்தமற்ற சொல் (chèn-cí); lǜ-de-gāng-fā-yá என்றால் 'பசுமையாக இப்போதுதான் துளிர்த்தது'."
      },
      th: {
        s: "อาเนิ่น อาเนิ่น เขียวชอุ่มเพิ่งแตกยอด",
        r: "a noen a noen khiao cha-um phoeng taek yot",
        e: "ā-nèn-ā-nèn เป็นคำเติมไม่มีความหมาย (chèn-cí); lǜ-de-gāng-fā-yá แปลว่า เขียวสดเพิ่งแตกหน่อ"
      },
      km: {
        s: "អាណឹន អាណឹន ពណ៌បៃតងទើបនឹងដុះពន្លក",
        r: "aanɨn aanɨn pɔɔ biey-tɑng təəb nɨŋ duh pʊnlʊək",
        e: "ជាពាក្យសម្រាប់ច្រៀង; គឺពណ៌បៃតងទើបដុះពន្លក។"
      },
      vi: {
        s: "A-nộn a-nộn, màu xanh vừa nảy mầm",
        r: "",
        e: "là từ đệm; là màu xanh vừa nảy mầm."
      },
      id: {
        s: "A-nen a-nen, hijau baru bertunas",
        r: "",
        e: "adalah kata pelengkap; artinya hijau baru bertunas."
      },
      ne: {
        s: "अनन अनन, हरियो भर्खरै पलाएको",
        r: "anan anan, hariyo bharkharai palāeko",
        e: "गाउनका लागि थपिएका शब्द हुन्; भनेको हरियो भर्खरै पलाउनु हो।"
      },
      bn: {
        s: "আনেন আনেন, সবুজ সবে অঙ্কুরিত",
        r: "ānen ānen, sabuj sabe aṁkurita",
        e: "「আনেন আনেন」 অর্থহীন পদাংশ। সবুজ পাতা সবে গজিয়েছে।"
      },
      es: {
        s: "A nen, a nen: verde, recién brotado",
        r: "",
        e: "«A nen, a nen» no tiene significado. Las hojas verdes acaban de brotar."
      },
      en: {
        s: "Ah-nen ah-nen, green and just sprouted",
        r: "",
        e: "ā-nèn-ā-nèn is a filler word with no meaning; lǜ-de-gāng-fā-yá means 'green and just sprouted'."
      },
      de: {
        s: "A nen, a nen: grün, frisch gekeimt",
        r: "",
        e: "«A nen, a nen» ist bedeutungslos. Grünes Laub ist gerade gekeimt."
      },
      my: {
        s: "အာနန် အာနန်၊ စိမ်းလန်းပြီး အညွန့်ထွက်စ",
        r: "a-nan a-nan, sein-lan-pyi a-nyunt-htwet-sa",
        e: "「အာနန် အာနန်」ဟာ အဓိပ္ပာယ်မရှိဘူး။ စိမ်းလန်းတဲ့ အရွက်တွေ အညွန့်ထွက်စပဲ ရှိသေးတယ်။"
      },
      ko: {
        s: "아넌 아넌, 파릇파릇 새싹이 돋아나",
        r: "A-neon a-neon, parut-parut saessagi dodana",
        e: "은 뜻 없는 리듬 소리이다; 는 파릇하게 새싹이 돋았다는 뜻이다."
      },
      ja: {
        s: "アーネン アーネン、緑が芽吹いたばかり",
        r: "Ānen ānen, midori ga mebukita bakari",
        e: "意味のないリズムの音である; 緑が芽吹いたばかりという意味である。"
      },
      si: {
        s: "අනෙන් අනෙන් කොළ පාටින් අලුතෙන් පැළවී",
        r: "Anen anen kola patin aluten palavi",
        e: "යනු තේරුමක් නැති රිද්ම ශබ්දයකි; යනු කොළ පාටින් අලුතෙන් පැළවුණා යන්නයි."
      },
      fa: {
        s: "آنن آنن، سبز تازه جوانه زده",
        r: "Ânan ânan, sabz-e tâze javâne zade",
        e: "صدای ریتمیک بی‌معناست؛ یعنی سبز تازه جوانه زده است."
      }
    },
    {
      hi: {
        s: "घोंघा अपने भारी-भारी खोल को पीठ पर ढोता है",
        r: "ghoṅghā apne bhārī-bhārī khol ko pīṭh par ḍhotā hai",
        e: "wō-niú का मतलब है 'घोंघा'; bēi-zhe का मतलब है 'पीठ पर उठाना'; zhòng-zhòng-de का मतलब है 'बहुत भारी' (दोहराने से ज़ोर बढ़ता है); ké का मतलब है 'खोल'।"
      },
      ta: {
        s: "நத்தை தன் கனமான ஓட்டை முதுகில் சுமக்கிறது",
        r: "nattai taṉ kaṉamāṉa ōṭṭai mutukil cumakkiṟatu",
        e: "wō-niú என்றால் 'நத்தை'; bēi-zhe என்றால் 'முதுகில் சுமத்தல்'; zhòng-zhòng-de என்றால் 'மிகவும் கனமான'; ké என்றால் 'ஓடு'."
      },
      th: {
        s: "หอยทากแบกเปลือกหนัก ๆ ไว้บนหลัง",
        r: "hoi thak baek plueak nak nak wai bon lang",
        e: "wō-niú แปลว่า หอยทาก; bēi-zhe แปลว่า แบกบนหลัง; zhòng-zhòng-de แปลว่า หนักมาก ๆ; ké แปลว่า เปลือก"
      },
      km: {
        s: "ខ្យងខ្ចៅកំពុងផ្ទុកសម្បកធ្ងន់ៗ",
        r: "kʰyɑng kʰcaw kɑmpuŋ pʰtuk sɑmbɑk tʰŋɨn-tʰŋɨn",
        e: "គឺខ្យង; គឺផ្ទុកសម្បកធ្ងន់។"
      },
      vi: {
        s: "Ốc sên mang trên lưng chiếc vỏ nặng trĩu",
        r: "",
        e: "là ốc sên; là mang chiếc vỏ nặng trên lưng."
      },
      id: {
        s: "Siput memanggul cangkang yang berat",
        r: "",
        e: "artinya siput; artinya memanggul cangkang yang berat."
      },
      ne: {
        s: "शङ्खेकीरा गह्रौँ खोल ओढेर",
        r: "śaṅkhekīrā gahraũ khol oḍhera",
        e: "भनेको शङ्खेकीरा; भनेको गह्रौँ खोल बोक्नु हो।"
      },
      bn: {
        s: "শামুক তার ভারী খোলস পিঠে বহন করে",
        r: "śāmuk tār bhārī khōlas piṭhe bahan kare",
        e: "শামুক তার ভারী খোলস পিঠে বহন করে, তাই ধীরে চলে।"
      },
      es: {
        s: "El caracol carga su pesada concha",
        r: "",
        e: "El caracol lleva su pesada concha a cuestas, por eso va despacio."
      },
      en: {
        s: "The snail carries its heavy, heavy shell on its back",
        r: "",
        e: "wō-niú means 'snail'; bēi-zhe means 'carrying on the back'; zhòng-zhòng-de means 'very heavy' (the doubled zhòng adds emphasis); ké means 'shell'."
      },
      de: {
        s: "Die Schnecke trägt ihr schweres Haus",
        r: "",
        e: "Die Schnecke trägt ihr schweres Schneckenhaus, darum ist sie langsam."
      },
      my: {
        s: "ခရုက သူ့ရဲ့ လေးလံတဲ့ အခွံကို ကျောပေါ်ထမ်းထားတယ်",
        r: "kha-yu ka thu-ye lay-lan-de a-khwin-ko kyaw-paw htan-hta-day",
        e: "ခရုဟာ သူ့ရဲ့ လေးလံတဲ့ အခွံကို ကျောပေါ်မှာ ထမ်းထားတယ်၊ ဒါကြောင့် နှေးနှေးသွားတယ်။"
      },
      ko: {
        s: "달팽이가 무거운 껍데기를 짊어지고",
        r: "Dalpaengiga mugeoun kkeopdegireul jjilmeojigo",
        e: "는 달팽이라는 뜻이다; 는 등에 진다는 뜻이다; 은 무거운 껍데기이다."
      },
      ja: {
        s: "カタツムリは重い殻を背負って",
        r: "Katatsumuri wa omoi kara o seotte",
        e: "カタツムリという意味である; 背負うという意味である; 重い殻である。"
      },
      si: {
        s: "ගොළුබෙල්ලා බර කටුව කර මත තබාගෙන",
        r: "Golubella bara katuva kara mata tabagena",
        e: "යනු ගොළුබෙල්ලා යන්නයි; යනු කර මත තබාගන්නවා යන්නයි; යනු බර කටුවයි."
      },
      fa: {
        s: "حلزون آن صدف سنگین را به دوش می‌کشد",
        r: "Halazoun ân sadaf-e sangin râ be doush mikeshed",
        e: "یعنی حلزون؛ یعنی به دوش کشیدن؛ یعنی صدف سنگین."
      }
    },
    {
      hi: {
        s: "एक-एक कदम करके ऊपर चढ़ता है",
        r: "ek-ek kadam karke ūpar chaṛhtā hai",
        e: "yī-bù-yī-bù का मतलब है 'एक-एक कदम'; wǎng-shàng-pá का मतलब है 'ऊपर की ओर चढ़ना'।"
      },
      ta: {
        s: "ஒவ்வொரு அடியாக மேலே ஏறுகிறது",
        r: "ovvoru aṭiyāka mēlē ēṟukiṟatu",
        e: "yī-bù-yī-bù என்றால் 'ஒவ்வொரு அடியாக'; wǎng-shàng-pá என்றால் 'மேலே ஏறு'."
      },
      th: {
        s: "ก้าวทีละก้าวปีนขึ้นไปข้างบน",
        r: "kao thi la kao pin khuen pai khang bon",
        e: "yī-bù-yī-bù แปลว่า ทีละก้าว; wǎng-shàng-pá แปลว่า ปีนขึ้นไปข้างบน"
      },
      km: {
        s: "មួយជំហានៗឡើងទៅលើ",
        r: "muəy cʊmhien-muəy cʊmhien ləəng tɨw ləə",
        e: "គឺមួយជំហានម្តងៗ; គឺឡើងទៅលើ។"
      },
      vi: {
        s: "Từng bước từng bước bò lên trên",
        r: "",
        e: "là từng bước một; là bò lên trên."
      },
      id: {
        s: "Selangkah demi selangkah merangkak naik",
        r: "",
        e: "artinya selangkah demi selangkah; artinya merangkak naik."
      },
      ne: {
        s: "एकएक पाइला गर्दै माथि चढ्दै",
        r: "ek-ek pāilā gardai māthi chaḍhdai",
        e: "भनेको एकएक पाइला; भनेको माथि चढ्नु हो।"
      },
      bn: {
        s: "এক পা এক পা করে উপরে ওঠে",
        r: "ek pā ek pā kare upare ōṭhe",
        e: "ধাপে ধাপে উপরের দিকে ওঠে। অর্থ ধীরে ধীরে।"
      },
      es: {
        s: "Paso a paso, sube hacia arriba",
        r: "",
        e: "Sube poco a poco, paso a paso."
      },
      en: {
        s: "Step by step, it climbs upward",
        r: "",
        e: "yī-bù-yī-bù means 'step by step'; wǎng-shàng-pá means 'to climb upward'."
      },
      de: {
        s: "Schritt für Schritt klettert sie hinauf",
        r: "",
        e: "Sie klettert Schritt für Schritt nach oben."
      },
      my: {
        s: "တစ်လှမ်းချင်း အပေါ်ကို တက်တယ်",
        r: "ta-hlan-chin a-paw-ko tet-day",
        e: "တစ်လှမ်းချင်း အပေါ်ကို တက်သွားတယ်။"
      },
      ko: {
        s: "한 걸음 한 걸음 위로 기어올라가",
        r: "Han georeum han georeum wiro gieo-ollaga",
        e: "는 한 걸음 한 걸음이라는 뜻이다; 는 위로 기어오른다는 뜻이다."
      },
      ja: {
        s: "一歩一歩上へ登っていく",
        r: "Ippo ippo ue e nobotte-iku",
        e: "一歩一歩という意味である; 上へ登っていくという意味である。"
      },
      si: {
        s: "පියවරෙන් පියවර ඉහළට බඩගා යයි",
        r: "Piyavaren piyavara ihalata badaga yayi",
        e: "යනු පියවරෙන් පියවර යන්නයි; යනු ඉහළට බඩගා යනවා යන්නයි."
      },
      fa: {
        s: "قدم به قدم به بالا می‌خزد",
        r: "Qadam be qadam be bâlâ mi-xazad",
        e: "یعنی قدم به قدم؛ یعنی به بالا خزیدن."
      }
    },
    {
      hi: {
        s: "आशू आशांग, दो पीली बुलबुलें",
        r: "āśū āśāṅg, do pīlī bulbuleṅ",
        e: "ā-shù-ā-shàng chèn-cí है, इसका कोई अर्थ नहीं; liǎng-zhī-huáng-lí-niǎo का मतलब है 'दो पीले रंग की चिड़ियाँ' (zhī चिड़ियों की गिनती का शब्द है)।"
      },
      ta: {
        s: "அ-ஷூ அ-ஷாங், இரண்டு மஞ்சள் பறவைகள்",
        r: "a-ṣū a-ṣāṅ, iraṇṭu mañcaḷ paṟavaikaḷ",
        e: "ā-shù-ā-shàng என்பது அர்த்தமற்ற சொல் (chèn-cí); liǎng-zhī-huáng-lí-niǎo என்றால் 'இரண்டு மஞ்சள் பாடும் பறவைகள்'."
      },
      th: {
        s: "อาซู่ อาซ่าง นกขมิ้นสองตัว",
        r: "a su a sang nok khamin song tua",
        e: "ā-shù-ā-shàng เป็นคำเติมไม่มีความหมาย (chèn-cí); liǎng-zhī-huáng-lí-niǎo แปลว่า นกขมิ้นสองตัว (huáng-lí คือนกสีเหลืองร้องเพลงเพราะ)"
      },
      km: {
        s: "អាស៊ូ អាសង់ បក្សីលឿងពីរក្បាល",
        r: "aasuu aasɑng bɑksəy lɨəng pii kbaal",
        e: "ជាពាក្យសម្រាប់ច្រៀង; គឺបក្សីពណ៌លឿង។"
      },
      vi: {
        s: "A-thụ a-thượng, hai chú chim vàng anh",
        r: "",
        e: "là từ đệm; là chim vàng anh."
      },
      id: {
        s: "A-shu a-shang, dua ekor burung kepodang",
        r: "",
        e: "adalah kata pelengkap; artinya burung kepodang (kuning)."
      },
      ne: {
        s: "अशु अशाङ, दुईवटा पहेँलो चरा",
        r: "aśu aśāṅ, duīwaṭā pahẽlo carā",
        e: "गाउनका लागि थपिएका शब्द हुन्; भनेको पहेँलो चरा हो।"
      },
      bn: {
        s: "আশু আশাং, দুটি হলুদ পাখি",
        r: "āśu āśāṁ, duṭi halud pākhi",
        e: "「আশু আশাং」 অর্থহীন পদাংশ। গাছে দুটি হলুদ ওরিওল পাখি আছে।"
      },
      es: {
        s: "A shu, a shang: dos orioles amarillos",
        r: "",
        e: "«A shu, a shang» no significa nada. Dos pájaros amarillos (orioles) están en el árbol."
      },
      en: {
        s: "Ah-shu ah-shang, two orioles",
        r: "",
        e: "ā-shù-ā-shàng is a filler word with no meaning; liǎng-zhī-huáng-lí-niǎo means 'two orioles' — huáng-lí is a yellow songbird, niǎo means 'bird', and zhī is the measure word for birds."
      },
      de: {
        s: "A shu, a shang: zwei gelbe Pirole",
        r: "",
        e: "«A shu, a shang» ist bedeutungslos. Zwei gelbe Pirole sitzen auf dem Baum."
      },
      my: {
        s: "အာရှု အာရှန်၊ ရွှေဝါရောင် ငှက်နှစ်ကောင်",
        r: "a-shu a-shan, shwe-wa-yaung hnget hna-kaun",
        e: "「အာရှု အာရှန်」ဟာ အဓိပ္ပာယ်မရှိဘူး။ သစ်ပင်ပေါ်မှာ ရွှေဝါရောင် ငှက် (oriole) နှစ်ကောင် ရှိတယ်။"
      },
      ko: {
        s: "아슈 아상, 꾀꼬리 두 마리",
        r: "A-syu a-sang, kkoekkori du mari",
        e: "은 뜻 없는 리듬 소리이다; 는 꾀꼬리 두 마리라는 뜻이다."
      },
      ja: {
        s: "アーシュー アーシャン、二羽のオリオール",
        r: "Āshū āshan, niwa no oriōru",
        e: "意味のないリズムの音である; オリオール二羽という意味である。"
      },
      si: {
        s: "අශු අසන් කහ කුරුල්ලන් දෙදෙනෙක්",
        r: "Ashu asan kaha kurullan dedenek",
        e: "යනු තේරුමක් නැති රිද්ම ශබ්දයකි; යනු කහ කුරුල්ලන් දෙදෙනෙක් යන්නයි."
      },
      fa: {
        s: "آشو آشان، دو پرنده زرد",
        r: "Âshou âshân, do parande-ye zard",
        e: "صدای ریتمیک بی‌معناست؛ یعنی دو پرنده زرد."
      }
    },
    {
      hi: {
        s: "अशी अशीहाहा, घोंघे को देखकर हँस रही हैं",
        r: "aśī aśīhāhā, ghoṅghe ko dekhkar haṅs rahī haiṅ",
        e: "ā-xī-ā-xī-hā-hā में xī-xī-hā-hā हँसी की आवाज़ है (chèn-cí); zài-xiào-tā का मतलब है 'उस (घोंघे) पर हँस रही हैं'।"
      },
      ta: {
        s: "அ-ஹி அ-ஹிஹாஹா, அதைப் பார்த்துச் சிரிக்கின்றன",
        r: "a-hi a-hihāhā, ataip pārttuc cirikkiṉṟaṉa",
        e: "ā-xī-ā-xī-hā-hā என்பதில் xī-xī-hā-hā என்பது சிரிப்பின் ஒலி (chèn-cí); zài-xiào-tā என்றால் 'அதைப் பார்த்துச் சிரித்தல்'."
      },
      th: {
        s: "อาซี อาซีฮาฮา กำลังหัวเราะเยาะมัน",
        r: "a si a si ha ha kamlang hua ro yao man",
        e: "ā-xī-ā-xī-hā-hā มีเสียงหัวเราะ ฮิฮิฮาฮา (chèn-cí); zài-xiào-tā แปลว่า กำลังหัวเราะเยาะมัน (หัวเราะเยาะหอยทาก)"
      },
      km: {
        s: "អាស៊ី អាស៊ីហាហា កំពុងសើចវា",
        r: "aasii aasii-haahaa kɑmpuŋ səɨc vie",
        e: "ជាសំឡេងសើច; គឺកំពុងសើចវា (សើចខ្យង)។"
      },
      vi: {
        s: "A-hi a-hi ha ha đang cười nó",
        r: "",
        e: "là tiếng cười; là đang cười nó (cười ốc sên)."
      },
      id: {
        s: "A-xi a-xi ha ha sedang menertawakannya",
        r: "",
        e: "adalah suara tawa; artinya menertawakannya (siput)."
      },
      ne: {
        s: "असी असीहाहा त्यसलाई हाँस्दै",
        r: "asī asīhāhā tyaslāī hā̃sdai",
        e: "हाँसोको आवाज हो; भनेको त्यसलाई (शङ्खेकीरालाई) हाँस्नु हो।"
      },
      bn: {
        s: "আহি আহি হাহা, তাকে নিয়ে হাসছে",
        r: "āhi āhi hāhā, tāke niẏe hāṁsche",
        e: "「আহি আহি হাহা」 হাসির শব্দের অনুকরণ। পাখিরা শামুককে নিয়ে হাসছে।"
      },
      es: {
        s: "A ji, a ji jajá: se ríen de él",
        r: "",
        e: "«A ji, a ji jajá» imita la risa. Los pájaros se burlan del caracol."
      },
      en: {
        s: "Ah-xi ah-xi-haha, laughing at it",
        r: "",
        e: "ā-xī-ā-xī-hā-hā contains xī-xī-hā-hā, the sound of laughing (a filler word); zài-xiào-tā means 'laughing at it (the snail)'."
      },
      de: {
        s: "A xi, a xi haha: sie lachen über sie",
        r: "",
        e: "«A xi, a xi haha» ahmt Lachen nach. Die Vögel lachen die Schnecke aus."
      },
      my: {
        s: "အာရှိ အာရှိ ဟားဟား၊ သူ့ကို ရယ်နေတယ်",
        r: "a-shi a-shi ha-ha, thu-ko yay-nay-day",
        e: "「အာရှိ အာရှိ ဟားဟား」ဟာ ရယ်သံတုပထားတာ။ ငှက်တွေက ခရုကို ရယ်မောနေတယ်။"
      },
      ko: {
        s: "아시 아시하하, 그것을 비웃어",
        r: "A-si a-si-haha, geugeoseul biuseo",
        e: "는 웃음소리이다; 는 달팽이를 비웃는다는 뜻이다."
      },
      ja: {
        s: "アーシー アーシーハハ、それを笑っている",
        r: "Āshī āshī-haha, sore o waratte-iru",
        e: "笑い声である; カタツムリを笑うという意味である。"
      },
      si: {
        s: "අසි අසිහාහා එයට සිනාසෙයි",
        r: "Asi asihaha eyata sinaseyi",
        e: "යනු සිනහ හඬකි; යනු ගොළුබෙල්ලාට සිනාසෙනවා යන්නයි."
      },
      fa: {
        s: "آشی آشی‌هاها، به او می‌خندند",
        r: "Âshi âshi-hâhâ, be ou mi-xandand",
        e: "صدای خنده است؛ یعنی به حلزون می‌خندند."
      }
    },
    {
      hi: {
        s: "अंगूरों के पकने में अभी बहुत देर है",
        r: "aṅgūroṅ ke pakne meṅ abhī bahut der hai",
        e: "pú-táo का मतलब है 'अंगूर'; chéng-shú का मतलब है 'पकना'; hái-zǎo-de-hěn का मतलब है 'अभी बहुत देर है'।"
      },
      ta: {
        s: "திராட்சைகள் பழுக்க இன்னும் நீண்ட காலம் உள்ளது",
        r: "tirāṭcaikaḷ paḻukka iṉṉum nīṇṭa kālam uḷḷatu",
        e: "pú-táo என்றால் 'திராட்சை'; chéng-shú என்றால் 'பழுத்தல்'; hái-zǎo-de-hěn என்றால் 'இன்னும் நீண்ட காலம் உள்ளது'."
      },
      th: {
        s: "องุ่นจะสุกยังอีกนานแสนนาน",
        r: "ongun cha suk yang ik nan saen nan",
        e: "pú-táo แปลว่า องุ่น; chéng-shú แปลว่า สุก; hái-zǎo-de-hěn แปลว่า ยังอีกนาน"
      },
      km: {
        s: "ទំពាំងបាយជូរទុំនៅឆ្ងាយណាស់",
        r: "tɔmpiaŋ-baaycuu tum nɨw cʰŋaay naah",
        e: "គឺទំពាំងបាយជូរទុំ; គឺនៅឆ្ងាយណាស់។"
      },
      vi: {
        s: "Nho chín còn sớm lắm",
        r: "",
        e: "là nho chín; là còn sớm lắm."
      },
      id: {
        s: "Anggur matang masih lama sekali",
        r: "",
        e: "artinya anggur matang; artinya masih lama sekali."
      },
      ne: {
        s: "अङ्गुर पाक्न अझै धेरै बाँकी छ",
        r: "aṅgur pākna ajhai dherai bā̃kī chha",
        e: "भनेको अङ्गुर पाक्नु; भनेको अझै धेरै समय बाँकी हुनु हो।"
      },
      bn: {
        s: "আঙুর পাকতে এখনো অনেক দেরি",
        r: "āṁgur pākte ekhanō anek deri",
        e: "আঙুর এখনো কাঁচা, পাকতে অনেক সময় বাকি আছে।"
      },
      es: {
        s: "Falta mucho para que maduren las uvas",
        r: "",
        e: "Las uvas aún están verdes; falta mucho para que maduren."
      },
      en: {
        s: "The grapes are still far from ripe",
        r: "",
        e: "pú-táo means 'grapes'; chéng-shú means 'ripe'; hái-zǎo-de-hěn means 'still very early / far from it'."
      },
      de: {
        s: "Bis die Trauben reif sind, dauert's noch lang",
        r: "",
        e: "Die Trauben sind noch unreif; es dauert noch lange."
      },
      my: {
        s: "စပျစ်သီး မှည့်ဖို့ အများကြီး လိုသေးတယ်",
        r: "sa-pyit-thi hmye-pho a-mya-ji lo-thay-day",
        e: "စပျစ်သီးတွေ မှည့်ဖို့ အချိန်အများကြီး လိုသေးတယ်။"
      },
      ko: {
        s: "포도가 익으려면 아직 멀었어",
        r: "Podoga igeuryeomyeon ajik meoreosseo",
        e: "는 포도가 익는다는 뜻이다; 는 아직 많이 이르다는 뜻이다."
      },
      ja: {
        s: "ブドウが熟すのはまだまだ先だよ",
        r: "Budō ga jukusu no wa mada-mada saki da yo",
        e: "ブドウが熟すという意味である; まだまだ先という意味である。"
      },
      si: {
        s: "මිදි ඉදෙන්න තව බොහෝ කල්",
        r: "Midi idenna tava boho kal",
        e: "යනු මිදි ඉදෙනවා යන්නයි; යනු තව බොහෝ කල් යන්නයි."
      },
      fa: {
        s: "انگورها برای رسیدن هنوز خیلی زود است",
        r: "Angour-hâ barâ-ye residan hanouz xeyli zoud ast",
        e: "یعنی رسیدن انگورها؛ یعنی هنوز خیلی زود است."
      }
    },
    {
      hi: {
        s: "अभी ऊपर आकर क्या करोगे?",
        r: "abhī ūpar ākar kyā karoge?",
        e: "xiàn-zài का मतलब है 'अभी'; shàng-lái का मतलब है 'ऊपर आना'; yào-gàn-shén-me का मतलब है 'क्या करने वाले हो?' (यहाँ बुलबुलें घोंघे को छेड़ रही हैं)।"
      },
      ta: {
        s: "இப்போது மேலே வந்து என்ன செய்யப் போகிறாய்?",
        r: "ippōtu mēlē vantu eṉṉa ceyyap pōkiṟāy?",
        e: "xiàn-zài என்றால் 'இப்போது'; shàng-lái என்றால் 'மேலே வா'; yào-gàn-shén-me என்றால் 'என்ன செய்யப் போகிறாய்?' (பறவைகள் நத்தையைக் கேலி செய்கின்றன)."
      },
      th: {
        s: "ตอนนี้ปีนขึ้นมาจะทำอะไรเหรอ",
        r: "ton ni pin khuen ma cha tham arai rue",
        e: "xiàn-zài แปลว่า ตอนนี้; shàng-lái แปลว่า ขึ้นมา; yào-gàn-shén-me แปลว่า จะมาทำอะไร (นกกำลังแซวหอยทาก)"
      },
      km: {
        s: "ឥឡូវឡើងមកធ្វើអ្វី",
        r: "ʔilow ləəng mɔɔk tvəə ʔvəy",
        e: "គឺឥឡូវនេះ; គឺឡើងមកធ្វើអ្វី។"
      },
      vi: {
        s: "Bây giờ bò lên để làm gì",
        r: "",
        e: "là bây giờ; là bò lên để làm gì."
      },
      id: {
        s: "Sekarang naik untuk apa",
        r: "",
        e: "artinya sekarang; artinya naik untuk apa."
      },
      ne: {
        s: "अहिले माथि आएर के गर्ने",
        r: "ahile māthi āera ke garne",
        e: "भनेको अहिले; भनेको माथि आएर के गर्ने हो।"
      },
      bn: {
        s: "এখন উপরে এসে কী করবে?",
        r: "ekhan upare ese kī karbe?",
        e: "পাখিরা শামুককে জিজ্ঞেস করছে: এখন উপরে এসে কী করবে?"
      },
      es: {
        s: "¿Para qué subir ahora?",
        r: "",
        e: "Los pájaros preguntan al caracol: ¿para qué subir ahora?"
      },
      en: {
        s: "What are you coming up for now?",
        r: "",
        e: "xiàn-zài means 'now'; shàng-lái means 'to come up'; yào-gàn-shén-me means 'what do you want to do?' — here the orioles are teasing the snail."
      },
      de: {
        s: "Was willst du jetzt da oben?",
        r: "",
        e: "Die Vögel fragen die Schnecke: Was willst du jetzt da oben?"
      },
      my: {
        s: "အခုတက်လာပြီး ဘာလုပ်မှာလဲ",
        r: "a-khu tet-la-pyi ba-lote-hma-le",
        e: "ငှက်တွေက ခရုကို မေးတယ် - အခုတက်လာပြီး ဘာလုပ်မှာလဲ။"
      },
      ko: {
        s: "지금 올라와서 뭘 하려는 거야",
        r: "Jigeum ollawaseo mwol haryeoneun geoya",
        e: "는 지금이라는 뜻이다; 는 올라온다는 뜻이다; 는 무엇을 하려는 것이냐고 묻는다."
      },
      ja: {
        s: "今登ってきて何をするの",
        r: "Ima nobotte-kite nani o suru no",
        e: "今という意味である; 登ってくるという意味である; 何をするのかと問うている。"
      },
      si: {
        s: "දැන් උඩට ඇවිත් මොනවද කරන්නේ",
        r: "Dan udata avit monavada karanne",
        e: "යනු දැන් යන්නයි; යනු උඩට එනවා යන්නයි; යනු මොනවද කරන්නේ කියා අසයි."
      },
      fa: {
        s: "حالا که بالا آمدی می‌خواهی چه کار کنی",
        r: "Hâlâ ke bâlâ âmadi mi-xâhi che kâr koni",
        e: "یعنی حالا؛ یعنی بالا آمدن؛ می‌پرسد چه کار می‌خواهی بکنی."
      }
    },
    {
      hi: {
        s: "आहुआंग, आ-प्यारी बुलबुल, हँसो मत",
        r: "āhuāṅg, ā-pyārī bulbul, haṅso mat",
        e: "ā-huáng बुलबुल का प्यारा नाम है (ā प्यार भरा उपसर्ग है); bù-yào-xiào का मतलब है 'हँसो मत'।"
      },
      ta: {
        s: "அ-ஹுவாங், அ-மஞ்சள் பறவையே, சிரிக்காதே",
        r: "a-huvāṅ, a-mañcaḷ paṟavaiyē, cirikkātē",
        e: "ā-huáng-ā-huáng-lí-niǎo என்பது மஞ்சள் பறவையின் செல்லப் பெயர் (ā என்பது செல்லமான முன்னொட்டு); bù-yào-xiào என்றால் 'சிரிக்காதே'."
      },
      th: {
        s: "อาหวง อานกขมิ้น อย่าหัวเราะ",
        r: "a huang a nok khamin ya hua ro",
        e: "ā-huáng-ā-huáng-lí-niǎo เป็นการเรียกชื่อเล่นของนกขมิ้น (อาหวง = เจ้าเหลืองน้อย, ā เป็นคำเติมที่แสดงความเอ็นดู); bù-yào-xiào แปลว่า อย่าหัวเราะ"
      },
      km: {
        s: "អាហួង អាបក្សីលឿង កុំសើច",
        r: "aahuəng ʔaa-bɑksəy-lɨəng kom səɨc",
        e: "ជាពាក្យហៅបក្សី; គឺកុំសើច។"
      },
      vi: {
        s: "A-hoàng, chim vàng anh ơi đừng cười",
        r: "",
        e: "là gọi chim vàng anh; là đừng cười."
      },
      id: {
        s: "A-huang, burung kepodang jangan tertawa",
        r: "",
        e: "adalah panggilan untuk burung; artinya jangan tertawa."
      },
      ne: {
        s: "अह्वाङ, पहेँलो चरा नहाँस",
        r: "ahwāṅ, pahẽlo carā nahā̃sa",
        e: "चरालाई बोलाएको हो; भनेको नहाँस्नु हो।"
      },
      bn: {
        s: "আহুয়াং আহুয়াং ওরিওল, হেসো না",
        r: "āhuẏāṁ āhuẏāṁ ōriōl, hesō nā",
        e: "শামুক পাখিদের বলছে: হেসো না। এখানে হলুদ পাখিকে ডাকার নাম।"
      },
      es: {
        s: "A huang, a huang, oriole: no te rías",
        r: "",
        e: "El caracol dice: no te rías. «A huang» es como llama al pájaro amarillo."
      },
      en: {
        s: "Ah-huang, ah-oriole, don't laugh",
        r: "",
        e: "ā-huáng-ā-huáng-lí-niǎo addresses the oriole with a cute nickname (ā-huáng, 'little yellow') — ā is an affectionate prefix; bù-yào-xiào means 'don't laugh'."
      },
      de: {
        s: "A huang, a huang, Pirol: lach nicht",
        r: "",
        e: "Die Schnecke sagt: Lach nicht. «A huang» ruft den gelben Vogel beim Namen."
      },
      my: {
        s: "အာဟွမ် အာဟွမ် ရွှေဝါငှက်၊ မရယ်ပါနဲ့",
        r: "a-hwan a-hwan shwe-wa-hnget, ma-yay-ba-ne",
        e: "ခရုက ပြောတယ် - မရယ်ပါနဲ့။ 「အာဟွမ်」ဟာ ရွှေဝါရောင် ငှက်ကို ခေါ်တဲ့ နာမည်။"
      },
      ko: {
        s: "아황 아황꾀꼬리, 웃지 마",
        r: "A-hwang a-hwang-kkoekkori, utji ma",
        e: "은 리듬 소리이다; 는 꾀꼬리이다; 는 웃지 말라는 뜻이다."
      },
      ja: {
        s: "アーファン アーファンオリオール、笑わないで",
        r: "Āfan āfan-oriōru, warawanaide",
        e: "リズムの音である; オリオールである; 笑わないでという意味である。"
      },
      si: {
        s: "අහුවාන් අහුවාන් කහ කුරුල්ලනි, සිනාසෙන්න එපා",
        r: "Ahuvan ahuvan kaha kurullani, sinasenna epa",
        e: "යනු රිද්ම ශබ්දයකි; යනු කහ කුරුල්ලාය; යනු සිනාසෙන්න එපා යන්නයි."
      },
      fa: {
        s: "آهوانگ آهوانگ پرنده زرد، نخند",
        r: "Âhvâng âhvâng-e parande-ye zard, naxand",
        e: "صدای ریتمیک است؛ یعنی پرنده زرد؛ یعنی نخند."
      }
    },
    {
      hi: {
        s: "मेरे ऊपर पहुँचते-पहुँचते अंगूर पक जाएँगे",
        r: "mere ūpar pahuṅchte-pahuṅchte aṅgūr pak jāeṅge",
        e: "děng-wǒ का मतलब है 'मेरा इंतज़ार करो'; pá-shàng का मतलब है 'चढ़कर ऊपर पहुँचना'; jiù-chéng-shú-le का मतलब है 'तब तक पक जाएँगे' (घोंघा बहुत आत्मविश्वासी है)।"
      },
      ta: {
        s: "நான் ஏறி வரும்போது திராட்சைகள் பழுத்துவிடும்",
        r: "nāṉ ēṟi varumpōtu tirāṭcaikaḷ paḻuttuviṭum",
        e: "děng-wǒ என்றால் 'எனக்காகக் காத்திரு'; pá-shàng என்றால் 'ஏறி வா'; jiù-chéng-shú-le என்றால் 'அப்போது பழுத்துவிடும்'."
      },
      th: {
        s: "รอให้ฉันปีนขึ้นไปถึง องุ่นก็จะสุกพอดี",
        r: "ro hai chan pin khuen pai thueng ongun ko cha suk pho di",
        e: "děng-wǒ แปลว่า รอฉัน; pá-shàng แปลว่า ปีนขึ้นไป; jiù-chéng-shú-le แปลว่า ถึงตอนนั้นก็จะสุกพอดี (หอยทากมั่นใจมาก)"
      },
      km: {
        s: "ចាំខ្ញុំឡើងដល់ វានឹងទុំហើយ",
        r: "cam kʰɲom ləəng dɑl vie nɨŋ tum haəy",
        e: "គឺចាំខ្ញុំឡើងដល់; គឺទំពាំងបាយជូរនឹងទុំ។"
      },
      vi: {
        s: "Đợi tôi bò lên tới nó sẽ chín",
        r: "",
        e: "là đợi tôi bò lên tới; là nho sẽ chín."
      },
      id: {
        s: "Tunggu aku merangkak sampai, ia akan matang",
        r: "",
        e: "artinya tunggu aku merangkak sampai; artinya anggur akan matang."
      },
      ne: {
        s: "म चढेर पुगेपछि त्यो पाक्नेछ",
        r: "ma caḍhera pugepachhi tyo pāknechha",
        e: "भनेको म चढेर पुगेपछि; भनेको अङ्गुर पाक्नेछ हो।"
      },
      bn: {
        s: "আমি উপরে উঠলে আঙুর পেকে যাবে",
        r: "āmi upare uṭhle āṁgur peke yābe",
        e: "শামুকের উত্তর: আমি ধীরে হলেও উপরে উঠব, ততদিনে আঙুর ঠিক পেকে যাবে।"
      },
      es: {
        s: "Cuando yo suba, ya habrán madurado",
        r: "",
        e: "El caracol responde: aunque vaya despacio, cuando llegue arriba las uvas ya habrán madurado."
      },
      en: {
        s: "By the time I climb up, they will be ripe",
        r: "",
        e: "děng-wǒ means 'wait for me'; pá-shàng means 'to climb up'; jiù-chéng-shú-le means 'will then be ripe' — the snail is confident and unhurried."
      },
      de: {
        s: "Wenn ich oben bin, sind sie reif",
        r: "",
        e: "Die Schnecke antwortet: Auch wenn ich langsam bin, sind die Trauben reif, wenn ich oben bin."
      },
      my: {
        s: "ငါတက်ရောက်တဲ့အခါ စပျစ်သီးတွေ မှည့်နေပြီ",
        r: "nga tet-yauk-de-a-kha sa-pyit-thi-dwe hmye-nay-pyi",
        e: "ခရုက ဖြေတယ် - နှေးပေမယ့် ငါ အပေါ်ရောက်တဲ့အခါ စပျစ်သီးတွေ မှည့်နေပြီ။"
      },
      ko: {
        s: "내가 기어올라가면 익을 거야",
        r: "Naega gieo-ollagamyeon igeul geoya",
        e: "는 내가 기어올라가면이라는 뜻이다; 는 포도가 익을 것이라는 뜻이다."
      },
      ja: {
        s: "私が登りきる頃には熟しているよ",
        r: "Watashi ga nobori-kiru koro ni wa jukushite-iru yo",
        e: "私が登りきればという意味である; ブドウが熟しているという意味である。"
      },
      si: {
        s: "මම උඩට බඩගා යන විට එය ඉදීවි",
        r: "Mama udata badaga yana vita eya idivi",
        e: "යනු මම උඩට බඩගා යන විට යන්නයි; යනු මිදි ඉදීවි යන්නයි."
      },
      fa: {
        s: "وقتی من بالا بخزم رسیده خواهد بود",
        r: "Vaghti man bâlâ bexazam reside xâhad boud",
        e: "یعنی وقتی بالا بخزم؛ یعنی انگور رسیده خواهد بود."
      }
    }
  ],
  zhuaniqiu: [
    {
      hi: {
        s: "तालाब का पानी भर गया, बारिश भी रुक गई",
        r: "tālāb kā pānī bhar gayā, bāriś bhī ruk gaī",
        e: "chí-táng का मतलब है 'तालाब'; shuǐ-mǎn-le का मतलब है 'पानी भर गया'; yǔ-yě-tíng-le का मतलब है 'बारिश भी रुक गई'।"
      },
      ta: {
        s: "குளத்தில் நீர் நிரம்பிவிட்டது, மழையும் நின்றுவிட்டது",
        r: "kuḷattil nīr nirampiviṭṭatu, maḻaiyum niṉṟuviṭṭatu",
        e: "chí-táng என்றால் 'குளம்'; shuǐ-mǎn-le என்றால் 'நீர் நிரம்பிவிட்டது'; yǔ-yě-tíng-le என்றால் 'மழையும் நின்றுவிட்டது'."
      },
      th: {
        s: "น้ำในสระเต็มแล้ว ฝนก็หยุดตกแล้ว",
        r: "nam nai sa tem laeo fon ko yut tok laeo",
        e: "chí-táng แปลว่า สระน้ำหรือบ่อ; shuǐ-mǎn-le แปลว่า น้ำเต็มแล้ว; yǔ-yě-tíng-le แปลว่า ฝนหยุดตกแล้ว"
      },
      km: {
        s: "ទឹកក្នុងស្រះពេញហើយ, ភ្លៀងក៏ឈប់ហើយ",
        r: "tɨk knong srɑh peɲ haəy, pʰlieŋ kɑɑ cʰup haəy",
        e: "គឺទឹកក្នុងស្រះពេញ; គឺភ្លៀងឈប់។"
      },
      vi: {
        s: "Nước ao đầy rồi, mưa cũng tạnh rồi",
        r: "",
        e: "là nước ao đầy; là mưa tạnh."
      },
      id: {
        s: "Air kolam penuh, hujan pun berhenti",
        r: "",
        e: "artinya air kolam penuh; artinya hujan berhenti."
      },
      ne: {
        s: "पोखरीको पानी भरियो, पानी पर्न पनि रोकियो",
        r: "pokharīko pānī bhariyo, pānī parna pani rokiyo",
        e: "भनेको पोखरीको पानी भरिनु; भनेको पानी पर्न रोकिनु हो।"
      },
      bn: {
        s: "পুকুরের পানি ভরে গেছে, বৃষ্টিও থেমে গেছে",
        r: "pukurer pāni bhare geche, bṛṣṭiō theme geche",
        e: "বৃষ্টির পর পুকুর পানিতে ভরে গেছে, বৃষ্টিও থেমে গেছে।"
      },
      es: {
        s: "El estanque se llenó de agua, la lluvia ya paró",
        r: "",
        e: "Después de la lluvia, el estanque está lleno y la lluvia cesó."
      },
      en: {
        s: "The pond is full of water, and the rain has stopped",
        r: "",
        e: "chí-táng means 'pond'; shuǐ-mǎn-le means 'the water is full'; yǔ-yě-tíng-le means 'the rain has also stopped'."
      },
      de: {
        s: "Der Teich ist voll Wasser, der Regen hat aufgehört",
        r: "",
        e: "Nach dem Regen ist der Teich voll, der Regen hat aufgehört."
      },
      my: {
        s: "ကန်ရေပြည့်သွားပြီ၊ မိုးလည်းတိတ်သွားပြီ",
        r: "kan-yay pyi-thwa-pyi, mo-le deik-thwa-pyi",
        e: "မိုးရွာပြီးနောက် ကန်ရေ ပြည့်သွားပြီး မိုးတိတ်သွားပြီ။"
      },
      ko: {
        s: "연못에 물이 가득 찼고, 비도 그쳤어",
        r: "Yeonmose muri gadeuk chatgo, bido geuchyeosseo",
        e: "는 연못이라는 뜻이다; 는 물이 가득 찼다는 뜻이다; 는 비도 그쳤다는 뜻이다."
      },
      ja: {
        s: "池の水がいっぱいになり、雨もやんだ",
        r: "Ike no mizu ga ippai ni nari, ame mo yanda",
        e: "池という意味である; 水がいっぱいになったという意味である; 雨もやんだという意味である。"
      },
      si: {
        s: "පොකුණේ වතුර පිරිලා, වැස්සත් නැවතිලා",
        r: "Pokune vatura pirila, vassat navatila",
        e: "යනු පොකුණ යන්නයි; යනු වතුර පිරුණා යන්නයි; යනු වැස්සත් නැවතුණා යන්නයි."
      },
      fa: {
        s: "آب برکه پر شد، باران هم بند آمد",
        r: "Âb-e berke por shod, bârân ham band âmad",
        e: "یعنی برکه؛ یعنی آب پر شد؛ یعنی باران هم بند آمد."
      }
    },
    {
      hi: {
        s: "खेत के किनारे कीचड़ में हर जगह लोच-मछलियाँ हैं",
        r: "khet ke kināre kīchaṛ meṅ har jagah loch-machhaliyāṅ haiṅ",
        e: "tián-biān का मतलब है 'खेत के किनारे'; xī-ní का मतलब है 'पतला कीचड़'; ní-qiū का मतलब है 'कीचड़ में रहने वाली छोटी मछली'; dào-chù का मतलब है 'हर जगह'।"
      },
      ta: {
        s: "வயல் ஓரத்து சேற்றில் எங்கும் சிறு மீன்கள் உள்ளன",
        r: "vayal ōrattu cēṟṟil eṅkum ciṟu mīṉkaḷ uḷḷaṉa",
        e: "tián-biān என்றால் 'வயல் ஓரம்'; xī-ní என்றால் 'மெல்லிய சேறு'; ní-qiū என்பது சேற்றில் வாழும் சிறு மீன்; dào-chù என்றால் 'எங்கும்'."
      },
      th: {
        s: "ในโคลนข้างทุ่งนามีปลาไหลโคลนอยู่ทุกที่",
        r: "nai khlon khang thung na mi pla lai khlon yu thuk thi",
        e: "tián-biān แปลว่า ข้างทุ่งนา; xī-ní แปลว่า โคลนเหลว; ní-qiū คือปลาตัวเล็กที่อาศัยในโคลน; dào-chù แปลว่า ทุกที่"
      },
      km: {
        s: "ក្នុងភក់រាវៗក្បែរស្រែ ពេញដោយត្រីឆ្លូញ",
        r: "knong pʰɔk rieaw-rieaw kbae srae peɲ daoy trəy cʰluuɲ",
        e: "គឺក្នុងភក់រាវក្បែរស្រែ; គឺត្រីឆ្លូញ។"
      },
      vi: {
        s: "Trong bùn loãng bên ruộng đầy những con chạch",
        r: "",
        e: "là trong bùn loãng bên ruộng; là con chạch."
      },
      id: {
        s: "Di lumpur encer pinggir sawah penuh belut sawah",
        r: "",
        e: "artinya di lumpur encer pinggir sawah; artinya belut sawah (loach)."
      },
      ne: {
        s: "खेत छेउको हिलोमा जताततै हिले माछा छन्",
        r: "khet chheuko hilomā jatātatai hile māchhā chhan",
        e: "भनेको खेत छेउको हिलोमा; भनेको हिले माछा हो।"
      },
      bn: {
        s: "ক্ষেতের পাশের কাদায় সর্বত্র লোচ মাছ",
        r: "kṣeter pāśer kādāẏ sarbatra lōch māch",
        e: "ক্ষেতের পাশের ভেজা কাদায় অনেক লোচ মাছ (কাদার ছোট মাছ) আছে।"
      },
      es: {
        s: "En el barro junto al campo hay lochas por todas partes",
        r: "",
        e: "En el lodo junto al campo hay muchas lochas (un pececillo del barro)."
      },
      en: {
        s: "In the mud by the fields, loaches are everywhere",
        r: "",
        e: "tián-biān means 'by the fields'; xī-ní means 'thin mud'; ní-qiū is a small fish that lives in mud (a loach); dào-chù means 'everywhere'."
      },
      de: {
        s: "Im Schlamm am Feldrand wimmelt's von Schlammpeitzgern",
        r: "",
        e: "Im nassen Schlamm am Feldrand gibt es viele Schlammpeitzger ."
      },
      my: {
        s: "လယ်ဘေးက ရွှံ့တွေထဲမှာ ငါးရှဉ့်တွေ အများကြီး",
        r: "le-bay-ka shwin-dwe-hte-hma nga-shin-dwe a-mya-ji",
        e: "လယ်ဘေးက စိုစွတ်တဲ့ ရွှံ့ထဲမှာ ငါးရှဉ့် (ရွှံ့ငါး) တွေ အများကြီး ရှိတယ်။"
      },
      ko: {
        s: "밭가 진흙 속에 미꾸라지가 가득해",
        r: "Batga jinheuk soge mikkurajiga gadeukhae",
        e: "는 밭가라는 뜻이다; 는 진흙이다; 는 곳곳에 있다는 뜻이다; 는 미꾸라지이다."
      },
      ja: {
        s: "田んぼのぬかるみにドジョウがいっぱい",
        r: "Tanbo no nukarumi ni dojō ga ippai",
        e: "田んぼのそばという意味である; ぬかるみである; いたるところという意味である; ドジョウである。"
      },
      si: {
        s: "කුඹුර අසල මඩේ හැමතැනම ලෝච් මාළු",
        r: "Kumbura asala made hamatnama loch malu",
        e: "යනු කුඹුර අසල යන්නයි; යනු මඩයි; යනු හැමතැනම යන්නයි; යනු ලෝච් මාළුය."
      },
      fa: {
        s: "در گل‌ولای کنار مزرعه همه‌جا ماهی لوچ است",
        r: "Dar gel-o-lây-e kenâr-e mazra'e hame-jâ mâhi-ye louch ast",
        e: "یعنی کنار مزرعه؛ یعنی گل‌ولای؛ یعنی همه‌جا؛ یعنی ماهی لوچ."
      }
    },
    {
      hi: {
        s: "रोज़ मैं तुम्हारा इंतज़ार करता हूँ, तुम्हारे साथ लोच पकड़ने का",
        r: "roz maiṅ tumhārā intazār kartā hūṅ, tumhāre sāth loch pakaṛne kā",
        e: "tiān-tiān का मतलब है 'रोज़-रोज़'; děng-zhe-nǐ का मतलब है 'तुम्हारा इंतज़ार करना'; zhuō-ní-qiū का मतलब है 'लोच-मछली पकड़ना'।"
      },
      ta: {
        s: "தினமும் நான் உனக்காகக் காத்திருக்கிறேன், உன்னுடன் மீன் பிடிக்க",
        r: "tiṉamum nāṉ uṉakkākak kāttirukkiṟēṉ, uṉṉuṭaṉ mīṉ piṭikka",
        e: "tiān-tiān என்றால் 'தினமும்'; děng-zhe-nǐ என்றால் 'உனக்காகக் காத்திரு'; zhuō-ní-qiū என்றால் 'மீன் பிடி'."
      },
      th: {
        s: "ทุกวันฉันรอเธอ รอเธอไปจับปลาไหลโคลน",
        r: "thuk wan chan ro thoe ro thoe pai chap pla lai khlon",
        e: "tiān-tiān แปลว่า ทุกวัน; děng-zhe-nǐ แปลว่า รอเธอ; zhuō-ní-qiū แปลว่า จับปลาไหลโคลน"
      },
      km: {
        s: "រាល់ថ្ងៃខ្ញុំចាំអ្នក, ចាំអ្នកចាប់ត្រីឆ្លូញ",
        r: "roal tʰŋay kʰɲom cam neak, cam neak cɑp trəy cʰluuɲ",
        e: "គឺរាល់ថ្ងៃចាំអ្នក; គឺចាប់ត្រីឆ្លូញ។"
      },
      vi: {
        s: "Ngày ngày tôi đợi bạn, đợi bạn bắt chạch",
        r: "",
        e: "là ngày ngày đợi bạn; là bắt chạch."
      },
      id: {
        s: "Setiap hari kutunggu kamu, tunggu kamu menangkap belut",
        r: "",
        e: "artinya setiap hari menunggu kamu; artinya menangkap belut sawah."
      },
      ne: {
        s: "दिनदिनै म तिमीलाई पर्खन्छु, हिले माछा समात्न पर्खन्छु",
        r: "dinadinai ma timīlāī parkhanchhu, hile māchhā samātna parkhanchhu",
        e: "भनेको दिनदिनै तिमीलाई पर्खनु; भनेको हिले माछा समात्नु हो।"
      },
      bn: {
        s: "প্রতিদিন আমি তোমার অপেক্ষা করি, লোচ মাছ ধরার অপেক্ষায়",
        r: "pratidin āmi tōmār apekṣā kari, lōch māch dharār apekṣāẏ",
        e: "প্রতিদিন তোমার জন্য অপেক্ষা করি, একসাথে লোচ মাছ ধরব বলে।"
      },
      es: {
        s: "Cada día te espero, espero ir contigo a coger lochas",
        r: "",
        e: "Te espero cada día para ir juntos a coger lochas."
      },
      en: {
        s: "Every day I wait for you, waiting for you to catch loaches",
        r: "",
        e: "tiān-tiān means 'every day'; děng-zhe-nǐ means 'waiting for you'; zhuō-ní-qiū means 'to catch loaches'."
      },
      de: {
        s: "Jeden Tag warte ich auf dich, um Schlammpeitzger zu fangen",
        r: "",
        e: "Ich warte jeden Tag auf dich, um gemeinsam Schlammpeitzger zu fangen."
      },
      my: {
        s: "နေ့တိုင်း မင်းကို စောင့်နေတယ်၊ ငါးရှဉ့်ဖမ်းဖို့ စောင့်နေတယ်",
        r: "ne-dain min-ko saun-nay-day, nga-shin hpan-pho saun-nay-day",
        e: "နေ့တိုင်း မင်းနဲ့အတူ ငါးရှဉ့်ဖမ်းဖို့ စောင့်နေတယ်။"
      },
      ko: {
        s: "매일매일 너를 기다려, 미꾸라지 잡으러 가자를 기다려",
        r: "Mae-il mae-il neoreul gidaryeo, mikuraji jabeuro gajareul gidaryeo",
        e: "는 매일이라는 뜻이다; 는 너를 기다린다는 뜻이다; 는 미꾸라지를 잡는다는 뜻이다."
      },
      ja: {
        s: "毎日毎日君を待っている、ドジョウを捕まえに行くのを",
        r: "Mainichi mainichi kimi o matte-iru, dojō o tsukamae ni iku no o",
        e: "毎日という意味である; 君を待つという意味である; ドジョウを捕まえるという意味である。"
      },
      si: {
        s: "දවස ගානේ මම ඔයාව බලාගෙන ඉන්නවා, ලෝච් මාළු අල්ලන්න යන්න",
        r: "Davasa gane mama oyava balagena innava, loch malu allanna yanna",
        e: "යනු දවස ගානේ යන්නයි; යනු ඔයාව බලාගෙන ඉන්නවා යන්නයි; යනු ලෝච් මාළු අල්ලනවා යන්නයි."
      },
      fa: {
        s: "هر روز منتظر توام، منتظرم برویم ماهی لوچ بگیریم",
        r: "Har rouz montazer-e toam, montazeram beravim mâhi-ye louch begirim",
        e: "یعنی هر روز؛ یعنی منتظر توام؛ یعنی ماهی لوچ گرفتن."
      }
    },
    {
      hi: {
        s: "बड़े भैया, कैसा रहेगा अगर हम सब लोच पकड़ने चलें?",
        r: "baṛe bhaiyā, kaisā rahegā agar ham sab loch pakaṛne chaleṅ?",
        e: "dà-gē-ge का मतलब है 'बड़े भैया'; hǎo-bu-hǎo का मतलब है 'कैसा रहेगा?' (प्यार भरा सुझाव); zán-men का मतलब है 'हम सब'।"
      },
      ta: {
        s: "அண்ணா, நாம் எல்லோரும் சேர்ந்து மீன் பிடிக்கப் போகலாமா?",
        r: "aṇṇā, nām ellōrum cērntu mīṉ piṭikkap pōkalāmā?",
        e: "dà-gē-ge என்றால் 'அண்ணா'; hǎo-bu-hǎo என்றால் 'சரியா? / போகலாமா?' (அன்பான யோசனை); zán-men என்றால் 'நாம் அனைவரும்'."
      },
      th: {
        s: "พี่ชายคนโต ไปจับปลาไหลโคลนกันดีไหม",
        r: "phi chai khon to pai chap pla lai khlon kan di mai",
        e: "dà-gē-ge แปลว่า พี่ชายคนโต; hǎo-bu-hǎo แปลว่า ดีไหม (เป็นการชวนอย่างน่ารัก); zán-men แปลว่า พวกเรา"
      },
      km: {
        s: "បងប្រុស, តើយើងទៅចាប់ត្រីឆ្លូញជាមួយគ្នាទេ?",
        r: "bɑng-broh, taə yəəng tɨw cɑp trəy cʰluuɲ ciemuə knie te?",
        e: "គឺសួរបងប្រុស; គឺយើងទៅចាប់ត្រីឆ្លូញជាមួយគ្នា។"
      },
      vi: {
        s: "Anh ơi có được không, chúng mình đi bắt chạch nhé?",
        r: "",
        e: "là hỏi anh trai; là chúng mình đi bắt chạch."
      },
      id: {
        s: "Kakak, bagaimana kalau kita pergi menangkap belut?",
        r: "",
        e: "artinya bertanya pada kakak; artinya kita pergi menangkap belut."
      },
      ne: {
        s: "दाजु, हुन्छ भने हामी हिले माछा समात्न जाऔँ?",
        r: "dāju, hunchha bhane hāmī hile māchhā samātna jāaũ?",
        e: "भनेको दाजुलाई सोध्नु; भनेको हामी सँगै हिले माछा समात्न जानु हो।"
      },
      bn: {
        s: "বড় ভাই, চলো আমরা লোচ মাছ ধরতে যাই?",
        r: "baṛa bhāi, calō āmrā lōch māch dharte yāi?",
        e: "বড় ভাইকে জিজ্ঞেস করছে: চলো একসাথে লোচ মাছ ধরতে যাই?"
      },
      es: {
        s: "Hermano mayor, ¿vamos a coger lochas?",
        r: "",
        e: "Le pregunta al hermano mayor: ¿vamos juntos a coger lochas?"
      },
      en: {
        s: "Big brother, how about we all go catch loaches?",
        r: "",
        e: "dà-gē-ge means 'big brother'; hǎo-bu-hǎo means 'is it okay? / how about' — a friendly suggestion; zán-men means 'we (all of us)'."
      },
      de: {
        s: "Großer Bruder, gehen wir Schlammpeitzger fangen?",
        r: "",
        e: "Fragt den großen Bruder: Gehen wir zusammen Schlammpeitzger fangen?"
      },
      my: {
        s: "အစ်ကိုကြီး၊ ငါးရှဉ့်သွားဖမ်းကြရအောင်လား",
        r: "a-ko-ji, nga-shin thwa-hpan-kya-ya-aun-la",
        e: "အစ်ကိုကြီးကို မေးတယ် - အတူတူ ငါးရှဉ့်သွားဖမ်းကြရအောင်လား။"
      },
      ko: {
        s: "오빠, 우리 미꾸라지 잡으러 갈래?",
        r: "Oppa, uri mikuraji jabeuro gallae?",
        e: "는 오빠라는 뜻이다; 는 괜찮겠냐고 묻는다; 는 우리라는 뜻이다."
      },
      ja: {
        s: "お兄さん、ねえ、一緒にドジョウを捕まえに行こう？",
        r: "Onii-san, nē, issho ni dojō o tsukamae ni ikō?",
        e: "お兄さんという意味である; いいかと尋ねている; 私たちという意味である。"
      },
      si: {
        s: "අයියේ, අපි ලෝච් මාළු අල්ලන්න යමුද?",
        r: "Aiyye, api loch malu allanna yamuda?",
        e: "යනු අයියා යන්නයි; යනු හොඳද කියා අසයි; යනු අපි යන්නයි."
      },
      fa: {
        s: "داداش بزرگ، خوبه بریم ماهی لوچ بگیریم؟",
        r: "Dâdâsh-e bozorg, khoube berim mâhi-ye louch begirim?",
        e: "یعنی داداش بزرگ؛ می‌پرسد خوب است؟؛ یعنی ما."
      }
    },
    {
      hi: {
        s: "छोटे नियू के बड़े भैया उसे लोच पकड़ने ले गए",
        r: "chhoṭe niyū ke baṛe bhaiyā use loch pakaṛne le gae",
        e: "xiǎo-niú एक बच्चे का प्यारा नाम है (नियू); gē-ge का मतलब है 'बड़े भाई'; dài-zhe-tā का मतलब है 'उसे साथ लेकर जाना'।"
      },
      ta: {
        s: "சிறு நியூவின் அண்ணன் அவனை மீன் பிடிக்க அழைத்துச் சென்றான்",
        r: "ciṟu niyūviṉ aṇṇaṉ avaṉai mīṉ piṭikka aḻaittuc ceṉṟāṉ",
        e: "xiǎo-niú என்பது ஒரு குழந்தையின் செல்லப் பெயர் (நியூ); gē-ge என்றால் 'அண்ணன்'; dài-zhe-tā என்றால் 'அவனை அழைத்துச் செல்'."
      },
      th: {
        s: "พี่ชายของเสี่ยวหนิวพาเขาไปจับปลาไหลโคลน",
        r: "phi chai khong siao niu pha khao pai chap pla lai khlon",
        e: "xiǎo-niú เป็นชื่อเล่นของเด็ก (เสี่ยวหนิว); gē-ge แปลว่า พี่ชาย; dài-zhe-tā แปลว่า พาเขาไปด้วย"
      },
      km: {
        s: "បងប្រុសរបស់ក្មេងតូចនាំវាទៅចាប់ត្រីឆ្លូញ",
        r: "bɑng-broh rɔbɑh kmeeŋ touc nɔɔm vie tɨw cɑp trəy cʰluuɲ",
        e: "គឺបងប្រុសរបស់ក្មេង (ឈ្មោះតូច); គឺនាំវាទៅចាប់ត្រីឆ្លូញ។"
      },
      vi: {
        s: "Anh của bé Niu dẫn cậu ấy đi bắt chạch",
        r: "",
        e: "là anh của bé Niu; là dẫn cậu ấy đi bắt chạch."
      },
      id: {
        s: "Kakak si Niu kecil mengajaknya menangkap belut",
        r: "",
        e: "artinya kakak si Niu kecil; artinya mengajaknya menangkap belut."
      },
      ne: {
        s: "सानो गाईका दाजुले उसलाई हिले माछा समात्न लगे",
        r: "sāno gāīkā dājule uslāī hile māchhā samātna lage",
        e: "भनेको सानो गाई (नाम) का दाजु; भनेको उसलाई हिले माछा समात्न लैजानु हो।"
      },
      bn: {
        s: "ছোট্ট নিউয়ের বড় ভাই তাকে নিয়ে লোচ মাছ ধরে",
        r: "chōṭṭa niuẏer baṛa bhāi tāke niẏe lōch māch dhare",
        e: "ছোট্ট নিউয়ের (ডাকনাম) বড় ভাই তাকে নিয়ে লোচ মাছ ধরতে যায়।"
      },
      es: {
        s: "El hermano mayor del pequeño Niu lo lleva a coger lochas",
        r: "",
        e: "El hermano mayor del pequeño Niu (apodo) lo lleva a coger lochas."
      },
      en: {
        s: "Little Niu's big brother takes him to catch loaches",
        r: "",
        e: "xiǎo-niú (Xiǎo Niú, 'little ox') is a child's nickname, transliterated here; gē-ge means 'big brother'; dài-zhe-tā means 'taking him along'."
      },
      de: {
        s: "Der große Bruder des kleinen Niu nimmt ihn mit zum Schlammpeitzgerfangen",
        r: "",
        e: "Der große Bruder des kleinen Niu (Spitzname) nimmt ihn mit."
      },
      my: {
        s: "ရှောင်နျူ့ရဲ့ အစ်ကိုကြီးက သူ့ကို ငါးရှဉ့်ဖမ်းဖို့ ခေါ်သွားတယ်",
        r: "shaun-nyu-ye a-ko-ji ka thu-ko nga-shin hpan-pho khaw-thwa-day",
        e: "ရှောင်နျူ့ (အမည်ပြောင်) ရဲ့ အစ်ကိုကြီးက သူ့ကို ငါးရှဉ့်ဖမ်းဖို့ ခေါ်သွားတယ်။"
      },
      ko: {
        s: "송아지의 형이 그를 데리고 미꾸라지를 잡으러 가",
        r: "Songajiui hyeongi geureul derigo mikurajireul jabeuro ga",
        e: "는 송아지라는 뜻이다; 는 그의 형이다; 는 그를 데리고 간다는 뜻이다."
      },
      ja: {
        s: "子牛のお兄さんが彼を連れてドジョウを捕まえに行く",
        r: "Koushi no onii-san ga kare o tsurete dojō o tsukamae ni iku",
        e: "子牛という意味である; 彼のお兄さんである; 彼を連れていくという意味である。"
      },
      si: {
        s: "වස්සාගේ අයියා එයාව එක්කගෙන ලෝච් මාළු අල්ලන්න යනවා",
        r: "Vassage aiyya eyava ekkagena loch malu allanna yanava",
        e: "යනු වස්සා යන්නයි; යනු එයාගේ අයියාය; යනු එයාව එක්කගෙන යනවා යන්නයි."
      },
      fa: {
        s: "برادر بزرگ گوساله او را با خود می‌برد تا ماهی لوچ بگیرند",
        r: "Berâdar-e bozorg-e gousâle ou râ bâ xod mi-barad tâ mâhi-ye louch begirand",
        e: "یعنی گوساله؛ یعنی برادر بزرگ او؛ یعنی او را با خود بردن."
      }
    }
  ],
  xiaolaoshu: [
    {
      hi: {
        s: "छोटा चूहा दीये की चौकी पर चढ़ता है",
        r: "chhoṭā chūhā diye kī chaukī par chaṛhtā hai",
        e: "xiǎo lǎoshǔ का मतलब है 'छोटा चूहा'；shàng का मतलब है 'ऊपर चढ़ना'；dēngtái पुराने ज़माने के तेल-दीये का स्टैंड है।"
      },
      ta: {
        s: "சுட்டி எலி தீப விளக்கின் மேடையில் ஏறுகிறது",
        r: "cuṭṭi eli tīpa viḷakkiṉ mēṭaiyil ēṟukiṟatu",
        e: "xiǎo lǎoshǔ என்றால் 'சுட்டி எலி'; shàng என்றால் 'மேலே ஏறு'; dēngtái என்பது எண்ணெய் விளக்கு நிற்கும் மேடை."
      },
      th: {
        s: "หนูน้อยปีนขึ้นไปบนเชิงตะเกียง",
        r: "nu noi pin khuen pai bon choeng takieng",
        e: "xiǎo lǎoshǔ แปลว่า 'หนูน้อย'; shàng แปลว่า 'ปีนขึ้น'; dēngtái คือเชิงตะเกียงน้ำมันแบบโบราณ"
      },
      km: {
        s: "កណ្តុរតូច, ឡើងលើចង្កៀង",
        r: "kɑndor touc, ləəng ləə cɑngkieŋ",
        e: "គឺកណ្តុរតូច; គឺឡើងលើចង្កៀងប្រេង។"
      },
      vi: {
        s: "Chuột nhắt, trèo lên chân đèn",
        r: "",
        e: "là chuột nhắt; là trèo lên chân đèn dầu."
      },
      id: {
        s: "Tikus kecil, naik ke kaki lampu",
        r: "",
        e: "artinya tikus kecil; artinya naik ke kaki lampu minyak."
      },
      ne: {
        s: "सानो मुसो, दियोको खुट्टामा चढ्यो",
        r: "sāno muso, diyoko khuṭṭāmā caḍhyo",
        e: "भनेको सानो मुसो; भनेको दियोको खुट्टामा चढ्नु हो।"
      },
      bn: {
        s: "ছোট্ট ইঁদুর, বাতির স্ট্যান্ডে ওঠে",
        r: "chōṭṭa im̐dur, bātir sṭyāṇḍe ōṭhe",
        e: "ছোট্ট ইঁদুর বাতির স্ট্যান্ডে (পুরনো দিনের তেলের বাতির ধারক) ওঠে।"
      },
      es: {
        s: "Ratoncito, sube al candelero",
        r: "",
        e: "El ratoncito sube al candelero (soporte de la lámpara de aceite de antes)."
      },
      en: {
        s: "The little mouse climbs up the lamp stand,",
        r: "",
        e: "xiao laoshu means 'little mouse'; shang means 'to climb up'; dengtai is a traditional oil-lamp stand."
      },
      de: {
        s: "Mäuschen, klettert auf den Lampenständer",
        r: "",
        e: "Das Mäuschen klettert auf den Lampenständer (Halter der alten Öllampe)."
      },
      my: {
        s: "ကြွက်ကလေး မီးတိုင်ပေါ် တက်တယ်",
        r: "kwet-ka-lay mi-dain-paw tet-day",
        e: "ကြွက်ကလေးက မီးတိုင် (ရှေးခေတ် ဆီမီးခုံ) ပေါ် တက်တယ်။"
      },
      ko: {
        s: "아기 쥐가 등잔대 위로 올라가",
        r: "Agi jwiga deungjandae wiro ollaga",
        e: "는 아기 쥐라는 뜻이다; 는 등잔대 위로 올라간다는 뜻이다."
      },
      ja: {
        s: "子ねずみ、燭台に登る",
        r: "Konezumi, shokudai ni noboru",
        e: "子ねずみという意味である; 燭台に登るという意味である。"
      },
      si: {
        s: "පොඩි මීයා පහන් රුක උඩට නගිනවා",
        r: "Podi miya pahan ruka udata naginava",
        e: "යනු පොඩි මීයා යන්නයි; යනු පහන් රුක උඩට නගිනවා යන්නයි."
      },
      fa: {
        s: "موش کوچولو بالای چراغدان می‌رود",
        r: "Moush-e kouchoulou bâlâ-ye cherâqdân mi-ravad",
        e: "یعنی موش کوچولو؛ یعنی بالای چراغدان رفتن."
      }
    },
    {
      hi: {
        s: "तेल चुराकर खाता है, पर नीचे नहीं उतर पाता",
        r: "tel churākar khātā hai, par nīche nahīṁ utar pātā",
        e: "tōu का मतलब 'चुराना'；xià-bu-lái का मतलब है 'नीचे नहीं आ पाना' — bù लगा नेगेटिव बनाता है।"
      },
      ta: {
        s: "எண்ணெயைத் திருடிச் சாப்பிடுகிறது, ஆனால் கீழே இறங்க முடியவில்லை",
        r: "eṇṇeyait tiruṭic cāppiṭukiṟatu, āṉāl kīḻē iṟaṅka muṭiyavillai",
        e: "tōu என்றால் 'திருடு'; xià-bu-lái என்றால் 'கீழே வர முடியாது' — bù என்பது எதிர்மறை சொல்."
      },
      th: {
        s: "แอบกินน้ำมัน แต่ลงมาไม่ได้",
        r: "aep kin namman tae long ma mai dai",
        e: "tōu แปลว่า 'ขโมย (แอบ)'; xià-bu-lái แปลว่า 'ลงมาไม่ได้' — คำว่า bù ใช้แสดงการปฏิเสธ"
      },
      km: {
        s: "លួចប្រេងស៊ី, ចុះមកវិញមិនរួច",
        r: "luəc preeŋ sii, cuh mɔɔk viɲ mɨn ruəc",
        e: "គឺលួចប្រេងក្នុងចង្កៀងស៊ី; គឺចុះមកវិញមិនបាន។"
      },
      vi: {
        s: "Trộm dầu ăn, không xuống được",
        r: "",
        e: "là trộm dầu trong đèn ăn; là không xuống được."
      },
      id: {
        s: "Mencuri minyak dimakan, tidak bisa turun",
        r: "",
        e: "artinya mencuri minyak lampu dimakan; artinya tidak bisa turun."
      },
      ne: {
        s: "तेल चोरेर खायो, तल झर्न सकेन",
        r: "tel corera khāyo, tal jharna sakena",
        e: "भनेको दियोको तेल चोरेर खानु; भनेको तल झर्न नसक्नु हो।"
      },
      bn: {
        s: "তেল চুরি করে খায়, নামতে পারে না",
        r: "tel curi kare khāẏ, nāmte pāre nā",
        e: "বাতির তেল চুরি করে খায়, তারপর আর নিচে নামতে পারে না।"
      },
      es: {
        s: "Roba aceite para comer, y no puede bajar",
        r: "",
        e: "Roba el aceite de la lámpara para comer y luego no puede bajar."
      },
      en: {
        s: "It sneaks a taste of the oil, but can't get back down,",
        r: "",
        e: "tou means 'to steal a taste'; xia-bu-lai means 'can't come down' — the word bu makes it negative."
      },
      de: {
        s: "Stiehlt Öl zum Fressen, kommt nicht mehr herunter",
        r: "",
        e: "Es stiehlt das Lampenöl zum Fressen und kommt nicht mehr herunter."
      },
      my: {
        s: "ဆီခိုးစားပြီး ပြန်မဆင်းနိုင်ဘူး",
        r: "hsi-kho-sa-pyi pyan-ma-hsin-nain-bu",
        e: "မီးတိုင်က ဆီကို ခိုးစားပြီး ပြန်ဆင်းလို့ မရတော့ဘူး။"
      },
      ko: {
        s: "기름을 훔쳐 먹고, 내려오지 못해",
        r: "Gireumeul humchyeo meokgo, naeryeo-oji mothae",
        e: "는 기름을 훔쳐 먹는다는 뜻이다; 는 내려오지 못한다는 뜻이다."
      },
      ja: {
        s: "油を盗んで食べて、降りられない",
        r: "Abura o nusunde tabete, orirarenai",
        e: "油を盗んで食べるという意味である; 降りられないという意味である。"
      },
      si: {
        s: "තෙල් හොරකම් කරලා කාලා, බහින්න බෑ",
        r: "Tel horakam karala kala, bahin na ba",
        e: "යනු තෙල් හොරකම් කරලා කනවා යන්නයි; යනු බහින්න බෑ යන්නයි."
      },
      fa: {
        s: "روغن می‌دزدد و می‌خورد، پایین نمی‌تواند بیاید",
        r: "Rougghan mi-dozdad o mi-xorad, pâyin nemi-tavânad biyâyad",
        e: "یعنی روغن دزدیدن و خوردن؛ یعنی نمی‌تواند پایین بیاید."
      }
    },
    {
      hi: {
        s: "म्याऊँ-म्याऊँ-म्याऊँ, बिल्ली आ गई!",
        r: "myāũ-myāũ-myāũ, billī ā gaī!",
        e: "miāo miāo miāo बिल्ली की आवाज़ है (चीनी में बिल्ली 'म्याऊँ' करती है)；māo का मतलब 'बिल्ली'；lái-le का मतलब 'आ गई' है।"
      },
      ta: {
        s: "மியாவ் மியாவ் மியாவ், பூனை வந்துவிட்டது!",
        r: "miyāv miyāv miyāv, pūṉai vantuviṭṭatu!",
        e: "miāo miāo miāo என்பது சீன மொழியில் பூனையின் குரல்; māo என்றால் 'பூனை'; lái-le என்றால் 'வந்துவிட்டது'."
      },
      th: {
        s: "เหมียว เหมียว เหมียว แมวมาแล้ว!",
        r: "miao miao miao maeo ma laeo!",
        e: "miāo miāo miāo คือเสียงร้องของแมวในภาษาจีน; māo แปลว่า 'แมว'; lái-le แปลว่า 'มาแล้ว'"
      },
      km: {
        s: "ញ៉ូវៗៗ, ឆ្មាមកហើយ",
        r: "ɲoow-ɲoow-ɲoow, cʰmaa mɔɔk haəy",
        e: "ជាសំឡេងឆ្មា; គឺឆ្មាមកហើយ។"
      },
      vi: {
        s: "Meo meo meo, mèo đến rồi",
        r: "",
        e: "là tiếng mèo kêu; là mèo đến rồi."
      },
      id: {
        s: "Meong meong meong, kucing datang",
        r: "",
        e: "adalah suara kucing; artinya kucing datang."
      },
      ne: {
        s: "म्याउँ म्याउँ म्याउँ, बिरालो आयो",
        r: "myāũ myāũ myāũ, birālo āyo",
        e: "बिरालोको आवाज हो; भनेको बिरालो आयो हो।"
      },
      bn: {
        s: "মিয়াঁও মিয়াঁও মিয়াঁও, বিড়াল এলো",
        r: "miẏām̐ō miẏām̐ō miẏām̐ō, biṛāl elō",
        e: "বিড়ালের ডাকের শব্দের অনুকরণ। বিড়াল এসেছে!"
      },
      es: {
        s: "Miau, miau, miau: ¡viene el gato!",
        r: "",
        e: "Onomatopeya del maullido. ¡Viene el gato!"
      },
      en: {
        s: "Miaow, miaow, miaow — here comes the cat!",
        r: "",
        e: "miao miao miao is how a cat's meow sounds in Chinese; mao means 'cat'; lai-le means 'has come'."
      },
      de: {
        s: "Miau, miau, miau: die Katze kommt!",
        r: "",
        e: "Lautmalerei für das Miauen. Die Katze kommt!"
      },
      my: {
        s: "မြောင် မြောင် မြောင်၊ ကြောင်လာပြီ",
        r: "myoun myoun myoun, kyaun-la-pyi",
        e: "ကြောင်အော်သံကို တုပထားတာ။ ကြောင်လာပြီ!"
      },
      ko: {
        s: "야옹야옹야옹, 고양이가 왔어",
        r: "Yaong-yaong-yaong, goyangiga wasseo",
        e: "는 고양이 울음소리이다; 는 고양이가 왔다는 뜻이다."
      },
      ja: {
        s: "ニャーニャーニャー、猫が来た",
        r: "Nyā-nyā-nyā, neko ga kita",
        e: "猫の鳴き声である; 猫が来たという意味である。"
      },
      si: {
        s: "මියෑව් මියෑව් මියෑව්, පූසා ආවා",
        r: "Miyaav miyaav miyaav, pusa ava",
        e: "යනු පූසාගේ හඬයි; යනු පූසා ආවා යන්නයි."
      },
      fa: {
        s: "میومیومیو، گربه آمد",
        r: "Miyo-miyo-miyo, gorbe âmad",
        e: "صدای گربه است؛ یعنی گربه آمد."
      }
    },
    {
      hi: {
        s: "गड़बड़-गड़बड़ लुढ़कता नीचे आ गिरा",
        r: "gaṛbaṛ-gaṛbaṛ luṛhaktā nīche ā girā",
        e: "jī-li-gū-lū लुढ़कने की आवाज़ है (ध्वन्यात्मक शब्द)；gǔn-xià-lái का मतलब है 'लुढ़ककर नीचे आना'।"
      },
      ta: {
        s: "கடகடவென உருண்டு கீழே விழுகிறது",
        r: "kaṭakaṭaveṉa uruṇṭu kīḻē viḻukiṟatu",
        e: "jī-li-gū-lū என்பது உருளும் ஒலி; gǔn-xià-lái என்றால் 'உருண்டு கீழே வா'."
      },
      th: {
        s: "กลิ้งจีลีกลูกลงมา",
        r: "kling chi li ku lu long ma",
        e: "jī-li-gū-lū คือเสียงกลิ้งตกลงมา; gǔn-xià-lái แปลว่า 'กลิ้งลงมาข้างล่าง'"
      },
      km: {
        s: "គ្លីគ្លរធ្លាក់ចុះមក",
        r: "klii-klor tʰleak cuh mɔɔk",
        e: "ជាសំឡេងរមៀល; គឺរមៀលធ្លាក់ចុះមក។"
      },
      vi: {
        s: "Lăn lông lốc xuống",
        r: "",
        e: "là tiếng lăn; là lăn xuống."
      },
      id: {
        s: "Menggelinding jatuh ke bawah",
        r: "",
        e: "adalah bunyi menggelinding; artinya menggelinding jatuh."
      },
      ne: {
        s: "गुडुल्किँदै तल झर्यो",
        r: "guḍulkĩdai tal jharyo",
        e: "गुडुल्ने आवाज हो; भनेको गुडुल्किँदै तल झर्नु हो।"
      },
      bn: {
        s: "গিলি গুলু করে গড়িয়ে পড়ে",
        r: "gili gulu kare gaṛiẏe paṛe",
        e: "গড়িয়ে পড়ার শব্দ। ইঁদুর ভয়ে গড়িয়ে নিচে পড়ে যায়।"
      },
      es: {
        s: "Rueda hacia abajo: ¡gulugulu!",
        r: "",
        e: "«Jiligulu» imita el rodar. El ratón rueda hasta abajo asustado."
      },
      en: {
        s: "With a jiligulu tumble, it rolls right back down!",
        r: "",
        e: "jiligulu is the sound of something tumbling down; gun-xia-lai means 'roll down and land below'."
      },
      de: {
        s: "Kullert hinunter: kuller-kuller!",
        r: "",
        e: "«Jiligulu» ahmt das Kullern nach. Die Maus kullert erschrocken hinunter."
      },
      my: {
        s: "ဂလုဂလုနဲ့ လိမ့်ကျသွားတယ်",
        r: "ga-lu-ga-lu-ne lein-kya-thwa-day",
        e: "「ကျီလီကူလူ」ဟာ လိမ့်ကျသံကို တုပထားတာ။ ကြွက်က ကြောက်ပြီး လိမ့်ကျသွားတယ်။"
      },
      ko: {
        s: "데굴데굴 굴러떨어져",
        r: "Degul-degul gulleo-tteoreojyeo",
        e: "는 데굴데굴 구르는 소리이다; 는 굴러 떨어진다는 뜻이다."
      },
      ja: {
        s: "ごろごろ転がり落ちる",
        r: "Gorogoro korogari-ochiru",
        e: "ごろごろ転がる音である; 転がり落ちるという意味である。"
      },
      si: {
        s: "ගුලි වෙවී පෙරළිලා වැටෙනවා",
        r: "Guli vevi peralila vatenava",
        e: "යනු ගුලි වෙවී පෙරළෙන ශබ්දයයි; යනු පෙරළිලා වැටෙනවා යන්නයි."
      },
      fa: {
        s: "غلتان غلتان می‌غلتد پایین",
        r: "Ghaltân ghaltân mi-qaltad pâyin",
        e: "صدای غلتیدن است؛ یعنی غلتیدن به پایین."
      }
    }
  ],
  liangzhilaohu: [
    {
      hi: {
        s: "दो बाघ, दो बाघ,",
        r: "do bāgh, do bāgh,",
        e: "liǎng का मतलब है 'दो'；zhī जानवरों की गिनती का मापशब्द है；lǎohǔ का मतलब 'बाघ' है।"
      },
      ta: {
        s: "இரண்டு புலிகள், இரண்டு புலிகள்,",
        r: "iraṇṭu pulikaḷ, iraṇṭu pulikaḷ,",
        e: "liǎng என்றால் 'இரண்டு'; zhī என்பது விலங்குகளை எண்ணும் சொல்; lǎohǔ என்றால் 'புலி'."
      },
      th: {
        s: "เสือสองตัว เสือสองตัว",
        r: "suea song tua suea song tua",
        e: "liǎng แปลว่า 'สอง'; zhī คือลักษณนามใช้กับสัตว์; lǎohǔ แปลว่า 'เสือ'"
      },
      km: {
        s: "ខ្លាពីរក្បាល, ខ្លាពីរក្បាល,",
        r: "kʰlaa pii kbaal, kʰlaa pii kbaal,",
        e: "គឺខ្លាពីរក្បាល (ពាក្យដដែលៗដើម្បីច្រៀង)។"
      },
      vi: {
        s: "Hai con hổ, hai con hổ,",
        r: "",
        e: "là hai con hổ (lặp lại để hát)."
      },
      id: {
        s: "Dua ekor harimau, dua ekor harimau,",
        r: "",
        e: "artinya dua ekor harimau (diulang untuk dinyanyikan)."
      },
      ne: {
        s: "दुईवटा बाघ, दुईवटा बाघ,",
        r: "duīwaṭā bāgh, duīwaṭā bāgh,",
        e: "भनेको दुईवटा बाघ (गाउनका लागि दोहोरिएको) हो।"
      },
      bn: {
        s: "দুটি বাঘ, দুটি বাঘ,",
        r: "dūṭi bāgh, dūṭi bāgh,",
        e: "দুটি মানে দুটি, বাঘ মানে বাঘ — গানের দুই নায়কের পরিচয়।"
      },
      es: {
        s: "Dos tigres, dos tigres,",
        r: "",
        e: "Dos tigres: los dos protagonistas de la canción."
      },
      en: {
        s: "Two tigers, two tigers,",
        r: "",
        e: "liang means 'two'; zhi is the measure word used for animals; laohu means 'tiger'."
      },
      de: {
        s: "Zwei Tiger, zwei Tiger,",
        r: "",
        e: "Zwei Tiger sind die beiden Hauptfiguren des Liedes."
      },
      my: {
        s: "ကျားနှစ်ကောင်၊ ကျားနှစ်ကောင်၊",
        r: "kya-hna-kaung, kya-hna-kaung,",
        e: "ကျား ဆိုတာ ကျား၊ နှစ်ကောင် ဆိုတာ နှစ်ကောင် — သီချင်းထဲက ဇာတ်ကောင်နှစ်ကောင်။"
      },
      ko: {
        s: "호랑이 두 마리, 호랑이 두 마리,",
        r: "Horangi du mari, horangi du mari,",
        e: "는 호랑이 두 마리라는 뜻이다."
      },
      ja: {
        s: "トラが二頭、トラが二頭、",
        r: "Tora ga nitō, tora ga nitō,",
        e: "トラが二頭という意味である。"
      },
      si: {
        s: "කොටින් දෙන්නෙක්, කොටින් දෙන්නෙක්,",
        r: "Kotin dennek, kotin dennek,",
        e: "යනු කොටින් දෙන්නෙක් යන්නයි."
      },
      fa: {
        s: "دو ببر، دو ببر،",
        r: "Do babr, do babr,",
        e: "یعنی دو ببر."
      }
    },
    {
      hi: {
        s: "तेज़ दौड़ते हैं, तेज़ दौड़ते हैं,",
        r: "tez dauṛte haiṁ, tez dauṛte haiṁ,",
        e: "pǎo का मतलब 'दौड़ना'；de-kuài बताता है 'तेज़ी से' — de के बाद क्रिया का ढंग बताया जाता है।"
      },
      ta: {
        s: "வேகமாக ஓடுகின்றன, வேகமாக ஓடுகின்றன,",
        r: "vēkamāka ōṭukiṉṟaṉa, vēkamāka ōṭukiṉṟaṉa,",
        e: "pǎo என்றால் 'ஓடு'; de-kuài என்றால் 'வேகமாக' — வினைச்சொல்லுக்குப் பிறகு de வந்து செயலின் தன்மையைக் காட்டும்."
      },
      th: {
        s: "วิ่งเร็ว วิ่งเร็ว",
        r: "wing reo wing reo",
        e: "pǎo แปลว่า 'วิ่ง'; de-kuài แปลว่า 'อย่างรวดเร็ว' — ในภาษาจีน de ตามหลังคำกริยาเพื่อบอกวิธีการกระทำ"
      },
      km: {
        s: "រត់លឿន, រត់លឿន,",
        r: "rʊt lɨən, rʊt lɨən,",
        e: "គឺរត់បានលឿន។"
      },
      vi: {
        s: "Chạy nhanh, chạy nhanh,",
        r: "",
        e: "là chạy nhanh."
      },
      id: {
        s: "Larinya cepat, larinya cepat,",
        r: "",
        e: "artinya larinya cepat."
      },
      ne: {
        s: "छिटो दौडन्छ, छिटो दौडन्छ,",
        r: "chhiṭo dauḍanchha, chhiṭo dauḍanchha,",
        e: "भनेको छिटो दौडनु हो।"
      },
      bn: {
        s: "খুব দ্রুত দৌড়ায়, খুব দ্রুত দৌড়ায়,",
        r: "khub druto dauṛāẏ, khub druto dauṛāẏ,",
        e: "দ্রুত মানে তাড়াতাড়ি, দৌড়ায় মানে দৌড়ায় — বাঘ দুটি খুব জোরে দৌড়ায়।"
      },
      es: {
        s: "Corren rápido, corren rápido,",
        r: "",
        e: "Corren rápido: los tigres corren a toda velocidad."
      },
      en: {
        s: "They run so fast, they run so fast,",
        r: "",
        e: "pao means 'to run'; de-kuai describes how fast — in Chinese, de comes after the verb to show the manner of the action."
      },
      de: {
        s: "Sie laufen schnell, sie laufen schnell,",
        r: "",
        e: "Sie laufen schnell — die Tiger rennen ganz flott."
      },
      my: {
        s: "အမြန်ပြေးတယ်၊ အမြန်ပြေးတယ်၊",
        r: "a-myan-pye-tae, a-myan-pye-tae,",
        e: "အမြန် ဆိုတာ မြန်မြန်၊ ပြေးတယ် ဆိုတာ ပြေးတယ် — ကျားနှစ်ကောင် အရမ်းမြန်မြန်ပြေးတယ်။"
      },
      ko: {
        s: "빨리 달려, 빨리 달려,",
        r: "Ppalli dallyeo, ppalli dallyeo,",
        e: "는 빨리 달린다는 뜻이다."
      },
      ja: {
        s: "走るのが速い、走るのが速い、",
        r: "Hashiru no ga hayai, hashiru no ga hayai,",
        e: "走るのが速いという意味である。"
      },
      si: {
        s: "වේගයෙන් දුවනවා, වේගයෙන් දුවනවා,",
        r: "Vegayen duvanava, vegayen duvanava,",
        e: "යනු වේගයෙන් දුවනවා යන්නයි."
      },
      fa: {
        s: "تند می‌دوند، تند می‌دوند،",
        r: "Tond mi-davand, tond mi-davand,",
        e: "یعنی تند دویدن."
      }
    },
    {
      hi: {
        s: "एक के कान नहीं हैं, एक की पूँछ नहीं है,",
        r: "ek ke kān nahīṁ haiṁ, ek kī pūṇchh nahīṁ hai,",
        e: "méi-yǒu का मतलब है 'नहीं है' (कुछ न होना)；ěr-duo का मतलब 'कान'；wěi-ba का मतलब 'पूँछ'।"
      },
      ta: {
        s: "ஒன்றுக்குக் காதுகள் இல்லை, ஒன்றுக்கு வால் இல்லை,",
        r: "oṉṟukku kāṭukaḷ illai, oṉṟukku vāl illai,",
        e: "méi-yǒu என்றால் 'இல்லை'; ěr-duo என்றால் 'காதுகள்'; wěi-ba என்றால் 'வால்'."
      },
      th: {
        s: "ตัวหนึ่งไม่มีหู ตัวหนึ่งไม่มีหาง",
        r: "tua neung mai mi hu tua neung mai mi hang",
        e: "méi-yǒu แปลว่า 'ไม่มี'; ěr-duo แปลว่า 'หู'; wěi-ba แปลว่า 'หาง'"
      },
      km: {
        s: "មួយក្បាលគ្មានត្រចៀក, មួយក្បាលគ្មានកន្ទុយ,",
        r: "muəy kbaal kmien trɑciek, muəy kbaal kmien kɑntuy,",
        e: "គឺមួយក្បាលគ្មានត្រចៀក; គឺមួយក្បាលគ្មានកន្ទុយ។"
      },
      vi: {
        s: "Một con không có tai, một con không có đuôi,",
        r: "",
        e: "là một con không có tai; là một con không có đuôi."
      },
      id: {
        s: "Satu tidak bertelinga, satu tidak berekor,",
        r: "",
        e: "artinya satu tidak bertelinga; artinya satu tidak berekor."
      },
      ne: {
        s: "एउटाको कान छैन, एउटाको पुच्छर छैन,",
        r: "euṭāko kān chhaina, euṭāko puchchhar chhaina,",
        e: "भनेको एउटाको कान नहुनु; भनेको एउटाको पुच्छर नहुनु हो।"
      },
      bn: {
        s: "একটার কান নেই, একটার লেজ নেই,",
        r: "ekṭār kān nei, ekṭār lej nei,",
        e: "কান মানে কান, লেজ মানে লেজ, নেই মানে নেই — একটার কান নেই, আরেকটার লেজ নেই।"
      },
      es: {
        s: "Uno no tiene orejas, el otro no tiene cola,",
        r: "",
        e: "Orejas son las orejas y cola es la cola: a uno le faltan las orejas y al otro la cola."
      },
      en: {
        s: "One has no ears, and one has no tail,",
        r: "",
        e: "mei-you means 'does not have'; erduo means 'ears'; weiba means 'tail'."
      },
      de: {
        s: "Einer hat keine Ohren, einer hat keinen Schwanz,",
        r: "",
        e: "Ohren sind die Ohren, Schwanz ist der Schwanz — dem einen fehlen die Ohren, dem anderen der Schwanz."
      },
      my: {
        s: "တစ်ကောင် နားရွက်မရှိ၊ တစ်ကောင် အမြီးမရှိ၊",
        r: "ta-kaung na-ywet-ma-shi, ta-kaung a-myee-ma-shi,",
        e: "နားရွက် ဆိုတာ နား၊ အမြီး ဆိုတာ အမြီး — တစ်ကောင်မှာ နားရွက်မရှိ၊ တစ်ကောင်မှာ အမြီးမရှိ။"
      },
      ko: {
        s: "한 마리는 귀가 없고, 한 마리는 꼬리가 없어,",
        r: "Han marineun gwiga eopgo, han marineun kkoriga eopseo,",
        e: "는 한 마리라는 뜻이다; 는 귀가 없다는 뜻이다; 는 꼬리가 없다는 뜻이다."
      },
      ja: {
        s: "一頭は耳がなくて、一頭はしっぽがなくて、",
        r: "Ittō wa mimi ga nakute, ittō wa shippo ga nakute,",
        e: "一頭という意味である; 耳がないという意味である; しっぽがないという意味である。"
      },
      si: {
        s: "එකෙකුට කන් නැහැ, එකෙකුට නගුට නැහැ,",
        r: "Ehekuta kan naha, ehekuta naguta naha,",
        e: "යනු එකෙක් යන්නයි; යනු කන් නැහැ යන්නයි; යනු නගුට නැහැ යන්නයි."
      },
      fa: {
        s: "یکی گوش ندارد، یکی دم ندارد،",
        r: "Yeki goush nadârad, yeki dom nadârad,",
        e: "یعنی یکی؛ یعنی گوش ندارد؛ یعنی دم ندارد."
      }
    },
    {
      hi: {
        s: "कितने अजीब हैं! कितने अजीब हैं!",
        r: "kitne ajīb haiṁ! kitne ajīb haiṁ!",
        e: "zhēn का मतलब है 'सच में / बहुत'；qí-guài का मतलब है 'अजीब' — मिलकर 'कितना अजीब!' जैसा भाव।"
      },
      ta: {
        s: "என்ன விசித்திரம்! என்ன விசித்திரம்!",
        r: "eṉṉa vicittiram! eṉṉa vicittiram!",
        e: "zhēn என்றால் 'உண்மையில் / மிகவும்'; qí-guài என்றால் 'விசித்திரம்' — இரண்டும் சேர்ந்து ஆச்சரியக் குறிப்பு ஆகும்."
      },
      th: {
        s: "แปลกจริง ๆ! แปลกจริง ๆ!",
        r: "plaek ching ching! plaek ching ching!",
        e: "zhēn แปลว่า 'จริง ๆ / มาก'; qí-guài แปลว่า 'แปลก' — รวมกันเป็นคำอุทาน 'แปลกจริง ๆ!'"
      },
      km: {
        s: "ចម្លែកណាស់! ចម្លែកណាស់!",
        r: "cɑmleek naah! cɑmleek naah!",
        e: "គឺចម្លែកខ្លាំងណាស់។"
      },
      vi: {
        s: "Thật kỳ lạ! Thật kỳ lạ!",
        r: "",
        e: "là thật kỳ lạ."
      },
      id: {
        s: "Sungguh aneh! Sungguh aneh!",
        r: "",
        e: "artinya sungguh aneh."
      },
      ne: {
        s: "साँच्चै अचम्म! साँच्चै अचम्म!",
        r: "sā̃ccai achamma! sā̃ccai achamma!",
        e: "भनेको साँच्चै अचम्म हो।"
      },
      bn: {
        s: "কত অদ্ভুত! কত অদ্ভুত!",
        r: "koto odbhut! koto odbhut!",
        e: "অদ্ভুত মানে আশ্চর্যজনক — কান-লেজহীন বাঘ দেখে অবাক হওয়ার ভাব।"
      },
      es: {
        s: "¡Qué raro! ¡Qué raro!",
        r: "",
        e: "¡Qué raro! Expresa sorpresa ante los tigres sin orejas ni cola."
      },
      en: {
        s: "How strange! How strange!",
        r: "",
        e: "zhen means 'really'; qiguai means 'strange' — together they make an exclamation: 'How strange!'."
      },
      de: {
        s: "Wie seltsam! Wie seltsam!",
        r: "",
        e: "Wie seltsam! — drückt das Staunen über die Tiger ohne Ohren und Schwanz aus."
      },
      my: {
        s: "တကယ်ထူးဆန်းတယ်! တကယ်ထူးဆန်းတယ်!",
        r: "ta-kei htu-san-tei! ta-kei htu-san-tei!",
        e: "ထူးဆန်းတယ် ဆိုတာ အံ့ဩစရာ — နားရွက်အမြီးမရှိတဲ့ ကျားတွေကိုတွေ့ပြီး အံ့ဩတာ။"
      },
      ko: {
        s: "정말 이상해! 정말 이상해!",
        r: "Jeongmal isanghae! jeongmal isanghae!",
        e: "는 정말 이상하다는 뜻이다."
      },
      ja: {
        s: "本当に変だ！本当に変だ！",
        r: "Hontō ni hen da! hontō ni hen da!",
        e: "本当に変だという意味である。"
      },
      si: {
        s: "ඇත්තටම පුදුමයි! ඇත්තටම පුදුමයි!",
        r: "Attatama pudumayi! attatama pudumayi!",
        e: "යනු ඇත්තටම පුදුමයි යන්නයි."
      },
      fa: {
        s: "واقعاً عجیب است! واقعاً عجیب است!",
        r: "Vâghe'an ajib ast! vâghe'an ajib ast!",
        e: "یعنی واقعاً عجیب است."
      }
    }
  ],
  xiaoxingxing: [
    {
      hi: {
        s: "टिमटिम-टिमटिम चमकते हैं, सारे आसमान में छोटे-छोटे तारे हैं",
        r: "ṭimṭim-ṭimṭim chamakte haiṁ, sāre āsmān meṁ chhoṭe-chhoṭe tāre haiṁ",
        e: "yī-shǎn-yī-shǎn का मतलब 'टिमटिमाना'；liàng-jīng-jīng का मतलब 'चमकदार'；mǎn-tiān का मतलब 'पूरा आसमान'；xiǎo-xīng-xīng का मतलब 'छोटे तारे'।"
      },
      ta: {
        s: "மினுக் மினுக் என மின்னுகின்றன, வானம் முழுவதும் சின்னஞ்சிறு நட்சத்திரங்கள்",
        r: "miṉuk miṉuk eṉa miṉṉukiṉṟaṉa, vāṉam muḻuvatum ciṉṉañciṟu naṭcattiraṅkaḷ",
        e: "yī-shǎn-yī-shǎn என்றால் 'மின்னுதல்'; liàng-jīng-jīng என்றால் 'பளபளப்பாக ஒளிர்தல்'; mǎn-tiān என்றால் 'முழு வானம்'; xiǎo-xīng-xīng என்றால் 'சின்னஞ்சிறு நட்சத்திரங்கள்'."
      },
      th: {
        s: "กระพริบวิบวับส่องแสง ทั้งท้องฟ้าเต็มไปด้วยดาวดวงน้อย",
        r: "kraphrip wip wap song saeng thang thong fa tem pai duai dao duang noi",
        e: "yī-shǎn-yī-shǎn แปลว่า 'กระพริบ'; liàng-jīng-jīng แปลว่า 'ระยิบระยับ'; mǎn-tiān แปลว่า 'ทั้งท้องฟ้า'; xiǎo-xīng-xīng แปลว่า 'ดาวดวงน้อย'"
      },
      km: {
        s: "ភ្លឺផ្លេកៗចែងចាំង, ពេញមេឃសុទ្ធតែផ្កាយតូចៗ",
        r: "pʰləə pʰleek-pʰleek caeŋ-caaŋ, peɲ meek sot tae pʰkaay touc-touc",
        e: "គឺភ្លឺផ្លេកៗ; គឺពេញមេឃសុទ្ធតែផ្កាយតូចៗ។"
      },
      vi: {
        s: "Lấp lánh lấp lánh sáng ngời, đầy trời đều là sao nhỏ",
        r: "",
        e: "là lấp lánh sáng ngời; là đầy trời sao nhỏ."
      },
      id: {
        s: "Berkelip-kelip cemerlang, langit penuh bintang kecil",
        r: "",
        e: "artinya berkelip cemerlang; artinya langit penuh bintang kecil."
      },
      ne: {
        s: "झिलमिल झिलमिल चम्किलो, आकाशभरि साना तारा छन्",
        r: "jhilamil jhilamil chamkilo, ākāśbhari sānā tārā chhan",
        e: "भनेको झिलमिल चम्कनु; भनेको आकाशभरि साना तारा हुनु हो।"
      },
      bn: {
        s: "ঝিকমিক ঝিকমিক জ্বলজ্বলে, আকাশভরা ছোট তারা",
        r: "jhikmik jhikmik jbaljbale, ākāśbharā choṭo tārā",
        e: "ঝিকমিক মানে মিটমিট করা, তারা মানে তারা — আকাশে অসংখ্য ছোট তারা জ্বলজ্বল করছে।"
      },
      es: {
        s: "Brillan, brillan, centellean, el cielo está lleno de estrellitas",
        r: "",
        e: "Estrellitas (diminutivo de estrella): el cielo está lleno de pequeñas estrellas que parpadean."
      },
      en: {
        s: "Twinkle, twinkle, sparkling bright, the whole sky is full of little stars,",
        r: "",
        e: "yi-shan-yi-shan means 'twinkling'; liang-jing-jing means 'sparkling bright'; man-tian means 'the whole sky'; xiao-xing-xing means 'little stars'."
      },
      de: {
        s: "Funkeln, funkeln, helles Licht, der Himmel ist voll kleiner Sterne",
        r: "",
        e: "Kleine Sterne funkeln am Himmel — das ganze Firmament ist voll davon."
      },
      my: {
        s: "မှိတ်တုတ်မှိတ်တုတ် တောက်ပ၊ ကောင်းကင်မှာ ကြယ်ငယ်လေးတွေပြည့်",
        r: "hmeik-toke-hmeik-toke tauk-pa, kaung-kin-hma kye-nge-lay-twe-pyay",
        e: "မှိတ်တုတ် ဆိုတာ မှိတ်တုတ်မှိတ်တုတ်၊ ကြယ် ဆိုတာ ကြယ် — ကောင်းကင်တစ်ခုလုံး ကြယ်ငယ်လေးတွေ တောက်ပနေတယ်။"
      },
      ko: {
        s: "반짝반짝 빛나는, 하늘 가득 작은 별들",
        r: "Banjjak-banjjak bitnaneun, haneul gadeuk jageun byeoldeul",
        e: "는 반짝반짝 빛난다는 뜻이다; 는 하늘 가득이라는 뜻이다; 는 작은 별들이다."
      },
      ja: {
        s: "きらきら光る、空いっぱいの小さな星",
        r: "Kirakira hikaru, sora ippai no chiisana hoshi",
        e: "きらきら光るという意味である; 空いっぱいという意味である; 小さな星である。"
      },
      si: {
        s: "දිලි දිලි දිලිසෙන, අහස පුරාම පොඩි තරු",
        r: "Dili dili dilisena, ahasa purama podi taru",
        e: "යනු දිලි දිලි දිලිසෙනවා යන්නයි; යනු අහස පුරාම යන්නයි; යනු පොඩි තරුය."
      },
      fa: {
        s: "چشمک‌زن و درخشان، آسمان پر از ستاره‌های کوچک",
        r: "Cheshmak-zan o deraxshân, âsemân por az setâre-hâ-ye kouchak",
        e: "یعنی چشمک‌زن و درخشان؛ یعنی پر از آسمان؛ یعنی ستاره‌های کوچک."
      }
    },
    {
      hi: {
        s: "आसमान में टंगे रोशनी बिखेरते हैं, जैसे बहुत सारी छोटी-छोटी आँखें",
        r: "āsmān meṁ ṭaṅge roshnī bikherte haiṁ, jaise bahut sārī chhoṭī-chhoṭī āṅkheṁ",
        e: "guà का मतलब 'लटकना'；tiān-shàng का मतलब 'आसमान में'；hǎo-xiàng का मतलब 'जैसे लगना'；yǎn-jīng का मतलब 'आँखें'।"
      },
      ta: {
        s: "வானில் தொங்கி ஒளி வீசுகின்றன, பல சின்னஞ்சிறு கண்களைப் போல",
        r: "vāṉil toṅki oḷi vīcukiṉṟaṉa, pala ciṉṉañciṟu kaṇkaḷaip pōla",
        e: "guà என்றால் 'தொங்கு'; tiān-shàng என்றால் 'வானில்'; hǎo-xiàng என்றால் 'போல'; yǎn-jīng என்றால் 'கண்கள்'."
      },
      th: {
        s: "แขวนอยู่บนฟ้าส่องแสงสว่าง เหมือนดวงตาน้อย ๆ มากมาย",
        r: "khwaen yu bon fa song saeng sawang muean duang ta noi noi mak mai",
        e: "guà แปลว่า 'แขวน'; tiān-shàng แปลว่า 'บนท้องฟ้า'; hǎo-xiàng แปลว่า 'เหมือน'; yǎn-jīng แปลว่า 'ดวงตา'"
      },
      km: {
        s: "ព្យួរនៅលើមេឃបញ្ចេញពន្លឺ, ដូចភ្នែកតូចៗជាច្រើន",
        r: "pyuə nɨw ləə meek bɑɲceɲ pʊnləə, douch pʰneek touc-touc cee craən",
        e: "គឺនៅលើមេឃបញ្ចេញពន្លឺ; គឺដូចភ្នែកតូចៗជាច្រើន។"
      },
      vi: {
        s: "Treo trên trời tỏa ánh sáng, như bao đôi mắt nhỏ",
        r: "",
        e: "là treo trên trời tỏa sáng; là như nhiều đôi mắt nhỏ."
      },
      id: {
        s: "Bergantung di langit memancarkan cahaya, seperti banyak mata kecil",
        r: "",
        e: "artinya bergantung di langit memancarkan cahaya; artinya seperti banyak mata kecil."
      },
      ne: {
        s: "आकाशमा झुन्डिएर उज्यालो दिन्छन्, धेरै साना आँखाजस्ता",
        r: "ākāśmā jhunḍiera ujyālo dinchhan, dherai sānā ā̃khājastā",
        e: "भनेको आकाशमा झुन्डिएर उज्यालो दिनु; भनेको धेरै साना आँखाजस्तो हो।"
      },
      bn: {
        s: "আকাশে ঝুলে আলো দেয়, যেন অনেক ছোট চোখ",
        r: "ākāśe jhule ālo deẏ, yeno anek choṭo chokh",
        e: "আকাশ মানে আকাশ, আলো মানে আলো, চোখ মানে চোখ — তারাগুলো যেন আকাশের দিকে তাকিয়ে থাকা ছোট ছোট চোখ।"
      },
      es: {
        s: "Cuelgan del cielo dando luz, como muchos ojitos",
        r: "",
        e: "Ojitos (diminutivo de ojos): las estrellas parecen pequeños ojos que miran desde el cielo."
      },
      en: {
        s: "Hanging in the sky, they shine their light, like so many little eyes,",
        r: "",
        e: "gua means 'to hang'; tian-shang means 'in the sky'; hao-xiang means 'as if, just like'; yan-jing means 'eyes'."
      },
      de: {
        s: "Sie hängen am Himmel und leuchten, wie viele kleine Augen",
        r: "",
        e: "Kleine Augen — die Sterne sehen aus wie viele kleine Augen, die vom Himmel herabschauen."
      },
      my: {
        s: "ကောင်းကင်မှာဆွဲ အလင်းပေး၊ မျက်လုံးငယ်လေးတွေလိုပဲ",
        r: "kaung-kin-hma hswe a-lin-pay, myet-lone-nge-lay-twe-lo-be",
        e: "ကောင်းကင် ဆိုတာ မိုး၊ အလင်း ဆိုတာ အလင်း၊ မျက်လုံး ဆိုတာ မျက်စိ — ကြယ်တွေဟာ ကောင်းကင်က ကြည့်နေတဲ့ မျက်လုံးငယ်လေးတွေလိုပဲ။"
      },
      ko: {
        s: "하늘에 걸려 빛을 내고, 마치 수많은 작은 눈 같아",
        r: "Haneure geollyeo bicheul naego, machi sumaneun jageun nun gata",
        e: "는 하늘에 걸렸다는 뜻이다; 는 빛을 낸다는 뜻이다; 는 수많은 작은 눈 같다는 비유이다."
      },
      ja: {
        s: "空にかかって光を放ち、まるでたくさんの小さな目のよう",
        r: "Sora ni kakatte hikari o hanachi, marude takusan no chiisana me no yō",
        e: "空にかかっているという意味である; 光を放つという意味である; たくさんの小さな目のようなたとえである。"
      },
      si: {
        s: "අහසේ එල්ලීලා එළිය දෙනවා, පොඩි ඇස් ගොඩක් වගේ",
        r: "Ahase ellila eliya denava, podi as godak vage",
        e: "යනු අහසේ එල්ලීලා යන්නයි; යනු එළිය දෙනවා යන්නයි; යනු පොඩි ඇස් ගොඩක් වගේ යන උපමාවයි."
      },
      fa: {
        s: "در آسمان آویخته‌اند و نور می‌دهند، مثل چشم‌های کوچک بسیار",
        r: "Dar âsemân âvixte-and o nour mi-dahand, mesl-e cheshm-hâ-ye kouchak-e besyâr",
        e: "یعنی در آسمان آویخته؛ یعنی نور دادن؛ تشبیه به چشم‌های کوچک بسیار است."
      }
    }
  ],
  zaofeiji: [
    {
      hi: {
        s: "हवाई जहाज़ बनाओ, हवाई जहाज़ बनाओ, हरी घास के मैदान में आओ",
        r: "havāī jahāz banāo, havāī jahāz banāo, harī ghās ke maidān meṁ āo",
        e: "zào का मतलब है 'बनाना'；fēi-jī का मतलब 'हवाई जहाज़' (fēi = उड़ना, jī = मशीन)；qīng-cǎo-dì का मतलब 'हरी घास का मैदान'।"
      },
      ta: {
        s: "விமானம் செய்வோம், விமானம் செய்வோம், பசும்புல் தரைக்கு வாருங்கள்",
        r: "vimāṉam ceyvōm, vimāṉam ceyvōm, pacumpil taraikku vāruṅkaḷ",
        e: "zào என்றால் 'செய் / கட்டு'; fēi-jī என்றால் 'விமானம்' (fēi = பற, jī = இயந்திரம்); qīng-cǎo-dì என்றால் 'பசும்புல் தரை'."
      },
      th: {
        s: "ทำเครื่องบิน ทำเครื่องบิน มาที่ทุ่งหญ้าเขียว",
        r: "tham khrueang bin tham khrueang bin ma thi thung ya khiao",
        e: "zào แปลว่า 'ทำ / สร้าง'; fēi-jī แปลว่า 'เครื่องบิน' (fēi = บิน, jī = เครื่องจักร); qīng-cǎo-dì แปลว่า 'ทุ่งหญ้าเขียว'"
      },
      km: {
        s: "ធ្វើយន្តហោះ, ធ្វើយន្តហោះ, មកដល់វាលស្មៅបៃតង",
        r: "tvəə yɔn-hɔh, tvəə yɔn-hɔh, mɔɔk dɑl viel smaaw biey-tɑng",
        e: "គឺធ្វើ (លេងធ្វើ) យន្តហោះ; គឺមកដល់វាលស្មៅបៃតង។"
      },
      vi: {
        s: "Làm máy bay, làm máy bay, đến bãi cỏ xanh",
        r: "",
        e: "là làm (chơi) máy bay; là đến bãi cỏ xanh."
      },
      id: {
        s: "Membuat pesawat, membuat pesawat, datang ke padang rumput hijau",
        r: "",
        e: "artinya membuat (bermain) pesawat; artinya datang ke padang rumput hijau."
      },
      ne: {
        s: "हवाइजहाज बनाऔँ, हवाइजहाज बनाऔँ, हरियो चौरमा आऔँ",
        r: "hawāijahāj banāaũ, hawāijahāj banāaũ, hariyo cauramā āaũ",
        e: "भनेको (खेलेर) हवाइजहाज बनाउनु; भनेको हरियो चौरमा आउनु हो।"
      },
      bn: {
        s: "বিমান বানাই, বিমান বানাই, সবুজ ঘাসের মাঠে আসি",
        r: "bimān bānāi, bimān bānāi, sobuj ghāser māṭhe āsi",
        e: "বিমান মানে উড়োজাহাজ, সবুজ ঘাসের মাঠ মানে সবুজ ঘাসের মাঠ — খেলার জন্য সবাই মাঠে জড়ো হয়।"
      },
      es: {
        s: "Hagamos un avión, hagamos un avión, vamos al prado verde",
        r: "",
        e: "El prado verde: todos se reúnen en el campo de hierba para jugar al avión."
      },
      en: {
        s: "Build a plane, build a plane, let's come to the green meadow,",
        r: "",
        e: "zao means 'to build'; feiji means 'airplane' (fei = fly, ji = machine); qing-cao-di means 'green grassy field'."
      },
      de: {
        s: "Wir bauen ein Flugzeug, wir bauen ein Flugzeug, wir kommen auf die grüne Wiese",
        r: "",
        e: "Die grüne Wiese — alle versammeln sich auf der Wiese, um Flugzeug zu spielen."
      },
      my: {
        s: "လေယာဉ်လုပ်၊ လေယာဉ်လုပ်၊ မြက်ခင်းစိမ်းဆီလာ",
        r: "lay-yin-loke, lay-yin-loke, myet-khin-sein-hsi-la",
        e: "လေယာဉ် ဆိုတာ လေယာဉ်၊ မြက်ခင်းစိမ်း ဆိုတာ မြက်ခင်းစိမ်း — ကစားဖို့ အားလုံး မြက်ခင်းမှာ စုကြတယ်။"
      },
      ko: {
        s: "비행기 만들어, 비행기 만들어, 푸른 잔디밭에 와",
        r: "Bihaenggi mandeureo, bihaenggi mandeureo, pureun jandibate wa",
        e: "는 비행기를 만든다는 뜻이다; 는 푸른 잔디밭에 온다는 뜻이다."
      },
      ja: {
        s: "飛行機を作ろう、飛行機を作ろう、青い草原に来て",
        r: "Hikōki o tsukurō, hikōki o tsukurō, aoi sōgen ni kite",
        e: "飛行機を作るという意味である; 青い草原に来るという意味である。"
      },
      si: {
        s: "ගුවන් යානය හදමු, ගුවන් යානය හදමු, කොළ තණ බිමට එමු",
        r: "Guvan yanaya hadamu, guvan yanaya hadamu, kola tana bimata emu",
        e: "යනු ගුවන් යානය හදනවා යන්නයි; යනු කොළ තණ බිමට එනවා යන්නයි."
      },
      fa: {
        s: "هواپیما بسازیم، هواپیما بسازیم، به چمنزار سبز بیاییم",
        r: "Havâpeymâ besâzim, havâpeymâ besâzim, be chaman-zâr-e sabz biyâyim",
        e: "یعنی هواپیما ساختن؛ یعنی آمدن به چمنزار سبز."
      }
    },
    {
      hi: {
        s: "नीचे बैठो, नीचे बैठो, मैं बनूँगा इंजन",
        r: "nīche baiṭho, nīche baiṭho, maiṁ banūṅgā iñjan",
        e: "dūn-xià-qù का मतलब है 'नीचे बैठना / झुकना'；wǒ का मतलब 'मैं'；tuī-jìn-qì का मतलब 'आगे धकेलने वाला इंजन'।"
      },
      ta: {
        s: "குனிந்து உட்காருங்கள், குனிந்து உட்காருங்கள், நான் உந்துவிசையாக இருப்பேன்",
        r: "kuṉintu uṭkāruṅkaḷ, kuṉintu uṭkāruṅkaḷ, nāṉ untuvicaiyāka iruppēṉ",
        e: "dūn-xià-qù என்றால் 'குனிந்து உட்காரு'; wǒ என்றால் 'நான்'; tuī-jìn-qì என்றால் 'முன்னே தள்ளும் விசை / புரொப்பெல்லர்'."
      },
      th: {
        s: "ย่อตัวลง ย่อตัวลง ฉันเป็นเครื่องขับดัน",
        r: "yo tua long yo tua long chan pen khrueang khap dan",
        e: "dūn-xià-qù แปลว่า 'ย่อตัวลง'; wǒ แปลว่า 'ฉัน'; tuī-jìn-qì แปลว่า 'เครื่องขับเคลื่อน (ใบพัด)'"
      },
      km: {
        s: "អង្គុយចុះ, អង្គុយចុះ, ខ្ញុំធ្វើជាម៉ាស៊ីនជំរុញ",
        r: "ʔɑngkuy cuh, ʔɑngkuy cuh, kʰɲom tvəə cie maasɨn cʊmruɲ",
        e: "គឺអង្គុយចុះ; គឺខ្ញុំធ្វើជាម៉ាស៊ីនជំរុញ (លេងធ្វើ)។"
      },
      vi: {
        s: "Ngồi xổm xuống, ngồi xổm xuống, tôi làm động cơ đẩy",
        r: "",
        e: "là ngồi xổm xuống; là tôi làm (đóng vai) động cơ đẩy."
      },
      id: {
        s: "Jongkok, jongkok, aku jadi pendorong",
        r: "",
        e: "artinya jongkok; artinya aku berperan sebagai pendorong."
      },
      ne: {
        s: "कुर्कुच्चा बस, कुर्कुच्चा बस, म प्रोपेलर बन्छु",
        r: "kurkucchā basa, kurkucchā basa, ma propelar banchhu",
        e: "भनेको कुर्कुच्चा बस्नु; भनेको म (भूमिका) प्रोपेलर बन्नु हो।"
      },
      bn: {
        s: "নিচু হয়ে বসি, নিচু হয়ে বসি, আমি হই ইঞ্জিন",
        r: "nichu hoẏe bosi, nichu hoẏe bosi, āmi hoi injin",
        e: "নিচু হয়ে বসি মানে উবু হয়ে বসা, ইঞ্জিন মানে ইঞ্জিন — আমি বিমানের ইঞ্জিনের ভূমিকা নিই।"
      },
      es: {
        s: "Agáchate, agáchate, yo seré el motor",
        r: "",
        e: "El motor: yo hago de motor del avión, agachado."
      },
      en: {
        s: "Crouch down, crouch down, I'll be the propeller,",
        r: "",
        e: "dun-xia-qu means 'to crouch down'; wo means 'I'; tui-jin-qi means 'the propeller, the engine that pushes forward'."
      },
      de: {
        s: "Hock dich hin, hock dich hin, ich bin der Motor",
        r: "",
        e: "Der Motor — ich spiele den Motor des Flugzeugs und hocke mich hin."
      },
      my: {
        s: "ဝပ်ချ၊ ဝပ်ချ၊ ငါက တွန်းအားစက်",
        r: "wut-cha, wut-cha, nga-ka twun-a-set",
        e: "ဝပ်ချ ဆိုတာ ဝပ်ပြီး၊ တွန်းအားစက် ဆိုတာ အင်ဂျင် — ငါက လေယာဉ်ရဲ့ အင်ဂျင်အဖြစ် သရုပ်ဆောင်တယ်။"
      },
      ko: {
        s: "쪼그리고 앉아, 쪼그리고 앉아, 나는 추진기가 될게",
        r: "Jjogeugo anja, jjogeugo anja, naneun chujingiga doelge",
        e: "는 쪼그리고 앉는다는 뜻이다; 는 내가 추진기가 된다는 뜻이다."
      },
      ja: {
        s: "しゃがんで、しゃがんで、私はプロペラになる",
        r: "Shagande, shagande, watashi wa puropera ni naru",
        e: "しゃがむという意味である; 私がプロペラになるという意味である。"
      },
      si: {
        s: "නැමිලා ඉඳගමු, නැමිලා ඉඳගමු, මම තල්ලු යන්ත්‍රය වෙන්නම්",
        r: "Namila indagamu, namila indagamu, mama tallu yantraya vennam",
        e: "යනු නැමිලා ඉඳගන්නවා යන්නයි; යනු මම තල්ලු යන්ත්‍රය වෙනවා යන්නයි."
      },
      fa: {
        s: "چمباتمه بزن، چمباتمه بزن، من موتور می‌شوم",
        r: "Chambâtme bezan, chambâtme bezan, man motor mi-shavam",
        e: "یعنی چمباتمه زدن؛ یعنی من موتور می‌شوم."
      }
    },
    {
      hi: {
        s: "नीचे बैठो, नीचे बैठो, तुम बनोगे पंख",
        r: "nīche baiṭho, nīche baiṭho, tum banoge paṅkh",
        e: "nǐ का मतलब 'तुम'；fēi-jī-yì का मतलब 'हवाई जहाज़ का पंख' (yì = पंख)।"
      },
      ta: {
        s: "குனிந்து உட்காருங்கள், குனிந்து உட்காருங்கள், நீ விமான இறக்கைகளாக இருப்பாய்",
        r: "kuṉintu uṭkāruṅkaḷ, kuṉintu uṭkāruṅkaḷ, nī vimāṉa iṟakkaikaḷāka iruppāy",
        e: "nǐ என்றால் 'நீ'; fēi-jī-yì என்றால் 'விமான இறக்கைகள்' — yì என்றால் 'இறக்கை'."
      },
      th: {
        s: "ย่อตัวลง ย่อตัวลง เธอเป็นปีกเครื่องบิน",
        r: "yo tua long yo tua long thoe pen pik khrueang bin",
        e: "nǐ แปลว่า 'เธอ'; fēi-jī-yì แปลว่า 'ปีกเครื่องบิน' — yì แปลว่า 'ปีก'"
      },
      km: {
        s: "អង្គុយចុះ, អង្គុយចុះ, អ្នកធ្វើជាស្លាបយន្តហោះ",
        r: "ʔɑngkuy cuh, ʔɑngkuy cuh, neak tvəə cie slaap yɔn-hɔh",
        e: "គឺអ្នកធ្វើជាស្លាបយន្តហោះ (លេងធ្វើ)។"
      },
      vi: {
        s: "Ngồi xổm xuống, ngồi xổm xuống, bạn làm cánh máy bay",
        r: "",
        e: "là bạn làm (đóng vai) cánh máy bay."
      },
      id: {
        s: "Jongkok, jongkok, kamu jadi sayap pesawat",
        r: "",
        e: "artinya kamu berperan sebagai sayap pesawat."
      },
      ne: {
        s: "कुर्कुच्चा बस, कुर्कुच्चा बस, तिमी पखेटा बन",
        r: "kurkucchā basa, kurkucchā basa, timī pakheṭā bana",
        e: "भनेको तिमी (भूमिका) हवाइजहाजको पखेटा बन्नु हो।"
      },
      bn: {
        s: "নিচু হয়ে বসি, নিচু হয়ে বসি, তুমি হও ডানা",
        r: "nichu hoẏe bosi, nichu hoẏe bosi, tumi hao ḍānā",
        e: "ডানা মানে ডানা — তুমি বিমানের ডানার ভূমিকা নাও।"
      },
      es: {
        s: "Agáchate, agáchate, tú serás el ala",
        r: "",
        e: "El ala: tú haces de ala del avión."
      },
      en: {
        s: "Crouch down, crouch down, you'll be the airplane wings,",
        r: "",
        e: "ni means 'you'; fei-ji-yi means 'airplane wings' — yi is the word for 'wing'."
      },
      de: {
        s: "Hock dich hin, hock dich hin, du bist der Flügel",
        r: "",
        e: "Der Flügel — du spielst den Flügel des Flugzeugs."
      },
      my: {
        s: "ဝပ်ချ၊ ဝပ်ချ၊ မင်းက လေယာဉ်အတောင်",
        r: "wut-cha, wut-cha, min-ka lay-yin-a-taung",
        e: "အတောင် ဆိုတာ အတောင် — မင်းက လေယာဉ်ရဲ့ အတောင်အဖြစ် သရုပ်ဆောင်တယ်။"
      },
      ko: {
        s: "쪼그리고 앉아, 쪼그리고 앉아, 너는 날개가 돼",
        r: "Jjogeugo anja, jjogeugo anja, neoneun nalgaega dwae",
        e: "는 네가 비행기 날개가 된다는 뜻이다."
      },
      ja: {
        s: "しゃがんで、しゃがんで、あなたは翼になって",
        r: "Shagande, shagande, anata wa tsubasa ni natte",
        e: "あなたが飛行機の翼になるという意味である。"
      },
      si: {
        s: "නැමිලා ඉඳගමු, නැමිලා ඉඳගමු, ඔයා පියාපත් වෙන්න",
        r: "Namila indagamu, namila indagamu, oya piyapat venna",
        e: "යනු ඔයා ගුවන් යානයේ පියාපත් වෙනවා යන්නයි."
      },
      fa: {
        s: "چمباتمه بزن، چمباتمه بزن، تو بال می‌شوی",
        r: "Chambâtme bezan, chambâtme bezan, tou bâl mi-shavi",
        e: "یعنی تو بال هواپیما می‌شوی."
      }
    },
    {
      hi: {
        s: "कमर झुकाओ, कमर झुकाओ, हवाई जहाज़ बड़ा कमाल का बना",
        r: "kamar jhukāo, kamar jhukāo, havāī jahāz baṛā kamāl kā banā",
        e: "wān-zhe-yāo का मतलब है 'कमर झुकाए हुए' (zhé लगा जारी क्रिया बताता है)；qí का मतलब 'कमाल / अद्भुत'।"
      },
      ta: {
        s: "இடுப்பை வளைத்து, இடுப்பை வளைத்து, விமானம் அற்புதமாக உருவானது",
        r: "iṭuppai vaḷaittu, iṭuppai vaḷaittu, vimāṉam aṟputamāka uruvāṉatu",
        e: "wān-zhe-yāo என்றால் 'இடுப்பை வளைத்த நிலையில்' — வினைச்சொல்லுக்குப் பிறகு zhe வந்தால் தொடர் நிலையைக் காட்டும்; qí என்றால் 'அற்புதம்'."
      },
      th: {
        s: "ก้มเอวลง ก้มเอวลง เครื่องบินทำออกมายอดเยี่ยม",
        r: "kom eo long kom eo long khrueang bin tham ok ma yot yiam",
        e: "wān-zhe-yāo แปลว่า 'ในท่าก้มเอว' — zhe ตามหลังคำกริยาแสดงสภาพที่ดำเนินอยู่; qí แปลว่า 'ยอดเยี่ยม / มหัศจรรย์'"
      },
      km: {
        s: "កោងខ្នង, កោងខ្នង, យន្តហោះធ្វើបានចម្លែក",
        r: "koong kʰnɑng, koong kʰnɑng, yɔn-hɔh tvəə baan cɑmleek",
        e: "គឺកោងខ្នង; គឺយន្តហោះ (លេងធ្វើ) បានចម្លែកល្អ។"
      },
      vi: {
        s: "Cúi lưng, cúi lưng, máy bay làm thật khéo",
        r: "",
        e: "là cúi lưng; là máy bay (chơi) làm thật khéo."
      },
      id: {
        s: "Membungkuk, membungkuk, pesawatnya jadi aneh bagus",
        r: "",
        e: "artinya membungkuk; artinya pesawat (mainan) jadi bagus aneh."
      },
      ne: {
        s: "कम्मर निहुर्‍याऊ, कम्मर निहुर्‍याऊ, हवाइजहाज गजबले बन्यो",
        r: "kammar nihuryāū, kammar nihuryāū, hawāijahāj gajable banyo",
        e: "भनेको कम्मर निहुर्‍याउनु; भनेको (खेलको) हवाइजहाज गजबले बन्नु हो।"
      },
      bn: {
        s: "কোমর বাঁকিয়ে, কোমর বাঁকিয়ে, বিমানটা হলো দারুণ",
        r: "komor bāṅkiẏe, komor bāṅkiẏe, bimānṭā holo dāruṇ",
        e: "কোমর বাঁকিয়ে মানে কোমর বাঁকিয়ে, দারুণ মানে চমৎকার — আমাদের বিমানটা দারুণ হয়েছে।"
      },
      es: {
        s: "Inclínate, inclínate, el avión quedó genial",
        r: "",
        e: "Genial: inclinándose, el avión de juguete quedó maravilloso."
      },
      en: {
        s: "Bend your waist, bend your waist, what a wonderful plane we've made!",
        r: "",
        e: "wan-zhe-yao means 'with the waist bent' — zhe after a verb shows a continuing state; qi means 'wonderful, amazing'."
      },
      de: {
        s: "Beug dich vor, beug dich vor, das Flugzeug wird wunderbar",
        r: "",
        e: "Wunderbar — gebeugt bauen wir, und das Flugzeug wird großartig."
      },
      my: {
        s: "ခါးကုန်း၊ ခါးကုန်း၊ လေယာဉ် အံ့ဩဖွယ်",
        r: "kha-kone, kha-kone, lay-yin aun-aw-hpwe",
        e: "ခါးကုန်း ဆိုတာ ခါးကိုကုန်းပြီး၊ အံ့ဩဖွယ် ဆိုတာ အံ့ဩစရာ — တို့ လေယာဉ် အံ့ဩစရာကောင်းတယ်။"
      },
      ko: {
        s: "허리를 굽혀, 허리를 굽혀, 비행기가 멋지게 만들어져",
        r: "Heorireul guphyeo, heorireul guphyeo, bihaenggiga meotjige mandeureojyeo",
        e: "는 허리를 굽힌다는 뜻이다; 는 비행기가 멋지게 만들어진다는 뜻이다."
      },
      ja: {
        s: "腰をかがめて、腰をかがめて、飛行機がすてきにできる",
        r: "Koshi o kagamete, koshi o kagamete, hikōki ga suteki ni dekiru",
        e: "腰をかがめるという意味である; 飛行機がすてきにできるという意味である。"
      },
      si: {
        s: "ඉඟටිය නවලා, ඉඟටිය නවලා, ගුවන් යානය අපූරුවට හැදෙනවා",
        r: "Ingatiya navala, ingatiya navala, guvan yanaya apuruvata hadenava",
        e: "යනු ඉඟටිය නවනවා යන්නයි; යනු ගුවන් යානය අපූරුවට හැදෙනවා යන්නයි."
      },
      fa: {
        s: "کمر خم کن، کمر خم کن، هواپیما عالی ساخته می‌شود",
        r: "Kamar xam kon, kamar xam kon, havâpeymâ âli sâxte mi-shavad",
        e: "یعنی خم کردن کمر؛ یعنی هواپیما عالی ساخته می‌شود."
      }
    },
    {
      hi: {
        s: "ऊपर उड़ो, ऊपर उड़ो, सफ़ेद बादलों में उड़ जाओ",
        r: "ūpar uṛo, ūpar uṛo, safed bādloṁ meṁ uṛ jāo",
        e: "fēi-shàng-qù का मतलब है 'ऊपर उड़ना'；bái-yún का मतलब 'सफ़ेद बादल'；lǐ का मतलब 'अंदर / में'।"
      },
      ta: {
        s: "மேலே பறங்கள், மேலே பறங்கள், வெண் மேகங்களுக்குள் பறந்து செல்லுங்கள்",
        r: "mēlē paṟaṅkaḷ, mēlē paṟaṅkaḷ, veṇ mēkaṅkaḷukkuḷ paṟantu celluṅkaḷ",
        e: "fēi-shàng-qù என்றால் 'மேலே பற'; bái-yún என்றால் 'வெண் மேகங்கள்'; lǐ என்றால் 'உள்ளே'."
      },
      th: {
        s: "บินขึ้นไป บินขึ้นไป บินเข้าไปในเมฆขาว",
        r: "bin khuen pai bin khuen pai bin khao pai nai mek khao",
        e: "fēi-shàng-qù แปลว่า 'บินขึ้นไป'; bái-yún แปลว่า 'เมฆขาว'; lǐ แปลว่า 'ข้างใน / เข้าไปใน'"
      },
      km: {
        s: "ហោះឡើង, ហោះឡើង, ហោះទៅក្នុងពពកស",
        r: "huh ləəng, huh ləəng, huh tɨw knong pɔpɔɔk sɑ",
        e: "គឺហោះឡើង; គឺហោះទៅក្នុងពពកស។"
      },
      vi: {
        s: "Bay lên, bay lên, bay vào trong mây trắng",
        r: "",
        e: "là bay lên; là bay vào mây trắng."
      },
      id: {
        s: "Terbang naik, terbang naik, terbang ke dalam awan putih",
        r: "",
        e: "artinya terbang naik; artinya terbang ke dalam awan putih."
      },
      ne: {
        s: "माथि उड, माथि उड, सेतो बादलभित्र उड",
        r: "māthi uḍa, māthi uḍa, seto bādalbhitra uḍa",
        e: "भनेको माथि उड्नु; भनेको सेतो बादलभित्र उड्नु हो।"
      },
      bn: {
        s: "উড়ে যাই, উড়ে যাই, সাদা মেঘের ভেতরে",
        r: "uṛe yāi, uṛe yāi, sādā megher bhetore",
        e: "উড়ে যাই মানে উড়ে যাওয়া, সাদা মেঘ মানে সাদা মেঘ — বিমানটা সাদা মেঘের মধ্যে উড়ে যায়।"
      },
      es: {
        s: "Vuela alto, vuela alto, vuela hasta las nubes blancas",
        r: "",
        e: "Las nubes blancas: el avión vuela alto hasta perderse entre las nubes blancas."
      },
      en: {
        s: "Fly up, fly up, fly right into the white clouds!",
        r: "",
        e: "fei-shang-qu means 'to fly up'; bai-yun means 'white clouds'; li means 'inside, into'."
      },
      de: {
        s: "Flieg hoch, flieg hoch, flieg in die weißen Wolken",
        r: "",
        e: "Die weißen Wolken — das Flugzeug fliegt hoch hinauf bis in die weißen Wolken."
      },
      my: {
        s: "ပျံတက်၊ ပျံတက်၊ တိမ်ဖြူထဲပျံ",
        r: "pyan-tet, pyan-tet, tein-pyu-hte-pyan",
        e: "ပျံတက် ဆိုတာ ပျံတက်တာ၊ တိမ်ဖြူ ဆိုတာ တိမ်ဖြူ — လေယာဉ် တိမ်ဖြူတွေထဲ ပျံသွားတယ်။"
      },
      ko: {
        s: "날아올라, 날아올라, 흰 구름 속으로 날아가",
        r: "Nara-olla, nara-olla, huin gureum sogeuro naraga",
        e: "는 날아오른다는 뜻이다; 는 흰 구름 속으로 날아간다는 뜻이다."
      },
      ja: {
        s: "飛び上がれ、飛び上がれ、白い雲の中へ飛んでいけ",
        r: "Tobiagare, tobiagare, shiroi kumo no naka e tonde-ike",
        e: "飛び上がるという意味である; 白い雲の中へ飛んでいくという意味である。"
      },
      si: {
        s: "ඉහළට පියාඹමු, ඉහළට පියාඹමු, සුදු වලාකුළු අතරට පියාඹමු",
        r: "Ihalata piyabamu, ihalata piyabamu, sudu valakulu atarata piyabamu",
        e: "යනු ඉහළට පියාඹනවා යන්නයි; යනු සුදු වලාකුළු අතරට පියාඹනවා යන්නයි."
      },
      fa: {
        s: "پرواز کن بالا، پرواز کن بالا، به میان ابرهای سفید پرواز کن",
        r: "Parvâz kon bâlâ, parvâz kon bâlâ, be miyân-e abr-hâ-ye sefid parvâz kon",
        e: "یعنی پرواز به بالا؛ یعنی پرواز به میان ابرهای سفید."
      }
    }
  ],
  molihua: [
    {
      hi: {
        s: "क्या खूबसूरत चमेली का फूल है,",
        r: "kyā khūbsūrat chamelī kā phūl hai,",
        e: "hǎo यहाँ तारीफ़ बताता है ('कितना सुंदर!')；měi-lì का मतलब 'सुंदर'；mò-li-huā का मतलब 'चमेली का फूल'।"
      },
      ta: {
        s: "என்ன அழகான மல்லிகைப் பூ,",
        r: "eṉṉa aḻakāṉa mallikaip pū,",
        e: "hǎo இங்கே பாராட்டைக் காட்டுகிறது ('எவ்வளவு அழகு!'); měi-lì என்றால் 'அழகான'; mò-li-huā என்றால் 'மல்லிகைப் பூ'."
      },
      th: {
        s: "ดอกมะลิแสนสวยช่างงดงาม",
        r: "dok mali saen suai chang ngot ngam",
        e: "hǎo ตรงนี้แสดงความชื่นชม ('สวยจัง!'); měi-lì แปลว่า 'สวยงาม'; mò-li-huā แปลว่า 'ดอกมะลิ'"
      },
      km: {
        s: "ផ្កាម្លិះដ៏ស្រស់ស្អាតមួយទង,",
        r: "pʰkaa mlih dɑh srɑh-saat muəy tʊəng,",
        e: "គឺផ្កាម្លិះដ៏ស្រស់ស្អាតមួយទង។"
      },
      vi: {
        s: "Một đóa hoa nhài đẹp quá,",
        r: "",
        e: "là một đóa hoa nhài thật đẹp."
      },
      id: {
        s: "Sungguh sekuntum bunga melati yang indah,",
        r: "",
        e: "artinya sekuntum bunga melati yang sungguh indah."
      },
      ne: {
        s: "कति राम्रो चमेलीको फूल,",
        r: "kati rāmro camelīko phūl,",
        e: "भनेको कति राम्रो चमेलीको फूल हो।"
      },
      bn: {
        s: "কী সুন্দর একটি জুঁই ফুল!",
        r: "kī sundar ekṭi jum̐i phul!",
        e: "গানের প্রথম লাইন; গায়ক জুঁই ফুলকে খুব সুন্দর বলে প্রশংসা করছে।"
      },
      es: {
        s: "¡Qué hermosa flor de jazmín!",
        r: "",
        e: "El cantante abre la canción alabando la belleza de la flor de jazmín."
      },
      en: {
        s: "What a beautiful jasmine flower,",
        r: "",
        e: "hao here adds praise ('how lovely!'); mei-li means 'beautiful'; mo-li-hua is 'jasmine flower', a beloved flower in Chinese songs."
      },
      de: {
        s: "Welch schöne Jasminblüte!",
        r: "",
        e: "Der Sänger eröffnet das Lied mit einem Lob der schönen Jasminblüte."
      },
      my: {
        s: "လှပလိုက်တဲ့ စံပယ်ပန်း!",
        r: "hla-pa-laiq-te san-pe-pan!",
        e: "သီချင်းအစ၊ စံပယ်ပန်းကို အရမ်းလှတယ်လို့ ချီးကျူးတယ်။"
      },
      ko: {
        s: "아름다워라, 아름다운 재스민 꽃 한 송이,",
        r: "Areumdaweora, areumdaun jaeseumin kkot han songi,",
        e: "는 아름다운 재스민 꽃 한 송이를 칭찬하는 말이다."
      },
      ja: {
        s: "美しいジャスミンの花よ、",
        r: "Utsukushii jasumin no hana yo,",
        e: "美しいジャスミンの花をたたえる言葉である。"
      },
      si: {
        s: "ලස්සන පිච්ච මලක්,",
        r: "Lassana picca malak,",
        e: "යනු ලස්සන පිච්ච මලක් වර්ණනා කරන වචනයයි."
      },
      fa: {
        s: "چه گل یاس زیبایی،",
        r: "Che gol-e yâs-e zibâyi,",
        e: "ستایش گل یاس زیباست."
      }
    },
    {
      hi: {
        s: "खुशबू और सुंदरता से भरी हैं सारी टहनियाँ,",
        r: "khushbū aur sundartā se bharī haiṁ sārī ṭahniyāṁ,",
        e: "fēn-fāng का मतलब 'खुशबूदार'；mǎn का मतलब 'भरा हुआ'；zhī-yā का मतलब 'टहनियाँ / डालियाँ'।"
      },
      ta: {
        s: "மணமும் அழகும் கிளைகள் முழுவதும் நிறைந்துள்ளன,",
        r: "maṇamum aḻakum kiḷaikaḷ muḻuvatum niṟaintuḷḷaṉa,",
        e: "fēn-fāng என்றால் 'மணமான'; mǎn என்றால் 'நிறைந்த'; zhī-yā என்றால் 'கிளைகள்'."
      },
      th: {
        s: "หอมหวานสวยงามเต็มกิ่งก้าน",
        r: "hom wan suai ngam tem king kan",
        e: "fēn-fāng แปลว่า 'หอม'; mǎn แปลว่า 'เต็ม'; zhī-yā แปลว่า 'กิ่งก้าน'"
      },
      km: {
        s: "ក្រអូបស្រស់ស្អាតពេញមែក,",
        r: "krɑʔoop srɑh-saat peɲ meek,",
        e: "គឺក្រអូបនិងស្រស់ស្អាតពេញមែកធាង។"
      },
      vi: {
        s: "Thơm ngát xinh đẹp đầy cành,",
        r: "",
        e: "là thơm ngát xinh đẹp đầy cành."
      },
      id: {
        s: "Harum dan indah memenuhi ranting,",
        r: "",
        e: "artinya harum dan indah memenuhi ranting."
      },
      ne: {
        s: "सुगन्धित सुन्दर हाँगाभरि,",
        r: "sugandhit sundar hā̃gābhari,",
        e: "भनेको सुगन्धित र सुन्दर भई हाँगाभरि हुनु हो।"
      },
      bn: {
        s: "সৌরভ আর রূপে ভরা ডালপালা,",
        r: "saurabh ār rūpe bharā ḍālpālā,",
        e: "জুঁই ফুলের মিষ্টি গন্ধ আর সৌন্দর্যে গাছের ডাল ভরে আছে।"
      },
      es: {
        s: "Fragante y hermosa, llena las ramas,",
        r: "",
        e: "El jazmín llena las ramas con su aroma dulce y su belleza."
      },
      en: {
        s: "Fragrant and lovely, filling every branch,",
        r: "",
        e: "fen-fang means 'fragrant'; man means 'full of'; zhi-ya means 'branches and twigs'."
      },
      de: {
        s: "Duftend und schön füllen sie die Zweige,",
        r: "",
        e: "Der Jasmin füllt die Zweige mit seinem süßen Duft und seiner Schönheit."
      },
      my: {
        s: "မွှေးကြိုင်လှပပြီး အကိုင်းအခက်တွေ ပြည့်နေတယ်,",
        r: "hmwe-kyaing-hla-pa-pyi a-kaing-a-khet-twe pyi-ne-te,",
        e: "စံပယ်ရဲ့ မွှေးရနံ့နဲ့ အလှတရားက အကိုင်းတွေကို ပြည့်နှက်နေတယ်။"
      },
      ko: {
        s: "향기롭고 아름다워 가지마다 가득해,",
        r: "Hyanggiropgo areumdawo gajimada gadeukhae,",
        e: "는 향기롭다는 뜻이다; 는 가지마다 가득하다는 뜻이다."
      },
      ja: {
        s: "芳しく美しく枝いっぱいに、",
        r: "Kaguwashiku utsukushiku eda ippai ni,",
        e: "香り高いという意味である; 枝いっぱいという意味である。"
      },
      si: {
        s: "සුවඳවත් ලස්සනට අතු පුරාම,",
        r: "Suvandavat lassanata atu purama,",
        e: "යනු සුවඳවත් යන්නයි; යනු අතු පුරාම යන්නයි."
      },
      fa: {
        s: "خوشبو و زیبا، پر از شاخه‌ها،",
        r: "Xoshbou o zibâ, por az shâxe-hâ,",
        e: "یعنی خوشبو؛ یعنی پر از شاخه‌ها."
      }
    },
    {
      hi: {
        s: "सफ़ेद भी, खुशबूदार भी, सब तारीफ़ करते हैं,",
        r: "safed bhī, khushbūdār bhī, sab tārīf karte haiṁ,",
        e: "yòu…yòu… का मतलब 'भी… भी…' (दोनों गुण एक साथ)；kuā का मतलब 'तारीफ़ करना'；rén-rén का मतलब 'हर कोई'।"
      },
      ta: {
        s: "வெள்ளையும் மணமும் கொண்டது, அனைவரும் புகழ்கின்றனர்,",
        r: "veḷḷaiyum maṇamum koṇṭatu, aṉaivarum pukaḻkiṉṟaṉar,",
        e: "yòu…yòu… என்றால் 'மட்டுமல்ல, ...உம்' (இரு குணங்கள் ஒன்றாக); kuā என்றால் 'புகழ்'; rén-rén என்றால் 'அனைவரும்'."
      },
      th: {
        s: "ขาวด้วยหอมด้วย ทุกคนต่างชื่นชม",
        r: "khao duai hom duai thuk khon tang chuen chom",
        e: "yòu…yòu… แปลว่า 'ทั้ง…และ…' (สองคุณสมบัติพร้อมกัน); kuā แปลว่า 'ชื่นชม'; rén-rén แปลว่า 'ทุกคน'"
      },
      km: {
        s: "ទាំងសទាំងក្រអូបអ្នកណាក៏សរសើរ,",
        r: "teaŋ sɑ teaŋ krɑʔoop neak-naa kɑɑ sɑhsəə,",
        e: "គឺទាំងសទាំងក្រអូប; គឺអ្នកណាក៏សរសើរ។"
      },
      vi: {
        s: "Vừa trắng vừa thơm ai cũng khen,",
        r: "",
        e: "là vừa trắng vừa thơm; là ai cũng khen."
      },
      id: {
        s: "Putih dan harum semua orang memuji,",
        r: "",
        e: "artinya putih dan harum; artinya semua orang memuji."
      },
      ne: {
        s: "सेतो र बास्नादार, सबैले प्रशंसा गर्छन्,",
        r: "seto ra bāsnādār, sabaile praśansā garchhan,",
        e: "भनेको सेतो र बास्नादार; भनेको सबैले प्रशंसा गर्नु हो।"
      },
      bn: {
        s: "এত সাদা, এত সুগন্ধি — সবাই প্রশংসা করে,",
        r: "eto sādā, eto sugandhi — sabāi praśaṁsā kare,",
        e: "জুঁই ফুল সাদা আর সুগন্ধি বলে সবাই এর প্রশংসা করে।"
      },
      es: {
        s: "Blanca y perfumada, todos la elogian,",
        r: "",
        e: "La flor es blanca y perfumada, por eso todo el mundo la alaba."
      },
      en: {
        s: "So white and so fragrant, everyone sings its praise,",
        r: "",
        e: "you...you... means 'both...and...' (two qualities together); kua means 'to praise'; ren-ren means 'everyone'."
      },
      de: {
        s: "Weiß und duftend, von allen gelobt,",
        r: "",
        e: "Die Blüte ist weiß und duftend, darum lobt sie jeder."
      },
      my: {
        s: "ဖြူစင်ပြီး မွှေးကြိုင်လို့ လူတိုင်းချီးကျူးတယ်,",
        r: "phyu-sin-pyi hmwe-kyaing-lo lu-taing-chi-kyū-te,",
        e: "စံပယ်ပန်းက ဖြူစင်မွှေးကြိုင်လို့ လူတိုင်း ချီးကျူးကြတယ်။"
      },
      ko: {
        s: "희고 향기로워 모두가 칭찬해,",
        r: "Huigo hyanggirowo moduga chingchanhae,",
        e: "는 희고 향기롭다는 뜻이다; 는 모두가 칭찬한다는 뜻이다."
      },
      ja: {
        s: "白くて香り高く誰もがほめる、",
        r: "Shirokute kaori takaku daremo ga homeru,",
        e: "白くて香り高いという意味である; 誰もがほめるという意味である。"
      },
      si: {
        s: "සුදුයි සුවඳයි හැමෝම වර්ණනා කරනවා,",
        r: "Suduyi suvandayi hamoma varnana karanava,",
        e: "යනු සුදුයි සුවඳයි යන්නයි; යනු හැමෝම වර්ණනා කරනවා යන්නයි."
      },
      fa: {
        s: "هم سفید هم خوشبو، همه تعریف می‌کنند،",
        r: "Ham sefid ham xoshbou, hame ta'rif mi-konand,",
        e: "یعنی هم سفید هم خوشبو؛ یعنی همه تعریف می‌کنند."
      }
    },
    {
      hi: {
        s: "मुझे तुम्हें तोड़ने दो, किसी और के घर भेंट दूँगा,",
        r: "mujhe tumheṁ toṛne do, kisī aur ke ghar bheṁṭ dūṅgā,",
        e: "ràng का मतलब 'देना / अनुमति देना'；zhāi-xià का मतलब 'तोड़ना (फूल)'；sòng-gěi का मतलब 'उपहार में देना'।"
      },
      ta: {
        s: "உன்னைப் பறித்துக் கொள்ள என்னை விடு, வேறு வீட்டிற்குப் பரிசாகத் தருவேன்,",
        r: "uṉṉaip paṟittuk koḷḷa eṉṉai viṭu, vēṟu vīṭṭiṟkup paricākat taruvēṉ,",
        e: "ràng என்றால் 'விடு / அனுமதி'; zhāi-xià என்றால் 'பறி (பூவை)'; sòng-gěi என்றால் 'பரிசாகக் கொடு'."
      },
      th: {
        s: "ให้ฉันเด็ดเธอลงมา ส่งมอบให้บ้านอื่น",
        r: "hai chan det thoe long ma song mop hai ban uen",
        e: "ràng แปลว่า 'ให้ / อนุญาต'; zhāi-xià แปลว่า 'เด็ดลงมา (ดอกไม้)'; sòng-gěi แปลว่า 'มอบให้เป็นของขวัญ'"
      },
      km: {
        s: "ឲ្យខ្ញុំបេះអ្នកចុះ, យកទៅឲ្យគ្រួសារផ្សេង,",
        r: "ʔaoy kʰɲom beh neak cuh, yɔɔk tɨw ʔaoy kruə-saa pʰseeŋ,",
        e: "គឺឲ្យខ្ញុំបេះផ្កា; គឺយកទៅឲ្យអ្នកផ្សេង។"
      },
      vi: {
        s: "Để tôi hái bạn xuống, tặng cho nhà người ta,",
        r: "",
        e: "là để tôi hái hoa xuống; là tặng cho nhà người khác."
      },
      id: {
        s: "Biar kupetik dirimu, kuberikan pada orang lain,",
        r: "",
        e: "artinya biar kupetik bunga; artinya berikan pada orang lain."
      },
      ne: {
        s: "म तिमीलाई टिप्छु, अर्काको घरमा दिन्छु,",
        r: "ma timīlāī ṭipchhu, arkāko gharmā dinchhu,",
        e: "भनेको म फूल टिप्छु; भनेको अर्काको घरमा दिनु हो।"
      },
      bn: {
        s: "তোমাকে তুলে নিয়ে অন্যের বাড়িতে উপহার দেব,",
        r: "tomāke tule niye anyer bāṛite upahār deb,",
        e: "গায়ক ফুলটিকে তুলে অন্য কারো বাড়িতে উপহার দিতে চায়।"
      },
      es: {
        s: "Déjame arrancarte y regalarte a otra casa,",
        r: "",
        e: "El cantante quiere cortar la flor y regalarla a otra familia."
      },
      en: {
        s: "Let me pick you down, and give you to another home,",
        r: "",
        e: "rang means 'let'; zhai-xia means 'to pick off (a flower)'; song-gei means 'to give as a gift'."
      },
      de: {
        s: "Lass mich dich pflücken und in ein anderes Haus schenken,",
        r: "",
        e: "Der Sänger möchte die Blüte pflücken und einer anderen Familie schenken."
      },
      my: {
        s: "မင်းကို ခူးပြီး တခြားအိမ်ကို လက်ဆောင်ပေးမယ်,",
        r: "min-ko khū-pyi ta-cha-a-ein-ko let-saun-pē-me,",
        e: "ပန်းကို ခူးပြီး တခြားအိမ်ကို လက်ဆောင်ပေးချင်တယ်။"
      },
      ko: {
        s: "내가 너를 따서 다른 집에 선물할게,",
        r: "Naega neoreul ttaseo dareun jibe seonmulhalge,",
        e: "는 내가 너를 따겠다는 뜻이다; 는 다른 집에 선물한다는 뜻이다."
      },
      ja: {
        s: "私があなたを摘んで、よその家に贈ろう、",
        r: "Watashi ga anata o tsunde, yoso no ie ni okurō,",
        e: "私があなたを摘むという意味である; よその家に贈るという意味である。"
      },
      si: {
        s: "මම ඔයාව කඩලා අනුන්ගේ ගෙදරට දෙමි,",
        r: "Mama oyava kadala anunge gedarata demi,",
        e: "යනු මම ඔයාව කඩනවා යන්නයි; යනු අනුන්ගේ ගෙදරට දෙනවා යන්නයි."
      },
      fa: {
        s: "بگذار تو را بچینم و به خانه دیگری هدیه دهم،",
        r: "Begzâr tou râ bechinam o be xâne-ye digari hadiye daham,",
        e: "یعنی بگذار تو را بچینم؛ یعنی به خانه دیگری هدیه دادن."
      }
    },
    {
      hi: {
        s: "चमेली के फूल, ओ चमेली के फूल।",
        r: "chamelī ke phūl, o chamelī ke phūl.",
        e: "a यहाँ पुकारने का भाव है ('ओ!') — फूल को संबोधित करके गीत कोमलता से समाप्त होता है।"
      },
      ta: {
        s: "மல்லிகைப் பூவே, மல்லிகைப் பூவே.",
        r: "mallikaip pūvē, mallikaip pūvē.",
        e: "இங்குள்ள a என்பது அழைப்புச் சொல் ('ஓ!') — பூவை அழைப்பது பாடலுக்கு மென்மையான முடிவைத் தருகிறது."
      },
      th: {
        s: "ดอกมะลิเอย ดอกมะลิ",
        r: "dok mali oei dok mali",
        e: "a ตรงนี้เป็นคำเรียกขาน ('เอย!') — การเรียกดอกมะลิทำให้เพลงจบอย่างอ่อนโยน"
      },
      km: {
        s: "ផ្កាម្លិះអើយ ផ្កាម្លិះ។",
        r: "pʰkaa-mlih ʔəəy pʰkaa-mlih.",
        e: "ជាពាក្យហៅផ្កាដោយក្តីស្រឡាញ់។"
      },
      vi: {
        s: "Hoa nhài ơi hoa nhài.",
        r: "",
        e: "là gọi hoa với tình cảm yêu mến."
      },
      id: {
        s: "Bunga melati oh bunga melati.",
        r: "",
        e: "adalah panggilan penuh kasih pada bunga."
      },
      ne: {
        s: "चमेली फूल, चमेली फूल।",
        r: "camelī phūl, camelī phūl.",
        e: "भनेको मायालु भएर फूललाई बोलाउनु हो।"
      },
      bn: {
        s: "জুঁই ফুল, ও জুঁই ফুল।",
        r: "jum̐i phul, o jum̐i phul.",
        e: "শেষ লাইনে গায়ক জুঁই ফুলকে ভালোবাসা ভরে ডাকছে।"
      },
      es: {
        s: "Jazmín, oh jazmín.",
        r: "",
        e: "Al final el cantante llama al jazmín con cariño."
      },
      en: {
        s: "Jasmine flower, oh jasmine flower.",
        r: "",
        e: "the little a here is a term of address ('oh!') — calling out to the flower gives the song a gentle ending."
      },
      de: {
        s: "Jasmin, oh Jasmin.",
        r: "",
        e: "Zum Schluss ruft der Sänger den Jasmin liebevoll an."
      },
      my: {
        s: "စံပယ်ပန်းရယ် စံပယ်ပန်းရယ်။",
        r: "san-pe-pan-ye san-pe-pan-ye.",
        e: "အဆုံးမှာ စံပယ်ပန်းကို ချစ်ခြင်းနဲ့ ခေါ်တယ်။"
      },
      ko: {
        s: "재스민 꽃아, 재스민 꽃아.",
        r: "Jaeseumin kkocha, jaeseumin kkocha.",
        e: "재스민 꽃을 다정하게 부르는 말이다."
      },
      ja: {
        s: "ジャスミンの花よ、ジャスミンの花よ。",
        r: "Jasumin no hana yo, jasumin no hana yo.",
        e: "ジャスミンの花を親しみを込めて呼ぶ言葉である。"
      },
      si: {
        s: "පිච්ච මලේ, පිච්ච මලේ.",
        r: "Picca male, picca male.",
        e: "පිච්ච මලට ආදරයෙන් කතා කරන වචනයයි."
      },
      fa: {
        s: "گل یاس، گل یاس.",
        r: "Gol-e yâs, gol-e yâs.",
        e: "نامی ناز برای گل یاس است."
      }
    }
  ],
  wodejia: [
    {
      hi: {
        s: "मेरे घर के सामने एक तालाब है,",
        r: "mere ghar ke sāmne ek tālāb hai,",
        e: "mén-qián का मतलब है 'दरवाज़े के सामने'; chí-táng का मतलब है 'तालाब'; hòu-miàn का मतलब है 'पीछे'।"
      },
      ta: {
        s: "என் வீட்டுக்கு முன்னால் ஒரு குளம் உள்ளது,",
        r: "eṉ vīṭṭukku muṉṉāl oru kuḷam uḷḷatu,",
        e: "mén-qián என்றால் 'வாசலுக்கு முன்'; chí-táng என்றால் 'குளம்'; hòu-miàn என்றால் 'பின்னால்'."
      },
      th: {
        s: "หน้าบ้านของฉันมีสระน้ำ",
        r: "na ban khong chan mi sa nam",
        e: "mén-qián แปลว่า หน้าประตู; chí-táng แปลว่า สระน้ำ; hòu-miàn แปลว่า ข้างหลัง"
      },
      km: {
        s: "មុខផ្ទះខ្ញុំមានស្ទឹងតូច, ខាងក្រោយមានជើងភ្នំ;",
        r: "muk pʰteah kʰɲom mien stɨng touc, khaaŋ-kraoy mien cəəng-pʰnom;",
        e: "គឺមុខផ្ទះមានស្ទឹងតូច; គឺខាងក្រោយមានទួល។"
      },
      vi: {
        s: "Trước nhà tôi có con sông nhỏ, sau nhà có sườn đồi;",
        r: "",
        e: "là trước nhà có sông nhỏ; là sau nhà có sườn đồi."
      },
      id: {
        s: "Di depan rumahku ada sungai kecil, di belakang ada lereng bukit;",
        r: "",
        e: "artinya di depan rumah ada sungai kecil; artinya di belakang ada lereng bukit."
      },
      ne: {
        s: "मेरो घरअगाडि सानो खोला छ, पछाडि डाँडा छ;",
        r: "mero ghar-agāḍi sāno kholā chha, pachhāḍi ḍā̃ḍā chha;",
        e: "भनेको घरअगाडि सानो खोला हुनु; भनेको पछाडि डाँडा हुनु हो।"
      },
      bn: {
        s: "আমার বাড়ির সামনে ছোট্ট নদী, পেছনে পাহাড়ি ঢাল;",
        r: "āmār bāṛir sāmne chhoṭṭo nadī, pechhone pāhāṛi ḍhāl;",
        e: "বাড়ির সামনে ছোট নদী আর পেছনে উঁচু জমি আছে।"
      },
      es: {
        s: "Delante de mi casa hay un riachuelo; detrás, una loma;",
        r: "",
        e: "Delante de la casa corre un riachuelo y detrás se alza una loma."
      },
      en: {
        s: "In front of my house there's a pond,",
        r: "",
        e: "mén-qián means 'in front of the door'; chí-táng means 'pond'; hòu-miàn means 'behind'."
      },
      de: {
        s: "Vor meinem Haus fließt ein Bächlein, dahinter liegt ein Hügel;",
        r: "",
        e: "Vor dem Haus fließt ein Bächlein, dahinter erhebt sich ein Hügel."
      },
      my: {
        s: "ကျွန်တော့်အိမ်ရှေ့မှာ ချောင်းငယ်လေးရှိတယ်၊ နောက်မှာတော့ တောင်ကုန်းရှိတယ်;",
        r: "kyun-taw-a-ein-shei-hma chaung-nge-le-shi-te, naut-hma-taw taun-kone-shi-te;",
        e: "အိမ်ရှေ့မှာ ချောင်းငယ်လေးရှိပြီး နောက်မှာ တောင်ကုန်းရှိတယ်။"
      },
      ko: {
        s: "우리 집 앞에는 작은 강이 있고, 뒤에는 언덕이 있어;",
        r: "Uri jip apeneun jageun gangi itgo, dwineun eondeogi isseo;",
        e: "는 우리 집 앞이라는 뜻이다; 는 작은 강이 있다는 뜻이다; 는 뒤에 언덕이 있다는 뜻이다."
      },
      ja: {
        s: "我が家の前には小川があり、後ろには丘がある；",
        r: "Wagaya no mae ni wa ogawa ga ari, ushiro ni wa oka ga aru;",
        e: "我が家の前という意味である; 小川があるという意味である; 後ろに丘があるという意味である。"
      },
      si: {
        s: "අපේ ගෙදර ඉස්සරහා පොඩි ගඟක් තියෙනවා, පිටිපස්සේ කන්දක්;",
        r: "Ape gedara issaraha podi gangak tiyenava, pitipasse kandak;",
        e: "යනු අපේ ගෙදර ඉස්සරහා යන්නයි; යනු පොඩි ගඟක් තියෙනවා යන්නයි; යනු පිටිපස්සේ කන්දක් යන්නයි."
      },
      fa: {
        s: "جلوی خانه ما رودخانه کوچکی است، پشتش تپه‌ای؛",
        r: "Jelou-ye xâne-ye mâ roudxâne-ye kouchaki ast, poshtash tappe-i;",
        e: "یعنی جلوی خانه ما؛ یعنی رودخانه کوچکی است؛ یعنی پشتش تپه‌ای است."
      }
    },
    {
      hi: {
        s: "तालाब के पीछे घना जंगल है,",
        r: "tālāb ke pīche ghanā jaṅgal hai,",
        e: "hòu-miàn का मतलब है 'पीछे'; zhǎng-zhe का मतलब है 'उगा हुआ है'; gāo-shān का मतलब है 'ऊँचा पहाड़'।"
      },
      ta: {
        s: "குளத்துக்குப் பின்னால் உயர்ந்த மலை உள்ளது,",
        r: "kuḷattukkup piṉṉāl uyarnta malai uḷḷatu,",
        e: "hòu-miàn என்றால் 'பின்னால்'; zhǎng-zhe என்றால் 'வளர்ந்துள்ளது'; gāo-shān என்றால் 'உயர்ந்த மலை'."
      },
      th: {
        s: "หลังสระน้ำมีภูเขาสูงตระหง่าน",
        r: "lang sa nam mi phu khao sung tra-ngan",
        e: "hòu-miàn แปลว่า ข้างหลัง; zhǎng-zhe แปลว่า ขึ้นอยู่; gāo-shān แปลว่า ภูเขาสูง"
      },
      km: {
        s: "លើទួលមានផ្កាព្រៃច្រើន, ផ្កាព្រៃក្រហមដូចភ្លើង។",
        r: "ləə tuəl mien pʰkaa-prey craən, pʰkaa-prey krɑhɑm douch pʰləəng.",
        e: "គឺលើទួលមានផ្កាព្រៃច្រើន; គឺផ្កាព្រៃក្រហមដូចភ្លើង។"
      },
      vi: {
        s: "Trên đồi hoa dại nhiều, hoa dại đỏ như lửa.",
        r: "",
        e: "là trên đồi nhiều hoa dại; là hoa dại đỏ như lửa."
      },
      id: {
        s: "Di atas bukit banyak bunga liar, bunga liar merah bagai api.",
        r: "",
        e: "artinya di atas bukit banyak bunga liar; artinya bunga liar merah bagai api."
      },
      ne: {
        s: "डाँडामाथि जङ्गली फूल धेरै, जङ्गली फूल आगोजस्तो रातो।",
        r: "ḍā̃ḍā-māthi jaṅgalī phūl dherai, jaṅgalī phūl āgojasto rāto.",
        e: "भनेको डाँडामाथि जङ्गली फूल धेरै हुनु; भनेको जङ्गली फूल आगोजस्तो रातो हुनु हो।"
      },
      bn: {
        s: "ঢালে বুনো ফুল অনেক, বুনো ফুল আগুনের মতো লাল।",
        r: "ḍhāle buno phul anek, buno phul āguner mato lāl.",
        e: "ঢালে অনেক বুনো ফুল ফুটেছে, সেগুলো আগুনের মতো লাল।"
      },
      es: {
        s: "En la loma hay muchas flores silvestres, rojas como el fuego.",
        r: "",
        e: "La loma está llena de flores silvestres de un rojo como el fuego."
      },
      en: {
        s: "Behind the pond, a tall mountain rises,",
        r: "",
        e: "hòu-miàn means 'behind'; zhǎng-zhe means 'grows / stands'; gāo-shān means 'tall mountain'."
      },
      de: {
        s: "Auf dem Hügel blühen viele Wildblumen, rot wie Feuer.",
        r: "",
        e: "Der Hügel ist voll Wildblumen, rot wie Feuer."
      },
      my: {
        s: "တောင်ကုန်းပေါ်မှာ တောပန်းတွေ အများကြီး၊ တောပန်းတွေ မီးလိုနီနေတယ်။",
        r: "taun-kone-paw-hma taw-pan-twe-a-mya-kyi, taw-pan-twe-mi-lo-ni-ne-te.",
        e: "တောင်ကုန်းပေါ်မှာ တောပန်းတွေ အများကြီးပွင့်ပြီး မီးလို နီနေတယ်။"
      },
      ko: {
        s: "언덕 위에는 들꽃이 많고, 들꽃은 불처럼 빨개.",
        r: "Eondeok wieneun deulkkotchi manhgo, deulkkotcheun bulcheoreom ppalgae.",
        e: "는 언덕 위라는 뜻이다; 는 들꽃이 많다는 뜻이다; 는 불처럼 빨갛다는 비유이다."
      },
      ja: {
        s: "丘の上には野花が多く、野花は火のように赤い。",
        r: "Oka no ue ni wa nobana ga ōku, nobana wa hi no yō ni akai.",
        e: "丘の上という意味である; 野花が多いという意味である; 火のように赤いというたとえである。"
      },
      si: {
        s: "කන්ද උඩ වල් මල් බොහෝයි, වල් මල් ගින්දර වගේ රතුයි.",
        r: "Kanda uda val mal bohoyi, val mal gindara vage ratuyi.",
        e: "යනු කන්ද උඩ යන්නයි; යනු වල් මල් බොහෝයි යන්නයි; යනු ගින්දර වගේ රතුයි යන උපමාවයි."
      },
      fa: {
        s: "روی تپه گل‌های وحشی بسیار است، گل‌های وحشی سرخ مثل آتش.",
        r: "Rouy-e tappe gol-hâ-ye vahshi besyâr ast, gol-hâ-ye vahshi sorx mesl-e âtash.",
        e: "یعنی روی تپه؛ یعنی گل‌های وحشی بسیار؛ تشبیه به سرخی آتش است."
      }
    },
    {
      hi: {
        s: "पेड़ों पर पक्षी गा रहे हैं, मधुमक्खियाँ मँडरा रही हैं,",
        r: "peṛoṅ par pakṣī gā rahe haiṅ, madhumakkhiyāṅ maṇḍrā rahī haiṅ,",
        e: "shàng-miàn का मतलब है 'ऊपर'; chàng-gē का मतलब है 'गाना'; wēng-wēng मधुमक्खी की भिनभिनाहट की आवाज़ है।"
      },
      ta: {
        s: "மரங்களில் பறவைகள் பாடுகின்றன, தேனீக்கள் ரீங்கரிக்கின்றன,",
        r: "maraṅkaḷil paṟavaikaḷ pāṭukiṉṟaṉa, tēṉīkkaḷ rīṅkarikkiṉṟaṉa,",
        e: "shàng-miàn என்றால் 'மேலே'; chàng-gē என்றால் 'பாடு'; wēng-wēng என்பது தேனீக்களின் ரீங்கார ஒலி."
      },
      th: {
        s: "นกร้องเพลงบนต้นไม้ ผึ้งบินหึ่ง ๆ",
        r: "nok rong phleng bon ton mai phueng bin hueng hueng",
        e: "shàng-miàn แปลว่า ข้างบน; chàng-gē แปลว่า ร้องเพลง; wēng-wēng คือเสียงหึ่งของผึ้ง"
      },
      km: {
        s: "ក្នុងស្ទឹង, មានក្ងានស,",
        r: "knong stɨng, mien kŋien sɑ,",
        e: "គឺក្នុងស្ទឹងតូចមានក្ងានពណ៌ស។"
      },
      vi: {
        s: "Trong sông nhỏ, có ngỗng trắng,",
        r: "",
        e: "là trong sông nhỏ có ngỗng trắng."
      },
      id: {
        s: "Di sungai kecil, ada angsa putih,",
        r: "",
        e: "artinya di sungai kecil ada angsa putih."
      },
      ne: {
        s: "सानो खोलामा, सेता हाँस छन्,",
        r: "sāno kholāmā, setā hā̃s chhan,",
        e: "भनेको सानो खोलामा सेता हाँस हुनु हो।"
      },
      bn: {
        s: "ছোট্ট নদীতে আছে সাদা হাঁস,",
        r: "chhoṭṭo nadīte āchhe sādā hāṁs,",
        e: "ছোট নদীতে সাদা হাঁস ভাসছে।"
      },
      es: {
        s: "En el riachuelo hay gansos blancos,",
        r: "",
        e: "En el riachuelo nadan gansos blancos."
      },
      en: {
        s: "Birds sing in the trees, bees buzz around,",
        r: "",
        e: "shàng-miàn means 'on top / above'; chàng-gē means 'to sing'; wēng-wēng is the buzzing sound of bees."
      },
      de: {
        s: "Im Bächlein schwimmen weiße Gänse,",
        r: "",
        e: "Im Bächlein schwimmen weiße Gänse."
      },
      my: {
        s: "ချောင်းငယ်လေးထဲမှာ ငန်းဖြူတွေ ရှိတယ်,",
        r: "chaung-nge-le-hte-hma ngan-phyu-twe-shi-te,",
        e: "ချောင်းငယ်လေးထဲမှာ ငန်းဖြူတွေ ကူးခတ်နေတယ်။"
      },
      ko: {
        s: "작은 강에는, 흰 거위가 있어,",
        r: "Jageun gangeneun, huin geowiga isseo,",
        e: "는 작은 강 안이라는 뜻이다; 는 흰 거위가 있다는 뜻이다."
      },
      ja: {
        s: "小川には、白いガチョウがいて、",
        r: "Ogawa ni wa, shiroi gachō ga ite,",
        e: "小川の中という意味である; 白いガチョウがいるという意味である。"
      },
      si: {
        s: "පොඩි ගඟේ, සුදු පාත්තයෝ ඉන්නවා,",
        r: "Podi gange, sudu pattayo innava,",
        e: "යනු පොඩි ගඟේ යන්නයි; යනු සුදු පාත්තයෝ ඉන්නවා යන්නයි."
      },
      fa: {
        s: "در رودخانه کوچک، غازهای سفید هستند،",
        r: "Dar roudxâne-ye kouchak, qâz-hâ-ye sefid hastand,",
        e: "یعنی در رودخانه کوچک؛ یعنی غازهای سفید هستند."
      }
    },
    {
      hi: {
        s: "तालाब में मछलियाँ तैर रही हैं, कितना प्यारा घर है!",
        r: "tālāb meṅ machhaliyāṅ tair rahī haiṅ, kitnā pyārā ghar hai!",
        e: "lǐ-miàn का मतलब है 'अंदर'; yóu का मतलब है 'तैरना'; kě-'ài का मतलब है 'प्यारा'।"
      },
      ta: {
        s: "குளத்தில் மீன்கள் நீந்துகின்றன, எவ்வளவு அழகான வீடு!",
        r: "kuḷattil mīṉkaḷ nīntukiṉṟaṉa, evvaḷavu aḻakāṉa vīṭu!",
        e: "lǐ-miàn என்றால் 'உள்ளே'; yóu என்றால் 'நீந்து'; kě-'ài என்றால் 'அழகான'."
      },
      th: {
        s: "ปลาว่ายน้ำในสระ บ้านช่างน่ารักเหลือเกิน!",
        r: "pla wai nam nai sa ban chang na rak luea koen!",
        e: "lǐ-miàn แปลว่า ข้างใน; yóu แปลว่า ว่ายน้ำ; kě-'ài แปลว่า น่ารัก"
      },
      km: {
        s: "ក្ងានលេងរលកបៃតង;",
        r: "kŋien leeŋ rɔlɔɔk biey-tɑng;",
        e: "គឺក្ងានលេងជាមួយរលកទឹកបៃតង។"
      },
      vi: {
        s: "Ngỗng đùa giỡn sóng xanh;",
        r: "",
        e: "là ngỗng đùa giỡn với sóng xanh."
      },
      id: {
        s: "Angsa bermain ombak hijau;",
        r: "",
        e: "artinya angsa bermain dengan ombak hijau."
      },
      ne: {
        s: "हाँस हरियो छालसँग खेल्छन्;",
        r: "hā̃s hariyo chhālsãga khelchhan;",
        e: "भनेको हाँस हरियो छालसँग खेल्नु हो।"
      },
      bn: {
        s: "হাঁসেরা সবুজ ঢেউয়ে খেলে;",
        r: "hāṁserā sabuj ḍheuẏe khele;",
        e: "হাঁসেরা সবুজ ঢেউয়ের মধ্যে খেলছে।"
      },
      es: {
        s: "Los gansos juegan en las olas verdes;",
        r: "",
        e: "Los gansos juegan entre las olas verdes del agua."
      },
      en: {
        s: "Fish swim in the pond — what a lovely home!",
        r: "",
        e: "lǐ-miàn means 'inside'; yóu means 'to swim'; kě-'ài means 'cute, lovely'."
      },
      de: {
        s: "Die Gänse spielen in den grünen Wellen;",
        r: "",
        e: "Die Gänse spielen in den grünen Wellen des Wassers."
      },
      my: {
        s: "ငန်းလေးတွေ စိမ်းလန်းတဲ့လှိုင်းထဲမှာ ဆော့ကစားတယ်;",
        r: "ngan-le-twe-sein-lan-te-hlaing-hte-hma-saw-ka-sa-te;",
        e: "ငန်းလေးတွေ စိမ်းလန်းတဲ့ရေလှိုင်းထဲမှာ ဆော့ကစားနေတယ်။"
      },
      ko: {
        s: "거위들이 푸른 물결에서 놀아;",
        r: "Geowideuri pureun mulgyeoreseo nora;",
        e: "는 거위들이라는 뜻이다; 는 푸른 물결에서 논다는 뜻이다."
      },
      ja: {
        s: "ガチョウが緑の波とたわむれる；",
        r: "Gachō ga midori no nami to tawamureru;",
        e: "ガチョウという意味である; 緑の波とたわむれるという意味である。"
      },
      si: {
        s: "පාත්තයෝ කොළ රළ සමඟ සෙල්ලම් කරනවා;",
        r: "Pattayo kola rala samaga sellam karanava;",
        e: "යනු පාත්තයෝ යන්නයි; යනු කොළ රළ සමඟ සෙල්ලම් කරනවා යන්නයි."
      },
      fa: {
        s: "غازها با موج‌های سبز بازی می‌کنند؛",
        r: "Qâz-hâ bâ mouj-hâ-ye sabz bâzi mi-konand;",
        e: "یعنی غازها؛ یعنی بازی با موج‌های سبز."
      }
    },
    {
      hi: {
        s: "मेरे घर के सामने एक छोटी नदी है,",
        r: "mere ghar ke sāmne ek chhoṭī nadī hai,",
        e: "xiǎo-hé का मतलब है 'छोटी नदी'; hòu-miàn का मतलब है 'पीछे'; yǒu का मतलब है 'होना'।"
      },
      ta: {
        s: "என் வீட்டுக்கு முன்னால் ஒரு சிறு ஆறு உள்ளது,",
        r: "eṉ vīṭṭukku muṉṉāl oru ciṟu āṟu uḷḷatu,",
        e: "xiǎo-hé என்றால் 'சிறு ஆறு'; hòu-miàn என்றால் 'பின்னால்'; yǒu என்றால் 'உள்ளது'."
      },
      th: {
        s: "หน้าบ้านของฉันมีลำธารเล็ก ๆ",
        r: "na ban khong chan mi lam than lek lek",
        e: "xiǎo-hé แปลว่า ลำธารเล็ก ๆ; hòu-miàn แปลว่า ข้างหลัง; yǒu แปลว่า มี"
      },
      km: {
        s: "លេងជាមួយរលកបៃតង, ក្ងានសប្បាយចិត្ត,",
        r: "leeŋ ciemuəy rɔlɔɔk biey-tɑng, kŋien sɑbbaay-cət,",
        e: "គឺលេងសប្បាយជាមួយរលក; គឺក្ងានសប្បាយចិត្ត។"
      },
      vi: {
        s: "Đùa giỡn sóng xanh, ngỗng vui vẻ,",
        r: "",
        e: "là đùa giỡn với sóng; là ngỗng vui vẻ."
      },
      id: {
        s: "Bermain dengan ombak hijau, angsa gembira,",
        r: "",
        e: "artinya bermain dengan ombak; artinya angsa gembira."
      },
      ne: {
        s: "हरियो छालसँग खेल्दै, हाँस खुसी,",
        r: "hariyo chhālsãga kheldai, hā̃s khusī,",
        e: "भनेको हरियो छालसँग खेल्नु; भनेको हाँस खुसी हुनु हो।"
      },
      bn: {
        s: "সবুজ ঢেউয়ে খেলে হাঁসেরা খুশি,",
        r: "sabuj ḍheuẏe khele hāṁserā khuśi,",
        e: "ঢেউয়ে খেলে হাঁসেরা খুব আনন্দ পায়।"
      },
      es: {
        s: "Jugando en las olas verdes, los gansos son felices,",
        r: "",
        e: "Los gansos se divierten y son felices entre las olas."
      },
      en: {
        s: "In front of my house there's a little river,",
        r: "",
        e: "xiǎo-hé means 'a small river'; hòu-miàn means 'behind'; yǒu means 'there is / to have'."
      },
      de: {
        s: "In den grünen Wellen spielen sie — die Gänse sind fröhlich,",
        r: "",
        e: "Die Gänse haben Spaß und sind fröhlich in den Wellen."
      },
      my: {
        s: "စိမ်းလန်းတဲ့လှိုင်းထဲမှာ ဆော့ရင်း ငန်းလေးတွေ ပျော်ရွှင်တယ်,",
        r: "sein-lan-te-hlaing-hte-hma-saw-yin-ngan-le-twe-pyaw-shwin-te,",
        e: "လှိုင်းထဲမှာ ဆော့ကစားရင်း ငန်းလေးတွေ ပျော်ရွှင်နေတယ်။"
      },
      ko: {
        s: "푸른 물결과 장난치며, 거위들은 즐거워,",
        r: "Pureun mulgyeolgwa jangnanchimyeo, geowideureun jeulgeowo,",
        e: "는 장난친다는 뜻이다; 는 거위들이 즐겁다는 뜻이다."
      },
      ja: {
        s: "緑の波とじゃれて、ガチョウは楽しそう、",
        r: "Midori no nami to jarete, gachō wa tanoshisō,",
        e: "じゃれるという意味である; ガチョウが楽しそうという意味である。"
      },
      si: {
        s: "කොළ රළ සමඟ සෙල්ලම් කරමින්, පාත්තයෝ සතුටින්,",
        r: "Kola rala samaga sellam karamin, pattayo satutin,",
        e: "යනු සෙල්ලම් කරනවා යන්නයි; යනු පාත්තයෝ සතුටින් යන්නයි."
      },
      fa: {
        s: "با موج‌های سبز بازی می‌کنند، غازها شادند،",
        r: "Bâ mouj-hâ-ye sabz bâzi mi-konand, qâz-hâ shâdand,",
        e: "یعنی بازی کردن؛ یعنی غازها شادند."
      }
    },
    {
      hi: {
        s: "नदी के पीछे एक बड़ा पहाड़ है, कितना प्यारा घर है!",
        r: "nadī ke pīche ek baṛā pahāṛ hai, kitnā pyārā ghar hai!",
        e: "dà-shān का मतलब है 'बड़ा पहाड़'; jiā का मतलब है 'घर'; kě-'ài का मतलब है 'प्यारा'।"
      },
      ta: {
        s: "ஆற்றுக்குப் பின்னால் பெரிய மலை உள்ளது, எவ்வளவு அழகான வீடு!",
        r: "āṟṟukkup piṉṉāl periya malai uḷḷatu, evvaḷavu aḻakāṉa vīṭu!",
        e: "dà-shān என்றால் 'பெரிய மலை'; jiā என்றால் 'வீடு'; kě-'ài என்றால் 'அழகான'."
      },
      th: {
        s: "หลังลำธารมีภูเขาใหญ่ บ้านช่างน่ารักเหลือเกิน!",
        r: "lang lam than mi phu khao yai ban chang na rak luea koen!",
        e: "dà-shān แปลว่า ภูเขาใหญ่; jiā แปลว่า บ้าน; kě-'ài แปลว่า น่ารัก"
      },
      km: {
        s: "ងើបក្បាលច្រៀងចម្រៀងពិរោះ។",
        r: "ŋəəb kbaal cries cɑmrieŋ pirʊəh.",
        e: "គឺងើបក្បាលឡើង; គឺច្រៀងចម្រៀងពិរោះ។"
      },
      vi: {
        s: "Ngẩng đầu hát vang bài ca trong.",
        r: "",
        e: "là ngẩng đầu lên; là hát bài ca trong trẻo."
      },
      id: {
        s: "Mendongak menyanyikan lagu merdu.",
        r: "",
        e: "artinya mendongak; artinya menyanyikan lagu merdu."
      },
      ne: {
        s: "शिर ठाडो पारी मिठो गीत गाउँछन्।",
        r: "śir ṭhāḍo pārī miṭho gīt gāũchhan.",
        e: "भनेको शिर ठाडो पार्नु; भनेको मिठो गीत गाउनु हो।"
      },
      bn: {
        s: "মাথা উঁচু করে পরিষ্কার গান গায়।",
        r: "māthā um̐chu kare pariṣkār gān gāẏ.",
        e: "হাঁসেরা মাথা উঁচু করে সুন্দর গান গাইছে।"
      },
      es: {
        s: "Con la cabeza en alto, cantan una clara canción.",
        r: "",
        e: "Los gansos alzan la cabeza y cantan una canción clara."
      },
      en: {
        s: "Behind the river stands a big mountain — what a lovely home!",
        r: "",
        e: "dà-shān means 'big mountain'; jiā means 'home / family'; kě-'ài means 'lovely'."
      },
      de: {
        s: "Den Kopf erhoben, singen sie ein klares Lied.",
        r: "",
        e: "Die Gänse heben den Kopf und singen ein klares Lied."
      },
      my: {
        s: "ဦးခေါင်းမော့ပြီး ကြည်လင်တဲ့သီချင်းကို သီဆိုတယ်။",
        r: "ū-khaung-maw-pyi-kyi-lin-te-thi-chin-ko-thi-so-te.",
        e: "ငန်းလေးတွေ ဦးခေါင်းမော့ပြီး ကြည်လင်တဲ့သီချင်း သီဆိုနေတယ်။"
      },
      ko: {
        s: "고개를 들고 맑은 노래를 불러.",
        r: "Gogae-reul deulgo malgeun noraereul bulleo.",
        e: "는 고개를 든다는 뜻이다; 는 맑은 노래를 부른다는 뜻이다."
      },
      ja: {
        s: "頭をもたげて澄んだ歌を歌う。",
        r: "Atama o motagete sunda uta o utau.",
        e: "頭をもたげるという意味である; 澄んだ歌を歌うという意味である。"
      },
      si: {
        s: "හිස උසස් කරගෙන මිහිරි ගී ගයනවා.",
        r: "Hisa usas karagena mihiri gi gayanava.",
        e: "යනු හිස උසස් කරගන්නවා යන්නයි; යනු මිහිරි ගී ගයනවා යන්නයි."
      },
      fa: {
        s: "سر بالا گرفته آواز زلال می‌خوانند.",
        r: "Sar bâlâ gerefte âvâz-e zolâl mi-xânand.",
        e: "یعنی سر بالا گرفتن؛ یعنی آواز زلال خواندن."
      }
    }
  ],
  poshuige: [
    {
      hi: {
        s: "अच्छा बच्चा है, तेईस साल का,",
        r: "acchā baccā hai, teīs sāl kā,",
        e: "hǎo-ér-tóng का मतलब है 'अच्छा बच्चा'; shí-sān-nián का मतलब है 'तेरह साल' (गाने में shí-sān-suì यानी तेरह वर्ष); cóng का मतलब है 'से'।"
      },
      ta: {
        s: "நல்ல குழந்தை, பதின்மூன்று வயது,",
        r: "nalla kuḻantai, patiṉmūṉṟu vayatu,",
        e: "hǎo-ér-tóng என்றால் 'நல்ல குழந்தை'; shí-sān என்றால் 'பதின்மூன்று' (வயது); cóng என்றால் 'இருந்து'."
      },
      th: {
        s: "เด็กดีอายุสิบสามขวบ",
        r: "dek di ayu sip sam khuap",
        e: "hǎo-ér-tóng แปลว่า เด็กดี; shí-sān แปลว่า สิบสาม (ขวบ); cóng แปลว่า จาก"
      },
      km: {
        s: "ម្សិលមិញខ្ញុំដើរកាត់មុខផ្ទះអ្នក, អ្នកកំពុងកាន់ធុងទឹកសាច់ចេញក្រៅ",
        r: "msəl-miɲ kʰɲom daə kɑt muk pʰteah neak, neak kɑmpuŋ kan tʰuŋ-tɨk saac ceɲ kraow",
        e: "គឺម្សិលមិញដើរកាត់មុខផ្ទះអ្នក; គឺកាន់ធុងទឹកសាច់ចេញ។"
      },
      vi: {
        s: "Hôm qua tôi đi ngang qua cửa nhà bạn, bạn đang xách thùng nước hắt ra ngoài",
        r: "",
        e: "là hôm qua đi ngang cửa nhà bạn; là xách thùng nước hắt ra ngoài."
      },
      id: {
        s: "Kemarin aku lewat depan rumahmu, kamu sedang menenteng ember menyiram ke luar",
        r: "",
        e: "artinya kemarin lewat depan rumahmu; artinya menenteng ember menyiram ke luar."
      },
      ne: {
        s: "हिजो म तिम्रो घरअगाडिबाट जाँदै थिएँ, तिमी बाल्टिन बोकेर बाहिर पानी छ्याप्दै थियौ",
        r: "hijo ma timro ghar-agāḍibāṭa jā̃dai thiẽ, timī bālṭin bokera bāhira pānī chhyāpdai thiyau",
        e: "भनेको हिजो तिम्रो घरअगाडिबाट जानु; भनेको बाल्टिन बोकेर बाहिर पानी छ्याप्नु हो।"
      },
      bn: {
        s: "কাল আমি তোমার দরজার সামনে দিয়ে হেঁটে যাচ্ছিলাম, আর তুমি বালতি হাতে বাইরে পানি ছিটিয়ে দিচ্ছিলে",
        r: "kāl āmi tomār darajār sāmne diye heṁṭe yācchilām, ār tumi bālṭi hāte bāire pāni chiṭiye dicchile",
        e: "গায়ক প্রেমিকার দরজার সামনে দিয়ে হেঁটে যাচ্ছিল, আর মেয়েটি বালতি হাতে বাইরে পানি ছিটাচ্ছিল। মূল ভাব: পাশ দিয়ে যাওয়া ও পানি ছিটিয়ে দেওয়া।"
      },
      es: {
        s: "Ayer pasé por tu puerta y tú, con el cubo en la mano, echabas agua hacia fuera",
        r: "",
        e: "El cantante pasa por la puerta de la chica, que sale con un cubo a echar agua. Ideas clave: pasar por delante y echar agua."
      },
      en: {
        s: "A good child, thirteen years old,",
        r: "",
        e: "hǎo-ér-tóng means 'a good child'; shí-sān means 'thirteen' (years old); cóng means 'from'."
      },
      de: {
        s: "Gestern kam ich an deiner Tür vorbei, da standest du und schüttetest Wasser aus dem Eimer",
        r: "",
        e: "Der Sänger geht an der Tür des Mädchens vorbei; sie schüttet Wasser aus einem Eimer. Schlüsselwörter: vorbeigehen und Wasser ausschütten."
      },
      my: {
        s: "မနေ့က မင်းအိမ်ရှေ့က ငါဖြတ်သွားချိန်၊ မင်းက ရေပုံးဆွဲပြီး အပြင်ကို ရေဖြန်းနေတယ်",
        r: "ma-nei-ka min-ein-shwei-ka nga hpyat-thwa-chin, min-ka yei-pon-hswal-hpi a-pyin-ko yei-hpyan-nei-dei",
        e: "သီချင်းဆိုသူက ချစ်သူရဲ့အိမ်ရှေ့က ဖြတ်သွားတယ်၊ မိန်းကလေးက ရေပုံးနဲ့ ရေဖြန်းနေတယ်။ အဓိကအချက်: ဖြတ်သွားတယ် နဲ့ ရေဖြန်းတယ်။"
      },
      ko: {
        s: "어제 네 문 앞을 지나는데, 너는 물통을 들고 밖으로 물을 뿌리고 있었어",
        r: "Eoje ne mun apeul jinaneunde, neoneun multongeul deulgo bakkeuro mureul ppurigo isseosseo",
        e: "는 어제라는 뜻이다; 는 네 문 앞을 지나간다는 뜻이다; 는 물통을 든다는 뜻이다; 는 밖으로 뿌린다는 뜻이다."
      },
      ja: {
        s: "昨日君の門前を通りかかったら、君はバケツを持って外に水をまいていた",
        r: "Kinō kimi no monzen o tōrikakattara, kimi wa baketsu o motte soto ni mizu o maite-ita",
        e: "昨日という意味である; 君の門前を通りかかるという意味である; バケツを持つという意味である; 外にまくという意味である。"
      },
      si: {
        s: "ඊයේ මම ඔයාගේ දොරකඩින් යනකොට, ඔයා වතුර බාල්දියක් අරගෙන එළියට වතුර ඉහිනවා",
        r: "Iye mama oyage dorakadin yanakota, oya vatura baldiyak aragena eliyata vatura ihinava",
        e: "යනු ඊයේ යන්නයි; යනු ඔයාගේ දොරකඩින් යනවා යන්නයි; යනු වතුර බාල්දියක් අරගෙන යන්නයි; යනු එළියට වතුර ඉහිනවා යන්නයි."
      },
      fa: {
        s: "دیروز که از جلوی در تو می‌گذشتم، تو سطل آب به دست داشتی و به بیرون آب می‌پاشیدی",
        r: "Dirouz ke az jelou-ye dar-e tou mi-gozashtam, tou satl-e âb be dast dâshti o be biroun âb mi-pâshidi",
        e: "یعنی دیروز؛ یعنی از جلوی در تو گذشتن؛ یعنی سطل آب به دست داشتن؛ یعنی به بیرون آب پاشیدن."
      }
    },
    {
      hi: {
        s: "रोज़ सुबह-सुबह छोटी बाल्टी लेकर",
        r: "roz subah-subah chhoṭī bālṭī lekar",
        e: "tí-zhe का मतलब है 'हाथ में पकड़कर ले जाना'; xiǎo-shuǐ-tǒng का मतलब है 'छोटी बाल्टी'; cóng-zǎo-dào-wǎn का मतलब है 'सुबह से शाम तक'।"
      },
      ta: {
        s: "ஒவ்வொரு காலையும் சிறு வாளியை எடுத்துக்கொண்டு,",
        r: "ovvoru kālaiyum ciṟu vāḷiyai eṭuttukkoṇṭu,",
        e: "tí-zhe என்றால் 'கையில் தூக்கிச் செல்'; xiǎo-shuǐ-tǒng என்றால் 'சிறு வாளி'; cóng-zǎo-dào-wǎn என்றால் 'காலை முதல் மாலை வரை'."
      },
      th: {
        s: "ทุกเช้าถือถังน้ำใบเล็ก",
        r: "thuk chao thue thang nam bai lek",
        e: "tí-zhe แปลว่า ถือด้วยมือ; xiǎo-shuǐ-tǒng แปลว่า ถังน้ำใบเล็ก; cóng-zǎo-dào-wǎn แปลว่า ตั้งแต่เช้าจรดเย็น"
      },
      km: {
        s: "សាច់ត្រូវស្បែកជើងស្បែករបស់ខ្ញុំ, អ្នកដំណើរលើផ្លូវសើចហាហា",
        r: "saac trəw sbaek-cəəng sbaek rɔbɑh kʰɲom, neak dɑmnəə ləə pʰlow səɨc haa-haa",
        e: "គឺទឹកសាច់ត្រូវស្បែកជើង; គឺអ្នកដំណើរសើច។"
      },
      vi: {
        s: "Hắt lên giày da của tôi, người đi đường cười ha ha",
        r: "",
        e: "là hắt lên giày da của tôi; là người đi đường cười ha ha."
      },
      id: {
        s: "Tersiram ke sepatu kulitku, pejalan kaki tertawa ha ha",
        r: "",
        e: "artinya tersiram ke sepatu kulitku; artinya pejalan kaki tertawa."
      },
      ne: {
        s: "मेरो छालाको जुत्तामा पर्यो, बाटोका यात्री हाँसे",
        r: "mero chhālāko juttāmā paryo, bāṭokā yātrī hā̃se",
        e: "भनेको मेरो छालाको जुत्तामा पर्नु; भनेको बाटोका मानिस हाँस्नु हो।"
      },
      bn: {
        s: "পানি এসে পড়ল আমার চামড়ার জুতোয়, রাস্তার পথচারীরা হাসতে লাগল হো হো হো",
        r: "pāni ese paṛal āmār cāmṛār jutoẏ, rāstār pathacārīrā hāste lāgal ho ho ho",
        e: "পানি পড়ল গায়কের চামড়ার জুতোয়, পথচারীরা আনন্দে হাসছে। মূল ভাব: আনন্দের হাসি।"
      },
      es: {
        s: "El agua me cayó en los zapatos de piel, y la gente en la calle se reía: ja, ja, ja",
        r: "",
        e: "El agua le moja los zapatos de cuero y los transeúntes se ríen con alegría. Idea clave: risa alegre."
      },
      en: {
        s: "Every morning he carries a little bucket,",
        r: "",
        e: "tí-zhe means 'carrying by hand'; xiǎo-shuǐ-tǒng means 'a small bucket'; cóng-zǎo-dào-wǎn means 'from morning till evening'."
      },
      de: {
        s: "Das Wasser landete auf meinen Lederschuhen, und die Leute auf der Straße lachten: ha, ha, ha",
        r: "",
        e: "Das Wasser spritzt auf seine Lederschuhe, die Passanten lachen vor Freude. Kernidee: fröhliches Lachen."
      },
      my: {
        s: "ရေက ငါ့သားရေဖိနပ်ပေါ် ကျသွားတယ်၊ လမ်းပေါ်ကလူတွေ ရယ်ကြတယ် ဟားဟားဟား",
        r: "yei-ka nga-tha-yei-phi-nat-paw kya-thwa-dei, lan-paw-ka lu-dwei yei-kya-dei ha-ha-ha",
        e: "ရေက သူ့သားရေဖိနပ်ပေါ်ကျတယ်၊ လမ်းသွားလမ်းလာတွေ ပျော်ရွှင်စွာရယ်တယ်။ အဓိကအချက်: ပျော်ရွှင်တဲ့ရယ်မောခြင်း။"
      },
      ko: {
        s: "내 가죽 구두에 튀었고, 길가던 사람들이 하하 웃었어",
        r: "Nae gajuk gudu-e twieotgo, gil-gadeon saramdeuri haha useosseo",
        e: "는 내 가죽 구두에 튀었다는 뜻이다; 는 길가던 사람들이라는 뜻이다; 는 하하 웃는 소리이다."
      },
      ja: {
        s: "私の革靴にかかり、道行く人々はははと笑った",
        r: "Watashi no kawagutsu ni kakari, michiyuku hitobito wa haha to waratta",
        e: "私の革靴にかかったという意味である; 道行く人々という意味である; ははと笑う声である。"
      },
      si: {
        s: "මගේ සම් සපත්තුවට වැදුණා, පාරේ යන අය හහ හිනා වුණා",
        r: "Mage sam sapattuvata vaduna, pare yana aya haha hina vuna",
        e: "යනු මගේ සම් සපත්තුවට වැදුණා යන්නයි; යනු පාරේ යන අය යන්නයි; යනු හහ හිනා වෙන ශබ්දයයි."
      },
      fa: {
        s: "به کفش چرمی من پاشید، عابران راه هاهاها خندیدند",
        r: "Be kafsh-e charmi-ye man pâshid, âberân-e râh hâhâhâ xandidand",
        e: "یعنی به کفش چرمی من پاشید؛ یعنی عابران راه؛ صدای خنده بلند است."
      }
    },
    {
      hi: {
        s: "मैदान में जाकर पानी छिड़कता है,",
        r: "maidān meṅ jākar pānī chiṛaktā hai,",
        e: "tián का मतलब है 'खेत'; lǐ का मतलब है 'में'; qù का मतलब है 'जाना'।"
      },
      ta: {
        s: "வயலுக்குச் சென்று தண்ணீர் தெளிக்கிறான்,",
        r: "vayalukkuc ceṉṟu taṇṇīr teḷikkiṟāṉ,",
        e: "tián என்றால் 'வயல்'; lǐ என்றால் 'உள்ளே'; qù என்றால் 'செல்'."
      },
      th: {
        s: "ไปรดน้ำในทุ่งนา",
        r: "pai rot nam nai thung na",
        e: "tián แปลว่า ทุ่งนา; lǐ แปลว่า ข้างใน; qù แปลว่า ไป"
      },
      km: {
        s: "អ្នកមិនបាននិយាយអ្វីមកខ្ញុំសោះ",
        r: "neak mɨn baan niyiəy ʔvəy mɔɔk kʰɲom sɑh",
        e: "គឺអ្នកមិននិយាយអ្វីសោះ។"
      },
      vi: {
        s: "Bạn chẳng nói với tôi câu nào",
        r: "",
        e: "là bạn chẳng nói câu nào."
      },
      id: {
        s: "Kamu tidak mengatakan apa pun padaku",
        r: "",
        e: "artinya kamu tidak berkata apa pun."
      },
      ne: {
        s: "तिमीले मलाई केही भनिनौ",
        r: "timīle malāī kehī bhaninau",
        e: "भनेको तिमीले केही नभन्नु हो।"
      },
      bn: {
        s: "তুমি আমাকে একটিও কথা বললে না",
        r: "tumi āmāke ekṭio kathā balale nā",
        e: "মেয়েটি একটিও কথা বলল না — সম্পূর্ণ নীরবতা, লাজুক মুহূর্ত।"
      },
      es: {
        s: "Y no me dijiste ni una sola palabra",
        r: "",
        e: "La chica no dice ni una palabra: silencio total, un momento tímido."
      },
      en: {
        s: "He goes to the fields to sprinkle water,",
        r: "",
        e: "tián means 'field'; lǐ means 'in / inside'; qù means 'to go'."
      },
      de: {
        s: "Du hast kein einziges Wort zu mir gesagt",
        r: "",
        e: "Sie sagt kein einziges Wort: völliges Schweigen, ein schüchterner Moment."
      },
      my: {
        s: "မင်းက ငါ့ကို စကားတစ်ခွန်းမှ မပြောဘူး",
        r: "min-ka nga-ko sa-ka-ta-khwan-hma ma-pyaw-bu",
        e: "မိန်းကလေးက စကားတစ်ခွန်းမှ မပြောဘူး — လုံးဝတိတ်ဆိတ်မှု၊ ရှက်ရွံ့တဲ့အခိုက်အတန့်။"
      },
      ko: {
        s: "너는 나에게 아무 말도 하지 않았어",
        r: "Neoneun na-ege amu maldo haji anhasseo",
        e: "는 너는 나에게 아무 말도 하지 않았다는 뜻이다."
      },
      ja: {
        s: "君は私に何も言わなかった",
        r: "Kimi wa watashi ni nanimo iwanakatta",
        e: "君は私に何も言わなかったという意味である。"
      },
      si: {
        s: "ඔයා මට කිසිම දෙයක් කිව්වේ නැහැ",
        r: "Oya mata kisima deyak kivve naha",
        e: "යනු ඔයා මට කිසිම දෙයක් කිව්වේ නැහැ යන්නයි."
      },
      fa: {
        s: "تو هیچ حرفی به من نزدی",
        r: "Tou hich harfi be man nazadi",
        e: "یعنی تو هیچ حرفی به من نزدی."
      }
    },
    {
      hi: {
        s: "बाल्टी की तली में छेद है, क्या किया जाए?",
        r: "bālṭī kī talī meṅ ched hai, kyā kiyā jāe?",
        e: "tǒng-dǐ का मतलब है 'बाल्टी की तली'; pò का मतलब है 'टूटा हुआ'; dòng का मतलब है 'छेद'।"
      },
      ta: {
        s: "வாளியின் அடிப்பாகம் உடைந்துவிட்டது — என்ன செய்வது?",
        r: "vāḷiyiṉ aṭippākam uṭaintuviṭṭatu — eṉṉa ceyvatu?",
        e: "tǒng-dǐ என்றால் 'வாளியின் அடிப்பகுதி'; pò என்றால் 'உடைந்த'; dòng என்றால் 'துளை'."
      },
      th: {
        s: "ก้นถังแตกแล้วจะทำอย่างไร",
        r: "kon thang taek laeo cha tham yang rai",
        e: "tǒng-dǐ แปลว่า ก้นถัง; pò แปลว่า แตก; dòng แปลว่า รู"
      },
      km: {
        s: "អ្នកគ្រាន់តែស្រឡេចភ្នែកសម្លឹងមកខ្ញុំ",
        r: "neak kreal-tae srɑlaec pʰneek sɑmlɨng mɔɔk kʰɲom",
        e: "គឺគ្រាន់តែស្រឡេចភ្នែកមើលមក។"
      },
      vi: {
        s: "Bạn chỉ nheo mắt nhìn tôi",
        r: "",
        e: "là chỉ nheo mắt nhìn tôi."
      },
      id: {
        s: "Kamu hanya menyipitkan mata memandangku",
        r: "",
        e: "artinya hanya menyipitkan mata memandangku."
      },
      ne: {
        s: "तिमी आँखा चिम्लेर मलाई हेरिरह्यौ",
        r: "timī ā̃khā chimlera malāī herirahyau",
        e: "भनेको आँखा चिम्लेर हेर्नु हो।"
      },
      bn: {
        s: "তুমি শুধু চোখ সরু করে আমার দিকে তাকিয়ে রইলে",
        r: "tumi śudhu cokh saru kare āmār dike tākiye raile",
        e: "চোখ সরু করে তাকানো — লাজুক কিন্তু মিষ্টি দৃষ্টি, যেন মনে মনে হাসছে।"
      },
      es: {
        s: "Solo me miraste con los ojos entrecerrados",
        r: "",
        e: "Mirar con los ojos entrecerrados: una mirada tímida pero dulce, como sonriendo por dentro."
      },
      en: {
        s: "The bucket's bottom is broken — what to do?",
        r: "",
        e: "tǒng-dǐ means 'the bottom of the bucket'; pò means 'broken'; dòng means 'a hole'."
      },
      de: {
        s: "Du hast mich nur mit zusammengekniffenen Augen angesehen",
        r: "",
        e: "Mit zusammengekniffenen Augen schauen: ein schüchterner, aber lieber Blick, wie ein inneres Lächeln."
      },
      my: {
        s: "မင်းက မျက်လုံးကိုမှိတ်ပြီး ငါ့ကိုပဲ ကြည့်နေတယ်",
        r: "min-ka myet-lon-ko hmeit-hpi nga-ko-be kyi-nei-dei",
        e: "မျက်လုံးမှိတ်ပြီးကြည့်တာ — ရှက်ရွံ့ပေမယ့် ချစ်စရာကောင်းတဲ့အကြည့်၊ စိတ်ထဲက ပြုံးနေသလိုမျိုး။"
      },
      ko: {
        s: "너는 그저 눈을 가늘게 뜨고 나를 바라보았어",
        r: "Neoneun geujeo nuneul ganeulge tteugo nareul baraboasseo",
        e: "는 너는 그저라는 뜻이다; 는 눈을 가늘게 뜬다는 뜻이다; 는 나를 바라본다는 뜻이다."
      },
      ja: {
        s: "君はただ目を細めて私を見つめていた",
        r: "Kimi wa tada me o hosomete watashi o mitsumete-ita",
        e: "君はただという意味である; 目を細めるという意味である; 私を見つめるという意味である。"
      },
      si: {
        s: "ඔයා නිකම් ඇස් හීනි කරගෙන මා දෙස බැලුවා",
        r: "Oya nikam as hini karagena ma desa baluva",
        e: "යනු ඔයා නිකම් යන්නයි; යනු ඇස් හීනි කරගන්නවා යන්නයි; යනු මා දෙස බලනවා යන්නයි."
      },
      fa: {
        s: "تو فقط چشم‌هایت را تنگ کرده به من نگاه می‌کردی",
        r: "Tou faghat cheshm-hâyat râ tang karde be man negâh mi-kardi",
        e: "یعنی تو فقط؛ یعنی چشم‌ها را تنگ کردن؛ یعنی به من نگاه کردن."
      }
    },
    {
      hi: {
        s: "घबड़ाओ मत, मिट्टी से थोप दो,",
        r: "ghabṛāo mat, miṭṭī se thop do,",
        e: "bù-yòng का मतलब है 'ज़रूरत नहीं'; pà का मतलब है 'डरना'; bǔ का मतलब है 'मरम्मत करना'।"
      },
      ta: {
        s: "கவலைப்படாதே, களிமண்ணால் அடைத்துவிடு,",
        r: "kavalaippaṭātē, kaḷimaṇṇāl aṭaittuviṭu,",
        e: "bù-yòng என்றால் 'தேவையில்லை'; pà என்றால் 'பயப்படு'; bǔ என்றால் 'சரிசெய்'."
      },
      th: {
        s: "ไม่ต้องกลัว เอาดินอุดไว้",
        r: "mai tong klua ao din ut wai",
        e: "bù-yòng แปลว่า ไม่ต้อง; pà แปลว่า กลัว; bǔ แปลว่า ซ่อมแซม"
      },
      km: {
        s: "រូឡាឡា រូឡាឡា រូឡារូឡាឡេ",
        r: "ruu-laa-laa ruu-laa-laa ruu-laa-ruu-laa-lee",
        e: "ជាសំឡេងសម្រាប់ច្រៀង គ្មានន័យពិត។"
      },
      vi: {
        s: "Lu la la lu la la lu la ru la le",
        r: "",
        e: "là âm đệm khi hát, không có nghĩa."
      },
      id: {
        s: "Lu la la lu la la lu la ru la le",
        r: "",
        e: "adalah bunyi pelengkap nyanyian, tidak ada arti."
      },
      ne: {
        s: "लुलाला लुलाला लुलारुलाले",
        r: "lulālā lulālā lulārulāle",
        e: "गाउनका लागि थपिएको आवाज हो, अर्थ छैन।"
      },
      bn: {
        s: "লু লা লা, লু লা লা, লু লা লু লা লে",
        r: "lu lā lā, lu lā lā, lu lā lu lā le",
        e: "এটি গানের ধ্বনি-শব্দ, এর কোনো অর্থ নেই — শুধু সুরের জন্য গাওয়া হয়।"
      },
      es: {
        s: "Lulalá, lulalá, lulalulalé",
        r: "",
        e: "Son sílabas cantadas sin significado; solo sirven para llevar la melodía."
      },
      en: {
        s: "Don't worry, just patch it with mud,",
        r: "",
        e: "bù-yòng means 'no need'; pà means 'to fear'; bǔ means 'to mend, patch up'."
      },
      de: {
        s: "Lulala, lulala, lulalulale",
        r: "",
        e: "Bedeutungslose Gesangssilben; sie tragen nur die Melodie."
      },
      my: {
        s: "လူ လာ လာ၊ လူ လာ လာ၊ လူ လာ လူ လာ လေး",
        r: "lu la la, lu la la, lu la lu la lei",
        e: "ဒါက အဓိပ္ပာယ်မရှိတဲ့ သီချင်းသံစဉ်စကား — သံစဉ်သယ်ဆောင်ဖို့သာ ဆိုထားတာ။"
      },
      ko: {
        s: "루랄라 루랄라 루랄루랄러",
        r: "Ruralla ruralla ruralluralleo",
        e: "는 뜻 없는 흥겨운 후렴이다."
      },
      ja: {
        s: "ルーラーラー ルーラーラー ルーラールーラーラー",
        r: "Rūrārā rūrārā rūrārūrārā",
        e: "意味のない陽気なリフレインである。"
      },
      si: {
        s: "රූලා ලා රූලා ලා රූලා රූලා ලේ",
        r: "Rula la rula la rula rula le",
        e: "යනු තේරුමක් නැති සතුටු පද වැලකි."
      },
      fa: {
        s: "رولالا رولالا رولارولاله",
        r: "Roulâlâ roulâlâ roulâroulâle",
        e: "ترجیع‌بند شاد بی‌معناست."
      }
    },
    {
      hi: {
        s: "छेद के ऊपर मिट्टी थोपो, पानी नहीं बहेगा,",
        r: "ched ke ūpar miṭṭī thopo, pānī nahīṅ bahegā,",
        e: "shàng-miàn का मतलब है 'ऊपर'; shuǐ का मतलब है 'पानी'; bù का मतलब है 'नहीं'।"
      },
      ta: {
        s: "துளையின் மேல் களிமண் பூசு, தண்ணீர் கசியாது,",
        r: "tuḷaiyiṉ mēl kaḷimaṇ pūcu, taṇṇīr kaciyātu,",
        e: "shàng-miàn என்றால் 'மேலே'; shuǐ என்றால் 'தண்ணீர்'; bù என்றால் 'இல்லை'."
      },
      th: {
        s: "เอาดินปะทับบนรู น้ำจะไม่รั่ว",
        r: "ao din pa thap bon ru nam cha mai rua",
        e: "shàng-miàn แปลว่า ข้างบน; shuǐ แปลว่า น้ำ; bù แปลว่า ไม่"
      },
      km: {
        s: "រូឡា រូឡា រូឡា រូឡារូឡាឡេ",
        r: "ruu-laa ruu-laa ruu-laa ruu-laa-ruu-laa-lee",
        e: "ជាសំឡេងសម្រាប់ច្រៀង គ្មានន័យពិត។"
      },
      vi: {
        s: "Lu la lu la lu la lu la ru la le",
        r: "",
        e: "là âm đệm khi hát."
      },
      id: {
        s: "Lu la lu la lu la lu la ru la le",
        r: "",
        e: "adalah bunyi pelengkap nyanyian."
      },
      ne: {
        s: "लुला लुला लुला लुलारुलाले",
        r: "lulā lulā lulā lulārulāle",
        e: "गाउनका लागि थपिएको आवाज हो।"
      },
      bn: {
        s: "লু লা, লু লা, লু লা, লু লা লু লা লে",
        r: "lu lā, lu lā, lu lā, lu lā lu lā le",
        e: "অর্থহীন গানের ধ্বনি — ছন্দ ধরে রাখার জন্য।"
      },
      es: {
        s: "Lulá, lulá, lulá, lulalulalé",
        r: "",
        e: "Más sílabas sin sentido, para mantener el ritmo de la canción."
      },
      en: {
        s: "Smear mud over the hole, and the water won't leak,",
        r: "",
        e: "shàng-miàn means 'on top'; shuǐ means 'water'; bù means 'not'."
      },
      de: {
        s: "Lula, lula, lula, lulalulale",
        r: "",
        e: "Weitere bedeutungslose Silben, die den Rhythmus des Lieds halten."
      },
      my: {
        s: "လူ လာ၊ လူ လာ၊ လူ လာ၊ လူ လာ လူ လာ လေး",
        r: "lu la, lu la, lu la, lu la lu la lei",
        e: "အဓိပ္ပာယ်မရှိတဲ့ သံစဉ်စကား — စည်းချက်ထိန်းသိမ်းဖို့အတွက်။"
      },
      ko: {
        s: "루라 루라 루라 루라루라러",
        r: "Rura rura rura ruralluraleo",
        e: "뜻 없는 흥겨운 후렴이다."
      },
      ja: {
        s: "ルーラー ルーラー ルーラー ルーラールーラーラー",
        r: "Rūrā rūrā rūrā rūrārūrārā",
        e: "意味のない陽気なリフレインである。"
      },
      si: {
        s: "රූලා රූලා රූලා රූලා රූලා ලේ",
        r: "Rula rula rula rula rula le",
        e: "තේරුමක් නැති සතුටු පද වැලකි."
      },
      fa: {
        s: "رولا رولا رولا رولارولاله",
        r: "Roulâ roulâ roulâ roulâroulâle",
        e: "ترجیع‌بند شاد بی‌معناست."
      }
    },
    {
      hi: {
        s: "अच्छा बच्चा है, होशियार बच्चा है!",
        r: "acchā baccā hai, hośiyār baccā hai!",
        e: "cōng-míng का मतलब है 'होशियार'; guāi का मतलब है 'अच्छा / आज्ञाकारी'; ér-tóng का मतलब है 'बच्चा'।"
      },
      ta: {
        s: "நல்ல குழந்தை, புத்திசாலி குழந்தை!",
        r: "nalla kuḻantai, putticāli kuḻantai!",
        e: "cōng-míng என்றால் 'புத்திசாலி'; guāi என்றால் 'நல்ல'; ér-tóng என்றால் 'குழந்தை'."
      },
      th: {
        s: "เด็กดีจริง ๆ เด็กฉลาดจริง ๆ!",
        r: "dek di jing jing dek chalat jing jing!",
        e: "cōng-míng แปลว่า ฉลาด; guāi แปลว่า ดีเชื่อฟัง; ér-tóng แปลว่า เด็ก"
      },
      km: {
        s: "រូឡា រូឡា រូឡាឡេ",
        r: "ruu-laa ruu-laa ruu-laa-lee",
        e: "ជាសំឡេងបញ្ចប់បទចម្រៀង។"
      },
      vi: {
        s: "Lu la lu la lu la le",
        r: "",
        e: "là âm kết thúc bài hát."
      },
      id: {
        s: "Lu la lu la lu la le",
        r: "",
        e: "adalah bunyi penutup lagu."
      },
      ne: {
        s: "लुला लुला लुलाले",
        r: "lulā lulā lulāle",
        e: "गीत सकिने आवाज हो।"
      },
      bn: {
        s: "লু লা, লু লা, লু লা লে",
        r: "lu lā, lu lā, lu lā le",
        e: "অর্থহীন গানের ধ্বনি — গানটি এখানেই শেষ হয়।"
      },
      es: {
        s: "Lulá, lulá, lulalé",
        r: "",
        e: "Sílabas sin sentido con las que se cierra la canción."
      },
      en: {
        s: "What a good child, what a clever child!",
        r: "",
        e: "cōng-míng means 'clever'; guāi means 'good, well-behaved'; ér-tóng means 'child'."
      },
      de: {
        s: "Lula, lula, lulale",
        r: "",
        e: "Bedeutungslose Silben, mit denen das Lied ausklingt."
      },
      my: {
        s: "လူ လာ၊ လူ လာ၊ လူ လာ လေး",
        r: "lu la, lu la, lu la lei",
        e: "အဓိပ္ပာယ်မရှိတဲ့ သံစဉ်စကားနဲ့ သီချင်း အဆုံးသတ်တယ်။"
      },
      ko: {
        s: "루라 루라 루라러",
        r: "Rura rura ruraleo",
        e: "후렴의 끝맺음이다."
      },
      ja: {
        s: "ルーラー ルーラー ルーラーラー",
        r: "Rūrā rūrā rūrārā",
        e: "リフレインの締めくくりである。"
      },
      si: {
        s: "රූලා රූලා රූලා ලේ",
        r: "Rula rula rula le",
        e: "පද වැලේ අවසානයයි."
      },
      fa: {
        s: "رولا رولا رولاله",
        r: "Roulâ roulâ roulâle",
        e: "پایان ترجیع‌بند است."
      }
    }
  ],
  nixiaoqilai: [
    {
      hi: {
        s: "तुम्हारी मुस्कान सच में बहुत सुंदर है,",
        r: "tumhārī muskān sach meṁ bahut sundar hai,",
        e: "xiào का मतलब 'मुस्कुराना' है；zhēn-de का मतलब 'सच में' है — ज़ोर देने के लिए।"
      },
      ta: {
        s: "உன் சிரிப்பு உண்மையிலேயே மிக அழகாக இருக்கிறது,",
        r: "uṉ cirippu uṇmaiyilēyē mika aḻakāka irukkiṟatu,",
        e: "xiào என்றால் 'சிரி'; zhēn-de என்றால் 'உண்மையில்' — வலியுறுத்தும் சொல்."
      },
      th: {
        s: "รอยยิ้มของเธอนั้นช่างงดงามจริง ๆ",
        r: "roi yim khong thoe nan chang ngot ngam ching ching",
        e: "xiào แปลว่า ยิ้ม; zhēn-de แปลว่า จริง ๆ — ใช้เน้นความ"
      },
      km: {
        s: "ចង់ទៅភ្នំនិងទន្លេឆ្ងាយៗ",
        r: "cɑng tɨw pʰnom nɨŋ tɔnlee cʰŋaay-cʰŋaay",
        e: "គឺចង់ទៅកន្លែងឆ្ងាយៗ។"
      },
      vi: {
        s: "Muốn đến núi sông phương xa",
        r: "",
        e: "là muốn đến nơi xa."
      },
      id: {
        s: "Ingin pergi ke gunung dan sungai yang jauh",
        r: "",
        e: "artinya ingin pergi ke tempat yang jauh."
      },
      ne: {
        s: "टाढाको पहाड र नदी जान मन छ",
        r: "ṭāḍhāko pahāḍ ra nadī jāna man chha",
        e: "भनेको टाढाको ठाउँ जान मन लाग्नु हो।"
      },
      bn: {
        s: "দূরের পাহাড়-নদীর দেশে যেতে চাই",
        r: "dūrer pāhāṛ-nadīr deśe yete cāi",
        e: "দূরের পাহাড়-নদী দেখতে যাওয়ার ইচ্ছা — ভ্রমণের স্বপ্ন।"
      },
      es: {
        s: "Quiero ir a las montañas y los ríos lejanos",
        r: "",
        e: "Deseo de ver montañas y ríos lejanos: el sueño de viajar."
      },
      en: {
        s: "Your smile is truly so beautiful,",
        r: "",
        e: "xiao means 'to smile'; zhen-de means 'really, truly' — it adds emphasis."
      },
      de: {
        s: "Ich möchte zu den fernen Bergen und Flüssen",
        r: "",
        e: "Der Wunsch, ferne Berge und Flüsse zu sehen: der Traum vom Reisen."
      },
      my: {
        s: "အဝေးက တောင်တန်းချောင်းမြောင်းတွေဆီ သွားချင်တယ်",
        r: "a-wei-ka taun-dan-chaung-myuang-dwei-hsi thwa-chin-dei",
        e: "အဝေးက တောင်တန်းချောင်းမြောင်းတွေ ကြည့်ချင်တဲ့ဆန္ဒ — ခရီးသွားအိပ်မက်။"
      },
      ko: {
        s: "먼 곳의 산과 강에 가고 싶어",
        r: "Meon gosui sangwa gange gago sipeo",
        e: "는 가고 싶다는 뜻이다; 는 먼 곳의 산과 강이라는 뜻이다."
      },
      ja: {
        s: "遠くの山や川に行きたい",
        r: "Tōku no yama ya kawa ni ikitai",
        e: "行きたいという意味である; 遠くの山や川という意味である。"
      },
      si: {
        s: "දුර ඈත කඳු ගංගා බලන්න යන්න ආසයි",
        r: "Dura ata kandu ganga balanna yanna asayi",
        e: "යනු යන්න ආසයි යන්නයි; යනු දුර ඈත කඳු ගංගා යන්නයි."
      },
      fa: {
        s: "دلم می‌خواهد به کوه و رود دور بروم",
        r: "Delam mi-xâhad be kouh o roud-e dour beravam",
        e: "یعنی دلم می‌خواهد بروم؛ یعنی کوه و رود دور."
      }
    },
    {
      hi: {
        s: "फूलों की तरह वसंत की हवा में खिलती हुई,",
        r: "phūloṅ kī tarah vasant kī havā meṁ khiltī huī,",
        e: "xiàng का मतलब 'की तरह' है；huā-er का मतलब 'फूल' है；kāi का मतलब 'खिलना' है।"
      },
      ta: {
        s: "வசந்தக் காற்றில் மலர்களைப் போல மலர்ந்து,",
        r: "vacantak kāṟṟil malarkaḷaip pōla malarntu,",
        e: "xiàng என்றால் 'போல'; huā-er என்றால் 'மலர்கள்'; kāi என்றால் 'மலர்'."
      },
      th: {
        s: "บานสะพรั่งเหมือนดอกไม้ในสายลมฤดูใบไม้ผลิ",
        r: "ban sa phrang muean dok mai nai sai lom rue du bai mai phli",
        e: "xiàng แปลว่า เหมือน; huā-er แปลว่า ดอกไม้; kāi แปลว่า บาน"
      },
      km: {
        s: "ចង់ទៅមាត់សមុទ្រមើលសត្វស្លាបសមុទ្រ",
        r: "cɑng tɨw meat-sɑmot məəl sɑt slaap sɑmot",
        e: "គឺចង់ទៅមាត់សមុទ្រមើលសត្វស្លាប។"
      },
      vi: {
        s: "Muốn ra biển ngắm hải âu",
        r: "",
        e: "là muốn ra biển ngắm chim hải âu."
      },
      id: {
        s: "Ingin ke pantai melihat burung camar",
        r: "",
        e: "artinya ingin ke pantai melihat burung camar."
      },
      ne: {
        s: "समुद्र किनार गएर सामुद्रिक चरा हेर्न मन छ",
        r: "samudra kinār gaera sāmudrik carā herna man chha",
        e: "भनेको समुद्र किनार गएर चरा हेर्न मन लाग्नु हो।"
      },
      bn: {
        s: "সাগরপাড়ে গিয়ে গাঙচিল দেখতে চাই",
        r: "sāgarpāṛe giye gāṁcil dekhte cāi",
        e: "গাঙচিল হলো সামুদ্রিক পাখি — সমুদ্রতীরে ঘোরার স্বপ্ন।"
      },
      es: {
        s: "Quiero ir a la playa a ver las gaviotas",
        r: "",
        e: "La gaviota, ave marina: el sueño de pasear junto al mar."
      },
      en: {
        s: "Blooming like flowers in the spring breeze,",
        r: "",
        e: "xiang means 'like, as'; hua-er means 'flowers'; kai means 'to bloom'."
      },
      de: {
        s: "Ich möchte ans Meer, um die Möwen zu sehen",
        r: "",
        e: "Die Möwe, der Seevogel: der Traum vom Spaziergang am Meer."
      },
      my: {
        s: "ပင်လယ်ကမ်းခြေသွားပြီး ပင်လယ်ဇင်ယော်တွေ ကြည့်ချင်တယ်",
        r: "pin-lei-kan-chay-thwa-hpi pin-lei-zin-yaw-dwei kyi-chin-dei",
        e: "ပင်လယ်ဇင်ယော် ဆိုတဲ့ ပင်လယ်ငှက် — ကမ်းခြေမှာ လည်ပတ်ချင်တဲ့အိပ်မက်။"
      },
      ko: {
        s: "바닷가에 가서 갈매기를 보고 싶어",
        r: "Badatgae gaseo galmaegireul bogo sipeo",
        e: "는 바닷가라는 뜻이다; 는 갈매기를 본다는 뜻이다."
      },
      ja: {
        s: "海辺に行ってカモメを見たい",
        r: "Umibe ni itte kamome o mitai",
        e: "海辺という意味である; カモメを見るという意味である。"
      },
      si: {
        s: "මුහුදු වෙරළට ගිහින් මුහුදු ලිහිණියන් බලන්න ආසයි",
        r: "Muhudu veralata gihin muhudu lihiniyan balanna asayi",
        e: "යනු මුහුදු වෙරළ යන්නයි; යනු මුහුදු ලිහිණියන් බලනවා යන්නයි."
      },
      fa: {
        s: "دلم می‌خواهد به ساحل بروم و مرغان دریایی را ببینم",
        r: "Delam mi-xâhad be sâhel beravam o morqân-e daryâyi râ bebinam",
        e: "یعنی ساحل؛ یعنی دیدن مرغان دریایی."
      }
    },
    {
      hi: {
        s: "तुम्हारी मुस्कान सच में बहुत सुंदर है,",
        r: "tumhārī muskān sach meṁ bahut sundar hai,",
        e: "zhēn-de hǎo-kàn — 'सच में सुंदर'；hǎo-kàn का मतलब 'देखने में अच्छा, सुंदर' है।"
      },
      ta: {
        s: "உன் சிரிப்பு உண்மையிலேயே மிக அழகு,",
        r: "uṉ cirippu uṇmaiyilēyē mika aḻaku,",
        e: "zhēn-de hǎo-kàn — 'உண்மையில் அழகு'; hǎo-kàn என்றால் 'பார்க்க அழகான'."
      },
      th: {
        s: "รอยยิ้มของเธอช่างงดงามจริง ๆ",
        r: "roi yim khong thoe chang ngot ngam ching ching",
        e: "zhēn-de hǎo-kàn — 'สวยจริง ๆ'; hǎo-kàn แปลว่า ดูดี สวยงาม"
      },
      km: {
        s: "មិនថាខ្យល់ភ្លៀងច្រើនប៉ុណ្ណា",
        r: "mɨn tʰaa kʰyɑl-pʰlieŋ craən bɑɑn-naa",
        e: "គឺមិនថាឧបសគ្គច្រើនប៉ុណ្ណា។"
      },
      vi: {
        s: "Dù gió mưa nhiều bao nhiêu",
        r: "",
        e: "là dù khó khăn nhiều thế nào."
      },
      id: {
        s: "Tak peduli sebanyak apa pun angin hujan",
        r: "",
        e: "artinya tak peduli sebanyak apa pun rintangan."
      },
      ne: {
        s: "हावापानी जति भए पनि",
        r: "hāwāpānī jati bhae pani",
        e: "भनेको जस्तोसुकै कठिनाइ भए पनि हो।"
      },
      bn: {
        s: "ঝড়-বৃষ্টি যতই আসুক না কেন",
        r: "jhaṛ-bṛṣṭi yatai āsuk nā kena",
        e: "ঝড়-বৃষ্টি যতই আসুক, কোনো বাধাই গণ্য নয়।"
      },
      es: {
        s: "No importa cuánto viento y lluvia haya",
        r: "",
        e: "Venga cuanto viento y lluvia venga, ningún obstáculo cuenta."
      },
      en: {
        s: "Your smile is truly so beautiful,",
        r: "",
        e: "zhen-de hao-kan — 'truly good-looking'; hao-kan means 'beautiful, pleasing to the eye'."
      },
      de: {
        s: "Egal wie viel Wind und Regen kommt",
        r: "",
        e: "Wie viel Wind und Regen auch kommt, kein Hindernis zählt."
      },
      my: {
        s: "လေမုန်တိုင်းဘယ်လောက်ရှိရှိ",
        r: "lei-mone-tine-bei-lauk-shi-shi",
        e: "လေမုန်တိုင်းဘယ်လောက်လာလာ၊ အတားအဆီးတစ်ခုမှ အရေးမကြီးဘူး။"
      },
      ko: {
        s: "바람과 비가 얼마나 오든",
        r: "Baramgwa biga eolmana odeun",
        e: "는 상관없다는 뜻이다; 는 바람과 비가 얼마나 오든이라는 뜻이다."
      },
      ja: {
        s: "風雨がどれほどあろうと",
        r: "Fūu ga dorehodo arō to",
        e: "どんなにという意味である; 風雨がどれほどあろうとという意味である。"
      },
      si: {
        s: "සුළඟ වැස්ස කොතරම් ආවත්",
        r: "Sulanga vassa kotaram avat",
        e: "යනු කොතරම් වුණත් යන්නයි; යනු සුළඟ වැස්ස කොතරම් ආවත් යන්නයි."
      },
      fa: {
        s: "هرقدر باد و باران باشد",
        r: "Har-qadr bâd o bârân bâshad",
        e: "یعنی هرقدر؛ یعنی هرقدر باد و باران باشد."
      }
    },
    {
      hi: {
        s: "तुम्हें देखकर सारी परेशानियाँ भूल जाता हूँ।",
        r: "tumheṁ dekhkar sārī pareśāniyāṅ bhūl jātā hūṅ.",
        e: "kàn-jiàn का मतलब 'देखना' है；fán-nǎo का मतलब 'परेशानी, चिंता' है；wàng-diào का मतलब 'भूल जाना' है।"
      },
      ta: {
        s: "உன்னைப் பார்த்ததும் எல்லாக் கவலைகளையும் மறந்துவிடுகிறேன்.",
        r: "uṉṉaip pārttatum ellāk kavalaikaḷaiyum maṟantuviṭukiṟēṉ.",
        e: "kàn-jiàn என்றால் 'பார்'; fán-nǎo என்றால் 'கவலைகள்'; wàng-diào என்றால் 'முற்றிலும் மற'."
      },
      th: {
        s: "เห็นเธอแล้วลืมความกังวลทั้งหมด",
        r: "hen thoe laeo luem khwam kang won thang mot",
        e: "kàn-jiàn แปลว่า มองเห็น; fán-nǎo แปลว่า ความกังวล; wàng-diào แปลว่า ลืมไปหมด"
      },
      km: {
        s: "មានអ្នកគឺគ្រប់គ្រាន់ហើយ",
        r: "mien neak kɨ krup-krean haəy",
        e: "គឺមានអ្នកគឺគ្រប់គ្រាន់។"
      },
      vi: {
        s: "Có bạn là đủ rồi",
        r: "",
        e: "là có bạn là đủ."
      },
      id: {
        s: "Ada kamu sudah cukup",
        r: "",
        e: "artinya ada kamu sudah cukup."
      },
      ne: {
        s: "तिमी छौ भने पुग्छ",
        r: "timī chhau bhane pugchha",
        e: "भनेको तिमी छौ भने पुग्छ हो।"
      },
      bn: {
        s: "তুমি থাকলেই যথেষ্ট",
        r: "tumi thākalei yathesṭa",
        e: "প্রিয়জন পাশে থাকলেই সব পূর্ণ — ভালোবাসার সরল স্বীকারোক্তি।"
      },
      es: {
        s: "Contigo me basta",
        r: "",
        e: "Con la persona amada al lado, todo está completo: una simple declaración de amor."
      },
      en: {
        s: "Seeing you, I forget all my worries.",
        r: "",
        e: "kan-jian means 'to see'; fan-nao means 'worries, troubles'; wang-diao means 'to forget completely'."
      },
      de: {
        s: "Mit dir genügt mir alles",
        r: "",
        e: "Mit dem geliebten Menschen an der Seite ist alles vollständig: ein einfaches Liebesbekenntnis."
      },
      my: {
        s: "မင်းရှိရင် လုံလောက်ပြီ",
        r: "min-shi-yin lon-lauk-pyi",
        e: "ချစ်ရသူ အနားမှာရှိရင် အရာရာပြည့်စုံတယ် — ရိုးရှင်းတဲ့အချစ်ဝန်ခံချက်။"
      },
      ko: {
        s: "네가 있으면 충분해",
        r: "Nega isseumyeon chungbunhae",
        e: "는 네가 있다는 뜻이다; 는 충분하다는 뜻이다."
      },
      ja: {
        s: "君がいれば十分だ",
        r: "Kimi ga ireba jūbun da",
        e: "君がいるという意味である; 十分だという意味である。"
      },
      si: {
        s: "ඔයා ඉන්නවා නම් ඇති",
        r: "Oya innava nam ati",
        e: "යනු ඔයා ඉන්නවා යන්නයි; යනු ඇති යන්නයි."
      },
      fa: {
        s: "اگر تو باشی کافی است",
        r: "Agar tou bâshi kâfi ast",
        e: "یعنی اگر تو باشی؛ یعنی کافی است."
      }
    },
    {
      hi: {
        s: "इस दुनिया में तुमसे ज़्यादा सुंदर कोई नहीं,",
        r: "is duniyā meṁ tumse zyādā sundar koī nahīṁ,",
        e: "zhè-shì-jiè का मतलब 'यह दुनिया' है；méi-yǒu का मतलब 'नहीं है' — नकारात्मक।"
      },
      ta: {
        s: "இந்த உலகில் உன்னைவிட அழகானவர் யாரும் இல்லை,",
        r: "inta ulakil uṉṉaiviṭa aḻakāṉavar yārum illai,",
        e: "zhè-shì-jiè என்றால் 'இந்த உலகம்'; méi-yǒu என்றால் 'இல்லை' — எதிர்மறை."
      },
      th: {
        s: "ในโลกนี้ไม่มีใครสวยไปกว่าเธอ",
        r: "nai lok ni mai mi khrai suai pai kwa thoe",
        e: "zhè-shì-jiè แปลว่า โลกนี้; méi-yǒu แปลว่า ไม่มี — คำปฏิเสธ"
      },
      km: {
        s: "ចូលចិត្តមើលជ្រុងមាត់របស់អ្នក",
        r: "coul-cət məəl crung-meat rɔbɑh neak",
        e: "គឺចូលចិត្តមើលមាត់របស់អ្នកញញឹម។"
      },
      vi: {
        s: "Thích nhìn khóe miệng của bạn",
        r: "",
        e: "là thích nhìn khóe miệng (nụ cười) của bạn."
      },
      id: {
        s: "Suka melihat sudut bibirmu",
        r: "",
        e: "artinya suka melihat sudut bibir (senyuman)mu."
      },
      ne: {
        s: "तिम्रो ओठको कुन हेर्न मन पर्छ",
        r: "timro oṭhko kun herna man parchha",
        e: "भनेको तिम्रो (मुसुक्क) ओठ हेर्न मन पर्नु हो।"
      },
      bn: {
        s: "তোমার ঠোঁটের কোণের হাসি দেখতে ভালোবাসি",
        r: "tomār ṭhoṁṭer koṇer hāsi dekhte bhālobāsi",
        e: "ঠোঁটের কোণ, যেখানে হাসি ফুটে ওঠে — প্রিয় মুখের খুঁটিনাটি দেখার আনন্দ।"
      },
      es: {
        s: "Me encanta mirar la comisura de tus labios",
        r: "",
        e: "La comisura de los labios, donde nace la sonrisa: el placer de contemplar los detalles del rostro amado."
      },
      en: {
        s: "In this world, no one is more beautiful than you,",
        r: "",
        e: "zhe-shi-jie means 'this world'; mei-you means 'there is not' — a negative."
      },
      de: {
        s: "Ich liebe es, deine Mundwinkel anzusehen",
        r: "",
        e: "Die Mundwinkel, wo das Lächeln entsteht: die Freude, die Details des geliebten Gesichts zu betrachten."
      },
      my: {
        s: "မင်းနှုတ်ခမ်းထောင့်ကို ကြည့်ရတာ ကြိုက်တယ်",
        r: "min hnout-khan-htaung-ko kyi-ya-da kraik-dei",
        e: "နှုတ်ခမ်းထောင့် ဆိုတာ အပြုံးပေါ်တဲ့နေရာ — ချစ်ရသူရဲ့မျက်နှာအသေးစိတ်ကို ကြည့်ရတဲ့ပျော်ရွှင်မှု။"
      },
      ko: {
        s: "네 입꼬리를 보는 게 좋아",
        r: "Ne ipkkorireul boneun ge joha",
        e: "는 좋아한다는 뜻이다; 는 입꼬리라는 뜻이다."
      },
      ja: {
        s: "君の口角を見るのが好き",
        r: "Kimi no kōkaku o miru no ga suki",
        e: "好きという意味である; 口角という意味である。"
      },
      si: {
        s: "ඔයාගේ මුව කොන බලන්න ආසයි",
        r: "Oyage muva kona balanna asayi",
        e: "යනු ආසයි යන්නයි; යනු මුව කොන යන්නයි."
      },
      fa: {
        s: "دوست دارم گوشه لبت را ببینم",
        r: "Doust dâram goushe-ye labat râ bebinam",
        e: "یعنی دوست داشتن؛ یعنی گوشه لب."
      }
    },
    {
      hi: {
        s: "मैं कसम खाता हूँ, कभी तुमसे झूठ नहीं बोलूँगा,",
        r: "maiṁ kasam khātā hūṅ, kabhī tumse jhūṭh nahīṅ bolūṅgā,",
        e: "fā-shì का मतलब 'कसम खाना' है；jué-bù का मतलब 'बिल्कुल नहीं' — मज़बूत इनकार।"
      },
      ta: {
        s: "நான் சத்தியம் செய்கிறேன், உன்னிடம் ஒருபோதும் பொய் சொல்லமாட்டேன்,",
        r: "nāṉ cattiyam ceykiṟēṉ, uṉṉiṭam orupōtum poy collamāṭṭēṉ,",
        e: "fā-shì என்றால் 'சத்தியம் செய்'; jué-bù என்றால் 'ஒருபோதும் இல்லை' — வலுவான மறுப்பு."
      },
      th: {
        s: "ฉันสาบาน จะไม่มีวันโกหกเธอ",
        r: "chan sa ban cha mai mi wan ko hok thoe",
        e: "fā-shì แปลว่า สาบาน; jué-bù แปลว่า ไม่มีวัน — การปฏิเสธอย่างหนักแน่น"
      },
      km: {
        s: "ចូលចិត្តមើលចុងចិញ្ចើមរបស់អ្នក",
        r: "coul-cət məəl cong-cəɲcəəm rɔbɑh neak",
        e: "គឺចូលចិត្តមើលចិញ្ចើមរបស់អ្នក។"
      },
      vi: {
        s: "Thích nhìn đuôi lông mày của bạn",
        r: "",
        e: "là thích nhìn đuôi lông mày của bạn."
      },
      id: {
        s: "Suka melihat ujung alismu",
        r: "",
        e: "artinya suka melihat ujung alismu."
      },
      ne: {
        s: "तिम्रो आँखीभौंको टुप्पो हेर्न मन पर्छ",
        r: "timro ā̃khībhaũko ṭuppo herna man parchha",
        e: "भनेको तिम्रो आँखीभौं हेर्न मन पर्नु हो।"
      },
      bn: {
        s: "তোমার ভ্রূর ডগা দেখতে ভালোবাসি",
        r: "tomār bhrūr ḍagā dekhte bhālobāsi",
        e: "ভ্রূর প্রান্ত — আনন্দে ভ্রূও হেসে ওঠে।"
      },
      es: {
        s: "Me encanta mirar el rabillo de tus cejas",
        r: "",
        e: "El rabillo de las cejas: cuando hay alegría, hasta las cejas sonríen."
      },
      en: {
        s: "I swear, I will never lie to you,",
        r: "",
        e: "fa-shi means 'to swear an oath'; jue-bu means 'absolutely not' — a strong refusal."
      },
      de: {
        s: "Ich liebe es, deine Augenbrauenspitzen anzusehen",
        r: "",
        e: "Die Augenbrauenspitzen: vor Freude lächeln sogar die Brauen."
      },
      my: {
        s: "မင်းမျက်ခုံးထိပ်ကို ကြည့်ရတာ ကြိုက်တယ်",
        r: "min myet-khon-htate-ko kyi-ya-da kraik-dei",
        e: "မျက်ခုံးအစွန်း — ပျော်ရွှင်ရင် မျက်ခုံးပါ ပြုံးတယ်။"
      },
      ko: {
        s: "네 눈썹 끝을 보는 게 좋아",
        r: "Ne nunsseop kkeuteul boneun ge joha",
        e: "는 눈썹 끝이라는 뜻이다."
      },
      ja: {
        s: "君の眉尻を見るのが好き",
        r: "Kimi no bijiri o miru no ga suki",
        e: "眉尻という意味である。"
      },
      si: {
        s: "ඔයාගේ ඇස්බැම අග බලන්න ආසයි",
        r: "Oyage asbama aga balanna asayi",
        e: "යනු ඇස්බැම අග යන්නයි."
      },
      fa: {
        s: "دوست دارم ابروانت را ببینم",
        r: "Doust dâram abrouânat râ bebinam",
        e: "یعنی انتهای ابرو."
      }
    },
    {
      hi: {
        s: "पापा-मम्मी की बात मानो,",
        r: "pāpā-mammī kī bāt māno,",
        e: "bà-ba का मतलब 'पापा' है；mā-ma का मतलब 'मम्मी' है；huà का मतलब 'बात' है।"
      },
      ta: {
        s: "அப்பா அம்மா சொல்வதைக் கேள்,",
        r: "appā ammā colvataik kēḷ,",
        e: "bà-ba என்றால் 'அப்பா'; mā-ma என்றால் 'அம்மா'; huà என்றால் 'சொல்'."
      },
      th: {
        s: "เชื่อฟังคำพูดของพ่อแม่",
        r: "chuea fang kham phut khong pho mae",
        e: "bà-ba แปลว่า พ่อ; mā-ma แปลว่า แม่; huà แปลว่า คำพูด"
      },
      km: {
        s: "ពពកសព្យួរនៅលើមេឃខៀវ",
        r: "pɔpɔɔk sɑ pyuə nɨw ləə meek khiew",
        e: "គឺពពកសនៅលើមេឃខៀវ។"
      },
      vi: {
        s: "Mây trắng treo trên bầu trời xanh",
        r: "",
        e: "là mây trắng trên trời xanh."
      },
      id: {
        s: "Awan putih tergantung di langit biru",
        r: "",
        e: "artinya awan putih di langit biru."
      },
      ne: {
        s: "सेतो बादल नीलो आकाशमा झुन्डिएको",
        r: "seto bādal nīlo ākāśmā jhunḍieko",
        e: "भनेको नीलो आकाशमा सेतो बादल हुनु हो।"
      },
      bn: {
        s: "নীল আকাশে ভাসছে সাদা মেঘ",
        r: "nīl ākāśe bhāsche sādā megh",
        e: "মেঘ যেন নীল আকাশে ঝুলছে — শান্ত, সুন্দর দৃশ্য।"
      },
      es: {
        s: "Las nubes blancas cuelgan del cielo azul",
        r: "",
        e: "Las nubes como suspendidas del cielo azul: una escena serena y hermosa."
      },
      en: {
        s: "Listen to mom and dad,",
        r: "",
        e: "ba-ba means 'dad'; ma-ma means 'mom'; hua means 'words, what they say'."
      },
      de: {
        s: "Weiße Wolken hängen am blauen Himmel",
        r: "",
        e: "Wolken, wie an den blauen Himmel gehängt: eine friedliche, schöne Szene."
      },
      my: {
        s: "မိုးပြာရောင်ကောင်းကင်မှာ တိမ်ဖြူတွေ တွဲလွဲခိုနေတယ်",
        r: "mo-pya-yaung-kaung-kin-hma tane-hpyu-dwei twal-lwal-kho-nei-dei",
        e: "တိမ်တွေက မိုးပြာကောင်းကင်မှာ တွဲလောင်းကျနေသလို — ငြိမ်းချမ်းလှပတဲ့ရှုခင်း။"
      },
      ko: {
        s: "흰 구름이 저 푸른 하늘에 걸려 있어",
        r: "Huin gureumi jeo pureun haneure geollyeo isseo",
        e: "는 흰 구름이라는 뜻이다; 는 저 푸른 하늘에 걸렸다는 뜻이다."
      },
      ja: {
        s: "白い雲があの青空にかかっている",
        r: "Shiroi kumo ga ano aozora ni kakatte-iru",
        e: "白い雲という意味である; あの青空にかかっているという意味である。"
      },
      si: {
        s: "සුදු වලාකුළු ඒ නිල් අහසේ එල්ලීලා",
        r: "Sudu valakulu e nil ahase ellila",
        e: "යනු සුදු වලාකුළු යන්නයි; යනු ඒ නිල් අහසේ එල්ලීලා යන්නයි."
      },
      fa: {
        s: "ابرهای سفید بر آن آسمان آبی آویخته‌اند",
        r: "Abr-hâ-ye sefid bar ân âsemân-e âbi âvixte-and",
        e: "یعنی ابرهای سفید؛ یعنی بر آن آسمان آبی آویخته."
      }
    },
    {
      hi: {
        s: "बड़े होकर जल्दी से शादी कर लो।",
        r: "baṛe hokar jaldī se śādī kar lo.",
        e: "zhǎng-dà का मतलब 'बड़ा होना' है；gǎn-kuài का मतलब 'जल्दी करो' है।"
      },
      ta: {
        s: "விரைவில் வளர்ந்து சீக்கிரம் திருமணம் செய்துகொள்.",
        r: "viraivil valarntu cīkkiram tirumaṇam ceytukoḷ.",
        e: "zhǎng-dà என்றால் 'வளர்'; gǎn-kuài என்றால் 'விரைவாக'."
      },
      th: {
        s: "โตขึ้นแล้วรีบแต่งงานเร็ว ๆ",
        r: "to khuen laeo rip taeng ngan reo reo",
        e: "zhǎng-dà แปลว่า โตขึ้น; gǎn-kuài แปลว่า รีบ"
      },
      km: {
        s: "ដូចស្នាមញញឹមរបស់អ្នក",
        r: "douch snaam-ɲɲɨm rɔbɑh neak",
        e: "គឺដូចស្នាមញញឹមរបស់អ្នក។"
      },
      vi: {
        s: "Như nụ cười của bạn",
        r: "",
        e: "là như nụ cười của bạn."
      },
      id: {
        s: "Seperti senyumanmu",
        r: "",
        e: "artinya seperti senyumanmu."
      },
      ne: {
        s: "तिम्रो मुसुक्क हाँसोजस्तो",
        r: "timro musukka hā̃sojasto",
        e: "भनेको तिम्रो मुसुक्क हाँसोजस्तो हो।"
      },
      bn: {
        s: "ঠিক তোমার হাসির মতো",
        r: "ṭhik tomār hāsir mato",
        e: "মেঘের সৌন্দর্যকে প্রেমিকার হাসির সাথে তুলনা করা হয়েছে।"
      },
      es: {
        s: "Como tu sonrisa",
        r: "",
        e: "Compara la belleza de las nubes con la sonrisa de la persona amada."
      },
      en: {
        s: "Grow up quickly and get married soon.",
        r: "",
        e: "zhang-da means 'to grow up'; gan-kuai means 'hurry up, quickly'."
      },
      de: {
        s: "Wie dein Lächeln",
        r: "",
        e: "Vergleicht die Schönheit der Wolken mit dem Lächeln der geliebten Person."
      },
      my: {
        s: "မင်းအပြုံးလိုပဲ",
        r: "min a-pyon-lo-be",
        e: "တိမ်ရဲ့အလှကို ချစ်သူရဲ့အပြုံးနဲ့ နှိုင်းယှဉ်ထားတယ်။"
      },
      ko: {
        s: "네 미소 같아",
        r: "Ne miso gata",
        e: "는 ~같다는 뜻이다; 는 네 미소라는 뜻이다."
      },
      ja: {
        s: "君の微笑みみたい",
        r: "Kimi no hohoemi mitai",
        e: "〜みたいという意味である; 君の微笑みという意味である。"
      },
      si: {
        s: "ඔයාගේ සිනහව වගේ",
        r: "Oyage sinahava vage",
        e: "යනු වගේ යන්නයි; යනු ඔයාගේ සිනහව යන්නයි."
      },
      fa: {
        s: "مثل لبخند تو",
        r: "Mesl-e labxand-e tou",
        e: "یعنی مثل؛ یعنی لبخند تو."
      }
    },
    {
      hi: {
        s: "तुम्हारी मुस्कान सच में बहुत सुंदर है,",
        r: "tumhārī muskān sach meṁ bahut sundar hai,",
        e: "nǐ का मतलब 'तुम' है；de का प्रयोग संबंध बताने के लिए — nǐ-de xiào-róng 'तुम्हारी मुस्कान'।"
      },
      ta: {
        s: "உன் சிரிப்பு உண்மையிலேயே மிக அழகு,",
        r: "uṉ cirippu uṇmaiyilēyē mika aḻaku,",
        e: "nǐ என்றால் 'நீ'; de உடைமையைக் காட்டும் — nǐ-de xiào-róng என்றால் 'உன் சிரிப்பு'."
      },
      th: {
        s: "รอยยิ้มของเธองดงามจริง ๆ",
        r: "roi yim khong thoe ngot ngam ching ching",
        e: "nǐ แปลว่า เธอ; de แสดงความเป็นเจ้าของ — nǐ-de xiào-róng คือ 'รอยยิ้มของเธอ'"
      },
      km: {
        s: "អ្នកញញឹមពិតជាស្រស់ស្អាត",
        r: "neak ɲɲɨm pət cee srɑh-saat",
        e: "គឺពេលអ្នកញញឹមពិតជាស្រស់ស្អាត។"
      },
      vi: {
        s: "Bạn cười lên thật đẹp",
        r: "",
        e: "là lúc bạn cười thật đẹp."
      },
      id: {
        s: "Kamu tersenyum sungguh cantik",
        r: "",
        e: "artinya saat kamu tersenyum sungguh cantik."
      },
      ne: {
        s: "तिमी हाँस्दा साँच्चै राम्रो देखिन्छौ",
        r: "timī hā̃sdā sā̃ccai rāmro dekhinchhau",
        e: "भनेको तिमी हाँस्दा साँच्चै राम्रो देखिनु हो।"
      },
      bn: {
        s: "তুমি হাসলে কী যে সুন্দর লাগে",
        r: "tumi hāsale kī ye sundar lāge",
        e: "গানের মূল বাক্য — হাসিমুখ সত্যিই সুন্দর।"
      },
      es: {
        s: "Qué bonita te ves cuando sonríes",
        r: "",
        e: "La frase central de la canción: el rostro sonriente es realmente hermoso."
      },
      en: {
        s: "Your smile is truly so beautiful,",
        r: "",
        e: "ni means 'you'; de shows possession — ni-de xiao-rong is 'your smile'."
      },
      de: {
        s: "Wie schön du aussiehst, wenn du lachst",
        r: "",
        e: "Der Kernsatz des Lieds: das lächelnde Gesicht ist wirklich schön."
      },
      my: {
        s: "မင်းပြုံးလိုက်ရင် တကယ်လှတယ်",
        r: "min pyon-like-yin ta-kei-hla-dei",
        e: "သီချင်းရဲ့အဓိကစာကြောင်း — ပြုံးနေတဲ့မျက်နှာ တကယ်လှပတယ်။"
      },
      ko: {
        s: "네가 웃을 때 정말 예뻐",
        r: "Nega useul ttae jeongmal yeppeo",
        e: "는 네가 웃을 때라는 뜻이다; 는 정말 예쁘다는 뜻이다."
      },
      ja: {
        s: "君が笑うと本当にきれいだ",
        r: "Kimi ga warau to hontō ni kirei da",
        e: "君が笑う時という意味である; 本当にきれいだという意味である。"
      },
      si: {
        s: "ඔයා හිනාවෙනකොට ඇත්තටම ලස්සනයි",
        r: "Oya hinavenakota attatama lassanayi",
        e: "යනු ඔයා හිනාවෙනකොට යන්නයි; යනු ඇත්තටම ලස්සනයි යන්නයි."
      },
      fa: {
        s: "وقتی می‌خندی واقعاً زیبایی",
        r: "Vaghti mi-xandi vâghe'an zibâyi",
        e: "یعنی وقتی می‌خندی؛ یعنی واقعاً زیبا."
      }
    },
    {
      hi: {
        s: "तुम्हें देखकर सारी परेशानियाँ भूल जाता हूँ।",
        r: "tumheṁ dekhkar sārī pareśāniyāṅ bhūl jātā hūṅ.",
        e: "dōu का मतलब 'सब, पूरी तरह' है — fán-nǎo dōu wàng-diào 'सारी चिंताएँ भूल जाओ'।"
      },
      ta: {
        s: "உன்னைப் பார்த்ததும் கவலைகள் அனைத்தும் மறந்துவிடுகின்றன.",
        r: "uṉṉaip pārttatum kavalaikaḷ aṉaittum maṟantuviṭukiṉṟaṉa.",
        e: "dōu என்றால் 'அனைத்தும்' — fán-nǎo dōu wàng-diào என்றால் 'கவலைகள் அனைத்தையும் மற'."
      },
      th: {
        s: "เห็นเธอแล้วลืมความกังวลทั้งหมดไป",
        r: "hen thoe laeo luem khwam kang won thang mot pai",
        e: "dōu แปลว่า ทั้งหมด — fán-nǎo dōu wàng-diào คือ 'ลืมความกังวลทั้งหมด'"
      },
      km: {
        s: "ដូចផ្កានៅរដូវផ្ការីក",
        r: "douch pʰkaa nɨw rədow-pʰkaa-riik",
        e: "គឺស្រស់ស្អាតដូចផ្ការដូវផ្ការីក។"
      },
      vi: {
        s: "Như hoa mùa xuân",
        r: "",
        e: "là đẹp như hoa mùa xuân."
      },
      id: {
        s: "Seperti bunga di musim semi",
        r: "",
        e: "artinya indah seperti bunga musim semi."
      },
      ne: {
        s: "वसन्तको फूलजस्तै",
        r: "vasantako phūlajastai",
        e: "भनेको वसन्तको फूलजस्तो सुन्दर हो।"
      },
      bn: {
        s: "বসন্তের ফুলের মতো",
        r: "basanter phuler mato",
        e: "হাসিকে বসন্তের ফুলের মতো প্রাণবন্ত সুন্দর বলা হয়েছে।"
      },
      es: {
        s: "Como las flores de primavera",
        r: "",
        e: "La sonrisa es tan viva y bella como las flores de primavera."
      },
      en: {
        s: "Seeing you, I forget all my worries.",
        r: "",
        e: "dou means 'all, completely' — fan-nao dou wang-diao is 'forget all worries entirely'."
      },
      de: {
        s: "Wie die Blumen im Frühling",
        r: "",
        e: "Das Lächeln ist so lebendig und schön wie Frühlingsblumen."
      },
      my: {
        s: "နွေဦးပန်းတွေလိုပဲ",
        r: "nway-oo-pan-dwei-lo-be",
        e: "အပြုံးက နွေဦးပန်းတွေလို အသက်ဝင်လှပတယ်။"
      },
      ko: {
        s: "봄꽃처럼",
        r: "Bomkkotcheoreom",
        e: "는 봄꽃처럼이라는 뜻이다."
      },
      ja: {
        s: "春の花のように",
        r: "Haru no hana no yō ni",
        e: "春の花のようにという意味である。"
      },
      si: {
        s: "වසන්ත මල් වගේ",
        r: "Vasant mal vage",
        e: "යනු වසන්ත මල් වගේ යන්නයි."
      },
      fa: {
        s: "مثل گل‌های بهاری",
        r: "Mesl-e gol-hâ-ye bahâri",
        e: "یعنی مثل گل‌های بهاری."
      }
    },
    {
      hi: {
        s: "रात के आसमान का सबसे सुंदर बादल बनना चाहता हूँ,",
        r: "rāt ke āsmān kā sabse sundar bādal bannā chāhtā hūṅ,",
        e: "xiǎng का मतलब 'चाहना' है；zuò का मतलब 'बनना' है；yún-duo का मतलब 'बादल' है।"
      },
      ta: {
        s: "இரவு வானின் மிக அழகான மேகமாக ஆக விரும்புகிறேன்,",
        r: "iravu vāṉiṉ mika aḻakāṉa mēkamāka āka virumpukiṟēṉ,",
        e: "xiǎng என்றால் 'விரும்பு'; zuò என்றால் 'ஆகு'; yún-duo என்றால் 'மேகம்'."
      },
      th: {
        s: "อยากเป็นเมฆที่สวยที่สุดบนท้องฟ้ายามค่ำคืน",
        r: "yak pen mek thi suai thi sut bon thong fa yam kham khuen",
        e: "xiǎng แปลว่า อยาก; zuò แปลว่า เป็น; yún-duo แปลว่า เมฆ"
      },
      km: {
        s: "យកកង្វល់ទាំងអស់ ភាពព្រួយបារម្ភទាំងអស់",
        r: "yɔɔk kɑngvɔl teaŋ-ʔɑh, pʰiep-pruəy-baarɔm teaŋ-ʔɑh",
        e: "គឺកង្វល់និងការព្រួយបារម្ភទាំងអស់។"
      },
      vi: {
        s: "Mang mọi phiền não mọi ưu sầu",
        r: "",
        e: "là mọi phiền não ưu sầu."
      },
      id: {
        s: "Membawa semua kegelisahan semua kesedihan",
        r: "",
        e: "artinya semua kegelisahan dan kesedihan."
      },
      ne: {
        s: "सबै चिन्ता सबै दुःख",
        r: "sabai chintā sabai duḥkha",
        e: "भनेको सबै चिन्ता र दुःख हो।"
      },
      bn: {
        s: "সব দুশ্চিন্তা, সব মনখারাপ",
        r: "sab duścintā, sab mankhārāp",
        e: "দুশ্চিন্তা ও মনখারাপ — মনের সব ভার।"
      },
      es: {
        s: "Todas las preocupaciones, todas las tristezas",
        r: "",
        e: "Preocupaciones y tristezas: todo el peso del corazón."
      },
      en: {
        s: "I want to become the most beautiful cloud in the night sky,",
        r: "",
        e: "xiang means 'to want'; zuo means 'to become'; yun-duo means 'cloud'."
      },
      de: {
        s: "All die Sorgen, all der Kummer",
        r: "",
        e: "Sorgen und Kummer: die ganze Last des Herzens."
      },
      my: {
        s: "စိုးရိမ်ပူပန်မှုအားလုံး၊ ဝမ်းနည်းမှုအားလုံး",
        r: "so-yain-pu-pan-hmu-a-lon, wan-nyi-hmu-a-lon",
        e: "စိုးရိမ်ပူပန်မှုနဲ့ ဝမ်းနည်းမှု — စိတ်နှလုံးရဲ့ဝန်ထုပ်အားလုံး။"
      },
      ko: {
        s: "모든 번뇌와 모든 근심을",
        r: "Modeun beonnoewa modeun geunsimeul",
        e: "는 모든 번뇌를이라는 뜻이다; 는 모든 근심이라는 뜻이다."
      },
      ja: {
        s: "すべての悩みとすべての憂いを",
        r: "Subete no nayami to subete no urei o",
        e: "すべての悩みをという意味である; すべての憂いという意味である。"
      },
      si: {
        s: "සියලු කරදර සියලු දුක්",
        r: "Siyalu karadara siyalu duk",
        e: "යනු සියලු කරදර යන්නයි; යනු සියලු දුක් යන්නයි."
      },
      fa: {
        s: "همه نگرانی‌ها و همه غم‌ها را",
        r: "Hame negarâni-hâ o hame gham-hâ râ",
        e: "یعنی همه نگرانی‌ها؛ یعنی همه غم‌ها."
      }
    },
    {
      hi: {
        s: "तुम्हारे साथ आसमान में चमकना,",
        r: "tumhāre sāth āsmān meṁ chamaknā,",
        e: "péi का मतलब 'साथ देना' है；nǐ का मतलब 'तुम'；shǎn-shuò का मतलब 'चमकना' है।"
      },
      ta: {
        s: "உன்னுடன் வானில் மின்னுவது,",
        r: "uṉṉuṭaṉ vāṉil miṉṉuvatu,",
        e: "péi என்றால் 'உடன் இரு'; nǐ என்றால் 'நீ'; shǎn-shuò என்றால் 'மின்னு'."
      },
      th: {
        s: "ส่องแสงบนท้องฟ้าเคียงข้างเธอ",
        r: "song saeng bon thong fa khiang khang thoe",
        e: "péi แปลว่า อยู่เป็นเพื่อน; nǐ แปลว่า เธอ; shǎn-shuò แปลว่า ส่องประกาย"
      },
      km: {
        s: "បក់បោកឲ្យបាត់អស់",
        r: "bɑk-book ʔaoy bɑt ʔɑh",
        e: "គឺបក់ឲ្យបាត់អស់ទាំងអស់។"
      },
      vi: {
        s: "Thổi bay đi hết",
        r: "",
        e: "là thổi bay đi hết."
      },
      id: {
        s: "Ditiup hilang semuanya",
        r: "",
        e: "artinya ditiup hilang semuanya."
      },
      ne: {
        s: "सबै उडाएर लगिन्छ",
        r: "sabai uḍāera laginchha",
        e: "भनेको सबै उडाएर लैजानु हो।"
      },
      bn: {
        s: "সব উড়িয়ে নিয়ে যাক",
        r: "sab uṛiye niye yāk",
        e: "বাতাসে উড়িয়ে দেওয়ার মতো — হাসিতে সব দুঃখ দূর হয়ে যায়।"
      },
      es: {
        s: "Que el viento se las lleve todas",
        r: "",
        e: "Como llevárselo el viento: la sonrisa disipa toda tristeza."
      },
      en: {
        s: "Shining in the sky beside you,",
        r: "",
        e: "pei means 'to accompany'; ni means 'you'; shan-shuo means 'to twinkle, shine'."
      },
      de: {
        s: "Der Wind weht sie alle fort",
        r: "",
        e: "Wie vom Wind fortgetragen: das Lächeln vertreibt allen Kummer."
      },
      my: {
        s: "အားလုံးကို လေတိုက်ပြီး လွင့်သွားပါစေ",
        r: "a-lon-ko lei-tike-hpi lwin-thwa-pa-sei",
        e: "လေနဲ့လွင့်သွားသလို — အပြုံးက ဝမ်းနည်းမှုအားလုံးကို ဖယ်ရှားပေးတယ်။"
      },
      ko: {
        s: "모두 날려버려",
        r: "Modu nallyeobeoryeo",
        e: "는 모두라는 뜻이다; 는 날려버린다는 뜻이다."
      },
      ja: {
        s: "すっかり吹き飛ばして",
        r: "Sukkari fukitobashite",
        e: "すべてという意味である; 吹き飛ばすという意味である。"
      },
      si: {
        s: "සේරම පිඹලා දානවා",
        r: "Serama pimbala danava",
        e: "යනු සේරම යන්නයි; යනු පිඹලා දානවා යන්නයි."
      },
      fa: {
        s: "همه را می‌پراکند",
        r: "Hame râ mi-parâkand",
        e: "یعنی همه؛ یعنی پراکندن."
      }
    },
    {
      hi: {
        s: "तुम्हारी आँखों में बसना चाहता हूँ।",
        r: "tumhārī āṅkhoṅ meṁ basnā chāhtā hūṅ.",
        e: "zhù का मतलब 'रहना' है；jìn का मतलब 'अंदर' है — zhù-jìn 'अंदर बस जाना'।"
      },
      ta: {
        s: "உன் கண்களுக்குள் வாழ விரும்புகிறேன்.",
        r: "uṉ kaṇkaḷukkuḷ vāḻa virumpukiṟēṉ.",
        e: "zhù என்றால் 'வாழ்'; jìn என்றால் 'உள்ளே' — zhù-jìn என்றால் 'உள்ளே குடியேறு'."
      },
      th: {
        s: "อยากอาศัยอยู่ในดวงตาของเธอ",
        r: "yak a sai yu nai duang ta khong thoe",
        e: "zhù แปลว่า อาศัย; jìn แปลว่า เข้าไปข้างใน — zhù-jìn คือ 'เข้าไปอยู่ข้างใน'"
      },
      km: {
        s: "ដូចពន្លឺព្រះអាទិត្យរដូវក្តៅ",
        r: "douch pʊnləə preah-ʔaatɨt rədow-kdaw",
        e: "គឺកក់ក្តៅដូចពន្លឺព្រះអាទិត្យរដូវក្តៅ។"
      },
      vi: {
        s: "Như ánh nắng mùa hè",
        r: "",
        e: "là ấm áp như nắng hè."
      },
      id: {
        s: "Seperti sinar matahari musim panas",
        r: "",
        e: "artinya hangat seperti matahari musim panas."
      },
      ne: {
        s: "गर्मीको घामजस्तै",
        r: "garmīko ghāmajastai",
        e: "भनेको गर्मीको घामजस्तो न्यानो हो।"
      },
      bn: {
        s: "গ্রীষ্মের রোদের মতো",
        r: "grīṣmer roder mato",
        e: "হাসিকে গ্রীষ্মের উজ্জ্বল রোদের মতো উষ্ণ ও উজ্জ্বল বলা হয়েছে।"
      },
      es: {
        s: "Como el sol del verano",
        r: "",
        e: "La sonrisa es cálida y radiante como el sol del verano."
      },
      en: {
        s: "I want to live inside your eyes.",
        r: "",
        e: "zhu means 'to live, dwell'; jin means 'into' — zhu-jin is 'to settle inside'."
      },
      de: {
        s: "Wie die Sommersonne",
        r: "",
        e: "Das Lächeln ist warm und strahlend wie die Sommersonne."
      },
      my: {
        s: "နွေရာသီနေရောင်လိုပဲ",
        r: "nway-ya-thi-nay-yaung-lo-be",
        e: "အပြုံးက နွေရာသီနေရောင်လို နွေးထွေးတောက်ပတယ်။"
      },
      ko: {
        s: "여름 햇살처럼",
        r: "Yeoreum haetsalcheoreom",
        e: "는 여름 햇살처럼이라는 뜻이다."
      },
      ja: {
        s: "夏の日差しのように",
        r: "Natsu no hizashi no yō ni",
        e: "夏の日差しのようにという意味である。"
      },
      si: {
        s: "ගිම්හාන හිරු එළිය වගේ",
        r: "Gimhana hiru eliya vage",
        e: "යනු ගිම්හාන හිරු එළිය වගේ යන්නයි."
      },
      fa: {
        s: "مثل آفتاب تابستان",
        r: "Mesl-e âftâb-e tâbestân",
        e: "یعنی مثل آفتاب تابستان."
      }
    },
    {
      hi: {
        s: "तुम्हारी मुस्कान सच में बहुत सुंदर है,",
        r: "tumhārī muskān sach meṁ bahut sundar hai,",
        e: "yǎn-jīng का मतलब 'आँखें' है — आँखों में बसना गहरे प्यार को दर्शाता है।"
      },
      ta: {
        s: "உன் சிரி�்ப்பு உண்மையிலேயே மிக அழகு,",
        r: "uṉ cirippu uṇmaiyilēyē mika aḻaku,",
        e: "yǎn-jīng என்றால் 'கண்கள்' — கண்களில் வாழ்வது ஆழ்ந்த காதலின் கவிதை உருவகம்."
      },
      th: {
        s: "รอยยิ้มของเธองดงามจริง ๆ",
        r: "roi yim khong thoe ngot ngam ching ching",
        e: "yǎn-jīng แปลว่า ดวงตา — การอาศัยในดวงตาเป็นภาพกวีของความรักลึกซึ้ง"
      },
      km: {
        s: "ពិភពលោកទាំងមូល ពេលវេលាទាំងអស់",
        r: "piipup-look teaŋ-muəl, peel-viee lea teaŋ-ʔɑh",
        e: "គឺពិភពលោកនិងពេលវេលាទាំងអស់។"
      },
      vi: {
        s: "Cả thế giới, mọi thời gian",
        r: "",
        e: "là cả thế giới và mọi thời gian."
      },
      id: {
        s: "Seluruh dunia, seluruh waktu",
        r: "",
        e: "artinya seluruh dunia dan seluruh waktu."
      },
      ne: {
        s: "सम्पूर्ण संसार, सम्पूर्ण समय",
        r: "sampūrṇa sansār, sampūrṇa samaya",
        e: "भनेको सम्पूर्ण संसार र समय हो।"
      },
      bn: {
        s: "সারা পৃথিবী, সমস্ত সময়",
        r: "sārā pṛthibī, samasta samaẏ",
        e: "সারা পৃথিবী ও সমস্ত সময় — হাসি সবকিছুকে সুন্দর করে তোলে।"
      },
      es: {
        s: "El mundo entero, todo el tiempo",
        r: "",
        e: "El mundo entero y todo el tiempo: la sonrisa lo embellece todo."
      },
      en: {
        s: "Your smile is truly so beautiful,",
        r: "",
        e: "yan-jing means 'eyes' — living in someone's eyes is a poetic image of deep love."
      },
      de: {
        s: "Die ganze Welt, die ganze Zeit",
        r: "",
        e: "Die ganze Welt und die ganze Zeit: das Lächeln verschönert alles."
      },
      my: {
        s: "ကမ္ဘာတစ်ခုလုံး၊ အချိန်အားလုံး",
        r: "kan-bha-ta-khu-lon, a-chain-a-lon",
        e: "ကမ္ဘာတစ်ခုလုံးနဲ့ အချိန်အားလုံး — အပြုံးက အရာရာကို လှပစေတယ်။"
      },
      ko: {
        s: "온 세상 모든 시간을",
        r: "On sesang modeun siganeul",
        e: "는 온 세상이라는 뜻이다; 는 모든 시간이라는 뜻이다."
      },
      ja: {
        s: "世界中のすべての時間を",
        r: "Sekaijū no subete no jikan o",
        e: "世界中という意味である; すべての時間という意味である。"
      },
      si: {
        s: "මුළු ලෝකයේම සියලු කාලය",
        r: "Mulu lokayama siyalu kalaya",
        e: "යනු මුළු ලෝකයම යන්නයි; යනු සියලු කාලය යන්නයි."
      },
      fa: {
        s: "تمام جهان و همه زمان را",
        r: "Tamâm-e jahân o hame zamân râ",
        e: "یعنی تمام جهان؛ یعنی همه زمان."
      }
    },
    {
      hi: {
        s: "फूलों की तरह वसंत की हवा में खिलती हुई।",
        r: "phūloṅ kī tarah vasant kī havā meṁ khiltī huī.",
        e: "chūn-fēng का मतलब 'वसंत की हवा' है；lǐ का मतलब 'में' है — chūn-fēng-lǐ 'वसंत की हवा में'।"
      },
      ta: {
        s: "வசந்தக் காற்றில் மலர்களைப் போல மலர்ந்து.",
        r: "vacantak kāṟṟil malarkaḷaip pōla malarntu.",
        e: "chūn-fēng என்றால் 'வசந்தக் காற்று'; lǐ என்றால் 'இல்' — chūn-fēng-lǐ 'வசந்தக் காற்றில்'."
      },
      th: {
        s: "บานเหมือนดอกไม้ในสายลมฤดูใบไม้ผลิ",
        r: "ban muean dok mai nai sai lom rue du bai mai phli",
        e: "chūn-fēng แปลว่า สายลมฤดูใบไม้ผลิ; lǐ แปลว่า ใน — chūn-fēng-lǐ คือ 'ในสายลมฤดูใบไม้ผลิ'"
      },
      km: {
        s: "ស្រស់ស្អាតដូចផ្ទាំងគំនូរ",
        r: "srɑh-saat douch pʰtaŋ-kumnoo",
        e: "គឺស្រស់ស្អាតដូចគំនូរ។"
      },
      vi: {
        s: "Đẹp như bức tranh",
        r: "",
        e: "là đẹp như tranh vẽ."
      },
      id: {
        s: "Indah bagaikan lukisan",
        r: "",
        e: "artinya indah bagaikan lukisan."
      },
      ne: {
        s: "चित्रजस्तो सुन्दर",
        r: "chitrajasto sundar",
        e: "भनेको चित्रजस्तो सुन्दर हो।"
      },
      bn: {
        s: "ছবির মতো সুন্দর",
        r: "chabir mato sundar",
        e: "লম্বা চিত্রপটের মতো সুন্দর — যেন আঁকা ছবি।"
      },
      es: {
        s: "Hermoso como una pintura",
        r: "",
        e: "Bello como un rollo de pintura: como una obra de arte."
      },
      en: {
        s: "Blooming like flowers in the spring breeze.",
        r: "",
        e: "chun-feng means 'spring breeze'; li means 'in' — chun-feng-li is 'in the spring breeze'."
      },
      de: {
        s: "Schön wie ein Gemälde",
        r: "",
        e: "Schön wie eine Bildrolle: wie gemalt."
      },
      my: {
        s: "ပန်းချီကားလိုလှတယ်",
        r: "pan-chi-ka-lo-hla-dei",
        e: "ပန်းချီလိပ်လို လှပတယ် — ပန်းချီကားတစ်ချပ်လို။"
      },
      ko: {
        s: "그림 두루마리처럼 아름다워",
        r: "Geurim durumaricheoreom areumdawo",
        e: "는 그림 두루마리처럼 아름답다는 비유이다."
      },
      ja: {
        s: "絵巻物のように美しい",
        r: "Emakimono no yō ni utsukushii",
        e: "絵巻物のように美しいというたとえである。"
      },
      si: {
        s: "සිතුවම් පොතක් වගේ ලස්සනයි",
        r: "Situvam potak vage lassanayi",
        e: "යනු සිතුවම් පොතක් වගේ ලස්සනයි යන උපමාවයි."
      },
      fa: {
        s: "زیباست مثل طومار نقاشی",
        r: "Zibâst mesl-e toumâr-e naqqâshi",
        e: "تشبیه به زیبایی طومار نقاشی است."
      }
    }
  ],
  tingwoshuo: [
    {
      hi: {
        s: "छोटे-छोटे कंधे, पर बड़ी-बड़ी ज़िम्मेदारियाँ हैं,",
        r: "chhoṭe-chhoṭe kandhe, par baṛī-baṛī zimmedāriyāṅ haiṁ,",
        e: "xiǎo-xiǎo का मतलब 'छोटे-छोटे' है；jiān-bǎng का मतलब 'कंधे' है；dàn का प्रयोग कर्तव्य बताता है।"
      },
      ta: {
        s: "சிறு சிறு தோள்கள், ஆனால் பெரும் பொறுப்புகள்,",
        r: "ciṟu ciṟu tōḷkaḷ, āṉāl perum poṟuppukaḷ,",
        e: "xiǎo-xiǎo என்றால் 'சிறிய'; jiān-bǎng என்றால் 'தோள்கள்'; dàn இங்கே கடமையைக் குறிக்கிறது."
      },
      th: {
        s: "ไหล่เล็ก ๆ แต่แบกความรับผิดชอบใหญ่หลวง",
        r: "lai lek lek tae baek khwam rap phit chop yai luang",
        e: "xiǎo-xiǎo แปลว่า เล็ก ๆ; jiān-bǎng แปลว่า ไหล่; dàn ตรงนี้แสดงถึงหน้าที่"
      },
      km: {
        s: "ជូនអ្នកបេះដូងតូច",
        r: "cuun neak beh-doung touc",
        e: "គឺជូនបេះដូង (សេចក្តីស្រឡាញ់) ដល់អ្នក។"
      },
      vi: {
        s: "Tặng bạn trái tim nhỏ",
        r: "",
        e: "là tặng trái tim (tình yêu) cho bạn."
      },
      id: {
        s: "Kuberikan padamu hati kecil",
        r: "",
        e: "artinya memberikan hati (cinta) padamu."
      },
      ne: {
        s: "तिमीलाई सानो मुटु दिन्छु",
        r: "timīlāī sāno muṭu dinchhu",
        e: "भनेको तिमीलाई (मायाको) मुटु दिनु हो।"
      },
      bn: {
        s: "তোমাকে দিলাম ছোট্ট হৃদয়",
        r: "tomāke dilām choṭṭa hṛdaẏ",
        e: "ছোট্ট হৃদয় — ভালোবাসার প্রতীক, উপহার হিসেবে দেওয়া।"
      },
      es: {
        s: "Te regalo un corazoncito",
        r: "",
        e: "Un pequeño corazón: símbolo de amor que se regala."
      },
      en: {
        s: "Small, small shoulders, yet carrying big responsibilities,",
        r: "",
        e: "xiao-xiao means 'tiny'; jian-bang means 'shoulders'; dan here expresses duty."
      },
      de: {
        s: "Ich schenke dir ein kleines Herz",
        r: "",
        e: "Ein kleines Herz: ein Liebessymbol als Geschenk."
      },
      my: {
        s: "မင်းကို နှလုံးသားသေးသေးလေး လက်ဆောင်ပေးတယ်",
        r: "min-ko hna-lon-tha-thay-thay-lay let-saung-pay-dei",
        e: "နှလုံးသားအသေး — အချစ်ရဲ့သင်္ကေတ၊ လက်ဆောင်အဖြစ် ပေးတာ။"
      },
      ko: {
        s: "너에게 작은 하트를 보낼게",
        r: "Neoege jageun hateureul bonaelge",
        e: "는 너에게 준다는 뜻이다; 는 작은 하트이다."
      },
      ja: {
        s: "君に小さなハートを贈るよ",
        r: "Kimi ni chiisana hāto o okuru yo",
        e: "君に贈るという意味である; 小さなハートである。"
      },
      si: {
        s: "ඔයාට පොඩි හදවතක් දෙනවා",
        r: "Oyata podi hadavatak denava",
        e: "යනු ඔයාට දෙනවා යන්නයි; යනු පොඩි හදවතකි."
      },
      fa: {
        s: "قلب کوچکی به تو هدیه می‌دهم",
        r: "Qalb-e kouchaki be tou hadiye mi-daham",
        e: "یعنی به تو هدیه دادن؛ یعنی قلب کوچک."
      }
    },
    {
      hi: {
        s: "हर रोज़ जागो, अपनी मंज़िल की ओर बढ़ो,",
        r: "har roz jāgo, apnī manzil kī or baṛho,",
        e: "měi-tiān का मतलब 'हर दिन' है；qǐ-chuáng का मतलब 'जागना, बिस्तर से उठना' है।"
      },
      ta: {
        s: "ஒவ்வொரு நாளும் எழுந்து, கனவுகளை நோக்கி நட,",
        r: "ovvoru nāḷum eḻuntu, kaṉavukaḷai nōkki naṭa,",
        e: "měi-tiān என்றால் 'ஒவ்வொரு நாளும்'; qǐ-chuáng என்றால் 'எழு, படுக்கையை விட்டு எழு'."
      },
      th: {
        s: "ทุกวันตื่นขึ้นมา เดินไปตามความฝัน",
        r: "thuk wan tuen khuen ma doen pai tam khwam fan",
        e: "měi-tiān แปลว่า ทุกวัน; qǐ-chuáng แปลว่า ตื่นนอน ลุกจากเตียง"
      },
      km: {
        s: "ជូនអ្នកផ្កាមួយទង",
        r: "cuun neak pʰkaa muəy tʊəng",
        e: "គឺជូនផ្កាមួយទងដល់អ្នក។"
      },
      vi: {
        s: "Tặng bạn một đóa hoa",
        r: "",
        e: "là tặng bạn một đóa hoa."
      },
      id: {
        s: "Kuberikan padamu sekuntum bunga",
        r: "",
        e: "artinya memberikan sekuntum bunga padamu."
      },
      ne: {
        s: "तिमीलाई एउटा फूल दिन्छु",
        r: "timīlāī euṭā phūl dinchhu",
        e: "भनेको तिमीलाई एउटा फूल दिनु हो।"
      },
      bn: {
        s: "তোমাকে দিলাম একটি ফুল",
        r: "tomāke dilām ekṭi phul",
        e: "কৃতজ্ঞতার উপহার হিসেবে একটি ফুল।"
      },
      es: {
        s: "Te regalo una flor",
        r: "",
        e: "Una flor como regalo de agradecimiento."
      },
      en: {
        s: "Every day wake up and walk toward your dreams,",
        r: "",
        e: "mei-tian means 'every day'; qi-chuang means 'to wake up, get out of bed'."
      },
      de: {
        s: "Ich schenke dir eine Blume",
        r: "",
        e: "Eine Blume als Dankesgeschenk."
      },
      my: {
        s: "မင်းကို ပန်းတစ်ပွင့် လက်ဆောင်ပေးတယ်",
        r: "min-ko pan-ta-pwin let-saung-pay-dei",
        e: "ကျေးဇူးတင်တဲ့အထိမ်းအမှတ်အဖြစ် ပန်းတစ်ပွင့်။"
      },
      ko: {
        s: "너에게 꽃 한 송이를 보낼게",
        r: "Neoege kkot han songireul bonaelge",
        e: "는 너에게 꽃 한 송이를 준다는 뜻이다."
      },
      ja: {
        s: "君に花を一輪贈るよ",
        r: "Kimi ni hana o ichirin okuru yo",
        e: "君に花を一輪贈るという意味である。"
      },
      si: {
        s: "ඔයාට මලක් දෙනවා",
        r: "Oyata malak denava",
        e: "යනු ඔයාට මලක් දෙනවා යන්නයි."
      },
      fa: {
        s: "گلی به تو هدیه می‌دهم",
        r: "Goli be tou hadiye mi-daham",
        e: "یعنی گلی به تو هدیه دادن."
      }
    },
    {
      hi: {
        s: "सुनो मैं कहता हूँ — धन्यवाद तुम्हें,",
        r: "suno maiṁ kahtā hūṅ — dhanyavād tumheṁ,",
        e: "tīng का मतलब 'सुनो' है；wǒ-shuō का मतलब 'मैं कहता हूँ' है；xiè-xie-nǐ 'तुम्हें धन्यवाद'।"
      },
      ta: {
        s: "நான் சொல்வதைக் கேள் — உனக்கு நன்றி,",
        r: "nāṉ colvataik kēḷ — uṉakku naṉṟi,",
        e: "tīng என்றால் 'கேள்'; wǒ-shuō என்றால் 'நான் சொல்கிறேன்'; xiè-xie-nǐ 'உனக்கு நன்றி'."
      },
      th: {
        s: "ฟังฉันพูดนะ — ขอบคุณเธอ",
        r: "fang chan phut na — khop khun thoe",
        e: "tīng แปลว่า ฟัง; wǒ-shuō แปลว่า ฉันพูด; xiè-xie-nǐ คือ 'ขอบคุณ'"
      },
      km: {
        s: "អ្នកនៅក្នុងជីវិតខ្ញុំ, ធ្វើឲ្យខ្ញុំរំភើបចិត្តខ្លាំងណាស់",
        r: "neak knong ciivɨt kʰɲom, tvəə ʔaoy kʰɲom rʊmpʰəəb-cət kʰleaŋ naah",
        e: "គឺអ្នកនៅក្នុងជីវិតខ្ញុំ; គឺធ្វើឲ្យរំភើបចិត្តខ្លាំង។"
      },
      vi: {
        s: "Bạn trong cuộc đời tôi, quá nhiều cảm động",
        r: "",
        e: "là bạn trong đời tôi; là rất nhiều cảm động."
      },
      id: {
        s: "Kamu dalam hidupku, begitu banyak haru",
        r: "",
        e: "artinya kamu dalam hidupku; artinya begitu banyak haru."
      },
      ne: {
        s: "तिमी मेरो जीवनमा, धेरै भावुकता",
        r: "timī mero jīvanmā, dherai bhāvukatā",
        e: "भनेको तिमी मेरो जीवनमा हुनु; भनेको धेरै भावुक हुनु हो।"
      },
      bn: {
        s: "আমার জীবনে তুমি, এত স্পর্শকাতর মুহূর্ত",
        r: "āmār jībane tumi, eta sparśakātar muhūrta",
        e: "হৃদয়স্পর্শী অনুভূতি — প্রিয়জন জীবনে অনেক আবেগঘন মুহূর্ত দিয়েছে।"
      },
      es: {
        s: "En mi vida, tú me has conmovido tanto",
        r: "",
        e: "Sentimiento que conmueve el corazón: la persona amada ha dado muchos momentos emotivos."
      },
      en: {
        s: "Listen to what I say — thank you,",
        r: "",
        e: "ting means 'listen'; wo-shuo means 'I say'; xie-xie-ni is 'thank you'."
      },
      de: {
        s: "In meinem Leben hast du mich so oft berührt",
        r: "",
        e: "Herzberührendes Gefühl: der geliebte Mensch hat viele bewegende Momente geschenkt."
      },
      my: {
        s: "ငါ့ဘဝမှာ မင်းက ငါ့ကို အရမ်းထိခိုက်စေခဲ့တယ်",
        r: "nga-ba-wa-hma min-ka nga-ko a-yan-hti-khite-se-khe-dei",
        e: "နှလုံးသားကိုထိခိုက်တဲ့ခံစားချက် — ချစ်ရသူက ဘဝမှာ စိတ်လှုပ်ရှားဖွယ်အခိုက်အတန့်များစွာ ပေးခဲ့တယ်။"
      },
      ko: {
        s: "너는 내 삶에 너무 많은 감동을 주었어",
        r: "Neoneun nae salme neomu maneun gamdongeul jueosseo",
        e: "는 너는 내 삶에라는 뜻이다; 는 너무 많은 감동이라는 뜻이다."
      },
      ja: {
        s: "君は私の人生に、あまりにも多くの感動をくれた",
        r: "Kimi wa watashi no jinsei ni, amarini mo ōku no kandō o kureta",
        e: "君は私の人生にという意味である; あまりにも多くの感動という意味である。"
      },
      si: {
        s: "ඔයා මගේ ජීවිතේට ගොඩක් සංවේදී අවස්ථා දුන්නා",
        r: "Oya mage jivite godak sanvedi avastha dunna",
        e: "යනු ඔයා මගේ ජීවිතේට යන්නයි; යනු ගොඩක් සංවේදී අවස්ථා යන්නයි."
      },
      fa: {
        s: "تو در زندگی من، لحظه‌های تأثیرگذار بسیاری بودی",
        r: "Tou dar zendegi-ye man, lahze-hâ-ye ta'sirgozâr-e besyâri boudi",
        e: "یعنی تو در زندگی من؛ یعنی لحظه‌های تأثیرگذار بسیار."
      }
    },
    {
      hi: {
        s: "तुम्हारे साथ होने से, यह दुनिया और खूबसूरत है।",
        r: "tumhāre sāth hone se, yah duniyā aur khūbsūrat hai.",
        e: "yīn-wèi का मतलब 'क्योंकि' है；yǒu-nǐ का मतलब 'तुम्हारे होने से' है।"
      },
      ta: {
        s: "உன்னால் இந்த உலகம் மேலும் அழகாகிறது.",
        r: "uṉṉāl inta ulakam mēlum aḻakākiṟatu.",
        e: "yīn-wèi என்றால் 'ஏனெனில்'; yǒu-nǐ என்றால் 'உன்னால்'."
      },
      th: {
        s: "เพราะมีเธอ โลกนี้จึงสวยงามยิ่งขึ้น",
        r: "phro mi thoe lok ni chueng suai ngam ying khuen",
        e: "yīn-wèi แปลว่า เพราะว่า; yǒu-nǐ แปลว่า เพราะมีเธอ"
      },
      km: {
        s: "អ្នកជាទេវតារបស់ខ្ញុំ, នាំផ្លូវខ្ញុំគ្រប់ពេល",
        r: "neak cie tee-vɔɔtaa rɔbɑh kʰɲom, nɔɔm pʰlow kʰɲom krup peel",
        e: "គឺអ្នកដូចទេវតា; គឺនាំផ្លូវខ្ញុំជានិច្ច។"
      },
      vi: {
        s: "Bạn là thiên thần của tôi, dẫn dắt tôi suốt đường",
        r: "",
        e: "là bạn như thiên thần; là dẫn dắt tôi suốt."
      },
      id: {
        s: "Kamu malaikatku, membimbingku sepanjang jalan",
        r: "",
        e: "artinya kamu bagaikan malaikat; artinya membimbingku sepanjang jalan."
      },
      ne: {
        s: "तिमी मेरो देवदूत हौ, सधैँ मलाई बाटो देखाउँछौ",
        r: "timī mero devadūt hau, sadhaĩ malāī bāṭo dekhāũchhau",
        e: "भनेको तिमी देवदूतजस्तै; भनेको सधैँ बाटो देखाउनु हो।"
      },
      bn: {
        s: "তুমি আমার দেবদূত, সারাপথ আমাকে পথ দেখাও",
        r: "tumi āmār debdūt, sārāpath āmāke path dekhāo",
        e: "দেবদূত — প্রিয়জন যেন রক্ষাকর্তা ও পথপ্রদর্শক।"
      },
      es: {
        s: "Eres mi ángel, que me guía en el camino",
        r: "",
        e: "Ángel: la persona amada es como un protector que guía el camino."
      },
      en: {
        s: "Because of you, this world is more beautiful.",
        r: "",
        e: "yin-wei means 'because'; you-ni means 'having you, because of you'."
      },
      de: {
        s: "Du bist mein Engel, der mich auf dem Weg führt",
        r: "",
        e: "Engel: der geliebte Mensch wie ein schützender Wegweiser."
      },
      my: {
        s: "မင်းက ငါ့နတ်သမီး၊ လမ်းတစ်လျှောက် ငါ့ကို လမ်းညွှန်ပေးတယ်",
        r: "min-ka nga-nat-tha-mi, lan-ta-hlyouk nga-ko lan-nyun-pay-dei",
        e: "ကောင်းကင်တမန် — ချစ်ရသူက အကာအကွယ်ပေးသူနဲ့ လမ်းပြသူလို။"
      },
      ko: {
        s: "너는 나의 천사, 항상 나를 인도해줘",
        r: "Neoneun naui cheonsa, hangsang nareul indohaejwo",
        e: "는 너는 나의 천사라는 뜻이다; 는 항상 나를 인도해준다는 뜻이다."
      },
      ja: {
        s: "君は私の天使、一路私を導いてくれる",
        r: "Kimi wa watashi no tenshi, ichiro watashi o michibiite-kureru",
        e: "君は私の天使という意味である; ずっと私を導いてくれるという意味である。"
      },
      si: {
        s: "ඔයා මගේ දේවදූතයා, දිගටම මට මඟ පෙන්වනවා",
        r: "Oya mage devadutaya, digatama mata manga pennanava",
        e: "යනු ඔයා මගේ දේවදූතයා යන්නයි; යනු දිගටම මට මඟ පෙන්වනවා යන්නයි."
      },
      fa: {
        s: "تو فرشته منی، همیشه مرا راهنمایی می‌کنی",
        r: "Tou fereshte-ye mani, hamishe marâ râhnamâyi mi-koni",
        e: "یعنی تو فرشته منی؛ یعنی همیشه مرا راهنمایی کردن."
      }
    },
    {
      hi: {
        s: "मेरी आँखों में आँसू हैं, पर मैं हार नहीं मानूँगा,",
        r: "merī āṅkhoṅ meṁ āṅsū haiṁ, par maiṁ hār nahīṅ mānūṅgā,",
        e: "yǎn-lèi का मतलब 'आँसू' है；dàn-shì का मतलब 'लेकिन' है — विरोध बताता है।"
      },
      ta: {
        s: "என் கண்களில் கண்ணீர் உள்ளது, ஆனால் நான் விடமாட்டேன்,",
        r: "eṉ kaṇkaḷil kaṇṇīr uḷḷatu, āṉāl nāṉ viṭamāṭṭēṉ,",
        e: "yǎn-lèi என்றால் 'கண்ணீர்'; dàn-shì என்றால் 'ஆனால்' — முரண்பாட்டைக் காட்டும்."
      },
      th: {
        s: "ในดวงตามีน้ำตา แต่ฉันจะไม่ยอมแพ้",
        r: "nai duang ta mi nam ta tae chan cha mai yom phae",
        e: "yǎn-lèi แปลว่า น้ำตา; dàn-shì แปลว่า แต่ — แสดงความขัดแย้ง"
      },
      km: {
        s: "មិនថាពេលវេលាប្រែប្រួលយ៉ាងណា, ស្រឡាញ់អ្នកច្រៀងជាចម្រៀង",
        r: "mɨn tʰaa peel-viee lea prae-pruəl yɨəŋ-naa, srɑlaɲ neak cries cie cɑmrieŋ",
        e: "គឺមិនថាពេលវេលាប្រែយ៉ាងណា; គឺច្រៀងពីសេចក្តីស្រឡាញ់។"
      },
      vi: {
        s: "Dù năm tháng đổi thay, yêu bạn hát thành ca",
        r: "",
        e: "là dù thời gian đổi thay; là hát về tình yêu."
      },
      id: {
        s: "Tak peduli waktu berubah, cinta padamu kunyanyikan",
        r: "",
        e: "artinya tak peduli waktu berubah; artinya menyanyikan cinta."
      },
      ne: {
        s: "समय जसरी बद्लिए पनि, तिमीलाई माया गीतमा गाउँछु",
        r: "samaya jasarī badlie pani, timīlāī māyā gītmā gāũchhu",
        e: "भनेको समय जसरी बद्लिए पनि; भनेको मायालाई गीतमा गाउनु हो।"
      },
      bn: {
        s: "বছরগুলো যতই বদলাক, ভালোবাসা গান হয়ে বাজুক",
        r: "bachargulo yatai badlāk, bhālobāsā gān haẏe bājuk",
        e: "বছরগুলো বদলে গেলেও ভালোবাসা চিরন্তন — তা গানে রূপ নিয়েছে।"
      },
      es: {
        s: "Pase lo que pase con los años, mi amor por ti se hace canción",
        r: "",
        e: "Aunque pasen los años, el amor es eterno y se ha hecho canción."
      },
      en: {
        s: "There are tears in my eyes, but I won't give up,",
        r: "",
        e: "yan-lei means 'tears'; dan-shi means 'but' — it shows contrast."
      },
      de: {
        s: "Wie die Jahre sich auch wandeln, meine Liebe zu dir wird zum Lied",
        r: "",
        e: "Auch wenn die Jahre vergehen, bleibt die Liebe ewig und ist zum Lied geworden."
      },
      my: {
        s: "နှစ်တွေဘယ်လိုပြောင်းလဲလဲ၊ မင်းကိုချစ်တာကို သီချင်းအဖြစ် သီဆိုမယ်",
        r: "hnit-dwei-bei-lo-pyaung-le-le, min-ko-chit-ta-ko thi-chin-a-hpyit thi-hso-mei",
        e: "နှစ်တွေပြောင်းလဲသွားလည်း အချစ်က ထာဝရဖြစ်ပြီး သီချင်းအဖြစ် ဖြစ်ပေါ်လာတယ်။"
      },
      ko: {
        s: "세월이 어떻게 변하든, 너를 향한 사랑을 노래로 부를게",
        r: "Sewori eotteoke byeonhadeun, neoreul hyanghan sarangeul noraero bureulge",
        e: "는 세월이 어떻게 변하든이라는 뜻이다; 는 너를 향한 사랑을 노래로 부른다는 뜻이다."
      },
      ja: {
        s: "歳月がどう変わろうと、君への愛を歌に歌うよ",
        r: "Saigetsu ga dō kawarō to, kimi e no ai o uta ni utau yo",
        e: "歳月がどう変わろうとという意味である; 君への愛を歌に歌うという意味である。"
      },
      si: {
        s: "කාලය කොහොම වෙනස් වුණත්, ඔයාට ඇති ආදරය ගීතයක් කරලා ගයනවා",
        r: "Kalaya kohoma venas vunat, oyata ati adaraya gitayak karala gayanava",
        e: "යනු කාලය කොහොම වෙනස් වුණත් යන්නයි; යනු ඔයාට ඇති ආදරය ගීතයක් කරලා ගයනවා යන්නයි."
      },
      fa: {
        s: "هرطور زمانه دگرگون شود، عشقم به تو را آواز می‌کنم",
        r: "Har-tour zamâne degargoun shavad, eshqam be tou râ âvâz mi-konam",
        e: "یعنی هرطور زمانه دگرگون شود؛ یعنی عشقم به تو را آواز کردن."
      }
    },
    {
      hi: {
        s: "उठो और आगे बढ़ो,",
        r: "uṭho aur āge baṛho,",
        e: "pá-qǐ-lái का मतलब 'उठ खड़ा होना' है；xiàng-qián-zǒu 'आगे बढ़ो' — प्रेरणा।"
      },
      ta: {
        s: "எழுந்து முன்னே நட,",
        r: "eḻuntu muṉṉē naṭa,",
        e: "pá-qǐ-lái என்றால் 'எழுந்து நில்'; xiàng-qián-zǒu 'முன்னே நட' — ஊக்கம்."
      },
      th: {
        s: "ลุกขึ้นแล้วเดินไปข้างหน้า",
        r: "luk khuen laeo doen pai khang na",
        e: "pá-qǐ-lái แปลว่า ลุกขึ้นยืน; xiàng-qián-zǒu คือ 'เดินไปข้างหน้า' — ให้กำลังใจ"
      },
      km: {
        s: "ស្តាប់ខ្ញុំនិយាយអរគុណអ្នក",
        r: "sdɑp kʰɲom niyiəy ʔɑkun neak",
        e: "គឺស្តាប់ខ្ញុំនិយាយអរគុណ។"
      },
      vi: {
        s: "Nghe tôi nói cảm ơn bạn",
        r: "",
        e: "là nghe tôi nói cảm ơn."
      },
      id: {
        s: "Dengarkan kukatakan terima kasih padamu",
        r: "",
        e: "artinya dengarkan kukatakan terima kasih."
      },
      ne: {
        s: "मेरो कुरा सुन, तिमीलाई धन्यवाद",
        r: "mero kurā suna, timīlāī dhanyavād",
        e: "भनेको मेरो कुरा सुन र धन्यवाद भन्नु हो।"
      },
      bn: {
        s: "শোনো, তোমাকে ধন্যবাদ",
        r: "śono, tomāke dhanyabād",
        e: "গানের মূল বাক্য — সরাসরি কৃতজ্ঞতা প্রকাশ।"
      },
      es: {
        s: "Escúchame: gracias",
        r: "",
        e: "La frase central de la canción: agradecimiento directo."
      },
      en: {
        s: "Stand up and keep walking forward,",
        r: "",
        e: "pa-qi-lai means 'to stand up'; xiang-qian-zou is 'walk forward' — encouragement."
      },
      de: {
        s: "Hör mir zu: danke dir",
        r: "",
        e: "Der Kernsatz des Lieds: direkter Dank."
      },
      my: {
        s: "ငါ့စကားနားထောင်ပါ၊ ကျေးဇူးတင်ပါတယ်",
        r: "nga-sa-ka-na-htaung-pa, kyay-zu-tin-pa-dei",
        e: "သီချင်းရဲ့အဓိကစာကြောင်း — တိုက်ရိုက်ကျေးဇူးတင်စကား။"
      },
      ko: {
        s: "내 말을 들어줘, 고마워",
        r: "Nae mareul deureojwo, gomawo",
        e: "는 내 말을 들어달라는 뜻이다; 는 고맙다는 뜻이다."
      },
      ja: {
        s: "私の言葉を聞いて、ありがとう",
        r: "Watashi no kotoba o kiite, arigatō",
        e: "私の言葉を聞いてという意味である; ありがとうという意味である。"
      },
      si: {
        s: "මගේ කතාව අහන්න, ස්තූතියි",
        r: "Mage katava ahanna, stutiyi",
        e: "යනු මගේ කතාව අහන්න යන්නයි; යනු ස්තූතියි යන්නයි."
      },
      fa: {
        s: "به حرفم گوش کن، ممنونم",
        r: "Be harfam goush kon, mamnounam",
        e: "یعنی به حرفم گوش کن؛ یعنی ممنونم."
      }
    },
    {
      hi: {
        s: "सुनो मैं कहता हूँ — धन्यवाद तुम्हें,",
        r: "suno maiṁ kahtā hūṅ — dhanyavād tumheṁ,",
        e: "gǎn-ēn का मतलब 'आभारी होना' है；yǒu-nǐ 'तुम्हारे होने के लिए आभारी'।"
      },
      ta: {
        s: "நான் சொல்வதைக் கேள் — உனக்கு நன்றி,",
        r: "nāṉ colvataik kēḷ — uṉakku naṉṟi,",
        e: "gǎn-ēn என்றால் 'நன்றியுடன் இரு'; yǒu-nǐ 'உன்னைப் பெற்றதற்கு நன்றி'."
      },
      th: {
        s: "ฟังฉันพูดนะ — ขอบคุณเธอ",
        r: "fang chan phut na — khop khun thoe",
        e: "gǎn-ēn แปลว่า รู้สึกขอบคุณ; yǒu-nǐ คือ 'ขอบคุณที่มีเธอ'"
      },
      km: {
        s: "ព្រោះមានអ្នក, ធ្វើឲ្យគ្រប់រដូវកក់ក្តៅ",
        r: "prʊəh mien neak, tvəə ʔaoy krup rədow kɑk-kdaw",
        e: "គឺព្រោះមានអ្នក; គឺធ្វើឲ្យគ្រប់រដូវកក់ក្តៅ។"
      },
      vi: {
        s: "Vì có bạn, ấm áp cả bốn mùa",
        r: "",
        e: "là vì có bạn; là ấm áp cả bốn mùa."
      },
      id: {
        s: "Karena ada kamu, hangat sepanjang empat musim",
        r: "",
        e: "artinya karena ada kamu; artinya hangat sepanjang empat musim."
      },
      ne: {
        s: "तिमी भएकाले, चारै ऋतु न्यानो भयो",
        r: "timī bhaekāle, cārai ritu nyāno bhayo",
        e: "भनेको तिमी भएकाले; भनेको चारै ऋतु न्यानो हुनु हो।"
      },
      bn: {
        s: "তুমি আছ বলে, চার ঋতু উষ্ণ",
        r: "tumi ācha bale, cār ṛtu uṣṇa",
        e: "চার ঋতু — প্রিয়জন থাকায় সারাবছর উষ্ণতা অনুভূত হয়।"
      },
      es: {
        s: "Porque estás tú, las cuatro estaciones son cálidas",
        r: "",
        e: "Las cuatro estaciones: gracias a esa persona, todo el año se siente cálido."
      },
      en: {
        s: "Listen to what I say — thank you,",
        r: "",
        e: "gan-en means 'to feel grateful'; you-ni is 'grateful to have you'."
      },
      de: {
        s: "Weil es dich gibt, sind alle vier Jahreszeiten warm",
        r: "",
        e: "Alle vier Jahreszeiten: durch diesen Menschen fühlt sich das ganze Jahr warm an."
      },
      my: {
        s: "မင်းရှိလို့ ရာသီလေးခုလုံး နွေးထွေးတယ်",
        r: "min-shi-lo ya-thi-lay-khu-lon nway-thway-dei",
        e: "ရာသီလေးခု — ချစ်ရသူရှိလို့ တစ်နှစ်လုံး နွေးထွေးမှုခံစားရတယ်။"
      },
      ko: {
        s: "네가 있어서, 사계절이 따뜻해졌어",
        r: "Nega isseoseo, sagyejeori ttatteuthaejyeosseo",
        e: "는 네가 있어서라는 뜻이다; 는 사계절을 따뜻하게 했다는 뜻이다."
      },
      ja: {
        s: "君がいるから、四季が温かくなった",
        r: "Kimi ga iru kara, shiki ga atatakaku natta",
        e: "君がいるからという意味である; 四季を温かくしたという意味である。"
      },
      si: {
        s: "ඔයා ඉන්න නිසා, සතර සෘතුවම උණුසුම් වුණා",
        r: "Oya inna nisa, satara sruthuvama unusum vuna",
        e: "යනු ඔයා ඉන්න නිසා යන්නයි; යනු සතර සෘතුවම උණුසුම් වුණා යන්නයි."
      },
      fa: {
        s: "چون تو هستی، چهار فصل گرم شد",
        r: "Chon tou hasti, chahâr fasl garm shod",
        e: "یعنی چون تو هستی؛ یعنی چهار فصل گرم شد."
      }
    },
    {
      hi: {
        s: "मेरे साथ चलने के लिए धन्यवाद।",
        r: "mere sāth chalne ke lie dhanyavād.",
        e: "péi-bàn का मतलब 'साथ देना' है；zǒu-guo का मतलब 'साथ चलकर पार करना' है।"
      },
      ta: {
        s: "என்னுடன் நடந்ததற்கு நன்றி.",
        r: "eṉṉuṭaṉ natantataṟku naṉṟi.",
        e: "péi-bàn என்றால் 'உடன் இரு'; zǒu-guo என்றால் 'ஒன்றாகக் கடந்து செல்'."
      },
      th: {
        s: "ขอบคุณที่เดินเคียงข้างฉัน",
        r: "khop khun thi doen khiang khang chan",
        e: "péi-bàn แปลว่า อยู่เป็นเพื่อน; zǒu-guo แปลว่า เดินผ่านไปด้วยกัน"
      },
      km: {
        s: "អរគុណអ្នក!",
        r: "ʔɑkun neak!",
        e: "គឺអរគុណអ្នក។"
      },
      vi: {
        s: "Cảm ơn bạn!",
        r: "",
        e: "là cảm ơn bạn."
      },
      id: {
        s: "Terima kasih padamu!",
        r: "",
        e: "artinya terima kasih padamu."
      },
      ne: {
        s: "तिमीलाई धन्यवाद!",
        r: "timīlāī dhanyavād!",
        e: "भनेको तिमीलाई धन्यवाद हो।"
      },
      bn: {
        s: "ধন্যবাদ তোমাকে!",
        r: "dhanyabād tomāke!",
        e: "সরল কৃতজ্ঞতা — আবেগভরা সম্বোধন।"
      },
      es: {
        s: "¡Gracias!",
        r: "",
        e: "Agradecimiento simple y lleno de emoción."
      },
      en: {
        s: "Thank you for walking beside me.",
        r: "",
        e: "pei-ban means 'to accompany'; zou-guo means 'to walk through together'."
      },
      de: {
        s: "Danke dir!",
        r: "",
        e: "Einfacher Dank voller Gefühl."
      },
      my: {
        s: "ကျေးဇူးတင်ပါတယ်!",
        r: "kyay-zu-tin-pa-dei!",
        e: "ရိုးရှင်းပြီး စိတ်လှုပ်ရှားဖွယ်ကျေးဇူးတင်စကား။"
      },
      ko: {
        s: "고마워!",
        r: "Gomawo!",
        e: "는 고맙다는 뜻이다."
      },
      ja: {
        s: "ありがとう！",
        r: "Arigatō!",
        e: "ありがとうという意味である。"
      },
      si: {
        s: "ස්තූතියි!",
        r: "Stutiyi!",
        e: "යනු ස්තූතියි යන්නයි."
      },
      fa: {
        s: "ممنونم!",
        r: "Mamnounam!",
        e: "یعنی ممنونم."
      }
    },
    {
      hi: {
        s: "हवा और बारिश में भी, कंधे से कंधा मिलाकर,",
        r: "havā aur bāriś meṁ bhī, kandhe se kandhā milākar,",
        e: "fēng-yǔ का मतलब 'हवा और बारिश' (मुश्किलें) है；bìng-jiān 'कंधे से कंधा' — एकजुटता।"
      },
      ta: {
        s: "காற்றிலும் மழையிலும் தோளோடு தோள் சேர்ந்து,",
        r: "kāṟṟilum maḻaiyilum tōḷōṭu tōḷ cērntu,",
        e: "fēng-yǔ என்றால் 'காற்றும் மழையும்' (துன்பங்கள்); bìng-jiān 'தோளோடு தோள்' — ஒற்றுமை."
      },
      th: {
        s: "ฝ่าลมฝ่าฝน เคียงบ่าเคียงไหล่",
        r: "fa lom fa fon khiang ba khiang lai",
        e: "fēng-yǔ แปลว่า ลมและฝน (ความยากลำบาก); bìng-jiān คือ 'เคียงบ่าเคียงไหล่' — ความสามัคคี"
      },
      km: {
        s: "អរគុណដែលមានអ្នក",
        r: "ʔɑkun dael mien neak",
        e: "គឺអរគុណដែលមានអ្នកនៅក្នុងជីវិត។"
      },
      vi: {
        s: "Biết ơn vì có bạn",
        r: "",
        e: "là biết ơn vì có bạn trong đời."
      },
      id: {
        s: "Bersyukur ada kamu",
        r: "",
        e: "artinya bersyukur karena ada kamu."
      },
      ne: {
        s: "तिमी भएकोमा आभारी छु",
        r: "timī bhaekomā ābhārī chhu",
        e: "भनेको तिमी भएकोमा आभारी हुनु हो।"
      },
      bn: {
        s: "কৃতজ্ঞ, তুমি আছ বলে",
        r: "kṛtajña, tumi ācha bale",
        e: "কৃতজ্ঞতা জানানো — প্রিয়জন পাশে আছে বলে ধন্য বোধ।"
      },
      es: {
        s: "Agradezco tenerte",
        r: "",
        e: "Expresar gratitud: sentirse afortunado de tener a esa persona."
      },
      en: {
        s: "Through wind and rain, shoulder to shoulder,",
        r: "",
        e: "feng-yu means 'wind and rain' (hardships); bing-jian is 'shoulder to shoulder' — unity."
      },
      de: {
        s: "Ich bin dankbar, dass es dich gibt",
        r: "",
        e: "Dankbarkeit ausdrücken: sich glücklich schätzen, diesen Menschen zu haben."
      },
      my: {
        s: "မင်းရှိတာကို ကျေးဇူးတင်တယ်",
        r: "min-shi-da-ko kyay-zu-tin-dei",
        e: "ကျေးဇူးတင်စကားပြောတာ — ချစ်ရသူ အနားမှာရှိလို့ ကံကောင်းတယ်လို့ ခံစားရတယ်။"
      },
      ko: {
        s: "네가 있어 감사해",
        r: "Nega isseo gamsahae",
        e: "는 네가 있어 감사하다는 뜻이다."
      },
      ja: {
        s: "君がいてくれて感謝している",
        r: "Kimi ga ite-kurete kansha-shite-iru",
        e: "君がいてくれて感謝するという意味である。"
      },
      si: {
        s: "ඔයා ඉන්න එකට ස්තූතියි",
        r: "Oya inna ekata stutiyi",
        e: "යනු ඔයා ඉන්න එකට ස්තූතියි යන්නයි."
      },
      fa: {
        s: "سپاس که هستی",
        r: "Sepâs ke hasti",
        e: "یعنی سپاس که هستی."
      }
    },
    {
      hi: {
        s: "मेरे साथ चलने के लिए धन्यवाद।",
        r: "mere sāth chalne ke lie dhanyavād.",
        e: "zhè-fèn का मतलब 'यह (भावना)' है；wēn-nuǎn का मतलब 'गर्मजोशी' है।"
      },
      ta: {
        s: "என்னுடன் நடந்ததற்கு நன்றி.",
        r: "eṉṉuṭaṉ natantataṟku naṉṟi.",
        e: "zhè-fèn என்றால் 'இந்த (உணர்வு)'; wēn-nuǎn என்றால் 'அரவணைப்பு'."
      },
      th: {
        s: "ขอบคุณที่เดินเคียงข้างฉัน",
        r: "khop khun thi doen khiang khang chan",
        e: "zhè-fèn แปลว่า (ความรู้สึก)นี้; wēn-nuǎn แปลว่า ความอบอุ่น"
      },
      km: {
        s: "ពិភពលោកកាន់តែស្រស់ស្អាត",
        r: "piipup-look kaan-tae srɑh-saat",
        e: "គឺពិភពលោកកាន់តែស្រស់ស្អាត។"
      },
      vi: {
        s: "Thế giới đẹp hơn",
        r: "",
        e: "là thế giới đẹp hơn."
      },
      id: {
        s: "Dunia lebih indah",
        r: "",
        e: "artinya dunia lebih indah."
      },
      ne: {
        s: "संसार अझ सुन्दर",
        r: "sansār ajha sundar",
        e: "भनेको संसार अझ सुन्दर हुनु हो।"
      },
      bn: {
        s: "পৃথিবী আরও সুন্দর",
        r: "pṛthibī āro sundar",
        e: "কৃতজ্ঞ মন নিয়ে পৃথিবী আরও সুন্দর লাগে।"
      },
      es: {
        s: "El mundo es más hermoso",
        r: "",
        e: "Con un corazón agradecido, el mundo se ve más hermoso."
      },
      en: {
        s: "Thank you for walking beside me.",
        r: "",
        e: "zhe-fen means 'this (feeling)'; wen-nuan means 'warmth'."
      },
      de: {
        s: "Die Welt ist schöner",
        r: "",
        e: "Mit dankbarem Herzen sieht die Welt schöner aus."
      },
      my: {
        s: "ကမ္ဘာကြီး ပိုလှပလာတယ်",
        r: "kan-bha-kyi po-hla-pa-la-dei",
        e: "ကျေးဇူးတင်တဲ့စိတ်နဲ့ ကမ္ဘာကြီး ပိုလှပတယ်။"
      },
      ko: {
        s: "세상이 더 아름다워",
        r: "Sesangi deo areumdawo",
        e: "는 세상이 더 아름답다는 뜻이다."
      },
      ja: {
        s: "世界がより美しく",
        r: "Sekai ga yori utsukushiku",
        e: "世界がより美しいという意味である。"
      },
      si: {
        s: "ලෝකය තවත් ලස්සනයි",
        r: "Lokaya tavat lassanayi",
        e: "යනු ලෝකය තවත් ලස්සනයි යන්නයි."
      },
      fa: {
        s: "جهان زیباتر است",
        r: "Jahân zibâtar ast",
        e: "یعنی جهان زیباتر است."
      }
    },
    {
      hi: {
        s: "सुनो मैं कहता हूँ — धन्यवाद तुम्हें,",
        r: "suno maiṁ kahtā hūṅ — dhanyavād tumheṁ,",
        e: "wèi-lái का मतलब 'भविष्य' है；lù का मतलब 'रास्ता' है — wèi-lái-de-lù 'भविष्य का रास्ता'।"
      },
      ta: {
        s: "நான் சொல்வதைக் கேள் — உனக்கு நன்றி,",
        r: "nāṉ colvataik kēḷ — uṉakku naṉṟi,",
        e: "wèi-lái என்றால் 'எதிர்காலம்'; lù என்றால் 'பாதை' — wèi-lái-de-lù 'எதிர்காலப் பாதை'."
      },
      th: {
        s: "ฟังฉันพูดนะ — ขอบคุณเธอ",
        r: "fang chan phut na — khop khun thoe",
        e: "wèi-lái แปลว่า อนาคต; lù แปลว่า เส้นทาง — wèi-lái-de-lù คือ 'เส้นทางอนาคต'"
      },
      km: {
        s: "ខ្ញុំចង់អរគុណអ្នក",
        r: "kʰɲom cɑng ʔɑkun neak",
        e: "គឺខ្ញុំចង់និយាយអរគុណអ្នក។"
      },
      vi: {
        s: "Tôi muốn cảm ơn bạn",
        r: "",
        e: "là tôi muốn cảm ơn bạn."
      },
      id: {
        s: "Aku ingin berterima kasih padamu",
        r: "",
        e: "artinya aku ingin berterima kasih padamu."
      },
      ne: {
        s: "म तिमीलाई धन्यवाद दिन चाहन्छु",
        r: "ma timīlāī dhanyavād dina cāhanchhu",
        e: "भनेको म तिमीलाई धन्यवाद दिन चाहनु हो।"
      },
      bn: {
        s: "আমি তোমাকে ধন্যবাদ জানাতে চাই",
        r: "āmi tomāke dhanyabād jānāte cāi",
        e: "কৃতজ্ঞতা জানানোর ইচ্ছা — সচেতন, আন্তরিক প্রকাশ।"
      },
      es: {
        s: "Quiero darte las gracias",
        r: "",
        e: "El deseo de agradecer: una expresión consciente y sincera."
      },
      en: {
        s: "Listen to what I say — thank you,",
        r: "",
        e: "wei-lai means 'future'; lu means 'road' — wei-lai-de-lu is 'the road ahead'."
      },
      de: {
        s: "Ich will dir danken",
        r: "",
        e: "Der Wunsch zu danken: ein bewusster, aufrichtiger Ausdruck."
      },
      my: {
        s: "မင်းကို ကျေးဇူးတင်ချင်တယ်",
        r: "min-ko kyay-zu-tin-chin-dei",
        e: "ကျေးဇူးတင်ချင်တဲ့ဆန္ဒ — သတိရှိရှိ၊ ရိုးသားတဲ့ဖော်ပြချက်။"
      },
      ko: {
        s: "나는 너에게 고마워하고 싶어",
        r: "Naneun neoege gomawohago sipeo",
        e: "는 나는 너에게 감사하고 싶다는 뜻이다."
      },
      ja: {
        s: "私は君に感謝したい",
        r: "Watashi wa kimi ni kansha-shitai",
        e: "私は君に感謝したいという意味である。"
      },
      si: {
        s: "මට ඔයාට ස්තූති කරන්න ඕනේ",
        r: "Mata oyata stuti karanna one",
        e: "යනු මට ඔයාට ස්තූති කරන්න ඕනේ යන්නයි."
      },
      fa: {
        s: "می‌خواهم از تو تشکر کنم",
        r: "Mi-xâham az tou tashakkor konam",
        e: "یعنی می‌خواهم از تو تشکر کنم."
      }
    },
    {
      hi: {
        s: "तुम्हारे साथ होने से, यह दुनिया और खूबसूरत है।",
        r: "tumhāre sāth hone se, yah duniyā aur khūbsūrat hai.",
        e: "gèng का मतलब 'और भी' है；měi-lì का मतलब 'सुंदर' है — gèng-měi-lì 'और भी सुंदर'।"
      },
      ta: {
        s: "உன்னால் இந்த உலகம் மேலும் அழகாகிறது.",
        r: "uṉṉāl inta ulakam mēlum aḻakākiṟatu.",
        e: "gèng என்றால் 'மேலும்'; měi-lì என்றால் 'அழகான' — gèng-měi-lì 'மேலும் அழகான'."
      },
      th: {
        s: "เพราะมีเธอ โลกนี้จึงสวยงามยิ่งขึ้น",
        r: "phro mi thoe lok ni chueng suai ngam ying khuen",
        e: "gèng แปลว่า ยิ่งขึ้น; měi-lì แปลว่า สวยงาม — gèng-měi-lì คือ 'สวยงามยิ่งขึ้น'"
      },
      km: {
        s: "ព្រោះមានអ្នក",
        r: "prʊəh mien neak",
        e: "គឺព្រោះមានអ្នក។"
      },
      vi: {
        s: "Vì có bạn",
        r: "",
        e: "là vì có bạn."
      },
      id: {
        s: "Karena ada kamu",
        r: "",
        e: "artinya karena ada kamu."
      },
      ne: {
        s: "तिमी भएकाले",
        r: "timī bhaekāle",
        e: "भनेको तिमी भएकाले हो।"
      },
      bn: {
        s: "কারণ তুমি আছ",
        r: "kāraṇ tumi ācha",
        e: "সব ভালোর কারণ — প্রিয়জনই সব আনন্দের উৎস।"
      },
      es: {
        s: "Porque estás tú",
        r: "",
        e: "La causa de todo lo bueno: esa persona es la fuente de la alegría."
      },
      en: {
        s: "Because of you, this world is more beautiful.",
        r: "",
        e: "geng means 'even more'; mei-li means 'beautiful' — geng-mei-li is 'even more beautiful'."
      },
      de: {
        s: "Weil es dich gibt",
        r: "",
        e: "Der Grund für alles Gute: dieser Mensch ist die Quelle der Freude."
      },
      my: {
        s: "မင်းရှိလို့ပါ",
        r: "min-shi-lo-ba",
        e: "ကောင်းတဲ့အရာအားလုံးရဲ့အကြောင်း — ချစ်ရသူက ပျော်ရွှင်မှုရဲ့အရင်းအမြစ်။"
      },
      ko: {
        s: "네가 있기에",
        r: "Nega itgie",
        e: "는 네가 있기 때문이라는 뜻이다."
      },
      ja: {
        s: "君がいるから",
        r: "Kimi ga iru kara",
        e: "君がいるからという意味である。"
      },
      si: {
        s: "ඔයා ඉන්න නිසා",
        r: "Oya inna nisa",
        e: "යනු ඔයා ඉන්න නිසා යන්නයි."
      },
      fa: {
        s: "چون تو هستی",
        r: "Chon tou hasti",
        e: "یعنی چون تو هستی."
      }
    },
    {
      hi: {
        s: "मैं कसम खाता हूँ, कभी तुमसे झूठ नहीं बोलूँगा,",
        r: "maiṁ kasam khātā hūṅ, kabhī tumse jhūṭh nahīṅ bolūṅgā,",
        e: "yǒng-gǎn का मतलब 'बहादुर' है；jiān-qiáng का मतलब 'मज़बूत' है — प्रेरणादायक शब्द।"
      },
      ta: {
        s: "நான் சத்தியம் செய்கிறேன், உன்னிடம் ஒருபோதும் பொய் சொல்லமாட்டேன்,",
        r: "nāṉ cattiyam ceykiṟēṉ, uṉṉiṭam orupōtum poy collamāṭṭēṉ,",
        e: "yǒng-gǎn என்றால் 'தைரியமான'; jiān-qiáng என்றால் 'வலுவான' — ஊக்கமளிக்கும் சொற்கள்."
      },
      th: {
        s: "ฉันสาบาน จะไม่มีวันโกหกเธอ",
        r: "chan sa ban cha mai mi wan ko hok thoe",
        e: "yǒng-gǎn แปลว่า กล้าหาญ; jiān-qiáng แปลว่า เข้มแข็ง — คำให้กำลังใจ"
      },
      km: {
        s: "សេចក្តីស្រឡាញ់នៅជាប់ក្នុងចិត្តជានិច្ច",
        r: "seckdəi-srɑlaɲ nɨw ciep knong cət cie-nəc",
        e: "គឺសេចក្តីស្រឡាញ់នៅជាប់ក្នុងចិត្តជានិច្ច។"
      },
      vi: {
        s: "Tình yêu mãi trong tim",
        r: "",
        e: "là tình yêu mãi trong tim."
      },
      id: {
        s: "Cinta selalu di hati",
        r: "",
        e: "artinya cinta selalu di hati."
      },
      ne: {
        s: "माया सधैँ मनमा छ",
        r: "māyā sadhaĩ manmā chha",
        e: "भनेको माया सधैँ मनमा हुनु हो।"
      },
      bn: {
        s: "ভালোবাসা সবসময় হৃদয়ে",
        r: "bhālobāsā sabsamaẏ hṛdaẏe",
        e: "সবসময় হৃদয়ের গভীরে — চিরস্থায়ী ভালোবাসা।"
      },
      es: {
        s: "El amor vive siempre en el corazón",
        r: "",
        e: "Siempre en lo hondo del corazón: un amor permanente."
      },
      en: {
        s: "I swear, I will never lie to you,",
        r: "",
        e: "yong-gan means 'brave'; jian-qiang means 'strong' — inspiring words."
      },
      de: {
        s: "Die Liebe bleibt für immer im Herzen",
        r: "",
        e: "Für immer im Herzen: eine bleibende Liebe."
      },
      my: {
        s: "အချစ်က နှလုံးသားထဲမှာ အမြဲရှိတယ်",
        r: "a-chit-ka hna-lon-tha-hte-hma a-mye-shi-dei",
        e: "နှလုံးသားအတွင်းမှာ အမြဲတမ်း — ထာဝရတည်တဲ့အချစ်။"
      },
      ko: {
        s: "사랑은 항상 마음속에",
        r: "Sarangeun hangsang maeumsoge",
        e: "는 사랑은 항상 마음속에 있다는 뜻이다."
      },
      ja: {
        s: "愛はいつも心の中に",
        r: "Ai wa itsumo kokoro no naka ni",
        e: "愛はいつも心の中にあるという意味である。"
      },
      si: {
        s: "ආදරය නිතරම හදවතේ",
        r: "Adaraya nitarama hadavate",
        e: "යනු ආදරය නිතරම හදවතේ යන්නයි."
      },
      fa: {
        s: "عشق همیشه در دل است",
        r: "Eshq hamishe dar del ast",
        e: "یعنی عشق همیشه در دل است."
      }
    },
    {
      hi: {
        s: "सुनो मैं कहता हूँ — धन्यवाद तुम्हें,",
        r: "suno maiṁ kahtā hūṅ — dhanyavād tumheṁ,",
        e: "bù-pà का मतलब 'डरो मत' है；fēng-yǔ 'हवा-बारिश' — मुश्किलों से न डरो।"
      },
      ta: {
        s: "நான் சொல்வதைக் கேள் — உனக்கு நன்றி,",
        r: "nāṉ colvataik kēḷ — uṉakku naṉṟi,",
        e: "bù-pà என்றால் 'பயப்படாதே'; fēng-yǔ 'காற்று-மழை' — துன்பங்களுக்கு அஞ்சாதே."
      },
      th: {
        s: "ฟังฉันพูดนะ — ขอบคุณเธอ",
        r: "fang chan phut na — khop khun thoe",
        e: "bù-pà แปลว่า อย่ากลัว; fēng-yǔ คือ 'ลมฝน' — อย่ากลัวความยากลำบาก"
      },
      km: {
        s: "បញ្ជូនសុភមង្គលបន្តទៅ",
        r: "bɑɲcuun sɑphɔɔ-mɔngkɔl bɑntɔɔ tɨw",
        e: "គឺចែករំលែកសុភមង្គលទៅអ្នកដទៃ។"
      },
      vi: {
        s: "Truyền hạnh phúc đi",
        r: "",
        e: "là truyền hạnh phúc cho người khác."
      },
      id: {
        s: "Teruskan kebahagiaan",
        r: "",
        e: "artinya meneruskan kebahagiaan pada orang lain."
      },
      ne: {
        s: "खुसी बाँड्दै जाऊँ",
        r: "khusī bā̃ddai jāū̃",
        e: "भनेको खुसी अरूलाई बाँड्नु हो।"
      },
      bn: {
        s: "সুখ ছড়িয়ে দাও",
        r: "sukh chaṛiye dāo",
        e: "সুখ ছড়িয়ে দেওয়া — সবার মাঝে আনন্দ ভাগ করে নেওয়ার আহ্বান।"
      },
      es: {
        s: "Comparte la felicidad",
        r: "",
        e: "Transmitir la felicidad: una invitación a compartir la alegría con todos."
      },
      en: {
        s: "Listen to what I say — thank you,",
        r: "",
        e: "bu-pa means 'don't be afraid'; feng-yu is 'wind and rain' — don't fear hardships."
      },
      de: {
        s: "Gib das Glück weiter",
        r: "",
        e: "Das Glück weitergeben: eine Einladung, die Freude mit allen zu teilen."
      },
      my: {
        s: "ပျော်ရွှင်မှုကို မျှဝေလိုက်ပါ",
        r: "pyaw-shwin-hmu-ko hmya-way-like-pa",
        e: "ပျော်ရွှင်မှုကို ဖြန့်ဝေတာ — အားလုံးနဲ့ ပျော်ရွှင်မှုမျှဝေဖို့ ဖိတ်ခေါ်ချက်။"
      },
      ko: {
        s: "행복을 전달해",
        r: "Haengbogeul jeondalhae",
        e: "는 행복을 전달한다는 뜻이다."
      },
      ja: {
        s: "幸せを伝えていこう",
        r: "Shiawase o tsutaete-ikō",
        e: "幸せを伝えていくという意味である。"
      },
      si: {
        s: "සතුට බෙදා දෙමු",
        r: "Satuta beda demu",
        e: "යනු සතුට බෙදා දෙනවා යන්නයි."
      },
      fa: {
        s: "شادی را منتقل کنیم",
        r: "Shâdi râ montaqel konim",
        e: "یعنی شادی را منتقل کردن."
      }
    }
  ]
,
  youai: [
    {
      hi: {
        s: "प्रेम के साथ साहसपूर्वक आगे बढ़ो",
        r: "prem ke sāth sāhaspūrvak āge baṛho",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      en: {
        s: "With love, bravely step forward",
        r: "",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      ta: {
        s: "அன்புடன் தைரியமாக முன்னேறு",
        r: "aṉputaṉ tairiyamāka muṉṉēṟu",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      th: {
        s: "ด้วยความรัก ก้าวไปข้างหน้าอย่างกล้าหาญ",
        r: "duai khwam rak kao pai khang na yang klahan",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      km: {
        s: "ដោយក្តីស្រឡាញ់ ដើរទៅមុខដោយក្លាហាន",
        r: "daoy kdei sralanh daer tov muk daoy klahan",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      vi: {
        s: "Với tình yêu, hãy dũng cảm bước tới",
        r: "",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      id: {
        s: "Dengan cinta, melangkahlah dengan berani",
        r: "",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      ne: {
        s: "मायाका साथ साहसपूर्वक अघि बढ",
        r: "māyākā sāth sāhaspūrvak aghi baḍha",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      bn: {
        s: "ভালোবাসা নিয়ে সাহসের সঙ্গে এগিয়ে যাও",
        r: "bhālobāsā niẏe sāhaser saṅge egiẏe yāo",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      es: {
        s: "Con amor, avanza con valentía",
        r: "",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      de: {
        s: "Mit Liebe, tritt mutig voran",
        r: "",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာဖြင့် ရဲရဲဝံ့ဝံ့ ရှေ့သို့လှမ်းပါ",
        r: "chit-chin-myitta-phyint ye-ye-wun-wun she-tho-hlan-ba",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      ko: {
        s: "사랑으로 용감하게 앞으로 나아가라",
        r: "sarangeuro yonggamhage apeuro naagara",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      ja: {
        s: "愛をもって勇敢に前へ進もう",
        r: "ai o motte yūkan ni mae e susumō",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      si: {
        s: "ආදරයෙන් නිර්භීතව ඉදිරියට යන්න",
        r: "ādarayen nirbhītava idiriyaṭa yanna",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      },
      fa: {
        s: "با عشق، شجاعانه قدم پیش بگذار",
        r: "bā eshq, shojā'āne qadam pish begzār",
        e: "有愛＝懷著愛心；跨出來＝勇敢地踏出第一步。"
      }
    },
    {
      hi: {
        s: "प्रेम के साथ सब लोग मिलकर आओ",
        r: "prem ke sāth sab log milkar āo",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      en: {
        s: "With love, everyone come together",
        r: "",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      ta: {
        s: "அன்புடன் அனைவரும் ஒன்று சேருங்கள்",
        r: "aṉputaṉ aṉaivarum oṉṟu cērṅkaḷ",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      th: {
        s: "ด้วยความรัก ทุกคนมาร่วมกัน",
        r: "duai khwam rak thuk khon ma ruam kan",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      km: {
        s: "ដោយក្តីស្រឡាញ់ អ្នកទាំងអស់គ្នាមកជួបជុំគ្នា",
        r: "daoy kdei sralanh neak teang os knea mok chuop chum knea",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      vi: {
        s: "Với tình yêu, mọi người cùng đến",
        r: "",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      id: {
        s: "Dengan cinta, marilah semua bersama-sama",
        r: "",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      ne: {
        s: "मायाका साथ सबैजना सँगै आऊ",
        r: "māyākā sāth sabaijanā saṅgai āū",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      bn: {
        s: "ভালোবাসা নিয়ে সবাই একসঙ্গে এসো",
        r: "bhālobāsā niẏe sabāi ekasaṅge eso",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      es: {
        s: "Con amor, vengan todos juntos",
        r: "",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      de: {
        s: "Mit Liebe, kommt alle zusammen",
        r: "",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာဖြင့် အားလုံးအတူတကွ လာကြပါ",
        r: "chit-chin-myitta-phyint a-lon-a-tu-ta-kwa la-kya-ba",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      ko: {
        s: "사랑으로 모두 함께 오라",
        r: "sarangeuro modu hamkke ora",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      ja: {
        s: "愛をもって皆で共に来よう",
        r: "ai o motte mina de tomo ni koyō",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      si: {
        s: "ආදරයෙන් සැවොම එක්ව එන්න",
        r: "ādarayen sævoma ekva enna",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      },
      fa: {
        s: "با عشق، همگی با هم بیایید",
        r: "bā eshq, hamegi bā ham biāyid",
        e: "有愛＝懷著愛心；大家一起來＝眾人一同參與、同行。"
      }
    },
    {
      hi: {
        s: "प्रेम के साथ स्वयं को गहराई से जानो",
        r: "prem ke sāth svayaṁ ko gahrāī se jāno",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      en: {
        s: "With love, deeply understand oneself",
        r: "",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      ta: {
        s: "அன்புடன் தன்னை ஆழமாக அறிந்துகொள்",
        r: "aṉputaṉ taṉṉai āḻamāka aṟintukoḷ",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      th: {
        s: "ด้วยความรัก เข้าใจตนเองอย่างลึกซึ้ง",
        r: "duai khwam rak khaochai ton eng yang luek sueng",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      km: {
        s: "ដោយក្តីស្រឡាញ់ ស្គាល់ខ្លួនឯងយ៉ាងជ្រាលជ្រៅ",
        r: "daoy kdei sralanh skoal khluon eng yeang chral chrov",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      vi: {
        s: "Với tình yêu, thấu hiểu chính mình một cách sâu sắc",
        r: "",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      id: {
        s: "Dengan cinta, pahami dirimu secara mendalam",
        r: "",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      ne: {
        s: "मायाका साथ आफूलाई गहिरोसँग बुझ",
        r: "māyākā sāth āphūlāī gahirosaṅga bujha",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      bn: {
        s: "ভালোবাসা নিয়ে নিজেকে গভীরভাবে জানো",
        r: "bhālobāsā niẏe nijeke gabhīrabhābe jāno",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      es: {
        s: "Con amor, conócete a ti mismo profundamente",
        r: "",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      de: {
        s: "Mit Liebe, erkenne dich selbst in der Tiefe",
        r: "",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာဖြင့် မိမိကိုယ်ကို နက်နက်ရှိုင်းရှိုင်း သိပါ",
        r: "chit-chin-myitta-phyint mi-mi-ko-ko net-net-shein-shein thi-ba",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      ko: {
        s: "사랑으로 자신을 깊이 깨달으라",
        r: "sarangeuro jasineul gipi kkaedareura",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      ja: {
        s: "愛をもって自分を深く知ろう",
        r: "ai o motte jibun o fukaku shirō",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      si: {
        s: "ආදරයෙන් ඔබව ගැඹුරින් හඳුනාගන්න",
        r: "ādarayen obava gæmburin handunāganna",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      },
      fa: {
        s: "با عشق، خود را ژرف بشناس",
        r: "bā eshq, khod rā zharf beshenās",
        e: "深入＝深入內心；自明白＝自己明白道理、覺悟。"
      }
    },
    {
      hi: {
        s: "प्रेम के साथ समर्पण करना ही उचित है",
        r: "prem ke sāth samarpaṇ karnā hī ucit hai",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      en: {
        s: "With love, devotion is what we should do",
        r: "",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      ta: {
        s: "அன்புடன் அர்ப்பணிப்பது சரியானதே",
        r: "aṉputaṉ arppaṇippatai cariyāṉatē",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      th: {
        s: "ด้วยความรัก การทุ่มเทนั้นถูกต้องแล้ว",
        r: "duai khwam rak kan thum the nan thuk tong laeo",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      km: {
        s: "ដោយក្តីស្រឡាញ់ ការប្តេជ្ញាចិត្តគឺជារឿងត្រឹមត្រូវ",
        r: "daoy kdei sralanh kar pdach chet keu chea reuang treum trov",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      vi: {
        s: "Với tình yêu, sự cống hiến là điều đúng đắn",
        r: "",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      id: {
        s: "Dengan cinta, pengabdian adalah hal yang benar",
        r: "",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      ne: {
        s: "मायाका साथ समर्पण गर्नु नै उचित हो",
        r: "māyākā sāth samarpaṇ garnu nai ucit ho",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      bn: {
        s: "ভালোবাসা নিয়ে নিবেদন করাই উচিত",
        r: "bhālobāsā niẏe nibedan karāi ucit",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      es: {
        s: "Con amor, la entrega es lo correcto",
        r: "",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      de: {
        s: "Mit Liebe ist Hingabe das Richtige",
        r: "",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာဖြင့် အပ်နှံခြင်းသည် မှန်ကန်ပါသည်",
        r: "chit-chin-myitta-phyint ap-hnan-chin-thi hman-kan-ba-thi",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      ko: {
        s: "사랑으로 헌신함이 마땅하다",
        r: "sarangeuro heonsinhami mattanghada",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      ja: {
        s: "愛をもって捧げることは正しい",
        r: "ai o motte sasageru koto wa tadashii",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      si: {
        s: "ආදරයෙන් කැපවීම නිවැරදියි",
        r: "ādarayen kæpavīma niværadiyi",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      },
      fa: {
        s: "با عشق، ایثار کردن درست است",
        r: "bā eshq, isār kardan dorost ast",
        e: "投入＝全心全意付出；是應該＝理所當然、責無旁貸。"
      }
    },
    {
      hi: {
        s: "परस्पर सीख से स्वयं को और दूसरों को सिद्ध करो",
        r: "paraspar sīkh se svayaṁ ko aur dūsroṁ ko siddh karo",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      en: {
        s: "Perfecting self and others through mutual encouragement",
        r: "",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      ta: {
        s: "ஒருவருக்கொருவர் கற்று தன்னையும் பிறரையும் நிறைவு செய்",
        r: "oruvarukkoruvar kaṟṟu taṉṉaiyum piṟaraiyum niṟaivu cey",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      th: {
        s: "เรียนรู้ซึ่งกันและกัน เพื่อพัฒนาตนและผู้อื่นให้สมบูรณ์",
        r: "rianru sueng kan lae kan phuea phatthana ton lae phu uen hai sombun",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      km: {
        s: "រៀនសូត្រពីគ្នាទៅវិញទៅមក ដើម្បីល្អឥតខ្ចោះខ្លួនឯងនិងអ្នកដទៃ",
        r: "rien sot pi knea tov vinh tov mok daembi lea it khchoh khluon eng ning neak dtei",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      vi: {
        s: "Học hỏi lẫn nhau để hoàn thiện mình và hoàn thiện người",
        r: "",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      id: {
        s: "Saling belajar untuk menyempurnakan diri dan sesama",
        r: "",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      ne: {
        s: "एक-अर्काबाट सिकेर आफूलाई र अरूलाई सिद्ध गर",
        r: "ek-arkābāṭa sikera āphūlāī ra arūlāī siddha gara",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      bn: {
        s: "পরস্পর শিখে নিজেকে ও অন্যকে সিদ্ধ করো",
        r: "paraspar śikhe nijeke o anẏake siddha karo",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      es: {
        s: "Aprendiendo unos de otros para perfeccionarnos a nosotros y a los demás",
        r: "",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      de: {
        s: "Voneinander lernend, uns selbst und andere vervollkommnen",
        r: "",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      my: {
        s: "အချင်းချင်း သင်ယူ၍ မိမိနှင့်သူတစ်ပါးကို ပြည့်စုံစေပါ",
        r: "a-chin-chin thin-yu-ywe mi-mi-hnin-thu-ta-ba-ko pyi-son-se-ba",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      ko: {
        s: "서로 배우며 자신과 남을 완성하라",
        r: "seoro baeumyeo jasin-gwa nameul wanseonghara",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      ja: {
        s: "互いに学び合い自分と他人を完成させよう",
        r: "tagai ni manabiai jibun to tanin o kansei saseyō",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      si: {
        s: "එකිනෙකාගෙන් ඉගෙනගෙන ඔබවත් අනුන්වත් සම්පූර්ණ කරන්න",
        r: "ekinekāgen igenagena obavat anunvat sampūrṇa karanna",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      },
      fa: {
        s: "با آموختن از یکدیگر، خود و دیگران را به کمال برسان",
        r: "bā āmukhtan az yekdigar, khod va digarān rā be kamāl beresān",
        e: "成己＝成就自己；成人＝成就他人；切磋揣＝互相琢磨、學習。"
      }
    },
    {
      hi: {
        s: "कदम-कदम पर स्वयं को और दूसरों को सफल बनाओ",
        r: "kadam-kadam par svayaṁ ko aur dūsroṁ ko saphal banāo",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      en: {
        s: "Fulfilling self and others, step by step",
        r: "",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      ta: {
        s: "படிப்படியாக தன்னையும் பிறரையும் நிறைவேற்று",
        r: "paṭippaṭiyāka taṉṉaiyum piṟaraiyum niṟaivēṟṟu",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      th: {
        s: "ทีละก้าว พัฒนาตนและผู้อื่นให้สำเร็จ",
        r: "thila kao phatthana ton lae phu uen hai samret",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      km: {
        s: "មួយជំហានម្តង សម្រេចខ្លួនឯងនិងអ្នកដទៃ",
        r: "muoy chomhean mteang samreach khluon eng ning neak dtei",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      vi: {
        s: "Từng bước một, thành tựu mình và thành tựu người",
        r: "",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      id: {
        s: "Selangkah demi selangkah, sempurnakan diri dan sesama",
        r: "",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      ne: {
        s: "पाइलैपाइलामा आफूलाई र अरूलाई सफल बनाऊ",
        r: "pāilaipāilāmā āphūlāī ra arūlāī saphal banāū",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      bn: {
        s: "ধাপে ধাপে নিজেকে ও অন্যকে সফল করো",
        r: "dhāpe dhāpe nijeke o anẏake saphal karo",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      es: {
        s: "Paso a paso, hazte pleno y haz plenos a los demás",
        r: "",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      de: {
        s: "Schritt für Schritt, sich selbst und andere vollenden",
        r: "",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      my: {
        s: "တစ်လှမ်းချင်း မိမိနှင့်သူတစ်ပါးကို ပြည့်ဝစေပါ",
        r: "ta-hlan-chin mi-mi-hnin-thu-ta-ba-ko pyi-wa-se-ba",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      ko: {
        s: "한 걸음씩 자신과 남을 이루라",
        r: "han georeumssik jasin-gwa nameul irura",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      ja: {
        s: "一歩ずつ自分と他人を成就させよう",
        r: "ippo zutsu jibun to tanin o jōju saseyō",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      si: {
        s: "පියවරෙන් පියවර ඔබවත් අනුන්වත් සඵල කරන්න",
        r: "piyavaren piyavara obavat anunvat saphala karanna",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      },
      fa: {
        s: "گام به گام، خود و دیگران را به کمال برسان",
        r: "gām be gām, khod va digarān rā be kamāl beresān",
        e: "達己＝使自己通達；達人＝使他人通達；步步邁＝一步一步向前邁進。"
      }
    },
    {
      hi: {
        s: "प्रेम के साथ कोई आपदा नहीं",
        r: "prem ke sāth koī āpadā nahīṁ",
        e: "沒有災＝沒有災難禍患。"
      },
      en: {
        s: "With love, no misery",
        r: "",
        e: "沒有災＝沒有災難禍患。"
      },
      ta: {
        s: "அன்பிருந்தால் துன்பம் இல்லை",
        r: "aṉpiruntāl tuṉpam illai",
        e: "沒有災＝沒有災難禍患。"
      },
      th: {
        s: "มีความรัก ก็ไม่มีภัยพิบัติ",
        r: "mi khwam rak ko mai mi phai phibat",
        e: "沒有災＝沒有災難禍患。"
      },
      km: {
        s: "មានក្តីស្រឡាញ់ គ្មានសេចក្តីទុក្ខ",
        r: "mean kdei sralanh kmean sechkdei tuk",
        e: "沒有災＝沒有災難禍患。"
      },
      vi: {
        s: "Có tình yêu thì không còn tai ương",
        r: "",
        e: "沒有災＝沒有災難禍患。"
      },
      id: {
        s: "Dengan cinta, tak ada bencana",
        r: "",
        e: "沒有災＝沒有災難禍患。"
      },
      ne: {
        s: "माया भए कुनै विपत्ति छैन",
        r: "māyā bhae kunai vipatti chaina",
        e: "沒有災＝沒有災難禍患。"
      },
      bn: {
        s: "ভালোবাসা থাকলে কোনো বিপদ নেই",
        r: "bhālobāsā thākle kono bipad nei",
        e: "沒有災＝沒有災難禍患。"
      },
      es: {
        s: "Con amor, no hay desgracia",
        r: "",
        e: "沒有災＝沒有災難禍患。"
      },
      de: {
        s: "Mit Liebe gibt es kein Unglück",
        r: "",
        e: "沒有災＝沒有災難禍患。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာရှိလျှင် ဘေးအန္တရာယ် မရှိပါ",
        r: "chit-chin-myitta-shi-hlyin be-an-taya ma-shi-ba",
        e: "沒有災＝沒有災難禍患。"
      },
      ko: {
        s: "사랑이 있으면 재앙이 없다",
        r: "sarangi isseumyeon jaeaengi eopda",
        e: "沒有災＝沒有災難禍患。"
      },
      ja: {
        s: "愛があれば災いなし",
        r: "ai ga areba wazawai nashi",
        e: "沒有災＝沒有災難禍患。"
      },
      si: {
        s: "ආදරය තිබේ නම් විපතක් නැත",
        r: "ādaraya tibē nam vipatak næta",
        e: "沒有災＝沒有災難禍患。"
      },
      fa: {
        s: "با عشق، هیچ بلایی نیست",
        r: "bā eshq, hich balāyi nist",
        e: "沒有災＝沒有災難禍患。"
      }
    },
    {
      hi: {
        s: "प्रेम के साथ कोई हानि नहीं",
        r: "prem ke sāth koī hāni nahīṁ",
        e: "無傷害＝沒有人受到傷害。"
      },
      en: {
        s: "With love, no suffering.",
        r: "",
        e: "無傷害＝沒有人受到傷害。"
      },
      ta: {
        s: "அன்பிருந்தால் காயம் இல்லை",
        r: "aṉpiruntāl kāyam illai",
        e: "無傷害＝沒有人受到傷害。"
      },
      th: {
        s: "มีความรัก ก็ไม่มีความเจ็บปวด",
        r: "mi khwam rak ko mai mi khwam chep puat",
        e: "無傷害＝沒有人受到傷害。"
      },
      km: {
        s: "មានក្តីស្រឡាញ់ គ្មានការឈឺចាប់",
        r: "mean kdei sralanh kmean kar chheu cheap",
        e: "無傷害＝沒有人受到傷害。"
      },
      vi: {
        s: "Có tình yêu thì không còn đau khổ",
        r: "",
        e: "無傷害＝沒有人受到傷害。"
      },
      id: {
        s: "Dengan cinta, tak ada penderitaan",
        r: "",
        e: "無傷害＝沒有人受到傷害。"
      },
      ne: {
        s: "माया भए कुनै पीडा छैन",
        r: "māyā bhae kunai pīḍā chaina",
        e: "無傷害＝沒有人受到傷害。"
      },
      bn: {
        s: "ভালোবাসা থাকলে কোনো কষ্ট নেই",
        r: "bhālobāsā thākle kono kaṣṭa nei",
        e: "無傷害＝沒有人受到傷害。"
      },
      es: {
        s: "Con amor, no hay sufrimiento",
        r: "",
        e: "無傷害＝沒有人受到傷害。"
      },
      de: {
        s: "Mit Liebe gibt es kein Leiden",
        r: "",
        e: "無傷害＝沒有人受到傷害。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာရှိလျှင် ဒုက္ခ မရှိပါ",
        r: "chit-chin-myitta-shi-hlyin dukkha ma-shi-ba",
        e: "無傷害＝沒有人受到傷害。"
      },
      ko: {
        s: "사랑이 있으면 고통이 없다",
        r: "sarangi isseumyeon gotongi eopda",
        e: "無傷害＝沒有人受到傷害。"
      },
      ja: {
        s: "愛があれば苦しみなし",
        r: "ai ga areba kurushimi nashi",
        e: "無傷害＝沒有人受到傷害。"
      },
      si: {
        s: "ආදරය තිබේ නම් වේදනාවක් නැත",
        r: "ādaraya tibē nam vēdanāvak næta",
        e: "無傷害＝沒有人受到傷害。"
      },
      fa: {
        s: "با عشق، هیچ رنجی نیست",
        r: "bā eshq, hich ranji nist",
        e: "無傷害＝沒有人受到傷害。"
      }
    },
    {
      hi: {
        s: "प्रेम से अंधकार मिट जाता है",
        r: "prem se andhakār miṭ jātā hai",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      en: {
        s: "With love, no darkness.",
        r: "",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      ta: {
        s: "அன்பால் இருள் நீங்கும்",
        r: "aṉpāl iruḷ nīṅkum",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      th: {
        s: "มีความรัก ความมืดก็สลายไป",
        r: "mi khwam rak khwam muet ko salai pai",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      km: {
        s: "មានក្តីស្រឡាញ់ ភាពងងឹតរលាយបាត់",
        r: "mean kdei sralanh pheap ngonget rolay bat",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      vi: {
        s: "Có tình yêu thì bóng tối tan biến",
        r: "",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      id: {
        s: "Dengan cinta, kegelapan sirna",
        r: "",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      ne: {
        s: "मायाले अन्धकार हट्छ",
        r: "māyāle andhakār haṭcha",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      bn: {
        s: "ভালোবাসায় অন্ধকার দূর হয়",
        r: "bhālobāsāẏ andhakār dūr haẏ",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      es: {
        s: "Con amor, la oscuridad se disipa",
        r: "",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      de: {
        s: "Mit Liebe löst sich die Dunkelheit auf",
        r: "",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      my: {
        s: "ချစ်ခြင်းမေတ္တာဖြင့် အမှောင်ကွယ်ပျောက်သွားမည်",
        r: "chit-chin-myitta-phyint a-hmaun-kwe-pyauk-thwa-myi",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      ko: {
        s: "사랑으로 어둠이 걷힌다",
        r: "sarangeuro eodumi geothinda",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      ja: {
        s: "愛があれば闇は晴れる",
        r: "ai ga areba yami wa hareru",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      si: {
        s: "ආදරයෙන් අන්ධකාරය දුරුවේ",
        r: "ādarayen andhakāraya duruvē",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      },
      fa: {
        s: "با عشق، تاریکی زدوده می‌شود",
        r: "bā eshq, tāriki zodude mishavad",
        e: "化＝化解、消除；陰霾＝心中的陰暗與憂愁。"
      }
    },
    {
      hi: {
        s: "जीवन-पथ उज्ज्वल हो उठेगा",
        r: "jīvan-path ujjval ho uṭhegā",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      en: {
        s: "Our journey will be bright.",
        r: "",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      ta: {
        s: "வாழ்க்கைப் பாதை ஒளிமயமாகும்",
        r: "vāḻkkaip pātai oḷimayamākum",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      th: {
        s: "เส้นทางชีวิตจะสว่างไสว",
        r: "senthang chiwit cha sawang sawai",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      km: {
        s: "ផ្លូវជីវិតនឹងភ្លឺស្វាង",
        r: "phlov chivit ning phleu svang",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      vi: {
        s: "Con đường đời sẽ tươi sáng",
        r: "",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      id: {
        s: "Jalan hidup akan cerah",
        r: "",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      ne: {
        s: "जीवनको बाटो उज्यालो हुनेछ",
        r: "jīvanko bāṭo ujyālo hunecha",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      bn: {
        s: "জীবনের পথ উজ্জ্বল হবে",
        r: "jībaner path ujjbal habe",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      es: {
        s: "Nuestro camino brillará",
        r: "",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      de: {
        s: "Unser Weg wird hell sein",
        r: "",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      my: {
        s: "ဘဝလမ်းသည် တောက်ပလာမည်",
        r: "ba-wa-lan-thi tauk-pa-la-myi",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      ko: {
        s: "인생길이 밝아질 것이다",
        r: "insaengiri balgajil geosida",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      ja: {
        s: "人生の道は明るくなる",
        r: "jinsei no michi wa akaruku naru",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      si: {
        s: "ජීවන මඟ ආලෝකමත් වේ",
        r: "jīvana maga ālokamat vē",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      },
      fa: {
        s: "راه زندگی روشن خواهد شد",
        r: "rāh-e zendegi roshan khāhad shod",
        e: "撥雲見日＝撥開雲霧見到太陽，比喻走出困境、前途光明。"
      }
    },
    {
      hi: {
        s: "साधना का मार्ग सर्वत्र जीवंत है",
        r: "sādhanā kā mārg sarvatra jīvaṁt hai",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      en: {
        s: "Cultivation is in all places.",
        r: "",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      ta: {
        s: "தவ வழி எங்கும் உயிர்ப்புடன் இருக்கும்",
        r: "tava vaḻi eṅkum uyirppuṭaṉ irukkum",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      th: {
        s: "การบำเพ็ญมีอยู่ทุกหนแห่ง",
        r: "kan bamphen mi yu thuk hon haeng",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      km: {
        s: "ការតបស្នងមាននៅគ្រប់ទីកន្លែង",
        r: "kar topsnong mean nov krob ti kanlaeng",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      vi: {
        s: "Con đường tu hành hiện hữu khắp mọi nơi",
        r: "",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      id: {
        s: "Jalan pembinaan ada di mana-mana",
        r: "",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      ne: {
        s: "साधनाको मार्ग सर्वत्र जीवन्त छ",
        r: "sādhanāko mārga sarvatra jīvanta cha",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      bn: {
        s: "সাধনার পথ সর্বত্র প্রাণবন্ত",
        r: "sādhanār path sarbatra prāṇabanta",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      es: {
        s: "El cultivo está en todas partes",
        r: "",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      de: {
        s: "Die Kultivierung ist überall",
        r: "",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      my: {
        s: "ကျင့်ကြံခြင်းသည် နေရာတိုင်းတွင် ရှိသည်",
        r: "kyin-kyan-chin-thi ne-ya-tain-twin shi-thi",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      ko: {
        s: "수행의 길이 사방에 활기차다",
        r: "suhaengui giri sabange hwalgichada",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      ja: {
        s: "修行の道は四方に活きている",
        r: "shugyō no michi wa shihō ni ikite iru",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      si: {
        s: "භාවනා මඟ සෑම තැනම සජීවීව පවතී",
        r: "bhāvanā maga sæma tænama sajīvīva pavatī",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      },
      fa: {
        s: "راه تزکیه در همه جا زنده است",
        r: "rāh-e tazkiye dar hame jā zende ast",
        e: "修道＝修行向道；活躍＝充滿活力；通四海＝遍及天下四方。"
      }
    },
    {
      hi: {
        s: "ज्ञान-प्राप्ति में कोई सीमा नहीं",
        r: "jñān-prāpti meṁ koī sīmā nahīṁ",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      en: {
        s: "Without limit to gain wisdom.",
        r: "",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      ta: {
        s: "ஞானம் பெற எல்லையில்லை",
        r: "ñāṉam peṟa ellaiyillai",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      th: {
        s: "การได้รับปัญญาไม่มีขีดจำกัด",
        r: "kan dai rap panya mai mi khit chamkat",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      km: {
        s: "ការទទួលបានប្រាជ្ញាគ្មានដែនកំណត់",
        r: "kar totuol ban prachnea kmean daen komnot",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      vi: {
        s: "Đạt được trí tuệ không giới hạn",
        r: "",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      id: {
        s: "Memperoleh kebijaksanaan tanpa batas",
        r: "",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      ne: {
        s: "ज्ञान प्राप्त गर्न कुनै सीमा छैन",
        r: "jñān prāpta garna kunai sīmā chaina",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      bn: {
        s: "জ্ঞান লাভের কোনো সীমা নেই",
        r: "jñān lābher kono sīmā nei",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      es: {
        s: "Obtener sabiduría no tiene límite",
        r: "",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      de: {
        s: "Weisheit zu erlangen kennt keine Grenze",
        r: "",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      my: {
        s: "ပညာရရှိရန် အကန့်အသတ် မရှိပါ",
        r: "pyin-nya-ya-shi-yan a-kant-a-that ma-shi-ba",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      ko: {
        s: "지혜 얻음에 한계가 없다",
        r: "jihye eodeume hangyega eopda",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      ja: {
        s: "智慧を得るに限りなし",
        r: "chie o eru ni kagiri nashi",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      si: {
        s: "ඥානය ලැබීමට සීමාවක් නැත",
        r: "jñānaya læbīmaṭa sīmāvak næta",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      },
      fa: {
        s: "به دست آوردن حکمت حدی ندارد",
        r: "be dast āvordan-e hekmat haddi nadārad",
        e: "暢達＝順暢通達；無阻礙＝沒有阻擋。"
      }
    },
    {
      hi: {
        s: "ज्ञान-अमृत से सिंचित हो",
        r: "jñān-amṛt se siṁcit ho",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      en: {
        s: "Nourished by the sweet dew of wisdom",
        r: "",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      ta: {
        s: "ஞான அமிர்தத்தால் நனைந்திடு",
        r: "ñāṉa amirtattāl naṉaintiṭu",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      th: {
        s: "ได้รับการหล่อเลี้ยงด้วยน้ำทิพย์แห่งปัญญา",
        r: "dai rap kan lo liang duai nam thip haeng panya",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      km: {
        s: "បានទទួលការស្រោចស្រពដោយទឹកអម្រឹតនៃប្រាជ្ញា",
        r: "ban totuol kar srauch srop daoy teuk amreut nei prachnea",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      vi: {
        s: "Được tưới tắm bởi cam lồ của trí tuệ",
        r: "",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      id: {
        s: "Disirami oleh embun kebijaksanaan",
        r: "",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      ne: {
        s: "ज्ञान-अमृतले सिञ्चित होऊ",
        r: "jñān-amṛtale siñcit hoū",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      bn: {
        s: "জ্ঞান-অমৃতে সিঞ্চিত হও",
        r: "jñān-amṛte siñcita haō",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      es: {
        s: "Nutrido por el dulce rocío de la sabiduría",
        r: "",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      de: {
        s: "Genährt vom süßen Tau der Weisheit",
        r: "",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      my: {
        s: "ပညာ၏ချိုမြိန်သော နှင်းရည်ဖြင့် စိုစွတ်စေပါ",
        r: "pyin-nya-ei-chou-myein-thaw hnin-ye-phyint so-sut-se-ba",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      ko: {
        s: "지혜의 감로로 적셔지라",
        r: "jihyeui gamnoro jeoksyeojira",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      ja: {
        s: "智慧の甘露に潤されよう",
        r: "chie no kanro ni uruosareyō",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      si: {
        s: "ඥාන අමෘතයෙන් තෙමෙන්න",
        r: "jñāna amṛtayen temenna",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      },
      fa: {
        s: "با شبنم شیرین حکمت سیراب شو",
        r: "bā shabnam-e shirin-e hekmat sirāb sho",
        e: "醍醐＝佛家比喻最高的智慧；灌溉＝滋潤澆灌。"
      }
    },
    {
      hi: {
        s: "हृदय आनंद से भर जाए",
        r: "hṛday ānaṁd se bhar jāe",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      en: {
        s: "Chest full of joy.",
        r: "",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      ta: {
        s: "நெஞ்சம் மகிழ்ச்சியால் நிறையும்",
        r: "neñcam makiḻcciyāl niṟaiyum",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      th: {
        s: "อกเต็มไปด้วยความปีติยินดี",
        r: "ok tem pai duai khwam piti yindi",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      km: {
        s: "ទ្រូងពេញដោយសេចក្តីរីករាយ",
        r: "truong penh daoy sechkdei rik reay",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      vi: {
        s: "Ngực tràn đầy niềm hoan hỷ",
        r: "",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      id: {
        s: "Dada penuh dengan sukacita",
        r: "",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      ne: {
        s: "छाती आनन्दले भरियोस्",
        r: "chātī ānandale bhariyos",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      bn: {
        s: "বুক আনন্দে ভরে উঠুক",
        r: "buk ānande bhare uṭhuk",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      es: {
        s: "El pecho lleno de alegría",
        r: "",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      de: {
        s: "Die Brust voll Freude",
        r: "",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      my: {
        s: "ရင်ဘတ် ဝမ်းမြောက်ခြင်းဖြင့် ပြည့်ပါစေ",
        r: "yin-bat wan-myauk-chin-phyint pyi-ba-se",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      ko: {
        s: "가슴에 기쁨이 가득하라",
        r: "gaseume gippeumi gadeukhara",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      ja: {
        s: "胸に法喜が満ちよう",
        r: "mune ni hōki ga michiyō",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      si: {
        s: "හදවත සතුටින් පිරේවා",
        r: "hadavata satuṭin pirēvā",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      },
      fa: {
        s: "سینه از شادی لبریز باد",
        r: "sine az shādi labriz bād",
        e: "法喜＝修行得道的喜悅；滿胸懷＝充滿心中。"
      }
    },
    {
      hi: {
        s: "शुभाशीष और कृपा बोओ",
        r: "śubhāśīṣ aur kṛpā boo",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      en: {
        s: "Blessing and grace.",
        r: "",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      ta: {
        s: "ஆசியும் அருளும் விதைத்திடு",
        r: "āciyum aruḷum vitaittiṭu",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      th: {
        s: "ปลูกฝังพรและความเมตตา",
        r: "pluk fang phon lae khwam metta",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      km: {
        s: "ដាំពរជ័យនិងព្រះគុណ",
        r: "dam por chey ning preah kun",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      vi: {
        s: "Gieo trồng phước lành và ân điển",
        r: "",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      id: {
        s: "Menanam berkah dan karunia",
        r: "",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      ne: {
        s: "शुभाशीष र कृपा रोप",
        r: "śubhāśīṣ ra kṛpā ropa",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      bn: {
        s: "আশীর্বাদ ও কৃপা রোপণ করো",
        r: "āśīrbād o kṛpā ropaṇ karo",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      es: {
        s: "Siembra bendición y gracia",
        r: "",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      de: {
        s: "Pflanze Segen und Gnade",
        r: "",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      my: {
        s: "မင်္ဂလာနှင့် ကျေးဇူးတော်ကို စိုက်ပျိုးပါ",
        r: "mingala-hnin kyay-zu-taw-ko saik-pyou-ba",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      ko: {
        s: "축복과 은혜를 심으라",
        r: "chukbokgwa eunhyereul simeura",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      ja: {
        s: "祝福と恵みを植えよう",
        r: "shukufuku to megumi o ueyō",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      si: {
        s: "ආශීර්වාදයත් අනුග්‍රහයත් රෝපණය කරන්න",
        r: "āśīrvādayat anugrahayat rōpaṇaya karanna",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      },
      fa: {
        s: "برکت و فیض بکار",
        r: "barakat va feyz bekār",
        e: "吉祥如意＝吉利順心；栽＝栽種、培植。"
      }
    },
    {
      hi: {
        s: "सब कार्य शांति और प्रेम से पूर्ण हों",
        r: "sab kāry śāṁti aur prem se pūrṇ hoṁ",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      en: {
        s: "Love and peace.",
        r: "",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      ta: {
        s: "அனைத்தும் அமைதியும் அன்பும் நிறைந்திருக்கும்",
        r: "aṉaittum amaitiyum aṉpum niṟaintirukkum",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      th: {
        s: "ทุกสิ่งเต็มไปด้วยความรักและความสงบ",
        r: "thuk sing tem pai duai khwam rak lae khwam sangop",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      km: {
        s: "គ្រប់យ៉ាងពេញដោយសេចក្តីស្រឡាញ់និងសន្តិភាព",
        r: "krob yeang penh daoy sechkdei sralanh ning santipheap",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      vi: {
        s: "Mọi sự đều tràn đầy tình yêu và hòa bình",
        r: "",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      id: {
        s: "Segala hal penuh cinta dan damai",
        r: "",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      ne: {
        s: "सबै कुरा प्रेम र शान्तिले भरियोस्",
        r: "sabai kurā prem ra śāntile bhariyos",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      bn: {
        s: "সবকিছু ভালোবাসা ও শান্তিতে পূর্ণ হোক",
        r: "sabakichu bhālobāsā o śāntite pūrṇa hok",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      es: {
        s: "Todo lleno de amor y paz",
        r: "",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      de: {
        s: "Alles erfüllt von Liebe und Frieden",
        r: "",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      my: {
        s: "အရာအားလုံး ချစ်ခြင်းနှင့် ငြိမ်းချမ်းမှုဖြင့် ပြည့်ပါစေ",
        r: "a-ya-a-lon chit-chin-hnin nyein-chan-hmu-phyint pyi-ba-se",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      ko: {
        s: "만사가 사랑과 평화로 가득하라",
        r: "mansaga saranggwa pyeonghwaro gadeukhara",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      ja: {
        s: "万事が愛と平和に満ちよう",
        r: "banji ga ai to heiwa ni michiyō",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      si: {
        s: "සියල්ල ආදරයෙන් සහ සාමයෙන් පිරේවා",
        r: "siyalla ādarayen saha sāmiyen pirēvā",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      },
      fa: {
        s: "همه چیز از عشق و صلح لبریز باد",
        r: "hame chiz az eshq va solh labriz bād",
        e: "萬事＝一切事情；平安泰＝平安順遂。"
      }
    },
    {
      hi: {
        s: "स्वर्ग और धरती मिलकर जयकार करें",
        r: "svarg aur dhartī milkar jaykār kareṁ",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      en: {
        s: "Heaven's in the world.",
        r: "",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      ta: {
        s: "விண்ணும் மண்ணும் சேர்ந்து வாழ்த்தும்",
        r: "viṇṇum maṇṇum cērntu vāḻttum",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      th: {
        s: "สวรรค์และโลกพร้อมกันสรรเสริญ",
        r: "sawan lae lok phrom kan sansoen",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      km: {
        s: "ឋានសួគ៌និងផែនដីរួមគ្នាអបអរ",
        r: "than suorge ning phaen dei ruom knea ob or",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      vi: {
        s: "Trời và người cùng hoan hô",
        r: "",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      id: {
        s: "Langit dan bumi bersorak bersama",
        r: "",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      ne: {
        s: "स्वर्ग र पृथ्वी मिलेर जयजयकार गरून्",
        r: "svarga ra pṛthvī milera jayajaykār garūn",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      bn: {
        s: "স্বর্গ ও পৃথিবী মিলে জয়ধ্বনি করুক",
        r: "sbarga o pṛthibī mile jaẏadhbani karuk",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      es: {
        s: "El cielo y la tierra aplauden juntos",
        r: "",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      de: {
        s: "Himmel und Erde jubeln gemeinsam",
        r: "",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      my: {
        s: "နတ်ပြည်နှင့် ကမ္ဘာမြေ အတူတကွ ချီးမွမ်းကြပါ",
        r: "nat-pyi-hnin kaba-mye a-tu-ta-kwa chi-mwan-kya-ba",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      ko: {
        s: "천지가 함께 찬미하라",
        r: "cheonjiga hamkke chanmihara",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      ja: {
        s: "天地が共に喝采しよう",
        r: "tenchi ga tomo ni kassai shiyō",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      si: {
        s: "අහසත් පොළොවත් එක්ව ප්‍රශංසා කරත්වා",
        r: "ahasat polovat ekva praśansā karatvā",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      },
      fa: {
        s: "آسمان و زمین با هم ستایش کنند",
        r: "āsmān va zamin bā ham setāyesh konand",
        e: "天人＝天上與人間；共喝采＝一同歡呼讚頌。"
      }
    }
  ]
,
  huanyingge: [
    {
      hi: {
        s: "आपसे मिलकर सचमुच बहुत खुशी हुई।",
        r: "Āpse milkar sachmuch bahut khushī huī.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      en: {
        s: "So truly happy to see you.",
        r: "",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      ta: {
        s: "உங்களைச் சந்தித்ததில் உண்மையிலேயே மிகவும் மகிழ்ச்சி.",
        r: "uṅkaḷaic cantittatil uṇmaiyilēyē mikavum makiḻcci.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      th: {
        s: "ดีใจจริง ๆ ที่ได้พบคุณ",
        r: "dichai ching ching thi dai phop khun",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      km: {
        s: "ពិតជារីករាយណាស់ដែលបានជួបអ្នក",
        r: "pɨt ciə riəkreay nah dael baan cuəp neak",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      vi: {
        s: "Thật sự rất vui khi được gặp bạn.",
        r: "",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      id: {
        s: "Sungguh senang bisa bertemu dengan Anda.",
        r: "",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      ne: {
        s: "तपाईंलाई भेटेर साँच्चै धेरै खुसी लाग्यो।",
        r: "Tapāīṁlāī bheṭera sāccai dherai khusī lāgyo.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      bn: {
        s: "আপনাকে দেখে সত্যিই খুব খুশি।",
        r: "Āpnāke dekhe satyi-i khub khushi.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      es: {
        s: "¡Qué alegría verle de verdad!",
        r: "",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      de: {
        s: "Wir freuen uns wirklich, Sie zu sehen.",
        r: "",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      my: {
        s: "ခင်ဗျားကို တွေ့ရတာ တကယ်ပဲ ဝမ်းသာပါတယ်။",
        r: "khin-bya-go twe-ya-da ta-ke-be wan-tha-ba-te.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      ko: {
        s: "당신을 만나서 정말 기쁩니다.",
        r: "Dangsin-eul mannaseo jeongmal gippeumnida.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      ja: {
        s: "あなたにお会いできて本当に嬉しいです。",
        r: "Anata ni oai dekite hontō ni ureshii desu.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      si: {
        s: "ඔබව දැකීමෙන් ඇත්තටම ගොඩක් සතුටුයි.",
        r: "Obava dækīmen ættatama goḍak satutui.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      },
      fa: {
        s: "از دیدن شما واقعاً خیلی خوشحالم.",
        r: "Az didan-e shomâ vâqe'an xeili xoshhâlam.",
        e: "真正＝真的、確實；高興＝開心、喜悅；見到您＝見到您（敬語「您」表示尊敬）。"
      }
    },
    {
      hi: {
        s: "पूरे मन की खुशी से आपका स्वागत है।",
        r: "Pūre man kī khushī se āpkā svāgat hai.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      en: {
        s: "We welcome you with hearts full of joy.",
        r: "",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      ta: {
        s: "மனம் நிறைந்த மகிழ்ச்சியுடன் உங்களை வரவேற்கிறோம்.",
        r: "maṉam niṟainta makiḻcciyuṭaṉ uṅkaḷai varavēṟkiṟōm.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      th: {
        s: "ยินดีต้อนรับคุณด้วยความยินดีอย่างเต็มเปี่ยม",
        r: "yindi tonrap khun duai khwam yindi yang tem piam",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      km: {
        s: "សូមស្វាគមន៍អ្នកដោយចិត្តរីករាយបំផុត",
        r: "soum sveakum neak daoy cɨt riəkreay bɑmpʰot",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      vi: {
        s: "Chào đón bạn với niềm vui tràn đầy trong lòng.",
        r: "",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      id: {
        s: "Kami menyambut Anda dengan hati yang penuh sukacita.",
        r: "",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      ne: {
        s: "पूर्ण हृदयको खुसीका साथ तपाईंलाई स्वागत छ।",
        r: "Pūrṇa hṛdayako khusīkā sātha tapāīṁlāī svāgat cha.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      bn: {
        s: "ভরপুর আনন্দের সাথে আপনাকে স্বাগত জানাই।",
        r: "Bharpur ānandera sāthe āpnāke svāgata jānāi.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      es: {
        s: "¡Le damos la bienvenida con el corazón lleno de alegría!",
        r: "",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      de: {
        s: "Wir heißen Sie von ganzem Herzen willkommen.",
        r: "",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      my: {
        s: "စိတ်နှလုံးအပြည့်နဲ့ ခင်ဗျားကို ကြိုဆိုပါတယ်။",
        r: "seit-hna-lone a-pye-ne khin-bya-go kyo-so-ba-te.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      ko: {
        s: "마음 가득한 기쁨으로 당신을 환영합니다.",
        r: "Ma-eum gadeukhan gippeum-euro dangsin-eul hwanyeonghamnida.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      ja: {
        s: "心からの喜びをもってあなたを歓迎します。",
        r: "Kokoro kara no yorokobi o motte anata o kangei shimasu.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      si: {
        s: "හදවත පිරුණු සතුටින් ඔබව සාදරයෙන් පිළිගනිමු.",
        r: "Hadavata piruṇa satuṭin obava sādarayen piḷiganimu.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      },
      fa: {
        s: "با دلی سرشار از شادی به شما خوش‌آمد می‌گوییم.",
        r: "Bâ deli sarshâr az shâdi be shomâ xosh-âmad mi-guyim.",
        e: "滿心＝心中充滿；歡喜＝歡樂喜悅；歡迎您＝迎接您的到來（敬語）。"
      }
    },
    {
      hi: {
        s: "स्वागत है! स्वागत है!",
        r: "Svāgat hai! Svāgat hai!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      en: {
        s: "Welcome! Welcome!",
        r: "",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      ta: {
        s: "வருக! வருக!",
        r: "varuka! varuka!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      th: {
        s: "ยินดีต้อนรับ! ยินดีต้อนรับ!",
        r: "yindi tonrap! yindi tonrap!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      km: {
        s: "ស្វាគមន៍! ស្វាគមន៍!",
        r: "sveakum! sveakum!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      vi: {
        s: "Chào mừng! Chào mừng!",
        r: "",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      id: {
        s: "Selamat datang! Selamat datang!",
        r: "",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      ne: {
        s: "स्वागत छ! स्वागत छ!",
        r: "Svāgat cha! Svāgat cha!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      bn: {
        s: "স্বাগতম! স্বাগতম!",
        r: "Svāgatam! Svāgatam!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      es: {
        s: "¡Bienvenidos! ¡Bienvenidos!",
        r: "",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      de: {
        s: "Willkommen! Willkommen!",
        r: "",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      my: {
        s: "ကြိုဆိုပါတယ်! ကြိုဆိုပါတယ်!",
        r: "kyo-so-ba-te! kyo-so-ba-te!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      ko: {
        s: "환영합니다! 환영합니다!",
        r: "Hwanyeonghamnida! Hwanyeonghamnida!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      ja: {
        s: "歓迎!歓迎!",
        r: "Kangei! Kangei!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      si: {
        s: "සාදරයෙන් පිළිගනිමු! සාදරයෙන් පිළිගනිමු!",
        r: "Sādarayen piḷiganimu! Sādarayen piḷiganimu!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      },
      fa: {
        s: "خوش آمدید! خوش آمدید!",
        r: "Xosh âmadid! Xosh âmadid!",
        e: "歡迎＝迎接來賓的用語；重複兩次表示熱情。"
      }
    },
    {
      hi: {
        s: "हम आपका स्वागत करते हैं!",
        r: "Ham āpkā svāgat karte hain!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      en: {
        s: "We welcome you!",
        r: "",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      ta: {
        s: "நாங்கள் உங்களை வரவேற்கிறோம்!",
        r: "nāṅkaḷ uṅkaḷai varavēṟkiṟōm!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      th: {
        s: "พวกเรายินดีต้อนรับคุณ!",
        r: "phuak rao yindi tonrap khun!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      km: {
        s: "យើងខ្ញុំស្វាគមន៍អ្នក!",
        r: "yeung khɲom sveakum neak!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      vi: {
        s: "Chúng tôi chào đón bạn!",
        r: "",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      id: {
        s: "Kami menyambut Anda!",
        r: "",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      ne: {
        s: "हामी तपाईंलाई स्वागत गर्छौं!",
        r: "Hāmī tapāīṁlāī svāgat garchauṁ!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      bn: {
        s: "আমরা আপনাকে স্বাগত জানাই!",
        r: "Āmrā āpnāke svāgata jānāi!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      es: {
        s: "¡Le damos la bienvenida!",
        r: "",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      de: {
        s: "Wir heißen Sie willkommen!",
        r: "",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      my: {
        s: "ကျွန်တော်တို့ ခင်ဗျားကို ကြိုဆိုပါတယ်!",
        r: "kyan-taw-do khin-bya-go kyo-so-ba-te!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      ko: {
        s: "우리가 당신을 환영합니다!",
        r: "Uri-ga dangsin-eul hwanyeonghamnida!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      ja: {
        s: "私たちはあなたを歓迎します!",
        r: "Watashitachi wa anata o kangei shimasu!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      si: {
        s: "අපි ඔබව සාදරයෙන් පිළිගනිමු!",
        r: "Api obava sādarayen piḷiganimu!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      },
      fa: {
        s: "ما به شما خوش‌آمد می‌گوییم!",
        r: "Mâ be shomâ xosh-âmad mi-guyim!",
        e: "我們＝說話者一方；歡迎您＝熱情迎接您的到來。"
      }
    }
  ]
};
