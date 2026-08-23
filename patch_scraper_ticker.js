import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const oldFinalData = `  const finalData = {
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [],
    sync_status: {`;
const newFinalData = `  const finalData = {
    ticker: cleanTicker,
    baseSymbol: baseSymbol,
    ...screenerResult,
    moneycontrol: mcData,
    yahoo_finance: yfData,
    analytics: advanced,
    news: [],
    sync_status: {`;

if (js.includes(oldFinalData)) {
    js = js.replace(oldFinalData, newFinalData);
    fs.writeFileSync('scraper.js', js);
    console.log("Updated scraper.js to include ticker in finalData");
} else {
    console.log("Regex not found");
}
