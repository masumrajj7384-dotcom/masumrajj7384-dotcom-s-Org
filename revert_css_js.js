import fs from 'fs';

// Revert style.css
let css = fs.readFileSync('app/static/style.css', 'utf8');
const cssRegex = /\/\* Chatbot Styles \*\/[\s\S]*$/g;
css = css.replace(cssRegex, '');
fs.writeFileSync('app/static/style.css', css);

// Revert app.js
let js = fs.readFileSync('app/static/app.js', 'utf8');
const jsRegex = /\/\/ =============================================================================\n\/\/ AI FINANCIAL ASSISTANT \(CHATBOT\)[\s\S]*$/g;
js = js.replace(jsRegex, '');
fs.writeFileSync('app/static/app.js', js);

console.log("CSS and JS reverted");
