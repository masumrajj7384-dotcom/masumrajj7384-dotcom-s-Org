const deepTooltips = {
  "Market Cap": {
    meaning: "The total market value of a company's outstanding shares of stock.",
    relevance: "Investors use it to determine a company's size, which often correlates with its risk profile and growth potential (Large-cap vs Small-cap).",
    formula: "Current Share Price × Total Number of Outstanding Shares",
    derivation: "Derived by multiplying the live stock price from the exchange (e.g., NSE/BSE) by the outstanding shares reported in the latest shareholding data."
  },
  "Current Price": {
    meaning: "The current trading price of one share of the company on the stock exchange.",
    relevance: "It reflects the market's current valuation of the company's equity, acting as the baseline for all price-dependent ratios like P/E and Dividend Yield.",
    formula: "Real-time matched order price on the exchange.",
    derivation: "Fetched live from Screener.in or Yahoo Finance market data feeds."
  },
  "High / Low": {
    meaning: "The highest and lowest prices at which a stock has traded over the past 52 weeks (1 year).",
    relevance: "Provides context on a stock's volatility and its current price relative to its historical trading range.",
    formula: "Max(Price over 52 weeks) / Min(Price over 52 weeks)",
    derivation: "Extracted from historical price charts and aggregated yearly high/low market data."
  },
  "Stock P/E": {
    meaning: "Price-to-Earnings ratio. Measures the company's current share price relative to its per-share earnings.",
    relevance: "A high P/E suggests investors expect higher earnings growth in the future compared to companies with a lower P/E, or the stock might be overvalued.",
    formula: "Current Share Price / Earnings Per Share (EPS)",
    derivation: "Calculated by dividing the Current Market Price by the Trailing Twelve Months (TTM) Net Profit per share."
  },
  "Book Value": {
    meaning: "The net asset value of a company, representing the theoretical amount shareholders would receive if the company was liquidated.",
    relevance: "Used by value investors to compare against market value (P/B ratio) to find potentially undervalued stocks.",
    formula: "(Total Assets - Total Liabilities) / Total Outstanding Shares",
    derivation: "Taken directly from the company's latest Balance Sheet."
  },
  "Dividend Yield": {
    meaning: "A financial ratio that shows how much a company pays out in dividends each year relative to its stock price.",
    relevance: "Crucial for income investors. A high yield can indicate a good income stream, but might also signal a falling stock price.",
    formula: "(Annual Dividends Per Share / Current Share Price) × 100",
    derivation: "Derived by summing the dividends declared over the past year divided by the live share price."
  },
  "ROCE": {
    meaning: "Return on Capital Employed. A financial ratio that assesses a company's profitability and capital efficiency.",
    relevance: "A comprehensive metric for assessing how efficiently a company uses all of its capital (both debt and equity) to generate profits.",
    formula: "Earnings Before Interest & Taxes (EBIT) / Capital Employed",
    derivation: "Calculated using the Profit & Loss statement for EBIT and the Balance Sheet for Total Assets minus Current Liabilities."
  },
  "ROE": {
    meaning: "Return on Equity. Measures financial performance by calculating the profitability of the equity shareholders' capital.",
    relevance: "Shows how well the management is utilizing shareholders' funds to grow the business. Typically, higher is better.",
    formula: "Net Income / Shareholders' Equity",
    derivation: "Calculated using the Net Profit from the P&L statement divided by the Equity Capital and Reserves from the Balance Sheet."
  },
  "Face Value": {
    meaning: "The nominal value or original cost of the stock as listed in the company's charter and certificates.",
    relevance: "Important for corporate actions like stock splits, bonuses, and calculating dividends (which are usually declared as a % of face value).",
    formula: "Fixed by the company at issuance.",
    derivation: "A static structural value extracted from the company's fundamental filings."
  },
  "Debtor Days": {
    meaning: "The average number of days required for a company to collect its receivables from customers.",
    relevance: "Lower is better. A high number suggests the company is acting as a free bank for its clients and struggling to collect cash.",
    formula: "(Average Accounts Receivable / Total Credit Sales) × 365",
    derivation: "Computed from the Balance Sheet (Trade Receivables) against the P&L (Annual Sales)."
  },
  "Inventory Days": {
    meaning: "The average number of days a company holds its inventory before selling it.",
    relevance: "Lower is better. Indicates efficiency in managing stock. High inventory days could mean poor sales or overstocking (tying up capital).",
    formula: "(Average Inventory / Cost of Goods Sold) × 365",
    derivation: "Computed from the Balance Sheet (Inventories) against the P&L (Material Costs)."
  },
  "Days Payable": {
    meaning: "The average number of days it takes a company to pay its suppliers and creditors.",
    relevance: "Higher is generally better for cash flow, as the company uses supplier money for longer, but too high might damage vendor relationships.",
    formula: "(Average Accounts Payable / Cost of Goods Sold) × 365",
    derivation: "Computed from the Balance Sheet (Trade Payables) against the P&L (Operating Expenses)."
  },
  "Cash Cycle": {
    meaning: "The number of days it takes a company to convert its inventory and resources into cash flows from sales.",
    relevance: "Shorter cycles mean the company generates cash quickly. Negative cash cycles imply suppliers are entirely funding operations.",
    formula: "Inventory Days + Debtor Days - Days Payable",
    derivation: "Synthesized from the core working capital efficiency ratios."
  },
  "Revenue vs. Net Profit Growth": {
    meaning: "Compares the company's total top-line sales against its bottom-line net income over time.",
    relevance: "Shows whether sales growth is translating into actual earnings. If sales rise but profit drops, costs are escalating out of control.",
    formula: "Sales (Revenue) vs. Net Profit (After Tax)",
    derivation: "Plotted directly from the historical Profit & Loss Statement (Year over Year)."
  },
  "Profitability Margins (OPM vs NPM)": {
    meaning: "Tracks Operating Profit Margin (core business efficiency) against Net Profit Margin (overall bottom-line efficiency).",
    relevance: "Crucial for identifying structural profitability. A huge gap between OPM and NPM often implies heavy interest/debt burdens or taxes.",
    formula: "OPM = (Operating Profit / Sales) × 100 | NPM = (Net Profit / Sales) × 100",
    derivation: "Calculated by dividing respective profit tiers by total revenue in the P&L statement."
  },
  "Cash Flow Dynamics (CFO vs FCF)": {
    meaning: "Cash from Operations (CFO) is cash generated by core activities. Free Cash Flow (FCF) is CFO minus Capital Expenditures (CapEx).",
    relevance: "Profits can be manipulated, but cash is real. FCF indicates what the company can actually use for dividends, debt payoff, or acquisitions.",
    formula: "FCF = CFO - Capital Expenditures",
    derivation: "Extracted directly from the Cash Flow Statement."
  },
  "Working Capital & Efficiency Days": {
    meaning: "Visualizes the components of the cash conversion cycle over time.",
    relevance: "Helps identify working capital trends. Spikes in debtor days or inventory days are often early warning signs of business distress.",
    formula: "Debtor Days vs Inventory Days vs Days Payable",
    derivation: "Plotted from the calculated Efficiency Ratios table."
  },
  "Capital Structure & Borrowings": {
    meaning: "Compares the company's debt levels against its total equity (capital + reserves).",
    relevance: "Visualizes financial leverage and bankruptcy risk. A sharply rising debt line with flat equity indicates escalating risk.",
    formula: "Debt = Borrowings | Equity = Equity Capital + Reserves",
    derivation: "Extracted from the Liabilities section of the historical Balance Sheet."
  },
  "Return Metrics (ROCE vs ROE)": {
    meaning: "Tracks the historical trajectory of return on capital and equity.",
    relevance: "Consistent high returns (>15%) signify a competitive advantage (economic moat). Plunging returns signal fierce competition or poor management.",
    formula: "ROCE vs ROE over time",
    derivation: "Sourced from the historical Ratios table."
  },
  "Quarterly Profitability Momentum": {
    meaning: "Tracks the company's short-term revenue and operating profit growth on a quarter-over-quarter basis.",
    relevance: "Crucial for identifying immediate turnaround stories, cyclicality, or sudden deterioration in business momentum.",
    formula: "Quarterly Sales vs Quarterly Operating Profit",
    derivation: "Extracted from the recent Quarterly Results table."
  },
  "Shareholding Pattern Distribution": {
    meaning: "Shows the ownership structure of the company split between Promoters, Foreign Investors, Domestic Institutions, and the Public.",
    relevance: "Rising Promoter/FII/DII stakes are generally bullish (smart money buying). Rising public stake with falling promoter stake is often a red flag.",
    formula: "Percentage holding out of 100%",
    derivation: "Sourced from the Shareholding Pattern disclosures."
  },
  "DCF Intrinsic Value": {
    meaning: "Discounted Cash Flow analysis estimates the absolute value of an investment based on its expected future cash flows.",
    relevance: "The gold standard of valuation. It tells you whether a stock is objectively cheap or expensive, regardless of market sentiment.",
    formula: "Σ [CF_t / (1 + r)^t] + Terminal Value",
    derivation: "Computed using 3-year historical FCF growth rates, discounted by a risk-adjusted rate (WACC proxy), projecting 10 years forward."
  },
  "Graham Number": {
    meaning: "A figure that measures a stock's fundamental value by taking into account its earnings per share and book value per share.",
    relevance: "Invented by Benjamin Graham (Warren Buffett's mentor), it's a defensive investing metric establishing the maximum price a defensive investor should pay.",
    formula: "Square Root of (22.5 × EPS × Book Value per Share)",
    derivation: "Calculated using trailing EPS (from P&L) and Book Value (from Balance Sheet)."
  },
  "Margin of Safety": {
    meaning: "The percentage difference between the intrinsic value of a stock and its current market price.",
    relevance: "Provides a buffer against errors in calculation or unforeseen business downturns. Value investors typically seek a 20-30% margin of safety.",
    formula: "[(Intrinsic Value - Current Price) / Intrinsic Value] × 100",
    derivation: "Derived by comparing the calculated DCF Intrinsic Value against the live trading price."
  },
  "Piotroski F-Score": {
    meaning: "A discrete score between 0 and 9 which reflects nine criteria used to determine the strength of a firm's financial position.",
    relevance: "Scores of 8-9 indicate excellent financial health, while 0-2 suggest potential bankruptcy risk. Highly effective for filtering value traps.",
    formula: "1 point for positive ROA, CFO, increasing Margins, falling Leverage, etc.",
    derivation: "A rigorous 9-point checklist evaluated computationally across the current vs. previous year's P&L, Cash Flow, and Balance Sheet."
  },
  "Altman Z-Score": {
    meaning: "A credit-strength test that gauges a publicly traded manufacturing company's likelihood of bankruptcy.",
    relevance: "A score below 1.8 indicates a high probability of bankruptcy, while a score above 3.0 indicates a safe company.",
    formula: "1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5 (where X are various liquidity/profitability ratios)",
    derivation: "Calculated using a weighted sum of working capital, retained earnings, EBIT, market value of equity, and sales against total assets."
  },
  "DuPont ROE Decomposition": {
    meaning: "A framework for analyzing fundamental performance by breaking down Return on Equity into profit margin, asset turnover, and financial leverage.",
    relevance: "Reveals *why* a company has high ROE. Is it operating efficiently (high margin/turnover), or is it just taking on dangerous amounts of debt (high leverage)?",
    formula: "ROE = Net Profit Margin × Asset Turnover × Equity Multiplier",
    derivation: "Deconstructed mathematically from the Net Profit (P&L), Total Assets (Balance Sheet), and Equity (Balance Sheet)."
  },
  "Debt Coverage & Efficiency": {
    meaning: "Metrics measuring how easily a company can pay interest on outstanding debt and how efficiently it utilizes capital.",
    relevance: "Interest Coverage Ratio < 1.5 implies extreme distress (earning barely enough to pay interest). Capital Turnover indicates revenue generated per rupee of capital.",
    formula: "Interest Coverage = EBIT / Interest Expense",
    derivation: "Computed from the Operating Profit and Interest expense line items in the P&L statement."
  },
  "Consolidated / Standalone": {
    meaning: "Indicates whether the financial figures include the company's subsidiaries (Consolidated) or just the parent company (Standalone).",
    relevance: "For holding companies or those with large subsidiaries (e.g., Reliance, Tata Motors), consolidated figures are critical to understanding the true size and profitability.",
    formula: "N/A",
    derivation: "Determined by Screener.in based on the availability and selection of consolidated corporate filings."
  }
};
