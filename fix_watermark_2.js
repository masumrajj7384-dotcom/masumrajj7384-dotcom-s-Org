import fs from 'fs';

let html = fs.readFileSync('app/static/index.html', 'utf8');
html = html.replace(/src="Indian Flag.png"/g, 'src="indian-flag.png"');
fs.writeFileSync('app/static/index.html', html);

let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(/url\('Indian Flag.png'\)/g, "url('indian-flag.png')");
// Let's also make sure the fullscreen watermark covers everything properly
// Ensure it's not overriding interactions
css = css.replace(/pointer-events: none;/g, "pointer-events: none; /* Crucial for clicks to pass through */");
fs.writeFileSync('app/static/style.css', css);
console.log("Fixed watermark path to use no spaces");
