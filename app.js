// Naming: on screen, the four carousel cards are pillars and the entries in
// programs.js are programs. In this file the pillar page is the 'program'
// screen (state.prog) and a program page is the 'project' screen
// (state.project); PROJECTS holds programs.js.
(() => {
  'use strict';

  const COPY = window.COPY;
  const PROJECTS = window.KIOSK_PROGRAMS || {};
  const PV = window.ProjectView;
  const PROGRAM_NAMES = (t) => ({ arts: t.p0, leadership: t.p1, bigbets: t.p2, community: t.p3, support: t.pSupport });

  const DESIGN_W = 1920, DESIGN_H = 1080;
  const PROGRAM_COUNT = 4;
  // Carousel card index → the pillar page it opens.
  // Carousel order, as on the foundation's pillar diagram: the three strategic
  // pillars, then the big bet. Copy keys stay p0-p3 / d0-d3 by pillar (COPY_KEY).
  const PROGRAM_PAGES = ['community', 'arts', 'leadership', 'bigbets'];
  const COPY_KEY = { arts: 0, leadership: 1, bigbets: 2, community: 3 };
  const SLIDE_MS = 7000;
  const IDLE_MS = 75000;
  const WARN_SECONDS = 15;

  const ICONS = (() => {
    const chevron = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="flex:none;display:block"><path d="M9 5l7 7-7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const back = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M15 5l-7 7 7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const check = (color) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M20 6 9 17l-5-5"/></svg>`;
    return {
      'chevron-navy-24': chevron(24, '#041F3F'),
      'chevron-white-22': chevron(22, '#FFFFFF'),
      'chevron-white-26': chevron(26, '#FFFFFF'),
      'chevron-orange-30': chevron(30, '#F0781E'),
      'chevron-blue-32': chevron(32, '#0322B1'),
      'back': back(28, 'currentColor'),
      'back-blue-32': back(32, '#0322B1'),
      'grid': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><rect x="3" y="3" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="3" y="14" width="7" height="7" rx="1" fill="#FFFFFF"/><rect x="14" y="14" width="7" height="7" rx="1" fill="#FFFFFF"/></svg>',
      'home': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
      'info': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="2.5"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
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
    screen: 'home', prog: 'arts', project: null, projTab: 0, slide: 0,
    warn: false, count: WARN_SECONDS,
    idx: 0, txtIdx: 0, txtOut: false, dragX: 0, dragging: false
  };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; el.style.display = 'flex'; el.style.flex = 'none'; });

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
      if (slot.dataset.pos) img.style.objectPosition = slot.dataset.pos;
      img.src = slot.dataset.src;
      slot.appendChild(img);
    });
  }

  // Project heroes are stacked once and crossfaded, like the program heroes.
  $('#pjHeroes').innerHTML = Object.keys(PROJECTS).filter((id) => PROJECTS[id].hero).map((id) => {
    const h = PROJECTS[id].hero;
    return `<div class="hero-layer" data-hero-project="${PV.esc(id)}"><div class="slot" data-src="${PV.esc(h.src)}" data-ph="${PV.esc(h.ph)}"${h.pos ? ` data-pos="${PV.esc(h.pos)}"` : ''}></div></div>`;
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
    const t = COPY.en;

    $$('[data-t]').forEach((el) => { el.textContent = t[el.dataset.t]; });

    $$('[data-screen]').forEach((el) => {
      // The program page is the base layer and always stays painted.
      const on = el.dataset.screen === state.screen || el.dataset.screen === 'program';
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-hidden', String(el.dataset.screen !== state.screen));
      // Screens out of view can't take keyboard focus either.
      el.inert = el.dataset.screen !== state.screen;
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
    if (!homeStatsBuilt) {
      homeStatsBuilt = true;
      $('#homeStats').innerHTML = (t.homeStats || []).map((s) => `<div class="home-stat"><div class="home-stat__value">${PV.esc(s.value)}</div><div class="home-stat__label">${PV.esc(s.label)}</div><div class="home-stat__source">${PV.esc(s.source)}</div></div>`).join('');
    }
    $$('#homeStats .home-stat').forEach((el, i) => { el.classList.toggle('is-on', i === state.slide); el.setAttribute('aria-hidden', String(i !== state.slide)); });
    dots.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));

    renderCards();
    track.classList.toggle('is-dragging', state.dragging);
    $('.arrow--prev').disabled = state.idx === 0;
    $('.arrow--next').disabled = state.idx === PROGRAM_COUNT - 1;

    const name = t['p' + COPY_KEY[PROGRAM_PAGES[state.txtIdx]]];
    $('#curName').textContent = name;
    const bet = PROGRAM_PAGES[state.txtIdx] === 'bigbets';
    $('#curTag').textContent = bet ? t.tagBet : t.tagPillar;
    $('#curTag').classList.toggle('programs__tag--bet', bet);
    const desc = t['d' + COPY_KEY[PROGRAM_PAGES[state.txtIdx]]];
    $('#curDesc').textContent = desc;
    $('#curDesc').classList.toggle('programs__desc--long', desc.length > 160);
    $('#exploreLabel').textContent = t.learnMore;
    copyEl.classList.toggle('is-out', state.txtOut);

    idleEl.classList.toggle('is-open', state.warn);
    idleEl.setAttribute('aria-hidden', String(!state.warn));
    idleEl.inert = !state.warn;
    $('#idleCount').textContent = state.count;
  }

  // Every program in programs.js under the pillar on screen. Programs without
  // content yet are listed but don't open.
  let listKey = '';
  function renderProjectList(t) {
    const key = state.prog;
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
    const c = PV.content(p) || {};
    const secs = c.sections || [];
    const key = state.project;
    if (key !== projectKey) {
      projectKey = key;
      const progName = PROGRAM_NAMES(t)[p.pillar] || '';
      $('#pjIntro').innerHTML =
        `<div class="eyebrow">${PV.esc(progName)}</div>
        <h1 class="pj-title">${PV.esc(p.title)}</h1>
        ${c.lead ? `<p class="pj-lead">${PV.esc(c.lead)}</p>` : ''}
        ${PV.body(c.body, 'pj-body')}`;
      // Tighten a long intro if it would squeeze the hero below 240px.
      const intro = $('#pjIntro');
      intro.classList.remove('is-dense');
      if ($('.screen--project .panel__media').offsetHeight < 240) intro.classList.add('is-dense');
      $('#pjBackLabel').textContent = progName;
      // Corporate Citizenship has no pillar page to go back to; All pillars covers it.
      $('[data-action="project-back"]').hidden = p.pillar === 'support';
      const tabs = $('#pjTabs');
      tabs.hidden = secs.length < 2;
      tabs.setAttribute('aria-label', p.title);
      tabs.innerHTML = `<div class="tabs__pill" aria-hidden="true" style="width:calc((100% - 12px) / ${Math.max(1, secs.length)})"></div>` +
        secs.map((s, i) => `<button class="u tabs__tab" role="tab" data-pj-tab="${i}">${PV.esc(s.tab)}</button>`).join('');
      $('#pjPanels').innerHTML = secs.map((s) => `<section class="pj-panel" role="tabpanel">${PV.section(s, 'kiosk')}</section>`).join('');
      const contact = $('#pjContact');
      contact.hidden = !c.contact;
      contact.innerHTML = PV.contact(c.contact, 'kiosk');
    }
    const pill = $('#pjTabs .tabs__pill');
    if (pill) pill.style.transform = `translateX(${state.projTab * 100}%)`;
    $$('#pjTabs [data-pj-tab]').forEach((el) => {
      const on = +el.dataset.pjTab === state.projTab;
      el.setAttribute('aria-selected', String(on));
      el.tabIndex = on ? 0 : -1;
    });
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
    const prevScreen = state.screen, prevProg = state.prog, prevTab = state.projTab;
    Object.assign(state, patch);
    render();
    if (state.screen === 'program') {
      // Going back from a project screen is a step out, so only animate
      // when arriving from elsewhere or switching program.
      const fromProject = prevScreen === 'project';
      if ((prevScreen !== 'program' && !fromProject) || (prevScreen === 'program' && state.prog !== prevProg)) enterProgram();
    }
    // Opening a program from its pillar page steps deeper, so it rises in;
    // switching tabs brings the new section's items in one after another.
    if (state.screen === 'project' && prevScreen !== 'project') enterProject();
    else if (state.screen === 'project' && 'projTab' in patch && state.projTab !== prevTab) enterTab();
    if (state.screen !== prevScreen) bump();
  }

  // ---------- Motion ----------

  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Program page content rises 12px and fades in, 30ms apart, done in
  // under 300ms. Taps work throughout.
  // Reduced motion keeps the fade and drops the movement.
  function rise(els, { distance = 12, duration = 200, stagger = 30, delay = 0 } = {}) {
    const move = !reducedMotion();
    const from = move ? { opacity: 0, transform: `translateY(${distance}px)` } : { opacity: 0 };
    const to = move ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 1 };
    els.forEach((el, i) => el.animate([from, to], { duration, delay: delay + i * stagger, easing: EASE_OUT, fill: 'backwards' }));
  }

  const programParts = $$('.screen--program .panel__text, .screen--program .program-main > .section');
  function enterProgram() { rise(programParts); }

  // The items of the section on screen (impact figures, features, cards,
  // list rows), 30ms apart, capped so the last one lands well under 300ms.
  const sectionItems = () => {
    const panel = $('#pjPanels .pj-panel.is-on');
    return panel ? $$('.pj-stat, .pj-pillar, .pj-package, .pj-list__items li, .pj-bigstat, .pj-chart, .pj-quote, .pj-about__row', panel).slice(0, 6) : [];
  };

  // Program page: intro, tabs and contact rise 30ms apart; the first tab's
  // items follow one by one, the same way they arrive on a tab switch.
  function enterProject() {
    rise([$('#pjIntro'), $('#pjTabs'), $('#pjContact')].filter((el) => el && !el.hidden));
    rise(sectionItems(), { distance: 8, duration: 180, delay: 60 });
  }

  function enterTab() { rise(sectionItems(), { distance: 8, duration: 180 }); }

  // Home: the main button rises in once when the kiosk starts, then stays put.
  rise([$('.touch')], { distance: 8, duration: 240, delay: 150 });

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

  let homeStatsBuilt = false;
  let txtTimer;
  function openList(i) {
    clearTimeout(txtTimer);
    setState({ screen: 'programs', idx: i, txtIdx: i, txtOut: false, dragX: 0 });
  }
  // The pillar name and description travel with the cards: the old text
  // leaves toward where the cards are heading, the new text arrives from the
  // other side. Reduced motion keeps only the fade.
  function go(i) {
    i = Math.max(0, Math.min(PROGRAM_COUNT - 1, i));
    if (i === state.idx) return;
    const dir = i > state.idx ? 1 : -1;
    clearTimeout(txtTimer);
    copyEl.style.setProperty('--dir', dir);
    setState({ idx: i, txtOut: true });
    txtTimer = setTimeout(() => {
      // Jump the new text to the far side, unseen, then let it transition in.
      copyEl.style.transition = 'none';
      copyEl.style.opacity = '0';
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) copyEl.style.transform = `translateX(${dir * 12}px)`;
      setState({ txtIdx: i, txtOut: false });
      void copyEl.offsetWidth;
      copyEl.style.transition = copyEl.style.opacity = copyEl.style.transform = '';
    }, 150);
  }
  function goHome() {
    stopWarn();
    setState({ screen: 'home', warn: false });
  }

  // A visit ends (the warning ran out, or Start over): thank the visitor for
  // two seconds while Home returns underneath. A tap dismisses it early.
  const farewell = $('#farewell');
  let farewellTimer;
  function endVisit() {
    goHome();
    farewell.classList.add('is-on');
    farewell.setAttribute('aria-hidden', 'false');
    clearTimeout(farewellTimer);
    farewellTimer = setTimeout(hideFarewell, 2000);
  }
  function hideFarewell() {
    clearTimeout(farewellTimer);
    farewell.classList.remove('is-on');
    farewell.setAttribute('aria-hidden', 'true');
  }
  farewell.addEventListener('pointerdown', hideFarewell);

  // Learn more: the pillar's photo carries over into the pillar page's photo
  // (a view transition where the browser supports it; otherwise the usual cut).
  function openPillar(prog) {
    const card = cards[state.idx] && cards[state.idx].querySelector('.card__face');
    const hero = $(`[data-hero="${prog}"]`);
    if (!document.startViewTransition || reducedMotion() || !card || !hero) { setState({ screen: 'program', prog }); return; }
    card.style.viewTransitionName = 'pillar-photo';
    const vt = document.startViewTransition(() => {
      card.style.viewTransitionName = '';
      hero.style.viewTransitionName = 'pillar-photo';
      setState({ screen: 'program', prog });
    });
    vt.finished.finally(() => { hero.style.viewTransitionName = ''; });
  }

  // Opening "Our programs" from home always starts on the middle card.
  const startExplore = () => openList(Math.floor((PROGRAM_COUNT - 1) / 2));

  const ACTIONS = {
    'explore-start': startExplore,
    'start-over': goHome,
    'end-visit': endVisit,
    'all-programs': () => openList(0),
    'open-prog': (el) => setState({ screen: 'program', prog: el.dataset.prog }),
    'open-project': (el) => setState({ screen: 'project', project: el.dataset.project, projTab: 0 }),
    'project-back': () => setState({ screen: 'program', prog: (PROJECTS[state.project] || {}).pillar || 'arts' }),
    'prev': () => go(state.idx - 1),
    'next': () => go(state.idx + 1),
    'explore': () => {
      const prog = PROGRAM_PAGES[state.idx];
      if (prog) openPillar(prog);
    },
    'keep-going': () => bump(),
    'about': () => {}
  };

  stage.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-pj-tab]');
    if (tab) { setState({ projTab: +tab.dataset.pjTab }); return; }
    const el = e.target.closest('[data-action]');
    if (el && ACTIONS[el.dataset.action]) ACTIONS[el.dataset.action](el);
  });

  // Tabs from the keyboard: Left/Right move to the neighbouring tab, Home and
  // End to the first and last, and focus follows the selection.
  stage.addEventListener('keydown', (e) => {
    const tab = e.target.closest('[data-pj-tab]');
    if (!tab) return;
    const n = $$('#pjTabs [data-pj-tab]').length;
    const i = { ArrowRight: state.projTab + 1, ArrowLeft: state.projTab - 1, Home: 0, End: n - 1 }[e.key];
    if (i === undefined) return;
    e.preventDefault();
    setState({ projTab: (i + n) % n });
    $(`#pjTabs [data-pj-tab="${state.projTab}"]`).focus();
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
        if (c <= 0) endVisit(); else setState({ count: c });
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
