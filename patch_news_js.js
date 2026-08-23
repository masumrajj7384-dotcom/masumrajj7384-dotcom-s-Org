import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const newsLogic = `
// FINANCIAL NEWS RENDERER
let currentNewsData = [];

function getRelativeTime(date) {
  const diffInMs = new Date() - new Date(date);
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return \`\${diffInHours} hour\${diffInHours > 1 ? 's' : ''} ago\`;
  if (diffInDays === 1) return 'Yesterday';
  return \`\${diffInDays} day\${diffInDays > 1 ? 's' : ''} ago\`;
}

function renderNews(newsItems) {
  const container = document.getElementById('news-feed-container');
  if (!newsItems || newsItems.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);">No recent market-moving news found.</p>';
    return;
  }
  
  let html = '';
  newsItems.forEach(item => {
    html += \`
      <div class="news-card">
        <div class="news-card-header">
          <span class="news-source-badge \${item.source.class}">\${item.source.name}</span>
          <span class="news-time">\${getRelativeTime(item.publishedAt)}</span>
        </div>
        <h4 class="news-headline"><a href="\${item.url}" target="_blank" rel="noopener noreferrer">\${item.title}</a></h4>
        <p class="news-summary">\${item.summary}</p>
        <div class="news-sentiment \${item.sentiment.class}">
          \${item.sentiment.icon} \${item.sentiment.label}
        </div>
      </div>
    \`;
  });
  
  container.innerHTML = html;
}

async function fetchAndRenderNews(ticker, companyName) {
  const container = document.getElementById('news-feed-container');
  container.innerHTML = \`
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
  \`;
  
  try {
    const res = await fetch(\`/api/news?ticker=\${encodeURIComponent(ticker)}&name=\${encodeURIComponent(companyName)}\`);
    const data = await res.json();
    currentNewsData = data;
    renderNews(data);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    container.innerHTML = '<p style="color:var(--accent-rose);">Failed to load news feeds.</p>';
  }
}

document.querySelectorAll('.news-filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const filter = e.target.dataset.filter;
    if (filter === 'all') {
      renderNews(currentNewsData);
    } else {
      const filtered = currentNewsData.filter(item => {
        if (filter === 'bullish') return item.sentiment.label === 'Bullish';
        if (filter === 'bearish') return item.sentiment.label === 'Bearish';
        if (filter === 'moving') return item.sentiment.label === 'Market Moving';
        return true;
      });
      renderNews(filtered);
    }
  });
});
`;

code = code + '\n' + newsLogic;

// Find where search is handled and inject fetchAndRenderNews
const targetSearch = `      processScreenerData();
      renderAllTabs();
      showDashboard();
    } else {`;
    
const replacementSearch = `      processScreenerData();
      renderAllTabs();
      showDashboard();
      fetchAndRenderNews(companyData.ticker || companyName.split(' ')[0], companyData.company_name || companyName);
    } else {`;
    
code = code.replace(targetSearch, replacementSearch);

fs.writeFileSync('app/static/app.js', code);
console.log("news js patched");
