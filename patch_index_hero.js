import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = /<div id="hero-3d-banner" class="hero-3d-card">[\s\S]*?<\/div>\s*<\/div>/;

const replacement = `<div id="hero-3d-banner" class="hero-3d-card thick-frosted">
            <div class="hero-shimmer sweep"></div>
            
            <div class="hero-3d-content">
              <h2 class="hero-3d-title extruded">Multi-Source Financial Intelligence</h2>
              <p style="color: var(--text-secondary); margin-bottom: 1.5rem; transform: translateZ(30px); font-size: 0.95rem; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">Data aggregated from Screener.in, MoneyControl, Google Finance, and Yahoo Finance.</p>
              
              <div class="hero-badges-wrapper">
                <span class="hero-badge badge-screener"><i class="fa-solid fa-database"></i> Screener.in</span>
                <span class="hero-badge badge-moneycontrol"><i class="fa-solid fa-building"></i> MoneyControl</span>
                <span class="hero-badge badge-google"><i class="fa-brands fa-google"></i> Google Finance</span>
                <span class="hero-badge badge-yahoo"><i class="fa-solid fa-chart-pie"></i> Yahoo Finance</span>
              </div>
            </div>
            
            <div class="hero-disclaimer-bar amber-glow">
              <i class="fa-solid fa-triangle-exclamation"></i> ⚠️ For educational purposes only.
            </div>
          </div>
        </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("index.html patched with 3D hero banner updates");
