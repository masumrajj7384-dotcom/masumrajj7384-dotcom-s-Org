import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

// Add Cache Objects
const cacheHeader = `
const companyCache = {};
const newsCache = {};

function isToday(dateStr) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
}
`;

code = code.replace("const axiosInstance = axios.create({", cacheHeader + "\nconst axiosInstance = axios.create({");

// Update fetchFullData signature
code = code.replace("export async function fetchFullData(ticker) {", "export async function fetchFullData(ticker, force = false) {");

// Inject Cache Check in fetchFullData after YF fetch
const yfCatchEnd = `  } catch (e) {}`;
const cacheCheck = `  } catch (e) {}

  if (!force && companyCache[cleanTicker] && isToday(companyCache[cleanTicker].lastFetch)) {
    console.log(\`Serving \${cleanTicker} from cache (Synced Today)\`);
    const cachedData = companyCache[cleanTicker].data;
    // ensure live yahoo finance data is always updated
    cachedData.yahoo_finance = yfData;
    cachedData.sync_status = {
      is_live: true,
      last_sync: companyCache[cleanTicker].lastFetch
    };
    return cachedData;
  }
`;
code = code.replace(yfCatchEnd, cacheCheck);

// Save to Cache at end of fetchFullData
const returnObj = `  return {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [] 
  };`;
const cacheSave = `  const finalData = {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [],
    sync_status: {
      is_live: true,
      last_sync: new Date().toISOString()
    }
  };
  companyCache[cleanTicker] = {
    data: finalData,
    lastFetch: new Date().toISOString()
  };
  return finalData;`;
code = code.replace(returnObj, cacheSave);

// Update fetchNews
code = code.replace("export async function fetchNews(ticker, companyName) {", "export async function fetchNews(ticker, companyName, force = false) {");

const newsStart = `  let allNews = [];`;
const newsCacheCheck = `  let allNews = [];
  const cacheKey = ticker.trim();
  const now = new Date();
  if (!force && newsCache[cacheKey]) {
    const diffMins = (now - new Date(newsCache[cacheKey].lastFetch)) / (1000 * 60);
    if (diffMins < 30) {
      console.log(\`Serving News for \${cacheKey} from cache\`);
      return newsCache[cacheKey].data;
    }
  }`;
code = code.replace(newsStart, newsCacheCheck);

// Filter older than 48 hours and save to cache
const newsReturn = `  return deduped.slice(0, 10);`;
const newsCacheSave = `  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const finalNews = deduped.filter(n => n.publishedAt >= twoDaysAgo).slice(0, 10);
  
  newsCache[cacheKey] = {
    data: finalNews,
    lastFetch: now.toISOString()
  };
  return finalNews;`;
code = code.replace(newsReturn, newsCacheSave);

fs.writeFileSync('scraper.js', code);
console.log("scraper.js patched for caching");
