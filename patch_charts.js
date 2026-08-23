import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

// Fix the cash flow indices error
content = content.replace(
  /const cfHeaders = cashflowTable \? cashflowTable\[0\] : rYearIndices\.map\(\(\) => 0\);\n  let cfYearIndices = \[\];\n  let cfYears = \[\];\n  for \(let i = 1; i < cfHeaders\.length; i\+\+\) {\n    const h = cfHeaders\[i\];\n    if \(h && h\.trim\(\) && h\.toLowerCase\(\) !== 'ttm'\) {\n      cfYearIndices\.push\(i\);\n      cfYears\.push\(h\);\n    }\n  }/s,
  `let cfYearIndices = [];
  let cfYears = [];
  if (cashflowTable && cashflowTable.length > 0) {
    const cfHeaders = cashflowTable[0];
    for (let i = 1; i < cfHeaders.length; i++) {
      const h = cfHeaders[i];
      if (h && h.trim() && h.toLowerCase() !== 'ttm') {
        cfYearIndices.push(i);
        cfYears.push(h);
      }
    }
  }`
);

fs.writeFileSync('app/static/app.js', content);
