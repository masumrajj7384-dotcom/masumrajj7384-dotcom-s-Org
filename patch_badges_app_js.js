import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /const syncTimeEl = document\.getElementById\('sync-time'\);\n\s*if\s*\(syncTimeEl\)\s*\{[\s\S]*?syncTimeEl\.textContent = `\$\{dateStr\} \| \$\{timeStr\}`;[\s\S]*?\}/m;

const replacement = `const syncTimeEl = document.getElementById('sync-time');
    if (syncTimeEl) {
      let syncDate;
      if (companyData.sync_status && companyData.sync_status.last_sync) {
        syncDate = new Date(companyData.sync_status.last_sync);
      } else {
        syncDate = new Date();
      }
      const dateStr = syncDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = syncDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      syncTimeEl.textContent = \`\${dateStr} | \${timeStr}\`;
      
      const yfBadge = document.getElementById('sync-yf-badge');
      const scBadge = document.getElementById('sync-sc-badge');
      
      if (yfBadge) {
        if (companyData.sync_status && companyData.sync_status.yf_live) {
           yfBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> YF Market';
           yfBadge.style.opacity = '1';
        } else {
           yfBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> YF Market (Failed)';
           yfBadge.style.opacity = '0.5';
        }
      }
      
      if (scBadge) {
        if (companyData.sync_status && companyData.sync_status.screener_live) {
           scBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Screener.in Fundamentals';
           scBadge.style.opacity = '1';
        } else {
           scBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Screener.in (Fallback)';
           scBadge.style.opacity = '0.5';
        }
      }
    }`;

if(js.match(regex)){
    js = js.replace(regex, replacement);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Updated app.js badge logic.");
} else {
    console.log("Could not find syncTimeEl logic.");
}
