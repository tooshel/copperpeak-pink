// Palette engine shared by the build (contrast checks) and the browser (the customizer).
// cpDerive() is serialized into every page with Function.toString(), so it must stay
// self-contained ES5: no closures over module scope, no arrow functions, no imports.

const PRESETS = {
  blush:    { name: 'Blush',          code: 'CP-101', bg: '#fffafc', accent: '#e0457b', deep: '#9e2a52' },
  rose:     { name: 'Rose',           code: 'CP-102', bg: '#fff6f4', accent: '#cf3a5e', deep: '#6e1834' },
  lilac:    { name: 'Lilac',          code: 'CP-215', bg: '#fbf8ff', accent: '#9a6ad6', deep: '#4b2a78' },
  midnight: { name: 'Midnight Goth',  code: 'CP-900', bg: '#0e0a12', accent: '#6c34a8', deep: '#200d33' },
  sage:     { name: 'Sage',           code: 'CP-340', bg: '#f8faf5', accent: '#5d8a66', deep: '#2c4a35' },
  copper:   { name: 'Classic Copper', code: 'CP-480', bg: '#fdf7ef', accent: '#c2561a', deep: '#16365c' },
};
const ORDER = ['blush', 'rose', 'lilac', 'midnight', 'sage', 'copper'];

function cpDerive(p) {
  function hex(h) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return [0, 2, 4].map(function (i) { var v = parseInt(h.substr(i, 2), 16); return isNaN(v) ? 0 : v; });
  }
  function out(c) {
    return '#' + c.map(function (v) { v = Math.round(Math.max(0, Math.min(255, v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('');
  }
  function mix(a, b, t) { return a.map(function (v, i) { return v + (b[i] - v) * t; }); }
  function lum(c) {
    var s = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
  }
  function cr(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  // Slide fg toward `to` until it reaches `min` contrast against every ground.
  function ensure(fg, grounds, min, to) {
    for (var i = 0; i <= 60; i++) {
      var c = mix(fg, to, i / 60);
      if (grounds.every(function (g) { return cr(c, g) >= min; })) return c;
    }
    return to;
  }
  var W = [255, 255, 255], K = [0, 0, 0];
  var bg = hex(p.bg), acc = hex(p.accent);
  var dark = lum(bg) < 0.2;
  var far = dark ? W : K;
  // A mid-tone background can't carry readable text in either direction; nudge it light or dark.
  bg = ensure(bg, [far], 10, dark ? K : W);

  var surface = dark ? mix(bg, W, 0.05) : mix(bg, W, 0.7);
  var wash = mix(bg, acc, dark ? 0.17 : 0.13);
  var line = mix(bg, acc, dark ? 0.36 : 0.3);
  var tipBg = mix(bg, acc, dark ? 0.12 : 0.08);
  var safetyBg = mix(bg, [222, 52, 40], dark ? 0.2 : 0.1);

  var onBtn = lum(acc) > 0.42 ? ensure(mix(K, acc, 0.25), [acc], 4.6, K) : W;
  var btn = ensure(acc, [onBtn], 4.6, onBtn === W ? K : W);
  var btnEdge = cr(btn, bg) >= 3 ? btn : ensure(btn, [bg], 3, far);

  var deep = p.deep ? hex(p.deep) : (dark ? mix(bg, acc, 0.4) : mix(acc, K, 0.45));
  var onDeep = lum(deep) > 0.35 ? K : W;
  deep = ensure(deep, [onDeep], 7, onDeep === W ? K : W);
  var proBg = mix(bg, deep, dark ? 0.55 : 0.09);

  var grounds = [bg, surface, wash, tipBg, proBg, safetyBg];
  var ink = ensure(dark ? mix(W, acc, 0.08) : mix(K, acc, 0.22), grounds, 7, far);
  var muted = ensure(mix(ink, bg, 0.4), grounds, 4.6, ink);
  var link = ensure(acc, grounds, 4.6, far);
  var deepSoft = ensure(mix(onDeep, deep, 0.3), [deep], 4.6, onDeep);
  var deepHot = ensure(mix(acc, onDeep, 0.3), [deep], 4.6, onDeep);
  var safetyLabel = ensure(dark ? [255, 130, 118] : [176, 34, 24], [safetyBg], 4.6, far);

  // Logo duotone: dark ink lines, accent mids, pale tint, then the surface it sits on.
  var stops = dark ? [ink, acc, mix(acc, surface, 0.55), surface] : [deep, acc, mix(acc, surface, 0.62), surface];
  var duo = [0, 1, 2].map(function (ch) { return stops.map(function (c) { return (c[ch] / 255).toFixed(3); }).join(' '); });

  var vars = {
    bg: bg, surface: surface, wash: wash, line: line, ink: ink, muted: muted, link: link, accent: acc,
    btn: btn, 'on-btn': onBtn, 'btn-edge': btnEdge, deep: deep, 'on-deep': onDeep, 'deep-soft': deepSoft,
    'deep-hot': deepHot, 'tip-bg': tipBg, 'pro-bg': proBg, 'safety-bg': safetyBg, 'safety-label': safetyLabel,
  };
  var hexVars = {};
  for (var k in vars) hexVars[k] = out(vars[k]);
  var icon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='" + hexVars.btn +
    "'/><path d='M4 24 13 9l5 8 3-4 7 11Z' fill='" + hexVars['on-btn'] + "'/><circle cx='24' cy='8' r='3' fill='" + hexVars.wash + "'/></svg>";
  var pairs = [
    ['ink', 'bg'], ['ink', 'surface'], ['ink', 'wash'], ['ink', 'tip-bg'], ['ink', 'pro-bg'], ['ink', 'safety-bg'],
    ['muted', 'bg'], ['muted', 'surface'], ['muted', 'wash'], ['link', 'bg'], ['link', 'surface'], ['link', 'wash'],
    ['link', 'tip-bg'], ['link', 'pro-bg'], ['link', 'safety-bg'], ['on-btn', 'btn'], ['on-deep', 'deep'],
    ['deep-soft', 'deep'], ['deep-hot', 'deep'], ['safety-label', 'safety-bg'],
  ].map(function (pr) { return [pr[0], pr[1], cr(vars[pr[0]], vars[pr[1]])]; });
  return { dark: dark, vars: hexVars, duo: duo, icon: 'data:image/svg+xml,' + encodeURIComponent(icon), pairs: pairs };
}

module.exports = { PRESETS, ORDER, cpDerive };
