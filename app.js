// Naming: on screen, the four carousel cards are pillars and the entries in
// programs.js are programs. In this file the pillar page is the 'program'
// screen (state.prog) and a program page is the 'project' screen
// (state.project); PROJECTS holds programs.js.
(() => {
  'use strict';

  const COPY = window.COPY;
  const PROJECTS = window.KIOSK_PROGRAMS || {};
  const PV = window.ProjectView;
  const PROGRAM_NAMES = (t) => ({ arts: t.p0, leadership: t.p1, bigbets: t.p2, community: t.p3 });

  const DESIGN_W = 1920, DESIGN_H = 1080;
  const PROGRAM_COUNT = 4;
  // Carousel card index → the pillar page it opens.
  const PROGRAM_PAGES = ['arts', 'leadership', 'bigbets', 'community'];
  const SLIDE_MS = 7000;
  const IDLE_MS = 75000;
  const WARN_SECONDS = 15;

  const ICONS = (() => {
    const chevron = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="flex:none;display:block"><path d="M9 5l7 7-7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const back = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M15 5l-7 7 7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const check = (color) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M20 6 9 17l-5-5"/></svg>`;
    return {
      'chevron-navy-24': chevron(24, '#041F3F'),
      'chevron-navy-26': chevron(26, '#041F3F'),
      'chevron-white-22': chevron(22, '#FFFFFF'),
      'chevron-orange-30': chevron(30, '#F0781E'),
      'chevron-blue-32': chevron(32, '#0322B1'),
      'back': back(28, '#FFFFFF'),
      'back-blue-32': back(32, '#0322B1'),
      'grid': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><rect x="3" y="3" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="3" y="14" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="14" y="14" width="7" height="7" rx="1" fill="#FFFFFF"/></svg>',
      'info': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><circle cx="12" cy="12" r="9.5" stroke="#FFFFFF" stroke-width="2.5"/><path d="M12 11v6M12 7.5v.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></svg>',
      'check-blue': check('#0322B1'),
      'check-orange': check('#F0781E')
    };
  })();

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const stage = $('#stage');
  const track = $('#track');
  const cards = $$('.card', track);
  const slides = $$('.slide');
  const dots = $$('.dot');
  const copyEl = $('#programsCopy');
  const idleEl = $('#idle');

  const state = {
    lang: 'en', screen: 'home', prog: 'arts', project: null, projTab: 0, slide: 0,
    warn: false, count: WARN_SECONDS,
    idx: 0, txtIdx: 0, txtOut: false, dragX: 0, dragging: false
  };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; el.style.display = 'flex'; el.style.flex = 'none'; });

  // One language: no switch (see window.LANGUAGES in copy.js).
  const MULTI_LANG = (window.LANGUAGES || ['en', 'fil']).length > 1;
  $$('[data-lang-switch]').forEach((el) => {
    el.hidden = !MULTI_LANG;
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'Language');
    el.innerHTML =
      '<div class="lang__pill"></div>' +
      '<button class="u lang__opt" role="radio" data-set-lang="en">English</button>' +
      '<button class="u lang__opt" role="radio" data-set-lang="fil">Filipino</button>';
  });

  function loadSlots(root) {
    $$('.slot', root).forEach((slot) => {
      const showPlaceholder = () => {
        slot.classList.add('is-empty');
        slot.textContent = slot.dataset.ph || '';
      };
      if (!slot.dataset.src) { showPlaceholder(); return; }
      const img = new Image();
      img.alt = '';
      img.draggable = false;
      img.decoding = 'async';
      img.onerror = showPlaceholder;
      img.src = slot.dataset.src;
      slot.appendChild(img);
    });
  }

  // Project heroes are stacked once and crossfaded, like the program heroes.
  $('#pjHeroes').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].hero).map((id) => {
    const h = PROJECTS[id].hero;
    return `<div class="hero-layer" data-hero-project="${PV.esc(id)}"><div class="slot" data-src="${PV.esc(h.src)}" data-ph="${PV.esc(h.ph)}"></div></div>`;
  }).join('');
  loadSlots(document);

  // ---------- Stage scaling ----------
  // Scale the 1920×1080 design to fit, then widen/heighten the stage so it
  // fills the display edge to edge at any aspect ratio.

  function fit() {
    const w = window.innerWidth, h = window.innerHeight;
    if (!w || !h) { requestAnimationFrame(fit); return; }
    const s = Math.min(w / DESIGN_W, h / DESIGN_H);
    state.scale = s;
    stage.style.width = Math.max(DESIGN_W, w / s) + 'px';
    stage.style.height = Math.max(DESIGN_H, h / s) + 'px';
    stage.style.transform = `scale(${s})`;
  }
  state.scale = 1;

  // ---------- Rendering ----------

  function render() {
    const t = COPY[state.lang];
    const en = state.lang === 'en';
    document.documentElement.lang = en ? 'en' : 'fil';

    $$('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });
    $$('[data-lang-switch]').forEach((el) => { el.dataset.lang = state.lang; });
    $$('[data-set-lang]').forEach((el) => el.setAttribute('aria-checked', String(el.dataset.setLang === state.lang)));

    $$('[data-screen]').forEach((el) => {
      // The program page is the base layer and always stays painted.
      const on = el.dataset.screen === state.screen || el.dataset.screen === 'program';
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-hidden', String(el.dataset.screen !== state.screen));
    });

    // Pillar page.
    const pg = window.pillarPage(t, state.prog);
    $$('[data-pg]').forEach((el) => { el.textContent = pg[el.dataset.pg]; });
    $$('[data-hero]').forEach((el) => el.classList.toggle('is-on', el.dataset.hero === state.prog));
    $$('[data-for-prog]').forEach((el) => { el.hidden = el.dataset.forProg !== state.prog; });
    $$('[data-tile]').forEach((el) => { el.hidden = el.dataset.tile === state.prog; });
    renderProjectList(t);
    renderProject(t);

    slides.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    dots.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));

    renderCards();
    track.classList.toggle('is-dragging', state.dragging);
    $('.arrow--prev').disabled = state.idx === 0;
    $('.arrow--next').disabled = state.idx === PROGRAM_COUNT - 1;

    const name = t['p' + state.txtIdx];
    $('#curName').textContent = name;
    $('#curDesc').textContent = t['d' + state.txtIdx];
    $('#exploreLabel').textContent = t.learnMore;
    copyEl.classList.toggle('is-out', state.txtOut);

    idleEl.classList.toggle('is-open', state.warn);
    idleEl.setAttribute('aria-hidden', String(!state.warn));
    $('#idleCount').textContent = state.count;
  }

  // Every program in programs.js under the pillar on screen. Programs without
  // content yet are listed but don't open.
  let listKey = '';
  function renderProjectList(t) {
    const key = state.prog + '|' + state.lang;
    if (key === listKey) return;
    listKey = key;
    const chevron = ICONS['chevron-navy-24'];
    $('#projectList').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].pillar === state.prog).map((id) => {
      const p = PROJECTS[id];
      const action = p.en ? ` data-action="open-project" data-project="${PV.esc(id)}"` : '';
      return `<button class="u press project"${action}>
        <span class="project__text"><span class="project__name">${PV.esc(p.title)}</span><span class="project__sub">${PV.esc(t.tap)}</span></span>
        <span class="project__go">${chevron}</span>
      </button>`;
    }).join('');
  }

  // The project screen is rebuilt when the project or language changes;
  // switching tabs only moves the indicator and crossfades the panels.
  let projectKey = '';
  function renderProject(t) {
    const p = PROJECTS[state.project];
    $$('[data-hero-project]').forEach((el) => el.classList.toggle('is-on', el.dataset.heroProject === state.project));
    if (!p) return;
    const c = PV.content(p, state.lang) || {};
    const secs = c.sections || [];
    const key = state.project + '|' + state.lang;
    if (key !== projectKey) {
      projectKey = key;
      const progName = PROGRAM_NAMES(t)[p.pillar] || '';
      $('#pjIntro').innerHTML =
        `<div class="eyebrow">${PV.esc(progName)}</div>
        <h1 class="pj-title">${PV.esc(p.title)}</h1>
        ${c.lead ? `<p class="pj-lead">${PV.esc(c.lead)}</p>` : ''}
        ${(c.body || []).map((b) => `<p class="pj-body">${PV.esc(b)}</p>`).join('')}`;
      // Tighten a long intro if it would squeeze the hero below 240px.
      const intro = $('#pjIntro');
      intro.classList.remove('is-dense');
      if ($('.screen--project .panel__media').offsetHeight < 240) intro.classList.add('is-dense');
      $('#pjBackLabel').textContent = progName;
      const tabs = $('#pjTabs');
      tabs.hidden = secs.length < 2;
      tabs.setAttribute('aria-label', p.title);
      tabs.innerHTML = `<div class="tabs__pill" style="width:calc((100% - 12px) / ${Math.max(1, secs.length)})"></div>` +
        secs.map((s, i) => `<button class="u tabs__tab" role="tab" data-pj-tab="${i}">${PV.esc(s.tab)}</button>`).join('');
      $('#pjPanels').innerHTML = secs.map((s) => `<section class="pj-panel" role="tabpanel">${PV.section(s, 'kiosk')}</section>`).join('');
      const contact = $('#pjContact');
      contact.hidden = !c.contact;
      contact.innerHTML = PV.contact(c.contact, 'kiosk');
    }
    const pill = $('#pjTabs .tabs__pill');
    if (pill) pill.style.transform = `translateX(${state.projTab * 100}%)`;
    $$('#pjTabs [data-pj-tab]').forEach((el) => el.setAttribute('aria-selected', String(+el.dataset.pjTab === state.projTab)));
    $$('#pjPanels .pj-panel').forEach((el, i) => {
      el.classList.toggle('is-on', i === state.projTab);
      el.setAttribute('aria-hidden', String(i !== state.projTab));
    });
  }

  function renderCards() {
    cards.forEach((el, i) => {
      const d = (i - state.idx) + state.dragX / 760;
      const a = Math.abs(d);
      const sc = 1 - Math.min(a, 1) * 0.18;
      el.style.transform = `translateX(calc(-50% + ${d * 92}%)) scale(${sc})`;
      el.style.opacity = a > 1.6 ? 0 : 1 - Math.min(a, 1) * 0.45;
      el.style.zIndex = 10 - Math.round(a);
    });
  }

  function setState(patch) {
    const prevScreen = state.screen, prevProg = state.prog;
    Object.assign(state, patch);
    render();
    if (state.screen === 'program') {
      // Going back from a project screen is a step out, so only animate
      // when arriving from elsewhere or switching program.
      const fromProject = prevScreen === 'project';
      if ((prevScreen !== 'program' && !fromProject) || (prevScreen === 'program' && state.prog !== prevProg)) enterProgram();
    }
    if (state.screen !== prevScreen) bump();
  }

  // ---------- Motion ----------

  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Program page content rises 12px and fades in, 30ms apart, done in
  // under 300ms. Taps work throughout.
  const programParts = $$('.screen--program .panel__text, .screen--program .program-main > .section');
  function enterProgram() {
    const from = reducedMotion() ? { opacity: 0 } : { opacity: 0, transform: 'translateY(12px)' };
    const to = reducedMotion() ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0)' };
    programParts.forEach((el, i) => {
      el.animate([from, to], { duration: 200, delay: i * 30, easing: EASE_OUT, fill: 'backwards' });
    });
  }

  // Critically damped spring (no bounce) sampled into a CSS linear() easing.
  (() => {
    if (!CSS.supports('transition-timing-function', 'linear(0, 1)')) return;
    const w = 8, n = 24, pts = [];
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      pts.push(k === n ? 1 : +(1 - (1 + w * t) * Math.exp(-w * t)).toFixed(4));
    }
    document.documentElement.style.setProperty('--spring', `linear(${pts.join(', ')})`);
  })();

  let springTimer;
  function springCards() {
    clearTimeout(springTimer);
    track.classList.add('is-springing');
    springTimer = setTimeout(() => track.classList.remove('is-springing'), 420);
  }

  const idleBar = $('#idleBar');
  let idleBarAnim;
  function startIdleBar() {
    if (idleBarAnim) idleBarAnim.cancel();
    idleBarAnim = idleBar.animate(
      [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }],
      { duration: WARN_SECONDS * 1000, easing: 'linear', fill: 'forwards' }
    );
  }

  // ---------- Navigation ----------

  let txtTimer;
  function openList(i) {
    clearTimeout(txtTimer);
    setState({ screen: 'programs', idx: i, txtIdx: i, txtOut: false, dragX: 0 });
  }
  function go(i) {
    i = Math.max(0, Math.min(PROGRAM_COUNT - 1, i));
    if (i === state.idx) return;
    clearTimeout(txtTimer);
    setState({ idx: i, txtOut: true });
    txtTimer = setTimeout(() => setState({ txtIdx: i, txtOut: false }), 150);
  }
  function goHome() {
    stopWarn();
    setState({ screen: 'home', lang: 'en', warn: false });
  }

  // Opening "Our programs" from home always starts on the middle card.
  const startExplore = () => openList(Math.floor((PROGRAM_COUNT - 1) / 2));

  const ACTIONS = {
    'explore-start': startExplore,
    'start-over': goHome,
    'all-programs': () => openList(0),
    'open-prog': (el) => setState({ screen: 'program', prog: el.dataset.prog }),
    'open-project': (el) => setState({ screen: 'project', project: el.dataset.project, projTab: 0 }),
    'project-back': () => setState({ screen: 'program', prog: (PROJECTS[state.project] || {}).pillar || 'arts' }),
    'prev': () => go(state.idx - 1),
    'next': () => go(state.idx + 1),
    'explore': () => {
      const prog = PROGRAM_PAGES[state.idx];
      if (prog) setState({ screen: 'program', prog });
    },
    'keep-going': () => bump(),
    'about': () => {}
  };

  stage.addEventListener('click', (e) => {
    const langBtn = e.target.closest('[data-set-lang]');
    if (langBtn) { setState({ lang: langBtn.dataset.setLang }); return; }
    const tab = e.target.closest('[data-pj-tab]');
    if (tab) { setState({ projTab: +tab.dataset.pjTab }); return; }
    const el = e.target.closest('[data-action]');
    if (el && ACTIONS[el.dataset.action]) ACTIONS[el.dataset.action](el);
  });

  // ---------- Carousel drag ----------

  let drag = null;
  track.addEventListener('pointerdown', (e) => {
    if (drag || e.target.closest('.arrow')) return;
    // Side cards shrink slightly while pressed, like every other tappable.
    const card = e.target.closest('[data-card]');
    const pressed = card && +card.dataset.card !== state.idx ? card : null;
    if (pressed) pressed.classList.add('is-pressed');
    drag = { x: e.clientX, t: performance.now(), id: e.pointerId, moved: false, pressed };
  });
  const release = (d) => { if (d.pressed) d.pressed.classList.remove('is-pressed'); };
  track.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    let dx = (e.clientX - drag.x) / state.scale;
    if (!drag.moved && Math.abs(dx) > 8) {
      drag.moved = true;
      release(drag);
      try { track.setPointerCapture(drag.id); } catch (_) {}
    }
    if (!drag.moved) return;
    // Resist past the first and last card.
    const i = state.idx;
    if ((i === 0 && dx > 0) || (i === PROGRAM_COUNT - 1 && dx < 0)) dx = Math.sign(dx) * Math.pow(Math.abs(dx), 0.8);
    state.dragX = dx;
    state.dragging = true;
    track.classList.add('is-dragging');
    renderCards();
  });
  const endDrag = (e) => {
    const d = drag;
    if (!d || e.pointerId !== d.id) return;
    drag = null;
    release(d);
    if (!d.moved) {
      if (e.type === 'pointercancel') return;
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const card = hit && hit.closest('[data-card]');
      if (card) go(+card.dataset.card);
      return;
    }
    const dx = state.dragX;
    const v = Math.abs(dx) / Math.max(1, performance.now() - d.t);
    let i = state.idx;
    if (Math.abs(dx) > 220 || (v > 0.11 && Math.abs(dx) > 30)) i += dx < 0 ? 1 : -1;
    springCards();
    setState({ dragX: 0, dragging: false });
    go(i);
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // ---------- Idle reset ----------
  // After 75s without a touch, show "Still there?" with a 15s countdown,
  // then return to the home screen in English for the next visitor.

  let idleTimer, tickTimer;
  function stopWarn() { clearTimeout(idleTimer); clearInterval(tickTimer); }
  function bump(e) {
    if (e && e.target && e.target.closest && e.target.closest('[data-idle-modal]')) return;
    stopWarn();
    if (state.warn) setState({ warn: false });
    if (state.screen === 'home') return;
    idleTimer = setTimeout(() => {
      setState({ warn: true, count: WARN_SECONDS });
      startIdleBar();
      tickTimer = setInterval(() => {
        const c = state.count - 1;
        if (c <= 0) goHome(); else setState({ count: c });
      }, 1000);
    }, IDLE_MS);
  }
  window.addEventListener('pointerdown', bump);

  // ---------- Home photo rotation ----------

  setInterval(() => {
    if (state.screen === 'home') setState({ slide: (state.slide + 1) % slides.length });
  }, SLIDE_MS);

  // ---------- Boot ----------

  fit();
  window.addEventListener('resize', fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(document.querySelector('.viewport'));
  render();
})();
