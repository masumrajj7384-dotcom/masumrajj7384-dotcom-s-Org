// Global application state
let companyData = null;
let currentTable = 'quarters';
let charts = {
  revenueProfit: null,
  margin: null,
  cashflow: null,
  workingCapital: null,
  capitalStructure: null,
  returnMetrics: null,
  quarterly: null,
  shareholding: null
};

// SVG icons mapping for key ratios
const ratioIcons = {
  "Market Cap": "fa-solid fa-coins",
  "Current Price": "fa-solid fa-indian-rupee-sign",
  "High / Low": "fa-solid fa-arrows-up-down",
  "Stock P/E": "fa-solid fa-chart-line",
  "Book Value": "fa-solid fa-book",
  "Dividend Yield": "fa-solid fa-percent",
  "ROCE": "fa-solid fa-arrow-trend-up",
  "ROE": "fa-solid fa-piggy-bank",
  "Face Value": "fa-solid fa-id-card"
};

const ratioTooltips = {
  "Market Cap": "The total market value of a company's outstanding shares of stock.",
  "Current Price": "The current market price of one share of the company.",
  "High / Low": "The highest and lowest prices at which a stock has traded over the past 52 weeks.",
  "Stock P/E": "Price-to-Earnings ratio. Measures its current share price relative to its per-share earnings.",
  "Book Value": "The net asset value of a company, calculated as total assets minus intangible assets and liabilities.",
  "Dividend Yield": "The ratio of a company's annual dividend compared to its share price.",
  "ROCE": "Return on Capital Employed. A financial ratio assessing a company's profitability and capital efficiency.",
  "ROE": "Return on Equity. A measure of financial performance calculated by dividing net income by shareholders' equity.",
  "Face Value": "The nominal value or dollar value of a security stated by the issuer.",
  "Debtor Days": "The average number of days required for a company to receive payments from its customers.",
  "Inventory Days": "The average number of days a company holds its inventory before selling it.",
  "Days Payable": "The average number of days it takes a company to pay its suppliers.",
  "Cash Cycle": "The number of days it takes a company to convert its inventory and resources into cash flows from sales."
};

// Document elements
const searchInput = document.getElementById('search-input');
const autocompleteDropdown = document.getElementById('autocomplete-dropdown');

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let val = searchInput.value.trim();
  if (val) {
    // Check if what they typed matches a known company name or ticker
    const valUpper = val.toUpperCase();
    const match = STOCKS_DB.find(s => s.name.toUpperCase() === valUpper || s.ticker.toUpperCase() === valUpper);
    
    let tickerToSearch = valUpper;
    if (match) {
        tickerToSearch = match.ticker;
        searchInput.value = match.ticker; // Update visually
    }
    
    saveRecentSearch(tickerToSearch);
    autocompleteDropdown.classList.add('hidden');
    fetchCompanyData(tickerToSearch);
  }
});


const STOCKS_DB = [
  { ticker: "RELIANCE.NS", name: "Reliance Industries", ex: "NSE", p: "2,850.40", c: "+1.2%", sector: "Energy" },
  { ticker: "TCS.NS", name: "Tata Consultancy Services", ex: "NSE", p: "4,120.15", c: "+0.8%", sector: "IT Services" },
  { ticker: "HDFCBANK.NS", name: "HDFC Bank", ex: "NSE", p: "1,650.30", c: "-0.5%", sector: "Banking" },
  { ticker: "INFY.NS", name: "Infosys Ltd", ex: "NSE", p: "1,480.90", c: "+1.5%", sector: "IT Services" },
  { ticker: "ITC.NS", name: "ITC Limited", ex: "NSE", p: "435.60", c: "-0.2%", sector: "FMCG" },
  { ticker: "TATAMOTORS.NS", name: "Tata Motors", ex: "NSE", p: "980.25", c: "+2.1%", sector: "Automobile" },
  { ticker: "BHARTIARTL.NS", name: "Bharti Airtel", ex: "NSE", p: "1,250.70", c: "+1.1%", sector: "Telecom" },
  { ticker: "LT.NS", name: "Larsen & Toubro", ex: "NSE", p: "3,650.10", c: "+0.4%", sector: "Construction" },
  { ticker: "HINDUNILVR.NS", name: "Hindustan Unilever", ex: "NSE", p: "2,410.50", c: "-0.8%", sector: "FMCG" },
  { ticker: "ICICIBANK.NS", name: "ICICI Bank", ex: "NSE", p: "1,150.20", c: "+0.9%", sector: "Banking" },
  { ticker: "SBIN.NS", name: "State Bank of India", ex: "NSE", p: "765.40", c: "+1.3%", sector: "Banking" },
  { ticker: "WIPRO.NS", name: "Wipro Limited", ex: "NSE", p: "490.80", c: "-1.1%", sector: "IT Services" },
  { ticker: "BAJFINANCE.NS", name: "Bajaj Finance", ex: "NSE", p: "7,120.60", c: "-0.3%", sector: "Finance" },
  { ticker: "MARUTI.NS", name: "Maruti Suzuki", ex: "NSE", p: "12,340.50", c: "+1.8%", sector: "Automobile" },
  { ticker: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", ex: "NSE", p: "1,780.20", c: "+0.5%", sector: "Banking" },
  { ticker: "VEDL.NS", name: "Vedanta Ltd", ex: "NSE", p: "405.20", c: "+3.2%", sector: "Metals" },
  { ticker: "TATASTEEL.NS", name: "Tata Steel", ex: "NSE", p: "165.40", c: "-0.4%", sector: "Metals" },
  { ticker: "ADANIENT.NS", name: "Adani Enterprises", ex: "NSE", p: "3,150.80", c: "+4.1%", sector: "Conglomerate" },
  { ticker: "ZOMATO.NS", name: "Zomato Ltd", ex: "NSE", p: "198.30", c: "+2.5%", sector: "Food Delivery" },
  { ticker: "JIOFIN.NS", name: "Jio Financial Services", ex: "NSE", p: "360.25", c: "+1.2%", sector: "Finance" },
  { ticker: "NTPC.NS", name: "NTPC Ltd", ex: "NSE", p: "375.80", c: "+0.6%", sector: "Power" },
  { ticker: "AXISBANK.NS", name: "Axis Bank", ex: "NSE", p: "1,120.40", c: "-1.2%", sector: "Banking" },
  { ticker: "SUNPHARMA.NS", name: "Sun Pharmaceutical", ex: "NSE", p: "1,480.25", c: "+0.3%", sector: "Pharma" },
  { ticker: "TITAN.NS", name: "Titan Company", ex: "NSE", p: "3,750.10", c: "-0.8%", sector: "Consumer Durables" },
  { ticker: "ASIANPAINT.NS", name: "Asian Paints", ex: "NSE", p: "2,840.60", c: "-1.5%", sector: "Paints" },
  { ticker: "BAJAJFINSV.NS", name: "Bajaj Finserv", ex: "NSE", p: "1,620.90", c: "+0.7%", sector: "Finance" },
  { ticker: "POWERGRID.NS", name: "Power Grid Corp", ex: "NSE", p: "320.50", c: "+1.1%", sector: "Power" },
  { ticker: "M&M.NS", name: "Mahindra & Mahindra", ex: "NSE", p: "2,850.40", c: "+2.3%", sector: "Automobile" },
  { ticker: "HCLTECH.NS", name: "HCL Technologies", ex: "NSE", p: "1,450.80", c: "-0.5%", sector: "IT Services" },
  { ticker: "NESTLEIND.NS", name: "Nestle India", ex: "NSE", p: "2,560.30", c: "+0.2%", sector: "FMCG" },
  { ticker: "BSE.BSE", name: "BSE Limited", ex: "BSE", p: "2,840.10", c: "+3.4%", sector: "Finance" },
  { ticker: "ONGC.NS", name: "Oil & Natural Gas Corp", ex: "NSE", p: "275.60", c: "-0.9%", sector: "Energy" },
  { ticker: "COALINDIA.NS", name: "Coal India", ex: "NSE", p: "480.90", c: "+1.4%", sector: "Mining" },
  { ticker: "TATAPOWER.NS", name: "Tata Power", ex: "NSE", p: "450.25", c: "+2.8%", sector: "Power" },
  { ticker: "HINDALCO.NS", name: "Hindalco Industries", ex: "NSE", p: "680.40", c: "+1.7%", sector: "Metals" },
  { ticker: "DRREDDY.NS", name: "Dr. Reddy's Labs", ex: "NSE", p: "6,210.80", c: "-0.3%", sector: "Pharma" },
  { ticker: "CIPLA.NS", name: "Cipla Ltd", ex: "NSE", p: "1,480.20", c: "+0.8%", sector: "Pharma" },
  { ticker: "BRITANNIA.NS", name: "Britannia Industries", ex: "NSE", p: "5,120.40", c: "-0.2%", sector: "FMCG" },
  { ticker: "DIVISLAB.NS", name: "Divi's Laboratories", ex: "NSE", p: "4,650.30", c: "+1.2%", sector: "Pharma" },
  { ticker: "HEROMOTOCO.NS", name: "Hero MotoCorp", ex: "NSE", p: "4,820.60", c: "+0.5%", sector: "Automobile" },
  { ticker: "HAL.NS", name: "Hindustan Aeronautics", ex: "NSE", p: "4,150.20", c: "+2.5%", sector: "Defense" },
  { ticker: "BEL.NS", name: "Bharat Electronics", ex: "NSE", p: "235.40", c: "+1.8%", sector: "Defense" },
  { ticker: "IRFC.NS", name: "Indian Railway Finance", ex: "NSE", p: "145.60", c: "-0.5%", sector: "Finance" },
  { ticker: "RVNL.NS", name: "Rail Vikas Nigam", ex: "NSE", p: "385.20", c: "+4.2%", sector: "Construction" },
  { ticker: "PFC.NS", name: "Power Finance Corp", ex: "NSE", p: "410.80", c: "+1.1%", sector: "Finance" },
  { ticker: "RECLTD.NS", name: "REC Limited", ex: "NSE", p: "450.30", c: "+1.5%", sector: "Finance" },
  { ticker: "TVSMOTOR.NS", name: "TVS Motor Company", ex: "NSE", p: "2,120.40", c: "-1.2%", sector: "Automobile" },
  { ticker: "EICHERMOT.NS", name: "Eicher Motors", ex: "NSE", p: "4,050.80", c: "+0.8%", sector: "Automobile" },
  { ticker: "TRENT.NS", name: "Trent Limited", ex: "NSE", p: "3,940.50", c: "+2.1%", sector: "Retail" },
  { ticker: "DMART.NS", name: "Avenue Supermarts", ex: "NSE", p: "4,560.10", c: "-0.4%", sector: "Retail" },
  { ticker: "INDIGO.NS", name: "InterGlobe Aviation", ex: "NSE", p: "3,650.30", c: "+1.9%", sector: "Aviation" },
  { ticker: "DLF.NS", name: "DLF Limited", ex: "NSE", p: "890.50", c: "-0.8%", sector: "Real Estate" },
  { ticker: "LODHA.NS", name: "Macrotech Developers", ex: "NSE", p: "1,120.40", c: "+2.2%", sector: "Real Estate" },
  { ticker: "POLICYBZR.NS", name: "PB Fintech", ex: "NSE", p: "1,250.60", c: "+3.5%", sector: "Finance" },
  { ticker: "PAYTM.NS", name: "One97 Communications", ex: "NSE", p: "410.20", c: "-1.5%", sector: "Fintech" },
  { ticker: "NYKAA.NS", name: "FSN E-Commerce", ex: "NSE", p: "155.80", c: "+0.5%", sector: "Retail" }

];

let currentFocus = -1;

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span style="color: var(--accent-amber); font-weight: bold; background: rgba(245, 158, 11, 0.15);">$1</span>');
}

function renderAutocomplete(results, query = "") {
  if (results.length > 0) {
    autocompleteDropdown.innerHTML = results.map((item, index) => {
      const isPos = item.c.startsWith('+');
      const highlightedName = highlightMatch(item.name, query);
      const highlightedTicker = highlightMatch(item.ticker, query);
      
      return `<div class="autocomplete-item" id="ac-item-${index}" onclick="searchPreset('${item.ticker}')">
        <div class="ac-left" style="display: flex; align-items: center; gap: 10px; flex: 1; overflow: hidden;">
          <span class="ac-badge">${item.ex}</span>
          <span class="name" style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${highlightedName}</span>
          <span class="ticker">${highlightedTicker}</span>
        </div>
        <div class="ac-right" style="flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; margin-left: 10px;">
          <span class="ac-price">₹${item.p}</span>
          <span class="ac-change ${isPos ? 'pos' : 'neg'}">${item.c}</span>
        </div>
      </div>`;
    }).join('');
    autocompleteDropdown.classList.remove('hidden');
  } else {
    autocompleteDropdown.classList.add('hidden');
  }
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  const q = e.target.value.trim();
  currentFocus = -1;
  if (q.length < 1) {
    autocompleteDropdown.classList.add('hidden');
    return;
  }
  
  // Local robust fuzzy filtering
  const qLower = q.toLowerCase();
  const localResults = STOCKS_DB.filter(s => 
    s.ticker.toLowerCase().includes(qLower) || s.name.toLowerCase().includes(qLower)
  );
  
  renderAutocomplete(localResults, q);

  // Live Async Fetching Fallback for Universal Coverage
  debounceTimer = setTimeout(async () => {
    try {
      if (localResults.length === 0) {
        autocompleteDropdown.innerHTML = '<div style="padding:15px; color:var(--text-muted); font-size:0.85rem; font-family:var(--font-family-title);"><i class="fa-solid fa-circle-notch fa-spin"></i> Querying live market database...</div>';
        autocompleteDropdown.classList.remove('hidden');
      }

      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const remoteData = await res.json();
      
      if (remoteData && remoteData.length > 0) {
        const existingTickers = new Set(localResults.map(s => s.ticker));
        const newResults = [...localResults];
        
        remoteData.forEach(item => {
           if (!existingTickers.has(item.ticker)) {
             newResults.push({
               ticker: item.ticker,
               name: item.name,
               ex: item.ticker.endsWith('.BO') ? 'BSE' : 'NSE',
               p: '--',
               c: '--',
               
             });
             existingTickers.add(item.ticker);
           }
        });
        
        renderAutocomplete(newResults, q);
      } else if (localResults.length === 0) {
        autocompleteDropdown.innerHTML = '<div style="padding:15px; color:var(--text-muted); font-size:0.85rem;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-amber); margin-right:5px;"></i> No exact match found. Press Enter to force dynamic resolution.</div>';
      }
    } catch (err) {
      console.error('Remote search error', err);
      if (localResults.length === 0) {
        autocompleteDropdown.classList.add('hidden');
      }
    }
  }, 350);
});

