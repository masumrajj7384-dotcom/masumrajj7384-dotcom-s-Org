const fs = require('fs');
let html = fs.readFileSync('app/static/index.html', 'utf8');

function injectBtn(html, title, metricId) {
    const regex = new RegExp(`(<h3.*?>${title} <i.*?<\\/i><\\/h3>)`);
    return html.replace(regex, `$1 <button class="calc-btn" data-calc="${metricId}" style="margin-left: auto; font-size: 0.75rem; padding: 0.2rem 0.5rem; background: var(--surface-light); border: 1px solid var(--border-color); border-radius: 4px; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; transition: all 0.2s;">📊 View Calculation</button>`);
}

html = injectBtn(html, "DCF Intrinsic Value", "dcf");
html = injectBtn(html, "Graham Number", "graham");
html = injectBtn(html, "Margin of Safety", "mos");
html = injectBtn(html, "Piotroski F-Score", "piotroski");
html = injectBtn(html, "Altman Z-Score", "altman");
html = injectBtn(html, "DuPont ROE Decomposition", "dupont");

const modalHtml = `
  <!-- Calculation Modal -->
  <div id="calc-modal" class="hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
    <div style="background: var(--surface); border: 1px solid var(--border-color); border-radius: 12px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <h2 id="calc-modal-title" style="font-size: 1.25rem; font-weight: 600; color: var(--text-light); margin: 0;">Calculations</h2>
        <button id="calc-modal-close" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.5rem;">&times;</button>
      </div>
      <div id="calc-modal-body" style="font-family: monospace; font-size: 0.9rem; color: var(--text-main);">
      </div>
    </div>
  </div>
`;

if (!html.includes('id="calc-modal"')) {
    html = html.replace('</body>', modalHtml + '\n</body>');
}

fs.writeFileSync('app/static/index.html', html);
console.log("Injected buttons and modal into HTML.");
