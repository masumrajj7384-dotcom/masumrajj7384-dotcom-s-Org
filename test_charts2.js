import fs from 'fs';
const data = JSON.parse(fs.readFileSync('/tmp/tcs.json', 'utf8'));

function getRowByName(table, name) {
  if (!table) return null;
  return table.find(row => row && row[0] && row[0].toLowerCase().includes(name.toLowerCase())) || null;
}

const qTable = data.tables['quarters'] || [];
const qSalesRow = getRowByName(qTable, 'Sales');
const qOpRow = getRowByName(qTable, 'Operating Profit');
const qNetRow = getRowByName(qTable, 'Net Profit');

console.log('Q Sales:', qSalesRow ? 'found' : 'missing');
console.log('Q OP:', qOpRow ? 'found' : 'missing');
console.log('Q Net:', qNetRow ? 'found' : 'missing');

const shTable = data.tables['shareholding'] || [];
const promotersRow = getRowByName(shTable, 'Promoters');
const fiiRow = getRowByName(shTable, 'FIIs');
const diiRow = getRowByName(shTable, 'DIIs');
const pubRow = getRowByName(shTable, 'Public');
console.log('Promoters:', promotersRow ? 'found' : 'missing');
console.log('FIIs:', fiiRow ? 'found' : 'missing');
console.log('DIIs:', diiRow ? 'found' : 'missing');
console.log('Public:', pubRow ? 'found' : 'missing');
