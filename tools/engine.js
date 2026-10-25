// Customizer runtime, inlined in <head> so the saved look paints before first render.
// Themes wire controls with data attributes only:
//   data-cp-palette="<key>|custom"   choose a palette           data-cp-cycle      next palette
//   data-cp-space="0|1|2"            spacing                    data-cp-step="space:+1|space:-1"
//   data-cp-text="0|1|toggle"        text size                  data-cp-reset      back to defaults
//   input[data-cp-custom="accent|bg"]  mix your own             data-cp-toggle + aria-controls  open a panel
// Readouts: data-cp-name, data-cp-code, data-cp-spacename, data-cp-spaceval, data-cp-textname.
const { PRESETS, ORDER, cpDerive } = require('./palette');

const ENGINE = `(function(){
var PRESETS=${JSON.stringify(PRESETS)},ORDER=${JSON.stringify(ORDER)};
var DEF={p:'blush',space:1,text:0,bg:'#ffffff',accent:'#e0457b'};
var SPACE=['Snug','Standard','Roomy'],TEXT=['Standard','Large'];
var derive=${cpDerive.toString()};
var root=document.documentElement,KEY='cp-look',S={},T;
try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
S=Object.assign({},DEF,S);
function pal(){return S.p==='custom'?{name:'Your mix',code:'CP-000',bg:S.bg,accent:S.accent}:(PRESETS[S.p]||PRESETS.blush)}
function paint(){
  var t=derive(pal());
  for(var k in t.vars)root.style.setProperty('--'+k,t.vars[k]);
  root.style.setProperty('--cx-a',S.accent);root.style.setProperty('--cx-b',S.bg);
  root.style.colorScheme=t.dark?'dark':'light';
  root.setAttribute('data-dark',t.dark?'1':'0');root.setAttribute('data-space',S.space);root.setAttribute('data-text',S.text);
  return t;
}
T=paint();
function each(sel,fn){Array.prototype.forEach.call(document.querySelectorAll(sel),fn)}
function duoSet(d){each('#cp-duo feFuncR,#cp-duo feFuncG,#cp-duo feFuncB',function(f,i){f.setAttribute('tableValues',d[i%3])})}
function duoTween(from,to){
  var a=from.map(function(s){return s.split(' ').map(Number)}),b=to.map(function(s){return s.split(' ').map(Number)}),t0=0;
  function step(now){t0=t0||now;var k=Math.min(1,(now-t0)/700),e=1-Math.pow(1-k,3);
    duoSet(a.map(function(ch,i){return ch.map(function(v,j){return (v+(b[i][j]-v)*e).toFixed(3)}).join(' ')}));
    if(k<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}
function sync(){
  var P=pal();
  duoSet(T.duo);
  var ic=document.getElementById('cp-icon');if(ic)ic.href=T.icon;
  var tc=document.querySelector('meta[name=theme-color]');if(tc)tc.content=T.vars.bg;
  each('[data-cp-palette]',function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cp-palette')===S.p?'true':'false')});
  each('[data-cp-space]',function(b){b.setAttribute('aria-pressed',+b.getAttribute('data-cp-space')===+S.space?'true':'false')});
  each('[data-cp-text]',function(b){var v=b.getAttribute('data-cp-text');b.setAttribute('aria-pressed',(v==='toggle'?+S.text===1:+v===+S.text)?'true':'false')});
  each('input[data-cp-custom]',function(i){i.value=i.getAttribute('data-cp-custom')==='bg'?(S.p==='custom'?S.bg:P.bg):(S.p==='custom'?S.accent:P.accent)});
  each('[data-cp-name]',function(e){e.textContent=P.name});
  each('[data-cp-code]',function(e){e.textContent=P.code});
  each('[data-cp-spacename]',function(e){e.textContent=SPACE[S.space]});
  each('[data-cp-spaceval]',function(e){e.textContent=String(+S.space+1)});
  each('[data-cp-textname]',function(e){e.textContent=TEXT[S.text]});
  each('[data-cp-step]',function(b){var d=+b.getAttribute('data-cp-step').split(':')[1];b.disabled=d<0?+S.space<=0:+S.space>=2});
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function set(patch,why){
  var wash=!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches),old=T.duo;
  if(wash){root.classList.add('cp-wash');clearTimeout(set.t);set.t=setTimeout(function(){root.classList.remove('cp-wash')},800)}
  Object.assign(S,patch);T=paint();sync();save();
  if(wash&&window.requestAnimationFrame)duoTween(old,T.duo);
  try{document.dispatchEvent(new CustomEvent('cp:change',{detail:{why:why||'',state:S,palette:pal()}}))}catch(e){}
}
function closePanels(except){
  each('[data-cp-toggle][aria-expanded=true]',function(b){if(b===except)return;b.setAttribute('aria-expanded','false');var p=document.getElementById(b.getAttribute('aria-controls'));if(p)p.hidden=true});
}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-cp-palette],[data-cp-space],[data-cp-text],[data-cp-step],[data-cp-cycle],[data-cp-reset],[data-cp-toggle]');
  if(!b){if(!(e.target.closest&&e.target.closest('.cp-panel')))closePanels();return}
  var v;
  if((v=b.getAttribute('data-cp-palette'))!==null){var P=pal();var patch={p:v};if(v==='custom'&&S.p!=='custom'&&!S.mixed){patch.bg=P.bg;patch.accent=P.accent}set(patch,'palette')}
  else if((v=b.getAttribute('data-cp-space'))!==null)set({space:+v},'space');
  else if((v=b.getAttribute('data-cp-text'))!==null)set({text:v==='toggle'?1-S.text:+v},'text');
  else if((v=b.getAttribute('data-cp-step'))!==null){var d=+v.split(':')[1];set({space:Math.max(0,Math.min(2,+S.space+d))},'space')}
  else if(b.hasAttribute('data-cp-cycle')){var i=ORDER.indexOf(S.p);set({p:ORDER[(i+1)%ORDER.length]},'cycle')}
  else if(b.hasAttribute('data-cp-reset')){S=Object.assign({},DEF);try{localStorage.removeItem(KEY)}catch(e){}set({},'reset')}
  else if(b.hasAttribute('data-cp-toggle')){
    var panel=document.getElementById(b.getAttribute('aria-controls'));if(!panel)return;
    var open=panel.hidden;closePanels(b);panel.hidden=!open;b.setAttribute('aria-expanded',open?'true':'false');
    if(open){var f=panel.querySelector('[data-cp-palette][aria-pressed=true]')||panel.querySelector('button,input');if(f)f.focus()}
  }
});
document.addEventListener('input',function(e){
  var i=e.target;if(!i.matches||!i.matches('input[data-cp-custom]'))return;
  var P=pal(),patch={p:'custom',mixed:true};
  if(S.p!=='custom'){patch.bg=P.bg;patch.accent=P.accent}
  patch[i.getAttribute('data-cp-custom')]=i.value;set(patch,'custom');
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  var open=document.querySelector('[data-cp-toggle][aria-expanded=true]');
  if(open){closePanels();open.focus()}
});
document.addEventListener('DOMContentLoaded',sync);
window.CP={set:set,state:function(){return S},palette:pal,presets:PRESETS,order:ORDER};
})();`;

module.exports = { ENGINE };
