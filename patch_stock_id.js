import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const target = "{ label: 'Stock ID (sc_id)', screener: '-', mc: `<span style=\"font-weight:700;color:var(--accent-amber);\">${mc.sc_id || 'N/A'}</span>`, gf: '-', yf: '-' },";

const replacement = "{ label: 'Stock ID', screener: `<span style=\"font-weight:700;color:var(--accent-emerald);\">${companyData.ticker || 'N/A'}</span>`, mc: `<span style=\"font-weight:700;color:var(--accent-amber);\">${mc.sc_id || 'N/A'}</span>`, gf: `<span style=\"font-weight:700;color:var(--accent-blue);\">${gf.found ? (nseCode + ':NSE') : 'N/A'}</span>`, yf: `<span style=\"font-weight:700;color:#a855f7;\">${yf.found ? yf.symbol : 'N/A'}</span>` },";

code = code.replace(target, replacement);

fs.writeFileSync('app/static/app.js', code);
console.log("Stock ID row updated.");
