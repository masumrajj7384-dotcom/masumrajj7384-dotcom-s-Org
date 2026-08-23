import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = `      </section>

      <!-- TAB 5: Cross-Source Comparison -->`;

const replacement = `        <!-- Corporate Filings & Documents -->
        <div class="glass-panel col-span-12 analytics-card" style="margin-top: 1.5rem;">
          <div class="analytics-card-header flex-space-between" style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; gap:0.75rem; align-items:center;">
              <i class="fa-solid fa-folder-open" style="color:var(--accent-emerald); font-size:1.2rem;"></i>
              <h3 style="margin:0;">Corporate Documents & Filings Intelligence</h3>
            </div>
            <a id="screener-docs-btn" href="#" target="_blank" rel="noopener noreferrer" class="search-btn" style="text-decoration:none; font-size:0.8rem; padding:0.5rem 1rem; display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> View All on Screener
            </a>
          </div>
          <div class="analytics-card-body" style="padding:0;">
            <div class="table-selectors" style="padding: 1rem; border-bottom: 1px solid var(--border-color); display:flex; gap:0.5rem; overflow-x:auto;">
              <button class="table-toggle-btn docs-tab-btn active" onclick="switchDocsTab('announcements')">📢 Announcements</button>
              <button class="table-toggle-btn docs-tab-btn" onclick="switchDocsTab('annual-reports')">📑 Annual Reports</button>
              <button class="table-toggle-btn docs-tab-btn" onclick="switchDocsTab('credit-ratings')">🏷️ Credit Ratings</button>
              <button class="table-toggle-btn docs-tab-btn" onclick="switchDocsTab('concalls')">🎙️ Concalls</button>
            </div>
            <div id="docs-content" style="padding: 1.5rem; min-height: 250px;">
              <span class="val-detail">Loading documents...</span>
            </div>
          </div>
        </div>
      </section>

      <!-- TAB 5: Cross-Source Comparison -->`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("index.html patched with docs card");
