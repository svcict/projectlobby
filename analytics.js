// Visitor counts for the phone page only (the lobby screen is never counted).
// Uses GoatCounter (goatcounter.com): no cookies, no personal data, nothing
// stored on the visitor's device, and it honours Do Not Track.
//
// To turn it on: create a free site at goatcounter.com and put its code below
// (the part before .goatcounter.com). Leave it empty to count nothing.
(() => {
  'use strict';
  const CODE = '';
  if (!CODE) return;

  window.goatcounter = { no_onload: true };
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
  s.onload = () => {
    const route = () => '/' + decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    // One count per screen the visitor opens; a visit that starts from the
    // lobby QR code is also counted once as an event.
    if (new URLSearchParams(location.search).get('from') === 'lobby') {
      window.goatcounter.count({ path: 'qr-scan', title: 'Scanned the lobby QR code', event: true });
    }
    window.goatcounter.count({ path: route() });
    window.addEventListener('hashchange', () => window.goatcounter.count({ path: route() }));
  };
  document.head.appendChild(s);
})();
