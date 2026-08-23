import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(
  "const opRow = getRowByName(pnlTable, 'Operating Profit');",
  "const opRow = getRowByName(pnlTable, 'Operating Profit') || getRowByName(pnlTable, 'Financing Profit');"
);
js = js.replace(
  "const borRow = getRowByName(bsTable, 'Borrowings');",
  "const borRow = getRowByName(bsTable, 'Borrowing');"
);

fs.writeFileSync('app/static/app.js', js);
console.log("Patched fallback rows successfully");
