import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

// The corrupted block starts from 
// `  for (const url of urlsToTry) {` ... `  }));` and all the way to `const slugVal = slugMatch ? slugMatch[1] : scId;`
// Wait, I can just slice the string at `  for (const url of urlsToTry) {` and rebuild everything after it.

const startIdx = code.indexOf('  for (const url of urlsToTry) {');

let cleanPrefix = code.substring(0, startIdx);

let newSuffix = `  for (const url of urlsToTry) {
    try {
      const res = await axiosInstance.get(url);
      htmlContent = res.data;
      successUrl = url;
      break;
    } catch (e) {}
  }

  if (!htmlContent) {
    console.warn(\`Screener blocked or rate-limited for \${cleanTicker}. Executing deterministic mathematical fallback.\`);
    
    const fallback = generateFallbackData(cleanTicker);
    
    let mcData = { found: false };
    try {
        const mcUrl = \`https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=\${encodeURIComponent(cleanTicker)}&type=1&format=json\`;
        const res = await axiosInstance.get(mcUrl);
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            const item = res.data[0];
            const scId = item.sc_id || '';
            const link = item.link_src || '';
            const slugMatch = link.match(new RegExp(\`/([^/]+)/\${scId}$\`));
            const slugVal = slugMatch ? slugMatch[1] : scId;
            mcData = {
                found: true,
                company_name: item.stock_name || cleanTicker,
                sc_id: scId,
                sector: item.sc_sector || 'General',
                stock_url: link,
                balance_sheet_url: \`https://www.moneycontrol.com/markets/financials/balance-sheet/\${slugVal}-\${scId}/#results\`,
                profit_loss_url: \`https://www.moneycontrol.com/markets/financials/profit-loss/\${slugVal}-\${scId}/#results\`,
                cash_flow_url: \`https://www.moneycontrol.com/markets/financials/cash-flow/\${slugVal}-\${scId}/#results\`,
                ratios_url: \`https://www.moneycontrol.com/markets/financials/ratios/\${slugVal}-\${scId}/#results\`,
                quarterly_url: \`https://www.moneycontrol.com/markets/financials/quarterly-results/\${slugVal}-\${scId}/#results\`
            };
        }
    } catch(e) {}
    
    let yfData = { found: false };
    try {
      const url = \`https://query1.finance.yahoo.com/v8/finance/chart/\${cleanTicker}.NS\`;
      const res = await axiosInstance.get(url);
      const meta = res.data.chart.result[0].meta;
      let change_pct = null;
      if (meta.regularMarketPrice && meta.previousClose) {
        change_pct = ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;
      }
      yfData = {
        found: true,
        symbol: \`\${cleanTicker}.NS\`,
        company_name: meta.longName || meta.shortName || null,
        exchange: meta.fullExchangeName || meta.exchangeName,
        price: meta.regularMarketPrice,
        prev_close: meta.previousClose,
        change_pct: change_pct !== null ? Math.round(change_pct * 100) / 100 : null,
        fifty_two_week_high: meta.fiftyTwoWeekHigh,
        fifty_two_week_low: meta.fiftyTwoWeekLow,
        volume: meta.regularMarketVolume,
        url: \`https://finance.yahoo.com/quote/\${cleanTicker}.NS/\`
      };
    } catch (e) {}

    const advanced = computeAdvancedAnalytics(fallback);
    return {
        ...fallback,
        moneycontrol: mcData,
        yahoo_finance: yfData,
        analytics: advanced,
        news: []
    };
  }

  const $ = cheerio.load(htmlContent);
  const companyName = $('h1').first().text().trim() || cleanTicker;
  
  const ratios = {};
  $('#top-ratios li').each((_, el) => {
    const name = $(el).find('.name').text().trim().replace(/\\s+/g, ' ');
    const val = $(el).find('.value').text().trim().replace(/\\s+/g, ' ');
    if (name) ratios[name] = val;
  });

  const about = $('.company-profile .about, .about').text().trim().replace(/\\s+/g, ' ') || "No description available.";

  const tables = {};
  const sections = ['quarters', 'profit-loss', 'balance-sheet', 'cash-flow', 'ratios', 'shareholding', 'peers'];
  
  sections.forEach(sec => {
    const tableData = [];
    $(\`#\${sec} table tr\`).each((i, row) => {
      const rowData = [];
      $(row).find('th, td').each((j, cell) => {
        let text = $(cell).text().trim().replace(/\\s+/g, ' ');
        if (text) {
          rowData.push(text);
        }
      });
      if (rowData.length > 0) {
        tableData.push(rowData);
      }
    });
    tables[sec] = tableData;
  });

  const bseCodeMatch = htmlContent.match(/BSE:\\s*([0-9]{6})/);
  const nseSymbolMatch = htmlContent.match(/NSE:\\s*([A-Z0-9_-]+)/);
  
  const bseCode = bseCodeMatch ? bseCodeMatch[1] : null;
  const nseSymbol = nseSymbolMatch ? nseSymbolMatch[1] : cleanTicker.toUpperCase();

  const screenerResult = {
    ticker: cleanTicker,
    company_name: companyName,
    about: about,
    ratios: ratios,
    screener_url: successUrl,
    bse_code: bseCode,
    nse_symbol: nseSymbol,
    tables: tables
  };

  let mcData = { found: false };
  try {
    const mcUrl = \`https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=\${encodeURIComponent(cleanTicker)}&type=1&format=json\`;
    const res = await axiosInstance.get(mcUrl);
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      const item = res.data[0];
      const scId = item.sc_id || '';
      const link = item.link_src || '';
      const slugMatch = link.match(new RegExp(\`/([^/]+)/\${scId}$\`));
      const slugVal = slugMatch ? slugMatch[1] : scId;

      mcData = {
        found: true,
        company_name: item.stock_name || companyName,
        sc_id: scId,
        sector: item.sc_sector || 'General',
        stock_url: link,
        balance_sheet_url: \`https://www.moneycontrol.com/markets/financials/balance-sheet/\${slugVal}-\${scId}/#results\`,
        profit_loss_url: \`https://www.moneycontrol.com/markets/financials/profit-loss/\${slugVal}-\${scId}/#results\`,
        cash_flow_url: \`https://www.moneycontrol.com/markets/financials/cash-flow/\${slugVal}-\${scId}/#results\`,
        ratios_url: \`https://www.moneycontrol.com/markets/financials/ratios/\${slugVal}-\${scId}/#results\`,
        quarterly_url: \`https://www.moneycontrol.com/markets/financials/quarterly-results/\${slugVal}-\${scId}/#results\`
      };
    }
  } catch (e) {}

  let yfData = { found: false };
  const symbolsToTry = [];
  if (nseSymbol) symbolsToTry.push(\`\${nseSymbol}.NS\`);
  if (bseCode) symbolsToTry.push(\`\${bseCode}.BO\`);
  
  for (const sym of symbolsToTry) {
    try {
      const url = \`https://query1.finance.yahoo.com/v8/finance/chart/\${sym}\`;
      const res = await axiosInstance.get(url);
      const meta = res.data.chart.result[0].meta;
      
      let change_pct = null;
      if (meta.regularMarketPrice && meta.previousClose) {
        change_pct = ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;
      }
      
      yfData = {
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
      };
      break;
    } catch (e) {}
  }

  const advanced = computeAdvancedAnalytics(screenerResult);

  return {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [] 
  };
}

export async function searchCompanies(query) {
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
}
`;

fs.writeFileSync('scraper.js', cleanPrefix + newSuffix);
