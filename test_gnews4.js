import Parser from 'rss-parser';
const rssParser = new Parser();
async function test() {
  const companyName = "Tata Consultancy Services Limited";
  const gq = encodeURIComponent(`"${companyName}" stock OR finance OR quarterly results OR share price`);
  const gUrl = `https://news.google.com/rss/search?q=${gq}&hl=en-IN&gl=IN&ceid=IN:en`;
  try {
    const feed = await rssParser.parseURL(gUrl);
    let allNews = [];
    feed.items.forEach(item => {
      const t = item.title.toLowerCase();
      const valid = ['share', 'stock', 'price', 'q1', 'q2', 'q3', 'q4', 'result', 'profit', 'loss', 'buy', 'sell', 'target', 'dividend', 'nse', 'bse', 'market', 'invest', 'deal', 'stake'];
      if (valid.some(v => t.includes(v)) || t.includes(companyName.toLowerCase().split(' ')[0])) {
        allNews.push({title: item.title, date: item.pubDate});
      }
    });
    console.log(`Passed items: ${allNews.length}`);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const finalItems = allNews.filter(n => new Date(n.date) >= twoDaysAgo);
    console.log(`Passed items within 2 days: ${finalItems.length}`);
    if(finalItems.length > 0) console.log("Sample:", finalItems[0]);
  } catch(e) {}
}
test();
