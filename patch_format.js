import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace("if (gfBtn) {\\\\n    const exchangeSuffix", "if (gfBtn) {\\n    const exchangeSuffix");
js = js.replace("companyData.yahoo_finance || {};\\\\n  const exchangeSuffix", "companyData.yahoo_finance || {};\\n  const exchangeSuffix");

fs.writeFileSync('app/static/app.js', js);
