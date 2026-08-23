import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchFullData, searchCompanies, fetchNews, fetchMarketIndices } from './scraper.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  xFrameOptions: false,
  contentSecurityPolicy: false,
  referrerPolicy: false
}));
app.set('trust proxy', 1);

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1500, // limit each IP to 150 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." }
});
app.use('/api/', apiLimiter);

// Input Sanitization Utility
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[^a-zA-Z0-9.\-\s&\'():_^=]/g, '').trim();
};

app.use(express.static(path.join(__dirname, 'app/static')));

app.get('/api/search', async (req, res) => {
  const query = sanitizeInput(req.query.q || '');
  if (!query) return res.json([]);
  try {
    const results = await searchCompanies(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/company', async (req, res) => {
  const ticker = sanitizeInput(req.query.ticker);
  if (!ticker) {
    return res.status(400).json({ error: "Missing 'ticker' query parameter" });
  }
  try {
    const force = req.query.force === 'true';
    const data = await fetchFullData(ticker, force);
    res.json(data);
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch data" });
  }
});

app.get('/api/news', async (req, res) => {
  const ticker = sanitizeInput(req.query.ticker);
  const companyName = sanitizeInput(req.query.name);
  if (!ticker || !companyName) {
    return res.status(400).json({ error: "Missing 'ticker' or 'name' query parameter" });
  }
  try {
    const force = req.query.force === 'true';
    const results = await fetchNews(ticker, companyName, force);
    res.json(results);
  } catch (error) {
    console.error("News endpoint error:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/market-indices', async (req, res) => {
  try {
    const data = await fetchMarketIndices();
    res.json(data);
  } catch (error) {
    console.error("Market indices error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch market indices" });
  }
});

// Fallback to index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/static/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Live Scraping Server running on http://0.0.0.0:${PORT}`);
});



