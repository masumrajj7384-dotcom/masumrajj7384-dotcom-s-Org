import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<section id="tab-cross" class="tab-content col-span-12 grid-sub">`;
const replacement = `<section id="tab-cross" class="tab-content col-span-12 grid-sub">
        <!-- 3D Interactive Hero Banner -->
        <div class="col-span-12 perspective-container">
          <div id="hero-3d-banner" class="hero-3d-card">
            <div class="hero-shimmer"></div>
            
            <div class="hero-3d-content">
              <h2 class="hero-3d-title">Multi-Source Financial Intelligence</h2>
              
              <div class="hero-badges-wrapper">
                <span class="hero-badge badge-screener"><i class="fa-solid fa-database"></i> Screener.in</span>
                <span class="hero-badge badge-moneycontrol"><i class="fa-solid fa-building"></i> MoneyControl</span>
                <span class="hero-badge badge-google"><i class="fa-brands fa-google"></i> Google Finance</span>
              </div>
            </div>
            
            <div class="hero-disclaimer-bar">
              <i class="fa-solid fa-lock"></i> Data aggregated from multi-source engines. For educational purposes only.
            </div>
          </div>
        </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("index.html patched with hero banner");
