import { fetchFullData } from './scraper.js';
async function run() {
  const data = await fetchFullData('RELIANCE.NS', true);
  console.log("Fallback:", data.fallback);
  console.log("Ratios:", data.ratios);
  console.log("Is Consolidated:", data.is_consolidated);
  console.log("Sync Status:", data.sync_status);
}
run();
