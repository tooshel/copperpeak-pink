// Structure shared by all three looks. Every color is a palette token from cpDerive(), so any
// palette a visitor picks or mixes stays readable; each theme layers its own materials on top.
const { PRESETS, cpDerive } = require('./palette');

const DEFAULT = cpDerive(PRESETS.blush);
const rootVars = Object.entries(DEFAULT.vars).map(([k, v]) => `--${k}:${v};`).join('');

const BASE_CSS = `
:root{${rootVars}--soft:var(--muted);--s:1;--ts:1;--r:14px;--font-body:system-ui,sans-serif;--font-display:var(--font-body);
  --cx-a:#e0457b;--cx-b:#ffffff;--ease:cubic-bezier(.16,1,.3,1);color-scheme:light}
html[data-space="0"]{--s:.72}
html[data-space="2"]{--s:1.34}
html[data-text="1"]{--ts:1.14}
*{box-sizing:border-box}
html{font-size:calc(100% * var(--ts));scroll-behavior:smooth;-webkit-text-size-adjust:100%;
  scrollbar-color:var(--line) var(--bg);accent-color:var(--btn);caret-color:var(--link)}
[id]{scroll-margin-top:130px}
body{margin:0;font-family:var(--font-body);font-size:1.0625rem;line-height:1.6;color:var(--ink);background:var(--bg)}
img{max-width:100%;height:auto}
a{color:var(--link);text-underline-offset:.2em;text-decoration-thickness:1px}
a:hover{text-decoration-thickness:2px}
:focus-visible{outline:3px solid var(--link);outline-offset:3px}
::selection{background:var(--btn);color:var(--on-btn)}
h1,h2,h3{color:var(--ink);text-wrap:balance}
p,li{text-wrap:pretty}
strong{font-weight:700}
button{font:inherit;color:inherit;cursor:pointer}
.skip{position:absolute;left:-9999px;top:8px;z-index:99;background:var(--surface);color:var(--link);padding:10px 14px;border-radius:8px}
.skip:focus{left:8px}
.sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.cp-defs{position:absolute;width:0;height:0;overflow:hidden}
img.duo{filter:url(#cp-duo)}
.cp-panel[hidden]{display:none!important}
.trust :focus-visible,.parts-box :focus-visible,.cta-band :focus-visible,footer.site :focus-visible{outline-color:var(--on-deep)}

/* header */
.site-head{position:sticky;top:0;z-index:30}
.topbar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px;
  padding:10px clamp(16px,4vw,40px);background:var(--surface);color:var(--ink)}
.topbar .brand{text-decoration:none;color:var(--ink);font-weight:800;line-height:1.1}
.reach{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}
.topbar a.mail{color:var(--muted);text-decoration:none;font-size:.95rem}
.topbar a.mail:hover{color:var(--link);text-decoration:underline}
.topbar a.call{background:var(--btn);color:var(--on-btn);text-decoration:none;font-weight:700;padding:9px 18px;
  border-radius:999px;white-space:nowrap;border:1px solid var(--btn-edge)}
nav.main{display:flex;gap:4px 22px;padding:0 clamp(16px,4vw,40px);background:var(--bg);border-bottom:1px solid var(--line);
  overflow-x:auto;white-space:nowrap;scrollbar-width:none}
nav.main a{color:var(--ink);text-decoration:none;font-weight:600;font-size:.95rem;padding:11px 0;border-bottom:3px solid transparent}
nav.main a:hover{color:var(--link)}
nav.main a[aria-current]{border-bottom-color:var(--btn);color:var(--link)}

/* inner page band */
.page-head{background:var(--wash);border-bottom:1px solid var(--line);
  padding:calc(var(--s)*clamp(28px,5vw,52px)) clamp(16px,4vw,40px) calc(var(--s)*clamp(24px,4vw,40px))}
.page-head h1{font-size:clamp(1.8rem,3.6vw,2.6rem);line-height:1.12;margin:0 0 .5rem;max-width:26ch}
.page-head p.lead{margin:0;font-size:1.1rem;max-width:60ch}
.page-head .meta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 .9rem;padding:0;list-style:none}
.page-head .meta li,.card .level{font-size:.82rem;font-weight:700;color:var(--ink);background:var(--surface);
  border:1px solid var(--line);border-radius:999px;padding:3px 11px}
.crumbs{font-size:.9rem;margin:0 0 .7rem}

.cta-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.btn{display:inline-block;text-decoration:none;font-weight:700;border-radius:var(--r);padding:14px 26px;line-height:1.25;
  transition:transform .12s var(--ease),box-shadow .12s var(--ease),filter .15s}
.btn:active{transform:translateY(2px)}
.btn-primary{background:var(--btn);color:var(--on-btn);font-size:1.08rem;border:1px solid var(--btn-edge)}
.btn-primary:hover{color:var(--on-btn);filter:brightness(1.07)}
.btn-ghost{color:var(--link);border:1.5px solid currentColor;background:transparent}
.btn-ghost:hover{background:var(--wash);color:var(--link)}

section{padding:calc(var(--s)*clamp(36px,6vw,68px)) clamp(16px,4vw,40px)}
.measure{max-width:1080px;margin:0 auto}
h2{font-size:clamp(1.4rem,2.6vw,1.8rem);line-height:1.2;margin:0 0 calc(var(--s)*1.1rem)}
h3{line-height:1.3}

.prose{max-width:70ch}
.prose h2{margin-top:calc(var(--s)*2.6rem)}
.prose h2:first-child{margin-top:0}
.prose h3{font-size:1.14rem;margin:calc(var(--s)*1.9rem) 0 .5rem}
.prose ul,.prose ol{padding-left:1.3rem}
.prose li{margin:calc(var(--s)*.4rem) 0}
.prose ol.steps{counter-reset:step;list-style:none;padding-left:0}
.prose ol.steps>li{counter-increment:step;position:relative;padding-left:2.7rem;margin:calc(var(--s)*1.05rem) 0}
.prose ol.steps>li::before{content:counter(step);position:absolute;left:0;top:-.05rem;width:1.9rem;height:1.9rem;border-radius:50%;
  background:var(--deep);color:var(--on-deep);font-weight:700;font-size:.92rem;display:grid;place-items:center;font-variant-numeric:tabular-nums}
.prose table{border-collapse:collapse;width:100%;font-size:.95rem;margin:1rem 0;font-variant-numeric:tabular-nums}
.prose th,.prose td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
.prose th{background:var(--wash)}
.table-wrap{overflow-x:auto}
.price-table{border-collapse:separate;border-spacing:0;width:100%;min-width:640px;background:var(--surface);font-size:.96rem;
  border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin:1rem 0;font-variant-numeric:tabular-nums}
.price-table th,.price-table td{padding:calc(var(--s)*12px) 14px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.price-table thead th{background:var(--deep);color:var(--on-deep);font-size:.9rem}
.price-table thead th.us{background:var(--btn);color:var(--on-btn)}
.price-table td.us{background:var(--wash);color:var(--link);font-weight:800}
.price-table tbody tr:last-child td{border-bottom:0}
.price-table .sub{font-size:.85rem;color:var(--muted);font-weight:400}
.price-table td:nth-child(n+3){color:var(--muted)}
.price-table td:last-child a{font-weight:600;white-space:nowrap}

.callout{border-radius:var(--r);padding:calc(var(--s)*16px) 18px;margin:calc(var(--s)*1.4rem) 0;color:var(--ink);border:1px solid var(--line)}
.callout>:first-child{margin-top:0}
.callout>:last-child{margin-bottom:0}
.callout .label{display:block;font-weight:800;font-size:.85rem;letter-spacing:.04em;margin-bottom:.35rem;color:var(--link)}
.callout.safety{background:var(--safety-bg);border-color:var(--safety-label)}
.callout.safety .label{color:var(--safety-label)}
.callout.safety .label::before{content:"";display:inline-block;width:1.05em;height:1.05em;margin-right:.4em;vertical-align:-.15em;background:currentColor;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2 1 21h22L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2 1 21h22L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z'/%3E%3C/svg%3E") center/contain no-repeat}
.callout.pro{background:var(--pro-bg)}
.callout.tip{background:var(--tip-bg)}

.two-col{display:grid;grid-template-columns:1fr minmax(240px,320px);gap:clamp(24px,4vw,48px);align-items:start}
.side-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:calc(var(--s)*20px);position:sticky;top:140px}
.side-card h3{margin:0 0 .5rem;font-size:1.08rem}
.side-card p{margin:0 0 .8rem;font-size:.95rem;color:var(--muted)}
.side-card .btn{display:block;width:100%;text-align:center;margin-top:.5rem;padding:12px 16px}

.services{background:var(--surface);border-block:1px solid var(--line)}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:calc(var(--s)*14px)}
.svc{display:block;border:1px solid var(--line);border-radius:var(--r);padding:calc(var(--s)*18px) 16px calc(var(--s)*16px);background:var(--bg);
  text-decoration:none;color:var(--ink);transition:transform .15s var(--ease),box-shadow .15s var(--ease)}
a.svc:hover{transform:translateY(-2px);color:var(--ink)}
.svc svg{width:34px;height:34px;stroke:var(--link);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.svc h3{margin:.55rem 0 .25rem;font-size:1.08rem}
.svc p{margin:0;font-size:.92rem;color:var(--muted)}

.about-wrap{display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(24px,4vw,48px);align-items:start}
.about p{margin:0 0 1rem;max-width:62ch}
.trust,.parts-box{background:var(--deep);color:var(--on-deep);border-radius:calc(var(--r) + 4px);padding:calc(var(--s)*26px)}
.trust p{margin:0 0 .8rem;font-size:1.25rem;line-height:1.45;font-weight:600;color:var(--on-deep)}
.trust p strong{color:var(--deep-hot)}
.trust .who{font-size:.92rem;color:var(--deep-soft);font-weight:400;margin:0}
.parts-box h2,.parts-box strong{color:var(--on-deep)}
.parts-box p,.parts-box li{color:var(--deep-soft)}
.parts-box a,.trust a{color:var(--deep-hot)}
.trust .btn-primary,.parts-box .btn-primary,.cta-band .btn-primary{background:var(--on-deep);color:var(--deep);border-color:transparent}
.parts-box ol{padding-left:1.2rem}
.parts-box .fine{font-size:.88rem;margin-bottom:0}
.parts-box .btn-primary{margin-top:.6rem}

.area{background:var(--wash);border-block:1px solid var(--line)}
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none}
.chips li{background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:7px 15px;font-size:.94rem;color:var(--ink)}

.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:calc(var(--s)*14px)}
.card{display:block;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:calc(var(--s)*18px) 18px calc(var(--s)*16px);
  text-decoration:none;color:var(--ink);transition:transform .15s var(--ease),box-shadow .15s var(--ease)}
.card:hover{transform:translateY(-2px);color:var(--ink)}
.card h3{margin:.6rem 0 .3rem;font-size:1.08rem}
.card p{margin:0;font-size:.93rem;color:var(--muted)}
.level-group h2{margin-top:calc(var(--s)*2.2rem)}

.contact .cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:24px}
.contact h3{font-size:1.04rem;margin:0 0 .5rem}
.contact ul{list-style:none;margin:0;padding:0;color:var(--muted);font-size:.96rem}
.contact li{padding:2px 0}
.bignum{font-size:clamp(1.5rem,3vw,2rem);font-weight:800;margin:0}
.bignum a{color:var(--link);text-decoration:none}

.cta-band{background:var(--deep);color:var(--on-deep);text-align:center}
.cta-band h2{color:var(--on-deep)}
.cta-band p{color:var(--deep-soft);max-width:56ch;margin:0 auto 1.4rem}
.cta-band .btn-ghost{color:var(--on-deep);border-color:var(--on-deep)}
.cta-band .btn-ghost:hover{background:transparent;color:var(--on-deep);text-decoration:underline}
.cta-band .cta-row{justify-content:center}

footer.site{background:var(--deep);color:var(--deep-soft);font-size:.9rem;padding:calc(var(--s)*30px) clamp(16px,4vw,40px)}
footer.site .measure{display:flex;flex-wrap:wrap;gap:10px 28px;justify-content:space-between}
footer.site a{color:var(--on-deep);text-decoration:none;border-bottom:1px solid var(--deep-soft)}
footer.site a:hover{border-bottom-width:2px}
footer.site .links{display:flex;flex-wrap:wrap;gap:6px 16px}
footer.site .preview{flex-basis:100%;border-top:1px solid color-mix(in srgb,var(--deep-soft) 40%,transparent);padding-top:12px;margin-top:4px}

/* the one authored moment: a palette change washes over the page */
.cp-wash,.cp-wash *,.cp-wash *::before,.cp-wash *::after{transition:transform .12s var(--ease),background-color .7s var(--ease),color .7s var(--ease),
  border-color .7s var(--ease),fill .7s var(--ease),stroke .7s var(--ease),box-shadow .7s var(--ease)!important}

.m-call{display:none}
@media (max-width:760px){
  .m-call{display:inline-flex;align-items:center;position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:42;
    background:var(--btn);color:var(--on-btn);border:1px solid var(--btn-edge);border-radius:999px;padding:13px 20px;font-weight:800;
    text-decoration:none;box-shadow:0 12px 26px -10px rgba(0,0,0,.55);transform:translateY(160%);transition:transform .3s var(--ease)}
  .m-call.is-on{transform:none}
  footer.site{padding-bottom:96px}
  .about-wrap,.two-col{grid-template-columns:1fr}
  .side-card{position:static}
  .site-head{position:static}
  nav.main{flex-wrap:wrap;white-space:normal;overflow:visible;gap:0 16px}
  nav.main a{padding:9px 0}
  [id]{scroll-margin-top:16px}
}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{transition:none!important;animation:none!important}
}
`;

const ICON = {
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/></svg>',
};

module.exports = { BASE_CSS, DEFAULT, ICON };
