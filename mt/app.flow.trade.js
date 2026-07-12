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
      const tradeResult = window.RoleTradeTradeEngine
        ? window.RoleTradeTradeEngine.applyTravelerExchange({ hand: state.hand, deck: state.deck, offerCards, receivedCard, releasedCard })
        : null;
      const newHand = tradeResult ? tradeResult.hand : state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const newDeck = tradeResult ? tradeResult.deck : state.deck;

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

    function handleSecondDoubleTravelerTrade() {
      const tradeCount = typeof getSecondDoubleTradeCount === 'function' ? getSecondDoubleTradeCount() : 2;
      const releasedCards = (state.selectedHandCards || []).slice(0, tradeCount);
      const receivedCards = (state.selectedShopCards || []).slice(0, tradeCount);
      if (releasedCards.length < tradeCount || receivedCards.length < tradeCount || state.isExchanging || state.waitingAfterTrade) return;

      const offerCards = state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : receivedCards;
      const releasedIds = new Set(releasedCards.map(card => card.id));
      const receivedIds = new Set(receivedCards.map(card => card.id));
      const offeredIds = new Set(offerCards.map(card => card.id));
      let receiveIndex = 0;
      const newHand = state.hand.map(card => {
        if (!releasedIds.has(card.id)) return card;
        const nextCard = receivedCards[receiveIndex] || receivedCards[receivedCards.length - 1];
        receiveIndex += 1;
        return nextCard;
      });
      const newDeck = state.deck.filter(card => !offeredIds.has(card.id));
      newDeck.push(...offerCards.filter(card => !receivedIds.has(card.id)));
      newDeck.push(...releasedCards);

      state.tradeConfirmOpen = false;
      state.selectedHandCard = releasedCards[0] || null;
      state.selectedShopCard = receivedCards[0] || null;
      state.isExchanging = true;
      render();

      setTimeout(() => {
        transitionState(() => {
          state.hand = newHand;
          state.deck = newDeck;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.selectedHandCards = [];
          state.selectedShopCards = [];
          state.tradeOfferCard = null;
          state.tradeOfferCards = [];
          state.requestedHandCard = null;
          state.isExchanging = false;
          state.waitingAfterTrade = true;
          releasedCards.forEach((card, index) => rememberTradeHistory(card, receivedCards[index], 'traveler'));
          state.pendingAfterTrade = { hand: newHand, shop: state.shop, deck: newDeck, releasedCard: releasedCards[0], receivedCard: receivedCards[0], kind: 'traveler' };
          state.afterTradeMessage = '二枚まとめての交換、悪くないな。少し重さが変わったはずだ。';
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function handleRequestedTravelerTrade() {
      if (!state.requestedHandCard || !state.tradeOfferCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.requestedHandCard;
      const receivedCard = state.tradeOfferCard;
      const offerCards = state.tradeOfferCards && state.tradeOfferCards.length ? state.tradeOfferCards : [state.tradeOfferCard].filter(Boolean);
      const tradeResult = window.RoleTradeTradeEngine
        ? window.RoleTradeTradeEngine.applyTravelerExchange({ hand: state.hand, deck: state.deck, offerCards, receivedCard, releasedCard, keepUnchosenOffers: false })
        : null;
      const newHand = tradeResult ? tradeResult.hand : state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const newDeck = tradeResult ? tradeResult.deck : state.deck;

      state.tradeConfirmOpen = false;
      state.requestedTradeConfirmOpen = false;
      state.requestedRefuseConfirmOpen = false;
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
        state.requestedRefuseConfirmOpen = false;
        state.tradeMessage = 'そんなにその役割が必要なのかよ、じゃあ仕方ないか…。<br>じゃあ、どれなら交換してくれるんだ？';
      });
    }

    function handleSecondForcedTakeClaim() {
      if (!state.requestedHandCard || state.isExchanging || state.waitingAfterTrade) return;
      state.selectedHandCard = state.requestedHandCard;
      state.forcedTakePhase = 'selected';
      render();
    }

    function handleSecondForcedTakePull() {
      if (!state.requestedHandCard || state.isExchanging || state.waitingAfterTrade) return;
      const takenCard = state.requestedHandCard;
      state.selectedHandCard = takenCard;
      state.forcedTakenCard = takenCard;
      state.forcedTakePhase = 'pulling';
      state.isExchanging = true;
      render();

      setTimeout(() => {
        transitionState(() => {
          const replacementCount = (window.ROLETRADE_SECOND_CONFIG && window.ROLETRADE_SECOND_CONFIG.forcedReplacementCount) || 5;
          const candidates = state.deck.slice(0, replacementCount);
          const candidateIds = new Set(candidates.map(card => card.id));
          state.hand = state.hand.filter(card => card.id !== takenCard.id);
          state.deck = state.deck.filter(card => !candidateIds.has(card.id));
          state.tradeOfferCards = candidates;
          state.tradeOfferCard = candidates[0] || null;
          state.forcedReplacementCandidates = candidates;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.isExchanging = false;
          state.forcedTakePhase = 'choose';
          state.tradeMessage = '代わりに、この中から一枚持っていけ。';
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function handleSecondForcedReplacement() {
      if (!state.forcedTakenCard || !state.selectedShopCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.forcedTakenCard;
      const receivedCard = state.selectedShopCard;
      const leftoverCandidates = (state.forcedReplacementCandidates || []).filter(card => card.id !== receivedCard.id);
      const newHand = state.hand.concat(receivedCard).slice(0, 5);
      const newDeck = state.deck.concat(leftoverCandidates);

      state.isExchanging = true;
      render();

      setTimeout(() => {
        transitionState(() => {
          state.tradeOfferCard = null;
          state.tradeOfferCards = [];
          state.requestedHandCard = null;
          state.forcedTakePhase = '';
          state.forcedReplacementCandidates = [];
          state.forcedTakenCard = null;
          state.hand = newHand;
          state.deck = newDeck;
          state.selectedHandCard = null;
          state.selectedShopCard = null;
          state.isExchanging = false;
          state.waitingAfterTrade = true;
          rememberTradeHistory(releasedCard, receivedCard, 'traveler');
          state.pendingAfterTrade = { hand: newHand, shop: state.shop, deck: newDeck, releasedCard, receivedCard, kind: 'traveler' };
          state.afterTradeMessage = '……持っていく。代わりの役割も、ちゃんと連れていけよ。';
        });
      }, EXPERIENCE_TIMING.exchangeSettleMs);
    }

    function handleShopTrade() {
      if (!state.selectedHandCard || !state.selectedShopCard || state.isExchanging || state.waitingAfterTrade) return;
      const releasedCard = state.selectedHandCard;
      const receivedCard = state.selectedShopCard;
      const tradeResult = window.RoleTradeTradeEngine
        ? window.RoleTradeTradeEngine.applyShopExchange({ hand: state.hand, shop: state.shop, receivedCard, releasedCard })
        : null;
      const newHand = tradeResult ? tradeResult.hand : state.hand.map(c => c.id === releasedCard.id ? receivedCard : c);
      const newShop = tradeResult ? tradeResult.shop : state.shop.map(c => c.id === receivedCard.id ? releasedCard : c);

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
      state.selectedHandCards = [];
      state.selectedShopCards = [];
      state.tradeOfferCard = null;
      state.tradeOfferCards = [];
      state.requestedHandCard = null;
      state.tradeConfirmOpen = false;
      state.requestedTradeConfirmOpen = false;
      state.requestedRefuseConfirmOpen = false;
      state.secondPassConfirmOpen = false;
      state.forcedTakePhase = '';
      state.forcedReplacementCandidates = [];
      state.forcedTakenCard = null;
      state.waitingAfterTrade = false;
      state.pendingAfterTrade = null;
      state.afterTradeMessage = '';

      if (state.round >= getTotalRounds()) {
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
          if (typeof isSecondDoubleTradeRound === 'function' && isSecondDoubleTradeRound(state.round)) {
            if (tradeEncounter.voice === 'youngFemale') {
              state.tradeMessage = 'この四枚の中から二枚と、あなたの手札から二枚を交換してほしいな。二枚ずつ選んでみて。';
            } else if (tradeEncounter.voice === 'olderMale') {
              state.tradeMessage = 'この四枚の中から二枚と、おぬしの手札から二枚を交換してくれ。二枚ずつ選ぶのじゃ。';
            } else {
              state.tradeMessage = 'この四枚の中から二枚と、君の手札から二枚を交換してくれ。二枚ずつ選んでくれ。';
            }
          }
          state.tradeVoice = tradeEncounter.voice;
          state.tradeTone = tradeEncounter.tone;
          state.usedTradeAvatarImgs = [...state.usedTradeAvatarImgs, tradeEncounter.avatarImg];
          state.usedTradeMessages = [...state.usedTradeMessages, tradeEncounter.message];

          if (isForcedHandTravelerRound(state.round) && state.requestedHandCard) {
            const copy = window.ROLETRADE_SECOND_COPY || {};
            const forcedCopy = copy.forcedTraveler || {};
            const requestedName = state.requestedHandCard.name || 'そのカード';
            state.tradeOfferCards = [];
            state.tradeOfferCard = null;
            state.selectedHandCard = null;
            state.selectedShopCard = null;
            state.forcedTakePhase = 'claim';
            state.tradeMessage = (forcedCopy.speechTemplate || '俺は、その《{{cardName}}》が欲しい。').replace('{{cardName}}', requestedName);
          }
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

