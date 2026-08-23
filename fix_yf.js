import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const oldYF = `      yfData = {
        found: true,
        price: meta.regularMarketPrice,
        prev_close: meta.previousClose,
        change_pct: change_pct ? Math.round(change_pct * 100) / 100 : null,
        url: \`https://finance.yahoo.com/quote/\${sym}/\`
      };`;

const newYF = `      yfData = {
        found: true,
        symbol: sym,
        company_name: meta.longName || meta.shortName || null,
        exchange: meta.fullExchangeName || meta.exchangeName,
        price: meta.regularMarketPrice,
        prev_close: meta.previousClose,
        change_pct: change_pct !== null ? Math.round(change_pct * 100) / 100 : null,
        fifty_two_week_high: meta.fiftyTwoWeekHigh,
        fifty_two_week_low: meta.fiftyTwoWeekLow,
        volume: meta.regularMarketVolume,
        url: \`https://finance.yahoo.com/quote/\${sym}/\`
      };`;

code = code.replace(oldYF, newYF);
fs.writeFileSync('scraper.js', code);
