
function getDynamicEPS(data) {
    if (!data || !data.tables) return parseFloat((data.ratios && data.ratios["Current Price"] ? data.ratios["Current Price"] / (data.ratios["Stock P/E"] || 1) : 0));
    
    const pl = data.tables["profit-loss"];
    let eps = null;
    
    if (pl && pl.data) {
        for (let i = 0; i < pl.data.length; i++) {
            const row = pl.data[i];
            if (row && row.length > 0 && typeof row[0] === 'string') {
                const label = row[0].toLowerCase();
                if (label.includes('eps') || label.includes('earnings per share')) {
                    for (let j = row.length - 1; j >= 1; j--) {
                        const valStr = String(row[j]).replace(/,/g, '');
                        const val = parseFloat(valStr);
                        if (!isNaN(val) && val !== 0) {
                            eps = val;
                            break;
                        }
                    }
                    if (eps !== null) break;
                }
            }
        }
        
        if (eps === null) {
            let netProfit = null;
            for (let i = 0; i < pl.data.length; i++) {
                const row = pl.data[i];
                if (row && row.length > 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('net profit')) {
                    for (let j = row.length - 1; j >= 1; j--) {
                        const valStr = String(row[j]).replace(/,/g, '');
                        const val = parseFloat(valStr);
                        if (!isNaN(val)) {
                            netProfit = val;
                            break;
                        }
                    }
                    break;
                }
            }
            
            let equityCapital = null;
            const bs = data.tables["balance-sheet"];
            if (bs && bs.data) {
                for (let i = 0; i < bs.data.length; i++) {
                    const row = bs.data[i];
                    if (row && row.length > 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('equity capital')) {
                        for (let j = row.length - 1; j >= 1; j--) {
                            const valStr = String(row[j]).replace(/,/g, '');
                            const val = parseFloat(valStr);
                            if (!isNaN(val) && val > 0) {
                                equityCapital = val;
                                break;
                            }
                        }
                        break;
                    }
                }
            } else if (bs && Array.isArray(bs) && bs.length > 0 && Array.isArray(bs[0])) { // Support both wrapped and unwrapped array formats
                 for (let i = 0; i < bs.length; i++) {
                    const row = bs[i];
                    if (row && row.length > 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('equity capital')) {
                        for (let j = row.length - 1; j >= 1; j--) {
                            const valStr = String(row[j]).replace(/,/g, '');
                            const val = parseFloat(valStr);
                            if (!isNaN(val) && val > 0) {
                                equityCapital = val;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            
            const faceValue = parseFloat(data.ratios ? data.ratios["Face Value"] : 10) || 10;
            if (netProfit !== null && equityCapital !== null && equityCapital > 0) {
                const totalShares = equityCapital / faceValue;
                eps = netProfit / totalShares;
            }
        }
    } else if (pl && Array.isArray(pl) && pl.length > 0 && Array.isArray(pl[0])) {
        // Unwrapped format
        for (let i = 0; i < pl.length; i++) {
            const row = pl[i];
            if (row && row.length > 0 && typeof row[0] === 'string') {
                const label = row[0].toLowerCase();
                if (label.includes('eps') || label.includes('earnings per share')) {
                    for (let j = row.length - 1; j >= 1; j--) {
                        const valStr = String(row[j]).replace(/,/g, '');
                        const val = parseFloat(valStr);
                        if (!isNaN(val) && val !== 0) {
                            eps = val;
                            break;
                        }
                    }
                    if (eps !== null) break;
                }
            }
        }
        
        if (eps === null) {
            let netProfit = null;
            for (let i = 0; i < pl.length; i++) {
                const row = pl[i];
                if (row && row.length > 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('net profit')) {
                    for (let j = row.length - 1; j >= 1; j--) {
                        const valStr = String(row[j]).replace(/,/g, '');
                        const val = parseFloat(valStr);
                        if (!isNaN(val)) {
                            netProfit = val;
                            break;
                        }
                    }
                    break;
                }
            }
            
            let equityCapital = null;
            const bs = data.tables["balance-sheet"];
            if (bs && Array.isArray(bs) && bs.length > 0 && Array.isArray(bs[0])) { 
                 for (let i = 0; i < bs.length; i++) {
                    const row = bs[i];
                    if (row && row.length > 0 && typeof row[0] === 'string' && row[0].toLowerCase().includes('equity capital')) {
                        for (let j = row.length - 1; j >= 1; j--) {
                            const valStr = String(row[j]).replace(/,/g, '');
                            const val = parseFloat(valStr);
                            if (!isNaN(val) && val > 0) {
                                equityCapital = val;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            
            const faceValue = parseFloat(data.ratios ? data.ratios["Face Value"] : 10) || 10;
            if (netProfit !== null && equityCapital !== null && equityCapital > 0) {
                const totalShares = equityCapital / faceValue;
                eps = netProfit / totalShares;
            }
        }
    }
    
    if (eps !== null && !isNaN(eps)) return eps;
    
    return parseFloat((data.ratios && data.ratios["Current Price"] ? data.ratios["Current Price"] / (data.ratios["Stock P/E"] || 1) : 0));
}

function initCalcLogic() {
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.calc-btn')) {
            const btn = e.target.closest('.calc-btn');
            const metric = btn.getAttribute('data-calc');
            if (window.companyData) {
                renderCalculation(metric, window.companyData);
            } else {
                console.warn("window.companyData is not set yet!");
            }
        }
        
        if (e.target.id === 'calc-modal-close' || e.target.id === 'calc-modal') {
            document.getElementById('calc-modal').style.display = 'none';
        }
        
        if (e.target.closest('#calc-copy-btn')) {
            copyCalcToClipboard();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalcLogic);
} else {
    initCalcLogic();
}

function parsePct(str) {
    if (!str) return 0;
    return parseFloat(str.replace('%', '')) / 100;
}

function copyCalcToClipboard() {
    const body = document.getElementById('calc-modal-body');
    if (!body) return;
    
    // Parse the textual content cleanly
    let text = body.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('calc-copy-btn');
        const origText = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => { btn.innerHTML = origText; }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function renderCalculation(metric, data) {
    const modal = document.getElementById('calc-modal');
    const title = document.getElementById('calc-modal-title');
    const body = document.getElementById('calc-modal-body');
    
    const analytics = data.analytics || {};
    const ratios = data.ratios || {};
    
    let html = '';
    
    switch(metric) {
        case 'dcf':
            title.innerText = 'DCF Intrinsic Value Calculation';
            const dcf = analytics.intrinsic_value_dcf;
            if (!dcf) {
                html = '<p>Insufficient data to show calculation.</p>';
                break;
            }
            
            const g = parsePct(dcf.growth_rate_used);
            const dr = parsePct(dcf.discount_rate);
            const tg = parsePct(dcf.terminal_growth);
            
            let baseEps = getDynamicEPS(data);
            
            html += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
                <tr style="background: var(--surface-light); border-bottom: 2px solid var(--border-color);">
                    <th style="padding: 0.5rem; text-align: left;">Year</th>
                    <th style="padding: 0.5rem; text-align: right;">Proj. EPS (₹)</th>
                    <th style="padding: 0.5rem; text-align: right;">Discount Factor</th>
                    <th style="padding: 0.5rem; text-align: right;">PV (₹)</th>
                </tr>`;
                
            let sumPV = 0;
            let currentEps = baseEps;
            
            for (let i = 1; i <= 10; i++) {
                currentEps *= (1 + g);
                let df = Math.pow(1 + dr, i);
                let pv = currentEps / df;
                sumPV += pv;
                
                html += `<tr style="border-bottom: 1px solid var(--border-color); opacity: 0.9;">
                    <td style="padding: 0.5rem;">${i}</td>
                    <td style="padding: 0.5rem; text-align: right;">${currentEps.toFixed(2)}</td>
                    <td style="padding: 0.5rem; text-align: right;">${(1/df).toFixed(4)}</td>
                    <td style="padding: 0.5rem; text-align: right;">${pv.toFixed(2)}</td>
                </tr>`;
            }
            
            let tv = (currentEps * (1 + tg)) / (dr - tg);
            let pvTv = tv / Math.pow(1 + dr, 10);
            
            html += `</table>`;
            
            html += `<div style="background: var(--surface-light); padding: 1rem; border-radius: 8px;">
                <div style="margin-bottom: 0.5rem;"><strong>Base EPS:</strong> ₹${baseEps.toFixed(2)}</div>
                <div style="margin-bottom: 0.5rem;"><strong>Dynamic Growth Rate (1-10y):</strong> ${(g*100).toFixed(1)}%</div>
                <div style="margin-bottom: 0.5rem;"><strong>Dynamic Discount Rate:</strong> ${(dr*100).toFixed(1)}%</div>
                <div style="margin-bottom: 0.5rem;"><strong>Sum of PVs (1-10y):</strong> ₹${sumPV.toFixed(2)}</div>
                <div style="margin-bottom: 0.5rem;"><strong>Terminal Value (TV):</strong> (₹${currentEps.toFixed(2)} × 1.${(tg*100).toFixed(0)}) ÷ (${(dr*100).toFixed(0)}% - ${(tg*100).toFixed(0)}%) = ₹${tv.toFixed(2)}</div>
                <div style="margin-bottom: 0.5rem;"><strong>PV of TV:</strong> ₹${tv.toFixed(2)} ÷ (1 + ${dr})^10 = ₹${pvTv.toFixed(2)}</div>
                <div style="margin-top: 1rem; font-size: 1.1rem; color: var(--accent-blue);"><strong>Calculated DCF Value:</strong> ₹${(sumPV + pvTv).toFixed(2)}</div>
            </div>`;
            break;
            
        case 'graham':
            title.innerText = 'Graham Number Calculation';
            if (!analytics.graham_number) {
                html = '<p>Insufficient data.</p>';
                break;
            }
            let eps = getDynamicEPS(data);
            let bv = parseFloat(ratios["Book Value"] || 0);
            
            html += `<div style="background: var(--surface-light); padding: 1rem; border-radius: 8px; line-height: 1.8;">
                <div><strong>Formula:</strong> √(22.5 × EPS × Book Value)</div>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between;"><span>1. Base Multiplier:</span> <span>22.5</span></div>
                <div style="display: flex; justify-content: space-between;"><span>2. EPS (Earnings Per Share):</span> <span>₹${(eps || 0).toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between;"><span>3. Book Value per Share:</span> <span>₹${(bv || 0).toFixed(2)}</span></div>
                <hr style="border: 0; border-top: 1px dashed var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between;"><span>Product (22.5 × EPS × BV):</span> <span>${(22.5 * (eps||0) * (bv||0)).toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 1.1rem; color: var(--accent-blue); margin-top: 0.5rem;">
                    <strong>Square Root (Graham Number):</strong> 
                    <strong>₹${analytics.graham_number.toFixed(2)}</strong>
                </div>
            </div>`;
            break;
            
        case 'mos':
            title.innerText = 'Margin of Safety Calculation';
            if (analytics.margin_of_safety === null || analytics.margin_of_safety === undefined) {
                html = '<p>Insufficient data.</p>';
                break;
            }
            let graham = analytics.graham_number || 0;
            let price = parseFloat(ratios["Current Price"]) || 0;
            
            html += `<div style="background: var(--surface-light); padding: 1rem; border-radius: 8px; line-height: 1.8;">
                <div><strong>Formula:</strong> ((Graham Number - Current Price) / Graham Number) × 100</div>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between;"><span>1. Graham Number (Intrinsic Value):</span> <span>₹${graham.toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between;"><span>2. Current Market Price:</span> <span>₹${price.toFixed(2)}</span></div>
                <div style="display: flex; justify-content: space-between;"><span>3. Difference:</span> <span>₹${(graham - price).toFixed(2)}</span></div>
                <hr style="border: 0; border-top: 1px dashed var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between; font-size: 1.1rem; color: ${analytics.margin_of_safety > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-top: 0.5rem;">
                    <strong>Calculated Margin of Safety:</strong> 
                    <strong>${analytics.margin_of_safety.toFixed(2)}%</strong>
                </div>
            </div>`;
            break;
            
        case 'piotroski':
            title.innerText = 'Piotroski F-Score Calculation';
            if (!analytics.piotroski_f_score) {
                html = '<p>Insufficient data.</p>';
                break;
            }
            let p_details = analytics.piotroski_f_score.details || [];
            html += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
                <tr style="background: var(--surface-light); border-bottom: 2px solid var(--border-color);">
                    <th style="padding: 0.5rem; text-align: left;">Condition</th>
                    <th style="padding: 0.5rem; text-align: center;">Passed?</th>
                    <th style="padding: 0.5rem; text-align: right;">Points</th>
                </tr>`;
                
            let totalPts = 0;
            p_details.forEach(d => {
                let pt = d.passed ? 1 : 0;
                totalPts += pt;
                html += `<tr style="border-bottom: 1px solid var(--border-color); opacity: 0.9;">
                    <td style="padding: 0.5rem;">${d.criterion}</td>
                    <td style="padding: 0.5rem; text-align: center;">${d.passed ? '✅' : '❌'}</td>
                    <td style="padding: 0.5rem; text-align: right;">${pt}</td>
                </tr>`;
            });
            html += `</table>
            <div style="text-align: right; font-size: 1.2rem; color: var(--accent-blue);">
                <strong>Total F-Score: ${totalPts} / 9</strong>
            </div>`;
            break;
            
        case 'altman':
            title.innerText = 'Altman Z-Score Calculation';
            if (!analytics.altman_z_score) {
                html = '<p>Insufficient data.</p>';
                break;
            }
            html += `<div style="background: var(--surface-light); padding: 1rem; border-radius: 8px; line-height: 1.8;">
                <div><strong>Formula:</strong> Z = 1.2(X₁) + 1.4(X₂) + 3.3(X₃) + 0.6(X₄) + 1.0(X₅)</div>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 0.5rem 0;" />
                <div style="margin-bottom: 0.5rem; color: var(--text-muted);">
                    X₁ = Working Capital / Total Assets<br>
                    X₂ = Retained Earnings / Total Assets<br>
                    X₃ = EBIT / Total Assets<br>
                    X₄ = Market Value of Equity / Total Liabilities<br>
                    X₅ = Sales / Total Assets
                </div>
                <hr style="border: 0; border-top: 1px dashed var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between; font-size: 1.1rem; color: var(--accent-blue); margin-top: 0.5rem;">
                    <strong>Computed Z-Score:</strong> 
                    <strong>${analytics.altman_z_score.score.toFixed(2)}</strong>
                </div>
                <div style="text-align: right; font-size: 0.9rem; color: var(--text-muted);">
                    Interpretation: ${analytics.altman_z_score.interpretation}
                </div>
            </div>`;
            break;
            
        case 'dupont':
            title.innerText = 'DuPont ROE Decomposition';
            if (!analytics.dupont_analysis) {
                html = '<p>Insufficient data.</p>';
                break;
            }
            const da = analytics.dupont_analysis;
            html += `<div style="background: var(--surface-light); padding: 1rem; border-radius: 8px; line-height: 1.8;">
                <div><strong>Formula:</strong> ROE = Net Profit Margin × Asset Turnover × Equity Multiplier</div>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between;"><span>1. Net Profit Margin (Profit / Sales):</span> <span>${(da.net_profit_margin||0).toFixed(2)}%</span></div>
                <div style="display: flex; justify-content: space-between;"><span>2. Asset Turnover (Sales / Assets):</span> <span>${(da.asset_turnover||0).toFixed(2)}x</span></div>
                <div style="display: flex; justify-content: space-between;"><span>3. Equity Multiplier (Assets / Equity):</span> <span>${(da.equity_multiplier||0).toFixed(2)}x</span></div>
                <hr style="border: 0; border-top: 1px dashed var(--border-color); margin: 0.5rem 0;" />
                <div style="display: flex; justify-content: space-between; font-size: 1.1rem; color: var(--accent-blue); margin-top: 0.5rem;">
                    <strong>Decomposed ROE:</strong> 
                    <strong>${(da.computed_roe||0).toFixed(2)}%</strong>
                </div>
            </div>`;
            break;
    }
    
    // Check if copy button already exists in header, if not, add it next to the title
    const headerDiv = title.parentElement;
    if (!document.getElementById('calc-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.id = 'calc-copy-btn';
        copyBtn.style = 'margin-left: 1rem; font-size: 0.8rem; padding: 0.3rem 0.6rem; background: var(--accent-blue); border: none; border-radius: 4px; cursor: pointer; color: white; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; font-weight: 500;';
        copyBtn.innerHTML = '<i class="fa-regular fa-clipboard"></i> Copy Data';
        
        // Insert it right after the title
        title.insertAdjacentElement('afterend', copyBtn);
    } else {
        document.getElementById('calc-copy-btn').innerHTML = '<i class="fa-regular fa-clipboard"></i> Copy Data';
    }
    
    body.innerHTML = html;
    modal.style.display = 'flex';
}
