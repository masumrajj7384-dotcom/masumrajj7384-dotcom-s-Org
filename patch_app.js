import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /function renderAutocomplete\(results, query = ""\) \{[\s\S]*?autocompleteDropdown\.classList\.add\('hidden'\);\n\s*\}/m;

const replacement = `function renderAutocomplete(results, query = "") {
  if (results.length > 0) {
    autocompleteDropdown.innerHTML = results.map((item, index) => {
      const isPos = item.c.startsWith('+');
      const highlightedName = highlightMatch(item.name, query);
      const highlightedTicker = highlightMatch(item.ticker, query);
      
      return \`<div class="autocomplete-item" id="ac-item-\${index}" onclick="searchPreset('\${item.ticker}')">
        <div class="ac-left" style="display: flex; align-items: center; gap: 10px; flex: 1; overflow: hidden;">
          <span class="ac-badge">\${item.ex}</span>
          <span class="name" style="flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${highlightedName}</span>
          <span class="ticker">\${highlightedTicker}</span>
        </div>
        <div class="ac-right" style="flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; margin-left: 10px;">
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

if(js.match(regex)){
    js = js.replace(regex, replacement);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Patched renderAutocomplete successfully.");
} else {
    console.log("Regex not found");
}
