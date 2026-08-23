import Parser from 'rss-parser';
const rssParser = new Parser();
async function test() {
  const companyName = "Tata Consultancy Services Limited";
  const gq = encodeURIComponent(`"${companyName}" stock OR finance OR quarterly results OR share price`);
  const gUrl = `https://news.google.com/rss/search?q=${gq}&hl=en-IN&gl=IN&ceid=IN:en`;
  console.log(gUrl);
  try {
    const feed = await rssParser.parseURL(gUrl);
    console.log(`Found ${feed.items.length} items`);
  } catch(e) {}
}
test();
