import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

html = html.replace(
  /<div class="analytics-card-header"><i class="fa-solid fa-newspaper"><\/i><h3>MoneyControl Balance Sheet<\/h3><\/div>/,
  '<div class="analytics-card-header"><i class="fa-solid fa-newspaper" style="color:var(--accent-amber);"></i><h3>MoneyControl Entity & Hub</h3></div>'
);

html = html.replace(
  /<div class="analytics-card-header"><i class="fa-solid fa-newspaper"><\/i><h3>MoneyControl P&L Statement<\/h3><\/div>/,
  '<div class="analytics-card-header"><i class="fa-solid fa-chart-line" style="color:var(--accent-amber);"></i><h3>MoneyControl Financials</h3></div>'
);

fs.writeFileSync('app/static/index.html', html);
