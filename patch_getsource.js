import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const regex = /const q_pnl = \[\s*\['', \.\.\.q_years\],\s*genRow\('Sales', 500, 0\.05, 0\.02\),.*?genRow\('EPS in Rs', 21, 0\.08, 0\.04\)\s*\];/s;
if (regex.test(js)) {
  js = js.replace(regex, "");
  fs.writeFileSync('scraper.js', js);
  console.log("Removed garbage code from getSource");
} else {
  console.log("Garbage code not found");
}
