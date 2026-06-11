// 心理学者バンク
// 五十音順・理論別一覧や受験別頻出リストは、この配列をもとに表示します。
const PSYCHOLOGIST_BANK = [
  {
    "id": "bandura",
    "sortKana": "はんでゅーら",
    "name": "バンデューラ",
    "displayName": "A.バンデューラ",
    "en": "Albert Bandura",
    "images": [
      "a_ban0.png",
      "a_ban1.png",
      "a_ban2.png",
      "a_ban3.png",
      "a_ban4.png"
    ],
    "topic": "自己効力感・社会的学習理論",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "ginzberg",
    "sortKana": "ぎんずばーぐ",
    "name": "ギンズバーグ",
    "displayName": "E.ギンズバーグ",
    "en": "Eli Ginzberg",
    "images": [
      "3_2ginz.png"
    ],
    "topic": "職業選択の発達理論",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "gelatt",
    "sortKana": "じぇらっと",
    "name": "ジェラット",
    "displayName": "H.B.ジェラット",
    "en": "Harry B. Gelatt",
    "images": [
      "2_1jerat.png"
    ],
    "topic": "積極的不確実性・意思決定",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "krumboltz",
    "sortKana": "くらんぼるつ",
    "name": "クランボルツ",
    "displayName": "J.D.クランボルツ",
    "en": "John D. Krumboltz",
    "images": [
      "s_cram1.png",
      "s_cram2.png"
    ],
    "topic": "計画的偶発性理論",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "savickas",
    "sortKana": "さびかす",
    "name": "サビカス",
    "displayName": "M.L.サビカス",
    "en": "Mark L. Savickas",
    "images": [
      "2_1savikas.png"
    ],
    "topic": "キャリア構築理論・ナラティブアプローチ",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "schein",
    "sortKana": "しゃいん",
    "name": "シャイン",
    "displayName": "E.H.シャイン",
    "en": "Edgar H. Schein",
    "images": [
      "s_shaine.png"
    ],
    "topic": "キャリア・アンカー",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "schlossberg",
    "sortKana": "しゅろすばーぐ",
    "name": "シュロスバーグ",
    "displayName": "N.K.シュロスバーグ",
    "en": "Nancy K. Schlossberg",
    "images": [
      "s_syuro.png",
      "s_syuro2.png"
    ],
    "topic": "トランジション理論・4S",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "super",
    "sortKana": "すーぱー",
    "name": "スーパー",
    "displayName": "D.E.スーパー",
    "en": "Donald E. Super",
    "images": [
      "s_super.png"
    ],
    "topic": "キャリア発達理論・ライフキャリアレインボー",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "hansen",
    "sortKana": "はんせん",
    "name": "ハンセン",
    "displayName": "L.S.ハンセン",
    "en": "L. Sunny Hansen",
    "images": [
      "s_hansen.png"
    ],
    "topic": "統合的人生設計（ILP）",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "parsons",
    "sortKana": "ぱーそんず",
    "name": "パーソンズ",
    "displayName": "F.パーソンズ",
    "en": "Frank Parsons",
    "images": [
      "s_parsons.png"
    ],
    "topic": "特性因子理論・職業指導",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "holland",
    "sortKana": "ほらんど",
    "name": "ホランド",
    "displayName": "J.L.ホランド",
    "en": "John L. Holland",
    "images": [
      "s_holand.png"
    ],
    "topic": "RIASEC・職業興味",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "deci",
    "sortKana": "でし",
    "name": "デシ",
    "displayName": "E.L.デシ",
    "en": "Edward L. Deci",
    "images": [
      "desi_raian.png"
    ],
    "topic": "自己決定理論・内発的動機づけ",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "frankl",
    "sortKana": "ふらんくる",
    "name": "フランクル",
    "displayName": "V.E.フランクル",
    "en": "Viktor E. Frankl",
    "images": [
      "frankl.png"
    ],
    "topic": "ロゴセラピー・意味への意志",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "rogers",
    "sortKana": "ろじゃーず",
    "name": "ロジャーズ",
    "displayName": "C.R.ロジャーズ",
    "en": "Carl Rogers",
    "images": [
      "r_0.png"
    ],
    "topic": "来談者中心療法・中核3条件",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "alderfer",
    "sortKana": "あるだふぁー",
    "name": "アルダファー",
    "displayName": "C.P.アルダファー",
    "en": "Clayton P. Alderfer",
    "images": [
      "s_ardafa.png"
    ],
    "topic": "ERG理論",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "bridges",
    "sortKana": "ぶりっじす",
    "name": "ブリッジス",
    "displayName": "W.ブリッジス",
    "en": "William Bridges",
    "images": [
      "s_bridges.png"
    ],
    "topic": "トランジション理論",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "erikson",
    "sortKana": "えりくそん",
    "name": "エリクソン",
    "displayName": "E.H.エリクソン",
    "en": "Erik H. Erikson",
    "images": [
      "s_ericsson.png"
    ],
    "topic": "心理社会的発達理論・アイデンティティ",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "ellis",
    "sortKana": "えりす",
    "name": "エリス",
    "displayName": "A.エリス",
    "en": "Albert Ellis",
    "images": [
      "s_eris.png"
    ],
    "topic": "論理療法・REBT・ABC理論",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "freud",
    "sortKana": "ふろいと",
    "name": "フロイト",
    "displayName": "S.フロイト",
    "en": "Sigmund Freud",
    "images": [
      "s_froit.png"
    ],
    "topic": "精神分析・防衛機制",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "herzberg",
    "sortKana": "はーずばーぐ",
    "name": "ハーズバーグ",
    "displayName": "F.ハーズバーグ",
    "en": "Frederick Herzberg",
    "images": [
      "s_hasebarg.png"
    ],
    "topic": "二要因理論・動機づけ",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "hall",
    "sortKana": "ほーる",
    "name": "ホール",
    "displayName": "D.T.ホール",
    "en": "Douglas T. Hall",
    "images": [
      "s_hole.png"
    ],
    "topic": "プロティアン・キャリア",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "gendlin",
    "sortKana": "じぇんどりん",
    "name": "ジェンドリン",
    "displayName": "E.T.ジェンドリン",
    "en": "Eugene T. Gendlin",
    "images": [
      "s_jendrin.png"
    ],
    "topic": "フォーカシング・フェルトセンス",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "carkhuff",
    "sortKana": "かーかふ",
    "name": "カーカフ",
    "displayName": "R.R.カーカフ",
    "en": "Robert R. Carkhuff",
    "images": [
      "s_kakaf.png"
    ],
    "topic": "ヘルピング・モデル",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "kokubu",
    "sortKana": "こくぶやすたか",
    "name": "國分康孝",
    "displayName": "國分康孝",
    "en": "Yasutaka Kokubu",
    "images": [
      "s_kokubu.png"
    ],
    "topic": "コーヒーカップ・モデル・構成的グループエンカウンター",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "maslow",
    "sortKana": "まずろー",
    "name": "マズロー",
    "displayName": "A.H.マズロー",
    "en": "Abraham H. Maslow",
    "images": [
      "s_masro.png"
    ],
    "topic": "欲求階層説・自己実現",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "perls",
    "sortKana": "ぱーるず",
    "name": "パールズ",
    "displayName": "F.パールズ",
    "en": "Fritz Perls",
    "images": [
      "s_palse.png"
    ],
    "topic": "ゲシュタルト療法",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "adler",
    "sortKana": "あどらー",
    "name": "アドラー",
    "displayName": "A.アドラー",
    "en": "Alfred Adler",
    "images": [
      "2_1adra.png"
    ],
    "topic": "個人心理学・共同体感覚",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "annafreud",
    "sortKana": "あんなふろいと",
    "name": "アンナ・フロイト",
    "displayName": "アンナ・フロイト",
    "en": "Anna Freud",
    "images": [
      "2_1anna.png"
    ],
    "topic": "防衛機制・児童精神分析",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "beck",
    "sortKana": "べっく",
    "name": "ベック",
    "displayName": "A.T.ベック",
    "en": "Aaron T. Beck",
    "images": [
      "2_2bek.png"
    ],
    "topic": "認知療法・自動思考",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "pavlov",
    "sortKana": "ぱぶろふ",
    "name": "パブロフ",
    "displayName": "I.P.パブロフ",
    "en": "Ivan Pavlov",
    "images": [
      "2_2pablov.png"
    ],
    "topic": "古典的条件づけ",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "wolpe",
    "sortKana": "うぉるぴ",
    "name": "ウォルピ",
    "displayName": "J.ウォルピ",
    "en": "Joseph Wolpe",
    "images": [
      "2_2wolpi.png"
    ],
    "topic": "系統的脱感作・逆制止法",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "jung",
    "sortKana": "ゆんぐ",
    "name": "ユング",
    "displayName": "C.G.ユング",
    "en": "Carl Gustav Jung",
    "images": [
      "2_2yung.png"
    ],
    "topic": "分析心理学・集合的無意識",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "skinner",
    "sortKana": "すきなー",
    "name": "スキナー",
    "displayName": "B.F.スキナー",
    "en": "B. F. Skinner",
    "images": [
      "2_3skina.png"
    ],
    "topic": "オペラント条件づけ",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "schultz",
    "sortKana": "しゅるつ",
    "name": "シュルツ",
    "displayName": "J.H.シュルツ",
    "en": "Johannes Heinrich Schultz",
    "images": [
      "2_3syuru.png"
    ],
    "topic": "自律訓練法",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "wundt",
    "sortKana": "ゔんと",
    "name": "ヴント",
    "displayName": "W.ヴント",
    "en": "Wilhelm Wundt",
    "images": [
      "2_3vunt.png"
    ],
    "topic": "実験心理学・近代心理学の父",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "williamson",
    "sortKana": "うぃりあむそん",
    "name": "ウィリアムソン",
    "displayName": "E.G.ウィリアムソン",
    "en": "E. G. Williamson",
    "images": [
      "2_3will.png"
    ],
    "topic": "特性因子論・指示的カウンセリング",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "berne",
    "sortKana": "ばーん",
    "name": "バーン",
    "displayName": "E.バーン",
    "en": "Eric Berne",
    "images": [
      "3_1barn.png"
    ],
    "topic": "交流分析・ゲーム分析",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "mcgregor",
    "sortKana": "まぐれがー",
    "name": "マグレガー",
    "displayName": "D.マグレガー",
    "en": "Douglas McGregor",
    "images": [
      "3_1macrega-.png"
    ],
    "topic": "X理論・Y理論",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "mcclelland",
    "sortKana": "まくれらんど",
    "name": "マクレランド",
    "displayName": "D.C.マクレランド",
    "en": "David McClelland",
    "images": [
      "3_1macrerand.png"
    ],
    "topic": "達成動機理論",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "nicholson",
    "sortKana": "にこるそん",
    "name": "ニコルソン",
    "displayName": "N.ニコルソン",
    "en": "Nigel Nicholson",
    "images": [
      "3_1nikolson.png"
    ],
    "topic": "トランジションサイクル",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "hilton",
    "sortKana": "ひるとん",
    "name": "ヒルトン",
    "displayName": "T.L.ヒルトン",
    "en": "T. L. Hilton",
    "images": [
      "3_2hilton.png"
    ],
    "topic": "意思決定・認知的不協和",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "lewin",
    "sortKana": "れびん",
    "name": "レビン",
    "displayName": "K.レビン",
    "en": "Kurt Lewin",
    "images": [
      "3_2rebin.png"
    ],
    "topic": "場の理論・グループダイナミクス",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "levinson",
    "sortKana": "れびんそん",
    "name": "レビンソン",
    "displayName": "D.J.レビンソン",
    "en": "Daniel J. Levinson",
    "images": [
      "3_2rebinson.png"
    ],
    "topic": "成人発達・人生の四季",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "tiedeman",
    "sortKana": "てぃーどまん",
    "name": "ティードマン＆オハラ",
    "displayName": "ティードマン＆オハラ",
    "en": "David V. Tiedeman / Robert P. O'Hara",
    "images": [
      "3_2tidman.png"
    ],
    "topic": "キャリア意思決定",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "ivey",
    "sortKana": "あいびい",
    "name": "アイビィ",
    "displayName": "A.E.アイビィ",
    "en": "Allen E. Ivey",
    "images": [
      "3_3aivi.png"
    ],
    "topic": "マイクロカウンセリング",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "bronfenbrenner",
    "sortKana": "ぶろんふぇんぶれんなー",
    "name": "ブロンフェンブレンナー",
    "displayName": "U.ブロンフェンブレンナー",
    "en": "Urie Bronfenbrenner",
    "images": [
      "3_3bronf.png"
    ],
    "topic": "生態学的システム理論",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "havighurst",
    "sortKana": "はゔぃがーすと",
    "name": "ハヴィガースト",
    "displayName": "R.J.ハヴィガースト",
    "en": "Robert J. Havighurst",
    "images": [
      "3_3habi.png"
    ],
    "topic": "発達課題",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "mayo_roethlisberger",
    "sortKana": "めいよーれすりすばーがー",
    "name": "メイヨー＆レスリスバーガー",
    "displayName": "メイヨー＆レスリスバーガー",
    "en": "Elton Mayo / Fritz Roethlisberger",
    "images": [
      "3_3hoson.png"
    ],
    "topic": "ホーソン研究・人間関係論",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "cochran",
    "sortKana": "こくらん",
    "name": "コクラン",
    "displayName": "L.コクラン",
    "en": "Larry Cochran",
    "images": [
      "4_1kokran.png"
    ],
    "topic": "ナラティブ・キャリアカウンセリング",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "csikszentmihalyi",
    "sortKana": "ちくせんとみはい",
    "name": "チクセントミハイ",
    "displayName": "M.チクセントミハイ",
    "en": "Mihaly Csikszentmihalyi",
    "images": [
      "4_1mihai.png"
    ],
    "topic": "フロー理論",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "moreno",
    "sortKana": "もれの",
    "name": "モレノ",
    "displayName": "J.L.モレノ",
    "en": "Jacob L. Moreno",
    "images": [
      "4_1moreno.png"
    ],
    "topic": "サイコドラマ・ソシオメトリー",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "white",
    "sortKana": "ほわいと",
    "name": "ホワイト",
    "displayName": "M.ホワイト",
    "en": "Michael White",
    "images": [
      "4_1white.png"
    ],
    "topic": "ナラティブセラピー",
    "examTags": [
      "careerConsultant"
    ]
  },
  {
    "id": "morita",
    "sortKana": "もりたしょうま",
    "name": "森田正馬",
    "displayName": "森田正馬",
    "en": "Shoma Morita",
    "images": [
      "4_2morita.png"
    ],
    "topic": "森田療法",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "thorndike",
    "sortKana": "そーんだいく",
    "name": "ソーンダイク",
    "displayName": "E.L.ソーンダイク",
    "en": "Edward L. Thorndike",
    "images": [
      "4_2sondai.png"
    ],
    "topic": "教育測定・試行錯誤学習",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "yoshimoto",
    "sortKana": "よしもといしん",
    "name": "吉本伊信",
    "displayName": "吉本伊信",
    "en": "Ishin Yoshimoto",
    "images": [
      "4_2yoshimoto.png"
    ],
    "topic": "内観療法",
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ]
  },
  {
    "id": "beers",
    "sortKana": "びあーず",
    "name": "ビアーズ",
    "displayName": "C.W.ビアーズ",
    "en": "Clifford W. Beers",
    "images": [
      "4_3beer.png"
    ],
    "topic": "精神衛生運動",
    "examTags": [
      "industrialCounselor"
    ]
  },
  {
    "id": "roe",
    "sortKana": "ろー",
    "name": "アン・ロー",
    "displayName": "A.ロー",
    "en": "Anne Roe",
    "images": [
      "4_3row.png"
    ],
    "topic": "早期決定論・親の影響",
    "examTags": [
      "careerConsultant"
    ]
  }
];
