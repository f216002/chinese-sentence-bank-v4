/* V4 中文歌曲歌詞翻譯（AI 校對草稿，待老師審定）
   結構：V4_SONGS_I18N[songId][lineIdx][lang] = { s: 譯句, r: 羅馬拼音, e: 解說 }
   目前完成：hi（印地文）、en（英文）；其餘 14 語待翻譯包補上（無翻譯時卡片退回印地文顯示）。 */
const V4_SONGS_I18N = {
  buyuge: [
    {hi:{s:"सफ़ेद लहरें उछलती हैं, मैं नहीं डरता।",r:"Safed lahrein uchalti hain, main nahin darta.",e:"滔滔是波浪翻滾的樣子；不怕＝不害怕。"},en:{s:"White waves surge and roll, I am not afraid.",r:"",e:"滔滔 describes waves surging; 不怕 means 'not afraid'."}},
    {hi:{s:"पतवार सँभालकर आगे की ओर बढ़ो।",r:"Patvaar sambhaalkar aage ki or badho.",e:"掌起舵兒＝握住船舵；往前划＝向前划船。"},en:{s:"Take the helm and row forward.",r:"",e:"掌起舵兒 means 'take hold of the rudder'; 往前划 means 'row forward'."}},
    {hi:{s:"जाल पानी में डालो, ऐ मछुआरो।",r:"Jaal paani mein daalo, ai machhuaaro.",e:"撒網＝撒下漁網；漁家＝漁民。"},en:{s:"Cast the net into the water, oh fishermen.",r:"",e:"撒網 means 'cast the fishing net'; 漁家 means 'fishermen'."}},
    {hi:{s:"बड़ी मछली पकड़कर ज़ोर से हँसो।",r:"Badi machhli pakadkar zor se hanso.",e:"捕＝捕捉；笑哈哈＝開懷大笑的聲音。"},en:{s:"Catch a big fish and laugh heartily.",r:"",e:"捕 means 'to catch'; 笑哈哈 is the sound of hearty laughter."}},
    {hi:{s:"हैयो इयो इयो हेंग हैयो!",r:"Haiyo iyo iyo heng haiyo!",e:"這是勞動號子，沒有實際意思，是划船時喊的口號。"},en:{s:"Hai-yo, yi-yo, yi-yo, heng, hai-yo!",r:"",e:"A work chant with no literal meaning, sung while rowing."}}
  ],
  lanhuacao: [
    {hi:{s:"मैं पहाड़ों से आया हूँ, ऑर्किड घास साथ लाया हूँ।",r:"Main pahaadon se aaya hoon, orchid ghaas saath laaya hoon.",e:"從山中來＝從山裡來；蘭花草＝蘭花。"},en:{s:"I come from the mountains, bringing orchid plants with me.",r:"",e:"從山中來 means 'come from the mountains'; 蘭花草 is the orchid plant."}},
    {hi:{s:"छोटे बगीचे में लगाओ, फूल जल्दी खिलने की आशा में।",r:"Chhote bageeche mein lagao, phool jaldi khilne ki aasha mein.",e:"種＝種植；希望花開早＝盼望花早點開。"},en:{s:"Plant it in the small garden, hoping the flowers bloom early.",r:"",e:"種 means 'to plant'; 希望花開早 expresses the wish for early blooming."}},
    {hi:{s:"दिन में तीन बार देखो, फूलों का मौसम बीत जाने तक।",r:"Din mein teen baar dekho, phoolon ka mausam beet jaane tak.",e:"一日看三回＝一天看三次；看得花時過＝看到花期過了。"},en:{s:"I look at it three times a day, until the flowering season has passed.",r:"",e:"一日看三回 means 'look three times a day'; 看得花時過 means 'watch until blooming time passes'."}},
    {hi:{s:"पर ऑर्किड में अब भी एक भी कली नहीं?",r:"Par orchid mein ab bhi ek bhi kali nahin?",e:"卻依然＝還是；苞＝花苞；無一個＝一個也沒有。"},en:{s:"But the orchid still has not a single bud?",r:"",e:"卻依然 means 'still'; 苞 means 'flower bud'; 無一個 means 'not even one'."}},
    {hi:{s:"पलक झपकते ही शरद ऋतु आ गई, ऑर्किड को गरम कमरे में ले जाओ।",r:"Palak jhapakte hi sharad ritu aa gayi, orchid ko garam kamre mein le jao.",e:"轉眼＝一轉眼；移蘭入暖房＝把蘭花搬進暖房。"},en:{s:"In the blink of an eye autumn arrives; move the orchid into the warm room.",r:"",e:"轉眼 means 'in a blink'; 移蘭入暖房 means 'move the orchid into a warm room'."}},
    {hi:{s:"हर सुबह स्नेह से देखभाल करो, हर रात कभी न भूलो।",r:"Har subah sneh se dekhbhaal karo, har raat kabhi na bhoolo.",e:"朝朝＝每天早晨；顧惜＝愛護；夜夜不相忘＝每晚都不忘記。"},en:{s:"Morning after morning I care for it tenderly; night after night I never forget.",r:"",e:"朝朝 means 'every morning'; 顧惜 means 'to cherish'; 夜夜不相忘 means 'never forget, night after night'."}},
    {hi:{s:"वसंत में फूल खिलने की प्रतीक्षा में, पुरानी इच्छा पूरी हो सके।",r:"Vasant mein phool khilne ki prateeksha mein, puraani ichchha poori ho sake.",e:"期待＝盼望；宿願＝長久的心願；償＝實現。"},en:{s:"Awaiting the spring blossoms, hoping my long-cherished wish will come true.",r:"",e:"期待 means 'to await'; 宿願 is a 'long-held wish'; 償 means 'to fulfill'."}},
    {hi:{s:"आँगन फूलों के गुच्छों से भरा है, बहुत सुगंध फैली है।",r:"Aangan phoolon ke guchchhon se bhara hai, bahut sugandh phaili hai.",e:"滿庭＝滿院子；簇簇＝一簇一簇；開得許多香＝開得很香。"},en:{s:"The courtyard is full of clustered blossoms, blooming so fragrant.",r:"",e:"滿庭 means 'the whole courtyard'; 簇簇 describes flowers in clusters; 香 means 'fragrant'."}}
  ],
  talang: [
    {hi:{s:"छोटा-सा बादल धीरे-धीरे चला आया।",r:"Chhota-sa baadal dheere-dheere chala aaya.",e:"小小的＝小小地；走過來是說雲慢慢飄過來。"},en:{s:"A tiny little cloud slowly drifts over.",r:"",e:"小小的 means 'tiny'; 走過來 here describes the cloud drifting toward us."}},
    {hi:{s:"कृपया थोड़ी देर पैर आराम करो, क्षण भर रुको।",r:"Kripya thodi der pair aaraam karo, kshan bhar ruko.",e:"歇歇腳＝休息一下；暫時停下來＝先停一會兒。"},en:{s:"Please rest your feet a while, stop for a moment.",r:"",e:"歇歇腳 means 'rest one's feet'; 暫時停下來 means 'pause for a while'."}},
    {hi:{s:"पहाड़ पर पहाड़ी फूल खिले हैं, इसलिए मैं पहाड़ आया।",r:"Pahaad par pahaadi phool khile hain, isliye main pahaad aaya.",e:"山花兒開＝山花開了；才是表示來的原因。"},en:{s:"The mountain flowers are blooming, that's why I came up the mountain.",r:"",e:"山花兒開 means 'mountain flowers bloom'; 才 here gives the reason for coming."}},
    {hi:{s:"अरे, तुम भी पहाड़ पर फूल खिलते देखने आए हो।",r:"Are, tum bhi pahaad par phool khilte dekhne aaye ho.",e:"原來嘛＝原來啊（驚喜的語氣）；也是＝也一樣。"},en:{s:"So it turns out you also came up the mountain to see the flowers bloom.",r:"",e:"原來嘛 expresses pleasant surprise; 也是 means 'also'."}},
    {hi:{s:"हल्की-सी हवा धीरे-धीरे चली आई।",r:"Halki-si hawa dheere-dheere chali aayi.",e:"一陣風＝一陣風；慢慢地走過來是說風慢慢吹過來。"},en:{s:"A gentle little breeze slowly drifts over.",r:"",e:"一陣風 is a gust of wind; 走過來 describes the breeze coming toward us."}},
    {hi:{s:"समुद्र पर लहरों के फूल खिले हैं, इसलिए मैं समुद्र तट आया।",r:"Samudra par laharon ke phool khile hain, isliye main samudra tat aaya.",e:"浪花開是把浪花比作花開；才是表示來的原因。"},en:{s:"The sea spray blooms like flowers, that's why I came to the seaside.",r:"",e:"浪花開 likens waves to blooming flowers; 才 gives the reason for coming to the sea."}},
    {hi:{s:"अरे, तुम्हें भी लहरें पसंद हैं, इसलिए तुम समुद्र तट आए।",r:"Are, tumhen bhi laharen pasand hain, isliye tum samudra tat aaye.",e:"原來嘛＝原來啊（驚喜的語氣）；愛浪花＝喜歡浪花。"},en:{s:"So it turns out you also love the sea spray, that's why you came to the seaside.",r:"",e:"原來嘛 expresses pleasant surprise; 愛浪花 means 'love the sea spray'."}}
  ]
};
