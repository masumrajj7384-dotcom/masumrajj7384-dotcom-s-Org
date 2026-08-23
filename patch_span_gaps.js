import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(
  "{ label: 'ROCE %', data: roceData, borderColor: '#06b6d4', borderWidth: 3, tension: 0.3, fill: false },",
  "{ label: 'ROCE %', data: roceData, borderColor: '#06b6d4', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true },"
);
js = js.replace(
  "{ label: 'ROE %', data: roeData, borderColor: '#f59e0b', borderWidth: 3, tension: 0.3, fill: false }",
  "{ label: 'ROE %', data: roeData, borderColor: '#f59e0b', borderWidth: 3, tension: 0.3, fill: false, spanGaps: true }"
);

fs.writeFileSync('app/static/app.js', js);
console.log("Patched spanGaps in Chart 6");
