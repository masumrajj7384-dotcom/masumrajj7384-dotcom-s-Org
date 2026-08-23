import fs from 'fs';

// Rename in index.html
let html = fs.readFileSync('app/static/index.html', 'utf8');
html = html.replace('id="tab-cross"', 'id="tab-cross-source"');
html = html.replace("switchTab('tab-cross')", "switchTab('tab-cross-source')");
fs.writeFileSync('app/static/index.html', html);

console.log("Renamed tab in html");
