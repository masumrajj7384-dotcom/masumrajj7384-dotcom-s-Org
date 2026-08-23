import fs from 'fs';

let appJs = fs.readFileSync('app/static/app.js', 'utf8');

const newDbRegex = /const STOCKS_DB = \[[\s\S]*?\];/m;

const newDb = `const STOCKS_DB = [
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
  { ticker: "HEROMOTOCO.NS", name: "Hero MotoCorp", ex: "NSE", p: "4,820.60", c: "+0.5%", sector: "Automobile" }
];`;

appJs = appJs.replace(newDbRegex, newDb);

// Now for renderAutocomplete to include highlighing
const highlightLogicRegex = /function renderAutocomplete\(results\) \{[\s\S]*?autocompleteDropdown\.classList\.add\('hidden'\);\n  \}\n\}/m;

const newHighlightLogic = `function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(\`(\${query})\`, 'gi');
  return text.replace(regex, '<span style="color: var(--accent-amber); font-weight: bold; background: rgba(245, 158, 11, 0.15);">$1</span>');
}

function renderAutocomplete(results, query = "") {
  if (results.length > 0) {
    autocompleteDropdown.innerHTML = results.map((item, index) => {
      const isPos = item.c.startsWith('+');
      const highlightedName = highlightMatch(item.name, query);
      const highlightedTicker = highlightMatch(item.ticker, query);
      return \`<div class="autocomplete-item" id="ac-item-\${index}" onclick="searchPreset('\${item.ticker}')">
        <div class="ac-left">
          <span class="ticker">\${highlightedTicker}</span>
          <span class="name">\${highlightedName}</span>
          <span class="ac-badge">\${item.ex}</span>
        </div>
        <div class="ac-right">
          <span class="ac-price">₹\${item.p}</span>
          <span class="ac-change \${isPos ? 'pos' : 'neg'}">\${item.c}</span>
        </div>
      </div>\`;
    }).join('');
    autocompleteDropdown.classList.remove('hidden');
  } else {
    autocompleteDropdown.classList.add('hidden');
  }
}`;

appJs = appJs.replace(highlightLogicRegex, newHighlightLogic);

// Now for searchInput.addEventListener('input', ...)
const searchInputRegex = /searchInput\.addEventListener\('input', \(e\) => \{[\s\S]*?renderAutocomplete\(results\);\n\}\);/m;

const newSearchInput = `searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  const q = e.target.value.trim();
  currentFocus = -1;
  if (q.length < 1) {
    autocompleteDropdown.classList.add('hidden');
    return;
  }
  
  // Local robust fuzzy filtering
  const qLower = q.toLowerCase();
  const results = STOCKS_DB.filter(s => 
    s.ticker.toLowerCase().includes(qLower) || s.name.toLowerCase().includes(qLower)
  );
  
  renderAutocomplete(results, q);
});`;

appJs = appJs.replace(searchInputRegex, newSearchInput);

fs.writeFileSync('app/static/app.js', appJs);
console.log("Updated app.js successfully for comprehensive DB and highlighting.");
