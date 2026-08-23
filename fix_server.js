import fs from 'fs';
let code = fs.readFileSync('server.js', 'utf8');

const newsEndpoint = `app.get('/api/news', async (req, res) => {
  const ticker = req.query.ticker;
  const companyName = req.query.name;
  if (!ticker || !companyName) {
    return res.status(400).json({ error: "Missing 'ticker' or 'name' query parameter" });
  }
  try {
    const results = await fetchNews(ticker, companyName);
    res.json(results);
  } catch (error) {
    console.error("News endpoint error:", error);
    res.status(500).json({ error: error.message });
  }
});`;

code = code.replace(newsEndpoint, '');

const fallbackTarget = `// Fallback to index.html for SPA behavior`;
code = code.replace(fallbackTarget, newsEndpoint + '\n\n' + fallbackTarget);

fs.writeFileSync('server.js', code);
console.log("server.js fixed");
