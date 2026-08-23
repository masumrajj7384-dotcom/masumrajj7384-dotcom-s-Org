import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

css = css.replace(/opacity:\s*0\.2;/g, "opacity: 0.15; /* Increased opacity */");
css = css.replace(/mix-blend-mode:\s*screen;\s*\/\*\s*Brighter visibility on dark theme\s*\*\//g, "mix-blend-mode: overlay; /* Better visibility */");

fs.writeFileSync('app/static/style.css', css);
console.log("Restored previous styles!");
