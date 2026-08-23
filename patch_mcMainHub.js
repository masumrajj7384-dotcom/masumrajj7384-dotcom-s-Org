import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const target1 = "const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : \\`https://www.moneycontrol.com/india/stockpricequote/\\${sec}/\\${ts}/\\${scId}\\`;";
const new1 = "const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : \\`https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_data=\\${t}\\`;";

code = code.replace(target1, new1);
fs.writeFileSync('app/static/app.js', code);
console.log("mcMainHub Patched successfully");
