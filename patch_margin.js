import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');
code = code.replace(/<div class="glass-panel col-span-12 analytics-card" style="margin-top: 1.5rem;">/, '<div class="glass-panel col-span-12 analytics-card" style="margin-top: 1.5rem; margin-bottom: 2rem;">');
fs.writeFileSync('app/static/index.html', code);
console.log("margin patched");
