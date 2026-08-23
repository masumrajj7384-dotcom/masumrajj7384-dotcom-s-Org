import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace(/app\.use\(helmet\(\{.*?\}\)\);/s, `app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  xFrameOptions: false,
  contentSecurityPolicy: false,
  referrerPolicy: false
}));`);

fs.writeFileSync('server.js', js);
console.log("Patched server to remove referrer policy");
