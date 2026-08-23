fetch("http://localhost:3000/api/company?ticker=VENUSPIPES")
.then(r=>r.json())
.then(d => {
  const pnl = d.tables['profit-loss'];
  const cleanNum = (val) => {
      if (!val) return 0;
      if (typeof val === 'number') return val;
      const cleaned = String(val).replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '').trim();
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
  };
  const getRowByName = (table, name) => {
      if (!table) return null;
      return table.find(row => row && row[0] && row[0].toLowerCase().includes(name.toLowerCase())) || null;
  };

  const getGrowth = (pnlTable, targetHeader, dataRowName) => {
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
            const cleanVal = val.replace(/%/g, '').trim();
            if (cleanVal !== '' && cleanVal !== '-') {
                if (label.includes('10year')) result['10 Years'] = val;
                else if (label.includes('5year')) result['5 Years'] = val;
                else if (label.includes('3year')) result['3 Years'] = val;
            }
          }
        }
      }

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
            if (result[`${p} Years`] === 'N/A' || !result[`${p} Years`]) {
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
                if (yearsDiff === p || yearsDiff === p - 1 || yearsDiff === p + 1) {
                  const rate = (Math.pow(latestVal / baseVal, 1 / yearsDiff) - 1) * 100;
                  result[`${p} Years`] = `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
                }
              }
            }
          });
        }
      }

      return result;
  };
  
  console.log("Sales:", getGrowth(pnl, 'Compounded Sales Growth', 'Sales'));
  console.log("Profit:", getGrowth(pnl, 'Compounded Profit Growth', 'Net Profit'));
});
