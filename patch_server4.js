import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace(/\\^a-zA-Z0-9\.\\-\\s&\\'(),/g, "^a-zA-Z0-9.\\-\\s&\\'():_^=");
fs.writeFileSync('server.js', js);
console.log("Patched sanitizeInput");
