import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

// We need a helper to clean the ticker for google finance
const replacement1 = `
    const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
    const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
    gfBtn.href = (gfData && gfData.found && gfData.url) || \`https://www.google.com/finance/quote/\${cleanTicker}\${exchangeSuffix}\`;
`;

js = js.replace(`
    const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
    gfBtn.href = (gfData.found && gfData.url) || \`https://www.google.com/finance/quote/\${companyData.ticker}\${exchangeSuffix}\`;
`, replacement1.trim());

const replacement2 = `
  const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
  const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
  const gfUrl = (gfData && gfData.found && gfData.url) || \`https://www.google.com/finance/quote/\${cleanTicker}\${exchangeSuffix}\`;
`;

js = js.replace(`
  const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
  const gfUrl = \`https://www.google.com/finance/quote/\${companyData.ticker}\${exchangeSuffix}\`;
`, replacement2.trim());

fs.writeFileSync('app/static/app.js', js);
console.log("Patched Google Finance Links");
