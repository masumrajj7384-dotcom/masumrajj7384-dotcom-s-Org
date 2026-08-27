const fs = require('fs');
let html = fs.readFileSync('app/static/index.html', 'utf8');

// Replace the inline display: flex with display: none
html = html.replace('id="calc-modal" class="hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex;', 'id="calc-modal" class="hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: none;');

fs.writeFileSync('app/static/index.html', html);
console.log("Patched modal HTML");
