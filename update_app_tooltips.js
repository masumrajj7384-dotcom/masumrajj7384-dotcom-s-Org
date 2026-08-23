import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

content = content.replace(/<i class="fa-regular fa-circle-question" title="\$\{tooltipText\}" style="cursor: help; opacity: 0\.5; font-size: 0\.9em;"><\/i>/g,
  '<i class="fa-regular fa-circle-question tooltip-icon" data-metric="${key}" style="cursor: pointer; opacity: 0.8; font-size: 0.9em;"></i>');

content = content.replace(/<i class="fa-regular fa-circle-question" title="\$\{stmtTooltip\}" style="cursor: help; opacity: 0\.8; font-size: 0\.9em; margin-left: 0\.2rem;"><\/i>/g,
  '<i class="fa-regular fa-circle-question tooltip-icon" data-metric="Consolidated / Standalone" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.2rem;"></i>');

content = content.replace(/<i class="fa-regular fa-circle-question" title="The unique stock symbol used to identify the company on the stock exchange." style="cursor: help; opacity: 0\.8; font-size: 0\.9em; margin-left: 0\.2rem;"><\/i>/g,
  ''); // Just remove it from ticker, we don't have deep tooltips for ticker, or maybe leave it? Let's remove it because ticker is obvious.

// Add global event listener for tooltips
const tooltipLogic = `
// Tooltip Modal Logic
document.addEventListener('click', (e) => {
  if (e.target.closest('.tooltip-icon')) {
    const icon = e.target.closest('.tooltip-icon');
    const metric = icon.getAttribute('data-metric');
    if (metric && deepTooltips[metric]) {
      const data = deepTooltips[metric];
      document.getElementById('financial-modal-title').textContent = metric;
      document.getElementById('financial-modal-body').innerHTML = \`
        <div class="modal-section">
          <h4><i class="fa-solid fa-book-open-reader"></i> Meaning</h4>
          <p>\${data.meaning}</p>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-chart-line"></i> Market Relevance</h4>
          <p>\${data.relevance}</p>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-calculator"></i> Formula</h4>
          <div class="modal-formula">\${data.formula}</div>
        </div>
        <div class="modal-section">
          <h4><i class="fa-solid fa-database"></i> Data Derivation</h4>
          <p>\${data.derivation}</p>
        </div>
      \`;
      document.getElementById('financial-modal').classList.remove('hidden');
    }
  }
});

document.getElementById('financial-modal-close')?.addEventListener('click', () => {
  document.getElementById('financial-modal').classList.add('hidden');
});

document.getElementById('financial-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'financial-modal') {
    document.getElementById('financial-modal').classList.add('hidden');
  }
});
`;

content = content.replace('// Setup Donut\n  const ctx = document.getElementById(\'shareholdingDonut\').getContext(\'2d\');', tooltipLogic + '\n\n  // Setup Donut\n  const ctx = document.getElementById(\'shareholdingDonut\').getContext(\'2d\');');

fs.writeFileSync('app/static/app.js', content);
