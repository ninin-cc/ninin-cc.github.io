// キャリア理論の問題データ
// NotebookLMなどで問題を追加するときは、この配列へオブジェクトを追加します。
const QUESTIONS_CAREER = [
  {
    "id": "career-hansen-4l",
    "psychologistId": "hansen",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "キャリアには人生における全ての役割が含まれるとし、愛（Love）、労働（Labor）、余暇（Leisure）と、もう1つの「L」の4つの活動が統合されるべきだと提唱した。もう1つのLはどれか。",
    "options": [
      "生活（Life）",
      "学習（Learning）",
      "自由（Liberty）",
      "指導（Leadership）"
    ],
    "answer": 1,
    "image": "s_hansen.png",
    "name": "L.S.ハンセン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1931 - 2020",
    "explanation": "ハンセンの【統合的人生設計（ILP）】の概念です。人生のパッチワークとして「愛・労働・学習・余暇」の4つのLをバランスよく統合することが重要だと説きました。",
    "works": [
      {
        "year": 1997,
        "title": "『統合的人生設計（Integrative Life Planning）』発表"
      },
      {
        "year": 2007,
        "title": "NCDA（全米キャリア開発協会）エミネント・キャリア・アワード受賞"
      }
    ],
    "pastExam": {
      "title": "第25回",
      "question": "L.S.ハンセン（Hansen, L. S.）の統合的人生設計（ILP）における、人生の4つの重要な役割（4L）の組み合わせとして、適切なものはどれか。",
      "options": [
        "1. 愛、労働、学習、余暇",
        "2. 愛、労働、生活、指導",
        "3. 労働、学習、余暇、自由",
        "4. 愛、生活、学習、自由"
      ],
      "answer": "1"
    }
  },
  {
    "id": "career-holland-riasec",
    "psychologistId": "holland",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "個人の性格的特性と、その個人が満足感を得られる職業・労働環境などの間にどのような関係があるかを分析し、6つの性格コード（RIASEC）を提唱した理論家は誰か。",
    "options": [
      "ホランド",
      "スーパー",
      "シャイン",
      "パーソンズ"
    ],
    "answer": 0,
    "image": "s_holand.png",
    "name": "J.L.ホランド",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1919 - 2008",
    "explanation": "ホランドは、個人のパーソナリティと職業環境の適合性が職業的満足や安定をもたらすとし、六角形モデル（VPI職業興味検査などの基礎）を提唱しました。",
    "works": [
      {
        "year": 1959,
        "title": "「職業選択の理論」発表"
      },
      {
        "year": 1973,
        "title": "『職業選択の心理学（Making Vocational Choices）』刊行"
      },
      {
        "year": 1985,
        "title": "VPI職業興味検査（Vocational Preference Inventory）開発"
      }
    ],
    "pastExam": {
      "title": "第30回",
      "question": "ホランド（Holland, J. L.）の職業選択理論に関する次の記述のうち、最も適切なものはどれか。",
      "options": [
        "1. 職業選択は、個人が持つ自己概念と、職業の持つイメージとのマッチングである。",
        "2. パーソナリティは、現実的、研究的、芸術的、社会的、企業的、慣習的の6つのタイプに分類できる。",
        "3. 職業発達は、空想期、試行期、現実期の3つの段階を経て進む。",
        "4. キャリアの意思決定は、予測システム、価値システム、決定システムの3つからなる。"
      ],
      "answer": "2"
    }
  },
  {
    "id": "career-parsons-trait-factor",
    "psychologistId": "parsons",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "職業指導の創始者と呼ばれ、「賢明な職業選択」には【自己理解】【職業理解】【合理的な推論】の3つのステップが必要であると提唱したのは誰か。",
    "options": [
      "クランボルツ",
      "ギンズバーグ",
      "パーソンズ",
      "ウィリアムソン"
    ],
    "answer": 2,
    "image": "s_parsons.png",
    "name": "F.パーソンズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1854 - 1908",
    "explanation": "パーソンズの【特性因子理論】です。個人が持つ特性（能力や興味）と、職業が要求する因子（条件）をマッチングさせることが重要であるとしました。",
    "works": [
      {
        "year": 1908,
        "title": "ボストン職業局（Vocation Bureau of Boston）設立"
      },
      {
        "year": 1909,
        "title": "死後に著書『職業の選択（Choosing a Vocation）』が刊行される"
      }
    ],
    "pastExam": {
      "title": "第21回",
      "question": "パーソンズ（Parsons, F.）の特性因子理論において、賢明な職業選択のための3つのステップに含まれないものはどれか。",
      "options": [
        "1. 自分自身の適性や能力の理解",
        "2. さまざまな職業に関する知識の獲得",
        "3. 人生における意味への意志の発見",
        "4. 自分と職業についての合理的な推論（マッチング）"
      ],
      "answer": "3"
    }
  },
  {
    "id": "career-schein-anchor",
    "psychologistId": "schein",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "個人が自らのキャリアを選択する際に、どうしても犠牲にしたくない、その人にとって最も大切な価値観や欲求を「キャリア・アンカー」と呼び、8つに分類した理論家は誰か。",
    "options": [
      "スーパー",
      "シャイン",
      "レビンソン",
      "ブリッジス"
    ],
    "answer": 1,
    "image": "s_shaine.png",
    "name": "E.H.シャイン",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2023",
    "explanation": "シャインは、キャリア・アンカー（船の錨）は自己概念の中核であり、一度形成されると簡単には変わらないとしました。また、「内的キャリア」と「外的キャリア」の概念も重要です。",
    "works": [
      {
        "year": 1978,
        "title": "『キャリア・ダイナミクス』刊行（内的/外的キャリアの提唱）"
      },
      {
        "year": 1990,
        "title": "『キャリア・アンカー』刊行（8つの分類を確立）"
      },
      {
        "year": 1999,
        "title": "プロセス・コンサルテーションの概念を体系化"
      }
    ],
    "pastExam": {
      "title": "オリジナル",
      "question": "E.H.シャイン（Schein, E. H.）のキャリア・アンカーに関する次の記述のうち、最も適切なものはどれか。",
      "options": [
        "1. キャリア・アンカーは、他者からの評価や期待によって形成される。",
        "2. キャリア・アンカーは、人生の転機において容易に変化する。",
        "3. キャリア・アンカーは、才能と能力、動機と欲求、意味と価値の3つの要素から構成される。",
        "4. キャリア・アンカーは、環境との相互作用によって絶えず再構築される。"
      ],
      "answer": "3"
    }
  },
  {
    "id": "career-schlossberg-4s",
    "psychologistId": "schlossberg",
    "categoryIds": [
      "career",
      "transition"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "人生の転機（トランジション）を乗り越えるために、「状況（Situation）」「自己（Self）」「支援（Support）」「戦略（Strategies）」の4つのSの点検を提唱したのは誰か。",
    "options": [
      "シュロスバーグ",
      "サビカス",
      "ニコルソン",
      "ハヴィガースト"
    ],
    "answer": 0,
    "image": "s_syuro.png",
    "name": "N.K.シュロスバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1929 - ",
    "explanation": "シュロスバーグは、転機を「予測していたもの」「予測していなかったもの」「期待していたが起こらなかったもの（ノンイベント）」に分類し、【4Sモデル】でリソースを確認・対処することを説きました。",
    "works": [
      {
        "year": 1984,
        "title": "『カウンセリング・アダルト・イン・トランジション』刊行"
      },
      {
        "year": 1989,
        "title": "『過渡期のキャリア（Overwhelmed）』刊行"
      }
    ],
    "pastExam": {
      "title": "第22回",
      "question": "シュロスバーグ（Schlossberg, N. K.）の転機の理論において、転機を乗り越えるための「4つのS」に含まれないものはどれか。",
      "options": [
        "1. 状況（Situation）",
        "2. 自己（Self）",
        "3. 支援（Support）",
        "4. スキル（Skill）"
      ],
      "answer": "4 （正解は Strategies：戦略）"
    }
  },
  {
    "id": "career-krumboltz-happenstance",
    "psychologistId": "krumboltz",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "「個人のキャリアの8割は予期しない偶然の出来事によって形成される」とし、好奇心や柔軟性などのスキルで偶然を意図的に引き寄せる行動が重要だと説いた理論はどれか。",
    "options": [
      "キャリア構築理論",
      "計画的偶発性理論",
      "発達課題理論",
      "ライフ・キャリア・レインボー"
    ],
    "answer": 1,
    "image": "s_cram1.png",
    "name": "J.D.クランボルツ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2019",
    "explanation": "クランボルツの【計画的偶発性理論（ハプンスタンス・ラーニング・セオリー）】です。偶然の出来事をチャンスに変えるための5つのスキル（好奇心、持続性、柔軟性、楽観性、冒険心）を提唱しました。",
    "works": [
      {
        "year": 1979,
        "title": "「キャリア意思決定の社会的学習理論（SLTCDM）」発表"
      },
      {
        "year": 1999,
        "title": "「計画的偶発性理論（Planned Happenstance Theory）」発表"
      }
    ],
    "pastExam": {
      "title": "第24回",
      "question": "クランボルツ（Krumboltz, J. D.）の計画的偶発性理論において、偶然の出来事をチャンスに変えるために必要なスキルとして、不適切なものはどれか。",
      "options": [
        "1. 好奇心（Curiosity）",
        "2. 楽観性（Optimism）",
        "3. 計画性（Planning）",
        "4. 柔軟性（Flexibility）"
      ],
      "answer": "3 （正しくは Persistence：持続性、 Risk-taking：冒険心 などが含まれる）"
    }
  },
  {
    "id": "career-super-self-concept",
    "psychologistId": "super",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "青年期から老年期までのライフステージを「成長期」「探索期」「確立期」「維持期」「解放期（下降期）」の5つに分け、自己概念の実現プロセスとしてキャリアを捉えたのは誰か。",
    "options": [
      "スーパー",
      "エリクソン",
      "サビカス",
      "アドラー"
    ],
    "answer": 0,
    "image": "s_super.png",
    "name": "D.E.スーパー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1994",
    "explanation": "スーパーの理論です。人生の役割を虹に例えた【ライフ・キャリア・レインボー】や、発達段階を示す【マキシサイクル】などの概念は頻出です。",
    "works": [
      {
        "year": 1953,
        "title": "「職業発達の理論（A Theory of Vocational Development）」発表"
      },
      {
        "year": 1957,
        "title": "『キャリアの心理学』刊行"
      },
      {
        "year": 1980,
        "title": "「ライフ・キャリア・レインボー」モデルを提唱"
      }
    ],
    "pastExam": {
      "title": "第31回",
      "question": "スーパー（Super, D. E.）のキャリア発達理論に関する次の記述のうち、最も適切なものはどれか。",
      "options": [
        "1. キャリアは、特定の年齢で固定される静的なものである。",
        "2. キャリア発達のプロセスは、自己概念の発達と実現のプロセスである。",
        "3. ライフ・キャリア・レインボーは、個人の性格特性と職業の適合を示すモデルである。",
        "4. 人生の転機は、予測不可能な出来事によってのみ引き起こされる。"
      ],
      "answer": "2"
    }
  },
  {
    "id": "career-savickas-adaptability",
    "psychologistId": "savickas",
    "categoryIds": [
      "career",
      "narrative"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "変化の激しい現代において、客観的な適合よりも個人の主観的意味づけを重視し、「キャリア・アダプタビリティ」の重要性を説いた【キャリア構築理論】の提唱者は誰か。",
    "options": [
      "ホランド",
      "サビカス",
      "バンデューラ",
      "ロー"
    ],
    "answer": 1,
    "image": "2_1savikas.png",
    "name": "M.L.サビカス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1947 - ",
    "explanation": "サビカスはスーパーの理論を発展させ、自らの人生物語の著者となる【ナラティブ・アプローチ】を重視しました。キャリア・アダプタビリティは「関心・統制・好奇心・自信」の4次元からなります。",
    "works": [
      {
        "year": 2005,
        "title": "「キャリア構築理論」発表（スーパーの理論を21世紀向けに拡張）"
      },
      {
        "year": 2011,
        "title": "『キャリア・カウンセリング（Career Counseling）』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル",
      "question": "サビカス（Savickas, M. L.）のキャリア構築理論における「キャリア・アダプタビリティ」の4つの次元（4C）に含まれないものはどれか。",
      "options": [
        "1. 関心（Concern）",
        "2. 統制（Control）",
        "3. 妥協（Compromise）",
        "4. 自信（Confidence）"
      ],
      "answer": "3 （残りの1つは Curiosity：好奇心 である）"
    }
  },
  {
    "id": "career-bandura-self-efficacy",
    "psychologistId": "bandura",
    "categoryIds": [
      "career",
      "social"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ある行動をうまく遂行できるかという自分の能力への確信を「自己効力感」と呼んだ。自己効力感を高める4つの情報源として間違っているものはどれか。",
    "options": [
      "言語的説得（励まし）",
      "代理的体験（モデリング）",
      "遂行行動の達成（成功体験）",
      "経済的報酬（金銭的インセンティブ）"
    ],
    "answer": 3,
    "image": "a_ban0.png",
    "name": "A.バンデューラ",
    "birthCountry": "🇨🇦",
    "birthCountryText": "ｶﾅﾀﾞ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1925 - 2021",
    "explanation": "バンデューラは自己効力感の情報源として「①遂行行動の達成」「②代理的体験」「③言語的説得」「④情動的喚起（ドキドキするなどの生理的状態）」の4つを挙げました。経済的報酬は含まれません。",
    "works": [
      {
        "year": 1977,
        "title": "「自己効力感の理論」発表"
      },
      {
        "year": 1977,
        "title": "『社会的学習理論』刊行"
      },
      {
        "year": 1986,
        "title": "『社会的認知理論』刊行"
      }
    ],
    "pastExam": {
      "title": "第20回",
      "question": "バンデューラ（Bandura, A.）が提唱した「自己効力感」を高めるための情報源として、最も影響力が大きいとされるものはどれか。",
      "options": [
        "1. 他者の成功体験の観察（代理的体験）",
        "2. 他者からの励まし（言語的説得）",
        "3. ドキドキするなどの生理的な状態（情動的喚起）",
        "4. 自身の成功体験（遂行行動の達成）"
      ],
      "answer": "4"
    }
  },
  {
    "id": "career-ginzberg-development",
    "psychologistId": "ginzberg",
    "categoryIds": [
      "career",
      "choice"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "当初、職業選択の過程は「空想期」「試行期」「現実期」という発達段階を経て進行し「非可逆的である（後戻りできない）」と提唱したが、後に「生涯にわたるプロセスである」と修正した理論家は誰か。",
    "options": [
      "ギンズバーグ",
      "レビン",
      "ティードマン",
      "エインズワース"
    ],
    "answer": 0,
    "image": "3_2ginz.png",
    "name": "E.ギンズバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1911 - 2002",
    "explanation": "ギンズバーグは初期理論で職業選択を「非可逆的プロセス」としましたが、のちに社会環境の変化等を受け「職業選択は生涯にわたる意思決定プロセスである」と理論を修正したことが特徴です。",
    "works": [
      {
        "year": 1951,
        "title": "『職業選択（Occupational Choice）』刊行（初期理論）"
      },
      {
        "year": 1972,
        "title": "「再定式化（職業選択は生涯にわたるプロセスである）」発表"
      }
    ],
    "pastExam": {
      "title": "第18回",
      "question": "ギンズバーグ（Ginzberg, E.）の職業選択理論に関する次の記述のうち、最も適切なものはどれか。",
      "options": [
        "1. 職業選択のプロセスは、青年期で終了する。",
        "2. 職業選択は、空想期、試行期、現実期の3つの段階を経て発達する。",
        "3. 職業選択は、常に可逆的であり、いつでも容易にやり直すことができると当初から主張した。",
        "4. 職業選択は、個人の性格特性と職業環境の合致によって決定される。"
      ],
      "answer": "2"
    }
  },
  {
    "id": "decision-gelatt-positive-uncertainty",
    "psychologistId": "gelatt",
    "categoryIds": [
      "career",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ジェラットが後期の意思決定理論で提唱した、社会の不確実さを前向きに受け入れ、客観的で合理的な戦略と主観的で直感的な戦略を統合して柔軟に意思決定を行うという概念として、最も適切なものはどれか。",
    "options": [
      "積極的不確実性",
      "計画された偶発性",
      "認知的不協和の解消",
      "自己概念の実現過程"
    ],
    "answer": 0,
    "image": "2_1jerat.png",
    "name": "H.B.ジェラット",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1926 - 2021",
    "explanation": "ジェラットは、初期の合理的な連続的意思決定プロセスから理論を発展させ、後期には変化の激しい社会において不確実性を肯定的に受け入れる「積極的不確実性（Positive Uncertainty）」を提唱しました。",
    "works": [
      {
        "year": 1962,
        "title": "意思決定の連続的プロセスを提唱"
      },
      {
        "year": 1989,
        "title": "「積極的不確実性」発表"
      },
      {
        "year": 2003,
        "title": "『Creative Decision Making: Using Positive Uncertainty』改訂版"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "不合理性や不確実さを受け入れ、右脳と左脳の両方を活用する全脳型アプローチによる意思決定を提唱した理論家は誰か。",
      "options": [
        "1. ジェラット",
        "2. クランボルツ",
        "3. ヒルトン",
        "4. ティードマン"
      ],
      "answer": "1",
      "explanation": "ジェラットは後期理論で、客観的な左脳的戦略と主観的な右脳的戦略を統合する積極的不確実性を提唱しました。"
    }
  },
  {
    "id": "decision-gelatt-3systems",
    "psychologistId": "gelatt",
    "categoryIds": [
      "career",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ジェラットが初期の意思決定モデルにおいて、意思決定を行うプロセスとして分類した3段階のシステムとして、正しい組み合わせはどれか。",
    "options": [
      "予測、評価、決定システム",
      "予期、実行、修正システム",
      "状況、自己、支援システム",
      "探索、確立、維持システム"
    ],
    "answer": 0,
    "image": "2_1jerat.png",
    "name": "H.B.ジェラット",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1926 - 2021",
    "explanation": "ジェラットは連続的意思決定プロセスにおいて、「予測システム」「評価（価値）システム」「決定（基準）システム」の3段階のステップを踏むとしました。予期・実行はティードマン、状況等はシュロスバーグの理論です。",
    "works": [
      {
        "year": 1962,
        "title": "意思決定の連続的プロセスを提唱"
      },
      {
        "year": 1989,
        "title": "「積極的不確実性」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ジェラットの連続的意思決定プロセスにおいて、選択肢の結果を予測し、その価値を整理した上で決定基準を設けるプロセスの最後のステップは何か。",
      "options": [
        "1. 予測システム",
        "2. 評価システム",
        "3. 決定システム",
        "4. 修正システム"
      ],
      "answer": "3",
      "explanation": "プロセスは「予測システム」→「評価システム」→「決定システム」の順に進みます。"
    }
  },
  {
    "id": "career-krumboltz-5skills",
    "psychologistId": "krumboltz",
    "categoryIds": [
      "career",
      "choice",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "クランボルツの「プランド・ハプンスタンス理論（計画された偶発性理論）」において、偶然の出来事を自らのキャリアに活かすために必要とされる「5つのスキル」に含まれないものはどれか。",
    "options": [
      "計画性",
      "好奇心",
      "柔軟性",
      "冒険心"
    ],
    "answer": 0,
    "image": "s_cram2.png",
    "name": "J.D.クランボルツ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2019",
    "explanation": "クランボルツは、偶然をチャンスに変える5つのスキルとして「好奇心」「持続性」「柔軟性」「楽観性」「冒険心」を挙げました。計画性はこれらに含まれないため、誤答選択肢として頻出します。",
    "works": [
      {
        "year": 1979,
        "title": "「キャリア意思決定の社会的学習理論（SLTCDM）」発表"
      },
      {
        "year": 1999,
        "title": "「計画的偶発性理論（Planned Happenstance Theory）」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "クランボルツのプランド・ハプンスタンス理論で提唱された5つのスキルのうち、不確実な結果であっても行動を起こす勇気を指すものはどれか。",
      "options": [
        "1. 持続性",
        "2. 楽観性",
        "3. 柔軟性",
        "4. 冒険心"
      ],
      "answer": "4",
      "explanation": "不確実な結果に対する行動力は「冒険心（Risk Taking）」に該当します。"
    }
  },
  {
    "id": "career-krumboltz-4factors",
    "psychologistId": "krumboltz",
    "categoryIds": [
      "career",
      "choice",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "クランボルツが提唱した社会的学習理論において、個人の職業選択や意思決定に影響を与えるとした「4つの要因」に該当しないものはどれか。",
    "options": [
      "キャリア・アンカー",
      "先天的な資質と能力",
      "環境条件や出来事",
      "課題への接近スキル"
    ],
    "answer": 0,
    "image": "s_cram1.png",
    "name": "J.D.クランボルツ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2019",
    "explanation": "クランボルツは意思決定に影響を与える要因として、①先天的な資質、②環境条件や出来事、③学習経験、④課題へのアプローチ・スキル（接近スキル）の4つを挙げました。キャリア・アンカーはシャインの概念です。",
    "works": [
      {
        "year": 1979,
        "title": "「キャリア意思決定の社会的学習理論（SLTCDM）」発表"
      },
      {
        "year": 1999,
        "title": "「計画的偶発性理論（Planned Happenstance Theory）」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "クランボルツの理論において、過去の成功体験や失敗体験が職業選択に影響を与えるとする要因はどれか。",
      "options": [
        "1. 遺伝的要因",
        "2. 学習経験",
        "3. 環境的要因",
        "4. 課題への接近スキル"
      ],
      "answer": "2",
      "explanation": "過去の成功や失敗からの学びは「学習経験」に分類されます。"
    }
  },
  {
    "id": "career-super-rainbow",
    "psychologistId": "super",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "キャリアを時間的な広がりである「ライフ・スパン」と、空間的な役割の広がりである「ライフ・スペース」の2つの次元から捉え、「ライフキャリアレインボー」を提唱した理論家は誰か。",
    "options": [
      "サビカス",
      "スーパー",
      "シャイン",
      "ハンセン"
    ],
    "answer": 1,
    "image": "s_super.png",
    "name": "D.E.スーパー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1994",
    "explanation": "スーパーは、人生における様々な役割（子ども、学生、余暇人、市民、労働者など）の組み合わせであるライフ・スペースと、生涯にわたる時間的発達であるライフ・スパンを統合したライフキャリアレインボーを提唱しました。",
    "works": [
      {
        "year": 1953,
        "title": "「職業発達の理論（A Theory of Vocational Development）」発表"
      },
      {
        "year": 1980,
        "title": "「ライフ・キャリア・レインボー」モデルを提唱"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "個人は職業選択を通じて自身の「職業的自己概念」を実現しようとすると考えた、職業的発達理論の代表的な人物は誰か。",
      "options": [
        "1. スーパー",
        "2. ホランド",
        "3. パーソンズ",
        "4. クランボルツ"
      ],
      "answer": "1",
      "explanation": "スーパーは「自己概念の実現プロセス」こそがキャリア発達であると考え、自己概念理論と特性因子理論を包括的に統合しました。"
    }
  },
  {
    "id": "career-super-maxicycle",
    "psychologistId": "super",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "スーパーが提唱した、マキシサイクルと呼ばれる生涯の職業的発達段階を構成する5つのステージの順序として、最も適切なものはどれか。",
    "options": [
      "成長期、探索期、確立期、維持期、解放期",
      "空想期、試行期、現実期、確立期、維持期",
      "準備期、遭遇期、適応期、安定期、維持期",
      "探索期、成長期、維持期、確立期、解放期"
    ],
    "answer": 0,
    "image": "s_super.png",
    "name": "D.E.スーパー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1994",
    "explanation": "スーパーのライフステージ（マキシサイクル）は、成長期、探索期、確立期、維持期、離脱期（解放期・下降期）の5段階で構成されます。空想・試行・現実期はギンズバーグの理論における分類です。",
    "works": [
      {
        "year": 1953,
        "title": "「職業発達の理論（A Theory of Vocational Development）」発表"
      },
      {
        "year": 1980,
        "title": "「ライフ・キャリア・レインボー」モデルを提唱"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "スーパーの職業的発達段階において、自己の希望を形作り、職業的選択の準備と試行を行う「探索期」に該当する年代は概ねどれか。",
      "options": [
        "1. 0〜14歳",
        "2. 15〜24歳",
        "3. 25〜44歳",
        "4. 45〜64歳"
      ],
      "answer": "2",
      "explanation": "探索期は概ね15歳〜24歳とされ、自らの興味や能力を探求し職業への方向付けを行う時期です。"
    }
  },
  {
    "id": "career-schein-anchor-core",
    "psychologistId": "schein",
    "categoryIds": [
      "career",
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "個人がキャリアを選択・形成する際に、どうしても犠牲にしたくない最も大切な価値観や欲求を指し、自らの拠り所となる「キャリア・アンカー」を提唱した理論家は誰か。",
    "options": [
      "シャイン",
      "スーパー",
      "サビカス",
      "ホール"
    ],
    "answer": 0,
    "image": "s_shaine.png",
    "name": "E.H.シャイン",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2023",
    "explanation": "シャインは、個人の内的キャリアにおける自己概念の核であり、職業生活の基軸となる価値観や動機を「キャリア・アンカー」と呼びました。専門・職能、全般管理など8つのアンカーに分類されます。",
    "works": [
      {
        "year": 1978,
        "title": "『キャリア・ダイナミクス』刊行（内的/外的キャリアの提唱）"
      },
      {
        "year": 1990,
        "title": "『キャリア・アンカー』刊行（8つの分類を確立）"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シャインの提唱したキャリア・アンカーを構成する3つの要素に含まれないものはどれか。",
      "options": [
        "1. コンピタンス（才能・能力）",
        "2. モチベーション（動機・欲求）",
        "3. バリュー（意味・価値観）",
        "4. アダプタビリティ（適応力）"
      ],
      "answer": "4",
      "explanation": "キャリア・アンカーは、自覚された「才能・能力」「動機・欲求」「意味・価値観」の3要素で構成されます。アダプタビリティはサビカスやホールの理論のキーワードです。"
    }
  },
  {
    "id": "career-schein-cone",
    "psychologistId": "schein",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "シャインが提唱した、組織の構造と個人のキャリア移動を「機能」「階層」「中心性（部内者化）」の3次元モデルで立体的に表した概念はどれか。",
    "options": [
      "キャリア・コーン",
      "キャリア・サバイバル",
      "キャリア・サイクル",
      "プロティアン・キャリア"
    ],
    "answer": 0,
    "image": "s_shaine.png",
    "name": "E.H.シャイン",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2023",
    "explanation": "シャインは組織内における個人の移動を、職能的移動（機能）、階層的移動（階層）、部内的移動（中心性）の3つの次元で捉え、これを円錐形の「キャリア・コーン」としてモデル化しました。",
    "works": [
      {
        "year": 1978,
        "title": "『キャリア・ダイナミクス』刊行（組織内キャリア発達を論じる）"
      },
      {
        "year": 1990,
        "title": "『キャリア・アンカー』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シャインの理論において、キャリアの本質は時の経過に伴う何と何の相互作用にあると定義されているか。",
      "options": [
        "1. 遺伝と環境",
        "2. 組織と個人",
        "3. 主観と客観",
        "4. 予期と実行"
      ],
      "answer": "2",
      "explanation": "シャインは組織心理学の観点から、キャリアを「組織」と「個人」の両視点から捉え、その相互作用のプロセスとして理論を展開しました。"
    }
  },
  {
    "id": "social-bandura-self-efficacy",
    "psychologistId": "bandura",
    "categoryIds": [
      "career",
      "social"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "バンデューラの提唱した社会学習理論（および社会認知的キャリア理論）において、ある課題を成功裏に遂行できるという自分自身の能力に対する確信や評価を指す概念はどれか。",
    "options": [
      "自己効力感",
      "自己一致",
      "積極的不確実性",
      "自己肯定感"
    ],
    "answer": 0,
    "image": "a_ban0.png",
    "name": "A.バンデューラ",
    "birthCountry": "🇨🇦",
    "birthCountryText": "ｶﾅﾀﾞ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1925 - 2021",
    "explanation": "バンデューラは、人間が自らの行動を制御し、課題を達成できるという信念である「自己効力感」を提唱しました。自己効力感を高める情報源として、遂行行動の達成、代理的経験、言語的説得、情動的喚起の4つを挙げています。",
    "works": [
      {
        "year": 1977,
        "title": "『社会的学習理論』刊行"
      },
      {
        "year": 1986,
        "title": "『社会的認知理論』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "バンデューラが提唱した、人がある課題を遂行する際に、自分にそれができると信じる度合いを示す概念はどれか。",
      "options": [
        "1. 自己効力感",
        "2. 自己受容",
        "3. 自己開示",
        "4. 自己実現"
      ],
      "answer": "1",
      "explanation": "自己効力感（セルフ・エフィカシー）は、キャリアコンサルティングにおいてもクライエントの行動変容を促す重要な概念として頻出します。"
    }
  },
  {
    "id": "motivation-deci-self-determination",
    "psychologistId": "deci",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "デシらが提唱した自己決定理論において、人間の内発的動機づけを高めるために不可欠とされる3つの基本的な心理的欲求に含まれないものはどれか。",
    "options": [
      "自律性の欲求",
      "有能感の欲求",
      "関係性の欲求",
      "承認の欲求"
    ],
    "answer": 3,
    "image": "desi_raian.png",
    "name": "デシ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1942 - ",
    "explanation": "デシの自己決定理論では、内発的動機づけを支える基本欲求として「自律性（自分で決定したい）」「有能感（能力を発揮したい）」「関係性（他者と結びつきたい）」の3つを挙げています。承認の欲求はマズローの理論等で扱われます。",
    "works": [
      {
        "year": 1985,
        "title": "『Intrinsic Motivation and Self-Determination in Human Behavior』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "デシの自己決定理論において、自らの行動を自分自身で選択し、決定したいと願う心理的欲求を何と呼ぶか。",
      "options": [
        "1. 自律性の欲求",
        "2. 有能感の欲求",
        "3. 関係性の欲求",
        "4. 自己実現の欲求"
      ],
      "answer": "1",
      "explanation": "自ら選択・決定したいという欲求は「自律性」です。これが満たされることで内発的動機づけが高まるとされます。"
    }
  },
  {
    "id": "counseling-frankl-logotherapy",
    "psychologistId": "frankl",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "フランクルが提唱した、人間が困難な状況下にあっても自らの人生に意味を見出すこと（意味への意志）を重視する心理療法はどれか。",
    "options": [
      "ロゴセラピー",
      "ゲシュタルト療法",
      "論理療法",
      "現実療法"
    ],
    "answer": 0,
    "image": "frankl.png",
    "name": "フランクル",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1905 - 1997",
    "explanation": "フランクルは自身の強制収容所での体験などから、人間にとって最も根源的な動機は「意味への意志」であるとし、人生の意味を見出すことを支援する実存分析（ロゴセラピー）を創始しました。",
    "works": [
      {
        "year": 1946,
        "title": "『夜と霧』刊行"
      },
      {
        "year": 1969,
        "title": "『The Will to Meaning』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "「意味への意志」を人間の最も根源的な動機づけと考え、ロゴセラピー（実存分析）を創始したウイーン生まれの精神科医は誰か。",
      "options": [
        "1. フランクル",
        "2. パールズ",
        "3. エリス",
        "4. ジェンドリン"
      ],
      "answer": "1",
      "explanation": "フランクルと「意味への意志」「ロゴセラピー」はセットで出題されやすいキーワードです。"
    }
  },
  {
    "id": "counseling-rogers-core-conditions",
    "psychologistId": "rogers",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ロジャーズが提唱した来談者中心療法において、カウンセラーが備えるべき「3つの中核条件」に該当しないものはどれか。",
    "options": [
      "無条件の肯定的配慮",
      "共感的理解",
      "自己一致",
      "客観的評価"
    ],
    "answer": 3,
    "image": "r_0.png",
    "name": "ロジャーズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1902 - 1987",
    "explanation": "ロジャーズは、カウンセラーの基本的態度として「無条件の肯定的配慮（受容）」「共感的理解」「自己一致（純粋性）」の3つが不可欠であるとしました。客観的評価や診断は特性因子論などで重視されるアプローチです。",
    "works": [
      {
        "year": 1951,
        "title": "『Client-Centered Therapy』刊行"
      },
      {
        "year": 1957,
        "title": "治療的人格変化の必要十分条件を発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ロジャーズの理論において、カウンセラー自身が自分の内面と外面を一致させ、クライエントに対して純粋で真実な存在であることを指す条件はどれか。",
      "options": [
        "1. 無条件の肯定的配慮",
        "2. 共感的理解",
        "3. 自己一致",
        "4. 問題解決志向"
      ],
      "answer": "3",
      "explanation": "カウンセラーが自分自身の感情や体験に正直であり、ありのままである状態を「自己一致（純粋性）」と呼びます。"
    }
  },
  {
    "id": "motivation-alderfer-erg",
    "psychologistId": "alderfer",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "マズローの欲求5段階説を修正し、人間の欲求を「存在（Existence）」「関係（Relatedness）」「成長（Growth）」の3つの次元に集約したERG理論を提唱した理論家は誰か。",
    "options": [
      "アルダファー",
      "ハーズバーグ",
      "マクレランド",
      "アトキンソン"
    ],
    "answer": 0,
    "image": "s_ardafa.png",
    "name": "アルダファー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1940 - 2015",
    "explanation": "アルダファーはマズローの理論を実証的に見直し、欲求を3次元に集約したERG理論を提唱しました。上位の欲求が満たされない場合に下位の欲求へ後退（挫折・退行）することも認めている点が特徴です。",
    "works": [
      {
        "year": 1969,
        "title": "ERG理論を提唱"
      },
      {
        "year": 1972,
        "title": "『Existence, Relatedness, and Growth』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アルダファーのERG理論において、「R」が表す欲求の次元として正しいものはどれか。",
      "options": [
        "1. 存在（Existence）",
        "2. 関係（Relatedness）",
        "3. 成長（Growth）",
        "4. 責任（Responsibility）"
      ],
      "answer": "2",
      "explanation": "ERGはそれぞれExistence（存在）、Relatedness（関係）、Growth（成長）の頭文字をとったものです。"
    }
  },
  {
    "id": "transition-bridges-3stages",
    "psychologistId": "bridges",
    "categoryIds": [
      "career",
      "transition"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ブリッジスが提唱したトランジション（転機）の理論において、変化のプロセスを構成する3つの段階の順序として正しいものはどれか。",
    "options": [
      "終焉（終わり）→ ニュートラル・ゾーン → 開始（始まり）",
      "遭遇 → 準備 → 適応",
      "空想期 → 試行期 → 現実期",
      "準備期 → 遭遇期 → 安定期"
    ],
    "answer": 0,
    "image": "s_bridges.png",
    "name": "ブリッジス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1933 - 2013",
    "explanation": "ブリッジスは、トランジションのプロセスを「何かが終わる（終焉）」ことから始まり、古いものが終わって新しいものが始まる前の混乱や空白の時期である「ニュートラル・ゾーン（中立圏）」を経て、「何かが始まる（開始）」という3段階で説明しました。",
    "works": [
      {
        "year": 1980,
        "title": "『Transitions』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ブリッジスのトランジション理論において、終わりと始まりの間に存在し、どっちつかずで混乱を経験する過渡期のプロセスを何と呼ぶか。",
      "options": [
        "1. モラトリアム",
        "2. ニュートラル・ゾーン",
        "3. クライシス",
        "4. ブランク・ピリオド"
      ],
      "answer": "2",
      "explanation": "この時期を十分に味わい、意味を見出すことが新たな開始への準備として重要視されています。"
    }
  },
  {
    "id": "career-krumboltz-happenstance-skill",
    "psychologistId": "krumboltz",
    "categoryIds": [
      "career",
      "choice",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "クランボルツのプランド・ハプンスタンス理論において、偶然の出来事をキャリアの機会として活用するための「5つのスキル」に該当しないものはどれか。",
    "options": [
      "好奇心",
      "柔軟性",
      "計画性",
      "冒険心"
    ],
    "answer": 2,
    "image": "s_cram2.png",
    "name": "J.D.クランボルツ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2019",
    "explanation": "クランボルツは偶然を味方につける5つのスキルとして「好奇心」「持続性」「柔軟性」「楽観性」「冒険心」を挙げました。「計画性」はこれに含まれず、誤答選択肢として試験でも頻出します。",
    "works": [
      {
        "year": 1979,
        "title": "「キャリア意思決定の社会的学習理論（SLTCDM）」発表"
      },
      {
        "year": 1999,
        "title": "「計画的偶発性理論」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "クランボルツのプランド・ハプンスタンス理論の5つのスキルのうち、新しい学習機会を探索する姿勢を指すものはどれか。",
      "options": [
        "1. 好奇心",
        "2. 柔軟性",
        "3. 楽観性",
        "4. 冒険心"
      ],
      "answer": "1",
      "explanation": "新しい事柄や学習機会への興味・関心を持つ姿勢は「好奇心（Curiosity）」に該当します。"
    }
  },
  {
    "id": "development-erikson-identity",
    "psychologistId": "erikson",
    "categoryIds": [
      "development",
      "career"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "エリクソンが提唱した心理社会的発達理論において、青年期（12〜20歳頃）における主要な発達課題として正しいものはどれか。",
    "options": [
      "勤勉性の獲得",
      "自我同一性（アイデンティティ）の確立",
      "親密性の形成",
      "統合性の獲得"
    ],
    "answer": 1,
    "image": "s_ericsson.png",
    "name": "エリクソン",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1902 - 1994",
    "explanation": "エリクソンは生涯を8つの発達段階に分け、青年期の課題を「自我同一性（アイデンティティ）の確立」としました。勤勉性は学童期、親密性は若年成人期（初期成人期）、統合性は老年期の課題です。",
    "works": [
      {
        "year": 1950,
        "title": "『Childhood and Society』刊行"
      },
      {
        "year": 1968,
        "title": "『Identity: Youth and Crisis』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "エリクソンの理論において、青年期に特有のアイデンティティ確立に向けた自己探求の猶予期間を何と呼ぶか。",
      "options": [
        "1. ニュートラル・ゾーン",
        "2. 心理社会的モラトリアム",
        "3. トランジション",
        "4. アイデンティティ・クライシス"
      ],
      "answer": "2",
      "explanation": "青年期において、大人になるための社会的責任や義務が一時的に猶予され、自己探求を行う期間を「心理社会的モラトリアム」と呼びます。"
    }
  },
  {
    "id": "cbt-ellis-abc",
    "psychologistId": "ellis",
    "categoryIds": [
      "cbt",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "エリスが創始した論理療法（REBT）において、出来事そのものではなく、その出来事に対する非合理的な信念が結果としての感情や行動を引き起こすとする理論モデルはどれか。",
    "options": [
      "ABC理論",
      "4Sモデル",
      "コーヒーカップモデル",
      "RIASECモデル"
    ],
    "answer": 0,
    "image": "s_eris.png",
    "name": "エリス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1913 - 2007",
    "explanation": "エリスのABC理論は、A（出来事）が直接C（結果としての感情・行動）を引き起こすのではなく、B（信念、特にイラショナル・ビリーフ）が媒介することで問題が生じると考える認知行動療法の中核的理論です。",
    "works": [
      {
        "year": 1955,
        "title": "論理療法を創始"
      },
      {
        "year": 1962,
        "title": "『Reason and Emotion in Psychotherapy』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "エリスの論理療法において、現実に即していない極端で硬直的な信念（「〜すべきである」「〜ねばならない」など）を何と呼ぶか。",
      "options": [
        "1. 自動思考",
        "2. イラショナル・ビリーフ",
        "3. 認知の歪み",
        "4. スキーマ"
      ],
      "answer": "2",
      "explanation": "論理療法では、この「イラショナル・ビリーフ（非合理的信念）」を論駁（D）し、ラショナル・ビリーフに変容させることを目指します。自動思考はベックの認知療法の用語です。"
    }
  },
  {
    "id": "psychoanalysis-freud-defense",
    "psychologistId": "freud",
    "categoryIds": [
      "psychoanalysis",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "フロイトの精神分析理論において、自我が不安や葛藤から心を守るために無意識的に用いる心理的メカニズム（防衛機制）のうち、受け入れがたい欲求や記憶を無意識に押し込めるものを何というか。",
    "options": [
      "抑圧",
      "投影",
      "合理化",
      "昇華"
    ],
    "answer": 0,
    "image": "s_froit.png",
    "name": "フロイト",
    "birthCountry": "🇨🇿",
    "birthCountryText": "ﾁｪｺ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1856 - 1939",
    "explanation": "「抑圧」は防衛機制の最も基本的なもので、苦痛な感情や記憶を無意識下に押し込める働きです。投影は自分の感情を他者のものと思い込むこと、合理化はもっともらしい理由をつけること、昇華は社会的に望ましい行動に変えることです。",
    "works": [
      {
        "year": 1900,
        "title": "『夢判断』刊行"
      },
      {
        "year": 1923,
        "title": "『自我とエス』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "フロイトの防衛機制において、自分の受け入れがたい感情や欲求を、他者が持っているかのように感じる働きを何と呼ぶか。",
      "options": [
        "1. 投影",
        "2. 退行",
        "3. 反動形成",
        "4. 置き換え"
      ],
      "answer": "1",
      "explanation": "自分が相手を嫌っているのに「相手が自分を嫌っている」と感じるようなメカニズムを「投影」と呼びます。"
    }
  },
  {
    "id": "career-hansen-4l-added",
    "psychologistId": "hansen",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ハンセンが提唱した「統合的人生設計（ILP）」において、人生の重要な役割を組み合わせるパッチワーク・キルトに例えられた「4L」に含まれないものはどれか。",
    "options": [
      "Labor（労働）",
      "Love（愛）",
      "Learning（学習）",
      "Logic（論理）"
    ],
    "answer": 3,
    "image": "s_hansen.png",
    "name": "L.S.ハンセン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1931 - 2020",
    "explanation": "ハンセンは人生の役割を「Labor（労働）」「Love（愛）」「Learning（学習）」「Leisure（余暇）」の4つのLで表し、これらをキルトのように統合してキャリアを設計することの重要性を説きました。",
    "works": [
      {
        "year": 1997,
        "title": "『統合的人生設計（Integrative Life Planning）』発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ハンセンが提唱したキャリアの概念において、人生における多様な役割を縫い合わせるプロセスを象徴する比喩表現はどれか。",
      "options": [
        "1. レインボー",
        "2. コーン",
        "3. キルト",
        "4. サイクル"
      ],
      "answer": "3",
      "explanation": "ハンセンは、小さな布を縫い合わせて大きな一枚の布を作る「キルト」を、多様な役割を統合する人生設計の象徴として用いました。"
    }
  },
  {
    "id": "motivation-herzberg-two-factor",
    "psychologistId": "herzberg",
    "categoryIds": [
      "career",
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ハーズバーグが提唱した動機づけ・衛生理論（二要因理論）において、不足すると職務不満を引き起こすが、満たされても積極的な満足にはつながらない「衛生要因」に該当するものはどれか。",
    "options": [
      "仕事そのもののやりがい",
      "達成感と承認",
      "給与や労働条件",
      "責任と昇進"
    ],
    "answer": 2,
    "image": "s_hasebarg.png",
    "name": "ハーズバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1923 - 2000",
    "explanation": "ハーズバーグは、給与や作業環境などの「衛生要因」は不満を防ぐ効果にとどまり、仕事への満足感やモチベーションを高めるためには、達成や承認などの「動機づけ要因」を満たす必要があるとしました。",
    "works": [
      {
        "year": 1959,
        "title": "『The Motivation to Work』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ハーズバーグの理論において、職務満足をもたらし、労働意欲を高める要因（動機づけ要因）に分類されるものはどれか。",
      "options": [
        "1. 会社の政策と管理",
        "2. 達成や承認",
        "3. 職場の対人関係",
        "4. 労働環境"
      ],
      "answer": "2",
      "explanation": "達成、承認、仕事そのもの、責任、昇進などは「動機づけ要因」に分類されます。これらは満たされることで積極的な職務満足を生み出します。"
    }
  },
  {
    "id": "career-holland-riasec-basic",
    "psychologistId": "holland",
    "categoryIds": [
      "career",
      "choice"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ホランドの職業選択理論において、個人の性格特性と職業環境を分類したRIASEC（六角形モデル）の6つのタイプに含まれないものはどれか。",
    "options": [
      "現実的（R）",
      "研究的（I）",
      "論理的（L）",
      "慣習的（C）"
    ],
    "answer": 2,
    "image": "s_holand.png",
    "name": "J.L.ホランド",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1919 - 2008",
    "explanation": "ホランドのRIASECは、現実的(R)、研究的(I)、芸術的(A)、社会的(S)、企業的(E)、慣習的(C)の6つのパーソナリティタイプを示します。「論理的」はここに含まれません。",
    "works": [
      {
        "year": 1959,
        "title": "「職業選択の理論」発表"
      },
      {
        "year": 1973,
        "title": "『Making Vocational Choices』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ホランドが開発した、160個の職業名に対する興味の有無から個人の職業興味を測定するアセスメントツールはどれか。",
      "options": [
        "1. GATB",
        "2. VRT",
        "3. VPI職業興味検査",
        "4. キャリア・インサイト"
      ],
      "answer": "3",
      "explanation": "VPI職業興味検査はホランドの理論に基づいており、6つの興味領域と5つの傾向尺度を測定します。"
    }
  },
  {
    "id": "career-hall-protean",
    "psychologistId": "hall",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ホールが提唱した、組織の評価や昇進といった「客観的成功」よりも、自分自身の価値観や充実感に基づく「心理的成功」を重視し、環境の変化に柔軟に適応していくキャリアの概念はどれか。",
    "options": [
      "プロティアン・キャリア",
      "キャリア・アンカー",
      "バウンダリーレス・キャリア",
      "キャリア・サバイバル"
    ],
    "answer": 0,
    "image": "s_hole.png",
    "name": "ホール",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "ホールは、ギリシャ神話の変幻自在な神プロテウスにちなみ、組織に依存せず個人のアイデンティティとアダプタビリティ（適応力）を軸として自律的に形成する「プロティアン・キャリア」を提唱しました。",
    "works": [
      {
        "year": 1976,
        "title": "『Careers in Organizations』刊行"
      },
      {
        "year": 2004,
        "title": "プロティアン・キャリアのレビュー論文を発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ホールのプロティアン・キャリアにおいて、変化の激しい環境を生き抜くために必要とされるメタ・コンピテンシーを構成する2つの要素は、アイデンティティと何か。",
      "options": [
        "1. アダプタビリティ（適応力）",
        "2. モチベーション（動機）",
        "3. レジリエンス（回復力）",
        "4. キャリア・アンカー"
      ],
      "answer": "1",
      "explanation": "ホールは、プロティアン・キャリアの形成には自覚的な「アイデンティティ」と、変化への「アダプタビリティ（適応力）」の2つが重要であるとしました。"
    }
  },
  {
    "id": "counseling-gendlin-focusing",
    "psychologistId": "gendlin",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ジェンドリンが創始した、言葉にならない漠然とした身体感覚（フェルトセンス）に注意を向け、そこから意味や気づきを引き出していく心理療法はどれか。",
    "options": [
      "フォーカシング",
      "ゲシュタルト療法",
      "論理療法",
      "内観療法"
    ],
    "answer": 0,
    "image": "s_jendrin.png",
    "name": "ジェンドリン",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1926 - 2017",
    "explanation": "ジェンドリンは、クライエントが抱く「まだ言葉にならない意味を含んだ身体感覚」をフェルトセンスと呼び、それと対話して心理的な変容を促すアプローチであるフォーカシングを提唱しました。",
    "works": [
      {
        "year": 1978,
        "title": "『Focusing』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ジェンドリンのフォーカシングにおいて、身体の奥で感じられる、まだ言葉になっていない漠然とした感覚を何と呼ぶか。",
      "options": [
        "1. オートマティック・ソート",
        "2. フェルトセンス",
        "3. イラショナル・ビリーフ",
        "4. スキーマ"
      ],
      "answer": "2",
      "explanation": "「フェルトセンス」に注意を向け、そこからぴったりくる言葉（ハンドル）を見つけることで心理的なシフトが生じるとされます。"
    }
  },
  {
    "id": "counseling-carkhuff-helping",
    "psychologistId": "carkhuff",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ロジャーズの来談者中心療法を基盤としつつ、カウンセリングを「かかわり」「応答」「意識化」「手ほどき」などの段階的なスキルとして体系化した「ヘルピング・モデル」の提唱者は誰か。",
    "options": [
      "カーカフ",
      "アイビイ",
      "國分康孝",
      "ウィリアムソン"
    ],
    "answer": 0,
    "image": "s_kakaf.png",
    "name": "カーカフ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "カーカフは、カウンセリングを援助的対人関係のプロセスとして捉え、ロジャーズの理論を発展させて実践的なスキル訓練モデルである「ヘルピング」を体系化しました。",
    "works": [
      {
        "year": 1969,
        "title": "『Helping and Human Relations』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "カウンセリングの技法を細分化し、階層的に整理した「マイクロカウンセリング」を提唱した人物はアイビイですが、それを基盤の1つとし「ヘルピングのプロセス」を体系化した人物は誰か。",
      "options": [
        "1. ロジャーズ",
        "2. カーカフ",
        "3. ベック",
        "4. パールズ"
      ],
      "answer": "2",
      "explanation": "アイビイのマイクロカウンセリングとカーカフのヘルピングは、どちらもカウンセリング技法の訓練モデルとして頻出です。"
    }
  },
  {
    "id": "counseling-kokubu-coffeecup",
    "psychologistId": "kokubu",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "國分康孝が提唱した、カウンセリングのプロセスを「リレーションづくり」「問題の把握」「処置（問題の解決）」の3つの段階からなる形状に例えたモデルはどれか。",
    "options": [
      "コーヒーカップ・モデル",
      "アーチ・モデル",
      "三角形モデル",
      "六角形モデル"
    ],
    "answer": 0,
    "image": "s_kokubu.png",
    "name": "國分康孝",
    "birthCountry": "🇯🇵",
    "birthCountryText": "日本",
    "activeCountry": "🇯🇵",
    "activeCountryText": "日本",
    "lifespan": "1930 - 2018",
    "explanation": "國分康孝は、カウンセリングの展開をコーヒーカップの断面図に例え、表面的な話から深層の問題把握へ降り、再び上昇して処置へ向かうプロセスを「コーヒーカップ・モデル」として示しました。",
    "works": [
      {
        "year": 1979,
        "title": "『カウンセリングの技法』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "國分康孝が提唱した、メンバー同士のふれあいを通じて自己理解や他者理解を深めるグループ・アプローチの名称はどれか。",
      "options": [
        "1. ベーシック・エンカウンター・グループ",
        "2. 構成的グループ・エンカウンター（SGE）",
        "3. Tグループ",
        "4. サイコドラマ"
      ],
      "answer": "2",
      "explanation": "國分康孝は、リーダーが設定した課題（エクササイズ）に沿って進める「構成的グループ・エンカウンター」を開発・普及させました。"
    }
  },
  {
    "id": "motivation-maslow-hierarchy",
    "psychologistId": "maslow",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "マズローが提唱した欲求階層説において、生理的欲求、安全の欲求、所属と愛の欲求、承認の欲求のすべてが満たされた後に現れる、最も高次な欲求はどれか。",
    "options": [
      "自己実現の欲求",
      "親和欲求",
      "権力欲求",
      "成長欲求"
    ],
    "answer": 0,
    "image": "s_masro.png",
    "name": "マズロー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1908 - 1970",
    "explanation": "マズローは人間の欲求を5段階に分類し、低次の欠乏欲求が満たされると、自己の潜在能力を最大限に発揮しようとする最も高次な「自己実現の欲求」が現れると考えました。",
    "works": [
      {
        "year": 1943,
        "title": "「A Theory of Human Motivation」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "マズローの欲求階層説において、他者から尊敬されたい、認められたいという欲求に該当する階層はどれか。",
      "options": [
        "1. 安全の欲求",
        "2. 所属と愛の欲求",
        "3. 承認（尊厳）の欲求",
        "4. 自己実現の欲求"
      ],
      "answer": "3",
      "explanation": "承認の欲求は第4階層に位置し、これが満たされることで自信や自己価値感が生まれます。"
    }
  },
  {
    "id": "counseling-perls-gestalt",
    "psychologistId": "perls",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "パールズが創始した、過去の分析よりも「今、ここ」での気づきと体験を重視し、エンプティ・チェア（空の椅子）などの技法を用いて未完の感情を統合していく心理療法はどれか。",
    "options": [
      "ゲシュタルト療法",
      "交流分析",
      "現実療法",
      "フォーカシング"
    ],
    "answer": 0,
    "image": "s_palse.png",
    "name": "パールズ",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1893 - 1970",
    "explanation": "ゲシュタルト療法は、クライエントが「今、ここ」で何を感じているかに焦点を当て、抑圧された感情や未解決の課題（未完の体験）に気づき、全体性を回復することを目指す療法です。",
    "works": [
      {
        "year": 1951,
        "title": "『Gestalt Therapy』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ゲシュタルト療法において、クライエントの前に空の椅子を置き、対話したい相手がそこにいると想定して対話を行う代表的な技法はどれか。",
      "options": [
        "1. 自由連想法",
        "2. エンプティ・チェア技法",
        "3. 系統的脱感作法",
        "4. モデリング"
      ],
      "answer": "2",
      "explanation": "エンプティ・チェア技法は、自分の中にある葛藤や未解決の感情に直面し、気づきを得るために頻繁に用いられます。"
    }
  },
  {
    "id": "trait-parsons-3steps",
    "psychologistId": "parsons",
    "categoryIds": [
      "trait",
      "career"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "「職業指導の父」と呼ばれ、個人の特性と職業の要件を客観的に分析し、合理的な推論によって両者をマッチングさせる「特性因子理論」を提唱した人物は誰か。",
    "options": [
      "パーソンズ",
      "スーパー",
      "ホランド",
      "ウィリアムソン"
    ],
    "answer": 0,
    "image": "s_parsons.png",
    "name": "F.パーソンズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1854 - 1908",
    "explanation": "フランク・パーソンズは1909年の著書『職業の選択』のなかで、自己理解、職業理解、そしてその2つを科学的に結びつけるマッチングという3段階の支援プロセスを提示し、特性因子論の基礎を築きました。",
    "works": [
      {
        "year": 1909,
        "title": "『職業の選択（Choosing a Vocation）』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "パーソンズの特性因子理論において、キャリアカウンセリングのアプローチとして適切な表現はどれか。",
      "options": [
        "1. 非指示的・来談者主導",
        "2. 診断的・カウンセラー主導",
        "3. 無意識の分析を重視",
        "4. 今、ここでの体験を重視"
      ],
      "answer": "2",
      "explanation": "特性因子論は、客観的データに基づきカウンセラーが専門家として主導的にマッチングを行う「指示的・診断的アプローチ」である点が特徴です。来談者中心療法との対比でよく問われます。"
    }
  },
  {
    "id": "career-schein-anchor-review",
    "psychologistId": "schein",
    "categoryIds": [
      "career",
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "シャインが提唱した、個人がキャリアを選択する際に、どうしても犠牲にしたくない中心的な価値観や欲求を指す概念はどれか。",
    "options": [
      "キャリア・アンカー",
      "ライフ・テーマ",
      "キャリア・サバイバル",
      "キャリア・アダプタビリティ"
    ],
    "answer": 0,
    "image": "s_shaine.png",
    "name": "E.H.シャイン",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2023",
    "explanation": "シャインは、個人の才能・能力、動機・欲求、意味・価値観の3要素から形成され、キャリアの拠り所となる揺るぎない自己概念を「キャリア・アンカー」と呼びました。8つのカテゴリーに分類されます。",
    "works": [
      {
        "year": 1978,
        "title": "『キャリア・ダイナミクス』刊行"
      },
      {
        "year": 1990,
        "title": "『キャリア・アンカー』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シャインの理論において、個人が仕事を通じて自己実現を図る主観的な側面を何と呼ぶか。",
      "options": [
        "1. 外的キャリア",
        "2. 内的キャリア",
        "3. プロティアン・キャリア",
        "4. 統合的キャリア"
      ],
      "answer": "2",
      "explanation": "シャインはキャリアを、履歴書に書けるような「外的キャリア」と、仕事に対する価値観や意味づけなどの「内的キャリア」の2軸で捉えました。"
    }
  },
  {
    "id": "career-super-lifespan-review",
    "psychologistId": "super",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "スーパーが提唱した、キャリアを時間的な広がりである「ライフ・スパン」と空間的な役割の広がりである「ライフ・スペース」の2つの次元から捉えた包括的モデルはどれか。",
    "options": [
      "ライフキャリアレインボー",
      "キャリア・コーン",
      "アーチモデル",
      "トランジション・サイクル"
    ],
    "answer": 0,
    "image": "s_super.png",
    "name": "D.E.スーパー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1994",
    "explanation": "スーパーは、人間が生涯（ライフ・スパン）を通じて経験する様々な役割（子ども、学生、労働者、余暇人などのライフ・スペース）の変遷と組み合わせを、虹の形に例えて「ライフキャリアレインボー」として視覚化しました。",
    "works": [
      {
        "year": 1953,
        "title": "「職業発達の理論」発表"
      },
      {
        "year": 1980,
        "title": "「ライフ・キャリア・レインボー」モデルを提唱"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "スーパーが晩年に提唱した、自己概念が形成される要因を「個人的要因（左柱）」と「社会的要因（右柱）」で構造的に示した図を何と呼ぶか。",
      "options": [
        "1. 六角形モデル",
        "2. コーヒーカップ・モデル",
        "3. アーチモデル",
        "4. トライアングル・モデル"
      ],
      "answer": "3",
      "explanation": "キャリア決定のアーチモデルは、自己概念が自己（内面）と社会（環境）の相互作用によって形成されることを示しています。"
    }
  },
  {
    "id": "transition-schlossberg-4s-review",
    "psychologistId": "schlossberg",
    "categoryIds": [
      "transition",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "シュロスバーグが提唱したトランジション（転機）の理論において、転機を乗り越えるために点検・活用すべき4つの資源（4S）に含まれないものはどれか。",
    "options": [
      "状況（Situation）",
      "自己（Self）",
      "支援（Support）",
      "成功（Success）"
    ],
    "answer": 3,
    "image": "s_syuro.png",
    "name": "N.K.シュロスバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1929 - ",
    "explanation": "シュロスバーグの「4S」は、状況（Situation）、自己（Self）、支援（Support）、戦略（Strategies）の4つを指します。これらを点検することで、転機への適切な対処が可能になるとしました。",
    "works": [
      {
        "year": 1984,
        "title": "『Counseling Adults in Transition』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シュロスバーグのトランジション理論において、期待していた出来事が起こらなかった場合の転機を何と分類するか。",
      "options": [
        "1. イベント",
        "2. ノンイベント",
        "3. アンティシペイト・イベント",
        "4. クライシス"
      ],
      "answer": "2",
      "explanation": "昇進できると思っていたのにできなかった、など、期待していた出来事が起きなかった転機を「ノンイベント」と呼びます。"
    }
  },
  {
    "id": "counseling-adler-basic",
    "psychologistId": "adler",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "アドラーが提唱した個人心理学の基本的な考え方として、最も適切なものはどれか。",
    "options": [
      "人間の行動は無意識の葛藤によって決定される",
      "人間の行動には目的があり、全体として統一体である",
      "環境からの刺激とそれに対する反応の結びつきで説明する",
      "人間の欲求は5つの階層から構成されていると考える"
    ],
    "answer": 1,
    "image": "2_1adra.png",
    "name": "A.アドラー",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1870 - 1937",
    "explanation": "アドラーの個人心理学は、人間の行動は過去の要因（原因論）ではなく未来の目標（目的論）に向かっているとし、人間を分割できない統一体と捉えます。劣等感と補償、共同体感覚、勇気づけなども重要なキーワードです。",
    "works": [
      {
        "year": 1911,
        "title": "個人心理学を提唱"
      },
      {
        "year": 1927,
        "title": "『人間知の心理学』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アドラー心理学において、個人が社会や他者と結びついているという感覚や、他者に貢献しようとする態度を指す重要な概念はどれか。",
      "options": [
        "1. 集合的無意識",
        "2. 共同体感覚",
        "3. 自己一致",
        "4. 自我同一性"
      ],
      "answer": "2",
      "explanation": "アドラーは「共同体感覚」を精神的な健康の指標とし、他者への関心や貢献感を重視しました。"
    }
  },
  {
    "id": "psychoanalysis-annafreud-defense",
    "psychologistId": "annafreud",
    "categoryIds": [
      "psychoanalysis"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "自我が不安から身を守るために無意識的に用いる心理的メカニズムである「防衛機制」を体系化した人物は誰か。",
    "options": [
      "アンナ・フロイト",
      "メラニー・クライン",
      "カレン・ホーナイ",
      "マーガレット・マーラー"
    ],
    "answer": 0,
    "image": "2_1anna.png",
    "name": "アンナ・フロイト",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇬🇧",
    "activeCountryText": "ｲｷﾞﾘｽ",
    "lifespan": "1895 - 1982",
    "explanation": "アンナ・フロイトはジークムント・フロイトの娘であり、父が提唱した「防衛機制」の概念を整理・体系化しました。防衛機制には、抑圧、投影、合理化、反動形成、昇華などがあります。",
    "works": [
      {
        "year": 1936,
        "title": "『自我と防衛機制』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "防衛機制のうち、自分の受け入れがたい感情や欲求を、他者が持っているかのように感じる働きを何と呼ぶか。",
      "options": [
        "1. 抑圧",
        "2. 投影",
        "3. 昇華",
        "4. 退行"
      ],
      "answer": "2",
      "explanation": "自分が相手を嫌っているのに「相手が自分を嫌っている」と感じるようなメカニズムを「投影」と呼びます。"
    }
  },
  {
    "id": "psychoanalysis-freud-structure",
    "psychologistId": "freud",
    "categoryIds": [
      "psychoanalysis"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "フロイトが提唱した心の構造論において、現実原則に従い、本能的欲求と道徳的規範の間を調整する働きを持つものはどれか。",
    "options": [
      "イド（エス）",
      "超自我（スーパーエゴ）",
      "自我（エゴ）",
      "無意識"
    ],
    "answer": 2,
    "image": "s_froit.png",
    "name": "フロイト",
    "birthCountry": "🇨🇿",
    "birthCountryText": "ﾁｪｺ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1856 - 1939",
    "explanation": "フロイトは心を機能的に3つに分類しました。イドは快楽原則に従う本能的欲求、超自我は道徳的・良心的な規範であり、自我（エゴ）は現実原則に従いこれらを調整する役割を持ちます。",
    "works": [
      {
        "year": 1900,
        "title": "『夢判断』刊行"
      },
      {
        "year": 1923,
        "title": "『自我とエス』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "フロイトが開発した、クライエントに思い浮かんだことを検閲せずにすべて話してもらい、無意識の内容を意識化することを目指す治療技法はどれか。",
      "options": [
        "1. エンプティ・チェア技法",
        "2. 自由連想法",
        "3. 系統的脱感作法",
        "4. 論駁（ディスピューティング）"
      ],
      "answer": "2",
      "explanation": "無意識を探求し、抑圧された葛藤を意識化するための代表的な精神分析の技法が「自由連想法」です。"
    }
  },
  {
    "id": "decision-gelatt-process",
    "psychologistId": "gelatt",
    "categoryIds": [
      "career",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ジェラットの意思決定理論において、意思決定を行うプロセスとして提唱された3段階のシステムとして、正しいものはどれか。",
    "options": [
      "予期システム、実行システム、修正システム",
      "予測システム、評価システム、決定システム",
      "探索システム、確立システム、維持システム",
      "状況システム、自己システム、支援システム"
    ],
    "answer": 1,
    "image": "2_1jerat.png",
    "name": "H.B.ジェラット",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1926 - 2021",
    "explanation": "ジェラットは前期理論の連続的意思決定プロセスにおいて、「予測システム（結果を予測する）」、「評価システム（価値を整理する）」、「決定システム（基準を決める）」の3段階を踏むとしました。",
    "works": [
      {
        "year": 1962,
        "title": "意思決定の連続的プロセスを提唱"
      },
      {
        "year": 1989,
        "title": "「積極的不確実性」発表"
      },
      {
        "year": 2003,
        "title": "『Creative Decision Making: Using Positive Uncertainty』改訂版"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ジェラットが後期に提唱した、不確実な未来に対しても肯定的に認知し、客観的で合理的な戦略と主観的で直感的な戦略を統合して意思決定を行う概念はどれか。",
      "options": [
        "1. 積極的不確実性",
        "2. 計画された偶発性",
        "3. 認知的不協和の解消",
        "4. キャリア・アダプタビリティ"
      ],
      "answer": "1",
      "explanation": "社会の不確実さを受け入れ、右脳と左脳の両方を活用する全脳型アプローチを「積極的不確実性」と呼びます。"
    }
  },
  {
    "id": "career-savickas-adaptability-added",
    "psychologistId": "savickas",
    "categoryIds": [
      "career",
      "narrative"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "サビカスのキャリア構築理論における「キャリア・アダプタビリティ」を構成する4つの次元（4C）として、正しい組み合わせはどれか。",
    "options": [
      "好奇心、持続性、柔軟性、楽観性",
      "関心、統制、好奇心、自信",
      "予測、評価、決定、修正",
      "状況、自己、支援、戦略"
    ],
    "answer": 1,
    "image": "2_1savikas.png",
    "name": "M.L.サビカス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1947 - ",
    "explanation": "サビカスは、変化する環境に適応する力である「キャリア・アダプタビリティ」を、関心（Concern）、統制（Control）、好奇心（Curiosity）、自信（Confidence）の4つのCで構成されるとしました。",
    "works": [
      {
        "year": 2005,
        "title": "「キャリア構築理論」発表（スーパーの理論を21世紀向けに拡張）"
      },
      {
        "year": 2011,
        "title": "『キャリア・カウンセリング（Career Counseling）』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "サビカスのキャリア構築理論において、クライエント自身に「人生物語の著者」となってもらうためのナラティヴ・アプローチの技法はどれか。",
      "options": [
        "1. キャリア構築インタビュー",
        "2. エンプティ・チェア技法",
        "3. 構成的グループ・エンカウンター",
        "4. フォーカシング"
      ],
      "answer": "1",
      "explanation": "キャリア構築インタビューでは、「ロールモデル」「よく見た雑誌」「お気に入りのストーリー」などを質問し、クライエントのライフテーマを特定する支援を行います。"
    }
  },
  {
    "id": "cbt-beck-automatic-thoughts",
    "psychologistId": "beck",
    "categoryIds": [
      "cbt",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ベックが創始した認知療法において、特定の状況で瞬間的・無意識的に頭に浮かぶネガティブな思考を何と呼ぶか。",
    "options": [
      "イラショナル・ビリーフ",
      "防衛機制",
      "自動思考",
      "認知的不協和"
    ],
    "answer": 2,
    "image": "2_2bek.png",
    "name": "A.T.ベック",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1921 - 2021",
    "explanation": "ベックの認知療法は、感情や行動に影響を与える「自動思考（特定の状況で瞬間的に浮かぶ思考）」に焦点を当て、その認知の歪みを客観的に検証し修正していく治療法です。",
    "works": [
      {
        "year": 1967,
        "title": "『Depression: Clinical, Experimental, and Theoretical Aspects』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アーロン・ベックの認知療法とアルバート・エリスの論理療法（REBT）は、広義の治療アプローチとしてどちらに分類されるか。",
      "options": [
        "1. 精神分析療法",
        "2. 人間性心理学（来談者中心療法など）",
        "3. 認知行動療法（CBT）",
        "4. ゲシュタルト療法"
      ],
      "answer": "3",
      "explanation": "どちらも思考や認知の変容に焦点を当てるアプローチであり、行動療法と統合されて形成された「認知行動療法（CBT）」の枠組みに含まれます。"
    }
  },
  {
    "id": "cbt-pavlov-conditioning",
    "psychologistId": "pavlov",
    "categoryIds": [
      "cbt"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "パブロフが犬の唾液分泌の実験から見出した、中性刺激と無条件刺激を対提示することで条件反応が形成される学習メカニズムを何と呼ぶか。",
    "options": [
      "オペラント条件づけ",
      "古典的条件づけ（レスポンデント条件づけ）",
      "社会的学習理論",
      "観察学習（モデリング）"
    ],
    "answer": 1,
    "image": "2_2pablov.png",
    "name": "I.P.パブロフ",
    "birthCountry": "🇷🇺",
    "birthCountryText": "ﾛｼｱ",
    "activeCountry": "🇷🇺",
    "activeCountryText": "ﾛｼｱ",
    "lifespan": "1849 - 1936",
    "explanation": "パブロフは、ベルの音（中性刺激）と餌（無条件刺激）を結びつけることで、音だけで唾液が出るようになる「古典的条件づけ（レスポンデント条件づけ）」を提唱しました。これは行動療法の基礎理論の1つです。",
    "works": [
      {
        "year": 1904,
        "title": "ノーベル生理学・医学賞受賞"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "パブロフの古典的条件づけを基礎理論として応用し、不安や恐怖を段階的に軽減する「系統的脱感作法」を考案した人物は誰か。",
      "options": [
        "1. ウォルピ",
        "2. スキナー",
        "3. バンデューラ",
        "4. ベック"
      ],
      "answer": "1",
      "explanation": "ウォルピは古典的条件づけの「逆条件づけ」の原理を応用し、リラクセーションと不安を対提示する系統的脱感作法を開発しました。"
    }
  },
  {
    "id": "cbt-wolpe-desensitization",
    "psychologistId": "wolpe",
    "categoryIds": [
      "cbt",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ウォルピが考案した行動療法の代表的技法であり、リラクセーション訓練と不安階層表を用いて、不安や恐怖を段階的に軽減していく方法はどれか。",
    "options": [
      "トークンエコノミー法",
      "系統的脱感作法",
      "エンプティ・チェア技法",
      "自由連想法"
    ],
    "answer": 1,
    "image": "2_2wolpi.png",
    "name": "J.ウォルピ",
    "birthCountry": "🇿🇦",
    "birthCountryText": "南ｱﾌﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1915 - 1997",
    "explanation": "ウォルピの系統的脱感作法は、パブロフの古典的条件づけ（逆制止）を応用し、不安を感じる場面を弱い順にイメージさせながらリラックス状態を保たせることで、不安を段階的に解消する技法です。",
    "works": [
      {
        "year": 1958,
        "title": "『Psychotherapy by Reciprocal Inhibition』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ウォルピの系統的脱感作法の基盤となっている、心理学の学習理論の原理として最も適切なものはどれか。",
      "options": [
        "1. 古典的条件づけ",
        "2. オペラント条件づけ",
        "3. 社会的学習理論",
        "4. 洞察学習"
      ],
      "answer": "1",
      "explanation": "系統的脱感作法は、刺激と反応の結びつきである「古典的条件づけ（レスポンデント条件づけ）」の逆条件づけの原理を用いています。"
    }
  },
  {
    "id": "psychoanalysis-jung-unconscious",
    "psychologistId": "jung",
    "categoryIds": [
      "psychoanalysis"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ユングの分析心理学において、人類の歴史を通じて形成された普遍的で先天的な無意識の領域であり、「元型」が存在する層を何と呼ぶか。",
    "options": [
      "前意識",
      "個人的無意識",
      "集合的無意識",
      "超自我"
    ],
    "answer": 2,
    "image": "2_2yung.png",
    "name": "C.G.ユング",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇨🇭",
    "activeCountryText": "ｽｲｽ",
    "lifespan": "1875 - 1961",
    "explanation": "ユングは無意識を、個人の経験に基づく「個人的無意識」と、人類が共有する普遍的な「集合的無意識」に分けました。集合的無意識にはペルソナやシャドウなどの元型（アーキタイプ）が存在します。",
    "works": [
      {
        "year": 1921,
        "title": "『心理学的類型』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ユングが提唱した、一生を1日の太陽の運行になぞらえ、人生の転換期として位置づけた「人生の正午」に該当する年代は概ねどれか。",
      "options": [
        "1. 20歳",
        "2. 40歳",
        "3. 60歳",
        "4. 80歳"
      ],
      "answer": "2",
      "explanation": "ユングは40歳頃を「人生の正午」と呼び、価値観の転換や自己の再統合（個性化のプロセス）が求められる重要な時期であるとしました。"
    }
  },
  {
    "id": "cbt-skinner-operant",
    "psychologistId": "skinner",
    "categoryIds": [
      "cbt"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "スキナーが提唱した、行動の結果（報酬や罰）によって、その後の自発的な行動の頻度が変化するという学習の原理を何と呼ぶか。",
    "options": [
      "オペラント条件づけ",
      "古典的条件づけ",
      "観察学習",
      "認知的不協和"
    ],
    "answer": 0,
    "image": "2_3skina.png",
    "name": "B.F.スキナー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1904 - 1990",
    "explanation": "スキナーは、望ましい行動には報酬を与え（正の強化）、望ましくない行動には報酬を与えない（消去）ことで行動を形成していく「オペラント条件づけ」を提唱しました。行動療法の重要な基礎理論です。",
    "works": [
      {
        "year": 1938,
        "title": "『The Behavior of Organisms』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "オペラント条件づけの原理を応用し、望ましい行動をとった際に代用貨幣を与え、それが一定数貯まると実際の報酬と交換できる行動療法の技法はどれか。",
      "options": [
        "1. 系統的脱感作法",
        "2. モデリング",
        "3. トークンエコノミー法",
        "4. アサーション・トレーニング"
      ],
      "answer": "3",
      "explanation": "トークンエコノミー法は、オペラント条件づけの「正の強化」を利用して、集団場面などで望ましい行動を定着させるのに適した技法です。"
    }
  },
  {
    "id": "counseling-schultz-autogenic",
    "psychologistId": "schultz",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "シュルツが提唱した、自己暗示を用いて心身の緊張を解きほぐし、ストレス緩和や心身症の治療に効果があるとされるリラクセーション法はどれか。",
    "options": [
      "漸進的筋弛緩法",
      "自律訓練法",
      "系統的脱感作法",
      "フォーカシング"
    ],
    "answer": 1,
    "image": "2_3syuru.png",
    "name": "J.H.シュルツ",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇩🇪",
    "activeCountryText": "ﾄﾞｲﾂ",
    "lifespan": "1884 - 1970",
    "explanation": "シュルツの自律訓練法は、「気持ちが落ち着いている」「手足が重い・温かい」などの公式を用いた自己暗示（自己催眠法）により、自律神経のバランスを整え、心身のリラックスを図る技法です。",
    "works": [
      {
        "year": 1932,
        "title": "自律訓練法を体系化"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シュルツが提唱した自律訓練法のベースとなっている考え方として最も適切なものはどれか。",
      "options": [
        "1. 自己催眠法",
        "2. 筋肉の緊張と弛緩の繰り返し",
        "3. 言葉にならない身体感覚への気づき",
        "4. 無意識の葛藤の意識化"
      ],
      "answer": "1",
      "explanation": "自律訓練法は自己催眠状態を意図的に作り出すことでリラクセーション効果を得る方法です。筋肉の緊張・弛緩はジェイコブソンの漸進的筋弛緩法です。"
    }
  },
  {
    "id": "other-wundt-experimental",
    "psychologistId": "wundt",
    "categoryIds": [
      "other"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "1879年にライプツィヒ大学に世界初の心理学実験室を設立し、「実験心理学の父」と呼ばれ、意識の構造を内観法を用いて研究した人物は誰か。",
    "options": [
      "ヴント",
      "ワトソン",
      "ジェームズ",
      "エビングハウス"
    ],
    "answer": 0,
    "image": "2_3vunt.png",
    "name": "W.ヴント",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇩🇪",
    "activeCountryText": "ﾄﾞｲﾂ",
    "lifespan": "1832 - 1920",
    "explanation": "ヴントは心理学を哲学から独立させ、科学的・実験的な学問として確立した近代心理学の創始者です。被験者が自身の意識的経験を報告する「内観法（自己観察法）」を用い、意識を要素に分解して研究しました。",
    "works": [
      {
        "year": 1879,
        "title": "ライプチヒ大学に心理学実験室を設立"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ヴントがライプツィヒ大学に心理学実験室を設立したことで確立された、心理学の分野はどれか。",
      "options": [
        "1. 発達心理学",
        "2. 実験心理学",
        "3. 社会心理学",
        "4. 人間性心理学"
      ],
      "answer": "2",
      "explanation": "ヴントの実験室設立により、心理学は実証的・科学的な「実験心理学」として独立した学問分野となりました。"
    }
  },
  {
    "id": "trait-williamson-6steps",
    "psychologistId": "williamson",
    "categoryIds": [
      "trait",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "パーソンズの特性因子理論を発展させ、学生相談の基本概念として「分析・総合・診断・予後・カウンセリング・追指導」の6段階のプロセスを提唱した人物は誰か。",
    "options": [
      "ホランド",
      "プレディガー",
      "ウィリアムソン",
      "スーパー"
    ],
    "answer": 2,
    "image": "2_3will.png",
    "name": "E.G.ウィリアムソン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1900 - 1979",
    "explanation": "ウィリアムソンは、ミネソタ大学での学生相談の経験から特性因子カウンセリングを体系化し、カウンセラー主導の指示的・診断的アプローチである6段階の支援プロセスを確立しました。",
    "works": [
      {
        "year": 1939,
        "title": "ミネソタ・アプローチを発展"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ウィリアムソンの特性因子カウンセリングにおいて、職業選択の際に生じる課題（不確かな選択、興味と適性のズレなど）を特定するプロセスはどれか。",
      "options": [
        "1. 分析",
        "2. 総合",
        "3. 診断",
        "4. 予後"
      ],
      "answer": "3",
      "explanation": "「診断」の段階で、カウンセラーは収集した情報を基に問題の性質や原因（賢明でない選択など）を専門家として特定します。"
    }
  },
  {
    "id": "counseling-berne-ego-state",
    "psychologistId": "berne",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "エリック・バーンが創始した交流分析において、人間の自我状態を3つに分類したモデルとして、正しいものはどれか。",
    "options": [
      "イド、自我、超自我",
      "P（親）、A（成人）、C（子ども）",
      "現実的、研究的、社会的",
      "内向型、外向型、両向型"
    ],
    "answer": 1,
    "image": "3_1barn.png",
    "name": "E.バーン",
    "birthCountry": "🇨🇦",
    "birthCountryText": "ｶﾅﾀﾞ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1970",
    "explanation": "バーンの交流分析では、自我状態をParent（親の自我状態）、Adult（成人の自我状態）、Child（子どもの自我状態）の3つ（P・A・C）に分類し、人間関係のコミュニケーション構造を分析します。",
    "works": [
      {
        "year": 1964,
        "title": "『Games People Play』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "交流分析において、表面的には普通のやり取りに見えるが、最終的に双方が不快な感情を抱く結果で終わる繰り返されるコミュニケーションパターンを何と呼ぶか。",
      "options": [
        "1. ストローク",
        "2. ゲーム",
        "3. ライフスクリプト（人生脚本）",
        "4. エゴグラム"
      ],
      "answer": "2",
      "explanation": "「はい、でも…」など、不快な感情（ラケット感情）で終わるこじれたやり取りのパターンを「ゲーム」と呼びます。"
    }
  },
  {
    "id": "motivation-mcgregor-xy",
    "psychologistId": "mcgregor",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "マクレガーが提唱した、人間は怠惰で強制されないと働かないとする「X理論」と、条件次第で自ら進んで働き責任を引き受けるとする「Y理論」の対数概念を何と呼ぶか。",
    "options": [
      "X理論・Y理論",
      "二要因理論",
      "達成動機理論",
      "ERG理論"
    ],
    "answer": 0,
    "image": "3_1macrega-.png",
    "name": "D.マグレガー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1906 - 1964",
    "explanation": "マクレガーは、伝統的な管理手法の前提である「X理論（人間は生来怠け者）」に対し、自己実現欲求に基づく「Y理論（人間は条件次第で進んで働く）」を提唱し、自律的な動機づけの重要性を説きました。",
    "works": [
      {
        "year": 1960,
        "title": "『The Human Side of Enterprise』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "マクレガーのX理論・Y理論において、Y理論に基づいた従業員のマネジメント手法として最も適切なものはどれか。",
      "options": [
        "1. アメとムチによる信賞必罰",
        "2. 厳格な規則と監視による統制",
        "3. 権限委譲と目標管理による自己統制",
        "4. 細かいマニュアルによる作業の標準化"
      ],
      "answer": "3",
      "explanation": "Y理論では、従業員の自主性や自己実現の欲求を信頼し、権限を委譲して目標を与え、自律的に取り組ませるマネジメントが有効とされます。"
    }
  },
  {
    "id": "motivation-mcclelland-achievement",
    "psychologistId": "mcclelland",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "マクレランドが提唱した動機づけ理論において、職場における主要な社会的欲求として挙げられた3つの動機（後に回避欲求を追加）に含まれないものはどれか。",
    "options": [
      "達成動機（欲求）",
      "権力動機（欲求）",
      "親和動機（欲求）",
      "承認動機（欲求）"
    ],
    "answer": 3,
    "image": "3_1macrerand.png",
    "name": "D.C.マクレランド",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1917 - 1998",
    "explanation": "マクレランドは、達成動機理論において人間の動機を「達成欲求」「権力欲求」「親和欲求」の3つに分類しました（のちに「回避欲求」を追加）。強すぎる達成動機は自己実現を阻害することもあると指摘しました。",
    "works": [
      {
        "year": 1961,
        "title": "『The Achieving Society』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "マクレランドの達成動機理論において、他者との友好的で親密な関係を結び、他者から好かれたいと願う欲求はどれか。",
      "options": [
        "1. 達成欲求",
        "2. 権力欲求",
        "3. 親和欲求",
        "4. 回避欲求"
      ],
      "answer": "3",
      "explanation": "親和欲求（親和動機）は、他者との良好な人間関係を維持したいという欲求です。権力欲求は他者をコントロールしたい欲求、達成欲求は困難な課題を成し遂げたい欲求です。"
    }
  },
  {
    "id": "transition-nicholson-cycle",
    "psychologistId": "nicholson",
    "categoryIds": [
      "transition",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ニコルソンが提唱した、キャリアのトランジション（転機）のプロセスを円環的に捉えた「トランジション・サイクル」の4つの段階として、正しい順序はどれか。",
    "options": [
      "準備 → 遭遇 → 適応 → 安定化",
      "予測 → 評価 → 決定 → 実行",
      "終焉 → ニュートラル・ゾーン → 開始",
      "成長 → 探索 → 確立 → 維持"
    ],
    "answer": 0,
    "image": "3_1nikolson.png",
    "name": "N.ニコルソン",
    "birthCountry": "🇬🇧",
    "birthCountryText": "ｲｷﾞﾘｽ",
    "activeCountry": "🇬🇧",
    "activeCountryText": "ｲｷﾞﾘｽ",
    "lifespan": "生没年未確認",
    "explanation": "ニコルソンは、転機を「準備（Preparation）」「遭遇（Encounter）」「適応（Adjustment）」「安定化（Stabilization）」の4つの段階が螺旋的に上昇していくサイクルモデルとして提唱しました。",
    "works": [
      {
        "year": 1984,
        "title": "トランジションサイクルを提示"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ニコルソンのトランジション・サイクルにおいて、新しい役割や環境に対して実際に意味づけを行い、変化を受け入れていく段階はどれか。",
      "options": [
        "1. 準備",
        "2. 遭遇",
        "3. 適応",
        "4. 安定化"
      ],
      "answer": "3",
      "explanation": "「適応」の段階では、新しい環境において自分自身を変化させたり、環境に働きかけたりして折り合いをつけていきます。"
    }
  },
  {
    "id": "career-ginzberg-stages",
    "psychologistId": "ginzberg",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ギンズバーグが提唱した職業選択発達理論において、職業選択のプロセスを構成する3つの発達段階の順序として正しいものはどれか。",
    "options": [
      "成長期 → 探索期 → 確立期",
      "空想期 → 試行期 → 現実期",
      "準備期 → 遭遇期 → 適応期",
      "分析 → 総合 → 診断"
    ],
    "answer": 1,
    "image": "3_2ginz.png",
    "name": "E.ギンズバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1911 - 2002",
    "explanation": "ギンズバーグは職業選択を長期的発達プロセスとし、「空想期（〜11歳）」「試行期（11〜17歳）」「現実期（17歳〜）」の3段階を提唱しました。初期は「不可逆的で妥協を伴う」としましたが、後に「絶対的に不可逆ではない（最適化のプロセス）」と理論を修正しました。",
    "works": [
      {
        "year": 1951,
        "title": "『職業選択（Occupational Choice）』刊行（初期理論）"
      },
      {
        "year": 1972,
        "title": "「再定式化（職業選択は生涯にわたるプロセスである）」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ギンズバーグが理論を修正した際、職業選択のプロセスについて「妥協」という言葉から置き換えた表現はどれか。",
      "options": [
        "1. 同一化",
        "2. 適応",
        "3. 最適化",
        "4. 統合"
      ],
      "answer": "3",
      "explanation": "ギンズバーグは、個人の欲求と現実との間での「妥協」で終結するとしていた考えを、後年に自己の希望と現実との間の「最適化（最適の適合を模索するプロセス）」へと修正しました。"
    }
  },
  {
    "id": "decision-hilton-dissonance",
    "psychologistId": "hilton",
    "categoryIds": [
      "career",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "個人の自己概念などの「前提」と「外界からの情報」との間に生じた不一致を解消するプロセスが意思決定であると考え、フェスティンガーの認知的不協和理論を応用した理論家は誰か。",
    "options": [
      "ジェラット",
      "ティードマン",
      "ヒルトン",
      "クランボルツ"
    ],
    "answer": 2,
    "image": "3_2hilton.png",
    "name": "T.L.ヒルトン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "ヒルトンは、キャリアの意思決定を機械的な回路に例え、自分の中の前提（自己概念や希望）と外界からの情報が食い違う「認知的不協和」が生じた際に、それを解消しようとする過程が意思決定であるとしました。",
    "works": [
      {
        "year": 1962,
        "title": "認知的不協和を用いた意思決定モデルを提示"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ヒルトンの意思決定モデルにおいて、不協和の解消を説明するために応用された、社会心理学の基礎理論の提唱者は誰か。",
      "options": [
        "1. バンデューラ",
        "2. フェスティンガー",
        "3. レビン",
        "4. モレノ"
      ],
      "answer": "2",
      "explanation": "ヒルトンは、L.フェスティンガーが提唱した「認知的不協和理論」をキャリアの意思決定プロセスに応用しました。"
    }
  },
  {
    "id": "social-lewin-marginal",
    "psychologistId": "lewin",
    "categoryIds": [
      "social",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "青年期を「子ども」と「大人」のどちらの集団にも完全には属さない不安定な中間的存在として捉え、「周辺人（マージナルマン・境界人）」と呼んだ理論家は誰か。",
    "options": [
      "ハヴィガースト",
      "エリクソン",
      "レビン",
      "ブロンフェンブレンナー"
    ],
    "answer": 2,
    "image": "3_2rebin.png",
    "name": "K.レビン",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1890 - 1947",
    "explanation": "クルト・レビンは、児童期と成人期の間でどちらの集団にも完全には属せず、心理的・社会的に不安定な状態にある青年を「周辺人（マージナルマン）」と名付けました。またTグループの提唱者でもあります。",
    "works": [
      {
        "year": 1935,
        "title": "『A Dynamic Theory of Personality』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "レビンが提唱した、参加者相互の自由なコミュニケーションを通じて自己理解や人間的成長を目指す小集団体験学習の名称はどれか。",
      "options": [
        "1. サイコドラマ",
        "2. Tグループ",
        "3. エンカウンター・グループ",
        "4. フォーカシング"
      ],
      "answer": "2",
      "explanation": "レビンはグループ・ダイナミックス（集団力学）の研究から、感受性訓練である「Tグループ」を提唱しました。"
    }
  },
  {
    "id": "development-levinson-seasons",
    "psychologistId": "levinson",
    "categoryIds": [
      "development",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "成人の発達を「安定期」と「過渡期（移行期）」が交互に現れるプロセスとして捉え、特に40歳から45歳頃に訪れる「人生半ばの過渡期」の重要性を指摘した理論家は誰か。",
    "options": [
      "エリクソン",
      "レビンソン",
      "スーパー",
      "シャイン"
    ],
    "answer": 1,
    "image": "3_2rebinson.png",
    "name": "D.J.レビンソン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1920 - 1994",
    "explanation": "レビンソンは「人生の四季理論」を提唱し、生活構造の安定期と各段階の境目にある過渡期を繰り返すとしました。40代前半の「人生半ばの過渡期（ミッドライフ・クライシス）」は自己のキャリアを再評価する重要な時期です。",
    "works": [
      {
        "year": 1978,
        "title": "『The Seasons of a Man's Life』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "レビンソンが「人生半ばの過渡期」において、解決すべき主要な課題とした『4つの両極性』に含まれないものはどれか。",
      "options": [
        "1. 若さと老い",
        "2. 破壊と創造",
        "3. 男らしさと女らしさ",
        "4. 自律と依存"
      ],
      "answer": "4",
      "explanation": "レビンソンは人生半ばの過渡期の課題として「若さと老い」「破壊と創造」「男らしさと女らしさ」「愛着と分離」の4つの両極性の統合を挙げました。自律と依存は含まれません。"
    }
  },
  {
    "id": "decision-tiedeman-anticipation",
    "psychologistId": "tiedeman",
    "categoryIds": [
      "career",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ティードマンが提唱したキャリアの意思決定プロセスにおいて、意思決定の過程を大きく2つに分けた場合の正しい組み合わせはどれか。",
    "options": [
      "予測と決定",
      "予期と実行",
      "準備と適応",
      "空想と現実"
    ],
    "answer": 1,
    "image": "3_2tidman.png",
    "name": "ティードマン＆オハラ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "ティードマン（とオハラ）は、意思決定のプロセスを将来を思い描く「予期の4段階（探索、結晶化、選択、明確化）」と、実際の行動に移す「実行の3段階（導入、改革、統合）」に分けました。",
    "works": [
      {
        "year": 1963,
        "title": "キャリア意思決定のプロセスを提示"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ティードマンの意思決定プロセスにおいて、「実行」の段階に含まれる3つのステップとして正しいものはどれか。",
      "options": [
        "1. 探索、結晶化、選択",
        "2. 予測、評価、決定",
        "3. 導入、改革、統合",
        "4. 状況、自己、支援"
      ],
      "answer": "3",
      "explanation": "実行の段階は、新しい集団に入る「導入」、自己主張する「改革」、集団と自己が妥協する「統合」の3ステップです。探索・結晶化は「予期」の段階です。"
    }
  },
  {
    "id": "counseling-ivey-microcounseling",
    "psychologistId": "ivey",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "アイビイが開発した、カウンセリングの技法を細分化し、階層的に整理してトレーニングを行いやすくした手法（モデル）を何と呼ぶか。",
    "options": [
      "マイクロカウンセリング",
      "ヘルピング・モデル",
      "システマティック・アプローチ",
      "コーヒーカップ・モデル"
    ],
    "answer": 0,
    "image": "3_3aivi.png",
    "name": "A.E.アイビィ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1933 - ",
    "explanation": "アイビイはカウンセリングの基本的な技法を抽出し、それを「かかわり行動」「かかわり技法」「積極技法」といった階層的な三角形のモデル（技法階層表）で示したマイクロカウンセリングを提唱しました。",
    "works": [
      {
        "year": 1968,
        "title": "マイクロカウンセリングを開発"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アイビイのマイクロカウンセリングにおいて、全てのカウンセリング技法の基盤となる最も土台のスキルを何と呼ぶか。",
      "options": [
        "1. かかわり行動",
        "2. 感情の反映",
        "3. 意味の反映",
        "4. 積極技法"
      ],
      "answer": "1",
      "explanation": "階層表の最下層（土台）には、視線、身体言語、声の調子、言語的追跡といった非言語的・基礎的スキルである「かかわり行動」が位置しています。"
    }
  },
  {
    "id": "social-bronfenbrenner-ecology",
    "psychologistId": "bronfenbrenner",
    "categoryIds": [
      "social",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "個人の発達に影響を及ぼす環境を「ミクロシステム」「メゾシステム」「エクソシステム」「マクロシステム」の4つの次元（多重構造）に分類した「相互連結の原則」の提唱者は誰か。",
    "options": [
      "ハンセン",
      "ブロンフェンブレンナー",
      "クランボルツ",
      "サビカス"
    ],
    "answer": 1,
    "image": "3_3bronf.png",
    "name": "U.ブロンフェンブレンナー",
    "birthCountry": "🇷🇺",
    "birthCountryText": "ﾛｼｱ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1917 - 2005",
    "explanation": "ブロンフェンブレンナーは社会生態学的システム理論において、個人の発達は家族や地域、文化といった多重構造の環境との相互作用（相互連結の原則）によって形成されるとしました。",
    "works": [
      {
        "year": 1979,
        "title": "『The Ecology of Human Development』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ブロンフェンブレンナーの理論において、直接の相互作用を持たないが、個人の発達に間接的に影響を与える環境（例：親の職場など）を指すシステムはどれか。",
      "options": [
        "1. ミクロシステム",
        "2. メゾシステム",
        "3. エクソシステム",
        "4. マクロシステム"
      ],
      "answer": "3",
      "explanation": "親の職場や地域の教育委員会など、本人が直接属していないが影響を及ぼす環境を「エクソシステム」と呼びます。"
    }
  },
  {
    "id": "development-havighurst-tasks",
    "psychologistId": "havighurst",
    "categoryIds": [
      "development"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "人間が健全で幸福な発達を遂げるためには、各発達段階において達成しておくべき社会的な期待や課題があるとし、「発達課題」という概念を体系化した理論家は誰か。",
    "options": [
      "ハヴィガースト",
      "エリクソン",
      "レビンソン",
      "スーパー"
    ],
    "answer": 0,
    "image": "3_3habi.png",
    "name": "R.J.ハヴィガースト",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1900 - 1991",
    "explanation": "ハヴィガーストは、発達段階を乳幼児期、児童期、青年期、壮年期、中年期、老年期の6段階に分け、それぞれの時期に達成が求められる「発達課題」を提示しました。",
    "works": [
      {
        "year": 1948,
        "title": "『Developmental Tasks and Education』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ハヴィガーストの理論において、経済的独立の必要性の理解や、職業の選択・準備を行うことが発達課題とされている段階はどれか。",
      "options": [
        "1. 児童期",
        "2. 青年期",
        "3. 壮年期（初期成人期）",
        "4. 中年期"
      ],
      "answer": "2",
      "explanation": "「経済的独立に関する自信の確立」や「職業の選択と準備」は、青年期の発達課題として挙げられています。"
    }
  },
  {
    "id": "social-mayo-hawthorne",
    "psychologistId": "mayo_roethlisberger",
    "categoryIds": [
      "social"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "メイヨーやレスリスバーガーらがホーソン工場で行った実験により、労働者の生産性に最も影響を与える要因として見出されたものはどれか。",
    "options": [
      "作業環境の照明の明るさ",
      "賃金や労働時間などの労働条件",
      "職場内で自然発生したインフォーマルな人間関係",
      "明確に規定された作業手順とマニュアル"
    ],
    "answer": 2,
    "image": "3_3hoson.png",
    "name": "メイヨー＆レスリスバーガー",
    "birthCountry": "🇦🇺",
    "birthCountryText": "ｵｰｽﾄﾗﾘｱ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "ホーソン実験の結果、労働者の生産性は物理的な作業環境（照明など）や労働条件よりも、職場内の自然発生的な人間関係（インフォーマル・グループ）や労働者の感情・モラールに強く影響されることが分かりました。",
    "works": [
      {
        "year": 1933,
        "title": "ホーソン研究に基づく人間関係論を発展"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ホーソン実験の結論から発展した、組織における人間的な感情や社会的な結びつきを重視する管理論の名称はどれか。",
      "options": [
        "1. 科学的管理法",
        "2. 人間関係論",
        "3. 目標管理制度",
        "4. 特性因子論"
      ],
      "answer": "2",
      "explanation": "ホーソン実験は、テイラーの科学的管理法に対する批判的知見を提供し、「人間関係論」の基礎を築きました。"
    }
  },
  {
    "id": "narrative-cochran-meaning",
    "psychologistId": "cochran",
    "categoryIds": [
      "narrative",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "1990年代にキャリア分野にナラティヴ・アプローチを導入した先駆者の一人とされ、語り手自身が紡ぐ物語（ストーリー）による人生の意味づけを重視した理論家は誰か。",
    "options": [
      "サビカス",
      "コクラン",
      "ハンセン",
      "ホール"
    ],
    "answer": 1,
    "image": "4_1kokran.png",
    "name": "L.コクラン",
    "birthCountry": "🇨🇦",
    "birthCountryText": "ｶﾅﾀﾞ",
    "activeCountry": "🇨🇦",
    "activeCountryText": "ｶﾅﾀﾞ",
    "lifespan": "生没年未確認",
    "explanation": "ラリー・コクランは、客観的データに基づくマッチングではなく、クライエント自身が語る物語を通じてキャリアの意味を構成していくナラティヴ・アプローチをキャリアカウンセリングにいち早く導入しました。",
    "works": [
      {
        "year": 1997,
        "title": "『Career Counseling: A Narrative Approach』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "コクランのナラティヴ・アプローチにおいて、物語（ストーリー）を構成する要素として重視されたものはどれか。",
      "options": [
        "1. 知能・適性・興味",
        "2. 予測・評価・決定",
        "3. 動力・機会・意味・場所・出来事",
        "4. 本能・自我・超自我"
      ],
      "answer": "3",
      "explanation": "コクランは、語り手自身が紡いでいく物語が「動力、機会、意味、場所、出来事」といった要素を統合する手段になるとしました。"
    }
  },
  {
    "id": "positive-csikszentmihalyi-flow",
    "psychologistId": "csikszentmihalyi",
    "categoryIds": [
      "positive",
      "motivation"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "チクセントミハイが提唱した、人がある活動に完全に没頭し、時間感覚が消え去るような高度に集中して充実した精神状態（最適経験）を指す概念はどれか。",
    "options": [
      "自己効力感",
      "フロー",
      "レジリエンス",
      "ワーク・エンゲイジメント"
    ],
    "answer": 1,
    "image": "4_1mihai.png",
    "name": "M.チクセントミハイ",
    "birthCountry": "🇭🇺",
    "birthCountryText": "ﾊﾝｶﾞﾘｰ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1934 - 2021",
    "explanation": "チクセントミハイは、個人の能力水準と課題の難易度が釣り合っている際に生じる、活動への完全な没入状態を「フロー（フロー体験）」と呼びました。",
    "works": [
      {
        "year": 1990,
        "title": "『Flow』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "チクセントミハイのフロー理論において、フロー状態が生じやすい条件として適切なものはどれか。",
      "options": [
        "1. 課題の難易度が個人のスキルを大きく上回っている",
        "2. 課題の難易度が個人のスキルを大きく下回っている",
        "3. 個人のスキルと課題の難易度が高いレベルで均衡している",
        "4. 外的な報酬（金銭など）が明確に約束されている"
      ],
      "answer": "3",
      "explanation": "スキルと難易度が高いレベルで均衡している時にフローが生じやすく、難しすぎると「不安」、簡単すぎると「退屈」を感じるとされます。"
    }
  },
  {
    "id": "counseling-moreno-psychodrama",
    "psychologistId": "moreno",
    "categoryIds": [
      "counseling",
      "social"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "モレノが創案した、集団の中で即興劇（ロールプレイ）などのアクションを媒体にして自己理解や自己洞察をもたらすグループ心理療法を何と呼ぶか。",
    "options": [
      "エンカウンター・グループ",
      "Tグループ",
      "サイコドラマ（心理劇）",
      "フォーカシング"
    ],
    "answer": 2,
    "image": "4_1moreno.png",
    "name": "J.L.モレノ",
    "birthCountry": "🇷🇴",
    "birthCountryText": "ﾙｰﾏﾆｱ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1889 - 1974",
    "explanation": "モレノは、非言語的なアクションや演劇の手法を用いて、クライエントの自発性や創造性を引き出しカタルシス（浄化）をもたらす「サイコドラマ（心理劇）」を創始しました。またソシオメトリーの提唱者でもあります。",
    "works": [
      {
        "year": 1934,
        "title": "『Who Shall Survive?』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "モレノが提唱した、小集団内のメンバー間の好悪の感情や結びつきを客観的に測定・図示する手法はどれか。",
      "options": [
        "1. ソシオメトリー",
        "2. エゴグラム",
        "3. 職業カードソート",
        "4. インバスケット法"
      ],
      "answer": "1",
      "explanation": "集団内の人間関係の構造を測定する手法を「ソシオメトリー（ソシオグラム）」と呼びます。"
    }
  },
  {
    "id": "counseling-white-narrative",
    "psychologistId": "white",
    "categoryIds": [
      "narrative",
      "counseling"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ホワイト（およびエプストン）が創始したナラティヴ・セラピーにおいて、問題は人の中にあるのではなく人と問題は別であると考え、問題を客観視する代表的な技法を何と呼ぶか。",
    "options": [
      "外在化",
      "脱感作",
      "論駁",
      "エンプティ・チェア"
    ],
    "answer": 0,
    "image": "4_1white.png",
    "name": "M.ホワイト",
    "birthCountry": "🇦🇺",
    "birthCountryText": "ｵｰｽﾄﾗﾘｱ",
    "activeCountry": "🇦🇺",
    "activeCountryText": "ｵｰｽﾄﾗﾘｱ",
    "lifespan": "1948 - 2008",
    "explanation": "ホワイトらが提唱したナラティヴ・セラピーでは、問題を個人の内面の欠陥とみなすのではなく、問題そのものを切り離して名付ける「外在化」の技法を用い、新たな物語（再著述）を紡ぐことを支援します。",
    "works": [
      {
        "year": 1990,
        "title": "『Narrative Means to Therapeutic Ends』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ナラティヴ・セラピーにおいて、クライエントを支配しているネガティブなドミナント・ストーリーから抜け出すために、問題の影響が及んでいなかった例外的な出来事を探す質問を何と呼ぶか。",
      "options": [
        "1. ミラクル・クエスチョン",
        "2. スケーリング・クエスチョン",
        "3. ユニークな結果（例外）の探求",
        "4. 開かれた質問"
      ],
      "answer": "3",
      "explanation": "ドミナント・ストーリーに反する「ユニークな結果（例外）」に焦点を当てることで、オルタナティブ・ストーリー（新たな物語）の構築を促します。"
    }
  },
  {
    "id": "counseling-morita-therapy",
    "psychologistId": "morita",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "森田正馬が創始した日本独自の心理療法（森田療法）において、不安や恐怖を排除しようとするのではなく、自然なものとしてそのまま受け入れる態度を表すキーワードはどれか。",
    "options": [
      "自己一致",
      "あるがまま",
      "積極的不確実性",
      "今、ここ"
    ],
    "answer": 1,
    "image": "4_2morita.png",
    "name": "森田正馬",
    "birthCountry": "🇯🇵",
    "birthCountryText": "日本",
    "activeCountry": "🇯🇵",
    "activeCountryText": "日本",
    "lifespan": "1874 - 1938",
    "explanation": "森田療法は、不安や「とらわれ」を排除しようとせず「あるがまま」に受け入れながら、本来持っている「生の欲望」に目を向けて目的本位に行動していくことを目指す日本発祥の心理療法です。",
    "works": [
      {
        "year": 1920,
        "title": "森田療法を創始"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "森田療法の入院治療プロセスにおいて、第一期に行われる、外部との接触を絶って布団に横たわり続ける段階を何と呼ぶか。",
      "options": [
        "1. 箱庭療法",
        "2. 絶対臥辱（ぜったいがじょく）",
        "3. 系統的脱感作",
        "4. 身調べ"
      ],
      "answer": "2",
      "explanation": "外界からの刺激を遮断し、不安が自然に変化していくのを体験させる期間を「絶対臥辱」と呼びます。"
    }
  },
  {
    "id": "other-thorndike-measurement",
    "psychologistId": "thorndike",
    "categoryIds": [
      "other",
      "career"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "産業カウンセリングの3つの源流の一つとされる「教育測定運動」を推進し、個人の能力や適性を客観的・科学的に測定することに貢献した人物は誰か。",
    "options": [
      "パーソンズ",
      "ビアーズ",
      "ソーンダイク",
      "クレッチマー"
    ],
    "answer": 2,
    "image": "4_2sondai.png",
    "name": "E.L.ソーンダイク",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1874 - 1949",
    "explanation": "ソーンダイクらの教育測定運動は、パーソンズの職業指導運動、ビアーズの精神衛生運動と並び、産業カウンセリングの3つの源流の1つとされています。心理アセスメントの発展に寄与しました。",
    "works": [
      {
        "year": 1910,
        "title": "教育測定運動に貢献"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "産業カウンセリングの3つの源流として正しい組み合わせはどれか。",
      "options": [
        "1. 職業指導運動、教育測定運動、精神衛生運動",
        "2. 特性因子論、精神分析、行動療法",
        "3. ホーソン実験、Tグループ、人間関係論",
        "4. 科学的管理法、動機づけ理論、欲求階層説"
      ],
      "answer": "1",
      "explanation": "産業カウンセリングの発展の歴史的背景として、パーソンズ（職業指導）、ソーンダイク（教育測定）、ビアーズ（精神衛生）の3つの運動が源流とされます。"
    }
  },
  {
    "id": "counseling-yoshimoto-naikan",
    "psychologistId": "yoshimoto",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "吉本伊信が浄土真宗の「身調べ」をもとに考案した、特定の他者に対して「してもらったこと」「して返したこと」「迷惑をかけたこと」の3項目を調べる日本独自の心理療法はどれか。",
    "options": [
      "森田療法",
      "内観療法",
      "現実療法",
      "箱庭療法"
    ],
    "answer": 1,
    "image": "4_2yoshimoto.png",
    "name": "吉本伊信",
    "birthCountry": "🇯🇵",
    "birthCountryText": "日本",
    "activeCountry": "🇯🇵",
    "activeCountryText": "日本",
    "lifespan": "1916 - 1988",
    "explanation": "内観療法は、吉本伊信が創始しました。身近な他者（主に母親）に対する自分の行動を、3つの質問（内観三項目）に沿って静かに振り返り、自己中心的な捉え方から他者への感謝や反省へと気づきを促す療法です。",
    "works": [
      {
        "year": 1950,
        "title": "内観法を体系化"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "内観療法で用いられる3つの質問（内観三項目）に含まれないものはどれか。",
      "options": [
        "1. してもらったこと",
        "2. して返したこと",
        "3. 迷惑をかけたこと",
        "4. 許せなかったこと"
      ],
      "answer": "4",
      "explanation": "内観三項目は「してもらったこと」「して返したこと」「迷惑をかけたこと」であり、他者の過ちを追及するような項目（許せなかったこと）は含まれません。"
    }
  },
  {
    "id": "other-beers-mental-hygiene",
    "psychologistId": "beers",
    "categoryIds": [
      "other",
      "career"
    ],
    "examTags": [
      "industrialCounselor"
    ],
    "text": "自身の精神科病院での入院体験を記した著書『わが魂に出会うまで』を出版し、産業カウンセリングの源流の一つである「精神衛生運動」の契機を作った人物は誰か。",
    "options": [
      "パーソンズ",
      "ソーンダイク",
      "ビアーズ",
      "ウィリアムソン"
    ],
    "answer": 2,
    "image": "4_3beer.png",
    "name": "C.W.ビアーズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1876 - 1943",
    "explanation": "クリフォード・ビアーズは、劣悪な精神科病院の実態と自身の回復体験を世に問い、精神障害者の処遇改善やメンタルヘルス予防の重要性を訴える「精神衛生運動」を起こしました。",
    "works": [
      {
        "year": 1908,
        "title": "『わが魂にあうまで』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ビアーズが提唱した運動を発端とし、現在では職場のメンタルヘルス対策（三次予防）などにも通じる、産業カウンセリングの源流の一つはどれか。",
      "options": [
        "1. 精神分析運動",
        "2. 精神衛生運動",
        "3. 職業指導運動",
        "4. 労働組合運動"
      ],
      "answer": "2",
      "explanation": "ビアーズの活動は精神衛生（メンタルハイジーン）運動として広まり、今日のメンタルヘルスケアの基礎となりました。"
    }
  },
  {
    "id": "career-roe-early-determinism",
    "psychologistId": "roe",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "アン・ローの早期決定論において、将来の職業選択を方向づける最も重要な要因として提唱されたものはどれか。",
    "options": [
      "幼児期の家庭環境と親の養育態度",
      "思春期における友人関係",
      "遺伝的なパーソナリティ特性",
      "予期せぬ偶然の出来事"
    ],
    "answer": 0,
    "image": "4_3row.png",
    "name": "A.ロー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1904 - 1991",
    "explanation": "アン・ローの早期決定論は、幼児期の親の養育態度（情緒過多、拒否、受容）がパーソナリティの形成に影響し、それが後の職業選択の方向性を決定づける（人間指向か非人間指向か）と主張しました。マズローの欲求階層説の影響を受けています。",
    "works": [
      {
        "year": 1956,
        "title": "『The Psychology of Occupations』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アン・ローの早期決定論が理論的背景として大きな影響を受けた、心理学の理論はどれか。",
      "options": [
        "1. マズローの欲求階層説",
        "2. フロイトの精神分析",
        "3. スキナーのオペラント条件づけ",
        "4. ロジャーズの来談者中心療法"
      ],
      "answer": "1",
      "explanation": "アン・ローはマズローの理論に基づき、幼児期に満たされなかった欲求を満たそうとする無意識的な動機が職業選択につながると考えました。"
    }
  },
  {
    "id": "social-bandura-self-efficacy-sources",
    "psychologistId": "bandura",
    "categoryIds": [
      "career",
      "social"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "バンデューラが提唱した社会学習理論において、自己効力感を高める4つの情報源として正しい組み合わせはどれか。",
    "options": [
      "遂行行動の達成、代理的経験、言語的説得、情動的喚起",
      "自己理解、職業理解、啓発的経験、方策の実行",
      "関心、統制、好奇心、自信",
      "予測、評価、決定、修正"
    ],
    "answer": 0,
    "image": "a_ban0.png",
    "name": "A.バンデューラ",
    "birthCountry": "🇨🇦",
    "birthCountryText": "ｶﾅﾀﾞ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1925 - 2021",
    "explanation": "バンデューラは自己効力感を高める情報源として、自身が成功した経験（遂行行動の達成）、他者の成功を見る経験（代理的経験）、他者からの励まし（言語的説得）、生理的な反応（情動的喚起）の4つを挙げました。",
    "works": [
      {
        "year": 1977,
        "title": "「自己効力感の理論」発表"
      },
      {
        "year": 1977,
        "title": "『社会的学習理論』刊行"
      },
      {
        "year": 1986,
        "title": "『社会的認知理論』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "バンデューラが提唱した、人が特定の課題を成功裏に遂行できるという自分自身の能力に対する確信を指す用語はどれか。",
      "options": [
        "1. 自己効力感",
        "2. 自己肯定感",
        "3. 自己実現",
        "4. 自己一致"
      ],
      "answer": "1",
      "explanation": "課題を成し遂げられるという自分の能力への確信を「自己効力感（セルフ・エフィカシー）」と呼びます。"
    }
  },
  {
    "id": "motivation-deci-ryan",
    "psychologistId": "deci",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "デシ（とライアン）が提唱した「自己決定理論」において、内発的動機づけを高める3つの基本的な心理的欲求として正しい組み合わせはどれか。",
    "options": [
      "自律性の欲求、有能感の欲求、関係性の欲求",
      "存在欲求、関係欲求、成長欲求",
      "達成欲求、権力欲求、親和欲求",
      "生理的欲求、安全の欲求、所属と愛の欲求"
    ],
    "answer": 0,
    "image": "desi_raian.png",
    "name": "E.L.デシ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1942 - ",
    "explanation": "デシとライアンの自己決定理論では、人間が生まれながらに持つ基本的な心理的欲求として、自ら選択したいという「自律性」、能力を発揮したいという「有能感」、他者と結びつきたいという「関係性」の3つを挙げています。",
    "works": [
      {
        "year": 1985,
        "title": "『Intrinsic Motivation and Self-Determination in Human Behavior』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "デシの自己決定理論において、自らの行動を自分自身で選択し、決定したいと願う心理的欲求を何と呼ぶか。",
      "options": [
        "1. 自律性の欲求",
        "2. 有能感の欲求",
        "3. 関係性の欲求",
        "4. 自己実現の欲求"
      ],
      "answer": "1",
      "explanation": "自律性が満たされることで内発的動機づけが高まるとされています。"
    }
  },
  {
    "id": "counseling-frankl-will-to-meaning",
    "psychologistId": "frankl",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "フランクルの実存分析（ロゴセラピー）において、人間が生きる意味を求める根源的な動機づけを指す用語はどれか。",
    "options": [
      "意味への意志",
      "自己実現の欲求",
      "実現傾向",
      "権力への意志"
    ],
    "answer": 0,
    "image": "frankl.png",
    "name": "V.E.フランクル",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1905 - 1997",
    "explanation": "フランクルは、人間が人生の困難な状況においても意味を見出そうとする「意味への意志」を最も根源的な動機づけと考えました。",
    "works": [
      {
        "year": 1946,
        "title": "『夜と霧』刊行"
      },
      {
        "year": 1969,
        "title": "『The Will to Meaning』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "困難な状況下にあっても自らの人生に意味を見出すことを支援する心理療法（ロゴセラピー）を創始した人物は誰か。",
      "options": [
        "1. フランクル",
        "2. ジェンドリン",
        "3. パールズ",
        "4. エリス"
      ],
      "answer": "1",
      "explanation": "ウイーンの精神科医であるフランクルは、自らの強制収容所体験からロゴセラピーを創始しました。"
    }
  },
  {
    "id": "counseling-rogers-active-listening",
    "psychologistId": "rogers",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ロジャーズの来談者中心療法において、カウンセラーがクライエントの内的世界をあたかも自分自身のものであるかのように感じ取り、理解する態度を何と呼ぶか。",
    "options": [
      "共感的理解",
      "無条件の肯定的配慮",
      "自己一致",
      "積極的傾聴"
    ],
    "answer": 0,
    "image": "r_0.png",
    "name": "C.R.ロジャーズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1902 - 1987",
    "explanation": "ロジャーズの3つの中核条件のうち、共感的理解は、クライエントの私的な世界を「あたかも自分のものであるかのように」感じ取り、その意味を理解しようとする態度です。",
    "works": [
      {
        "year": 1951,
        "title": "『Client-Centered Therapy』刊行"
      },
      {
        "year": 1957,
        "title": "治療的人格変化の必要十分条件を発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ロジャーズが提唱した、カウンセラーが自分自身の感情や体験に正直であり、純粋で真実な存在であることを指す条件はどれか。",
      "options": [
        "1. 自己一致",
        "2. 無条件の肯定的配慮",
        "3. 共感的理解",
        "4. 問題解決志向"
      ],
      "answer": "1",
      "explanation": "カウンセラーがありのままである状態を「自己一致（純粋性）」と呼びます。"
    }
  },
  {
    "id": "motivation-alderfer-erg-levels",
    "psychologistId": "alderfer",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "アルダファーのERG理論は、マズローの欲求階層説を修正し、人間の欲求を3つの次元に集約した。この3つの次元として正しい組み合わせはどれか。",
    "options": [
      "存在、関係、成長",
      "生存、安全、所属",
      "達成、権力、親和",
      "自律、有能、関係"
    ],
    "answer": 0,
    "image": "s_ardafa.png",
    "name": "C.P.アルダファー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1940 - 2015",
    "explanation": "アルダファーは人間の欲求を Existence（存在）、Relatedness（関係）、Growth（成長）の3つの次元にまとめました。",
    "works": [
      {
        "year": 1969,
        "title": "ERG理論を提唱"
      },
      {
        "year": 1972,
        "title": "『Existence, Relatedness, and Growth』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "マズローの欲求5段階説を実証的に見直し、上位の欲求が満たされない場合に下位の欲求へ後退することも認めた理論はどれか。",
      "options": [
        "1. ERG理論",
        "2. 達成動機理論",
        "3. 二要因理論",
        "4. X理論・Y理論"
      ],
      "answer": "1",
      "explanation": "アルダファーのERG理論は、欲求の階層の行き来（挫折・退行）を認めている点が特徴です。"
    }
  },
  {
    "id": "transition-bridges-neutral-zone",
    "psychologistId": "bridges",
    "categoryIds": [
      "career",
      "transition"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ブリッジスのトランジション理論において、古い状況が終わって新しい状況が始まるまでの間に経験する、どっちつかずの過渡期のプロセスを何と呼ぶか。",
    "options": [
      "ニュートラル・ゾーン",
      "モラトリアム",
      "適応期",
      "試行期"
    ],
    "answer": 0,
    "image": "s_bridges.png",
    "name": "W.ブリッジス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1933 - 2013",
    "explanation": "ブリッジスは、トランジションのプロセスを「終焉」「ニュートラル・ゾーン（中立圏）」「開始」の3段階で示し、中間の混乱期をじっくり味わうことの重要性を指摘しました。",
    "works": [
      {
        "year": 1980,
        "title": "『Transitions』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ブリッジスの理論において、トランジション（転機）のプロセスは何から始まるとされているか。",
      "options": [
        "1. 終焉（終わり）",
        "2. 開始（始まり）",
        "3. 準備",
        "4. 遭遇"
      ],
      "answer": "1",
      "explanation": "ブリッジスは「転機は何かが終わることから始まる」と提唱しました。"
    }
  },
  {
    "id": "career-krumboltz-planned-happenstance",
    "psychologistId": "krumboltz",
    "categoryIds": [
      "career",
      "choice",
      "decision"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "クランボルツが提唱した、変化が激しく不確実性の高まる時代において、偶然の出来事を自らの主体性や努力によってキャリアの機会に変えていく考え方を何と呼ぶか。",
    "options": [
      "プランド・ハプンスタンス理論",
      "プロティアン・キャリア",
      "積極的不確実性",
      "トランジション・サイクル"
    ],
    "answer": 0,
    "image": "s_cram1.png",
    "name": "J.D.クランボルツ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2019",
    "explanation": "クランボルツのプランド・ハプンスタンス理論（計画された偶発性）は、予期せぬ出来事を避けず、積極的に活用してキャリアを構築するよう促します。",
    "works": [
      {
        "year": 1979,
        "title": "「キャリア意思決定の社会的学習理論（SLTCDM）」発表"
      },
      {
        "year": 1999,
        "title": "「計画的偶発性理論（Planned Happenstance Theory）」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "クランボルツが、偶然をキャリアのチャンスに変えるために必要とした「5つのスキル」に含まれないものはどれか。",
      "options": [
        "1. 好奇心",
        "2. 柔軟性",
        "3. 計画性",
        "4. 冒険心"
      ],
      "answer": "3",
      "explanation": "5つのスキルは、好奇心、持続性、柔軟性、楽観性、冒険心です。計画性は含まれません。"
    }
  },
  {
    "id": "development-erikson-moratorium",
    "psychologistId": "erikson",
    "categoryIds": [
      "development",
      "career"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "エリクソンの心理社会的発達理論において、青年期に特有の、アイデンティティの確立に向けた葛藤を処理するための猶予期間を何と呼ぶか。",
    "options": [
      "心理社会的モラトリアム",
      "ニュートラル・ゾーン",
      "アイデンティティ拡散",
      "人生半ばの過渡期"
    ],
    "answer": 0,
    "image": "s_ericsson.png",
    "name": "E.H.エリクソン",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1902 - 1994",
    "explanation": "エリクソンは、青年期において大人の社会的責任が一時的に猶予され、自己探求を行う期間を「心理社会的モラトリアム」と呼びました。",
    "works": [
      {
        "year": 1950,
        "title": "『Childhood and Society』刊行"
      },
      {
        "year": 1968,
        "title": "『Identity: Youth and Crisis』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "エリクソンが提唱した、青年期の主要な発達課題として正しいものはどれか。",
      "options": [
        "1. 自我同一性（アイデンティティ）の確立",
        "2. 勤勉性の獲得",
        "3. 親密性の形成",
        "4. 統合性の獲得"
      ],
      "answer": "1",
      "explanation": "エリクソンは生涯を8段階に分け、青年期の課題をアイデンティティの確立としました。"
    }
  },
  {
    "id": "cbt-ellis-irrational-belief",
    "psychologistId": "ellis",
    "categoryIds": [
      "cbt",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "エリスの論理療法（REBT）において、「〜すべきである」「〜ねばならない」といった現実に即していない極端で硬直的な信念を何と呼ぶか。",
    "options": [
      "イラショナル・ビリーフ",
      "自動思考",
      "認知の歪み",
      "スキーマ"
    ],
    "answer": 0,
    "image": "s_eris.png",
    "name": "A.エリス",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1913 - 2007",
    "explanation": "エリスは、出来事（A）に対する不合理な信念である「イラショナル・ビリーフ（B）」が、不適切な感情や行動（C）を引き起こすと考え、これを論駁（D）することを目指しました。",
    "works": [
      {
        "year": 1955,
        "title": "論理療法を創始"
      },
      {
        "year": 1962,
        "title": "『Reason and Emotion in Psychotherapy』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "出来事そのものではなく、出来事に対する信念が結果としての感情や行動を引き起こすとする、エリスの理論モデルはどれか。",
      "options": [
        "1. ABC理論",
        "2. 4Sモデル",
        "3. コーヒーカップ・モデル",
        "4. RIASECモデル"
      ],
      "answer": "1",
      "explanation": "ABC理論は認知行動療法の中核的な理論の一つです。"
    }
  },
  {
    "id": "psychoanalysis-freud-libido",
    "psychologistId": "freud",
    "categoryIds": [
      "psychoanalysis",
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "フロイトの精神分析理論において、人間の無意識の行動や心の原動力となる、根源的な性的エネルギーを何と呼ぶか。",
    "options": [
      "リビドー",
      "イド",
      "エス",
      "元型"
    ],
    "answer": 0,
    "image": "s_froit.png",
    "name": "S.フロイト",
    "birthCountry": "🇨🇿",
    "birthCountryText": "ﾁｪｺ",
    "activeCountry": "🇦🇹",
    "activeCountryText": "ｵｰｽﾄﾘｱ",
    "lifespan": "1856 - 1939",
    "explanation": "フロイトは、人間の発達や行動の根底には「リビドー」と呼ばれる本能的・性的なエネルギーが存在するとし、そのエネルギーの発達段階を理論化しました。",
    "works": [
      {
        "year": 1900,
        "title": "『夢判断』刊行"
      },
      {
        "year": 1923,
        "title": "『自我とエス』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "フロイトの防衛機制において、受け入れがたい欲求や記憶を無意識に押し込める、最も基本的な防衛機制はどれか。",
      "options": [
        "1. 抑圧",
        "2. 投影",
        "3. 合理化",
        "4. 昇華"
      ],
      "answer": "1",
      "explanation": "抑圧は、苦痛な感情や記憶を無意識下に押し込める働きを指します。"
    }
  },
  {
    "id": "career-hansen-life-planning",
    "psychologistId": "hansen",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ハンセンが提唱した、労働・愛（子育て）・学習・余暇の4つの役割を組み合わせ、自分にも社会にも役立つ仕事へという価値観のシフトを推奨した概念はどれか。",
    "options": [
      "統合的人生設計（ILP）",
      "プロティアン・キャリア",
      "ライフキャリアレインボー",
      "キャリア・アンカー"
    ],
    "answer": 0,
    "image": "s_hansen.png",
    "name": "L.S.ハンセン",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1931 - 2020",
    "explanation": "ハンセンの統合的人生設計（ILP：Integrative Life Planning）は、人生をパッチワーク・キルトに例え、4つのL（Labor, Love, Learning, Leisure）を統合してキャリアを設計することを説きました。",
    "works": [
      {
        "year": 1997,
        "title": "『統合的人生設計（Integrative Life Planning）』発表"
      },
      {
        "year": 2007,
        "title": "NCDA（全米キャリア開発協会）エミネント・キャリア・アワード受賞"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ハンセンの理論において、人生の多様な役割を縫い合わせるプロセスを象徴する比喩表現はどれか。",
      "options": [
        "1. レインボー",
        "2. コーン",
        "3. キルト",
        "4. サイクル"
      ],
      "answer": "3",
      "explanation": "人生をパッチワークのように統合するプロセスを「キルト」に例えました。"
    }
  },
  {
    "id": "motivation-herzberg-hygiene",
    "psychologistId": "herzberg",
    "categoryIds": [
      "career",
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ハーズバーグの動機づけ・衛生理論において、給与や労働条件など、満たされても不満を予防するだけで積極的な満足にはつながらない要因を何というか。",
    "options": [
      "衛生要因",
      "動機づけ要因",
      "環境要因",
      "存在欲求"
    ],
    "answer": 0,
    "image": "s_hasebarg.png",
    "name": "F.ハーズバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1923 - 2000",
    "explanation": "ハーズバーグは、職務満足をもたらす「動機づけ要因（達成や承認など）」と、不満を防ぐ「衛生要因（給与や環境など）」は別のものであると提唱しました。",
    "works": [
      {
        "year": 1959,
        "title": "『The Motivation to Work』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ハーズバーグの二要因理論において、職務満足をもたらし、労働意欲を高める「動機づけ要因」に分類されるものはどれか。",
      "options": [
        "1. 会社の政策と管理",
        "2. 達成や承認",
        "3. 職場の対人関係",
        "4. 労働環境"
      ],
      "answer": "2",
      "explanation": "達成、承認、仕事そのもの、責任、昇進などが動機づけ要因に該当します。"
    }
  },
  {
    "id": "career-holland-vpi",
    "psychologistId": "holland",
    "categoryIds": [
      "career",
      "choice"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ホランドの職業選択理論（六角形モデル）を基盤として開発され、6つの興味領域と5つの傾向尺度から個人の職業興味を測定するアセスメントツールはどれか。",
    "options": [
      "VPI職業興味検査",
      "GATB一般職業適性検査",
      "VRT職業レディネス・テスト",
      "キャリア・インサイト"
    ],
    "answer": 0,
    "image": "s_holand.png",
    "name": "J.L.ホランド",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1919 - 2008",
    "explanation": "VPI職業興味検査は、160個の具体的な職業名への興味の有無から、ホランドのRIASEC（6つのパーソナリティタイプ）と傾向尺度を測定する検査です。",
    "works": [
      {
        "year": 1959,
        "title": "「職業選択の理論」発表"
      },
      {
        "year": 1973,
        "title": "『職業選択の心理学（Making Vocational Choices）』刊行"
      },
      {
        "year": 1985,
        "title": "VPI職業興味検査（Vocational Preference Inventory）開発"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ホランドのRIASECモデルにおいて、「R」が表すパーソナリティのタイプはどれか。",
      "options": [
        "1. 現実的",
        "2. 研究的",
        "3. 社会的",
        "4. 企業的"
      ],
      "answer": "1",
      "explanation": "Rは現実的（Realistic）、Iは研究的（Investigative）を表します。"
    }
  },
  {
    "id": "career-hall-psychological-success",
    "psychologistId": "hall",
    "categoryIds": [
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "ホールの提唱した「プロティアン・キャリア」において、組織における昇進などの客観的成功よりも重視される、個人の価値観に基づく充実感や成功を何と呼ぶか。",
    "options": [
      "心理的成功",
      "自己実現",
      "アイデンティティ",
      "アダプタビリティ"
    ],
    "answer": 0,
    "image": "s_hole.png",
    "name": "D.T.ホール",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "ホールは、環境の変化に柔軟に適応する変幻自在なキャリアをプロティアン・キャリアと呼び、他者の基準ではなく自分自身の基準で満たされる「心理的成功」を重視しました。",
    "works": [
      {
        "year": 1976,
        "title": "『Careers in Organizations』刊行"
      },
      {
        "year": 2004,
        "title": "プロティアン・キャリアのレビュー論文を発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ホールのプロティアン・キャリアにおいて、変化を生き抜くために必要とされるメタ・コンピテンシーを構成する要素は、アイデンティティともう一つは何か。",
      "options": [
        "1. アダプタビリティ（適応力）",
        "2. モチベーション（動機）",
        "3. レジリエンス（回復力）",
        "4. キャリア・アンカー"
      ],
      "answer": "1",
      "explanation": "プロティアン・キャリアには、自覚的なアイデンティティと変化へのアダプタビリティが必要です。"
    }
  },
  {
    "id": "counseling-gendlin-felt-sense",
    "psychologistId": "gendlin",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "ジェンドリンのフォーカシングにおいて、身体の奥で感じられる、まだ言葉になっていない漠然とした感覚を何と呼ぶか。",
    "options": [
      "フェルトセンス",
      "自動思考",
      "気づき",
      "無意識"
    ],
    "answer": 0,
    "image": "s_jendrin.png",
    "name": "E.T.ジェンドリン",
    "birthCountry": "🇦🇹",
    "birthCountryText": "ｵｰｽﾄﾘｱ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1926 - 2017",
    "explanation": "ジェンドリンは、クライエントが抱く「まだ言葉にならない意味を含んだ身体感覚」をフェルトセンスと呼び、そこに焦点を当てることで心理的な変容を促しました。",
    "works": [
      {
        "year": 1978,
        "title": "『Focusing』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "ジェンドリンが創始した、言葉にならない漠然とした身体感覚に注意を向け、そこから意味を引き出していく心理療法はどれか。",
      "options": [
        "1. フォーカシング",
        "2. ゲシュタルト療法",
        "3. 論理療法",
        "4. 内観療法"
      ],
      "answer": "1",
      "explanation": "フォーカシングは、フェルトセンスと対話するアプローチです。"
    }
  },
  {
    "id": "counseling-carkhuff-model",
    "psychologistId": "carkhuff",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "カーカフが提唱した、カウンセリングを援助的対人関係のプロセスとして捉え、段階的なスキル訓練として体系化したモデルの名称はどれか。",
    "options": [
      "ヘルピング",
      "マイクロカウンセリング",
      "システマティック・アプローチ",
      "コーヒーカップ・モデル"
    ],
    "answer": 0,
    "image": "s_kakaf.png",
    "name": "R.R.カーカフ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "生没年未確認",
    "explanation": "カーカフはロジャーズの理論を発展させ、「かかわり」「応答」「意識化」「手ほどき」などの段階からなる「ヘルピング・モデル」を提唱しました。",
    "works": [
      {
        "year": 1969,
        "title": "『Helping and Human Relations』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "アイビイの「マイクロカウンセリング」を基盤の一つとし、援助的対人関係のプロセスを体系化した人物は誰か。",
      "options": [
        "1. ロジャーズ",
        "2. カーカフ",
        "3. 國分康孝",
        "4. ピービィ"
      ],
      "answer": "2",
      "explanation": "カーカフはヘルピング・モデルを体系化し、実践的なスキル訓練として普及させました。"
    }
  },
  {
    "id": "counseling-kokubu-sge",
    "psychologistId": "kokubu",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "國分康孝が提唱した、リーダーが設定した課題（エクササイズ）に沿ってメンバー同士がふれあい、自己理解や他者理解を深めるグループ・アプローチの名称はどれか。",
    "options": [
      "構成的グループ・エンカウンター",
      "ベーシック・エンカウンター・グループ",
      "Tグループ",
      "サイコドラマ"
    ],
    "answer": 0,
    "image": "s_kokubu.png",
    "name": "國分康孝",
    "birthCountry": "🇯🇵",
    "birthCountryText": "日本",
    "activeCountry": "🇯🇵",
    "activeCountryText": "日本",
    "lifespan": "1930 - 2018",
    "explanation": "國分康孝は、ルールや課題が設定された上でグループワークを行う「構成的グループ・エンカウンター（SGE）」を開発・普及させました。",
    "works": [
      {
        "year": 1979,
        "title": "『カウンセリングの技法』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "國分康孝が提唱した、カウンセリングのプロセス（リレーションづくり、問題の把握、処置）をある形状に例えたモデルはどれか。",
      "options": [
        "1. コーヒーカップ・モデル",
        "2. アーチ・モデル",
        "3. 三角形モデル",
        "4. 六角形モデル"
      ],
      "answer": "1",
      "explanation": "表面から深層へ降り、再び上昇して解決へ向かう過程をコーヒーカップの断面図で示しました。"
    }
  },
  {
    "id": "motivation-maslow-self-actualization",
    "psychologistId": "maslow",
    "categoryIds": [
      "motivation"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "マズローの欲求階層説において、他者から認められたいという「承認の欲求」が満たされた後に現れる、自己の潜在能力を最大限に発揮しようとする最も高次な欲求はどれか。",
    "options": [
      "自己実現の欲求",
      "親和欲求",
      "成長欲求",
      "安全の欲求"
    ],
    "answer": 0,
    "image": "s_masro.png",
    "name": "A.H.マズロー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1908 - 1970",
    "explanation": "マズローは人間の欲求を5段階に分類し、生理的、安全、所属と愛、承認の各欲求が満たされた後に、最高次の「自己実現の欲求」が現れるとしました。",
    "works": [
      {
        "year": 1943,
        "title": "「A Theory of Human Motivation」発表"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "マズローの理論において、生命維持に必要な食事や睡眠などの欲求を指す階層はどれか。",
      "options": [
        "1. 生理的欲求",
        "2. 安全の欲求",
        "3. 所属と愛の欲求",
        "4. 承認の欲求"
      ],
      "answer": "1",
      "explanation": "欲求階層の最も低次に位置する欠乏欲求が「生理的欲求」です。"
    }
  },
  {
    "id": "counseling-perls-empty-chair",
    "psychologistId": "perls",
    "categoryIds": [
      "counseling"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "パールズが創始したゲシュタルト療法において、クライエントの前に誰も座っていない椅子を置き、そこに対話したい相手がいると想定して対話を行う代表的な技法はどれか。",
    "options": [
      "エンプティ・チェア技法",
      "自由連想法",
      "系統的脱感作法",
      "ロールプレイ"
    ],
    "answer": 0,
    "image": "s_palse.png",
    "name": "F.パールズ",
    "birthCountry": "🇩🇪",
    "birthCountryText": "ﾄﾞｲﾂ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1893 - 1970",
    "explanation": "エンプティ・チェア（空の椅子）技法は、自分の中の葛藤や、他者への未解決な感情（未完の体験）に直面し、気づきを得るためにゲシュタルト療法でよく用いられます。",
    "works": [
      {
        "year": 1951,
        "title": "『Gestalt Therapy』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "パールズのゲシュタルト療法が、過去の分析よりも重視するクライエントの状態を表すキーワードはどれか。",
      "options": [
        "1. 今、ここ",
        "2. 無意識",
        "3. イラショナル・ビリーフ",
        "4. 自己概念"
      ],
      "answer": "1",
      "explanation": "「今、ここ（here and now）」での気づき（awareness）を重視し、全体性を回復することを目指します。"
    }
  },
  {
    "id": "trait-parsons-true-reasoning",
    "psychologistId": "parsons",
    "categoryIds": [
      "trait",
      "career"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "パーソンズが提唱した「特性因子理論」における職業選択の3ステップのうち、自己理解と職業理解を統合し、最も適合する職業を選択する段階を何というか。",
    "options": [
      "合理的な推論（マッチング）",
      "予期と実行",
      "予測と評価",
      "結晶化と選択"
    ],
    "answer": 0,
    "image": "s_parsons.png",
    "name": "F.パーソンズ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1854 - 1908",
    "explanation": "パーソンズは、自分自身の理解、職業の理解、そしてそれらを合理的に推論して合致（マッチング）させることが賢明な職業選択であるとしました。",
    "works": [
      {
        "year": 1908,
        "title": "ボストン職業局（Vocation Bureau of Boston）設立"
      },
      {
        "year": 1909,
        "title": "死後に著書『職業の選択（Choosing a Vocation）』が刊行される"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "パーソンズの特性因子理論を発展させ、学生相談の領域で「分析・総合・診断・予後・カウンセリング・追指導」の6段階プロセスを提唱した人物は誰か。",
      "options": [
        "1. スーパー",
        "2. ホランド",
        "3. ウィリアムソン",
        "4. プレディガー"
      ],
      "answer": "3",
      "explanation": "ウィリアムソンは、カウンセラー主導の指示的・診断的なアプローチを体系化しました。"
    }
  },
  {
    "id": "career-schein-career-cone",
    "psychologistId": "schein",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant",
      "industrialCounselor"
    ],
    "text": "シャインが提唱した、組織における個人のキャリアの移動を「機能的」「階層的」「部内的（中心性）」の3つの次元で立体的に表したモデルはどれか。",
    "options": [
      "キャリア・コーン",
      "キャリア・アンカー",
      "ライフキャリアレインボー",
      "キャリア・サバイバル"
    ],
    "answer": 0,
    "image": "s_shaine.png",
    "name": "E.H.シャイン",
    "birthCountry": "🇨🇭",
    "birthCountryText": "ｽｲｽ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1928 - 2023",
    "explanation": "シャインは組織内キャリア発達理論において、組織構造と個人の移動を円錐形で示した「キャリア・コーン（3次元モデル）」を提唱しました。",
    "works": [
      {
        "year": 1978,
        "title": "『キャリア・ダイナミクス』刊行（内的/外的キャリアの提唱）"
      },
      {
        "year": 1990,
        "title": "『キャリア・アンカー』刊行（8つの分類を確立）"
      },
      {
        "year": 1999,
        "title": "プロセス・コンサルテーションの概念を体系化"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シャインが提唱した、個人がキャリアを選択する際に、どうしても犠牲にしたくない中心的な価値観や欲求を指す概念はどれか。",
      "options": [
        "1. キャリア・アンカー",
        "2. キャリア・サバイバル",
        "3. ライフ・テーマ",
        "4. プロティアン・キャリア"
      ],
      "answer": "1",
      "explanation": "キャリア・アンカーは、個人の能力、動機、価値観から形成され、職業生活の拠り所となります。"
    }
  },
  {
    "id": "career-super-exploration",
    "psychologistId": "super",
    "categoryIds": [
      "career",
      "development"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "スーパーが提唱したキャリア発達のライフステージ（マキシサイクル）において、15歳〜24歳頃に該当し、自らの興味や能力を探求し職業的選択の準備を行う段階はどれか。",
    "options": [
      "探索期",
      "成長期",
      "確立期",
      "維持期"
    ],
    "answer": 0,
    "image": "s_super.png",
    "name": "D.E.スーパー",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1910 - 1994",
    "explanation": "スーパーのライフステージは成長期、探索期、確立期、維持期、解放期の5段階からなり、職業的選択を模索する時期は「探索期」に該当します。",
    "works": [
      {
        "year": 1953,
        "title": "「職業発達の理論（A Theory of Vocational Development）」発表"
      },
      {
        "year": 1957,
        "title": "『キャリアの心理学』刊行"
      },
      {
        "year": 1980,
        "title": "「ライフ・キャリア・レインボー」モデルを提唱"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "スーパーが提唱した、キャリアを「ライフ・スパン（時間的広がり）」と「ライフ・スペース（空間的広がり）」の2次元から捉えたモデルはどれか。",
      "options": [
        "1. ライフキャリアレインボー",
        "2. アーチモデル",
        "3. トランジション・サイクル",
        "4. キャリア・コーン"
      ],
      "answer": "1",
      "explanation": "人生における様々な役割（子ども、学生、労働者など）の組み合わせを虹の形に例えました。"
    }
  },
  {
    "id": "transition-schlossberg-nonevent",
    "psychologistId": "schlossberg",
    "categoryIds": [
      "transition",
      "career"
    ],
    "examTags": [
      "careerConsultant"
    ],
    "text": "シュロスバーグのトランジション（転機）理論において、「昇進できると思っていたのにできなかった」など、期待していた出来事が起こらなかった場合の転機を何と呼ぶか。",
    "options": [
      "ノンイベント",
      "イベント",
      "クライシス",
      "モラトリアム"
    ],
    "answer": 0,
    "image": "s_syuro.png",
    "name": "N.K.シュロスバーグ",
    "birthCountry": "🇺🇸",
    "birthCountryText": "ｱﾒﾘｶ",
    "activeCountry": "🇺🇸",
    "activeCountryText": "ｱﾒﾘｶ",
    "lifespan": "1929 - ",
    "explanation": "シュロスバーグは転機を、予期していた出来事（イベント）、予期していなかった出来事（イベント）、期待していたが起こらなかった出来事（ノンイベント）に分類しました。",
    "works": [
      {
        "year": 1984,
        "title": "『カウンセリング・アダルト・イン・トランジション』刊行"
      },
      {
        "year": 1989,
        "title": "『過渡期のキャリア（Overwhelmed）』刊行"
      }
    ],
    "pastExam": {
      "title": "オリジナル確認問題",
      "question": "シュロスバーグの理論において、転機を乗り越えるために点検・活用すべきとされる4つの資源（4S）は、状況、自己、支援と、あと一つは何か。",
      "options": [
        "1. 戦略（Strategies）",
        "2. 成功（Success）",
        "3. 社会（Society）",
        "4. スキル（Skills）"
      ],
      "answer": "1",
      "explanation": "4Sは Situation（状況）、Self（自己）、Support（支援）、Strategies（戦略）を指します。"
    }
  }
];
