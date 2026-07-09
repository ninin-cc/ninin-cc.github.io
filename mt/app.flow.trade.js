    function pushUniqueCardId(list, card) {
      if (!card || !Array.isArray(list)) return;
      const without = list.filter(id => id !== card.id);
      without.push(card.id);
      list.splice(0, list.length, ...without);
    }

    function rememberTradeHistory(releasedCard, receivedCard, kind) {
      pushUniqueCardId(state.releasedCardIds, releasedCard);
      pushUniqueCardId(state.acquiredCardIds, receivedCard);
      if (kind === 'traveler') {
        pushUniqueCardId(state.travelerReleasedCardIds, releasedCard);
      }
    }

    function getCardsByHistory(ids, excludedIds = new Set()) {
      const result = [];
      const seen = new Set();
      ids.forEach(id => {
        if (seen.has(id) || excludedIds.has(id)) return;
        const card = CARDS_BY_ID.get(id);
        if (!card) return;
        seen.add(id);
        result.push(card);
      });
      return result;
    }

    function selectRequestedHandCard(handCards) {
      const handIds = new Set(handCards.map(card => card.id));
      const unique = (ids) => [...new Set(ids)].filter(id => handIds.has(id)).map(id => CARDS_BY_ID.get(id)).filter(Boolean);
      const harukaChosen = unique(state.acquiredCardIds.filter(id => state.initialShopCardIds.includes(id)));
      if (harukaChosen.length) return randomItem(harukaChosen);
      const initialHand = unique(state.initialHandCardIds);
      if (initialHand.length) return randomItem(initialHand);
      const acquired = unique(state.acquiredCardIds);
      if (acquired.length) return randomItem(acquired);
      return randomItem(handCards);
    }

    function buildFinalShopCards(handCards, currentShop, currentDeck) {
      const handIds = new Set(handCards.map(card => card.id));
      const pickedIds = new Set();
      const finalShop = [];
      const addCards = (cards) => {
        cards.forEach(card => {
          if (!card || handIds.has(card.id) || pickedIds.has(card.id) || finalShop.length >= 6) return;
          pickedIds.add(card.id);
          finalShop.push(card);
        });
      };
      addCards(getCardsByHistory([...state.travelerReleasedCardIds].reverse(), handIds));
      addCards(getCardsByHistory([...state.releasedCardIds].reverse(), handIds));
      addCards(currentShop || []);
      addCards(currentDeck || []);
      addCards(CARDS_DATA);
      const finalIds = new Set(finalShop.map(card => card.id));
      const finalDeck = (currentDeck || []).filter(card => !finalIds.has(card.id));
      return { shop: finalShop.slice(0, 6), deck: finalDeck };
    }

    function getAfterTradeMessage(kind, receivedCard, releasedCard) {
      if (kind === 'shop') {
        return 'ありがとうございます。' + (releasedCard ? '「' + releasedCard.name + '」' : 'このカード') + '、大切に受け取りますね。';
      }

      const receivedName = receivedCard ? '「' + receivedCard.name + '」' : 'その役割';
      const releasedName = releasedCard ? '「' + releasedCard.name + '」' : 'そのカード';
      const profile = getTradeProfileByAvatar(state.tradeAvatarImg);
      const voice = state.tradeVoice || profile?.voice || 'male';
      const tone = state.tradeTone || getTradeToneFromMessage(state.tradeMessage || '') || 'balanced';
      const afterTradeMessages = {
        olderMale: {
          selfish: [
            '悪いな。' + releasedName + '、今の俺にはちょうど必要だった。ありがたく持っていく。',
            '少し俺の都合に付き合わせたな。だが、いい交換だった。' + receivedName + 'も役に立つはずだ。'
          ],
          gentle: [
            'ありがとな。' + releasedName + '、旅の途中で大事に使わせてもらう。',
            'うむ、いい交換だった。おぬしの旅にも、' + receivedName + 'が力になるといいな。'
          ],
          flat: [
            '交換成立だな。俺は' + releasedName + 'を預かる。おぬしもその一枚を持って進むといい。',
            'これで互いに一枚ずつ入れ替わった。淡々としているが、悪くない交換だ。'
          ],
          reluctant: [
            '流れとはいえ、交換できてよかった。' + releasedName + 'は俺が預かる。',
            'これで一枚、旅が動いたな。おぬしも' + receivedName + 'を少し眺めてみるといい。'
          ],
          balanced: [
            'ありがとな。いいカードを受け取った。俺の旅でも役に立ちそうだ。',
            '交換してくれて助かった。' + releasedName + '、大事に持っていく。'
          ]
        },
        male: {
          selfish: [
            'ありがとな。少し自分勝手を言ったけど、' + releasedName + 'は今の俺に必要なんだ。',
            '助かった。俺の都合に付き合ってくれて悪いな。' + receivedName + 'も、きっと使いどころがある。'
          ],
          gentle: [
            'ありがとう。' + receivedName + 'も、あなたの旅で意味を持つといいな。',
            'いい交換だったな。お互い、この先でちゃんと活かしていこう。'
          ],
          flat: [
            '交換成立だな。俺は' + releasedName + 'を持っていく。',
            'これで一枚ずつ入れ替わった。次の旅でも、役割を見ていこう。'
          ],
          reluctant: [
            '決まりとはいえ、交換してくれて助かった。' + releasedName + 'は俺が持っていく。',
            '少し不思議な流れだけど、これで交換だな。ありがとう。'
          ],
          balanced: [
            'ありがとな！いいカードを貰ったぜ。',
            '交換してくれてありがとう。今の俺には、きっと必要なカードだ。'
          ]
        },
        youngFemale: {
          selfish: [
            'ありがとう。少しわがままを言っちゃったけど、' + releasedName + 'は今の私に必要だったんだ。',
            '付き合ってくれてありがとう。' + receivedName + 'も、あなたの旅でちゃんと意味を持つと思う。'
          ],
          gentle: [
            'ありがとう。' + releasedName + '、大切に持っていくね。',
            'いい交換だったね。あなたの手元に来た' + receivedName + 'も、きっと何か教えてくれるよ。'
          ],
          flat: [
            '交換できたね。私は' + releasedName + 'を持っていくよ。',
            'これで一枚ずつ入れ替わったね。次の旅でも、少し見つめてみて。'
          ],
          reluctant: [
            '交換してくれてありがとう。ちょっと緊張したけど、これで進めるね。',
            'これで交換できたね。' + receivedName + 'も、少しだけ眺めてみてほしいな。'
          ],
          balanced: [
            'ありがとう。いいカードを受け取ったよ。',
            '交換してくれてありがとう。' + releasedName + '、大切に持っていくね。'
          ]
        }
      };
      const voiceMessages = afterTradeMessages[voice] || afterTradeMessages.male;
      const messages = voiceMessages[tone] || voiceMessages.balanced;
      return messages[(state.round + (receivedCard?.id || 0) + (releasedCard?.id || 0)) % messages.length];
    }

    function handleTrade() {
      if (!state.selectedHandCard || !state.tradeOfferCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.selectedHandCard;
      const offerCards = state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : [state.tradeOfferCard].filter(Boolean);
      const receivedCard = state.selectedShopCard || state.tradeOfferCard;
      const newHand = state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const offeredIds = offerCards.map(card => card.id);
      const unchosenOfferCards = offerCards.filter(card => card.id !== receivedCard.id);
      const newDeck = state.deck.filter(card => !offeredIds.includes(card.id));
      newDeck.push(...unchosenOfferCards, releasedCard);

      state.tradeConfirmOpen = false;
      state.isExchanging = true;
      render();
      
      setTimeout(() => {
        transitionState(() => {
          state.hand = newHand;
          state.deck = newDeck;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.tradeOfferCard = null;
          state.tradeOfferCards = [];
          state.requestedHandCard = null;
          state.isExchanging = false;
          state.waitingAfterTrade = true;
          rememberTradeHistory(releasedCard, receivedCard, 'traveler');
          state.pendingAfterTrade = { hand: newHand, shop: state.shop, deck: newDeck, releasedCard, receivedCard, kind: 'traveler' };
          state.afterTradeMessage = getAfterTradeMessage('traveler', receivedCard, releasedCard);
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function handleRequestedTravelerTrade() {
      if (!state.requestedHandCard || !state.tradeOfferCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.requestedHandCard;
      const receivedCard = state.tradeOfferCard;
      const offerCards = state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : [state.tradeOfferCard].filter(Boolean);
      const offeredIds = offerCards.map(card => card.id);
      const newHand = state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const newDeck = state.deck.filter(card => !offeredIds.includes(card.id));
      newDeck.push(releasedCard);

      state.tradeConfirmOpen = false;
      state.selectedHandCard = releasedCard;
      state.isExchanging = true;
      render();

      setTimeout(() => {
        transitionState(() => {
          state.hand = newHand;
          state.deck = newDeck;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.tradeOfferCard = null;
          state.tradeOfferCards = [];
          state.requestedHandCard = null;
          state.isExchanging = false;
          state.waitingAfterTrade = true;
          rememberTradeHistory(releasedCard, receivedCard, 'traveler');
          state.pendingAfterTrade = { hand: newHand, shop: state.shop, deck: newDeck, releasedCard, receivedCard, kind: 'traveler' };
          state.afterTradeMessage = '…ありがとう！助かったよ！';
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function refuseRequestedTravelerTrade() {
      if (!state.requestedHandCard || state.isExchanging || state.waitingAfterTrade) return;
      transitionState(() => {
        state.selectedHandCard = null;
        state.selectedShopCard = null;
        state.requestedHandCard = null;
        state.tradeMessage = 'そんなにその役割が必要なのかよ、じゃあ仕方ないか…。<br>じゃあ、どれなら交換してくれるんだ？';
      });
    }

    function handleShopTrade() {
      if (!state.selectedHandCard || !state.selectedShopCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.selectedHandCard;
      const receivedCard = state.selectedShopCard;
      const newHand = state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const newShop = state.shop.map(c => c.id === receivedCard.id ? releasedCard : c);

      state.tradeConfirmOpen = false;
      state.isExchanging = true;
      render();
      
      setTimeout(() => {
        transitionState(() => {
          state.hand = newHand;
          state.shop = newShop;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.isExchanging = false;
          state.waitingAfterTrade = true;
          rememberTradeHistory(releasedCard, receivedCard, 'shop');
          state.pendingAfterTrade = { hand: newHand, shop: newShop, deck: state.deck, releasedCard, receivedCard, kind: 'shop' };
          state.afterTradeMessage = getAfterTradeMessage('shop', receivedCard, releasedCard);
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function proceedToNextRound(newHand, newShop, newDeck) {
      state.selectedHandCard = null;
      state.selectedShopCard = null;
      state.tradeOfferCard = null;
      state.tradeOfferCards = [];
      state.requestedHandCard = null;
      state.tradeConfirmOpen = false;
      state.waitingAfterTrade = false;
      state.pendingAfterTrade = null;
      state.afterTradeMessage = '';

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
        
        if (isFinalShopRound(state.round)) {
          const finalShop = buildFinalShopCards(newHand, newShop, newDeck);
          state.shop = finalShop.shop;
          state.deck = finalShop.deck;
        }

        if (!state.shopRounds.includes(state.round)) {
          const tradeEncounter = getRandomTradeEncounter(state.usedTradeAvatarImgs, state.usedTradeMessages);
          const travelerOfferCount = getTravelerOfferCount(state.round);
          state.tradeOfferCards = newDeck.slice(0, travelerOfferCount);
          state.tradeOfferCard = state.tradeOfferCards[0];
          state.requestedHandCard = isRequestedHandTravelerRound(state.round) ? selectRequestedHandCard(newHand) : null;
          state.selectedHandCard = state.requestedHandCard || null;
          state.selectedShopCard = null;
          state.tradeAvatarImg = tradeEncounter.avatarImg;
          state.tradeMessage = state.requestedHandCard
            ? getRequestedHandTradeMessage(tradeEncounter.message, tradeEncounter.voice, state.requestedHandCard)
            : withTravelerOfferCue(tradeEncounter.message, tradeEncounter.voice, state.tradeOfferCards.length);
          state.tradeVoice = tradeEncounter.voice;
          state.tradeTone = tradeEncounter.tone;
          state.usedTradeAvatarImgs = [...state.usedTradeAvatarImgs, tradeEncounter.avatarImg];
          state.usedTradeMessages = [...state.usedTradeMessages, tradeEncounter.message];
        }

        // ▼▼ ラウンド間でのシーン遷移 ▼▼
        if (state.round === 2) {
          state.leaveShopDialogueStep = 0;
          state.gameState = 'LEAVE_SHOP_1';
        } else if (isFinalShopRound(state.round)) {
          state.finalShopGuideStep = 0;
          state.gameState = 'AFTER_TAVERN';
        } else {
          state.gameState = 'PLAYING';
        }
      }
    }
