const fs = require('fs');
const content = fs.readFileSync('app/static/deep_tooltips.js', 'utf8');

// The file exports a global const `deepTooltips`. 
// We can eval it safely to get the object, then stringify it back.
const scriptCode = content + '\nmodule.exports = deepTooltips;';
const deepTooltips = eval(`(function() { ${scriptCode.replace('const deepTooltips =', 'let deepTooltips =')} return module.exports; })()`);

const updates = {
  "Market Cap": {
    meaning: "Imagine buying an entire pizza instead of just one slice. Market Cap (Market Capitalization) is the total price tag to buy the entire company right now. It reflects the total value the stock market places on the business.",
    relevance: "It helps categorize a company's size (Large-Cap, Mid-Cap, Small-Cap). A massive Large-Cap company is like a heavy cargo ship—very stable but slow to turn. A Small-Cap is like a speedboat—fast, but riskier in stormy waters."
  },
  "Current Price": {
    meaning: "This is the cost of buying a single 'slice' (share) of the company's pizza on the open market today.",
    relevance: "On its own, the price of a share means very little. A $10 stock isn't inherently 'cheaper' than a $100 stock without comparing it to how many total slices exist and how much profit each slice makes."
  },
  "High / Low": {
    meaning: "The absolute highest and lowest price someone paid for a slice of the company over the past 52 weeks (one year).",
    relevance: "It shows the stock's 'mood swings' (volatility). If the current price is very close to the 52-week low, the market might be pessimistic about the company, presenting either a bargain or a warning."
  },
  "Stock P/E": {
    meaning: "The Price-to-Earnings ratio. Imagine a lemonade stand makes $1 a year in profit. If you buy the whole stand for $15, your P/E is 15. You are paying for 15 years' worth of profit upfront.",
    relevance: "It's the ultimate 'price tag' metric. A high P/E means people are paying a premium because they expect the stand to grow rapidly. A low P/E might mean it's a bargain, or it might mean the stand's roof is caving in."
  },
  "Book Value": {
    meaning: "If the lemonade stand closed down today, sold all its lemons, pitchers, and tables, and paid off its bank loans, this is the exact amount of cash that would be left for each shareholder.",
    relevance: "It represents the 'scrap value' or net asset baseline of a company. Value investors love buying stocks trading close to (or below) their Book Value, as it provides a theoretical hard floor on the price."
  },
  "Dividend Yield": {
    meaning: "Like getting a small 'thank you' bonus check in the mail just for holding the stock. It is the percentage of the stock's price paid out as cash to you every year.",
    relevance: "Great for earning passive income without selling your shares. Mature, stable companies (like utilities) pay high dividends, while fast-growing tech companies usually pay $0 and reinvest the cash instead."
  },
  "ROCE": {
    meaning: "Return on Capital Employed. Imagine giving a chef $100 for a restaurant and borrowing another $100 from the bank (Total $200). If the chef makes $40 profit, the ROCE is 20%. It shows how effectively the business uses *all* available money to generate profit.",
    relevance: "It is the true test of management's skill. A consistently high ROCE (>15%) proves the company has a strong 'economic moat'—they are incredibly good at turning capital into cash without destroying value."
  },
  "ROE": {
    meaning: "Return on Equity. This ignores the bank's money and only looks at *your* $100 given to the chef. If the profit (after paying the bank's interest) is $20, your ROE is 20%. How hard is your specific money working?",
    relevance: "Shareholders obsess over ROE because it measures their direct return. However, it can be artificially boosted if the company takes on dangerous amounts of debt, making ROCE a safer metric to check alongside it."
  },
  "Face Value": {
    meaning: "The original arbitrary price stamped on the 'certificate' when the company was first born, like the original sticker price of a rare toy before it became a heavily traded collectible.",
    relevance: "Mostly an accounting technicality today. However, stock splits and corporate dividend percentages are calculated based on this original Face Value, not the current trading price."
  },
  "Debtor Days": {
    meaning: "If a customer buys your lemonade on credit, this is the average number of days it takes them to actually hand you the cash. Faster is always better!",
    relevance: "If this number spikes suddenly, the company might be aggressively selling to unreliable customers who aren't paying their bills on time, creating a dangerous cash flow crunch."
  },
  "Inventory Days": {
    meaning: "How long the lemons sit in the fridge before someone buys the lemonade. You don't want them rotting in the warehouse!",
    relevance: "A low number means products are flying off the shelves efficiently. A high number suggests unsold goods are piling up, tying up the company's cash in dusty inventory."
  },
  "Days Payable": {
    meaning: "How many days you take to pay the grocery store for the lemons you bought. Taking a bit longer (without making them angry) helps keep cash in your own pocket.",
    relevance: "A high number means the company has huge bargaining power over its suppliers (like Amazon or Walmart), essentially getting free short-term loans to fund their operations."
  },
  "Cash Cycle": {
    meaning: "The total timeline of the daily race. Buy lemons on day 1, sell lemonade on day 5, get paid on day 10. The Cash Conversion Cycle measures how many days your money is tied up.",
    relevance: "The shorter this race, the healthier the business! A negative cash cycle is the holy grail—it means customers pay the company *before* the company even has to pay its suppliers."
  },
  "Revenue vs. Net Profit Growth": {
    meaning: "Revenue is the total money collected in the cash register (Top Line). Net profit is what's left over after paying for lemons, sugar, cups, employee wages, and taxes (Bottom Line).",
    relevance: "We want both to grow together! If Revenue shoots up but Net Profit drops, it means the company is selling more but its costs are spiraling out of control, making the growth 'hollow'."
  },
  "Profitability Margins (OPM vs NPM)": {
    meaning: "OPM is the profit just from the core act of selling lemonade. NPM is what's left after finally paying the bank loan interest and the government taxes.",
    relevance: "Crucial for spotting structural flaws. A massive gap between OPM and NPM often implies the company is choked by heavy debt burdens or massive tax liabilities."
  },
  "Cash Flow Dynamics (CFO vs FCF)": {
    meaning: "Cash from Operations (CFO) is the pure cash generated by selling lemonade. Free Cash Flow (FCF) is what's left after you use some of that cash to buy a shiny new lemonade stand (Capital Expenditures).",
    relevance: "Accounting profits can be legally manipulated, but cash in the bank is real. FCF is the *true* cash the business can use to pay you dividends, wipe out debt, or acquire rivals."
  },
  "Working Capital & Efficiency Days": {
    meaning: "A visual dashboard of the money race. Are we collecting cash from our customers fast enough to pay our own bills?",
    relevance: "Helps identify hidden operational distress. If a company looks profitable on paper but inventory and debtor days are skyrocketing, a severe cash crisis is imminent."
  },
  "Capital Structure & Borrowings": {
    meaning: "Comparing the safe money the owners put in (Equity) versus the risky money borrowed from the bank (Debt).",
    relevance: "Visualizes bankruptcy risk. A sharply rising debt line while equity remains flat indicates the company is living on borrowed time and escalating its financial fragility."
  },
  "Return Metrics (ROCE vs ROE)": {
    meaning: "Tracking the historical horsepower of the 'money-making engine'. Is the engine getting stronger or weaker at turning $1 into $2 over the years?",
    relevance: "Consistent high returns (>15%) over a decade signify a durable 'economic moat'—meaning the company has a unique monopoly or brand power that competitors cannot easily destroy."
  },
  "Quarterly Profitability Momentum": {
    meaning: "Checking the company's report card every 3 months instead of waiting for the grand end-of-year finale. Are we speeding up or slowing down?",
    relevance: "Crucial for identifying immediate turnaround stories, cyclical business patterns (like holiday season spikes), or sudden, unexpected deteriorations in business momentum."
  },
  "Shareholding Pattern Distribution": {
    meaning: "Who owns the slices of the pizza? The founders (Promoters), big foreign banks (FIIs), local domestic funds (DIIs), or everyday retail folks (Public)?",
    relevance: "Rising Promoter, FII, or DII stakes are generally very bullish—it means the 'smart money' is buying in. A rising public stake alongside fleeing promoters is a major red flag."
  },
  "DCF Intrinsic Value": {
    meaning: "A financial crystal ball. It estimates every single dollar of cash the lemonade stand will *ever* make in the future, and mathematically calculates what that giant pile of future money is worth to you today.",
    relevance: "Considered the absolute gold standard of valuation. It tells you whether a stock is objectively cheap or wildly overpriced, cutting entirely through market hype and emotion."
  },
  "Graham Number": {
    meaning: "A super-safe price limit. Imagine buying a used car and only paying for the exact scrap metal value of the engine, refusing to pay a single penny extra for the fancy brand name.",
    relevance: "Invented by Benjamin Graham (Warren Buffett's mentor), it establishes the absolute maximum price a highly defensive, risk-averse value investor should ever pay for a stock."
  },
  "Margin of Safety": {
    meaning: "Like wearing a helmet while riding a bike. If the true mathematical value of the company is $100, buying it for $70 gives you a 30% safety cushion in case your math was wrong.",
    relevance: "The cornerstone of value investing. It provides a buffer against calculation errors, sudden recessions, or unforeseen business downturns. Aim for at least a 20-30% margin."
  },
  "Piotroski F-Score": {
    meaning: "A 9-point health checkup from a strict financial doctor. A score of 9 means the company is a prime Olympic athlete; a score of 2 means it is coughing on the couch.",
    relevance: "Scores of 8-9 indicate pristine, rock-solid financial health. Scores of 0-3 suggest potential bankruptcy risk. It is highly effective for avoiding 'value traps' (stocks that look cheap but are actually dying)."
  },
  "Altman Z-Score": {
    meaning: "An early-warning alarm siren for bankruptcy. A high score means the company is a sturdy brick house; a low score means it is a fragile house of cards.",
    relevance: "A score below 1.8 indicates a distress zone with a high probability of bankruptcy in the next two years. A score above 3.0 indicates a remarkably safe, bulletproof balance sheet."
  },
  "DuPont ROE Decomposition": {
    meaning: "Taking apart the engine to see *why* the car is fast. Are they making high profit per cup (Margin)? Selling a massive number of cups (Turnover)? Or just borrowing dangerously to look fast (Leverage)?",
    relevance: "Reveals the structural 'why' behind a company's ROE. It helps investors ensure the returns are generated by brilliant business operations, not just by reckless debt stacking."
  },
  "Debt Coverage & Efficiency": {
    meaning: "Can the business easily pay its monthly credit card bill? If the interest bill is $10 and they make $100 in operating profit, they are incredibly safe!",
    relevance: "An Interest Coverage Ratio below 1.5 implies extreme distress—the company is barely earning enough to pay the bank. High coverage means debt is easily manageable."
  },
  "Consolidated / Standalone": {
    meaning: "Standalone is a picture of just the parent company. Consolidated is a family portrait of the parent company *plus* all of its subsidiary baby companies combined together.",
    relevance: "For massive holding companies (like Reliance or Tata Motors), looking only at standalone figures is highly misleading. Consolidated figures reveal the true, complete size and profitability of the entire empire."
  }
};

for (const key in deepTooltips) {
  if (updates[key]) {
    deepTooltips[key].meaning = updates[key].meaning;
    deepTooltips[key].relevance = updates[key].relevance;
  }
}

// Generate the updated file content
let newContent = `const deepTooltips = {\n`;
for (const [key, data] of Object.entries(deepTooltips)) {
  newContent += `  "${key}": {\n`;
  newContent += `    meaning: ${JSON.stringify(data.meaning)},\n`;
  newContent += `    relevance: ${JSON.stringify(data.relevance)},\n`;
  newContent += `    formula: ${JSON.stringify(data.formula)},\n`;
  newContent += `    derivation: ${JSON.stringify(data.derivation)}\n`;
  newContent += `  },\n`;
}
newContent += `};\n`;

fs.writeFileSync('app/static/deep_tooltips.js', newContent);
console.log("Tooltips updated successfully!");
