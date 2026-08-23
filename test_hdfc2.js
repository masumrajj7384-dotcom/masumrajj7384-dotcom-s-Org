import axios from 'axios';
axios.get('http://localhost:3000/api/company?ticker=HDFCBANK')
  .then(res => {
    let bs = res.data.tables['balance-sheet'];
    let pnl = res.data.tables['profit-loss'];
    console.log("BS:", bs ? bs.length : 0);
    console.log("PNL:", pnl ? pnl.length : 0);
    if(bs && pnl){
       console.log("BS Headers:", bs[0].slice(0, 5));
       console.log("PNL Headers:", pnl[0].slice(0, 5));
    }
  })
  .catch(e => console.error(e));
