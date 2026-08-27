const fs = require('fs');

let content = fs.readFileSync('app/static/deep_tooltips.js', 'utf8');

// We know the structure is:
// const deepTooltips = { ... };
// We will evaluate it, add the keys, and write it back.

const scriptContent = content.replace('const deepTooltips = ', 'module.exports = ');
fs.writeFileSync('temp_eval.cjs', scriptContent);

const deepTooltips = require('./temp_eval.cjs');

deepTooltips["Revenue vs. Net Profit Growth"] = {
  meaning: "This comparative analysis tracks the structural divergence between top-line revenue expansion (total sales) and bottom-line net profit realization over a multi-year continuum. It visualizes the raw capability of the enterprise to translate gross revenue into distributable net income for equity holders, effectively stripping away the illusion of 'growth at any cost.'",
  relevance: "Institutional analysts monitor this divergence rigorously to diagnose structural margin compression. If top-line revenue is accelerating but net profit remains stagnant or declines, it mathematically proves the firm is actively destroying its operating margins to acquire market share—often via aggressive discounting or spiraling customer acquisition costs. Conversely, if net profit is compounding significantly faster than revenue, it demonstrates formidable operating leverage and an expanding economic moat."
};

deepTooltips["Profitability Margins (OPM vs NPM)"] = {
  meaning: "Profitability Margins mathematically delineate the firm's cost architecture and pricing supremacy. The Operating Profit Margin (OPM) isolates the raw profitability of the core business engine prior to interest and tax burdens, measuring direct production and operational efficiency. The Net Profit Margin (NPM) represents the ultimate residual yield for equity holders after all operational, financial, and tax obligations have been fully satisfied.",
  relevance: "Analyzing the delta between OPM and NPM is critical for identifying structural financial inefficiencies. A robust, stable OPM confirms incredible pricing power and demand elasticity. However, if OPM is high while NPM is structurally compressed, it exposes a severely over-leveraged balance sheet where toxic debt servicing (interest expenses) is actively cannibalizing the core operational profits, thereby transferring wealth from equity holders to institutional creditors."
};

deepTooltips["Cash Flow Dynamics (CFO vs FCF)"] = {
  meaning: "Cash Flow Dynamics deconstructs the firm's actual liquidity generation, entirely bypassing accrual accounting illusions. Cash from Operations (CFO) measures the raw, unencumbered fiat currency generated strictly from the core business activities. Free Cash Flow (FCF) further subtracts mandatory Capital Expenditures (CapEx) required to maintain and expand the physical asset base, revealing the true discretionary liquidity available to the corporate treasury.",
  relevance: "This is the ultimate litmus test for corporate solvency and value creation. A firm reporting massive accounting net income but chronically negative CFO is engaged in aggressive accounting manipulation or suffering from terminal working capital distress (channel stuffing, uncollectible receivables). Furthermore, if CFO is positive but FCF is perpetually negative, the enterprise is an absolute capital incinerator—requiring continuous, massive external debt or equity financing simply to maintain its market position, severely diluting long-term shareholder value."
};

const output = `const deepTooltips = ${JSON.stringify(deepTooltips, null, 2)};`;
fs.writeFileSync('app/static/deep_tooltips.js', output);
fs.unlinkSync('temp_eval.cjs');
