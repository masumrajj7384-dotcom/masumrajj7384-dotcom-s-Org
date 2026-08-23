import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<h2 class="hero-3d-title">Multi-Source Financial Intelligence</h2>`;
const replacement = `<h2 class="hero-3d-title">Multi-Source Financial Intelligence</h2>
              <p style="color: var(--text-secondary); margin-bottom: 1.5rem; transform: translateZ(30px); font-size: 0.95rem;">Data aggregated from Screener.in, MoneyControl, and Google Finance.</p>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("index.html text patched");
