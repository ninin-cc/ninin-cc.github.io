(function (ns) {
  const initialState = {
    journeyMode: "first",
    active: false,
    screen: "idle",
    passwordOpen: false,
    passwordValue: "",
    passwordError: "",
    introStep: 0,
    passUsed: false,
    hand: [],
    initialHandIds: [],
    currentTravelerIndex: 0,
    offersByTraveler: {},
    selectedOfferId: null,
    selectedHandId: null,
    histories: [],
    acquiredCardIds: [],
    releasedCardIds: [],
    takenByThirdTravelerId: null,
    forcedTakePhase: "claim",
    thirdReplacementCandidates: [],
    refremCandidates: [],
    primaryCardId: null,
    secondaryCardId: null,
    confirmingCardId: null,
    isResultConfirmSettling: false,
    isConfirmModalClosing: false,
    resultReady: false,
    tradeConfirmOpen: false,
    isExchanging: false,
    tradeAvatarImg: "",
    tradeVoice: "male",
    tradeMessage: "",
    usedTradeAvatarImgs: [],
    usedTradeMessages: [],
    afterTradeMessage: "",
    afterTradeNextTravelerIndex: 0,
    afterTradeCurrentTravelerIndex: 0
  };

  const data = {};

  function reset() {
    Object.keys(data).forEach((key) => delete data[key]);
    Object.assign(data, JSON.parse(JSON.stringify(initialState)));
  }

  function setActiveSecond() {
    data.journeyMode = "second";
    data.active = true;
    data.screen = "intro";
    data.passwordOpen = false;
    data.passwordValue = "";
    data.passwordError = "";
  }

  function patch(next) {
    Object.assign(data, next || {});
  }

  function getCardById(id) {
    const normalized = Number(id);
    if (typeof CARDS_BY_ID !== "undefined" && CARDS_BY_ID && typeof CARDS_BY_ID.get === "function") {
      return CARDS_BY_ID.get(normalized) || null;
    }
    if (typeof CARDS_DATA !== "undefined" && Array.isArray(CARDS_DATA)) {
      return CARDS_DATA.find((card) => card.id === normalized) || null;
    }
    return null;
  }

  reset();
  ns.state = { data, reset, setActiveSecond, patch, getCardById };
})(window.RoleTradeSecondJourney = window.RoleTradeSecondJourney || {});
