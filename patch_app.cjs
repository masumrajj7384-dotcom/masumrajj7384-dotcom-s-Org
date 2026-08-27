const fs = require('fs');
let code = fs.readFileSync('app/static/app.js', 'utf8');

const dynamicLogic = `
function applyDynamicDCF(data) {
    if (!data || !data.analytics || !data.analytics.intrinsic_value_dcf) return;
    
    // 1. Dynamic Growth Rate
    let cagr = 0.08; // default fallback
    const pl = data.tables["profit-loss"];
    if (pl) {
        let profitIdx = pl.findIndex(r => r[0] === "Compounded Profit Growth");
        if (profitIdx === -1) profitIdx = pl.findIndex(r => r[0] === "Compounded Sales Growth");
        
        if (profitIdx > -1) {
            let found = false;
            for (let i = 1; i <= 4; i++) {
                if (pl[profitIdx + i] && pl[profitIdx + i][0] === '3 Years:') {
                    cagr = parseFloat(pl[profitIdx + i][1]) / 100;
                    found = true;
                    break;
                }
            }
            if (!found) {
                for (let i = 1; i <= 4; i++) {
                    if (pl[profitIdx + i] && pl[profitIdx + i][0] === '5 Years:') {
                        cagr = parseFloat(pl[profitIdx + i][1]) / 100;
                        break;
                    }
                }
            }
        }
    }
    
    if (isNaN(cagr)) cagr = 0.08;
    
    // Apply caps
    let g = cagr;
    if (g > 0.18) g = 0.18;
    else if (g <= 0) g = 0.03;
    
    // 2. Dynamic Discount Rate
    let r = 0.11; // Base Cost of Equity
    const debtCoverage = data.analytics.debt_coverage || {};
    const deRatio = debtCoverage.debt_to_equity || 0;
    
    // If interest_coverage_ratio is null/undefined but debt is zero, treat as safe.
    let icRatio = debtCoverage.interest_coverage_ratio;
    if (icRatio === null || icRatio === undefined) icRatio = 20; // default safe if no debt
    
    if (deRatio > 0.5) r += 0.015;
    if (icRatio < 3.0) r += 0.020;
    if (icRatio > 15.0) r -= 0.005;
    
    if (r < 0.10) r = 0.10;
    if (r > 0.16) r = 0.16;
    
    // 3. Recalculate DCF
    const currentPrice = parseFloat(data.ratios["Current Price"] || 0);
    const pe = parseFloat(data.ratios["Stock P/E"] || 1);
    let eps = currentPrice / pe;
    if(isNaN(eps) || eps <= 0) eps = data.analytics.intrinsic_value_dcf.value * 0.05;
    
    const terminalGrowth = 0.04;
    
    if (eps > 0 && currentPrice > 0) {
        let dcfValue = 0;
        let projectedEps = eps;
        for (let year = 1; year <= 10; year++) {
            projectedEps *= (1 + g);
            dcfValue += projectedEps / Math.pow(1 + r, year);
        }
        const terminalValue = projectedEps * (1 + terminalGrowth) / (r - terminalGrowth);
        dcfValue += terminalValue / Math.pow(1 + r, 10);
        
        data.analytics.intrinsic_value_dcf = {
            value: Math.round(dcfValue * 100) / 100,
            growth_rate_used: (g * 100).toFixed(1) + "%",
            discount_rate: (r * 100).toFixed(1) + "%",
            terminal_growth: "4.0%",
            current_price: currentPrice,
            upside_pct: Math.round(((dcfValue - currentPrice) / currentPrice) * 10000) / 100,
            is_dynamic: true
        };
    }
}
`;

if(!code.includes('function applyDynamicDCF')) {
    code += '\n' + dynamicLogic;
}

code = code.replace(
    /companyData = await response\.json\(\); window\.companyData = companyData;/g,
    'companyData = await response.json(); applyDynamicDCF(companyData); window.companyData = companyData;'
);

// Update UI transparency in app.js
code = code.replace(
    /<strong>Growth Rate:<\/strong> \$\{dcf\.growth_rate_used\}/g,
    '<strong>Dynamic Growth Rate:</strong> ${dcf.growth_rate_used}'
);
code = code.replace(
    /<strong>Discount Rate:<\/strong> \$\{dcf\.discount_rate\}/g,
    '<strong>Dynamic Discount Rate:</strong> ${dcf.discount_rate}'
);

fs.writeFileSync('app/static/app.js', code);
