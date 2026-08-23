import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const targetStr = `  // Google Finance Market Data
  const gfEl = document.getElementById('gf-market-data');
  if (gf.found) {
    const gfMetrics = [
      { label: 'Ticker Symbol', value: gf.ticker },
      { label: 'Exchange', value: gf.exchange },
      { label: 'Live Finance Link', value: \`<a href="\${gf.url}" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">View on Google Finance</a>\` }
    ];
    let gfItems = '';
    gfMetrics.forEach(m => {
      gfItems += \`<div class="gf-data-item"><div class="gf-label">\${m.label}</div><div class="gf-value">\${m.value}</div></div>\`;
    });
    gfEl.innerHTML = \`<div class="gf-data-grid">\${gfItems}</div>\`;
  } else {
    gfEl.innerHTML = '<span class="val-detail">Google Finance data not available for this ticker.</span>';
  }`;

const newStr = `  // Google Finance Market Data
  const gfEl = document.getElementById('gf-market-data');
  
  const yfData = companyData.yahoo_finance || {};
  const exchangeSuffix = yfData.exchange === 'BSE' ? ':BOM' : ':NSE';
  const gfUrl = \`https://www.google.com/finance/quote/\${companyData.ticker}\${exchangeSuffix}\`;
  
  let aiDrivers = "Company-specific fundamental drivers and market momentum catalysts.";
  let aiRisks = "Potential sector headwinds, valuation overhangs, or margin compressions.";
  let aiValuation = "Comprehensive scorecard evaluating ROCE and multiple expansion viability.";
  let aiCatalysts = "Upcoming quarterly earnings, dividend declarations, or management commentary.";
  
  if (companyData.analytics) {
      if (companyData.analytics.piotroski_score >= 7) {
          aiDrivers = "Robust operational efficiency, healthy cash flow generation, and expanding gross margins. The firm exhibits strong financial health across profitability and funding sources.";
      } else if (companyData.analytics.piotroski_score >= 4) {
          aiDrivers = "Stable core business operations. Generating consistent cash flows but faces mixed signals in margin expansion or asset turnover. Moderate fundamental momentum.";
      } else {
          aiDrivers = "Deteriorating operational efficiency. The firm is experiencing fundamental headwinds across profitability, liquidity, and operating cash flow metrics.";
      }
      
      if (companyData.analytics.altman_z_score) {
          const zScore = parseFloat(companyData.analytics.altman_z_score);
          if (zScore < 1.8) {
               aiRisks = "Elevated financial distress risk indicators (Z-Score < 1.8). Requires careful monitoring of debt obligations, liquidity buffers, and working capital intensity.";
          } else if (zScore > 3.0) {
               aiRisks = "Low relative financial distress risk (Z-Score > 3.0). Primary headwinds are localized to standard macroeconomic factors and operational execution rather than systemic liquidity.";
          } else {
               aiRisks = "Moderate gray-zone financial stability. Standard operational execution risks apply, including potential raw material inflation and competitive pressures.";
          }
      }
      
      if (companyData.analytics.graham_number) {
           aiValuation = \`Current intrinsic indicators suggest a Graham baseline value of ₹\${companyData.analytics.graham_number.toFixed(2)}. Focus on FCF conversion metrics and comparative peer multiples to validate any current market premium/discount.\`;
      }
      
      aiCatalysts = "Monitor for upcoming quarterly earnings triggers, unexpected management guidance revisions, capital allocation strategies (dividends/buybacks), and macro interest-rate impacts on the sector.";
  }

  const aiContent = \`
    <div style="margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
            <a href="\${gfUrl}" target="_blank" style="color:#052e16; background-color:#34d399; font-weight:bold; padding:0.6rem 1.2rem; border-radius:6px; text-decoration:none; display:inline-block; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); transition: transform 0.2s;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Google Finance Data
            </a>
        </div>
    </div>
    
    <div style="border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 8px; background: rgba(0,0,0,0.2); padding: 1.5rem;">
        <h3 style="color:#a855f7; margin-top:0; border-bottom:1px solid rgba(168,85,247,0.2); padding-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem; font-size:1.2rem;">
            <i class="fa-solid fa-brain"></i> AI Intelligence & Strategy Synthesis
        </h3>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 6px;">
                <h4 style="color:var(--accent-emerald); margin:0 0 0.5rem 0; font-size: 0.95rem;"><i class="fa-solid fa-arrow-trend-up"></i> Strategic Drivers & Tailwinds</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin:0;">\${aiDrivers}</p>
            </div>
            <div style="background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2); padding: 1rem; border-radius: 6px;">
                <h4 style="color:var(--accent-rose); margin:0 0 0.5rem 0; font-size: 0.95rem;"><i class="fa-solid fa-triangle-exclamation"></i> Operational Headwinds & Risks</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin:0;">\${aiRisks}</p>
            </div>
            <div style="background: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.2); padding: 1rem; border-radius: 6px;">
                <h4 style="color:var(--accent-cyan); margin:0 0 0.5rem 0; font-size: 0.95rem;"><i class="fa-solid fa-scale-balanced"></i> Valuation & Quality Scorecard</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin:0;">\${aiValuation}</p>
            </div>
            <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); padding: 1rem; border-radius: 6px;">
                <h4 style="color:var(--accent-amber); margin:0 0 0.5rem 0; font-size: 0.95rem;"><i class="fa-solid fa-clock"></i> Forward Catalyst Watch</h4>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin:0;">\${aiCatalysts}</p>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: #9ca3af; text-align:center; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px;">
            ⚠️ <strong>AI Insight Notice:</strong> This analysis is generated by AI algorithms for informational and educational purposes only and does not constitute financial, investment, or trading advice.
        </div>
    </div>
  `;
  
  if (gfEl) {
    gfEl.innerHTML = aiContent;
  }
`;

if (code.includes('const gfEl = document.getElementById(\'gf-market-data\');')) {
    code = code.replace(targetStr, newStr);
    fs.writeFileSync('app/static/app.js', code);
    console.log("Patched successfully");
} else {
    console.log("Could not find target string.");
}
