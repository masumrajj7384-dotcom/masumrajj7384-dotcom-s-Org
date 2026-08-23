import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

// Remove marked.js
code = code.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/marked\/marked\.min\.js"><\/script>\n?/g, '');

// Remove chatbot UI
const chatRegex = /<!-- Floating Chatbot UI -->[\s\S]*<\/body>/g;
code = code.replace(chatRegex, '</body>');

fs.writeFileSync('app/static/index.html', code);
console.log("index.html reverted");
