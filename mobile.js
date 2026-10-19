(() => {
  'use strict';

  const COPY = window.COPY;
  const SLIDE_MS = 6000;

  // Each screen has its own address, so the phone's back button works and the
  // kiosk's QR codes can open a program directly (mobile.html#arts).
  const ROUTES = {
    '': { view: 'home' },
    'programs': { view: 'programs', parent: '' },
    'arts': { view: 'program', prog: 'arts', parent: 'programs' },
    'bigbets': { view: 'program', prog: 'bigbets', parent: 'programs' },
    'museum': { view: 'museum', parent: 'arts' },
    'centex-de': { view: 'centex-de', parent: 'bigbets' }
  };

  const check = (color) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M20 6 9 17l-5-5"/></svg>`;
  const ICONS = {
    'go': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M9 5l7 7-7 7" stroke="#041F3F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'check-blue': check('#0B53A5'),
    'check-orange': check('#F7941D')
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const slides = $$('.m-slide');
  const dots = $$('.m-dot');
  const state = { lang: 'en', route: '', slide: 0 };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; });

  $$('.slot').forEach((slot) => {
    const showPlaceholder = () => {
      slot.classList.add('is-empty');
      slot.textContent = slot.dataset.ph || '';
    };
    if (!slot.dataset.src) { showPlaceholder(); return; }
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'lazy';
    img.onerror = showPlaceholder;
    img.src = slot.dataset.src;
    slot.appendChild(img);
  });

  // ---------- Rendering ----------

  function render() {
    const t = COPY[state.lang];
    const route = ROUTES[state.route] || ROUTES[''];
    const prog = route.prog || 'arts';
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'fil';

    $$('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });
    $('.lang').dataset.lang = state.lang;
    $$('[data-set-lang]').forEach((el) => el.setAttribute('aria-checked', String(el.dataset.setLang === state.lang)));

    $$('[data-view]').forEach((el) => { el.hidden = el.dataset.view !== route.view; });

    const pg = prog === 'bigbets'
      ? { title: t.p2, body: t.bbBody, giveBody: t.bbGive }
      : { title: t.title, body: t.body, giveBody: t.giveBody };
    $$('[data-pg]').forEach((el) => { el.textContent = pg[el.dataset.pg]; });
    $$('[data-for-prog]').forEach((el) => { el.hidden = el.dataset.forProg !== prog; });
    $$('[data-tile]').forEach((el) => { el.hidden = el.dataset.tile === prog; });

    $('#back').hidden = route.view === 'home';
    $('#barTitle').textContent = {
      home: '', programs: t.allTitle, program: pg.title,
      museum: 'Ayala Museum', 'centex-de': 'CENTEX Digital Education'
    }[route.view];
    document.title = route.view === 'home' ? 'Ayala Foundation' : $('#barTitle').textContent + ' · Ayala Foundation';

    const names = [t.p0, t.p1, t.p2, t.p3];
    slides.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    dots.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    $('#slideName').textContent = names[state.slide];
  }

  // ---------- Navigation ----------

  function onRoute() {
    const key = location.hash.replace(/^#\/?/, '');
    state.route = key in ROUTES ? key : '';
    render();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', onRoute);

  $('#back').addEventListener('click', () => {
    const route = ROUTES[state.route] || ROUTES[''];
    location.hash = route.parent || '';
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-set-lang]');
    if (btn) { state.lang = btn.dataset.setLang; render(); }
  });

  // ---------- Home photo rotation ----------

  setInterval(() => {
    if ((ROUTES[state.route] || {}).view !== 'home' || document.hidden) return;
    state.slide = (state.slide + 1) % slides.length;
    render();
  }, SLIDE_MS);

  onRoute();
})();
