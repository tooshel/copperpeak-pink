// Seven-Segment Thermostat: a molded wall unit with a tinted LCD; MODE cycles the palette and the
// arrows set spacing like a setpoint. Contract: .impeccable/surfaces/tools-themes-thermostat-js.md
const { PRESETS, ORDER } = require('../palette');
const { ICON } = require('../base');

const SHORT = { blush: 'Blush', rose: 'Rose', lilac: 'Lilac', midnight: 'Goth', sage: 'Sage', copper: 'Copper' };
// DSEG renders "!" as a blank digit cell, so ghost and lit strings line up cell for cell.
const LIT = '480!673-8311', GHOST = '888!888-8888';
const digits = (cls = '') => `<span class="th-digits ${cls}" aria-hidden="true"><span class="th-ghost">${GHOST}</span><span class="th-lit">${LIT}</span></span>`;

const controls = (where, SITE = { tel: '+14806738311', phone: '(480) 673-8311' }) => `<div class="th-unit th-unit--${where}">
  <div class="th-lcd">
    <div class="th-row"><span class="th-legend" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2v20M12 12l7-4M12 12l-7-4M12 12l7 4M12 12l-7 4M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5"/></svg>Cool</span><span>Call or text</span><span><span class="sr">Palette: </span><span data-cp-name>Blush</span></span></div>
    <a class="th-call" href="tel:${SITE.tel}" aria-label="Call ${SITE.phone}">${digits()}</a>
    <div class="th-row th-modes" role="group" aria-label="Color palette">${ORDER.map((k) =>
    `<button type="button" data-cp-palette="${k}" aria-pressed="${k === 'blush'}" aria-label="${PRESETS[k].name}">${SHORT[k]}</button>`).join('')}<button type="button" data-cp-palette="custom" aria-pressed="false" aria-label="Your mix">Mix</button></div>
    <div class="th-row th-bot"><span>Spacing <b data-cp-spacename>Standard</b></span><span>Text <b data-cp-textname>Standard</b></span></div>
  </div>
  <div class="th-keys">
    <button type="button" class="th-key th-key-mode" data-cp-cycle aria-label="Mode: next color palette">Mode</button>
    <span class="th-pair" role="group" aria-label="Spacing">
      <button type="button" class="th-key" data-cp-step="space:-1" aria-label="Less spacing">${ICON.down}</button>
      <button type="button" class="th-key" data-cp-step="space:1" aria-label="More spacing">${ICON.up}</button>
    </span>
    <button type="button" class="th-key" data-cp-text="toggle" aria-pressed="false" aria-label="Larger text">Text</button>
  </div>
  <div class="th-set">
    <span class="th-set-t">Set your own</span>
    <label><input type="color" data-cp-custom="accent" value="#e0457b"> Main color</label>
    <label><input type="color" data-cp-custom="bg" value="#fffafc"> Background</label>
    <button type="button" class="th-reset" data-cp-reset>${ICON.reset}Reset</button>
  </div>
</div>`;

const hero = (H, SITE) => `<div class="th-hero" id="top">
  <div class="th-hero-in">
    <div class="th-copy">
      ${H.logo('th-logo')}
      <h1>${H.h1}</h1>
      <p class="lead">${H.lead}</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="tel:${SITE.tel}">Call ${SITE.phone}</a>
        <a class="btn btn-ghost" href="#contact">Request service</a>
      </div>
      <p class="assurance">${H.assurance}</p>
    </div>
    <div class="th-wall">
      ${controls('hero', SITE)}
      <p class="th-caption">Press <b>Mode</b> to change the colors. The arrows set the spacing.</p>
    </div>
  </div>
</div>`;

