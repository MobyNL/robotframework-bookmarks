/*
 * buildBookmarklet(categories, opts) -> 'javascript:...' string
 *
 * Generates the self-contained overlay bookmarklet from a plain
 * categories array (see data/links.js for the shape). Used by both
 * scripts/build.js (Node) and builder/index.html (browser, via
 * <script src>) so there is exactly one implementation of the
 * generated widget's behavior.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.buildBookmarklet = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  var LOGO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHJlY3QgeD0nNCcgeT0nNycgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyByeD0nMycgZmlsbD0nIzAwYzBiNScvPjxyZWN0IHg9JzExJyB5PScyLjUnIHdpZHRoPScyJyBoZWlnaHQ9JzQuNScgcng9JzEnIGZpbGw9JyMwMGMwYjUnLz48Y2lyY2xlIGN4PScxMicgY3k9JzIuMicgcj0nMS43JyBmaWxsPScjMDBjMGI1Jy8+PGNpcmNsZSBjeD0nOScgY3k9JzEzJyByPScxLjknIGZpbGw9JyNmZmZmZmYnLz48Y2lyY2xlIGN4PScxNScgY3k9JzEzJyByPScxLjknIGZpbGw9JyNmZmZmZmYnLz48cmVjdCB4PSc5JyB5PScxNi4yJyB3aWR0aD0nNicgaGVpZ2h0PScxLjYnIHJ4PScuOCcgZmlsbD0nI2ZmZmZmZicvPjwvc3ZnPg==';

  function buildBookmarklet(categories, opts) {
    opts = opts || {};
    var title = opts.title || 'RF Links';
    var id = opts.id || '__rfbm';
    var storageKey = opts.storageKey || 'rf-bm-theme';
    var newTab = opts.newTab !== false;

    var idJson = JSON.stringify(id);
    var dataJson = JSON.stringify(categories);
    var titleJson = JSON.stringify(title);
    var storageKeyJson = JSON.stringify(storageKey);
    var anchorAttrs = newTab ? ' target="_blank" rel="noopener noreferrer"' : '';

    var js =
      '(function(){' +
      'var ID=' + idJson + ',ex=document.getElementById(ID);if(ex){ex.remove();return;}' +
      'var D=' + dataJson + ';' +
      'var T=' + titleJson + ';' +
      'var newTab=' + (newTab ? 'true' : 'false') + ';' +
      "var dark=localStorage.getItem(" + storageKeyJson + ")!=='light';" +
      "function pad(n){n=String(n);return n.length<2?'0'+n:n;}" +
      "var THEMES={dark:{bg:'#101317',bar:'#0c0f13',fg:'#e8eaee',mut:'#767f8d',faint:'#4b5361',bd:'#232830',rule:'#1b2027',sel:'rgba(0,192,181,.10)',urlsel:'#8fd6d0',scrim:'rgba(6,8,10,.72)',shadow:'0 24px 64px rgba(0,0,0,.6)'},light:{bg:'#ffffff',bar:'#fafaf8',fg:'#14171c',mut:'#6f7681',faint:'#a3a9b3',bd:'#c9cbc4',rule:'#e6e7e2',sel:'rgba(0,192,181,.12)',urlsel:'#3f8b85',scrim:'rgba(16,19,23,.58)',shadow:'0 30px 70px rgba(12,14,17,.45)'}};" +
      "var w=document.createElement('div');w.id=ID;" +
      "var s=document.createElement('style');" +
      "s.textContent='#'+ID+'{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-start;justify-content:center;padding:64px 16px;overflow:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--rfbm-scrim);backdrop-filter:blur(2px)}'+" +
      "'#'+ID+' *{box-sizing:border-box}'+" +
      "'#'+ID+' .p{width:100%;max-width:640px;background:var(--rfbm-bg);color:var(--rfbm-fg);border:1px solid var(--rfbm-bd);border-radius:6px;box-shadow:var(--rfbm-shadow);overflow:hidden;animation:rfbmIn .14s ease-out}'+" +
      "'@keyframes rfbmIn{from{opacity:0;transform:translateY(-6px) scale(.99)}to{opacity:1;transform:none}}'+" +
      "'#'+ID+' .h{display:flex;align-items:center;gap:10px;padding:0 12px 0 14px;height:52px;border-bottom:1px solid var(--rfbm-bd);background:var(--rfbm-bar)}'+" +
      "'#'+ID+' .h img{display:block;flex:none;opacity:.95}'+" +
      "'#'+ID+' .chev{color:#00c0b5;font-size:14px;font-weight:700;line-height:1}'+" +
      "'#'+ID+' input{flex:1;min-width:0;border:0;outline:none;background:transparent;color:var(--rfbm-fg);font-family:inherit;font-size:14px;letter-spacing:-.01em;padding:0}'+" +
      "'#'+ID+' .cnt{font-size:10px;letter-spacing:.08em;color:var(--rfbm-mut);white-space:nowrap}'+" +
      "'#'+ID+' button{cursor:pointer;font-family:inherit;font-size:10px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--rfbm-bd);background:transparent;color:var(--rfbm-mut);border-radius:4px;padding:5px 8px;line-height:1}'+" +
      "'#'+ID+' button:hover{border-color:#00c0b5;color:#00c0b5}'+" +
      "'#'+ID+' .b{max-height:400px;overflow:auto;padding:6px 0 8px}'+" +
      "'#'+ID+' .gh{display:flex;align-items:center;gap:10px;padding:12px 14px 6px}'+" +
      "'#'+ID+' .gh .nm{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--rfbm-mut);white-space:nowrap}'+" +
      "'#'+ID+' .gh .rl{flex:1;height:1px;background:var(--rfbm-rule)}'+" +
      "'#'+ID+' .gh .ct{font-size:10px;color:var(--rfbm-faint)}'+" +
      "'#'+ID+' a.row{display:flex;align-items:center;gap:12px;padding:7px 14px 7px 12px;text-decoration:none;cursor:pointer}'+" +
      "'#'+ID+' a.row .bar{width:2px;align-self:stretch;background:transparent;border-radius:1px}'+" +
      "'#'+ID+' a.row .lbl{font-size:13px;font-weight:500;color:var(--rfbm-fg);white-space:nowrap}'+" +
      "'#'+ID+' a.row .url{flex:1;min-width:0;font-size:11px;color:var(--rfbm-faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;direction:rtl}'+" +
      "'#'+ID+' a.row .ent{font-size:11px;color:#00c0b5;opacity:0}'+" +
      "'#'+ID+' a.row:hover,#'+ID+' a.row.sel{background:var(--rfbm-sel)}'+" +
      "'#'+ID+' a.row.sel .bar{background:#00c0b5}'+" +
      "'#'+ID+' a.row.sel .url{color:var(--rfbm-urlsel)}'+" +
      "'#'+ID+' a.row.sel .ent{opacity:1}'+" +
      "'#'+ID+' .empty{padding:34px 14px;text-align:center;font-size:12px;color:var(--rfbm-mut)}'+" +
      "'#'+ID+' .f{display:flex;align-items:center;gap:16px;height:34px;padding:0 14px;border-top:1px solid var(--rfbm-bd);background:var(--rfbm-bar);font-size:10px;letter-spacing:.06em;color:var(--rfbm-mut)}'+" +
      "'#'+ID+' .f .k{display:flex;align-items:center;gap:6px}'+" +
      "'#'+ID+' .f .brand{margin-left:auto;color:var(--rfbm-faint)}'+" +
      "'#'+ID+' kbd{border:1px solid var(--rfbm-bd);border-radius:3px;padding:2px 5px;color:var(--rfbm-fg);font-size:10px;line-height:1;font-style:normal}';" +
      "w.appendChild(s);" +
      "function paint(){var t=THEMES[dark?'dark':'light'];Object.keys(t).forEach(function(k){w.style.setProperty('--rfbm-'+k,t[k]);});var tb=document.getElementById(ID+'t');if(tb){tb.textContent=dark?'LIGHT':'DARK';}}" +
      "var LOGO=" + JSON.stringify(LOGO) + ";" +
      "var body='<div class=\"p\"><div class=\"h\"><img src=\"'+LOGO+'\" width=\"18\" height=\"18\" alt=\"\"><span class=\"chev\">&#8250;</span><input id=\"'+ID+'q\" spellcheck=\"false\" autocomplete=\"off\" placeholder=\"search links, categories, urls\"><span class=\"cnt\" id=\"'+ID+'cnt\"></span><button id=\"'+ID+'t\" title=\"Toggle theme\"></button><button id=\"'+ID+'x\" title=\"Close\">ESC</button></div><div class=\"b\">';" +
      "D.forEach(function(c){body+='<div class=\"g\"><div class=\"gh\"><span class=\"nm\">'+c[0]+'</span><span class=\"rl\"></span><span class=\"ct\">'+pad(c[1].length)+'</span></div>';c[1].forEach(function(l){body+='<a class=\"row\" href=\"'+l[1]+'\"" +
      anchorAttrs +
      " data-s=\"'+(l[0]+' '+c[0]+' '+l[1]).toLowerCase().replace(/\"/g,'')+'\"><span class=\"bar\"></span><span class=\"lbl\">'+l[0]+'</span><span class=\"url\">'+l[1].replace(/^https?:\\/\\//,'')+'</span><span class=\"ent\">&#8629;</span></a>';});body+='</div>';});" +
      "body+='<div class=\"empty\" id=\"'+ID+'empty\" style=\"display:none\">no match for &ldquo;<span id=\"'+ID+'eq\"></span>&rdquo;</div>';" +
      "body+='</div><div class=\"f\"><span class=\"k\"><kbd>&#8593;&#8595;</kbd> move</span><span class=\"k\"><kbd>&#8629;</kbd> open</span><span class=\"k\"><kbd>&#8984;&#8629;</kbd> new tab</span><span class=\"brand\">rf&#8201;links</span></div></div>';" +
      "var d=document.createElement('div');d.innerHTML=body;while(d.firstChild){w.appendChild(d.firstChild);}" +
      "document.body.appendChild(w);" +
      "paint();" +
      "var rows=Array.prototype.slice.call(w.querySelectorAll('a.row'));" +
      "var groups=Array.prototype.slice.call(w.querySelectorAll('.g'));" +
      "var visible=rows.slice();var sel=0;" +
      "function applySel(){visible.forEach(function(r,i){r.classList.toggle('sel',i===sel);});if(visible[sel]&&visible[sel].scrollIntoView){visible[sel].scrollIntoView({block:'nearest'});}}" +
      "function filterRows(){var v=q.value.trim().toLowerCase();visible=[];groups.forEach(function(g){var any=false;var links=Array.prototype.slice.call(g.querySelectorAll('a.row'));links.forEach(function(a){var m=!v||a.getAttribute('data-s').indexOf(v)>-1;a.style.display=m?'flex':'none';if(m){any=true;visible.push(a);}});g.style.display=any?'':'none';var ct=g.querySelector('.ct');if(ct){ct.textContent=pad(links.filter(function(a){return a.style.display!=='none';}).length);}});" +
      "sel=0;applySel();document.getElementById(ID+'cnt').textContent=pad(visible.length)+'/'+pad(rows.length);" +
      "var empty=document.getElementById(ID+'empty');empty.style.display=visible.length?'none':'block';document.getElementById(ID+'eq').textContent=q.value.trim();}" +
      "function close(){w.remove();document.removeEventListener('keydown',onKey);}" +
      "function openRow(a,forceNewTab){if(!a)return;var href=a.getAttribute('href');if(newTab||forceNewTab){window.open(href,'_blank','noopener,noreferrer');}else{location.href=href;}close();}" +
      "function onKey(e){if(e.key==='Escape'){close();}else if(e.key==='ArrowDown'){e.preventDefault();if(visible.length){sel=(sel+1)%visible.length;applySel();}}else if(e.key==='ArrowUp'){e.preventDefault();if(visible.length){sel=(sel-1+visible.length)%visible.length;applySel();}}else if(e.key==='Enter'){if(visible.length){e.preventDefault();openRow(visible[sel],e.metaKey||e.ctrlKey);}}}" +
      "var q=document.getElementById(ID+'q');q.focus();q.addEventListener('input',filterRows);" +
      "rows.forEach(function(r){r.addEventListener('mouseenter',function(){var i=visible.indexOf(r);if(i>-1){sel=i;applySel();}});r.addEventListener('click',function(){close();});});" +
      "w.addEventListener('click',function(){close();});" +
      "w.querySelector('.p').addEventListener('click',function(e){e.stopPropagation();});" +
      "document.getElementById(ID+'x').addEventListener('click',function(){close();});" +
      "document.getElementById(ID+'t').addEventListener('click',function(){dark=!dark;localStorage.setItem(" + storageKeyJson + ",dark?'dark':'light');paint();});" +
      "document.addEventListener('keydown',onKey);" +
      "filterRows();" +
      '})();';

    return 'javascript:' + js;
  }

  return buildBookmarklet;
});
