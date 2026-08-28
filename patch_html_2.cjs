const fs = require('fs');
let html = fs.readFileSync('app/static/index.html', 'utf8');

const insightsSectionRegex = /<!-- TAB 3: Insights -->[\s\S]*?(?=<!-- TAB 4: Statements Tables -->)/;
html = html.replace(insightsSectionRegex, '');

fs.writeFileSync('app/static/index.html', html);
console.log("Patched HTML part 2");
