import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

js = js.replace(
  "const company_name = $('h1').text().trim();",
  "const company_name = $('h1').first().text().trim();"
);

fs.writeFileSync('scraper.js', js);
console.log("Updated scraper.js to use first h1 for company_name");
