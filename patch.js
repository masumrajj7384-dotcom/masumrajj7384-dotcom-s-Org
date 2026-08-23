import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const targetStart = "  // 6. Return Metrics Chart (ROCE % vs ROE %)\n  if (ratioTable && ratioTable.length > 0) {";
const targetEnd = "  // 7. Quarterly Momentum Chart (Quarterly Sales vs Quarterly Operating Profit)";

const newBlock = `  // 6. Return Metrics Chart (ROCE % vs ROE %)
  let rYears = [];
  let roceData = [];
  let roeData = [];
  
  if (ratioTable && ratioTable.length > 0 && (getRowByName(ratioTable, 'ROCE %') || getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity'))) {
    const rHeaders = ratioTable[0];
    let rYearIndices = [];
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && rHeaders[i].trim() && rHeaders[i].toLowerCase() !== 'ttm') {
        rYearIndices.push(i);
        rYears.push(rHeaders[i]);
      }
    }
    const roceRow = getRowByName(ratioTable, 'ROCE %');
    const roeRow = getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity');
    roceData = roceRow ? rYearIndices.map(idx => cleanNum(roceRow[idx])) : rYearIndices.map(() => 0);
    roeData = roeRow ? rYearIndices.map(idx => cleanNum(roeRow[idx])) : rYearIndices.map(() => 0);
  } else if (pnlTable && pnlTable.length > 0 && bsTable && bsTable.length > 0) {
    const pHeaders = pnlTable[0];
    const bsHeaders = bsTable[0];
    for (let i = 1; i < pHeaders.length; i++) {
      if (pHeaders[i] && pHeaders[i].trim() && pHeaders[i].toLowerCase() !== 'ttm') {
        rYears.push(pHeaders[i]);
        
        let bsIdx = bsHeaders.indexOf(pHeaders[i]);
        if (bsIdx === -1) bsIdx = i;
        
        const opRow = getRowByName(pnlTable, 'Operating Profit');
        const otherIncRow = getRowByName(pnlTable, 'Other Income');
        const npRow = getRowByName(pnlTable, 'Net Profit');
        
        const eqCapRow = getRowByName(bsTable, 'Equity Capital');
        const resRow = getRowByName(bsTable, 'Reserves');
        const borRow = getRowByName(bsTable, 'Borrowings');
        
        const ebit = (opRow ? cleanNum(opRow[i]) : 0) + (otherIncRow ? cleanNum(otherIncRow[i]) : 0);
        const np = npRow ? cleanNum(npRow[i]) : 0;
        const equity = (eqCapRow ? cleanNum(eqCapRow[bsIdx]) : 0) + (resRow ? cleanNum(resRow[bsIdx]) : 0);
        const borrowings = borRow ? cleanNum(borRow[bsIdx]) : 0;
        const capitalEmployed = equity + borrowings;
        
        let roce = 0;
        let roe = 0;
        if (capitalEmployed !== 0) roce = (ebit / capitalEmployed) * 100;
        if (equity !== 0) roe = (np / equity) * 100;
        
        roceData.push(parseFloat(roce.toFixed(2)));
        roeData.push(parseFloat(roe.toFixed(2)));
      }
    }
  }

  if (rYears.length > 0) {
    const ctxRet = document.getElementById('returnMetricsChart');
    if (ctxRet) {
      charts.returnMetrics = new Chart(ctxRet.getContext('2d'), {
        type: 'line',
        data: {
          labels: rYears,
          datasets: [
            { label: 'ROCE %', data: roceData, borderColor: '#06b6d4', borderWidth: 3, tension: 0.3, fill: false },
            { label: 'ROE %', data: roeData, borderColor: '#f59e0b', borderWidth: 3, tension: 0.3, fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', callback: v => \`\${v}%\` } }
          }
        }
      });
    }
  }

`;

const sIdx = js.indexOf(targetStart);
const eIdx = js.indexOf(targetEnd);

if (sIdx !== -1 && eIdx !== -1) {
  js = js.substring(0, sIdx) + newBlock + js.substring(eIdx);
  fs.writeFileSync('app/static/app.js', js);
  console.log("Patched successfully");
} else {
  console.log("Could not find targets");
}
