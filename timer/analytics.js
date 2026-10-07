(() => {
  'use strict';

  // GitHub PagesなどのWeb公開時だけ計測し、ローカル版・Electron版は計測しない。
  const isWeb = window.location.protocol === 'https:' || window.location.protocol === 'http:';
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
  if (!isWeb || isLocal) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', 'G-Z1T35THNDV');

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z1T35THNDV';
  document.head.appendChild(script);
})();