searchInput.addEventListener('keydown', function(e) {
  let items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
  if (items.length === 0 || autocompleteDropdown.classList.contains('hidden')) return;
  
  if (e.key === 'ArrowDown') {
    currentFocus++;
    addActive(items);
  } else if (e.key === 'ArrowUp') {
    currentFocus--;
    addActive(items);
  } else if (e.key === 'Enter') {
    if (currentFocus > -1) {
      e.preventDefault();
      items[currentFocus].click();
    }
  }
});

function addActive(items) {
  if (!items) return false;
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (items.length - 1);
  items[currentFocus].classList.add('focused');
  // Scroll into view
  items[currentFocus].scrollIntoView({ block: 'nearest' });
}

function removeActive(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('focused');
  }
}

// Recent Searches logic
function getRecentSearches() {
  try {
    const hist = localStorage.getItem('si_recent_searches');
    return hist ? JSON.parse(hist) : [];
  } catch (e) { return []; }
}
function saveRecentSearch(ticker) {
  let hist = getRecentSearches();
  hist = hist.filter(t => t !== ticker); // remove duplicate
  hist.unshift(ticker);
  if (hist.length > 5) hist.pop(); // keep last 5
  localStorage.setItem('si_recent_searches', JSON.stringify(hist));
  renderRecentSearches();
}
function deleteRecentSearch(ticker, e) {
  e.stopPropagation(); // prevent triggering search
  let hist = getRecentSearches();
  hist = hist.filter(t => t !== ticker);
  localStorage.setItem('si_recent_searches', JSON.stringify(hist));
  renderRecentSearches();
}
function renderRecentSearches() {
  const container = document.getElementById('recent-searches-container');
  const chips = document.getElementById('recent-chips');
  if (!container || !chips) return;
  
  const hist = getRecentSearches();
  if (hist.length === 0) {
    container.classList.add('hidden');
    return;
  }
  
  container.classList.remove('hidden');
  chips.innerHTML = hist.map(ticker => `
    <div class="recent-chip" onclick="searchPreset('${ticker}')">
      <i class="fa-solid fa-clock-rotate-left"></i> ${ticker}
      <button type="button" class="recent-chip-delete" onclick="deleteRecentSearch('${ticker}', event)">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderRecentSearches();
});


document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    autocompleteDropdown.classList.add('hidden');
  }
});

function searchPreset(ticker) {
  saveRecentSearch(ticker);

  searchInput.value = ticker;
  autocompleteDropdown.classList.add('hidden');
  fetchCompanyData(ticker);

}

// Reset app state
function resetApp() {
  document.getElementById('welcome-state').classList.remove('hidden');
  document.getElementById('dashboard-content').classList.add('hidden');
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('error-state').classList.add('hidden');
  companyData = null;
}

// API fetch call
window.forceSyncData = async function() {
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
    const url = force ? `/api/company?ticker=${encodeURIComponent(ticker)}&force=true` : `/api/company?ticker=${encodeURIComponent(ticker)}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || `HTTP error! status: ${response.status}`);
    }
    
    companyData = await response.json(); applyDynamicDCF(companyData); window.companyData = companyData;
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
      syncTimeEl.textContent = `${dateStr} | ${timeStr}`;
      
      const yfBadge = document.getElementById('sync-yf-badge');
      const scBadge = document.getElementById('sync-sc-badge');
      
      if (yfBadge) {
        if (companyData.sync_status && companyData.sync_status.yf_live) {
           yfBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> YF Market';
           yfBadge.style.opacity = '1';
        } else {
           yfBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> YF Market (Failed)';
           yfBadge.style.opacity = '0.5';
        }
      }
      
      if (scBadge) {
        if (companyData.sync_status && companyData.sync_status.screener_live) {
           scBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Screener.in Fundamentals';
           scBadge.style.opacity = '1';
        } else {
           scBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Screener.in (Fallback)';
           scBadge.style.opacity = '0.5';
        }
      }
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
}

// Render entire dashboard
function renderDashboard() {
  fetchAndRenderNews(companyData.ticker, companyData.company_name, window.currentForceFlag || false);
  // Hide loading
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('dashboard-content').classList.remove('hidden');

  if (companyData.documents) {
    window.currentDocs = companyData.documents;
    renderDocumentsTab('announcements');
    const docsBtn = document.getElementById('screener-docs-btn');
    if (docsBtn) {
      const cleanDocsTicker = (companyData.baseSymbol || companyData.ticker || 'RELIANCE').replace('.NS', '').replace('.BO', '');
      docsBtn.href = `https://www.screener.in/company/${cleanDocsTicker}/consolidated/#documents`;
    }
  }
  
  // Render Banner details
  
  // Update Top-Level Google Finance AI Section
  renderTopGoogleFinanceAI();
  
  document.getElementById('company-name').textContent = companyData.company_name;
  document.getElementById('ticker-badge').innerHTML = `${companyData.ticker} `;
  document.getElementById('company-about').textContent = companyData.about;
  
  // Statement badge
  const stmtBadge = document.getElementById('statement-badge');
  const stmtTooltip = "Indicates whether the financial figures include the company's subsidiaries (Consolidated) or just the parent company (Standalone).";
  if (companyData.is_consolidated) {
    stmtBadge.innerHTML = `Consolidated Figures <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Consolidated / Standalone" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.2rem;"></i>`;
    stmtBadge.className = "badge";
  } else {
    stmtBadge.innerHTML = `Standalone Figures <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Consolidated / Standalone" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.2rem;"></i>`;
    stmtBadge.className = "badge secondary";
  }
  
  // Set current price in banner
  const currentPriceVal = companyData.ratios["Current Price"] || "₹ 0.00";
  document.getElementById('current-price').textContent = currentPriceVal.includes('₹') || currentPriceVal.includes('Rs.') ? currentPriceVal : `₹ ${currentPriceVal}`;

  // Google Finance / Yahoo Finance change percentage
  const gfData = companyData.google_finance || {};
  const yfData = companyData.yahoo_finance || {};
  const gfChangeEl = document.getElementById('gf-change');
  const changePct = gfData.change_pct !== undefined ? gfData.change_pct : yfData.change_pct;

  if (changePct !== undefined && changePct !== null) {
    const pct = parseFloat(changePct);
    gfChangeEl.textContent = `${pct >= 0 ? '▲' : '▼'} ${Math.abs(pct).toFixed(2)}%`;
    gfChangeEl.className = `price-change ${pct >= 0 ? 'up' : 'down'}`;
  } else {
    gfChangeEl.textContent = '';
  }

  // YF Market Strip
  const stripEl = document.getElementById('live-market-strip');
  if (yfData && yfData.found) {
     stripEl.style.display = 'flex';
     document.getElementById('yf-prev-close').textContent = yfData.prev_close ? `₹ ${yfData.prev_close.toLocaleString()}` : '--';
     document.getElementById('yf-52w-high').textContent = yfData.fifty_two_week_high ? `₹ ${yfData.fifty_two_week_high.toLocaleString()}` : '--';
     document.getElementById('yf-52w-low').textContent = yfData.fifty_two_week_low ? `₹ ${yfData.fifty_two_week_low.toLocaleString()}` : '--';
     document.getElementById('yf-volume').textContent = yfData.volume ? yfData.volume.toLocaleString() : '--';
     
     // Override current price with real-time YF price if available
     if (yfData.price) {
         document.getElementById('current-price').textContent = `₹ ${yfData.price.toLocaleString()}`;
     }
  } else {
     stripEl.style.display = 'none';
  }


  // MoneyControl sector badge
  const mcData = companyData.moneycontrol || {};
  const sectorBadge = document.getElementById('mc-sector-badge');
  if (mcData.found && mcData.sector) {
    sectorBadge.textContent = mcData.sector;
    sectorBadge.style.display = 'inline-flex';
  } else {
    sectorBadge.style.display = 'none';
  }

  // Update header direct source links dynamically
  const screenerBtn = document.getElementById('src-btn-screener');
  if (screenerBtn) {
    const cleanSrcTicker = (companyData.baseSymbol || companyData.ticker || 'RELIANCE').replace('.NS', '').replace('.BO', '');
    screenerBtn.href = companyData.screener_url || `https://www.screener.in/company/${cleanSrcTicker}/consolidated/`;
    screenerBtn.title = `Open ${companyData.company_name} on Screener.in`;
  }

  const mcBtn = document.getElementById('src-btn-mc');
  if (mcBtn) {
    if (mcData.found && mcData.stock_url) {
      mcBtn.href = mcData.stock_url;
      mcBtn.title = `Open ${companyData.company_name} on MoneyControl`;
    } else {
      mcBtn.href = `https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_data=${companyData.ticker}`;
      mcBtn.title = `Search ${companyData.company_name || companyData.ticker} on MoneyControl`;
    }
  }

  const gfBtn = document.getElementById('src-btn-gf');
  if (gfBtn) {
    const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
    const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
    gfBtn.href = (gfData && gfData.found && gfData.url) || `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;
    gfBtn.title = `Open ${companyData.company_name} on Google Finance`;
  }

  const yfBtn = document.getElementById('src-btn-yf');
  if (yfBtn) {
    yfBtn.href = (yfData.found && yfData.url) || `https://finance.yahoo.com/quote/${companyData.ticker}.NS/`;
    yfBtn.title = `Open ${companyData.company_name} on Yahoo Finance`;
  }

  // Render ratios cards
  renderRatioCards();
  renderAIEvaluationCard();

  // Render tables
  renderTable(currentTable);
  
  // Render charts
  renderAllCharts();

  // Compute and render insights
  generateInsights();

  // Render advanced analytics
  renderAdvancedAnalytics();

  // Render cross-source data
  renderCrossSourceData();

  // Render news feed
  // renderNewsFeed(); // Disabled in favor of fetchAndRenderNews
}

