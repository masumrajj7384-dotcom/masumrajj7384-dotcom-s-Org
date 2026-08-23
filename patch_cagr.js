import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /  const compoundSales = calculateCAGR\(salesRow, pnlTable\[0\]\);\s*const compoundProfits = calculateCAGR\(netProfitRow, pnlTable\[0\]\);/s;

const replacement = `  // Calculate Sales CAGR
  const compoundSales = getCompoundedGrowthRates(pnlTable, 'Sales Growth', 'Sales');
  const compoundProfits = getCompoundedGrowthRates(pnlTable, 'Profit Growth', 'Net Profit');`;

js = js.replace(regex, replacement);

const fnRegex = /\/\/ CAGR Calculation helper: returns \{ "10 Year".*?return cagr;\n\}/s;

const newFn = `// Enhanced CAGR Calculation & Parsing
function getCompoundedGrowthRates(pnlTable, targetHeader, dataRowName) {
  const result = { "10 Years": "N/A", "5 Years": "N/A", "3 Years": "N/A" };
  
  if (!pnlTable || pnlTable.length === 0) return result;

  // 1. Explicit Scraper Summary Matching
  let sectionIndex = -1;
  for (let i = 0; i < pnlTable.length; i++) {
    const row = pnlTable[i];
    if (row && row.length > 0 && row[0]) {
      const headerLower = String(row[0]).toLowerCase();
      if (headerLower.includes(targetHeader.toLowerCase())) {
        sectionIndex = i;
        break;
      }
    }
  }

  if (sectionIndex !== -1) {
    for (let i = sectionIndex + 1; i < pnlTable.length; i++) {
      const row = pnlTable[i];
      if (row.length === 1 && String(row[0]).toLowerCase().includes('growth')) break;
      if (row.length === 1 && String(row[0]).toLowerCase().includes('cagr')) break;
      if (row.length === 1 && String(row[0]).toLowerCase().includes('return')) break;
      
      if (row.length >= 2) {
        const label = String(row[0]).toLowerCase().replace(/\\s+/g, '');
        const val = String(row[1]).trim();
        if (label.includes('10year')) result['10 Years'] = val;
        else if (label.includes('5year')) result['5 Years'] = val;
        else if (label.includes('3year')) result['3 Years'] = val;
      }
    }
  }

  // 2. Dynamic CAGR Fallback
  const headers = pnlTable[0];
  const dataRow = getRowByName(pnlTable, dataRowName);
  
  if (dataRow && headers) {
    const values = [];
    const years = [];
    for (let i = 1; i < headers.length; i++) {
      const h = headers[i];
      if (h && String(h).trim() && String(h).toLowerCase() !== 'ttm') {
        const parsedYear = parseInt(String(h).replace(/[^0-9]/g, ''));
        if (!isNaN(parsedYear)) {
          years.push(parsedYear);
          values.push(cleanNum(dataRow[i]));
        }
      }
    }

    if (values.length >= 2) {
      const latestIndex = values.length - 1;
      const latestVal = values[latestIndex];
      const periods = [10, 5, 3];

      periods.forEach(p => {
        if (result[\`\${p} Years\`] === 'N/A' || !result[\`\${p} Years\`]) {
          const startYear = years[latestIndex] - p;
          
          let closestIdx = -1;
          for(let i = 0; i < years.length; i++) {
            if (years[i] === startYear) {
                closestIdx = i;
                break;
            }
          }
          
          if (closestIdx === -1) {
              let minDiff = 999;
              for (let i = 0; i < years.length; i++) {
                const diff = Math.abs(years[i] - startYear);
                if (diff < minDiff && diff <= 1) {
                  minDiff = diff;
                  closestIdx = i;
                }
              }
          }

          if (closestIdx !== -1 && values[closestIdx] > 0 && latestVal > 0) {
            const baseVal = values[closestIdx];
            const yearsDiff = years[latestIndex] - years[closestIdx];
            if (yearsDiff > 0) {
              const rate = (Math.pow(latestVal / baseVal, 1 / yearsDiff) - 1) * 100;
              result[\`\${p} Years\`] = \`\${rate > 0 ? '+' : ''}\${rate.toFixed(1)}%\`;
            }
          }
        }
      });
    }
  }

  return result;
}`;

if (js.includes('function calculateCAGR')) {
   js = js.replace(fnRegex, newFn);
   fs.writeFileSync('app/static/app.js', js);
   console.log("Replaced calculateCAGR.");
}
