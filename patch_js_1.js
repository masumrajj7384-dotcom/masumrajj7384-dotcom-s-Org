import fs from 'fs';

let appJs = fs.readFileSync('app/static/app.js', 'utf8');

// The new robust autocomplete dataset and logic
const robustAutocompleteLogic = `
const STOCKS_DB = [
  { ticker: "RELIANCE", name: "Reliance Industries", ex: "NSE", p: "2,850.40", c: "+1.2%" },
  { ticker: "TCS", name: "Tata Consultancy Services", ex: "NSE", p: "4,120.15", c: "+0.8%" },
  { ticker: "HDFCBANK", name: "HDFC Bank", ex: "NSE", p: "1,650.30", c: "-0.5%" },
  { ticker: "INFY", name: "Infosys Ltd", ex: "NSE", p: "1,480.90", c: "+1.5%" },
  { ticker: "ITC", name: "ITC Limited", ex: "NSE", p: "435.60", c: "-0.2%" },
  { ticker: "TATAMOTORS", name: "Tata Motors", ex: "NSE", p: "980.25", c: "+2.1%" },
  { ticker: "BHARTIARTL", name: "Bharti Airtel", ex: "NSE", p: "1,250.70", c: "+1.1%" },
  { ticker: "LT", name: "Larsen & Toubro", ex: "NSE", p: "3,650.10", c: "+0.4%" },
  { ticker: "HINDUNILVR", name: "Hindustan Unilever", ex: "NSE", p: "2,410.50", c: "-0.8%" },
  { ticker: "ICICIBANK", name: "ICICI Bank", ex: "NSE", p: "1,150.20", c: "+0.9%" },
  { ticker: "SBIN", name: "State Bank of India", ex: "NSE", p: "765.40", c: "+1.3%" },
  { ticker: "WIPRO", name: "Wipro Limited", ex: "NSE", p: "490.80", c: "-1.1%" },
  { ticker: "BAJFINANCE", name: "Bajaj Finance", ex: "NSE", p: "7,120.60", c: "-0.3%" },
  { ticker: "MARUTI", name: "Maruti Suzuki", ex: "NSE", p: "12,340.50", c: "+1.8%" },
  { ticker: "KOTAKBANK", name: "Kotak Mahindra Bank", ex: "NSE", p: "1,780.20", c: "+0.5%" }
];

let currentFocus = -1;

function renderAutocomplete(results) {
  if (results.length > 0) {
    autocompleteDropdown.innerHTML = results.map((item, index) => {
      const isPos = item.c.startsWith('+');
      return \`<div class="autocomplete-item" id="ac-item-\${index}" onclick="searchPreset('\${item.ticker}')">
        <div class="ac-left">
          <span class="ticker">\${item.ticker}</span>
          <span class="name">\${item.name}</span>
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
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  const q = e.target.value.trim().toLowerCase();
  currentFocus = -1;
  if (q.length < 1) {
    autocompleteDropdown.classList.add('hidden');
    return;
  }
  
  // Local robust filtering
  const results = STOCKS_DB.filter(s => 
    s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  );
  
  renderAutocomplete(results);
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
  chips.innerHTML = hist.map(ticker => \`
    <div class="recent-chip" onclick="searchPreset('\${ticker}')">
      <i class="fa-solid fa-clock-rotate-left"></i> \${ticker}
      <button type="button" class="recent-chip-delete" onclick="deleteRecentSearch('\${ticker}', event)">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  \`).join('');
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderRecentSearches();
});
`;

// Now replace the old event listener and add searchPreset override
const oldAutocompleteRegex = /let debounceTimer;[\s\S]*?\}\);/m;
appJs = appJs.replace(oldAutocompleteRegex, robustAutocompleteLogic);

// We need to inject `saveRecentSearch(ticker)` into searchPreset
const searchPresetRegex = /function searchPreset\(ticker\) \{([\s\S]*?fetchCompanyData\(ticker\);[\s\S]*?)\}/m;
appJs = appJs.replace(searchPresetRegex, (match, p1) => {
  return `function searchPreset(ticker) {
  saveRecentSearch(ticker);
${p1}
}`;
});

// Also in the main form submit listener:
const formSubmitRegex = /document\.getElementById\('search-form'\)\.addEventListener\('submit', function\(e\) \{([\s\S]*?fetchCompanyData\(ticker\);[\s\S]*?)\}/m;
appJs = appJs.replace(formSubmitRegex, (match, p1) => {
  return `document.getElementById('search-form').addEventListener('submit', function(e) {
  const ticker = searchInput.value.trim().toUpperCase();
  if (ticker) saveRecentSearch(ticker);
${p1}
}`;
});

fs.writeFileSync('app/static/app.js', appJs);
console.log("Updated app.js successfully.");
