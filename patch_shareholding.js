import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

content = content.replace(
  /let safeLabel = headers\[i\]\.replace\(\/\[\{\(\)\}\]\/g, ''\)\.trim\(\);/g,
  "let safeLabel = headers[i].replace(/[^a-zA-Z0-9\\s]/g, '').trim();"
);

fs.writeFileSync('app/static/app.js', content);
