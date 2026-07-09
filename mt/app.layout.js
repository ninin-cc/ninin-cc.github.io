// Layout mode boundary: one game engine, two presentations.
(function () {
  const MOBILE_QUERY = '(max-width: 640px)';
  const mediaQuery = window.matchMedia ? window.matchMedia(MOBILE_QUERY) : null;
  let lastLayoutMode = null;

  function getRoleTradeLayoutMode() {
    return mediaQuery && mediaQuery.matches ? 'mobile' : 'desktop';
  }

  function syncRoleTradeLayoutMode(nextMode) {
    const mode = nextMode || getRoleTradeLayoutMode();
    document.documentElement.dataset.roletradeLayout = mode;
    document.body.dataset.roletradeLayout = mode;
    document.body.classList.toggle('roletrade-mobile-layout', mode === 'mobile');
    document.body.classList.toggle('roletrade-desktop-layout', mode === 'desktop');
    lastLayoutMode = mode;
    return mode;
  }

  function setupRoleTradeLayout(onLayoutChange) {
    syncRoleTradeLayoutMode();
    if (!mediaQuery) return;
    const handleChange = () => {
      const mode = syncRoleTradeLayoutMode();
      if (mode !== lastLayoutMode && typeof onLayoutChange === 'function') {
        onLayoutChange();
      } else if (typeof onLayoutChange === 'function') {
        onLayoutChange();
      }
    };
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
    }
  }

  window.getRoleTradeLayoutMode = getRoleTradeLayoutMode;
  window.syncRoleTradeLayoutMode = syncRoleTradeLayoutMode;
  window.setupRoleTradeLayout = setupRoleTradeLayout;
})();
