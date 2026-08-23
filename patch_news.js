import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const oldRegex = /export async function fetchNews.*?return finalNews;\n}/s;

const newBlock = `export async function fetchNews(ticker, companyName, force = false) {
  let allNews = [];
  const cacheKey = ticker.trim();
  const now = new Date();
  
  // 5-minute cache TTL
  if (!force && newsCache[cacheKey]) {
    const diffMins = (now - new Date(newsCache[cacheKey].lastFetch)) / (1000 * 60);
    if (diffMins < 5) {
      console.log(\`Serving News for \${cacheKey} from cache\`);
      return newsCache[cacheKey].data;
    }
  }
  
  // 1. Google News RSS (Robust live fetching)
  try {
    const gq = encodeURIComponent(companyName + ' stock OR finance OR earnings');
    const gUrl = \`https://news.google.com/rss/search?q=\${gq}&hl=en-IN&gl=IN&ceid=IN:en\`;
    const feed = await rssParser.parseURL(gUrl);
    
    feed.items.forEach(item => {
      let rawTitle = item.title || '';
      let sourceName = 'Google News';
      
      // Google News often appends the publisher at the end like "Title - Publisher"
      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        sourceName = parts.pop().trim();
        rawTitle = parts.join(' - ').trim();
      }
      
      allNews.push({
        title: rawTitle,
        source: getSource(item.link, rawTitle, sourceName),
        publishedAt: item.pubDate ? new Date(item.pubDate) : now,
        summary: item.contentSnippet ? item.contentSnippet.substring(0, 120) + '...' : 'Market update from Google News aggregator.',
        url: item.link,
        sentiment: getSentiment(rawTitle)
      });
    });
  } catch (e) {
    console.error("Google News RSS Error:", e.message);
  }

  // 2. Yahoo Finance News (Supplementary fallback)
  try {
    const yfUrl = \`https://query2.finance.yahoo.com/v1/finance/search?q=\${encodeURIComponent(ticker + '.NS')}&quotesCount=0&newsCount=5\`;
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

  // Sort by date desc
  allNews.sort((a, b) => b.publishedAt - a.publishedAt);
  
  // Deduplicate by title similarity
  const deduped = [];
  const seenTitles = new Set();
  
  allNews.forEach(item => {
    const canonicalTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenTitles.has(canonicalTitle)) {
      seenTitles.add(canonicalTitle);
      deduped.push(item);
    }
  });

  // Take top 15 most recent without strict 2-day cutoff (ensures we always have news)
  const finalNews = deduped.slice(0, 15);
  
  newsCache[cacheKey] = {
    data: finalNews,
    lastFetch: now.toISOString()
  };

  return finalNews;
}`;

js = js.replace(oldRegex, newBlock);
fs.writeFileSync('scraper.js', js);
console.log("Patched fetchNews successfully");
