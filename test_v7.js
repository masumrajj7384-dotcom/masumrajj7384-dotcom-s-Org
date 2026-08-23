import axios from 'axios';
import https from 'https';
const axiosInstance = axios.create({
  timeout: 5000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }
});
async function run() {
  try {
    const res = await axiosInstance.get('https://query1.finance.yahoo.com/v7/finance/quote?symbols=RELIANCE.NS');
    console.log(Object.keys(res.data.quoteResponse.result[0]));
  } catch (e) {
    console.error("Failed v7:", e.message);
  }
}
run();
