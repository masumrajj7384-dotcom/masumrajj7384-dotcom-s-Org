const fs = require('fs');
const content = fs.readFileSync('app/static/deep_tooltips.js', 'utf8');
console.log(content);
