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
    ROUTES['program/' + id] = ROUTES['project/' + id] = { view: 'project', project: id, prog: p.pillar, parent: p.pillar };
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
  const state = { lang: 'en', route: '', slide: 0, tab: 0 };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; });

  // Project heroes stay stacked; only the current one shows.
  $('#pjHeroes').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].hero).map((id) => {
    const h = PROJECTS[id].hero;
    return `<div class="slot m-hero__layer" data-hero-project="${PV.esc(id)}" data-src="${PV.esc(h.src)}" data-ph="${PV.esc(h.ph)}"></div>`;
  }).join('');

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

    const pg = window.pillarPage(t, prog);
    $$('[data-pg]').forEach((el) => { el.textContent = pg[el.dataset.pg]; });
    $$('[data-for-prog]').forEach((el) => { el.hidden = el.dataset.forProg !== prog; });
    $$('[data-tile]').forEach((el) => { el.hidden = el.dataset.tile === prog; });
    renderProjectList(t, prog);
    renderProject(t, route.project);

    $('#back').hidden = route.view === 'home';
    $('#barTitle').textContent = {
      home: '', programs: t.allTitle, program: pg.title,
      project: route.project ? PROJECTS[route.project].title : ''
    }[route.view];
    document.title = route.view === 'home' ? 'Ayala Foundation' : $('#barTitle').textContent + ' · Ayala Foundation';

    const names = [t.p0, t.p1, t.p2, t.p3];
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
    const key = id + '|' + state.lang;
    if (p && key === projectKey) { showTab(); return; }
    if (!p) return;
    projectKey = key;
    const c = PV.content(p, state.lang) || {};
    const progName = { arts: t.p0, leadership: t.p1, bigbets: t.p2, community: t.p3 }[p.pillar] || '';
    $('#pjIntro').innerHTML =
      `<div class="m-eyebrow">${PV.esc(progName)}</div>
      <h1 class="m-title m-title--project">${PV.esc(p.title)}</h1>
      ${c.lead ? `<p class="m-band__lead">${PV.esc(c.lead)}</p>` : ''}`;
    $('#pjBody').innerHTML = (c.body || []).map((b) => `<p class="m-text">${PV.esc(b)}</p>`).join('');
    const secs = c.sections || [];
    const tabs = $('#pjTabs');
    tabs.hidden = secs.length < 2;
    $('.m-tabs__bar', tabs).setAttribute('aria-label', p.title);
    $('.m-tabs__bar', tabs).innerHTML = `<div class="m-tabs__pill" style="width:calc((100% - 8px) / ${Math.max(1, secs.length)})"></div>` +
      secs.map((s, i) => `<button class="u m-tabs__tab" role="tab" data-pj-tab="${i}">${PV.esc(s.tab)}</button>`).join('');
    $('#pjSections').innerHTML = secs.map((s) => `<div class="m-section" role="tabpanel">${PV.section(s, 'mobile')}</div>`).join('');
    const contact = $('#pjContact');
    contact.hidden = !c.contact;
    contact.innerHTML = PV.contact(c.contact, 'mobile');
    showTab();
  }

  function showTab() {
    const pill = $('#pjTabs .m-tabs__pill');
    if (pill) pill.style.transform = `translateX(${state.tab * 100}%)`;
    $$('#pjTabs [data-pj-tab]').forEach((el) => el.setAttribute('aria-selected', String(+el.dataset.pjTab === state.tab)));
    $$('#pjSections .m-section').forEach((el, i) => { el.hidden = i !== state.tab; });
  }

  // Switching tabs: show the new section, fade it in, and if the reader had
  // scrolled down past the tabs, bring the start of the section into view.
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-pj-tab]');
    if (!tab || +tab.dataset.pjTab === state.tab) return;
    state.tab = +tab.dataset.pjTab;
    showTab();
    const sec = $$('#pjSections .m-section')[state.tab];
    if (sec) sec.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease' });
    const bar = $('#pjTabs');
    const below = $('.top').offsetHeight + bar.offsetHeight;
    if (sec && sec.getBoundingClientRect().top < below) {
      window.scrollTo(0, window.scrollY + sec.getBoundingClientRect().top - below);
    }
  });

  // ---------- Navigation ----------

  function onRoute() {
    const key = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    state.route = key in ROUTES ? key : '';
    state.tab = 0;
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
