(function (ns) {
  const copy = window.ROLETRADE_SECOND_COPY || {};
  let renderingSecond = false;
  let observer = null;

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function cardById(id) {
    return ns.state.getCardById(id);
  }

  function globalValue(name, fallback) {
    try {
      if (typeof window[name] !== "undefined") return window[name];
      return Function("fallback", "try { return typeof " + name + " !== 'undefined' ? " + name + " : fallback; } catch (e) { return fallback; }")(fallback);
    } catch (error) {
      return fallback;
    }
  }

  function icon(name, className) {
    try {
      return typeof getIcon === "function" ? getIcon(name, className) : "";
    } catch (error) {
      return "";
    }
  }

  function parchment() {
    return globalValue("PARCHMENT_TEXTURE", "none");
  }

  function cardHTML(card, options) {
    if (!card) return "";
    const opts = Object.assign({}, options || {}, {
      hideFooter: options && Object.prototype.hasOwnProperty.call(options, "hideFooter") ? options.hideFooter : true,
      customStyle: ((options && options.customStyle) || "") + " second-journey-card"
    });
    if (typeof renderCardHTML === "function") return renderCardHTML(card, opts);
    return '<div class="second-fallback-card">' + escapeHTML(card.name) + '</div>';
  }

  function cardButton(card, action, selected, extraClass) {
    return `
      <button type="button" class="second-card-button ${extraClass || ""}${selected ? " second-card-button-picked" : ""}" data-second-action="${escapeHTML(action)}" data-id="${escapeHTML(card.id)}" aria-pressed="${selected ? "true" : "false"}">
        ${cardHTML(card, { isReadOnly: true, isSelected: selected, customStyle: selected ? " second-card-picked" : "" })}
      </button>
    `;
  }

  function offerCardButton(card, action, selected, wrapperClass, cardStyle) {
    return `
      <button type="button" class="second-card-button ${wrapperClass || ""}${selected ? " second-card-button-picked" : ""}" data-second-action="${escapeHTML(action)}" data-id="${escapeHTML(card.id)}" aria-pressed="${selected ? "true" : "false"}">
        ${cardHTML(card, { isSelected: selected, isShopCard: true, customStyle: cardStyle || "" })}
      </button>
    `;
  }

  function handCardButton(card, action, selected, wrapperClass, cardStyle) {
    return `
      <button type="button" class="second-card-button ${wrapperClass || ""}${selected ? " second-card-button-picked" : ""}" data-second-action="${escapeHTML(action)}" data-id="${escapeHTML(card.id)}" aria-pressed="${selected ? "true" : "false"}">
        ${cardHTML(card, { isSelected: selected, isHandCard: true, customStyle: cardStyle || "" })}
      </button>
    `;
  }

  function resultCardButton(card, action, selected, disabled) {
    return `
      <button type="button" class="second-card-button shrink-0 transition-transform duration-500 ${selected ? " second-card-button-picked" : ""} ${disabled ? "opacity-40 grayscale pointer-events-none" : ""}" data-second-action="${escapeHTML(action)}" data-id="${escapeHTML(card.id)}" aria-pressed="${selected ? "true" : "false"}" ${disabled ? "disabled" : ""}>
        ${cardHTML(card, { isReadOnly: true, isSelected: selected, disabled, isResultCard: true, hideFooter: false })}
      </button>
    `;
  }

  function blocks(lines) {
    return (lines || []).map((line) => '<div class="rules-guide-block"><p>' + escapeHTML(line) + '</p></div>').join("");
  }

  function layoutClass() {
    const layout = document.documentElement.dataset.roletradeLayout || (window.innerWidth < 768 ? "mobile" : "desktop");
    return layout === "mobile" ? "layout-mobile" : "layout-desktop";
  }

  function sceneShell(body, page, options) {
    const opts = options || {};
    const bg = opts.bg || "./roletrade_ichimaie.jpg";
    const bgPosition = opts.bgPosition || "56% center";
    const bgOpacity = opts.bgOpacity || "0.28";
    const bgZoom = opts.bgZoom || "1";
    const stageFadeClass = "animate-fadeIn";
    return `
      <div class="second-journey roletrade-app-frame ${layoutClass()} min-h-screen text-stone-900 font-sans flex justify-center transition-colors duration-1000 overflow-x-hidden relative pt-2.5 sm:pt-6 lg:pt-8" data-journey-mode="second" data-second-page="${escapeHTML(page || "")}" style="background-image: linear-gradient(rgba(232,220,196,.28), rgba(232,220,196,.62)), url('${escapeHTML(bg)}'); background-size: cover; background-position: ${escapeHTML(bgPosition)};">
        <div id="main-stage" class="w-full flex justify-center ${stageFadeClass}">
          <div class="w-full max-w-4xl relative z-10 px-2 pt-2 ${opts.dock ? "pb-[260px] sm:pb-[230px] sm:p-4 sm:pt-4 md:p-5 md:pt-5" : "pb-4 sm:p-4 sm:pt-8 md:p-8 md:pt-10"}">
            ${body}
            <div class="second-page-label">Second Journey ${escapeHTML(page || "")}</div>
          </div>
        </div>
      </div>
    `;
  }

  function guideCard(scene, isLast, action) {
    const isHaruka = scene.speaker === "haruka";
    const avatar = isHaruka ? globalValue("HARUKA_AVATAR", "./roletrade_ichimaie.jpg") : globalValue("REFREM_AVATAR", "./roletrade_ichimaie.jpg");
    const position = isHaruka ? globalValue("HARUKA_CROP_POSITION", "62% 32%") : globalValue("REFREM_CROP_POSITION", "42% 29%");
    const zoom = isHaruka ? globalValue("HARUKA_SCENE_ZOOM", "2.2") : "none";
    const origin = isHaruka ? globalValue("HARUKA_SCENE_ORIGIN", "62% 32%") : "center";
    return `
      <button type="button" data-second-action="${escapeHTML(action)}" class="relative block w-full text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent h-[455px] sm:h-[594px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-800 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0e6d2] transition-colors duration-300" style="background-image: ${parchment()}">
        <div class="absolute ${isHaruka ? "right-0" : "left-0"} top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to ${isHaruka ? "left" : "right"}, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to ${isHaruka ? "left" : "right"}, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
          <img src="${escapeHTML(avatar)}" alt="${isHaruka ? "ハルカ" : "リフレム"}" class="w-full h-full object-cover" style="object-position: ${escapeHTML(position)}; transform: ${isHaruka ? "scale(" + zoom + ")" : "none"}; transform-origin: ${escapeHTML(origin)};" />
        </div>
        <div class="absolute inset-0 ${isHaruka ? "dialog-wash-translucent" : "dialog-wash-translucent-rules-left"} z-10 pointer-events-none"></div>
        <div class="character-dialogue-body ${isHaruka ? "character-dialogue-body-haruka" : "character-dialogue-body-refrem"} relative z-20 p-4 sm:p-8 h-full flex flex-col justify-center text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
          <div class="space-y-2 sm:space-y-3">
            ${blocks(scene.body)}
          </div>
          <p class="rules-next-cue ${isLast ? "rules-next-cue-final" : ""}" aria-label="${isLast ? "次へ進む" : "次の言葉へ進む"}">
            ${isLast ? '<span class="rules-next-text">' + escapeHTML(scene.next || copy.introNext) + '</span><span class="rules-next-play">▶</span>' : '<span class="rules-next-arrow">▼</span>'}
          </p>
        </div>
      </button>
    `;
  }

  function renderIntro(state) {
    const scenes = copy.introScenes || [];
    const scene = scenes[state.introStep] || { speaker: "refrem", title: copy.introTitle, body: copy.introBody || [], next: copy.introNext };
    const isLast = state.introStep >= scenes.length - 1;
    return sceneShell(`
      <div class="p-2 sm:p-8 relative z-10">
        <div class="max-w-2xl mx-auto">
          <div class="bg-[#f0e6d2]/90 backdrop-blur-sm rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 text-center shadow-[0_0_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0" style="background-image: ${parchment()}">
            <div class="absolute inset-0 z-0 pointer-events-none">
              <img src="./roletrade_ichimaie.jpg" alt="" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 52% center;" />
            </div>
            ${guideCard(scene, isLast, isLast ? "start-initial" : "advance-intro")}
          </div>
        </div>
      </div>
    `, "2", { bg: "./roletrade_ichimaie.jpg", bgPosition: "52% center" });
  }

  function renderInitial(state) {
    const top = state.hand.slice(0, 3).map((card, index) =>
      '<div class="initial-hand-display-card initial-hand-card initial-hand-slot-' + (index + 1) + ' initial-hand-card-' + (index + 1) + '">' + cardHTML(card, { isReadOnly: true, customStyle: "initial-hand-card-size" }) + '</div>'
    ).join("");
    const bottom = state.hand.slice(3, 5).map((card, index) =>
      '<div class="initial-hand-display-card initial-hand-card initial-hand-slot-' + (index + 4) + ' initial-hand-card-' + (index + 4) + '">' + cardHTML(card, { isReadOnly: true, customStyle: "initial-hand-card-size" }) + '</div>'
    ).join("");
    return sceneShell(`
      <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="./roletrade_ichimaie.jpg" alt="" class="w-full h-full object-cover opacity-[0.28] mix-blend-multiply" style="object-position: 56% center;" />
        </div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
        <div class="initial-hand-dialogue-panel relative text-left text-xs sm:text-sm md:text-base leading-relaxed font-serif font-medium rounded-sm border border-stone-400/50 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] z-10 mb-5 sm:mb-10 overflow-hidden bg-[#e8dcc4] dialog-panel-translucent min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
          <div class="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[42%] z-0" style="mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);">
            <img src="${escapeHTML(globalValue("HARUKA_AVATAR", "./roletrade_ichimaie.jpg"))}" alt="ハルカ" class="w-full h-full object-cover" style="object-position: ${escapeHTML(globalValue("HARUKA_CROP_POSITION", "62% 32%"))}; transform: scale(${escapeHTML(globalValue("HARUKA_SCENE_ZOOM", "2.2"))}); transform-origin: ${escapeHTML(globalValue("HARUKA_SCENE_ORIGIN", "62% 32%"))};" />
          </div>
          <div class="absolute inset-0 dialog-wash-translucent bg-gradient-to-r from-[#e8dcc4] 48%, rgba(232, 220, 196, 0.82) 68%, transparent 100% z-10 pointer-events-none"></div>
          <div class="character-dialogue-body relative z-20 p-3 sm:p-8 w-[50%] max-w-[190px] sm:w-[66%] sm:max-w-none ml-4 sm:ml-8 mr-auto space-y-1.5 sm:space-y-2 text-stone-900 font-extrabold drop-shadow-sm text-glow-soft">
            ${blocks([copy.initialTitle, copy.initialBody])}
            <button type="button" data-second-action="enter-travelers" class="dialogue-inline-next-cue mt-4" aria-label="${escapeHTML(copy.initialNext)}"><span>${escapeHTML(copy.initialNext)}</span><span class="rules-next-play">▶</span></button>
          </div>
        </div>
        <div class="initial-hand-cards-click-area flex flex-col items-center gap-3 sm:gap-4 w-full relative z-10">
          <div class="flex justify-center gap-2 sm:gap-4 w-full">${top}</div>
          <div class="flex justify-center gap-2 sm:gap-4 w-full">${bottom}</div>
        </div>
      </div>
    `, "3", { bg: "./roletrade_ichimaie.jpg", bgPosition: "56% center" });
  }

  function travelerProfile(index) {
    return {
      avatar: "./machi.jpg",
      position: "center center",
      place: "酒場",
      icon: "ArrowRightLeft"
    };
  }

  function selectedSummary(state) {
    const offer = cardById(state.selectedOfferId);
    const hand = cardById(state.selectedHandId);
    if (!offer || !hand) {
      return '<p class="selection-guide-label mt-2">受け取るカードと、手放すカードを一枚ずつ選ぶ</p>';
    }
    return '<p class="selection-guide-label mt-2">受け取るカード：' + escapeHTML(offer.name) + '　/　手放すカード：' + escapeHTML(hand.name) + '</p>';
  }

  function offerStack(cards, state, action) {
    return `
      <div class="traveler-offer-stack">
        ${(cards || []).map((card, index) => {
          const selected = state.selectedOfferId === card.id;
          const count = cards.length;
          const stackClass = "traveler-offer-stack-card traveler-offer-stack-card-" + count + "-" + index + (selected ? " is-selected" : "");
          const cardStyle = "!w-[84px] !h-[119px] sm:!w-24 sm:!h-36 " + (state.isExchanging && selected ? "animate-fly-down " : "");
          return offerCardButton(card, action || "select-offer", selected, stackClass, cardStyle);
        }).join("")}
      </div>
    `;
  }

  function renderDock(state, actionsHTML) {
    const handCards = state.hand.map((card, index) => {
      const selected = state.selectedHandId === card.id;
      let edgeAdjustment = "";
      if (selected) {
        if (index === 0) edgeAdjustment = " origin-bottom-left translate-x-4 sm:translate-x-6";
        else if (index === state.hand.length - 1) edgeAdjustment = " origin-bottom-right -translate-x-4 sm:-translate-x-6";
      }
      const classes = "second-dock-card shrink-0 transition-all duration-500 relative " + (index > 0 ? "-ml-8 sm:ml-2 " : "") + (selected ? "z-[100]" : "z-10") + edgeAdjustment;
      const cardStyle = state.isExchanging && selected ? "animate-fly-up " : "";
      return handCardButton(card, "select-hand", selected, classes, cardStyle);
    }).join("");
    return `
      <div id="dock-stage" class="fixed bottom-0 left-0 w-full shadow-[0_-10px_50px_rgba(0,0,0,0.6)] border-t-2 border-stone-800 z-50 transition-opacity duration-500 ${state.tradeConfirmOpen ? "opacity-0 pointer-events-none" : ""}" style="background-image: url('https://ninin-cc.github.io/img/rt/mokuzai.jpg'); background-size: cover; background-position: center bottom;">
        <div class="absolute inset-0 bg-stone-900/45 pointer-events-none"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <p class="selection-guide-label mb-1 text-center">あなたの手札</p>
          <div class="flex justify-center gap-0 sm:gap-4">${handCards}</div>
          <div class="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 sm:gap-3 mt-2">
            ${actionsHTML}
          </div>
        </div>
      </div>
    `;
  }

  function renderTradeConfirmModal(state) {
    if (!state.tradeConfirmOpen || !state.selectedHandId || !state.selectedOfferId) return "";
    const receive = cardById(state.selectedOfferId);
    const release = cardById(state.selectedHandId);
    if (!receive || !release) return "";
    return `
      <div class="fixed inset-0 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm animate-fadeInModal" style="z-index: 220;">
        <div class="bg-[#f0e6d2] w-full max-w-lg rounded-sm shadow-2xl border border-orange-900/30 p-4 sm:p-6 text-center" style="background-image: ${parchment()}">
          <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-2 magic-text-glow">これでいいですか？</h3>
          <p class="text-xs sm:text-sm font-serif font-bold text-stone-700 mb-4">選んだ2枚を交換します。</p>
          <div class="grid grid-cols-2 gap-3 sm:gap-5 items-start mb-5">
            <div class="trade-card-direction-column trade-card-direction-column-receive flex flex-col items-center gap-2">
              <p class="trade-card-direction-label trade-card-direction-label-receive text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-orange-800">受け取るカード▼</p>
              <div class="scale-[0.86] sm:scale-95 origin-top">
                ${cardHTML(receive, { isReadOnly: true, customStyle: "shadow-lg" })}
              </div>
            </div>
            <div class="trade-card-direction-column trade-card-direction-column-release flex flex-col items-center gap-2">
              <p class="trade-card-direction-label trade-card-direction-label-release text-[11px] sm:text-xs font-serif font-extrabold tracking-widest text-stone-700">▲手放すカード</p>
              <div class="scale-[0.86] sm:scale-95 origin-top">
                ${cardHTML(release, { isReadOnly: true, customStyle: "shadow-lg" })}
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button type="button" data-second-action="cancel-trade-confirm" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-5 w-full sm:w-auto">
              <div class="wood-texture"></div>
              <span class="relative z-10 flex items-center justify-center">${escapeHTML(copy.labels.chooseAgain || "選び直す")}</span>
            </button>
            <button type="button" data-second-action="commit-trade" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-xs sm:text-sm tracking-widest font-serif font-bold py-2.5 px-6 w-full sm:w-auto">
              <div class="wood-texture"></div>
              <span class="relative z-10 flex items-center justify-center">${escapeHTML(copy.labels.exchange || "交換する")}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTraveler(state) {
    const traveler = copy.normalTravelers[state.currentTravelerIndex] || copy.normalTravelers[1];
    const profile = Object.assign(travelerProfile(state.currentTravelerIndex), {
      avatar: state.tradeAvatarImg || travelerProfile(state.currentTravelerIndex).avatar,
      position: "center center"
    });
    const offers = state.offersByTraveler[state.currentTravelerIndex] || [];
    const canPass = !state.passUsed && (window.ROLETRADE_SECOND_CONFIG.passableTravelers || []).indexOf(state.currentTravelerIndex) >= 0;
    const exchangeDisabled = !(state.selectedOfferId && state.selectedHandId) || state.isExchanging;
    const actions = `
      <button type="button" data-second-action="confirm-trade" ${exchangeDisabled ? "disabled" : ""} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-10 ${exchangeDisabled ? "opacity-45 grayscale cursor-not-allowed" : ""}">
        <div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">${escapeHTML(state.isExchanging ? "入れ替え中..." : (copy.labels.exchange || "交換する"))}</span>
      </button>
      ${canPass ? '<button type="button" data-second-action="open-pass-confirm" ' + (state.isExchanging ? "disabled" : "") + ' class="w-full sm:w-auto wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8 ' + (state.isExchanging ? "opacity-45 grayscale cursor-not-allowed" : "") + '"><div class="wood-texture"></div><span class="relative z-10 flex items-center justify-center">' + escapeHTML(copy.labels.pass) + '</span></button>' : ""}
    `;
    return sceneShell(`
      <div class="bg-[#f0e6d2]/80 backdrop-blur-sm rounded-sm border border-stone-400/80 shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="https://ninin-cc.github.io/img/rt/bar.jpg" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
        </div>
        <div class="p-2 sm:p-5 relative z-10">
          <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4 max-w-[31rem] sm:max-w-[34rem] mx-auto w-full items-start">
            <div class="flex flex-col items-center shrink-0 z-10 w-full">
              <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                <img src="${escapeHTML(profile.avatar)}" alt="旅人" class="w-full h-full object-cover" style="object-position: ${escapeHTML(profile.position)};" />
              </div>
              <div class="mt-1 sm:mt-2 text-center w-full">
                <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] dialog-meta-top px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.currentTravelerIndex}</span> / 4</div>
                <div class="flex items-center justify-center gap-0.5 font-bold text-[9px] sm:text-[10px] bg-[#e8dcc4] dialog-meta-bottom px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm text-blue-900 leading-tight">${icon(profile.icon, "w-2.5 h-2.5 text-blue-700")} ${escapeHTML(profile.place)}</div>
              </div>
            </div>
            <div class="second-trade-marker trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-2.5 sm:p-3 rounded-md border border-stone-400/60 shadow-md min-w-0 flex flex-col items-center gap-2 sm:gap-2.5" style="background-image: ${parchment()}">
              <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
              <p class="dialogue-text-unified requested-trade-message self-stretch text-[10.5px] sm:text-sm text-stone-900 font-serif font-bold leading-relaxed sm:leading-loose text-left">${escapeHTML(state.tradeMessage || traveler.speech)}</p>
              <div class="w-full flex flex-col items-center pt-2 sm:pt-2.5 border-t border-stone-400/35">
                <p class="selection-guide-label mb-1.5 sm:mb-2">ここから一つ選ぶ</p>
                ${offerStack(offers, state, "select-offer")}
              </div>
              ${selectedSummary(state)}
              <p class="second-pass-status">${escapeHTML(state.passUsed ? copy.passUsed : copy.passRemaining)}</p>
            </div>
          </div>
        </div>
      </div>
      ${renderDock(state, actions)}
      ${renderTradeConfirmModal(state)}
    `, String(3 + state.currentTravelerIndex), { bg: "https://ninin-cc.github.io/img/rt/bar.jpg", bgPosition: "center center", dock: true });
  }

  function renderAfterTrade(state) {
    const profile = Object.assign(travelerProfile(state.afterTradeCurrentTravelerIndex || state.afterTradeNextTravelerIndex || state.currentTravelerIndex || 1), {
      avatar: state.tradeAvatarImg || travelerProfile(1).avatar,
      position: "center center"
    });
    const cue = state.afterTradeNextTravelerIndex >= 4 ? "灯火の間へ戻る" : "次の旅人と話す";
    return sceneShell(`
      <div class="bg-[#f0e6d2]/80 backdrop-blur-sm rounded-sm border border-stone-400/80 shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="https://ninin-cc.github.io/img/rt/bar.jpg" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" />
        </div>
        <div class="p-2 sm:p-5 relative z-10">
          <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4 max-w-[31rem] sm:max-w-[34rem] mx-auto w-full items-start">
            <div class="flex flex-col items-center shrink-0 z-10 w-full">
              <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200">
                <img src="${escapeHTML(profile.avatar)}" alt="旅人" class="w-full h-full object-cover" style="object-position: ${escapeHTML(profile.position)};" />
              </div>
            </div>
            <div class="trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-3 sm:p-4 rounded-md border border-stone-400/60 shadow-md min-w-0" style="background-image: ${parchment()}">
              <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
              <p class="dialogue-text-unified text-[12px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left"><span class="after-trade-typewriter" style="--typewriter-steps: ${(state.afterTradeMessage || "").length}; --typewriter-duration: ${Math.max(1.4, ((state.afterTradeMessage || "").length || 18) * 0.075)}s;">${escapeHTML(state.afterTradeMessage || "")}</span></p>
              <button type="button" data-second-action="continue-after-trade-second" class="dialogue-inline-next-cue mt-3" aria-label="${escapeHTML(cue)}"><span>${escapeHTML(cue)}</span><span class="rules-next-play">▶</span></button>
            </div>
          </div>
        </div>
      </div>
      ${renderDock(state, "")}
    `, "after", { bg: "https://ninin-cc.github.io/img/rt/bar.jpg", bgPosition: "center center", dock: true });
  }

  function renderPassConfirm(state) {
    return sceneShell(`
      <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4" style="background-image: ${parchment()}">
        <h2 class="text-xl sm:text-2xl font-serif font-extrabold mb-5 tracking-widest text-stone-900 magic-text-glow">この出会いを見送りますか？</h2>
        <p class="text-sm sm:text-base font-serif font-bold leading-loose text-stone-800">手札は変わらず、この旅で使える見送りはここで失われます。</p>
        <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-sm font-serif font-bold py-3 px-8" data-second-action="cancel-pass"><div class="wood-texture"></div><span class="relative z-10">${escapeHTML(copy.labels.cancel)}</span></button>
          <button type="button" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-sm font-serif font-bold py-3 px-8" data-second-action="confirm-pass"><div class="wood-texture"></div><span class="relative z-10">${escapeHTML(copy.labels.confirmPass)}</span></button>
        </div>
      </div>
    `, "pass", { bg: "https://ninin-cc.github.io/img/rt/bar.jpg", bgPosition: "center center" });
  }

  function renderThirdTake(state) {
    const taken = cardById(state.takenByThirdTravelerId);
    const speech = (copy.forcedTraveler.speechTemplate || "").replace("{{cardName}}", taken ? taken.name : "");
    const phase = state.forcedTakePhase || "claim";
    const isSelectedPhase = phase === "selected" || phase === "pulling";
    const nextAction = isSelectedPhase ? "third-pull" : "third-next";
    const nextText = isSelectedPhase ? (copy.forcedTraveler.pullCue || "……") : (copy.forcedTraveler.next || "それをもらうぜ");
    const profile = {
      avatar: state.tradeAvatarImg || travelerProfile(3).avatar,
      position: "center center",
      place: "酒場",
      icon: "ArrowRightLeft"
    };
    return sceneShell(`
      <div class="bg-[#f0e6d2]/80 backdrop-blur-sm rounded-sm border border-stone-400/80 shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0">
        <div class="absolute inset-0 z-0 pointer-events-none"><img src="https://ninin-cc.github.io/img/rt/bar.jpg" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" /></div>
        <div class="p-2 sm:p-5 relative z-10">
          <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[6rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4 max-w-[31rem] sm:max-w-[34rem] mx-auto w-full items-start">
            <div class="flex flex-col items-center shrink-0 z-10 w-full">
              <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200"><img src="${escapeHTML(profile.avatar)}" alt="旅人" class="w-full h-full object-cover" style="object-position: ${escapeHTML(profile.position)};" /></div>
              <div class="mt-1 sm:mt-2 text-center w-full">
                <div class="text-stone-700 tracking-widest text-[9px] sm:text-[10px] font-bold bg-[#f4ebd8] dialog-meta-top px-1 py-0.5 rounded-t-sm border-t border-x border-stone-400/60 shadow-sm leading-tight">R <span class="text-stone-900 font-extrabold text-[10px] sm:text-xs">${state.currentTravelerIndex || 4}</span> / 4</div>
                <div class="flex items-center justify-center gap-0.5 font-bold text-[9px] sm:text-[10px] bg-[#e8dcc4] dialog-meta-bottom px-1 py-1 rounded-b-sm border border-stone-400/60 shadow-sm text-blue-900 leading-tight">${icon(profile.icon, "w-2.5 h-2.5 text-blue-700")} ${escapeHTML(profile.place)}</div>
              </div>
            </div>
            <div class="trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-2.5 sm:p-4 rounded-md border border-stone-400/60 shadow-md min-w-0 flex flex-col items-center gap-3" style="background-image: ${parchment()}">
              <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
              <p class="dialogue-text-unified requested-trade-message self-stretch text-[12px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left">${escapeHTML(speech).replace(/\n/g, "<br>")}</p>
              ${isSelectedPhase && taken ? '<p class="selection-guide-label mt-1">手札の「' + escapeHTML(taken.name) + '」が選ばれています</p>' : ''}
              <button type="button" data-second-action="${escapeHTML(nextAction)}" ${state.isExchanging ? "disabled" : ""} class="dialogue-inline-next-cue mt-2 ${state.isExchanging ? "opacity-50 pointer-events-none" : ""}"><span>${escapeHTML(nextText)}</span><span class="rules-next-play">▶</span></button>
            </div>
          </div>
        </div>
      </div>
      ${renderDock(state, "")}
    `, "6", { bg: "https://ninin-cc.github.io/img/rt/bar.jpg", bgPosition: "center center", dock: true });
  }

  function renderThirdChoose(state) {
    return sceneShell(`
      <div class="bg-[#f0e6d2]/80 backdrop-blur-sm rounded-sm border border-stone-400/80 shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0">
        <div class="absolute inset-0 z-0 pointer-events-none"><img src="https://ninin-cc.github.io/img/rt/bar.jpg" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" /></div>
        <div class="p-3 sm:p-8 relative z-10">
          <div class="trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-4 sm:p-6 rounded-md border border-stone-400/60 shadow-md max-w-2xl mx-auto" style="background-image: ${parchment()}">
            <h2 class="text-lg sm:text-xl font-serif font-extrabold tracking-widest text-stone-900 mb-3">${escapeHTML(copy.forcedTraveler.chooseTitle)}</h2>
            <p class="dialogue-text-unified text-[12px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left">${escapeHTML(copy.forcedTraveler.chooseBody)}</p>
            <p class="selection-guide-label mb-2 mt-4">ここから一つ選ぶ</p>
            <div class="flex justify-center flex-wrap gap-2 sm:gap-4">${state.thirdReplacementCandidates.map((card) => cardButton(card, "choose-third-replacement", false)).join("")}</div>
          </div>
        </div>
      </div>
      ${renderDock(state, "")}
    `, "7", { bg: "https://ninin-cc.github.io/img/rt/bar.jpg", bgPosition: "center center", dock: true });
  }

  function renderRefrem(state) {
    const exchangeDisabled = !(state.selectedOfferId && state.selectedHandId) || state.isExchanging;
    const actions = `
      <button type="button" data-second-action="confirm-trade" ${exchangeDisabled ? "disabled" : ""} class="w-full sm:w-auto wood-btn wood-btn-dark rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-10 ${exchangeDisabled ? "opacity-45 grayscale cursor-not-allowed" : ""}">
        <div class="wood-texture"></div><span class="relative z-10">${escapeHTML(state.isExchanging ? "入れ替え中..." : (copy.labels.exchange || "交換する"))}</span>
      </button>
      <button type="button" data-second-action="keep-refrem" ${state.isExchanging ? "disabled" : ""} class="w-full sm:w-auto wood-btn wood-btn-light rounded-sm transition-all duration-300 flex items-center justify-center tracking-widest text-[11px] sm:text-sm font-serif font-bold py-2.5 sm:py-3 px-4 sm:px-8 ${state.isExchanging ? "opacity-45 grayscale cursor-not-allowed" : ""}"><div class="wood-texture"></div><span class="relative z-10">${escapeHTML(copy.refrem.keep)}</span></button>
    `;
    return sceneShell(`
      <div class="second-refrem-layout bg-[#f0e6d2]/80 backdrop-blur-sm rounded-sm border border-stone-400/80 shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-0">
        <div class="absolute inset-0 z-0 pointer-events-none"><img src="./roletrade_ichimaie.jpg" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: 52% center;" /></div>
        <div class="p-3 sm:p-8 relative z-10">
          <div class="flex items-start max-w-2xl mx-auto w-full mb-4 sm:mb-8 px-1 sm:px-0">
            <div class="flex flex-col items-center shrink-0 z-10 w-16 sm:w-28">
              <div class="w-full aspect-[3/4] rounded-md border-2 border-stone-400 shadow-md overflow-hidden bg-stone-200"><img src="${escapeHTML(globalValue("REFREM_AVATAR", "./roletrade_ichimaie.jpg"))}" alt="リフレム" class="w-full h-full object-cover" style="object-position: ${escapeHTML(globalValue("REFREM_CROP_POSITION", "42% 29%"))}; transform: scale(2.25); transform-origin: 42% 29%;" /></div>
            </div>
            <div class="character-dialogue-surface trade-dialogue-surface relative bg-[#f4ebd8] dialog-surface-translucent p-2.5 sm:p-6 rounded-md border border-stone-400/60 shadow-md flex-1 ml-2 sm:ml-6 mt-0" style="background-image: ${parchment()}">
              <div class="absolute top-4 sm:top-6 -left-[6px] w-3 h-3 bg-[#f4ebd8] dialog-tail-translucent border-l border-b border-stone-400/60 transform rotate-45"></div>
              <div class="dialogue-text-unified text-[11px] sm:text-sm text-stone-900 font-serif font-bold leading-loose text-left space-y-1 sm:space-y-2"><p>${escapeHTML(copy.refrem.speech)}</p></div>
            </div>
          </div>
          <p class="selection-guide-label mb-2">ここから一つ選ぶ</p>
          <div class="flex justify-center flex-wrap gap-2 sm:gap-4">${state.refremCandidates.map((card) => cardButton(card, "select-offer", state.selectedOfferId === card.id)).join("")}</div>
          ${selectedSummary(state)}
        </div>
      </div>
      ${renderDock(state, actions)}
      ${renderTradeConfirmModal(state)}
    `, "8", { bg: "./roletrade_ichimaie.jpg", bgPosition: "52% center", dock: true });
  }

  function renderResultSelect(state, secondary) {
    const confirmingCard = cardById(state.confirmingCardId);
    const action = secondary ? "select-secondary" : "select-primary";
    const top = state.hand.slice(0, 3).map((card) => {
      const selected = card.id === state.primaryCardId || card.id === state.secondaryCardId;
      const disabled = secondary && card.id === state.primaryCardId;
      return resultCardButton(card, action, selected, disabled);
    }).join("");
    const bottom = state.hand.slice(3, 5).map((card) => {
      const selected = card.id === state.primaryCardId || card.id === state.secondaryCardId;
      const disabled = secondary && card.id === state.primaryCardId;
      return resultCardButton(card, action, selected, disabled);
    }).join("");
    return sceneShell(`
      <div class="bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4" style="background-image: ${parchment()}">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <img src="${escapeHTML(globalValue("BG_FAREWELL_DOOR_IMG", "./machi.jpg"))}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${escapeHTML(globalValue("BG_FAREWELL_DOOR_POSITION", "66% center"))}; transform: scale(${escapeHTML(globalValue("BG_FAREWELL_DOOR_ZOOM", "2"))}); transform-origin: ${escapeHTML(globalValue("BG_FAREWELL_DOOR_POSITION", "66% center"))};" />
        </div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"></div>
        <div class="py-2 sm:py-4 px-2 flex flex-col items-center relative z-10">
          <h2 class="text-2xl sm:text-3xl font-serif font-extrabold mb-4 sm:mb-6 tracking-widest text-stone-900 magic-text-glow">
            ${secondary ? "第二の役割" : "第一の役割"}
          </h2>
          <p class="text-stone-800 mb-5 sm:mb-8 font-serif text-sm sm:text-base font-bold w-full text-center px-4 bg-[#e8dcc4]/80 py-4 rounded-sm border border-stone-300 whitespace-pre-line">${secondary ? "次に、【二番目に大事にしたい役割】を1つ選んでください。" : "5つの役割が確定しました。<br/>この中で【一番大事にしたい役割】を1つ選んでください。"}</p>

          ${secondary ? `
            <button type="button" data-second-action="result-reset" class="mb-4 sm:mb-6 flex items-center text-stone-600 hover:text-stone-900 font-serif font-bold text-xs sm:text-sm transition-colors border-b border-stone-400 hover:border-stone-800 pb-1">
              ${icon("ChevronLeft", "w-4 h-4 mr-1")} 一番大事な役割から選び直す
            </button>
          ` : ""}

          <div class="flex flex-col items-center gap-2 sm:gap-4 w-full">
            <div class="flex justify-center gap-2 sm:gap-4 w-full">${top}</div>
            <div class="flex justify-center gap-2 sm:gap-4 w-full">${bottom}</div>
          </div>
        </div>
      </div>
      ${confirmingCard ? `
        <div class="fixed inset-0 z-[200] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm ${state.isConfirmModalClosing ? "animate-fadeOutModal" : "animate-fadeInModal"}">
          <div class="bg-[#f0e6d2] p-6 sm:p-8 rounded-sm shadow-2xl max-w-sm w-[90%] text-center border border-orange-900/30" style="background-image: ${parchment()}">
            <h3 class="text-lg sm:text-xl font-serif font-extrabold text-stone-900 mb-4 magic-text-glow">【 最終確認 】</h3>
            <p class="text-sm sm:text-base text-stone-800 font-serif font-bold leading-loose mb-4">
              「${escapeHTML(confirmingCard.name)}」を<br/>
              <span class="text-orange-700 text-lg">${secondary ? "二番目" : "一番"}</span> に大事な役割としますか？
            </p>
            <div class="result-confirm-card-wrap flex justify-center mb-6 scale-90 origin-top">
              ${cardHTML(confirmingCard, { isReadOnly: true, hideFooter: false, customStyle: state.isResultConfirmSettling ? "animate-finalDecisionGlow" : "" })}
            </div>
            <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button type="button" data-second-action="confirm-result-no" class="wood-btn wood-btn-light rounded-sm transition-all text-sm font-serif font-bold py-2 sm:py-3 px-6 w-full sm:w-auto">
                <div class="wood-texture"></div>
                <span class="relative z-10 flex items-center justify-center">選び直す</span>
              </button>
              <button type="button" data-second-action="confirm-result-yes" ${state.isResultConfirmSettling ? "disabled" : ""} class="wood-btn wood-btn-dark rounded-sm transition-all text-sm tracking-widest font-serif font-bold py-2 sm:py-3 px-8 w-full sm:w-auto">
                <div class="wood-texture"></div>
                <span class="relative z-10 flex items-center justify-center">決定する</span>
              </button>
            </div>
          </div>
        </div>
      ` : ""}
    `, secondary ? "10" : "9", { bg: "./roletrade_ichimaie.jpg", bgPosition: "52% center" });
  }

  function renderFinal(state) {
    const primary = cardById(state.primaryCardId);
    const secondary = cardById(state.secondaryCardId);
    return sceneShell(`
      <div class="second-final-panel bg-[#f0e6d2]/95 backdrop-blur-md rounded-sm border border-stone-400/80 px-4 py-5 sm:p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(124,45,18,0.3)] relative overflow-hidden mt-0 sm:mt-4" style="background-image: ${parchment()}">
        <div class="absolute inset-0 z-0 pointer-events-none"><img src="${escapeHTML(globalValue("BG_FAREWELL_DOOR_IMG", "./machi.jpg"))}" alt="" class="w-full h-full object-cover opacity-[0.25] mix-blend-multiply" style="object-position: ${escapeHTML(globalValue("BG_FAREWELL_DOOR_POSITION", "66% center"))}; transform: scale(${escapeHTML(globalValue("BG_FAREWELL_DOOR_ZOOM", "2"))}); transform-origin: ${escapeHTML(globalValue("BG_FAREWELL_DOOR_POSITION", "66% center"))};" /></div>
        <div class="relative z-10">
          <h2 class="text-xl sm:text-2xl font-serif font-extrabold mb-4 tracking-widest text-stone-900 magic-text-glow">${escapeHTML(copy.result.finalLead)}</h2>
          <div class="text-sm sm:text-base font-serif font-bold leading-loose text-stone-800 mb-5 bg-[#f4ebd8]/70 border border-stone-400/50 rounded-sm p-4 inline-block text-left">
            <p>一番大切な役割：<strong>${escapeHTML(primary ? primary.name : "")}</strong></p>
            <p>次に大切な役割：<strong>${escapeHTML(secondary ? secondary.name : "")}</strong></p>
          </div>
          <div class="flex justify-center flex-wrap gap-2 sm:gap-4 mb-6">${state.hand.map((card) => cardHTML(card, { isReadOnly: true, glow: card.id === state.primaryCardId || card.id === state.secondaryCardId })).join("")}</div>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" data-second-action="restart-second" class="wood-btn wood-btn-light rounded-sm transition-all duration-300 text-sm font-serif font-bold py-3 px-8"><div class="wood-texture"></div><span class="relative z-10">${escapeHTML(copy.result.restart)}</span></button>
            <button type="button" data-second-action="return-top" class="wood-btn wood-btn-dark rounded-sm transition-all duration-300 text-sm font-serif font-bold py-3 px-8"><div class="wood-texture"></div><span class="relative z-10">${escapeHTML(copy.result.top)}</span></button>
          </div>
        </div>
      </div>
    `, "11", { bg: globalValue("BG_FAREWELL_DOOR_IMG", "./machi.jpg"), bgPosition: globalValue("BG_FAREWELL_DOOR_POSITION", "66% center") });
  }

  function renderTopAddon() {
    if (ns.state.data.active) return;
    const root = document.getElementById("root");
    const bodyHosts = Array.from(document.querySelectorAll("body > .second-journey-door-host"));
    bodyHosts.forEach((host) => host.remove());
    let host = root ? root.querySelector(".second-journey-door-host") : null;
    if (!root || !root.querySelector(".start-scene-frame")) {
      if (host) host.remove();
      return;
    }
    if (!host) {
      const container = root.querySelector("#main-stage > div") || (root.querySelector(".start-scene-frame") && root.querySelector(".start-scene-frame").parentElement) || root.firstElementChild;
      if (!container) return;
      host = document.createElement("div");
      host.className = "second-journey-door-host";
      container.appendChild(host);
    }
    const modal = ns.state.data.passwordOpen ? `
      <div class="second-door-modal-backdrop" role="dialog" aria-modal="true" aria-label="${escapeHTML(copy.doorHint)}">
        <div class="second-door-modal">
          <p>${escapeHTML(copy.doorHint)}</p>
          <input data-second-input="password" class="second-door-input" type="text" inputmode="numeric" autocomplete="off" placeholder="${escapeHTML(copy.passwordPlaceholder)}" value="${escapeHTML(ns.state.data.passwordValue)}">
          ${ns.state.data.passwordError ? '<p class="second-door-error">' + escapeHTML(ns.state.data.passwordError) + '</p>' : ""}
          <div class="second-action-row">
            <button type="button" class="second-secondary-btn" data-second-action="close-door">${escapeHTML(copy.passwordCancel)}</button>
            <button type="button" class="second-primary-btn" data-second-action="submit-password">${escapeHTML(copy.passwordSubmit)}</button>
          </div>
        </div>
      </div>
    ` : "";
    host.innerHTML = '<button type="button" class="second-journey-door" data-second-action="open-door" aria-label="' + escapeHTML(copy.doorLabel) + '"><span>' + escapeHTML(copy.doorLabel) + '</span></button>' + modal;
  }

  function renderSecondJourney() {
    const root = document.getElementById("root");
    if (!root) return;
    const doorHost = document.querySelector(".second-journey-door-host");
    if (doorHost) doorHost.remove();
    const state = ns.state.data;
    let html = "";
    if (state.screen === "intro") html = renderIntro(state);
    else if (state.screen === "initial") html = renderInitial(state);
    else if (state.screen === "traveler") html = renderTraveler(state);
    else if (state.screen === "afterTrade") html = renderAfterTrade(state);
    else if (state.screen === "passConfirm") html = renderPassConfirm(state);
    else if (state.screen === "thirdTake") html = renderThirdTake(state);
    else if (state.screen === "thirdChoose") html = renderThirdChoose(state);
    else if (state.screen === "refrem") html = renderRefrem(state);
    else if (state.screen === "resultPrimary") html = renderResultSelect(state, false);
    else if (state.screen === "resultSecondary") html = renderResultSelect(state, true);
    else if (state.screen === "final") html = renderFinal(state);
    renderingSecond = true;
    document.body.dataset.journeyMode = "second";
    root.innerHTML = html;
    window.requestAnimationFrame(() => { renderingSecond = false; });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setupObserver() {
    const root = document.getElementById("root");
    if (!root || observer) return;
    observer = new MutationObserver(() => {
      if (renderingSecond) return;
      if (ns.state.data.active && !root.querySelector(".second-journey")) {
        renderSecondJourney();
      } else {
        renderTopAddon();
      }
    });
    observer.observe(root, { childList: true });
    renderTopAddon();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupObserver);
  } else {
    setupObserver();
  }

  ns.render = { renderSecondJourney, renderTopAddon, escapeHTML };
})(window.RoleTradeSecondJourney = window.RoleTradeSecondJourney || {});
