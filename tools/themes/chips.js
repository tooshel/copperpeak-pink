// Paint Chip Deck: every palette is a named paint chip; pull one from the fan and the room
// repaints. Contract: .impeccable/surfaces/tools-themes-chips-js.md
const { PRESETS, ORDER, cpDerive } = require('../palette');
const { ICON } = require('../base');

const chip = (k, i) => {
  const p = PRESETS[k], t = cpDerive(p).vars;
  return `<button type="button" class="chip" data-cp-palette="${k}" aria-pressed="${k === 'blush'}" style="--i:${i};--c1:${t.wash};--c2:${t.btn};--c3:${t.deep}">` +
    `<span class="chip-sw" aria-hidden="true"><i></i><i></i><i></i></span><span class="chip-tag"><small>${p.code}</small><b>${p.name}</b></span></button>`;
};
const mixChip = (i) => `<button type="button" class="chip chip-mix" data-cp-palette="custom" aria-pressed="false" style="--i:${i}">` +
  '<span class="chip-sw" aria-hidden="true"><i></i><i></i><i></i></span><span class="chip-tag"><small>CP-000</small><b>Your mix</b></span></button>';

const controls = (where) => {
  const fan = where === 'hero';
  return `<div class="deck deck--${fan ? 'fan' : 'strip'}">
  ${fan ? '' : `<div class="deck-head"><p class="deck-title" id="${where}-deck">Color deck</p><button type="button" class="deck-x" data-cp-toggle aria-controls="cp-panel" aria-expanded="false" aria-label="Close the color deck">${ICON.close}</button></div>`}
  <div class="deck-chips" role="group" ${fan ? 'aria-label="Paint chips: pick a palette for the whole site"' : `aria-labelledby="${where}-deck"`}>
    ${ORDER.map(chip).join('')}${mixChip(ORDER.length)}${fan ? '<span class="deck-rivet" aria-hidden="true"></span>' : ''}
  </div>
  <p class="deck-now"><b data-cp-name>Blush</b><span data-cp-code>CP-101</span></p>
  <div class="deck-mix"><span>Mix your own</span>
    <label><input type="color" data-cp-custom="accent" value="#e0457b"> Main color</label>
    <label><input type="color" data-cp-custom="bg" value="#fffafc"> Background</label>
  </div>
  <div class="deck-knobs">
    <div class="ch-seg" role="group" aria-label="Spacing"><span class="ch-seg-t" aria-hidden="true">Spacing</span>${['Snug', 'Standard', 'Roomy'].map((l, i) =>
    `<button type="button" data-cp-space="${i}" aria-pressed="${i === 1}">${l}</button>`).join('')}</div>
    <div class="ch-seg" role="group" aria-label="Text size"><span class="ch-seg-t" aria-hidden="true">Text</span><button type="button" data-cp-text="0" aria-pressed="true">Standard</button><button type="button" data-cp-text="1" aria-pressed="false">Large</button></div>
    <button type="button" class="ch-reset" data-cp-reset>${ICON.reset}Reset</button>
  </div>
</div>`;
};

const hero = (H, SITE) => `<div class="ch-hero" id="top">
  <div class="ch-hero-in">
    <div class="ch-copy">
      <div class="ch-logo">${H.logo()}</div>
      <h1>${H.h1}</h1>
      <p class="lead">${H.lead}</p>
      <a class="ch-call" href="tel:${SITE.tel}">
        <span class="ch-call-sw"><span class="ch-call-num">${SITE.phone}</span></span>
        <span class="ch-call-tag"><b>Call or text a real person</b><small>Emergency? Call. We answer.</small></span>
      </a>
      <p class="assurance">${H.assurance} &middot; <a href="#contact">Request service</a></p>
    </div>
    <div class="ch-deck">${controls('hero')}</div>
  </div>
</div>`;

