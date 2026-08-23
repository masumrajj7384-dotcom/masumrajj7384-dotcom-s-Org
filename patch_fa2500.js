import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(/background: linear-gradient\(145deg, rgba\(255,255,255,0\.08\), rgba\(0,0,0,0\.4\)\) !important;/g, 'background: #fa2500 !important;');
css = css.replace(/background: linear-gradient\(135deg, #06b6d4, #8b5cf6, #ec4899\) !important;/g, 'background: #fa2500 !important;');
fs.writeFileSync('app/static/style.css', css);
