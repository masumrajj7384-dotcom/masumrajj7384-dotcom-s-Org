import { fetchNews } from './scraper.js';
fetchNews("TCS", "Tata Consultancy Services", true).then(res => {
  res.slice(0, 15).forEach(d => console.log(d.title, "||", d.source?.name, "||", d.publishedAt));
}).catch(console.error);
