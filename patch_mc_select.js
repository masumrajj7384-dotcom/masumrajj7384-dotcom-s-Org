import fs from 'fs';

let code = fs.readFileSync('scraper.js', 'utf8');

const target1 = `        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            const item = res.data[0];
            const link = item.link_src || '';`;

const new1 = `        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            let item = res.data.find(i => i.link_src && i.link_src.includes('/india/')) || res.data[0];
            let exactMatch = res.data.find(i => (i.sc_id || '').toLowerCase() === baseSymbol.toLowerCase() && i.link_src && i.link_src.includes('/india/'));
            if (exactMatch) item = exactMatch;
            const link = item.link_src || '';`;

const target2 = `    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      const item = res.data[0];
      const link = item.link_src || '';`;

const new2 = `    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      let item = res.data.find(i => i.link_src && i.link_src.includes('/india/')) || res.data[0];
      let exactMatch = res.data.find(i => (i.sc_id || '').toLowerCase() === baseSymbol.toLowerCase() && i.link_src && i.link_src.includes('/india/'));
      if (exactMatch) item = exactMatch;
      const link = item.link_src || '';`;

code = code.replace(target1, new1);
code = code.replace(target2, new2);
fs.writeFileSync('scraper.js', code);
console.log("mc_select Patched successfully");
