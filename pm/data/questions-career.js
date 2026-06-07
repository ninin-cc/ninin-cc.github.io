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
  }
];
