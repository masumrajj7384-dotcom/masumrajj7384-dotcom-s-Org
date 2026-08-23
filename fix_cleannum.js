import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

content = content.replace(/const cleaned = val.replace/g, 'const cleaned = String(val).replace');

fs.writeFileSync('app/static/app.js', content);
