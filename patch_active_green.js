import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

css = css.replace(
  /\.tab-btn\.active \{\s*background: #fa2500 !important;/g,
  `.tab-btn.active {\n  background: linear-gradient(135deg, #22c55e, #10b981, #047857) !important;`
);

css = css.replace(
  /box-shadow: 0 10px 25px rgba\(139, 92, 246, 0\.5\)/g,
  `box-shadow: 0 10px 25px rgba(16, 185, 129, 0.6)`
);

fs.writeFileSync('app/static/style.css', css);
console.log("active green patched");
