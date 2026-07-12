(function () {
  function globalValue(name, fallback) {
    try {
      if (typeof window[name] !== "undefined") return window[name];
      return Function("fallback", "try { return typeof " + name + " !== 'undefined' ? " + name + " : fallback; } catch (e) { return fallback; }")(fallback);
    } catch (error) {
      return fallback;
    }
  }

  function randomInt(max) {
    if (max <= 0) return 0;
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(1);
      const limit = Math.floor(0x100000000 / max) * max;
      let value = 0;
      do {
        window.crypto.getRandomValues(values);
        value = values[0];
      } while (value >= limit);
      return value % max;
    }
    return Math.floor(Math.random() * max);
  }

  function randomItem(items) {
    const list = (items || []).filter(Boolean);
    if (!list.length) return null;
    return list[randomInt(list.length)];
  }

  function getTradeToneFromMessage(message) {
    const fn = globalValue("getTradeToneFromMessage", null);
    if (typeof fn === "function") return fn(message || "");
    if ((message || "").includes("自分勝手") || (message || "").includes("都合") || (message || "").includes("欲しい")) return "selfish";
    if ((message || "").includes("心配") || (message || "").includes("役に立つ") || (message || "").includes("合いそう")) return "gentle";
    if ((message || "").includes("交換の場") || (message || "").includes("淡々")) return "flat";
    if ((message || "").includes("しなきゃ") || (message || "").includes("決まり")) return "reluctant";
    return "balanced";
  }

  function makeTradeEncounter(options) {
    const opts = options || {};
    try {
      if (!opts.messageVariants && typeof getRandomTradeEncounter === "function") {
        return getRandomTradeEncounter(opts.usedAvatarImgs || [], opts.usedMessages || []);
      }
    } catch (error) {
      // Use the local fallback below.
    }

    const profiles = opts.avatarProfiles || globalValue("TRADE_AVATAR_PROFILES", []);
    const availableProfiles = profiles.filter((profile) => !(opts.usedAvatarImgs || []).includes(profile.src));
    const profile = randomItem(availableProfiles.length ? availableProfiles : profiles) || { src: "./machi.jpg", voice: "male" };
    const variants = opts.messageVariants || globalValue("TRADE_MESSAGE_VARIANTS", {});
    const messages = variants[profile.voice] || variants.male || [];
    const availableMessages = messages.filter((message) => !(opts.usedMessages || []).includes(message));
    const message = randomItem(availableMessages.length ? availableMessages : messages) || "";
    return {
      avatarImg: profile.src,
      voice: profile.voice || "male",
      message,
      tone: getTradeToneFromMessage(message)
    };
  }

  function withOfferCue(message, voice, offerCount) {
    try {
      if (typeof withTravelerOfferCue === "function") return withTravelerOfferCue(message, voice, offerCount);
    } catch (error) {
      // Use the local fallback below.
    }
    const offerLabel = offerCount >= 4 ? "四つ" : (offerCount === 3 ? "三つ" : (offerCount === 2 ? "二つ" : "一枚"));
    const isMulti = offerCount > 1;
    if (voice === "youngFemale") {
      return message + (isMulti ? " この" + offerLabel + "のどれかと、あなたの一枚を交換してほしいな。" : " この一枚と、あなたのどれか一枚を交換してほしいな。");
    }
    if (voice === "olderMale") {
      return message + (isMulti ? " この" + offerLabel + "のどれかと、おぬしの一枚を交換してくれ。" : " この一枚と、おぬしのどれか一枚を交換してくれ。");
    }
    return message + (isMulti ? " この" + offerLabel + "のどれかと、君の一枚を交換してくれ。" : " この一枚と、君のどれか一枚を交換してくれ。");
  }

  function getTradeConfirmCopy(state) {
    const isRequested = !!(state && state.requestedTradeConfirmOpen && state.requestedHandCard);
    return isRequested
      ? {
          title: "ほんとにいいですか？",
          body: "旅人に指定されたカードを手放し、この一枚を受け取ります。",
          cancelLabel: "考え直す",
          submitLabel: "応じる"
        }
      : {
          title: "これでいいですか？",
          body: "選んだ2枚を交換します。",
          cancelLabel: "選び直す",
          submitLabel: "交換する"
        };
  }

  function openRequestedTradeConfirm(state) {
    if (!state || !state.requestedHandCard || !state.tradeOfferCard || state.isExchanging || state.waitingAfterTrade) return false;
    state.selectedHandCard = state.requestedHandCard;
    state.requestedTradeConfirmOpen = true;
    state.tradeConfirmOpen = true;
    return true;
  }

  function resetTradeConfirm(state) {
    if (!state) return;
    state.tradeConfirmOpen = false;
    state.requestedTradeConfirmOpen = false;
    state.requestedRefuseConfirmOpen = false;
  }

  function sameCard(card, target) {
    return !!card && !!target && card.id === target.id;
  }

  function replaceHandCard(hand, releasedCard, receivedCard) {
    return (hand || []).map((card) => sameCard(card, releasedCard) ? receivedCard : card);
  }

  function applyTravelerExchange(params) {
    const input = params || {};
    const hand = input.hand || [];
    const deck = input.deck || [];
    const offerCards = (input.offerCards && input.offerCards.length ? input.offerCards : [input.receivedCard]).filter(Boolean);
    const receivedCard = input.receivedCard;
    const releasedCard = input.releasedCard;
    const keepUnchosenOffers = input.keepUnchosenOffers !== false;
    const offeredIds = new Set(offerCards.map((card) => card.id));
    const newHand = replaceHandCard(hand, releasedCard, receivedCard);
    const newDeck = deck.filter((card) => !offeredIds.has(card.id));
    if (keepUnchosenOffers) {
      newDeck.push(...offerCards.filter((card) => !sameCard(card, receivedCard)));
    }
    if (releasedCard) newDeck.push(releasedCard);
    return { hand: newHand, deck: newDeck };
  }

  function applyShopExchange(params) {
    const input = params || {};
    const releasedCard = input.releasedCard;
    const receivedCard = input.receivedCard;
    return {
      hand: replaceHandCard(input.hand || [], releasedCard, receivedCard),
      shop: (input.shop || []).map((card) => sameCard(card, receivedCard) ? releasedCard : card)
    };
  }

  window.RoleTradeTradeEngine = {
    makeTradeEncounter,
    withOfferCue,
    getTradeConfirmCopy,
    openRequestedTradeConfirm,
    resetTradeConfirm,
    replaceHandCard,
    applyTravelerExchange,
    applyShopExchange,
    randomItem
  };
})();
