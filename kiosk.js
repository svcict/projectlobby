// Behaviour that only the lobby kiosk needs (index.html, after app.js):
// touch guards, offline start, and picking up new releases by itself.
(() => {
  'use strict';

  // ---------- Stray touches ----------
  // No pinch or double-tap zoom, no long-press menu: a visitor's accidental
  // gesture can't knock the layout off. (CSS touch-action covers the same.)
  ['gesturestart', 'gesturechange', 'gestureend'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault()));
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  document.addEventListener('wheel', (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });

  // ---------- Offline start ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  // ---------- New releases ----------
  // Every release changes the ?v= numbers in index.html. Every 5 minutes the
  // kiosk reads index.html afresh; if the numbers differ, it reloads, but only
  // from the idle home screen, so a visitor is never interrupted. Whatever
  // the version, it also reloads once a day to start clean.
  const POLL_MS = 5 * 60 * 1000;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const RETRY_MS = 10 * 60 * 1000;

  const versions = (list) => list.map((m) => m[1]).sort().join(',');
  const current = versions([...document.querySelectorAll('script[src*="?v="], link[href*="?v="]')]
    .map((el) => (el.getAttribute('src') || el.getAttribute('href')).match(/\?v=(\d+)/)).filter(Boolean));

  async function check({ idleMs = 30000 } = {}) {
    let latest = current;
    try {
      const html = await (await fetch('index.html', { cache: 'no-store' })).text();
      latest = versions([...html.matchAll(/(?:src|href)="[^"]*\?v=(\d+)"/g)]) || current;
    } catch (_) { /* offline: keep running what we have */ }

    const stale = latest !== current;
    const daily = performance.now() > DAY_MS;
    if (!stale && !daily) return 'current';
    if (!window.lobbyIsIdleHome || !window.lobbyIsIdleHome(idleMs)) return 'waiting';

    // If the browser still serves the old copy after a reload, don't loop.
    const target = stale ? latest : 'daily';
    try {
      const last = JSON.parse(sessionStorage.getItem('lobby:reload') || 'null');
      if (last && last.target === target && Date.now() - last.at < RETRY_MS) return 'retry-later';
      sessionStorage.setItem('lobby:reload', JSON.stringify({ target, at: Date.now() }));
    } catch (_) { /* no storage: reload anyway */ }
    location.reload();
    return 'reloading';
  }

  window.kioskUpdates = { check };
  setInterval(check, POLL_MS);
})();
