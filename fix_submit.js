import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const faulty = `document.getElementById('search-form').addEventListener('submit', function(e) {
  const ticker = searchInput.value.trim().toUpperCase();
  if (ticker) saveRecentSearch(ticker);
  e.preventDefault();
  const ticker = searchInput.value.trim();
  if (ticker) {
    autocompleteDropdown.classList.add('hidden');
    fetchCompanyData(ticker);
  }
});`;

const fixed = `document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const ticker = searchInput.value.trim().toUpperCase();
  if (ticker) {
    saveRecentSearch(ticker);
    autocompleteDropdown.classList.add('hidden');
    fetchCompanyData(ticker);
  }
});`;

if (js.includes("const ticker = searchInput.value.trim().toUpperCase();")) {
    js = js.replace(/document\.getElementById\('search-form'\)\.addEventListener\('submit', function\(e\) \{[\s\S]*?\}\);/m, fixed);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Fixed submit handler.");
} else {
    console.log("Not found.");
}
