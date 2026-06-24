    // --- データ定義 ---
    const CARDS_DATA = [
      { id: 1, name: '開拓者', desc: '誰も通っていない新しい道を作り出す役割。', mode: 'WONDER' },
      { id: 2, name: '冒険者', desc: '未知の世界へ飛び込み、新しい発見をもたらす役割。', mode: 'WONDER' },
      { id: 3, name: '表現者', desc: '自分の内なる思いや情熱を、形にして他者に届ける役割。', mode: 'WONDER' },
      { id: 4, name: '発明家', desc: '常識にとらわれず、新しいアイデアや仕組みを生み出す役割。', mode: 'WONDER' },
      { id: 5, name: '自由人', desc: '枠組みに縛られず、軽やかに状況を楽しむ役割。', mode: 'WONDER' },
      { id: 6, name: '挑戦者', desc: '高い壁にもひるまず、果敢に挑み続ける役割。', mode: 'WONDER' },
      { id: 7, name: '守護者', desc: '大切なルールや基準を守り、秩序を維持する役割。', mode: 'KEEPER' },
      { id: 8, name: '分析家', desc: '事実やデータを冷静に見つめ、論理的な答えを導く役割。', mode: 'KEEPER' },
      { id: 9, name: '設計者', desc: '物事の構造を理解し、再現性のある仕組みを作る役割。', mode: 'KEEPER' },
      { id: 10, name: '審判', desc: '公平な視点で物事を判断し、正しい道を示す役割。', mode: 'KEEPER' },
      { id: 11, name: '記録係', desc: '過去の経験や事実を正確に残し、未来へ繋ぐ役割。', mode: 'KEEPER' },
      { id: 12, name: '職人', desc: '品質にこだわり、妥協なく物事を完成させる役割。', mode: 'KEEPER' },
      { id: 13, name: '養育者', desc: '他者の成長を温かく見守り、サポートする役割。', mode: 'NURTURE' },
      { id: 14, name: '調停者', desc: '人と人との間に入り、対立を和らげ調和をもたらす役割。', mode: 'NURTURE' },
      { id: 15, name: '共感者', desc: '他者の痛みに寄り添い、共に感情を分かち合う役割。', mode: 'NURTURE' },
      { id: 16, name: '応援団', desc: '誰かの背中を押し、勇気とエネルギーを与える役割。', mode: 'NURTURE' },
      { id: 17, name: '癒し手', desc: '緊張をほぐし、その場に安心感と安らぎをもたらす役割。', mode: 'NURTURE' },
      { id: 18, name: '接着剤', desc: 'バラバラな個性を繋ぎ合わせ、チームを一つにする役割。', mode: 'NURTURE' },
      { id: 19, name: '観察者', desc: '周囲の状況を静かに見渡し、小さな変化に気づく役割。', mode: 'ADAPTER' },
      { id: 20, name: '調整役', desc: '求められる期待を察知し、自分の立ち位置を変化させる役割。', mode: 'ADAPTER' },
      { id: 21, name: '防衛者', desc: '危険をいち早く察知し、自分やチームを守る役割。', mode: 'ADAPTER' },
      { id: 22, name: 'カメレオン', desc: '環境に合わせて自分を柔軟に変化させ、溶け込む役割。', mode: 'ADAPTER' },
      { id: 23, name: '慎重派', desc: '石橋を叩いて渡り、失敗のリスクを最小限に抑える役割。', mode: 'ADAPTER' },
      { id: 24, name: '探知機', desc: '場の空気や他者の機嫌を読み取り、摩擦を避ける役割。', mode: 'ADAPTER' },
      { id: 25, name: '道化師', desc: '場が固まりすぎたとき、笑いや遊び心で空気をゆるめる役割。', mode: 'WONDER' }
    ];

    const MODE_COLORS = {
      WONDER: 'bg-gradient-to-r from-orange-900 via-orange-600 to-orange-900', 
      KEEPER: 'bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800',     
      NURTURE: 'bg-gradient-to-r from-rose-900 via-rose-700 to-rose-900',      
      ADAPTER: 'bg-gradient-to-r from-cyan-900 via-cyan-700 to-cyan-900'       
    };

    const MODE_TEXT_COLORS = {
      WONDER: 'text-orange-600',
      KEEPER: 'text-indigo-900',
      NURTURE: 'text-pink-600',
      ADAPTER: 'text-cyan-600'
    };

    const MODE_AURA_COLORS = {
      WONDER: { sparkle: 'text-orange-400', star: 'text-orange-300 fill-orange-300', shadow: '0 0 15px rgba(249, 115, 22, 0.6), 0 0 5px rgba(255, 255, 255, 0.5)' },
      KEEPER: { sparkle: 'text-indigo-400', star: 'text-indigo-300 fill-indigo-300', shadow: '0 0 15px rgba(79, 70, 229, 0.6), 0 0 5px rgba(255, 255, 255, 0.5)' },
      NURTURE: { sparkle: 'text-pink-400', star: 'text-pink-300 fill-pink-300', shadow: '0 0 15px rgba(236, 72, 153, 0.6), 0 0 5px rgba(255, 255, 255, 0.5)' },
      ADAPTER: { sparkle: 'text-cyan-400', star: 'text-cyan-300 fill-cyan-300', shadow: '0 0 15px rgba(6, 182, 212, 0.6), 0 0 5px rgba(255, 255, 255, 0.5)' }
    };

    const MODE_ICON_NAMES = {
      WONDER: 'Compass',
      KEEPER: 'Scale',
      NURTURE: 'Heart',
      ADAPTER: 'Eye'
    };

    const ICONS = {
      Compass: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
      Scale: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
      Heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
      Eye: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
      Play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      Store: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-2.205a2 2 0 0 1 1.79 0L12 7l3.8-1.9a2 2 0 0 1 1.8 0L22 7"/><path d="M2 12V7"/><path d="M22 12V7"/><path d="M12 12V7"/><path d="M6 12v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9"/><path d="M2 12h20"/><path d="M14 16v-4"/></svg>',
      ArrowRightLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>',
      RefreshCw: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
      User: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      Swords: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>',
      Scroll: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>',
      Flame: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      Sparkles: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
      ChevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
      Camera: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
      Shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/></svg>',
      Star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      Share2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'
    };

    function getIcon(name, classes) {
      let svg = ICONS[name] || '';
      if (classes) {
        svg = svg.replace('<svg ', '<svg class="' + classes + '" ');
      }
      return svg;
    }

    function escapeAttribute(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    const getModeColorText = (mode) => {
      switch(mode) {
        case 'WONDER': return 'オレンジ';
        case 'KEEPER': return 'ネイビー';
        case 'NURTURE': return 'ピンク';
        case 'ADAPTER': return '水色';
        default: return '';
      }
    };

    const getJewelDescription = (mode) => {
      switch(mode) {
        case 'WONDER': return 'オレンジの【ワンダーの宝玉】は自由・発見・挑戦をつかさどります。';
        case 'KEEPER': return '青の【キーパーの宝玉】は論理・ルール・正しさをつかさどります。';
        case 'NURTURE': return 'ピンクの【ナーチャーの宝玉】は保護・調和をつかさどります。';
        case 'ADAPTER': return '水色の【アダプターの宝玉】は洞察・適応・慎重さをつかさどります。';
        default: return '';
      }
    };

    const TOTAL_ROUNDS = 6;
    function randomInt(max) {
      if (!Number.isInteger(max) || max <= 0) {
        throw new Error('max must be a positive integer');
      }
      const range = 0x100000000;
      const limit = range - (range % max);
      const buffer = new Uint32Array(1);
      do {
        crypto.getRandomValues(buffer);
      } while (buffer[0] >= limit);
      return buffer[0] % max;
    }

    function randomFloat() {
      const buffer = new Uint32Array(1);
      crypto.getRandomValues(buffer);
      return buffer[0] / 0x100000000;
    }

    function randomItem(array) {
      return array[randomInt(array.length)];
    }

    const TRADE_AVATAR_PROFILES = [
      { src: "https://ninin-cc.github.io/img/rt/1.jpg", voice: "olderMale" },
      { src: "https://ninin-cc.github.io/img/rt/2.jpg", voice: "youngFemale" },
      { src: "https://ninin-cc.github.io/img/rt/3.jpg", voice: "youngFemale" },
      { src: "https://ninin-cc.github.io/img/rt/4.jpg", voice: "male" },
      { src: "https://ninin-cc.github.io/img/rt/5.jpg", voice: "male" },
      { src: "https://ninin-cc.github.io/img/rt/6.jpg", voice: "youngFemale" },
      { src: "https://ninin-cc.github.io/img/rt/7.jpg", voice: "male" }
    ];

    const TRADE_AVATARS_LIST = TRADE_AVATAR_PROFILES.map(profile => profile.src);

    const TRADE_MESSAGE_VARIANTS = {
      olderMale: [
        "そのカード、なかなか面白いな。俺のこの役割と交換だ。旅の途中で役に立つかもしれん。",
        "その役割を持って進むのも悪くない。だが、ここでは俺のカードも一度持っていく流れだ。",
        "旅は、思いがけない役割に助けられるものだ。この一枚と交換して進むとしよう。",
        "正直に言うと、俺にはそのカードの方が都合がいい。代わりにこの役割を置いていく。交換成立だ。",
        "交換というのは、損得だけではない。だが今回は、俺も少し得をしたい気分でな。",
        "その一枚を預かる。代わりにこの役割を渡そう。俺の旅も少し進みそうだ。",
        "ここでは役割を交換するものらしい。なら、淡々と一枚ずつ差し出してみるのも悪くない。",
        "交換しなければならん流れなら、俺はこのカードを出そう。おぬしはその一枚を差し出す番だ。"
      ],
      male: [
        "そのカード、少し気になるな。俺のこの役割と交換だ。",
        "その役割、旅に連れていく価値がありそうだ。俺のカードと交換して進もう。",
        "自分では選ばなかった役割が、道をひらくこともある。ここで交換して道を変えてみよう。",
        "その一枚を手放したら、別の景色が見えるかもしれない。俺のカードと交換して次へ行こう。",
        "悪いが、俺はそのカードが欲しい。こっちも一枚出す。条件は対等だろう？",
        "今の俺には、その役割が必要なんだ。代わりにこのカードを持っていってくれ。",
        "心配はいらない。交換した役割も、旅の中で意味を持つ。ただ、一度見比べてほしい。",
        "交換の場なら、交換する。それだけだ。俺はこの一枚を出す。",
        "決まりだから差し出す、というのも変な話だが……まあ、俺はこのカードを出す。",
        "そのカードが俺の旅に噛み合いそうだ。少し自分勝手だが、交換を頼みたい。"
      ],
      youngFemale: [
        "そのカード、少し気になるな。私のこの役割と交換しよう。",
        "自分では選ばなかった役割が、旅の途中で必要になることもあるよ。ここで交換して進もう。",
        "その役割を持ったあなたも見てみたいな。私のカードと交換して、次の旅に持っていって。",
        "旅の途中だからこそ、いつもと違う役割を試せるのかも。交換して、少し景色を変えてみよう。",
        "ごめんね、少し自分勝手かもしれない。でも、そのカードが今の私には必要なんだ。",
        "このカードもあなたに合いそう。私の一枚として、ここで受け取ってほしいな。",
        "交換する場所なら、交換してみる。理由はそれだけでもいいのかもしれないね。",
        "交換しなきゃいけないらしいから……えっと、私からはこのカードを出すね。",
        "そのカード、あなたの旅にも私の旅にも意味がありそう。ここで交換して、互いの旅を進めよう。",
        "私はこっちの役割を手放してみる。そちらのカードと交換して、次へ進みたいな。"
      ]
    };

    const TRADE_MESSAGES = {
      2: "そのカード、少し気になるな。俺のこの役割と交換だ。",
      3: "自分では選ばなかった役割が、旅の途中で必要になることもある。ここで交換して進もう。",
      4: "だいぶ自分の強みが見えてきたんじゃない？ でも、他者と関わることで変わるものもある。さあ、交換しよう。",
      5: "もうすぐ次の場所へ向かう時だ。最後にこのカードを渡そう。一見苦手に見える役割も、きっと君を助けるはずだ。"
    };

    function getRandomTradeMessage(voice, usedMessages = []) {
      const messages = TRADE_MESSAGE_VARIANTS[voice] || TRADE_MESSAGE_VARIANTS.male;
      const availableMessages = messages.filter(message => !usedMessages.includes(message));
      return randomItem(availableMessages.length > 0 ? availableMessages : messages);
    }

    function getRandomTradeEncounter(usedAvatarImgs = [], usedMessages = []) {
      const availableAvatars = TRADE_AVATAR_PROFILES.filter(profile => !usedAvatarImgs.includes(profile.src));
      const avatar = randomItem(availableAvatars.length > 0 ? availableAvatars : TRADE_AVATAR_PROFILES);
      return {
        avatarImg: avatar.src,
        message: getRandomTradeMessage(avatar.voice, usedMessages)
      };
    }
    const FAREWELL_MESSAGES = [
      "うむ。<br/><br/><br/>選んだ役割は、おぬしを縛る鎖ではない。<br/><br/><br/>必要なときに思い出す、<br/><br/><br/>小さな灯火じゃ。<br/><br/>",
      "迷いながら残したその5枚こそが、<br/><br/><br/>今のおぬしが未来へ託した<br/><br/><br/>答えなのじゃな。<br/><br/>",
      "役割は固定された性格ではないぞ。<br/><br/><br/>状況の中で、<br/><br/><br/>おぬしが使える力なのじゃ。<br/><br/>",
      "よい旅を。<br/><br/><br/>おぬしの中にある役割たちが、<br/><br/><br/>必要なときに道を照らすじゃろう。<br/><br/>",
      "そのカードを選んだ理由を、<br/>どうか忘れんでおくれ。<br/><br/><br/>それが、<br/>未来のおぬし自身への<br/><br/><br/>手紙になるのじゃ。<br/><br/>"
    ];

    function getRandomFarewellMessage() {
      return randomItem(FAREWELL_MESSAGES);
    }

    const HARUKA_AVATAR = "https://ninin-cc.github.io/img/mt/haruka.jpg";
    const REFREM_AVATAR = "https://ninin-cc.github.io/img/mt/reflm.jpg";
    const BG_START_MENTALIA = "https://ninin-cc.github.io/img/mt/top.jpg";

    const GUIDE_MESSAGES = {
      1: {
        name: "ハルカ",
        place: "役割の庭",
        avatar: HARUKA_AVATAR,
        icon: "Sparkles",
        color: "text-orange-700",
        message: "<p>手元の5つのうち、ひとつを手放して、<br>私が持ってる6つのカードの中から、ひとつを迎えてみてくださいね。</p>"
      },
      6: {
        name: "リフレム",
        place: "灯火の間",
        avatar: REFREM_AVATAR,
        icon: "Flame",
        color: "text-orange-700",
        message: "<p>うむ、よく戻ってきたな、旅人よ。</p><div class=\"h-1.5 sm:h-2\"></div><p>大切なのは、どの役割が強いかではないのじゃ。</p><div class=\"h-1.5 sm:h-2\"></div><p>おぬしが、なぜそれを残し、<br>今の自分に必要だと感じたのか……じゃな。</p><div class=\"h-1.5 sm:h-2\"></div><p>最後にもう一度だけ、役割を入れ替えることができるぞ。</p><div class=\"h-1.5 sm:h-2\"></div><p>変えても、変えなくてもよい。<br>選んだ理由を、おぬし自身の言葉で受け取ることじゃよ。</p>"
      }
    };

    const PARCHMENT_TEXTURE = "url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOCcgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknIG9wYWNpdHk9JzAuMTUnLz48L3N2Zz4=')";
    
    const CARD_BG_IMG = "https://ninin-cc.github.io/img/rt/card.jpg";

    const BG_JUNBI_IMG = "https://ninin-cc.github.io/img/rt/junbi.jpg";
    const BG_TRADE_IMG = "https://ninin-cc.github.io/img/rt/bar.jpg"; 
    const BG_DOOR_IMG = "https://ninin-cc.github.io/img/rt/mon.jpg";

    const HEADER_HIDDEN_STATES = [
      'START',
      'PLAYING',
      'INITIAL_HAND',
      'RULES',
      'LEAVE_SHOP_1',
      'BEFORE_TAVERN',
      'AFTER_TAVERN',
      'SHOP_CONFIRM',
      'SHOP_FAREWELL'
    ];

    // --- State ---
    let state = {
      gameState: 'START',
      round: 1,
      shopRounds: [],
      hand: [],
      shop: [],
      deck: [],
      selectedHandCard: null,
      selectedShopCard: null,
      tradeOfferCard: null,
      tradeAvatarImg: '', 
      tradeMessage: '', 
      usedTradeAvatarImgs: [], 
      usedTradeMessages: [], 
      isExchanging: false,
      isEntering: false,
      initialHandCollecting: false,
      isTransitioning: false,
      showTutorial: true,
      tradeConfirmOpen: false,
      resultStep: 'SELECT_1',
      primaryCard: null,
      secondaryCard: null,
      confirmingCard: null,
      zoomedCard: null,
      isConfirmModalClosing: false,
      shareMessage: '',
      isAppBrowser: false,
      pendingTradeAction: null,
      farewellMessage: '',
      isTrisetsuOpen: false,
      rulesExplanationPhase: 'guide',
      rulesExplanationStep: 0
    };

    // ▼▼ 各シーンのページ番号を算出する関数 ▼▼
    function getPageNumber() {
      if (state.gameState === 'START') return 1;
      if (state.gameState === 'RULES') return 2;
      if (state.gameState === 'INITIAL_HAND') return 3;
      if (state.gameState === 'PLAYING') {
        if (state.round === 1) return 4;
        if (state.round >= 2 && state.round <= 5) return 5 + state.round; // R2=7, R3=8, R4=9, R5=10
        if (state.round === 6) return 12;
      }
      if (state.gameState === 'LEAVE_SHOP_1') return 5;
      if (state.gameState === 'BEFORE_TAVERN') return 6;
      if (state.gameState === 'AFTER_TAVERN') return 11;
      if (state.gameState === 'SHOP_CONFIRM') return 13;
      if (state.gameState === 'SHOP_FAREWELL') return 14;
      if (state.gameState === 'RESULT') {
        if (state.resultStep === 'SELECT_1') return 15;
        if (state.resultStep === 'SELECT_2') return 16;
        if (state.resultStep === 'FINAL') return 17;
      }
      return 0;
    }

    function checkAppBrowser() {
      const ua = navigator.userAgent.toLowerCase();
      const isLine = ua.indexOf("line") > -1;
      const isTwitter = ua.indexOf("twitter") > -1;
      const isFB = ua.indexOf("fbav") > -1 || ua.indexOf("fban") > -1;
      const isInsta = ua.indexOf("instagram") > -1;
      
      if (isLine || isTwitter || isFB || isInsta) {
        state.isAppBrowser = true;
        if (ua.indexOf("android") > -1) {
          const url = location.href;
          if (url.startsWith('http')) {
            const intentUrl = url.replace(/^https?:\/\//, 'intent://') + '#Intent;scheme=https;package=com.android.chrome;end;';
            location.href = intentUrl;
          }
        }
      }
    }

    function transitionState(callback) {
      const stage = document.getElementById('main-stage');
      const dock = document.getElementById('dock-stage');
      
      if (stage) {
        stage.classList.remove('animate-fadeInStage');
        stage.classList.add('animate-fadeOut');
      }
      if (dock) {
        dock.classList.remove('animate-fadeInStage');
        dock.classList.add('animate-fadeOut');
      }
      
      setTimeout(() => {
        state.isTransitioning = true;
        callback();
        window.scrollTo(0, 0);
        render();
      }, 400);
    }

    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
      }
      return newArray;
    }

    function startGame() {
      const allShuffled = shuffleArray([...CARDS_DATA]);
      state.hand = allShuffled.slice(0, 5);
      
      const shopCards = allShuffled.slice(5, 11);
      const remaining = allShuffled.slice(11);
      
      state.shop = shopCards;
      state.deck = remaining;
      
      state.shopRounds = [1, 6];
      state.round = 1;
      state.showTutorial = true; 
      state.tradeConfirmOpen = false;
      state.resultStep = 'SELECT_1';
      state.primaryCard = null;
      state.secondaryCard = null;
      state.confirmingCard = null;
      state.zoomedCard = null;
      state.isConfirmModalClosing = false;
      state.tradeAvatarImg = ''; 
      state.tradeMessage = ''; 
      state.usedTradeAvatarImgs = []; 
      state.usedTradeMessages = []; 
      state.isTrisetsuOpen = false;
      state.rulesExplanationPhase = 'guide';
      state.rulesExplanationStep = 0;
      state.initialHandCollecting = false;
      
      state.gameState = 'INITIAL_HAND';
      state.shareMessage = '';
    }

    function handleTrade() {
      if (!state.selectedHandCard || !state.tradeOfferCard || state.isExchanging) return;
      state.tradeConfirmOpen = false;
      state.isExchanging = true;
      render();
      
      setTimeout(() => {
        transitionState(() => {
          state.hand = state.hand.map(c => c.id === state.selectedHandCard.id ? state.tradeOfferCard : c);
          state.deck.push(state.selectedHandCard);
          state.deck.shift();
          proceedToNextRound(state.hand, state.shop, state.deck);
          state.isExchanging = false;
        });
      }, 600);
    }

    function handleShopTrade() {
      if (!state.selectedHandCard || !state.selectedShopCard || state.isExchanging) return;
      state.tradeConfirmOpen = false;
      state.isExchanging = true;
      render();
      
      setTimeout(() => {
        transitionState(() => {
          const newHand = state.hand.map(c => c.id === state.selectedHandCard.id ? state.selectedShopCard : c);
          const newShop = state.shop.map(c => c.id === state.selectedShopCard.id ? state.selectedHandCard : c);
          
          proceedToNextRound(newHand, newShop, state.deck);
          
          state.isExchanging = false;
        });
      }, 600);
    }

    function proceedToNextRound(newHand, newShop, newDeck) {
      state.selectedHandCard = null;
      state.selectedShopCard = null;
      state.tradeOfferCard = null;
      state.tradeConfirmOpen = false;

      if (state.round >= TOTAL_ROUNDS) {
        state.hand = newHand;
        state.resultStep = 'SELECT_1';
        state.gameState = 'RESULT';
      } else {
        state.round++;
        state.hand = newHand;
        state.shop = newShop;
        state.deck = newDeck;
        
        state.isEntering = true;
        setTimeout(() => {
          state.isEntering = false;
        }, 800);
        
        if (!state.shopRounds.includes(state.round)) {
          const tradeEncounter = getRandomTradeEncounter(state.usedTradeAvatarImgs, state.usedTradeMessages);
          state.tradeOfferCard = newDeck[0];
          state.tradeAvatarImg = tradeEncounter.avatarImg;
          state.tradeMessage = tradeEncounter.message;
          state.usedTradeAvatarImgs = [...state.usedTradeAvatarImgs, tradeEncounter.avatarImg];
          state.usedTradeMessages = [...state.usedTradeMessages, tradeEncounter.message];
        }

        // ▼▼ ラウンド間でのシーン遷移 ▼▼
        if (state.round === 2) {
          state.gameState = 'LEAVE_SHOP_1';
        } else if (state.round === 6) {
          state.gameState = 'AFTER_TAVERN';
        } else {
          state.gameState = 'PLAYING';
        }
      }
    }

    function handleResultCardSelect(card) {
      if (state.resultStep === 'SELECT_1' || state.resultStep === 'SELECT_2') {
        if (state.resultStep === 'SELECT_2' && card.id === state.primaryCard?.id) return;
        state.confirmingCard = card;
        state.isConfirmModalClosing = false;
        render();
      }
    }

    function confirmResultCard(isConfirmed) {
      state.isConfirmModalClosing = true;
      render();
      
      setTimeout(() => {
        if (isConfirmed) {
          if (state.resultStep === 'SELECT_1') {
            state.primaryCard = state.confirmingCard;
            state.confirmingCard = null;
            transitionState(() => { state.resultStep = 'SELECT_2'; });
          } else if (state.resultStep === 'SELECT_2') {
            state.secondaryCard = state.confirmingCard;
            state.confirmingCard = null;
            transitionState(() => { state.resultStep = 'FINAL'; });
          }
        } else {
          state.confirmingCard = null;
          state.isConfirmModalClosing = false;
          render();
        }
      }, 300);
    }

    function getMostFrequentMode() {
      const counts = {};
      state.hand.forEach(c => {
        counts[c.mode] = (counts[c.mode] || 0) + 1;
      });
      let maxMode = '';
      let maxCount = 0;
      for (const [mode, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          maxMode = mode;
        }
      }
      return maxMode;
    }

    async function generateImage() {
      const captureEl = document.getElementById('capture-area');
      if (!captureEl || !window.html2canvas) {
        throw new Error("Cannot capture image");
      }
      const canvas = await window.html2canvas(captureEl, {
        backgroundColor: '#e8dcc4', 
        scale: 2, 
        useCORS: true,
      });
      return canvas.toDataURL("image/png");
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    async function handleSave() {
      state.shareMessage = "画像を生成中...";
      render();
      try {
        const dataUrl = await generateImage();
        const link = document.createElement('a');
        link.download = 'RIESM_RoleTrade_Result.png';
        link.href = dataUrl;
        link.click();
        state.shareMessage = "画像を保存しました！";
      } catch (error) {
        state.shareMessage = "画像の保存に失敗しました。";
      }
      render();
      setTimeout(() => { state.shareMessage = ''; render(); }, 3000);
    }

    async function handleShare() {
      state.shareMessage = "準備中...";
      render();

      const frontColor = getModeColorText(getMostFrequentMode());
      const shareText = "Mentaliaで、18歳の自分に託す「5つの役割」が決まりました！\n" +
                        "一番大事にするのは【" + (state.primaryCard ? state.primaryCard.name : "") + "】\n" +
                        "二番目は【" + (state.secondaryCard ? state.secondaryCard.name : "") + "】です。\n" +
                        "一番多く選んだ色：" + frontColor + "\n\n" +
                        "🌙 RIESM™ RoleTRADE Mentalia\n" +
                        "― リフレムとハルカと、5つの役割 ―\n" +
                        "#RIESM #RoleTRADE #Mentalia #自己理解";
      const url = 'https://ninin-cc.github.io/rt.html';

      try {
        const dataUrl = await generateImage();
        const file = dataURLtoFile(dataUrl, 'RIESM_RoleTrade_Result.png');

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'RIESM™ Role TRADE',
            text: shareText,
            url: url,
            files: [file]
          });
          state.shareMessage = "";
        } else if (navigator.share) {
          await navigator.share({
            title: 'RIESM™ Role TRADE',
            text: shareText,
            url: url
          });
          state.shareMessage = "";
        } else {
          const twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText + "\n" + url);
          window.open(twitterUrl, '_blank');
          state.shareMessage = "";
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          state.shareMessage = "シェアに失敗しました。";
        } else {
          state.shareMessage = "";
        }
      }
      render();
      if(state.shareMessage) {
          setTimeout(() => { state.shareMessage = ''; render(); }, 3000);
      }
    }

    // --- Rendering Components ---
    function renderCardHTML(card, options = {}) {
      if (!card) return '';
      const isSelected = options.isSelected || false;
      const disabled = options.disabled || false;
      const isHandCard = options.isHandCard || false;
      const isReadOnly = options.isReadOnly || false;
      const glow = options.glow || false;
      const customStyle = options.customStyle || '';
      
      const ModeIconName = MODE_ICON_NAMES[card.mode];
      
      let auraClass = '';
      if (isHandCard && !disabled && !isReadOnly) {
         if (isSelected) {
             auraClass = 'animate-cardAuraSelected';
         } else {
             auraClass = 'animate-cardAura';
         }
      }

      let selectedStyle = '';
      let normalStyle = '';

      if (isHandCard && !disabled && !isReadOnly) {
        selectedStyle = 'scale-[1.6] sm:scale-125 z-[100] -translate-y-6 sm:-translate-y-4 ' + auraClass;
        normalStyle = 'hover:-translate-y-2 ' + auraClass;
      } else {
        selectedStyle = 'border-yellow-500 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.6)] z-20 -translate-y-4';
        normalStyle = 'border-stone-400 hover:border-orange-400/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:-translate-y-2';
      }

      const baseClasses = 'relative w-[96px] h-[136px] sm:w-32 sm:h-48 rounded-md shadow-lg border flex flex-col transition-all duration-500 overflow-hidden origin-bottom bg-center bg-cover appearance-none bg-transparent p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900';
      
      let combinedClasses = baseClasses + " ";
      combinedClasses += isSelected ? selectedStyle : normalStyle;
      combinedClasses += " ";
      if (disabled) combinedClasses += 'opacity-50 cursor-not-allowed grayscale-[0.3] hover:translate-y-0 hover:shadow-lg ';
      combinedClasses += isReadOnly ? 'cursor-default hover:translate-y-0 hover:scale-100 ' : 'cursor-pointer ';
      combinedClasses += glow ? 'border-yellow-500/80 shadow-[0_0_20px_rgba(234,179,8,0.4)] z-20 ' : '';
      combinedClasses += customStyle;

      const isInteractive = !disabled && !isReadOnly && (isHandCard || options.isShopCard || options.isResultCard);
      let actionData = '';
      if (isInteractive) {
        if (isHandCard) actionData = 'data-action="select-hand" data-id="' + card.id + '"';
        else if (options.isShopCard) actionData = 'data-action="select-shop" data-id="' + card.id + '"';
        else if (options.isResultCard) actionData = 'data-action="select-result" data-id="' + card.id + '"';
      }

      const cardTag = isInteractive ? 'button' : 'div';
      const cardAttrs = isInteractive
        ? 'type="button" ' + actionData + ' aria-label="' + escapeAttribute(card.name + '。' + card.desc + ' ' + (isSelected ? '選択を解除' : '選択')) + '" aria-pressed="' + (isSelected ? 'true' : 'false') + '" '
        : '';

      return `
        <${cardTag} ${cardAttrs}class="${combinedClasses}" style="background-image: url('${CARD_BG_IMG}');">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none z-0">
            ${getIcon(ModeIconName, "w-12 h-12 sm:w-20 sm:h-20 text-orange-900")}
          </div>
          
          <div class="absolute inset-0 bg-gradient-to-b from-orange-900/5 via-transparent to-stone-500/10 pointer-events-none rounded-md z-0"></div>
          
          <div class="p-1 sm:p-1.5 pb-2 sm:pb-3 flex-1 flex flex-col relative z-20 justify-between">
            <div>
              <div class="font-black font-sans text-stone-900 text-[15px] sm:text-[19px] tracking-tight text-center relative leading-none mb-1 sm:mb-1.5 w-full flex items-center justify-center pt-2 sm:pt-3">
                <span class="break-keep drop-shadow-sm px-1 z-10 w-full text-center">${card.name}</span>
              </div>
            </div>
            <div class="text-[10px] sm:text-[11px] text-stone-800 font-extrabold flex-1 leading-tight sm:leading-relaxed font-serif mt-1 sm:mt-2 line-clamp-4 text-center px-0.5">${card.desc}</div>
            <div class="text-[8px] sm:text-[9px] text-stone-600 font-serif tracking-widest mt-1 text-center font-bold flex justify-center items-center gap-0.5">
              ${getIcon(ModeIconName, "w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-90 " + MODE_TEXT_COLORS[card.mode])}
              <span class="mt-[1px]">RIESM</span>
              ${getIcon(ModeIconName, "w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-90 " + MODE_TEXT_COLORS[card.mode])}
            </div>
          </div>
        </${cardTag}>
      `;
    }

    const MagicDustHTML = (() => {
      let html = '<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-60">';
      for(let i=0; i<15; i++) {
        const w = randomFloat() * 4 + 2;
        const l = randomFloat() * 100;
        const t = randomFloat() * 100;
        const dur = randomFloat() * 12 + 10;
        const del = randomFloat() * -20;
        html += '<div class="absolute bg-yellow-300 rounded-full animate-float blur-[1px]" style="width:' + w + 'px; height:' + w + 'px; left:' + l + '%; top:' + t + '%; animation-duration:' + dur + 's; animation-delay:' + del + 's; box-shadow:0 0 8px 2px rgba(253, 224, 71, 0.8)"></div>';
      }
      for(let i=0; i<10; i++) {
        const w = randomFloat() * 6 + 3;
        const l = randomFloat() * 100;
        const t = randomFloat() * 100;
        const dur = randomFloat() * 15 + 15;
        const del = randomFloat() * -20;
        html += '<div class="absolute bg-orange-400 rounded-full animate-float blur-[2px]" style="width:' + w + 'px; height:' + w + 'px; left:' + l + '%; top:' + t + '%; animation-duration:' + dur + 's; animation-delay:' + del + 's; box-shadow:0 0 12px 3px rgba(251, 146, 60, 0.6)"></div>';
      }
      html += '</div>';
      return html;
    })();

    const RULES_AUTO_ADVANCE_MS = 2650;
    let rulesAutoAdvanceTimer = null;

    const RULES_GUIDE_BLOCKS = [
      `
        <p>この世界では、</p>
        <p>人はひとつの役割だけで</p>
        <p>生きているわけではない…。</p>
      `,
      `
        <p>誰かを守る役割。</p>
        <p>新しい道をひらく役割。</p>
        <p>静かに観察する役割。</p>
        <p>場をあたためる役割。</p>
      `,
      `
        <p>おぬしは、これから</p>
        <p>5つのカードを得るじゃろう。</p>
      `,
      `
        <p>それは、おぬしの性格を</p>
        <p>決めるものではない。</p>
      `,
      `
        <p>これからの人生で、</p>
        <p>どんな力を使っていきたいのかを</p>
        <p>見つめるためのカードなのじゃよ。</p>
      `
    ];

    const RULES_DETAIL_BLOCKS = [
      '<p>①持っていける役割カードは5枚だけじゃ。</p>',
      '<p>②最初にハルカから5枚のカードを受け取る。</p>',
      '<p>③旅の途中で、他の旅人たちと役割カードを交換する…。</p>',
      '<p>④最後にわしのところに戻り、もう一度だけ役割を見つめ直すのじゃ。</p>',
      '<p>このワークは診断ではなく、<br>自分の役割を見つめるための時間なのじゃよ。</p>'
    ];

    function getActiveRulesBlocks() {
      return state.rulesExplanationPhase === 'details' ? RULES_DETAIL_BLOCKS : RULES_GUIDE_BLOCKS;
    }

    function getRulesVisibleCount() {
      return Math.min(getActiveRulesBlocks().length, state.rulesExplanationStep + 1);
    }

    function isRulesExplanationComplete() {
      return getRulesVisibleCount() >= getActiveRulesBlocks().length;
    }

    function getRulesCueText() {
      if (!isRulesExplanationComplete()) return '案内を表示中';
      return '次へ';
    }

    function renderRulesExplanationText() {
      const visibleCount = getRulesVisibleCount();
      return getActiveRulesBlocks()
        .map((block, index) => {
          const visibleClass = index < visibleCount ? ' is-visible' : '';
          const ariaHidden = index < visibleCount ? '' : ' aria-hidden="true"';
          return '<div class="rules-guide-block' + visibleClass + '" data-rules-block="' + index + '"' + ariaHidden + '>' + block + '</div>';
        })
        .join('');
    }

    function renderRulesNextCue() {
      return `
                    <p class="rules-next-cue">
                      <span data-rules-cue-text>${getRulesCueText()}</span><span class="rules-next-arrow">➤</span>
                    </p>
      `;
    }

    function renderRulesExplanationCard() {
      return `
                <button type="button" data-action="advance-rules" data-rules-phase="${state.rulesExplanationPhase}" aria-label="説明を次へ進める" class="relative block w-full text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-8 overflow-hidden bg-[#e8dcc4] h-[455px] sm:h-[594px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0e6d2] transition-colors duration-300" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover object-[50%_15%]" />
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.84) 68%, transparent 100% z-10 pointer-events-none"></div>
                  <div class="relative z-20 p-4 sm:p-8 w-[95%] sm:w-[68%] h-full flex flex-col justify-center text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <div class="space-y-2 sm:space-y-3">
                      ${renderRulesExplanationText()}
                    </div>
                    ${renderRulesNextCue()}
                  </div>
                </button>
      `;
    }

    function renderRulesActions() {
      return `
                <div class="flex justify-center relative z-10">
                  <button data-action="go-start" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-sm font-serif py-3 px-6 sm:px-8">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      ${getIcon('ChevronLeft', "w-4 h-4 sm:w-5 sm:h-5 mr-2")} タイトルに戻る
                    </span>
                  </button>
                </div>
      `;
    }

    function renderRulesScene() {
      return `
              <div class="bg-[#f0e6d2]/90 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 text-center max-w-2xl mx-auto shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0" style="background-image: ${PARCHMENT_TEXTURE}">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_JUNBI_IMG}" alt="準備室" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                ${renderRulesExplanationCard()}
                ${renderRulesActions()}
              </div>
      `;
    }

    function renderStartScene() {
      return `
              <div class="bg-center rounded-md border border-stone-400/80 text-center max-w-2xl mx-auto shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden flex flex-col justify-end min-h-[350px] sm:min-h-[450px]" style="background-image: url('${BG_START_MENTALIA}'); background-size: cover; background-position: center top;">
                <div class="absolute inset-0 bg-stone-900/10 z-0 pointer-events-none"></div>
                <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent z-0 pointer-events-none"></div>
                
                <div class="relative z-10 px-2 pb-6 sm:pb-8 pt-2 w-full">
                  <header class="text-center w-full">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-widest text-stone-100 drop-shadow-md magic-text-glow" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                      RIESM™ RoleTRADE<br/>Mentalia
                    </h1>
                    <p class="text-[10px] sm:text-sm text-stone-200 mt-3 sm:mt-4 tracking-[0.2em] font-serif font-bold drop-shadow-sm bg-stone-900/60 inline-block px-4 py-1.5 rounded-full border border-stone-500/50">― リフレムとハルカと、5つの役割 ―</p>
                  </header>
                </div>
              </div>

              <div class="mt-3 sm:mt-4 mb-3 max-w-2xl mx-auto w-full relative z-10">
                <div class="text-stone-800 text-left mb-2 sm:mb-2 font-serif font-medium bg-[#f4ebd8]/90 p-2.5 sm:p-4 rounded-md border border-stone-400/50 shadow-sm" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="text-[length:clamp(10px,2.9vw,13px)] sm:text-[13px] leading-[1.7] sm:leading-[1.65]">
                    <p class="text-stone-900 font-extrabold border-b border-stone-400/60 pb-2 mb-2 drop-shadow-sm break-keep">
                      ここはメンテーリア。<br/>
                      役割と物語が、人の未来を少しだけ変える世界。あなたは今、これまでの記憶と経験を持ったまま、<br/>
                      もう一度、<span class="text-orange-800 font-black text-[length:clamp(12.5px,3.8vw,17px)] sm:text-[17px]">18歳の自分</span>として旅立とうとしています。
                    </p>
                    <p class="text-stone-900 font-extrabold drop-shadow-sm break-keep">
                      けれど、<span class="text-orange-800 font-black text-[length:clamp(12.5px,3.8vw,17px)] sm:text-[17px]">持っていける役割は5つだけ</span>。<br/>
                      あなたは、どんな役割を未来の自分に託しますか？
                    </p>
                  </div>
                </div>


              <div class="mt-2 sm:mt-2 mb-3 flex justify-center relative z-10 px-4 sm:px-0">
                <button data-action="go-rules" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-xs sm:text-sm w-full sm:w-auto font-serif font-bold py-2.5 sm:py-3 px-7 sm:px-10 shadow-[0_5px_20px_rgba(0,0,0,0.4)] hover:scale-105">
                  <div class="wood-texture"></div>
                  <span class="relative z-10 flex items-center justify-center text-stone-100">
                    旅の説明を聞く
                    ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                  </span>
                </button>
              </div>

                <button data-action="toggle-trisetsu" class="flex items-center justify-between w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-[#f4ebd8]/90 hover:bg-[#e8dcc4] text-stone-800 font-serif font-bold text-xs sm:text-sm rounded-md border border-stone-400/50 shadow-sm transition-colors duration-300">
                  <div class="w-6 flex justify-start">
                    ${getIcon('Scroll', 'w-4 h-4 sm:w-5 sm:h-5 text-stone-600')}
                  </div>
                  <span class="flex-1 text-center leading-relaxed">
                    このアプリを<br/>「ワークショップ」で使う時のトリセツ
                  </span>
                  <div class="w-6 flex justify-end">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 text-stone-600 ${state.isTrisetsuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </button>
                
                <div class="overflow-hidden transition-all duration-500 ease-in-out ${state.isTrisetsuOpen ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}">
                  <div class="bg-[#f0e6d2]/95 backdrop-blur-sm p-3 sm:p-5 rounded-md border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] text-left font-serif text-[11px] sm:text-xs text-stone-800 leading-relaxed space-y-4" style="background-image: ${PARCHMENT_TEXTURE}">
                    <p class="font-bold text-xs sm:text-sm border-b border-stone-400/50 pb-2 text-stone-900">このページは、RoleTRADE™を自己理解ワークとして安全に活用するための説明書です。</p>
                    <p>アプリ本編は、物語として体験できるように作られています。<br>一方で、研修・ワークショップ・対話の場で使う場合には、目的や前提、注意点を理解したうえで扱うことが大切です。<br><span class="text-orange-900 font-bold block mt-2 text-sm">RoleTRADE™は、人を分類するための診断ではありません。</span>役割カードを通じて、今の自分を少し違う角度から見つめるための自己理解ワークです。</p>
                    
                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">1.</span>このワークの目的</h4>
                      <p>RoleTRADE™は、人をタイプ分けする診断ではありません。<br>役割カードを選び、交換し、最後に残ったカードを眺めることで、今の自分が大切にしている役割や、使ってみたい役割に気づくための自己理解ワークです。</p>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">2.</span>18歳という設定について</h4>
                      <p>ここでの18歳は、実年齢そのものではありません。<br>「もう一度、役割を選び直すための物語上の出発点」です。<br>過去に戻ることではなく、今の知識と経験を持ったまま、自分の役割を見つめ直すための演出です。</p>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">3.</span>役割カードの考え方</h4>
                      <p>このワークでは、人の性格を固定的に分類するのではなく、場面に応じて現れる「役割」に注目します。<br>人はひとつの役割だけで生きているわけではなく、環境・相手・状態によって前に出る役割が変わります。</p>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">4.</span>結果の受け取り方</h4>
                      <p>最後に残ったカードは、「あなたのすべて」ではありません。<br>今この瞬間に、あなたが残したかった役割、手放せなかった役割、必要としている役割を映すものです。<br>正解・不正解ではなく、内省のきっかけとして扱います。</p>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-red-900/20 relative overflow-hidden">
                      <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-800/60"></div>
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-red-800 mr-2 text-base">5.</span>やってはいけない使い方</h4>
                      <p class="font-bold text-red-800 mb-3 text-xs">ここは大事です。</p>
                      <ul class="list-none space-y-2 text-stone-800">
                        <li class="flex items-start"><span class="text-red-700 mr-2 font-bold">×</span>他者を「あなたはこのタイプ」と決めつける</li>
                        <li class="flex items-start"><span class="text-red-700 mr-2 font-bold">×</span>結果を能力評価や人事評価に使う</li>
                        <li class="flex items-start"><span class="text-red-700 mr-2 font-bold">×</span>本人の同意なく結果を共有する</li>
                        <li class="flex items-start"><span class="text-red-700 mr-2 font-bold">×</span>医療的・診断的な意味づけをする</li>
                        <li class="flex items-start"><span class="text-red-700 mr-2 font-bold">×</span>結果を固定的な性格判断として扱う</li>
                      </ul>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">6.</span>ファシリテーター向けの注意</h4>
                      <p>ワーク実施者は、参加者の選択を評価・解釈しすぎない。<br>「なぜそれを選んだのですか？」よりも、<br><span class="font-bold text-orange-900 block mt-2 p-2 bg-[#f4ebd8] rounded border border-orange-900/20">「そのカードを残したとき、どんな感じがしましたか？」</span>のように、本人の内省を中心に進める。</p>
                    </div>

                    <div class="bg-[#e8dcc4]/50 p-3 rounded-sm border border-stone-300/50">
                      <h4 class="font-bold text-stone-900 mb-2 flex items-center"><span class="text-orange-700 mr-2 text-base">7.</span>理論の背景「役割」について</h4>
                      <p>RIESM™ RoleTRADEは、交流分析とRIASECという自己理解・キャリア理解の考え方を背景にしています。交流分析は、人が場面によって異なる役割や反応を見せることに注目する理論です。RIASECは、興味・関心の方向性から、自分に合う活動や働き方を考える理論です。<br>本ワークでは、これらをもとに、固定的な性格診断ではなく「今の自分が使いたい役割」を見つめます。</p>
                    </div>

                    <div class="mt-4 pt-3 border-t border-stone-400/50 text-center flex justify-center">
                      <button data-action="close-trisetsu" class="inline-flex items-center justify-center py-2 px-5 bg-[#e8dcc4] hover:bg-[#d6c5a5] text-stone-800 font-serif font-bold text-xs sm:text-sm rounded-md border border-stone-400/50 shadow-sm transition-colors duration-300">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                        トリセツを閉じる
                      </button>
                    </div>
                  </div>
                </div>
              </div>


              <div class="mt-3 sm:mt-8 mb-4 sm:mb-8 text-center relative z-10 bg-[#f4ebd8]/80 p-4 sm:p-6 rounded-md border border-stone-400/50 shadow-[0_5px_15px_rgba(0,0,0,0.05)] max-w-2xl mx-auto" style="background-image: ${PARCHMENT_TEXTURE}">
                <p class="text-xs sm:text-sm text-stone-800 font-serif font-bold mb-2 sm:mb-3">現実のあなたにも備わっている「24の役割」についてもっと知りたい方はこちら</p>
                <a href="https://ninin-cc.github.io/riesm.html" target="_blank" rel="noopener noreferrer" class="inline-block text-xs sm:text-base text-orange-900 font-extrabold hover:text-orange-700 transition-colors font-serif tracking-widest border-b-2 border-orange-900 hover:border-orange-700 pb-0.5 sm:pb-1 drop-shadow-md">
                  🌈RIESM™
                </a>
              </div>

              <div class="mt-2 sm:mt-8 text-center relative z-10">
                <a href="https://ninin-cc.github.io/riesm.html" target="_blank" rel="noopener noreferrer" class="text-[9px] sm:text-xs text-stone-900 font-bold hover:text-orange-900 transition-colors font-serif tracking-widest border-b border-transparent hover:border-orange-900 pb-0.5 drop-shadow-md">
                  © 2026 ninin consulting＆counseling
                </a>
              </div>
        `;
    }

    function render() {
      const root = document.getElementById('root');
      const isShopTime = state.shopRounds.includes(state.round);
      const stageFadeClass = state.isTransitioning ? 'animate-fadeInStage' : '';
      const isInitialExchange = state.gameState === 'PLAYING' && state.round === 1;

      // ▼▼ 事前に構築する HTML ▼▼
      let initialHandTopHTML = '';
      let initialHandBottomHTML = '';
      if (state.gameState === 'INITIAL_HAND') {
        const collectClass = state.initialHandCollecting ? ' is-collecting' : '';
        initialHandTopHTML = state.hand.slice(0, 3).map((card, index) => {
          const isSelected = state.selectedHandCard?.id === card.id;
          const gatherIndex = index + 1;
          return '<div class="initial-hand-card initial-hand-card-' + gatherIndex + collectClass + ' shrink-0 transition-all duration-500 relative ' + (isSelected ? 'z-[100]' : 'z-10') + '">' + renderCardHTML(card, { isHandCard: true, isSelected: isSelected }) + '</div>';
        }).join('');
        initialHandBottomHTML = state.hand.slice(3, 5).map((card, index) => {
          const isSelected = state.selectedHandCard?.id === card.id;
          const gatherIndex = index + 4;
          return '<div class="initial-hand-card initial-hand-card-' + gatherIndex + collectClass + ' shrink-0 transition-all duration-500 relative ' + (isSelected ? 'z-[100]' : 'z-10') + '">' + renderCardHTML(card, { isHandCard: true, isSelected: isSelected }) + '</div>';
        }).join('');
      }

      let shopCardsTopHTML = '';
      let shopCardsBottomHTML = '';
      if (state.gameState === 'PLAYING' && isShopTime) {
        const createShopCardWrapper = (card) => {
          const isSelected = state.selectedShopCard?.id === card.id;
          let cStyle = "sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-down ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          return renderCardHTML(card, { isSelected: isSelected, isShopCard: true, customStyle: cStyle });
        };
        shopCardsTopHTML = state.shop.slice(0, 3).map(createShopCardWrapper).join('');
        shopCardsBottomHTML = state.shop.slice(3, 6).map(createShopCardWrapper).join('');
      }

      let resultHandTopHTML = '';
      let resultHandBottomHTML = '';
      if (state.gameState === 'RESULT' && state.resultStep !== 'FINAL') {
        resultHandTopHTML = state.hand.slice(0, 3).map(card => {
          const isSelected = card.id === state.primaryCard?.id || card.id === state.secondaryCard?.id;
          const isDimmed = state.resultStep === 'SELECT_2' && card.id === state.primaryCard?.id;
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { disabled: isDimmed, isSelected: isSelected, isResultCard: true }) + '</div>';
        }).join('');

        resultHandBottomHTML = state.hand.slice(3, 5).map(card => {
          const isSelected = card.id === state.primaryCard?.id || card.id === state.secondaryCard?.id;
          const isDimmed = state.resultStep === 'SELECT_2' && card.id === state.primaryCard?.id;
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { disabled: isDimmed, isSelected: isSelected, isResultCard: true }) + '</div>';
        }).join('');
      }

      let unselectedCardsHTML = '';
      if (state.gameState === 'RESULT' && state.resultStep === 'FINAL') {
        unselectedCardsHTML = state.hand.filter(c => c.id !== state.primaryCard?.id && c.id !== state.secondaryCard?.id).map(card => '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" }) + '</div>').join('');
      }

      let dockCardsHTML = '';
      if (state.gameState === 'PLAYING') {
        dockCardsHTML = state.hand.map((card, index) => {
          const isSelected = state.selectedHandCard?.id === card.id;
          let edgeAdjustment = 'origin-bottom';
          if (isSelected) {
            if (index === 0) edgeAdjustment = ' origin-bottom-left translate-x-4 sm:translate-x-6 ';
            else if (index === state.hand.length - 1) edgeAdjustment = ' origin-bottom-right -translate-x-4 sm:-translate-x-6 ';
          }
          let cStyle = "sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-up ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          cStyle += edgeAdjustment;
          
          let wrapClass = "shrink-0 transition-all duration-500 relative ";
          if (index > 0) wrapClass += "-ml-8 sm:ml-2 ";
          wrapClass += isSelected ? "z-[100]" : "z-10";

          return '<div class="' + wrapClass + '">' + renderCardHTML(card, { isSelected: isSelected, isHandCard: true, customStyle: cStyle }) + '</div>';
        }).join('');
      }

      // ▼▼ メイン HTML 構築 ▼▼
      let html = `
        <div class="min-h-screen text-stone-900 font-sans flex justify-center transition-colors duration-1000 overflow-x-hidden relative pt-2.5 sm:pt-6 lg:pt-8"
             style="background-color: #e8dcc4; background-image: radial-gradient(circle at 15% 10%, rgba(249, 115, 22, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 90%, rgba(234, 179, 8, 0.12) 0%, transparent 40%), ${PARCHMENT_TEXTURE}; box-shadow: inset 0 0 120px rgba(67, 20, 7, 0.5)">
          
          ${MagicDustHTML}
      `;

      if (state.isAppBrowser) {
        html += `
          <div class="fixed inset-0 z-[1000] bg-stone-900/95 flex flex-col items-center justify-center p-6 text-stone-100 font-sans">
            <div class="bg-[#f0e6d2] p-8 rounded-md max-w-sm w-full text-center text-stone-900 border-2 border-orange-900/50" style="background-image: ${PARCHMENT_TEXTURE}">
              <div class="flex justify-center mb-4">
                 ${getIcon('Compass', "w-12 h-12 text-orange-700")}
              </div>
              <h2 class="text-xl font-bold font-serif mb-4 text-orange-900">ブラウザで開いてください</h2>
              <p class="text-sm font-bold leading-relaxed text-stone-800 text-left mb-6">
                現在、LINEやXなどのアプリ内ブラウザで表示されています。<br/><br/>
                このままでは画像の保存やシェア機能が正常に動作しないため、<br/>
                画面右下（または右上）のメニューボタンから、<br/>
                <span class="text-orange-700">「デフォルトのブラウザで開く」</span><br/>
                <span class="text-orange-700">「Safariで開く」</span><br/>
                を選択して再読み込みしてください。
              </p>
              <button data-action="close-iab-modal" class="wood-btn wood-btn-dark rounded-sm w-full transition-all duration-300 flex items-center justify-center text-sm font-serif font-bold py-3 px-6 tracking-widest relative">
                <div class="wood-texture"></div>
                <span class="relative z-10 flex items-center justify-center">このまま続ける（非推奨）</span>
              </button>
            </div>
          </div>
        `;
      }

      html += `
          <div id="main-stage" class="w-full flex justify-center ${stageFadeClass}">
            <div class="w-full max-w-4xl relative z-10 px-2 pt-2 pb-4 ${state.gameState === 'PLAYING' ? 'sm:p-4 sm:pt-4 md:p-5 md:pt-5 pb-[260px] sm:pb-[230px]' : 'sm:p-4 sm:pt-8 md:p-8 md:pt-10'}">
      `;

      if (!HEADER_HIDDEN_STATES.includes(state.gameState)) {
        html += `
              <header class="mb-3 sm:mb-8 text-center pt-0 sm:pt-4">
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-widest text-stone-900 drop-shadow-md magic-text-glow">
                  RIESM™ RoleTRADE Mentalia
                </h1>
                <p class="text-xs sm:text-sm text-stone-700 mt-1 sm:mt-3 tracking-[0.2em] font-serif font-bold drop-shadow-sm bg-stone-100/50 inline-block px-4 py-1 rounded-full border border-stone-300/50">― リフレムとハルカと、5つの役割 ―</p>
              </header>
        `;
      }

      if (state.gameState === 'START') {
        html += renderStartScene();
      }

      if (state.gameState === 'RULES') {
        html += renderRulesScene();
      }

      if (state.gameState === 'INITIAL_HAND') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_JUNBI_IMG}" alt="準備室" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${HARUKA_AVATAR}" alt="ハルカ" class="w-full h-full object-cover object-top" />
                  </div>
                  
                  <div class="absolute inset-0 bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="relative z-20 p-4 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <p>これが、今のあなたに最初に渡される</p>
                    <p>5つの役割です。</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>すぐに好き嫌いを決めなくても大丈夫ですよ。</p>
                    <p>まずは、ひとつひとつのカードを</p>
                    <p>読んでみてくださいね。</p>
                    <br/><br/><br/><br/><br/><br/>
                  </div>
                </div>
                
                <div class="flex flex-col items-center gap-3 sm:gap-4 w-full relative z-10">
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${initialHandTopHTML}
                  </div>
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${initialHandBottomHTML}
                  </div>
                </div>

                <div class="mt-8 sm:mt-12 flex justify-center relative z-10">
                  <button data-action="go-playing" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-12 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      5枚受け受け取り最初の交換へ
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：武器屋の見送り ▼▼
      if (state.gameState === 'LEAVE_SHOP_1') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_JUNBI_IMG}" alt="役割の庭" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] min-h-[220px] sm:min-h-[260px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${HARUKA_AVATAR}" alt="ハルカ" class="w-full h-full object-cover object-top" />
                  </div>
                  
                  <div class="absolute inset-0 bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="relative z-20 p-4 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <p>ふふ、なかなかいい役割を</p>
                    <p>選びましたね。</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>この先にある『対話の酒場』には、</p>
                    <p>あなたと同じような旅人たちが</p>
                    <p>集まっていますよ。</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>自分の手札を見せ合って、</p>
                    <p>いろいろ話してみてくださいね。</p>
                    <p>いってらっしゃい！</p>
                  </div>
                </div>
                
                <div class="mt-8 sm:mt-12 flex justify-center relative z-10">
                  <button data-action="go-before-tavern" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-12 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      対話の酒場へ向かう
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：酒場の前 ▼▼
      if (state.gameState === 'BEFORE_TAVERN') {
        html += `
              <div class="bg-[#f0e6d2]/70 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_TRADE_IMG}" alt="酒場" class="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
                
                <h2 class="text-xl sm:text-2xl font-serif font-extrabold mb-5 sm:mb-8 tracking-widest text-stone-900 magic-text-glow relative z-10 mt-0 sm:mt-2">
                  旅人たちの酒場へ
                </h2>
                
                <div class="text-stone-800 text-left space-y-4 mb-6 sm:mb-10 text-sm sm:text-base leading-relaxed font-serif font-bold bg-[#e8dcc4]/90 p-5 sm:p-8 rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative z-10">
                  <p>扉の向こうから、笑い声とグラスの音が聞こえてくる。</p>
                  <p>あなたは手元の役割カードを見つめ、石畳の道へ一歩踏み出した。</p>
                  <p>さあ、他の旅人たちと出会う時間だ。</p>
                </div>
                
                <div class="mt-6 sm:mt-12 flex justify-center relative z-10">
                  <button data-action="go-playing" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-12 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      酒場の扉を開く
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：準備部屋へ戻る ▼▼
      if (state.gameState === 'AFTER_TAVERN') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_TRADE_IMG}" alt="酒場" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
                
                <h2 class="text-xl sm:text-2xl font-serif font-extrabold mb-5 sm:mb-8 tracking-widest text-stone-900 magic-text-glow relative z-10 mt-0 sm:mt-2">
                  灯火の間へ
                </h2>
                
                <div class="text-stone-800 text-left space-y-4 mb-6 sm:mb-10 text-sm sm:text-base leading-relaxed font-serif font-bold bg-[#e8dcc4]/90 p-5 sm:p-8 rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative z-10">
                  <p>酒場のざわめきが、少しずつ遠ざかっていく。</p>
                  <p>手元のカードは、最初とは少し違う重さを持っているように感じられた。</p>
                  <p>その先に、小さな灯火が見える。</p>
                  <p>そこには、静かにあなたを待つリフレムがいた。</p>
                </div>
                
                <div class="mt-6 sm:mt-12 flex justify-center relative z-10">
                  <button data-action="go-playing" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-12 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      リフレムのもとへ向かう
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：最後の武器屋の確認 ▼▼
      if (state.gameState === 'SHOP_CONFIRM') {
        let confirmHandTopHTML = state.hand.slice(0, 3).map(card => {
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" }) + '</div>';
        }).join('');
        let confirmHandBottomHTML = state.hand.slice(3, 5).map(card => {
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" }) + '</div>';
        }).join('');

        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_JUNBI_IMG}" alt="灯火の間" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] min-h-[220px] sm:min-h-[260px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);">
                    <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover object-center" />
                  </div>
                  
                  <div class="absolute inset-0 bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="relative z-20 p-4 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <p>本当に、この5つの役割とともに</p>
                    <p>旅立つのじゃな？</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>よいか。ここに“正解”などないのじゃ。</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>今この瞬間のおぬしが、</p>
                    <p>未来の自分に託したいと感じた役割……</p>
                    <div class="h-1.5 sm:h-2"></div>
                    <p>ならば、その選択を</p>
                    <p>誰も責めることなどできぬ。</p>
                    <p>ただ、静かに受け取ればよいのじゃ。</p>
                  </div>
                </div>
                
                <div class="flex flex-col items-center gap-2 sm:gap-4 w-full relative z-10 mb-6 sm:mb-10 scale-[0.85] sm:scale-100 origin-top">
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${confirmHandTopHTML}
                  </div>
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${confirmHandBottomHTML}
                  </div>
                </div>

                <div class="mt-2 sm:mt-4 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                  <button data-action="confirm-journey-no" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-sm font-serif py-3 px-8 sm:px-10 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      ${getIcon('ChevronLeft', "w-4 h-4 mr-2")} もう一度見直す
                    </span>
                  </button>
                  <button data-action="confirm-journey-yes" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-10 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      この5枚を受け取る
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：最後の武器屋の別れ ▼▼
      if (state.gameState === 'SHOP_FAREWELL') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_JUNBI_IMG}" alt="灯火の間" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover object-center" />
                  </div>
                  
                  <div class="absolute inset-0 bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="relative z-20 p-5 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <p>${state.farewellMessage}</p>
                  </div>
                </div>
                
                <div class="mt-8 sm:mt-12 flex justify-center relative z-10">
                  <button data-action="go-result" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-sm font-serif font-bold py-3 px-8 sm:px-12 w-full sm:w-auto">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      結果を見る
                      ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                    </span>
                  </button>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：PLAYING（メインエリア） ▼▼
      if (state.gameState === 'PLAYING') {
        html += `
              <div class="bg-[#f0e6d2]/95 rounded-sm shadow-[0_10px_30px_rgba(124,45,18,0.2)] border border-stone-400/80 min-h-[300px] sm:min-h-[340px] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${isShopTime ? BG_JUNBI_IMG : BG_TRADE_IMG}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                </div>
        `;

        if (isShopTime) {
          const guide = GUIDE_MESSAGES[state.round];
          html += `
                  <div class="p-3 sm:p-8 relative z-10">
                    <div class="flex items-start max-w-2xl mx-auto w-full mb-4 sm:mb-8 px-1 sm:px-0">
                      <div class="flex flex-col items-center shrink-0 z-10 w-16 sm:w-28">
                        <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                          <img src="${guide.avatar}" alt="${guide.name}" class="w-full h-full object-cover" ${state.round === 1 ? 'style="object-position: 65% 10%;"' : 'style="object-position: 50% 15%;"'} />
                        </div>
                        <div class="mt-1 sm:mt-2 text-center w-full">
                          <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">
                            R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.round}</span> / ${TOTAL_ROUNDS}
                          </div>
                          <div class="flex items-center justify-center gap-0.5 font-bold text-[8px] sm:text-[10px] bg-[#e8dcc4] px-0.5 sm:px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm ${guide.color} leading-tight">
                            ${getIcon(guide.icon, "w-2.5 h-2.5 " + guide.color)} ${guide.place}
                          </div>
                        </div>
                      </div>
                      
                      <div class="relative bg-[#f4ebd8] p-2.5 sm:p-6 rounded-md border border-stone-400/60 shadow-md flex-1 ml-2 sm:ml-6 mt-0 sm:mt-0" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <div class="text-[11px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left space-y-1 sm:space-y-2">
                          ${guide.message}
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col items-center gap-2 sm:gap-4 w-full mb-4 sm:mb-8 relative z-10">
                      ${isInitialExchange ? '<p class="selection-guide-label mb-0.5 sm:mb-1">ここから一つ選ぶ</p>' : ''}
                      <div class="flex justify-center gap-1 sm:gap-4 w-full">
                        ${shopCardsTopHTML}
                      </div>
                      <div class="flex justify-center gap-1 sm:gap-4 w-full">
                        ${shopCardsBottomHTML}
                      </div>
                    </div>
                  </div>
          `;
        } else {
          html += `
                  <div class="p-2 sm:p-5 relative z-10">
                    <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4 max-w-[31rem] sm:max-w-[34rem] mx-auto w-full items-start">
                      <div class="flex flex-col items-center shrink-0 z-10 w-full">
                        <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                          <img src="${state.tradeAvatarImg}" alt="転生者" class="w-full h-full object-cover object-center" />
                        </div>
                        <div class="mt-1 sm:mt-2 text-center w-full">
                          <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">
                            R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.round}</span> / ${TOTAL_ROUNDS}
                          </div>
                          <div class="flex items-center justify-center gap-0.5 font-bold text-[9px] sm:text-[10px] bg-[#e8dcc4] px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm text-blue-900 leading-tight">
                            ${getIcon('ArrowRightLeft', "w-2.5 h-2.5 text-blue-700")} 酒場
                          </div>
                        </div>
                      </div>

                      <div class="relative bg-[#f4ebd8] p-2.5 sm:p-3 rounded-md border border-stone-400/60 shadow-md min-w-0 flex flex-col items-center gap-2 sm:gap-2.5" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <p class="self-stretch text-[10.5px] sm:text-sm text-stone-900 font-serif font-bold leading-relaxed sm:leading-loose text-left">${state.tradeMessage || TRADE_MESSAGES[state.round]}</p>
                        <div class="w-full flex flex-col items-center pt-2 sm:pt-2.5 border-t border-stone-400/35 -translate-x-14">
                          <p class="text-[9px] sm:text-xs font-serif tracking-widest text-stone-700 mb-1.5 sm:mb-2 font-bold">旅人からの提示</p>
                          <div class="flex justify-center transform hover:scale-105 transition-transform duration-500">
                            ${renderCardHTML(state.tradeOfferCard, { disabled: true, customStyle: 'sm:!w-24 sm:!h-36 ' + (state.isExchanging ? 'animate-fly-down ' : '') + (state.isEntering ? 'animate-drop-in' : '') })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
          `;
        }

        if (state.round === 1 && state.showTutorial) {
          html += `
                  <div class="fixed inset-0 z-[200] flex items-start justify-center pt-10 sm:pt-20 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
                    <div class="bg-[#f0e6d2] p-6 sm:p-8 rounded-sm shadow-2xl max-w-md w-[90%] text-center border border-orange-900/30" style="background-image: ${PARCHMENT_TEXTURE}">
                      <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-4 magic-text-glow">【 トレードのやり方 】</h3>
                      <p class="text-sm sm:text-base text-stone-800 font-serif font-bold leading-loose mb-6">
                        上から<span class="text-orange-700">1枚</span>、<br/>
                        下（自分の手札）から<span class="text-orange-700">1枚</span>を選択し、<br/>
                        一番下のボタンを押して入れ替えてください。
                      </p>
                      <button data-action="close-tutorial" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-sm tracking-widest font-serif font-bold py-2 sm:py-3 px-8 w-full sm:w-auto">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">理解した</span>
                      </button>
                    </div>
                  </div>
          `;
        }

        const confirmReceiveCard = state.selectedShopCard || state.tradeOfferCard;
        if (state.tradeConfirmOpen && state.selectedHandCard && confirmReceiveCard) {
          html += `
                  <div class="fixed inset-0 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-fadeInModal" style="z-index: 220;">
                    <div class="bg-[#f0e6d2] w-full max-w-lg rounded-sm shadow-2xl border border-orange-900/30 p-4 sm:p-6 text-center" style="background-image: ${PARCHMENT_TEXTURE}">
                      <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-2 magic-text-glow">これでいいですか？</h3>
                      <p class="text-xs sm:text-sm font-serif font-bold text-stone-700 mb-4">選んだ2枚を交換します。</p>
                      <div class="grid grid-cols-2 gap-3 sm:gap-5 items-start mb-5">
                        <div class="flex flex-col items-center gap-2">
                          <p class="text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-orange-800">受け取るカード</p>
                          <div class="scale-[0.86] sm:scale-95 origin-top">
                            ${renderCardHTML(confirmReceiveCard, { isReadOnly: true, customStyle: "shadow-lg" })}
                          </div>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                          <p class="text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-stone-700">手放すカード</p>
                          <div class="scale-[0.86] sm:scale-95 origin-top">
                            ${renderCardHTML(state.selectedHandCard, { isReadOnly: true, customStyle: "shadow-lg" })}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                        <button data-action="cancel-trade-confirm" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full sm:w-auto">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">選び直す</span>
                        </button>
                        <button data-action="confirm-trade" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-6 w-full sm:w-auto">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">交換する</span>
                        </button>
                      </div>
                    </div>
                  </div>
          `;
        }

        html += `</div>`;
      }

      // ▼▼ シーン：RESULT ▼▼
      if (state.gameState === 'RESULT') {
        if (state.shareMessage) {
          html += `
                <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-orange-300 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)] border border-orange-500 animate-bounce text-xs sm:text-sm text-center w-11/12 max-w-md">
                  ${state.shareMessage}
                </div>
          `;
        }

        if (state.confirmingCard) {
          html += `
                <div class="fixed inset-0 z-[200] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm ${state.isConfirmModalClosing ? 'animate-fadeOutModal' : 'animate-fadeInModal'}">
                  <div class="bg-[#f0e6d2] p-6 sm:p-8 rounded-sm shadow-2xl max-w-sm w-[90%] text-center border border-orange-900/30" style="background-image: ${PARCHMENT_TEXTURE}">
                    <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-4 magic-text-glow">【 最終確認 】</h3>
                    <p class="text-sm sm:text-base text-stone-800 font-serif font-bold leading-loose mb-4">
                      「${state.confirmingCard.name}」を<br/>
                      <span class="text-orange-700 text-lg">${state.resultStep === 'SELECT_1' ? '一番' : '二番目'}</span> に大事な役割としますか？
                    </p>
                    
                    <div class="flex justify-center mb-6 scale-90 origin-top">
                      ${renderCardHTML(state.confirmingCard, { isReadOnly: true })}
                    </div>

                    <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                      <button data-action="confirm-no" class="wood-btn wood-btn-light rounded-sm transition-all text-sm font-serif font-bold py-2 sm:py-3 px-6 w-full sm:w-auto">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">選び直す</span>
                      </button>
                      <button data-action="confirm-yes" class="wood-btn wood-btn-dark rounded-sm transition-all text-sm tracking-widest font-serif font-bold py-2 sm:py-3 px-8 w-full sm:w-auto">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">決定する</span>
                      </button>
                    </div>
                  </div>
                </div>
          `;
        }

        if (state.resultStep !== 'FINAL') {
          html += `
                <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                  <div class="absolute inset-0 z-0 pointer-events-none">
                    <img src="${BG_JUNBI_IMG}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                  </div>
                  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
                  
                  <div class="py-2 sm:py-4 px-2 flex flex-col items-center relative z-10">
                    <h2 class="text-2xl sm:text-3xl font-serif font-extrabold mb-4 sm:mb-6 tracking-widest text-stone-900 magic-text-glow">
                      ${state.resultStep === 'SELECT_1' ? '第一の役割' : '第二の役割'}
                    </h2>
                    <p class="text-stone-800 mb-5 sm:mb-8 font-serif text-sm sm:text-base font-bold w-full text-center px-4 bg-[#e8dcc4]/80 py-4 rounded-sm border border-stone-300 whitespace-pre-line">${state.resultStep === 'SELECT_1' ? '5つの役割が確定しました。<br/>この中で【一番大事にしたい役割】を1つ選んでください。' : '次に、【二番目に大事にしたい役割】を1つ選んでください。'}</p>

                    ${state.resultStep === 'SELECT_2' ? `
                      <button data-action="result-reset" class="mb-4 sm:mb-6 flex items-center text-stone-600 hover:text-stone-900 font-serif font-bold text-xs sm:text-sm transition-colors border-b border-stone-400 hover:border-stone-800 pb-1">
                        ${getIcon('ChevronLeft', "w-4 h-4 mr-1")} 一番大事な役割から選び直す
                      </button>
                    ` : ''}
                    
                    <div class="flex flex-col items-center gap-2 sm:gap-4 w-full">
                      <div class="flex justify-center gap-2 sm:gap-4 w-full">
                        ${resultHandTopHTML}
                      </div>
                      <div class="flex justify-center gap-2 sm:gap-4 w-full">
                        ${resultHandBottomHTML}
                      </div>
                    </div>

                  </div>
                </div>
          `;
        } else {
          const freqMode = getMostFrequentMode();
          const aura = MODE_AURA_COLORS[freqMode];

          html += `
                  <div id="capture-area" class="bg-[#f0e6d2] pt-10 pb-10 px-4 sm:px-8 md:px-12 text-center relative overflow-hidden mt-2 sm:mt-4" style="background-image: ${PARCHMENT_TEXTURE}">
                    <div class="absolute inset-0 z-0 pointer-events-none">
                      <img src="${BG_DOOR_IMG}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
                    </div>
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                    <p class="text-stone-800 mb-6 sm:mb-8 font-serif text-sm sm:text-base font-bold w-full text-center relative z-10">これがあなたが18歳の自分に持たせる<br class="sm:hidden" />「5つの役割」です。</p>
                    
                    <div class="flex flex-col items-center w-full mt-2 mb-2 relative z-10">
                      
                      <div class="flex justify-center gap-6 sm:gap-16 z-10 mb-8 sm:mb-10 w-full mt-4">
                        <div class="relative transform scale-110 sm:scale-125 transition-transform duration-500 mx-2 sm:mx-4">
                          <div class="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-orange-800 text-yellow-300 text-[10px] sm:text-[12px] font-bold px-3 sm:px-4 py-1 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] z-30 whitespace-nowrap border border-orange-400/50 flex items-center tracking-widest">
                            ★★★★★
                          </div>
                          <div class="absolute -inset-4 z-0 pointer-events-none animate-pulse">
                             ${getIcon('Sparkles', "absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 text-yellow-500")}
                             ${getIcon('Sparkles', "absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 text-orange-400")}
                             ${getIcon('Star', "absolute top-1/2 -right-3 sm:-right-4 w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300")}
                          </div>
                          ${renderCardHTML(state.primaryCard, { isReadOnly: true, glow: true, customStyle: "shadow-[0_15px_40px_rgba(234,179,8,0.5)] z-20" })}
                        </div>
                        
                        <div class="relative transform scale-110 sm:scale-125 transition-transform duration-500 mx-2 sm:mx-4">
                          <div class="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-stone-600 to-stone-800 text-stone-300 text-[10px] sm:text-[12px] font-bold px-3 sm:px-4 py-1 rounded-full shadow-lg z-30 whitespace-nowrap border border-stone-400/50 flex items-center tracking-widest">
                            ★★★★
                          </div>
                          <div class="absolute -inset-4 z-0 pointer-events-none animate-pulse" style="animation-delay: 0.5s">
                             ${getIcon('Sparkles', "absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 text-yellow-500")}
                             ${getIcon('Sparkles', "absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 text-orange-400")}
                             ${getIcon('Star', "absolute top-1/2 -left-3 sm:-left-4 w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300")}
                          </div>
                          ${renderCardHTML(state.secondaryCard, { isReadOnly: true, glow: true, customStyle: "shadow-[0_15px_40px_rgba(234,179,8,0.5)] z-20" })}
                        </div>
                      </div>

                      <div class="flex justify-center gap-2 sm:gap-4 z-10 w-full mt-2 scale-[0.85] sm:scale-100 origin-top">
                        ${unselectedCardsHTML}
                      </div>
                    </div>

                    <div class="w-full max-w-2xl mx-auto mt-2 sm:mt-4 relative z-10">
                      <div class="mb-4 sm:mb-6 bg-[#f4ebd8]/90 p-4 sm:p-6 rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.05)]" style="background-image: ${PARCHMENT_TEXTURE}">
                        <p class="font-serif text-xs sm:text-sm text-stone-700 mb-2 tracking-widest font-bold text-center">一番多く選んだ色</p>
                        
                        <div class="relative inline-flex justify-center w-full my-1">
                           <div class="absolute inset-0 pointer-events-none flex items-center justify-center animate-pulse opacity-70">
                              ${getIcon('Sparkles', `absolute -top-3 left-[30%] w-4 h-4 ${aura.sparkle}`)}
                              ${getIcon('Star', `absolute -bottom-2 right-[30%] w-3 h-3 ${aura.star}`)}
                           </div>
                           <p class="text-xl sm:text-2xl font-serif font-extrabold tracking-wider drop-shadow-md text-center relative z-10 ${MODE_TEXT_COLORS[freqMode]}" style="text-shadow: ${aura.shadow}">
                             ${getModeColorText(freqMode)}
                           </p>
                        </div>
                        
                        <p class="${MODE_TEXT_COLORS[freqMode]} text-sm sm:text-base font-extrabold text-center mt-2 mb-3 drop-shadow-sm">
                          ${getJewelDescription(freqMode)}
                        </p>

                        <p class="text-[10px] sm:text-[11px] text-stone-800 leading-relaxed font-serif font-bold text-center border-t border-stone-300/60 pt-3">
                          一番多く選んだ色は、今のあなたが人生に装備したいモードかもしれません。<br/>得意だから残ったものもあれば、苦手だけど必要だと感じて残ったものもあるはずです。
                        </p>
                      </div>
                    </div>

                    <div class="mt-2 pt-2 sm:pt-4 text-center w-full relative z-10">
                      <p class="text-[9px] sm:text-[11px] text-stone-800 font-serif tracking-widest font-bold">©RIESM™ RoleTRADE</p>
                      <p class="text-[8px] sm:text-[10px] text-stone-700 font-serif tracking-widest mt-1">© 2026 ninin consulting＆counseling</p>
                    </div>
                  </div>

                  <div class="mt-5 sm:mt-8 mb-5 sm:mb-8 text-center relative z-10 bg-[#f4ebd8]/80 p-4 sm:p-6 rounded-md border border-stone-400/50 shadow-[0_5px_15px_rgba(0,0,0,0.05)] max-w-2xl mx-auto" style="background-image: ${PARCHMENT_TEXTURE}">
                    <p class="text-xs sm:text-sm text-stone-800 font-serif font-bold mb-3">現実のあなたにも備わっている「24の役割」についてもっと知りたい方はこちら</p>
                    <a href="https://ninin-cc.github.io/riesm.html" target="_blank" rel="noopener noreferrer" class="inline-block text-sm sm:text-base text-orange-900 font-extrabold hover:text-orange-700 transition-colors font-serif tracking-widest border-b-2 border-orange-900 hover:border-orange-700 pb-1 drop-shadow-md">
                      🌈RIESM™
                    </a>
                  </div>

                  <div class="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 text-stone-900 font-serif font-bold text-left px-1 sm:px-4 relative z-10">
                    <p class="font-extrabold text-sm sm:text-base mb-2 text-stone-800 bg-[#e8dcc4]/70 py-4 px-3 sm:px-4 rounded-sm border border-stone-300/50 shadow-sm leading-relaxed">
                      <span class="text-orange-900 mr-2 text-[10px] sm:text-xs tracking-widest border-b border-orange-900/30 pb-0.5 block mb-2 w-fit">リフレムからの問い</span>
                      Q. なぜ、あなたは【${state.primaryCard?.name}】を一番大切な役割として残したのでしょうか？
                    </p>
                    <p class="font-extrabold text-sm sm:text-base mb-2 text-stone-800 bg-[#e8dcc4]/70 py-4 px-3 sm:px-4 rounded-sm border border-stone-300/50 shadow-sm leading-relaxed">
                      <span class="text-orange-900 mr-2 text-[10px] sm:text-xs tracking-widest border-b border-orange-900/30 pb-0.5 block mb-2 w-fit">リフレムからの問い</span>
                      Q. もし「自分らしくない」と感じるカードがあるなら、それでも残した理由は何でしょうか？
                    </p>
                    <p class="font-extrabold text-sm sm:text-base mb-2 text-stone-800 bg-[#e8dcc4]/70 py-4 px-3 sm:px-4 rounded-sm border border-stone-300/50 shadow-sm leading-relaxed">
                      <span class="text-blue-900 mr-2 text-[10px] sm:text-xs tracking-widest border-b border-blue-900/30 pb-0.5 block mb-2 w-fit">ハルカからの問い</span>
                      Q. この5つの役割を持ったあなたは、これからどんな未来へ歩いていきたいですか？
                    </p>
                  </div>

                  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-12 relative z-10 w-full px-2 sm:px-4">
                    <button data-action="capture-save" class="w-full sm:w-auto wood-btn wood-btn-dark rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center tracking-widest text-xs sm:text-sm font-bold py-3 sm:py-4 px-4 sm:px-8">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('Camera', "w-4 h-4 sm:w-5 sm:h-5 mr-2")} 画像を保存する
                      </span>
                    </button>
                    <button data-action="capture-share" class="w-full sm:w-auto wood-btn wood-btn-dark rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center tracking-widest text-xs sm:text-sm font-bold py-3 sm:py-4 px-4 sm:px-8">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('Share2', "w-4 h-4 sm:w-5 sm:h-5 mr-2")} SNS等でシェア
                      </span>
                    </button>
                  </div>

                  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-5 sm:mt-8 relative z-10">
                    <button data-action="result-reset" class="flex items-center text-stone-900 font-bold hover:text-orange-900 font-serif tracking-widest text-xs sm:text-sm transition-colors border-b border-transparent hover:border-orange-900 pb-1 drop-shadow-md">
                      ${getIcon('ChevronLeft', "w-4 h-4 mr-1")} 順位を選び直す
                    </button>
                    <button data-action="go-start" class="flex items-center text-stone-900 font-bold hover:text-orange-900 font-serif tracking-widest text-xs sm:text-sm transition-colors border-b border-transparent hover:border-orange-900 pb-1 drop-shadow-md">
                      再び過去へ戻る
                    </button>
                  </div>
              `;
        }
      }

      // ▼▼ 開発用シーン表示（ページ番号） ▼▼
      html += `
              <div class="mt-12 pb-4 text-center text-[10px] text-stone-500/50 font-mono tracking-widest relative z-10 pointer-events-none">
                Page ${getPageNumber()}
              </div>
            </div> <!-- End of inner content -->
          </div> <!-- End of main-stage -->
      `;

      if (state.gameState === 'PLAYING') {
        let exchangeBtnHTML = '';
        if (isShopTime) {
          exchangeBtnHTML = `
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button data-action="trade-shop" ${!state.selectedHandCard || !state.selectedShopCard || state.isExchanging ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8 ${state.isExchanging ? 'animate-magicAura' : ''}">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('RefreshCw', "w-4 h-4 mr-1.5 sm:mr-3 shrink-0 " + (state.isExchanging ? 'animate-spin' : ''))}
                        ${state.isExchanging ? '入れ替え中...' : (state.selectedHandCard && state.selectedShopCard ? '役割を入れ替える' : '手札と場から1枚ずつ選ぶ')}
                      </span>
                    </button>
                    ${state.round === 6 ? `
                      <button data-action="skip-trade" ${state.isExchanging ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">この5枚のまま進む</span>
                      </button>
                    ` : ''}
                  </div>
          `;
        } else {
          exchangeBtnHTML = `
                  <button data-action="trade-offer" ${!state.selectedHandCard || state.isExchanging ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-10 ${state.isExchanging ? 'animate-magicAura' : ''}">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      ${getIcon('RefreshCw', "w-4 h-4 mr-1.5 sm:mr-3 shrink-0 " + (state.isExchanging ? 'animate-spin' : ''))}
                      ${state.isExchanging ? '入れ替え中...' : (state.selectedHandCard ? '選んだ手札を渡す' : '渡す手札を1枚選んでください')}
                    </span>
                  </button>
          `;
        }

        const dockGuideHTML = isInitialExchange && state.selectedShopCard
          ? '<p class="selection-guide-label selection-guide-label-dock">交換するカードを一つ選ぶ</p>'
          : '';

        /* ▼▼ 変更箇所: ドックの背景色を明るくし、木目を活かす ▼▼ */
        html += `
          <div id="dock-stage" class="fixed bottom-0 left-0 w-full shadow-[0_-10px_50px_rgba(0,0,0,0.6)] border-t-2 border-stone-800 z-50 ${stageFadeClass} ${state.tradeConfirmOpen ? 'opacity-0 pointer-events-none' : ''}" style="background-image: url('https://ninin-cc.github.io/img/rt/mokuzai.jpg'); background-size: cover; background-position: center bottom;">
            <div class="absolute inset-0 bg-[#281405]/30 pointer-events-none z-0"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5a2b] via-orange-900/50 to-[#8b5a2b] z-10"></div>
            
            <div class="max-w-4xl mx-auto pt-2 sm:pt-2 relative flex flex-col z-10">
              ${dockGuideHTML}
              <div class="w-full flex justify-center">
                <div class="flex items-end h-[150px] sm:h-[160px] px-1 sm:px-2 relative">
                  ${dockCardsHTML}
                </div>
              </div>

              <div class="w-full flex justify-center px-4 py-2 sm:py-2 mt-2 sm:mt-2 bg-stone-900/30 border-t border-stone-900/40 backdrop-blur-sm">
                ${exchangeBtnHTML}
              </div>
            </div>
          </div>
        `;
      }

      root.innerHTML = html;
      
      state.isTransitioning = false;
      scheduleRulesAutoAdvance();
    }

    function clearRulesAutoAdvance() {
      if (rulesAutoAdvanceTimer) {
        clearTimeout(rulesAutoAdvanceTimer);
        rulesAutoAdvanceTimer = null;
      }
    }

    function syncRulesExplanationDom() {
      if (state.gameState !== 'RULES') return;

      const visibleCount = getRulesVisibleCount();
      document.querySelectorAll('.rules-guide-block').forEach((block, index) => {
        const isVisible = index < visibleCount;
        block.classList.toggle('is-visible', isVisible);
        if (isVisible) {
          block.removeAttribute('aria-hidden');
        } else {
          block.setAttribute('aria-hidden', 'true');
        }
      });

      const cueText = document.querySelector('[data-rules-cue-text]');
      if (cueText) cueText.textContent = getRulesCueText();
    }

    function setRulesExplanationStep(nextStep) {
      const maxStep = getActiveRulesBlocks().length - 1;
      state.rulesExplanationStep = Math.max(0, Math.min(maxStep, nextStep));
      syncRulesExplanationDom();
      scheduleRulesAutoAdvance();
    }

    function scheduleRulesAutoAdvance() {
      clearRulesAutoAdvance();
      if (state.gameState !== 'RULES' || isRulesExplanationComplete()) return;

      const expectedPhase = state.rulesExplanationPhase;
      const expectedStep = state.rulesExplanationStep;
      rulesAutoAdvanceTimer = setTimeout(() => {
        if (state.gameState !== 'RULES') return;
        if (state.rulesExplanationPhase !== expectedPhase) return;
        if (state.rulesExplanationStep !== expectedStep) return;
        if (isRulesExplanationComplete()) return;
        setRulesExplanationStep(state.rulesExplanationStep + 1);
      }, RULES_AUTO_ADVANCE_MS);
    }

    function openRulesScene() {
      transitionState(() => {
        state.rulesExplanationPhase = 'guide';
        state.rulesExplanationStep = 0;
        state.gameState = 'RULES';
      });
    }

    function advanceRulesExplanation() {
      if (!isRulesExplanationComplete()) {
        setRulesExplanationStep(state.rulesExplanationStep + 1);
        return;
      }

      clearRulesAutoAdvance();
      if (state.rulesExplanationPhase === 'guide') {
        state.rulesExplanationPhase = 'details';
        state.rulesExplanationStep = 0;
        render();
        return;
      }

      transitionState(() => { startGame(); });
    }

    function beginInitialHandJourney() {
      if (state.initialHandCollecting) return;
      state.initialHandCollecting = true;
      render();
      setTimeout(() => {
        transitionState(() => {
          state.initialHandCollecting = false;
          state.selectedHandCard = null;
          state.gameState = 'PLAYING';
        });
      }, 760);
    }

    // --- Event Listeners ---
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;

      if (action === 'go-rules') {
        openRulesScene();
      } else if (action === 'advance-rules') {
        advanceRulesExplanation();
      } else if (action === 'toggle-trisetsu') {
        state.isTrisetsuOpen = !state.isTrisetsuOpen;
        render();
      } else if (action === 'close-trisetsu') {
        state.isTrisetsuOpen = false;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action === 'go-start') {
        transitionState(() => { state.gameState = 'START'; });
      } else if (action === 'start-game') {
        transitionState(() => { startGame(); });
      } else if (action === 'go-playing') {
        if (state.gameState === 'INITIAL_HAND') {
          beginInitialHandJourney();
        } else {
          transitionState(() => { 
            state.selectedHandCard = null; // 遷移時に選択状態をリセット
            state.gameState = 'PLAYING'; 
          });
        }
      } else if (action === 'go-before-tavern') {
        transitionState(() => { state.gameState = 'BEFORE_TAVERN'; });
      } else if (action === 'select-hand') {
        const id = parseInt(btn.dataset.id);
        const card = CARDS_DATA.find(c => c.id === id);
        state.selectedHandCard = (state.selectedHandCard?.id === id) ? null : card;
        render();
      } else if (action === 'select-shop') {
        const id = parseInt(btn.dataset.id);
        const card = CARDS_DATA.find(c => c.id === id);
        state.selectedShopCard = (state.selectedShopCard?.id === id) ? null : card;
        render();
      } else if (action === 'trade-shop') {
        state.tradeConfirmOpen = true;
        render();
      } else if (action === 'confirm-trade') {
        state.tradeConfirmOpen = false;
        if (state.selectedShopCard) {
          if (state.round === 6) {
            state.pendingTradeAction = 'trade';
            transitionState(() => { state.gameState = 'SHOP_CONFIRM'; });
          } else {
            handleShopTrade();
          }
        } else {
          handleTrade();
        }
      } else if (action === 'cancel-trade-confirm') {
        state.tradeConfirmOpen = false;
        render();
      } else if (action === 'trade-offer') {
        state.tradeConfirmOpen = true;
        render();
      } else if (action === 'skip-trade') {
        if (state.round === 6) {
          state.pendingTradeAction = 'skip';
          transitionState(() => { state.gameState = 'SHOP_CONFIRM'; });
        } else {
          transitionState(() => {
            proceedToNextRound(state.hand, state.shop, state.deck);
          });
        }
      } else if (action === 'confirm-journey-yes') {
        if (state.pendingTradeAction === 'trade') {
          transitionState(() => {
            state.hand = state.hand.map(c => c.id === state.selectedHandCard.id ? state.selectedShopCard : c);
            state.isExchanging = false;
            state.selectedHandCard = null;
            state.selectedShopCard = null;
            
            state.farewellMessage = getRandomFarewellMessage();
            state.gameState = 'SHOP_FAREWELL';
          });
        } else if (state.pendingTradeAction === 'skip') {
          transitionState(() => {
            state.selectedHandCard = null;
            state.selectedShopCard = null;
            state.farewellMessage = getRandomFarewellMessage();
            state.gameState = 'SHOP_FAREWELL';
          });
        }
      } else if (action === 'confirm-journey-no') {
        transitionState(() => { state.gameState = 'PLAYING'; });
      } else if (action === 'go-result') {
        transitionState(() => {
          state.resultStep = 'SELECT_1';
          state.gameState = 'RESULT';
        });
      } else if (action === 'select-result') {
        const id = parseInt(btn.dataset.id);
        const card = CARDS_DATA.find(c => c.id === id);
        handleResultCardSelect(card);
      } else if (action === 'confirm-yes') {
        confirmResultCard(true);
      } else if (action === 'confirm-no') {
        confirmResultCard(false);
      } else if (action === 'result-reset') {
        transitionState(() => {
          state.resultStep = 'SELECT_1';
          state.primaryCard = null;
          state.secondaryCard = null;
        });
      } else if (action === 'capture-share') {
        handleShare();
      } else if (action === 'capture-save') {
        handleSave();
      } else if (action === 'close-tutorial') {
        state.showTutorial = false;
        render();
      } else if (action === 'close-iab-modal') {
        state.isAppBrowser = false;
        render();
      }
    });

    // 起動時のIABチェック実行
    checkAppBrowser();

    // Initial render
    render();