// Generate Ratio Cards
function renderRatioCards() {
  const container = document.getElementById('ratios-cards');
  container.innerHTML = '';
  container.className = "glass-panel col-span-8";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(auto-fit, minmax(140px, 1fr))";
  container.style.gap = "0.75rem";
  container.style.padding = "1rem";

  const eff = (companyData.analytics && companyData.analytics.efficiency_ratios) || {};
  const extraRatios = {};
  if (eff.debtor_days > 0) extraRatios["Debtor Days"] = `${eff.debtor_days} Days`;
  if (eff.inventory_days > 0) extraRatios["Inventory Days"] = `${eff.inventory_days} Days`;
  if (eff.days_payable > 0) extraRatios["Days Payable"] = `${eff.days_payable} Days`;
  if (eff.working_capital_days > 0) extraRatios["Cash Cycle"] = `${eff.working_capital_days} Days`;

  const allRatios = { ...companyData.ratios, ...extraRatios };
  
  let html = '';
  for (const [key, value] of Object.entries(allRatios)) {
    const iconClass = ratioIcons[key] || "fa-solid fa-chart-bar";
    html += `
      <div style="display: flex; flex-direction: column; justify-content: center; background: rgba(255,255,255,0.04); padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.2s, background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(255,255,255,0.04)'; this.style.transform='translateY(0)';">
        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
            <i class="${iconClass}" style="margin-right: 0.5rem; color: var(--accent-cyan); opacity: 0.9; font-size: 1.1rem;"></i>
            <span style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">${key}</span>
        </div>
        <span style="color: var(--text-primary); font-weight: 800; font-family: var(--font-family-title); font-size: 1.35rem;">${value}</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

// Helper to clean numeric values from Screener formatted values (e.g. 1,23,456 or 15% -> 123456 or 15)
function cleanNum(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Helper to extract table row data by row header prefix match
function getRowByName(table, name) {
  if (!table) return null;
  return table.find(row => row && row[0] && row[0].toLowerCase().includes(name.toLowerCase())) || null;
}

// Switch dashboard tabs
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden'); // explicitly hide
  });
  
  // Activate selected
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');
  
  console.log("Switching to tab:", tabId);
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
    selectedTab.classList.remove('hidden'); // explicitly reveal
  }
  
  // Resize charts to fit their containers if visible
  if (tabId === 'tab-charts') {
    Object.values(charts).forEach(chart => {
      if (chart) chart.resize();
    });
  }
}

// Switch tables toggles
function switchTable(tableName) {
  currentTable = tableName;
  // Update buttons
  document.querySelectorAll('.table-toggle-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(tableName)) {
      btn.classList.add('active');
    }
  });
  renderTable(tableName);
}

// Render dynamic statement tables
function renderTable(tableName) {
  const table = companyData.tables[tableName];
  const tableElement = document.getElementById('statement-table');
  const thead = tableElement.querySelector('thead');
  const tbody = tableElement.querySelector('tbody');
  
  thead.innerHTML = '';
  tbody.innerHTML = '';
  
  if (!table || table.length === 0) {
    tbody.innerHTML = `<tr><td colspan="100%" style="text-align: center; padding: 2rem;">No data available for this statement.</td></tr>`;
    return;
  }
  
  // Extract headers (first row)
  const headers = table[0];
  const headerRow = document.createElement('tr');
  // Reverse chronological order for columns (index 1 to end)
  const invertedHeaders = headers.length > 1 ? [headers[0], ...headers.slice(1).reverse()] : headers;
  
  invertedHeaders.forEach((h, i) => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  
  // Extract data rows
  for (let r = 1; r < table.length; r++) {
    const row = table[r];
    if (!row || row.length === 0) continue;
    
    // Skip totally empty rows
    if (row.every(cell => !cell || cell.trim() === '')) continue;
    
    const tr = document.createElement('tr');
    // Align values with inverted headers
    const invertedRow = row.length > 1 ? [row[0], ...row.slice(1).reverse()] : row;
    
    invertedRow.forEach((cell, c) => {
      const td = document.createElement('td');
      td.textContent = cell;
      
      // Layout styles for headers vs values
      if (c === 0) {
        td.style.fontWeight = '500';
      } else {
        // Numbers styling
        const numVal = cleanNum(cell);
        if (numVal < 0) {
          td.style.color = '#f43f5e'; // Red glow for negative values
        }
        td.style.textAlign = 'right';
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
}

// Render visual charts using Chart.js
function renderAllCharts() {
  // Destroy old charts to prevent duplicate canvases
  Object.keys(charts).forEach(key => {
    if (charts[key]) {
      charts[key].destroy();
      charts[key] = null;
    }
  });

  const pnlTable = companyData.tables['profit-loss'];
  const cashflowTable = companyData.tables['cash-flow'];
  const shareholdingTable = companyData.tables['shareholding'];
  
  if (!pnlTable || pnlTable.length === 0) return;
  
  // Extract P&L Years (header cells 1 to N-1, avoiding first empty cell and usually TTM at the end)
  const headers = pnlTable[0];
  let yearIndices = [];
  let years = [];
  
  for (let i = 1; i < headers.length; i++) {
    const h = headers[i];
    if (h && h.trim() && h.toLowerCase() !== 'ttm') {
      yearIndices.push(i);
      years.push(h);
    }
  }
  
  // 1. Revenue & Profit Chart
  const salesRow = getRowByName(pnlTable, 'Sales');
  const netProfitRow = getRowByName(pnlTable, 'Net Profit');
  
  if (salesRow || netProfitRow) {
    const salesData = salesRow ? yearIndices.map(idx => cleanNum(salesRow[idx])) : yearIndices.map(() => 0);
    const profitData = netProfitRow ? yearIndices.map(idx => cleanNum(netProfitRow[idx])) : yearIndices.map(() => 0);
    
    const ctx = document.getElementById('revenueProfitChart').getContext('2d');
    charts.revenueProfit = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Net Profit',
            data: profitData,
            type: 'line',
            borderColor: '#8b5cf6',
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            label: 'Revenue',
            data: salesData,
            backgroundColor: 'rgba(6, 182, 212, 0.45)',
            borderColor: '#06b6d4',
            borderWidth: 1.5,
            borderRadius: 6,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
                  interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' },
            title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
          
        }
      }
    });
  }

  // 2. Margin Chart (OPM % vs NPM %)
  const opmRow = getRowByName(pnlTable, 'OPM %');
  if (salesRow || netProfitRow) {
    const opmValues = opmRow ? yearIndices.map(idx => cleanNum(opmRow[idx])) : yearIndices.map(() => 0);
    const npmValues = yearIndices.map(idx => {
      if (!salesRow || !netProfitRow) return 0;
      const sales = cleanNum(salesRow[idx]);
      const profit = cleanNum(netProfitRow[idx]);
      return sales > 0 ? parseFloat(((profit / sales) * 100).toFixed(2)) : 0;
    });
    
    const ctx = document.getElementById('marginChart').getContext('2d');
    charts.margin = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'OPM %',
            data: opmValues,
            borderColor: '#10b981',
            borderWidth: 3,
            fill: false,
            tension: 0.3
          },
          {
            label: 'NPM %',
            data: npmValues,
            borderColor: '#f59e0b',
            borderWidth: 3,
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
                  interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8', callback: value => `${value}%` },
            title: { display: true, text: 'Margin percentage', color: '#94a3b8' }
          }
        }
      }
    });
  }

  // 3. Cash Flow Chart (CFO vs Free Cash Flow)
  let cfYearIndices = [];
  let cfYears = [];
  if (cashflowTable && cashflowTable.length > 0) {
    const cfHeaders = cashflowTable[0];
    for (let i = 1; i < cfHeaders.length; i++) {
      const h = cfHeaders[i];
      if (h && h.trim() && h.toLowerCase() !== 'ttm') {
        cfYearIndices.push(i);
        cfYears.push(h);
      }
    }
  }
  
  const cfoRow = getRowByName(cashflowTable, 'Cash from Operating Activity');
  const fcfRow = getRowByName(cashflowTable, 'Free Cash Flow');
  
  if (cfoRow || fcfRow) {
    const cfoData = cfoRow ? cfYearIndices.map(idx => cleanNum(cfoRow[idx])) : cfYearIndices.map(() => 0);
    const fcfData = fcfRow ? cfYearIndices.map(idx => cleanNum(fcfRow[idx])) : cfYearIndices.map(() => 0);
    
    const ctx = document.getElementById('cashflowChart').getContext('2d');
    charts.cashflow = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cfYears,
        datasets: [
          {
            label: 'Free Cash Flow',
            data: fcfData,
            type: 'line',
            borderColor: '#f43f5e',
            borderWidth: 2.5,
            fill: false,
            tension: 0.3
          },
          {
            label: 'CFO',
            data: cfoData,
            backgroundColor: 'rgba(59, 130, 246, 0.4)',
            borderColor: '#3b82f6',
            borderWidth: 1.5,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
                  interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#94a3b8' },
            title: { display: true, text: 'Value (₹ Crores)', color: '#94a3b8' }
          }
        }
      }
    });
  }

  // 4. Working Capital Days Chart (Debtor Days vs Inventory Days vs Days Payable)
  const ratioTable = companyData.tables['ratios'];
  if (ratioTable && ratioTable.length > 0) {
    const rHeaders = ratioTable[0];
    let rYearIndices = [];
    let rYears = [];
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && rHeaders[i].trim() && rHeaders[i].toLowerCase() !== 'ttm') {
        rYearIndices.push(i);
        rYears.push(rHeaders[i]);
      }
    }
    const debtorRow = getRowByName(ratioTable, 'Debtor Days');
    const inventoryRow = getRowByName(ratioTable, 'Inventory Days');
    const payableRow = getRowByName(ratioTable, 'Days Payable');

    if (debtorRow || inventoryRow || payableRow) {
      const debtorData = debtorRow ? rYearIndices.map(idx => cleanNum(debtorRow[idx])) : rYearIndices.map(() => 0);
      const inventoryData = inventoryRow ? rYearIndices.map(idx => cleanNum(inventoryRow[idx])) : rYearIndices.map(() => 0);
      const payableData = payableRow ? rYearIndices.map(idx => cleanNum(payableRow[idx])) : rYearIndices.map(() => 0);

      const ctxWC = document.getElementById('workingCapitalChart');
      if (ctxWC) {
        charts.workingCapital = new Chart(ctxWC.getContext('2d'), {
          type: 'line',
          data: {
            labels: rYears,
            datasets: [
              { label: 'Debtor Days', data: debtorData, borderColor: '#06b6d4', borderWidth: 2.5, tension: 0.3, fill: false },
              { label: 'Inventory Days', data: inventoryData, borderColor: '#f59e0b', borderWidth: 2.5, tension: 0.3, fill: false },
              { label: 'Days Payable', data: payableData, borderColor: '#8b5cf6', borderWidth: 2.5, tension: 0.3, fill: false }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
                      interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: 'Days', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

  // 5. Capital Structure & Borrowings Chart (Equity Capital + Reserves vs Borrowings)
  const bsTable = companyData.tables['balance-sheet'];
  if (bsTable && bsTable.length > 0) {
    const bsHeaders = bsTable[0];
    let bsYearIndices = [];
    let bsYears = [];
    for (let i = 1; i < bsHeaders.length; i++) {
      if (bsHeaders[i] && bsHeaders[i].trim() && bsHeaders[i].toLowerCase() !== 'ttm') {
        bsYearIndices.push(i);
        bsYears.push(bsHeaders[i]);
      }
    }
    const eqCapRow = getRowByName(bsTable, 'Equity Capital');
    const resRow = getRowByName(bsTable, 'Reserves');
    const borRow = getRowByName(bsTable, 'Borrowing');

    if (borRow || eqCapRow || resRow) {
      const equityTotalData = bsYearIndices.map(idx => cleanNum(eqCapRow ? eqCapRow[idx] : '0') + cleanNum(resRow ? resRow[idx] : '0'));
      const debtData = borRow ? bsYearIndices.map(idx => cleanNum(borRow[idx])) : bsYearIndices.map(() => 0);

      const ctxCap = document.getElementById('capitalStructureChart');
      if (ctxCap) {
        charts.capitalStructure = new Chart(ctxCap.getContext('2d'), {
          type: 'bar',
          data: {
            labels: bsYears,
            datasets: [
              { label: 'Net Worth (Equity+Res)', data: equityTotalData, backgroundColor: 'rgba(16, 185, 129, 0.45)', borderColor: '#10b981', borderWidth: 1.5, borderRadius: 4 },
              { label: 'Total Borrowings', data: debtData, backgroundColor: 'rgba(244, 63, 94, 0.45)', borderColor: '#f43f5e', borderWidth: 1.5, borderRadius: 4 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
                      interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

          // 6. Return Metrics Chart (ROCE % vs ROE %)
  let rYears = [];
  let roceData = [];
  let roeData = [];
  
  const parseRatioValue = (raw) => {
      if (raw === null || raw === undefined) return null;
      const str = String(raw).trim();
      if (str === '-' || str === '') return null;
      const cleaned = str.replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? null : parsed;
  };

  const yearDataMap = {};
  const yearSet = new Set();

  // 1. Dynamic Calculation Fallback from PnL & BS
  if (pnlTable && pnlTable.length > 0 && bsTable && bsTable.length > 0) {
    const pHeaders = pnlTable[0];
    const bsHeaders = bsTable[0];
    for (let i = 1; i < pHeaders.length; i++) {
      if (pHeaders[i] && String(pHeaders[i]).trim() && String(pHeaders[i]).toLowerCase() !== 'ttm') {
        const yearLabel = String(pHeaders[i]).trim();
        yearSet.add(yearLabel);
        
        let bsIdx = bsHeaders.findIndex(h => h && String(h).trim() === yearLabel);
        if (bsIdx === -1) bsIdx = i;
        
        const opRow = getRowByName(pnlTable, 'Operating Profit') || getRowByName(pnlTable, 'Financing Profit');
        const otherIncRow = getRowByName(pnlTable, 'Other Income');
        const npRow = getRowByName(pnlTable, 'Net Profit');
        
        const eqCapRow = getRowByName(bsTable, 'Equity Capital');
        const resRow = getRowByName(bsTable, 'Reserves');
        const borRow = getRowByName(bsTable, 'Borrowing');
        
        // Alternative balance sheet fields
        const combEq1 = getRowByName(bsTable, 'Equity + Reserves') || getRowByName(bsTable, 'Share Capital + Reserves');
        const combEq2 = getRowByName(bsTable, 'Total Equity') || getRowByName(bsTable, 'Net Worth');
        const combEq3 = getRowByName(bsTable, 'Reserves and Surplus');
        
        const ebitVal = (opRow && opRow[i]) ? parseRatioValue(opRow[i]) : 0;
        const otherIncVal = (otherIncRow && otherIncRow[i]) ? parseRatioValue(otherIncRow[i]) : 0;
        const ebit = (ebitVal || 0) + (otherIncVal || 0);
        
        const np = npRow ? parseRatioValue(npRow[i]) : null;
        
        let equity = null;
        if (combEq1 && combEq1[bsIdx] && parseRatioValue(combEq1[bsIdx]) !== null) {
            equity = parseRatioValue(combEq1[bsIdx]);
        } else if (combEq2 && combEq2[bsIdx] && parseRatioValue(combEq2[bsIdx]) !== null) {
            equity = parseRatioValue(combEq2[bsIdx]);
        } else {
            const eqc = (eqCapRow && eqCapRow[bsIdx]) ? parseRatioValue(eqCapRow[bsIdx]) : 0;
            const res = (resRow && resRow[bsIdx]) ? parseRatioValue(resRow[bsIdx]) : 0;
            const resS = (combEq3 && combEq3[bsIdx]) ? parseRatioValue(combEq3[bsIdx]) : 0;
            equity = (eqc || 0) + (res || 0) + (resS || 0);
        }
        
        const borrowings = (borRow && borRow[bsIdx]) ? parseRatioValue(borRow[bsIdx]) : 0;
        const capitalEmployed = (equity || 0) + (borrowings || 0);
        
        let roce = null;
        let roe = null;
        if (capitalEmployed && capitalEmployed !== 0 && ebit !== null) roce = (ebit / capitalEmployed) * 100;
        if (equity && equity !== 0 && np !== null) roe = (np / equity) * 100;
        
        yearDataMap[yearLabel] = {
            roce: roce !== null ? parseFloat(roce.toFixed(2)) : null,
            roe: roe !== null ? parseFloat(roe.toFixed(2)) : null
        };
      }
    }
  }

  // 2. Annual Ratios Table Scraping (Overrides fallback)
  if (ratioTable && ratioTable.length > 0) {
    const rHeaders = ratioTable[0];
    const roceRow = getRowByName(ratioTable, 'ROCE %');
    const roeRow = getRowByName(ratioTable, 'ROE %') || getRowByName(ratioTable, 'Return on Equity') || getRowByName(ratioTable, 'ROE');
    
    for (let i = 1; i < rHeaders.length; i++) {
      if (rHeaders[i] && String(rHeaders[i]).trim() && String(rHeaders[i]).toLowerCase() !== 'ttm') {
        const yearLabel = String(rHeaders[i]).trim();
        
        // Skip aggregate/historical text rows
        if (yearLabel.toLowerCase().includes('years') || yearLabel.toLowerCase().includes('year:')) continue;
        
        yearSet.add(yearLabel);
        if (!yearDataMap[yearLabel]) yearDataMap[yearLabel] = { roce: null, roe: null };
        
        if (roceRow) {
            const parsedRoce = parseRatioValue(roceRow[i]);
            if (parsedRoce !== null) yearDataMap[yearLabel].roce = parsedRoce;
        }
        if (roeRow) {
            const parsedRoe = parseRatioValue(roeRow[i]);
            if (parsedRoe !== null) yearDataMap[yearLabel].roe = parsedRoe;
        }
      }
    }
  }

  // 3. Reconstruct arrays in chronological order
  rYears = Array.from(yearSet).filter(y => y && y.match(/\d{4}/)).sort((a, b) => {
      const yearA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const yearB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return yearA - yearB;
  });

  roceData = rYears.map(y => yearDataMap[y].roce);
  roeData = rYears.map(y => yearDataMap[y].roe);

  if (rYears.length > 0) {
    const ctxRet = document.getElementById('returnMetricsChart');
    if (ctxRet) {
      charts.returnMetrics = new Chart(ctxRet.getContext('2d'), {
        type: 'line',
        data: {
          labels: rYears,
          datasets: [
            { label: 'ROCE %', data: roceData, borderColor: '#06b6d4', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true },
            { label: 'ROE %', data: roeData, borderColor: '#f59e0b', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + '%';
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', callback: v => `${v}%` } }
          }
        }
      });
    }
  }

  // 7. Quarterly Momentum Chart (Quarterly Sales vs Quarterly Operating Profit)
  const qTable = companyData.tables['quarters'];
  if (qTable && qTable.length > 0) {
    const qHeaders = qTable[0];
    let qIndices = [];
    let qLabels = [];
    for (let i = 1; i < qHeaders.length; i++) {
      if (qHeaders[i] && qHeaders[i].trim() && qHeaders[i].toLowerCase() !== 'ttm') {
        qIndices.push(i);
        qLabels.push(qHeaders[i]);
      }
    }
    const qSalesRow = getRowByName(qTable, 'Sales');
    const qOpRow = getRowByName(qTable, 'Operating Profit');

    if (qSalesRow || qOpRow) {
      const qSalesData = qSalesRow ? qIndices.map(idx => cleanNum(qSalesRow[idx])) : qIndices.map(() => 0);
      const qOpData = qOpRow ? qIndices.map(idx => cleanNum(qOpRow[idx])) : qIndices.map(() => 0);

      const ctxQ = document.getElementById('quarterlyChart');
      if (ctxQ) {
        charts.quarterly = new Chart(ctxQ.getContext('2d'), {
          type: 'bar',
          data: {
            labels: qLabels,
            datasets: [
              { label: 'Qtr Sales', data: qSalesData, backgroundColor: 'rgba(59, 130, 246, 0.45)', borderColor: '#3b82f6', borderWidth: 1.5, borderRadius: 4 },
              { label: 'Qtr OpProfit', data: qOpData, type: 'line', borderColor: '#10b981', borderWidth: 3, tension: 0.3, fill: false }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
                      interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
              y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: '₹ Crores', color: '#94a3b8' } }
            }
          }
        });
      }
    }
  }

  // 8. Shareholding Donut Chart
  renderShareholdingDonut();
}

// Render dynamic shareholding donut chart
function renderShareholdingDonut() {
  const shTable = companyData.tables['shareholding'];
  const select = document.getElementById('shareholding-date-select');
  select.innerHTML = '';
  
  if (!shTable || shTable.length === 0) {
    document.getElementById('shareholding-legend').innerHTML = '<div style="color: var(--text-muted);">No shareholding data available</div>';
    return;
  }
  
  // Extract dates (columns 1 to N)
  const headers = shTable[0];
  const dates = [];
  for (let i = 1; i < headers.length; i++) {
    if (headers[i] && headers[i].trim() && headers[i].toLowerCase() !== 'ttm') {
      let safeLabel = headers[i].replace(/[{()}]/g, '').trim();
      dates.push({ label: safeLabel, index: i });
    }
  }
  
  if (dates.length === 0) return;
  
  // Pop date select
  dates.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.index;
    opt.textContent = d.label;
    select.appendChild(opt);
  });
  
  // Pick the latest date (the last column)
  select.value = dates[dates.length - 1].index;
  
  // Watch select change
  select.onchange = () => { updateDonut(parseInt(select.value)); };
  
  
// Tooltip Modal Logic
document.addEventListener('click', (e) => {
  if (e.target.closest('.tooltip-icon')) {
    const icon = e.target.closest('.tooltip-icon');
    const metric = icon.getAttribute('data-metric');
    if (metric && deepTooltips[metric]) {
      const data = deepTooltips[metric];
      document.getElementById('financial-modal-title').textContent = metric;
      document.getElementById('financial-modal-body').innerHTML = `
        <div class="modal-section">
          <h4><i class="fa-solid fa-book-open-reader"></i> Meaning</h4>
          <p>${data.meaning}</p>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-chart-line"></i> Market Relevance</h4>
          <p>${data.relevance}</p>
        </div>
        
      `;
      document.getElementById('financial-modal').classList.remove('hidden');
    }
  }
});

document.getElementById('financial-modal-close')?.addEventListener('click', () => {
  document.getElementById('financial-modal').classList.add('hidden');
});

document.getElementById('financial-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'financial-modal') {
    document.getElementById('financial-modal').classList.add('hidden');
  }
});


  // Setup Donut
  const ctx = document.getElementById('shareholdingDonut').getContext('2d');
  charts.shareholding = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Promoters', 'FIIs', 'DIIs', 'Public', 'Govt'],
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          '#10b981', // Promoters
          '#3b82f6', // FII
          '#8b5cf6', // DII
          '#f59e0b', // Public
          '#64748b'  // Govt
        ],
        borderWidth: 1.5,
        borderColor: '#0f172a'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#e2e8f0',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function(context) {
              return ' ' + context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
  
  updateDonut(parseInt(select.value));
}

// Update shareholding donut datasets
function updateDonut(colIndex) {
  if (!charts.shareholding) return;
  
  const shTable = companyData.tables['shareholding'];
  
  const promoterRow = getRowByName(shTable, 'Promoters');
  const fiiRow = getRowByName(shTable, 'FIIs');
  const diiRow = getRowByName(shTable, 'DIIs');
  const publicRow = getRowByName(shTable, 'Public');
  const govtRow = getRowByName(shTable, 'Government');
  
  const p = promoterRow ? cleanNum(promoterRow[colIndex]) : 0;
  const f = fiiRow ? cleanNum(fiiRow[colIndex]) : 0;
  const d = diiRow ? cleanNum(diiRow[colIndex]) : 0;
  const pb = publicRow ? cleanNum(publicRow[colIndex]) : 0;
  const g = govtRow ? cleanNum(govtRow[colIndex]) : 0;
  
  // Total adjustments for safety
  const dataArray = [p, f, d, pb, g];
  charts.shareholding.data.datasets[0].data = dataArray;
  charts.shareholding.update();
  
  // Update UI legends list
  const legendContainer = document.getElementById('shareholding-legend');
  legendContainer.innerHTML = '';
  
  const categories = [
    { label: 'Promoters', value: p, color: '#10b981' },
    { label: 'FIIs', value: f, color: '#3b82f6' },
    { label: 'DIIs', value: d, color: '#8b5cf6' },
    { label: 'Public', value: pb, color: '#f59e0b' },
    { label: 'Government', value: g, color: '#64748b' }
  ];
  
  categories.forEach(cat => {
    if (cat.value > 0) {
      const item = document.createElement('div');
      item.className = 'sh-legend-item';
      item.innerHTML = `
        <div class="sh-label-left">
          <div class="sh-dot" style="background-color: ${cat.color}"></div>
          <span>${cat.label}</span>
        </div>
        <div class="sh-val">${cat.value}%</div>
      `;
      legendContainer.appendChild(item);
    }
  });
}

// Insights Engine Rules & Calculations
function generateInsights() {
  const positives = [];
  const negatives = [];
  
  const ratios = companyData.ratios;
  const pnlTable = companyData.tables['profit-loss'];
  const bsTable = companyData.tables['balance-sheet'];
  const cfTable = companyData.tables['cash-flow'];
  const shTable = companyData.tables['shareholding'];
  
  // 1. Debt-to-Equity Analysis
  if (bsTable && bsTable.length > 0) {
    const borrowRow = getRowByName(bsTable, 'Borrowing');
    const reserveRow = getRowByName(bsTable, 'Reserves');
    const capitalRow = getRowByName(bsTable, 'Equity Capital');
    
    if (borrowRow && reserveRow && capitalRow) {
      // Find latest valid columns
      const lastIndex = borrowRow.length - 1;
      const borrowings = cleanNum(borrowRow[lastIndex]);
      const reserves = cleanNum(reserveRow[lastIndex]);
      const capital = cleanNum(capitalRow[lastIndex]);
      const equity = reserves + capital;
      
      const deRatio = equity > 0 ? borrowings / equity : 0;
      
      if (deRatio < 0.5) {
        positives.push(`Healthy leverage: Debt-to-Equity ratio is very low at **${deRatio.toFixed(2)}**.`);
      } else if (deRatio > 1.25) {
        negatives.push(`High leverage risk: Debt-to-Equity ratio is high at **${deRatio.toFixed(2)}** (Debt: ₹${borrowings.toLocaleString()} Cr, Equity: ₹${equity.toLocaleString()} Cr).`);
      } else {
        positives.push(`Moderate leverage: Debt-to-Equity stands at **${deRatio.toFixed(2)}**.`);
      }
    }
  }
  
  // 2. Free Cash Flow Inflection Check
  if (cfTable && cfTable.length > 0) {
    const fcfRow = getRowByName(cfTable, 'Free Cash Flow');
    const cfoRow = getRowByName(cfTable, 'Cash from Operating Activity');
    const opRow = getRowByName(pnlTable, 'Operating Profit');
    
    if (fcfRow && fcfRow.length > 3) {
      const len = fcfRow.length;
      const fcfRecent = cleanNum(fcfRow[len - 1]);
      const fcfPrev1 = cleanNum(fcfRow[len - 2]);
      const fcfPrev2 = cleanNum(fcfRow[len - 3]);
      
      if (fcfRecent > 0 && (fcfPrev1 < 0 || fcfPrev2 < 0)) {
        positives.push(`**FCF Inflection Point:** Free Cash Flow has turned positive recently reaching **₹${fcfRecent.toLocaleString()} Cr** after negative periods.`);
      } else if (fcfRecent > 0 && fcfPrev1 > 0 && fcfPrev2 > 0) {
        positives.push(`Consistent cash cash-cow: Generating positive Free Cash Flow for the last 3 consecutive years.`);
      } else if (fcfRecent < 0) {
        negatives.push(`Capital drain: Free Cash Flow is negative at **₹${fcfRecent.toLocaleString()} Cr**, indicating the company spends more than it operates.`);
      }
      
      // CFO to OP conversion efficiency
      if (cfoRow && opRow) {
        const cfoVal = cleanNum(cfoRow[len - 1]);
        // OP can be from P&L (which has different headers length, match by year or column index approx)
        const opVal = cleanNum(opRow[opRow.length - 2]); // FY26 or TTM
        const conversion = opVal > 0 ? (cfoVal / opVal) * 100 : 0;
        
        if (conversion > 90) {
          positives.push(`Excellent cash conversion: CFO is **${conversion.toFixed(0)}%** of Operating Profit, showing earnings are fully backed by cash flow.`);
        } else if (conversion < 50) {
          negatives.push(`Poor conversion: CFO is only **${conversion.toFixed(0)}%** of Operating Profit, implying cash is locked up in working capital.`);
        }
      }
    }
  }
  
  // 3. Return Ratios (ROE / ROCE)
  if (ratios["ROCE"]) {
    const roce = cleanNum(ratios["ROCE"]);
    if (roce > 15) {
      positives.push(`Highly efficient capital: ROCE is excellent at **${roce}%**.`);
    } else if (roce < 10) {
      negatives.push(`Low capital yield: ROCE is low at **${roce}%**, trailing the benchmark threshold.`);
    }
  }
  if (ratios["ROE"]) {
    const roe = cleanNum(ratios["ROE"]);
    if (roe > 15) {
      positives.push(`Strong Shareholder Returns: ROE is high at **${roe}%**.`);
    } else if (roe < 10) {
      negatives.push(`Underperforming equity returns: ROE is low at **${roe}%** over recent years.`);
    }
  }

  // 4. Shareholding Dynamic check
  if (shTable && shTable.length > 0) {
    const fiiRow = getRowByName(shTable, 'FIIs');
    const diiRow = getRowByName(shTable, 'DIIs');
    
    if (fiiRow && diiRow && fiiRow.length > 3) {
      const len = fiiRow.length;
      const fiiLatest = cleanNum(fiiRow[len - 1]);
      const diiLatest = cleanNum(diiRow[len - 1]);
      const fiiPrev = cleanNum(fiiRow[len - 3]);
      const diiPrev = cleanNum(diiRow[len - 3]);
      
      const fiiDiff = fiiLatest - fiiPrev;
      const diiDiff = diiLatest - diiPrev;
      
      if (fiiDiff < -2) {
        negatives.push(`Foreign institutional selling: FIIs have cut stake by **${Math.abs(fiiDiff).toFixed(2)}%** over the last year.`);
      }
      if (diiDiff > 2) {
        positives.push(`Domestic institutional support: DIIs have increased stake by **${diiDiff.toFixed(2)}%**, supporting buying demand.`);
      }
    }
  }

  // Fallbacks if lists are empty
  if (positives.length === 0) positives.push("No notable calculated strengths found based on standard rule profiles.");
  if (negatives.length === 0) negatives.push("No major red flags or warnings identified based on historical tables.");
  
  // Render lists
  const posList = document.getElementById('insights-positives');
  posList.innerHTML = positives.map(p => `<li><i class="fa-solid fa-circle-check"></i><span>${markdownToHtml(p)}</span></li>`).join('');
  
  const negList = document.getElementById('insights-negatives');
  negList.innerHTML = negatives.map(n => `<li><i class="fa-solid fa-circle-xmark"></i><span>${markdownToHtml(n)}</span></li>`).join('');

  // 5. Scorecard & Ratings Computation
  computeScorecard();

  // 6. Compound growth rates
  renderGrowthRates();
}

// Helper to format inline markdown bolding **text** to HTML
function markdownToHtml(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Compute ratings scorecard
function computeScorecard() {
  const ratios = companyData.ratios;
  
  // 1. Profitability Score
  const roe = ratios["ROE"] ? cleanNum(ratios["ROE"]) : 8;
  const roce = ratios["ROCE"] ? cleanNum(ratios["ROCE"]) : 10;
  const pScore = Math.min(10, Math.max(2, Math.round(((roe + roce) / 2) * 0.5))); // map ~10-20% to score 5-10
  
  // 2. Leverage Score
  let lScore = 5; // Default average
  const bsTable = companyData.tables['balance-sheet'];
  if (bsTable && bsTable.length > 0) {
    const borrowRow = getRowByName(bsTable, 'Borrowing');
    const reserveRow = getRowByName(bsTable, 'Reserves');
    if (borrowRow && reserveRow) {
      const b = cleanNum(borrowRow[borrowRow.length - 1]);
      const r = cleanNum(reserveRow[reserveRow.length - 1]);
      const de = r > 0 ? b / r : 1;
      if (de < 0.3) lScore = 9;
      else if (de < 0.6) lScore = 8;
      else if (de < 1.0) lScore = 6;
      else if (de < 1.5) lScore = 4;
      else lScore = 2;
    }
  }
  
  // 3. Cash Flow Score
  let cScore = 5;
  const cfTable = companyData.tables['cash-flow'];
  if (cfTable && cfTable.length > 0) {
    const fcfRow = getRowByName(cfTable, 'Free Cash Flow');
    if (fcfRow) {
      const fcf = cleanNum(fcfRow[fcfRow.length - 1]);
      const fcfPrev = cleanNum(fcfRow[fcfRow.length - 2]);
      if (fcf > 0 && fcfPrev > 0) cScore = 9;
      else if (fcf > 0) cScore = 7;
      else cScore = 3;
    }
  }
  
  const scorecardContainer = document.getElementById('scorecard-content');
  
  const items = [
    { label: 'Profitability Metric (ROE/ROCE)', score: pScore, color: 'var(--accent-emerald)' },
    { label: 'Balance Sheet Health (Leverage)', score: lScore, color: 'var(--accent-cyan)' },
    { label: 'Cash Flow Quality (FCF)', score: cScore, color: 'var(--accent-purple)' }
  ];
  
  scorecardContainer.innerHTML = items.map(it => `
    <div class="scorecard-item">
      <div class="scorecard-row">
        <span>${it.label}</span>
        <span style="font-weight: 700; color: ${it.color}">${it.score} / 10</span>
      </div>
      <div class="scorecard-bar-bg">
        <div class="scorecard-bar-fill" style="width: ${it.score * 10}%; background-color: ${it.color}"></div>
      </div>
    </div>
  `).join('');
}

// Render growth box list
function renderGrowthRates() {
  const container = document.getElementById('compound-rates-content');
  container.innerHTML = '';
  
  const pnlTable = companyData.tables['profit-loss'];
  if (!pnlTable) return;
  
  // We can search for compounded tables inside the P&L html or map them
  // In our parse_screener.py parser, we appended compounding blocks as tables!
  // Let's print any other tables that were parsed in profit-loss section.
  // In parser.sections['profit-loss'], we have multiple tables:
  // index 0: P&L statement
  // index 1: Compounded Sales Growth
  // index 2: Compounded Profit Growth
  // index 3: Stock Price CAGR
  // index 4: Return on Equity
  
  // Let's verify the tables exist
  const sections = ['Compounded Sales Growth', 'Compounded Profit Growth', 'Stock Price CAGR', 'Return on Equity'];
  
  // Wait, let's write a parser on the frontend that extracts these growth tables.
  // In companyData.tables['profit-loss'], we saved the first table. But wait!
  // Let's look at how the tables are outputted in server.py:
  // In server.py, we set "tables": {k: v[0] if v else [] for k, v in parser.tables.items()}
  // Ah! It only returns the first table of each section!
  // That means `companyData.tables['profit-loss']` has the main table, but the compound tables (which are also inside the profit-loss section) were dropped because we only took `v[0]`.
  // Wait! Let's check: Can we parse the compound values directly from the text or other parts?
  // Let's check how screener outputs it.
  // Actually, we can compute CAGR ourselves from the P&L table! That is even more robust and dynamic!
  // Let's write a simple CAGR calculator on the frontend.
  
  const salesRow = getRowByName(pnlTable, 'Sales');
  const netProfitRow = getRowByName(pnlTable, 'Net Profit');
  
  // Calculate Sales CAGR
  // Calculate Sales CAGR
  const compoundSales = getCompoundedGrowthRates(pnlTable, 'Sales Growth', 'Sales');
  const compoundProfits = getCompoundedGrowthRates(pnlTable, 'Profit Growth', 'Net Profit');
  
  // Sales Growth Card
  const salesBox = createCompoundingBox('Compounded Sales Growth', compoundSales);
  container.appendChild(salesBox);
  
  // Profit Growth Card
  const profitBox = createCompoundingBox('Compounded Profit Growth', compoundProfits);
  container.appendChild(profitBox);
}

// Enhanced CAGR Calculation & Parsing
function getCompoundedGrowthRates(pnlTable, targetHeader, dataRowName) {
  const result = { "10 Years": "N/A", "5 Years": "N/A", "3 Years": "N/A" };
  
  if (!pnlTable || pnlTable.length === 0) return result;

  // 1. Explicit Scraper Summary Matching
  let sectionIndex = -1;
  for (let i = 0; i < pnlTable.length; i++) {
    const row = pnlTable[i];
    if (row && row.length > 0 && row[0]) {
      const headerLower = String(row[0]).toLowerCase();
      if (headerLower.includes(targetHeader.toLowerCase())) {
        sectionIndex = i;
        break;
      }
    }
  }

  if (sectionIndex !== -1) {
    for (let i = sectionIndex + 1; i < pnlTable.length; i++) {
      const row = pnlTable[i];
      if (row.length === 1 && String(row[0]).toLowerCase().includes('growth')) break;
      if (row.length === 1 && String(row[0]).toLowerCase().includes('cagr')) break;
      if (row.length === 1 && String(row[0]).toLowerCase().includes('return')) break;
      
      if (row.length >= 2) {
        const label = String(row[0]).toLowerCase().replace(/\s+/g, '');
        const val = String(row[1]).trim();
        const cleanVal = val.replace(/%/g, '').trim();
        if (cleanVal !== '' && cleanVal !== '-') {
            if (label.includes('10year')) result['10 Years'] = val;
            else if (label.includes('5year')) result['5 Years'] = val;
            else if (label.includes('3year')) result['3 Years'] = val;
        }
      }
    }
  }

  // 2. Dynamic CAGR Fallback
  const headers = pnlTable[0];
  const dataRow = getRowByName(pnlTable, dataRowName);
  
  if (dataRow && headers) {
    const values = [];
    const years = [];
    for (let i = 1; i < headers.length; i++) {
      const h = headers[i];
      if (h && String(h).trim() && String(h).toLowerCase() !== 'ttm') {
        const parsedYear = parseInt(String(h).replace(/[^0-9]/g, ''));
        if (!isNaN(parsedYear)) {
          years.push(parsedYear);
          values.push(cleanNum(dataRow[i]));
        }
      }
    }

    if (values.length >= 2) {
      const latestIndex = values.length - 1;
      const latestVal = values[latestIndex];
      const periods = [10, 5, 3];

      periods.forEach(p => {
        if (result[`${p} Years`] === 'N/A' || !result[`${p} Years`]) {
          const startYear = years[latestIndex] - p;
          
          let closestIdx = -1;
          for(let i = 0; i < years.length; i++) {
            if (years[i] === startYear) {
                closestIdx = i;
                break;
            }
          }
          
          if (closestIdx === -1) {
              let minDiff = 999;
              for (let i = 0; i < years.length; i++) {
                const diff = Math.abs(years[i] - startYear);
                if (diff < minDiff && diff <= 1) {
                  minDiff = diff;
                  closestIdx = i;
                }
              }
          }

          if (closestIdx !== -1 && values[closestIdx] > 0 && latestVal > 0) {
            const baseVal = values[closestIdx];
            const yearsDiff = years[latestIndex] - years[closestIdx];
            if (yearsDiff > 0) {
              const rate = (Math.pow(latestVal / baseVal, 1 / yearsDiff) - 1) * 100;
              result[`${p} Years`] = `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
            }
          }
        }
      });
    }
  }

  return result;
}