const css = `
:root{--font-display:'Barlow Semi Condensed','Barlow',sans-serif;--font-body:'Barlow',system-ui,sans-serif;--r:18px;
  --mold:inset 0 1px 0 rgba(255,255,255,.85),0 0 0 1px var(--line),0 2px 3px rgba(40,10,25,.06),0 22px 40px -24px rgba(40,10,25,.45);
  --glass:linear-gradient(165deg,rgba(255,255,255,.4),rgba(255,255,255,0) 42%)}
html[data-dark="1"]{--mold:inset 0 1px 0 rgba(255,255,255,.07),0 0 0 1px var(--line),0 2px 3px rgba(0,0,0,.4),0 22px 40px -22px rgba(0,0,0,.85);
  --glass:linear-gradient(165deg,rgba(255,255,255,.07),rgba(255,255,255,0) 42%)}
body{font-size:1.09rem}
h1,h2,h3{font-family:var(--font-display);font-weight:800;letter-spacing:-.005em}
h3{font-weight:600;font-size:1.15rem}
h1 em{font-style:normal;color:var(--link)}
.page-head h1{font-size:clamp(2rem,4vw,3rem);line-height:1.04}
.topbar{box-shadow:inset 0 -1px 0 var(--line)}
.topbar .brand{font-family:var(--font-display);font-weight:800;font-size:1.2rem;letter-spacing:.05em;text-transform:uppercase}
.topbar .brand small{font-weight:600;color:var(--muted);letter-spacing:.12em;margin-left:.4em;font-size:.78em}
.th-toggle{display:inline-flex;align-items:center;gap:9px;border:0;background:var(--surface);color:var(--ink);border-radius:999px;padding:6px 14px 6px 7px;
  font-family:var(--font-display);font-weight:600;font-size:.95rem;letter-spacing:.04em;box-shadow:var(--mold)}
.th-toggle:active{transform:translateY(1px)}
.th-toggle[aria-expanded=true]{background:var(--wash)}
.th-toggle i{display:block;width:30px;height:20px;border-radius:5px;background:var(--glass),var(--wash);box-shadow:inset 0 1px 3px rgba(0,0,0,.25),inset 0 0 0 1px var(--line);position:relative}
.th-toggle i::after{content:"";position:absolute;left:6px;right:6px;top:8px;height:3px;border-radius:2px;background:var(--ink);opacity:.8}
.cp-panel{position:absolute;right:clamp(16px,4vw,40px);top:100%;margin-top:10px;width:min(440px,calc(100vw - 32px));z-index:30}
.btn{border-radius:999px}
.btn-primary,.topbar a.call{box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 8px 16px -10px color-mix(in srgb,var(--btn) 75%,#000)}

/* hero */
.th-hero{padding:calc(var(--s)*clamp(30px,5vw,64px)) clamp(16px,4vw,40px) calc(var(--s)*clamp(34px,5vw,64px));
  background:radial-gradient(70% 90% at 85% 40%,var(--wash),transparent 70%),var(--bg);border-bottom:1px solid var(--line)}
.th-hero-in{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr minmax(320px,430px);gap:clamp(28px,5vw,72px);align-items:center}
.th-logo{display:block;width:min(100%,320px);margin:0 0 calc(var(--s)*1.2rem)}
html:not([data-dark="1"]) .th-logo{mix-blend-mode:multiply}
html[data-dark="1"] .th-logo{mix-blend-mode:lighten}
.th-copy h1{font-size:clamp(2.4rem,5vw,3.9rem);line-height:.98;margin:0 0 1rem;letter-spacing:-.01em}
.th-copy .lead{font-size:1.15rem;max-width:44ch;margin:0 0 1.6rem}
.th-hero .assurance{font-size:.96rem;color:var(--muted);margin:1.2rem 0 0}
.th-caption{text-align:center;font-size:.92rem;color:var(--muted);margin:14px 0 0}

/* the wall unit */
.th-unit{background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 88%,#fff),var(--surface));border-radius:30px;padding:18px 18px 16px;box-shadow:var(--mold)}
html[data-dark="1"] .th-unit{background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,#fff),var(--surface))}
.th-lcd{position:relative;overflow:hidden;background:var(--wash);color:var(--ink);border-radius:14px;padding:12px 16px 10px;
  box-shadow:inset 0 2px 9px rgba(0,0,0,.22),inset 0 0 0 1px var(--line)}
.th-lcd::after{content:"";position:absolute;inset:0;background:var(--glass);pointer-events:none}
.th-row{display:flex;justify-content:space-between;align-items:center;gap:6px;font-family:var(--font-display);font-weight:600;font-size:.76rem;
  letter-spacing:.13em;text-transform:uppercase}
.th-row b{font-weight:800}
.th-call{display:block;text-decoration:none;color:var(--ink);margin:8px 0 8px;border-radius:6px}
.th-digits{position:relative;display:block;font-family:'DSEG7';font-weight:700;font-size:clamp(1.4rem,3vw,2.1rem);line-height:1.25;white-space:nowrap;letter-spacing:.02em}
.th-ghost{position:absolute;inset:0;opacity:.12}
html[data-dark="1"] .th-ghost{opacity:.08}
.th-legend{display:inline-flex;align-items:center;gap:5px}
.th-legend svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.th-modes{justify-content:flex-start;flex-wrap:wrap;gap:2px 4px;margin:2px -5px 8px;position:relative;z-index:1}
.th-modes button{border:0;background:none;font:inherit;letter-spacing:inherit;text-transform:inherit;color:var(--muted);padding:4px 5px;border-radius:4px}
.th-modes button:hover{color:var(--ink)}
.th-modes button[aria-pressed=true]{background:var(--ink);color:var(--wash)}
.th-bot{border-top:1px solid color-mix(in srgb,var(--ink) 18%,transparent);padding-top:7px}
.th-keys{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px}
.th-pair{display:flex;gap:10px}
.th-key{min-width:48px;height:48px;padding:0 16px;border:0;border-radius:999px;background:var(--surface);color:var(--ink);display:grid;place-items:center;
  font-family:var(--font-display);font-weight:800;font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.75),inset 0 -3px 0 rgba(0,0,0,.08),0 0 0 1px var(--line),0 5px 10px -5px rgba(0,0,0,.4);
  transition:transform .08s var(--ease),box-shadow .08s var(--ease)}
.th-pair .th-key{padding:0;width:52px}
.th-key:hover:not(:disabled){filter:brightness(1.04);color:var(--link)}
.th-key-mode:hover:not(:disabled),.th-key[aria-pressed=true]:hover{color:var(--on-btn)}
.th-key:disabled{opacity:.45;cursor:default}
.th-key:active:not(:disabled){transform:translateY(2px);box-shadow:inset 0 2px 5px rgba(0,0,0,.22),0 0 0 1px var(--line)}
.th-key svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.th-key-mode,.th-key[aria-pressed=true]{background:var(--btn);color:var(--on-btn);box-shadow:inset 0 1px 0 rgba(255,255,255,.25),inset 0 -3px 0 rgba(0,0,0,.18),0 5px 12px -5px color-mix(in srgb,var(--btn) 70%,#000)}
.th-key-mode{padding:0 22px}
.th-set{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:.92rem}
.th-set-t{font-family:var(--font-display);font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:.78rem;color:var(--muted)}
.th-set label{display:inline-flex;align-items:center;gap:7px;font-weight:600}
input[type=color]{width:40px;height:40px;border:0;border-radius:50%;padding:0;background:var(--surface);cursor:pointer;box-shadow:var(--mold)}
input[type=color]::-webkit-color-swatch-wrapper{padding:4px}
input[type=color]::-webkit-color-swatch{border:0;border-radius:50%}
input[type=color]::-moz-color-swatch{border:0;border-radius:50%}
.th-reset{margin-left:auto;display:inline-flex;align-items:center;gap:6px;border:0;background:none;color:var(--link);font-weight:600;padding:8px 2px}
.th-reset:hover{text-decoration:underline;text-underline-offset:.2em}
.th-reset svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.th-blink-sp [data-cp-spacename]{animation:th-blink .6s step-end 1}
.th-blink .th-lit,.th-blink [data-cp-name]{animation:th-blink .6s step-end 1}
@keyframes th-blink{0%{opacity:.12}25%{opacity:1}50%{opacity:.12}75%{opacity:1}}

/* the rest of the house: molded panels and little LCD windows */
.services{background:var(--bg);border:0}
.svc,.card,.side-card,.price-table{border:0;border-radius:22px;box-shadow:var(--mold)}
.svc{background:var(--surface)}
.svc svg{width:58px;height:58px;padding:12px;border-radius:12px;background:var(--wash);stroke:var(--ink);stroke-width:1.7;box-shadow:inset 0 2px 5px rgba(0,0,0,.2)}
.price-table td.us{background:var(--wash);box-shadow:inset 0 2px 7px rgba(0,0,0,.14);color:var(--ink)}
a.svc:hover,.card:hover{transform:translateY(-3px)}
.card .level{display:inline-block;border:0;border-radius:6px;background:var(--glass),var(--wash);box-shadow:inset 0 1px 3px rgba(0,0,0,.2);
  font-family:var(--font-display);font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:.74rem;padding:4px 9px}
.page-head{background:radial-gradient(60% 120% at 90% 0,var(--wash),transparent 70%),var(--bg)}
.page-head .meta li{border:0;box-shadow:var(--mold);font-family:var(--font-display);letter-spacing:.06em}
.trust,.parts-box{border-radius:26px}
.area{background:var(--wash)}
.chips li{border:0;box-shadow:var(--mold);font-weight:600}
.prose ol.steps>li::before{background:var(--surface);color:var(--ink);box-shadow:var(--mold);font-family:var(--font-display);font-weight:800}
.price-table thead th{font-family:var(--font-display);letter-spacing:.06em;text-transform:uppercase;font-size:.84rem}
.bignum .th-call{display:inline-block;background:var(--wash);border-radius:12px;padding:8px 16px;box-shadow:inset 0 2px 7px rgba(0,0,0,.2),inset 0 0 0 1px var(--line);margin:4px 0 0}
.bignum .th-digits{font-size:clamp(1.4rem,3vw,1.8rem)}
.contact h3{font-family:var(--font-display);text-transform:uppercase;letter-spacing:.1em;font-size:.86rem;color:var(--muted)}

@media (max-width:860px){
  .th-logo{width:min(100%,200px)}
  .th-hero-in{grid-template-columns:1fr}
  .th-wall{max-width:440px}
  .cp-panel{position:static;width:auto;margin:0 16px 14px}
}
@media (max-width:420px){
  .th-unit{padding:14px 12px 12px;border-radius:24px}
  .th-key-mode{padding:0 16px}
  .th-pair .th-key{width:48px}
}
`;

