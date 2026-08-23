import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace("    gfBtn.href = (gfData && gfData.found && gfData.url) || `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;    gfBtn.title", "    gfBtn.href = (gfData && gfData.found && gfData.url) || `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;\\n    gfBtn.title");

fs.writeFileSync('app/static/app.js', js);
