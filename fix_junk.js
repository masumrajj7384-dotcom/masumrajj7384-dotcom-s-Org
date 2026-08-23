import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');
const badStart = js.indexOf('const q_years =');
const badEnd = js.indexOf('];', badStart) + 2;
js = js.substring(0, badStart) + js.substring(badEnd);
fs.writeFileSync('scraper.js', js);
console.log("Removed junk");
