// メンバーのデータを管理するファイルです。
// 新しいメンバーを追加する場合は、この配列の中に { ... } のブロックを追加してください。
const linkData = [
    {
        name: "mango_pudding03",
        avatar: { src: "./img/link/mango.jpg" },
        title: "キャリア相談 / 40代からの選び直し",
        tags: ["tabelab", "shinri"],
        desc: "走り続けている間に、自分のことが見えなくなった人へ。キャリアも、子どもの進路も、働き方も。選ぶ前に、まず整理する。人材業界18年・国家資格キャリコン10年。副業で3年間、週末にキャリア相談を続けてきました。AIも使いながら、40代からの選び直しを考えています。"
    },
    {
        name: "キャリコンみやび",
        avatar: { src: "./img/link/miyabi.webp" },
        title: "キャリアコンサルタント",
        tags: ["tabelab", "shinri"],
        desc: "はじめまして、キャリアコンサルタントのみやびです。会社員、高校生の母として日々奮闘中。2級技能士や国家資格キャリアコンサルタントの受験対策、50代の転職記録などを発信。X | https://x.gd/j3PZ1　音声配信 | https://x.gd/VQl73",
        links: { x: "https://x.gd/j3PZ1" }
    },
    {
        name: "ゆうり＠大学キャリアセンターの人",
        avatar: { src: "./img/link/yuuri.webp" },
        title: "大学キャリアセンター / 学生支援",
        tags: ["tabelab"],
        desc: "大学キャリアセンターで年間2000件くらい学生面談してた人。大手有名企業に絶対内定！みたいなテクニックは教えられません。後悔しない就活。6歳&1歳のママ。学生のキャリア支援をしたい方向きにKindle、note書きました。"
    },
    {
        name: "けー。お花カウンセリング",
        certification: "🌈RIESM™アンバサダー / AMB-001",
        location: "オンライン中心",
        workshopCount: 0,
        avatar: { src: "./img/link/kei.png" },
        title: "カウンセラー / フラワーカウンセリング",
        tags: ["tabelab", "shinri", "riesm"],
        desc: "カウンセラーの「けー。」です🌟 実は、華道の師範💛🌸 心のケアって大切。お花を取り入れた「フラワーカウンセリング」を考案中🤔 ninin2024でアカウントを持っていて、現役のカウンセラーもやっています。365日の花言葉【お花_ 癒しの心理学】も発信しています。",
        links: { note: "https://note.com/ninin2024/n/n4d4751498466" }
    },
    {
        name: "こぐみ",
        avatar: { src: "./img/link/kogumi.webp" },
        title: "キャリアコンサルタント / 福祉系職員",
        tags: ["tabelab", "shinri"],
        desc: "他人に支配され自分を置き去りにし続けた結婚生活。モラハラ夫から逃げるように家出し、約1年超の調停を経て離婚。徹底した見直しでストレス障害を2か月で克服。キャリアコンサルタント、栄養睡眠カウンセラー講座受講。最高の健康と自分軸で人生を再スタート。福祉系職員。"
    },
    {
        name: "ぎっしー｜春日部キャリア部 部長",
        avatar: { src: "./img/link/gissy.webp" },
        title: "春日部キャリア部 部長",
        tags: ["tabelab"],
        desc: "「このままでいいのかな？」春日部でキャリアに悩むあなたのためのコミュニティ「#春日部キャリア部」。毎週月曜、対話の場で強みを発見し、複業やスキルUPに挑戦しませんか？安心安全な場で仲間と共に一歩踏み出すあなたを全力で応援します。武里駅近くの「わたしの基地」で開催中。"
    },
    {
        name: "あかり| 1on1で生きやすい世界に🌏",
        avatar: { src: "./img/link/akari.webp" },
        title: "傾聴1on1 / 産業カウンセラー / キャリアコンサルタント",
        tags: ["tabelab"],
        desc: "傾聴1on1。どんな女性も明るく元気でいるために、こころのままに語れる場を週末限定で活動しています。産業カウンセラー×キャリアコンサルタント。小学生2人のワーママ。ママでありながら働くことの意義、自分らしく生きることも大切にしています。"
    },
    {
        name: "ころころまころん＠心理福祉",
        certification: "🌈RIESM™アンバサダー / AMB-004",
        location: "東京都",
        workshopCount: 0,
        avatar: { src: "./img/link/maron.webp" },
        title: "心理福祉",
        tags: ["tabelab", "riesm"],
        desc: "2000年に社会人になり、早20年が経ちました。選んだ道は、福祉～心理です。福祉系大学を出た私じゃなくても、福祉・心理の仕事を続けてこれた事。資格取得に向けて行ったこと。分野や業界が違っても、人に携わる仕事をしている人とゆるく繋がれればいいなと思い、書き綴っています。",
        linkDesc: "2000年に社会人になり、早20年が経ちました。選んだ道は、福祉～心理です。福祉系大学を出た私じゃなくても、福祉・心理の仕事を続けてこれた事。資格取得に向けて行ったこと。分野や業界が違っても、人に携わる仕事をしている人とゆるく繋がれればいいなと思い、書き綴っています。",
        ambassadorDesc: "自己理解が進むことで、物事の見方が拡がると思うので、多くの人に知ってもらいたいです。あなたの良さを一緒に見つけたいです。"
    },
    {
        name: "だーやま｜書いて、語るひと",
        certification: "🌈RIESM™アンバサダー / AMB-005",
        location: "オンライン中心",
        organization: "オフィスカタライバ",
        workshopCount: 0,
        avatar: { src: "./img/link/dayama.webp" },
        title: "書いて、語るひと",
        tags: ["tabelab", "riesm"],
        desc: "自分から見える世界を、内側で起こることも含めて書くことで語っています。noteのほか、ワークショップやセッション、Podcastなどでも「語ることで見えてくる景色」を探求中。",
        ambassadorDesc: "自分のことを自分の言葉で語れるようになる。そのためにこんなに最適な「自分の読み解き方」があるなら、活かさない手はないですね。自分を知って生きやすくなれば余裕が生まれて周りにも思いやりをもてる。この「世界をよくする流れ」に賛同・参加します！",
        applicationReason: "自分の言葉で自分を語れるようになる人を増やすのが私の使命なので。自分のことがわかれば生きやすくなって幸福度があがる。そのために自分の取扱説明書の精度をあげることはかなり有効だと思うので、RIESMが自己理解のインフラになるべく広めていく活動をしていきたいと思います。"
    },
    {
        name: "れい",
        certification: "🌈RIESM™アンバサダー / AMB-002",
        location: "オンライン中心",
        workshopCount: 0,
        avatar: { text: "れ", color: "trust" },
        title: "🌈RIESM™認定者",
        tags: ["riesm"],
        desc: "これからの活動も楽しみにしています。"
    },
    {
        name: "りんこ",
        certification: "🌈RIESM™アンバサダー / AMB-003",
        location: "広島県",
        workshopCount: 0,
        avatar: { text: "り", color: "warm" },
        title: "🌈RIESM™認定者",
        tags: ["riesm"],
        desc: "安心して自分らしく働ける文化を作っていきたい。"
    },
    {
        name: "まつだ⭐︎松田真弘",
        avatar: { src: "./img/link/matsuda.jpg" },
        title: "魂の共鳴、しなやかな一歩を願って",
        tags: ["shinri"],
        desc: "企業内で経営企画×キャリアコンサルタントとして組織改革に取り組んでいます。実務・経営層・管理職を問わずフラットに接し、多様な個人の価値観を大切にしながら、個人と企業戦略の整合を図り、自律性向上と組織強化の両立を目指しています。変化の時代に人と組織が「しなやかな一歩」を踏み出せるよう多角的に活動中です。文化芸術を愛し、人生の洞察と深い学びを得ることを大切にしています。みなさんとの、コラボ、ウェルカムですー！",
        qualifications: "国家資格キャリアコンサルタント / 産業カウンセラー / 2級キャリアコンサルティング技能士 / JCDA認定CDA / アスリートキャリアコーディネーター / ワークライフファシリテーター / 価値観ババ抜きインストラクター / 両立支援コーディネーター",
        links: { x: "https://x.com/aaaaaaaaaaedu_m?s=11&t=pt2H1x2UaNkPwaH23BlnVQ" }
    },
    {
        name: "コーチャ",
        avatar: { src: "./img/link/kocha.jpg" },
        title: "心に虹🌈のかかる毎日を。",
        tags: ["shinri"],
        desc: "人生後半の働き方と生き方を整えるセカンドキャリア支援の専門家。カウンセリングからキャリアコンサルティング、コーチングを一貫して提供する独自メソッド、『ハッピーライフレインボー🌈』を提供しています。",
        qualifications: "国家資格キャリアコンサルタント / 産業カウンセラー / 2級技能士 キャリアコンサルティング技能士2級 / 1級技能士 キャリアコンサルティング技能士1級 / 銀座コーチングスクール認定プロコーチ",
        links: { x: "https://x.com/xcoach_a" }
    },
    {
        name: "SHIHO",
        avatar: { src: "./img/link/shiho.jpeg" },
        title: "親子の対話からキャリアの芽を育むキャリアコンサルタント",
        tags: ["shinri"],
        desc: "国家資格キャリアコンサルタント・保育士。対話を通して、一人ひとりが自分の気持ちや価値観に気づき、自分らしい選択ができるよう支援しています。親子の対話、キャリア相談、キャリア・マネー教育を中心に活動しています。",
        qualifications: "国家資格キャリアコンサルタント",
        links: { 
            note: "https://note.com/siii_career",
            x: "https://x.com/siii__career",
            line: "https://lin.ee/U2BHx4o",
            instagram: "https://www.instagram.com/siii_manawel?igsh=YzRkeGJ1eHUxNmE5&utm_source=qr"
        }
    },
    {
        name: "竹島弘幸",
        avatar: { src: "./img/link/takeshima.jpg" },
        title: "REBOOOT代表",
        tags: ["shinri"],
        desc: "自分を再起動、組織を再起動、日本を再起動\n企業領域を中心にキャリアコンサルティングをしています",
        qualifications: "国家資格キャリアコンサルタント / 2級技能士 キャリアコンサルティング技能士2級 / 1級技能士 キャリアコンサルティング技能士1級",
        links: { 
            note: "https://note.com/reboot_career",
            x: "https://x.com/home",
            linkedin: "https://www.linkedin.com/in/%E5%BC%98%E5%B9%B8-%E7%AB%B9%E5%B3%B6-bb50b3147/"
        }
    }
];

// 共通データの公開口です。
// 各ページはここから必要な項目だけを選び、ページごとの表現で描画します。
const linkDataMeta = {
    version: "2026-07-06",
    communities: {
        tabelab: { label: "たべラボ", href: "https://note.com/ninin2025/membership" },
        riesm: { label: "🌈RIESM™", href: "https://ninin-cc.github.io/guide.html" },
        shinri: { label: "心理支援者の集い" }
    },
    linkTypes: ["note", "web", "x", "line", "linkedin", "instagram"]
};

window.NININ_LINK_DATA = linkData;
window.NININ_LINK_META = linkDataMeta;
window.linkData = linkData;
