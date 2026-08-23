import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldRender = '          <span class="ac-sector" style="font-size:0.7rem; color:var(--text-muted); border:1px solid rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; margin-left:4px;">${item.sector}</span>';

const newRender = '${item.sector && item.sector !== "Auto-resolved" ? `<span class="ac-sector" style="font-size:0.7rem; color:var(--text-muted); border:1px solid rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; margin-left:4px;">${item.sector}</span>` : ""}';

js = js.replace(oldRender, newRender);
fs.writeFileSync('app/static/app.js', js);
console.log("Patched renderAutocomplete");
