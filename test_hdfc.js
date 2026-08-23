import axios from 'axios';
axios.get('http://localhost:3000/api/company?ticker=HDFCBANK')
  .then(res => {
    let ratios = res.data.tables.ratios;
    let hasRoce = false;
    if(ratios) {
       for(let i=0; i<ratios.length; i++){
          if(ratios[i][0] === "ROCE %") hasRoce = true;
       }
    }
    console.log("HDFC Bank Ratios has ROCE:", hasRoce);
  })
  .catch(e => console.error(e));
