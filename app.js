(() => {
  'use strict';

  const COPY = {
    en: {
      title: 'Arts and Culture',
      body: 'We provide platforms that spotlight history, contemporary and fine art forms in state-of-the-art museum and library venues. By curating physical and digital collections that celebrate the joy and wonder of Philippine arts and culture, we hope to contribute to conversations about evolving Filipino identities and agency throughout history.',
      projects: 'Projects', partOf: 'Be part of it', more: 'More programs',
      give: 'Give', giveBody: 'To support Arts and Culture, please see our front desk team.',
      partner: 'Partner with us', partnerBody: 'Ask the front desk to connect you with our partnerships team.',
      take: 'Take this with you', takeBody: 'Scan to open this page on your phone.',
      startOver: 'Start over', allPrograms: 'All programs', tap: 'Tap to explore',
      p0: 'Arts and Culture', p1: 'Leadership Development', p2: 'Big Bets', p3: 'Community Development',
      touch: 'Touch to explore', about: 'About us',
      still: 'Still there?', stillBody: 'This screen will start over for the next visitor in', keep: 'Keep exploring',
      musLead: 'One of the country\'s leading private museums, making Philippine history, art and culture accessible to everyone.',
      musBody: 'Ayala Museum is home to the country\'s first Digital Gallery, an immersive touchscreen experience for exploring objects from the museum and library collections. It also houses Crossroads of Civilizations, a permanent exhibition of Philippine pre-colonial treasures, and the one-of-a-kind Diorama Experience of Philippine History. Celebrating its 50th year in 2024, the museum uses both traditional and new platforms to share our rich heritage with people of all generations.',
      stat1: 'visitors in 2023', stat2: 'satisfaction rating from guests and program attendees, from young to late adults',
      support: 'Support this project', supportBody: 'To support Ayala Museum, please see our front desk team.',
      allTitle: 'Our programs', explore: 'Explore',
      d0: 'Museums and libraries that celebrate Philippine arts, culture and history.',
      d1: 'Young people learn to lead projects in their own barangay.',
      d2: 'Bold, long-term ideas that tackle some of the country\'s toughest problems.',
      d3: 'Working side by side with communities to build lasting livelihoods.'
    },
    fil: {
      title: 'Sining at Kultura',
      body: 'Nagbibigay kami ng mga plataporma na nagtatampok sa kasaysayan, kontemporaryo at pinong sining sa mga makabagong museo at aklatan. Sa pag-curate ng pisikal at digital na koleksyon na nagdiriwang sa sining at kultura ng Pilipinas, layunin naming makapag-ambag sa usapan tungkol sa umuusbong na pagkakakilanlan at kakayahan ng Pilipino sa kasaysayan.',
      projects: 'Mga Proyekto', partOf: 'Makibahagi', more: 'Iba pang programa',
      give: 'Magbigay', giveBody: 'Upang suportahan ang Sining at Kultura, lumapit sa aming front desk.',
      partner: 'Makipagtulungan', partnerBody: 'Hilingin sa front desk na ikonekta ka sa aming partnerships team.',
      take: 'Dalhin mo ito', takeBody: 'I-scan para buksan ang pahinang ito sa iyong telepono.',
      startOver: 'Magsimula muli', allPrograms: 'Lahat ng programa', tap: 'Pindutin para tuklasin',
      p0: 'Sining at Kultura', p1: 'Pagpapaunlad ng Pamumuno', p2: 'Big Bets', p3: 'Pagpapaunlad ng Komunidad',
      touch: 'Pindutin para tuklasin', about: 'Tungkol sa amin',
      still: 'Nandiyan ka pa ba?', stillBody: 'Magsisimula muli ang screen para sa susunod na bisita sa loob ng', keep: 'Magpatuloy',
      musLead: 'Isa sa mga nangungunang pribadong museo sa bansa, na naglalapit sa lahat ng kasaysayan, sining at kultura ng Pilipinas.',
      musBody: 'Narito ang kauna-unahang Digital Gallery ng bansa, isang touchscreen na karanasan para tuklasin ang mga bagay mula sa koleksyon ng museo at aklatan. Narito rin ang Crossroads of Civilizations, isang permanenteng eksibisyon ng mga kayamanang pre-kolonyal ng Pilipinas, at ang natatanging Diorama Experience of Philippine History. Sa pagdiriwang ng ika-50 taon nito noong 2024, gumagamit ang museo ng tradisyonal at bagong plataporma upang ibahagi ang ating mayamang pamana sa lahat ng henerasyon.',
      stat1: 'bisita noong 2023', stat2: 'satisfaction rating mula sa mga bisita at dumalo sa programa, mula kabataan hanggang nakatatanda',
      support: 'Suportahan ang proyektong ito', supportBody: 'Upang suportahan ang Ayala Museum, lumapit sa aming front desk.',
      allTitle: 'Aming mga programa', explore: 'Tuklasin ang',
      d0: 'Mga museo at aklatan na nagdiriwang sa sining, kultura at kasaysayan ng Pilipinas.',
      d1: 'Natututo ang kabataan na mamuno ng mga proyekto sa sarili nilang barangay.',
      d2: 'Matatapang at pangmatagalang ideya para sa ilan sa pinakamabibigat na problema ng bansa.',
      d3: 'Kasama ang mga komunidad sa pagbuo ng pangmatagalang kabuhayan.'
    }
  };

  const DESIGN_W = 1920, DESIGN_H = 1080;
  const PROGRAM_COUNT = 4;
  const SLIDE_MS = 7000;
  const IDLE_MS = 75000;
  const WARN_SECONDS = 15;

  const ICONS = (() => {
    const chevron = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="flex:none;display:block"><path d="M9 5l7 7-7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const back = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M15 5l-7 7 7 7" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    return {
      'chevron-navy-24': chevron(24, '#041F3F'),
      'chevron-navy-26': chevron(26, '#041F3F'),
      'chevron-white-22': chevron(22, '#FFFFFF'),
      'chevron-orange-30': chevron(30, '#F7941D'),
      'chevron-blue-32': chevron(32, '#0B53A5'),
      'back': back(28, '#FFFFFF'),
      'back-blue-32': back(32, '#0B53A5'),
      'restart': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      'grid': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><rect x="3" y="3" width="7" height="7" rx="1" fill="#041F3F"/><rect x="14" y="3" width="7" height="7" rx="1" fill="#041F3F"/><rect x="3" y="14" width="7" height="7" rx="1" fill="#041F3F"/><rect x="14" y="14" width="7" height="7" rx="1" fill="#041F3F"/></svg>',
      'info': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block"><circle cx="12" cy="12" r="9.5" stroke="#FFFFFF" stroke-width="2.5"/><path d="M12 11v6M12 7.5v.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></svg>'
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
    lang: 'en', screen: 'home', slide: 0,
    warn: false, count: WARN_SECONDS,
    idx: 0, txtIdx: 0, txtOut: false, dragX: 0, dragging: false
  };

  // ---------- One-time setup ----------

  $$('[data-icon]').forEach((el) => { el.innerHTML = ICONS[el.dataset.icon] || ''; el.style.display = 'flex'; el.style.flex = 'none'; });

  $$('[data-lang-switch]').forEach((el) => {
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'Language');
    el.innerHTML =
      '<div class="lang__pill"></div>' +
      '<button class="u lang__opt" role="radio" data-set-lang="en">English</button>' +
      '<button class="u lang__opt" role="radio" data-set-lang="fil">Filipino</button>';
  });

  $$('.slot').forEach((slot) => {
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
      // The Arts and Culture screen is the base layer and always stays painted.
      const on = el.dataset.screen === state.screen || el.dataset.screen === 'program';
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-hidden', String(el.dataset.screen !== state.screen));
    });

    slides.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));
    dots.forEach((el, i) => el.classList.toggle('is-on', i === state.slide));

    renderCards();
    track.classList.toggle('is-dragging', state.dragging);
    $('.arrow--prev').disabled = state.idx === 0;
    $('.arrow--next').disabled = state.idx === PROGRAM_COUNT - 1;

    const name = t['p' + state.txtIdx];
    $('#curName').textContent = name;
    $('#curDesc').textContent = t['d' + state.txtIdx];
    $('#exploreLabel').textContent = t.explore + ' ' + name;
    copyEl.classList.toggle('is-out', state.txtOut);

    idleEl.classList.toggle('is-open', state.warn);
    idleEl.setAttribute('aria-hidden', String(!state.warn));
    $('#idleCount').textContent = state.count;
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
    const prevScreen = state.screen;
    Object.assign(state, patch);
    render();
    if (state.screen !== prevScreen) {
      // Coming back from the museum is a step out, so only animate going in.
      if (state.screen === 'program' && prevScreen !== 'museum') enterArts();
      bump();
    }
  }

  // ---------- Motion ----------

  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Arts and Culture content rises 12px and fades in, 30ms apart, done in
  // under 300ms. Taps work throughout.
  const artsParts = $$('.screen--arts .panel__text, .screen--arts .arts-main > .section');
  function enterArts() {
    const from = reducedMotion() ? { opacity: 0 } : { opacity: 0, transform: 'translateY(12px)' };
    const to = reducedMotion() ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0)' };
    artsParts.forEach((el, i) => {
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
    'museum': () => setState({ screen: 'museum' }),
    'back-to-arts': () => setState({ screen: 'program' }),
    'prev': () => go(state.idx - 1),
    'next': () => go(state.idx + 1),
    // Only Arts and Culture has its own screen so far.
    'explore': () => { if (state.idx === 0) setState({ screen: 'program' }); },
    'keep-going': () => bump(),
    'about': () => {}
  };

  stage.addEventListener('click', (e) => {
    const langBtn = e.target.closest('[data-set-lang]');
    if (langBtn) { setState({ lang: langBtn.dataset.setLang }); return; }
    const el = e.target.closest('[data-action]');
    if (el && ACTIONS[el.dataset.action]) ACTIONS[el.dataset.action]();
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
