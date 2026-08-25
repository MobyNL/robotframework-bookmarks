/*
 * buildStaticPage(categories, opts) -> full HTML document string
 *
 * Generates a standalone, self-contained HTML page listing the same
 * categories/links as the bookmarklet (see scripts/lib.js), styled the
 * same way, with the same search + keyboard nav. Meant to be saved to
 * disk and opened locally/offline as a link hub, as an alternative to
 * the bookmarklet for people who don't want a `javascript:` bookmark.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.buildStaticPage = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function favicon(url) {
    try {
      return 'https://www.google.com/s2/favicons?sz=32&domain=' + encodeURIComponent(new URL(url).hostname);
    } catch (e) {
      return '';
    }
  }

  function pad(n) {
    n = String(n);
    return n.length < 2 ? '0' + n : n;
  }

  function buildStaticPage(categories, opts) {
    opts = opts || {};
    var title = opts.title || 'RF Links';
    var storageKey = opts.storageKey || 'rf-bm-theme';
    var newTab = opts.newTab !== false;
    var anchorAttrs = newTab ? ' target="_blank" rel="noopener noreferrer"' : '';

    var total = 0;
    var groups = categories.map(function (c) {
      total += c[1].length;
      var rows = c[1].map(function (l) {
        return (
          '<a class="row" href="' + esc(l[1]) + '"' + anchorAttrs +
          ' data-s="' + esc((l[0] + ' ' + c[0] + ' ' + l[1]).toLowerCase()) + '">' +
          '<span class="bar"></span>' +
          '<img class="fav" src="' + esc(favicon(l[1])) + '" width="14" height="14" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<span class="lbl">' + esc(l[0]) + '</span>' +
          '<span class="url">' + esc(l[1].replace(/^https?:\/\//, '')) + '</span>' +
          '</a>'
        );
      }).join('');
      return (
        '<div class="g"><div class="gh"><span class="nm">' + esc(c[0]) + '</span><span class="rl"></span><span class="ct">' + pad(c[1].length) + '</span></div>' +
        rows +
        '</div>'
      );
    }).join('');

    return (
      '<!doctype html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(title) + '</title>\n' +
      '<style>\n' +
      ':root{--bg:#101317;--bar:#0c0f13;--fg:#e8eaee;--mut:#767f8d;--faint:#4b5361;--bd:#232830;--rule:#1b2027;--sel:rgba(0,192,181,.10);--urlsel:#8fd6d0;--logo:#00c0b5;}\n' +
      '[data-theme="light"],:root:not([data-theme="dark"]).light{--bg:#ffffff;--bar:#fafaf8;--fg:#14171c;--mut:#6f7681;--faint:#a3a9b3;--bd:#c9cbc4;--rule:#e6e7e2;--sel:rgba(0,192,181,.12);--urlsel:#3f8b85;}\n' +
      '*{box-sizing:border-box}\n' +
      'html,body{margin:0;padding:0;background:var(--bg);color:var(--fg)}\n' +
      'body{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;justify-content:center;padding:48px 16px}\n' +
      '.p{width:100%;max-width:900px;background:var(--bg);color:var(--fg);border:1px solid var(--bd);border-radius:6px;box-shadow:0 24px 64px rgba(0,0,0,.25);overflow:hidden}\n' +
      '.h{display:flex;align-items:center;gap:10px;padding:0 12px 0 14px;height:52px;border-bottom:1px solid var(--bd);background:var(--bar)}\n' +
      '.h svg{display:block;flex:none}\n' +
      '.chev{color:#00c0b5;font-size:14px;font-weight:700;line-height:1}\n' +
      'input{flex:1;min-width:0;border:0;outline:none;background:transparent;color:var(--fg);font-family:inherit;font-size:14px;letter-spacing:-.01em;padding:0}\n' +
      '.cnt{font-size:10px;letter-spacing:.08em;color:var(--mut);white-space:nowrap}\n' +
      'button{cursor:pointer;font-family:inherit;font-size:10px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--bd);background:transparent;color:var(--mut);border-radius:4px;padding:5px 8px;line-height:1}\n' +
      'button:hover{border-color:#00c0b5;color:#00c0b5}\n' +
      '.b{max-height:85vh;overflow:auto;padding:6px 0 8px}\n' +
      '.gh{display:flex;align-items:center;gap:10px;padding:12px 14px 6px}\n' +
      '.gh .nm{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);white-space:nowrap}\n' +
      '.gh .rl{flex:1;height:1px;background:var(--rule)}\n' +
      '.gh .ct{font-size:10px;color:var(--faint)}\n' +
      'a.row{display:flex;align-items:center;gap:12px;padding:7px 14px 7px 12px;text-decoration:none;cursor:pointer}\n' +
      'a.row .bar{width:2px;align-self:stretch;background:transparent;border-radius:1px}\n' +
      'a.row .fav{width:14px;height:14px;flex:none;border-radius:3px;background:#fff;padding:1px;box-shadow:0 0 0 1px rgba(0,0,0,.08);box-sizing:border-box}\n' +
      'a.row .lbl{font-size:13px;font-weight:500;color:var(--fg);white-space:nowrap}\n' +
      'a.row .url{flex:1;min-width:0;font-size:11px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;direction:rtl}\n' +
      'a.row:hover{background:var(--sel)}\n' +
      'a.row:hover .url{color:var(--urlsel)}\n' +
      '.empty{padding:34px 14px;text-align:center;font-size:12px;color:var(--mut)}\n' +
      '.f{display:flex;align-items:center;gap:16px;height:34px;padding:0 14px;border-top:1px solid var(--bd);background:var(--bar);font-size:10px;letter-spacing:.06em;color:var(--mut)}\n' +
      '.f .brand{margin-left:auto;color:var(--faint)}\n' +
      '</style>\n' +
      '</head>\n' +
      '<body>\n' +
      '<div class="p">' +
      '<div class="h"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">' +
      '<rect x="4" y="7" width="16" height="12" rx="3" fill="var(--logo)"/>' +
      '<rect x="11" y="2.5" width="2" height="4.5" rx="1" fill="var(--logo)"/>' +
      '<circle cx="12" cy="2.2" r="1.7" fill="var(--logo)"/>' +
      '<circle cx="9" cy="13" r="1.9" fill="#ffffff"/>' +
      '<circle cx="15" cy="13" r="1.9" fill="#ffffff"/>' +
      '<rect x="9" y="16.2" width="6" height="1.6" rx=".8" fill="#ffffff"/>' +
      '</svg>' +
      '<span class="chev">&#8250;</span>' +
      '<input id="q" spellcheck="false" autocomplete="off" placeholder="search links, categories, urls">' +
      '<span class="cnt" id="cnt"></span>' +
      '<button id="t" title="Toggle theme">LIGHT</button></div>' +
      '<div class="b" id="body">' + groups +
      '<div class="empty" id="empty" style="display:none">no match for &ldquo;<span id="eq"></span>&rdquo;</div>' +
      '</div>' +
      '<div class="f"><span>' + pad(total) + ' links</span><span class="brand">' + esc(title) + '</span></div>' +
      '</div>\n' +
      '<script>\n' +
      '(function(){\n' +
      'var storageKey=' + JSON.stringify(storageKey) + ';\n' +
      'var dark=localStorage.getItem(storageKey)!=="light";\n' +
      'function paint(){document.documentElement.setAttribute("data-theme",dark?"dark":"light");document.getElementById("t").textContent=dark?"LIGHT":"DARK";}\n' +
      'document.getElementById("t").addEventListener("click",function(){dark=!dark;localStorage.setItem(storageKey,dark?"dark":"light");paint();});\n' +
      'paint();\n' +
      'var rows=Array.prototype.slice.call(document.querySelectorAll("a.row"));\n' +
      'var groups=Array.prototype.slice.call(document.querySelectorAll(".g"));\n' +
      'var q=document.getElementById("q");\n' +
      'function filter(){var v=q.value.trim().toLowerCase();var visible=0;groups.forEach(function(g){var any=false;var links=Array.prototype.slice.call(g.querySelectorAll("a.row"));links.forEach(function(a){var m=!v||a.getAttribute("data-s").indexOf(v)>-1;a.style.display=m?"flex":"none";if(m){any=true;visible++;}});g.style.display=any?"":"none";var ct=g.querySelector(".ct");if(ct){ct.textContent=String(links.filter(function(a){return a.style.display!=="none";}).length).padStart(2,"0");}});\n' +
      'document.getElementById("cnt").textContent=String(visible).padStart(2,"0")+"/"+String(rows.length).padStart(2,"0");\n' +
      'var empty=document.getElementById("empty");empty.style.display=visible?"none":"block";document.getElementById("eq").textContent=q.value.trim();}\n' +
      'q.addEventListener("input",filter);\n' +
      'document.addEventListener("keydown",function(e){if(e.key==="/"&&document.activeElement!==q){e.preventDefault();q.focus();}});\n' +
      'q.focus();\n' +
      '})();\n' +
      '</' + 'script>\n' +
      '</body>\n' +
      '</html>\n'
    );
  }

  return buildStaticPage;
});
