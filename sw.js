// Offline start for the lobby kiosk (registered by kiosk.js).
//
// Every request for this site goes network-first: when the internet is up the
// kiosk always gets the latest files (revalidated, so a new release arrives
// straight away), and each good response is kept. When the internet is down or
// too slow (over 4 seconds), the kept copy is used instead, so a kiosk that
// reboots offline still starts. Only the kiosk registers this; phones don't.

const CACHE = 'lobby-kiosk-v1';
const SLOW_MS = 4000;

// Kept at install so the very first offline start has the page itself.
// Photos are kept as the kiosk loads them (it loads every photo at start).
const CORE = [
  './', 'index.html', 'styles.css', 'copy.js', 'programs.js', 'project-view.js',
  'app.js', 'kiosk.js', 'assets/logo.webp',
  'assets/fonts/schibsted-grotesk-latin.woff2', 'assets/fonts/schibsted-grotesk-latin-ext.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const kept = () => cache.match(req).then((hit) => hit || cache.match(req, { ignoreSearch: true }));
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), SLOW_MS);
    const res = await fetch(req, { cache: 'no-cache', signal: ctrl.signal });
    clearTimeout(timer);
    if (res.ok) {
      await prune(cache, req.url);
      await cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const hit = await kept();
    if (hit) return hit;
    // Nothing kept and the network was only slow: wait for it.
    return fetch(req);
  }
}

// A release changes the ?v= number on its files; drop the older copies.
async function prune(cache, url) {
  const u = new URL(url);
  if (!u.search) return;
  for (const k of await cache.keys()) {
    const ku = new URL(k.url);
    if (ku.pathname === u.pathname && ku.search !== u.search) await cache.delete(k);
  }
}
