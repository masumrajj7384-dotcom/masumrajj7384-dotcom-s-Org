import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace("const gfUrl = (gfData && gfData.found && gfData.url)", "const gfUrl = (companyData.google_finance && companyData.google_finance.found && companyData.google_finance.url)");

fs.writeFileSync('app/static/app.js', js);
console.log("Fixed gfData reference");
