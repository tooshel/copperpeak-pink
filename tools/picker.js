// The root of pink.copperpeakair.com: choose one of the three looks. Each tile's art is drawn
// in CSS from the live palette tokens, so it follows whatever colors the visitor already picked.
const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const FONTS = [
  { family: 'Figtree', file: 'figtree-var.woff2', weight: '300 900' },
  { family: 'Shrikhand', file: 'shrikhand-400.woff2' },
  { family: 'Archivo Black', file: 'archivo-black-400.woff2' },
  { family: 'Barlow Semi Condensed', file: 'barlow-sc-800.woff2', weight: 800 },
  { family: 'DSEG7', file: 'DSEG7Classic-Bold.woff2', weight: 700 },
];

const CSS = `
:root{--font-body:'Figtree',system-ui,sans-serif;--r:20px}
.pk-head{padding:clamp(36px,7vw,84px) clamp(16px,4vw,40px) clamp(20px,4vw,40px)}
.pk-brand{display:flex;align-items:center;gap:12px;margin:0 0 clamp(28px,5vw,52px);font-weight:700;font-size:1.05rem;color:var(--ink)}
.pk-brand img{width:40px;height:40px;border-radius:10px}
.pk-head h1{font-size:clamp(2.2rem,5.4vw,4rem);line-height:1.02;letter-spacing:-.025em;margin:0 0 1rem;max-width:16ch}
.pk-head .lead{font-size:1.15rem;max-width:58ch;margin:0;color:var(--ink)}
.pk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px);padding:0 clamp(16px,4vw,40px) clamp(40px,7vw,80px);max-width:1160px;margin:0 auto}
.pk-tile{display:flex;flex-direction:column;text-decoration:none;color:var(--ink);background:var(--surface);border-radius:var(--r);overflow:hidden;
  box-shadow:0 0 0 1px var(--line),0 18px 36px -24px rgba(0,0,0,.5);transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.pk-tile:hover{transform:translateY(-4px);color:var(--ink);box-shadow:0 0 0 2px var(--link),0 26px 44px -24px rgba(0,0,0,.55)}
.pk-tile:active{transform:translateY(0)}
.pk-art{position:relative;display:block;height:230px;overflow:hidden}
.pk-text{display:flex;flex-direction:column;gap:6px;padding:18px 20px 20px;flex:1}
.pk-name{font-size:1.5rem;line-height:1.1;color:var(--ink)}
.pk-text span{color:var(--muted)}
.pk-text .pk-go{margin-top:auto;padding-top:10px;display:inline-flex;align-items:center;gap:8px;color:var(--link);font-weight:700}
.pk-go svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .2s var(--ease)}
.pk-tile:hover .pk-go svg{transform:translateX(4px)}

/* kitchen art: enamel field, lacquer door, finish shelf */
.pk-kitchen .pk-name{font-family:'Shrikhand',serif;font-weight:400;color:var(--link)}
.pk-kitchen .pk-art{background:radial-gradient(120% 75% at 22% -12%,rgba(255,255,255,.26),transparent 58%),var(--btn)}
.pk-door{position:absolute;left:28px;top:26px;width:42%;height:118px;background:var(--surface);border-radius:12px;box-shadow:0 18px 28px -18px rgba(0,0,0,.6)}
.pk-door img{position:absolute;inset:16px;width:calc(100% - 32px);height:calc(100% - 32px);object-fit:contain}
.pk-door::after{content:"";position:absolute;inset:9px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--line),inset 0 0 0 5px var(--surface),inset 0 0 0 6px var(--line)}
.pk-lines{position:absolute;right:28px;top:34px;width:38%}
.pk-lines i{display:block;height:12px;border-radius:6px;background:var(--on-btn);opacity:.9;margin-bottom:9px}
.pk-lines i:nth-child(2){width:72%;opacity:.55;height:8px}
.pk-lines i:nth-child(3){width:86%;opacity:.55;height:8px}
.pk-shelf{position:absolute;left:18px;right:18px;bottom:-12px;height:74px;background:var(--surface);border-radius:14px 14px 0 0;display:flex;gap:10px;align-items:center;padding:0 16px 10px}
.pk-shelf::before{content:"";position:absolute;inset:0 0 auto;height:4px;border-radius:14px 14px 0 0;background:linear-gradient(180deg,#fdfdfe,#a4a9b3 55%,#eceef2)}
.pk-shelf i{width:28px;height:28px;border-radius:50%;flex:none;background:radial-gradient(circle at 34% 27%,rgba(255,255,255,.75),transparent 33%),var(--c);
  box-shadow:inset 0 -3px 4px rgba(0,0,0,.22),0 0 0 3px var(--surface),0 0 0 4px var(--line)}

/* chips art: the fan */
.pk-chips .pk-name{font-family:'Archivo Black',sans-serif;font-weight:400}
.pk-chips .pk-art{background:var(--wash)}
.pk-fan i{position:absolute;left:50%;bottom:-40px;width:46px;height:200px;margin-left:-23px;border-radius:4px;background:#fdfcfa;padding:4px;
  transform-origin:50% 92%;transform:rotate(calc((var(--i) - 2.5)*14deg));box-shadow:0 8px 16px -8px rgba(0,0,0,.45)}
.pk-fan i::before{content:"";display:block;height:62%;border-radius:2px;background:linear-gradient(var(--c1) 0 33%,var(--c2) 33% 66%,var(--c3) 66%)}

/* thermostat art: the wall unit */
.pk-thermostat .pk-name{font-family:'Barlow Semi Condensed',sans-serif;font-weight:800}
.pk-thermostat .pk-art{background:radial-gradient(70% 90% at 70% 40%,var(--wash),transparent 70%),var(--bg);display:grid;place-items:center}
.pk-unit{width:82%;background:var(--surface);border-radius:24px;padding:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 0 0 1px var(--line),0 18px 30px -18px rgba(0,0,0,.5)}
.pk-lcd{position:relative;background:var(--wash);border-radius:10px;padding:14px 12px;box-shadow:inset 0 2px 7px rgba(0,0,0,.22);font-family:'DSEG7';font-weight:700;font-size:1.3rem;color:var(--ink);white-space:nowrap;overflow:hidden}
.pk-dig{position:relative;display:inline-block}
.pk-dig .g{position:absolute;inset:0;opacity:.08}
.pk-keys{display:flex;justify-content:space-between;margin-top:12px}
.pk-keys i{height:30px;border-radius:999px;background:var(--surface);box-shadow:0 0 0 1px var(--line),0 4px 7px -4px rgba(0,0,0,.4);width:30px}
.pk-keys i:first-child{width:70px;background:var(--btn)}
.pk-foot{padding:0 clamp(16px,4vw,40px) 40px;max-width:1160px;margin:0 auto;color:var(--muted);font-size:.95rem}
@media (max-width:900px){.pk-grid{grid-template-columns:1fr;max-width:560px}}
`;

