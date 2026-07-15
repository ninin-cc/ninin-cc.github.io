(function (ns) {
  const config = window.ROLETRADE_SECOND_CONFIG || {};
  const copy = window.ROLETRADE_SECOND_COPY || {};

  function state() {
    return ns.state.data;
  }

  function normalizePassword(value) {
    const raw = String(value == null ? "" : value);
    return (raw.normalize ? raw.normalize("NFKC") : raw).trim();
  }

  function render() {
    if (state().active) ns.render.renderSecondJourney();
    else ns.render.renderTopAddon();
  }

  function globalValue(name, fallback) {
    try {
      if (typeof window[name] !== "undefined") return window[name];
      return Function("fallback", "try { return typeof " + name + " !== 'undefined' ? " + name + " : fallback; } catch (e) { return fallback; }")(fallback);
    } catch (error) {
      return fallback;
    }
  }

  function randomItem(items) {
    const list = (items || []).filter(Boolean);
    if (!list.length) return null;
    return list[ns.cards.randomInt(list.length)];
  }

  function getOfferCount(index) {
    const counts = copy.travelerOfferCounts || {};
    return counts[index] || config.normalOfferCount || 3;
  }

  function makeSecondTradeEncounter(data) {
    if (window.RoleTradeTradeEngine) {
      return window.RoleTradeTradeEngine.makeTradeEncounter({
        usedAvatarImgs: data.usedTradeAvatarImgs || [],
        usedMessages: data.usedTradeMessages || [],
        messageVariants: copy.secondTradeMessageVariants || {}
      });
    }
    let encounter = null;
    try {
      if (typeof getRandomTradeEncounter === "function") {
        encounter = getRandomTradeEncounter(data.usedTradeAvatarImgs || [], data.usedTradeMessages || []);
      }
    } catch (error) {
      encounter = null;
    }
    if (!encounter) {
      const profiles = globalValue("TRADE_AVATAR_PROFILES", []);
      const available = profiles.filter((profile) => !(data.usedTradeAvatarImgs || []).includes(profile.src));
      const profile = randomItem(available.length ? available : profiles) || { src: "./machi.jpg", voice: "male" };
      encounter = { avatarImg: profile.src, voice: profile.voice || "male", message: "" };
    }
    const variants = copy.secondTradeMessageVariants || {};
    const messages = variants[encounter.voice] || variants.male || [];
    const availableMessages = messages.filter((message) => !(data.usedTradeMessages || []).includes(message));
    const message = randomItem(availableMessages.length ? availableMessages : messages) || encounter.message || "";
    return {
      avatarImg: encounter.avatarImg || "./machi.jpg",
      voice: encounter.voice || "male",
      message
    };
  }

  function withOfferCue(message, voice, offerCount) {
    if (window.RoleTradeTradeEngine) return window.RoleTradeTradeEngine.withOfferCue(message, voice, offerCount);
    try {
      if (typeof withTravelerOfferCue === "function") return withTravelerOfferCue(message, voice, offerCount);
    } catch (error) {
      // The local wording keeps the second journey self-contained if the first helper changes.
    }
    const offerLabel = offerCount >= 3 ? "三つ" : (offerCount === 2 ? "二つ" : "一枚");
    if (voice === "youngFemale") return message + " この" + offerLabel + "のどれかと、あなたの一枚を交換してほしいな。";
    if (voice === "olderMale") return message + " この" + offerLabel + "のどれかと、おぬしの一枚を交換してくれ。";
    return message + " この" + offerLabel + "のどれかと、君の一枚を交換してくれ。";
  }

  function startSecondJourney() {
    if (window.RoleTradeMainJourney && typeof window.RoleTradeMainJourney.startSecondJourney === "function") {
      ns.state.reset();
      render();
      window.RoleTradeMainJourney.startSecondJourney();
      return;
    }
    ns.state.reset();
    ns.state.setActiveSecond();
    render();
  }

  function enterInitial() {
    const hand = ns.cards.createInitialHand();
    ns.state.patch({
      screen: "initial",
      hand,
      initialHandIds: hand.map((card) => card.id),
      currentTravelerIndex: 0,
      selectedOfferId: null,
      selectedHandId: null,
      tradeConfirmOpen: false,
      isExchanging: false
    });
    render();
  }

  function enterTraveler(index) {
    if (index === config.forcedTraveler) {
      enterThirdTraveler();
      return;
    }
    if (index > 4) {
      enterRefrem();
      return;
    }
    const data = state();
    const offersByTraveler = Object.assign({}, data.offersByTraveler);
    if (!offersByTraveler[index]) {
      offersByTraveler[index] = ns.cards.createTravelerCandidates(data.hand, data.takenByThirdTravelerId, getOfferCount(index));
    }
    const encounter = makeSecondTradeEncounter(data);
    const fallbackSpeech = copy.normalTravelers[index] && copy.normalTravelers[index].speech ? copy.normalTravelers[index].speech : "";
    const tradeMessage = withOfferCue(encounter.message || fallbackSpeech, encounter.voice, offersByTraveler[index].length);
    ns.state.patch({
      screen: "traveler",
      currentTravelerIndex: index,
      offersByTraveler,
      selectedOfferId: null,
      selectedHandId: null,
      tradeConfirmOpen: false,
      isExchanging: false,
      tradeAvatarImg: encounter.avatarImg,
      tradeVoice: encounter.voice,
      tradeMessage,
      usedTradeAvatarImgs: data.usedTradeAvatarImgs.concat(encounter.avatarImg),
      usedTradeMessages: data.usedTradeMessages.concat(encounter.message || tradeMessage)
    });
    render();
  }

  function advanceAfterTraveler(index) {
    if (index === 1) enterTraveler(2);
    else if (index === 2) enterTraveler(3);
    else if (index === 3) enterTraveler(4);
    else if (index === 4) enterRefrem();
  }

  function afterTradeMessage(context, receive, release) {
    if (context === "refrem") return "";
    const data = state();
    const variants = copy.secondAfterTradeMessages || {};
    const messages = variants[data.tradeVoice] || variants.male || [];
    const selected = randomItem(messages);
    if (selected) return selected;
    if (context === "traveler1") return "いい交換だったな。そいつを連れて、次へ行ってくれ。";
    if (context === "traveler2") return "ありがとう。あなたの旅にも、この役割が静かに力を貸してくれますように。";
    if (context === "traveler4") return "これで酒場での交換は終わりだ。手元の重さを忘れずに戻るんだな。";
    return "交換は終わった。今の手札を少し眺めてから進もう。";
  }

  function enterThirdTraveler() {
    const data = state();
    const encounter = makeSecondTradeEncounter(data);
    let takenId = data.takenByThirdTravelerId;
    if (!takenId) {
      const taken = ns.cards.selectImportantCard(data.hand, data);
      takenId = taken ? taken.id : null;
    }
    ns.state.patch({
      screen: "thirdTake",
      currentTravelerIndex: config.forcedTraveler || 4,
      takenByThirdTravelerId: takenId,
      forcedTakePhase: "claim",
      selectedOfferId: null,
      selectedHandId: null,
      tradeConfirmOpen: false,
      isExchanging: false,
      tradeAvatarImg: encounter.avatarImg,
      tradeVoice: encounter.voice,
      usedTradeAvatarImgs: data.usedTradeAvatarImgs.concat(encounter.avatarImg),
      usedTradeMessages: data.usedTradeMessages.concat(encounter.message || "")
    });
    render();
  }

  function enterThirdChoose() {
    const data = state();
    const thirdReplacementCandidates = data.thirdReplacementCandidates.length
      ? data.thirdReplacementCandidates
      : ns.cards.createThirdReplacementCandidates(data.hand, data.takenByThirdTravelerId);
    ns.state.patch({ screen: "thirdChoose", thirdReplacementCandidates, isExchanging: false, selectedHandId: null });
    render();
  }

  function markForcedTakeCard() {
    const data = state();
    if (!data.takenByThirdTravelerId || data.isExchanging) return;
    ns.state.patch({
      forcedTakePhase: "selected",
      selectedHandId: data.takenByThirdTravelerId
    });
    render();
  }

  function pullForcedTakeCard() {
    const data = state();
    const takenId = data.takenByThirdTravelerId;
    if (!takenId || data.isExchanging) return;
    ns.state.patch({ forcedTakePhase: "pulling", selectedHandId: takenId, isExchanging: true });
    render();
    const settle = globalValue("EXPERIENCE_TIMING", {}).exchangeSettleMs || 900;
    window.setTimeout(() => {
      const latest = state();
      const hand = latest.hand.filter((card) => card.id !== takenId);
      ns.state.patch({ hand, isExchanging: false, selectedHandId: null });
      enterThirdChoose();
    }, settle);
  }

  function enterRefrem() {
    const data = state();
    const refremCandidates = data.refremCandidates.length
      ? data.refremCandidates
      : ns.cards.createRefremCandidates(data.hand, data.takenByThirdTravelerId);
    ns.state.patch({
      screen: "refrem",
      currentTravelerIndex: 5,
      refremCandidates,
      selectedOfferId: null,
      selectedHandId: null,
      tradeConfirmOpen: false,
      isExchanging: false
    });
    render();
  }

  function commitTrade(context) {
    const data = state();
    const receive = ns.state.getCardById(data.selectedOfferId);
    const release = ns.state.getCardById(data.selectedHandId);
    if (!receive || !release || data.isExchanging) return;
    ns.state.patch({ tradeConfirmOpen: false, isExchanging: true });
    render();
    const timing = globalValue("EXPERIENCE_TIMING", {});
    const settle = timing.exchangeSettleMs || 900;
    window.setTimeout(() => {
      const latest = state();
      const hand = window.RoleTradeTradeEngine
        ? window.RoleTradeTradeEngine.replaceHandCard(latest.hand, release, receive)
        : latest.hand.map((card) => card.id === release.id ? receive : card);
      const histories = latest.histories.concat([{ context, receivedId: receive.id, releasedId: release.id }]);
      const acquiredCardIds = latest.acquiredCardIds.concat(receive.id);
      const releasedCardIds = latest.releasedCardIds.concat(release.id);
      ns.state.patch({
        hand,
        histories,
        acquiredCardIds,
        releasedCardIds,
        selectedOfferId: null,
        selectedHandId: null,
        isExchanging: false
      });
      if (context === "refrem") {
        ns.state.patch({ screen: "resultPrimary" });
        render();
      } else {
        ns.state.patch({
          screen: "afterTrade",
          afterTradeMessage: afterTradeMessage(context, receive, release),
          afterTradeNextTravelerIndex: latest.currentTravelerIndex,
          afterTradeCurrentTravelerIndex: latest.currentTravelerIndex
        });
        render();
      }
    }, settle);
  }

  function chooseThirdReplacement(id) {
    const card = ns.state.getCardById(id);
    if (!card) return;
    const data = state();
    ns.state.patch({
      hand: data.hand.concat(card).slice(0, config.initialHandSize || 5),
      acquiredCardIds: data.acquiredCardIds.concat(card.id),
      histories: data.histories.concat([{ context: "forcedReplacement", receivedId: card.id, releasedId: data.takenByThirdTravelerId }]),
      thirdReplacementCandidates: data.thirdReplacementCandidates,
      selectedOfferId: null,
      selectedHandId: null,
      tradeConfirmOpen: false,
      isExchanging: false
    });
    if ((config.forcedTraveler || 4) >= 4) enterRefrem();
    else enterTraveler((config.forcedTraveler || 3) + 1);
  }

  function focusPasswordInput() {
    const input = document.querySelector("[data-second-input='password']");
    if (!input) return;
    input.focus({ preventScroll: true });
    try {
      const length = input.value.length;
      input.setSelectionRange(length, length);
    } catch (error) {
      // Some numeric keyboard implementations do not support selection ranges.
    }
  }

  function schedulePasswordRefocus() {
    if (!state().passwordOpen) return;
    window.setTimeout(() => {
      if (!state().passwordOpen) return;
      const input = document.querySelector("[data-second-input='password']");
      if (input && document.activeElement !== input) focusPasswordInput();
    }, 90);
  }

  function handleAction(action, target) {
    const data = state();
    if (action === "open-door") {
      ns.state.patch({ passwordOpen: true, passwordError: "" });
      render();
      window.setTimeout(focusPasswordInput, 30);
      return;
    }
    if (action === "close-door") {
      ns.state.patch({ passwordOpen: false, passwordError: "", passwordValue: "" });
      render();
      return;
    }
    if (action === "submit-password") {
      if (normalizePassword(data.passwordValue) === String(config.password || "2")) startSecondJourney();
      else {
        ns.state.patch({ passwordError: copy.passwordError || "まだ扉は開かないようです。" });
        render();
      }
      return;
    }
    if (!data.active) return;
    if (action === "advance-intro") {
      ns.state.patch({ introStep: data.introStep + 1 });
      render();
    } else if (action === "start-initial") enterInitial();
    else if (action === "enter-travelers") enterTraveler(1);
    else if (action === "select-offer") {
      if (data.isExchanging) return;
      ns.state.patch({ selectedOfferId: Number(target.getAttribute("data-id")) });
      render();
    } else if (action === "select-hand") {
      if (data.isExchanging) return;
      ns.state.patch({ selectedHandId: Number(target.getAttribute("data-id")) });
      render();
    } else if (action === "confirm-trade") {
      if (data.tradeConfirmOpen) {
        commitTrade(data.screen === "refrem" ? "refrem" : "traveler" + data.currentTravelerIndex);
        return;
      }
      if (!data.selectedOfferId || !data.selectedHandId || data.isExchanging) return;
      ns.state.patch({ tradeConfirmOpen: true });
      render();
    } else if (action === "cancel-trade-confirm") {
      ns.state.patch({ tradeConfirmOpen: false });
      render();
    } else if (action === "commit-trade") {
      commitTrade(data.screen === "refrem" ? "refrem" : "traveler" + data.currentTravelerIndex);
    } else if (action === "continue-after-trade-second") {
      advanceAfterTraveler(data.afterTradeNextTravelerIndex);
    } else if (action === "open-pass-confirm" && !data.passUsed) {
      ns.state.patch({ screen: "passConfirm" });
      render();
    } else if (action === "cancel-pass") {
      ns.state.patch({ screen: "traveler" });
      render();
    } else if (action === "confirm-pass") {
      ns.state.patch({ passUsed: true, histories: data.histories.concat([{ context: "pass", traveler: data.currentTravelerIndex }]) });
      advanceAfterTraveler(data.currentTravelerIndex);
    } else if (action === "third-next") {
      markForcedTakeCard();
    } else if (action === "third-pull") {
      pullForcedTakeCard();
    } else if (action === "choose-third-replacement") {
      chooseThirdReplacement(Number(target.getAttribute("data-id")));
    } else if (action === "keep-refrem") {
      ns.state.patch({ screen: "resultPrimary", selectedOfferId: null, selectedHandId: null });
      render();
    } else if (action === "select-primary") {
      ns.state.patch({ confirmingCardId: Number(target.getAttribute("data-id")), isResultConfirmSettling: false, isConfirmModalClosing: false });
      render();
    } else if (action === "select-secondary") {
      ns.state.patch({ confirmingCardId: Number(target.getAttribute("data-id")), isResultConfirmSettling: false, isConfirmModalClosing: false });
      render();
    } else if (action === "confirm-result-no") {
      ns.state.patch({ confirmingCardId: null, isResultConfirmSettling: false, isConfirmModalClosing: false });
      render();
    } else if (action === "confirm-result-yes") {
      if (!data.confirmingCardId || data.isResultConfirmSettling) return;
      ns.state.patch({ isResultConfirmSettling: true });
      render();
      window.setTimeout(() => {
        const latest = state();
        if (latest.screen === "resultPrimary") {
          ns.state.patch({
            primaryCardId: latest.confirmingCardId,
            confirmingCardId: null,
            isResultConfirmSettling: false,
            isConfirmModalClosing: false,
            screen: "resultSecondary"
          });
        } else if (latest.screen === "resultSecondary") {
          ns.state.patch({
            secondaryCardId: latest.confirmingCardId,
            confirmingCardId: null,
            isResultConfirmSettling: false,
            isConfirmModalClosing: false,
            screen: "final",
            resultReady: true
          });
        }
        render();
      }, 1700);
    } else if (action === "result-reset") {
      ns.state.patch({ screen: "resultPrimary", primaryCardId: null, secondaryCardId: null, confirmingCardId: null, isResultConfirmSettling: false, isConfirmModalClosing: false });
      render();
    } else if (action === "restart-second") {
      startSecondJourney();
    } else if (action === "return-top") {
      ns.state.reset();
      document.body.dataset.journeyMode = "first";
      window.location.reload();
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-second-action]");
    if (!target) return;
    event.preventDefault();
    handleAction(target.getAttribute("data-second-action"), target);
  });

  document.addEventListener("input", (event) => {
    const input = event.target.closest("[data-second-input='password']");
    if (!input) return;
    ns.state.patch({ passwordValue: input.value, passwordError: "" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const input = event.target.closest("[data-second-input='password']");
    if (!input) return;
    event.preventDefault();
    handleAction("submit-password", input);
  });

  window.addEventListener("resize", schedulePasswordRefocus);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", schedulePasswordRefocus);

  ns.flow = { startSecondJourney, enterTraveler, enterRefrem, reset: ns.state.reset };
})(window.RoleTradeSecondJourney = window.RoleTradeSecondJourney || {});
