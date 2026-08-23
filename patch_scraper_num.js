import fs from 'fs';
let content = fs.readFileSync('scraper.js', 'utf8');

content = content.replace(
  /function cleanNum\(val\) {\n  if \(!val \|\| typeof val !== 'string'\) return 0\.0;/g,
  `function cleanNum(val) {
  if (val === null || val === undefined) return 0.0;
  if (typeof val === 'number') return val;`
);

fs.writeFileSync('scraper.js', content);
