import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

code = code.replace(
  "const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : `https://www.moneycontrol.com/india/stockpricequote/${sec}/${ts}/${scId}`;",
  "const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : `https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_data=${t}`;"
);

fs.writeFileSync('app/static/app.js', code);
console.log("mcMainHub2 Patched successfully");
