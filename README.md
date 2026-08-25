# robotframework-bookmarks

A one-click **bookmarklet** launcher for Robot Framework docs, libraries, and tooling.

Click it on any page and an in-page overlay pops up with all the links below — plus a
live filter box and a dark/light theme toggle. Nothing to install, no server, no
dependencies. The whole thing is a single `javascript:` line you drop into a browser
bookmark.

## Features

- 🔎 **Live filter** — type to narrow links by name, category, or URL
- 🗂 **Grouped** — User Guide, Standard Libraries, External Libraries, Tooling
- 🌙 **Dark / light** theme (remembered per site)
- 🤖 **Self-contained** — the robot logo is an embedded SVG data URI, so it renders
  offline and under strict Content-Security-Policy sites
- ⌨️ Close with the backdrop, the ✕ button, or **Esc**

## Install

1. Create a new bookmark in your browser (right-click the bookmark bar → **Add page…**,
   or bookmark any page then edit it).
2. Name it anything (e.g. `RF Links`).
3. Replace the **URL** with the entire `javascript:` line below — copy it verbatim.
4. Save. Click it on any page to open the overlay.

> GitHub sanitizes `javascript:` links, so you can't click it here — copy the raw text
> from the code block.

```
javascript:(function(){var ID='__rfbm',ex=document.getElementById(ID);if(ex){ex.remove();return;}var RL='https://robotframework.org/robotframework/latest/libraries/';var D=[['User Guide & Home',[['RF User Guide','https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html'],['robotframework.org','https://robotframework.org/'],['Docs & libraries index','https://robotframework.org/robotframework/'],['GitHub · robotframework','https://github.com/robotframework/robotframework']]],['Standard Libraries',[['BuiltIn',RL+'BuiltIn.html'],['Collections',RL+'Collections.html'],['DateTime',RL+'DateTime.html'],['Dialogs',RL+'Dialogs.html'],['OperatingSystem',RL+'OperatingSystem.html'],['Process',RL+'Process.html'],['Screenshot',RL+'Screenshot.html'],['String',RL+'String.html'],['Telnet',RL+'Telnet.html'],['XML',RL+'XML.html']]],['External Libraries',[['SeleniumLibrary','https://marketsquare.github.io/SeleniumLibrary/SeleniumLibrary.html'],['Browser (Playwright)','https://marketsquare.github.io/robotframework-browser/Browser.html'],['RequestsLibrary','https://marketsquare.github.io/robotframework-requests/'],['AppiumLibrary','http://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html'],['DatabaseLibrary','https://marketsquare.github.io/Robotframework-Database-Library/'],['SSHLibrary','https://marketsquare.github.io/SSHLibrary/SSHLibrary.html']]],['Tooling',[['Robot Framework Dashboard','https://github.com/MarketSquare/robotframework-dashboard'],['Robocop (linter)','https://robocop.readthedocs.io/'],['Robotidy (formatter)','https://robotidy.readthedocs.io/'],['Pabot (parallel)','https://pabot.org/'],['RIDE (editor)','https://github.com/robotframework/RIDE']]]];var dark=localStorage.getItem('rf-bm-theme')==='dark';var w=document.createElement('div');w.id=ID;var bg=dark?'#1d2027':'#fff',fg=dark?'#e6e8ec':'#1c1f26',mut=dark?'#9aa1ad':'#6b7280',bd=dark?'#2c313b':'#e2e5ea',hov=dark?'#23272f':'#f0fdfc',fld=dark?'#14161a':'#f4f5f7';var css='#'+ID+'{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.5);font-family:-apple-system,Segoe UI,Roboto,sans-serif;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;overflow:auto}#'+ID+' *{box-sizing:border-box}#'+ID+' .p{background:'+bg+';color:'+fg+';width:100%;max-width:680px;border:1px solid '+bd+';border-radius:14px;box-shadow:0 12px 48px rgba(0,0,0,.4);overflow:hidden}#'+ID+' .h{display:flex;gap:10px;align-items:center;padding:14px 16px;border-bottom:1px solid '+bd+'}#'+ID+' .t{font-weight:700;font-size:16px;white-space:nowrap}#'+ID+' input{flex:1;padding:8px 12px;border:1px solid '+bd+';border-radius:8px;background:'+fld+';color:'+fg+';font-size:14px;outline:none}#'+ID+' button{cursor:pointer;border:1px solid '+bd+';background:transparent;color:'+fg+';border-radius:8px;padding:8px 10px;font-size:14px}#'+ID+' .b{max-height:70vh;overflow:auto;padding:8px 16px 16px}#'+ID+' h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:'+mut+';margin:16px 0 6px}#'+ID+' a{display:block;text-decoration:none;color:'+fg+';padding:8px 10px;border-radius:8px;font-size:14px}#'+ID+' a:hover{background:'+hov+'}#'+ID+' a small{display:block;color:'+mut+';font-size:11px;word-break:break-all}';var s=document.createElement('style');s.textContent=css;w.appendChild(s);var LOGO='data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PHJlY3QgeD0nNCcgeT0nNycgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyByeD0nMycgZmlsbD0nIzAwYzBiNScvPjxyZWN0IHg9JzExJyB5PScyLjUnIHdpZHRoPScyJyBoZWlnaHQ9JzQuNScgcng9JzEnIGZpbGw9JyMwMGMwYjUnLz48Y2lyY2xlIGN4PScxMicgY3k9JzIuMicgcj0nMS43JyBmaWxsPScjMDBjMGI1Jy8+PGNpcmNsZSBjeD0nOScgY3k9JzEzJyByPScxLjknIGZpbGw9JyNmZmZmZmYnLz48Y2lyY2xlIGN4PScxNScgY3k9JzEzJyByPScxLjknIGZpbGw9JyNmZmZmZmYnLz48cmVjdCB4PSc5JyB5PScxNi4yJyB3aWR0aD0nNicgaGVpZ2h0PScxLjYnIHJ4PScuOCcgZmlsbD0nI2ZmZmZmZicvPjwvc3ZnPg==';var body='<div class="p"><div class="h"><img src="'+LOGO+'" width="24" height="24" alt="" style="display:block;flex:none"><span class="t">RF Links</span><input id="__rfbmq" placeholder="Filter…" autocomplete="off"><button id="__rfbmt" title="Toggle theme">'+(dark?'☀️':'🌙')+'</button><button id="__rfbmx" title="Close">✕</button></div><div class="b">';D.forEach(function(c){body+='<div class="cat"><h4>'+c[0]+'</h4>';c[1].forEach(function(l){body+='<a href="'+l[1]+'" target="_blank" rel="noopener noreferrer" data-s="'+(l[0]+' '+c[0]+' '+l[1]).toLowerCase().replace(/"/g,'')+'">'+l[0]+'<small>'+l[1]+'</small></a>';});body+='</div>';});body+='</div></div>';var d=document.createElement('div');d.innerHTML=body;while(d.firstChild){w.appendChild(d.firstChild);}w.addEventListener('click',function(){w.remove();});w.querySelector('.p').addEventListener('click',function(e){e.stopPropagation();});document.body.appendChild(w);var q=document.getElementById('__rfbmq');q.focus();q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();w.querySelectorAll('.cat').forEach(function(cat){var any=false;cat.querySelectorAll('a').forEach(function(a){var m=!v||a.getAttribute('data-s').indexOf(v)>-1;a.style.display=m?'block':'none';if(m){any=true;}});cat.style.display=any?'block':'none';});});document.getElementById('__rfbmx').addEventListener('click',function(){w.remove();});document.getElementById('__rfbmt').addEventListener('click',function(){localStorage.setItem('rf-bm-theme',dark?'light':'dark');w.remove();});document.addEventListener('keydown',function h(e){if(e.key==='Escape'){w.remove();document.removeEventListener('keydown',h);}});})();
```

