import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const res = await axios.get('https://www.screener.in/company/RELIANCE/consolidated/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    }
  });
  const $ = cheerio.load(res.data);
  const pnl = [];
  $('#profit-loss table tr').each((i, el) => {
    const row = [];
    $(el).find('th, td').each((j, td) => {
      row.push($(td).text().trim());
    });
    if (row.length > 0) pnl.push(row);
  });
  console.log(pnl.length, pnl[0], pnl[1]);
}
run();
