import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const tickerLogic = `
// --- LIVE MARKET INDICES TICKER ---
let indicesInterval = null;

async function fetchMarketIndices() {
  try {
    const res = await fetch('/api/market-indices');
    if (!res.ok) throw new Error("Failed to fetch indices");
    const data = await res.json();
    
    if (data && data.length > 0) {
      renderMarketIndices(data);
    }
  } catch (err) {
    console.error("Error fetching market indices:", err);
  }
}

function renderMarketIndices(data) {
  const ribbonContainer = document.querySelector('.market-pulse-ribbon .marquee-content');
  if (!ribbonContainer) return;
  
  // Format items
  let html = '';
  // Add live pulsing dot at the beginning
  html += \`<span class="pulse-item" style="display:inline-flex; align-items:center; gap: 6px; margin-right: 10px;">
    <span style="display:inline-block; width:8px; height:8px; background-color:#34d399; border-radius:50%; box-shadow: 0 0 8px #34d399; animation: pulseDot 2s infinite;"></span>
    <span style="font-weight:bold; color:var(--text-primary); font-size: 0.8rem; letter-spacing:1px;">LIVE</span>
  </span>\`;

  data.forEach(idx => {
    const isUp = idx.direction === 'up';
    const sign = isUp ? '+' : '';
    const colorClass = isUp ? 'pos' : 'neg';
    
    html += \`<span class="pulse-item" style="margin-right: 25px;">
      <span class="idx-name" style="font-weight:600; color:var(--text-secondary); margin-right:5px;">\${idx.name}</span>
      <span class="idx-val" style="font-weight:700; color:var(--text-primary); margin-right:5px;">\${idx.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      <span class="idx-change \${colorClass}" style="font-weight:600; color:\${isUp ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
        \${isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>'}
        \${sign}\${idx.change_pct.toFixed(2)}%
      </span>
    </span>\`;
  });
  
  // Duplicate for seamless marquee effect
  ribbonContainer.innerHTML = html + html;
}

// Start polling
function initMarketIndices() {
  fetchMarketIndices();
  if (indicesInterval) clearInterval(indicesInterval);
  indicesInterval = setInterval(fetchMarketIndices, 45000);
}

// Ensure initMarketIndices is called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initMarketIndices();
});
`;

js += "\n" + tickerLogic;
fs.writeFileSync('app/static/app.js', js);
console.log("Patched app.js with live ticker tape");
