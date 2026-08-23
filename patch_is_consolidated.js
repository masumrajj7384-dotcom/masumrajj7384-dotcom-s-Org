import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

js = js.replace("is_consolidated: $('.company-links a.active').text().toLowerCase().includes('consolidated'),", "/* removed */");
js = js.replace("return { fallback: false, ...parsed, url: successUrl };", "return { fallback: false, ...parsed, url: successUrl, is_consolidated: successUrl.includes('consolidated') };");

fs.writeFileSync('scraper.js', js);
console.log("Updated is_consolidated logic");
