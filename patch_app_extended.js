import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const extendedDashboardLogic = `
// --- EXTENDED MARKET DASHBOARD ---
async function fetchAndRenderExtendedDashboard() {
  try {
    const res = await fetch('/api/market-extended');
    if (!res.ok) return;
    const data = await res.json();
    if (!data || !data.market) return;

    // 1. Render Macro Bar
    const macroContainer = document.getElementById('macro-ticker-container');
    if (macroContainer) {
      const macros = data.market.filter(m => m.type === 'macro');
      let mHtml = '';
      macros.forEach(m => {
        let valStr = m.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        if(m.ticker === '^IN10YT') valStr += '%'; // Format bond yield
        
        const isUp = m.change >= 0;
        const color = isUp ? 'var(--accent-emerald)' : 'var(--accent-rose)';
        const icon = isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>';
        
        mHtml += \`
          <div class="macro-item">
            <span class="macro-name">\${m.name}</span>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="macro-val">\${valStr}</span>
              <span style="font-size:0.75rem; font-weight:600; color:\${color}">\${icon} \${Math.abs(m.change_pct).toFixed(2)}%</span>
            </div>
          </div>
        \`;
      });
      macroContainer.innerHTML = mHtml;
    }

    // 2. Render Sectoral Heatmap
    const heatmapContainer = document.getElementById('sectoral-heatmap-container');
    if (heatmapContainer) {
      const sectors = data.market.filter(m => m.type === 'sector');
      let sHtml = '';
      sectors.forEach(s => {
        const isUp = s.change >= 0;
        const cls = isUp ? 'heatmap-up' : 'heatmap-down';
        const color = isUp ? 'var(--accent-emerald)' : 'var(--accent-rose)';
        const sign = isUp ? '+' : '';
        sHtml += \`
          <div class="heatmap-card \${cls}">
            <span class="heatmap-name">\${s.name.replace('Nifty ', '')}</span>
            <span class="heatmap-pct" style="color:\${color}">\${sign}\${s.change_pct.toFixed(2)}%</span>
          </div>
        \`;
      });
      heatmapContainer.innerHTML = sHtml;
    }

    // 3. Render FII/DII & Breadth
    const fiiDiiContainer = document.getElementById('fii-dii-container');
    if (fiiDiiContainer && data.institutional) {
      const fii = data.institutional.fii_net;
      const dii = data.institutional.dii_net;
      
      const formatFlow = (val) => {
        const isBuy = val >= 0;
        return \`<span class="flow-val \${isBuy ? 'flow-buy' : 'flow-sell'}">\${isBuy ? '+' : ''}\${val.toLocaleString()} Cr</span>\`;
      };

      fiiDiiContainer.innerHTML = \`
        <div class="inst-flow-row">
          <span style="color:var(--text-secondary); font-weight:600;">FII Net Activity</span>
          \${formatFlow(fii)}
        </div>
        <div class="inst-flow-row">
          <span style="color:var(--text-secondary); font-weight:600;">DII Net Activity</span>
          \${formatFlow(dii)}
        </div>
      \`;
    }

    if (data.breadth) {
      const advEl = document.getElementById('adv-count');
      const decEl = document.getElementById('dec-count');
      const barEl = document.getElementById('breadth-adv-bar');
      
      if (advEl) advEl.textContent = data.breadth.advance.toLocaleString();
      if (decEl) decEl.textContent = data.breadth.decline.toLocaleString();
      
      const total = data.breadth.advance + data.breadth.decline;
      if (barEl && total > 0) {
        barEl.style.width = \`\${(data.breadth.advance / total) * 100}%\`;
      }
    }

    // India VIX Status
    const vix = data.market.find(m => m.ticker === '^INDIAVIX');
    const vixBadge = document.getElementById('vix-status-badge');
    if (vix && vixBadge) {
      const val = vix.price;
      let status = 'Normal';
      let color = 'var(--accent-emerald)';
      let bg = 'rgba(16, 185, 129, 0.1)';
      
      if (val > 20) { status = 'High Volatility'; color = 'var(--accent-rose)'; bg = 'rgba(244, 63, 94, 0.1)'; }
      else if (val > 15) { status = 'Elevated'; color = 'var(--accent-amber)'; bg = 'rgba(245, 158, 11, 0.1)'; }
      else if (val < 11) { status = 'Complacent'; color = 'var(--accent-cyan)'; bg = 'rgba(6, 182, 212, 0.1)'; }

      vixBadge.innerHTML = \`\${val.toFixed(2)} - \${status}\`;
      vixBadge.style.color = color;
      vixBadge.style.background = bg;
      vixBadge.style.border = \`1px solid \${color}\`;
    }

  } catch (err) {
    console.error("Extended dashboard render error:", err);
  }
}

// Global scope function for the preset shortcuts
window.applyPreset = function(presetText) {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = presetText;
    // Show a temporary toast or visual feedback in the input
    const originalPlaceholder = searchInput.placeholder;
    searchInput.placeholder = "Preset applied. Waiting for specific ticker...";
    searchInput.focus();
    
    // Slight flash effect
    searchInput.style.transition = "background-color 0.3s";
    searchInput.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
    setTimeout(() => {
      searchInput.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    }, 400);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderExtendedDashboard();
});
`;

js += "\n" + extendedDashboardLogic;
fs.writeFileSync('app/static/app.js', js);
console.log("Patched app.js with extended dashboard logic");
