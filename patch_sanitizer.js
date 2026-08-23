import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace("return str.replace(/[^a-zA-Z0-9.\\-\\s]/g, '').trim();", "return str.replace(/[^a-zA-Z0-9.\\-\\s&\\'(),]/g, '').trim();");
fs.writeFileSync('server.js', js);
console.log("Patched sanitizer regex 2");
