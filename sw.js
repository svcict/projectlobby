/* Offline support for the kiosk.
   The page is fetched from the network first so a new version shows up on the next reload, but after
   4 seconds, or with no network at all, the saved copy is used, so a dropped Wi-Fi never leaves the
   lobby screen blank. Pictures, fonts and icons come straight from the saved copy and are refreshed
   in the background. Bump VERSION when files are added to or removed from PRECACHE. */
var VERSION = 'tulay-v2';
var PRECACHE = [
  './',
  'manifest.webmanifest',
  'img/welcome.webp', 'img/arts.webp', 'img/leadership.webp', 'img/bigbets.webp', 'img/community.webp', 'img/museum.webp',
  'fonts/familjen-grotesk-latin.woff2', 'fonts/familjen-grotesk-latin-ext.woff2',
  'vendor/qrcode.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];
var PAGE_TIMEOUT_MS = 4000;

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function fromNetwork(req, key) {
  return fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(key || req, copy); }); }
    return res;
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    /* every visit to the kiosk is the one page, saved under './' */
    e.respondWith(new Promise(function (resolve) {
      var done = false;
      function saved() { return caches.match('./').then(function (hit) { return hit || fetch(req); }); }
      var timer = setTimeout(function () { if (!done) { done = true; resolve(saved()); } }, PAGE_TIMEOUT_MS);
      fromNetwork(req, './').then(function (res) {
        if (!done) { done = true; clearTimeout(timer); resolve(res.ok ? res : saved()); }
      }, function () {
        if (!done) { done = true; clearTimeout(timer); resolve(saved()); }
      });
    }));
    return;
  }

  var fresh = fromNetwork(req);
  e.waitUntil(fresh.then(function () {}, function () {}));
  e.respondWith(caches.match(req).then(function (hit) { return hit || fresh; }));
});
