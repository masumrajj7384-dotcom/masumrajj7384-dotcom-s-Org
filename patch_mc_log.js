import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

code = code.replace(
    /\} catch \(e\) \{\}/g,
    "} catch (e) { console.error('MC Error:', e.message); }"
);

fs.writeFileSync('scraper.js', code);
