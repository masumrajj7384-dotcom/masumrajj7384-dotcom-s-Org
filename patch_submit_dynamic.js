import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldSubmit = `document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const ticker = searchInput.value.trim().toUpperCase();
  if (ticker) {
    saveRecentSearch(ticker);
    autocompleteDropdown.classList.add('hidden');
    fetchCompanyData(ticker);
  }
});`;

const newSubmit = `document.getElementById('search-form').addEventListener('submit', function(e) {
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
});`;

if (js.includes("document.getElementById('search-form').addEventListener('submit', function(e) {")) {
    js = js.replace(/document\.getElementById\('search-form'\)\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);/m, newSubmit);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Submit logic updated for dynamic fallback.");
} else {
    console.log("Could not find submit logic.");
}
