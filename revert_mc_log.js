import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

code = code.replace(
    /\} catch \(e\) \{ console\.error\('MC Error:', e\.message\); \}/g,
    "} catch (e) {}"
);

fs.writeFileSync('scraper.js', code);
