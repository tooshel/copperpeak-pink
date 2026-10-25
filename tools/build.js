#!/usr/bin/env node
// Copper Peak, pink edition: one site, three looks, one customizer (zero dependencies).
// Renders content/** once per theme into docs/<theme>/, plus a picker page at docs/.
//
//   content/pages/*.html  top-level pages (home, heating, cooling, ...)
//   content/diy/*.html    DIY articles  -> /<theme>/diy/<slug>/
//   content/fyi/*.html    FYI articles  -> /<theme>/fyi/<slug>/
//   static/               copied to docs/ (images, fonts, favicon), shared by all themes
//   tools/themes/*.js     the three looks; tools/palette.js + engine.js are the customizer
//
// This is a design preview: every page is noindex and canonical to www.copperpeakair.com.
// Run: node tools/build.js   then commit and push; GitHub Pages serves docs/.
const fs = require('fs');
const path = require('path');
const { PRESETS, ORDER, cpDerive } = require('./palette');
const { ENGINE } = require('./engine');
const { BASE_CSS, DEFAULT } = require('./base');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
const SITE = {
  name: 'Copper Peak Heating & Cooling',
  url: 'https://www.copperpeakair.com',
  domain: 'pink.copperpeakair.com',
  phone: '(480) 673-8311',
  tel: '+14806738311',
  email: 'service@copperpeakair.com',
  cities: ['Mesa', 'Apache Junction', 'Buckeye', 'Chandler', 'Gilbert', 'Glendale', 'Gold Canyon',
    'Peoria', 'Phoenix', 'Queen Creek', 'San Tan Valley', 'Scottsdale', 'Tempe'],
};

const NAV = [
  ['heating', 'Heating', '/heating/'],
  ['cooling', 'Cooling', '/cooling/'],
  ['air-quality', 'Air Quality', '/air-quality/'],
  ['pricing', 'Pricing', '/pricing/'],
  ['diy', 'DIY & Parts', '/diy/'],
  ['fyi', 'FYI', '/fyi/'],
  ['service-area', 'Service Area', '/service-area/'],
];
const LEVELS = ['Easy', 'Moderate', 'Advanced'];
const THEMES = ['kitchen', 'chips', 'thermostat'].map((k) => require(`./themes/${k}`));

// ---------- palette contrast gate ----------
for (const k of ORDER) {
  const bad = cpDerive(PRESETS[k]).pairs.filter((p) => p[2] < 4.5);
  if (bad.length) throw new Error(`palette ${k} fails contrast: ${bad.map((p) => `${p[0]}/${p[1]} ${p[2].toFixed(2)}`).join(', ')}`);
}

// ---------- content loading ----------
function load(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing front matter: ' + file);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { ...meta, body: m[2] };
}
const loadDir = (dir) => fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => ({ slug: f.replace(/\.html$/, ''), ...load(path.join(dir, f)) }))
  : [];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pages = loadDir(path.join(ROOT, 'content/pages'));
const diy = loadDir(path.join(ROOT, 'content/diy'));
const fyi = loadDir(path.join(ROOT, 'content/fyi'));

// The home hero is redrawn by each theme from the same copy.
const home = pages.find((p) => p.slug === 'home');
const heroSrc = home.body.slice(0, home.body.indexOf('<section class="services">'));
const pick = (re) => { const m = heroSrc.match(re); if (!m) throw new Error('home hero changed: ' + re); return m[1].trim(); };
const HERO = {
  h1: pick(/<h1>([\s\S]*?)<\/h1>/),
  lead: pick(/<p class="lead">([\s\S]*?)<\/p>/).replace(/\s+/g, ' '),
  assurance: pick(/<p class="assurance">([\s\S]*?)<\/p>/),
  logoAlt: pick(/<img[^>]*alt="([^"]*)"/),
};
HERO.logo = (cls = '') => `<img class="duo ${cls}" src="/images/copper-peak-logo-2026.jpg" alt="${HERO.logoAlt}" width="1200" height="722">`;
const homeRest = home.body.slice(home.body.indexOf('<section class="services">'));

// ---------- structured data ----------
const BUSINESS_LD = {
  '@context': 'https://schema.org', '@type': 'HVACBusiness', name: SITE.name, url: SITE.url + '/',
  telephone: '+1-480-673-8311', email: SITE.email, image: SITE.url + '/images/copper-peak-logo-2026.jpg',
  slogan: 'Your comfort. Our commitment.',
  areaServed: SITE.cities.map((c) => ({ '@type': 'City', name: c + ', AZ' })), openingHours: 'Mo-Fr 07:00-17:00',
};

// ---------- shared pieces ----------
const DUO_SVG = `<svg class="cp-defs" aria-hidden="true" focusable="false"><filter id="cp-duo" color-interpolation-filters="sRGB">
<feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/>
<feComponentTransfer><feFuncR type="table" tableValues="${DEFAULT.duo[0]}"/><feFuncG type="table" tableValues="${DEFAULT.duo[1]}"/><feFuncB type="table" tableValues="${DEFAULT.duo[2]}"/></feComponentTransfer>
</filter></svg>`;

