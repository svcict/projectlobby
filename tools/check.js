#!/usr/bin/env node
// Checks the whole site in a real browser. Run it before publishing:
//
//   node tools/check.js
//
// It serves the folder itself, then checks:
//   - the ?v= stamps are current
//   - program content: one home figure per pillar, photos exist, no repeated
//     or missing item text
//   - lobby kiosk (1920x1080): every pillar and every program tab fits, with no
//     errors or failed downloads; Home, back and the carousel work
//   - phone page (320, 390, 768 wide): every screen and tab, no sideways
//     scrolling, tap targets, the back arrow
//   - offline start and the idle reload rules
//   - photos nothing uses
//
// FAIL means fix before publishing; WARN means look at it. Exit code 1 on FAIL.
//
// Needs Playwright (npm i -D playwright, then npx playwright install chromium).
// To use an installed copy elsewhere: PLAYWRIGHT_MODULE=/path/to/playwright and
// CHROMIUM_PATH=/path/to/chrome.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); } catch (_) {
  console.error('Playwright is needed: npm i -D playwright, then npx playwright install chromium');
  process.exit(2);
}

const root = path.resolve(__dirname, '..');
const results = { fail: 0, warn: 0, pass: 0 };
const say = (kind, msg) => { results[kind] += 1; console.log(`${kind.toUpperCase().padEnd(4)} ${msg}`); };
const pass = (m) => say('pass', m), warn = (m) => say('warn', m), fail = (m) => say('fail', m);
const section = (t) => console.log(`\n${t}`);

