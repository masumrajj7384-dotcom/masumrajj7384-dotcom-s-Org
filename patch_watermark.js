import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

// Replace logo area and title to include the image and fix name
const oldLogoArea = `<div class="logo-area">
        <i class="fa-solid fa-chart-line logo-icon"></i>
        <div class="logo-text-group" style="display: flex; flex-direction: column;">
          <h1 style="line-height: 1;">Screener<span>Insight</span> <em class="pro-tag">PRO</em></h1>
          <div class="creator-3d">by Masum Raj</div>
        </div>
      </div>`;

const newLogoArea = `<div class="logo-area" style="display: flex; align-items: center; gap: 15px;">
        <img src="Indian%20Flag.png" alt="Watermark" style="height: 45px; object-fit: contain; opacity: 0.9; border-radius: 4px; box-shadow: 0 0 10px rgba(255,153,51,0.3);">
        <i class="fa-solid fa-chart-line logo-icon" style="display:none;"></i>
        <div class="logo-text-group" style="display: flex; flex-direction: column;">
          <h1 style="line-height: 1;">Screener<span>Insight</span> <em class="pro-tag">PRO</em></h1>
          <div class="creator-3d">by Masoom Raj</div>
        </div>
      </div>`;

html = html.replace(oldLogoArea, newLogoArea);

// Add full screen watermark right after <body>
html = html.replace('<body>', '<body>\n  <div class="fullscreen-watermark"></div>');

fs.writeFileSync('app/static/index.html', html);
console.log("Patched HTML with watermarks");