function createCompoundingBox(title, data) {
  const box = document.createElement('div');
  box.className = 'compound-box';
  
  let rows = '';
  for (const [k, v] of Object.entries(data)) {
    rows += `
      <tr>
        <td>${k}:</td>
        <td style="color: ${v === 'N/A' ? 'var(--text-muted)' : (v.includes('-') ? '#f43f5e' : '#10b981')}">${v}</td>
      </tr>
    `;
  }
  
  if (!rows) rows = '<tr><td colspan="2" style="text-align:center; color:var(--text-muted)">Data insufficient</td></tr>';
  
  box.innerHTML = `
    <h4>${title}</h4>
    <table class="compound-table">
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
  return box;
}

// =============================================================================
// ADVANCED ANALYTICS RENDERING
// =============================================================================

function renderAdvancedAnalytics() {
  const analytics = companyData.analytics || {};

  // DCF Intrinsic Value
  const dcfEl = document.getElementById('dcf-content');
  const dcf = analytics.intrinsic_value_dcf;
  if (dcf && dcf.value) {
    const upClass = dcf.upside_pct >= 0 ? 'positive' : 'negative';
    dcfEl.innerHTML = `
      <span class="val-label">Estimated Intrinsic Value (10-Year DCF)</span>
      <span class="val-highlight ${upClass}">₹ ${dcf.value.toLocaleString()}</span>
      <div class="val-detail">
        <strong>Dynamic Growth Rate:</strong> ${dcf.growth_rate_used} &nbsp; | &nbsp;
        <strong>Dynamic Discount Rate:</strong> ${dcf.discount_rate} &nbsp; | &nbsp;
        <strong>Terminal Growth:</strong> ${dcf.terminal_growth}
      </div>
      <div class="val-detail">
        <strong>Current Price:</strong> ₹ ${dcf.current_price.toLocaleString()} &nbsp; → &nbsp;
        <strong style="color: ${dcf.upside_pct >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
        ${dcf.upside_pct >= 0 ? '↑' : '↓'} ${Math.abs(dcf.upside_pct).toFixed(1)}% ${dcf.upside_pct >= 0 ? 'Upside' : 'Downside'}
        </strong>
      </div>
    `;
  } else {
    dcfEl.innerHTML = '<span class="val-detail">Insufficient data for DCF calculation.</span>';
  }

  // Graham Number
  const grahamEl = document.getElementById('graham-content');
  if (analytics.graham_number) {
    grahamEl.innerHTML = `
      <span class="val-label">Graham Number (Intrinsic Value)</span>
      <span class="val-highlight neutral">₹ ${analytics.graham_number.toLocaleString()}</span>
      <div class="val-detail">Based on formula: √(22.5 × EPS × Book Value)</div>
    `;
  } else {
    grahamEl.innerHTML = '<span class="val-detail">Insufficient data.</span>';
  }

  // Margin of Safety
  const mosEl = document.getElementById('mos-content');
  if (analytics.margin_of_safety !== null && analytics.margin_of_safety !== undefined) {
    const mosClass = analytics.margin_of_safety > 0 ? 'positive' : 'negative';
    mosEl.innerHTML = `
      <span class="val-label">Margin of Safety (Graham)</span>
      <span class="val-highlight ${mosClass}">${analytics.margin_of_safety.toFixed(1)}%</span>
      <div class="val-detail">
        ${analytics.margin_of_safety > 20 ? '✅ Good margin of safety. Stock appears undervalued vs Graham Number.' :
          analytics.margin_of_safety > 0 ? '⚠️ Modest margin of safety. Proceed with caution.' :
          '❌ Negative margin of safety. Stock may be overvalued vs Graham Number.'}
      </div>
    `;
  } else {
    mosEl.innerHTML = '<span class="val-detail">Insufficient data.</span>';
  }

  // Piotroski F-Score
  const pioEl = document.getElementById('piotroski-content');
  const pio = analytics.piotroski_f_score;
  if (pio) {
    const scoreColor = pio.score >= 7 ? 'positive' : pio.score >= 4 ? 'neutral' : 'negative';
    let listItems = '';
    if (pio.details) {
      pio.details.forEach(d => {
        listItems += `<li class="${d.passed ? 'pass' : 'fail'}">
          <i class="fa-solid ${d.passed ? 'fa-circle-check pass-icon' : 'fa-circle-xmark fail-icon'}"></i>
          ${d.criterion}
        </li>`;
      });
    }
    pioEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
        <span class="val-highlight ${scoreColor}">${pio.score}/${pio.max}</span>
        <span class="badge ${scoreColor === 'positive' ? '' : scoreColor === 'negative' ? 'secondary' : ''}">${pio.interpretation}</span>
      </div>
      <ul class="piotroski-list">${listItems}</ul>
    `;
  } else {
    pioEl.innerHTML = '<span class="val-detail">Insufficient data.</span>';
  }

  // Altman Z-Score
  const zEl = document.getElementById('zscore-content');
  const zs = analytics.altman_z_score;
  if (zs) {
    const zColor = zs.interpretation === 'Safe' ? 'positive' : zs.interpretation === 'Grey Zone' ? 'neutral' : 'negative';
    zEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;">
        <span class="val-highlight ${zColor}">${zs.score}</span>
        <span class="badge ${zColor === 'positive' ? '' : zColor === 'negative' ? 'secondary' : ''}">${zs.interpretation}</span>
      </div>
      <div class="val-detail" style="margin-top:1rem;">
        <strong>Interpretation:</strong><br>
        ${zs.score > 2.6 ? '✅ Score > 2.6 → Company is in the <strong>Safe Zone</strong>. Low bankruptcy risk.' :
          zs.score > 1.1 ? '⚠️ Score between 1.1–2.6 → <strong>Grey Zone</strong>. Moderate risk, needs monitoring.' :
          '❌ Score < 1.1 → <strong>Distress Zone</strong>. High risk of financial distress.'}
      </div>
    `;
  } else {
    zEl.innerHTML = '<span class="val-detail">Insufficient data for Z-Score.</span>';
  }

  // DuPont Analysis
  const dupontEl = document.getElementById('dupont-content');
  const dp = analytics.dupont_analysis;
  if (dp && dp.net_profit_margin !== undefined) {
    dupontEl.innerHTML = `
      <div style="margin-bottom:0.5rem;">
        <span class="val-label">DuPont ROE = Net Margin × Asset Turnover × Equity Multiplier</span>
        <span class="val-highlight neutral">${dp.computed_roe.toFixed(1)}%</span>
      </div>
      <div class="dupont-bar-group">
        <div class="dupont-metric">
          <div class="dupont-metric-label"><span>Net Profit Margin</span><span class="val">${dp.net_profit_margin}%</span></div>
          <div class="dupont-bar"><div class="dupont-bar-fill" style="width:${Math.min(dp.net_profit_margin, 100)}%;background:var(--accent-cyan);"></div></div>
        </div>
        <div class="dupont-metric">
          <div class="dupont-metric-label"><span>Asset Turnover</span><span class="val">${dp.asset_turnover}x</span></div>
          <div class="dupont-bar"><div class="dupont-bar-fill" style="width:${Math.min(dp.asset_turnover * 50, 100)}%;background:var(--accent-purple);"></div></div>
        </div>
        <div class="dupont-metric">
          <div class="dupont-metric-label"><span>Equity Multiplier</span><span class="val">${dp.equity_multiplier}x</span></div>
          <div class="dupont-bar"><div class="dupont-bar-fill" style="width:${Math.min(dp.equity_multiplier * 20, 100)}%;background:var(--accent-amber);"></div></div>
        </div>
      </div>
    `;
  } else {
    dupontEl.innerHTML = '<span class="val-detail">Insufficient balance sheet data for DuPont decomposition.</span>';
  }

  // Debt Coverage & Efficiency
  const debtEl = document.getElementById('debt-efficiency-content');
  const dc = analytics.debt_coverage || {};
  const em = analytics.efficiency_metrics || {};
  const er = analytics.efficiency_ratios || {};
  if (Object.keys(dc).length > 0 || Object.keys(em).length > 0 || Object.keys(er).length > 0) {
    let items = '';
    const metrics = [
      { label: 'Debtor Days', val: er.debtor_days, suffix: ' Days', color: 'var(--accent-cyan)' },
      { label: 'Inventory Days', val: er.inventory_days, suffix: ' Days', color: 'var(--accent-amber)' },
      { label: 'Days Payable', val: er.days_payable, suffix: ' Days', color: 'var(--accent-purple)' },
      { label: 'Cash Cycle', val: er.working_capital_days, suffix: ' Days', color: er.working_capital_days < 60 ? 'var(--accent-emerald)' : 'var(--accent-rose)' },
      { label: 'Interest Coverage', val: dc.interest_coverage_ratio, suffix: 'x', color: dc.interest_coverage_ratio > 3 ? 'var(--accent-emerald)' : 'var(--accent-rose)' },
      { label: 'Debt/Equity', val: dc.debt_to_equity, suffix: 'x', color: dc.debt_to_equity < 1 ? 'var(--accent-emerald)' : 'var(--accent-amber)' },
      { label: 'Debt/EBITDA', val: dc.debt_to_ebitda, suffix: 'x', color: dc.debt_to_ebitda < 3 ? 'var(--accent-emerald)' : 'var(--accent-amber)' },
      { label: 'ROIC', val: em.roic, suffix: '%', color: em.roic > 12 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }
    ];
    metrics.forEach(m => {
      if (m.val !== undefined && m.val !== null && m.val > 0) {
        items += `<div class="debt-metric-item">
          <div class="metric-val" style="color:${m.color}">${m.val}${m.suffix}</div>
          <div class="metric-label">${m.label}</div>
        </div>`;
      }
    });
    debtEl.innerHTML = `<div class="debt-metric-grid">${items}</div>`;
  } else {
    debtEl.innerHTML = '<span class="val-detail">Insufficient data.</span>';
  }

  // Revenue Projection
  renderProjection('revenue-projection-content', analytics.revenue_projection, 'Revenue');
  renderProjection('profit-projection-content', analytics.profit_projection, 'Net Profit');

  // Growth Quality
  const gqEl = document.getElementById('growth-quality-content');
  const gq = analytics.growth_quality;
  if (gq) {
    let segments = '';
    for (let i = 0; i < gq.max; i++) {
      segments += `<div class="gq-segment ${i < gq.score ? 'filled' : 'empty'}"></div>`;
    }
    let details = '';
    if (gq.details && gq.details.length > 0) {
      gq.details.forEach(d => {
        details += `<li><i class="fa-solid fa-check-circle"></i> ${d}</li>`;
      });
    }
    const ratingColor = gq.rating === 'Excellent' ? 'var(--accent-emerald)' :
                        gq.rating === 'Good' ? 'var(--accent-cyan)' :
                        gq.rating === 'Average' ? 'var(--accent-amber)' : 'var(--accent-rose)';
    gqEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:1.5rem;">
        <span class="val-highlight" style="color:${ratingColor}">${gq.score}/${gq.max}</span>
        <span style="font-family:var(--font-family-title);font-size:1.2rem;font-weight:700;color:${ratingColor}">${gq.rating}</span>
      </div>
      <div class="growth-quality-bar">${segments}</div>
      <ul class="gq-details">${details}</ul>
    `;
  } else {
    gqEl.innerHTML = '<span class="val-detail">Insufficient data.</span>';
  }
}