// ---------- Static server ----------
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  const stat = fs.statSync(file);
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Last-Modified': stat.mtime.toUTCString() });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await playwright.chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const watch = (page, label, problems) => {
    page.on('pageerror', (e) => problems.push(`${label}: script error: ${e.message}`));
    page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) problems.push(`${label}: ${r.status()} ${r.url().replace(base, '')}`); });
  };

  // ---------- Stamps ----------
  section('Version stamps');
  try { execFileSync('node', [path.join(__dirname, 'stamp.js'), '--check'], { stdio: 'pipe' }); pass('?v= stamps are current'); }
  catch (e) { fail('?v= stamps are out of date: run node tools/stamp.js'); }

  // ---------- Content ----------
  section('Program content');
  const probe = await browser.newPage();
  await probe.goto(`${base}/index.html?kiosk`);
  const data = await probe.evaluate(() => ({ programs: window.KIOSK_PROGRAMS, pages: ['community', 'arts', 'leadership', 'bigbets'] }));
  const programs = data.programs;
  const ids = Object.keys(programs).filter((id) => programs[id].en);
  for (const pillar of data.pages) {
    const n = Object.values(programs).filter((p) => p.pillar === pillar && p.en).reduce((c, p) => c + JSON.stringify(p.en).split('"home":true').length - 1 + (JSON.stringify(p.en).includes('"homeFigure"') ? 1 : 0), 0);
    n === 1 ? pass(`${pillar}: one home figure`) : fail(`${pillar}: ${n} home figures (needs exactly one)`);
  }
  for (const id of Object.keys(programs)) {
    const p = programs[id];
    if (p.hero && p.hero.src && !fs.existsSync(path.join(root, p.hero.src))) fail(`${id}: hero photo missing (${p.hero.src})`);
    if (!p.hero || !p.hero.src) warn(`${id}: no hero photo`);
    if (!p.en) { warn(`${id}: no content (listed but can't open)`); continue; }
    for (const sec of p.en.sections || []) {
      if (sec.type === 'features') {
        const bodies = sec.items.map((i) => i.body).filter(Boolean);
        if (new Set(bodies).size !== bodies.length) warn(`${id} / ${sec.tab}: two items share the same text`);
        sec.items.filter((i) => !i.body).forEach((i) => warn(`${id} / ${sec.tab}: "${i.title}" has no description`));
      }
    }
  }
  await probe.close();

  // ---------- Kiosk ----------
  section('Lobby kiosk (1920x1080)');
  {
    const problems = [];
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const p = await ctx.newPage(); watch(p, 'kiosk', problems);
    await p.goto(`${base}/index.html`); await p.waitForTimeout(900);
    const figs = await p.evaluate(() => [...document.querySelectorAll('.home-stat')].map((e) => e.textContent.trim()).filter(Boolean).length);
    figs === 4 ? pass('home shows 4 figures') : fail(`home shows ${figs} figures (needs 4)`);
    await p.click('.touch'); await p.waitForTimeout(600);
    await p.click('.arrow--prev'); await p.waitForTimeout(450);
    for (let i = 0; i < 4; i++) {
      const c = await p.evaluate(() => ({ name: document.getElementById('curName').textContent, tag: document.getElementById('curTag').textContent, desc: document.getElementById('curDesc').textContent.length, over: document.querySelector('.programs').scrollHeight - document.querySelector('.programs').clientHeight }));
      (c.name && c.tag && c.desc && c.over <= 0) ? pass(`carousel: ${c.name}`) : fail(`carousel: ${c.name || '(empty)'} overflow ${c.over}`);
      if (i < 3) { await p.click('.arrow--next'); await p.waitForTimeout(450); }
    }
    const visit = async (id) => {
      const prog = programs[id];
      await p.evaluate(([id, pillar]) => {
        if (pillar === 'support') { document.querySelector('.screen--programs .support').click(); return; }
        document.querySelector(`[data-prog="${pillar}"]`).click(); document.querySelector(`[data-project="${id}"]`).click();
      }, [id, prog.pillar]);
      await p.waitForTimeout(450);
      const tabs = await p.evaluate(() => document.querySelectorAll('[data-pj-tab]').length);
      for (let t = 0; t < tabs; t++) {
        await p.evaluate((t) => document.querySelector(`[data-pj-tab="${t}"]`).click(), t); await p.waitForTimeout(280);
        const r = await p.evaluate(() => { const pn = document.querySelector('.pj-panel.is-on'); return { over: pn.scrollHeight - pn.clientHeight, hero: [...document.querySelectorAll('#pjHeroes img')].some((i) => i.naturalWidth > 0) || !!document.querySelector('#pjHeroes .is-empty') }; });
        r.over <= 0 ? pass(`${id} / tab ${t + 1} fits`) : fail(`${id} / tab ${t + 1} overflows by ${r.over}px`);
        if (t === 0 && !r.hero) fail(`${id}: hero photo did not load`);
      }
      await p.evaluate(() => document.querySelector('.screen--project [data-action="all-programs"]').click()); await p.waitForTimeout(350);
    };
    for (const id of ids) await visit(id);
    await p.evaluate(() => document.querySelector('.screen--programs [data-action="start-over"]').click()); await p.waitForTimeout(500);
    (await p.evaluate(() => !!document.querySelector('.screen--home.is-active'))) ? pass('Home button returns to the landing screen') : fail('Home button did not return to the landing screen');
    problems.length ? problems.forEach(fail) : pass('no script errors or failed downloads');

    // Offline start
    section('Offline start');
    const o = await ctx.newPage();
    await o.goto(`${base}/index.html`); await o.evaluate(() => navigator.serviceWorker.ready); await o.reload(); await o.waitForTimeout(2200);
    await ctx.setOffline(true);
    const o2 = await ctx.newPage();
    await o2.goto(`${base}/index.html`); await o2.waitForTimeout(1500);
    const off = await o2.evaluate(() => ({ figs: document.querySelectorAll('.home-stat').length, photos: [...document.querySelectorAll('.slide img')].filter((i) => i.naturalWidth).length }));
    (off.figs === 4 && off.photos === 4) ? pass('starts and shows its photos with the internet off') : fail(`offline start: ${off.figs} figures, ${off.photos} photos`);
    await ctx.setOffline(false);

    // Idle reload rules
    section('Idle reload rules');
    const u = await ctx.newPage(); await u.goto(`${base}/index.html`); await u.waitForTimeout(1500);
    (await u.evaluate(() => window.kioskUpdates.check({ idleMs: 0 }))) === 'current' ? pass('no new release: stays put') : fail('reloaded without a new release');
    await u.click('.touch'); await u.waitForTimeout(500);
    const inTheMiddle = fs.statSync(path.join(root, 'programs.js'));
    fs.utimesSync(path.join(root, 'programs.js'), new Date(), new Date(Date.now() + 5000));
    try {
      (await u.evaluate(() => window.kioskUpdates.check({ idleMs: 0 }))) === 'waiting' ? pass('new release while a visitor browses: waits') : fail('would reload under a visitor');
      await u.evaluate(() => document.querySelector('.screen--programs [data-action="start-over"]').click()); await u.waitForTimeout(2300);
      const nav = u.waitForNavigation({ timeout: 6000 }).then(() => true, () => false);
      const verdict = await u.evaluate(() => window.kioskUpdates.check({ idleMs: 0 }));
      (verdict === 'reloading' && await nav) ? pass('file changed without a new ?v=: reloads from idle Home') : fail(`file change not picked up (${verdict})`);
    } finally { fs.utimesSync(path.join(root, 'programs.js'), inTheMiddle.atime, inTheMiddle.mtime); }
    await ctx.close();
  }

  // ---------- Phone ----------
  section('Phone page');
  const routes = ['', '#pillars', '#arts', '#leadership', '#bigbets', '#community', ...ids.map((id) => `#program/${id}`)];
  for (const width of [320, 390, 768]) {
    const problems = [];
    const ctx = await browser.newContext({ viewport: { width, height: width < 700 ? 800 : 1024 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage(); watch(p, `${width}px`, problems);
    await p.goto(`${base}/mobile.html`); await p.waitForTimeout(700);
    let bad = 0, small = new Set(), views = 0;
    for (const r of routes) {
      await p.evaluate((h) => { location.hash = h; }, r); await p.waitForTimeout(260);
      const tabs = await p.evaluate(() => document.querySelectorAll('.m-tabs__tab').length);
      for (let t = 0; t < Math.max(1, tabs); t++) {
        if (t) { await p.evaluate((t) => document.querySelectorAll('.m-tabs__tab')[t].click(), t); await p.waitForTimeout(200); }
        views += 1;
        const m = await p.evaluate(() => {
          const vis = (e) => { for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x); if (s.display === 'none' || x.hidden || +s.opacity === 0) return false; } return e.getBoundingClientRect().width > 0; };
          const tiny = [...document.querySelectorAll('a, button, [role=tab]')].filter(vis).filter((e) => { const b = e.getBoundingClientRect(); return b.height < 44 || b.width < 44; }).map((e) => (e.textContent.trim().slice(0, 24) || e.getAttribute('aria-label') || e.className));
          return { over: document.documentElement.scrollWidth - innerWidth, tiny };
        });
        if (m.over > 0) { bad += 1; fail(`${width}px ${r || '#home'} (tab ${t + 1}): scrolls sideways by ${m.over}px`); }
        m.tiny.forEach((x) => small.add(x));
      }
    }
    if (!bad) pass(`${width}px: ${views} screens and tabs, no sideways scrolling`);
    small.size ? warn(`${width}px: tap targets under 44px: ${[...small].slice(0, 6).join(', ')}`) : pass(`${width}px: tap targets are 44px or more`);
    problems.length ? [...new Set(problems)].forEach(fail) : pass(`${width}px: no script errors or failed downloads`);
    await ctx.close();
  }
  {
    // Back arrow
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage(); await p.goto(`${base}/mobile.html`); await p.waitForTimeout(500);
    await p.click('.m-cta'); await p.waitForTimeout(250); await p.click('a[href="#leadership"]'); await p.waitForTimeout(250); await p.click('#projectList a'); await p.waitForTimeout(300);
    const len = await p.evaluate(() => history.length);
    const seen = [];
    for (let i = 0; i < 3; i++) { await p.click('#back'); await p.waitForTimeout(300); seen.push(await p.evaluate(() => location.hash || '(home)')); }
    const grew = (await p.evaluate(() => history.length)) !== len;
    (seen.join(' ') === '#leadership #pillars (home)' && !grew) ? pass('back arrow steps back without adding history') : fail(`back arrow: ${seen.join(' ')}${grew ? ', history grew' : ''}`);
    await ctx.close();
  }

  // ---------- Unused photos ----------
  section('Housekeeping');
  const code = ['index.html', 'mobile.html', 'programs.js', 'copy.js', 'app.js', 'mobile.js', 'kiosk.js', 'sw.js', 'styles.css', 'mobile.css', 'project-view.js'].map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
  const unused = [];
  (function walk(dir) { for (const f of fs.readdirSync(dir)) { const full = path.join(dir, f); fs.statSync(full).isDirectory() ? walk(full) : !code.includes(f) && unused.push(path.relative(root, full)); } })(path.join(root, 'assets'));
  unused.length ? warn(`unused files in assets: ${unused.join(', ')}`) : pass('every file in assets is used');

  await browser.close();
  server.close();
  console.log(`\n${results.pass} passed, ${results.warn} to look at, ${results.fail} failed`);
  process.exit(results.fail ? 1 : 0);
})().catch((e) => { console.error(e); server.close(); process.exit(2); });
