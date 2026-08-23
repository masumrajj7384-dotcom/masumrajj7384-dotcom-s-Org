import axios from 'axios';
axios.get('http://localhost:3000/api/company?ticker=TCS')
  .then(res => console.log(JSON.stringify(res.data.tables.ratios, null, 2)))
  .catch(e => console.error(e));
