    charts.revenueProfit = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Net Profit',
            data: profitData,
            type: 'line',
            borderColor: '#8b5cf6',
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            label: 'Revenue',
            data: salesData,
            backgroundColor: 'rgba(6, 182, 212, 0.45)',
            borderColor: '#06b6d4',
            borderWidth: 1.5,
            borderRadius: 6,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' },
            title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
          
        }
      }
    });
  }

  // 2. Margin Chart (OPM % vs NPM %)
  const opmRow = getRowByName(pnlTable, 'OPM %');
  if (salesRow || netProfitRow) {
    const opmValues = opmRow ? yearIndices.map(idx => cleanNum(opmRow[idx])) : yearIndices.map(() => 0);
    const npmValues = yearIndices.map(idx => {
      if (!salesRow || !netProfitRow) return 0;
      const sales = cleanNum(salesRow[idx]);
      const profit = cleanNum(netProfitRow[idx]);
      return sales > 0 ? parseFloat(((profit / sales) * 100).toFixed(2)) : 0;
    });
    
    const ctx = document.getElementById('marginChart').getContext('2d');
    charts.margin = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'OPM %',
            data: opmValues,
            borderColor: '#10b981',
            borderWidth: 3,
            fill: false,
            tension: 0.3
          },
          {
            label: 'NPM %',
            data: npmValues,
            borderColor: '#f59e0b',
            borderWidth: 3,
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8', callback: value => `${value}%` },
            title: { display: true, text: 'Margin percentage', color: '#94a3b8' }
          }
        }
      }
    });
  }

  // 3. Cash Flow Chart (CFO vs Free Cash Flow)
  let cfYearIndices = [];
  let cfYears = [];
  if (cashflowTable && cashflowTable.length > 0) {
    const cfHeaders = cashflowTable[0];
    for (let i = 1; i < cfHeaders.length; i++) {
      const h = cfHeaders[i];
      if (h && h.trim() && h.toLowerCase() !== 'ttm') {
        cfYearIndices.push(i);
        cfYears.push(h);
      }
    }
  }
  
  const cfoRow = getRowByName(cashflowTable, 'Cash from Operating Activity');
  const fcfRow = getRowByName(cashflowTable, 'Free Cash Flow');
  
  if (cfoRow || fcfRow) {
    const cfoData = cfoRow ? cfYearIndices.map(idx => cleanNum(cfoRow[idx])) : cfYearIndices.map(() => 0);
    const fcfData = fcfRow ? cfYearIndices.map(idx => cleanNum(fcfRow[idx])) : cfYearIndices.map(() => 0);
    
    const ctx = document.getElementById('cashflowChart').getContext('2d');
    charts.cashflow = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cfYears,
        datasets: [
          {
            label: 'Free Cash Flow',
            data: fcfData,
            type: 'line',
            borderColor: '#f43f5e',
            borderWidth: 2.5,
            fill: false,
            tension: 0.3
          },
          {
            label: 'CFO',
            data: cfoData,
            backgroundColor: 'rgba(59, 130, 246, 0.4)',
            borderColor: '#3b82f6',
            borderWidth: 1.5,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' },
            title: { display: true, text: 'Value (₹ Crores)', color: '#94a3b8' }
          }
        }
      }
    });
  }

  // 4. Working Capital Days Chart (Debtor Days vs Inventory Days vs Days Payable)
  const ratioTable = companyData.tables['ratios'];
  if (ratioTable && ratioTable.length > 0) {
    const rHeaders = ratioTable[0];
    let rYearIndices = [];
    let rYears = [];
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && rHeaders[i].trim() && rHeaders[i].toLowerCase() !== 'ttm') {
        rYearIndices.push(i);
        rYears.push(rHeaders[i]);
      }
    }
    const debtorRow = getRowByName(ratioTable, 'Debtor Days');
    const inventoryRow = getRowByName(ratioTable, 'Inventory Days');
    const payableRow = getRowByName(ratioTable, 'Days Payable');

    if (debtorRow || inventoryRow || payableRow) {
      const debtorData = debtorRow ? rYearIndices.map(idx => cleanNum(debtorRow[idx])) : rYearIndices.map(() => 0);
      const inventoryData = inventoryRow ? rYearIndices.map(idx => cleanNum(inventoryRow[idx])) : rYearIndices.map(() => 0);
      const payableData = payableRow ? rYearIndices.map(idx => cleanNum(payableRow[idx])) : rYearIndices.map(() => 0);

      const ctxWC = document.getElementById('workingCapitalChart');
      if (ctxWC) {
        charts.workingCapital = new Chart(ctxWC.getContext('2d'), {
          type: 'line',
          data: {
            labels: rYears,
            datasets: [
              { label: 'Debtor Days', data: debtorData, borderColor: '#06b6d4', borderWidth: 2.5, tension: 0.3, fill: false },
              { label: 'Inventory Days', data: inventoryData, borderColor: '#f59e0b', borderWidth: 2.5, tension: 0.3, fill: false },
              { label: 'Days Payable', data: payableData, borderColor: '#8b5cf6', borderWidth: 2.5, tension: 0.3, fill: false }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: 'Days', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

  // 5. Capital Structure & Borrowings Chart (Equity Capital + Reserves vs Borrowings)
  const bsTable = companyData.tables['balance-sheet'];
  if (bsTable && bsTable.length > 0) {
    const bsHeaders = bsTable[0];
    let bsYearIndices = [];
    let bsYears = [];
    for (let i = 1; i < bsHeaders.length; i++) {
      if (bsHeaders[i] && bsHeaders[i].trim() && bsHeaders[i].toLowerCase() !== 'ttm') {
        bsYearIndices.push(i);
        bsYears.push(bsHeaders[i]);
      }
    }
    const eqCapRow = getRowByName(bsTable, 'Equity Capital');
    const resRow = getRowByName(bsTable, 'Reserves');
    const borRow = getRowByName(bsTable, 'Borrowing');

    if (borRow || eqCapRow || resRow) {
      const equityTotalData = bsYearIndices.map(idx => cleanNum(eqCapRow ? eqCapRow[idx] : '0') + cleanNum(resRow ? resRow[idx] : '0'));
      const debtData = borRow ? bsYearIndices.map(idx => cleanNum(borRow[idx])) : bsYearIndices.map(() => 0);

      const ctxCap = document.getElementById('capitalStructureChart');
      if (ctxCap) {
        charts.capitalStructure = new Chart(ctxCap.getContext('2d'), {
          type: 'bar',
          data: {
            labels: bsYears,
            datasets: [
              { label: 'Net Worth (Equity+Res)', data: equityTotalData, backgroundColor: 'rgba(16, 185, 129, 0.45)', borderColor: '#10b981', borderWidth: 1.5, borderRadius: 4 },
              { label: 'Total Borrowings', data: debtData, backgroundColor: 'rgba(244, 63, 94, 0.45)', borderColor: '#f43f5e', borderWidth: 1.5, borderRadius: 4 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

          // 6. Return Metrics Chart (ROCE % vs ROE %)
  let rYears = [];
  let roceData = [];
  let roeData = [];
  
  const parseRatioValue = (raw) => {
      if (raw === null || raw === undefined) return null;
      const str = String(raw).trim();
      if (str === '-' || str === '') return null;
      const cleaned = str.replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
  };

  const yearDataMap = {};
  const yearSet = new Set();

  // 1. Dynamic Calculation Fallback from PnL & BS
  if (pnlTable && pnlTable.length > 0 && bsTable && bsTable.length > 0) {
    const pHeaders = pnlTable[0];
    const bsHeaders = bsTable[0];
    for (let i = 1; i < pHeaders.length; i++) {
      if (pHeaders[i] && String(pHeaders[i]).trim() && String(pHeaders[i]).toLowerCase() !== 'ttm') {
        const yearLabel = String(pHeaders[i]).trim();
        yearSet.add(yearLabel);
        
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
        
        yearDataMap[yearLabel] = {
            roce: roce !== null ? parseFloat(roce.toFixed(2)) : null,
            roe: roe !== null ? parseFloat(roe.toFixed(2)) : null
        };
      }
    }
  }

  // 2. Annual Ratios Table Scraping (Overrides fallback)
  if (ratioTable && ratioTable.length > 0) {
    const rHeaders = ratioTable[0];
    const roceRow = getRowByName(ratioTable, 'ROCE %');
    const roeRow = getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE');
    
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && String(rHeaders[i]).trim() && String(rHeaders[i]).toLowerCase() !== 'ttm') {
        const yearLabel = String(rHeaders[i]).trim();
        
        // Skip aggregate/historical text rows
        if (yearLabel.toLowerCase().includes('years') || yearLabel.toLowerCase().includes('year:')) continue;
        
        yearSet.add(yearLabel);
        if (!yearDataMap[yearLabel]) yearDataMap[yearLabel] = { roce: null, roe: null };
        
        if (roceRow) {
            const parsedRoce = parseRatioValue(roceRow[i]);
            if (parsedRoce !== null) yearDataMap[yearLabel].roce = parsedRoce;
        }
        if (roeRow) {
            const parsedRoe = parseRatioValue(roeRow[i]);
            if (parsedRoe !== null) yearDataMap[yearLabel].roe = parsedRoe;
        }
      }
    }
  }

  // 3. Reconstruct arrays in chronological order
  rYears = Array.from(yearSet).filter(y => y && y.match(/\d{4}/)).sort((a, b) => {
      const yearA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const yearB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return yearA - yearB;
  });

  roceData = rYears.map(y => yearDataMap[y].roce);
  roeData = rYears.map(y => yearDataMap[y].roe);

  if (rYears.length > 0) {
    const ctxRet = document.getElementById('returnMetricsChart');
    if (ctxRet) {
      charts.returnMetrics = new Chart(ctxRet.getContext('2d'), {
        type: 'line',
        data: {
          labels: rYears,
          datasets: [
            { label: 'ROCE %', data: roceData, borderColor: '#06b6d4', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true },
            { label: 'ROE %', data: roeData, borderColor: '#f59e0b', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + '%';
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', callback: v => `${v}%` } }
          }
        }
      });
    }
  }

  // 7. Quarterly Momentum Chart (Quarterly Sales vs Quarterly Operating Profit)
  const qTable = companyData.tables['quarters'];
  if (qTable && qTable.length > 0) {
    const qHeaders = qTable[0];
    let qIndices = [];
    let qLabels = [];
    for (let i = 1; i < qHeaders.length; i++) {
      if (qHeaders[i] && qHeaders[i].trim() && qHeaders[i].toLowerCase() !== 'ttm') {
        qIndices.push(i);
        qLabels.push(qHeaders[i]);
      }
    }
    const qSalesRow = getRowByName(qTable, 'Sales');
    const qOpRow = getRowByName(qTable, 'Operating Profit');

    if (qSalesRow || qOpRow) {
      const qSalesData = qSalesRow ? qIndices.map(idx => cleanNum(qSalesRow[idx])) : qIndices.map(() => 0);
      const qOpData = qOpRow ? qIndices.map(idx => cleanNum(qOpRow[idx])) : qIndices.map(() => 0);

      const ctxQ = document.getElementById('quarterlyChart');
      if (ctxQ) {
        charts.quarterly = new Chart(ctxQ.getContext('2d'), {
          type: 'bar',
          data: {
            labels: qLabels,
            datasets: [
              { label: 'Qtr Sales', data: qSalesData, backgroundColor: 'rgba(59, 130, 246, 0.45)', borderColor: '#3b82f6', borderWidth: 1.5, borderRadius: 4 },
              { label: 'Qtr OpProfit', data: qOpData, type: 'line', borderColor: '#10b981', borderWidth: 3, tension: 0.3, fill: false }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

  // 8. Shareholding Donut Chart
  renderShareholdingDonut();
}

// Render dynamic shareholding donut chart
function renderShareholdingDonut() {
  const shTable = companyData.tables['shareholding'];
  const select = document.getElementById('shareholding-date-select');
  select.innerHTML = '';
  
  if (!shTable || shTable.length === 0) {
    document.getElementById('shareholding-legend').innerHTML = '<div style="color: var(--text-muted);">No shareholding data available</div>';
    return;
  }
  
  // Extract dates (columns 1 to N)
  const headers = shTable[0];
  const dates = [];
  for (let i = 1; i < headers.length; i++) {
    if (headers[i] && headers[i].trim() && headers[i].toLowerCase() !== 'ttm') {
      let safeLabel = headers[i].replace(/[{()}]/g, '').trim();
      dates.push({ label: safeLabel, index: i });
    }
  }
  
  if (dates.length === 0) return;
  
