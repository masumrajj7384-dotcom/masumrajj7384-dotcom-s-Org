import fs from 'fs';

// 1. Update scraper.js sentiment/category logic to include these categories
let scraperCode = fs.readFileSync('scraper.js', 'utf8');

const oldSentiment = `function getSentiment(title) {
  const t = title.toLowerCase();
  const bullish = ['beat', 'win', 'upgrade', 'jump', 'surge', 'soar', 'profit', 'dividend', 'deal', 'acquire', 'growth', 'up', 'high', 'boost', 'record', 'strong', 'positive', 'buy', 'target raised'];
  const bearish = ['miss', 'cut', 'downgrade', 'fall', 'plunge', 'loss', 'penalty', 'lawsuit', 'fine', 'down', 'low', 'drop', 'slump', 'weak', 'negative', 'sell', 'target cut', 'sebi', 'investigation', 'probe', 'resign', 'step down'];
  const marketMoving = ['merger', 'acquisition', 'm&a', 'ceo', 'cfo', 'management', 'strategic', 'stake', 'selloff', 'buyback'];
  
  if (marketMoving.some(w => t.includes(w))) return { label: 'Market Moving', icon: '⚡', class: 'tag-moving' };
  if (bullish.some(w => t.includes(w)) && !bearish.some(w => t.includes(w))) return { label: 'Bullish', icon: '🟢', class: 'tag-bullish' };
  if (bearish.some(w => t.includes(w))) return { label: 'Bearish', icon: '🔴', class: 'tag-bearish' };
  return { label: 'Neutral', icon: '🔵', class: 'tag-neutral' };
}`;

const newSentiment = `function getSentiment(title) {
  const t = title.toLowerCase();
  const bullish = ['beat', 'win', 'upgrade', 'jump', 'surge', 'soar', 'profit', 'dividend', 'growth', 'up', 'high', 'boost', 'record', 'strong', 'positive', 'target raised'];
  const bearish = ['miss', 'cut', 'downgrade', 'fall', 'plunge', 'loss', 'penalty', 'lawsuit', 'fine', 'down', 'low', 'drop', 'slump', 'weak', 'negative', 'target cut'];
  
  const earningsDeals = ['earnings', 'q1', 'q2', 'q3', 'q4', 'profit', 'revenue', 'deal', 'acquire', 'acquisition', 'merger', 'm&a', 'contract'];
  const regulatory = ['sebi', 'rbi', 'fines', 'penalty', 'lawsuit', 'court', 'disclosure', 'probe', 'investigation', 'compliance', 'regulatory'];
  const brokerage = ['upgrade', 'downgrade', 'target', 'brokerage', 'buy', 'sell', 'hold', 'rating', 'analyst', 'morgan', 'jefferies', 'nomura'];
  
  let category = 'Neutral';
  let categoryKey = 'all';
  if (earningsDeals.some(w => t.includes(w))) { category = 'Earnings & Deals'; categoryKey = 'earnings'; }
  else if (regulatory.some(w => t.includes(w))) { category = 'Regulatory & Disclosures'; categoryKey = 'regulatory'; }
  else if (brokerage.some(w => t.includes(w))) { category = 'Brokerage & Market'; categoryKey = 'brokerage'; }

  if (bullish.some(w => t.includes(w)) && !bearish.some(w => t.includes(w))) return { label: 'Bullish', category, categoryKey, icon: '🟢', class: 'tag-bullish' };
  if (bearish.some(w => t.includes(w))) return { label: 'Bearish', category, categoryKey, icon: '🔴', class: 'tag-bearish' };
  return { label: 'Market Moving', category, categoryKey, icon: '⚡', class: 'tag-moving' };
}`;

scraperCode = scraperCode.replace(oldSentiment, newSentiment);
fs.writeFileSync('scraper.js', scraperCode);

// 2. Update index.html
let htmlCode = fs.readFileSync('app/static/index.html', 'utf8');
const oldFilters = `<button class="news-filter-btn" data-filter="bullish">🟢 Bullish / Positive</button>
            <button class="news-filter-btn" data-filter="bearish">🔴 Bearish / Risk</button>
            <button class="news-filter-btn" data-filter="moving">⚡ Market Moving</button>`;
const newFilters = `<button class="news-filter-btn" data-filter="earnings">Earnings & Deals</button>
            <button class="news-filter-btn" data-filter="regulatory">Regulatory & Disclosures</button>
            <button class="news-filter-btn" data-filter="brokerage">Brokerage & Market</button>`;
htmlCode = htmlCode.replace(oldFilters, newFilters);
fs.writeFileSync('app/static/index.html', htmlCode);

// 3. Update app.js
let jsCode = fs.readFileSync('app/static/app.js', 'utf8');
const oldJsFilter = `const filtered = currentNewsData.filter(item => {
        if (filter === 'bullish') return item.sentiment.label === 'Bullish';
        if (filter === 'bearish') return item.sentiment.label === 'Bearish';
        if (filter === 'moving') return item.sentiment.label === 'Market Moving';
        return true;
      });`;
const newJsFilter = `const filtered = currentNewsData.filter(item => {
        return item.sentiment.categoryKey === filter;
      });`;
jsCode = jsCode.replace(oldJsFilter, newJsFilter);
fs.writeFileSync('app/static/app.js', jsCode);

console.log("filters patched");
