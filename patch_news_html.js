import fs from 'fs';
let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<div id="news-feed-container" class="news-feed-grid">
            <p style="color:var(--text-secondary);">Loading latest market intelligence...</p>
          </div>`;

const replacement = `<div class="news-filter-bar" style="display:flex; gap:10px; margin-bottom: 15px; flex-wrap: wrap;">
            <button class="news-filter-btn active" data-filter="all">All</button>
            <button class="news-filter-btn" data-filter="bullish">🟢 Bullish / Positive</button>
            <button class="news-filter-btn" data-filter="bearish">🔴 Bearish / Risk</button>
            <button class="news-filter-btn" data-filter="moving">⚡ Market Moving</button>
          </div>
          <div id="news-feed-container" class="news-feed-grid">
            <p style="color:var(--text-secondary);">Loading latest market intelligence...</p>
          </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("news html patched");
