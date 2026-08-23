import fs from 'fs';

// Read app.js just to get the getCompoundedGrowthRates function and simulate it
const appJs = fs.readFileSync('app/static/app.js', 'utf8');

// Use regex to extract the function
const funcMatch = appJs.match(/function getCompoundedGrowthRates.*?\n\}/s);

// Well, it's easier to just fetch TCS and run the logic manually here to see the result.
fetch("http://localhost:3000/api/company?ticker=TCS")
.then(r=>r.json())
.then(d => {
  const pnl = d.tables['profit-loss'];
  const getGrowth = (pnlTable, targetHeader, dataRowName) => {
    // copy the body of the function from the app.js
    const result = { "10 Years": "N/A", "5 Years": "N/A", "3 Years": "N/A" };
    if (!pnlTable || pnlTable.length === 0) return result;
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
          const label = String(row[0]).toLowerCase().replace(/\s+/g, '');
          const val = String(row[1]).trim();
          if (label.includes('10year')) result['10 Years'] = val;
          else if (label.includes('5year')) result['5 Years'] = val;
          else if (label.includes('3year')) result['3 Years'] = val;
        }
      }
    }
    return result;
  };
  
  console.log("Sales:", getGrowth(pnl, 'Compounded Sales Growth', 'Sales'));
  console.log("Profit:", getGrowth(pnl, 'Compounded Profit Growth', 'Net Profit'));
});
