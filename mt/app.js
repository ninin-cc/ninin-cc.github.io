    // --- 体験調整設定 ---
    // experience.config.js を先に読み込み、細かな待ち時間やセリフをここから上書きできるようにする。
const ROLETRADE_EXPERIENCE = window.ROLETRADE_EXPERIENCE || {};
window.ROLETRADE_ACTIVE_JOURNEY = window.ROLETRADE_ACTIVE_JOURNEY || 'first';
const EXPERIENCE_TIMING = Object.assign({
      stageFadeOutMs: 1200,
      initialCardGatherMs: 1600,
      initialCardReviewAdvanceMs: 420,
      initialCardReviewFinalReturnMs: 1180,
      initialHandJourneyDelayMs: 760,
      resultDecisionHoldMs: 3000,
      resultDecisionCloseMs: 620,
      exchangeSettleMs: 600
    }, ROLETRADE_EXPERIENCE.timing || {});
const EXPERIENCE_COPY = ROLETRADE_EXPERIENCE.copy || {};
const SECOND_JOURNEY_COPY = window.ROLETRADE_SECOND_COPY || {};

function getActiveSecondJourneyConfig() {
  return window.ROLETRADE_SECOND_CONFIG || {};
}

function isSecondJourneyState() {
  return window.ROLETRADE_ACTIVE_JOURNEY === 'second';
}

function isForcedTakeRound(round) {
  return typeof isForcedHandTravelerRound === 'function' && isForcedHandTravelerRound(round);
}

function isSecondDoubleTradeRound(round) {
  const config = getActiveSecondJourneyConfig();
  return window.ROLETRADE_ACTIVE_JOURNEY === 'second' && config.doubleTradeRound === round;
}

