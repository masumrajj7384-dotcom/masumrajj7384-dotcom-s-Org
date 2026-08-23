import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex2 = /sector: 'Auto-resolved'/g;
js = js.replace(regex2, '');

fs.writeFileSync('app/static/app.js', js);
console.log("Removed sector: Auto-resolved");
