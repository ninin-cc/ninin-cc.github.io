// Layout mode boundary: one game engine, two presentations.
(function () {
  const MOBILE_QUERY = '(max-width: 640px)';
  const mediaQuery = window.matchMedia ? window.matchMedia(MOBILE_QUERY) : null;
  let lastLayoutSignature = '';
  let resizeFrame = null;

  function getViewportMetrics() {
    const viewport = window.visualViewport;
    const width = Math.round(viewport && viewport.width ? viewport.width : window.innerWidth || document.documentElement.clientWidth || 1024);
    const height = Math.round(viewport && viewport.height ? viewport.height : window.innerHeight || document.documentElement.clientHeight || 768);
    return { width, height };
  }

  function getRoleTradeLayoutProfile() {
    const metrics = getViewportMetrics();
    const isMobile = metrics.width <= 640;
    const mode = isMobile ? 'mobile' : 'desktop';
    let device = 'desktop';
    let height = 'desktop';

    if (isMobile) {
      if (metrics.width <= 340) {
        device = 'phone-xs';
      } else if (metrics.width <= 374) {
        device = 'phone-sm';
      } else if (metrics.width <= 430) {
        device = 'phone-md';
      } else {
        device = 'phone-lg';
      }

      if (metrics.height <= 620) {
        height = 'short';
      } else if (metrics.height <= 740) {
        height = 'regular';
      } else {
        height = 'tall';
      }
    }

    const orientation = metrics.width > metrics.height ? 'landscape' : 'portrait';
    return {
      mode,
      device,
      height,
      orientation,
      width: metrics.width,
      viewportHeight: metrics.height,
      signature: [mode, device, height, orientation, metrics.width, metrics.height].join(':')
    };
  }

  function getRoleTradeLayoutMode() {
    return getRoleTradeLayoutProfile().mode;
  }

  function syncRoleTradeLayoutMode(nextMode) {
    const profile = getRoleTradeLayoutProfile();
    const mode = nextMode || profile.mode;
    const root = document.documentElement;

    root.dataset.roletradeLayout = mode;
    root.dataset.roletradeDevice = mode === 'mobile' ? profile.device : 'desktop';
    root.dataset.roletradeHeight = mode === 'mobile' ? profile.height : 'desktop';
    root.dataset.roletradeOrientation = profile.orientation;
    root.style.setProperty('--rt-vw', profile.width + 'px');
    root.style.setProperty('--rt-vh', profile.viewportHeight + 'px');

    document.body.dataset.roletradeLayout = mode;
    document.body.classList.toggle('roletrade-mobile-layout', mode === 'mobile');
    document.body.classList.toggle('roletrade-desktop-layout', mode === 'desktop');
    lastLayoutSignature = profile.signature;
    return mode;
  }

  function setupRoleTradeLayout(onLayoutChange) {
    syncRoleTradeLayoutMode();

    const handleChange = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const previousSignature = lastLayoutSignature;
        const profile = getRoleTradeLayoutProfile();
        syncRoleTradeLayoutMode(profile.mode);
        if (typeof onLayoutChange === 'function' && profile.signature !== previousSignature) {
          onLayoutChange();
        }
      });
    };

    if (mediaQuery) {
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleChange);
      }
    }

    window.addEventListener('resize', handleChange, { passive: true });
    window.addEventListener('orientationchange', handleChange, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleChange, { passive: true });
    }
  }

  window.getRoleTradeLayoutProfile = getRoleTradeLayoutProfile;
  window.getRoleTradeLayoutMode = getRoleTradeLayoutMode;
  window.syncRoleTradeLayoutMode = syncRoleTradeLayoutMode;
  window.setupRoleTradeLayout = setupRoleTradeLayout;
})();
