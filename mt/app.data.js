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
      Share2: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
      FileText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>'
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

    const CARDS_BY_ID = new Map(CARDS_DATA.map(card => [card.id, card]));

    const TOTAL_ROUNDS = 6;
    const FINAL_SHOP_ROUND = 6;
    const TRAVELER_OFFER_COUNTS = {
      2: 3,
      3: 2,
      4: 2,
      5: 1
    };
    const REQUESTED_HAND_TRAVELER_ROUND = 5;

    function getTravelerOfferCount(round) {
      return TRAVELER_OFFER_COUNTS[round] || 1;
    }

    function isTwoCardTravelerRound(round) {
      return getTravelerOfferCount(round) > 1;
    }

    function isRequestedHandTravelerRound(round) {
      return round === REQUESTED_HAND_TRAVELER_ROUND;
    }

    function isFinalShopRound(round) {
      return round === FINAL_SHOP_ROUND;
    }
