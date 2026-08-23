import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace(/max: 150,/g, "max: 1500,");
fs.writeFileSync('server.js', js);
console.log("Patched rate limiter");
