import { fetchFullData } from './scraper.js';
async function run() {
  const data = await fetchFullData('RELIANCE.NS', true);
  console.log("P&L length:", data.tables['profit-loss']?.length);
  console.log("BS length:", data.tables['balance-sheet']?.length);
  console.log("CF length:", data.tables['cash-flow']?.length);
  console.log("Ratios length:", data.tables['ratios']?.length);
}
run();
