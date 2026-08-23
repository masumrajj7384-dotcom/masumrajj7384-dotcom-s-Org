import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace("renderNewsFeed();", "// renderNewsFeed(); // Disabled in favor of fetchAndRenderNews");

fs.writeFileSync('app/static/app.js', js);
console.log("Patched renderNewsFeed call");
