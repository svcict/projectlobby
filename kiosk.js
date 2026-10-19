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
  // Two signs of a new release are watched, every 5 minutes: the ?v= stamps in
  // index.html (tools/stamp.js sets them) and the files' own ETag or
  // Last-Modified headers (so a release is noticed even if the stamps were
  // never updated). Either changing means a reload, but only from the idle
  // home screen, so a visitor is never interrupted. The kiosk also reloads once
  // a day, whatever happens, to start clean.
  const POLL_MS = 5 * 60 * 1000;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const RETRY_MS = 10 * 60 * 1000;

  const versions = (list) => list.map((m) => m[1]).sort().join(',');
  const current = versions([...document.querySelectorAll('script[src*="?v="], link[href*="?v="]')]
    .map((el) => (el.getAttribute('src') || el.getAttribute('href')).match(/\?v=([0-9a-z]+)/)).filter(Boolean));

  // One signature for index.html and every local script and stylesheet: the
  // ETag (or Last-Modified) the server reports for each. null if any is unreachable.
  async function signature() {
    const files = new Set(['index.html']);
    document.querySelectorAll('script[src], link[rel="stylesheet"][href]').forEach((el) => {
      const url = (el.getAttribute('src') || el.getAttribute('href')).split('?')[0];
      if (!/^(https?:)?\/\//.test(url)) files.add(url);
    });
    const parts = await Promise.all([...files].map(async (f) => {
      const r = await fetch(f, { method: 'HEAD', cache: 'no-store' });
      return r.ok ? `${f}=${r.headers.get('etag') || r.headers.get('last-modified') || ''}` : null;
    }));
    return parts.every(Boolean) ? parts.join('|') : null;
  }
  // Taken just after the page loads; a release in those few seconds is caught by the daily reload.
  let bootSignature = null;
  window.addEventListener('load', () => signature().then((s) => { bootSignature = s; }).catch(() => {}));

  async function check({ idleMs = 30000 } = {}) {
    let latest = current, changed = false;
    try {
      const html = await (await fetch('index.html', { cache: 'no-store' })).text();
      latest = versions([...html.matchAll(/(?:src|href)="[^"]*\?v=([0-9a-z]+)"/g)]) || current;
      const sig = await signature();
      changed = !!(bootSignature && sig && sig !== bootSignature);
    } catch (_) { /* offline: keep running what we have */ }

    const stale = latest !== current || changed;
    const daily = performance.now() > DAY_MS;
    if (!stale && !daily) return 'current';
    if (!window.lobbyIsIdleHome || !window.lobbyIsIdleHome(idleMs)) return 'waiting';

    // If the browser still serves the old copy after a reload, don't loop.
    const target = stale ? latest + (changed ? '+files' : '') : 'daily';
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
