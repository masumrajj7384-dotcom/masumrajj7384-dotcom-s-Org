import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

code = code.replace("function renderDashboard() {\\n  fetchAndRenderNews(companyData.ticker, companyData.company_name);", "function renderDashboard() {\n  fetchAndRenderNews(companyData.ticker, companyData.company_name);");

fs.writeFileSync('app/static/app.js', code);
console.log("fixed \\n in app.js");
