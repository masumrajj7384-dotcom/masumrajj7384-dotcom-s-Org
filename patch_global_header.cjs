const fs = require('fs');
let css = fs.readFileSync('app/static/style.css', 'utf8');

// Replace base .app-header
const headerBaseRegex = /\.app-header \{\s*display: flex;\s*align-items: center;\s*justify-content: space-between;\s*flex-wrap: wrap;\s*gap: 1\.5rem;\s*border-bottom: 1px solid var\(--border-color\);\s*padding-bottom: 1\.5rem;\s*\}/;
const newHeaderBase = `.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.logo-area {
  order: 1;
  width: 100%;
  justify-content: center;
}

.source-badges {
  order: 2;
  width: 100%;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.search-container {
  order: 3;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}`;
css = css.replace(headerBaseRegex, newHeaderBase);

// Remove the min-width: 1024px block that forces it horizontal
const desktopHeaderRegex = /\/\* Force perfect centering for the search container \*\/[\s\S]*?@media \(min-width: 1024px\) \{[\s\S]*?\}\n\}\n/;
css = css.replace(desktopHeaderRegex, '');

fs.writeFileSync('app/static/style.css', css);
console.log("Patched global header to be vertically stacked");
