import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /\/\/ 6\. Return Metrics Chart \(ROCE % vs ROE %\).*?if \(rYears\.length > 0\) \{/s;

const newBlock = `  // 6. Return Metrics Chart (ROCE % vs ROE %)
  let rYears = [];
  let roceData = [];
  let roeData = [];
  
  const gfPayload = companyData.google_finance || {};
  let gfRoeData = null;
  let gfYears = null;
  
  // Google Finance ROE Integration & Synchronization
  // Explicitly look up the "Return on Equity" (ROE) or key valuation metrics payload returned from the Google Finance integration source.
  if (gfPayload) {
      if (Array.isArray(gfPayload.return_on_equity)) {
          gfRoeData = gfPayload.return_on_equity;
      } else if (gfPayload.key_metrics && Array.isArray(gfPayload.key_metrics.roe)) {
          gfRoeData = gfPayload.key_metrics.roe;
      } else if (Array.isArray(gfPayload.roe)) {
          gfRoeData = gfPayload.roe;
      }
      if (Array.isArray(gfPayload.years)) {
          gfYears = gfPayload.years;
      }
  }

  if (ratioTable && ratioTable.length > 0 && (getRowByName(ratioTable, 'ROCE %') || getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE'))) {
    const rHeaders = ratioTable[0];
    let rYearIndices = [];
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && rHeaders[i].trim() && rHeaders[i].toLowerCase() !== 'ttm') {
        rYearIndices.push(i);
        rYears.push(rHeaders[i]);
      }
    }
    const roceRow = getRowByName(ratioTable, 'ROCE %');
    const roeRow = getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE');
    
    roceData = roceRow ? rYearIndices.map(idx => {
      const raw = roceRow[idx];
      if (!raw || String(raw).trim() === '-' || String(raw).trim() === '') return null;
      const v = cleanNum(raw);
      return v === 0 ? null : parseFloat(v);
    }) : rYearIndices.map(() => null);
    
    // Map trailing annual or key ROE percentage figures directly into the Chart 6 dataset array
    if (gfRoeData && gfRoeData.length === rYearIndices.length) {
      roeData = gfRoeData.map(val => (val !== null && val !== undefined) ? parseFloat(val) : null);
    } else {
      roeData = roeRow ? rYearIndices.map(idx => {
        const raw = roeRow[idx];
        if (!raw || String(raw).trim() === '-' || String(raw).trim() === '') return null;
        const v = cleanNum(raw);
        return v === 0 ? null : parseFloat(v);
      }) : rYearIndices.map(() => null);
    }
    
  } else if (pnlTable && pnlTable.length > 0 && bsTable && bsTable.length > 0) {
    // Fallback Parser: algorithmic fallback
    const pHeaders = pnlTable[0];
    const bsHeaders = bsTable[0];
    for (let i = 1; i < pHeaders.length; i++) {
      if (pHeaders[i] && pHeaders[i].trim() && pHeaders[i].toLowerCase() !== 'ttm') {
        rYears.push(pHeaders[i]);
        
        let bsIdx = bsHeaders.indexOf(pHeaders[i]);
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
        
        const ebit = (opRow && opRow[i] ? cleanNum(opRow[i]) : 0) + (otherIncRow && otherIncRow[i] ? cleanNum(otherIncRow[i]) : 0);
        const npRaw = npRow ? npRow[i] : null;
        const np = (!npRaw || String(npRaw).trim() === '-' || String(npRaw).trim() === '') ? null : cleanNum(npRaw);
        
        let equity = 0;
        if (combEq1 && combEq1[bsIdx] && String(combEq1[bsIdx]).trim() !== '-' && String(combEq1[bsIdx]).trim() !== '') {
            equity = cleanNum(combEq1[bsIdx]);
        } else if (combEq2 && combEq2[bsIdx] && String(combEq2[bsIdx]).trim() !== '-' && String(combEq2[bsIdx]).trim() !== '') {
            equity = cleanNum(combEq2[bsIdx]);
        } else {
            const eqc = (eqCapRow && eqCapRow[bsIdx] && String(eqCapRow[bsIdx]).trim() !== '-' && String(eqCapRow[bsIdx]).trim() !== '') ? cleanNum(eqCapRow[bsIdx]) : 0;
            const res = (resRow && resRow[bsIdx] && String(resRow[bsIdx]).trim() !== '-' && String(resRow[bsIdx]).trim() !== '') ? cleanNum(resRow[bsIdx]) : 0;
            const resS = (combEq3 && combEq3[bsIdx] && String(combEq3[bsIdx]).trim() !== '-' && String(combEq3[bsIdx]).trim() !== '') ? cleanNum(combEq3[bsIdx]) : 0;
            equity = eqc + res + resS;
        }
        
        const borrowings = borRow && borRow[bsIdx] ? cleanNum(borRow[bsIdx]) : 0;
        const capitalEmployed = equity + borrowings;
        
        let roce = null;
        let roe = null;
        if (capitalEmployed !== 0) roce = (ebit / capitalEmployed) * 100;
        if (equity !== 0 && np !== null && np !== 0) roe = (np / equity) * 100;
        
        roceData.push(roce !== null ? parseFloat(roce.toFixed(2)) : null);
        roeData.push(roe !== null ? parseFloat(roe.toFixed(2)) : null);
      }
    }
    
    // Override ROE if Google Finance data exists and matches array length
    if (gfRoeData && gfRoeData.length === roeData.length) {
       roeData = gfRoeData.map(val => (val !== null && val !== undefined) ? parseFloat(val) : null);
    }
  } else if (gfRoeData && gfYears && gfRoeData.length === gfYears.length) {
    // Pure Google Finance fallback if no tables exist
    rYears = gfYears;
    roeData = gfRoeData.map(val => (val !== null && val !== undefined) ? parseFloat(val) : null);
    roceData = gfYears.map(() => null);
  }

  if (rYears.length > 0) {`;

if (js.includes('// 6. Return Metrics Chart (ROCE % vs ROE %)')) {
  js = js.replace(regex, newBlock);
  fs.writeFileSync('app/static/app.js', js);
  console.log("Patched chart6 rendering for Google Finance payload");
} else {
  console.log("Block not found");
}
