import axios from 'axios';
import https from 'https';
const axiosInstance = axios.create({
  timeout: 5000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
});
async function run() {
  const res = await axiosInstance.get('https://query1.finance.yahoo.com/v8/finance/chart/RELIANCE.NS');
  console.log(res.data.chart.result[0].meta);
}
run();