## Links (plain reference)

### User Guide & Home

- [RF User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [robotframework.org](https://robotframework.org/)
- [Docs & libraries index](https://robotframework.org/robotframework/)
- [GitHub · robotframework](https://github.com/robotframework/robotframework)

### Standard Libraries

- [BuiltIn](https://robotframework.org/robotframework/latest/libraries/BuiltIn.html)
- [Collections](https://robotframework.org/robotframework/latest/libraries/Collections.html)
- [DateTime](https://robotframework.org/robotframework/latest/libraries/DateTime.html)
- [Dialogs](https://robotframework.org/robotframework/latest/libraries/Dialogs.html)
- [OperatingSystem](https://robotframework.org/robotframework/latest/libraries/OperatingSystem.html)
- [Process](https://robotframework.org/robotframework/latest/libraries/Process.html)
- [Screenshot](https://robotframework.org/robotframework/latest/libraries/Screenshot.html)
- [String](https://robotframework.org/robotframework/latest/libraries/String.html)
- [Telnet](https://robotframework.org/robotframework/latest/libraries/Telnet.html)
- [XML](https://robotframework.org/robotframework/latest/libraries/XML.html)

### External Libraries

- [SeleniumLibrary](https://marketsquare.github.io/SeleniumLibrary/SeleniumLibrary.html)
- [Browser (Playwright)](https://marketsquare.github.io/robotframework-browser/Browser.html)
- [RequestsLibrary](https://marketsquare.github.io/robotframework-requests/)
- [AppiumLibrary](http://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html)
- [DatabaseLibrary](https://marketsquare.github.io/Robotframework-Database-Library/)
- [SSHLibrary](https://marketsquare.github.io/SSHLibrary/SSHLibrary.html)

### Tooling

- [Robot Framework Dashboard](https://github.com/MarketSquare/robotframework-dashboard)
- [Robocop (linter)](https://robocop.readthedocs.io/)
- [Robotidy (formatter)](https://robotidy.readthedocs.io/)
- [Pabot (parallel)](https://pabot.org/)
- [RIDE (editor)](https://github.com/robotframework/RIDE)

## Notes & limitations

- **Editing links:** change the `D` array inside the bookmarklet and re-save the bookmark.
- **Theme toggle** stores the choice in `localStorage` (scoped per site) and closes the
  overlay — reopen to see the new theme applied.
- **Strict CSP:** a few sites block injected scripts entirely; the bookmarklet won't run
  there. The embedded SVG logo avoids the more common image-blocking case.
- The robot icon is original artwork, not the official Robot Framework trademark/logo.
