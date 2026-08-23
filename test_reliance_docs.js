import { fetchFullData } from './scraper.js';
async function run() {
  const data = await fetchFullData('RELIANCE.NS', true);
  console.log("Documents:", JSON.stringify(data.documents, null, 2).substring(0, 500));
}
run();
