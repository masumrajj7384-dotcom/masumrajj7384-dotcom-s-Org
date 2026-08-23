import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const targetBtn = `  const mcBtn = document.getElementById('src-btn-mc');
  if (mcBtn) {
    if (mcData.found && mcData.stock_url) {
      mcBtn.href = mcData.stock_url;
      mcBtn.title = \`Open \${companyData.company_name} on MoneyControl\`;
    } else {
      mcBtn.href = \`https://www.moneycontrol.com/india/stockpricequote/\${companyData.ticker}\`;
    }
  }`;

const newBtn = `  const mcBtn = document.getElementById('src-btn-mc');
  if (mcBtn) {
    if (mcData.found && mcData.stock_url) {
      mcBtn.href = mcData.stock_url;
      mcBtn.title = \`Open \${companyData.company_name} on MoneyControl\`;
    } else {
      mcBtn.href = \`https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_data=\${companyData.ticker}\`;
      mcBtn.title = \`Search \${companyData.company_name || companyData.ticker} on MoneyControl\`;
    }
  }`;

code = code.replace(targetBtn, newBtn);
fs.writeFileSync('app/static/app.js', code);
console.log("mcBtn Patched successfully");
