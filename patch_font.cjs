const fs = require('fs');
let css = fs.readFileSync('app/static/style.css', 'utf8');

css = css.replace(/@media \(max-width: 640px\) \{\n  \.tab-nav \{\n    padding: 0\.35rem;\n    gap: 0\.4rem;\n  \}\n  \.tab-btn \{\n    padding: 0\.5rem 0\.8rem;\n    font-size: 0\.8rem;\n    gap: 0\.4rem;\n  \}\n\}/, 
`@media (max-width: 640px) {
  .tab-nav {
    padding: 0.35rem;
    gap: 0.4rem;
  }
  .tab-btn {
    padding: 0.6rem 0.9rem;
    font-size: 15px;
    gap: 0.5rem;
  }
}`);

// Also update the base font size to 15px to be perfectly uniform if they meant globally
css = css.replace(/font-size: 0\.95rem;/, 'font-size: 15px;');

fs.writeFileSync('app/static/style.css', css);
console.log("Patched tab nav font size to 15px");