module.exports = {
  key: 'thermostat',
  name: 'Seven-Segment Thermostat',
  blurb: 'The thermostat on the wall. Press MODE to change colors; the arrows set the spacing.',
  fonts: [
    { family: 'Barlow Semi Condensed', file: 'barlow-sc-800.woff2', weight: 800, preload: true },
    { family: 'Barlow Semi Condensed', file: 'barlow-sc-600.woff2', weight: 600 },
    { family: 'Barlow', file: 'barlow-400.woff2', weight: 400, preload: true },
    { family: 'Barlow', file: 'barlow-600.woff2', weight: 600 },
    { family: 'DSEG7', file: 'DSEG7Classic-Bold.woff2', weight: 700, preload: true },
  ],
  css,
  brand: 'Copper Peak<small>Heating &amp; Cooling</small>',
  toggle: '<button type="button" class="th-toggle" data-cp-toggle aria-controls="cp-panel" aria-expanded="false"><i aria-hidden="true"></i>Display</button>',
  controls: (where) => controls(where),
  hero,
  post: (html) => html.replace(/<p class="bignum"><a href="tel:([^"]+)">([^<]+)<\/a><\/p>/g,
    (m, tel, phone) => `<p class="bignum"><a class="th-call" href="tel:${tel}" aria-label="Call ${phone}">${digits()}</a></p>`),
  tail: `<script>document.addEventListener('cp:change',function(e){var c=e.detail.why==='space'?'th-blink-sp':(e.detail.why==='cycle'||e.detail.why==='palette')?'th-blink':'';if(!c)return;
Array.prototype.forEach.call(document.querySelectorAll('.th-lcd'),function(l){l.classList.remove(c);void l.offsetWidth;l.classList.add(c)})});</script>`,
};
