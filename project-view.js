// Builds program page sections from programs.js for both the kiosk (index.html)
// and the phone page (mobile.html). The markup is the same; each page's
// stylesheet sizes it. variant: 'kiosk' | 'mobile'.
(() => {
  'use strict';

  // Lucide icon paths (24×24, stroked).
  const PATHS = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    pres: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    lap: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    hand: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    stethoscope: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>'
  };

  // Icon sizes per variant, from the two designs.
  const SIZES = {
    kiosk: { pillar: 30, stat: 34, contact: 30, check: 24, pin: 34 },
    mobile: { pillar: 22, stat: 20, contact: 20, check: 20, pin: 24 }
  };

  // Charts named by a results section's `chart` field.
  const CHARTS = {
    // Box plot of pre/post maths scores, control vs treatment schools.
    // Hand-drawn from approximate values; replace with real data.
    centexDE: '<svg viewBox="0 0 520 300" preserveAspectRatio="xMidYMid meet" font-family="Schibsted Grotesk, sans-serif" role="img" aria-label="Box plot of pre and post mathematics scores for control and treatment schools"><line x1="60" x2="500" y1="290" y2="290" stroke="rgba(3, 34, 177,0.15)" stroke-width="1.5"/><text x="48" y="296" text-anchor="end" font-size="17" fill="#3D5A80">0</text><line x1="60" x2="500" y1="230" y2="230" stroke="rgba(3, 34, 177,0.15)" stroke-width="1.5"/><text x="48" y="236" text-anchor="end" font-size="17" fill="#3D5A80">20</text><line x1="60" x2="500" y1="170" y2="170" stroke="rgba(3, 34, 177,0.15)" stroke-width="1.5"/><text x="48" y="176" text-anchor="end" font-size="17" fill="#3D5A80">40</text><line x1="60" x2="500" y1="110" y2="110" stroke="rgba(3, 34, 177,0.15)" stroke-width="1.5"/><text x="48" y="116" text-anchor="end" font-size="17" fill="#3D5A80">60</text><line x1="60" x2="500" y1="50" y2="50" stroke="rgba(3, 34, 177,0.15)" stroke-width="1.5"/><text x="48" y="56" text-anchor="end" font-size="17" fill="#3D5A80">80</text><line x1="130" x2="130" y1="164" y2="290" stroke="#3D5A80" stroke-width="2"/><line x1="116" x2="144" y1="164" y2="164" stroke="#3D5A80" stroke-width="2"/><line x1="116" x2="144" y1="290" y2="290" stroke="#3D5A80" stroke-width="2"/><rect x="98" y="197" width="64" height="42" rx="3" fill="#F8C29A"/><line x1="98" x2="162" y1="218" y2="218" stroke="#041F3F" stroke-width="3"/><line x1="210" x2="210" y1="80" y2="290" stroke="#3D5A80" stroke-width="2"/><line x1="196" x2="224" y1="80" y2="80" stroke="#3D5A80" stroke-width="2"/><line x1="196" x2="224" y1="290" y2="290" stroke="#3D5A80" stroke-width="2"/><rect x="178" y="131" width="64" height="84" rx="3" fill="#F0781E"/><line x1="178" x2="242" y1="170" y2="170" stroke="#041F3F" stroke-width="3"/><line x1="350" x2="350" y1="137" y2="290" stroke="#3D5A80" stroke-width="2"/><line x1="336" x2="364" y1="137" y2="137" stroke="#3D5A80" stroke-width="2"/><line x1="336" x2="364" y1="290" y2="290" stroke="#3D5A80" stroke-width="2"/><rect x="318" y="191" width="64" height="45" rx="3" fill="#F8C29A"/><line x1="318" x2="382" y1="209" y2="209" stroke="#041F3F" stroke-width="3"/><circle cx="350" cy="122" r="4" fill="#3D5A80"/><circle cx="350" cy="116" r="4" fill="#3D5A80"/><circle cx="350" cy="104" r="4" fill="#3D5A80"/><line x1="430" x2="430" y1="38" y2="245" stroke="#3D5A80" stroke-width="2"/><line x1="416" x2="444" y1="38" y2="38" stroke="#3D5A80" stroke-width="2"/><line x1="416" x2="444" y1="245" y2="245" stroke="#3D5A80" stroke-width="2"/><rect x="398" y="95" width="64" height="69" rx="3" fill="#F0781E"/><line x1="398" x2="462" y1="125" y2="125" stroke="#041F3F" stroke-width="3"/><circle cx="430" cy="254" r="4" fill="#3D5A80"/><circle cx="430" cy="290" r="4" fill="#3D5A80"/></svg>'
  };

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function icon(name, size, color, width = 2) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex:none">${PATHS[name] || PATHS.image}</svg>`;
  }

  // Four or more items sit in two columns on the kiosk so they fit the panel.
  // (The pj-pillar* class names predate the pillar/program naming; they style
  // a features section.)
  function features(s, z) {
    const items = s.items || [];
    return `<div class="pj-pillars${items.length > 3 ? ' pj-pillars--grid' : ''}">
      ${s.heading ? `<h2 class="pj-h2">${esc(s.heading)}</h2>` : ''}
      ${s.sub ? `<p class="pj-sub">${esc(s.sub)}</p>` : ''}
      ${s.highlight ? `<div class="pj-highlight pj-highlight--lead">${esc(s.highlight)}</div>` : ''}
      <div class="pj-pillars__items">${items.map((it) => `<div class="pj-pillar">
        <div class="pj-pillar__icon">${icon(it.icon, z.pillar, '#041F3F')}</div>
        <div class="pj-pillar__text"><div class="pj-pillar__title">${esc(it.title)}</div><div class="pj-pillar__body">${esc(it.body)}</div></div>
      </div>`).join('')}</div>
    </div>`;
  }

  function stats(s, z) {
    const list = s.stats || [];
    const where = s.label || s.location ? `<div class="pj-results__where">
        ${s.label ? `<div class="pj-results__label">${esc(s.label)}</div>` : ''}
        ${s.location ? `<div class="pj-results__place">${icon('pin', z.pin, '#F0781E')}${esc(s.location)}</div>` : ''}
      </div>` : '';
    const sub = s.sub ? `<p class="pj-statblock__sub">${esc(s.sub)}</p>` : '';
    return `<div class="pj-statblock">${where}${sub}<div class="pj-stats${list.length > 4 ? ' pj-stats--many' : list.length > 2 ? ' pj-stats--compact' : ''}">${list.map((st) => `<div class="pj-stat">
      <div class="pj-stat__icon">${icon(st.icon, z.stat, '#041F3F')}</div>
      <div class="pj-stat__value">${esc(st.value)}</div>
      <div class="pj-stat__label">${esc(st.label)}</div>
    </div>`).join('')}</div>${s.quote ? quote(s.quote) : ''}</div>`;
  }

  function results(s, z) {
    const legend = s.legend || [], axis = s.axis || [];
    const chart = CHARTS[s.chart] ? `<div class="pj-chart">
        <div class="pj-chart__legend">
          <span class="pj-chart__key"><span class="pj-chart__swatch" style="background:#F8C29A"></span>${esc(legend[0])}</span>
          <span class="pj-chart__key"><span class="pj-chart__swatch" style="background:#F0781E"></span>${esc(legend[1])}</span>
        </div>
        <div class="pj-chart__plot">${CHARTS[s.chart]}</div>
        <div class="pj-chart__axis"><span></span><span>${esc(axis[0])}</span><span>${esc(axis[1])}</span><span></span></div>
      </div>` : '';
    const stat = s.stat || {};
    return `<div class="pj-results">
      <div class="pj-results__main">
        <div class="pj-results__where">
          <div class="pj-results__label">${esc(s.label)}</div>
          <div class="pj-results__place">${icon('pin', z.pin, '#F0781E')}${esc(s.location)}</div>
        </div>
        <div class="pj-bigstat">
          <div class="pj-bigstat__value">${esc(stat.value)}</div>
          <div class="pj-bigstat__text">${esc(stat.text)}</div>
          <div class="pj-bigstat__note">${esc(stat.note)}</div>
        </div>
        <p class="pj-results__callout">${esc(s.callout)}</p>
      </div>
      <div class="pj-results__side">
        ${chart}
        <div class="pj-highlight">${esc(s.highlight)}</div>
      </div>
    </div>`;
  }

  function packages(s, z) {
    return `<div class="pj-packages">
      <h2 class="pj-h2">${esc(s.heading)}</h2>
      <div class="pj-packages__grid">${(s.cards || []).map((c) => `<div class="pj-package${c.dark ? ' pj-package--dark' : ''}">
        ${c.tag ? `<div class="pj-package__tag">${esc(c.tag)}</div>` : ''}
        <div class="pj-package__title">${esc(c.title)}</div>
        <div class="pj-package__label">${esc(c.label)}</div>
        <div class="pj-package__list">${(c.items || []).map((t) => `<div class="pj-package__item">${icon('check', z.check, c.dark ? '#F0781E' : '#0322B1', 2.4)}<span>${esc(t)}</span></div>`).join('')}</div>
        ${c.impact ? `<div class="pj-package__impact">${esc(c.impact)}</div>` : ''}
        ${c.foot ? `<div class="pj-package__foot">${esc(c.foot)}</div>` : ''}
      </div>`).join('')}</div>
    </div>`;
  }

  function list(s) {
    return `<div class="pj-list">
      ${s.heading ? `<h2 class="pj-h2">${esc(s.heading)}</h2>` : ''}
      ${s.sub ? `<p class="pj-sub">${esc(s.sub)}</p>` : ''}
      ${s.intro ? `<p class="pj-list__intro">${esc(s.intro)}</p>` : ''}
      <ul class="pj-list__items">${(s.items || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>`;
  }

  // A quote's text may hold several paragraphs, separated by a blank line.
  function quote(q) {
    const paras = String(q.text || '').split(/\n\s*\n/).map((t) => `<p>${esc(t.trim())}</p>`).join('');
    return `<figure class="pj-quote${q.photo ? ' pj-quote--photo' : ''}">
      <blockquote>${paras}</blockquote>
      ${q.photo || q.by ? `<figcaption>${q.photo ? `<img class="pj-quote__photo" src="${esc(q.photo)}" alt="">` : ''}${q.by ? `<span>${esc(q.by)}</span>` : ''}</figcaption>` : ''}
    </figure>`;
  }

  // A partner's logo beside paragraphs about them, with an optional heading
  // and highlight above.
  function about(s) {
    return `<div class="pj-about">
      ${s.heading ? `<h2 class="pj-h2">${esc(s.heading)}</h2>` : ''}
      ${s.highlight ? `<div class="pj-highlight pj-highlight--lead">${esc(s.highlight)}</div>` : ''}
      <div class="pj-about__row">
        ${s.logo ? `<img class="pj-about__logo" src="${esc(s.logo.src)}" alt="${esc(s.logo.alt || '')}">` : ''}
        <div class="pj-about__text">${(s.body || []).map((t) => `<p>${esc(t)}</p>`).join('')}</div>
      </div>
    </div>`;
  }

  const RENDER = { features, stats, results, packages, list, about };

  window.ProjectView = {
    esc,
    // Content for a project in a language, falling back to English.
    content(project, lang) { return (project && (project[lang] || project.en)) || null; },
    section(s, variant) { return (RENDER[s.type] || (() => ''))(s, SIZES[variant]); },
    // Kiosk shows contact lines as text (nothing to tap on a TV); the phone links them.
    contact(c, variant) {
      if (!c) return '';
      const z = SIZES[variant];
      const lines = (c.lines || []).map((l) => variant === 'mobile' && l.href
        ? `<a class="pj-contact__link" href="${esc(l.href)}"${/^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : ''}>${esc(l.text)}</a>`
        : `<span>${esc(l.text)}</span>`).join('');
      return `<div class="pj-contact__icon">${icon(c.icon, z.contact, '#0322B1')}</div>
        <div class="pj-contact__text"><div class="pj-contact__title">${esc(c.title)}</div><div class="pj-contact__lines">${lines}</div></div>`;
    }
  };
})();
