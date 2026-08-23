import fs from 'fs';

let code = fs.readFileSync('scraper.js', 'utf8');

code = code.replace(/const trueSlug = urlParts\.length > 1 \? urlParts\[urlParts\.length - 2\] : trueScId;/g, 
"const trueSlug = urlParts.length > 1 ? urlParts[urlParts.length - 2] : trueScId;\n            const trueSectorSlug = urlParts.length > 2 ? urlParts[urlParts.length - 3] : 'stocks';");

code = code.replace(/sector: item\.sc_sector \|\| 'General',/g, 
"sector: item.sc_sector || 'General',\n                ticker_slug: trueSlug,\n                sector_slug: trueSectorSlug,");

fs.writeFileSync('scraper.js', code);
console.log("mc_slugs Patched successfully");
