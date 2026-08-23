import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const res = await axios.get('https://www.screener.in/company/RELIANCE/consolidated/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    }
  });
  const $ = cheerio.load(res.data);
  const ratios = {};
  $('#top-ratios li').each((i, el) => {
    const name = $(el).find('.name').text().trim();
    // High/Low has two values inside <span class="nowrap"><span class="number">1,612</span> / <span class="number">1,250</span></span>
    // Let's print out the text of each .number
    const numbers = [];
    $(el).find('.number').each((j, num) => {
      numbers.push($(num).text().trim());
    });
    if(name && numbers.length > 0) {
      ratios[name] = numbers.join(' / ');
    }
  });
  console.log(ratios);
}
run();