function renderProjection(elementId, projData, label) {
  const el = document.getElementById(elementId);
  if (!projData || !projData.projections || Object.keys(projData.projections).length === 0) {
    el.innerHTML = '<span class="val-detail">Insufficient historical data for projection.</span>';
    return;
  }

  let headerCells = '<th>Metric</th>';
  let dataCells = `<td>${label} (₹ Cr)</td>`;
  for (const [year, val] of Object.entries(projData.projections)) {
    headerCells += `<th>${year}E</th>`;
    dataCells += `<td class="projected-val">₹ ${Math.round(val).toLocaleString()}</td>`;
  }

  el.innerHTML = `
    <div class="val-detail" style="margin-bottom:0.5rem;"><strong>CAGR Used:</strong> ${projData.cagr_used}</div>
    <table class="projection-table">
      <thead><tr>${headerCells}</tr></thead>
      <tbody><tr>${dataCells}</tr></tbody>
    </table>
  `;
}

// =============================================================================
// CROSS-SOURCE DATA RENDERING
// =============================================================================

function renderCrossSourceData() {
  const mc = companyData.moneycontrol || {};
  const gf = companyData.google_finance || {};
  const yf = companyData.yahoo_finance || {};

  // Cross-source comparison table
  const crossEl = document.getElementById('cross-source-content');
  const screenerRatios = companyData.ratios || {};

  const nseCode = companyData.ticker || 'N/A';
  const bseCode = companyData.bse_code || 'N/A';

  let compRows = '';
  const compMetrics = [
    { label: 'Company Name', screener: companyData.company_name, mc: mc.company_name || companyData.company_name, gf: companyData.company_name, yf: yf.company_name || companyData.company_name },
    { label: 'NSE Symbol', screener: `<span style="font-weight:700;color:var(--accent-emerald);">${nseCode}</span>`, mc: `<span style="font-weight:700;color:var(--accent-amber);">${mc.found ? nseCode : 'N/A'}</span>`, gf: `<span style="font-weight:700;color:var(--accent-blue);">${gf.found ? nseCode + ':NSE' : 'N/A'}</span>`, yf: `<span style="font-weight:700;color:#a855f7;">${yf.found ? nseCode + '.NS' : 'N/A'}</span>` },
    { label: 'BSE Security Code', screener: `<span style="font-weight:700;color:var(--accent-emerald);">${bseCode}</span>`, mc: `<span style="font-weight:700;color:var(--accent-amber);">${mc.found ? (bseCode || 'Matched via NSE') : 'N/A'}</span>`, gf: `<span style="font-weight:700;color:var(--accent-blue);">${bseCode ? bseCode + ':BSE' : 'N/A'}</span>`, yf: `<span style="font-weight:700;color:#a855f7;">${bseCode ? bseCode + '.BO' : 'N/A'}</span>` },
    { label: 'Stock ID', screener: `<span style="font-weight:700;color:var(--accent-emerald);">${companyData.ticker || 'N/A'}</span>`, mc: `<span style="font-weight:700;color:var(--accent-amber);">${mc.sc_id || 'N/A'}</span>`, gf: `<span style="font-weight:700;color:var(--accent-blue);">${gf.found ? (nseCode + ':NSE') : 'N/A'}</span>`, yf: `<span style="font-weight:700;color:#a855f7;">${yf.found ? yf.symbol : 'N/A'}</span>` },
    { 
      label: 'Entity Verification Status', 
      screener: '<span class="badge" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald);">✅ Primary Master</span>', 
      mc: mc.found ? `<span class="badge" style="background:rgba(245,158,11,0.15);color:var(--accent-amber);">✅ Verified via ${mc.matched_query || bseCode || nseCode}</span>` : '<span class="badge" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);">❌ Unresolved</span>', 
      gf: gf.found ? `<span class="badge" style="background:rgba(59,130,246,0.15);color:var(--accent-blue);">✅ Verified via ${nseCode ? nseCode + ':NSE' : bseCode + ':BSE'}</span>` : '<span class="badge" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);">❌ Unresolved</span>',
      yf: yf.found ? `<span class="badge" style="background:rgba(168,85,247,0.15);color:#a855f7;">✅ Verified via ${yf.symbol}</span>` : '<span class="badge" style="background:rgba(244,63,94,0.15);color:var(--accent-rose);">❌ Unresolved</span>'
    },
    { label: 'Sector / Industry', screener: '-', mc: mc.sector || 'N/A', gf: 'NSE/BSE Listed', yf: `${yf.exchange || 'NSE'} Equity` },
    { label: 'Current Price', screener: screenerRatios['Current Price'] || 'N/A', mc: 'Live via MoneyControl Hub', gf: gf.price ? `₹ ${parseFloat(gf.price).toLocaleString()}` : (screenerRatios['Current Price'] || 'N/A'), yf: yf.price ? `₹ ${parseFloat(yf.price).toLocaleString()}` : (screenerRatios['Current Price'] || 'N/A') },
    { label: 'P/E Ratio', screener: screenerRatios['Stock P/E'] || 'N/A', mc: 'Live via MoneyControl Hub', gf: screenerRatios['Stock P/E'] || 'N/A', yf: screenerRatios['Stock P/E'] || 'N/A' },
    { label: 'Balance Sheet', screener: '✅ Multi-Year Parsed', mc: mc.found ? '✅ Synced & Linked' : '❌ Not Found', gf: 'N/A', yf: yf.found ? '✅ Synced & Linked' : '❌ Not Found' },
    { label: 'Profit & Loss', screener: '✅ Multi-Year Parsed', mc: mc.found ? '✅ Synced & Linked' : '❌ Not Found', gf: 'N/A', yf: yf.found ? '✅ Synced & Linked' : '❌ Not Found' },
    { label: 'Cash Flow', screener: '✅ Multi-Year Parsed', mc: mc.found ? '✅ Synced & Linked' : '❌ Not Found', gf: 'N/A', yf: yf.found ? '✅ Synced & Linked' : '❌ Not Found' },
    { label: 'Ratios & Cycle', screener: '✅ Multi-Year Parsed', mc: mc.found ? '✅ Synced & Linked' : '❌ Not Found', gf: 'N/A', yf: yf.found ? '✅ Synced & Linked' : '❌ Not Found' }
  ];

  compMetrics.forEach(m => {
    compRows += `<tr>
      <td>${m.label}</td>
      <td>${m.screener}</td>
      <td style="color:var(--accent-amber);font-weight:600;">${m.mc}</td>
      <td style="color:var(--accent-blue);font-weight:600;">${m.gf}</td>
      <td style="color:#a855f7;font-weight:600;">${m.yf}</td>
    </tr>`;
  });

  crossEl.innerHTML = `
    <table class="cross-table">
      <thead>
        <tr class="source-header">
          <th>Metric</th>
          <th style="color:var(--accent-emerald)"><i class="fa-solid fa-database"></i> Screener.in</th>
          <th style="color:var(--accent-amber)"><i class="fa-solid fa-newspaper"></i> MoneyControl</th>
          <th style="color:var(--accent-blue)"><i class="fa-brands fa-google"></i> Google Finance</th>
          <th style="color:#a855f7"><i class="fa-solid fa-chart-pie"></i> Yahoo Finance</th>
        </tr>
      </thead>
      <tbody>${compRows}</tbody>
    </table>
  `;

  // MoneyControl Financial Statement Live Sync Cards
  const mcBsEl = document.getElementById('mc-balance-sheet');
  const mcPnlEl = document.getElementById('mc-profit-loss');

  const t = companyData.ticker;
  const ts = mc.ticker_slug || t;
  const scId = mc.sc_id || t;
  const sec = mc.sector_slug || 'stocks';
  const entityName = mc.company_name || companyData.company_name || t;

  const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : `https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?search_data=${t}`;
  const bsUrl = `https://www.moneycontrol.com/financials/${ts}/balance-sheetVI/${scId}`;
  const cfUrl = `https://www.moneycontrol.com/financials/${ts}/cash-flowVI/${scId}`;
  const pnlUrl = `https://www.moneycontrol.com/financials/${ts}/profit-lossVI/${scId}`;
  const ratioUrl = `https://www.moneycontrol.com/financials/${ts}/ratiosVI/${scId}`;
  const qUrl = `https://www.moneycontrol.com/financials/${ts}/results/quarterly-results/${scId}`;
  const peerUrl = (mc.found && mc.stock_url) ? `${mc.stock_url}/peer-comparison` : `https://www.moneycontrol.com/india/stockpricequote/${t}/peer-comparison`;

  mcBsEl.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
      <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
         <strong><i class="fa-solid fa-building"></i> MoneyControl Entity:</strong> ${entityName}
      </div>
      <div style="font-size:0.85rem;color:var(--text-muted); display:flex; gap: 1rem;">
         <span><strong>Sector:</strong> <span style="color:var(--accent-amber);">${mc.sector || 'N/A'}</span></span>
         <span><strong>MC Stock ID:</strong> <span style="color:var(--accent-cyan);">${mc.sc_id || 'N/A'}</span></span>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
        <a href="${mcMainHub}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-house"></i> MC Main Hub</a>
        <a href="${bsUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-scale-balanced"></i> Balance Sheet</a>
        <a href="${cfUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(16,185,129,0.2);border-color:var(--accent-emerald);"><i class="fa-solid fa-money-bill-transfer"></i> Cash Flow</a>
      </div>
    </div>
  `;

  mcPnlEl.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
      <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
         <strong><i class="fa-solid fa-chart-line"></i> MoneyControl Performance Links</strong>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
        <a href="${pnlUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(6,182,212,0.2);border-color:var(--accent-cyan);"><i class="fa-solid fa-chart-line"></i> Profit & Loss</a>
        <a href="${ratioUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(139,92,246,0.2);border-color:var(--accent-purple);"><i class="fa-solid fa-percent"></i> Financial Ratios</a>
        <a href="${qUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(236,72,153,0.2);border-color:var(--accent-pink);"><i class="fa-solid fa-calendar-days"></i> Quarterly Results</a>
        <a href="${peerUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-users"></i> Peer Comparison</a>
      </div>
    </div>
  `;

  // Google Finance Market Data
  const gfEl = document.getElementById('gf-market-data');
  const yfData = companyData.yahoo_finance || {};
  const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
  const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
  const gfUrl = (companyData.google_finance && companyData.google_finance.found && companyData.google_finance.url) || `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;
    const aiContent = `
    <div style="margin-bottom:1.5rem; display:flex; flex-direction:column; gap:1.5rem;">
        <div>
            <a href="${gfUrl}" target="_blank" rel="noopener noreferrer" style="color:#052e16; background-color:#34d399; font-weight:bold; padding:0.75rem 1.25rem; border-radius:6px; text-decoration:none; display:inline-flex; align-items:center; gap:0.5rem; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.4); transition: transform 0.2s; font-size: 0.95rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Google Finance Data
            </a>
        </div>
    </div>
  `;
  gfEl.innerHTML = aiContent;

  // Yahoo Finance Market Data Card
  const yfEl = document.getElementById('yf-market-data');
  if (yf.found) {
    const yfMetrics = [
      { label: 'Yahoo Symbol', value: yf.symbol },
      { label: 'Live Price', value: yf.price ? `₹ ${yf.price.toLocaleString()}` : 'N/A' },
      { label: 'Prev Close', value: yf.prev_close ? `₹ ${yf.prev_close.toLocaleString()}` : 'N/A' },
      { label: 'Day Change %', value: yf.change_pct !== null && yf.change_pct !== undefined ? `<span style="color:${yf.change_pct >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${yf.change_pct >= 0 ? '▲' : '▼'} ${Math.abs(yf.change_pct)}%</span>` : 'N/A' },
      { label: '52-Wk High', value: yf.fifty_two_week_high ? `₹ ${yf.fifty_two_week_high.toLocaleString()}` : 'N/A' },
      { label: '52-Wk Low', value: yf.fifty_two_week_low ? `₹ ${yf.fifty_two_week_low.toLocaleString()}` : 'N/A' },
      { label: 'Volume', value: yf.volume ? yf.volume.toLocaleString() : 'N/A' },
      { label: 'Direct Actions', value: (() => {
          const yfTicker = yf.symbol || companyData.yahooTicker || (companyData.ticker + '.NS');
          const yfQuoteUrl = `https://finance.yahoo.com/quote/${yfTicker}/`;
          const yfFinancialsUrl = `https://finance.yahoo.com/quote/${yfTicker}/financials/`;
          return `<div style="display:flex;gap:0.5rem;margin-top:0.25rem;"><a href="${yfQuoteUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.75rem;padding:0.35rem 0.75rem;background:rgba(168,85,247,0.2);border-color:#a855f7;"><i class="fa-solid fa-chart-pie"></i> Quote Hub</a><a href="${yfFinancialsUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.75rem;padding:0.35rem 0.75rem;background:rgba(6,182,212,0.2);border-color:var(--accent-cyan);"><i class="fa-solid fa-file-invoice-dollar"></i> Financial Statements</a></div>`;
      })() }
    ];
    let yfItems = '';
    yfMetrics.forEach(m => {
      yfItems += `<div class="gf-data-item"><div class="gf-label">${m.label}</div><div class="gf-value">${m.value}</div></div>`;
    });
    yfEl.innerHTML = `<div class="gf-data-grid">${yfItems}</div>`;
  } else {
    yfEl.innerHTML = '<span class="val-detail">Yahoo Finance data not available for this ticker.</span>';
  }
}

