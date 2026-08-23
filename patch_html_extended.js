import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const newWelcome = `
    <!-- Extended Market Dashboard (Replaces default Welcome State) -->
    <div id="welcome-state" class="market-overview-dashboard" style="width: 100%;">
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 5px;"><i class="fa-solid fa-chart-line" style="color: var(--accent-emerald); margin-right: 10px;"></i>Institutional Market Dashboard</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Live Macro indicators, FII/DII Institutional flows, and Sectoral matrix for Indian equity markets.</p>
      </div>

      <!-- Quick Screener Presets -->
      <div class="glass-panel" style="margin-bottom: 20px; padding: 15px 20px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted);"><i class="fa-solid fa-bolt" style="margin-right: 5px;"></i> Analyst Screener Presets</span>
        <div class="preset-shortcuts">
          <button class="preset-badge" onclick="applyPreset('SCREENER: High Piotroski F-Score (8-9)')"><i class="fa-solid fa-star"></i> High Piotroski (8-9)</button>
          <button class="preset-badge value" onclick="applyPreset('SCREENER: Graham Discount > 30%')"><i class="fa-solid fa-tags"></i> Graham Discount > 30%</button>
          <button class="preset-badge value" onclick="applyPreset('SCREENER: Low Debt/Eq & ROCE > 20%')"><i class="fa-solid fa-scale-balanced"></i> Low Debt & High ROCE</button>
          <button class="preset-badge growth" onclick="applyPreset('SCREENER: Strong 3-Year Compounders')"><i class="fa-solid fa-arrow-trend-up"></i> Strong 3-Year Compounders</button>
        </div>
      </div>

      <!-- Macro Ticker Bar -->
      <div class="macro-bar" id="macro-ticker-container">
        <!-- Rendered via JS -->
        <span style="color:var(--text-muted); font-size:0.85rem;">Loading macro indicators...</span>
      </div>

      <div class="dashboard-grid">
        <!-- Sectoral Heatmap -->
        <div class="glass-panel col-span-12 md:col-span-8" style="padding: 20px;">
          <h3 style="font-size: 1rem; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;"><i class="fa-solid fa-table-cells-large" style="color: var(--accent-cyan); margin-right: 8px;"></i>Sectoral Heatmap Matrix</h3>
          <div class="heatmap-grid" id="sectoral-heatmap-container">
            <span style="color:var(--text-muted); font-size:0.85rem;">Loading sectoral data...</span>
          </div>
        </div>

        <!-- FII/DII & Breadth -->
        <div class="glass-panel col-span-12 md:col-span-4" style="padding: 20px;">
          <h3 style="font-size: 1rem; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;"><i class="fa-solid fa-money-right-to-left" style="color: var(--accent-amber); margin-right: 8px;"></i>Flows & Breadth</h3>
          
          <div id="fii-dii-container">
            <span style="color:var(--text-muted); font-size:0.85rem;">Loading institutional flows...</span>
          </div>

          <div style="margin-top: 25px;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600;">
              <span style="color:var(--accent-emerald);">Advances <span id="adv-count">--</span></span>
              <span style="color:var(--accent-rose);">Declines <span id="dec-count">--</span></span>
            </div>
            <div class="breadth-bar">
              <div class="breadth-adv" id="breadth-adv-bar" style="width: 50%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items: center; margin-top: 15px;">
              <span style="font-size:0.8rem; color:var(--text-muted);">India VIX Status:</span>
              <span id="vix-status-badge" style="padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight:bold; background:rgba(255,255,255,0.1);">--</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Old Example Tickers -->
      <div class="example-tickers" style="margin-top: 30px; justify-content: center;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Or analyze a specific stock:</span>
        <button type="button" class="ticker-tag" onclick="searchPreset('RELIANCE')">Reliance</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('TCS')">TCS</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HDFCBANK')">HDFC Bank</button>
      </div>
    </div>
`;

// Replace everything between <div id="welcome-state"... and <!-- Loading State -->
const startMarker = '<!-- Welcome State -->';
const endMarker = '<!-- Loading State -->';
const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + startMarker + '\n' + newWelcome + '\n    ' + html.substring(endIndex);
  fs.writeFileSync('app/static/index.html', html);
  console.log("Patched index.html with new dashboard");
} else {
  console.log("Could not find markers in index.html");
}
