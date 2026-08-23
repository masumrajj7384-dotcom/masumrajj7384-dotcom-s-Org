import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const target = `const selectedTab = document.getElementById(tabId);`;
const replacement = `console.log("Switching to tab:", tabId);
  const selectedTab = document.getElementById(tabId);`;

if (!code.includes('console.log("Switching to tab:"')) {
    code = code.replace(target, replacement);
    fs.writeFileSync('app/static/app.js', code);
    console.log("Added log");
} else {
    console.log("Log already exists");
}
