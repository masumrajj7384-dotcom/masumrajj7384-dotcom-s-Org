fetch("http://localhost:3000/api/company?ticker=TCS")
.then(r=>r.json())
.then(d => {
  const pnl = d.tables['profit-loss'];
  console.log(JSON.stringify(pnl.slice(pnl.length - 20), null, 2));
})
