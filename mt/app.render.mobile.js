// Mobile presentation boundary.
// Keep the current UI as fallback, then replace individual scenes with mobile-specific renderers incrementally.
(function () {
  const mobileSceneRenderers = Object.create(null);

  function registerRoleTradeMobileScene(pageLabel, renderer) {
    if (typeof pageLabel !== 'string' || typeof renderer !== 'function') return;
    mobileSceneRenderers[pageLabel] = renderer;
  }

  function renderRoleTradeMobileFrame(html, context) {
    const renderer = context && mobileSceneRenderers[context.pageLabel];
    if (typeof renderer === 'function') {
      return renderer(html, context);
    }
    return html;
  }

  function applyRoleTradeRendererFrame(html, context) {
    if (context && context.layoutMode === 'mobile' && typeof window.renderRoleTradeMobileFrame === 'function') {
      return window.renderRoleTradeMobileFrame(html, context);
    }
    if (typeof window.renderRoleTradeDesktopFrame === 'function') {
      return window.renderRoleTradeDesktopFrame(html, context);
    }
    return html;
  }

  window.registerRoleTradeMobileScene = registerRoleTradeMobileScene;
  window.renderRoleTradeMobileFrame = renderRoleTradeMobileFrame;
  window.applyRoleTradeRendererFrame = applyRoleTradeRendererFrame;
})();