function shell({ title, body, ENGINE, BASE_CSS, DEFAULT, DUO_SVG = '', fontFaces, esc }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<meta name="description" content="Three design previews of the Copper Peak Heating &amp; Cooling site, each with a color and spacing customizer.">
<link rel="canonical" href="https://www.copperpeakair.com/">
<meta name="theme-color" content="${DEFAULT.vars.bg}">
<link rel="icon" id="cp-icon" href="/favicon.svg" type="image/svg+xml">
<style>${fontFaces(FONTS)}${BASE_CSS}${CSS}</style>
<script>${ENGINE}</script>
</head>
<body>
${DUO_SVG}
${body}
</body>
</html>
`;
}

function page(ctx) {
  const { THEMES, PRESETS, ORDER, cpDerive } = ctx;
  const t = Object.fromEntries(THEMES.map((x) => [x.key, x]));
  const dots = ORDER.map((k) => `<i style="--c:${cpDerive(PRESETS[k]).vars.btn}"></i>`).join('');
  const fan = ORDER.map((k, i) => { const v = cpDerive(PRESETS[k]).vars; return `<i style="--i:${i};--c1:${v.wash};--c2:${v.btn};--c3:${v.deep}"></i>`; }).join('');
  const tile = (key, art, go) => `<a class="pk-tile pk-${key}" href="/${key}/">
    <span class="pk-art" aria-hidden="true">${art}</span>
    <span class="pk-text"><b class="pk-name">${t[key].name}</b><span>${t[key].blurb}</span><span class="pk-go">${go} ${ARROW}</span></span>
  </a>`;
  return shell({ ...ctx, title: 'Copper Peak: three looks', body: `<header class="pk-head"><div class="measure">
  <p class="pk-brand"><img src="/favicon.svg" id="pk-mark" alt="" width="40" height="40">Copper Peak Heating &amp; Cooling</p>
  <h1>Three looks. Same Copper Peak.</h1>
  <p class="lead">Same company, same pages, same prices. Each design lets you choose your own colors, spacing, and text size,
    and whatever you pick follows you from one look to the next.</p>
</div></header>
<main class="pk-grid">
  ${tile('kitchen', `<span class="pk-door"><img class="duo" src="/images/copper-peak-logo-2026.jpg" alt="" width="1200" height="722"></span><span class="pk-lines"><i></i><i></i><i></i></span><span class="pk-shelf">${dots}</span>`, 'Open the kitchen')}
  ${tile('chips', `<span class="pk-fan">${fan}</span>`, 'Open the chip deck')}
  ${tile('thermostat', `<span class="pk-unit"><span class="pk-lcd"><span class="pk-dig"><span class="g">888!888-8888</span>480!673-8311</span></span><span class="pk-keys"><i></i><i></i><i></i><i></i></span></span>`, 'Open the thermostat')}
</main>
<p class="pk-foot">A design preview, hidden from search engines. The real site is <a href="https://www.copperpeakair.com/">www.copperpeakair.com</a>, or call <a href="tel:+14806738311">(480) 673-8311</a>.</p>
<script>document.addEventListener('DOMContentLoaded',function(){var m=document.getElementById('pk-mark'),i=document.getElementById('cp-icon');
function s(){if(m&&i)m.src=i.href}s();document.addEventListener('cp:change',s)});</script>` });
}

function notFound(ctx) {
  const { THEMES } = ctx;
  return shell({ ...ctx, title: 'Page not found | Copper Peak', body: `<header class="pk-head"><div class="measure">
  <p class="pk-brand"><img src="/favicon.svg" alt="" width="40" height="40">Copper Peak Heating &amp; Cooling</p>
  <h1>That page isn't here.</h1>
  <p class="lead">Try one of the three looks: ${THEMES.map((x) => `<a href="/${x.key}/">${x.name}</a>`).join(', ')}.
    Or just call <a href="tel:+14806738311">(480) 673-8311</a>.</p>
</div></header>` });
}

module.exports = { page, notFound };
