import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /const currentPriceVal = companyData\.ratios\["Current Price"\] \|\| "₹ 0\.00";\n\s*document\.getElementById\('current-price'\)\.textContent = currentPriceVal;/m;

const replacement = `let currentPriceVal = "₹ 0.00";
  const yfData = companyData.yahoo_finance || {};
  if (yfData.found && yfData.price) {
     currentPriceVal = \`₹ \${yfData.price.toLocaleString()}\`;
  } else if (companyData.ratios["Current Price"]) {
     currentPriceVal = companyData.ratios["Current Price"];
  }
  document.getElementById('current-price').textContent = currentPriceVal;`;

if(js.match(regex)){
    js = js.replace(regex, replacement);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Updated banner price logic to prefer live YF price.");
} else {
    console.log("Regex not found");
}
