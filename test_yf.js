fetch("http://localhost:3000/api/company?ticker=TCS").then(r=>r.json()).then(d=>console.log(JSON.stringify(d.yahoo_finance, null, 2))).catch(console.error);
