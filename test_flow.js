import axios from 'axios';

async function test(query) {
    const yfUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}`;
    const yfRes = await axios.get(yfUrl);
    let firstQuote = yfRes.data.quotes.find(q => q.exchange === 'NSI' || q.exchange === 'BSE' || (q.symbol && (q.symbol.endsWith('.NS') || q.symbol.endsWith('.BO'))));
    
    if (firstQuote) {
        console.log("Found on YF:", firstQuote.symbol);
        const baseSymbol = firstQuote.symbol.replace('.NS', '').replace('.BO', '');
        console.log("Base symbol to search across others:", baseSymbol);
    }
}
test('Reliance');
