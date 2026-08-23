import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const importStatement = "import * as cheerio from 'cheerio';";
const replacementImport = "import * as cheerio from 'cheerio';\nimport Parser from 'rss-parser';\nconst rssParser = new Parser();";

code = code.replace(importStatement, replacementImport);

const newsFunction = `
// FINANCIAL NEWS AGGREGATOR
function getSentiment(title) {
  const t = title.toLowerCase();
  const bullish = ['beat', 'win', 'upgrade', 'jump', 'surge', 'soar', 'profit', 'dividend', 'deal', 'acquire', 'growth', 'up', 'high', 'boost', 'record', 'strong', 'positive', 'buy', 'target raised'];
  const bearish = ['miss', 'cut', 'downgrade', 'fall', 'plunge', 'loss', 'penalty', 'lawsuit', 'fine', 'down', 'low', 'drop', 'slump', 'weak', 'negative', 'sell', 'target cut', 'sebi', 'investigation', 'probe', 'resign', 'step down'];
  const marketMoving = ['merger', 'acquisition', 'm&a', 'ceo', 'cfo', 'management', 'strategic', 'stake', 'selloff', 'buyback'];
  
  if (marketMoving.some(w => t.includes(w))) return { label: 'Market Moving', icon: '⚡', class: 'tag-moving' };
  if (bullish.some(w => t.includes(w)) && !bearish.some(w => t.includes(w))) return { label: 'Bullish', icon: '🟢', class: 'tag-bullish' };
  if (bearish.some(w => t.includes(w))) return { label: 'Bearish', icon: '🔴', class: 'tag-bearish' };
  return { label: 'Neutral', icon: '🔵', class: 'tag-neutral' };
}

function getSource(url, title, publisher) {
  const u = url.toLowerCase();
  const p = (publisher || '').toLowerCase();
  if (u.includes('yahoo') || p.includes('yahoo')) return { name: 'Yahoo Finance', class: 'source-yahoo' };
  if (u.includes('moneycontrol') || p.includes('moneycontrol')) return { name: 'MoneyControl', class: 'source-mc' };
  if (u.includes('livemint') || p.includes('mint')) return { name: 'Mint', class: 'source-mint' };
  if (u.includes('economictimes') || p.includes('economic times')) return { name: 'Economic Times', class: 'source-et' };
  if (u.includes('reuters')) return { name: 'Reuters', class: 'source-reuters' };
  if (u.includes('business-standard') || p.includes('business standard')) return { name: 'Business Standard', class: 'source-bs' };
  if (u.includes('cnbctv18') || p.includes('cnbc')) return { name: 'CNBC-TV18', class: 'source-cnbc' };
  
  return { name: publisher || 'Financial News', class: 'source-default' };
}

export async function fetchNews(ticker, companyName) {
  let allNews = [];
  
  // 1. Yahoo Finance News
  try {
    const yfUrl = \`https://query2.finance.yahoo.com/v1/finance/search?q=\${encodeURIComponent(ticker + '.NS')}&quotesCount=0&newsCount=10\`;
    const yfRes = await axiosInstance.get(yfUrl);
    if (yfRes.data && yfRes.data.news) {
      yfRes.data.news.forEach(item => {
        allNews.push({
          title: item.title,
          source: getSource(item.link, item.title, item.publisher),
          publishedAt: new Date(item.providerPublishTime * 1000),
          summary: 'Market news update from Yahoo Finance regarding ' + companyName + '.',
          url: item.link,
          sentiment: getSentiment(item.title)
        });
      });
    }
  } catch (e) {
    console.error("Yahoo News Error:", e.message);
  }

  // 2. Google News RSS (Financial Filter)
  try {
    const gq = encodeURIComponent(\`"\${companyName}" stock OR finance OR quarterly results OR share price\`);
    const gUrl = \`https://news.google.com/rss/search?q=\${gq}&hl=en-IN&gl=IN&ceid=IN:en\`;
    const feed = await rssParser.parseURL(gUrl);
    feed.items.forEach(item => {
      // Basic strict filtering to avoid fluff
      const t = item.title.toLowerCase();
      const valid = ['share', 'stock', 'price', 'q1', 'q2', 'q3', 'q4', 'result', 'profit', 'loss', 'buy', 'sell', 'target', 'dividend', 'nse', 'bse', 'market', 'invest', 'deal', 'stake'];
      if (valid.some(v => t.includes(v)) || t.includes(companyName.toLowerCase().split(' ')[0])) {
        allNews.push({
          title: item.title.split(' - ')[0], // Google news adds publisher at the end
          source: getSource(item.link, item.title, item.title.split(' - ').pop()),
          publishedAt: new Date(item.pubDate),
          summary: item.contentSnippet ? item.contentSnippet.substring(0, 100) + '...' : 'Market update from Google News aggregator.',
          url: item.link,
          sentiment: getSentiment(item.title)
        });
      }
    });
  } catch (e) {
    console.error("Google News RSS Error:", e.message);
  }

  // Sort by date desc
  allNews.sort((a, b) => b.publishedAt - a.publishedAt);
  
  // Deduplicate by title similarity (rough)
  const deduped = [];
  const seenTitles = new Set();
  
  allNews.forEach(item => {
    const canonicalTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenTitles.has(canonicalTitle)) {
      seenTitles.add(canonicalTitle);
      deduped.push(item);
    }
  });

  return deduped.slice(0, 10);
}
`;

code = code + '\n' + newsFunction;
fs.writeFileSync('scraper.js', code);
console.log("fetchNews added to scraper.js");
