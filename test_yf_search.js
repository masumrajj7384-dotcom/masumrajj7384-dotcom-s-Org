import axios from 'axios';
async function run() {
  const yfUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent('Reliance')}`;
  const res = await axios.get(yfUrl);
  if (res.data && res.data.quotes) {
    const indianQuotes = res.data.quotes.filter(q => q.exchange === 'NSI' || q.exchange === 'BSE' || (q.symbol && (q.symbol.endsWith('.NS') || q.symbol.endsWith('.BO'))));
    const results = indianQuotes.map(item => {
      let ticker = item.symbol.replace('.NS', '').replace('.BO', '');
      return { ticker, name: item.longname || item.shortname || ticker, yf_symbol: item.symbol, exchange: item.exchange };
    });
    console.log(results);
  }
}
run();
