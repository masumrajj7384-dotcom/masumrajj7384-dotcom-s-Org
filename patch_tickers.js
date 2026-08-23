import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<div class="example-tickers">
        <span>Try:</span>
        <button type="button" class="ticker-tag" onclick="searchPreset('RELIANCE')">RELIANCE</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('TCS')">TCS</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('INFY')">INFY</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HDFCBANK')">HDFCBANK</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('TATAMOTORS')">TATAMOTORS</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('ITC')">ITC</button>
      </div>`;

const replacement = `<div class="example-tickers">
        <span>Try:</span>
        <button type="button" class="ticker-tag" onclick="searchPreset('RELIANCE')">Reliance Industries</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('TCS')">Tata Consultancy Services (TCS)</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HDFCBANK')">HDFC Bank</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('BHARTIARTL')">Bharti Airtel</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('LT')">Larsen &amp; Toubro (L&amp;T)</button>
        <button type="button" class="ticker-tag" onclick="searchPreset('HINDUNILVR')">Hindustan Unilever (HUL)</button>
      </div>`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('app/static/index.html', html);
    console.log("Tickers updated!");
} else {
    console.log("Target not found!");
}
