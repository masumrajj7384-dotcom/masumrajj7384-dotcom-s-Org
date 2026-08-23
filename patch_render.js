import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldRender = `        <div class="ac-left">
          <span class="ticker">\${highlightedTicker}</span>
          <span class="name">\${highlightedName}</span>
          <span class="ac-badge">\${item.ex}</span>
        </div>`;

const newRender = `        <div class="ac-left">
          <span class="ticker">\${highlightedTicker}</span>
          <span class="name">\${highlightedName}</span>
          <span class="ac-badge">\${item.ex}</span>
          <span class="ac-sector" style="font-size:0.7rem; color:var(--text-muted); border:1px solid rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; margin-left:4px;">\${item.sector}</span>
        </div>`;

if (js.includes(oldRender)) {
    js = js.replace(oldRender, newRender);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Updated renderAutocomplete to include sector.");
} else {
    console.log("Could not find renderAutocomplete snippet.");
}
