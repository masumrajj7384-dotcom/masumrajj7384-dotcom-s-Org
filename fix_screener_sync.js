import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

// Insert Screener Hub Panel
const crossSection = `      <!-- TAB 5: Cross-Source Comparison -->
      <section id="tab-cross" class="tab-content col-span-12 grid-sub">
        <div class="glass-panel col-span-12 analytics-card">
          <div class="analytics-card-header"><i class="fa-solid fa-code-compare"></i><h3>Multi-Source Data Comparison</h3></div>
          <div id="cross-source-content" class="analytics-card-body">
            <p style="color:var(--text-secondary);">Cross-referencing Screener.in, MoneyControl, and Google Finance data...</p>
          </div>
        </div>`;

const newCrossSection = `      <!-- TAB 5: Cross-Source Comparison -->
      <section id="tab-cross" class="tab-content col-span-12 grid-sub">
        <div class="glass-panel col-span-12 analytics-card">
          <div class="analytics-card-header"><i class="fa-solid fa-code-compare"></i><h3>Multi-Source Data Comparison</h3></div>
          <div id="cross-source-content" class="analytics-card-body">
            <p style="color:var(--text-secondary);">Cross-referencing Screener.in, MoneyControl, and Google Finance data...</p>
          </div>
        </div>
        <div class="glass-panel col-span-12 analytics-card">
          <div class="analytics-card-header"><i class="fa-solid fa-database" style="color:var(--accent-emerald);"></i><h3>Screener.in Primary Hub</h3></div>
          <div id="screener-hub" class="analytics-card-body">No data</div>
        </div>`;

html = html.replace(crossSection, newCrossSection);
fs.writeFileSync('app/static/index.html', html);
