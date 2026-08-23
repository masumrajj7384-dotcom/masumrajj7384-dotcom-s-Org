import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /<td style="color: \$\{v\.includes\('-'\) \? '#f43f5e' : '#10b981'\}">\$\{v\}<\/td>/s;
const replacement = `<td style="color: \$\{v === 'N/A' ? 'var(--text-muted)' : (v.includes('-') ? '#f43f5e' : '#10b981')\}">\$\{v\}<\/td>`;

if (js.includes(regex.source) || js.match(regex)) {
   js = js.replace(regex, replacement);
   fs.writeFileSync('app/static/app.js', js);
   console.log("Patched createCompoundingBox");
} else {
   console.log("Could not find regex");
}
