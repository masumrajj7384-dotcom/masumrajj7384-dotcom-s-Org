import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const oldSyncStr = `<div style="display:flex; align-items:center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                  <span style="font-size:0.6rem">🟢</span> Synced Today: <strong id="sync-time" style="color:#fff; font-weight:600;">--</strong>
               </div>`;

const newSyncStr = `<div style="display:flex; flex-direction:column; gap: 4px;">
                <div style="display:flex; align-items:center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                  <span style="font-size:0.6rem">🟢</span> Synced: <strong id="sync-time" style="color:#fff; font-weight:600;">--</strong>
                </div>
                <div style="display:flex; align-items:center; gap: 6px; font-size: 0.65rem;">
                   <span id="sync-yf-badge" style="padding: 2px 6px; border-radius: 4px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--accent-blue); display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> Yahoo Finance</span>
                   <span id="sync-sc-badge" style="padding: 2px 6px; border-radius: 4px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--accent-amber); display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> Screener.in</span>
                </div>
               </div>`;

if(html.includes(oldSyncStr)){
    html = html.replace(oldSyncStr, newSyncStr);
    fs.writeFileSync('app/static/index.html', html);
    console.log("Updated sync badges.");
} else {
    console.log("oldSyncStr not found");
}
