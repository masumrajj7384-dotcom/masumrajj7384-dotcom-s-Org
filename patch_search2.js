import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const oldSearch = `export async function searchCompanies(query) {
  try {
    const yfUrl = \`https://query2.finance.yahoo.com/v1/finance/search?q=\${encodeURIComponent(query)}\`;
    const yfRes = await axiosInstance.get(yfUrl);
    if (yfRes.data && yfRes.data.quotes) {
      const indianQuotes = yfRes.data.quotes.filter(q => q.exchange === 'NSI' || q.exchange === 'BSE' || (q.symbol && (q.symbol.endsWith('.NS') || q.symbol.endsWith('.BO'))));
      if (indianQuotes.length > 0) {
        return indianQuotes.map(item => {
          let ticker = item.symbol.replace('.NS', '').replace('.BO', '');
          return { ticker, name: item.longname || item.shortname || ticker };
        });
      }
    }
  } catch (e) {
    console.error("YF Search error:", e.message);
  }

  // Fallback to Screener if YF fails
  try {
    const res = await axiosInstance.get(\`https://www.screener.in/api/company/search/?q=\${encodeURIComponent(query)}\`);
    if (res.data && Array.isArray(res.data)) {
      return res.data.map(item => {
        let ticker = item.url.replace('/company/', '').replace('/consolidated/', '').replace(/\\//g, '');
        return { ticker, name: item.name };
      });
    }
  } catch (e) {
    console.error("Search error:", e.message);
  }
  return [];
}`;

const newSearch = `export async function searchCompanies(query) {
  try {
    const yfUrl = \`https://query2.finance.yahoo.com/v1/finance/search?q=\${encodeURIComponent(query)}\`;
    const yfRes = await axiosInstance.get(yfUrl);
    if (yfRes.data && yfRes.data.quotes) {
      const indianQuotes = yfRes.data.quotes.filter(q => q.exchange === 'NSI' || q.exchange === 'BSE' || (q.symbol && (q.symbol.endsWith('.NS') || q.symbol.endsWith('.BO'))));
      if (indianQuotes.length > 0) {
        return indianQuotes.map(item => {
          let ticker = item.symbol; // keep the .NS or .BO suffix
          return { ticker, name: item.longname || item.shortname || ticker };
        });
      }
    }
  } catch (e) {
    console.error("YF Search error:", e.message);
  }

  // Fallback to Screener if YF fails
  try {
    const res = await axiosInstance.get(\`https://www.screener.in/api/company/search/?q=\${encodeURIComponent(query)}\`);
    if (res.data && Array.isArray(res.data)) {
      return res.data.map(item => {
        let ticker = item.url.replace('/company/', '').replace('/consolidated/', '').replace(/\\//g, '');
        return { ticker, name: item.name };
      });
    }
  } catch (e) {
    console.error("Search error:", e.message);
  }
  return [];
}`;

code = code.replace(oldSearch, newSearch);
fs.writeFileSync('scraper.js', code);
