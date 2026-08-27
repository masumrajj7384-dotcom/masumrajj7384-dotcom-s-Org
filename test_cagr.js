const fs = require('fs');
// Let's just run node test script to fetch and log epsValues
fetch("http://localhost:3000/api/company?ticker=TCS").then(r=>r.json()).then(d=>{
  console.log(d.financials.quarters);
  console.log(d.financials.yearly);
});