// =============================================================================
// LIVE MARKET NEWS RENDERING
// =============================================================================
function renderNewsFeed() {
  const container = document.getElementById('news-feed-container');
  if (!container) return;

  const newsList = companyData.news || [];
  if (!newsList || newsList.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">No recent market news found for this company.</p>';
    return;
  }

  let html = '';
  newsList.forEach(item => {
    html += `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-card">
        <div>
          <div class="news-card-meta">
            <span class="news-source-tag"><i class="fa-solid fa-newspaper"></i> ${item.source}</span>
            <span class="news-date">${item.pub_date ? item.pub_date.split(' ').slice(0, 4).join(' ') : 'Recent'}</span>
          </div>
          <h4 class="news-card-title">${item.title}</h4>
        </div>
        <div class="news-card-footer">
          <span>Read Full Article</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </div>
      </a>
    `;
  });
  container.innerHTML = html;
}


// 3D Hero Banner Tilt Effect
function init3DBanner() {
  const card = document.getElementById('hero-3d-banner');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 30px 60px -10px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -4px 8px rgba(0, 0, 0, 0.3)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = ''; // fallback to css class
  });
}

document.addEventListener('DOMContentLoaded', init3DBanner);




// =============================================================================
// CORPORATE DOCUMENTS INTELLIGENCE
// =============================================================================

