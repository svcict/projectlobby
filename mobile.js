// Naming: on screen, the four cards are pillars and the entries in programs.js
// are programs. Here the pillar page is the 'program' view and a program page
// is the 'project' view; PROJECTS holds programs.js.
(() => {
  'use strict';

  const COPY = window.COPY;
  const PROJECTS = window.KIOSK_PROGRAMS || {};
  const PV = window.ProjectView;
  const SLIDE_MS = 6000;

  // Each screen has its own address, so the phone's back button works and the
  // kiosk's QR codes can open a program directly (mobile.html#arts).
  // Programs with content live at #program/<id>, e.g. #program/museum.
  // Older #programs and #project/<id> links still work.
  const ROUTES = {
    '': { view: 'home' },
    'pillars': { view: 'programs', parent: '' },
    'programs': { view: 'programs', parent: '' },
    'arts': { view: 'program', prog: 'arts', parent: 'pillars' },
    'leadership': { view: 'program', prog: 'leadership', parent: 'pillars' },
    'bigbets': { view: 'program', prog: 'bigbets', parent: 'pillars' },
    'community': { view: 'program', prog: 'community', parent: 'pillars' }
  };
  Object.keys(PROJECTS).forEach((id) => {
    const p = PROJECTS[id];
    if (!p.en) return;
    // Corporate Citizenship (pillar 'support') is opened from the pillars screen.
    const parent = p.pillar === 'support' ? 'pillars' : p.pillar;
    ROUTES['program/' + id] = ROUTES['project/' + id] = { view: 'project', project: id, prog: p.pillar, parent };
  });

  const check = (color) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M20 6 9 17l-5-5"/></svg>`;
  const ICONS = {
    'go': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M9 5l7 7-7 7" stroke="#041F3F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'check-blue': check('#0322B1'),
    'check-orange': check('#F0781E')
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const slides = $$('.m-slide');
  const dots = $$('.m-dot');
  const state = { route: '', slide: 0, tab: 0 };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; });

  // iOS only shows :active (the press scale on cards and buttons) when the
  // page listens for touches, so listen and do nothing.
  document.addEventListener('touchstart', () => {}, { passive: true });

  // Project heroes stay stacked; only the current one shows.
  $('#pjHeroes').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].hero).map((id) => {
    const h = PROJECTS[id].hero;
    return `<div class="slot m-hero__layer" data-hero-project="${PV.esc(id)}" data-src="${PV.esc(h.src)}" data-ph="${PV.esc(h.ph)}"${h.pos ? ` data-pos="${PV.esc(h.pos)}"` : ''}></div>`;
  }).join('');

  $$('.slot').forEach((slot) => {
    const showPlaceholder = () => {
      slot.classList.add('is-empty');
      slot.textContent = slot.dataset.ph || '';
    };
    if (!slot.dataset.src) { showPlaceholder(); return; }
    const img = new Image();
    img.alt = '';
    if (slot.dataset.pos) img.style.objectPosition = slot.dataset.pos;
    img.decoding = 'async';
    img.onerror = showPlaceholder;
    // The home slides are stacked, so lazy loading would fetch them all at
    // once: the first loads first, the rest wait until the page has loaded.
    // Opened on another screen (a pillar or program link), every slide waits.
    const atHome = !location.hash.replace(/^#\/?/, '');
    if ('priority' in slot.dataset && atHome) img.fetchPriority = 'high';
    else img.loading = 'lazy';
    const wait = 'defer' in slot.dataset || ('priority' in slot.dataset && !atHome);
    const load = () => { img.src = slot.dataset.src; };
    if (wait && document.readyState !== 'complete') window.addEventListener('load', load, { once: true });
    else load();
    slot.appendChild(img);
  });

  // ---------- Rendering ----------

  function render() {
    const t = COPY.en;
    const route = ROUTES[state.route] || ROUTES[''];
    const prog = route.prog || 'arts';

    $$('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });

    $$('[data-view]').forEach((el) => { el.hidden = el.dataset.view !== route.view; });

    const pg = window.pillarPage(t, prog);
    $$('[data-pg]').forEach((el) => { el.textContent = pg[el.dataset.pg]; });
    $$('[data-for-prog]').forEach((el) => { el.hidden = el.dataset.forProg !== prog; });
    $$('[data-tile]').forEach((el) => { el.hidden = el.dataset.tile === prog; });
    renderProjectList(t, prog);
    renderProject(t, route.project);

    $('#back').hidden = route.view === 'home';
    // Home has no back button or title, so the bar would be empty.
    $('.top').hidden = route.view === 'home';
    $('#barTitle').textContent = {
      home: '', programs: t.allTitle, program: pg.title,
      project: route.project ? PROJECTS[route.project].title : ''
    }[route.view];
    document.title = route.view === 'home' ? 'Ayala Foundation' : $('#barTitle').textContent + ' · Ayala Foundation';

    const names = [t.p3, t.p0, t.p1, t.p2]; // slide order: community, arts, leadership, education
    slides.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    dots.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    $('#slideName').textContent = names[state.slide];
  }

  // Every program in programs.js under the pillar on screen. Programs without
  // content yet are listed but don't open.
  function renderProjectList(t, prog) {
    $('#projectList').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].pillar === prog).map((id) => {
      const p = PROJECTS[id];
      const inner = `<span class="m-project__text"><span class="m-project__name">${PV.esc(p.title)}</span><span class="m-project__sub">${PV.esc(t.tap)}</span></span>
        <span class="m-go">${ICONS.go}</span>`;
      return p.en
        ? `<a class="u press m-project" href="#program/${encodeURIComponent(id)}">${inner}</a>`
        : `<div class="m-project">${inner}</div>`;
    }).join('');
  }

  // The same sections and tabs as the kiosk, one section showing at a time.
  let projectKey = '';
  function renderProject(t, id) {
    $$('[data-hero-project]').forEach((el) => { el.hidden = el.dataset.heroProject !== id; });
    const p = PROJECTS[id];
    const key = id;
    if (p && key === projectKey) { showTab(); return; }
    if (!p) return;
    projectKey = key;
    const c = PV.content(p) || {};
    const progName = { arts: t.p0, leadership: t.p1, bigbets: t.p2, community: t.p3, support: t.pSupport }[p.pillar] || '';
    $('#pjIntro').innerHTML =
      `<div class="m-eyebrow">${PV.esc(progName)}</div>
      <h1 class="m-title m-title--project">${PV.esc(p.title)}</h1>
      ${c.lead ? `<p class="m-band__lead">${PV.esc(c.lead)}</p>` : ''}`;
    $('#pjBody').innerHTML = PV.body(c.body, 'm-text');
    const secs = c.sections || [];
    const tabs = $('#pjTabs');
    tabs.hidden = secs.length < 2;
    $('.m-tabs__bar', tabs).setAttribute('aria-label', p.title);
    $('.m-tabs__bar', tabs).innerHTML = '<div class="m-tabs__pill" aria-hidden="true"></div>' +
      secs.map((s, i) => `<button class="u m-tabs__tab" role="tab" data-pj-tab="${i}">${PV.esc(s.tab)}</button>`).join('');
    $('#pjSections').innerHTML = secs.map((s) => `<div class="m-section" role="tabpanel">${PV.section(s, 'mobile')}</div>`).join('');
    const contact = $('#pjContact');
    contact.hidden = !c.contact;
    contact.innerHTML = PV.contact(c.contact, 'mobile');
    showTab();
  }

  function showTab() {
    $$('#pjTabs [data-pj-tab]').forEach((el) => {
      const on = +el.dataset.pjTab === state.tab;
      el.setAttribute('aria-selected', String(on));
      el.tabIndex = on ? 0 : -1;
    });
    $$('#pjSections .m-section').forEach((el, i) => { el.hidden = i !== state.tab; });
    placePill();
  }

  // Tabs are as wide as their labels, so the pill takes the selected tab's
  // measured position and width.
  function placePill() {
    fitTabs();
    const pill = $('#pjTabs .m-tabs__pill');
    const tab = $(`#pjTabs [data-pj-tab="${state.tab}"]`);
    if (!pill || !tab || !tab.offsetWidth) return;
    pill.style.width = tab.offsetWidth + 'px';
    pill.style.transform = `translateX(${tab.offsetLeft - pill.offsetLeft}px)`;
  }
  // Labels stay on one line; if the tabs don't fit, only the widest wraps
  // (then the next widest, until they fit).
  function fitTabs() {
    const bar = $('#pjTabs .m-tabs__bar');
    if (!bar || !bar.clientWidth) return;
    const tabs = $$('[data-pj-tab]', bar);
    tabs.forEach((el) => el.classList.add('is-nowrap'));
    for (const el of tabs.slice().sort((x, y) => y.offsetWidth - x.offsetWidth)) {
      if (bar.scrollWidth <= bar.clientWidth) break;
      el.classList.remove('is-nowrap');
    }
  }
  window.addEventListener('resize', placePill);
  if (document.fonts) document.fonts.ready.then(placePill);

  // Tabs from the keyboard: Left/Right move to the neighbouring tab, Home and
  // End to the first and last, and focus follows the selection.
  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest && e.target.closest('[data-pj-tab]');
    if (!tab) return;
    const n = $$('#pjTabs [data-pj-tab]').length;
    const i = { ArrowRight: state.tab + 1, ArrowLeft: state.tab - 1, Home: 0, End: n - 1 }[e.key];
    if (i === undefined) return;
    e.preventDefault();
    $(`#pjTabs [data-pj-tab="${(i + n) % n}"]`).click();
    $(`#pjTabs [data-pj-tab="${state.tab}"]`).focus();
  });

  // Switching tabs: show the new section, fade it in, and if the reader had
  // scrolled down past the tabs, bring the start of the section into view.
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-pj-tab]');
    if (!tab || +tab.dataset.pjTab === state.tab) return;
    state.tab = +tab.dataset.pjTab;
    showTab();
    const sec = $$('#pjSections .m-section')[state.tab];
    if (sec) sec.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease' });
    if (sec && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $$('.pj-stat, .pj-pillar, .pj-package, .pj-list__items li, .pj-bigstat, .pj-chart, .pj-quote, .pj-about__row', sec).slice(0, 6).forEach((el, i) =>
        el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 180, delay: i * 30, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'backwards' }));
    }
    const bar = $('#pjTabs');
    const below = $('.top').offsetHeight + bar.offsetHeight;
    if (sec && sec.getBoundingClientRect().top < below) {
      window.scrollTo(0, window.scrollY + sec.getBoundingClientRect().top - below);
    }
  });

  // ---------- Navigation ----------

  // How deep each view sits: home, pillars, a pillar, a program.
  const DEPTH = { home: 0, programs: 1, program: 2, project: 3 };
  let booted = false, depth = 0;
  function onRoute() {
    const key = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    state.route = key in ROUTES ? key : '';
    state.tab = 0;
    render();
    window.scrollTo(0, 0);
    // Going deeper, the new screen comes in from the right; going back, from
    // the left; reduced motion keeps only the fade.
    const view = $$('[data-view]').find((el) => !el.hidden);
    const next = DEPTH[(ROUTES[state.route] || ROUTES['']).view] || 0;
    const dx = next < depth ? -12 : 12;
    depth = next;
    const move = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (view && booted) view.animate(move ? [{ opacity: 0, transform: `translateX(${dx}px)` }, { opacity: 1, transform: 'none' }] : [{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    booted = true;
  }
  window.addEventListener('hashchange', onRoute);

  // Arrived from a lobby QR code: say so once, then drop ?from=lobby so a
  // reload or a shared link doesn't repeat it. Hides itself after 6 seconds.
  if (new URLSearchParams(location.search).get('from') === 'lobby') {
    const note = $('#fromLobby');
    history.replaceState(null, '', location.pathname + location.hash);
    note.hidden = false;
    requestAnimationFrame(() => note.classList.add('is-on'));
    const close = () => { note.classList.remove('is-on'); setTimeout(() => { note.hidden = true; }, 240); };
    const timer = setTimeout(close, 6000);
    $('#fromLobbyClose').addEventListener('click', () => { clearTimeout(timer); close(); });
  }

  $('#back').addEventListener('click', () => {
    const route = ROUTES[state.route] || ROUTES[''];
    location.hash = route.parent || '';
  });

  // ---------- Home photo rotation ----------

  setInterval(() => {
    if ((ROUTES[state.route] || {}).view !== 'home' || document.hidden) return;
    state.slide = (state.slide + 1) % slides.length;
    render();
  }, SLIDE_MS);

  onRoute();
})();
