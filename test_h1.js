import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const res = await axios.get('https://www.screener.in/company/TCS/consolidated/');
  const $ = cheerio.load(res.data);
  console.log("h1 text:", $('h1').text());
  console.log("h1 count:", $('h1').length);
}
run();
