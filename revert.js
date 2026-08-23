import fs from 'fs';

// 1. Revert server.js
let serverJs = fs.readFileSync('server.js', 'utf8');
serverJs = serverJs.replace(/,\s*fetchExtendedMarketData/g, '');
serverJs = serverJs.replace(/app\.get\('\/api\/market-extended'[\s\S]*?\}\);\n/g, '');
fs.writeFileSync('server.js', serverJs);

// 2. Revert scraper.js
let scraperJs = fs.readFileSync('scraper.js', 'utf8');
let index = scraperJs.indexOf('let extendedCache = {');
if (index !== -1) {
    scraperJs = scraperJs.substring(0, index);
    fs.writeFileSync('scraper.js', scraperJs);
}

// 3. Revert style.css
let styleCss = fs.readFileSync('app/static/style.css', 'utf8');
index = styleCss.indexOf('/* EXTENDED DASHBOARD STYLES */');
if (index !== -1) {
    styleCss = styleCss.substring(0, index);
    fs.writeFileSync('app/static/style.css', styleCss);
}

// 4. Revert app.js
let appJs = fs.readFileSync('app/static/app.js', 'utf8');
index = appJs.indexOf('// --- EXTENDED MARKET DASHBOARD ---');
if (index !== -1) {
    appJs = appJs.substring(0, index);
    fs.writeFileSync('app/static/app.js', appJs);
}

// 5. Revert index.html
let html = fs.readFileSync('app/static/index.html', 'utf8');
const originalWelcome = `<!-- Welcome State -->
    <div id="welcome-state" class="welcome-card glass-panel">
      <i class="fa-solid fa-circle-nodes welcome-icon"></i>
      <h2>Multi-Source Financial Intelligence Engine</h2>
      <p>Enter any company name or NSE/BSE ticker. We aggregate live data from <strong>Screener.in</strong>, <strong>MoneyControl</strong>, and <strong>Google Finance</strong>, then compute advanced analyst-grade projections including <em>DCF Intrinsic Value</em>, <em>DuPont Analysis</em>, <em>Piotroski F-Score</em>, <em>Altman Z-Score</em>, <em>Graham Number</em>, and 3-year financial forecasts.</p>
      <div class="example-tickers">
        <span>Try:</span>
        <button type="button" class="ticker-tag" onclick="searchPreset('RELIANCE')">Reliance Industries</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('TCS')">Tata Consultancy Services (TCS)</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HDFCBANK')">HDFC Bank</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('BHARTIARTL')">Bharti Airtel</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('LT')">Larsen &amp; Toubro (L&amp;T)</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HINDUNILVR')">Hindustan Unilever (HUL)</button>
      </div>
    </div>`;

const startMarker = '<!-- Welcome State -->';
const endMarker = '<!-- Loading State -->';
const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + originalWelcome + '\n\n    ' + html.substring(endIndex);
    fs.writeFileSync('app/static/index.html', html);
}
console.log("Revert complete");
