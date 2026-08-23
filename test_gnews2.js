import Parser from 'rss-parser';
const rssParser = new Parser();
async function test() {
  const companyName = "Tata Consultancy Services";
  const gq = encodeURIComponent(companyName + ' stock OR finance OR earnings');
  const gUrl = `https://news.google.com/rss/search?q=${gq}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const feed = await rssParser.parseURL(gUrl);
    console.log(feed.items[0].pubDate, new Date(feed.items[0].pubDate));
  } catch(e) {}
}
test();
