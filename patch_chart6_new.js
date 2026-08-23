import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /\/\/ 6\. Return Metrics Chart \(ROCE % vs ROE %\).*?if \(rYears\.length > 0\) \{/s;

const newBlock = `  // 6. Return Metrics Chart (ROCE % vs ROE %)
  let rYears = [];
  let roceData = [];
  let roeData = [];
  
  const parseRatioValue = (raw) => {
      if (raw === null || raw === undefined) return null;
      const str = String(raw).trim();
      if (str === '-' || str === '') return null;
      const cleaned = str.replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\\./gi, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
  };

  if (ratioTable && ratioTable.length > 0 && (getRowByName(ratioTable, 'ROCE %') || getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE'))) {
    const rHeaders = ratioTable[0];
    let rYearIndices = [];
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && String(rHeaders[i]).trim() && String(rHeaders[i]).toLowerCase() !== 'ttm') {
        rYearIndices.push(i);
        rYears.push(String(rHeaders[i]).trim());
      }
    }
    const roceRow = getRowByName(ratioTable, 'ROCE %');
    const roeRow = getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE');
    
    roceData = roceRow ? rYearIndices.map(idx => parseRatioValue(roceRow[idx])) : rYearIndices.map(() => null);
    roeData = roeRow ? rYearIndices.map(idx => parseRatioValue(roeRow[idx])) : rYearIndices.map(() => null);
    
  } else if (pnlTable && pnlTable.length > 0 && bsTable && bsTable.length > 0) {
    // Fallback Parser: dynamic calculation year-by-year using financial statement data
    const pHeaders = pnlTable[0];
    const bsHeaders = bsTable[0];
    for (let i = 1; i < pHeaders.length; i++) {
      if (pHeaders[i] && String(pHeaders[i]).trim() && String(pHeaders[i]).toLowerCase() !== 'ttm') {
        const yearLabel = String(pHeaders[i]).trim();
        rYears.push(yearLabel);
        
        let bsIdx = bsHeaders.findIndex(h => h && String(h).trim() === yearLabel);
        if (bsIdx === -1) bsIdx = i;
        
        const opRow = getRowByName(pnlTable, 'Operating Profit') || getRowByName(pnlTable, 'Financing Profit');
        const otherIncRow = getRowByName(pnlTable, 'Other Income');
        const npRow = getRowByName(pnlTable, 'Net Profit');
        
        const eqCapRow = getRowByName(bsTable, 'Equity Capital');
        const resRow = getRowByName(bsTable, 'Reserves');
        const borRow = getRowByName(bsTable, 'Borrowing');
        
        // Alternative balance sheet fields
        const combEq1 = getRowByName(bsTable, 'Equity + Reserves') || getRowByName(bsTable, 'Share Capital + Reserves');
        const combEq2 = getRowByName(bsTable, 'Total Equity') || getRowByName(bsTable, 'Net Worth');
        const combEq3 = getRowByName(bsTable, 'Reserves and Surplus');
        
        const ebitVal = (opRow && opRow[i]) ? parseRatioValue(opRow[i]) : 0;
        const otherIncVal = (otherIncRow && otherIncRow[i]) ? parseRatioValue(otherIncRow[i]) : 0;
        const ebit = (ebitVal || 0) + (otherIncVal || 0);
        
        const np = npRow ? parseRatioValue(npRow[i]) : null;
        
        let equity = null;
        if (combEq1 && combEq1[bsIdx] && parseRatioValue(combEq1[bsIdx]) !== null) {
            equity = parseRatioValue(combEq1[bsIdx]);
        } else if (combEq2 && combEq2[bsIdx] && parseRatioValue(combEq2[bsIdx]) !== null) {
            equity = parseRatioValue(combEq2[bsIdx]);
        } else {
            const eqc = (eqCapRow && eqCapRow[bsIdx]) ? parseRatioValue(eqCapRow[bsIdx]) : 0;
            const res = (resRow && resRow[bsIdx]) ? parseRatioValue(resRow[bsIdx]) : 0;
            const resS = (combEq3 && combEq3[bsIdx]) ? parseRatioValue(combEq3[bsIdx]) : 0;
            equity = (eqc || 0) + (res || 0) + (resS || 0);
        }
        
        const borrowings = (borRow && borRow[bsIdx]) ? parseRatioValue(borRow[bsIdx]) : 0;
        const capitalEmployed = (equity || 0) + (borrowings || 0);
        
        let roce = null;
        let roe = null;
        if (capitalEmployed && capitalEmployed !== 0 && ebit !== null) roce = (ebit / capitalEmployed) * 100;
        if (equity && equity !== 0 && np !== null) roe = (np / equity) * 100;
        
        roceData.push(roce !== null ? parseFloat(roce.toFixed(2)) : null);
        roeData.push(roe !== null ? parseFloat(roe.toFixed(2)) : null);
      }
    }
  }

  if (rYears.length > 0) {`;

if (js.includes('// 6. Return Metrics Chart (ROCE % vs ROE %)')) {
  js = js.replace(regex, newBlock);
  fs.writeFileSync('app/static/app.js', js);
  console.log("Patched chart6 rendering");
} else {
  console.log("Block not found");
}
