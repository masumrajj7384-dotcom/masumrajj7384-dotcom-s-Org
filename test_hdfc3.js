import axios from 'axios';
axios.get('http://localhost:3000/api/company?ticker=HDFCBANK')
  .then(res => {
    let bs = res.data.tables['balance-sheet'];
    let pnl = res.data.tables['profit-loss'];
    if(bs && pnl){
       console.log("BS rows:", bs.map(r=>r[0]));
       console.log("PNL rows:", pnl.map(r=>r[0]));
    }
  })
  .catch(e => console.error(e));