function getSecondDoubleTradeCount() {
  const config = getActiveSecondJourneyConfig();
  return config.doubleTradeCount || 2;
}
        const IS_DEV_MODE = new URLSearchParams(window.location.search).get('dev') === '1';
        const DEV_INITIAL_PAGE = IS_DEV_MODE ? new URLSearchParams(window.location.search).get('page') : '';
    function getExperienceCopy(key, fallback) {
      const value = EXPERIENCE_COPY[key];
      return Array.isArray(value) && value.length ? value : fallback;
    }
    function getExperienceText(key, fallback) {
      return typeof EXPERIENCE_COPY[key] === 'string' ? EXPERIENCE_COPY[key] : fallback;
    }

    let renderFrameId = 0;
    function renderSoon() {
      if (renderFrameId) return;
      const requestFrame = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16));
      renderFrameId = requestFrame(() => {
        renderFrameId = 0;
        render();
      });
    }

    // --- データ定義は app.data.js へ分割 ---

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

    function chooseExitHotspotLine(speaker) {
      const lines = speaker === 'haruka' ? EXIT_TO_TAVERN_HARUKA_LINES : EXIT_TO_TAVERN_REFREM_LINES;
      if (!lines.length) return '';
      state.exitHotspotClickCountBySpeaker = Object.assign({ refrem: 0, haruka: 0 }, state.exitHotspotClickCountBySpeaker || {});
      state.exitHotspotUsedIndicesBySpeaker = Object.assign({ refrem: [], haruka: [] }, state.exitHotspotUsedIndicesBySpeaker || {});
      const nextCount = (state.exitHotspotClickCountBySpeaker[speaker] || 0) + 1;
      state.exitHotspotClickCountBySpeaker[speaker] = nextCount;

      if (nextCount > 20) return nextCount % 2 === 1 ? '……。' : (lines[19] || lines[lines.length - 1]);
      if (nextCount === 20) return lines[19] || lines[lines.length - 1];
      if (nextCount === 19) return lines[18] || lines[lines.length - 1];

      const randomPoolSize = Math.min(18, lines.length);
      let used = state.exitHotspotUsedIndicesBySpeaker[speaker] || [];
      if (used.length >= randomPoolSize) used = [];
      const available = Array.from({ length: randomPoolSize }, (_, index) => index).filter(index => !used.includes(index));
      const index = available[randomInt(available.length)];
      state.exitHotspotUsedIndicesBySpeaker[speaker] = used.concat(index);
      return lines[index];
    }

    // --- 旅人・セリフ・背景設定は app.content.js へ分割 ---

    const FINAL_SHOP_GUIDE_INTRO = getExperienceText('finalShopGuideIntro', '<p>よくぞ戻ってきた。</p><div class="h-1.5 sm:h-2"></div><p>大切なのは</p><div class="h-1.5 sm:h-2"></div><p>おぬしが、なぜそれを残し、<br>今の自分に必要だと感じたのか……じゃな。</p>');

    const FINAL_SHOP_GUIDE_DETAIL_1 = getExperienceText('finalShopGuideDetail1', '<p>最後にもう一度だけ、<br>役割を入れ替えることができるぞ。</p><div class="h-1.5 sm:h-2"></div><p>変えても、変えなくてもよい。</p>');

    const FINAL_SHOP_GUIDE_DETAIL_2 = getExperienceText('finalShopGuideDetail2', '<p>大切なのは<br>選んだ理由を、<br>おぬし自身の言葉で<br>受け取ることじゃよ。</p>');

    const PARCHMENT_TEXTURE = "url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOCcgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknIG9wYWNpdHk9JzAuMTUnLz48L3N2Zz4=')";
    
    const CARD_BG_IMG = "https://ninin-cc.github.io/img/rt/card.jpg";

    function escapeWorkshopLicenseHtml(value) {
      return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function normalizeWorkshopLicenseCode(value) {
      return String(value || '')
        .trim()
        .replace(/^[?#]/, '')
        .split('&')[0]
        .split('=')[0]
        .replace(/_/g, '-')
        .toUpperCase();
    }

    function getWorkshopLicenseAlias(value) {
      const code = normalizeWorkshopLicenseCode(value);
      const match = code.match(/(?:[A-Z]+)-?(\d{3,4})|\b(\d{3,4})\b/i);
      return match ? match[1] || match[2] : '';
    }

    function getWorkshopLicenseAliasKey(value) {
      const alias = getWorkshopLicenseAlias(value);
      return alias ? String(Number(alias)) : '';
    }

    function getWorkshopLicenseRequestCode() {
      const params = new URLSearchParams(window.location.search);
      const rawCode = params.get('id') ||
        params.get('code') ||
        params.get('amb') ||
        Array.from(params.keys())[0] ||
        window.location.hash;
      return getWorkshopLicenseAlias(rawCode);
    }

    function getWorkshopLicenseSource(member) {
      return [
        member && member.certification,
        member && member.certificationType,
        member && member.certificationNumber,
        member && member.riesmNumber,
        member && member.riesmRole,
        member && member.id
      ].filter(Boolean).join(' ');
    }

    function getWorkshopLicenseCode(member) {
      const source = getWorkshopLicenseSource(member);
      const match = source.match(/\b([A-Z]+)-?(\d{3,4})\b/i);
      if (!match) return '';
      const prefix = match[1].toUpperCase() === 'R' ? 'AMB' : match[1].toUpperCase();
      return prefix + '-' + match[2];
    }

    function getWorkshopLicenseMember() {
      const requestedCode = getWorkshopLicenseRequestCode();
      if (!requestedCode) return null;
      const members = window.NININ_LINK_DATA || (typeof linkData !== 'undefined' ? linkData : []);
      return members.find((member) => getWorkshopLicenseAliasKey(getWorkshopLicenseCode(member)) === getWorkshopLicenseAliasKey(requestedCode)) || null;
    }

    function getWorkshopLicenseAvatar(member) {
      if (member && member.avatar && member.avatar.src) {
        const src = String(member.avatar.src).replace(/^\.\//, '../');
        return '<img src="' + escapeWorkshopLicenseHtml(src) + '" alt="' + escapeWorkshopLicenseHtml(member.name) + 'のプロフィール画像" class="w-10 h-10 rounded-full object-cover border border-orange-900/20 bg-[#fff8ea]">';
      }
      const text = member && member.avatar && member.avatar.text ? member.avatar.text : String((member && member.name) || '?').slice(0, 1);
      return '<div class="w-10 h-10 rounded-full border border-orange-900/20 bg-[#fff8ea] flex items-center justify-center text-orange-900 font-black text-base">' + escapeWorkshopLicenseHtml(text) + '</div>';
    }

    function getWorkshopLicenseScopeHtml(code) {
      const prefix = String(code || '').split('-')[0].toUpperCase();
      const chip = (text, tone) => '<span class="inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black ' + tone + '">' + text + '</span>';
      if (prefix === 'AMB') {
        return chip('✓無償のみ', 'border-emerald-900/20 bg-emerald-50/90 text-emerald-900') + chip('×有償', 'border-stone-300/70 bg-white/70 text-stone-500');
      }
      if (prefix === 'RWN') {
        return chip('✓有償WS', 'border-orange-900/20 bg-orange-50/90 text-orange-900') + chip('×コックピット', 'border-stone-300/70 bg-white/70 text-stone-500');
      }
      if (prefix === 'RCN' || prefix === 'RCC') {
        return chip('✓有償WS', 'border-sky-900/20 bg-sky-50/90 text-sky-900') + chip('✓有償セッション', 'border-sky-900/20 bg-sky-50/90 text-sky-900');
      }
      return chip('実施範囲確認', 'border-emerald-900/20 bg-emerald-50/90 text-emerald-900');
    }

    function renderWorkshopLicenseCard() {
      const member = getWorkshopLicenseMember();
      if (!member) return '';
      const code = getWorkshopLicenseCode(member);
      const href = '../touroku.html?' + encodeURIComponent(getWorkshopLicenseAlias(code));
      const label = String(member.certification || '🌈RIESM™認定カード').replace(/\s*\/\s*/g, ' / ');
      const shortLabel = label.replace(/\s*\/\s*[A-Z]+-\d{3,4}/i, '');
      return `
                <a href="${href}" target="_blank" rel="noopener noreferrer" class="workshop-license-card block mb-2 sm:mb-3 rounded-md border border-emerald-900/20 bg-[#fff8ea]/90 px-3 py-2 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fffdf4] hover:shadow-md" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="flex items-center gap-3">
                    ${getWorkshopLicenseAvatar(member)}
                    <div class="min-w-0 flex-1">
                      <p class="text-[9px] sm:text-[10px] font-serif font-black tracking-[0.16em] text-emerald-900/70">RoleTRADE™ WORKSHOP LICENSE</p>
                      <p class="mt-0.5 truncate text-xs sm:text-sm font-serif font-black text-stone-900">${escapeWorkshopLicenseHtml(member.name)}</p>
                      <p class="mt-0.5 flex min-w-0 items-center gap-1.5 overflow-hidden text-[10px] sm:text-[11px] font-serif font-bold leading-snug text-emerald-900">
                        <span class="min-w-0 truncate">${escapeWorkshopLicenseHtml(shortLabel)}</span>
                        ${getWorkshopLicenseScopeHtml(code)}
                      </p>
                    </div>
                    <span class="shrink-0 rounded-full border border-emerald-900/20 bg-white/70 px-2 py-1 text-[9px] font-serif font-black text-emerald-900">${escapeWorkshopLicenseHtml(code)}</span>
                  </div>
                </a>`;
    }


    const BG_JUNBI_IMG = "https://ninin-cc.github.io/img/rt/junbi.jpg";
    const BG_TRADE_IMG = "https://ninin-cc.github.io/img/rt/bar.jpg"; 
    const BG_DOOR_IMG = "https://ninin-cc.github.io/img/rt/mon.jpg";
    const BG_FINAL_SHOP_IMG = ROLETRADE_SCENE_IMG;
    const BG_FINAL_SHOP_GUIDE_POSITION = "52% center";
    const BG_FINAL_SHOP_GUIDE_ZOOM = 1;
    const BG_FINAL_SHOP_POSITION = "100% center";
    const BG_FINAL_SHOP_ZOOM = 2.2;
    const BG_TAVERN_ROUTE_IMG = MACHI_SCENE_IMG;
    const BG_TAVERN_ROUTE_POSITION = "20% center";
    const BG_TAVERN_ROUTE_ZOOM = 1.35;
    const BG_TAVERN_RETURN_IMG = MACHI_SCENE_IMG;
    const BG_TAVERN_RETURN_POSITION = "56% center";
    const BG_TAVERN_RETURN_ZOOM = 1.25;
    const BG_FAREWELL_DOOR_IMG = MACHI_SCENE_IMG;
    const BG_FAREWELL_DOOR_POSITION = "66% center";
    const BG_FAREWELL_DOOR_ZOOM = 2;

    const IMAGE_PRELOAD_SOURCES = Array.from(new Set([
      ROLETRADE_SCENE_IMG,
      MACHI_SCENE_IMG,
      HARUKA_AVATAR,
      REFREM_AVATAR,
      BG_START_MENTALIA,
      CARD_BG_IMG,
      BG_JUNBI_IMG,
      BG_TRADE_IMG,
      BG_DOOR_IMG,
      BG_FINAL_SHOP_IMG,
      BG_TAVERN_ROUTE_IMG,
      BG_TAVERN_RETURN_IMG,
      BG_FAREWELL_DOOR_IMG,
      ...TRADE_AVATARS_LIST
    ].filter(Boolean)));

    function preloadSceneImages() {
      const loadImage = (src) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
      };
      const run = () => IMAGE_PRELOAD_SOURCES.forEach(loadImage);
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 1500 });
      } else {
        setTimeout(run, 250);
      }
    }

    const ROLETRADE_PROGRESS_STORAGE_KEY = 'riesm-roletrade-mentalia-progress-v1';
    const ROLETRADE_PROGRESS_VERSION = 1;
    const ROLETRADE_RESULT_HISTORY_STORAGE_KEY = 'riesm-roletrade-mentalia-result-history-v1';
    const ROLETRADE_RESULT_HISTORY_VERSION = 1;

    const EXIT_TO_TAVERN_REFREM_LINES = [
      '気をつけて行ってくるのじゃぞ。',
      'よき出会いを。',
      '焦らず、ゆっくり進むのじゃ。',
      'おぬしの心が選ぶものを、大切にな。',
      'どの道にも、何かしらの意味がある。',
      '迷うことも、旅の一部じゃよ。',
      '答えを急ぐ必要はないのじゃ。',
      '心の声を、よく聞いてみるのじゃぞ。',
      '手放して初めて、見えるものもある。',
      '選んだものだけが、答えとは限らぬぞ。',
      '出会いは、時に自分を映す鏡となる。',
      '何を選ぶかより、何を感じたかじゃ。',
      '旅の終わりには、またここへ戻ってくるがよい。',
      '失うことを、あまり恐れぬことじゃ。',
      'おぬしが大切にしているものは、そう簡単には消えぬ。',
      'ふむ……少し緊張しておるようじゃな。',
      '心配せずとも、おぬしなら大丈夫じゃ。',
      'わしの顔を見ても、答えは書いておらんぞ。',
      '何度つついても、旅は始まらんぞい。',
      'そろそろ出発せぬと、夜になってしまうぞ。'
    ];

    const EXIT_TO_TAVERN_HARUKA_LINES = [
      '楽しんできてね！',
      'いってらっしゃい！',
      'どんな出会いがあるかな？',
      '何を選ぶのか、楽しみだね！',
      'あんまり考えすぎなくても大丈夫だよ。',
      '最初に気になったものを選んでもいいんだよ。',
      '迷ったら、今の気持ちを大切にしてね。',
      'どんな選び方でも、間違いじゃないよ。',
      'ちょっとドキドキしてる？',
      'どうしたの？　何か心配がある？',
      '大丈夫。ちゃんとここで待ってるからね。',
      '旅人たちは、どんなカードを持ってくるんだろう。',
      '思いがけない出会いがあるかもしれないね！',
      '気になるものがあったら、よく見てみてね。',
      '選べないときは、どっちが好きかより、どっちを残したいか考えてみて。',
      '何かを手放すのって、少し寂しいよね。',
      'でも、あとでまた出会えるかもしれないよ。',
      'ふふっ、私のことが気になるの？',
      'もう、くすぐったいよ！',
      'そろそろ行かないと、日が暮れちゃうよ！'
    ];

    const HEADER_HIDDEN_STATES = [
      'START',
      'PLAYING',
      'INITIAL_HAND',
      'RULES',
      'LEAVE_SHOP_1',
      'EXIT_TO_TAVERN',
      'BEFORE_TAVERN',
      'AFTER_TAVERN',
      'SHOP_CONFIRM',
      'SHOP_FAREWELL'
    ];

    // --- State ---
    let state = {
      journeyMode: 'first',
      gameState: 'START',
      round: 1,
      shopRounds: [],
      hand: [],
      shop: [],
      deck: [],
      selectedHandCard: null,
      selectedShopCard: null,
      selectedHandCards: [],
      selectedShopCards: [],
      tradeOfferCard: null,
      tradeOfferCards: [],
      requestedHandCard: null,
      tradeAvatarImg: '', 
      tradeMessage: '', 
      tradeVoice: '',
      tradeTone: '',
      usedTradeAvatarImgs: [], 
      usedTradeMessages: [], 
      initialHandCardIds: [],
      initialShopCardIds: [],
      acquiredCardIds: [],
      releasedCardIds: [],
      travelerReleasedCardIds: [],
      isExchanging: false,
      isEntering: false,
      initialHandCollecting: false,
      initialHandAnimated: false,
      initialHandReviewIndex: -1,
      initialHandReviewArmed: false,
      initialHandReviewGathering: false,
      initialHandReviewReturning: false,
      initialHandReviewComplete: false,
      initialHandPostReviewStep: 0,
      isTransitioning: false,
      showTutorial: true,
      tradeConfirmOpen: false,
      requestedTradeConfirmOpen: false,
      requestedRefuseConfirmOpen: false,
      secondPassConfirmOpen: false,
      secondPassUsed: false,
      forcedTakePhase: '',
      forcedReplacementCandidates: [],
      forcedTakenCard: null,
      resultStep: 'SELECT_1',
      resultRecordId: null,
      historyRecordView: null,
      primaryCard: null,
      secondaryCard: null,
      confirmingCard: null,
      zoomedCard: null,
      isConfirmModalClosing: false,
      isResultConfirmSettling: false,
      waitingAfterTrade: false,
      pendingAfterTrade: null,
      afterTradeMessage: '',
      shareMessage: '',
      reflectionAnswers: { primary: '', dissonance: '', future: '' },
      isAppBrowser: false,
      pendingTradeAction: null,
      farewellMessage: '',
      isTrisetsuOpen: false,
      rulesExplanationPhase: 'guide',
      rulesExplanationStep: 0,
      rulesGuideScene: 0,
      initialHandDialogueStep: 0,
      leaveShopDialogueStep: 0,
      beforeTavernDialogueStep: 0,
      exitToTavernAnimating: false,
      exitDepartureCueVisible: false,
      exitHotspotSpeaker: '',
      exitHotspotMessage: '',
      exitHotspotClickCountBySpeaker: { refrem: 0, haruka: 0 },
      exitHotspotUsedIndicesBySpeaker: { refrem: [], haruka: [] },
      exitHotspotLastIndexBySpeaker: { refrem: -1, haruka: -1 },
      startResetConfirmOpen: false,
      finalShopGuideStep: 0,
      shopConfirmDialogueStep: 0
    };

    // ▼▼ 各シーンのページラベルを算出する関数 ▼▼
    function getPageLabel() {
      if (state.gameState === 'START') return '1';
      if (state.gameState === 'HISTORY') return '記録';
      if (state.gameState === 'HISTORY_RESULT') return '記録-結果';
      if (state.gameState === 'RULES') {
        if (state.rulesExplanationPhase === 'details') return '2-4';
        return '2-' + ((state.rulesGuideScene || 0) + 1);
      }
      if (state.gameState === 'INITIAL_HAND') {
        if (state.initialHandReviewComplete) return '3-3';
        if (
          state.initialHandReviewArmed ||
          state.initialHandReviewGathering ||
          state.initialHandReviewReturning ||
          state.initialHandReviewIndex >= 0
        ) return '3-2';
        return '3-1';
      }
      if (state.gameState === 'PLAYING') {
        if (state.round === 1) return '4';
        if (isFinalShopRound(state.round)) {
          return (state.finalShopGuideStep || 0) < 3 ? '12-1' : '12-2';
        }
        if (state.round >= 2 && state.round < getFinalShopRound()) return String(5 + state.round); // R2=7 ... R5=10
      }
      if (state.gameState === 'LEAVE_SHOP_1') return '5';
      if (state.gameState === 'EXIT_TO_TAVERN') return '5-2';
      if (state.gameState === 'BEFORE_TAVERN') return '6';
      if (state.gameState === 'AFTER_TAVERN') return '11';
      if (state.gameState === 'SHOP_CONFIRM') return '13';
      if (state.gameState === 'SHOP_FAREWELL') return '14';
      if (state.gameState === 'RESULT') {
        if (state.resultStep === 'SELECT_1') return '15';
        if (state.resultStep === 'SELECT_2') return '16';
        if (state.resultStep === 'FINAL') return '17';
      }
      return '0';
    }

    function getPageNumber() {
      return getPageLabel();
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

    let transitionTimer = null;
    let exitToTavernTimer = null;
    let exitDepartureTimer = null;

    function clearExitDepartureTimer() {
      if (exitDepartureTimer) {
        clearTimeout(exitDepartureTimer);
        exitDepartureTimer = null;
      }
    }

    function clearExitToTavernTimer() {
      if (exitToTavernTimer) {
        clearTimeout(exitToTavernTimer);
        exitToTavernTimer = null;
      }
    }

    function scheduleExitToTavernAdvance() {
      clearExitToTavernTimer();
      exitToTavernTimer = setTimeout(() => {
        exitToTavernTimer = null;
        if (state.gameState !== 'EXIT_TO_TAVERN' || !state.exitToTavernAnimating) return;
        transitionState(() => {
          state.beforeTavernDialogueStep = 0;
          state.gameState = 'BEFORE_TAVERN';
        });
      }, 7200);
    }

    function transitionState(callback) {
      if (transitionTimer) return;
      if (renderFrameId) {
        const cancelFrame = window.cancelAnimationFrame || clearTimeout;
        cancelFrame(renderFrameId);
        renderFrameId = 0;
      }

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
      
      transitionTimer = setTimeout(() => {
        transitionTimer = null;
        state.isTransitioning = true;
        callback();
        window.scrollTo(0, 0);
        render();
      }, EXPERIENCE_TIMING.stageFadeOutMs);
    }

    function canUseProgressStorage() {
      try {
        const storage = window.localStorage;
        const testKey = ROLETRADE_PROGRESS_STORAGE_KEY + ':test';
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    }

    function readSavedJourneyProgress() {
      if (!canUseProgressStorage()) return null;
      try {
        const raw = window.localStorage.getItem(ROLETRADE_PROGRESS_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== ROLETRADE_PROGRESS_VERSION || !parsed.state) return null;
        return parsed;
      } catch (error) {
        return null;
      }
    }

    function hasSavedJourneyProgress() {
      return !!readSavedJourneyProgress();
    }

    function clearSavedJourneyProgress() {
      if (!canUseProgressStorage()) return;
      try {
        window.localStorage.removeItem(ROLETRADE_PROGRESS_STORAGE_KEY);
      } catch (error) {}
    }

    function sanitizeJourneyProgressState() {
      const snapshot = JSON.parse(JSON.stringify(state));
      Object.assign(snapshot, {
        isTransitioning: false,
        isExchanging: false,
        isEntering: false,
        initialHandCollecting: false,
        initialHandReviewGathering: false,
        initialHandReviewReturning: false,
        exitToTavernAnimating: false,
        exitDepartureCueVisible: false,
        tradeConfirmOpen: false,
        requestedTradeConfirmOpen: false,
        requestedRefuseConfirmOpen: false,
        secondPassConfirmOpen: false,
        startResetConfirmOpen: false,
        confirmingCard: null,
        zoomedCard: null,
        isConfirmModalClosing: false,
        isResultConfirmSettling: false,
        isAppBrowser: false,
        shareMessage: ''
      });
      return snapshot;
    }

    function saveJourneyProgress() {
      if (IS_DEV_MODE || ['START', 'HISTORY', 'HISTORY_RESULT'].includes(state.gameState) || state.startResetConfirmOpen) return;
      if (!canUseProgressStorage()) return;
      try {
        window.localStorage.setItem(ROLETRADE_PROGRESS_STORAGE_KEY, JSON.stringify({
          version: ROLETRADE_PROGRESS_VERSION,
          savedAt: Date.now(),
          pageLabel: getPageLabel(),
          state: sanitizeJourneyProgressState()
        }));
      } catch (error) {}
    }

    function reviveCardValue(value) {
      if (Array.isArray(value)) return value.map(reviveCardValue);
      if (value && typeof value === 'object') {
        if (Object.prototype.hasOwnProperty.call(value, 'id')) {
          const card = CARDS_BY_ID.get(Number(value.id));
          if (card && Object.prototype.hasOwnProperty.call(value, 'name')) return card;
        }
        const revived = {};
        Object.entries(value).forEach(([key, item]) => {
          revived[key] = reviveCardValue(item);
        });
        return revived;
      }
      return value;
    }

    function restoreJourneyProgress() {
      const saved = readSavedJourneyProgress();
      if (!saved) return false;
      clearResultDecisionTimers();
      clearExitToTavernTimer();
      clearSceneDialogueAutoAdvance();
      if (typeof clearRulesAutoAdvance === 'function') clearRulesAutoAdvance();
      const restored = reviveCardValue(saved.state);
      Object.assign(state, restored, {
        isTransitioning: false,
        isExchanging: false,
        isEntering: false,
        initialHandCollecting: false,
        initialHandReviewGathering: false,
        initialHandReviewReturning: false,
        exitToTavernAnimating: false,
        exitDepartureCueVisible: false,
        tradeConfirmOpen: false,
        requestedTradeConfirmOpen: false,
        requestedRefuseConfirmOpen: false,
        secondPassConfirmOpen: false,
        startResetConfirmOpen: false,
        confirmingCard: null,
        zoomedCard: null,
        isConfirmModalClosing: false,
        isResultConfirmSettling: false,
        isAppBrowser: false,
        shareMessage: ''
      });
      window.ROLETRADE_ACTIVE_JOURNEY = state.journeyMode || 'first';
      render();
      window.scrollTo(0, 0);
      return true;
    }


    function readResultHistoryRecords() {
      if (!canUseProgressStorage()) return [];
      try {
        const raw = window.localStorage.getItem(ROLETRADE_RESULT_HISTORY_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== ROLETRADE_RESULT_HISTORY_VERSION || !Array.isArray(parsed.records)) return [];
        return parsed.records
          .filter(record => record && record.id && Array.isArray(record.handIds))
          .sort((a, b) => Number(b.completedAt || 0) - Number(a.completedAt || 0));
      } catch (error) {
        return [];
      }
    }

    function writeResultHistoryRecords(records) {
      if (!canUseProgressStorage()) return;
      try {
        window.localStorage.setItem(ROLETRADE_RESULT_HISTORY_STORAGE_KEY, JSON.stringify({
          version: ROLETRADE_RESULT_HISTORY_VERSION,
          updatedAt: Date.now(),
          records: records.sort((a, b) => Number(b.completedAt || 0) - Number(a.completedAt || 0))
        }));
      } catch (error) {}
    }

    function createResultRecordId() {
      return 'result-' + Date.now().toString(36) + '-' + Math.floor(randomFloat() * 0x100000).toString(36);
    }

    function getHistoryCard(id) {
      return CARDS_BY_ID.get(Number(id)) || null;
    }

    function buildResultHistoryRecord() {
      if (state.gameState !== 'RESULT' || state.resultStep !== 'FINAL') return null;
      if (!Array.isArray(state.hand) || state.hand.length !== 5 || !state.primaryCard || !state.secondaryCard) return null;
      if (!state.resultRecordId) state.resultRecordId = createResultRecordId();
      return {
        id: state.resultRecordId,
        completedAt: Date.now(),
        journeyMode: state.journeyMode || 'first',
        handIds: state.hand.map(card => card.id),
        roles: state.hand.map(card => ({
          id: card.id,
          name: card.name,
          desc: card.desc,
          mode: card.mode
        })),
        primaryId: state.primaryCard.id,
        secondaryId: state.secondaryCard.id,
        reflectionAnswers: Object.assign({ primary: '', dissonance: '', future: '' }, state.reflectionAnswers || {})
      };
    }

    function saveResultHistoryRecord() {
      const record = buildResultHistoryRecord();
      if (!record || !canUseProgressStorage()) return null;
      const records = readResultHistoryRecords();
      const index = records.findIndex(item => item.id === record.id);
      if (index >= 0) records[index] = Object.assign({}, records[index], record);
      else records.unshift(record);
      writeResultHistoryRecords(records);
      return record;
    }

    function getResultHistoryRecord(id) {
      return readResultHistoryRecords().find(record => record.id === id) || null;
    }

    function formatResultHistoryDate(timestamp) {
      if (!timestamp) return '日時不明';
      try {
        return new Intl.DateTimeFormat('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(timestamp));
      } catch (error) {
        return new Date(timestamp).toLocaleString();
      }
    }

    function getResultHistoryQuestionData(record) {
      const primary = getHistoryCard(record.primaryId);
      const primaryName = primary?.name || record.roles?.find(role => role.id === record.primaryId)?.name || '';
      return [
        {
          key: 'primary',
          speaker: 'リフレムからの問い',
          question: 'Q. なぜ、お主は【' + primaryName + '】を一番大切な役割として残したのじゃ？'
        },
        {
          key: 'dissonance',
          speaker: 'リフレムからの問い',
          question: 'Q. そこに「自分らしくない」と感じるカードがあるなら、それでも残した理由はなんじゃろうな…？'
        },
        {
          key: 'future',
          speaker: 'ハルカからの問い',
          question: 'Q. この5つの役割を持ったあなたは、これからどんな未来へ歩いていきたいですか？'
        }
      ];
    }

    function beginFreshJourney() {
      clearSavedJourneyProgress();
      clearResultDecisionTimers();
      clearExitToTavernTimer();
      state.startResetConfirmOpen = false;
      state.journeyMode = 'first';
      window.ROLETRADE_ACTIVE_JOURNEY = 'first';
      openRulesScene();
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

    function startGame(options = {}) {
      const journeyMode = options.journeyMode || 'first';
      state.journeyMode = journeyMode;
      window.ROLETRADE_ACTIVE_JOURNEY = journeyMode;
      const allShuffled = shuffleArray([...CARDS_DATA]);
      state.hand = allShuffled.slice(0, 5);
      
      const shopCards = allShuffled.slice(5, 11);
      const remaining = allShuffled.slice(11);
      
      state.shop = shopCards;
      state.deck = remaining;
      state.initialHandCardIds = state.hand.map(card => card.id);
      state.initialShopCardIds = shopCards.map(card => card.id);
      state.acquiredCardIds = [];
      state.releasedCardIds = [];
      state.travelerReleasedCardIds = [];
      
      state.shopRounds = [1, getFinalShopRound()];
      state.round = 1;
      state.showTutorial = true; 
      state.tradeConfirmOpen = false;
      state.requestedTradeConfirmOpen = false;
      state.requestedRefuseConfirmOpen = false;
      state.secondPassUsed = false;
      state.forcedTakePhase = '';
      state.forcedReplacementCandidates = [];
      state.forcedTakenCard = null;
      state.resultStep = 'SELECT_1';
      state.primaryCard = null;
      state.secondaryCard = null;
      state.confirmingCard = null;
      state.zoomedCard = null;
      clearResultDecisionTimers();
      state.isConfirmModalClosing = false;
      state.tradeOfferCard = null;
      state.tradeOfferCards = [];
      state.requestedHandCard = null;
      state.selectedHandCard = null;
      state.selectedShopCard = null;
      state.selectedHandCards = [];
      state.selectedShopCards = [];
      state.tradeAvatarImg = ''; 
      state.tradeMessage = ''; 
      state.tradeVoice = '';
      state.tradeTone = '';
      state.usedTradeAvatarImgs = []; 
      state.usedTradeMessages = []; 
      state.isTrisetsuOpen = false;
      state.rulesExplanationPhase = 'guide';
      state.rulesExplanationStep = 0;
      state.rulesGuideScene = 0;
      state.initialHandDialogueStep = 0;
      state.initialHandReviewIndex = -1;
      state.initialHandReviewArmed = false;
      state.initialHandReviewGathering = false;
      state.initialHandReviewReturning = false;
      state.initialHandReviewComplete = false;
      state.initialHandPostReviewStep = 0;
      state.leaveShopDialogueStep = 0;
      state.beforeTavernDialogueStep = 0;
      state.finalShopGuideStep = 0;
      state.shopConfirmDialogueStep = 0;
      state.initialHandCollecting = false;
      state.initialHandAnimated = false;
      state.startResetConfirmOpen = false;
      state.resultRecordId = null;
      state.historyRecordView = null;
      
      state.gameState = 'INITIAL_HAND';
      state.shareMessage = '';
      state.reflectionAnswers = { primary: '', dissonance: '', future: '' };
      state.waitingAfterTrade = false;
      state.pendingAfterTrade = null;
      state.afterTradeMessage = '';
      state.isResultConfirmSettling = false;
    }



    // Tavern trade flow is split into app.flow.trade.js.

    // Result confirmation flow is split into app.flow.result.js.

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

    function getResultQuestionData() {
      return [
        {
          key: 'primary',
          speaker: 'リフレムからの問い',
          question: 'Q. なぜ、お主は【' + (state.primaryCard?.name || '') + '】を一番大切な役割として選んだのじゃ？'
        },
        {
          key: 'dissonance',
          speaker: 'リフレムからの問い',
          question: 'Q. そこに「自分らしくない」と感じるカードがあるなら、それでも残した理由はなんじゃろうな…？'
        },
        {
          key: 'future',
          speaker: 'ハルカからの問い',
          question: 'Q. この5つの役割を持ったあなたは、これからどんな未来へ歩いていきたいですか？'
        }
      ];
    }

    function escapeHTML(value) {
      return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char]));
    }

    function formatMultiline(value) {
      const text = escapeHTML(value || '').trim();
      return text ? text.replace(/\n/g, '<br>') : '<span class="muted">未記入</span>';
    }

    function renderReflectionTextarea(key) {
      return '<textarea data-reflection-key="' + key + '" class="mt-3 w-full min-h-[86px] sm:min-h-[96px] bg-[#fffaf0]/90 border border-stone-400/70 rounded-sm p-3 text-sm sm:text-base leading-relaxed font-serif font-bold text-stone-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-800 resize-y" placeholder="ここに記入してください">' + escapeHTML(state.reflectionAnswers?.[key] || '') + '</textarea>';
    }

    function buildRolePdfReportHTML() {
      const selectedRoles = state.hand.map((card, index) => {
        const rank = card.id === state.primaryCard?.id ? '一番大切' : (card.id === state.secondaryCard?.id ? '二番目' : '選んだRole');
        return '<div class="role-row"><div class="role-name"><span>' + (index + 1) + '</span>' + escapeHTML(card.name) + '</div><div class="role-desc">' + escapeHTML(card.desc) + '</div><div class="role-rank">' + rank + '</div></div>';
      }).join('');
      const answers = getResultQuestionData().map(item => {
        return '<section class="question"><p class="speaker">' + escapeHTML(item.speaker) + '</p><p class="q">' + escapeHTML(item.question) + '</p><div class="answer">' + formatMultiline(state.reflectionAnswers?.[item.key] || '') + '</div></section>';
      }).join('');
      return `
        <div class="pdf-report">
          <style>
            .pdf-report { width: 794px; min-height: 1123px; box-sizing: border-box; padding: 34px 42px; background: #f0e6d2; color: #2f2418; font-family: "Yu Mincho", "Hiragino Mincho ProN", serif; }
            .pdf-report h1 { margin: 0; text-align: center; font-size: 28px; letter-spacing: 0.12em; }
            .pdf-report .subtitle { margin: 8px 0 20px; text-align: center; font-size: 13px; font-weight: 700; color: #6b3f1d; }
            .pdf-report .section-title { margin: 18px 0 8px; font-size: 15px; font-weight: 900; letter-spacing: 0.08em; border-bottom: 2px solid rgba(120, 53, 15, 0.45); padding-bottom: 5px; }
            .pdf-report .roles { display: grid; gap: 7px; }
            .pdf-report .role-row { display: grid; grid-template-columns: 132px 1fr 82px; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid rgba(120, 53, 15, 0.32); background: rgba(255, 250, 240, 0.72); border-radius: 4px; }
            .pdf-report .role-name { font-size: 18px; font-weight: 900; }
            .pdf-report .role-name span { display: inline-block; width: 20px; height: 20px; margin-right: 7px; border-radius: 50%; background: #7c2d12; color: #fff7ed; text-align: center; line-height: 20px; font-size: 12px; }
            .pdf-report .role-desc { font-size: 13px; font-weight: 700; line-height: 1.55; }
            .pdf-report .role-rank { text-align: center; color: #7c2d12; font-size: 12px; font-weight: 900; }
            .pdf-report .question { margin-top: 10px; padding: 10px 12px; border: 1px solid rgba(120, 53, 15, 0.35); background: rgba(255, 250, 240, 0.78); border-radius: 4px; }
            .pdf-report .speaker { margin: 0 0 5px; font-size: 12px; font-weight: 900; color: #7c2d12; letter-spacing: 0.08em; }
            .pdf-report .q { margin: 0 0 7px; font-size: 14px; line-height: 1.5; font-weight: 900; }
            .pdf-report .answer { min-height: 74px; padding: 9px 11px; background: rgba(255,255,255,0.64); border: 1px dashed rgba(87, 64, 43, 0.45); font-size: 13px; line-height: 1.55; font-weight: 700; white-space: normal; }
            .pdf-report .muted { color: #9a7b5f; }
            .pdf-report .footer { margin-top: 14px; text-align: center; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: #6b5a46; }
          </style>
          <h1>RoleTRADE™ Mentalia</h1>
          <p class="subtitle">これがあなたが18歳の自分に持たせる「5つの役割」です。</p>
          <div class="section-title">選んだRole</div>
          <div class="roles">${selectedRoles}</div>
          <div class="section-title">リフレムとハルカからの問い</div>
          ${answers}
          <div class="footer">RIESM™ RoleTRADE™ / © 2026 ninin consulting＆counseling</div>
        </div>
      `;
    }

    async function handleSaveRolePdf() {
      state.shareMessage = "PDFを生成中...";
      render();
      try {
        if (!window.html2canvas || !window.jspdf?.jsPDF) {
          throw new Error("PDF library is not ready");
        }
        const report = document.createElement('div');
        report.style.position = 'fixed';
        report.style.left = '-9999px';
        report.style.top = '0';
        report.innerHTML = buildRolePdfReportHTML();
        document.body.appendChild(report);
        const target = report.querySelector('.pdf-report');
        const canvas = await window.html2canvas(target, { backgroundColor: '#f0e6d2', scale: 2, useCORS: true });
        document.body.removeChild(report);
        const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, 210, 297);
        pdf.save('RIESM_RoleTrade_SelectedRoles.pdf');
        state.shareMessage = "PDFを保存しました！";
      } catch (error) {
        state.shareMessage = "PDFの保存に失敗しました。";
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

    // --- 共通描画コンポーネントは app.render.js へ分割 ---

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

    let rulesAutoAdvanceTimer = null;
    let rulesIntroRevealTimer = null;

    const RULES_GUIDE_BLOCKS = getExperienceCopy('rulesGuideBlocks', [
      '<p>ようこそ、旅人よ。</p>',
      '<p>この世界では、</p><p>人はひとつの役割【Role】だけで</p><p>生きているわけではない…。</p>',
      '<p>ほれ、<br>お主も身に覚えがあるじゃろう？</p>',
      '<p>そう、人は、場面のひとつひとつで</p><p>様々な役割を使っておるのじゃ。</p>',
      '<p>誰かを守る役割。</p><p>新しい道をひらく役割。</p><p>静かに観察する役割。</p><p>場をあたためる役割</p><p>まさに、無数の役割じゃ…。</p>',
      '<p>おぬしは、これから</p><p>5つのカードを得る。</p>',
      '<p>それは、おぬしの性格を</p><p>決めるものではない。</p>',
      '<p>これからの人生で、</p><p>どんな力を使っていきたいのかを</p><p>見つめるためのカードなのじゃよ。</p>'
    ]);

    const RULES_OPENING_SCREEN = getExperienceCopy('rulesOpeningScreen', [
      '<div class="roletrade-opening-statement"><p>人は役割を通じて世界と接し、</p><p>その役割の引き受け方を変えることで、</p><p>世界との関わり方を変えることができる。</p></div>',
      '<div class="roletrade-opening-top-copy"><p class="roletrade-opening-top-lead">ここはメンテーリア。<br/>役割と物語が、人の未来を少しだけ変える世界。</p><p>あなたは今、これまでの記憶と経験を持ったまま、<br/>もう一度、<span class="roletrade-opening-top-emphasis">18歳の自分</span>として旅立とうとしています。</p><p>けれど、<span class="roletrade-opening-top-emphasis">持っていける役割は5つだけ</span>。<br/>あなたは、どんな役割を未来の自分に託しますか？</p></div>'
    ]);

    const RULES_GUIDE_SCREENS = getExperienceCopy('rulesGuideScreens', [
      RULES_OPENING_SCREEN,
      RULES_GUIDE_BLOCKS.slice(0, 5),
      RULES_GUIDE_BLOCKS.slice(5)
    ]);

    const RULES_DETAIL_BLOCKS = getExperienceCopy('rulesDetailBlocks', [
      '<p>わたしからは<br>ルールの説明をしますね。</p>',
      '<p>①持っていける役割カードは<br>　5枚だけです。</p>',
      '<p>②最初に私が<br>　カードをお渡しします。</p>',
      '<p>③その後はここから出て<br>　旅の酒場で、ほかの旅人たちと<br>　役割カードを交換…。</p>',
      '<p>④最後は<br>　この部屋に戻ってきてくださいね。</p>',
      '<p>これは、自分を見つめる<br>時間なんです。</p>'
    ]);

    const SECOND_RULES_DETAIL_BLOCKS = [
      '<p>わたしからは<br>二周目のルールを説明しますね。</p>',
      '<p>①持っていける役割カードは<br>　5枚だけです。</p>',
      '<p>②最初に私が<br>　カードをお渡しします。</p>',
      '<p>③その後はここから出て<br>　旅の酒場で、ほかの旅人たちと<br>　役割カードを交換…。</p>',
      '<p>④この旅では一度だけ、<br>　出会いを見送ることができます。</p>',
      '<p>でも、どうしても避けられない<br>出会いもあります。</p>',
      '<p>最後は<br>　この部屋に戻ってきてくださいね。</p>',
      '<p>これは、自分を見つめる<br>時間なんです。</p>'
    ];

    const INITIAL_HAND_DIALOGUE_BLOCKS = getExperienceCopy('initialHandDialogueBlocks', [
      '<p>これが、今のあなたに</p><p>最初に渡される</p><p>5つの役割です。</p>',
      '<p>まずは、</p><p>ひとつひとつのカードを</p><p>読んでみてくださいね。</p>'
    ]);

    const INITIAL_HAND_POST_REVIEW_BLOCKS = getExperienceCopy('initialHandPostReviewBlocks', [
      '<p>５枚の役割カードをみて</p><p>どんな気持ちになりましたか？</p>',
      '<p>今のその気持ち</p><p>大事にしてくださいね。</p>',
      '<p>じゃあ、わたしと、最初の…</p><p>RoleTRADE（役割カードの交換）</p><p>をしましょうか</p>'
    ]);

    const LEAVE_SHOP_DIALOGUE_BLOCKS = getExperienceCopy('leaveShopDialogueBlocks', [
      '<p>すてきな役割を</p><p>選びましたね！</p>',
      '<p>この先にある酒場の</p><p>『RIESM亭』には、</p><p>あなたと同じような旅人たちが</p><p>集まってるんですよ。</p>',
      '<p>いろんな役割のカードを</p><p>持った人たちに</p><p>出会えるといいですね</p>',
      '<p>準備はいい？</p>',
      '<p>あ！そうだ！</p><p>大事なことを言い忘れてた！</p><div class="h-1.5 sm:h-2"></div><p>酒場では「必ず」</p><p>カードを交換しなくちゃいけないの。</p><p>これは忘れないでね。</p>',
      '<p>じゃあ、</p><p>楽しんできてね！</p>'
    ]);

    const BEFORE_TAVERN_DIALOGUE_BLOCKS = getExperienceCopy('beforeTavernDialogueBlocks', [
      '<p>あなたは手元の役割カードを大事にしまうと、</p><p>石畳の道へ一歩踏み出した。</p><div class="h-1.5 sm:h-2"></div><p>半刻ばかり歩くと大通りの端に、</p><p>「RIESM亭」という酒場が見えてきた。</p><p>さっき聞いた通りの店構えだ。</p>',
      '<p>扉の向こうから、笑い声とグラスの音が聞こえてくる。</p><div class="h-1.5 sm:h-2"></div><p>さあ、他の旅人たちと出会う時間だ。</p>'
    ]);

    const SHOP_CONFIRM_DIALOGUE_BLOCKS = getExperienceCopy('shopConfirmDialogueBlocks', [
      '<p>本当に、この5つの役割とともに</p><p>旅立つのじゃな？</p>',
      '<p>よいか。ここに“正解”などないのじゃ。</p>',
      '<p>今この瞬間のおぬしが、</p><p>未来の自分に託したいと感じた役割……</p>',
      '<p>ならば、その選択を</p>',
      '<p>ただ、静かに受け取ればよいのじゃ。</p>'
    ]);

    function renderProgressiveDialogueBlocks(blocks, step) {
      const visibleCount = Math.min(blocks.length, step + 1);
      return blocks.map((block, index) => {
        const isVisible = index < visibleCount;
        return '<div class="rules-guide-block ' + (isVisible ? 'is-visible' : '') + '"' + (isVisible ? '' : ' aria-hidden="true"') + '>' + block + '</div>';
      }).join('');
    }

    function getCurrentRulesGuideBlocks() {
      const screens = Array.isArray(RULES_GUIDE_SCREENS[0]) ? RULES_GUIDE_SCREENS : [RULES_GUIDE_BLOCKS];
      const index = Math.min(state.rulesGuideScene || 0, screens.length - 1);
      return screens[index] || [];
    }

    function hasNextRulesGuideScene() {
      const screens = Array.isArray(RULES_GUIDE_SCREENS[0]) ? RULES_GUIDE_SCREENS : [RULES_GUIDE_BLOCKS];
      return state.rulesExplanationPhase === 'guide' && (state.rulesGuideScene || 0) < screens.length - 1;
    }

    function getActiveRulesBlocks() {
      return state.rulesExplanationPhase === 'details'
        ? (state.journeyMode === 'second' ? SECOND_RULES_DETAIL_BLOCKS : RULES_DETAIL_BLOCKS)
        : getCurrentRulesGuideBlocks();
    }

    function isRulesOpeningStatement() {
      return state.rulesExplanationPhase === 'guide' && getCurrentRulesGuideBlocks().some(block => block.includes('roletrade-opening-statement'));
    }

    function getRulesVisibleCount() {
      return Math.min(getActiveRulesBlocks().length, state.rulesExplanationStep + 1);
    }

    function isRulesExplanationComplete() {
      return getRulesVisibleCount() >= getActiveRulesBlocks().length;
    }

    function getRulesCueText() {
      return '';
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
      const isSceneComplete = isRulesExplanationComplete();
      const isFinalRulesCue = state.rulesExplanationPhase === 'details' && isSceneComplete;
      const cueMarkup = isSceneComplete
        ? (isFinalRulesCue ? '<span class="rules-next-text">次に進む</span><span class="rules-next-play">▶</span>' : '<span class="rules-next-play">▶</span>')
        : '<span class="rules-next-arrow">▼</span>';
      return `
                    <p class="rules-next-cue ${isSceneComplete ? 'rules-next-cue-final' : ''}" aria-label="${isSceneComplete ? '次へ進む' : '次の言葉へ進む'}">
                      ${cueMarkup}
                    </p>
      `;
    }

    function renderRulesExplanationCard() {
      const isHarukaRules = state.rulesExplanationPhase === 'details';
      const isOpeningStatement = isRulesOpeningStatement();
      if (isOpeningStatement) {
        return `
                <button type="button" data-action="advance-rules" data-rules-phase="${state.rulesExplanationPhase}" aria-label="説明を次へ進める" class="relative block w-full text-center text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-8 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent h-[455px] sm:h-[594px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0e6d2] transition-colors duration-300" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="absolute inset-0 bg-gradient-to-br from-[#f4ebd8]/75 via-[#e8dcc4]/68 to-[#d8c6a5]/65 z-0 pointer-events-none"></div>
                  <div class="relative z-20 p-5 sm:p-10 h-full flex flex-col items-center justify-center text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    <div class="rules-opening-statement-wrap space-y-4 sm:space-y-5">
                      ${renderRulesExplanationText()}
                    </div>
                    ${renderRulesNextCue()}
                  </div>
                </button>
        `;
      }
      return `
                <button type="button" data-action="advance-rules" data-rules-phase="${state.rulesExplanationPhase}" aria-label="説明を次へ進める" class="relative block w-full text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-8 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent h-[455px] sm:h-[594px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0e6d2] transition-colors duration-300" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="absolute ${isHarukaRules ? 'right-0' : 'left-0'} top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to ${isHarukaRules ? 'left' : 'right'}, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to ${isHarukaRules ? 'left' : 'right'}, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${isHarukaRules ? HARUKA_AVATAR : REFREM_AVATAR}" alt="${isHarukaRules ? 'ハルカ' : 'リフレム'}" class="w-full h-full object-cover" style="object-position: ${isHarukaRules ? HARUKA_CROP_POSITION : REFREM_CROP_POSITION}; transform: ${isHarukaRules ? 'scale(' + HARUKA_SCENE_ZOOM + ')' : 'none'}; transform-origin: ${isHarukaRules ? HARUKA_SCENE_ORIGIN : 'center'};" />
                  </div>
                  <div class="absolute inset-0 ${isHarukaRules ? 'dialog-wash-translucent' : 'dialog-wash-translucent-rules-left'} z-10 pointer-events-none"></div>
                  <div class="character-dialogue-body ${isHarukaRules ? 'character-dialogue-body-haruka' : 'character-dialogue-body-refrem'} relative z-20 p-4 sm:p-8 h-full flex flex-col justify-center text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
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
                <div class="rules-back-link-wrap relative z-10">
                  <button data-action="go-start" class="rules-back-link">
                    タイトルに戻る
                  </button>
                </div>
      `;
    }

    function renderRulesScene() {
      return `
              <div class="max-w-2xl mx-auto">
                <div class="bg-[#f0e6d2]/90 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 text-center shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="absolute inset-0 z-0 pointer-events-none">
                    <img src="${ROLETRADE_SCENE_IMG}" alt="リフレムとハルカのいる部屋" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 52% center;" />
                  </div>
                  ${renderRulesExplanationCard()}
                </div>
                ${renderRulesActions()}
              </div>
      `;
    }

    const DEV_PAGE_LINKS = [
      ['1', 'TOP'],
      ['2-1', '導入文'],
      ['2-2', 'リフレム1'],
      ['2-3', 'リフレム2'],
      ['2-4', 'ルール'],
      ['3-1', '初期カード'],
      ['3-2', 'カード確認'],
      ['3-3', '確認後'],
      ['4', 'ハルカ交換'],
      ['5', '酒場へ'],
      ['5-2', '出口へ'],
      ['6', '道中'],
      ['7', '旅人1'],
      ['8', '旅人2'],
      ['9', '旅人3'],
      ['10', '旅人4'],
      ['11', '酒場後'],
      ['12-1', '帰還語り'],
      ['12-2', '最後交換'],
      ['13', '最終受取'],
      ['14', '灯火'],
      ['15', '第一選択'],
      ['16', '第二選択'],
      ['17', '結果']
    ];

    function getDevPageHref(page) {
      const url = new URL(window.location.href);
      url.searchParams.set('dev', '1');
      url.searchParams.set('page', page);
      return url.toString();
    }

    function renderDevPageLinks() {
      if (!IS_DEV_MODE) return '';
      return '<div class="dev-page-jump-panel relative z-10 max-w-2xl mx-auto">' +
        '<div class="dev-page-jump-title">開発用ページジャンプ</div>' +
        '<div class="dev-page-jump-grid">' +
        DEV_PAGE_LINKS.map(function(item) {
          const page = item[0];
          const label = item[1];
          return '<a href="' + escapeAttribute(getDevPageHref(page)) + '" target="_blank" rel="noopener noreferrer" class="dev-page-jump-link">' +
            '<span class="dev-page-jump-page">Page ' + page + '</span>' +
            '<span class="dev-page-jump-label">' + label + '</span>' +
          '</a>';
        }).join('') +
        '</div></div>';
    }

    function setupDevBaseState() {
      clearResultDecisionTimers();
      const hand = CARDS_DATA.slice(0, 5);
      const shop = CARDS_DATA.slice(5, 11);
      const deck = CARDS_DATA.slice(11);
      state.hand = hand;
      state.shop = shop;
      state.deck = deck;
      state.initialHandCardIds = hand.map(card => card.id);
      state.initialShopCardIds = shop.map(card => card.id);
      state.acquiredCardIds = shop.slice(0, 2).map(card => card.id);
      state.releasedCardIds = [hand[3]?.id, hand[4]?.id].filter(Boolean);
      state.travelerReleasedCardIds = [hand[2]?.id].filter(Boolean);
      state.shopRounds = [1, getFinalShopRound()];
      state.round = 1;
      state.selectedHandCard = null;
      state.selectedShopCard = null;
      state.tradeOfferCard = null;
      state.tradeOfferCards = [];
      state.requestedHandCard = null;
      state.tradeConfirmOpen = false;
      state.requestedTradeConfirmOpen = false;
      state.requestedRefuseConfirmOpen = false;
      state.secondPassConfirmOpen = false;
      state.pendingTradeAction = null;
      state.isExchanging = false;
      state.isEntering = false;
      state.waitingAfterTrade = false;
      state.pendingAfterTrade = null;
      state.afterTradeMessage = '';
      state.tradeMessageVisibleChars = null;
      state.finalShopGuideStep = 0;
      state.shopConfirmDialogueStep = 0;
      state.resultStep = 'SELECT_1';
      state.primaryCard = null;
      state.secondaryCard = null;
      state.confirmingCard = null;
      state.zoomedCard = null;
      state.isConfirmModalClosing = false;
      state.isResultConfirmSettling = false;
      state.rulesExplanationPhase = 'guide';
      state.rulesGuideScene = 0;
      state.rulesExplanationStep = 99;
      state.initialHandDialogueStep = 99;
      state.initialHandReviewIndex = -1;
      state.initialHandReviewArmed = false;
      state.initialHandReviewGathering = false;
      state.initialHandReviewReturning = false;
      state.initialHandReviewComplete = false;
      state.initialHandCollecting = false;
      state.initialHandAnimated = true;
      state.leaveShopDialogueStep = 99;
      state.beforeTavernDialogueStep = 99;
      state.exitToTavernAnimating = false;
      state.farewellMessage = state.farewellMessage || '選んだ役割は、おぬしを縛る鎖ではない。必要なときに思い出す、小さな灯火じゃ。';
      state.reflectionAnswers = state.reflectionAnswers || { primary: '', dissonance: '', future: '' };
      return { hand, shop, deck };
    }

    function setupDevTravelerRound(round) {
      const profile = TRADE_AVATAR_PROFILES[(round - 2) % TRADE_AVATAR_PROFILES.length];
      const offerCount = getTravelerOfferCount(round);
      const offerCards = state.deck.slice(0, offerCount);
      state.round = round;
      state.gameState = 'PLAYING';
      state.tradeOfferCards = offerCards;
      state.tradeOfferCard = offerCards[0] || state.deck[0];
      state.requestedHandCard = isRequestedHandTravelerRound(round) ? state.hand[1] : null;
      state.selectedHandCard = state.requestedHandCard || null;
      state.selectedShopCard = null;
      state.tradeAvatarImg = profile.src;
      state.tradeVoice = profile.voice;
      state.tradeTone = profile.tone || '';
      const baseMessage = TRADE_MESSAGES[round] || getRandomTradeMessage(profile.voice, []);
      state.tradeMessage = state.requestedHandCard
        ? getRequestedHandTradeMessage(baseMessage, profile.voice, state.requestedHandCard)
        : withTravelerOfferCue(baseMessage, profile.voice, offerCount);
    }

    function jumpToDevPage(page, useTransition = true) {
      setupDevBaseState();
      if (page === '1') {
        state.gameState = 'START';
      } else if (page === '2-1' || page === '2-2' || page === '2-3') {
        state.gameState = 'RULES';
        state.rulesExplanationPhase = 'guide';
        state.rulesGuideScene = Math.max(0, parseInt(page.split('-')[1], 10) - 1);
        state.rulesExplanationStep = 99;
      } else if (page === '2-4') {
        state.gameState = 'RULES';
        state.rulesExplanationPhase = 'details';
        state.rulesGuideScene = 0;
        state.rulesExplanationStep = 99;
      } else if (page === '3-1' || page === '3-2' || page === '3-3') {
        state.gameState = 'INITIAL_HAND';
        state.initialHandAnimated = true;
        state.initialHandDialogueStep = 99;
        if (page === '3-2') {
          state.initialHandReviewArmed = true;
          state.initialHandReviewIndex = 0;
        } else if (page === '3-3') {
          state.initialHandReviewComplete = true;
        }
      } else if (page === '4') {
        state.gameState = 'PLAYING';
        state.round = 1;
      } else if (page === '5') {
        state.gameState = 'LEAVE_SHOP_1';
      } else if (page === '5-2') {
        state.gameState = 'EXIT_TO_TAVERN';
        state.exitToTavernAnimating = false;
      } else if (page === '6') {
        state.gameState = 'BEFORE_TAVERN';
      } else if (['7', '8', '9', '10'].includes(page)) {
        setupDevTravelerRound(parseInt(page, 10) - 5);
      } else if (page === '11') {
        state.gameState = 'AFTER_TAVERN';
      } else if (page === '12-1') {
        state.gameState = 'PLAYING';
        state.round = getFinalShopRound();
        state.finalShopGuideStep = 0;
      } else if (page === '12-2') {
        state.gameState = 'PLAYING';
        state.round = getFinalShopRound();
        state.finalShopGuideStep = 3;
      } else if (page === '13') {
        state.gameState = 'SHOP_CONFIRM';
        state.shopConfirmDialogueStep = 0;
      } else if (page === '14') {
        state.gameState = 'SHOP_FAREWELL';
      } else if (page === '15') {
        state.gameState = 'RESULT';
        state.resultStep = 'SELECT_1';
      } else if (page === '16') {
        state.gameState = 'RESULT';
        state.resultStep = 'SELECT_2';
        state.primaryCard = state.hand[0];
      } else if (page === '17') {
        state.gameState = 'RESULT';
        state.resultStep = 'FINAL';
        state.primaryCard = state.hand[0];
        state.secondaryCard = state.hand[1];
      }
      if (useTransition) {
        transitionState(() => {});
      } else {
        render();
        window.scrollTo(0, 0);
      }
    }

    function renderStartScene() {
      const savedProgressExists = hasSavedJourneyProgress();
      return `
              <div class="start-scene-frame rounded-md border border-stone-400/80 text-center max-w-2xl mx-auto shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden flex flex-col justify-end min-h-[350px] sm:min-h-[450px]">
                <img src="${BG_START_MENTALIA}" alt="" aria-hidden="true" class="start-scene-image absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none">
                <div class="absolute inset-0 bg-stone-900/10 z-0 pointer-events-none"></div>
                <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent z-0 pointer-events-none"></div>
                
                <div class="relative z-10 px-2 pb-6 sm:pb-8 pt-2 w-full">
                  <header class="text-center w-full">
                    <h1 class="font-serif font-bold text-stone-100 drop-shadow-md magic-text-glow" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
                      <span class="block text-sm sm:text-lg md:text-xl tracking-[0.28em] text-stone-200/90 mb-1">RIESM™</span>
                      <span class="block text-4xl sm:text-5xl md:text-6xl tracking-widest leading-none">RoleTRADE™</span>
                      <span class="block text-2xl sm:text-3xl md:text-4xl tracking-[0.18em] mt-2">Mentalia</span>
                    </h1>
                    <p class="text-[10px] sm:text-sm text-stone-200 mt-3 sm:mt-4 tracking-[0.2em] font-serif font-bold drop-shadow-sm bg-stone-900/60 inline-block px-4 py-1.5 rounded-full border border-stone-500/50">― リフレムとハルカと、5つの役割 ―</p>
                  </header>
                </div>
              </div>

              <div class="mt-1.5 sm:mt-2 text-center text-[8px] sm:text-[10px] leading-relaxed tracking-[0.12em] text-stone-700/70 font-serif font-bold relative z-10">
                <p>商標出願中</p>
                <p>RIESM™　商願2026-056753</p>
                <p>RoleTRADE™　商願2026-060988</p>
              </div>

              <div class="mt-2 sm:mt-3 mb-3 max-w-2xl mx-auto w-full relative z-10">
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


              <div class="start-journey-actions mt-2 sm:mt-2 mb-3 relative z-10 px-4 sm:px-0">
                <button data-action="start-fresh-journey" class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-xs sm:text-sm w-full font-serif font-bold py-2.5 sm:py-3 px-5 sm:px-8 shadow-[0_5px_20px_rgba(0,0,0,0.4)] hover:scale-105">
                  <div class="wood-texture"></div>
                  <span class="relative z-10 flex items-center justify-center text-stone-100">
                    最初から始める
                    ${getIcon('Play', "w-4 h-4 ml-3 group-hover:text-orange-400 transition-colors")}
                  </span>
                </button>
                <button data-action="continue-journey" ${savedProgressExists ? '' : 'disabled'} class="wood-btn wood-btn-light rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-xs sm:text-sm w-full font-serif font-bold py-2.5 sm:py-3 px-5 sm:px-8 shadow-[0_5px_16px_rgba(0,0,0,0.18)] ${savedProgressExists ? 'hover:scale-105' : 'opacity-45 grayscale cursor-not-allowed'}">
                  <div class="wood-texture"></div>
                  <span class="relative z-10 flex items-center justify-center">
                    続きから始める
                    ${getIcon('RefreshCw', "w-4 h-4 ml-3")}
                  </span>
                </button>
                <button data-action="open-history" class="start-history-button rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-xs sm:text-sm w-full font-serif font-bold py-2.5 sm:py-3 px-5 sm:px-8 shadow-[0_5px_16px_rgba(0,0,0,0.14)]">
                  <span class="relative z-10 flex items-center justify-center">
                    旅の記録を見る
                    ${getIcon('ScrollText', "w-4 h-4 ml-3")}
                  </span>
                </button>
                <p class="start-journey-save-note font-serif font-bold text-[10px] sm:text-xs text-stone-700/80 mt-2 text-center">
                  ${savedProgressExists ? '前回の旅の記録があります。' : '続きの記録はまだありません。'}
                </p>
              </div>

                ${renderWorkshopLicenseCard()}

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
                    <div class="bg-[#fff8ea]/75 p-3 rounded-sm border border-orange-900/20 space-y-3">
                      <p>本アプリを使用したワークショップは<br>社内や仲間内、あるいはご自身の活動で無償開催する事ができます。その際には下記フォームよりRIESM™アンバサダー登録（無料）をお願いします。登録番号とガイドブック、スライドと共に一週間以内に返信いたします。</p>
                      <p class="font-bold text-orange-900">登録➤<a href="https://forms.gle/SChNQQ4auS6qKwji7" target="_blank" rel="noopener noreferrer" class="underline decoration-orange-700 underline-offset-2 break-all">https://forms.gle/SChNQQ4auS6qKwji7</a></p>
                      <p>ワークショップを有償で開催する（収益を得る）ためには、RIESM™認定ワークナビゲーターになる必要があります。詳細は下記URLでご確認ください。</p>
                      <p class="font-bold text-orange-900">詳細➤<a href="https://note.com/ninin2025/n/n2eaed311ebca" target="_blank" rel="noopener noreferrer" class="underline decoration-orange-700 underline-offset-2 break-all">https://note.com/ninin2025/n/n2eaed311ebca</a></p>
                    </div>
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

              ${renderDevPageLinks()}
        `;
    }


    function renderHistoryScene() {
      const records = readResultHistoryRecords();
      const listHTML = records.length ? records.map(record => {
        const roleNames = (record.roles && record.roles.length ? record.roles : record.handIds.map(id => {
          const card = getHistoryCard(id);
          return card ? { id: card.id, name: card.name } : { id, name: '不明な役割' };
        }));
        return '<button type="button" data-action="open-history-record" data-id="' + escapeAttribute(record.id) + '" class="result-history-item">' +
          '<span class="result-history-date">' + escapeHTML(formatResultHistoryDate(record.completedAt)) + '</span>' +
          '<span class="result-history-roles">' + roleNames.map(role => '<span>' + escapeHTML(role.name) + '</span>').join('') + '</span>' +
          '<span class="result-history-open">結果を見る ▶</span>' +
        '</button>';
      }).join('') : '<div class="result-history-empty">まだ旅の記録はありません。<br>結果画面まで進むと、ここに5つの役割が残ります。</div>';

      return `
              <div class="result-history-scene max-w-2xl mx-auto relative z-10">
                <div class="result-history-card" style="background-image: ${PARCHMENT_TEXTURE}">
                  <p class="result-history-kicker">RoleTRADE™ Mentalia</p>
                  <h2>旅の記録</h2>
                  <p class="result-history-lead">結果までたどり着いた旅を、実施日時の新しい順に残しています。</p>
                  <div class="result-history-list">${listHTML}</div>
                  <div class="result-history-actions">
                    <button type="button" data-action="history-back-start" class="rules-back-link">TOPに戻る</button>
                  </div>
                </div>
              </div>
      `;
    }

    function renderHistoryResultScene() {
      const record = state.historyRecordView || null;
      if (!record) {
        return `
              <div class="result-history-scene max-w-2xl mx-auto relative z-10">
                <div class="result-history-card" style="background-image: ${PARCHMENT_TEXTURE}">
                  <h2>記録が見つかりませんでした。</h2>
                  <div class="result-history-actions">
                    <button type="button" data-action="back-history-list" class="rules-back-link">旅の記録を見るへ戻る</button>
                  </div>
                </div>
              </div>
        `;
      }
      const cards = (record.handIds || []).map(id => getHistoryCard(id)).filter(Boolean);
      const primary = getHistoryCard(record.primaryId);
      const secondary = getHistoryCard(record.secondaryId);
      const restCards = cards.filter(card => card.id !== record.primaryId && card.id !== record.secondaryId);
      const answers = getResultHistoryQuestionData(record).map(item => {
        return '<section class="result-history-question">' +
          '<p class="speaker">' + escapeHTML(item.speaker) + '</p>' +
          '<p class="question">' + escapeHTML(item.question) + '</p>' +
          '<div class="answer">' + formatMultiline(record.reflectionAnswers?.[item.key] || '') + '</div>' +
        '</section>';
      }).join('');
      return `
              <div class="result-history-result max-w-3xl mx-auto relative z-10">
                <div class="result-history-card result-history-result-card" style="background-image: ${PARCHMENT_TEXTURE}">
                  <div class="result-history-topline">
                    <button type="button" data-action="back-history-list" class="rules-back-link">旅の記録を見るへ戻る</button>
                    <span>${escapeHTML(formatResultHistoryDate(record.completedAt))}</span>
                  </div>
                  <p class="result-history-kicker">保存された旅の結果</p>
                  <h2>このとき残した5つの役割</h2>
                  <div class="result-history-featured">
                    ${primary ? '<div class="result-history-featured-card"><span>一番大切</span>' + renderCardHTML(primary, { isReadOnly: true, glow: true }) + '</div>' : ''}
                    ${secondary ? '<div class="result-history-featured-card"><span>二番目</span>' + renderCardHTML(secondary, { isReadOnly: true, glow: true }) + '</div>' : ''}
                  </div>
                  <div class="result-history-rest">
                    ${restCards.map(card => renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" })).join('')}
                  </div>
                  <div class="result-history-answer-block">
                    ${answers}
                  </div>
                  <div class="result-history-actions">
                    <button type="button" data-action="back-history-list" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5">
                      <div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">旅の記録を見るへ戻る</span>
                    </button>
                  </div>
                </div>
              </div>
      `;
    }

    function render() {
      const root = document.getElementById('root');
      const layoutMode = typeof getRoleTradeLayoutMode === 'function' ? getRoleTradeLayoutMode() : 'desktop';
      if (typeof syncRoleTradeLayoutMode === 'function') syncRoleTradeLayoutMode(layoutMode);
      const layoutClass = layoutMode === 'mobile' ? 'layout-mobile' : 'layout-desktop';
      const pageLabel = getPageLabel();
      const isShopTime = state.shopRounds.includes(state.round);
      const stageFadeClass = state.isTransitioning ? 'animate-fadeInStage' : '';
      const isInitialExchange = state.gameState === 'PLAYING' && state.round === 1;
      const useShopBundleLayout = isInitialExchange || (state.gameState === 'PLAYING' && isShopTime && isFinalShopRound(state.round));
      const isTwoCardTravelerOffer = state.gameState === 'PLAYING' && !isShopTime && isTwoCardTravelerRound(state.round);
      const isSecondDoubleTrade = state.gameState === 'PLAYING' && !isShopTime && isSecondDoubleTradeRound(state.round);
      const doubleTradeCount = getSecondDoubleTradeCount();
      const isRequestedHandTraveler = state.gameState === 'PLAYING' && !isShopTime && !!state.requestedHandCard;
      const isForcedTakeTraveler = state.gameState === 'PLAYING' && !isShopTime && isForcedTakeRound(state.round) && (!!state.requestedHandCard || state.forcedTakePhase === 'choose');
      const isForcedReplacementChoosing = isForcedTakeTraveler && state.forcedTakePhase === 'choose';
      const canSecondPassTrade = state.journeyMode === 'second' && state.gameState === 'PLAYING' && !isShopTime && !isForcedTakeTraveler && !state.secondPassUsed && state.round >= 2 && state.round < getFinalShopRound();
      const isTavernScene = state.gameState === 'PLAYING' && !isShopTime && state.round >= 2 && state.round < getFinalShopRound();
      const appFrameBackgroundImage = isTavernScene
        ? `linear-gradient(rgba(232, 220, 196, 0.24), rgba(232, 220, 196, 0.58)), url('${BG_TRADE_IMG}')`
        : `radial-gradient(circle at 15% 10%, rgba(249, 115, 22, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 90%, rgba(234, 179, 8, 0.12) 0%, transparent 40%), ${PARCHMENT_TEXTURE}`;
      const appFrameBackgroundSize = isTavernScene ? 'cover, cover' : 'auto';
      const appFrameBackgroundPosition = isTavernScene ? 'center center' : 'center center';

      // ▼▼ 事前に構築する HTML ▼▼
      let initialHandTopHTML = '';
      let initialHandBottomHTML = '';
      if (state.gameState === 'INITIAL_HAND') {
        const shouldAnimateInitialHand = !state.initialHandAnimated || state.initialHandCollecting;
        const collectClass = state.initialHandCollecting ? ' is-collecting' : '';
        const getInitialHandClass = (gatherIndex) => shouldAnimateInitialHand
          ? 'initial-hand-card initial-hand-card-' + gatherIndex + collectClass + ' '
          : '';
        initialHandTopHTML = state.hand.slice(0, 3).map((card, index) => {
          const isSelected = state.selectedHandCard?.id === card.id;
          const gatherIndex = index + 1;
          return '<div class="initial-hand-display-card initial-hand-slot-' + gatherIndex + ' ' + getInitialHandClass(gatherIndex) + 'shrink-0 transition-all duration-500 relative ' + (isSelected ? 'z-[100]' : 'z-10') + '">' + renderCardHTML(card, { isReadOnly: true }) + '</div>';
        }).join('');
        initialHandBottomHTML = state.hand.slice(3, 5).map((card, index) => {
          const isSelected = state.selectedHandCard?.id === card.id;
          const gatherIndex = index + 4;
          return '<div class="initial-hand-display-card initial-hand-slot-' + gatherIndex + ' ' + getInitialHandClass(gatherIndex) + 'shrink-0 transition-all duration-500 relative ' + (isSelected ? 'z-[100]' : 'z-10') + '">' + renderCardHTML(card, { isReadOnly: true }) + '</div>';
        }).join('');
        if (!state.initialHandAnimated && !state.initialHandCollecting) {
          state.initialHandAnimated = true;
        }
      }

      let shopCardsTopHTML = '';
      let shopCardsBottomHTML = '';
      let travelerOfferCardsHTML = '';
      let forcedReplacementCardsHTML = '';
      if (state.gameState === 'PLAYING' && isTwoCardTravelerOffer) {
        const offerCards = state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : [state.tradeOfferCard].filter(Boolean);
        travelerOfferCardsHTML = offerCards.map((card, index) => {
          const isSelected = isSecondDoubleTrade
            ? (state.selectedShopCards || []).some(selectedCard => selectedCard.id === card.id)
            : state.selectedShopCard?.id === card.id;
          let cStyle = "!w-[84px] !h-[119px] sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-down ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          const stackClass = "traveler-offer-stack-card traveler-offer-stack-card-" + offerCards.length + "-" + index + " " + (isSelected ? "is-selected" : "");
          return '<div class="' + stackClass + '">' + renderCardHTML(card, { isSelected: isSelected, isShopCard: true, customStyle: cStyle }) + '</div>';
        }).join('');
      }
      if (state.gameState === 'PLAYING' && isForcedReplacementChoosing) {
        forcedReplacementCardsHTML = (state.forcedReplacementCandidates || []).map(card => {
          const isSelected = state.selectedShopCard?.id === card.id;
          let cStyle = "sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-down ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          return renderCardHTML(card, { isSelected: isSelected, isShopCard: true, customStyle: cStyle });
        }).join('');
      }
      function renderInitialShopBundle(cards, bundleIndex) {
        return '<div class="initial-shop-bundle initial-shop-bundle-' + bundleIndex + '">' + cards.map((card, index) => {
          const isSelected = state.selectedShopCard?.id === card.id;
          let cStyle = "!w-[74px] !h-[105px] sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-down ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          return '<div class="initial-shop-bundle-card initial-shop-bundle-card-' + index + (isSelected ? ' is-selected' : '') + '">' + renderCardHTML(card, { isSelected: isSelected, isShopCard: true, customStyle: cStyle }) + '</div>';
        }).join('') + '</div>';
      }

      if (state.gameState === 'PLAYING' && isShopTime) {
        const createShopCardWrapper = (card) => {
          const isSelected = state.selectedShopCard?.id === card.id;
          let cStyle = "sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-down ";
          if (state.isEntering) cStyle += "animate-drop-in ";
          return renderCardHTML(card, { isSelected: isSelected, isShopCard: true, customStyle: cStyle });
        };
        if (useShopBundleLayout) {
          shopCardsTopHTML = renderInitialShopBundle(state.shop.slice(0, 3), 1);
          shopCardsBottomHTML = renderInitialShopBundle(state.shop.slice(3, 6), 2);
        } else {
          shopCardsTopHTML = state.shop.slice(0, 3).map(createShopCardWrapper).join('');
          shopCardsBottomHTML = state.shop.slice(3, 6).map(createShopCardWrapper).join('');
        }
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
          const isSelected = isSecondDoubleTrade
            ? (state.selectedHandCards || []).some(selectedCard => selectedCard.id === card.id)
            : state.selectedHandCard?.id === card.id;
          const isRequestedCard = state.requestedHandCard?.id === card.id;
          let edgeAdjustment = 'origin-bottom';
          const shouldLiftHandCard = isSelected && !isRequestedCard;
          if (shouldLiftHandCard) {
            if (index === 0) edgeAdjustment = ' origin-bottom-left translate-x-4 sm:translate-x-6 ';
            else if (index === state.hand.length - 1) edgeAdjustment = ' origin-bottom-right -translate-x-4 sm:-translate-x-6 ';
          }
          let cStyle = "sm:!w-24 sm:!h-36 ";
          if (state.isExchanging && isSelected) cStyle += "animate-fly-up ";
          if (isRequestedCard) cStyle += "ring-2 ring-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.65)] " + (!state.isExchanging ? "requested-hand-card-stable " : "");
          if (state.isEntering) cStyle += "animate-drop-in ";
          cStyle += edgeAdjustment;
          
          let wrapClass = "shrink-0 transition-all duration-500 relative ";
          if (index > 0) wrapClass += "-ml-8 sm:ml-2 ";
          wrapClass += isRequestedCard ? "z-[90] requested-hand-card-wrap" : (isSelected ? "z-[100]" : "z-10");

          return '<div class="' + wrapClass + '">' + renderCardHTML(card, { isSelected: shouldLiftHandCard, isHandCard: true, customStyle: cStyle }) + '</div>';
        }).join('');
      }

      // ▼▼ メイン HTML 構築 ▼▼
      let html = `
        <div class="roletrade-app-frame ${layoutClass} min-h-screen text-stone-900 font-sans flex justify-center transition-colors duration-1000 overflow-x-hidden relative pt-2.5 sm:pt-6 lg:pt-8" data-layout="${layoutMode}" data-page="${pageLabel}"
             style="background-color: #e8dcc4; background-image: ${appFrameBackgroundImage}; background-size: ${appFrameBackgroundSize}; background-position: ${appFrameBackgroundPosition}; background-attachment: ${isTavernScene ? 'fixed' : 'scroll'}; box-shadow: inset 0 0 120px rgba(67, 20, 7, 0.5)">
          
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
        if (state.startResetConfirmOpen) {
          html += `
            <div class="start-reset-confirm-modal fixed inset-0 z-[230] flex items-center justify-center bg-stone-950/65 p-4 backdrop-blur-sm animate-fadeInModal">
              <div class="start-reset-confirm-card w-full max-w-md rounded-sm border border-orange-900/30 bg-[#f0e6d2] p-5 sm:p-7 text-center shadow-2xl" style="background-image: ${PARCHMENT_TEXTURE}">
                <p class="text-[10px] sm:text-xs font-serif font-black tracking-[0.22em] text-orange-900/80">旅の記録</p>
                <h2 class="mt-2 text-lg sm:text-xl font-serif font-extrabold text-stone-900 magic-text-glow">前回の記録が残っています。</h2>
                <p class="mt-4 text-xs sm:text-sm font-serif font-bold leading-loose text-stone-800">このまま最初から始めると、保存されている旅の途中経過は消えます。<br>新しい旅として始めてよいですか？</p>
                <div class="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <button type="button" data-action="cancel-start-fresh" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full sm:w-auto">
                    <div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">戻る</span>
                  </button>
                  <button type="button" data-action="confirm-start-fresh" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full sm:w-auto">
                    <div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">記録を消して始める</span>
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      }

      if (state.gameState === 'HISTORY') {
        html += renderHistoryScene();
      }

      if (state.gameState === 'HISTORY_RESULT') {
        html += renderHistoryResultScene();
      }

      if (state.gameState === 'RULES') {
        html += renderRulesScene();
      }

      if (state.gameState === 'INITIAL_HAND') {
        const isInitialHandDialogueComplete = state.initialHandDialogueStep >= INITIAL_HAND_DIALOGUE_BLOCKS.length - 1;
        const isInitialHandPostReviewComplete = state.initialHandReviewComplete && state.initialHandPostReviewStep >= INITIAL_HAND_POST_REVIEW_BLOCKS.length - 1;
        const isInitialHandReady = isInitialHandDialogueComplete && state.initialHandReviewComplete && isInitialHandPostReviewComplete;
        const isInitialHandReviewWaiting = isInitialHandDialogueComplete && state.initialHandReviewArmed && !state.initialHandReviewComplete && state.initialHandReviewIndex < 0 && !state.initialHandReviewGathering;
        const initialReviewCard = state.initialHandReviewIndex >= 0 ? state.hand[state.initialHandReviewIndex] : null;
        const initialReviewActionText = state.initialHandReviewIndex >= state.hand.length - 1 ? 'タップして確認を終える' : 'タップして次のカードへ';
        const initialReviewMotionClass = initialReviewCard
          ? (state.initialHandReviewReturning
            ? (state.initialHandReviewIndex >= state.hand.length - 1 ? ' is-returning is-final-returning' : ' is-returning')
            : (state.initialHandReviewIndex === 0 ? ' is-first-review' : ' is-slide-review'))
          : '';
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${ROLETRADE_SCENE_IMG}" alt="リフレムとハルカのいる部屋" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 56% center;" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="initial-hand-dialogue-panel relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${HARUKA_AVATAR}" alt="ハルカ" class="w-full h-full object-cover" style="object-position: ${HARUKA_CROP_POSITION}; transform: scale(${HARUKA_SCENE_ZOOM}); transform-origin: ${HARUKA_SCENE_ORIGIN};" />
                  </div>
                  
                  <div class="absolute inset-0 dialog-wash-translucent bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="character-dialogue-body relative z-20 p-3 sm:p-8 w-[50%] max-w-[190px] sm:w-[66%] sm:max-w-none ml-4 sm:ml-8 mr-auto space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    ${state.initialHandReviewComplete
                      ? renderProgressiveDialogueBlocks(INITIAL_HAND_POST_REVIEW_BLOCKS, state.initialHandPostReviewStep)
                      : renderProgressiveDialogueBlocks(INITIAL_HAND_DIALOGUE_BLOCKS, state.initialHandDialogueStep)
                    }
                    ${!state.initialHandReviewComplete && state.initialHandDialogueStep < INITIAL_HAND_DIALOGUE_BLOCKS.length - 1 ? '<button data-action="advance-scene-dialogue" class="manual-next-cursor" aria-label="次の言葉へ進む">▼</button>' : ''}
                    ${state.initialHandReviewComplete && state.initialHandPostReviewStep < INITIAL_HAND_POST_REVIEW_BLOCKS.length - 1 ? '<button data-action="advance-scene-dialogue" class="manual-next-cursor" aria-label="次の言葉へ進む">▼</button>' : ''}
                    ${isInitialHandReviewWaiting ? '<button type="button" data-action="start-initial-card-review" class="dialogue-inline-next-cue" aria-label="カードを確認する"><span>カードを確認する</span><span class="rules-next-play">▶</span></button>' : ''}
                    ${isInitialHandReady ? '<button type="button" data-action="go-playing" class="dialogue-inline-next-cue mt-4" aria-label="' + getExperienceText('startInitialExchangeLabel', 'ハルカと最初の交換へ') + '"><span>' + getExperienceText('startInitialExchangeLabel', 'ハルカと最初の交換へ') + '</span><span class="rules-next-play">▶</span></button>' : ''}
                    <br/><br/><br/><br/><br/><br/>
                  </div>
                </div>
                
                <div class="initial-hand-cards-click-area flex flex-col items-center gap-3 sm:gap-4 w-full relative z-10 ${initialReviewCard ? 'initial-hand-review-muted' : ''} ${state.initialHandReviewGathering ? 'initial-hand-review-gathering' : ''}">
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${initialHandTopHTML}
                  </div>
                  <div class="flex justify-center gap-2 sm:gap-4 w-full">
                    ${initialHandBottomHTML}
                  </div>
                </div>


                ${initialReviewCard ? `
                  <div class="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none initial-card-review-overlay">
                    <button type="button" data-action="advance-initial-card-review" ${state.initialHandReviewReturning ? 'disabled' : ''} class="initial-card-review-panel${initialReviewMotionClass}" aria-label="次の役割カードを確認する">
                      <div class="initial-card-review-count">${state.initialHandReviewIndex + 1} / ${state.hand.length}</div>
                      <div class="initial-card-review-card">${renderCardHTML(initialReviewCard, { isReadOnly: true, customStyle: 'initial-card-review-scale initial-card-review-readable' })}</div>
                      <div class="initial-card-review-hint">${initialReviewActionText}</div>
                    </button>
                  </div>
                ` : ''}
              </div>
        `;
      }

      // ▼▼ シーン：武器屋の見送り ▼▼
      if (state.gameState === 'LEAVE_SHOP_1') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${ROLETRADE_SCENE_IMG}" alt="リフレムとハルカのいる部屋" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 56% center;" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="leave-shop-dialogue-panel relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent min-h-[300px] sm:min-h-[320px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${HARUKA_AVATAR}" alt="ハルカ" class="w-full h-full object-cover" style="object-position: ${HARUKA_CROP_POSITION}; transform: scale(${HARUKA_SCENE_ZOOM}); transform-origin: ${HARUKA_SCENE_ORIGIN};" />
                  </div>
                  
                  <div class="absolute inset-0 dialog-wash-translucent bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="character-dialogue-body relative z-20 p-3 sm:p-8 w-[52%] max-w-[210px] sm:w-[66%] sm:max-w-none ml-0 mr-auto space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    ${renderProgressiveDialogueBlocks(LEAVE_SHOP_DIALOGUE_BLOCKS, state.leaveShopDialogueStep)}
                    ${state.leaveShopDialogueStep < LEAVE_SHOP_DIALOGUE_BLOCKS.length - 1
                      ? '<button data-action="advance-scene-dialogue" class="manual-next-cursor" aria-label="次の言葉へ進む">▼</button>'
                      : '<button type="button" data-action="go-before-tavern" class="dialogue-inline-next-cue mt-4" aria-label="酒場に向かう"><span>酒場に向かう</span><span class="rules-next-play">▶</span></button>'
                    }
                  </div>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：酒場へ向かう出口 ▼▼
      if (state.gameState === 'EXIT_TO_TAVERN') {
        const exitMovingClass = state.exitToTavernAnimating ? ' is-moving' : (state.exitDepartureCueVisible ? ' is-departure-cue' : '');
        html += `
              <div class="exit-to-tavern-scene${exitMovingClass} rounded-sm border border-stone-400/80 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="exit-to-tavern-pan" style="background-image: url('${ROLETRADE_SCENE_IMG}');" aria-hidden="true"></div>
                <div class="exit-to-tavern-vignette" aria-hidden="true"></div>
                ${!state.exitToTavernAnimating && !state.exitDepartureCueVisible ? `
                  <button type="button" data-action="exit-hotspot-dialogue" data-speaker="refrem" class="exit-to-tavern-hotspot exit-to-tavern-hotspot-refrem" aria-label="リフレムに話しかける"></button>
                  <button type="button" data-action="exit-hotspot-dialogue" data-speaker="haruka" class="exit-to-tavern-hotspot exit-to-tavern-hotspot-haruka" aria-label="ハルカに話しかける"></button>
                ` : ''}
                ${state.exitHotspotMessage ? `
                  <div class="exit-to-tavern-speech exit-to-tavern-speech-${state.exitHotspotSpeaker}" role="status" aria-live="polite">
                    <span class="exit-to-tavern-speaker">${state.exitHotspotSpeaker === 'haruka' ? 'ハルカ' : 'リフレム'}</span>
                    <span class="exit-to-tavern-line">${escapeHTML(state.exitHotspotMessage)}</span>
                  </div>
                ` : ''}
                ${state.exitDepartureCueVisible ? `
                  <div class="exit-to-tavern-departure-speech exit-to-tavern-departure-refrem" role="status"><span class="exit-to-tavern-speaker">リフレム</span><span class="exit-to-tavern-line">気を付けて行ってくるのじゃぞ。</span></div>
                  <div class="exit-to-tavern-departure-speech exit-to-tavern-departure-haruka" role="status"><span class="exit-to-tavern-speaker">ハルカ</span><span class="exit-to-tavern-line">楽しんできてね♪</span></div>
                ` : ''}
                <button type="button" data-action="start-exit-to-tavern" class="exit-to-tavern-start wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-xs sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-7" ${state.exitToTavernAnimating || state.exitDepartureCueVisible ? 'disabled' : ''}>
                  <div class="wood-texture"></div>
                  <span class="relative z-10 flex items-center justify-center">酒場に向かう<span class="rules-next-play ml-2">▶</span></span>
                </button>
              </div>
        `;
      }

      // ▼▼ シーン：酒場の前 ▼▼
      if (state.gameState === 'BEFORE_TAVERN') {
        const isBeforeTavernDialogueComplete = state.beforeTavernDialogueStep >= BEFORE_TAVERN_DIALOGUE_BLOCKS.length - 1;
        html += `
              <div class="bg-[#f0e6d2]/70 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_TAVERN_ROUTE_IMG}" alt="酒場へ向かう街の風景" class="w-full h-full object-cover opacity-60 mix-blend-multiply" style="object-position: ${BG_TAVERN_ROUTE_POSITION}; transform: scale(${BG_TAVERN_ROUTE_ZOOM}); transform-origin: ${BG_TAVERN_ROUTE_POSITION};" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
                
                <h2 class="route-scene-title text-xl sm:text-2xl font-serif font-extrabold mb-5 sm:mb-8 tracking-widest text-stone-900 magic-text-glow relative z-10 mt-0 sm:mt-2">
                  旅人たちの酒場へ
                </h2>
                
                <div class="route-dialogue-panel text-stone-800 text-left space-y-3 sm:space-y-4 mb-6 sm:mb-10 text-sm sm:text-base leading-relaxed font-serif font-bold bg-[#e8dcc4]/90 p-5 sm:p-8 rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative z-10 min-h-[260px] sm:min-h-[300px] flex flex-col justify-center">
                  ${renderProgressiveDialogueBlocks(BEFORE_TAVERN_DIALOGUE_BLOCKS, state.beforeTavernDialogueStep)}
                  <div class="scene-next-slot">
                    ${!isBeforeTavernDialogueComplete
                      ? '<button data-action="advance-scene-dialogue" class="manual-next-cursor" aria-label="次の言葉へ進む">▼</button>'
                      : '<button data-action="go-playing" class="dialogue-inline-next-cue mt-4" aria-label="酒場の扉を開く"><span>酒場の扉を開く</span><span class="rules-next-play">▶</span></button>'
                    }
                  </div>
                </div>
              </div>
        `;
      }

      // ▼▼ シーン：準備部屋へ戻る ▼▼
      if (state.gameState === 'AFTER_TAVERN') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_TAVERN_RETURN_IMG}" alt="酒場から戻る街の風景" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${BG_TAVERN_RETURN_POSITION}; transform: scale(${BG_TAVERN_RETURN_ZOOM}); transform-origin: ${BG_TAVERN_RETURN_POSITION};" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
                
                <h2 class="text-xl sm:text-2xl font-serif font-extrabold mb-5 sm:mb-8 tracking-widest text-stone-900 magic-text-glow relative z-10 mt-0 sm:mt-2">
                  酒場を後にして
                </h2>
                
                <div class="text-stone-800 text-left space-y-4 mb-6 sm:mb-10 text-sm sm:text-base leading-relaxed font-serif font-bold bg-[#e8dcc4]/90 p-5 sm:p-8 rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] relative z-10">
                  <p>足を踏み出すたびに<br>酒場のざわめきが、少しずつ遠ざかっていく。</p>
                  <p>大事に手ににもつ役割のカードは、<br>さっきまでとは少し違う重さを<br>持っているように感じられた。</p>
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
        const isShopConfirmDialogueComplete = state.shopConfirmDialogueStep >= SHOP_CONFIRM_DIALOGUE_BLOCKS.length - 1;
        const shopConfirmHand = state.pendingTradeAction === 'trade' && state.selectedHandCard && state.selectedShopCard
          ? state.hand.map(card => card.id === state.selectedHandCard.id ? state.selectedShopCard : card)
          : state.hand;
        let confirmHandTopHTML = shopConfirmHand.slice(0, 3).map(card => {
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" }) + '</div>';
        }).join('');
        let confirmHandBottomHTML = shopConfirmHand.slice(3, 5).map(card => {
          return '<div class="shrink-0 transition-transform duration-500">' + renderCardHTML(card, { isReadOnly: true, customStyle: "border-stone-400" }) + '</div>';
        }).join('');
        const shopConfirmButtonStateClass = isShopConfirmDialogueComplete ? '' : 'opacity-45 grayscale cursor-not-allowed pointer-events-none';
        const shopConfirmButtonDisabled = isShopConfirmDialogueComplete ? '' : 'disabled';
        const shopConfirmActionsHTML = `
          <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full max-w-md">
            <button data-action="confirm-journey-no" ${shopConfirmButtonDisabled} class="wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[12px] sm:text-sm font-serif py-2.5 sm:py-3 px-5 sm:px-7 w-full sm:w-auto ${shopConfirmButtonStateClass}">
              <div class="wood-texture"></div>
              <span class="relative z-10 flex items-center justify-center">
                ${getIcon('ChevronLeft', "w-4 h-4 mr-2")} もう一度見直す
              </span>
            </button>
            <button data-action="confirm-journey-yes" ${shopConfirmButtonDisabled} class="wood-btn wood-btn-dark rounded-sm transition-all duration-500 flex items-center justify-center tracking-widest text-[12px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-5 sm:px-7 w-full sm:w-auto ${shopConfirmButtonStateClass}">
              <div class="wood-texture"></div>
              <span class="relative z-10 flex items-center justify-center">
                この五枚を受け取る
                ${getIcon('Play', "w-4 h-4 ml-2 sm:ml-3 group-hover:text-orange-400 transition-colors")}
              </span>
            </button>
          </div>
        `;

        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_FINAL_SHOP_IMG}" alt="灯火の間" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${BG_FINAL_SHOP_POSITION}; transform: scale(${BG_FINAL_SHOP_ZOOM}); transform-origin: ${BG_FINAL_SHOP_POSITION};" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent min-h-[220px] sm:min-h-[260px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);">
                    <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover" style="object-position: ${REFREM_CROP_POSITION};" />
                  </div>
                  
                  <div class="absolute inset-0 dialog-wash-translucent bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="character-dialogue-body relative z-20 p-4 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                    ${renderProgressiveDialogueBlocks(SHOP_CONFIRM_DIALOGUE_BLOCKS, state.shopConfirmDialogueStep)}
                    ${!isShopConfirmDialogueComplete ? '<button data-action="advance-shop-confirm-dialogue" class="manual-next-cursor" aria-label="次の言葉へ進む">▼</button>' : ''}
                    ${shopConfirmActionsHTML}
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

              </div>
        `;
      }

      // ▼▼ シーン：最後の武器屋の別れ ▼▼
      if (state.gameState === 'SHOP_FAREWELL') {
        html += `
              <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${BG_FINAL_SHOP_IMG}" alt="灯火の間" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${BG_FINAL_SHOP_POSITION}; transform: scale(${BG_FINAL_SHOP_ZOOM}); transform-origin: ${BG_FINAL_SHOP_POSITION};" />
                </div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                <div class="relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
                  
                  <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                    <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover" style="object-position: ${REFREM_CROP_POSITION};" />
                  </div>
                  
                  <div class="absolute inset-0 dialog-wash-translucent bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>

                  <div class="character-dialogue-body relative z-20 p-5 sm:p-8 w-[95%] sm:w-[66%] space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
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
        const playingBgImg = isShopTime && isFinalShopRound(state.round)
          ? BG_FINAL_SHOP_IMG
          : (isShopTime ? ROLETRADE_SCENE_IMG : BG_TRADE_IMG);
        const playingBgPosition = isShopTime && isFinalShopRound(state.round)
          ? BG_FINAL_SHOP_GUIDE_POSITION
          : (isShopTime ? "56% center" : "center center");
        html += `
              <div class="bg-[#f0e6d2]/95 rounded-sm shadow-[0_10px_30px_rgba(124,45,18,0.2)] border border-stone-400/80 min-h-[300px] sm:min-h-[340px] relative overflow-hidden mt-0 sm:mt-4">
                <div class="absolute inset-0 z-0 pointer-events-none">
                  <img src="${playingBgImg}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${playingBgPosition}; transform: scale(${isShopTime && isFinalShopRound(state.round) ? BG_FINAL_SHOP_GUIDE_ZOOM : 1}); transform-origin: ${playingBgPosition};" />
                </div>
        `;

        if (isShopTime) {
          const guide = GUIDE_MESSAGES[state.round] || (isFinalShopRound(state.round) ? GUIDE_MESSAGES[getFinalShopRound()] || GUIDE_MESSAGES[7] || {
            name: "リフレム",
            place: "灯火の間",
            avatar: REFREM_AVATAR,
            avatarPosition: REFREM_CROP_POSITION,
            avatarZoom: 2.25,
            avatarOrigin: "42% 29%",
            icon: "Flame",
            color: "text-orange-700",
            message: FINAL_SHOP_GUIDE_INTRO
          } : null);
          const finalShopGuideMessages = [FINAL_SHOP_GUIDE_INTRO, FINAL_SHOP_GUIDE_DETAIL_1, FINAL_SHOP_GUIDE_DETAIL_2];
          const finalShopGuideStep = isFinalShopRound(state.round) ? (state.finalShopGuideStep || 0) : finalShopGuideMessages.length;
          const isFinalShopWaiting = isFinalShopRound(state.round) && finalShopGuideStep < finalShopGuideMessages.length;
          const guideMessage = isFinalShopRound(state.round)
            ? (isFinalShopWaiting ? finalShopGuideMessages[finalShopGuideStep] : guide.message)
            : guide.message;
          if (isFinalShopWaiting) {
            const isFinalGuideCue = finalShopGuideStep >= finalShopGuideMessages.length - 1;
            html += `
                  <div class="p-2 sm:p-8 relative z-10">
                    <div class="max-w-2xl mx-auto">
                      <div class="bg-[#f0e6d2]/90 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 text-center shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute inset-0 z-0 pointer-events-none">
                          <img src="${ROLETRADE_SCENE_IMG}" alt="リフレムとハルカのいる部屋" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 52% center;" />
                        </div>
                        <button type="button" data-action="advance-final-shop-guide" aria-label="リフレムの言葉を次へ進める" class="relative block w-full text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent h-[455px] sm:h-[594px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0e6d2] transition-colors duration-300" style="background-image: ${PARCHMENT_TEXTURE}">
                          <div class="absolute left-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
                            <img src="${REFREM_AVATAR}" alt="リフレム" class="w-full h-full object-cover" style="object-position: ${REFREM_CROP_POSITION};" />
                          </div>
                          <div class="absolute inset-0 dialog-wash-translucent-rules-left z-10 pointer-events-none"></div>
                          <div class="character-dialogue-body character-dialogue-body-refrem relative z-20 p-4 sm:p-8 h-full flex flex-col justify-center text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
                            <div class="space-y-2 sm:space-y-3">
                              ${guideMessage}
                            </div>
                            <p class="rules-next-cue ${isFinalGuideCue ? 'rules-next-cue-final' : ''}" aria-label="${isFinalGuideCue ? '次へ進む' : '次の言葉へ進む'}">
                              ${isFinalGuideCue ? '<span class="rules-next-text">次へ</span><span class="rules-next-play">▶</span>' : '<span class="rules-next-arrow">▼</span>'}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
            `;
          } else if (state.waitingAfterTrade) {
            html += `
                  <div class="p-3 sm:p-8 relative z-10">
                    <div class="flex items-start max-w-2xl mx-auto w-full mb-4 sm:mb-8 px-1 sm:px-0">
                      <div class="flex flex-col items-center shrink-0 z-10 w-16 sm:w-28">
                        <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                          <img src="${guide.avatar}" alt="${guide.name}" class="w-full h-full object-cover" style="object-position: ${guide.avatarPosition || '50% 50%'}; transform: scale(${guide.avatarZoom || 1}); transform-origin: ${guide.avatarOrigin || guide.avatarPosition || '50% 50%'};" />
                        </div>
                      </div>
                      <div class="character-dialogue-surface trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-3 sm:p-6 rounded-md border border-stone-400/60 shadow-md flex-1 ml-3 sm:ml-6" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <p class="dialogue-text-unified text-[12px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left"><span class="after-trade-typewriter" style="--typewriter-steps: ${(state.afterTradeMessage || getAfterTradeMessage('shop', null, null)).length}; --typewriter-duration: ${Math.max(1.4, ((state.afterTradeMessage || getAfterTradeMessage('shop', null, null)).length || 18) * 0.075)}s;">${state.afterTradeMessage || getAfterTradeMessage('shop', null, null)}</span></p>
                        <button type="button" data-action="continue-after-trade" class="dialogue-inline-next-cue mt-3" aria-label="次へ進む"><span>次へ進む</span><span class="rules-next-play">▶</span></button>
                      </div>
                    </div>
                  </div>
            `;
          } else {
          html += `
                  <div class="p-3 sm:p-8 relative z-10">
                    <div class="flex items-start max-w-2xl mx-auto w-full mb-4 sm:mb-8 px-1 sm:px-0">
                      <div class="flex flex-col items-center shrink-0 z-10 w-16 sm:w-28">
                        <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                          <img src="${guide.avatar}" alt="${guide.name}" class="w-full h-full object-cover" style="object-position: ${guide.avatarPosition || '50% 50%'}; transform: scale(${guide.avatarZoom || 1}); transform-origin: ${guide.avatarOrigin || guide.avatarPosition || '50% 50%'};" />
                        </div>
                        <div class="mt-1 sm:mt-2 text-center w-full">
                          <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] dialog-meta-top px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">
                            R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.round}</span> / ${getTotalRounds()}
                          </div>
                          <div class="flex items-center justify-center gap-0.5 font-bold text-[8px] sm:text-[10px] bg-[#e8dcc4] dialog-meta-bottom px-0.5 sm:px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm ${guide.color} leading-tight">
                            ${getIcon(guide.icon, "w-2.5 h-2.5 " + guide.color)} ${guide.place}
                          </div>
                        </div>
                      </div>
                      
                      <div class="character-dialogue-surface trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-2.5 sm:p-6 rounded-md border border-stone-400/60 shadow-md flex-1 ml-2 sm:ml-6 mt-0 sm:mt-0" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <div class="dialogue-text-unified text-[11px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left space-y-1 sm:space-y-2">
                          ${guideMessage}
                          ${isFinalShopWaiting ? `
                            <button data-action="advance-final-shop-guide" class="rules-next-cue block ml-auto mt-4 sm:mt-5 font-serif font-extrabold tracking-widest">
                              次へ <span class="rules-next-arrow">▼</span>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>

                    ${isFinalShopWaiting ? '' : `
                      ${useShopBundleLayout ? `
                        <div class="initial-shop-bundles w-full mb-4 sm:mb-8 relative z-10">
                          <p class="selection-guide-label mb-1.5 sm:mb-3">ここから一つ選ぶ</p>
                          <div class="initial-shop-bundle-row">
                            ${shopCardsTopHTML}
                            ${shopCardsBottomHTML}
                          </div>
                        </div>
                      ` : `
                        <div class="flex flex-col items-center gap-2 sm:gap-4 w-full mb-4 sm:mb-8 relative z-10">
                          <div class="flex justify-center gap-1 sm:gap-4 w-full">
                            ${shopCardsTopHTML}
                          </div>
                          <div class="flex justify-center gap-1 sm:gap-4 w-full">
                            ${shopCardsBottomHTML}
                          </div>
                        </div>
                      `}
                    `}
                  </div>
          `;
          }
        } else if (state.waitingAfterTrade) {
          const travelerAfterTradeCueText = state.round >= getFinalShopRound() - 1 ? '酒場から出る' : '次の旅人と話す';
          html += `
                  <div class="p-2 sm:p-5 relative z-10">
                    <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4 max-w-[31rem] sm:max-w-[34rem] mx-auto w-full items-start">
                      <div class="flex flex-col items-center shrink-0 z-10 w-full">
                        <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                          <img src="${state.tradeAvatarImg}" alt="旅人" class="w-full h-full object-cover object-center" />
                        </div>
                      </div>
                      <div class="trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-3 sm:p-4 rounded-md border border-stone-400/60 shadow-md min-w-0" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <p class="dialogue-text-unified text-[12px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left"><span class="after-trade-typewriter" style="--typewriter-steps: ${(state.afterTradeMessage || getAfterTradeMessage('traveler', null, null)).length}; --typewriter-duration: ${Math.max(1.4, ((state.afterTradeMessage || getAfterTradeMessage('traveler', null, null)).length || 18) * 0.075)}s;">${state.afterTradeMessage || getAfterTradeMessage('traveler', null, null)}</span></p>
                        <button type="button" data-action="continue-after-trade" class="dialogue-inline-next-cue mt-3" aria-label="${travelerAfterTradeCueText}"><span>${travelerAfterTradeCueText}</span><span class="rules-next-play">▶</span></button>
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
                          <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] dialog-meta-top px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">
                            R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.round}</span> / ${getTotalRounds()}
                          </div>
                          <div class="flex items-center justify-center gap-0.5 font-bold text-[9px] sm:text-[10px] bg-[#e8dcc4] dialog-meta-bottom px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm text-blue-900 leading-tight">
                            ${getIcon('ArrowRightLeft', "w-2.5 h-2.5 text-blue-700")} 酒場
                          </div>
                        </div>
                      </div>

                      <div class="trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-2.5 sm:p-3 rounded-md border border-stone-400/60 shadow-md min-w-0 flex flex-col items-center gap-2 sm:gap-2.5" style="background-image: ${PARCHMENT_TEXTURE}">
                        <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
                        <p class="dialogue-text-unified requested-trade-message self-stretch text-[10.5px] sm:text-sm text-stone-900 font-serif font-bold leading-relaxed sm:leading-loose text-left">${state.tradeMessage || TRADE_MESSAGES[state.round]}</p>
                        ${isForcedTakeTraveler && state.forcedTakePhase !== 'choose'
                          ? '<button type="button" data-action="' + (state.forcedTakePhase === 'selected' || state.forcedTakePhase === 'pulling' ? 'second-forced-pull' : 'second-forced-claim') + '" ' + (state.isExchanging ? 'disabled' : '') + ' class="dialogue-inline-next-cue self-start mt-2 ' + (state.isExchanging ? 'opacity-50 pointer-events-none' : '') + '" aria-label="強制取得を進める"><span>' + (state.forcedTakePhase === 'selected' || state.forcedTakePhase === 'pulling' ? '……' : 'それをもらうぜ') + '</span><span class="rules-next-play">▶</span></button>'
                          : (!isForcedTakeTraveler && isRequestedHandTraveler ? '<div class="requested-trade-actions"><button type="button" data-action="accept-requested-trade" class="requested-trade-choice wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-[11px] sm:text-xs font-serif font-bold py-2 px-3"><div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">応じる</span></button><button type="button" data-action="refuse-requested-trade" class="requested-trade-choice wood-btn wood-btn-light rounded-sm transition-all duration-300 text-[11px] sm:text-xs font-serif font-bold py-2 px-3"><div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">断る</span></button></div>' : '')}
                        ${isForcedTakeTraveler && state.forcedTakePhase !== 'choose' ? '' : `
                          <div class="w-full flex flex-col items-center pt-2 sm:pt-2.5 border-t border-stone-400/35 ${isTwoCardTravelerOffer || isForcedReplacementChoosing ? '' : '-translate-x-14'}">
                            ${isForcedReplacementChoosing
                              ? '<p class="selection-guide-label mb-1.5 sm:mb-2">代わりに受け取る役割を一つ選ぶ</p>'
                              : (isSecondDoubleTrade ? '<p class="selection-guide-label mb-1.5 sm:mb-2">ここから二つ選ぶ</p>' : (isTwoCardTravelerOffer ? '<p class="selection-guide-label mb-1.5 sm:mb-2">ここから一つ選ぶ</p>' : '<p class="text-[9px] sm:text-xs font-serif tracking-widest text-stone-700 mb-1.5 sm:mb-2 font-bold">旅人からの提示</p>'))}
                            <div class="${isForcedReplacementChoosing ? 'flex justify-center flex-wrap gap-1.5 sm:gap-4 w-full' : (isTwoCardTravelerOffer ? 'traveler-offer-stack ' + ((state.tradeOfferCards || []).length >= 4 ? 'traveler-offer-stack-double-pairs' : '') : 'flex justify-center gap-1.5 sm:gap-4 transform hover:scale-105 transition-transform duration-500')}">
                              ${isForcedReplacementChoosing ? forcedReplacementCardsHTML : (isTwoCardTravelerOffer ? travelerOfferCardsHTML : renderCardHTML(state.tradeOfferCard, { isReadOnly: true, customStyle: 'sm:!w-24 sm:!h-36 ' + (state.isExchanging ? 'animate-fly-down ' : '') + (state.isEntering ? 'animate-drop-in' : '') }))}
                            </div>
                          </div>
                        `}
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

        const isDoubleTradeConfirm = state.tradeConfirmOpen && isSecondDoubleTrade && (state.selectedShopCards || []).length >= doubleTradeCount && (state.selectedHandCards || []).length >= doubleTradeCount;
        const confirmReceiveCard = state.selectedShopCard || state.tradeOfferCard;
        const confirmReceiveCards = isDoubleTradeConfirm ? state.selectedShopCards.slice(0, doubleTradeCount) : [confirmReceiveCard].filter(Boolean);
        const confirmReleaseCards = isDoubleTradeConfirm ? state.selectedHandCards.slice(0, doubleTradeCount) : [state.selectedHandCard].filter(Boolean);
        const tradeConfirmCopy = window.RoleTradeTradeEngine
          ? window.RoleTradeTradeEngine.getTradeConfirmCopy(state)
          : { title: 'これでいいですか？', body: '選んだ2枚を交換します。', cancelLabel: '選び直す', submitLabel: '交換する' };
        if (state.tradeConfirmOpen && (isDoubleTradeConfirm || (state.selectedHandCard && confirmReceiveCard))) {
          html += `
                  <div class="fixed inset-0 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-fadeInModal" style="z-index: 220;">
                    <div class="bg-[#f0e6d2] w-full max-w-lg rounded-sm shadow-2xl border border-orange-900/30 p-4 sm:p-6 text-center" style="background-image: ${PARCHMENT_TEXTURE}">
                      <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-2 magic-text-glow">${tradeConfirmCopy.title}</h3>
                      <p class="text-xs sm:text-sm font-serif font-bold text-stone-700 mb-4">${isDoubleTradeConfirm ? '選んだ4枚を、2枚ずつ交換します。' : tradeConfirmCopy.body}</p>
                      <div class="grid grid-cols-2 gap-3 sm:gap-5 items-start mb-5">
                        <div class="trade-card-direction-column trade-card-direction-column-receive flex flex-col items-center gap-2">
                          <p class="trade-card-direction-label trade-card-direction-label-receive text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-orange-800">受け取るカード▼</p>
                          ${confirmReceiveCards.map(card => '<div class="scale-[0.78] sm:scale-[0.86] origin-top -mb-5 sm:-mb-4">' + renderCardHTML(card, { isReadOnly: true, customStyle: "shadow-lg" }) + '</div>').join('')}
                        </div>
                        <div class="trade-card-direction-column trade-card-direction-column-release flex flex-col items-center gap-2">
                          <p class="trade-card-direction-label trade-card-direction-label-release text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-stone-700">▲手放すカード</p>
                          ${confirmReleaseCards.map(card => '<div class="scale-[0.78] sm:scale-[0.86] origin-top -mb-5 sm:-mb-4">' + renderCardHTML(card, { isReadOnly: true, customStyle: "shadow-lg" }) + '</div>').join('')}
                        </div>
                      </div>
                      <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                        <button data-action="cancel-trade-confirm" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full sm:w-auto">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">${tradeConfirmCopy.cancelLabel}</span>
                        </button>
                        <button data-action="confirm-trade" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-6 w-full sm:w-auto">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">${tradeConfirmCopy.submitLabel}</span>
                        </button>
                      </div>
                    </div>
                  </div>
          `;
        }

        if (state.requestedRefuseConfirmOpen) {
          html += `
                  <div class="fixed inset-0 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-fadeInModal" style="z-index: 220;">
                    <div class="bg-[#f0e6d2] w-full max-w-sm rounded-sm shadow-2xl border border-orange-900/30 p-5 sm:p-7 text-center" style="background-image: ${PARCHMENT_TEXTURE}">
                      <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-5 magic-text-glow">ほんとにいいですか？</h3>
                      <div class="flex flex-col gap-2 sm:gap-3 justify-center">
                        <button data-action="cancel-requested-refuse-confirm" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">考え直す</span>
                        </button>
                        <button data-action="confirm-requested-refuse" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-6 w-full">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">やはり断る</span>
                        </button>
                      </div>
                    </div>
                  </div>
          `;
        }

        if (state.secondPassConfirmOpen) {
          html += `
                  <div class="fixed inset-0 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-fadeInModal" style="z-index: 220;">
                    <div class="bg-[#f0e6d2] w-full max-w-sm rounded-sm shadow-2xl border border-orange-900/30 p-5 sm:p-7 text-center" style="background-image: ${PARCHMENT_TEXTURE}">
                      <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-3 magic-text-glow">本当に見送りますか？</h3>
                      <p class="text-xs sm:text-sm font-serif font-bold text-stone-700 mb-5 leading-loose">この旅で交換を見送れるのは一度だけです。</p>
                      <div class="flex flex-col gap-2 sm:gap-3 justify-center">
                        <button data-action="cancel-second-pass-confirm" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">考え直す</span>
                        </button>
                        <button data-action="confirm-second-pass" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-6 w-full">
                          <div class="wood-texture"></div>
                          <span class="relative z-10 flex items-center justify-center">見送る</span>
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
                    
                    <div class="result-confirm-card-wrap flex justify-center mb-6 scale-90 origin-top">
                      ${renderCardHTML(state.confirmingCard, { isReadOnly: true, customStyle: state.isResultConfirmSettling ? 'animate-finalDecisionGlow' : '' })}
                    </div>

                    <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                      <button data-action="confirm-no" class="wood-btn wood-btn-light rounded-sm transition-all text-sm font-serif font-bold py-2 sm:py-3 px-6 w-full sm:w-auto">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">選び直す</span>
                      </button>
                      <button data-action="confirm-yes" ${state.isResultConfirmSettling ? 'disabled' : ''} class="wood-btn wood-btn-dark rounded-sm transition-all text-sm tracking-widest font-serif font-bold py-2 sm:py-3 px-8 w-full sm:w-auto">
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
                    <img src="${BG_FAREWELL_DOOR_IMG}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${BG_FAREWELL_DOOR_POSITION}; transform: scale(${BG_FAREWELL_DOOR_ZOOM}); transform-origin: ${BG_FAREWELL_DOOR_POSITION};" />
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
                      <img src="${BG_FAREWELL_DOOR_IMG}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${BG_FAREWELL_DOOR_POSITION}; transform: scale(${BG_FAREWELL_DOOR_ZOOM}); transform-origin: ${BG_FAREWELL_DOOR_POSITION};" />
                    </div>
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>

                    <p class="text-stone-800 mb-10 sm:mb-12 font-serif text-sm sm:text-base font-bold w-full text-center relative z-10">これがあなたが18歳の自分に持たせる<br class="sm:hidden" />「5つの役割」です。</p>
                    
                    <div class="flex flex-col items-center w-full mt-2 mb-2 relative z-10">
                      
                      <div class="flex justify-center gap-6 sm:gap-16 z-10 mb-8 sm:mb-10 w-full mt-2 sm:mt-3">
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
                      Q. なぜ、お主は【${state.primaryCard?.name}】を一番大切な役割として残したのじゃ？
                    </p>
                    <p class="font-extrabold text-sm sm:text-base mb-2 text-stone-800 bg-[#e8dcc4]/70 py-4 px-3 sm:px-4 rounded-sm border border-stone-300/50 shadow-sm leading-relaxed">
                      <span class="text-orange-900 mr-2 text-[10px] sm:text-xs tracking-widest border-b border-orange-900/30 pb-0.5 block mb-2 w-fit">リフレムからの問い</span>
                      Q. そこに「自分らしくない」と感じるカードがあるなら、それでも残した理由はなんじゃろうな…？
                    </p>
                    <p class="font-extrabold text-sm sm:text-base mb-2 text-stone-800 bg-[#e8dcc4]/70 py-4 px-3 sm:px-4 rounded-sm border border-stone-300/50 shadow-sm leading-relaxed">
                      <span class="text-blue-900 mr-2 text-[10px] sm:text-xs tracking-widest border-b border-blue-900/30 pb-0.5 block mb-2 w-fit">ハルカからの問い</span>
                      Q. この5つの役割を持ったあなたは、これからどんな未来へ歩いていきたいですか？
                    </p>
                  </div>

                  <section class="real-tavern-message relative z-10 max-w-2xl mx-auto mt-6 sm:mt-10 text-left font-serif">
                    <div class="real-tavern-message-inner">
                      <p class="real-tavern-kicker">ここからは、現実の酒場へ</p>
                      <h3>互いの物語を語り合う時間です。</h3>
                      <p>さあ、ここからは現実の酒場での時間です。これから出会う旅人たちに、あなたがなぜそのカードを残したのか伝えてみてください。</p>
                      <p>そして、他の旅人たちがなぜその役割を選んだのか、そのわけにも耳を傾けてみましょう。互いの物語を語り合うことで、新しい関係性の扉が開くはずです。</p>
                    </div>
                  </section>

                  <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-12 relative z-10 w-full px-2 sm:px-4">
                    <button data-action="save-role-pdf" class="w-full sm:w-auto wood-btn wood-btn-dark rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center tracking-widest text-xs sm:text-sm font-bold py-3 sm:py-4 px-4 sm:px-8">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('FileText', "w-4 h-4 sm:w-5 sm:h-5 mr-2")} 選んだRoleを保存する。
                      </span>
                    </button>
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
                      もう一度やり直す
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

      if (state.gameState === 'PLAYING' && !(isFinalShopRound(state.round) && (state.finalShopGuideStep || 0) < 3)) {
        let exchangeBtnHTML = '';
        if (state.waitingAfterTrade) {
          exchangeBtnHTML = '';
        } else if (isShopTime) {
          exchangeBtnHTML = `
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button data-action="trade-shop" ${!state.selectedHandCard || !state.selectedShopCard || state.isExchanging || state.waitingAfterTrade ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8 ${state.isExchanging ? 'animate-magicAura' : ''}">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('RefreshCw', "w-4 h-4 mr-1.5 sm:mr-3 shrink-0 " + (state.isExchanging ? 'animate-spin' : ''))}
                        ${state.isExchanging ? '入れ替え中...' : (state.selectedHandCard && state.selectedShopCard ? '役割を入れ替える' : '手札と場から1枚ずつ選ぶ')}
                      </span>
                    </button>
                    ${isFinalShopRound(state.round) ? `
                      <button data-action="skip-trade" ${state.isExchanging || state.waitingAfterTrade ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">この5枚のまま進む</span>
                      </button>
                    ` : ''}
                  </div>
          `;
        } else if (isForcedReplacementChoosing) {
          exchangeBtnHTML = `
                  <button data-action="second-forced-replacement" ${!state.selectedShopCard || state.isExchanging || state.waitingAfterTrade ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-10 ${state.isExchanging ? 'animate-magicAura' : ''}">
                    <div class="wood-texture"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      ${getIcon('RefreshCw', "w-4 h-4 mr-1.5 sm:mr-3 shrink-0 " + (state.isExchanging ? 'animate-spin' : ''))}
                      ${state.isExchanging ? '受け取り中...' : (state.selectedShopCard ? 'この役割を受け取る' : '受け取る役割を一つ選ぶ')}
                    </span>
                  </button>
          `;
        } else if (isRequestedHandTraveler) {
          exchangeBtnHTML = '';
        } else {
          const selectedOfferCount = isSecondDoubleTrade ? (state.selectedShopCards || []).length : (state.selectedShopCard ? 1 : 0);
          const selectedHandCount = isSecondDoubleTrade ? (state.selectedHandCards || []).length : (state.selectedHandCard ? 1 : 0);
          const needsTravelerOfferSelection = isSecondDoubleTrade
            ? selectedOfferCount < doubleTradeCount
            : isTwoCardTravelerOffer && !state.selectedShopCard;
          const needsTravelerHandSelection = isSecondDoubleTrade
            ? selectedHandCount < doubleTradeCount
            : !state.selectedHandCard;
          exchangeBtnHTML = `
                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button data-action="trade-offer" ${needsTravelerHandSelection || needsTravelerOfferSelection || state.isExchanging || state.waitingAfterTrade ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-10 ${state.isExchanging ? 'animate-magicAura' : ''}">
                      <div class="wood-texture"></div>
                      <span class="relative z-10 flex items-center justify-center">
                        ${getIcon('RefreshCw', "w-4 h-4 mr-1.5 sm:mr-3 shrink-0 " + (state.isExchanging ? 'animate-spin' : ''))}
                        ${state.isExchanging ? '入れ替え中...' : (isSecondDoubleTrade ? (selectedHandCount >= doubleTradeCount && selectedOfferCount >= doubleTradeCount ? '2枚を入れ替える' : '提示と手札から2枚ずつ選ぶ') : (isTwoCardTravelerOffer ? (state.selectedHandCard && state.selectedShopCard ? '役割を入れ替える' : '提示と手札から1枚ずつ選ぶ') : (state.selectedHandCard ? '選んだ手札を渡す' : '渡す手札を1枚選んでください')))}
                      </span>
                    </button>
                    ${canSecondPassTrade ? `
                      <button data-action="second-pass-trade" ${state.isExchanging || state.waitingAfterTrade ? 'disabled' : ''} class="w-full sm:w-auto wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8">
                        <div class="wood-texture"></div>
                        <span class="relative z-10 flex items-center justify-center">この交換を見送る</span>
                      </button>
                    ` : ''}
                  </div>
          `;
        }

        const dockGuideHTML = isSecondDoubleTrade && (state.selectedShopCards || []).length > 0 && !isForcedReplacementChoosing
          ? '<p class="selection-guide-label selection-guide-label-dock">交換するカードを二つ選ぶ</p>'
          : (isInitialExchange || isTwoCardTravelerOffer) && state.selectedShopCard && !isForcedReplacementChoosing
          ? '<p class="selection-guide-label selection-guide-label-dock">交換するカードを一つ選ぶ</p>'
          : '';

        /* ▼▼ 変更箇所: ドックの背景色を明るくし、木目を活かす ▼▼ */
        html += `
          <div id="dock-stage" class="fixed bottom-0 left-0 w-full shadow-[0_-10px_50px_rgba(0,0,0,0.6)] border-t-2 border-stone-800 z-50 ${stageFadeClass} ${state.tradeConfirmOpen || state.secondPassConfirmOpen ? 'opacity-0 pointer-events-none' : ''}" style="background-image: url('https://ninin-cc.github.io/img/rt/mokuzai.jpg'); background-size: cover; background-position: center bottom;">
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

      if (typeof applyRoleTradeRendererFrame === 'function') {
        html = applyRoleTradeRendererFrame(html, {
          layoutMode,
          pageLabel,
          gameState: state.gameState,
          round: state.round,
          state
        });
      }

      root.innerHTML = html;
      
      state.isTransitioning = false;
      saveJourneyProgress();
      scheduleRulesAutoAdvance();
      scheduleSceneDialogueAutoAdvance();
    }

    let sceneDialogueAutoAdvanceTimer = null;
    const DIALOGUE_AUTO_ADVANCE_MS = 2500;

    function clearSceneDialogueAutoAdvance() {
      if (sceneDialogueAutoAdvanceTimer) {
        clearTimeout(sceneDialogueAutoAdvanceTimer);
        sceneDialogueAutoAdvanceTimer = null;
      }
    }

    function startInitialCardReview() {
      if (state.gameState !== 'INITIAL_HAND' || !state.initialHandReviewArmed || state.initialHandReviewComplete || state.initialHandReviewGathering) return;
      state.initialHandReviewGathering = true;
      state.initialHandReviewReturning = false;
      render();
      setTimeout(() => {
        if (state.gameState !== 'INITIAL_HAND') return;
        state.initialHandReviewGathering = false;
        state.initialHandReviewIndex = 0;
        render();
      }, EXPERIENCE_TIMING.initialCardGatherMs);
    }

    function advanceInitialCardReview() {
      if (state.gameState !== 'INITIAL_HAND' || state.initialHandReviewReturning || state.initialHandReviewIndex < 0) return;
      state.initialHandReviewReturning = true;
      const isFinalInitialReviewCard = state.initialHandReviewIndex >= state.hand.length - 1;
      render();
      setTimeout(() => {
        if (state.gameState !== 'INITIAL_HAND') return;
        if (state.initialHandReviewIndex < state.hand.length - 1) {
          state.initialHandReviewIndex += 1;
          state.initialHandReviewReturning = false;
        } else {
          state.initialHandReviewIndex = -1;
          state.initialHandReviewReturning = false;
          state.initialHandReviewComplete = true;
          state.initialHandPostReviewStep = 0;
        }
        render();
      }, isFinalInitialReviewCard ? EXPERIENCE_TIMING.initialCardReviewFinalReturnMs : EXPERIENCE_TIMING.initialCardReviewAdvanceMs);
    }

    function getSceneDialogueAutoAdvanceAction() {
      const pageLabel = getPageLabel();
      if (pageLabel === '5' && state.gameState === 'LEAVE_SHOP_1' && state.leaveShopDialogueStep < LEAVE_SHOP_DIALOGUE_BLOCKS.length - 1) {
        return advanceSceneDialogue;
      }
      if (pageLabel === '6' && state.gameState === 'BEFORE_TAVERN' && state.beforeTavernDialogueStep < BEFORE_TAVERN_DIALOGUE_BLOCKS.length - 1) {
        return advanceSceneDialogue;
      }
      if (pageLabel === '3-2' && state.gameState === 'INITIAL_HAND') {
        if (
          state.initialHandReviewArmed &&
          !state.initialHandReviewComplete &&
          !state.initialHandReviewGathering &&
          !state.initialHandReviewReturning &&
          state.initialHandReviewIndex < 0
        ) {
          return startInitialCardReview;
        }
        if (
          state.initialHandReviewIndex >= 0 &&
          state.initialHandReviewIndex < state.hand.length - 1 &&
          !state.initialHandReviewReturning
        ) {
          return advanceInitialCardReview;
        }
      }
      return null;
    }

    function scheduleSceneDialogueAutoAdvance() {
      clearSceneDialogueAutoAdvance();
      const autoAction = getSceneDialogueAutoAdvanceAction();
      if (!autoAction) return;
      sceneDialogueAutoAdvanceTimer = setTimeout(() => {
        sceneDialogueAutoAdvanceTimer = null;
        const latestAction = getSceneDialogueAutoAdvanceAction();
        if (latestAction) latestAction();
      }, DIALOGUE_AUTO_ADVANCE_MS);
    }

    function advanceSceneDialogue() {
      const sceneConfig = state.gameState === 'INITIAL_HAND'
        ? (state.initialHandReviewComplete
          ? { key: 'initialHandPostReviewStep', blocks: INITIAL_HAND_POST_REVIEW_BLOCKS }
          : { key: 'initialHandDialogueStep', blocks: INITIAL_HAND_DIALOGUE_BLOCKS })
        : state.gameState === 'LEAVE_SHOP_1'
          ? { key: 'leaveShopDialogueStep', blocks: LEAVE_SHOP_DIALOGUE_BLOCKS }
          : state.gameState === 'BEFORE_TAVERN'
            ? { key: 'beforeTavernDialogueStep', blocks: BEFORE_TAVERN_DIALOGUE_BLOCKS }
            : null;
      if (!sceneConfig) return;
      state[sceneConfig.key] = Math.min(sceneConfig.blocks.length - 1, state[sceneConfig.key] + 1);
      if (state.gameState === 'INITIAL_HAND' && state[sceneConfig.key] >= sceneConfig.blocks.length - 1 && !state.initialHandReviewComplete) {
        state.initialHandReviewArmed = true;
      }
      render();
    }

    function clearRulesAutoAdvance() {
      if (rulesAutoAdvanceTimer) {
        clearTimeout(rulesAutoAdvanceTimer);
        rulesAutoAdvanceTimer = null;
      }
    }

    function clearRulesIntroReveal() {
      if (rulesIntroRevealTimer) {
        clearTimeout(rulesIntroRevealTimer);
        rulesIntroRevealTimer = null;
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

      const nextCue = document.querySelector('.rules-next-cue');
      if (nextCue) {
        const isSceneComplete = isRulesExplanationComplete();
        const isFinalRulesCue = state.rulesExplanationPhase === 'details' && isSceneComplete;
        nextCue.classList.toggle('rules-next-cue-final', isSceneComplete);
        nextCue.setAttribute('aria-label', isSceneComplete ? '次へ進む' : '次の言葉へ進む');
        nextCue.innerHTML = isSceneComplete
          ? (isFinalRulesCue ? '<span class="rules-next-text">次に進む</span><span class="rules-next-play">▶</span>' : '<span class="rules-next-play">▶</span>')
          : '<span class="rules-next-arrow">▼</span>';
      }
    }

    function setRulesExplanationStep(nextStep) {
      const maxStep = getActiveRulesBlocks().length - 1;
      state.rulesExplanationStep = Math.max(0, Math.min(maxStep, nextStep));
      syncRulesExplanationDom();
      scheduleRulesAutoAdvance();
    }

    function scheduleRulesAutoAdvance() {
      clearRulesAutoAdvance();
      if (state.gameState !== 'RULES') return;
      const autoAdvancePages = ['2-2', '2-3', '2-4'];
      if (!autoAdvancePages.includes(getPageLabel()) || isRulesExplanationComplete()) return;
      rulesAutoAdvanceTimer = setTimeout(() => {
        rulesAutoAdvanceTimer = null;
        if (state.gameState === 'RULES' && autoAdvancePages.includes(getPageLabel()) && !isRulesExplanationComplete()) {
          advanceRulesExplanation();
        }
      }, DIALOGUE_AUTO_ADVANCE_MS);
    }

    function revealRulesIntroFirstBlock() {
      clearRulesIntroReveal();
      rulesIntroRevealTimer = setTimeout(() => {
        rulesIntroRevealTimer = null;
        if (
          state.gameState === 'RULES' &&
          state.rulesExplanationPhase === 'guide' &&
          (state.rulesGuideScene || 0) === 0 &&
          state.rulesExplanationStep < 0
        ) {
          setRulesExplanationStep(0);
        }
      }, 240);
    }

    function openRulesScene() {
      transitionState(() => {
        state.rulesExplanationPhase = 'guide';
        state.rulesExplanationStep = -1;
        state.rulesGuideScene = 0;
        state.gameState = 'RULES';
        revealRulesIntroFirstBlock();
      });
    }

    function advanceRulesExplanation() {
      if (!isRulesExplanationComplete()) {
        setRulesExplanationStep(state.rulesExplanationStep + 1);
        return;
      }

      clearRulesAutoAdvance();
      clearRulesIntroReveal();
      if (hasNextRulesGuideScene()) {
        transitionState(() => {
          state.rulesGuideScene = (state.rulesGuideScene || 0) + 1;
          state.rulesExplanationStep = 0;
        });
        return;
      }

      if (state.rulesExplanationPhase === 'guide') {
        transitionState(() => {
          state.rulesExplanationPhase = 'details';
          state.rulesExplanationStep = 0;
          state.rulesGuideScene = 0;
        });
        return;
      }

      transitionState(() => { startGame({ journeyMode: state.journeyMode || 'first' }); });
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
      }, EXPERIENCE_TIMING.initialHandJourneyDelayMs);
    }

    // --- Event Listeners ---
    document.addEventListener('input', (e) => {
      const input = e.target.closest('[data-reflection-key]');
      if (!input) return;
      state.reflectionAnswers = state.reflectionAnswers || { primary: '', dissonance: '', future: '' };
      state.reflectionAnswers[input.dataset.reflectionKey] = input.value;
      saveJourneyProgress();
      saveResultHistoryRecord();
    });

    document.addEventListener('click', (e) => {
      let btn = e.target.closest('[data-action]');
      if (!btn) {
        const wideClickArea = e.target.closest('.character-dialogue-body, .route-dialogue-panel, .trade-dialogue-surface, .initial-hand-cards-click-area');
        if (wideClickArea) {
          btn = wideClickArea.querySelector('.manual-next-cursor[data-action], .dialogue-inline-next-cue[data-action]');
          if (!btn && wideClickArea.classList.contains('initial-hand-cards-click-area')) {
            btn = document.querySelector('.initial-hand-dialogue-panel .manual-next-cursor[data-action], .initial-hand-dialogue-panel .dialogue-inline-next-cue[data-action]');
          }
        }
      }
      if (!btn) return;
      const action = btn.dataset.action;

      if (action === 'dev-jump') {
        if (!IS_DEV_MODE) return;
        jumpToDevPage(btn.dataset.page);
      } else if (action === 'go-rules') {
        state.journeyMode = 'first';
        window.ROLETRADE_ACTIVE_JOURNEY = 'first';
        openRulesScene();
      } else if (action === 'open-history') {
        state.historyRecordView = null;
        transitionState(() => { state.gameState = 'HISTORY'; });
      } else if (action === 'history-back-start') {
        state.historyRecordView = null;
        transitionState(() => { state.gameState = 'START'; });
      } else if (action === 'open-history-record') {
        const record = getResultHistoryRecord(btn.dataset.id);
        state.historyRecordView = record;
        transitionState(() => { state.gameState = 'HISTORY_RESULT'; });
      } else if (action === 'back-history-list') {
        state.historyRecordView = null;
        transitionState(() => { state.gameState = 'HISTORY'; });
      } else if (action === 'start-fresh-journey') {
        if (hasSavedJourneyProgress()) {
          state.startResetConfirmOpen = true;
          render();
        } else {
          beginFreshJourney();
        }
      } else if (action === 'cancel-start-fresh') {
        state.startResetConfirmOpen = false;
        render();
      } else if (action === 'confirm-start-fresh') {
        beginFreshJourney();
      } else if (action === 'continue-journey') {
        restoreJourneyProgress();
      } else if (action === 'advance-rules') {
        advanceRulesExplanation();
      } else if (action === 'advance-scene-dialogue') {
        advanceSceneDialogue();
      } else if (action === 'start-initial-card-review') {
        startInitialCardReview();
      } else if (action === 'advance-initial-card-review') {
        advanceInitialCardReview();
      } else if (action === 'advance-final-shop-guide') {
        transitionState(() => {
          const guideLength = 3;
          state.finalShopGuideStep = Math.min((state.finalShopGuideStep || 0) + 1, guideLength);
        });
      } else if (action === 'toggle-trisetsu') {
        state.isTrisetsuOpen = !state.isTrisetsuOpen;
        render();
      } else if (action === 'close-trisetsu') {
        state.isTrisetsuOpen = false;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (action === 'go-start') {
        transitionState(() => {
          state.journeyMode = 'first';
          window.ROLETRADE_ACTIVE_JOURNEY = 'first';
          state.gameState = 'START';
        });
      } else if (action === 'start-game') {
        transitionState(() => { startGame(); });
      } else if (action === 'go-playing') {
        if (state.gameState === 'INITIAL_HAND') {
          if (state.initialHandDialogueStep < INITIAL_HAND_DIALOGUE_BLOCKS.length - 1 || !state.initialHandReviewComplete) return;
          beginInitialHandJourney();
        } else {
          if (state.gameState === 'BEFORE_TAVERN' && state.beforeTavernDialogueStep < BEFORE_TAVERN_DIALOGUE_BLOCKS.length - 1) return;
          transitionState(() => { 
            state.selectedHandCard = null; // 遷移時に選択状態をリセット
            state.gameState = 'PLAYING'; 
          });
        }
      } else if (action === 'go-before-tavern') {
        if (state.leaveShopDialogueStep < LEAVE_SHOP_DIALOGUE_BLOCKS.length - 1) return;
        transitionState(() => {
          clearExitDepartureTimer();
          state.exitToTavernAnimating = false;
          state.exitDepartureCueVisible = false;
          state.exitHotspotSpeaker = '';
          state.exitHotspotMessage = '';
          state.gameState = 'EXIT_TO_TAVERN';
        });
      } else if (action === 'start-exit-to-tavern') {
        if (state.gameState !== 'EXIT_TO_TAVERN' || state.exitToTavernAnimating || state.exitDepartureCueVisible) return;
        clearExitDepartureTimer();
        state.exitDepartureCueVisible = true;
        state.exitHotspotSpeaker = '';
        state.exitHotspotMessage = '';
        render();
        exitDepartureTimer = setTimeout(() => {
          exitDepartureTimer = null;
          if (state.gameState !== 'EXIT_TO_TAVERN' || !state.exitDepartureCueVisible) return;
          state.exitDepartureCueVisible = false;
          state.exitToTavernAnimating = true;
          render();
          scheduleExitToTavernAdvance();
        }, 1900);
      } else if (action === 'exit-hotspot-dialogue') {
        if (state.gameState !== 'EXIT_TO_TAVERN' || state.exitToTavernAnimating || state.exitDepartureCueVisible) return;
        const speaker = btn.dataset.speaker === 'haruka' ? 'haruka' : 'refrem';
        state.exitHotspotSpeaker = speaker;
        state.exitHotspotMessage = chooseExitHotspotLine(speaker);
        render();
      } else if (action === 'select-hand') {
        if (state.waitingAfterTrade) return;
        if (isForcedTakeRound(state.round) && state.forcedTakePhase === 'choose') return;
        if (isSecondDoubleTradeRound(state.round)) {
          const id = parseInt(btn.dataset.id);
          const card = CARDS_BY_ID.get(id);
          if (!card) return;
          const current = state.selectedHandCards || [];
          const exists = current.some(selectedCard => selectedCard.id === id);
          state.selectedHandCards = exists
            ? current.filter(selectedCard => selectedCard.id !== id)
            : (current.length >= getSecondDoubleTradeCount() ? current : current.concat(card));
          state.selectedHandCard = state.selectedHandCards[0] || null;
          renderSoon();
          return;
        }
        if (state.requestedHandCard) {
          state.selectedHandCard = state.requestedHandCard;
          renderSoon();
          return;
        }
        const id = parseInt(btn.dataset.id);
        const card = CARDS_BY_ID.get(id);
        state.selectedHandCard = (state.selectedHandCard?.id === id) ? null : card;
        renderSoon();
      } else if (action === 'select-shop') {
        if (state.waitingAfterTrade) return;
        if (isSecondDoubleTradeRound(state.round)) {
          const id = parseInt(btn.dataset.id);
          const card = CARDS_BY_ID.get(id);
          if (!card) return;
          const current = state.selectedShopCards || [];
          const exists = current.some(selectedCard => selectedCard.id === id);
          state.selectedShopCards = exists
            ? current.filter(selectedCard => selectedCard.id !== id)
            : (current.length >= getSecondDoubleTradeCount() ? current : current.concat(card));
          state.selectedShopCard = state.selectedShopCards[0] || null;
          renderSoon();
          return;
        }
        const id = parseInt(btn.dataset.id);
        const card = CARDS_BY_ID.get(id);
        state.selectedShopCard = (state.selectedShopCard?.id === id) ? null : card;
        renderSoon();
      } else if (action === 'trade-shop') {
        if (state.waitingAfterTrade) return;
        state.tradeConfirmOpen = true;
        renderSoon();
      } else if (action === 'confirm-trade') {
        if (state.requestedTradeConfirmOpen) {
          if (window.RoleTradeTradeEngine) window.RoleTradeTradeEngine.resetTradeConfirm(state);
          else {
            state.tradeConfirmOpen = false;
            state.requestedTradeConfirmOpen = false;
          }
          handleRequestedTravelerTrade();
          return;
        }
        state.tradeConfirmOpen = false;
        if (isSecondDoubleTradeRound(state.round)) {
          handleSecondDoubleTravelerTrade();
          return;
        }
        const isCurrentShopTime = state.shopRounds.includes(state.round);
        if (state.selectedShopCard && isCurrentShopTime) {
          if (isFinalShopRound(state.round)) {
            state.pendingTradeAction = 'trade';
            transitionState(() => {
              state.shopConfirmDialogueStep = 0;
              state.gameState = 'SHOP_CONFIRM';
            });
          } else {
            handleShopTrade();
          }
        } else {
          handleTrade();
        }
      } else if (action === 'cancel-trade-confirm') {
        if (window.RoleTradeTradeEngine) window.RoleTradeTradeEngine.resetTradeConfirm(state);
        else {
          state.tradeConfirmOpen = false;
          state.requestedTradeConfirmOpen = false;
        }
        renderSoon();
      } else if (action === 'advance-shop-confirm-dialogue') {
        if (state.gameState !== 'SHOP_CONFIRM') return;
        state.shopConfirmDialogueStep = Math.min(SHOP_CONFIRM_DIALOGUE_BLOCKS.length - 1, state.shopConfirmDialogueStep + 1);
        renderSoon();
      } else if (action === 'trade-offer') {
        if (state.waitingAfterTrade) return;
        state.tradeConfirmOpen = true;
        renderSoon();
      } else if (action === 'second-forced-claim') {
        handleSecondForcedTakeClaim();
      } else if (action === 'second-forced-pull') {
        handleSecondForcedTakePull();
      } else if (action === 'second-forced-replacement') {
        handleSecondForcedReplacement();
      } else if (action === 'accept-requested-trade') {
        const opened = window.RoleTradeTradeEngine
          ? window.RoleTradeTradeEngine.openRequestedTradeConfirm(state)
          : false;
        if (!opened) {
          if (!state.requestedHandCard || !state.tradeOfferCard || state.isExchanging || state.waitingAfterTrade) return;
          state.selectedHandCard = state.requestedHandCard;
          state.requestedTradeConfirmOpen = true;
          state.tradeConfirmOpen = true;
        }
        renderSoon();
      } else if (action === 'refuse-requested-trade') {
        if (!state.requestedHandCard || state.isExchanging || state.waitingAfterTrade) return;
        state.requestedRefuseConfirmOpen = true;
        renderSoon();
      } else if (action === 'cancel-requested-refuse-confirm') {
        state.requestedRefuseConfirmOpen = false;
        renderSoon();
      } else if (action === 'confirm-requested-refuse') {
        state.requestedRefuseConfirmOpen = false;
        refuseRequestedTravelerTrade();
      } else if (action === 'continue-after-trade') {
        const pending = state.pendingAfterTrade;
        if (!pending) return;
        transitionState(() => {
          proceedToNextRound(pending.hand, pending.shop, pending.deck);
        });
      } else if (action === 'second-pass-trade') {
        const currentIsShopTime = state.shopRounds.includes(state.round);
        if (state.journeyMode !== 'second' || state.secondPassUsed || state.isExchanging || state.waitingAfterTrade || currentIsShopTime || isForcedTakeRound(state.round)) return;
        state.secondPassConfirmOpen = true;
        renderSoon();
      } else if (action === 'cancel-second-pass-confirm') {
        state.secondPassConfirmOpen = false;
        renderSoon();
      } else if (action === 'confirm-second-pass') {
        const currentIsShopTime = state.shopRounds.includes(state.round);
        if (state.journeyMode !== 'second' || state.secondPassUsed || state.isExchanging || state.waitingAfterTrade || currentIsShopTime || isForcedTakeRound(state.round)) return;
        const passOfferIds = new Set((state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : [state.tradeOfferCard].filter(Boolean)).map(card => card.id));
        const nextDeckAfterPass = state.deck.filter(card => !passOfferIds.has(card.id));
        transitionState(() => {
          state.secondPassConfirmOpen = false;
          state.secondPassUsed = true;
          proceedToNextRound(state.hand, state.shop, nextDeckAfterPass);
        });
      } else if (action === 'skip-trade') {
        if (isFinalShopRound(state.round)) {
          state.pendingTradeAction = 'skip';
          transitionState(() => {
            state.shopConfirmDialogueStep = 0;
            state.gameState = 'SHOP_CONFIRM';
          });
        } else {
          transitionState(() => {
            proceedToNextRound(state.hand, state.shop, state.deck);
          });
        }
      } else if (action === 'confirm-journey-yes') {
        if (state.pendingTradeAction === 'trade') {
          transitionState(() => {
            const releasedCard = state.selectedHandCard;
            const receivedCard = state.selectedShopCard;
            state.hand = state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
            rememberTradeHistory(releasedCard, receivedCard, 'final-shop');
            state.isExchanging = false;
            state.selectedHandCard = null;
            state.selectedShopCard = null;
            
            state.farewellMessage = getRandomFarewellMessage();
            state.gameState = 'SHOP_FAREWELL';
          });
        } else {
          transitionState(() => {
            state.selectedHandCard = null;
            state.selectedShopCard = null;
            state.pendingTradeAction = null;
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
        const card = CARDS_BY_ID.get(id);
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
      } else if (action === 'save-role-pdf') {
        handleSaveRolePdf();
      } else if (action === 'capture-save') {
        handleSave();
      } else if (action === 'close-tutorial') {
        state.showTutorial = false;
        renderSoon();
      } else if (action === 'close-iab-modal') {
        state.isAppBrowser = false;
        renderSoon();
      }
    });

    window.RoleTradeMainJourney = {
      getMode() {
        return state.journeyMode || 'first';
      },
      startSecondJourney() {
        state.journeyMode = 'second';
        window.ROLETRADE_ACTIVE_JOURNEY = 'second';
        openRulesScene();
      },
      startFirstJourney() {
        transitionState(() => {
          startGame({ journeyMode: 'first' });
        });
      }
    };

    // 起動時のIABチェック実行
    checkAppBrowser();

    if (typeof setupRoleTradeLayout === 'function') {
      setupRoleTradeLayout(renderSoon);
    }

    // Initial render
    if (IS_DEV_MODE && DEV_INITIAL_PAGE) {
      jumpToDevPage(DEV_INITIAL_PAGE, false);
    } else {
      render();
    }
    preloadSceneImages();

