import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

// Find all occurrences of headers iteration and ensure they ignore TTM if applicable, though only P&L usually has TTM.
content = content.replace(/if \(h && h\.trim\(\)\) \{/g, "if (h && h.trim() && h.toLowerCase() !== 'ttm') {");
content = content.replace(/if \(rHeaders\[i\] && rHeaders\[i\]\.trim\(\)\) \{/g, "if (rHeaders[i] && rHeaders[i].trim() && rHeaders[i].toLowerCase() !== 'ttm') {");
content = content.replace(/if \(bsHeaders\[i\] && bsHeaders\[i\]\.trim\(\)\) \{/g, "if (bsHeaders[i] && bsHeaders[i].trim() && bsHeaders[i].toLowerCase() !== 'ttm') {");
content = content.replace(/if \(qHeaders\[i\] && qHeaders\[i\]\.trim\(\)\) \{/g, "if (qHeaders[i] && qHeaders[i].trim() && qHeaders[i].toLowerCase() !== 'ttm') {");
content = content.replace(/if \(headers\[i\] && headers\[i\]\.trim\(\)\) \{/g, "if (headers[i] && headers[i].trim() && headers[i].toLowerCase() !== 'ttm') {");

fs.writeFileSync('app/static/app.js', content);
