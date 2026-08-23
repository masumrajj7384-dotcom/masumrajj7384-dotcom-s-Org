import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const startIndex = js.indexOf('function renderDocumentsTab(tabId) {');
const endIndex = js.indexOf('window.switchDocsTab = renderDocumentsTab;');

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find renderDocumentsTab function");
    process.exit(1);
}

const replacement = `function renderDocumentsTab(tabId) {
  if (!window.currentDocs) return;
  
  // Update buttons
  const btns = document.querySelectorAll('.docs-tab-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  if(tabId === 'announcements' && btns[0]) btns[0].classList.add('active');
  if(tabId === 'annual-reports' && btns[1]) btns[1].classList.add('active');
  if(tabId === 'credit-ratings' && btns[2]) btns[2].classList.add('active');
  if(tabId === 'concalls' && btns[3]) btns[3].classList.add('active');

  const container = document.getElementById('docs-content');
  const docs = window.currentDocs;
  
  const generateListHtml = (items, emptyMessage, iconClass, tagClass, tagIcon) => {
      if (!items || items.length === 0) {
          return \`<span class="val-detail">\${emptyMessage}</span>\`;
      }
      let html = '<div style="display:flex;flex-direction:column;gap:1rem; max-height:400px; overflow-y:auto; padding-right:0.5rem;">';
      items.forEach(item => {
          html += \`
              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:8px; padding:1rem; transition:var(--transition-smooth);" class="doc-card">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                      <a href="\${item.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-cyan); text-decoration:none; font-weight:600; font-size:0.95rem; line-height:1.4; display:flex; gap:0.5rem; align-items:center;">
                          <i class="\${iconClass}" style="color:var(--accent-red); font-size:1.1rem;"></i> \${item.title}
                      </a>
                      \${item.date ? \`
                      <span style="background:rgba(16,185,129,0.15); color:var(--accent-emerald); font-size:0.75rem; padding:0.25rem 0.5rem; border-radius:4px; white-space:nowrap; margin-left:1rem; border:1px solid rgba(16,185,129,0.3);">
                          <i class="fa-regular fa-clock"></i> \${item.date}
                      </span>
                      \` : ''}
                  </div>
                  <div style="color:var(--text-muted); font-size:0.8rem; display:flex; gap:0.5rem; align-items:center;">
                      <span class="\${tagClass}" style="padding:0.15rem 0.4rem; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);"><i class="\${tagIcon}"></i> \${tabId.replace('-', ' ').toUpperCase()}</span>
                  </div>
              </div>
          \`;
      });
      html += '</div>';
      return html;
  };

  if (tabId === 'announcements') {
      container.innerHTML = generateListHtml(docs.announcements, 'No recent announcements found.', 'fa-solid fa-bullhorn', 'tag-announcement', 'fa-solid fa-circle-info');
  } else if (tabId === 'annual-reports') {
      container.innerHTML = generateListHtml(docs.annual_reports, 'No annual reports available.', 'fa-solid fa-file-pdf', 'tag-ar', 'fa-solid fa-book');
  } else if (tabId === 'credit-ratings') {
      container.innerHTML = generateListHtml(docs.credit_ratings, 'No credit ratings found.', 'fa-solid fa-award', 'tag-rating', 'fa-solid fa-star');
  } else if (tabId === 'concalls') {
      // Concalls might be the same structure now
      container.innerHTML = generateListHtml(docs.concalls, 'No concall transcripts available.', 'fa-solid fa-microphone', 'tag-concall', 'fa-solid fa-headphones');
  }
}
`;

js = js.substring(0, startIndex) + replacement + js.substring(endIndex);
fs.writeFileSync('app/static/app.js', js);
console.log("Patched renderDocumentsTab");
