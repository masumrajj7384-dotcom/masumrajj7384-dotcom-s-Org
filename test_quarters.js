import { fetchFullData } from './scraper.js';
async function run() {
  const data = await fetchFullData('RELIANCE.NS', true);
  console.log("Quarters length:", data.tables['quarters']?.length);
  if(data.tables['quarters']?.length > 0) {
      console.log(data.tables['quarters'][0]);
  }
}
run();
