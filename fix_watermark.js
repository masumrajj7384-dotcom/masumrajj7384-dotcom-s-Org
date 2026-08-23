import fs from 'fs';

let html = fs.readFileSync('app/static/index.html', 'utf8');

// Ensure correct image src
html = html.replace(/src="Indian%20Flag.png"/g, 'src="Indian Flag.png"');
fs.writeFileSync('app/static/index.html', html);

let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(/url\('Indian%20Flag.png'\)/g, "url('Indian Flag.png')");

// Also, let's adjust the opacity to make it a bit more visible if they asked to redo it.
// Maybe opacity 0.08 was too faint? Let's make it 0.15 and remove the color-dodge if it was hiding it.
css = css.replace(/opacity: 0.08; \/\* Very subtle so it doesn't break readability \*\//g, "opacity: 0.15; /* Increased opacity */");
css = css.replace(/mix-blend-mode: color-dodge; \/\* Blends nicely in dark mode \*\//g, "mix-blend-mode: overlay; /* Better visibility */");

fs.writeFileSync('app/static/style.css', css);
console.log("Fixed watermark path and visibility");
