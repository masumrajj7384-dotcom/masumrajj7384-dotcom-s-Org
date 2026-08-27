const fs = require('fs');
let code = fs.readFileSync('scraper.js', 'utf8');

const regex = /const symbols = \[\s*\{ ticker: '\^NSEI', name: 'NIFTY 50' \},[\s\S]*?\{ ticker: '\^INDIAVIX', name: 'INDIA VIX' \}\s*\];/;

const replacement = `const symbols = [
        { ticker: '^NSEI', name: 'NIFTY 50' },
        { ticker: '^BSESN', name: 'SENSEX' },
        { ticker: '^NSEBANK', name: 'BANKNIFTY' },
        { ticker: '^CNXAUTO', name: 'NIFTY AUTO' },
        { ticker: '^CNXENERGY', name: 'NIFTY ENERGY' },
        { ticker: '^CNXFIN', name: 'NIFTY FIN' },
        { ticker: '^CNXFMCG', name: 'NIFTY FMCG' },
        { ticker: '^CNXINFRA', name: 'NIFTY INFRA' },
        { ticker: '^CNXIT', name: 'NIFTY IT' },
        { ticker: '^CNXMEDIA', name: 'NIFTY MEDIA' },
        { ticker: '^CNXMETAL', name: 'NIFTY METAL' },
        { ticker: '^CNXPHARMA', name: 'NIFTY PHARMA' },
        { ticker: '^CNXREALTY', name: 'NIFTY REALTY' }
    ];`;

code = code.replace(regex, replacement);
fs.writeFileSync('scraper.js', code);
console.log("Patched scraper indices");
