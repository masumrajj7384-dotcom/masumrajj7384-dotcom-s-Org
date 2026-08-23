import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(
  "if (equity !== 0 && !isNaN(equity) && npRow && !isNaN(np)) roe = (np / equity) * 100;",
  "if (equity !== 0 && !isNaN(equity) && npRow && !isNaN(np) && np !== 0) roe = (np / equity) * 100;"
);

fs.writeFileSync('app/static/app.js', js);
console.log("Patched NP check");
