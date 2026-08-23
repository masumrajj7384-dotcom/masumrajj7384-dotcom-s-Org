import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

// I will extract the current fetchFullData
// From "export async function fetchFullData" until "export async function searchCompanies"
// Then I will inject my new parallel version.

const startIndex = js.indexOf('export async function fetchFullData(ticker, force = false) {');
const endIndex = js.indexOf('export async function searchCompanies(query) {');

if (startIndex === -1 || endIndex === -1) {
    console.error("Indices not found");
    process.exit(1);
}

const originalBody = js.substring(startIndex, endIndex);

const newBody = `export async function fetchFullData(ticker, force = false) {
  let cleanTicker = ticker.trim();
  let baseSymbol = cleanTicker.replace('.NS', '').replace('.BO', '');
  let yfSymbol = cleanTicker.includes('.NS') || cleanTicker.includes('.BO') ? cleanTicker : \`\${baseSymbol}.NS\`;

  // Define YF Promise
  const fetchYfData = async () => {
    try {
      const url = \`https://query1.finance.yahoo.com/v8/finance/chart/\${yfSymbol}\`;
      const res = await axiosInstance.get(url);
      const meta = res.data.chart.result[0].meta;
      
      let change_pct = null;
      if (meta.regularMarketPrice && meta.previousClose) {
        change_pct = ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;
      }
      return {
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
    } catch (e) {
      console.warn("YF fetch failed:", e.message);
      return { found: false, error: e.message };
    }
  };

  // Define Screener Promise
  const fetchScreenerData = async () => {
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
      return { fallback: true, ...generateFallbackData(baseSymbol), url: \`https://www.screener.in/company/\${upperTicker}/\` };
    } else {
      const parsed = parseScreenerHTML(htmlContent);
      return { fallback: false, ...parsed, url: successUrl };
    }
  };

  const fetchMoneyControlData = async () => {
     try {
        const mcUrl = \`https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=\${encodeURIComponent(baseSymbol)}&type=1&format=json\`;
        const res = await axiosInstance.get(mcUrl, { headers: { 'User-Agent': 'curl/7.81.0', 'Accept': '*/*' } });
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            let item = res.data.find(i => i.link_src && i.link_src.includes('/india/')) || res.data[0];
            let exactMatch = res.data.find(i => (i.sc_id || '').toLowerCase() === baseSymbol.toLowerCase() && i.link_src && i.link_src.includes('/india/'));
            if (exactMatch) item = exactMatch;
            const link = item.link_src || '';
            const urlParts = link.split('/').filter(p => p.length > 0);
            const trueScId = urlParts.length > 0 ? urlParts[urlParts.length - 1] : (item.sc_id || '');
            const trueSlug = urlParts.length > 1 ? urlParts[urlParts.length - 2] : trueScId;
            const trueSectorSlug = urlParts.length > 2 ? urlParts[urlParts.length - 3] : 'stocks';
            return {
              found: true,
              company_name: item.stock_name || baseSymbol,
              sc_id: trueScId,
              sector: item.sc_sector || 'General',
              ticker_slug: trueSlug,
              sector_slug: trueSectorSlug,
              stock_url: link,
              balance_sheet_url: \`https://www.moneycontrol.com/markets/financials/balance-sheet/\${trueSlug}-\${trueScId}/#results\`,
              profit_loss_url: \`https://www.moneycontrol.com/markets/financials/profit-loss/\${trueSlug}-\${trueScId}/#results\`,
              cash_flow_url: \`https://www.moneycontrol.com/markets/financials/cash-flow/\${trueSlug}-\${trueScId}/#results\`,
              ratios_url: \`https://www.moneycontrol.com/markets/financials/ratios/\${trueSlug}-\${trueScId}/#results\`,
              quarterly_url: \`https://www.moneycontrol.com/markets/financials/quarterly-results/\${trueSlug}-\${trueScId}/#results\`
            };
        }
    } catch (e) {}
    return { found: false };
  };

  // Cache check for Screener/MC (YF is always live)
  let screenerResult, mcData;
  if (!force && companyCache[cleanTicker] && isToday(companyCache[cleanTicker].lastFetch)) {
    console.log(\`Serving \${cleanTicker} from cache (Synced Today), fetching live YF.\`);
    const cachedData = companyCache[cleanTicker].data;
    const yfData = await fetchYfData();
    cachedData.yahoo_finance = yfData;
    cachedData.sync_status = {
      is_live: true,
      yf_live: yfData.found,
      screener_live: false, // served from cache
      last_sync: new Date().toISOString()
    };
    return cachedData;
  }

  // Parallel Fetch!
  console.log(\`Starting parallel multi-source fetch for \${cleanTicker}...\`);
  const [yfPromise, screenerPromise, mcPromise] = await Promise.allSettled([
    fetchYfData(),
    fetchScreenerData(),
    fetchMoneyControlData()
  ]);

  const yfData = yfPromise.status === 'fulfilled' ? yfPromise.value : { found: false };
  screenerResult = screenerPromise.status === 'fulfilled' ? screenerPromise.value : { fallback: true, ...generateFallbackData(baseSymbol) };
  mcData = mcPromise.status === 'fulfilled' ? mcPromise.value : { found: false };

  // Compute advanced models
  const advanced = computeAdvancedAnalytics(screenerResult);
  
  const finalData = {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [],
    sync_status: {
      is_live: true,
      yf_live: yfData.found,
      screener_live: !screenerResult.fallback,
      last_sync: new Date().toISOString()
    }
  };
  
  companyCache[cleanTicker] = {
    data: finalData,
    lastFetch: new Date().toISOString()
  };
  
  return finalData;
}
`;

js = js.substring(0, startIndex) + newBody + js.substring(endIndex);
fs.writeFileSync('scraper.js', js);
console.log("Updated fetchFullData successfully!");