const fontFaces = (fonts) => fonts.map((f) => `@font-face{font-family:'${f.family}';src:url(/fonts/${f.file}) format('woff2');font-weight:${f.weight || 400};font-style:${f.style || 'normal'};font-display:swap}`).join('\n');

function layout(theme, { title, description, pathname, nav, body, extraLd = [] }) {
  const navHtml = NAV.map(([key, label, href]) =>
    `<a href="${href}"${key === nav ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const ld = [BUSINESS_LD, ...extraLd].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const panel = `<div class="cp-panel" id="cp-panel" hidden>${theme.controls('panel')}</div>`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme.key}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE.url}${pathname}">
<meta name="theme-color" content="${DEFAULT.vars.bg}">
<link rel="icon" id="cp-icon" href="/favicon.svg" type="image/svg+xml">
${theme.fonts.filter((f) => f.preload).map((f) => `<link rel="preload" href="/fonts/${f.file}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<style>${fontFaces(theme.fonts)}${BASE_CSS}${theme.css}</style>
<script>${ENGINE}</script>
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${DUO_SVG}
<header class="site-head">
  <div class="topbar">
    <a class="brand" href="/">${theme.brand}</a>
    <div class="reach">
      <a class="mail" href="mailto:${SITE.email}">${SITE.email}</a>
      ${theme.toggle || ''}
      <a class="call" href="tel:${SITE.tel}">${theme.callLabel ? theme.callLabel('top') : `Call ${SITE.phone}`}</a>
    </div>
  </div>
  <nav class="main" aria-label="Main">${navHtml}</nav>
  ${theme.panelPlace === 'float' ? '' : panel}
</header>
<main id="main">
${body}
</main>
<footer class="site">
  <div class="measure">
    <span>&copy; ${new Date().getFullYear()} ${esc(SITE.name)} &middot; Mesa, Arizona</span>
    <span class="links">
      <a href="tel:${SITE.tel}">${SITE.phone}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <a href="/service-area/">Service area</a>
      <a href="/pricing/">Pricing</a>
      <a href="/diy/">DIY &amp; Parts</a>
    </span>
    <span>Your comfort. Our commitment.</span>
    <span class="preview">You're looking at a design preview (${esc(theme.name)}). <a href="/~/">See all three looks</a> or visit the live site at <a href="${SITE.url}/">www.copperpeakair.com</a>.</span>
  </div>
</footer>
${theme.panelPlace === 'float' ? panel : ''}
<a class="m-call" href="tel:${SITE.tel}" tabindex="-1" aria-hidden="true">Call ${SITE.phone}</a>
<script>(function(){var h=document.querySelector('.site-head'),c=document.querySelector('.m-call');if(!h||!c||!window.IntersectionObserver)return;
new IntersectionObserver(function(e){var on=!e[0].isIntersecting;c.classList.toggle('is-on',on);c.setAttribute('aria-hidden',on?'false':'true');if(on)c.removeAttribute('tabindex');else c.setAttribute('tabindex','-1')}).observe(h)})();</script>
${theme.tail || ''}
</body>
</html>
`;
}

const CTA_BAND = (t) => `<section class="cta-band">
  <div class="measure">
    <h2>Rather have a pro handle it?</h2>
    <p>That's what we're here for. Call or text and you'll talk to a real person who knows your system.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="tel:${SITE.tel}">${t.callLabel ? t.callLabel('band') : `Call ${SITE.phone}`}</a>
      <a class="btn btn-ghost" href="mailto:${SITE.email}">Email us</a>
    </div>
  </div>
</section>`;

const SIDE_CARD = (t) => `<aside class="side-card">
  <h3>Need it fixed today?</h3>
  <p>Family owned, up-front pricing, and a one-year no-hassle guarantee on our work.</p>
  <a class="btn btn-primary" href="tel:${SITE.tel}">${t.callLabel ? t.callLabel('side') : `Call ${SITE.phone}`}</a>
  <a class="btn btn-ghost" href="mailto:${SITE.email}">Email us</a>
</aside>`;

const PARTS_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('Parts quote')}&body=${encodeURIComponent(
  'Name:\nPhone:\nCity:\n\nWhat\'s going on with the system:\n\nPhoto of the unit\'s label (model and serial) attached.\n')}`;
const CITY_CHIPS = `<ul class="chips">${SITE.cities.map((c) => `<li>${c}</li>`).join('')}</ul>`;

const fill = (html, t) => html
  .replace(/\{\{CTA_BAND\}\}/g, CTA_BAND(t))
  .replace(/\{\{SIDE_CARD\}\}/g, SIDE_CARD(t))
  .replace(/\{\{PARTS_MAILTO\}\}/g, PARTS_MAILTO)
  .replace(/\{\{CITY_CHIPS\}\}/g, CITY_CHIPS)
  .replace(/\{\{PHONE\}\}/g, SITE.phone)
  .replace(/\{\{TEL\}\}/g, SITE.tel)
  .replace(/\{\{EMAIL\}\}/g, SITE.email);

const card = (a, base) => `<a class="card" href="/${base}/${a.slug}/"${a.level ? ` data-level="${esc(a.level.toLowerCase())}"` : ''}>
  ${a.level ? `<span class="level">${esc(a.level)}${a.time ? ' · ' + esc(a.time) : ''}</span>` : ''}
  <h3>${esc(a.title)}</h3>
  <p>${esc(a.summary || a.description)}</p>
</a>`;
const diyList = LEVELS.map((lvl) => {
  const items = diy.filter((a) => a.level === lvl).sort((x, y) => Number(x.order || 99) - Number(y.order || 99));
  if (!items.length) return '';
  return `<div class="level-group"><h2>${lvl}</h2><div class="cards">${items.map((a) => card(a, 'diy')).join('\n')}</div></div>`;
}).join('\n');
const fyiList = `<div class="cards">${fyi.map((a) => card(a, 'fyi')).join('\n')}</div>`;

// Root-relative links become theme-relative; /images, /fonts and /favicon stay shared; /~/ means the site root.
const rebase = (html, key) => html
  .replace(/(href|src)="\/(?!\/|~\/|images\/|fonts\/|favicon)/g, `$1="/${key}/`)
  .replace(/"\/~\//g, '"/');

// ---------- render ----------
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, f), { recursive: true, force: true });
const write = (rel, html) => {
  const dir = path.join(OUT, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
};

let count = 0;
for (const t of THEMES) {
  const emit = (pathname, html) => { write(`/${t.key}${pathname}`, rebase(t.post ? t.post(html) : html, t.key)); count++; };
  for (const p of pages) {
    const pathname = p.slug === 'home' ? '/' : `/${p.slug}/`;
    const raw = p.slug === 'home' ? t.hero(HERO, SITE) + homeRest : p.body;
    const body = fill(raw, t).replace('{{DIY_LIST}}', diyList).replace('{{FYI_LIST}}', fyiList);
    emit(pathname, layout(t, { title: p.title, description: p.description, pathname, nav: p.nav || p.slug, body }));
  }
  const article = (a, base, sectionLabel, nav) => {
    const pathname = `/${base}/${a.slug}/`;
    const meta = [a.level, a.time, a.updated && `Updated ${a.updated}`].filter(Boolean);
    const body = `<div class="page-head">
  <div class="measure">
    <p class="crumbs"><a href="/${base}/">${sectionLabel}</a></p>
    ${meta.length ? `<ul class="meta">${meta.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}
    <h1>${esc(a.title)}</h1>
    ${a.lead ? `<p class="lead">${a.lead}</p>` : ''}
  </div>
</div>
<section>
  <div class="measure two-col">
    <article class="prose">${fill(a.body, t)}</article>
    ${SIDE_CARD(t)}
  </div>
</section>
${CTA_BAND(t)}`;
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description,
      datePublished: a.date, dateModified: a.updated || a.date, mainEntityOfPage: SITE.url + pathname,
      author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name } };
    emit(pathname, layout(t, { title: `${a.title} | ${SITE.name}`, description: a.description, pathname, nav, body, extraLd: [ld] }));
  };
  for (const a of diy) article(a, 'diy', 'DIY &amp; Parts', 'diy');
  for (const a of fyi) article(a, 'fyi', 'FYI', 'fyi');
}

// picker page and the domain-wide 404
const picker = require('./picker');
fs.writeFileSync(path.join(OUT, 'index.html'), picker.page({ SITE, THEMES, ENGINE, BASE_CSS, DEFAULT, DUO_SVG, PRESETS, ORDER, cpDerive, fontFaces, esc }));
fs.writeFileSync(path.join(OUT, '404.html'), picker.notFound({ SITE, THEMES, ENGINE, BASE_CSS, DEFAULT, fontFaces, esc }));

// static assets
const copyDir = (src, dst) => {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); } else fs.copyFileSync(s, d);
  }
};
copyDir(path.join(ROOT, 'static'), OUT);
fs.writeFileSync(path.join(OUT, 'favicon.svg'), decodeURIComponent(DEFAULT.icon.replace('data:image/svg+xml,', '')).replace(/'/g, '"') + '\n');

// a preview, not the real site: keep crawlers out; CNAME so Pages keeps the custom domain
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(OUT, 'CNAME'), SITE.domain + '\n');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(`built ${count} pages across ${THEMES.length} looks (${THEMES.map((t) => t.key).join(', ')}) + picker, 404, robots, CNAME`);
