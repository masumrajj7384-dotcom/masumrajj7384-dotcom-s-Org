const fs = require('fs');
let html = fs.readFileSync('app/static/index.html', 'utf8');

// 1. Remove the Insights button
html = html.replace(/<button class="tab-btn" onclick="switchTab\('tab-insights'\)"><i class="fa-solid fa-brain"><\/i> Insights<\/button>\s*/, '');

// 2. Move the News button to where the Insights button was (before Statements)
const newsBtnRegex = /<button class="tab-btn" onclick="switchTab\('tab-news'\)"><i class="fa-solid fa-newspaper"><\/i> Latest News<\/button>\s*/;
html = html.replace(newsBtnRegex, ''); // Remove it from the end

const statementsBtnRegex = /(<button class="tab-btn" onclick="switchTab\('tab-tables'\)">)/;
html = html.replace(statementsBtnRegex, '<button class="tab-btn" onclick="switchTab(\'tab-news\')"><i class="fa-solid fa-newspaper"></i> Latest News</button>\n        $1');

// 3. Remove the entire Insights section
// We can use a regex that matches from <!-- TAB 3: Insights --> up to <!-- TAB 4: Financial Statements -->
const insightsSectionRegex = /<!-- TAB 3: Insights -->[\s\S]*?(?=<!-- TAB 4: Financial Statements -->)/;
html = html.replace(insightsSectionRegex, '');

fs.writeFileSync('app/static/index.html', html);
console.log("Patched HTML");
