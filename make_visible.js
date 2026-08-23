import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

css = css.replace(/opacity: 0.15; \/\* Increased opacity \*\//g, "opacity: 0.3; /* Much more visible */");
css = css.replace(/mix-blend-mode: overlay; \/\* Better visibility \*\//g, "mix-blend-mode: screen; /* Brighter visibility on dark theme */");

fs.writeFileSync('app/static/style.css', css);
console.log("Updated opacity and blend mode!");
