import fs from 'fs';

let html = fs.readFileSync('app/static/index.html', 'utf8');

const oldLoading = `<div id="loading-state" class="loading-panel hidden">
      <div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
      <h3>Aggregating Multi-Source Data...</h3>
      <p>Fetching from Screener.in, MoneyControl, Google Finance. Computing DCF, DuPont, Piotroski, Z-Score models.</p>
    </div>

    <!-- Error State -->
    <div id="error-state" class="error-panel glass-panel hidden">
      <i class="fa-solid fa-triangle-exclamation error-icon"></i>
      <h3>Analysis Failed</h3>
      <p id="error-message">Could not retrieve company data.</p>
      <button onclick="resetApp()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--bg-tertiary); color: white; border: none; border-radius: 4px; cursor: pointer;">Go Back</button>
    </div>`;

const newLoading = `<!-- Loading State -->
    <div id="loading-state" class="loading-panel hidden" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh;">
      <div class="terminal-loader" style="width: 100%; max-width: 600px; background: #0d1117; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div class="terminal-header" style="background: #161b22; padding: 8px 12px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56; margin-right: 6px;"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e; margin-right: 6px;"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f; margin-right: 12px;"></div>
          <span style="color: #8b949e; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace;">bash - fetching live data</span>
        </div>
        <div class="terminal-body" style="padding: 20px; text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #c9d1d9;">
          <p class="term-line" style="margin-bottom: 8px;"><span style="color: #3fb950; margin-right: 8px;">$</span>Connecting to Yahoo Finance (live quote)...</p>
          <p class="term-line delay-1" style="margin-bottom: 8px; animation: fadeInTerm 0.5s ease-out 0.5s both;"><span style="color: #3fb950; margin-right: 8px;">$</span>Resolving ticker format & metadata...</p>
          <p class="term-line delay-2" style="margin-bottom: 8px; animation: fadeInTerm 0.5s ease-out 1s both;"><span style="color: #3fb950; margin-right: 8px;">$</span>Aggregating Screener.in & MoneyControl financials...</p>
          <p class="term-line delay-3" style="margin-bottom: 8px; animation: fadeInTerm 0.5s ease-out 2s both;"><span style="color: #3fb950; margin-right: 8px;">$</span>Computing DCF, DuPont, and valuation models...</p>
          <p class="term-line" style="margin-bottom: 0;"><span style="color: #3fb950; margin-right: 8px;">$</span><span style="animation: blinkTerm 1s step-end infinite;">_</span></p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div id="error-state" class="error-panel glass-panel hidden" style="max-width: 500px; margin: 40px auto; padding: 30px; text-align: center;">
      <i class="fa-solid fa-triangle-exclamation error-icon" style="color: var(--accent-rose); font-size: 2.5rem; margin-bottom: 15px;"></i>
      <h3 style="font-family: var(--font-family-title); margin-bottom: 10px;">Ticker Resolution Failed</h3>
      <p id="error-message" style="color: var(--text-secondary); margin-bottom: 20px;">Could not retrieve company data. The symbol may be invalid or delisted.</p>
      
      <div class="error-hint" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 0.85rem; border-left: 3px solid var(--accent-amber); text-align: left; margin-bottom: 20px;">
        <p style="margin: 0 0 8px 0; color: var(--text-primary);"><strong>Terminal Hint:</strong></p>
        <p style="margin: 0 0 5px 0; color: var(--text-secondary);">If you are searching for an Indian stock, ensure the proper exchange suffix is appended:</p>
        <ul style="margin: 0 0 0 20px; color: var(--text-muted); padding: 0;">
          <li>For NSE: Append <code style="color: var(--accent-cyan);">.NS</code> (e.g., VEDL.NS)</li>
          <li>For BSE: Append <code style="color: var(--accent-cyan);">.BO</code> (e.g., RELIANCE.BO)</li>
        </ul>
      </div>
      <button onclick="resetApp()" class="table-toggle-btn">Return to Terminal</button>
    </div>`;

html = html.replace(/<div id="loading-state"[\s\S]*?<\/button>\s*<\/div>/, newLoading);
fs.writeFileSync('app/static/index.html', html);
console.log("Updated HTML states");