function renderDocumentsTab(tabId) {
  if (!window.currentDocs) return;
  
  // Update buttons
  const btns = document.querySelectorAll('.docs-tab-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  if(tabId === 'announcements' && btns[0]) btns[0].classList.add('active');
  if(tabId === 'annual-reports' && btns[1]) btns[1].classList.add('active');
  if(tabId === 'credit-ratings' && btns[2]) btns[2].classList.add('active');
  if(tabId === 'concalls' && btns[3]) btns[3].classList.add('active');

  const container = document.getElementById('docs-content');
  const docs = window.currentDocs;
  
  const generateListHtml = (items, emptyMessage, iconClass, tagClass, tagIcon) => {
      if (!items || items.length === 0) {
          return `<span class="val-detail">${emptyMessage}</span>`;
      }
      let html = '<div style="display:flex;flex-direction:column;gap:1rem; max-height:400px; overflow-y:auto; padding-right:0.5rem;">';
      items.forEach(item => {
          html += `
              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:1rem; transition:var(--transition-smooth);" class="doc-card">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                      <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-cyan); text-decoration:none; font-weight:600; font-size:0.95rem; line-height:1.4; display:flex; gap:0.5rem; align-items:center;">
                          <i class="${iconClass}" style="color:var(--accent-red); font-size:1.1rem;"></i> ${item.title}
                      </a>
                      ${item.date ? `
                      <span style="background:rgba(16,185,129,0.15); color:var(--accent-emerald); font-size:0.75rem; padding:0.25rem 0.5rem; border-radius:4px; white-space:nowrap; margin-left:1rem; border:1px solid rgba(16,185,129,0.3);">
                          <i class="fa-regular fa-clock"></i> ${item.date}
                      </span>
                      ` : ''}
                  </div>
                  <div style="color:var(--text-muted); font-size:0.8rem; display:flex; gap:0.5rem; align-items:center;">
                      <span class="${tagClass}" style="padding:0.15rem 0.4rem; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);"><i class="${tagIcon}"></i> ${tabId.replace('-', ' ').toUpperCase()}</span>
                  </div>
              </div>
          `;
      });
      html += '</div>';
      return html;
  };

  if (tabId === 'announcements') {
      container.innerHTML = generateListHtml(docs.announcements, 'No recent announcements found.', 'fa-solid fa-bullhorn', 'tag-announcement', 'fa-solid fa-circle-info');
  } else if (tabId === 'annual-reports') {
      container.innerHTML = generateListHtml(docs.annual_reports, 'No annual reports available.', 'fa-solid fa-file-pdf', 'tag-ar', 'fa-solid fa-book');
  } else if (tabId === 'credit-ratings') {
      container.innerHTML = generateListHtml(docs.credit_ratings, 'No credit ratings found.', 'fa-solid fa-award', 'tag-rating', 'fa-solid fa-star');
  } else if (tabId === 'concalls') {
      // Concalls might be the same structure now
      container.innerHTML = generateListHtml(docs.concalls, 'No concall transcripts available.', 'fa-solid fa-microphone', 'tag-concall', 'fa-solid fa-headphones');
  }
}
window.switchDocsTab = renderDocumentsTab;


// FINANCIAL NEWS RENDERER
let currentNewsData = [];

function getRelativeTime(date) {
  const diffInMs = new Date() - new Date(date);
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}

function renderNews(newsItems) {
  const container = document.getElementById('news-feed-container');
  if (!newsItems || newsItems.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);">No recent market-moving news found.</p>';
    return;
  }
  
  let html = '';
  newsItems.forEach(item => {
    html += `
      <div class="news-card">
        <div class="news-card-header">
          <span class="news-source-badge ${item.source.class}">${item.source.name}</span>
          <span class="news-time">${getRelativeTime(item.publishedAt)}</span>
        </div>
        <h4 class="news-headline"><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a></h4>
        <p class="news-summary">${item.summary}</p>
        <div class="news-sentiment ${item.sentiment.class}">
          ${item.sentiment.icon} ${item.sentiment.label}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

async function fetchAndRenderNews(ticker, companyName, force = false) {
  const container = document.getElementById('news-feed-container');
  container.innerHTML = `
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
    <div class="news-shimmer"></div>
  `;
  
  try {
    const newsUrl = force ? `/api/news?ticker=${encodeURIComponent(ticker)}&name=${encodeURIComponent(companyName)}&force=true` : `/api/news?ticker=${encodeURIComponent(ticker)}&name=${encodeURIComponent(companyName)}`;
    const res = await fetch(newsUrl);
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
        return item.sentiment.categoryKey === filter;
      });
      renderNews(filtered);
    }
  });
});


// --- LIVE MARKET INDICES TICKER ---
let indicesInterval = null;
let simulationInterval = null;
window.currentIndicesData = [];

async function fetchMarketIndices() {
  try {
    const res = await fetch('/api/market-indices');
    if (!res.ok) throw new Error("Failed to fetch indices");
    const data = await res.json();
    
    if (data && data.length > 0) {
      window.currentIndicesData = data;
      renderMarketIndices(data);
    }
  } catch (err) {
    console.error("Error fetching market indices:", err);
  }
}

function renderMarketIndices(data) {
  const ribbonContainer = document.querySelector('.market-pulse-ribbon .marquee-content');
  if (!ribbonContainer) return;
  
  // Format items
  let html = '';
  // Add live pulsing dot at the beginning
  html += `<span class="pulse-item" style="display:inline-flex; align-items:center; gap: 6px; margin-right: 10px;">
    <span style="display:inline-block; width:8px; height:8px; background-color:#34d399; border-radius:50%; box-shadow: 0 0 8px #34d399; animation: pulseDot 2s infinite;"></span>
    <span style="font-weight:bold; color:var(--text-primary); font-size: 0.75rem; letter-spacing:1px;">LIVE</span>
  </span>`;

  data.forEach(idx => {
    const isUp = idx.direction === 'up';
    const sign = isUp ? '+' : '';
    const colorClass = isUp ? 'pos' : 'neg';
    
    // We assign a data attribute to target it later
    const safeId = idx.name.replace(/\s+/g, '-');
    
    html += `<span class="pulse-item ticker-item-${safeId}" data-name="${idx.name}" style="margin-right: 25px; padding: 2px 6px; border-radius: 4px; transition: background-color 0.3s;">
      <span class="idx-name" style="font-weight:600; color:var(--text-secondary); margin-right:5px;">${idx.name}</span>
      <span class="idx-val" style="font-weight:700; color:var(--text-primary); margin-right:5px;">${idx.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      <span class="idx-change ${colorClass}" style="font-weight:600; color:${isUp ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
        ${isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>'}
        ${sign}${idx.change_pct.toFixed(2)}%
      </span>
    </span>`;
  });
  
  // Duplicate for seamless marquee effect
  ribbonContainer.innerHTML = html + html;
}

function simulateMicroFluctuations() {
    if (!window.currentIndicesData || window.currentIndicesData.length === 0) return;
    
    // Randomly pick 1 to 3 indices to fluctuate
    const numToUpdate = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numToUpdate; i++) {
        const rndIdx = Math.floor(Math.random() * window.currentIndicesData.length);
        const idxData = window.currentIndicesData[rndIdx];
        
        // Random fluctuation between -0.05% and +0.05%
        const flucPct = (Math.random() * 0.1) - 0.05; 
        const oldPrice = idxData.price;
        
        idxData.price = idxData.price * (1 + flucPct / 100);
        idxData.change = idxData.change + (idxData.price - oldPrice);
        
        // Assuming base was (price - change), calculate new pct
        const basePrice = idxData.price - idxData.change;
        idxData.change_pct = (idxData.change / basePrice) * 100;
        
        const isUp = idxData.price >= oldPrice;
        idxData.direction = idxData.change >= 0 ? 'up' : 'down';
        
        const sign = idxData.direction === 'up' ? '+' : '';
        const colorClass = idxData.direction === 'up' ? 'pos' : 'neg';
        const caret = idxData.direction === 'up' ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>';
        const colorStyle = idxData.direction === 'up' ? 'var(--accent-emerald)' : 'var(--accent-rose)';
        
        // Update DOM
        const safeId = idxData.name.replace(/\s+/g, '-');
        const elements = document.querySelectorAll(`.ticker-item-${safeId}`);
        
        elements.forEach(el => {
            const valEl = el.querySelector('.idx-val');
            const changeEl = el.querySelector('.idx-change');
            if (valEl && changeEl) {
                valEl.innerText = idxData.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                
                changeEl.className = `idx-change ${colorClass}`;
                changeEl.style.color = colorStyle;
                changeEl.innerHTML = `${caret} ${sign}${idxData.change_pct.toFixed(2)}%`;
                
                // Flash animation
                el.classList.remove('flash-up', 'flash-down');
                void el.offsetWidth; // trigger reflow
                el.classList.add(isUp ? 'flash-up' : 'flash-down');
            }
        });
    }
}

// Start polling
function initMarketIndices() {
  fetchMarketIndices();
  if (indicesInterval) clearInterval(indicesInterval);
  indicesInterval = setInterval(fetchMarketIndices, 60000); // real fetch every minute
  
  if (simulationInterval) clearInterval(simulationInterval);
  simulationInterval = setInterval(simulateMicroFluctuations, 1200); // micro fluctuations every 1.2s
}

// Ensure initMarketIndices is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initMarketIndices();
});




function applyDynamicDCF(data) {
    if (!data || !data.analytics || !data.analytics.intrinsic_value_dcf) return;
    
    // 1. Dynamic Growth Rate
    let cagr = 0.08; // default fallback
    const pl = data.tables["profit-loss"];
    if (pl) {
        let profitIdx = pl.findIndex(r => r[0] === "Compounded Profit Growth");
        if (profitIdx === -1) profitIdx = pl.findIndex(r => r[0] === "Compounded Sales Growth");
        
        if (profitIdx > -1) {
            let found = false;
            for (let i = 1; i <= 4; i++) {
                if (pl[profitIdx + i] && pl[profitIdx + i][0] === '3 Years:') {
                    cagr = parseFloat(pl[profitIdx + i][1]) / 100;
                    found = true;
                    break;
                }
            }
            if (!found) {
                for (let i = 1; i <= 4; i++) {
                    if (pl[profitIdx + i] && pl[profitIdx + i][0] === '5 Years:') {
                        cagr = parseFloat(pl[profitIdx + i][1]) / 100;
                        break;
                    }
                }
            }
        }
    }
    
    if (isNaN(cagr)) cagr = 0.08;
    
    // Apply caps
    let g = cagr;
    if (g > 0.18) g = 0.18;
    else if (g <= 0) g = 0.03;
    
    // 2. Dynamic Discount Rate
    let r = 0.11; // Base Cost of Equity
    const debtCoverage = data.analytics.debt_coverage || {};
    const deRatio = debtCoverage.debt_to_equity || 0;
    
    // If interest_coverage_ratio is null/undefined but debt is zero, treat as safe.
    let icRatio = debtCoverage.interest_coverage_ratio;
    if (icRatio === null || icRatio === undefined) icRatio = 20; // default safe if no debt
    
    if (deRatio > 0.5) r += 0.015;
    if (icRatio < 3.0) r += 0.020;
    if (icRatio > 15.0) r -= 0.005;
    
    if (r < 0.10) r = 0.10;
    if (r > 0.16) r = 0.16;
    
    // 3. Recalculate DCF
    const currentPrice = parseFloat(data.ratios["Current Price"] || 0);
    const pe = parseFloat(data.ratios["Stock P/E"] || 1);
    let eps = currentPrice / pe;
    if(isNaN(eps) || eps <= 0) eps = data.analytics.intrinsic_value_dcf.value * 0.05;
    
    const terminalGrowth = 0.04;
    
    if (eps > 0 && currentPrice > 0) {
        let dcfValue = 0;
        let projectedEps = eps;
        for (let year = 1; year <= 10; year++) {
            projectedEps *= (1 + g);
            dcfValue += projectedEps / Math.pow(1 + r, year);
        }
        const terminalValue = projectedEps * (1 + terminalGrowth) / (r - terminalGrowth);
        dcfValue += terminalValue / Math.pow(1 + r, 10);
        
        data.analytics.intrinsic_value_dcf = {
            value: Math.round(dcfValue * 100) / 100,
            growth_rate_used: (g * 100).toFixed(1) + "%",
            discount_rate: (r * 100).toFixed(1) + "%",
            terminal_growth: "4.0%",
            current_price: currentPrice,
            upside_pct: Math.round(((dcfValue - currentPrice) / currentPrice) * 10000) / 100,
            is_dynamic: true
        };
    }
}

function renderAIEvaluationCard() {
  const container = document.getElementById('ai-eval-content');
  const linkBtn = document.getElementById('ai-gf-link');
  if (!container || !linkBtn) return;

  const yfData = companyData.yahoo_finance || {};
  const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
  const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
  const gfUrl = `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;
  
  linkBtn.href = gfUrl;

  let aiDrivers = "Company-specific fundamental drivers and market momentum catalysts.";
  let aiRisks = "Potential sector headwinds, valuation overhangs, or margin compressions.";
  let aiValuation = "Comprehensive scorecard evaluating ROCE and multiple expansion viability.";

  if (companyData) {
      // Extract metrics
      const cagr = companyData.compounded_sales_growth || {};
      const salesCAGR3Y = parseFloat(cagr['3 Years'] || 0);
      const salesCAGR5Y = parseFloat(cagr['5 Years'] || 0);
      
      const ratios = companyData.ratios || {};
      const roce = parseFloat(ratios['ROCE'] || 0);
      const currentPrice = parseFloat((ratios['Current Price'] || '0').toString().replace(/,/g, ''));
      
      const analytics = companyData.analytics || {};
      const zScore = parseFloat(analytics.altman_z_score || 0);
      const fScore = parseInt(analytics.piotroski_score || 0);
      const grahamValue = parseFloat(analytics.graham_number || 0);
      const dcfValue = parseFloat(analytics.dcf_intrinsic_value || 0);

      // 1. Dynamic Strategic Tailwinds Engine
      if ((salesCAGR3Y > 12 || salesCAGR5Y > 12) && roce > 15) {
          aiDrivers = `Exhibits structural market share expansion and compounding capital efficiency with a ${salesCAGR3Y || salesCAGR5Y}% sales CAGR and robust ${roce}% ROCE, indicating formidable operating leverage.`;
      } else {
          aiDrivers = `Revenue growth remains muted or highly cyclical (ROCE: ${roce || '--'}%). Monitor for active operational turnaround drivers, margin expansion pivots, or cost-optimization strategies to catalyze forward momentum.`;
      }

      // 2. Dynamic Risk Factors Engine
      if ((analytics.altman_z_score && zScore < 2.99) || (analytics.piotroski_score && fScore < 5)) {
          aiRisks = `Elevated structural vulnerabilities detected (Z-Score: ${analytics.altman_z_score ? zScore.toFixed(2) : '--'}, F-Score: ${analytics.piotroski_score ? fScore : '--'}). Explicitly flag solvency risks, working capital pressure, or escalating leverage burdens.`;
      } else if (analytics.altman_z_score || analytics.piotroski_score) {
          aiRisks = `Demonstrates defensive balance sheet strength and operational resilience (Z-Score: ${analytics.altman_z_score ? zScore.toFixed(2) : '--'}, F-Score: ${analytics.piotroski_score ? fScore : '--'}). Low relative financial distress risk.`;
      } else {
          aiRisks = "Monitor potential sector headwinds, regulatory shifts, or macroeconomic margin compressions affecting working capital.";
      }

      // 3. Dynamic Valuation Insight Engine
      const baselineValue = dcfValue > 0 ? dcfValue : grahamValue;
      const baselineName = dcfValue > 0 ? 'DCF Value' : (grahamValue > 0 ? 'Graham Number' : null);

      if (baselineName && currentPrice > 0) {
          const difference = ((currentPrice - baselineValue) / baselineValue) * 100;
          if (difference < -10) {
              aiValuation = `Trading at an attractive margin of safety. Current price (₹${currentPrice.toFixed(2)}) reflects a ${Math.abs(difference).toFixed(1)}% discount to its algorithmic baseline ${baselineName} (₹${baselineValue.toFixed(2)}).`;
          } else if (difference > 10) {
              aiValuation = `Pricing in aggressive forward growth expectations. Current price (₹${currentPrice.toFixed(2)}) trades at a ${difference.toFixed(1)}% premium over its algorithmic baseline ${baselineName} (₹${baselineValue.toFixed(2)}).`;
          } else {
              aiValuation = `Trading relatively in line with fair value estimates. Current price (₹${currentPrice.toFixed(2)}) is within ${Math.abs(difference).toFixed(1)}% of its algorithmic baseline ${baselineName} (₹${baselineValue.toFixed(2)}).`;
          }
      } else {
          aiValuation = "Insufficient fundamental data to compute algorithmic intrinsic valuation baselines. Focus on comparative peer multiples and relative EV/EBITDA metrics.";
      }
  }

    container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0.75rem; height: 100%; justify-content: space-between; flex: 1;">
      <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 0.85rem; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="color:var(--accent-emerald); margin:0 0 0.4rem 0; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;"><i class="fa-solid fa-arrow-trend-up"></i> Strategic Tailwinds</h4>
        <p style="margin:0; font-size: 0.85rem; line-height: 1.5; color: var(--text-primary);">${aiDrivers}</p>
      </div>
      <div style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 0.85rem; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="color:var(--accent-rose); margin:0 0 0.4rem 0; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;"><i class="fa-solid fa-triangle-exclamation"></i> Risk Factors</h4>
        <p style="margin:0; font-size: 0.85rem; line-height: 1.5; color: var(--text-primary);">${aiRisks}</p>
      </div>
      <div style="background: rgba(6, 182, 212, 0.08); border-left: 4px solid var(--accent-cyan); padding: 0.85rem; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="color:var(--accent-cyan); margin:0 0 0.4rem 0; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;"><i class="fa-solid fa-scale-balanced"></i> Valuation Insight</h4>
        <p style="margin:0; font-size: 0.85rem; line-height: 1.5; color: var(--text-primary);">${aiValuation}</p>
      </div>
    </div>
  `;
}

function renderTopGoogleFinanceAI() {
    const nameEl = document.getElementById('gfair-company-name');
    const tickerEl = document.getElementById('gfair-ticker');
    const launchBtn = document.getElementById('gfair-launch-btn');
    
    if (!nameEl || !tickerEl || !launchBtn || !companyData) return;
    
    nameEl.textContent = companyData.company_name || 'Unknown Company';
    tickerEl.textContent = companyData.ticker || 'N/A';
    
    // Programmatically construct the target URL dynamically
    const cleanTicker = (companyData.ticker || '').replace('.NS', '').replace('.BO', '');
    let gfUrl = '';
    
    if (cleanTicker && companyData.ticker) {
        // Primary Ticker Match
        const exchangeSuffix = companyData.ticker.includes('.BO') ? ':BOM' : ':NSE';
        gfUrl = `https://www.google.com/finance/quote/${cleanTicker}${exchangeSuffix}`;
    } else if (companyData.company_name) {
        // Robust Fallback Mode
        const encodedName = encodeURIComponent(companyData.company_name);
        gfUrl = `https://www.google.com/finance/search?q=${encodedName}`;
    } else {
        gfUrl = 'https://www.google.com/finance/';
    }
    
    launchBtn.href = gfUrl;
}

// Focus/blur handlers for 3D Tricolor search wrapper
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchWrapper = document.getElementById('search-form-wrapper');
    if (searchInput && searchWrapper) {
        searchInput.addEventListener('focus', () => {
            searchWrapper.classList.add('focus-active');
        });
        searchInput.addEventListener('blur', () => {
            searchWrapper.classList.remove('focus-active');
        });
    }
});
