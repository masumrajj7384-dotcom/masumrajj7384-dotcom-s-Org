import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const target = "function renderDashboard() {";
const replacement = "function renderDashboard() {\\n  fetchAndRenderNews(companyData.ticker, companyData.company_name);";

code = code.replace(target, replacement);

fs.writeFileSync('app/static/app.js', code);
console.log("renderDashboard patched");
