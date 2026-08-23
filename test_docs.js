import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const res = await axios.get('https://www.screener.in/company/RELIANCE/consolidated/');
  const $ = cheerio.load(res.data);
  const docsHtml = $('#documents').html();
  console.log(docsHtml ? docsHtml.substring(0, 1000) : "No #documents found");
  
  // Let's find out what divs are inside #documents
  $('#documents .documents').each((i, el) => {
    console.log("Found .documents div");
    // print out h3 titles or something
  });
  
  $('.show-more-box').each((i, el) => {
      console.log("show-more-box:", $(el).find('h3').text().trim() || $(el).prev('h2').text().trim() || "no title");
  });
}
run();
