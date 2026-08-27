import axios from 'axios';
async function test() {
    const syms = ['^NSEI','^BSESN','^NSEBANK','^CNXIT','^CNXAUTO','^CNXENERGY','^CNXFIN','^CNXFMCG','^CNXINFRA','^CNXMEDIA','^CNXMETAL','^CNXPHARMA','^CNXREALTY'];
    for(let s of syms) {
        try {
            const res = await axios.get(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}`);
            console.log(s, "OK");
        } catch(e) {
            console.log(s, "ERR", e.response?.status);
        }
    }
}
test();
