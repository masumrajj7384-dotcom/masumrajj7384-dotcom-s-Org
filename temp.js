const deepTooltips = {
  "Market Cap": {
    "meaning": "Market Capitalization is the total, absolute price tag placed on a company by the public stock market at any given second. Imagine you want to buy an entire pizza franchise, not just a single slice or a single pepperoni. You would need to buy out every single shareholder to take full private ownership of the business. Market Cap calculates exactly how much money that would take by multiplying the current price of one share by the total number of shares in existence. It represents the collective belief of millions of investors worldwide regarding the total present value of the company's future cash flows, completely bypassing the illusions created by high or low individual share prices.",
    "relevance": "Investors use Market Cap to categorize companies into risk-and-reward buckets: Large-Cap, Mid-Cap, and Small-Cap. A massive Large-Cap company (like Apple or Reliance) is akin to a heavy, stabilized cargo ship—it won't sink easily in an economic storm, but it also takes massive effort to double its speed. In contrast, a Small-Cap stock is like a nimble speedboat—it can accelerate and double your money very quickly, but a single market wave can capsize it. Understanding Market Cap helps you build a balanced portfolio that properly weighs stable, slow-growth giants against aggressive, high-risk wealth compounders."
  },
  "Current Price": {
    "meaning": "This is the exact cost of buying a single 'slice' (share) of the company's pizza on the open market today, as determined by the continuous tug-of-war between buyers (who think the company is undervalued) and sellers (who think it is overvalued).",
    "relevance": "On its own, the absolute price of a share is a completely meaningless number. A stock trading at $10 is not inherently 'cheaper' or a better bargain than a stock trading at $1,000 without comparing it to how many total slices exist and how much profit each of those slices generates. However, tracking the price trend over time helps investors identify psychological market momentum, breakouts, and general market sentiment toward the business."
  },
  "High / Low": {
    "meaning": "This metric acts as a historical diary, recording the absolute highest and lowest price someone enthusiastically (or fearfully) paid for a slice of the company over the past 52 weeks (one full year).",
    "relevance": "It perfectly illustrates the stock's 'mood swings' (volatility) and market psychology. If the current price is crashing down close to its 52-week low, it signals deep market pessimism, fear, or underlying business distress—which could either present a rare 'sale' for value investors or act as a massive warning sign of a dying business. Conversely, sitting near a 52-week high indicates peak optimism and strong business momentum."
  },
  "Stock P/E": {
    "meaning": "The Price-to-Earnings (P/E) ratio acts as the ultimate 'price tag' for a company's profits. Imagine a neighborhood lemonade stand that consistently makes $1 a year in pure net profit. If the owner offers to sell you the entire stand for $15, your P/E ratio is 15. Essentially, you are paying for 15 years' worth of the stand's current profits upfront. It normalizes the stock price, allowing you to compare a $10 stock and a $2,000 stock on an equal playing field based purely on their actual profit-generating horsepower.",
    "relevance": "Market participants obsess over the P/E ratio to determine if a stock is an absolute bargain or floating in a dangerous bubble. A high P/E (e.g., 50 or above) means investors are highly optimistic and willing to pay a massive premium today because they believe the lemonade stand will aggressively grow its profits in the future. However, if that growth stalls, the stock price will crash as the premium vanishes. Conversely, an exceptionally low P/E might indicate an undervalued 'hidden gem', or it could be a 'value trap'—meaning the market correctly realizes the business model is dying and future profits are about to evaporate."
  },
  "Book Value": {
    "meaning": "If the lemonade stand suffered a catastrophic failure, closed down today, sold all its lemons, pitchers, and tables to a scrapyard, and used that money to pay off its bank loans, this is the exact amount of hard cash that would be left over for each shareholder. It represents the literal 'scrap value' or net asset baseline of a company.",
    "relevance": "Value investors absolutely love buying stocks trading close to (or strictly below) their Book Value, as it provides a theoretical hard floor on the price. If you buy a stock for $50 when its Book Value is $60, you are theoretically buying a dollar bill for eighty cents. However, in modern technology and software companies, Book Value is often artificially low because their true value lies in invisible assets like patents, brands, and software code, rather than physical factories."
  },
  "Dividend Yield": {
    "meaning": "Think of this as getting a small, regular 'thank you' bonus check in the mail from the company's CEO, just for holding onto the stock. It is the percentage of the stock's current trading price that the company pays out as hard cash to you every single year, directly into your bank account.",
    "relevance": "This is the holy grail for retirees and passive income investors who want to earn money without ever having to sell their shares. Mature, deeply stabilized companies (like utilities, tobacco, or telecom giants) usually pay high dividends because they don't need to build new factories. Conversely, fast-growing tech companies usually pay $0 in dividends because they aggressively reinvest every single penny back into the business to conquer new markets."
  },
  "ROCE": {
    "meaning": "Return on Capital Employed (ROCE) is the ultimate test of business efficiency. Imagine giving a master chef $100 for a new restaurant, and the chef borrows another $100 from the bank (Total Capital = $200). If the chef generates $40 in operating profit that year, the ROCE is 20%. It measures exactly how effectively the business engine converts *all* available money (both owner funds and bank loans) into sheer profit.",
    "relevance": "This is perhaps the most important metric for assessing management's skill. A consistently high ROCE (e.g., constantly above 15% to 20% over a decade) proves the company has a strong 'economic moat'—they possess incredible pricing power, monopoly-like advantages, or a beloved brand that allows them to effortlessly turn capital into cash without destroying shareholder value. A low ROCE means the business is a black hole that destroys capital."
  },
  "ROE": {
    "meaning": "Return on Equity (ROE) is similar to ROCE, but it ignores the bank's money and only looks at *your* specific money. If you gave the chef $100, and the profit left over (after strictly paying off the bank's interest) is $20, your ROE is 20%. It measures exactly how hard your personal shareholder equity is working to generate wealth for you.",
    "relevance": "Shareholders naturally obsess over ROE because it measures their direct, bottom-line return. However, it comes with a massive trap: ROE can be artificially, dangerously boosted if a company takes on massive amounts of debt to fund its operations. Because debt shrinks the 'equity' base relative to the total size of the business, it inflates the percentage return. Therefore, checking ROE alongside ROCE ensures the company isn't just faking its success using dangerous leverage."
  },
  "Face Value": {
    "meaning": "This is the original, somewhat arbitrary price stamped on the literal paper 'certificate' when the company was first born and incorporated, much like the original $1 sticker price of a rare vintage comic book before it became a heavily traded collectible worth thousands.",
    "relevance": "While the Face Value has virtually zero impact on the actual day-to-day trading price in the live stock market, it remains an essential accounting technicality. Whenever a company announces a stock split or a dividend (e.g., 'a 500% dividend'), that percentage is calculated strictly based on this original Face Value, not the current trading price. It keeps the corporate accounting mathematically sound."
  },
  "Debtor Days": {
    "meaning": "If a customer buys your lemonade on credit and promises to pay you later, this metric tracks the exact average number of days it takes for them to finally hand you the actual cash. In the corporate world, faster is universally better!",
    "relevance": "This is a massive red flag indicator for hidden distress. If this number spikes suddenly, it implies the company is desperately trying to boost its revenue by aggressively selling products to unreliable customers who aren't paying their bills on time. While the 'Revenue' line looks amazing on paper, the company is secretly suffering a severe cash flow crunch in reality, leading to potential bankruptcy."
  },
  "Inventory Days": {
    "meaning": "This measures exactly how long your lemons sit freezing in the warehouse fridge before someone finally buys the lemonade. You absolutely do not want your expensive lemons rotting in the warehouse gathering dust!",
    "relevance": "A low number means the company's products are highly desirable and flying off the shelves with incredible efficiency (like iPhones on launch day). A skyrocketing inventory number suggests a severe crisis: unsold goods are piling up, consumer demand has vanished, and massive amounts of the company's cash are trapped in obsolete, dusty inventory that might need to be sold at a severe loss."
  },
  "Days Payable": {
    "meaning": "This tracks how many days you intentionally take to pay the grocery store for the lemons you bought on credit. Taking a bit longer to pay (without angering your supplier) essentially gives you free money to play with in the meantime.",
    "relevance": "A high number is actually fantastic news for the company, as it demonstrates massive, bullying bargaining power over its suppliers (think of giants like Amazon, Walmart, or Apple). By delaying payments for 60 to 90 days, the company is essentially extracting free, zero-interest short-term loans from its suppliers to aggressively fund its own operations and growth."
  },
  "Cash Cycle": {
    "meaning": "The total, end-to-end timeline of the daily business race. Buy the lemons on day 1, sell the lemonade on day 5, and finally get the cash from the customer on day 10. The Cash Conversion Cycle measures exactly how many days your business's cash is tied up in the operational void.",
    "relevance": "The shorter this race, the healthier and more bulletproof the business! A negative cash cycle is the absolute holy grail of corporate finance—it means customers are paying the company *before* the company even has to pay its suppliers. Companies with negative cash cycles can grow infinitely without ever needing to borrow money from a bank."
  },
  "Revenue vs. Net Profit Growth": {
    "meaning": "Revenue is the total brute amount of money collected in the cash register (The Top Line). Net Profit is what's left in the safe after paying for all the lemons, sugar, cups, employee wages, bank interest, and government taxes (The Bottom Line).",
    "relevance": "We want both lines to grow smoothly together in tandem! If Revenue shoots up vertically but Net Profit stagnates or drops, it means the company is successfully selling more products, but its internal costs are spiraling completely out of control. This makes the revenue growth 'hollow' and destructive to shareholder wealth."
  },
  "Profitability Margins (OPM vs NPM)": {
    "meaning": "Operating Profit Margin (OPM) measures the pure profit strictly from the core act of selling lemonade, ignoring external factors. Net Profit Margin (NPM) measures what's left after finally paying the bank loan interest and the government taxes.",
    "relevance": "This comparison is crucial for spotting deep structural flaws in a business. A massive, gaping divergence between OPM and NPM often implies the company is actually great at its core business, but is being financially choked to death by heavy debt burdens (interest payments) or massive tax liabilities."
  },
  "Cash Flow Dynamics (CFO vs FCF)": {
    "meaning": "Cash from Operations (CFO) is the pure, liquid cash generated directly by selling lemonade. Free Cash Flow (FCF) is the absolute holy grail—it is what's left over after you are forced to use some of that CFO to buy a shiny new lemonade stand or repair a broken blender (Capital Expenditures).",
    "relevance": "Accounting profits shown on a balance sheet can be legally manipulated using clever accounting tricks, but raw cash in the bank is unarguable reality. FCF is the *true* cash the business can use to pay you dividends, wipe out dangerous debt, or aggressively acquire rival companies without issuing new shares."
  },
  "Working Capital & Efficiency Days": {
    "meaning": "This acts as a visual, real-time dashboard of the company's internal 'money race'. It tracks the delicate balancing act: Are we collecting cash from our customers fast enough to pay our own suppliers and keep the lights on?",
    "relevance": "This metric helps identify hidden, severe operational distress long before it hits the headline news. If a company looks massively profitable on paper but its inventory and debtor days are quietly skyrocketing over the years, a severe cash flow crisis (and potential default) is imminent."
  },
  "Capital Structure & Borrowings": {
    "meaning": "This visually contrasts the safe, permanent money the owners put into the business (Equity) versus the highly strict, dangerous money borrowed from ruthless banks (Debt).",
    "relevance": "This chart visualizes absolute bankruptcy risk. A sharply rising red debt line while the green equity line remains flat indicates the company is living on borrowed time, escalating its financial fragility, and putting common shareholders at extreme risk of being wiped out if interest rates rise."
  },
  "Return Metrics (ROCE vs ROE)": {
    "meaning": "This tracks the historical horsepower of the company's 'money-making engine'. It answers the question: Is the corporate engine getting stronger or weaker at turning $1 of capital into $2 of profit as the years go by?",
    "relevance": "Consistent, resilient high returns (consistently >15%) over an entire decade signify a durable 'economic moat'—meaning the company has a unique monopoly, patent, or beloved brand power that competitors cannot easily destroy. Plunging returns signal fierce, destructive competition or catastrophic management decisions."
  },
  "Quarterly Profitability Momentum": {
    "meaning": "This involves checking the company's report card every 3 months instead of waiting blindly for the grand end-of-year finale. It asks: Are we speeding up or slowing down right now, in the immediate present?",
    "relevance": "This is crucial for identifying immediate turnaround stories, highly cyclical business patterns (like massive holiday season spikes for retail companies), or sudden, unexpected deteriorations in business momentum that the annual yearly chart might mask."
  },
  "Shareholding Pattern Distribution": {
    "meaning": "This breaks down exactly who owns the slices of the corporate pizza. Is it tightly held by the founders (Promoters), accumulated by massive foreign banks (FIIs) and local domestic funds (DIIs), or highly scattered among everyday retail folks (The Public)?",
    "relevance": "Tracking shifts here is like tracking footprints in the snow. Rising Promoter, FII, or DII stakes are generally very bullish—it means the 'smart money' with insider knowledge or massive research teams is buying in. Conversely, a rapidly rising public stake alongside fleeing, selling promoters is a major red flag that the ship is sinking."
  },
  "DCF Intrinsic Value": {
    "meaning": "This is a financial crystal ball. It attempts to estimate every single dollar of cash the lemonade stand will *ever* make in the future until the end of time, and mathematically calculates exactly what that giant pile of future money is worth to you today, factoring in inflation and risk.",
    "relevance": "DCF is considered the absolute gold standard of corporate valuation. It tells you whether a stock is objectively cheap or wildly, dangerously overpriced, cutting entirely through market hype, Reddit trends, and emotional fear, providing a cold, mathematical anchor."
  },
  "Graham Number": {
    "meaning": "This is a super-safe, deeply pessimistic price limit. Imagine buying a used car and strictly only paying for the exact scrap metal value of the engine, absolutely refusing to pay a single penny extra for the fancy brand name or the leather seats.",
    "relevance": "Invented by Benjamin Graham (Warren Buffett's mentor), it establishes the absolute maximum price a highly defensive, deeply risk-averse value investor should ever pay for a stock, heavily prioritizing tangible assets and trailing earnings over hopeful future growth."
  },
  "Margin of Safety": {
    "meaning": "This is exactly like wearing a heavy helmet and knee pads while riding a bike. If the true mathematical value of the company is $100, stubbornly demanding to buy it for only $70 gives you a massive 30% safety cushion in case your math was wrong or a recession hits.",
    "relevance": "This is the absolute cornerstone of all value investing. It provides a required buffer against human calculation errors, sudden global recessions, or unforeseen business downturns. Legendary investors typically seek a 20% to 30% margin of safety to protect their capital from permanent loss."
  },
  "Piotroski F-Score": {
    "meaning": "This is a rigorous, 9-point health checkup from a strict financial doctor. A perfect score of 9 means the company is a prime, highly efficient Olympic athlete; a score of 2 means it is coughing on the couch and struggling to breathe.",
    "relevance": "Scores of 8 to 9 indicate pristine, rock-solid financial health with improving margins and falling debt. Scores of 0 to 3 suggest severe fundamental deterioration and potential bankruptcy risk. It is highly effective for avoiding 'value traps'—stocks that look incredibly cheap but are actually dying."
  },
  "Altman Z-Score": {
    "meaning": "This acts as an early-warning, mathematical alarm siren for corporate bankruptcy. A high score means the company is a sturdy, unshakeable brick house; a low score means it is a fragile house of cards waiting for a gust of wind.",
    "relevance": "A score strictly below 1.8 indicates a severe 'distress zone' with a highly elevated probability of bankruptcy within the next two years. A score above 3.0 indicates a remarkably safe, bulletproof balance sheet that can easily weather severe economic depressions."
  },
  "DuPont ROE Decomposition": {
    "meaning": "This involves acting as a mechanic and taking apart the ROE engine to see exactly *why* the car is fast. Are they generating high profit per single cup (Profit Margin)? Are they selling a massive, rapid volume of cups (Asset Turnover)? Or are they just borrowing dangerous amounts of money to look fast (Financial Leverage)?",
    "relevance": "This reveals the structural 'why' behind a company's Return on Equity. It helps brilliant investors ensure the returns are generated by elite business operations (high margins and turnover), and not just dangerously manufactured by reckless debt stacking."
  },
  "Debt Coverage & Efficiency": {
    "meaning": "This asks a simple survival question: Can the business easily pay its monthly credit card bill? If the bank's interest bill is $10 and the company makes $100 in operating profit every month, they are incredibly safe and comfortable!",
    "relevance": "An Interest Coverage Ratio dropping below 1.5 implies extreme corporate distress—the company is barely earning enough to pay the bank, leaving zero room for error. High coverage means the debt is easily manageable and the company is at low risk of defaulting on its loans."
  },
  "Consolidated / Standalone": {
    "meaning": "Standalone provides a financial picture of just the parent company working in isolation. Consolidated provides a massive family portrait of the parent company *plus* all of its subsidiary baby companies combined together into one giant financial statement.",
    "relevance": "For massive holding companies or conglomerates (like Reliance, Tata Motors, or Alphabet), looking only at standalone figures is highly misleading, as the real profits might be hidden inside the subsidiaries. Consolidated figures reveal the true, complete size, debt, and profitability of the entire corporate empire."
  }
};
