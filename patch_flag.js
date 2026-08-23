import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<img src="indian-flag.svg" alt="Watermark" style="height: 45px; object-fit: contain; opacity: 0.9; border-radius: 4px; box-shadow: 0 0 10px rgba(255,153,51,0.3);">`;
const replacement = `<a href="/" title="Home" style="cursor: pointer; display: flex; align-items: center;">
          <img src="indian-flag.svg" alt="Watermark" style="height: 45px; object-fit: contain; opacity: 0.9; border-radius: 4px; box-shadow: 0 0 10px rgba(255,153,51,0.3); cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('app/static/index.html', html);
    console.log("Replaced successfully!");
} else {
    console.log("Target not found!");
}
