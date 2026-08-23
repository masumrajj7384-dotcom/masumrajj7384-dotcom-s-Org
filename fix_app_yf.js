import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const target = `  if (changePct !== undefined && changePct !== null) {
    const pct = parseFloat(changePct);
    gfChangeEl.textContent = \`\${pct >= 0 ? '▲' : '▼'} \${Math.abs(pct).toFixed(2)}%\`;
    gfChangeEl.className = \`price-change \${pct >= 0 ? 'up' : 'down'}\`;
  } else {
    gfChangeEl.textContent = '';
  }`;

const replacement = `  if (changePct !== undefined && changePct !== null) {
    const pct = parseFloat(changePct);
    gfChangeEl.textContent = \`\${pct >= 0 ? '▲' : '▼'} \${Math.abs(pct).toFixed(2)}%\`;
    gfChangeEl.className = \`price-change \${pct >= 0 ? 'up' : 'down'}\`;
  } else {
    gfChangeEl.textContent = '';
  }

  // YF Market Strip
  const stripEl = document.getElementById('live-market-strip');
  if (yfData && yfData.found) {
     stripEl.style.display = 'flex';
     document.getElementById('yf-prev-close').textContent = yfData.prev_close ? \`₹ \${yfData.prev_close.toLocaleString()}\` : '--';
     document.getElementById('yf-52w-high').textContent = yfData.fifty_two_week_high ? \`₹ \${yfData.fifty_two_week_high.toLocaleString()}\` : '--';
     document.getElementById('yf-52w-low').textContent = yfData.fifty_two_week_low ? \`₹ \${yfData.fifty_two_week_low.toLocaleString()}\` : '--';
     document.getElementById('yf-volume').textContent = yfData.volume ? yfData.volume.toLocaleString() : '--';
     
     // Override current price with real-time YF price if available
     if (yfData.price) {
         document.getElementById('current-price').textContent = \`₹ \${yfData.price.toLocaleString()}\`;
     }
  } else {
     stripEl.style.display = 'none';
  }
`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/app.js', code);
