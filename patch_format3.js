import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(/\\n/g, "\n");

fs.writeFileSync('app/static/app.js', js);
