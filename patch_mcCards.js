import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const targetCards = `  if (mc.found) {
    mcBsEl.innerHTML = \`
      <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
        <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
           <strong><i class="fa-solid fa-building"></i> MoneyControl Entity:</strong> \${mc.company_name}
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted); display:flex; gap: 1rem;">
           <span><strong>Sector:</strong> <span style="color:var(--accent-amber);">\${mc.sector}</span></span>
           <span><strong>MC Stock ID:</strong> <span style="color:var(--accent-cyan);">\${mc.sc_id}</span></span>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
          <a href="\${mc.stock_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-house"></i> MC Main Hub</a>
          <a href="\${mc.balance_sheet_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-scale-balanced"></i> Balance Sheet</a>
          <a href="\${mc.cash_flow_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(16,185,129,0.2);border-color:var(--accent-emerald);"><i class="fa-solid fa-money-bill-transfer"></i> Cash Flow</a>
        </div>
      </div>
    \`;

    mcPnlEl.innerHTML = \`
      <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
        <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
           <strong><i class="fa-solid fa-chart-line"></i> MoneyControl Performance Links</strong>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
          <a href="\${mc.profit_loss_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(6,182,212,0.2);border-color:var(--accent-cyan);"><i class="fa-solid fa-chart-line"></i> Profit & Loss</a>
          <a href="\${mc.ratios_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(139,92,246,0.2);border-color:var(--accent-purple);"><i class="fa-solid fa-percent"></i> Financial Ratios</a>
          <a href="\${mc.quarterly_url}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(236,72,153,0.2);border-color:var(--accent-pink);"><i class="fa-solid fa-calendar-days"></i> Quarterly Results</a>
          <a href="\${mc.stock_url + '/peer-comparison'}" target="_blank" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-users"></i> Peer Comparison</a>
        </div>
      </div>
    \`;
  } else {
    mcBsEl.innerHTML = '<span class="val-detail">MoneyControl resolution failed for this search query.</span>';
    mcPnlEl.innerHTML = '<span class="val-detail">MoneyControl resolution failed for this search query.</span>';
  }`;

const newCards = `  const t = companyData.ticker;
  const ts = mc.ticker_slug || t;
  const scId = mc.sc_id || t;
  const sec = mc.sector_slug || 'stocks';
  const entityName = mc.company_name || companyData.company_name || t;

  const mcMainHub = (mc.found && mc.stock_url) ? mc.stock_url : \`https://www.moneycontrol.com/india/stockpricequote/\${sec}/\${ts}/\${scId}\`;
  const bsUrl = \`https://www.moneycontrol.com/financials/\${ts}/balance-sheetVI/\${scId}\`;
  const cfUrl = \`https://www.moneycontrol.com/financials/\${ts}/cash-flowVI/\${scId}\`;
  const pnlUrl = \`https://www.moneycontrol.com/financials/\${ts}/profit-lossVI/\${scId}\`;
  const ratioUrl = \`https://www.moneycontrol.com/financials/\${ts}/ratiosVI/\${scId}\`;
  const qUrl = \`https://www.moneycontrol.com/financials/\${ts}/results/quarterly-results/\${scId}\`;
  const peerUrl = (mc.found && mc.stock_url) ? \`\${mc.stock_url}/peer-comparison\` : \`https://www.moneycontrol.com/india/stockpricequote/\${t}/peer-comparison\`;

  mcBsEl.innerHTML = \`
    <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
      <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
         <strong><i class="fa-solid fa-building"></i> MoneyControl Entity:</strong> \${entityName}
      </div>
      <div style="font-size:0.85rem;color:var(--text-muted); display:flex; gap: 1rem;">
         <span><strong>Sector:</strong> <span style="color:var(--accent-amber);">\${mc.sector || 'N/A'}</span></span>
         <span><strong>MC Stock ID:</strong> <span style="color:var(--accent-cyan);">\${mc.sc_id || 'N/A'}</span></span>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
        <a href="\${mcMainHub}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-house"></i> MC Main Hub</a>
        <a href="\${bsUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;"><i class="fa-solid fa-scale-balanced"></i> Balance Sheet</a>
        <a href="\${cfUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(16,185,129,0.2);border-color:var(--accent-emerald);"><i class="fa-solid fa-money-bill-transfer"></i> Cash Flow</a>
      </div>
    </div>
  \`;

  mcPnlEl.innerHTML = \`
    <div style="display:flex;flex-direction:column;gap:1rem;padding:0.5rem 0;">
      <div style="font-size:0.95rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
         <strong><i class="fa-solid fa-chart-line"></i> MoneyControl Performance Links</strong>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;">
        <a href="\${pnlUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(6,182,212,0.2);border-color:var(--accent-cyan);"><i class="fa-solid fa-chart-line"></i> Profit & Loss</a>
        <a href="\${ratioUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(139,92,246,0.2);border-color:var(--accent-purple);"><i class="fa-solid fa-percent"></i> Financial Ratios</a>
        <a href="\${qUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(236,72,153,0.2);border-color:var(--accent-pink);"><i class="fa-solid fa-calendar-days"></i> Quarterly Results</a>
        <a href="\${peerUrl}" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none;font-size:0.8rem;padding:0.5rem 1rem;background:rgba(245,158,11,0.2);border-color:var(--accent-amber);"><i class="fa-solid fa-users"></i> Peer Comparison</a>
      </div>
    </div>
  \`;`;

code = code.replace(targetCards, newCards);
fs.writeFileSync('app/static/app.js', code);
console.log("mcCards Patched successfully");
