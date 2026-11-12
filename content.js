// ============================================================
//  課程內容：《狀態空間模型及其在經濟學之應用：九層分齡學習》EP1–EP11
//  欄位說明見 ~/.claude/skills/learning-series-pipeline/references/site_build.md
//  數學式用 KaTeX：行內 $...$，獨立 $$...$$。含反斜線的字串用 R`...`（String.raw）。
//  練習題答案以 ../_research/practice_check.py 驗算。
//  2013 年後的更新以 ../_research/updates_since_2013.md 的已核實項目為準。
// ============================================================
const R = String.raw;

// 引用連結：ref("Doucet et al. 2015", "https://doi.org/...")
const ref = (t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
const UPD = "2013 年後的更新";

const BOOK = `Zeng, Y. &amp; Wu, S. (Eds.) (2013). <i>State-Space Models: Applications in Economics and Finance</i>. Springer. <a href="https://doi.org/10.1007/978-1-4614-7789-1" target="_blank" rel="noopener">doi:10.1007/978-1-4614-7789-1</a>`;

window.SERIES = {
  title: "狀態空間模型及其在經濟學之應用：九層分齡學習",
  short: "SSM 九層",
  brand: "SSM<b>·</b>9<span class=\"long\"> 狀態空間九層學習網頁</span>",
  storeKey: "progress-SSM-7297eb",
  eyebrow: "State-Space Models · 9-Tier Learning · EP1–EP11",
  heroTitle: "看不見的狀態，<span class=\"hl\">怎麼一步步猜準</span>",
  lead: "同一個「預測 → 觀測 → 修正」的迴圈，從 5 歲講到研究前沿：L1–L4 建立直覺與半定量模型，L5–L8 進入經濟學應用、Kalman filter、粒子濾波與學界爭點，L9 從本體論、跨界同構與戰略三個角度重新看它。每一集只多打開一個黑盒子。",
  heroLabel: "一維 Kalman 濾波即時追蹤：拉動 Q/R 看增益 K 怎麼改變",
  description: "《狀態空間模型及其在經濟學之應用：九層分齡學習》學習網頁：從學齡前直覺到研究前沿，先答三題、看動畫、動手算、再答一次。",
  footer: `《狀態空間模型及其在經濟學之應用：九層分齡學習》學習網頁 · 進度只存在這台裝置的瀏覽器裡<br>參考書目：${BOOK}。本站內容為重新講解，未轉載原書文字、圖表或數據；2013 年後的發展另附出處。`,
  phases: [
    { id: 1, name: "第一階段｜基礎認知建構", range: "EP1–EP4", desc: "見山是山：從「躲起來的小貓」到雜訊、變異數與加權平均，建立預測 → 觀測 → 修正的直覺與半定量模型。" },
    { id: 2, name: "第二階段｜專業縱深分化", range: "EP5–EP8", desc: "見山不是山：經濟學為什麼需要看不見的變數、Kalman filter 的完整推導、粒子濾波與參數學習，以及學界尚未定論的前沿。" },
    { id: 3, name: "第三階段｜頂層重構與跨界躍遷", range: "EP9–EP11", desc: "見山又是山：隱藏狀態是否真的存在、同一個迴圈如何出現在氣象、導航與 AI，以及計算極限下的戰略取捨。" }
  ]
};

window.UNITS = [
  // ---------------------------------------------------------- EP1 · L1
  {
    no: 1, id: "u01", phase: 1, tier: "L1 學齡前｜具象感官",
    title: "看不見的小貓在哪裡？",
    hook: "小貓躲到窗簾後面，你只聽得到喵喵聲。你要怎麼猜牠在哪裡？",
    tags: "隱藏、聲音、猜一猜、再猜一次",
    status: "planned", estDur: "約 7 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "小貓不見了" },
      { t: 50, title: "看不見，但牠還在" },
      { t: 130, title: "聲音會騙人一點點" },
      { t: 220, title: "猜、聽、再猜" },
      { t: 320, title: "越聽越準，但不會百分之百" },
      { t: 390, title: "下一集：猜測和耳朵拔河" }
    ],
    formula: R`\text{猜一猜} \;\rightarrow\; \text{聽一聽} \;\rightarrow\; \text{再猜一次}`,
    pre: [
      { q: "小貓躲在窗簾後面，你看不到牠。牠還在不在房間裡？", a: "還在。看不到不代表不存在；我們只是要用別的線索（聲音）去猜牠在哪裡。這個「看不到、但真的存在」的東西，大人叫它<b>隱藏狀態</b>。" },
      { q: "聽到一次喵喵聲，就能百分之百知道小貓在哪裡嗎？", a: "不能。聲音會在房間裡反彈、也可能被別的聲音蓋過，所以聲音只能告訴我們「大概」在哪裡。" },
      { q: "第二次再聽到聲音時，你會把上一次的猜測丟掉嗎？", a: "不會。好方法是把上一次的猜測和新聽到的聲音<b>合在一起</b>，再猜一次，這樣通常會越猜越準。" }
    ],
    terms: [
      { zh: "看不見的東西（隱藏狀態）", en: "hidden state", m: "", d: "真的存在、但沒辦法直接看到的東西，例如躲起來的小貓在哪裡。" },
      { zh: "線索（觀測）", en: "observation", m: "", d: "我們拿得到的訊息，例如聽到的喵喵聲；它跟真相有關，但不完全一樣。" },
      { zh: "猜測", en: "guess / estimate", m: "", d: "根據目前所有線索，說出「我覺得小貓大概在這裡」。" },
      { zh: "雜音", en: "noise", m: "", d: "讓線索變得不準的東西，例如回音或電視的聲音。" }
    ],
    practice: {
      intro: "地板上有一排格子，從 0 號排到 10 號。每一題都「一半相信上次的猜測、一半相信聲音」，把兩個數字加起來除以 2。",
      items: [
        { q: "上次你猜小貓在 4 號格子，這次聲音聽起來在 6 號格子。新的猜測是幾號？", a: 5, tol: 0.01, hint: "(4 + 6) ÷ 2" },
        { q: "上次你猜小貓在 2 號格子，這次聲音聽起來在 6 號格子。新的猜測是幾號？", a: 4, tol: 0.01, hint: "(2 + 6) ÷ 2" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "看不見的東西還在；我們用線索<b>猜</b>，聽到新線索就<b>再猜一次</b>。" },
      { h: "為什麼不能只聽最後一次聲音？", b: "因為每一次聲音都有一點點不準。把以前猜到的和現在聽到的合起來，比只靠一次聲音更可靠。" },
      { h: "給陪讀的大人", b: "這一集的「小貓位置」就是之後各集的<b>狀態</b>（state），「喵喵聲」就是<b>觀測</b>（observation）。L1 只建立兩件事：(1) 真相和線索是兩回事；(2) 猜測要隨新線索更新。這兩點在經濟學裡對應到「真正的景氣」和「公布的統計數字」。" },
      { h: "延伸閱讀", b: `大人可以先翻參考書的 Preface 與 Ch. 1 開頭，看狀態空間模型在財經裡處理哪些「看不見的東西」。${BOOK}` }
    ],
    quiz: [
      { q: "小貓躲在窗簾後面，下面哪一句最正確？", o: ["看不到，所以小貓不見了", "看不到，但小貓還在，只是要用線索去猜", "只要聽一次聲音就一定知道牠在哪", "聲音一定比眼睛更準"], a: 1, w: "隱藏狀態真的存在，只是不能直接看到，要靠線索去猜。" },
      { q: "為什麼聽到的聲音不一定準？", o: ["因為小貓會說謊", "因為有回音和別的雜音", "因為耳朵壞了", "因為聲音永遠是錯的"], a: 1, w: "線索裡混了雜音，所以只能告訴我們「大概」。" },
      { q: "聽到新的聲音以後，最好的做法是？", o: ["把舊的猜測丟掉，只聽新的", "完全不理新的聲音", "把舊的猜測和新的聲音合起來再猜一次", "隨便猜一個"], a: 2, w: "新舊合在一起再猜，就是之後每一集都會出現的「修正」步驟。" }
    ],
    next: "L2：如果你很相信自己的猜測，但聲音又說在別的地方，要聽誰的？猜測和耳朵開始拔河。"
  },

  // ---------------------------------------------------------- EP2 · L2
  {
    no: 2, id: "u02", phase: 1, tier: "L2 國小｜具體運思",
    title: "猜測和眼睛在拔河",
    hook: "你猜明天會下雨，可是早上天空看起來很晴朗。該相信誰？相信多少？",
    tags: "預測、觀察、修正、拔河、信任份數",
    status: "planned", estDur: "約 7 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "上一集的小貓又跑了" },
      { t: 60, title: "第一步：先預測" },
      { t: 140, title: "第二步：再觀察" },
      { t: 220, title: "拔河：誰比較可信就多聽誰" },
      { t: 330, title: "一直重複，就會跟上變化" },
      { t: 400, title: "下一集：用兩條規則說完" }
    ],
    formula: R`\text{新猜測} = \text{預測} + \text{信任度} \times (\text{觀察} - \text{預測})`,
    pre: [
      { q: "如果你的預測很少出錯，但這次的觀察很模糊，你應該比較聽誰的？", a: "比較聽預測。哪一邊比較可靠，就給它比較多的「信任份數」。" },
      { q: "「預測」和「觀察」不一樣時，差距代表什麼？", a: "代表「驚訝」。差距越大，表示事情跟你想的越不一樣，需要修正越多（但修正多少還要看觀察可不可靠）。" },
      { q: "為什麼要一直重複「預測→觀察→修正」，而不是只做一次？", a: "因為要猜的東西會一直變（小貓會跑、景氣會變），只做一次很快就過時了；每來一個新觀察就更新一次，才能跟上。" }
    ],
    terms: [
      { zh: "預測", en: "prediction", m: "", d: "還沒看到新線索之前，根據過去推出來的猜測。" },
      { zh: "觀察", en: "observation", m: "y", d: "這一次實際看到或量到的線索。" },
      { zh: "驚訝量", en: "surprise / innovation", m: "y-\\hat{x}", d: "觀察減掉預測；差越多，表示越出乎意料。" },
      { zh: "信任度", en: "trust / weight", m: "K", d: "要把多少比例的驚訝量拿來修正猜測，介於 0 和 1 之間。" },
      { zh: "修正", en: "update / correction", m: "", d: "把預測往觀察的方向挪一點，得到新的猜測。" }
    ],
    practice: {
      intro: "用「信任份數」來拔河：新猜測 =（預測 × 預測的份數 + 觀察 × 觀察的份數）÷ 總份數。",
      items: [
        { q: "預測說小貓在 10 號，觀察說在 14 號。你給預測 1 份、觀察 3 份。新猜測是幾號？", a: 13, tol: 0.01, hint: "(10×1 + 14×3) ÷ 4" },
        { q: "同樣的預測 10 號、觀察 14 號，這次房間很吵，你給預測 3 份、觀察 1 份。新猜測是幾號？", a: 11, tol: 0.01, hint: "(10×3 + 14×1) ÷ 4" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "先預測，再觀察，<b>誰比較可信就多聽誰</b>，然後一直重複。" },
      { h: "拔河的兩個極端", b: "如果觀察完全不可信（房間超吵），信任度接近 0，新猜測幾乎就是預測；如果預測完全不可信（小貓亂跑），信任度接近 1，新猜測幾乎就是觀察。真實世界通常在中間。" },
      { h: "兩種寫法是同一件事", b: "「份數加權平均」和「預測 + 信任度 ×（觀察 − 預測）」算出來一樣。上面第 1 題：觀察占 3/4，所以信任度 = 0.75，10 + 0.75 × (14 − 10) = 13。" },
      { h: "經濟學的例子", b: "政府先公布的經濟成長率是「快報」，之後還會修正。經濟學家會把「自己的預測」和「快報」拔河，得到比兩者都穩的估計。" },
      { h: "延伸閱讀", b: `參考書 Ch. 1 的 Introduction 用「預測—更新」描述濾波的兩個步驟。${BOOK}` }
    ],
    quiz: [
      { q: "預測很少出錯、觀察很模糊時，信任度應該？", o: ["接近 0（多聽預測）", "接近 1（多聽觀察）", "剛好 0.5", "大於 1"], a: 0, w: "觀察不可靠，就少用它來修正。" },
      { q: "「驚訝量」指的是？", o: ["預測加觀察", "觀察減預測", "信任度乘 2", "預測的平方"], a: 1, w: "觀察 − 預測：越大表示越出乎意料。" },
      { q: "預測 20、觀察 30、信任度 0.5，新猜測是？", o: ["20", "25", "30", "50"], a: 1, w: "20 + 0.5 × (30 − 20) = 25。" }
    ],
    next: "L3：把「東西怎麼變」和「線索怎麼來」各寫成一條規則，兩條規則就能描述整個系統。"
  },

  // ---------------------------------------------------------- EP3 · L3
  {
    no: 3, id: "u03", phase: 1, tier: "L3 國中｜形式運思啟蒙",
    title: "兩條方程說完一個系統",
    hook: "汽車油錶會晃、統計局的數字會修正。怎麼用兩條方程，把「真實」和「量到的」分開？",
    tags: "狀態方程、觀測方程、誤差、平均值、景氣",
    status: "planned", estDur: "約 8 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "油錶的指針在晃" },
      { t: 70, title: "狀態方程：東西怎麼變" },
      { t: 170, title: "觀測方程：線索怎麼來" },
      { t: 260, title: "誤差：平均是 0，但每次都不一樣" },
      { t: 350, title: "換成經濟：真實景氣 vs 公布的 GDP" },
      { t: 440, title: "下一集：誤差有多大？" }
    ],
    formula: R`\underbrace{x_t = x_{t-1} + u_t + w_t}_{\text{狀態方程}} \qquad \underbrace{y_t = x_t + v_t}_{\text{觀測方程}}`,
    pre: [
      { q: "油箱裡真正的油量，和油錶指到的位置，是同一個東西嗎？", a: "不是。真正的油量是狀態 $x_t$；油錶讀數是觀測 $y_t$，會因為顛簸、感測器誤差而晃動（$v_t$）。" },
      { q: "如果昨天有 40 公升、今天開車用掉 5 公升，你預測今天剩多少？", a: "35 公升。這就是用狀態方程「往前推一步」；實際值還可能因為估計用油量不準而有一點誤差 $w_t$。" },
      { q: "經濟學裡，什麼東西像「真正的油量」、什麼像「油錶」？", a: "真實的景氣或經濟活動像真正的油量（看不見）；統計機構公布的 GDP、失業率像油錶（量得到，但有誤差、會被修正）。" }
    ],
    terms: [
      { zh: "狀態", en: "state", m: "x_t", d: "第 t 期系統真正的情況，通常看不到。" },
      { zh: "觀測", en: "observation / measurement", m: "y_t", d: "第 t 期實際量到的數字。" },
      { zh: "狀態方程", en: "state (transition) equation", m: "x_t = x_{t-1}+u_t+w_t", d: "描述狀態怎麼從上一期變到這一期。" },
      { zh: "觀測方程", en: "observation (measurement) equation", m: "y_t = x_t + v_t", d: "描述量到的數字怎麼由狀態加上誤差產生。" },
      { zh: "過程誤差", en: "process noise", m: "w_t", d: "狀態本身意料之外的變動，例如油耗比預估多。" },
      { zh: "量測誤差", en: "measurement noise", m: "v_t", d: "量測工具造成的偏差，例如油錶晃動或統計抽樣誤差。" }
    ],
    practice: {
      intro: "油箱模型：$x_t = x_{t-1} - 5 + w_t$（每天用掉 5 公升），油錶 $y_t = x_t + v_t$。誤差的平均是 0，所以預測時先把它們當成 0。",
      items: [
        { q: "昨天的油量估計是 40 公升。用狀態方程預測今天的油量是多少公升？", a: 35, tol: 0.01, hint: "40 − 5，誤差平均為 0" },
        { q: "今天油錶讀到 33 公升。觀測減預測的「驚訝量」是多少？", a: -2, tol: 0.01, hint: "33 − 35" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "<b>狀態方程</b>說東西怎麼變，<b>觀測方程</b>說線索怎麼來；兩條合起來就是「狀態空間模型」（state-space model）。" },
      { h: "為什麼要分兩條？", b: "因為「真實」和「量到的」誤差來源不同：$w_t$ 是世界本身的不確定，$v_t$ 是量測工具的不完美。把它們分開，才知道新的讀數該相信多少。" },
      { h: "誤差的平均是 0", b: "誤差不是錯誤，而是每次都不一樣、但長期平均起來不偏不倚的隨機變動。預測時先用平均值 0，之後再處理「它有多大」（下一集的變異數）。" },
      { h: "經濟學的例子", b: "把「景氣的真實強弱」當成狀態，把公布的成長率當觀測，就能把短期雜訊和長期趨勢分開。參考書 Ch. 5 就是用這種方式拆解香港通膨的<b>趨勢</b>（trend）與<b>循環</b>（cycle）。" },
      { h: "延伸閱讀", b: `參考書 Ch. 4（模型不確定性與狀態不確定性）、Ch. 5（香港通膨的 trend–cycle）。${BOOK}` }
    ],
    quiz: [
      { q: "在 $y_t = x_t + v_t$ 裡，$v_t$ 代表？", o: ["狀態本身的變化", "量測誤差", "上一期的狀態", "控制輸入"], a: 1, w: "$v_t$ 是量測工具帶來的誤差。" },
      { q: "下列哪一個最適合當「狀態」？", o: ["統計局公布的 GDP 數字", "真實但看不見的景氣強弱", "油錶的指針位置", "新聞標題"], a: 1, w: "狀態是看不見的真實情況；公布的數字是觀測。" },
      { q: "為什麼誤差在預測時先當成 0？", o: ["因為誤差不存在", "因為誤差的平均是 0", "因為誤差永遠很小", "因為老師規定"], a: 1, w: "隨機誤差平均不偏，最好的單點預測就用它的平均值 0。" }
    ],
    next: "L4：誤差有大有小。用「變異數」量出它們有多大，就能算出信任度 K 應該是多少。"
  },

  // ---------------------------------------------------------- EP4 · L4
  {
    no: 4, id: "u04", phase: 1, tier: "L4 高中｜參數與半定量",
    title: "雜訊、變異數與加權平均",
    hook: "信任度到底該設多少？答案藏在兩個誤差的「變異數」比例裡。",
    tags: "變異數、加權平均、Kalman 增益、不確定性、通膨趨勢",
    status: "planned", estDur: "約 8 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "兩個都不準的量測，平均會更準嗎？" },
      { t: 80, title: "變異數：量化「有多不準」" },
      { t: 170, title: "最佳權重：越不準，分到越少" },
      { t: 270, title: "Kalman 增益 K = P/(P+R)" },
      { t: 360, title: "修正後的不確定性變小了" },
      { t: 430, title: "下一集：經濟學裡看不見的變數" }
    ],
    formula: R`K=\frac{P}{P+R},\qquad \hat{x}=\hat{x}^- + K\,(y-\hat{x}^-),\qquad P^+=(1-K)\,P`,
    pre: [
      { q: "預測的變異數是 4，觀測的變異數是 1。應該比較相信誰？", a: "比較相信觀測，因為它的變異數比較小。最佳權重 $K = 4/(4+1) = 0.8$，也就是把 80% 的驚訝量拿來修正。" },
      { q: "合併兩個獨立、都不準的估計之後，不確定性會變大還是變小？", a: "變小。合併後的變異數 $(1-K)P = PR/(P+R)$ 一定比 $P$ 和 $R$ 都小。" },
      { q: "修正完這一期後，到下一期預測時，不確定性會怎樣？", a: "會再變大一點，因為狀態本身會隨機變動，要加上過程雜訊的變異數 $Q$：$P^- = P^+ + Q$。" }
    ],
    terms: [
      { zh: "變異數", en: "variance", m: "\\sigma^2", d: "衡量隨機量偏離平均的程度；越大越不準。" },
      { zh: "預測變異數", en: "prior (predicted) variance", m: "P", d: "看到新觀測之前，對狀態估計的不確定性。" },
      { zh: "觀測雜訊變異數", en: "measurement noise variance", m: "R", d: "量測誤差 $v_t$ 的變異數。" },
      { zh: "過程雜訊變異數", en: "process noise variance", m: "Q", d: "狀態每期隨機變動 $w_t$ 的變異數。" },
      { zh: "Kalman 增益", en: "Kalman gain", m: "K", d: "把驚訝量拿多少比例來修正估計；一維時 $K=P/(P+R)$。" },
      { zh: "反變異數加權", en: "inverse-variance weighting", m: "", d: "合併多個獨立估計時，權重與各自變異數成反比，可得最小變異數。" }
    ],
    practice: {
      intro: "延續上一集的油箱：預測 $\\hat{x}^- = 35$，觀測 $y = 33$。預測變異數 $P = 4$，觀測雜訊 $R = 1$，過程雜訊 $Q = 0.5$。",
      items: [
        { q: "Kalman 增益 $K$ 是多少？", a: 0.8, tol: 0.001, hint: "K = P/(P+R) = 4/5" },
        { q: "修正後的油量估計 $\\hat{x}$ 是多少公升？", a: 33.4, tol: 0.01, hint: "35 + K × (33 − 35)" },
        { q: "下一期「預測」的變異數 $P^-_{t+1} = (1-K)P + Q$ 是多少？", a: 1.3, tol: 0.001, hint: "(1 − 0.8) × 4 + 0.5" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "<b>誰的變異數小，就多相信誰</b>。$K=P/(P+R)$ 把 L2 的「信任度」變成可以算的數字。" },
      { h: "為什麼是 P/(P+R)？", b: R`把預測與觀測當成兩個獨立估計，取權重 $K$ 讓合併後的變異數 $(1-K)^2P + K^2R$ 最小。對 $K$ 微分令其為 0，得到 $K = P/(P+R)$，代回得 $P^+ = PR/(P+R)$。` },
      { h: "一步一步的迴圈", b: R`預測：$\hat{x}^-_t = \hat{x}_{t-1}$，$P^-_t = P_{t-1} + Q$；修正：$K_t = P^-_t/(P^-_t+R)$，$\hat{x}_t = \hat{x}^-_t + K_t(y_t-\hat{x}^-_t)$，$P_t=(1-K_t)P^-_t$。這就是一維的 Kalman filter。首頁的動畫就在即時跑這個迴圈。` },
      { h: "修正一個常見的誤解", b: "「平均兩個不準的數字一定更準」只有在兩者獨立、而且權重給對時才成立。權重給錯（例如很吵的觀測給太多權重），結果可能比單用預測還差。" },
      { h: "經濟學的例子", b: "通膨率每月跳動很大（$R$ 大），但核心趨勢變得慢（$Q$ 小），所以 $K$ 很小，濾出的趨勢通膨很平滑。這就是 trend–cycle 拆解背後的直覺。" },
      { h: "延伸閱讀", b: `參考書 Ch. 5（trend–cycle 拆解）、Ch. 7（股票報酬的狀態空間分解）。${BOOK}` }
    ],
    quiz: [
      { q: "若 $P=1$、$R=9$，Kalman 增益 $K$ 是？", o: ["0.1", "0.5", "0.9", "9"], a: 0, w: "1/(1+9) = 0.1：觀測很吵，只修正一點點。" },
      { q: "合併後的變異數 $P^+=(1-K)P$ 和 $P$、$R$ 比較？", o: ["一定比兩者都大", "一定比兩者都小", "介於兩者之間", "永遠等於 R"], a: 1, w: "$PR/(P+R)$ 小於 $P$ 也小於 $R$。" },
      { q: "預測步驟中 $P^-_t = P_{t-1} + Q$，加上 $Q$ 的原因是？", o: ["觀測變吵了", "狀態本身會隨機變動，增加不確定", "要讓 K 變小", "算錯要補回來"], a: 1, w: "時間往前一步，狀態可能隨機移動，不確定性跟著增加。" }
    ],
    next: "L5：經濟學裡充滿看不見的變數：潛在產出、自然失業率、波動率……狀態空間模型怎麼幫央行和投資人做決策？"
  },

  // ---------------------------------------------------------- EP5 · L5
  {
    no: 5, id: "u05", phase: 2, tier: "L5 跨領域通識｜系統思維與決策",
    title: "經濟學為什麼離不開看不見的變數",
    hook: "央行要決定升息，但最關鍵的「產出缺口」從來沒有人直接量到過。決策者怎麼面對這個盲區？",
    tags: "潛在產出、產出缺口、自然失業率、波動率、違約脆弱度、即時預測",
    status: "planned", estDur: "約 11 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "決策會議上那個缺席的數字" },
      { t: 80, title: "潛在產出與產出缺口" },
      { t: 180, title: "自然失業率與趨勢通膨" },
      { t: 280, title: "波動率：市場看不見的溫度" },
      { t: 380, title: "違約脆弱度：為什麼公司會一起變壞" },
      { t: 470, title: "即時預測與資料修正" },
      { t: 580, title: "下一集：把直覺寫成矩陣" }
    ],
    formula: R`\text{新估計} = \text{舊估計} + K\cdot(\text{新資料} - \text{預期})，\quad K \text{ 隨 } \frac{\text{結構變動}}{\text{量測雜訊}} \text{ 上升}`,
    pre: [
      { q: "為什麼「潛在產出」不能像 GDP 一樣直接統計出來？", a: "潛在產出是「在不引發通膨壓力下，經濟能持續生產的水準」，是一個概念上的狀態，沒有任何帳本記錄它；只能從 GDP、通膨、失業率等觀測資料推回來。" },
      { q: "如果一個國家的統計數字常常大幅修正，決策者應該怎麼對待最新公布的數字？", a: "給它較低的權重（較小的 K），並和模型預測、其他指標一起看，避免被會被修正的雜訊牽著走。" },
      { q: "市場的「波動率」和公司的「違約脆弱度」有什麼共同點？", a: "兩者都看不到，只能從價格或違約事件推估；而且都會隨時間變化，用狀態空間模型就能讓它們成為「會動的隱藏狀態」。" }
    ],
    terms: [
      { zh: "潛在產出", en: "potential output", m: "y^*_t", d: "不造成通膨加速時，經濟可持續達到的產出水準；無法直接觀測。" },
      { zh: "產出缺口", en: "output gap", m: "y_t-y^*_t", d: "實際產出與潛在產出的差距，是貨幣政策的重要依據。" },
      { zh: "自然失業率", en: "natural rate of unemployment / NAIRU", m: "u^*_t", d: "與穩定通膨相容的失業率，會隨結構因素緩慢移動。" },
      { zh: "隨機波動率", en: "stochastic volatility", m: "h_t", d: "把資產報酬的波動程度本身當成會隨機變化的隱藏狀態。" },
      { zh: "違約脆弱度", en: "frailty", m: "", d: "影響許多公司同時違約、但無法直接觀測的共同因子。" },
      { zh: "即時預測", en: "nowcasting", m: "", d: "在官方數據公布前，用高頻資料估計當期經濟狀況。" },
      { zh: "資料修正", en: "data revision", m: "", d: "統計數據公布後再被更新；初值可看成帶較大雜訊的觀測。" }
    ],
    practice: {
      intro: "把對某一期經濟成長的估計當成狀態。你的模型預期成長率 2.0%，預測的不確定性變異數 $P=1$；新公布的快報是 3.5%，但快報的修正幅度很大，雜訊變異數 $R=4$。",
      items: [
        { q: "應該把多少比例的「驚訝量」納入估計？（$K$）", a: 0.2, tol: 0.001, hint: "K = P/(P+R) = 1/5" },
        { q: "更新後的成長率估計是多少 %？", a: 2.3, tol: 0.01, hint: "2.0 + 0.2 × (3.5 − 2.0)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "經濟政策最關鍵的變數往往<b>看不見</b>；狀態空間模型把它們變成可以持續更新、而且附帶不確定性的估計。" },
      { h: "制度的隱喻：董事會與兩種報告", b: "把 Kalman 增益想成董事會的授權比例：內部長期模型（預測）與外部即時報告（觀測）各有可信度。外部報告越乾淨、環境變化越快，就越該授權它改變結論；外部報告越吵、環境越穩，就越該堅守模型。這不是妥協，而是在不確定性下最小化決策誤差。" },
      { h: "書中的應用地圖", b: "參考書把應用分成四類：(1) 總體經濟的線性模型，例如 trend–cycle 拆解與時變參數 VAR（Ch. 4–7）；(2) 波動率與 regime switching（Ch. 2、8–11）；(3) 信用風險中的違約脆弱度（Ch. 1、8）；(4) 超高頻交易資料（Ch. 13–15）。共同點都是「看不見、會變、只能間接推估」。" },
      { h: "估計值也帶著不確定性", b: "好的狀態空間分析會同時報告估計值與信賴區間。對決策者而言，「產出缺口大約 −1%，但 95% 區間是 −3% 到 +1%」比單一數字更誠實，也直接影響政策應該多謹慎。" },
      { h: UPD, b: `<ul><li><b>經濟的天氣預報</b>：紐約聯準會的 Staff Nowcast 用動態因子模型（狀態空間＋Kalman filter）消化不同頻率、不同發布時間的資料，每週更新當季 GDP 估計，並把每次修正歸因到各筆新資料（${ref("Bok et al. 2018", "https://doi.org/10.1146/annurev-economics-080217-053214")}；2023 年改版重啟時加入只在 2020 年 3–9 月作用的 COVID 因子，見 ${ref("Liberty Street Economics 2023", "https://libertystreeteconomics.newyorkfed.org/2023/09/reintroducing-the-new-york-fed-staff-nowcast")}）。亞特蘭大聯準會的 ${ref("GDPNow", "https://www.atlantafed.org/cqer/research/gdpnow")} 則是會計結構加因子模型的混合（${ref("Higgins 2014", "https://www.atlantafed.org/research/publications/wp/2014/07")}）。</li><li><b>一個極端月份就能讓模型失準</b>：2020 年 3 月的資料讓許多模型短暫失靈；研究者主張要明確建模疫情期間衝擊變異數的暴增，而不是直接刪掉資料（${ref("Lenza &amp; Primiceri 2022", "https://doi.org/10.1002/jae.2895")}）。</li><li><b>同名不同義</b>：AI 新聞裡的「狀態空間模型」（S4、Mamba）和經濟學的 SSM 方程式長得像，但前者是處理長序列的神經網路層，後者是在推論看不見的經濟狀態（${ref("Gu et al. 2022", "https://arxiv.org/abs/2111.00396")}；${ref("Gu &amp; Dao 2023", "https://arxiv.org/abs/2312.00752")}）。</li></ul>` },
      { h: "延伸閱讀", b: `參考書 Ch. 1（frailty 與高頻資料應用綜述）、Ch. 4（模型不確定性）、Ch. 5（通膨趨勢）、Ch. 7（股票報酬分解）。${BOOK}` }
    ],
    quiz: [
      { q: "下列何者最不適合當作狀態空間模型的「隱藏狀態」？", o: ["潛在產出", "隨機波動率", "已公布的每日收盤價", "違約脆弱度"], a: 2, w: "收盤價是直接觀測到的資料，通常放在觀測方程。" },
      { q: "統計初值的修正幅度變大，對估計的影響是？", o: ["K 變大，更相信初值", "K 變小，較少依賴初值", "K 不變", "應完全忽略模型"], a: 1, w: "觀測雜訊 R 變大，K = P/(P+R) 變小。" },
      { q: "決策時同時報告信賴區間的主要價值是？", o: ["讓圖表更好看", "反映估計的不確定性，調整政策謹慎程度", "避免使用模型", "保證預測正確"], a: 1, w: "不確定性本身就是決策資訊。" }
    ],
    next: "L6：把今天的直覺寫成矩陣：線性高斯狀態空間模型、Kalman filter 的完整推導，以及怎麼用它估計參數。"
  },

  // ---------------------------------------------------------- EP6 · L6
  {
    no: 6, id: "u06", phase: 2, tier: "L6 大學本科｜標準理論模型",
    title: "線性高斯狀態空間模型與 Kalman filter",
    hook: "只要模型是線性的、雜訊是高斯的，最佳濾波就有封閉解。它長什麼樣子？怎麼用它做最大概似估計？",
    tags: "線性高斯、Kalman filter、預測誤差分解、MLE、平滑器、TVP-VAR",
    status: "planned", estDur: "約 12 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "從一維走到矩陣" },
      { t: 80, title: "線性高斯狀態空間模型的標準形式" },
      { t: 190, title: "條件高斯推導 Kalman filter" },
      { t: 320, title: "預測誤差分解與最大概似估計" },
      { t: 430, title: "平滑器：用全部資料回頭看" },
      { t: 520, title: "時變參數 VAR 的狀態空間表示" },
      { t: 640, title: "下一集：非線性時怎麼辦" }
    ],
    formula: R`\begin{aligned} y_t &= Z\alpha_t + \varepsilon_t, & \varepsilon_t &\sim N(0,H)\\ \alpha_{t+1} &= T\alpha_t + \eta_t, & \eta_t &\sim N(0,Q)\\ v_t &= y_t - Za_t,\; F_t = ZP_tZ' + H, & K_t &= TP_tZ'F_t^{-1}\\ a_{t+1} &= Ta_t + K_tv_t, & P_{t+1} &= TP_t(T-K_tZ)' + Q \end{aligned}`,
    pre: [
      { q: "為什麼在線性高斯假設下，Kalman filter 給出的是「最佳」估計？", a: "因為狀態與觀測聯合為高斯分配，條件分配 $p(\\alpha_t\\mid y_{1:t})$ 仍是高斯，完全由平均與共變異數描述；Kalman filter 正好遞迴算出這兩者，所以就是條件期望（最小均方誤差估計）。" },
      { q: "未知參數（例如 $Q$、$H$）怎麼估計？", a: "用 Kalman filter 產生的一步預測誤差 $v_t$ 與其變異數 $F_t$，把概似函數寫成各期條件密度的乘積（預測誤差分解），再對參數做數值最大化。" },
      { q: "濾波（filtering）和平滑（smoothing）差在哪？", a: "濾波只用到 $t$ 期為止的資料 $y_{1:t}$；平滑用全部樣本 $y_{1:n}$ 回頭修正每一期的狀態估計，所以區間更窄，但不能即時使用。" }
    ],
    terms: [
      { zh: "線性高斯狀態空間模型", en: "linear Gaussian state-space model", m: "", d: "狀態與觀測方程皆為線性、雜訊為高斯的模型。" },
      { zh: "系統矩陣", en: "system matrices", m: "Z,T,H,Q", d: "決定觀測如何載入狀態、狀態如何轉移，以及兩種雜訊共變異數的矩陣。" },
      { zh: "預測誤差（創新）", en: "prediction error / innovation", m: "v_t", d: "觀測減去一步預測，在模型正確時為序列無關的白噪音。" },
      { zh: "預測誤差分解", en: "prediction error decomposition", m: "\\log L=-\\tfrac12\\sum(\\log2\\pi|F_t|+v_t'F_t^{-1}v_t)", d: "把聯合概似拆成各期一步預測密度的乘積。" },
      { zh: "平滑器", en: "smoother (RTS)", m: "\\hat\\alpha_{t|n}", d: "利用全部樣本反向遞迴，求每期狀態的條件期望。" },
      { zh: "擴散初始化", en: "diffuse initialization", m: "P_1\\to\\infty", d: "對非定態狀態的初始值設定極大不確定性的處理方式。" },
      { zh: "時變參數 VAR", en: "time-varying parameter VAR (TVP-VAR)", m: "", d: "VAR 係數隨時間以隨機漫步演化，係數本身就是狀態。" }
    ],
    practice: {
      intro: "以 local level model 為例：$y_t = \\mu_t + \\varepsilon_t$，$\\mu_{t+1} = \\mu_t + \\eta_t$，其中 $H = 1$、$Q = 1$。穩態時一步預測變異數 $\\bar P$ 滿足 $\\bar P = \\bar P H/(\\bar P+H) + Q$。",
      items: [
        { q: "穩態 Kalman 增益 $\\bar K = \\bar P/(\\bar P + H)$ 是多少？（取到小數第三位）", a: 0.618, tol: 0.002, hint: "解 P² − QP − QH = 0，得 P̄ = (1+√5)/2 ≈ 1.618" },
        { q: "某一期的預測誤差 $v_t = 1$、$F_t = 2$。這一期對數概似的貢獻 $-\\tfrac12(\\log 2\\pi + \\log F_t + v_t^2/F_t)$ 是多少？", a: -1.5155, tol: 0.001, hint: "−0.5 × (1.8379 + 0.6931 + 0.5)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "線性＋高斯 ⇒ 條件分配一直是高斯 ⇒ 只要遞迴更新平均與共變異數，就是最佳濾波。" },
      { h: "推導的關鍵：條件高斯公式", b: R`若 $\begin{pmatrix}\alpha\\y\end{pmatrix}\sim N\!\left(\begin{pmatrix}a\\Za\end{pmatrix},\begin{pmatrix}P & PZ'\\ ZP & F\end{pmatrix}\right)$，則 $\alpha\mid y \sim N\!\big(a + PZ'F^{-1}(y-Za),\; P - PZ'F^{-1}ZP\big)$。把它套在每一期，再用狀態方程往前推一步，就得到上方的四條遞迴式。` },
      { h: "穩態與黃金比例", b: R`在 local level model 中，$\bar K$ 只取決於訊號雜訊比 $q = Q/H$。$q=1$ 時 $\bar K = (\sqrt5-1)/2 \approx 0.618$。$q\to0$ 時 $\bar K\to0$（趨勢幾乎不動），$q\to\infty$ 時 $\bar K\to1$（直接追觀測）。` },
      { h: "估計：預測誤差分解", b: R`$\log L(\theta) = -\tfrac{1}{2}\sum_{t}\big(p\log 2\pi + \log|F_t| + v_t'F_t^{-1}v_t\big)$。每評估一次參數 $\theta$ 就跑一次 Kalman filter；再用數值最佳化（如 BFGS）求 MLE。模型設定正確時，標準化創新 $F_t^{-1/2}v_t$ 應近似獨立標準常態，這也是診斷工具。` },
      { h: "時變參數 VAR", b: R`把 VAR 係數堆成向量 $\beta_t$，令 $\beta_t = \beta_{t-1} + u_t$ 為狀態方程，$y_t = X_t'\beta_t + e_t$ 為觀測方程；若再讓 $e_t$ 的變異數隨時間變化（stochastic volatility），模型就不再是線性高斯，需要 MCMC 等方法，這是參考書 Ch. 6 的主題。` },
      { h: UPD, b: `<ul><li><b>經典演算法的更正</b>：Primiceri（2005）TVP-VAR-SV 的 Gibbs 抽樣把 Kim–Shephard–Chib 混合指標的抽取順序放錯了，作者於 2015 年正式更正；以它為範本的程式都應改用更正後的順序（${ref("Del Negro &amp; Primiceri 2015", "https://doi.org/10.1093/restud/rdv024")}）。</li><li><b>趨勢是模型的產物</b>：HP filter 等價於某個特定 UC 模型的 Kalman smoother，會製造虛假的動態，端點估計也不穩；換一個 SSM 設定，趨勢與循環就跟著改變（${ref("Hamilton 2018", "https://doi.org/10.1162/rest_a_00706")}）。</li><li><b>量得越不準越少信</b>：HARQ 依已實現波動的量測誤差調整權重，正是 Kalman 增益的直覺（${ref("Bollerslev, Patton &amp; Quaedvlieg 2016", "https://doi.org/10.1016/j.jeconom.2015.10.007")}）；KalmanNet 則保留預測—更新結構、讓網路學出增益（${ref("Revach et al. 2022", "https://doi.org/10.1109/TSP.2022.3158588")}）。</li><li><b>動手做</b>：statsmodels 的 ${ref("statespace 模組", "https://www.statsmodels.org/stable/statespace.html")} 內建 <code>UnobservedComponents</code>、<code>DynamicFactorMQ</code>，幾行 Python 就能重做 trend–cycle 分解與迷你 nowcast；${ref("Stan", "https://doi.org/10.18637/jss.v076.i01")}、${ref("PyMC", "https://doi.org/10.7717/peerj-cs.1516")} 讓「寫模型」和「寫推論演算法」分開。</li></ul>` },
      { h: "延伸閱讀", b: `參考書 Ch. 6（TVP-VAR with stochastic volatility 的狀態空間表示與估計）、Ch. 7（報酬分解）。${BOOK}` }
    ],
    quiz: [
      { q: "線性高斯模型下，Kalman filter 的濾波平均 $a_{t|t}$ 等於？", o: ["狀態的事前平均", "$E[\\alpha_t\\mid y_{1:t}]$", "$E[\\alpha_t\\mid y_{1:n}]$", "觀測值本身"], a: 1, w: "濾波平均是給定到目前為止資料的條件期望；用全部資料的是平滑。" },
      { q: "預測誤差分解的用途是？", o: ["讓狀態變成可觀測", "把聯合概似寫成各期一步預測密度的乘積，以進行 MLE", "去除季節性", "保證參數可識別"], a: 1, w: "這是用 Kalman filter 計算概似的標準做法。" },
      { q: "local level model 中，訊號雜訊比 $q=Q/H$ 變大時，穩態增益 $\\bar K$？", o: ["變小", "變大", "不變", "變成負數"], a: 1, w: "狀態變動相對於量測雜訊越大，越應追隨新觀測。" }
    ],
    next: "L7：當模型非線性（例如隨機波動率）或雜訊不是高斯時，封閉解消失。粒子濾波怎麼用「一群樣本」取代平均與變異數？"
  },

  // ---------------------------------------------------------- EP7 · L7
  {
    no: 7, id: "u07", phase: 2, tier: "L7 研究生｜方法論與誤差控制",
    title: "非線性時代：粒子濾波與參數學習",
    hook: "隨機波動率模型讓 Kalman filter 失效。用一群「粒子」近似分配時，誤差從哪裡來？參數又要怎麼一邊濾波一邊學？",
    tags: "粒子濾波、bootstrap filter、APF、重抽樣、ESS、Liu–West、Storvik、Particle Learning",
    status: "planned", estDur: "約 12 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "封閉解消失的那一刻" },
      { t: 70, title: "隨機波動率模型為什麼非線性" },
      { t: 160, title: "Bootstrap filter：傳播、加權、重抽樣" },
      { t: 280, title: "Auxiliary particle filter 與重抽樣方法" },
      { t: 380, title: "權重退化與有效樣本數" },
      { t: 470, title: "參數學習：Liu–West、Storvik、Particle Learning" },
      { t: 590, title: "Monte Carlo 誤差與計算成本" },
      { t: 670, title: "下一集：前沿與爭點" }
    ],
    formula: R`\tilde w_t^{(i)} \propto w_{t-1}^{(i)}\,\frac{p(y_t\mid x_t^{(i)})\,p(x_t^{(i)}\mid x_{t-1}^{(i)})}{q(x_t^{(i)}\mid x_{t-1}^{(i)},y_t)},\qquad \mathrm{ESS}_t=\frac{1}{\sum_i (w_t^{(i)})^2}`,
    pre: [
      { q: "隨機波動率模型 $y_t = e^{h_t/2}\\varepsilon_t$、$h_t = \\mu + \\phi(h_{t-1}-\\mu) + \\sigma\\eta_t$ 為什麼不能直接用 Kalman filter？", a: "觀測方程對狀態 $h_t$ 是非線性的（透過 $e^{h_t/2}$ 進入變異數），濾波分配不再是高斯，平均與共變異數不足以描述它。取 $\\log y_t^2$ 線性化雖可用 Kalman filter，但雜訊變成 $\\log\\chi^2_1$，非高斯，只是近似（quasi-ML）。" },
      { q: "粒子濾波的權重為什麼會「退化」？", a: "重要性權重的變異數會隨時間累積，少數粒子拿走幾乎全部權重，有效樣本數急降；重抽樣可以緩解，但會造成路徑退化（過去的粒子祖先趨於相同）。" },
      { q: "把固定參數 $\\theta$ 也當成粒子的一部分，會發生什麼問題？", a: "因為 $\\theta$ 沒有動態，重抽樣後不同 $\\theta$ 值迅速消失，粒子集中到少數值上（參數退化）。Liu–West 用核平滑加收縮補充多樣性；Storvik 與 Particle Learning 則利用充分統計量，從條件後驗重新抽 $\\theta$。" }
    ],
    terms: [
      { zh: "粒子濾波", en: "particle filter / sequential Monte Carlo", m: "\\{x_t^{(i)},w_t^{(i)}\\}", d: "用加權樣本近似濾波分配的遞迴蒙地卡羅方法。" },
      { zh: "Bootstrap filter", en: "bootstrap filter", m: "", d: "用狀態轉移當提議分配，權重只需觀測密度的粒子濾波。" },
      { zh: "輔助粒子濾波", en: "auxiliary particle filter (APF)", m: "", d: "先依下一期觀測的預測概似挑選祖先，再傳播，降低權重變異。" },
      { zh: "重抽樣", en: "resampling", m: "", d: "依權重複製或淘汰粒子；常見有 multinomial、residual、systematic。" },
      { zh: "有效樣本數", en: "effective sample size (ESS)", m: "1/\\sum w_i^2", d: "衡量權重集中程度；常在低於門檻（如 N/2）時才重抽樣。" },
      { zh: "Liu–West 濾波", en: "Liu and West filter", m: "", d: "以收縮的核平滑為參數粒子補充多樣性，維持平均與變異數不變。" },
      { zh: "Particle Learning", en: "particle learning", m: "", d: "以充分統計量傳遞參數後驗，並採先重抽樣、後傳播的順序。" }
    ],
    practice: {
      intro: "粒子濾波的兩個基本數值技巧：計算有效樣本數，以及用 log-sum-exp 避免權重下溢。",
      items: [
        { q: "四個粒子的正規化權重為 0.1、0.2、0.3、0.4。有效樣本數 ESS 是多少？", a: 3.3333, tol: 0.001, hint: "1 / (0.01 + 0.04 + 0.09 + 0.16)" },
        { q: "三個粒子的未正規化對數權重為 0、−1、−2。第一個粒子的正規化權重是多少？", a: 0.6652, tol: 0.001, hint: "先減掉最大值，再算 1 / (1 + e⁻¹ + e⁻²)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "粒子濾波用一群加權樣本取代平均與變異數；它的精度取決於<b>權重是否退化</b>，而控制退化正是方法論的核心。" },
      { h: "Bootstrap filter 三步驟", b: R`(1) 傳播：$x_t^{(i)}\sim p(x_t\mid x_{t-1}^{(i)})$；(2) 加權：$w_t^{(i)}\propto p(y_t\mid x_t^{(i)})$；(3) 重抽樣。副產品是概似估計 $\hat p(y_t\mid y_{1:t-1}) = \frac1N\sum_i \tilde w_t^{(i)}$，它是<b>不偏</b>的，下一集 PMCMC 會用到這個性質。` },
      { h: "Monte Carlo 誤差怎麼量", b: "同一資料、不同亂數種子重跑 R 次，看估計值（狀態、對數概似、參數）的分散程度。參考書 Ch. 2 用這種方式比較 APF/BF 搭配核平滑或充分統計量的組合，並同時比較計算時間；評估方法時，精度與成本要一起報告。" },
      { h: "參數學習的兩條路", b: R`<b>核平滑（Liu–West）</b>：$\theta^{(i)} \leftarrow a\,\theta^{(i)} + (1-a)\bar\theta + \sqrt{1-a^2}\,V^{1/2}\epsilon$，其中 $a$ 由折扣因子 $\delta$ 決定（$a = (3\delta-1)/(2\delta)$），適用範圍廣，但長序列仍會漂移。<b>充分統計量（Storvik、Particle Learning）</b>：若條件後驗 $p(\theta\mid x_{0:t},y_{1:t})$ 只依賴低維充分統計量 $s_t$，就能每期重抽 $\theta$，較能抵抗退化，但只適用於共軛結構。` },
      { h: "實作檢查清單", b: "權重取對數並用 log-sum-exp；只在 ESS 低於門檻時重抽樣；用 systematic 或 residual 重抽樣降低變異；以模擬資料（已知真值）先驗證，再上真實資料；報告粒子數 N、重跑次數與計算時間。" },
      { h: UPD, b: `<ul><li><b>線上參數學習的退化已有定論</b>：把參數當成狀態一起濾波（Liu–West、Storvik、Particle Learning）在長序列上會有路徑退化與累積偏誤；${ref("Kantas et al. 2015", "https://doi.org/10.1214/14-STS511")} 是系統比較的地圖。${ref("SMC²（Chopin, Jacob &amp; Papaspiliopoulos 2013）", "https://doi.org/10.1111/j.1467-9868.2012.01046.x")} 在參數層再跑一層 SMC，提供精確近似的線上替代方案，代價是更多計算。</li><li><b>PMCMC 的狀態抽樣</b>：particle Gibbs 加入祖先重抽（PGAS），粒子很少時也能良好混合（${ref("Lindsten, Jordan &amp; Schön 2014", "https://jmlr.org/papers/v15/lindsten14a.html")}）。</li><li><b>擾動參數的新詮釋</b>：IF2 反覆執行逐步縮小擾動的粒子濾波，收斂到 MLE，把 Liu–West 式的人工動態變成最佳化工具（${ref("Ionides et al. 2015", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4311819")}）。</li><li><b>SV 的 MCMC 加速</b>：交替使用中心化與非中心化參數化（ASIS）大幅改善混合（${ref("Kastner &amp; Frühwirth-Schnatter 2014", "https://doi.org/10.1016/j.csda.2013.01.002")}）。</li><li><b>新標準教材</b>：${ref("Chopin &amp; Papaspiliopoulos 2020", "https://doi.org/10.1007/978-3-030-47845-2")} 以 Feynman–Kac 模型統一粒子濾波、平滑與 PMCMC，附 Python 套件 <code>particles</code>。</li></ul>` },
      { h: "延伸閱讀", b: `參考書 Ch. 1（粒子濾波與序列參數估計的綜述，含 PMCMC）、Ch. 2（Extended Liu–West filter 與 Markov switching SV）。${BOOK}` }
    ],
    quiz: [
      { q: "Bootstrap filter 的提議分配是？", o: ["觀測密度", "狀態轉移密度 $p(x_t\\mid x_{t-1})$", "最佳提議 $p(x_t\\mid x_{t-1},y_t)$", "均勻分配"], a: 1, w: "所以權重只剩觀測密度；簡單，但在觀測很有資訊時效率差。" },
      { q: "ESS 接近 1 代表？", o: ["權重很均勻", "幾乎所有權重集中在一個粒子", "粒子數太多", "模型完全正確"], a: 1, w: "這是嚴重退化的訊號，需要重抽樣或改善提議分配。" },
      { q: "Liu–West 濾波中的收縮步驟主要目的是？", o: ["加速運算", "補充參數多樣性的同時，避免核平滑讓後驗變異數膨脹", "讓參數變成時變", "取代重抽樣"], a: 1, w: "單純加噪會讓變異數膨脹；向平均收縮可以保持前兩階動差。" }
    ],
    next: "L8：PMCMC、regime switching、超高頻資料、高維崩潰……這些方法在哪裡失靈？2013 年之後學界又有哪些新答案？"
  },

  // ---------------------------------------------------------- EP8 · L8
  {
    no: 8, id: "u08", phase: 2, tier: "L8 領域專家｜學科前沿與未解爭點",
    title: "前沿與爭點：這本書之後發生了什麼",
    hook: "參考書停在 2013 年。之後十年，哪些做法被更正、哪些方法失靈、哪些問題至今還在吵？",
    tags: "PMCMC、correlated pseudo-marginal、SMC²、regime switching、COVID 離群值、局部化、HARQ、rough volatility、可微粒子濾波",
    status: "planned", estDur: "約 13 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "一本 2013 年的書，放在 2026 年讀" },
      { t: 70, title: "PMCMC：粒子要幾個才夠" },
      { t: 170, title: "線上參數學習：退化與 SMC²" },
      { t: 260, title: "Regime switching、離群值與 COVID 之後的總經模型" },
      { t: 370, title: "高維崩潰與局部化" },
      { t: 460, title: "高頻與波動：HARQ、rough volatility、Hawkes" },
      { t: 560, title: "模型與演算法的界線開始模糊" },
      { t: 660, title: "下一集：隱藏狀態真的存在嗎？" }
    ],
    formula: R`\alpha(\theta\to\theta')=\min\!\left\{1,\;\frac{\hat p_N(y_{1:T}\mid\theta')\,p(\theta')\,q(\theta\mid\theta')}{\hat p_N(y_{1:T}\mid\theta)\,p(\theta)\,q(\theta'\mid\theta)}\right\},\qquad \operatorname{sd}\!\big[\log\hat p_N(y_{1:T}\mid\theta)\big]\approx 1.2`,
    pre: [
      { q: "PMCMC 用的是「估計出來」的概似，為什麼抽樣結果仍然以正確的後驗為目標？", a: "因為粒子濾波的概似估計 $\\hat p_N(y\\mid\\theta)$ 是<b>不偏</b>的；把估計量的隨機性當成擴充變數，pseudo-marginal MH 的不變分配的邊際正好是 $p(\\theta\\mid y)$。代價是估計雜訊會讓鏈「黏住」，所以要調粒子數。" },
      { q: "粒子數越多越好嗎？", a: "不是。在固定計算預算下，應讓 log 概似估計量的標準差約 1.2（若精確概似的演算法本來就很有效率約 1.0，本來就很沒效率約 1.7）（Doucet et al. 2015）。若讓前後兩次估計使用正相關的亂數（correlated pseudo-marginal），所需粒子數不必隨資料長度 T 線性成長。" },
      { q: "COVID-19 期間的極端觀測，對總經狀態空間模型的教訓是什麼？", a: "常態衝擊加上平滑變動的隨機波動率不足以描述這種跳升；直接刪資料會低估預測不確定性。較好的做法是明確建模離群值或衝擊變異數的暴增與衰退（Lenza &amp; Primiceri 2022；Carriero et al. 2024）。" }
    ],
    terms: [
      { zh: "粒子 MCMC", en: "particle MCMC (PMCMC)", m: "\\hat p_N(y\\mid\\theta)", d: "以粒子濾波的不偏概似估計取代精確概似的 MCMC。" },
      { zh: "偽邊際方法", en: "pseudo-marginal method", m: "", d: "用不偏估計量代替目標密度，仍能得到正確不變分配的 MCMC 架構。" },
      { zh: "相關偽邊際", en: "correlated pseudo-marginal", m: "", d: "讓前後提議使用正相關的亂數，抵銷概似比的雜訊。" },
      { zh: "SMC²", en: "SMC squared", m: "", d: "參數層與狀態層各跑一層 SMC 的線上貝氏估計法。" },
      { zh: "區制轉換", en: "regime switching", m: "s_t\\in\\{1,\\dots,K\\}", d: "以離散 Markov 鏈描述經濟在不同狀態（如擴張與衰退）間切換。" },
      { zh: "局部化", en: "localization", m: "", d: "只讓鄰近觀測影響局部狀態，避免高維權重崩潰。" },
      { zh: "粗糙波動率", en: "rough volatility", m: "H\\approx 0.1", d: "對數波動行為像低 Hurst 指數的分數布朗運動，非有限維 Markov。" },
      { zh: "可微粒子濾波", en: "differentiable particle filter", m: "", d: "以連續的傳輸映射取代離散重抽樣，使濾波可對參數求梯度。" }
    ],
    practice: {
      intro: "區制轉換模型的兩個基本量。設經濟有「正常」與「危機」兩個區制，轉移機率為 $P(\\text{正常}\\to\\text{危機}) = p_{12}$、$P(\\text{危機}\\to\\text{正常}) = p_{21}$。",
      items: [
        { q: "若某區制留在原地的機率是 0.95，該區制的平均持續期是幾期？", a: 20, tol: 0.01, hint: "幾何分配：1 / (1 − 0.95)" },
        { q: "$p_{12} = 0.02$、$p_{21} = 0.10$。長期而言，經濟處於「危機」區制的機率是多少？", a: 0.1667, tol: 0.001, hint: "平穩分配：p₁₂ / (p₁₂ + p₂₁)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "2013 年後的進展大多不是推翻書中方法，而是<b>更正實作細節、量化計算預算、並在高維與極端事件中劃出失效邊界</b>。" },
      { h: "已被修正的做法", b: `<ul><li>TVP-VAR-SV 的 Gibbs 抽樣順序（${ref("Del Negro &amp; Primiceri 2015", "https://doi.org/10.1093/restud/rdv024")}），以及大型 BVAR-SV 三角化演算法的更正（${ref("Carriero et al. 2022", "https://doi.org/10.1016/j.jeconom.2021.11.010")}）。</li><li>粒子數不再憑經驗：以 log 概似估計量的標準差約 1.2 為目標（${ref("Doucet et al. 2015", "https://doi.org/10.1093/biomet/asu075")}），長序列改用 correlated pseudo-marginal（${ref("Deligiannidis, Doucet &amp; Pitt 2018", "https://doi.org/10.1111/rssb.12280")}）。這直接影響書中 Ch. 15 以 PMCMC 估計超高頻模型的可行性。</li><li>「高斯衝擊＋平滑 SV」不足以處理 COVID 期間的資料：${ref("Lenza &amp; Primiceri 2022", "https://doi.org/10.1002/jae.2895")}、${ref("Carriero, Clark, Marcellino &amp; Mertens 2024", "https://doi.org/10.1162/rest_a_01213")} 加入離群值成分。</li></ul>` },
      { h: "被新方法補強", b: `<ul><li><b>總經</b>：TVP 模型以收縮先驗讓資料決定哪些係數真的會變（${ref("Bitto &amp; Frühwirth-Schnatter 2019", "https://doi.org/10.1016/j.jeconom.2018.11.006")}）；多變量 UC-SV 估計趨勢通膨（${ref("Stock &amp; Watson 2016", "https://doi.org/10.1162/REST_a_00608")}）；時變長期成長的動態因子模型（Antolin-Diaz, Drechsel &amp; Petrella 2017, <i>REStat</i> 99(2)）。</li><li><b>非線性 DSGE</b>：tempered particle filter（${ref("Herbst &amp; Schorfheide 2019", "https://doi.org/10.1016/j.jeconom.2018.11.003")}）與 SMC 取樣器已進入標準教材（${ref("Herbst &amp; Schorfheide 2016", "https://press.princeton.edu/books/hardcover/9780691161082/bayesian-estimation-of-dsge-models")}）。</li><li><b>利率</b>：零利率下限讓殖利率曲線的觀測方程變成非線性，shadow-rate 模型應運而生（${ref("Wu &amp; Xia 2016", "https://doi.org/10.1111/jmcb.12300")}）；HMM 在金融的延伸見 ${ref("Mamon &amp; Elliott 2014", "https://doi.org/10.1007/978-1-4899-7442-6")}。</li></ul>` },
      { h: "失效邊界：高維", b: `標準粒子濾波所需粒子數隨維度指數成長，這是 2013 年前就知道的基準結果（${ref("Snyder et al. 2008", "https://doi.org/10.1175/2008MWR2529.1")}）。書中 Ch. 3 的 implicit filter 靠更好的提議分配對抗退化；2013 年後的主流轉向<b>局部化</b>：若相關性隨距離衰減，局部粒子濾波的誤差可與維度無關（${ref("Rebeschini &amp; van Handel 2015", "https://doi.org/10.1214/14-AAP1061")}），實務版本已在地球科學中運作（${ref("Poterjoy 2016", "https://doi.org/10.1175/MWR-D-15-0163.1")}；回顧見 ${ref("van Leeuwen et al. 2019", "https://doi.org/10.1002/qj.3551")}）。` },
      { h: "仍在爭論：波動與高頻", b: `<ul><li>已實現波動是真實波動還是帶雜訊的觀測？HARQ 選擇後者（${ref("Bollerslev, Patton &amp; Quaedvlieg 2016", "https://doi.org/10.1016/j.jeconom.2015.10.007")}）；負報酬的半變異對未來波動的預測力較強（${ref("Patton &amp; Sheppard 2015", "https://doi.org/10.1162/REST_a_00503")}）。</li><li>波動是長記憶還是「粗糙」？rough volatility 認為表面的長記憶可能是粗糙性造成的假象，而且無法寫成有限維 Markov 狀態（${ref("Gatheral, Jaisson &amp; Rosenbaum 2018", "https://doi.org/10.1080/14697688.2017.1393551")}）。</li><li>超高頻資料要用「隱藏價格＋點過程觀測」的非線性濾波（書中 Ch. 13、15），還是觀測驅動的 Hawkes 點過程（${ref("Bacry et al. 2015", "https://doi.org/10.1142/S2382626615500057")}）？兩條路線並存。</li></ul>` },
      { h: "仍在爭論：模型 vs 演算法", b: `可微粒子濾波（${ref("Jonschkowski et al. 2018", "https://arxiv.org/abs/1805.11122")}；${ref("Corenflos et al. 2021", "https://arxiv.org/abs/2102.07850")}）、variational SMC（${ref("Naesseth et al. 2018", "https://proceedings.mlr.press/v84/naesseth18a.html")}）與深度生成式 SSM 讓轉移與觀測方程由資料學出。爭點在於：經濟學需要的是<b>可解釋的結構</b>，而這些方法交換的是預測彈性；兩者如何取捨，尚無共識。` },
      { h: "延伸閱讀", b: `參考書 Ch. 3（implicit particle filters）、Ch. 8–12（HMM 與 regime switching 在信用、殖利率曲線與數理金融的應用）、Ch. 13–15（超高頻資料）。完整查證清單見本系列的研究筆記。${BOOK}` }
    ],
    quiz: [
      { q: "依 Doucet et al.（2015），在固定計算預算下，PMCMC 的粒子數應該如何選擇？", o: ["越多越好", "讓 log 概似估計量的標準差約 1.2", "固定為 100", "讓接受率等於 1"], a: 1, w: "粒子太少鏈會黏住，太多則浪費計算；最適點約在標準差 1.2。" },
      { q: "局部化粒子濾波能對抗維度詛咒的前提是？", o: ["觀測沒有雜訊", "狀態之間的相關性隨距離衰減", "模型是線性高斯", "粒子數無限大"], a: 1, w: "Rebeschini &amp; van Handel（2015）的理論結果依賴這種空間衰減結構，代價是引入一些偏誤。" },
      { q: "Rough volatility 對傳統隨機波動率狀態空間模型的挑戰是？", o: ["波動率不存在", "對數波動行為像低 Hurst 指數的分數布朗運動，無法寫成有限維 Markov 狀態", "波動率可以直接觀測", "只適用於日資料"], a: 1, w: "這挑戰了「狀態是一階 Markov」這個狀態空間模型的基本假設。" }
    ],
    next: "L9A：產出缺口、波動率、整個財富分布……隱藏狀態是世界裡的東西，還是我們選擇的座標？"
  },

  // ---------------------------------------------------------- EP9 · L9A
  {
    no: 9, id: "u09", phase: 3, tier: "L9A 典範開創者｜本體論與公設重構",
    title: "隱藏狀態真的存在嗎？",
    hook: "產出缺口、自然利率、波動率……它們是世界裡的「東西」，還是我們為了說故事而發明的座標？",
    tags: "本體論、潛在變數、可識別性、觀測等價、模型不確定性、Lucas critique、Markov 表示",
    status: "planned", estDur: "約 11 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "回到窗簾後的小貓" },
      { t: 70, title: "實在論與工具論：兩種看待隱藏狀態的方式" },
      { t: 170, title: "觀測等價：不同故事、同一份資料" },
      { t: 290, title: "可識別性與模型不確定性" },
      { t: 400, title: "Lucas critique：當狀態會回應政策" },
      { t: 500, title: "狀態是一種表示選擇" },
      { t: 600, title: "下一集：同一個迴圈為什麼到處都是" }
    ],
    formula: R`y_t=\mu_t+\varepsilon_t,\;\mu_t=\mu_{t-1}+\eta_t \;\Longrightarrow\; \Delta y_t=\eta_t+\varepsilon_t-\varepsilon_{t-1},\quad \rho_1=-\frac{H}{Q+2H}`,
    pre: [
      { q: "兩個結構完全不同的狀態空間模型，可能產生完全相同的觀測資料分配嗎？", a: "可能。例如任何可逆線性轉換 $\\alpha_t^* = A\\alpha_t$ 都給出同樣的 $y_t$ 分配（狀態座標不唯一）；local level model 也與一個 ARIMA(0,1,1) 觀測等價。資料只能決定「可識別的部分」，其餘來自假設。" },
      { q: "如果隱藏狀態的「單位」或「座標」可以任意旋轉，那它還有意義嗎？", a: "有，但意義來自<b>識別限制與理論</b>，而不是資料本身。例如因子模型需要正規化才能解讀因子；產出缺口的意義則來自它與通膨的經濟關係（Phillips 曲線）。" },
      { q: "政策改變時，估計出來的狀態方程還會成立嗎？", a: "不一定。若狀態方程的參數反映的是人們對舊政策的反應（而非深層結構），政策一變參數就會改變，這就是 Lucas critique；它要求我們區分「結構」與「簡化式」的狀態。" }
    ],
    terms: [
      { zh: "潛在變數", en: "latent variable", m: "\\alpha_t", d: "模型中無法直接觀測、只能由資料推論的變數。" },
      { zh: "觀測等價", en: "observational equivalence", m: "", d: "不同參數或結構產生相同觀測分配，資料無法分辨。" },
      { zh: "可識別性", en: "identifiability", m: "", d: "參數能否由觀測分配唯一決定的性質。" },
      { zh: "狀態座標的不唯一性", en: "non-uniqueness of state representation", m: "\\alpha^*_t=A\\alpha_t", d: "對狀態做可逆轉換、同步調整系統矩陣，觀測分配不變。" },
      { zh: "模型不確定性", en: "model uncertainty", m: "p(M_k\\mid y)", d: "對模型本身（而非只對參數或狀態）抱持的不確定。" },
      { zh: "Lucas critique", en: "Lucas critique", m: "", d: "簡化式關係會隨政策規則改變，不能直接用來評估新政策。" }
    ],
    practice: {
      intro: "local level model 的一階差分 $\\Delta y_t$ 是 MA(1)，其一階自相關為 $\\rho_1 = -H/(Q+2H)$。不同的 $(Q, H)$ 組合會留下不同的「指紋」。",
      items: [
        { q: "$Q = 1$、$H = 1$ 時，$\\rho_1$ 是多少？", a: -0.3333, tol: 0.001, hint: "−1/(1+2)" },
        { q: "$Q = 4$、$H = 1$ 時，$\\rho_1$ 是多少？", a: -0.1667, tol: 0.001, hint: "−1/(4+2)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "隱藏狀態的「存在」由兩部分組成：資料能識別的部分，以及我們選擇的理論座標。好的研究會說清楚哪一部分是哪一個。" },
      { h: "實在論 vs 工具論", b: "實在論把產出缺口、波動率看成世界裡真實存在、只是看不見的量；工具論把它們看成讓預測與決策更好的建構。狀態空間模型本身是中立的：同一組濾波結果，可以支持任一種詮釋，但兩者對「模型錯了怎麼辦」的回應不同。" },
      { h: "觀測等價的具體例子", b: R`local level model 的 $\Delta y_t$ 只有一個非零自相關 $\rho_1 = -H/(Q+2H) \in [-\tfrac12, 0]$。它和一個 ARIMA(0,1,1) 的簡化式一一對應：只看 $y_t$，你無法分辨「真有一個在漫步的水準」和「只是一個 MA 誤差結構」。結構詮釋必須額外承諾。` },
      { h: "模型不確定性與狀態不確定性", b: "參考書 Ch. 4 把兩者並列：我們不只不確定狀態的值，也不確定哪一個模型才對。把模型本身也當成一個隱藏（離散）狀態，就走向 regime switching、模型平均或 Bayesian model averaging；這是從「估計狀態」升級到「估計世界的結構」。" },
      { h: "Markov 化是一種選擇", b: "幾乎任何有限記憶的動態系統，都能透過擴充狀態向量（把過去的值、參數、regime 都放進去）寫成一階 Markov 的狀態空間形式。所以「狀態」不是被發現的，而是被設計來讓過去的資訊壓縮成充分統計量。這也是 L9B 要談的普適性來源。" },
      { h: UPD, b: `<ul><li><b>狀態可以是一整個分布</b>：異質代理人（HANK）模型的狀態包含整個財富分布，維度極高，已能以概似法估計（${ref("Bayer, Born &amp; Luetticke 2024", "https://doi.org/10.1257/aer.20201875")}）。「狀態」從少數總體變數擴張成函數。</li><li><b>狀態不一定是 Markov 的</b>：對數波動的行為像 Hurst 指數約 0.1 的分數布朗運動（rough volatility），無法放進有限維 Markov 的狀態空間；表面上的長記憶可能只是粗糙性造成的假象（${ref("Gatheral, Jaisson &amp; Rosenbaum 2018", "https://doi.org/10.1080/14697688.2017.1393551")}）。</li><li><b>濾波就是測度的演化</b>：在 Feynman–Kac 觀點下，粒子濾波近似的是一列機率測度，粒子只是表示工具（${ref("Chopin &amp; Papaspiliopoulos 2020", "https://doi.org/10.1007/978-3-030-47845-2")}）。</li><li><b>趨勢與循環不是被觀測到的事實</b>，而是在特定 SSM 設定下的推論結果（${ref("Hamilton 2018", "https://doi.org/10.1162/rest_a_00706")}；${ref("Stock &amp; Watson 2016", "https://doi.org/10.1162/REST_a_00608")}）。</li></ul>` },
      { h: "延伸閱讀", b: `參考書 Ch. 4（Model Uncertainty, State Uncertainty, and State-Space Models）。${BOOK}` }
    ],
    quiz: [
      { q: "對狀態做可逆線性轉換 $\\alpha^*_t = A\\alpha_t$ 並同步調整系統矩陣後，觀測分配會？", o: ["改變", "不變", "變成非高斯", "變得不可估計"], a: 1, w: "這就是狀態座標不唯一，必須用識別限制來固定。" },
      { q: "Lucas critique 對狀態空間建模的主要提醒是？", o: ["不要用 Kalman filter", "簡化式的狀態方程參數可能隨政策規則改變", "狀態一定可觀測", "參數越多越好"], a: 1, w: "評估新政策需要深層結構，而不是舊政策下估出的簡化式。" },
      { q: "把模型本身也當成隱藏狀態，對應的是？", o: ["線性化", "模型不確定性的處理，例如 regime switching 或模型平均", "增加觀測雜訊", "移除平滑器"], a: 1, w: "這把不確定性從「狀態的值」推到「世界的結構」。" }
    ],
    next: "L9B：抽掉經濟學這個載體，預測—更新迴圈在氣象、導航、神經科學與 AI 序列模型裡都長得一樣。為什麼？"
  },

  // ---------------------------------------------------------- EP10 · L9B
  {
    no: 10, id: "u10", phase: 3, tier: "L9B 跨界同構者｜普適數學結構",
    title: "預測—更新迴圈的普適結構",
    hook: "天氣預報、GPS、大腦的知覺、語音辨識和最新的 AI 序列模型，為什麼都在跑同一個迴圈？",
    tags: "貝氏更新、遞迴最小平方、控制對偶、資料同化、預測編碼、HMM、狀態空間序列模型",
    status: "planned", estDur: "約 12 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "抽掉載體，只留下結構" },
      { t: 70, title: "Kalman = 高斯貝氏更新 = 遞迴最小平方" },
      { t: 180, title: "估計與控制的對偶" },
      { t: 280, title: "氣象資料同化與導航" },
      { t: 380, title: "離散狀態：HMM 與 regime switching" },
      { t: 470, title: "大腦與 AI：預測編碼與狀態空間序列模型" },
      { t: 590, title: "下一集：極限與取捨" }
    ],
    formula: R`\underbrace{p(x_t\mid y_{1:t})}_{\text{後驗}} \;\propto\; \underbrace{p(y_t\mid x_t)}_{\text{概似}} \int \underbrace{p(x_t\mid x_{t-1})}_{\text{動態}}\,\underbrace{p(x_{t-1}\mid y_{1:t-1})}_{\text{前一期後驗}}\,dx_{t-1}`,
    pre: [
      { q: "Kalman filter、HMM 的 forward algorithm、粒子濾波，共同的數學骨架是什麼？", a: "都是貝氏濾波遞迴：用狀態轉移把前一期後驗推成預測分配（Chapman–Kolmogorov），再用觀測概似做貝氏更新。差別只在狀態是連續高斯（Kalman）、離散有限（HMM）還是一般分配（粒子）。" },
      { q: "「估計看不見的狀態」和「控制系統到目標」為什麼數學上是對偶的？", a: "線性二次高斯（LQG）問題中，Kalman filter 的 Riccati 方程與 LQR 控制器的 Riccati 方程在轉置與時間反轉下形式相同；估計誤差的最小化與控制成本的最小化共享同一個二次結構。" },
      { q: "給一個非經濟學、但也在跑「預測→觀測→修正」的例子。", a: "氣象資料同化（用數值模式預測，再用衛星與測站資料修正）、GPS／慣性導航融合、大腦的預測編碼假說、語音辨識的 HMM。" }
    ],
    terms: [
      { zh: "貝氏濾波", en: "Bayesian filtering", m: "p(x_t\\mid y_{1:t})", d: "以「預測—更新」遞迴計算狀態後驗分配的一般架構。" },
      { zh: "遞迴最小平方", en: "recursive least squares (RLS)", m: "", d: "逐筆更新迴歸係數的演算法；等同於狀態固定的 Kalman filter。" },
      { zh: "估計—控制對偶", en: "estimation–control duality", m: "", d: "Kalman filter 與 LQR 的 Riccati 方程互為對偶。" },
      { zh: "資料同化", en: "data assimilation", m: "", d: "把觀測融入數值模式狀態的方法，氣象與海洋學的核心。" },
      { zh: "隱馬可夫模型", en: "hidden Markov model (HMM)", m: "s_t\\in\\{1,\\dots,K\\}", d: "隱藏狀態為離散 Markov 鏈的狀態空間模型。" },
      { zh: "預測編碼", en: "predictive coding", m: "", d: "神經科學假說：大腦持續預測感官輸入，並以預測誤差更新內部模型。" },
      { zh: "同構", en: "isomorphism", m: "", d: "不同領域的系統共享相同的數學結構，可互相轉譯。" }
    ],
    practice: {
      intro: "把 Kalman 更新看成兩個高斯的貝氏合併：先驗 $x\\sim N(10, 4)$，觀測 $y = 14$，觀測雜訊變異數 4。",
      items: [
        { q: "後驗平均是多少？", a: 12, tol: 0.01, hint: "精度加權：(10/4 + 14/4) / (1/4 + 1/4)" },
        { q: "後驗變異數是多少？", a: 2, tol: 0.01, hint: "1 / (1/4 + 1/4)" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "<b>預測（動態）＋更新（概似）＝後驗</b>。換掉狀態的型態、換掉計算方法，這個迴圈在每個領域都一樣。" },
      { h: "三種寫法，一個結構", b: R`(1) 貝氏：精度相加 $1/P^+ = 1/P + 1/R$，平均以精度加權。(2) 最小平方：最小化 $(x-\hat x^-)^2/P + (y-x)^2/R$。(3) Kalman：$\hat x = \hat x^- + K(y-\hat x^-)$，$K = P/(P+R)$。三者在高斯線性下完全相同。` },
      { h: "同構對照表", b: `<table class="gl"><tr><th>領域</th><th>隱藏狀態</th><th>觀測</th><th>迴圈</th></tr><tr><td>總體經濟</td><td>產出缺口、趨勢通膨</td><td>GDP、CPI</td><td>Kalman／MCMC</td></tr><tr><td>金融</td><td>波動率、regime</td><td>報酬、成交</td><td>粒子濾波、HMM</td></tr><tr><td>氣象</td><td>大氣場</td><td>衛星、測站</td><td>EnKF、4D-Var</td></tr><tr><td>導航</td><td>位置、速度</td><td>GPS、IMU</td><td>EKF</td></tr><tr><td>神經科學</td><td>外界成因</td><td>感官訊號</td><td>預測編碼（假說）</td></tr><tr><td>語音</td><td>音素序列</td><td>聲學特徵</td><td>HMM forward–backward</td></tr></table>` },
      { h: "結構的不變量", b: "跨領域保留下來的量只有幾個：訊號雜訊比（決定增益）、預測誤差（驅動學習）、不確定性的傳播與收縮（P 的增減）、以及時間尺度（狀態變動多快）。抓住這四個，就能把一個領域的直覺移植到另一個領域。" },
      { h: UPD, b: `<ul><li><b>從先驗連續走到後驗</b>：經濟學的 tempered particle filter（${ref("Herbst &amp; Schorfheide 2019", "https://doi.org/10.1016/j.jeconom.2018.11.003")}）、工程的 particle flow／homotopy（${ref("Daum &amp; Huang 2007", "https://doi.org/10.1117/12.725684")}；${ref("Bunch &amp; Godsill 2016", "https://doi.org/10.1080/01621459.2015.1038387")}）、機器學習的最佳傳輸重抽樣（${ref("Corenflos et al. 2021", "https://arxiv.org/abs/2102.07850")}）與控制理論的 controlled SMC（${ref("Heng et al. 2020", "https://doi.org/10.1214/19-AOS1914")}），骨架相同。particle flow 在經濟學的直接應用目前仍少見。</li><li><b>局部性</b>：氣象資料同化的局部化粒子濾波（${ref("Poterjoy 2016", "https://doi.org/10.1175/MWR-D-15-0163.1")}）與「相關性隨距離衰減」的理論保證（${ref("Rebeschini &amp; van Handel 2015", "https://doi.org/10.1214/14-AAP1061")}），和空間計量、網路模型共享同一個數學結構。</li><li><b>參數驅動 vs 觀測驅動</b>：GAS 模型以縮放後的 score 更新時變參數，不需濾波，形式上就像一步 Kalman 更新（${ref("Creal, Koopman &amp; Lucas 2013", "https://doi.org/10.1002/jae.1279")}）；高頻的 Hawkes 點過程屬於同一種精神（${ref("Bacry et al. 2015", "https://doi.org/10.1142/S2382626615500057")}）。</li><li><b>同構但不同義</b>：S4 把連續時間線性系統 $x' = Ax + Bu$ 當作神經網路的序列層（${ref("Gu, Goel &amp; Ré 2022", "https://arxiv.org/abs/2111.00396")}）；Mamba 讓轉移參數依輸入而變（${ref("Gu &amp; Dao 2023", "https://arxiv.org/abs/2312.00752")}），形式上接近 TVP 與 regime switching，但目的是序列特徵轉換，不是推論隱藏狀態。</li></ul>` },
      { h: "延伸閱讀", b: `參考書 Ch. 3（implicit particle filters 用於資料同化，連接統計與地球科學）。${BOOK}` }
    ],
    quiz: [
      { q: "遞迴最小平方（RLS）可以看成哪一種 Kalman filter 的特例？", o: ["狀態雜訊 Q = 0（係數固定）", "觀測雜訊 R = 0", "非線性觀測", "離散狀態"], a: 0, w: "係數不隨時間變動時，Kalman filter 退化為 RLS。" },
      { q: "HMM 的 forward algorithm 與 Kalman filter 的主要差別是？", o: ["HMM 沒有更新步驟", "HMM 的狀態是離散的，積分變成加總", "Kalman 不需要動態方程", "兩者毫無關係"], a: 1, w: "同一個貝氏遞迴，只是狀態空間從連續變成有限集合。" },
      { q: "LQG 問題中，估計與控制的「對偶」指的是？", o: ["兩者答案相反", "兩者的 Riccati 方程形式互為轉置與時間反轉", "控制器不需要估計", "只有離散時間才成立"], a: 1, w: "這是 Kalman（1960）就指出的結構性對稱。" }
    ],
    next: "L9C：粒子數、維度、即時性、可解釋性……在計算與資料的物理極限下，機構應該怎麼選擇狀態空間工具？"
  },

  // ---------------------------------------------------------- EP11 · L9C
  {
    no: 11, id: "u11", phase: 3, tier: "L9C 戰略架構師｜極限、取捨與路線圖",
    title: "極限、取捨與路線圖",
    hook: "維度一高，粒子數就爆炸；要即時，就得犧牲精度。央行、交易室與 AI 團隊各自該怎麼押注？",
    tags: "維度詛咒、計算成本、即時性、模型風險、取捨、路線圖、費曼閉環",
    status: "planned", estDur: "約 11 分鐘", segWord: "小節",
    sections: [
      { t: 0, title: "從小貓到整個經濟體" },
      { t: 70, title: "計算天花板：O(n³) 與維度詛咒" },
      { t: 180, title: "取捨一：即時性 vs 精確度" },
      { t: 280, title: "取捨二：可解釋性 vs 彈性" },
      { t: 380, title: "三種機構的選擇：央行、交易室、AI 團隊" },
      { t: 490, title: "模型風險治理" },
      { t: 570, title: "費曼閉環：回到窗簾後的小貓" }
    ],
    formula: R`\underbrace{O(n^3)}_{\text{Kalman：狀態維度 } n} \quad\text{vs}\quad \underbrace{N \sim e^{c\,d}}_{\text{標準粒子濾波：維度 } d}`,
    pre: [
      { q: "為什麼高維系統很難直接用標準粒子濾波？", a: "要避免權重崩潰，所需粒子數大致隨（有效）維度指數成長；高維時幾乎所有粒子權重趨近 0。實務上要靠結構（線性子結構的 Rao–Blackwell 化、局部化、ensemble 方法）而不是硬加粒子。" },
      { q: "即時性與精確度的取捨，在交易室和央行有什麼不同？", a: "交易室的時間尺度是毫秒到分鐘，偏好低延遲、可遞迴的濾波（常用線性或近似方法）；央行的決策週期是數週，可以承擔 MCMC、平滑與模型比較的計算成本，但更在意可解釋與穩健。" },
      { q: "「模型風險」在狀態空間模型中具體指什麼？", a: "模型設定錯誤（動態、雜訊分配、regime）、參數不穩定、數值近似誤差（粒子數不足）與資料問題（修正、離群值）造成的決策損失；需要靠回測、壓力情境、多模型比較與不確定性報告來治理。" }
    ],
    terms: [
      { zh: "維度詛咒", en: "curse of dimensionality", m: "", d: "所需樣本或計算量隨維度指數成長的現象。" },
      { zh: "Rao–Blackwell 化", en: "Rao–Blackwellization", m: "", d: "對可解析的子結構（如條件線性高斯）用 Kalman 精確積分，只對其餘部分用粒子。" },
      { zh: "局部化", en: "localization", m: "", d: "只讓鄰近觀測影響局部狀態，以緩解高維濾波的崩潰。" },
      { zh: "延遲", en: "latency", m: "", d: "從資料到達到產出估計所需的時間。" },
      { zh: "模型風險", en: "model risk", m: "", d: "因模型錯誤或誤用而造成損失的風險。" },
      { zh: "技術路線圖", en: "technology roadmap", m: "", d: "依時間排序的能力投資與里程碑規劃。" }
    ],
    practice: {
      intro: "用兩個簡化的尺度法則估計計算成本（實際常數依實作而異，這裡只看比例）。",
      items: [
        { q: "Kalman filter 每步成本約與狀態維度的三次方成正比。狀態維度從 100 增加到 1000，每步成本約變成幾倍？", a: 1000, tol: 0.5, hint: "(1000/100)³" },
        { q: "假設某問題中，標準粒子濾波每多一個有效維度，維持同樣 ESS 所需粒子數乘以 3。從 0 維增加到 10 維，所需粒子數變成幾倍？", a: 59049, tol: 0.5, hint: "3¹⁰（這是教學用的假設倍率，用來體會指數成長）" }
      ]
    },
    notes: [
      { h: "一句話記住", b: "狀態空間工具的選擇，是在<b>維度、延遲、精度、可解釋性</b>四個極限之間配置資源；沒有一種方法在四個方向同時最好。" },
      { h: "工具光譜", b: "由便宜到昂貴：線性 Kalman → EKF／UKF → Rao–Blackwell 化粒子濾波 → 標準粒子濾波 → PMCMC 與 SMC 類完整貝氏估計。由可解釋到高彈性：結構總經模型 → 簡化式 SSM → 深度學習式的狀態空間模型。機構應依決策週期與錯誤成本選位置，而不是追最新方法。" },
      { h: "三種機構的配置", b: "<b>央行</b>：決策週期長、錯誤成本高、需要對外溝通 → 結構化 SSM＋完整不確定性報告＋多模型比較。<b>交易室</b>：延遲敏感、可快速回測 → 遞迴、低維、可線上更新的濾波，嚴格監控模型漂移。<b>AI／資料團隊</b>：資料量大、可接受黑盒 → 高彈性序列模型，但需用簡單 SSM 當基準與健全性檢查。" },
      { h: "費曼閉環", b: "回到 L1：小貓躲在窗簾後，你一邊猜、一邊聽、一邊改。L9 的所有結論都只是在回答三個問題：<b>要記住多少過去（狀態）、要多相信新聲音（增益）、以及願意花多少力氣去聽（計算）</b>。" },
      { h: UPD, b: `<ul><li><b>計算預算是戰略決策</b>：PMCMC 的粒子數可依 log-likelihood 估計量的標準差（約 1.2）調校（${ref("Doucet et al. 2015", "https://doi.org/10.1093/biomet/asu075")}）；correlated pseudo-marginal 讓粒子數不必隨資料長度線性成長（${ref("Deligiannidis, Doucet &amp; Pitt 2018", "https://doi.org/10.1111/rssb.12280")}）；也有工作論文以神經網路近似粒子濾波概似，讓非線性 HANK 估得起（${ref("Kase, Melosi &amp; Rottner 2025, BIS WP", "https://www.bis.org/publ/work1241.pdf")}）。</li><li><b>可重現性與更正文化</b>：兩個主流 SV-VAR 演算法都在發表後被更正（${ref("Del Negro &amp; Primiceri 2015", "https://doi.org/10.1093/restud/rdv024")}；${ref("Carriero et al. 2022", "https://doi.org/10.1016/j.jeconom.2021.11.010")}）。政策用模型應公開程式碼並建立獨立重現機制。</li><li><b>結構斷點的治理</b>：紐約聯準會 2023 年重啟 Staff Nowcast 時加入 COVID 因子（${ref("Liberty Street Economics 2023", "https://libertystreeteconomics.newyorkfed.org/2023/09/reintroducing-the-new-york-fed-staff-nowcast")}），說明政策模型需要預先設計好「異常期間」的應變流程。</li><li><b>AI 與傳統 SSM 的分工</b>：深度 SSM 擅長大規模預測（${ref("Rangapuram et al. 2018", "https://papers.nips.cc/paper/2018/hash/5cf68969fb67aa6082363a6d4e6468e2-Abstract.html")}），傳統 SSM 擅長可解釋的結構推論；KalmanNet 這類混合路線是務實選項（${ref("Revach et al. 2022", "https://doi.org/10.1109/TSP.2022.3158588")}）。</li></ul>` },
      { h: "延伸閱讀", b: `參考書全書；特別是 Ch. 1（方法綜述）、Ch. 3（高維資料同化）、Ch. 13–15（超高頻資料的計算挑戰）。${BOOK}` }
    ],
    quiz: [
      { q: "面對高維狀態，下列哪一個策略最能緩解粒子濾波的崩潰？", o: ["把粒子數線性增加", "利用條件線性結構做 Rao–Blackwell 化或局部化", "移除重抽樣", "把觀測雜訊設成 0"], a: 1, w: "靠結構降低需要用樣本處理的有效維度。" },
      { q: "對延遲極度敏感的交易應用，較合理的選擇是？", o: ["每次重跑完整 PMCMC", "低維、遞迴、可線上更新的濾波", "只用全樣本平滑器", "不做任何濾波"], a: 1, w: "平滑與完整 MCMC 需要未來資料或大量計算，不適合即時。" },
      { q: "費曼閉環中的「增益」對應到小貓故事的哪個部分？", o: ["小貓跑多快", "要多相信新聽到的聲音", "窗簾的顏色", "房間有多大"], a: 1, w: "增益 K 就是「多相信新線索」的比例。" }
    ],
    next: "系列完結。回到首頁的動畫，親手拉動 Q/R，看看自己現在能用幾個層級解釋增益 K 的變化。"
  }
];
