// Enamel Kitchen: white lacquer cabinets dressed in glossy enamel, chrome trim, and an
// appliance-brochure "Choose your finish" picker. Contract: .impeccable/surfaces/tools-themes-kitchen-js.md
const { PRESETS, ORDER, cpDerive } = require('../palette');
const { ICON } = require('../base');

const swatch = (k) => {
  const p = PRESETS[k], t = cpDerive(p).vars;
  return `<button type="button" class="kx-sw" data-cp-palette="${k}" aria-pressed="${k === 'blush'}" style="--a:${t.btn};--b:${t.bg}">` +
    `<span class="kx-dot" aria-hidden="true"></span><span class="kx-name">${p.name}</span></button>`;
};

const controls = (where) => `<div class="kx-finish">
  <div class="kx-finish-head">
    <p class="kx-label" id="${where}-finish">Choose your finish</p>
    <p class="kx-now">Now showing <b data-cp-name>Blush</b></p>
  </div>
  <div class="kx-swatches" role="group" aria-labelledby="${where}-finish">
    ${ORDER.map(swatch).join('')}<button type="button" class="kx-sw" data-cp-palette="custom" aria-pressed="false"><span class="kx-dot kx-dot-mix" aria-hidden="true"></span><span class="kx-name">Your mix</span></button>
  </div>
  <div class="kx-row">
    <div class="kx-mix"><span>Mix your own</span>
      <label><input type="color" data-cp-custom="accent" value="#e0457b"> Main color</label>
      <label><input type="color" data-cp-custom="bg" value="#fffafc"> Background</label>
    </div>
    <div class="kx-knobs">
      <div class="kx-seg" role="group" aria-label="Spacing"><span class="kx-seg-t" aria-hidden="true">Spacing</span>${['Snug', 'Standard', 'Roomy'].map((l, i) =>
    `<button type="button" data-cp-space="${i}" aria-pressed="${i === 1}">${l}</button>`).join('')}</div>
      <div class="kx-seg" role="group" aria-label="Text size"><span class="kx-seg-t" aria-hidden="true">Text</span><button type="button" data-cp-text="0" aria-pressed="true">Standard</button><button type="button" data-cp-text="1" aria-pressed="false">Large</button></div>
      <button type="button" class="kx-reset" data-cp-reset>${ICON.reset}Reset</button>
    </div>
  </div>
</div>`;

const hero = (H, SITE) => `<div class="kx-hero" id="top">
  <div class="kx-hero-in">
    <div class="kx-door"><div class="kx-inset">${H.logo()}</div></div>
    <div class="kx-copy">
      <h1>${H.h1}</h1>
      <p class="lead">${H.lead}</p>
      <div class="cta-row">
        <a class="btn kx-badge" href="tel:${SITE.tel}">Call ${SITE.phone}</a>
        <a class="btn kx-line" href="#contact">Request service</a>
      </div>
      <p class="assurance">${H.assurance}</p>
    </div>
  </div>
</div>
<div class="kx-shelf"><div class="kx-tray">${controls('hero')}</div></div>`;

