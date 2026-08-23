import fs from 'fs';
let content = fs.readFileSync('app/static/index.html', 'utf8');

const regexps = [
  { search: /<span class="price-label">Current Price <i class="fa-regular fa-circle-question"[^>]*><\/i><\/span>/g,
    replace: '<span class="price-label">Current Price <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Current Price" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.3rem;"></i></span>' },
  
  { search: /<h3>1\. Revenue vs\. Net Profit Growth <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>1. Revenue vs. Net Profit Growth <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Revenue vs. Net Profit Growth" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>2\. Profitability Margins \(OPM vs NPM\) <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>2. Profitability Margins (OPM vs NPM) <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Profitability Margins (OPM vs NPM)" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>3\. Cash Flow Dynamics \(CFO vs FCF\) <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>3. Cash Flow Dynamics (CFO vs FCF) <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Cash Flow Dynamics (CFO vs FCF)" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>4\. Working Capital & Efficiency Days <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>4. Working Capital & Efficiency Days <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Working Capital & Efficiency Days" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>5\. Capital Structure & Borrowings <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>5. Capital Structure & Borrowings <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Capital Structure & Borrowings" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>6\. Return Metrics \(ROCE vs ROE\) <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>6. Return Metrics (ROCE vs ROE) <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Return Metrics (ROCE vs ROE)" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>7\. Quarterly Profitability Momentum <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>7. Quarterly Profitability Momentum <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Quarterly Profitability Momentum" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>8\. Shareholding Pattern Distribution <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>8. Shareholding Pattern Distribution <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Shareholding Pattern Distribution" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>DCF Intrinsic Value <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>DCF Intrinsic Value <i class="fa-regular fa-circle-question tooltip-icon" data-metric="DCF Intrinsic Value" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>Graham Number <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>Graham Number <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Graham Number" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>Margin of Safety <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>Margin of Safety <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Margin of Safety" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>Piotroski F-Score <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>Piotroski F-Score <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Piotroski F-Score" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>Altman Z-Score <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>Altman Z-Score <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Altman Z-Score" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>DuPont ROE Decomposition <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>DuPont ROE Decomposition <i class="fa-regular fa-circle-question tooltip-icon" data-metric="DuPont ROE Decomposition" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' },
    
  { search: /<h3>Debt Coverage & Efficiency <i class="fa-regular fa-circle-question"[^>]*><\/i><\/h3>/g,
    replace: '<h3>Debt Coverage & Efficiency <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Debt Coverage & Efficiency" style="cursor: pointer; opacity: 0.8; font-size: 0.8em; margin-left: 0.3rem;"></i></h3>' }
];

for (let r of regexps) {
  content = content.replace(r.search, r.replace);
}

const modalHtml = `
  <!-- Deep Financial Tooltip Modal -->
  <div id="financial-modal" class="financial-modal hidden">
    <div class="financial-modal-content">
      <div class="financial-modal-header">
        <h3 id="financial-modal-title">Metric Title</h3>
        <button id="financial-modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="financial-modal-body" id="financial-modal-body">
        <!-- Content will be injected here -->
      </div>
    </div>
  </div>
`;

content = content.replace('</footer>', '</footer>\n' + modalHtml);
content = content.replace('<script src="app.js"></script>', '<script src="deep_tooltips.js"></script>\n  <script src="app.js"></script>');

fs.writeFileSync('app/static/index.html', content);
