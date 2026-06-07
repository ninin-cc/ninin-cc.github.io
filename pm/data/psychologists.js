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
      "careerConsultant"
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
      "careerConsultant"
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
  }
];
