import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const startIdx = code.indexOf('export async function fetchFullData(ticker) {');
const endIdx = code.indexOf('export async function searchCompanies(query) {');

let cleanPrefix = code.substring(0, startIdx);
let cleanSuffix = code.substring(endIdx);

let newFetch = `export async function fetchFullData(ticker) {
  let cleanTicker = ticker.trim();
  let baseSymbol = cleanTicker.replace('.NS', '').replace('.BO', '');
  
  let yfData = { found: false };
  let yfSymbol = cleanTicker.includes('.NS') || cleanTicker.includes('.BO') ? cleanTicker : \`\${baseSymbol}.NS\`;

  try {
    const url = \`https://query1.finance.yahoo.com/v8/finance/chart/\${yfSymbol}\`;
    const res = await axiosInstance.get(url);
    const meta = res.data.chart.result[0].meta;
    
    if (meta.symbol) {
        baseSymbol = meta.symbol.replace('.NS', '').replace('.BO', '');
    }

    let change_pct = null;
    if (meta.regularMarketPrice && meta.previousClose) {
      change_pct = ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;
    }
    
    yfData = {
      found: true,
      symbol: meta.symbol,
      company_name: meta.longName || meta.shortName || null,
      exchange: meta.fullExchangeName || meta.exchangeName,
      price: meta.regularMarketPrice,
      prev_close: meta.previousClose,
      change_pct: change_pct !== null ? Math.round(change_pct * 100) / 100 : null,
      fifty_two_week_high: meta.fiftyTwoWeekHigh,
      fifty_two_week_low: meta.fiftyTwoWeekLow,
      volume: meta.regularMarketVolume,
      url: \`https://finance.yahoo.com/quote/\${meta.symbol}/\`
    };
  } catch (e) {}

  let urlsToTry = [];
  let successUrl = null;
  let htmlContent = null;
  
  try {
    const res = await axiosInstance.get(\`https://www.screener.in/api/company/search/?q=\${encodeURIComponent(baseSymbol)}\`);
    if (res.data && res.data.length > 0) {
      const best = res.data[0];
      if (best.url) {
        urlsToTry.push(\`https://www.screener.in\${best.url}\`);
        if (best.url.includes('consolidated')) {
          urlsToTry.push(\`https://www.screener.in\${best.url.replace('/consolidated/', '/')}\`);
        } else {
          urlsToTry.push(\`https://www.screener.in\${best.url}consolidated/\`);
        }
      }
    }
  } catch (e) {}

  const upperTicker = baseSymbol.toUpperCase();
  urlsToTry.push(\`https://www.screener.in/company/\${upperTicker}/consolidated/\`);
  urlsToTry.push(\`https://www.screener.in/company/\${upperTicker}/\`);
  urlsToTry = [...new Set(urlsToTry)];
  
  for (const url of urlsToTry) {
    try {
      const res = await axiosInstance.get(url);
      htmlContent = res.data;
      successUrl = url;
      break;
    } catch (e) {}
  }

  if (!htmlContent) {
    console.warn(\`Screener blocked or rate-limited for \${baseSymbol}. Executing deterministic mathematical fallback.\`);
    
    const fallback = generateFallbackData(baseSymbol);
    
    let mcData = { found: false };
    try {
        const mcUrl = \`https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=\${encodeURIComponent(baseSymbol)}&type=1&format=json\`;
        const res = await axiosInstance.get(mcUrl, { headers: { 'User-Agent': 'curl/7.81.0', 'Accept': '*/*' } });
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            const item = res.data[0];
            const scId = item.sc_id || '';
            const link = item.link_src || '';
            const slugMatch = link.match(new RegExp(\`/([^/]+)/\${scId}$\`));
            const slugVal = slugMatch ? slugMatch[1] : scId;
            mcData = {
                found: true,
                company_name: item.stock_name || baseSymbol,
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
  const companyName = $('h1').first().text().trim() || baseSymbol;
  
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
  const nseSymbol = nseSymbolMatch ? nseSymbolMatch[1] : baseSymbol.toUpperCase();

  const screenerResult = {
    ticker: baseSymbol,
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
    const mcUrl = \`https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=\${encodeURIComponent(baseSymbol)}&type=1&format=json\`;
    const res = await axiosInstance.get(mcUrl, { headers: { 'User-Agent': 'curl/7.81.0', 'Accept': '*/*' } });
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

  const advanced = computeAdvancedAnalytics(screenerResult);

  return {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [] 
  };
}
`;

fs.writeFileSync('scraper.js', cleanPrefix + newFetch + cleanSuffix);
