import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(/getRowByName\(bsTable,\s*'Borrowings'\)/g, "getRowByName(bsTable, 'Borrowing')");
js = js.replace(/getRowByName\(bsTable,\s*'Borrowing'\)/g, "getRowByName(bsTable, 'Borrowing')");

fs.writeFileSync('app/static/app.js', js);
console.log("Patched Borrowings globally");
