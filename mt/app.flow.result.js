    function handleResultCardSelect(card) {
      if (state.resultStep === 'SELECT_1' || state.resultStep === 'SELECT_2') {
        if (state.resultStep === 'SELECT_2' && card.id === state.primaryCard?.id) return;
        clearResultDecisionTimers();
        state.confirmingCard = card;
        state.isConfirmModalClosing = false;
        state.isResultConfirmSettling = false;
        render();
      }
    }

    let resultDecisionTimer = null;
    let resultDecisionCloseTimer = null;

    function clearResultDecisionTimers() {
      if (resultDecisionTimer) {
        clearTimeout(resultDecisionTimer);
        resultDecisionTimer = null;
      }
      if (resultDecisionCloseTimer) {
        clearTimeout(resultDecisionCloseTimer);
        resultDecisionCloseTimer = null;
      }
    }

    function finishResultDecision(decidedCard) {
      state.isConfirmModalClosing = true;
      render();
      resultDecisionCloseTimer = setTimeout(() => {
        resultDecisionCloseTimer = null;
        if (state.resultStep === 'SELECT_1') {
          state.primaryCard = decidedCard;
          state.confirmingCard = null;
          state.isResultConfirmSettling = false;
          transitionState(() => { state.resultStep = 'SELECT_2'; });
        } else if (state.resultStep === 'SELECT_2') {
          state.secondaryCard = decidedCard;
          state.confirmingCard = null;
          state.isConfirmModalClosing = false;
          state.isResultConfirmSettling = false;
          state.resultStep = 'FINAL';
          if (typeof saveResultHistoryRecord === 'function') saveResultHistoryRecord();
          render();
        }
      }, EXPERIENCE_TIMING.resultDecisionCloseMs);
    }

    function confirmResultCard(isConfirmed) {
      if (!isConfirmed) {
        clearResultDecisionTimers();
        state.isConfirmModalClosing = true;
        state.isResultConfirmSettling = false;
        render();
        setTimeout(() => {
          state.confirmingCard = null;
          state.isConfirmModalClosing = false;
          render();
        }, 320);
        return;
      }

      if (state.isResultConfirmSettling || !state.confirmingCard) return;
      const decidedCard = state.confirmingCard;
      state.isResultConfirmSettling = true;
      state.isConfirmModalClosing = false;
      const confirmButton = document.querySelector('[data-action="confirm-yes"]');
      const selectedCardEl = document.querySelector('.result-confirm-card-wrap > *');
      if (confirmButton) confirmButton.disabled = true;
      if (selectedCardEl) {
        selectedCardEl.classList.remove('animate-finalDecisionGlow');
        void selectedCardEl.offsetWidth;
        selectedCardEl.classList.add('animate-finalDecisionGlow');
      } else {
        render();
      }

      resultDecisionTimer = setTimeout(() => {
        resultDecisionTimer = null;
        finishResultDecision(decidedCard);
      }, EXPERIENCE_TIMING.resultDecisionHoldMs);
    }
