import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(/opacity:\s*0\.3;\s*\/\*\s*Much more visible\s*\*\//g, "opacity: 0.2;");
fs.writeFileSync('app/static/style.css', css);
console.log("Updated opacity to 0.2");
