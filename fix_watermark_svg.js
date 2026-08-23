import fs from 'fs';

let html = fs.readFileSync('app/static/index.html', 'utf8');
html = html.replace(/src="indian-flag.png"/g, 'src="indian-flag.svg"');
fs.writeFileSync('app/static/index.html', html);

let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(/url\('indian-flag.png'\)/g, "url('indian-flag.svg')");
fs.writeFileSync('app/static/style.css', css);
console.log("Updated to SVG");