const css = `
@property --step{syntax:'<angle>';inherits:true;initial-value:12deg}
:root{--font-display:'Archivo Black','Work Sans',sans-serif;--font-body:'Work Sans',system-ui,sans-serif;--r:5px;
  --paper:0 1px 1px rgba(30,10,20,.1),0 10px 22px -12px rgba(30,10,20,.42);--card:#fdfcfa;--card-ink:#1f1a1c;--card-soft:#5b5257}
html[data-dark="1"]{--paper:0 1px 1px rgba(0,0,0,.5),0 12px 24px -12px rgba(0,0,0,.85)}
h1,h2{font-family:var(--font-display);font-weight:400;letter-spacing:-.012em}
h1 em{font-style:normal;color:var(--link)}
.page-head h1{font-size:clamp(1.9rem,3.8vw,2.8rem);line-height:1.06}
.topbar .brand{display:flex;align-items:center;gap:11px;font-family:var(--font-display);font-weight:400;font-size:1.08rem;letter-spacing:.02em;text-transform:uppercase}
.topbar .brand small{display:block;font-family:var(--font-body);font-weight:600;font-size:.72rem;letter-spacing:.16em;color:var(--muted)}
.ch-mark{flex:none;width:13px;height:36px;border-radius:2px;background:linear-gradient(var(--wash) 0 33%,var(--btn) 33% 66%,var(--deep) 66%);
  box-shadow:0 0 0 2px var(--card),0 0 0 3px var(--line)}
.topbar a.call,.btn{border-radius:4px}
nav.main a[aria-current]{border-bottom-width:4px}

/* hero: the copy, the biggest chip card (the phone), and the fan deck */
.ch-hero{padding:calc(var(--s)*clamp(28px,5vw,64px)) clamp(16px,4vw,40px) calc(var(--s)*clamp(28px,5vw,60px));border-bottom:1px solid var(--line)}
.ch-hero-in{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(24px,5vw,64px);align-items:center}
.ch-logo{max-width:340px;background:var(--surface);padding:10px;border-radius:4px;box-shadow:var(--paper);margin-bottom:calc(var(--s)*1.5rem)}
.ch-logo img{display:block}
.ch-copy h1{font-size:clamp(2.2rem,4.6vw,3.5rem);line-height:1.02;margin:0 0 1rem}
.ch-copy .lead{font-size:1.12rem;max-width:46ch;margin:0 0 1.6rem}
.ch-call{display:flex;flex-direction:column;width:min(100%,400px);text-decoration:none;background:var(--card);border-radius:4px;box-shadow:var(--paper);
  padding:8px 8px 0;transition:transform .2s var(--ease),box-shadow .2s var(--ease)}
.ch-call:hover{transform:translateY(-3px) rotate(-.6deg)}
.ch-call:active{transform:translateY(1px)}
.ch-call-sw{display:block;background:var(--btn);color:var(--on-btn);padding:26px 18px 24px;border-radius:2px}
.ch-call-num{font-family:var(--font-display);font-size:clamp(1.8rem,3.6vw,2.4rem);line-height:1;font-variant-numeric:tabular-nums}
.ch-call-tag{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 10px;padding:10px 6px 11px;color:var(--card-ink);font-size:.9rem}
.ch-call-tag b{font-weight:700}
.ch-call-tag small{color:var(--card-soft);font-size:.84rem}
.ch-hero .assurance{font-size:.94rem;color:var(--muted);margin:1.3rem 0 0}

/* chips, as paper cards: always white card stock, whatever the palette */
.chip{display:flex;flex-direction:column;background:var(--card);color:var(--card-ink);border:0;border-radius:4px;padding:5px 5px 0;text-align:left;
  box-shadow:0 1px 1px rgba(0,0,0,.14),0 8px 16px -8px rgba(0,0,0,.45)}
.chip-sw{flex:1;display:flex;flex-direction:column;border-radius:2px;overflow:hidden;min-height:0}
.chip-sw i{flex:1;display:block}
.chip-sw i:nth-child(1){background:var(--c1)}
.chip-sw i:nth-child(2){background:var(--c2)}
.chip-sw i:nth-child(3){background:var(--c3)}
.chip-mix{--c1:var(--cx-b);--c2:var(--cx-a);--c3:color-mix(in srgb,var(--cx-a) 55%,#000)}
.chip-tag{display:flex;flex-direction:column;padding:6px 2px 8px;line-height:1.12}
.chip-tag small{white-space:nowrap;font-size:.7rem;letter-spacing:.06em;font-weight:600;color:var(--card-soft);font-variant-numeric:tabular-nums}
.chip-tag b{font-size:.72rem;font-weight:700}
.chip:focus-visible{outline-offset:2px}

.deck--fan .deck-chips{--cw:clamp(58px,7.6vw,100px);--ch:calc(var(--cw)*3);position:relative;height:calc(var(--ch) + 64px);
  animation:fan-open 1.1s var(--ease) .2s both}
@keyframes fan-open{from{--step:0deg}to{--step:12deg}}
.deck--fan .chip{position:absolute;left:50%;bottom:24px;width:var(--cw);height:var(--ch);margin-left:calc(var(--cw)/-2);
  transform-origin:50% calc(100% - 18px);transform:rotate(calc((var(--i) - 3)*var(--step)));transition:transform .45s var(--ease),box-shadow .3s}
.deck--fan .chip{flex-direction:column-reverse;padding:0 5px 30px}
.deck--fan .chip-tag{padding:7px 2px 6px}
.deck--fan .chip:hover,.deck--fan .chip:focus-visible{transform:rotate(calc((var(--i) - 3)*var(--step))) translateY(-14px);z-index:8}
.deck--fan .chip[aria-pressed=true]{transform:rotate(calc((var(--i) - 3)*var(--step))) translateY(-40px);z-index:9;
  box-shadow:0 0 0 3px var(--btn),0 14px 22px -10px rgba(0,0,0,.55)}
.deck-rivet{position:absolute;left:50%;bottom:36px;width:12px;height:12px;margin-left:-6px;border-radius:50%;z-index:12;
  background:var(--bg);box-shadow:inset 0 1px 2px rgba(0,0,0,.4),0 0 0 1px rgba(0,0,0,.12)}
.deck-now{text-align:center;margin:4px 0 14px;font-size:.95rem;color:var(--muted);font-variant-numeric:tabular-nums;min-height:2rem}
.deck-now b{font-family:var(--font-display);font-weight:400;font-size:1.55rem;line-height:1.15;color:var(--ink);margin-right:.35em}
.deck-now.is-peek b{color:var(--link)}
.deck-mix,.deck-knobs{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 14px;font-size:.92rem}
.deck-mix{font-weight:700;margin-bottom:12px;display:grid;grid-template-columns:auto auto;justify-content:center;gap:8px 18px}
.deck-mix>span{grid-column:1/-1;text-align:center}
.deck--strip .deck-mix{justify-content:start}
.deck--strip .deck-mix>span{text-align:left}
.deck-mix label{display:inline-flex;align-items:center;gap:8px;font-weight:500}
input[type=color]{width:42px;height:42px;border:0;border-radius:3px;padding:3px;background:var(--card);cursor:pointer;box-shadow:0 0 0 1px var(--line),0 4px 8px -5px rgba(0,0,0,.5)}
input[type=color]::-webkit-color-swatch-wrapper{padding:0}
input[type=color]::-webkit-color-swatch{border:0;border-radius:2px}
input[type=color]::-moz-color-swatch{border:0;border-radius:2px}
.ch-seg{display:inline-flex;align-items:stretch;border:1px solid var(--line);border-radius:4px;overflow:hidden;background:var(--surface)}
.ch-seg-t{display:flex;align-items:center;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);padding:0 10px;background:var(--wash)}
.ch-seg button{border:0;border-left:1px solid var(--line);background:none;padding:8px 11px;font-size:.86rem;font-weight:600;color:var(--ink)}
.ch-seg button:hover{background:var(--wash)}
.ch-seg button[aria-pressed=true]{background:var(--btn);color:var(--on-btn)}
.ch-reset{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:var(--link);font-weight:700;font-size:.9rem;padding:8px 4px}
.ch-reset:hover{text-decoration:underline;text-underline-offset:.2em}
.ch-reset svg,.deck-x svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

/* the floating deck on every page */
.deck-fab{position:fixed;right:16px;bottom:16px;z-index:41;display:inline-flex;align-items:center;gap:10px;border:1px solid var(--line);
  background:var(--surface);color:var(--ink);border-radius:999px;padding:8px 18px 8px 12px;font-weight:700;font-size:.95rem;
  box-shadow:0 12px 26px -12px rgba(0,0,0,.55);transition:transform .15s var(--ease)}
.deck-fab.is-tucked{opacity:0;pointer-events:none;transform:translateY(12px)}
.deck-fab{transition:transform .2s var(--ease),opacity .2s}
.deck-fab:hover{transform:translateY(-2px)}
.deck-fab:active{transform:translateY(1px)}
.fab-fan{position:relative;width:28px;height:28px}
.fab-fan i{position:absolute;left:10px;bottom:0;width:9px;height:26px;border-radius:2px;transform-origin:50% 88%;box-shadow:0 0 0 1.5px var(--card),0 1px 3px rgba(0,0,0,.35)}
.fab-fan i:nth-child(1){background:var(--wash);transform:rotate(-26deg)}
.fab-fan i:nth-child(2){background:var(--btn)}
.fab-fan i:nth-child(3){background:var(--deep);transform:rotate(26deg)}
.deck-fab[aria-expanded=true] .fab-fan i:nth-child(1){transform:rotate(-38deg)}
.deck-fab[aria-expanded=true] .fab-fan i:nth-child(3){transform:rotate(38deg)}
.cp-panel{position:fixed;right:16px;bottom:80px;z-index:40;width:min(640px,calc(100vw - 32px));max-height:calc(100vh - 110px);overflow:auto;
  background:var(--surface);color:var(--ink);border-radius:8px;padding:16px 18px 18px;box-shadow:0 0 0 1px var(--line),0 30px 60px -22px rgba(0,0,0,.6)}
.deck-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.deck-title{font-family:var(--font-display);font-size:1.2rem;margin:0}
.deck-x{border:0;background:none;color:var(--ink);padding:8px;border-radius:4px}
.deck-x:hover{background:var(--wash)}
.deck--strip .deck-chips{display:grid;grid-template-columns:repeat(7,minmax(66px,1fr));gap:8px;overflow-x:auto;padding:10px 4px 12px;scrollbar-width:thin}
.deck--strip .chip{height:156px;transition:transform .2s var(--ease)}
.deck--strip .chip:hover{transform:translateY(-4px)}
.deck--strip .chip[aria-pressed=true]{transform:translateY(-6px);box-shadow:0 0 0 3px var(--btn),0 10px 18px -10px rgba(0,0,0,.55)}
.deck--strip .deck-now{text-align:left;margin:4px 0 12px}
.deck--strip .deck-mix,.deck--strip .deck-knobs{justify-content:flex-start}

/* rooms painted in the chip */
.services{background:var(--wash);border:0}
.svc-grid{gap:calc(var(--s)*18px)}
.svc{background:var(--card);color:var(--card-ink);border:0;border-radius:4px;padding:7px 7px calc(var(--s)*16px);box-shadow:var(--paper)}
a.svc:hover{transform:translateY(-4px) rotate(-.5deg);color:var(--card-ink)}
.svc svg{display:block;width:100%;height:104px;padding:30px 0;box-sizing:border-box;border-radius:2px;background:var(--btn);stroke:var(--on-btn);stroke-width:1.6}
.svc:nth-child(1) svg{background:var(--deep);stroke:var(--on-deep)}
.svc:nth-child(3) svg{background:var(--wash);stroke:var(--link);box-shadow:inset 0 0 0 1px var(--line)}
.svc h3{color:var(--card-ink);padding:0 8px;margin-top:.8rem}
.svc p{color:var(--card-soft);padding:0 8px}
.card{border:0;border-radius:4px;box-shadow:var(--paper);padding:0 0 calc(var(--s)*16px);overflow:hidden;background:var(--card);color:var(--card-ink)}
.card:hover{transform:translateY(-3px);color:var(--card-ink)}
.card:not([data-level]){padding-top:calc(var(--s)*14px)}
.card .level{display:block;border:0;border-radius:0;padding:24px 16px 8px;font-size:.8rem;background:var(--wash);color:var(--ink)}
.card[data-level=moderate] .level{background:var(--btn);color:var(--on-btn)}
.card[data-level=advanced] .level{background:var(--deep);color:var(--on-deep)}
.card h3,.card p{padding:0 16px}
.card h3{color:var(--card-ink)}
.card p{color:var(--card-soft)}
.trust,.parts-box{border-radius:6px;box-shadow:var(--paper)}
.area{background:var(--bg)}
.chips li{border-radius:3px;box-shadow:0 1px 1px rgba(0,0,0,.06)}
.side-card{border-radius:6px;box-shadow:var(--paper);border:0}
.price-table{border-radius:6px}
.prose ol.steps>li::before{border-radius:3px;background:var(--btn);color:var(--on-btn)}
.callout{border-radius:5px}

@media (max-width:860px){
  .ch-hero-in{grid-template-columns:1fr}
  .ch-logo{max-width:280px}
  .deck--fan .deck-chips{--cw:clamp(62px,15vw,78px)}
  .deck--fan .chip-tag small{display:none}
  footer.site{padding-bottom:88px}
}
`;

