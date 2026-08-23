import fs from 'fs';
let js = fs.readFileSync('server.js', 'utf8');

js = js.replace(
  "fetchMarketIndices } from './scraper.js';",
  "fetchMarketIndices, fetchExtendedMarketData } from './scraper.js';"
);

const extendedRoute = `
app.get('/api/market-extended', async (req, res) => {
  try {
    const data = await fetchExtendedMarketData();
    res.json(data || {});
  } catch (error) {
    console.error("Extended market error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch extended market data" });
  }
});
`;

js = js.replace(
  "// Fallback to index.html for SPA behavior",
  extendedRoute + "\n// Fallback to index.html for SPA behavior"
);

fs.writeFileSync('server.js', js);
console.log("Patched server.js with extended market route");
