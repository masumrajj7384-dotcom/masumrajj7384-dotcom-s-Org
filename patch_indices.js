import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const newFunc = `
export async function fetchMarketIndices() {
    const now = new Date();
    if (indicesCache.data && indicesCache.lastFetch) {
        const diffSecs = (now - new Date(indicesCache.lastFetch)) / 1000;
        if (diffSecs < 30) {
            return indicesCache.data;
        }
    }

    const symbols = [
        { ticker: '^NSEI', name: 'NIFTY 50' },
        { ticker: '^BSESN', name: 'SENSEX' },
        { ticker: '^NSEBANK', name: 'NIFTY BANK' },
        { ticker: '^CNXIT', name: 'NIFTY IT' },
        { ticker: '^CNXAUTO', name: 'NIFTY AUTO' },
        { ticker: '^INDIAVIX', name: 'INDIA VIX' }
    ];

    try {
        const results = await Promise.all(symbols.map(async (sInfo) => {
            try {
                const url = \`https://query2.finance.yahoo.com/v8/finance/chart/\${encodeURIComponent(sInfo.ticker)}\`;
                const res = await axiosInstance.get(url);
                const meta = res.data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                const change = meta.regularMarketPrice - meta.previousClose;
                const changePct = (change / meta.previousClose) * 100;
                return {
                    name: sInfo.name,
                    price: price,
                    change: change,
                    change_pct: changePct,
                    direction: change >= 0 ? 'up' : 'down'
                };
            } catch (err) {
                console.error("Error fetching " + sInfo.ticker, err.message);
                return null;
            }
        }));
        
        const validResults = results.filter(r => r !== null);
        if (validResults.length > 0) {
            indicesCache.data = validResults;
            indicesCache.lastFetch = now.toISOString();
            return validResults;
        }
        return indicesCache.data || [];
    } catch (e) {
        console.error("Market indices fetch error:", e);
        if (indicesCache.data) {
            return indicesCache.data;
        }
        return [];
    }
}
`;

js = js.replace(/export async function fetchMarketIndices\(\) \{[\s\S]*?\}(?=\n|$)/, newFunc.trim());

fs.writeFileSync('scraper.js', js);
console.log("Patched scraper.js indices function");
