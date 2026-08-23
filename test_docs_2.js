import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const res = await axios.get('https://www.screener.in/company/RELIANCE/consolidated/');
  const $ = cheerio.load(res.data);
  $('#documents .documents').each((i, el) => {
    const title = $(el).find('h3').text().trim();
    console.log("Title:", title);
    $(el).find('ul li').each((j, li) => {
        const link = $(li).find('a').attr('href');
        const text = $(li).find('a').text().trim() || $(li).text().trim();
        const date = $(li).find('.date').text().trim() || $(li).find('.time').text().trim() || '';
        console.log("  -", date, text, link);
    });
  });
}
run();
