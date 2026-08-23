import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace(/app\.use\(helmet\(\{.*?\}\)\);/s, `app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  xFrameOptions: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "*", "'unsafe-inline'", "'unsafe-eval'"],
      scriptSrc: ["'self'", "*", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "*", "'unsafe-inline'"],
      imgSrc: ["'self'", "*", "data:"],
      connectSrc: ["'self'", "*"],
      frameAncestors: ["*"]
    }
  }
}));
app.set('trust proxy', 1);`);

fs.writeFileSync('server.js', js);
console.log("Patched server for iframes and proxy trust");
