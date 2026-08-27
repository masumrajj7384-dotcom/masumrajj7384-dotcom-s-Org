const fs = require('fs');
const content = fs.readFileSync('app/static/deep_tooltips.js', 'utf8');
const regex = /"([^"]+)":\s*\{/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1]);
}