module.exports = {
  key: 'chips',
  name: 'Paint Chip Deck',
  blurb: 'Every palette is a paint chip. Pull one from the deck and each room repaints.',
  fonts: [
    { family: 'Archivo Black', file: 'archivo-black-400.woff2', preload: true },
    { family: 'Work Sans', file: 'work-sans-var.woff2', weight: '300 800', preload: true },
  ],
  css,
  brand: '<span class="ch-mark" aria-hidden="true"></span><span>Copper Peak<small>Heating &amp; Cooling</small></span>',
  controls,
  hero,
  panelPlace: 'float',
  tail: `<button type="button" class="deck-fab" data-cp-toggle aria-controls="cp-panel" aria-expanded="false"><span class="fab-fan" aria-hidden="true"><i></i><i></i><i></i></span>Colors</button>
<script>(function(){var d=document.querySelector('.ch-deck'),f=document.querySelector('.deck-fab');if(!d||!f||!window.IntersectionObserver)return;
document.querySelectorAll('.deck').forEach(function(d){var now=d.querySelector('.deck-now');if(!now||!window.CP)return;
function put(code,name,peek){now.querySelector('[data-cp-code]').textContent=code;now.querySelector('[data-cp-name]').textContent=name;now.classList.toggle('is-peek',peek)}
function show(e){var c=e.target.closest&&e.target.closest('.chip');if(c)put(c.querySelector('small').textContent,c.querySelector('b').textContent,c.getAttribute('aria-pressed')!=='true')}
function back(){var P=CP.palette();put(P.code,P.name,false)}
d.addEventListener('pointerover',show);d.addEventListener('focusin',show);d.addEventListener('pointerleave',back);d.addEventListener('focusout',back);d.addEventListener('click',function(){setTimeout(back,0)})});
new IntersectionObserver(function(e){var on=e[0].isIntersecting;f.classList.toggle('is-tucked',on);if(on)f.setAttribute('tabindex','-1');else f.removeAttribute('tabindex')}).observe(d)})();</script>`,
};
