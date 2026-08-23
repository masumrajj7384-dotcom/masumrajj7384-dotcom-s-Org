import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const additionalDB = `
  { ticker: "HAL.NS", name: "Hindustan Aeronautics", ex: "NSE", p: "4,150.20", c: "+2.5%", sector: "Defense" },
  { ticker: "BEL.NS", name: "Bharat Electronics", ex: "NSE", p: "235.40", c: "+1.8%", sector: "Defense" },
  { ticker: "IRFC.NS", name: "Indian Railway Finance", ex: "NSE", p: "145.60", c: "-0.5%", sector: "Finance" },
  { ticker: "RVNL.NS", name: "Rail Vikas Nigam", ex: "NSE", p: "385.20", c: "+4.2%", sector: "Construction" },
  { ticker: "PFC.NS", name: "Power Finance Corp", ex: "NSE", p: "410.80", c: "+1.1%", sector: "Finance" },
  { ticker: "RECLTD.NS", name: "REC Limited", ex: "NSE", p: "450.30", c: "+1.5%", sector: "Finance" },
  { ticker: "TVSMOTOR.NS", name: "TVS Motor Company", ex: "NSE", p: "2,120.40", c: "-1.2%", sector: "Automobile" },
  { ticker: "EICHERMOT.NS", name: "Eicher Motors", ex: "NSE", p: "4,050.80", c: "+0.8%", sector: "Automobile" },
  { ticker: "TRENT.NS", name: "Trent Limited", ex: "NSE", p: "3,940.50", c: "+2.1%", sector: "Retail" },
  { ticker: "DMART.NS", name: "Avenue Supermarts", ex: "NSE", p: "4,560.10", c: "-0.4%", sector: "Retail" },
  { ticker: "INDIGO.NS", name: "InterGlobe Aviation", ex: "NSE", p: "3,650.30", c: "+1.9%", sector: "Aviation" },
  { ticker: "DLF.NS", name: "DLF Limited", ex: "NSE", p: "890.50", c: "-0.8%", sector: "Real Estate" },
  { ticker: "LODHA.NS", name: "Macrotech Developers", ex: "NSE", p: "1,120.40", c: "+2.2%", sector: "Real Estate" },
  { ticker: "POLICYBZR.NS", name: "PB Fintech", ex: "NSE", p: "1,250.60", c: "+3.5%", sector: "Finance" },
  { ticker: "PAYTM.NS", name: "One97 Communications", ex: "NSE", p: "410.20", c: "-1.5%", sector: "Fintech" },
  { ticker: "NYKAA.NS", name: "FSN E-Commerce", ex: "NSE", p: "155.80", c: "+0.5%", sector: "Retail" }
`;

js = js.replace(/\{ ticker: "HEROMOTOCO\.NS".*?\}/, match => match + "," + additionalDB);
fs.writeFileSync('app/static/app.js', js);
console.log("Added 16 more companies to DB.");
