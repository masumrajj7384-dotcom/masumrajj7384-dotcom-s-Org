import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(/;\\\\n    gfBtn\\.title/g, ";\\n    gfBtn.title");

fs.writeFileSync('app/static/app.js', js);
