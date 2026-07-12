(function (ns) {
  const config = window.ROLETRADE_SECOND_CONFIG || {};

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

  function shuffle(cards) {
    const copy = cards.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = randomInt(i + 1);
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function allCards() {
    return (typeof CARDS_DATA !== "undefined" && Array.isArray(CARDS_DATA)) ? CARDS_DATA.slice() : [];
  }

  function asIdSet(ids) {
    return new Set((ids || []).filter(Boolean));
  }

  function uniqueById(cards) {
    const seen = new Set();
    return (cards || []).filter((card) => {
      if (!card || seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
  }

  function pickUnique(count, excludeIds) {
    const exclude = asIdSet(excludeIds);
    const pool = shuffle(uniqueById(allCards()).filter((card) => !exclude.has(card.id)));
    return pool.slice(0, count);
  }

  function createInitialHand() {
    return pickUnique(config.initialHandSize || 5, []);
  }

  function createTravelerCandidates(hand, takenId, count) {
    const excluded = (hand || []).map((card) => card.id);
    if (takenId) excluded.push(takenId);
    return pickUnique(count || config.normalOfferCount || 3, excluded);
  }

  function createThirdReplacementCandidates(hand, takenId) {
    const excluded = (hand || []).map((card) => card.id);
    if (takenId) excluded.push(takenId);
    return pickUnique(config.forcedReplacementCount || 5, excluded);
  }

  function selectImportantCard(hand, state) {
    const cards = uniqueById(hand || []);
    if (!cards.length) return null;
    const inHand = new Set(cards.map((card) => card.id));
    const acquired = (state.acquiredCardIds || []).filter((id) => inHand.has(id));
    if (acquired.length) return cards.find((card) => card.id === acquired[acquired.length - 1]) || cards[0];
    const initial = (state.initialHandIds || []).filter((id) => inHand.has(id));
    if (initial.length) return cards.find((card) => card.id === initial[0]) || cards[0];
    return cards[randomInt(cards.length)];
  }

  function createRefremCandidates(hand, takenId) {
    const handIds = (hand || []).map((card) => card.id);
    const required = ns.state && ns.state.getCardById ? ns.state.getCardById(takenId) : null;
    const baseExclude = required ? handIds.concat(required.id) : handIds;
    let extra = pickUnique((config.refremOfferCount || 6) - (required ? 1 : 0), baseExclude);
    if (extra.length < (config.refremOfferCount || 6) - (required ? 1 : 0)) {
      extra = pickUnique((config.refremOfferCount || 6) - (required ? 1 : 0), required ? [required.id] : []);
    }
    return shuffle(uniqueById(required ? [required].concat(extra) : extra).slice(0, config.refremOfferCount || 6));
  }

  ns.cards = {
    randomInt,
    shuffle,
    uniqueById,
    pickUnique,
    createInitialHand,
    createTravelerCandidates,
    createThirdReplacementCandidates,
    selectImportantCard,
    createRefremCandidates
  };
})(window.RoleTradeSecondJourney = window.RoleTradeSecondJourney || {});
