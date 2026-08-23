import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const target = `  // Cross-source comparison table
  const crossEl = document.getElementById('cross-source-content');
  const screenerRatios = companyData.ratios || {};
  const nseCode = companyData.ticker || 'N/A';
  const bseCode = companyData.bse_code || 'N/A';`;

const replacement = `  // Cross-source comparison table
  const crossEl = document.getElementById('cross-source-content');
  const screenerRatios = companyData.ratios || {};
  const nseCode = companyData.ticker || 'N/A';
  const bseCode = companyData.bse_code || 'N/A';

  const scrHubEl = document.getElementById('screener-hub');
  if (scrHubEl) {
    const scrUrl = companyData.screener_url || \`https://www.screener.in/company/\${nseCode}/consolidated/\`;
    scrHubEl.innerHTML = \`
      <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
        <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
           <strong><i class="fa-solid fa-database"></i> Screener.in Primary Source:</strong> \${companyData.company_name}
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted); display:flex; gap: 1rem;">
           <span><strong>NSE:</strong> <span style="color:var(--accent-emerald);">\${companyData.ticker}</span></span>
           <span><strong>BSE:</strong> <span style="color:var(--accent-emerald);">\${companyData.bse_code || 'N/A'}</span></span>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
          <a href="\${scrUrl}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(16,185,129,0.2);border-color:var(--accent-emerald);"><i class="fa-solid fa-house"></i> Screener Main Hub</a>
          <a href="\${scrUrl}#profit-loss" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-chart-line"></i> Profit & Loss</a>
          <a href="\${scrUrl}#balance-sheet" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-scale-balanced"></i> Balance Sheet</a>
          <a href="\${scrUrl}#cash-flow" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-money-bill-transfer"></i> Cash Flow</a>
          <a href="\${scrUrl}#ratios" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(139,92,246,0.2);border-color:var(--accent-purple);"><i class="fa-solid fa-percent"></i> Key Ratios</a>
        </div>
      </div>
    \`;
  }`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/app.js', code);
