import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

css = css.replace(/order:\s*1;/g, '');
css = css.replace(/order:\s*2;/g, '');

fs.writeFileSync('app/static/style.css', css);
console.log("Removed order overrides from CSS.");
