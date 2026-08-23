import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /searchInput\.addEventListener\('input', \(e\) => \{[\s\S]*?renderAutocomplete\(results, q\);\n\}\);/m;

const replacement = `searchInput.addEventListener('input', (e) => {
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

      const res = await fetch(\`/api/search?q=\${encodeURIComponent(q)}\`);
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
               sector: 'Auto-resolved'
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
});`;

if (js.match(regex)) {
    js = js.replace(regex, replacement);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Updated app.js input listener for universal coverage");
} else {
    console.log("Could not find input listener regex");
}
