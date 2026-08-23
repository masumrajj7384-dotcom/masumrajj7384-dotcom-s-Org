import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

// Update fetchCompanyData
const oldFetchCompanyData = `async function fetchCompanyData(ticker) {
  // Toggle states
  document.getElementById('welcome-state').classList.add('hidden');
  document.getElementById('dashboard-content').classList.add('hidden');
  document.getElementById('error-state').classList.add('hidden');
  document.getElementById('loading-state').classList.remove('hidden');
  
  try {
    const response = await fetch(\`/api/company?ticker=\${encodeURIComponent(ticker)}\`);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || \`HTTP error! status: \${response.status}\`);
    }
    
    companyData = await response.json();
    console.log("Successfully fetched company data:", companyData);
    
    renderDashboard();
  } catch (error) {
    console.error("Fetch failed:", error);
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-message').textContent = error.message || "Failed to load company data. Please try again.";
    document.getElementById('error-state').classList.remove('hidden');
  }
}`;

const newFetchCompanyData = `window.forceSyncData = async function() {
  if (!companyData || !companyData.ticker) return;
  const btn = document.getElementById('force-sync-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Syncing...';
  btn.style.opacity = '0.7';
  btn.disabled = true;
  
  // Clear DOM to prevent stale state bugs
  document.getElementById('news-feed-container').innerHTML = '';
  document.getElementById('statement-table').querySelector('thead').innerHTML = '';
  document.getElementById('statement-table').querySelector('tbody').innerHTML = '';
  document.getElementById('mc-balance-sheet').innerHTML = 'Loading...';
  document.getElementById('mc-profit-loss').innerHTML = 'Loading...';
  document.getElementById('gf-market-data').innerHTML = 'Loading...';
  document.getElementById('yf-market-data').innerHTML = 'Loading...';

  await fetchCompanyData(companyData.ticker, true);
  
  btn.innerHTML = originalText;
  btn.style.opacity = '1';
  btn.disabled = false;
};

async function fetchCompanyData(ticker, force = false) {
  // Toggle states
  document.getElementById('welcome-state').classList.add('hidden');
  document.getElementById('dashboard-content').classList.add('hidden');
  document.getElementById('error-state').classList.add('hidden');
  document.getElementById('loading-state').classList.remove('hidden');
  
  try {
    const url = force ? \`/api/company?ticker=\${encodeURIComponent(ticker)}&force=true\` : \`/api/company?ticker=\${encodeURIComponent(ticker)}\`;
    const response = await fetch(url);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || \`HTTP error! status: \${response.status}\`);
    }
    
    companyData = await response.json();
    console.log("Successfully fetched company data:", companyData);
    
    // Update Sync Badge
    const syncTimeEl = document.getElementById('sync-time');
    if (syncTimeEl) {
      let syncDate;
      if (companyData.sync_status && companyData.sync_status.last_sync) {
        syncDate = new Date(companyData.sync_status.last_sync);
      } else {
        syncDate = new Date();
      }
      const dateStr = syncDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = syncDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      syncTimeEl.textContent = \`\${dateStr} | \${timeStr}\`;
    }
    
    // Set global force flag so renderDashboard uses it
    window.currentForceFlag = force;
    
    renderDashboard();
  } catch (error) {
    console.error("Fetch failed:", error);
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-message').textContent = error.message || "Failed to load company data. Please try again.";
    document.getElementById('error-state').classList.remove('hidden');
  }
}`;
code = code.replace(oldFetchCompanyData, newFetchCompanyData);

// Update renderDashboard to pass force
code = code.replace(
  "fetchAndRenderNews(companyData.ticker, companyData.company_name);",
  "fetchAndRenderNews(companyData.ticker, companyData.company_name, window.currentForceFlag || false);"
);

// Update fetchAndRenderNews
const oldFetchNews = `async function fetchAndRenderNews(ticker, companyName) {
  const container = document.getElementById('news-feed-container');
  container.innerHTML = \`
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
  \`;
  
  try {
    const res = await fetch(\`/api/news?ticker=\${encodeURIComponent(ticker)}&name=\${encodeURIComponent(companyName)}\`);`;
const newFetchNews = `async function fetchAndRenderNews(ticker, companyName, force = false) {
  const container = document.getElementById('news-feed-container');
  container.innerHTML = \`
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
  \`;
  
  try {
    const newsUrl = force ? \`/api/news?ticker=\${encodeURIComponent(ticker)}&name=\${encodeURIComponent(companyName)}&force=true\` : \`/api/news?ticker=\${encodeURIComponent(ticker)}&name=\${encodeURIComponent(companyName)}\`;
    const res = await fetch(newsUrl);`;
code = code.replace(oldFetchNews, newFetchNews);

fs.writeFileSync('app/static/app.js', code);
console.log("app.js patched for sync");
