import { fetchFullData } from './scraper.js';
async function run() {
  const data = await fetchFullData('RELIANCE.NS', true);
  console.log("screenerStatus:", data.screenerStatus);
}
run();