const css = `
:root{--font-display:'Shrikhand',Georgia,serif;--font-body:'Figtree',system-ui,sans-serif;--r:18px;
  --chrome:linear-gradient(180deg,#fdfdfe 0%,#e4e6eb 36%,#a4a9b3 52%,#eceef2 72%,#c6c9d0 100%);
  --chrome-x:linear-gradient(90deg,#c6c9d0,#f6f7f9 30%,#a4a9b3 60%,#e4e6eb);
  --gloss:linear-gradient(180deg,rgba(255,255,255,.4) 0%,rgba(255,255,255,.1) 47%,rgba(255,255,255,0) 53%);
  --sheen:radial-gradient(120% 75% at 22% -12%,rgba(255,255,255,.26),rgba(255,255,255,0) 58%);
  --lift:0 1px 2px rgba(45,10,25,.08),0 14px 30px -16px rgba(45,10,25,.34)}
html[data-dark="1"]{--chrome:linear-gradient(180deg,#9a9ea8 0%,#62666f 38%,#2a2c32 54%,#4e5159 76%,#777b84 100%);
  --chrome-x:linear-gradient(90deg,#4e5159,#9a9ea8 30%,#2a2c32 60%,#62666f);
  --gloss:linear-gradient(180deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.05) 47%,rgba(255,255,255,0) 53%);
  --sheen:radial-gradient(120% 75% at 22% -12%,rgba(255,255,255,.12),rgba(255,255,255,0) 58%);
  --lift:0 1px 2px rgba(0,0,0,.5),0 14px 30px -14px rgba(0,0,0,.8)}
body{font-weight:430}
h1,h2{font-family:var(--font-display);font-weight:400;color:var(--link);letter-spacing:0}
.prose h2,.side-card h3{font-family:var(--font-body);font-weight:800;color:var(--ink);letter-spacing:-.01em}
.page-head h1{font-size:clamp(2rem,4.2vw,3.1rem);line-height:1.08}

/* topbar, chrome trim, enamel call badge */
.site-head{box-shadow:0 10px 20px -18px rgba(0,0,0,.5)}
.topbar{padding-block:12px}
.topbar .brand{display:flex;flex-direction:column;color:var(--link)}
.topbar .brand b{font-family:var(--font-display);font-weight:400;font-size:1.5rem;line-height:1}
.topbar .brand small{font-weight:800;font-size:.72rem;letter-spacing:.15em;color:var(--muted);margin-top:4px}
nav.main{background-color:var(--bg);background-image:var(--chrome);background-size:100% 4px;background-repeat:no-repeat;padding-top:4px}
nav.main a[aria-current]{border-bottom-color:transparent;background:linear-gradient(var(--btn),var(--btn)) bottom/100% 4px no-repeat;border-radius:2px}
.btn-primary,.topbar a.call{background-image:var(--gloss);border:0;
  box-shadow:inset 0 -3px 0 rgba(0,0,0,.2),0 8px 16px -9px color-mix(in srgb,var(--btn) 70%,#000)}
.btn-primary:active,.topbar a.call:active{transform:translateY(2px);box-shadow:inset 0 -1px 0 rgba(0,0,0,.2),0 3px 8px -6px color-mix(in srgb,var(--btn) 70%,#000)}
.topbar a.call{font-weight:800;padding:10px 20px;transition:transform .1s var(--ease),box-shadow .1s var(--ease)}
.btn,.btn-ghost{border-radius:999px}
.kx-toggle{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--line);background:var(--surface);color:var(--ink);
  border-radius:999px;padding:6px 15px 6px 6px;font-weight:700;font-size:.92rem;box-shadow:inset 0 -2px 0 var(--line)}
.kx-toggle:hover{border-color:var(--link)}
.kx-toggle:active{transform:translateY(1px)}
.kx-toggle[aria-expanded=true]{border-color:var(--link);background:var(--wash)}
.kx-toggle .kx-dot{--a:var(--btn);--b:var(--surface);width:24px;height:24px}

/* header drop-down finish panel */
.cp-panel{position:absolute;right:clamp(16px,4vw,40px);top:100%;margin-top:10px;width:min(660px,calc(100vw - 32px));
  background:var(--surface);border-radius:22px;padding:24px 24px 18px;box-shadow:0 0 0 1px var(--line),0 28px 50px -22px rgba(0,0,0,.55)}
.cp-panel::before,.kx-tray::before{content:"";position:absolute;inset:0 0 auto;height:5px;border-radius:22px 22px 0 0;background:var(--chrome)}

/* hero: an enamel field, a lacquer cabinet door, and the finish shelf */
.kx-hero{background:var(--sheen),var(--btn);color:var(--on-btn);
  padding:calc(var(--s)*clamp(32px,4vw,52px)) clamp(16px,4vw,40px) calc(var(--s)*clamp(64px,7vw,84px))}
.kx-hero :focus-visible,.cta-band :focus-visible{outline-color:var(--on-btn)}
html:not([data-dark="1"]) .kx-door{background:color-mix(in srgb,var(--surface) 90%,var(--btn))}
html:not([data-dark="1"]) .kx-door img{mix-blend-mode:multiply}
.kx-hero-in{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:minmax(260px,430px) 1fr;gap:clamp(28px,5vw,72px);align-items:center}
.kx-door{background:var(--surface);border-radius:22px;padding:12px;position:relative;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 2px 0 rgba(0,0,0,.08),0 30px 50px -28px rgba(0,0,0,.65)}
.kx-inset{border-radius:12px;padding:20px 18px;box-shadow:inset 0 0 0 1px var(--line),inset 0 0 0 8px var(--surface),inset 0 0 0 9px var(--line)}
.kx-door img{display:block;width:100%}
.kx-copy h1{font-size:clamp(2.4rem,4.4vw,3.5rem);line-height:1.04;color:var(--on-btn);margin:0 0 1.1rem;text-shadow:0 2px 6px rgba(0,0,0,.14)}
@media (min-width:761px){.kx-copy h1 em{white-space:nowrap}}
.kx-copy h1 em{font-style:normal;display:block}
.kx-copy .lead{font-size:1.15rem;max-width:44ch;margin:0 0 1.7rem;color:var(--on-btn)}
.kx-badge{background:var(--gloss),var(--on-btn);color:var(--btn);font-size:1.32rem;font-weight:800;padding:19px 36px;
  box-shadow:inset 0 -3px 0 rgba(0,0,0,.13),0 16px 26px -14px rgba(0,0,0,.7)}
.kx-badge:hover{color:var(--btn);filter:none;transform:translateY(-1px);box-shadow:inset 0 -3px 0 rgba(0,0,0,.13),0 20px 30px -14px rgba(0,0,0,.75)}
.kx-badge:active{box-shadow:inset 0 -1px 0 rgba(0,0,0,.13),0 6px 12px -8px rgba(0,0,0,.7)}
.kx-line{color:var(--on-btn);border:1.5px solid var(--on-btn);padding:13px 20px}
.kx-line:hover{color:var(--on-btn);background:color-mix(in srgb,var(--on-btn) 12%,transparent)}
.kx-hero .assurance{color:var(--on-btn);font-size:.96rem;margin:1.3rem 0 0}
.kx-hero .assurance a{color:var(--on-btn)}
.kx-shelf{padding:0 clamp(16px,4vw,40px);margin-top:calc(var(--s)*-52px);position:relative;z-index:2}
.kx-tray{max-width:1080px;margin:0 auto;background:var(--surface);border-radius:22px;position:relative;
  padding:calc(var(--s)*22px + 5px) clamp(16px,3vw,30px) calc(var(--s)*18px);box-shadow:0 0 0 1px var(--line),0 30px 50px -30px rgba(0,0,0,.6)}

/* the finish picker */
.kx-finish-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:2px 16px;margin-bottom:10px}
.kx-label{font-family:var(--font-display);font-size:1.4rem;line-height:1.2;color:var(--link);margin:0}
.kx-now{margin:0;color:var(--muted);font-size:.93rem}
.kx-now b{color:var(--ink)}
.kx-swatches{display:flex;flex-wrap:wrap;gap:4px 2px;margin:0 -8px}
.kx-sw{display:flex;flex-direction:column;align-items:center;gap:9px;background:none;border:0;padding:8px 6px 6px;border-radius:14px;width:92px;color:var(--ink)}
.kx-dot{display:block;width:54px;height:54px;border-radius:50%;flex:none;
  background:radial-gradient(circle at 34% 27%,rgba(255,255,255,.75),rgba(255,255,255,0) 33%),var(--a);
  box-shadow:inset 0 -5px 7px rgba(0,0,0,.24),0 0 0 4px var(--b),0 0 0 5px var(--line),0 9px 13px -7px rgba(0,0,0,.5);
  transition:transform .12s var(--ease),box-shadow .12s var(--ease)}
.kx-dot-mix{background:radial-gradient(circle at 34% 27%,rgba(255,255,255,.75),rgba(255,255,255,0) 33%),linear-gradient(135deg,var(--cx-a) 50%,var(--cx-b) 50%);--b:var(--surface)}
.kx-sw:hover .kx-dot{transform:translateY(-2px)}
.kx-sw:active .kx-dot{transform:translateY(2px) scale(.97);box-shadow:inset 0 -2px 4px rgba(0,0,0,.24),0 0 0 4px var(--b),0 0 0 5px var(--line),0 3px 5px -3px rgba(0,0,0,.5)}
.kx-sw[aria-pressed=true] .kx-dot{box-shadow:inset 0 -5px 7px rgba(0,0,0,.24),0 0 0 4px var(--b),0 0 0 7px var(--ink),0 9px 13px -7px rgba(0,0,0,.5)}
.kx-name{font-size:.8rem;font-weight:700;line-height:1.15;text-align:center}
.kx-sw[aria-pressed=true] .kx-name{color:var(--link)}
.kx-row{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}
.kx-mix{display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;font-size:.92rem;font-weight:700}
.kx-mix label{display:inline-flex;align-items:center;gap:8px;font-weight:600}
input[type=color]{width:40px;height:40px;border:1px solid var(--line);border-radius:50%;padding:0;background:var(--surface);cursor:pointer;box-shadow:inset 0 -2px 0 var(--line)}
input[type=color]::-webkit-color-swatch-wrapper{padding:4px}
input[type=color]::-webkit-color-swatch{border:0;border-radius:50%}
input[type=color]::-moz-color-swatch{border:0;border-radius:50%}
.kx-knobs{display:flex;flex-wrap:wrap;gap:10px 12px;align-items:center}
.kx-seg{display:inline-flex;align-items:center;background:var(--wash);border-radius:999px;padding:3px;box-shadow:inset 0 1px 3px rgba(0,0,0,.16)}
.kx-seg-t{font-size:.74rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);padding:0 8px 0 11px}
.kx-seg button{border:0;background:none;border-radius:999px;padding:7px 12px;font-size:.88rem;font-weight:700;color:var(--ink)}
.kx-seg button:hover{color:var(--link)}
.kx-seg button[aria-pressed=true]{background:var(--gloss),var(--btn);color:var(--on-btn);box-shadow:inset 0 -2px 0 rgba(0,0,0,.2),0 3px 6px -3px rgba(0,0,0,.45)}
.kx-seg button:active{transform:translateY(1px)}
.kx-reset{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:var(--link);font-weight:700;font-size:.9rem;padding:8px 4px}
.kx-reset:hover{text-decoration:underline;text-underline-offset:.2em}
.kx-reset svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

/* cabinet run of drawer fronts with chrome pulls */
.services{background:var(--bg);border:0;padding-top:calc(var(--s)*clamp(52px,7vw,84px))}
.svc-grid{background:var(--line);padding:8px;gap:8px;border-radius:22px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));box-shadow:var(--lift)}
.svc{background:var(--surface);border:0;border-radius:13px;padding:calc(var(--s)*28px) 22px calc(var(--s)*22px);position:relative;
  box-shadow:inset 0 0 0 7px var(--surface),inset 0 0 0 8px var(--line)}
a.svc:hover{transform:none;box-shadow:inset 0 0 0 7px var(--surface),inset 0 0 0 8px var(--link),0 10px 18px -12px rgba(0,0,0,.5)}
a.svc:active{transform:translateY(2px)}
.svc h3{font-weight:800}

.trust,.parts-box{background:var(--sheen),var(--deep);border-radius:24px;box-shadow:var(--lift)}
.area{background:var(--wash);border:0}
.chips li{box-shadow:inset 0 -2px 0 var(--line)}
.page-head{border:0}
.side-card{position:sticky;overflow:hidden;box-shadow:var(--lift);border-radius:20px;padding-top:calc(var(--s)*20px + 5px)}
.side-card::before{content:"";position:absolute;inset:0 0 auto;height:5px;background:var(--chrome)}
.side-card .btn{border-radius:999px}
.card{border:0;border-radius:16px;box-shadow:inset 0 0 0 1px var(--line),inset 0 0 0 6px var(--surface),inset 0 0 0 7px var(--line);padding:calc(var(--s)*20px) 22px calc(var(--s)*18px)}
.card:hover{box-shadow:inset 0 0 0 1px var(--link),inset 0 0 0 6px var(--surface),inset 0 0 0 7px var(--line),0 12px 20px -14px rgba(0,0,0,.5)}
.card .level{border:0}
.card[data-level=moderate] .level{background:var(--gloss),var(--btn);color:var(--on-btn)}
.card[data-level=advanced] .level{background:var(--gloss),var(--deep);color:var(--on-deep)}
.card[data-level=easy] .level{background:var(--wash)}
.prose ol.steps>li::before{background:var(--gloss),var(--btn);color:var(--on-btn);box-shadow:inset 0 -2px 0 rgba(0,0,0,.2)}
.price-table{border-radius:20px;box-shadow:var(--lift)}
.price-table thead th.us{background:var(--gloss),var(--btn)}
.bignum a{color:var(--link)}
.cta-band{background:var(--sheen),var(--btn);color:var(--on-btn)}
.cta-band h2{color:var(--on-btn)}
.cta-band p{color:var(--on-btn)}
.cta-band .btn-primary{background:var(--gloss),var(--on-btn);color:var(--btn);box-shadow:inset 0 -3px 0 rgba(0,0,0,.13),0 14px 24px -14px rgba(0,0,0,.7)}
.cta-band .btn-ghost{color:var(--on-btn);border-color:var(--on-btn)}
footer.site{background-color:var(--deep);background-image:var(--chrome);background-size:100% 4px;background-repeat:no-repeat;padding-top:calc(var(--s)*30px + 4px)}

@media (max-width:760px){
  .kx-hero-in{grid-template-columns:1fr}
  .kx-door{order:2;max-width:240px;padding:9px}
  .kx-inset{padding:14px 12px}
  .cp-panel{position:static;width:auto;margin:0 16px 14px;padding:22px 16px 14px}
  .kx-sw{width:calc((100% - 12px)/4)}
  .kx-dot{width:46px;height:46px}
  .topbar .brand b{font-size:1.3rem}
}
`;

module.exports = {
  key: 'kitchen',
  name: 'Enamel Kitchen',
  blurb: 'A white kitchen dressed in glossy enamel. Pick a finish and the whole place repaints.',
  fonts: [
    { family: 'Shrikhand', file: 'shrikhand-400.woff2', preload: true },
    { family: 'Figtree', file: 'figtree-var.woff2', weight: '300 900', preload: true },
  ],
  css,
  brand: '<b>Copper Peak</b><small>HEATING &amp; COOLING</small>',
  toggle: '<button type="button" class="kx-toggle" data-cp-toggle aria-controls="cp-panel" aria-expanded="false"><span class="kx-dot" aria-hidden="true"></span>Finish</button>',
  controls,
  hero,
};
