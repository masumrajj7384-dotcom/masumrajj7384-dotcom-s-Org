import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const oldSyncStr = `<div style="display:flex; align-items:center; gap:10px; margin-left:auto;">
               <div id="sync-status-badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 12px; font-size: 0.75rem; color: #cbd5e1; display:flex; align-items:center; gap: 5px; backdrop-filter: blur(4px);">
                  <span style="font-size:0.6rem">🟢</span> Synced Today: <strong id="sync-time" style="color:#fff; font-weight:600;">--</strong>
               </div>
               <button id="force-sync-btn" class="search-btn" style="padding: 5px 12px; font-size: 0.75rem; display:flex; align-items:center; gap: 5px;" onclick="forceSyncData()">
                  <i class="fa-solid fa-arrows-rotate"></i> Sync All Sources
               </button>
            </div>`;

const newSyncStr = `<div style="display:flex; flex-direction:column; align-items: flex-end; gap: 6px; margin-left:auto;">
               <div style="display:flex; align-items:center; gap:10px;">
                   <div id="sync-status-badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 12px; font-size: 0.75rem; color: #cbd5e1; display:flex; align-items:center; gap: 5px; backdrop-filter: blur(4px);">
                      <span style="font-size:0.6rem">🟢</span> Synced: <strong id="sync-time" style="color:#fff; font-weight:600;">--</strong>
                   </div>
                   <button id="force-sync-btn" class="search-btn" style="padding: 5px 12px; font-size: 0.75rem; display:flex; align-items:center; gap: 5px;" onclick="forceSyncData()">
                      <i class="fa-solid fa-arrows-rotate"></i> Sync All Sources
                   </button>
               </div>
               <div style="display:flex; align-items:center; gap: 6px; font-size: 0.65rem;">
                   <span id="sync-yf-badge" style="padding: 2px 6px; border-radius: 4px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--accent-blue); display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> YF Market</span>
                   <span id="sync-sc-badge" style="padding: 2px 6px; border-radius: 4px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--accent-amber); display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> Screener.in Fundamentals</span>
               </div>
            </div>`;

if(html.includes(oldSyncStr)){
    html = html.replace(oldSyncStr, newSyncStr);
    fs.writeFileSync('app/static/index.html', html);
    console.log("Updated sync badges.");
} else {
    console.log("oldSyncStr not found");
}
