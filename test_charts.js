import fs from 'fs';
const data = JSON.parse(fs.readFileSync('/tmp/tcs.json', 'utf8'));

const pnlTable = data.tables['profit-loss'] || [];
const headers = pnlTable[0] || [];
let yearIndices = [];
let years = [];

for (let i = 1; i < headers.length; i++) {
  const h = headers[i];
  if (h && h.trim() && h.toLowerCase() !== 'ttm') {
    yearIndices.push(i);
    years.push(h);
  }
}

function cleanNum(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const cleaned = val.replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function getRowByName(table, name) {
  if (!table) return null;
  return table.find(row => row && row[0] && row[0].toLowerCase().includes(name.toLowerCase())) || null;
}

const salesRow = getRowByName(pnlTable, 'Sales');
const netProfitRow = getRowByName(pnlTable, 'Net Profit');

if (salesRow && netProfitRow) {
  const salesData = yearIndices.map(idx => cleanNum(salesRow[idx]));
  const profitData = yearIndices.map(idx => cleanNum(netProfitRow[idx]));
  console.log('Years:', years);
  console.log('Sales Data:', salesData);
  console.log('Profit Data:', profitData);
}

const cashflowTable = data.tables['cash-flow'] || [];
const cfoRow = getRowByName(cashflowTable, 'Cash from Operating');
const fcfRow = getRowByName(cashflowTable, 'Free Cash Flow');
console.log('CFO Row:', cfoRow ? 'found' : 'missing');
console.log('FCF Row:', fcfRow ? 'found' : 'missing');

const ratioTable = data.tables['ratios'] || [];
const roeRow = getRowByName(ratioTable, 'ROE');
const roceRow = getRowByName(ratioTable, 'ROCE');
console.log('ROE Row:', roeRow ? 'found' : 'missing');
console.log('ROCE Row:', roceRow ? 'found' : 'missing');
