import fs from 'fs';
let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = `<div class="title-wrapper">
            <h2 id="company-name">Company Name</h2>
            <span id="ticker-badge" class="badge">SYMBOL</span>
            <span id="statement-badge" class="badge secondary">Consolidated</span>
            <span id="mc-sector-badge" class="badge mc-badge" style="display:none"></span>
          </div>`;

const replacement = `<div class="title-wrapper" style="display:flex; flex-wrap:wrap; align-items:center; gap:10px; width:100%;">
            <h2 id="company-name">Company Name</h2>
            <span id="ticker-badge" class="badge">SYMBOL</span>
            <span id="statement-badge" class="badge secondary">Consolidated</span>
            <span id="mc-sector-badge" class="badge mc-badge" style="display:none"></span>
            
            <div style="display:flex; align-items:center; gap:10px; margin-left:auto;">
               <div id="sync-status-badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 12px; font-size: 0.75rem; color: #cbd5e1; display:flex; align-items:center; gap: 5px; backdrop-filter: blur(4px);">
                  <span style="font-size:0.6rem">🟢</span> Synced Today: <strong id="sync-time" style="color:#fff; font-weight:600;">--</strong>
               </div>
               <button id="force-sync-btn" class="search-btn" style="padding: 5px 12px; font-size: 0.75rem; display:flex; align-items:center; gap: 5px;" onclick="forceSyncData()">
                  <i class="fa-solid fa-arrows-rotate"></i> Sync All Sources
               </button>
            </div>
          </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("banner patched");
