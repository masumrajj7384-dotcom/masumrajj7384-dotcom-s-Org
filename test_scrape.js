import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  try {
    const res = await axios.get('https://www.screener.in/api/company/search/?q=reliance', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log("Screener search:", res.data);

    const htmlRes = await axios.get('https://www.screener.in/company/RELIANCE/consolidated/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(htmlRes.data);
    console.log("Name:", $('h1').text().trim());
    
    console.log("MC search:", (await axios.get('https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=reliance&type=1&format=json', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })).data.slice(0,1));
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
