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
      "var dark=localStorage.getItem(" + storageKeyJson + ")==='dark';" +
      "var w=document.createElement('div');w.id=ID;" +
      "var s=document.createElement('style');w.appendChild(s);" +
      "function paint(){" +
      "var bg=dark?'#1d2027':'#fff',fg=dark?'#e6e8ec':'#1c1f26',mut=dark?'#9aa1ad':'#6b7280',bd=dark?'#2c313b':'#e2e5ea',hov=dark?'#23272f':'#f0fdfc',fld=dark?'#14161a':'#f4f5f7';" +
      "s.textContent='#'+ID+'{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.5);font-family:-apple-system,Segoe UI,Roboto,sans-serif;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;overflow:auto}#'+ID+' *{box-sizing:border-box}#'+ID+' .p{background:'+bg+';color:'+fg+';width:100%;max-width:680px;border:1px solid '+bd+';border-radius:14px;box-shadow:0 12px 48px rgba(0,0,0,.4);overflow:hidden}#'+ID+' .h{display:flex;gap:10px;align-items:center;padding:14px 16px;border-bottom:1px solid '+bd+'}#'+ID+' .t{font-weight:700;font-size:16px;white-space:nowrap}#'+ID+' input{flex:1;padding:8px 12px;border:1px solid '+bd+';border-radius:8px;background:'+fld+';color:'+fg+';font-size:14px;outline:none}#'+ID+' button{cursor:pointer;border:1px solid '+bd+';background:transparent;color:'+fg+';border-radius:8px;padding:8px 10px;font-size:14px}#'+ID+' .b{max-height:70vh;overflow:auto;padding:8px 16px 16px}#'+ID+' h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:'+mut+';margin:16px 0 6px}#'+ID+' a{display:block;text-decoration:none;color:'+fg+';padding:8px 10px;border-radius:8px;font-size:14px}#'+ID+' a:hover{background:'+hov+'}#'+ID+' a small{display:block;color:'+mut+';font-size:11px;word-break:break-all}';" +
      "var tb=document.getElementById(ID+'t');if(tb){tb.textContent=dark?'☀️':'🌙';}" +
      "}" +
      "paint();" +
      "var LOGO=" + JSON.stringify(LOGO) + ";" +
      "var body='<div class=\"p\"><div class=\"h\"><img src=\"'+LOGO+'\" width=\"24\" height=\"24\" alt=\"\" style=\"display:block;flex:none\"><span class=\"t\">'+" + titleJson + "+'</span><input id=\"'+ID+'q\" placeholder=\"Filter…\" autocomplete=\"off\"><button id=\"'+ID+'t\" title=\"Toggle theme\">'+(dark?'☀️':'🌙')+'</button><button id=\"'+ID+'x\" title=\"Close\">✕</button></div><div class=\"b\">';" +
      "D.forEach(function(c){body+='<div class=\"cat\"><h4>'+c[0]+'</h4>';c[1].forEach(function(l){body+='<a href=\"'+l[1]+'\"" +
      anchorAttrs +
      " data-s=\"'+(l[0]+' '+c[0]+' '+l[1]).toLowerCase().replace(/\"/g,'')+'\">'+l[0]+'<small>'+l[1]+'</small></a>';});body+='</div>';});" +
      "body+='</div></div>';" +
      "var d=document.createElement('div');d.innerHTML=body;while(d.firstChild){w.appendChild(d.firstChild);}" +
      "w.addEventListener('click',function(){w.remove();});" +
      "w.querySelector('.p').addEventListener('click',function(e){e.stopPropagation();});" +
      "document.body.appendChild(w);" +
      "var q=document.getElementById(ID+'q');q.focus();" +
      "q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();w.querySelectorAll('.cat').forEach(function(cat){var any=false;cat.querySelectorAll('a').forEach(function(a){var m=!v||a.getAttribute('data-s').indexOf(v)>-1;a.style.display=m?'block':'none';if(m){any=true;}});cat.style.display=any?'block':'none';});});" +
      "document.getElementById(ID+'x').addEventListener('click',function(){w.remove();});" +
      "document.getElementById(ID+'t').addEventListener('click',function(){dark=!dark;localStorage.setItem(" + storageKeyJson + ",dark?'dark':'light');paint();});" +
      "document.addEventListener('keydown',function h(e){if(e.key==='Escape'){w.remove();document.removeEventListener('keydown',h);}});" +
      '})();';

    return 'javascript:' + js;
  }

  return buildBookmarklet;
});
