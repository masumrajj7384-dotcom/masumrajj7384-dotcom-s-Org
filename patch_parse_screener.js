import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const parseScreenerHTML = `function cleanScrapedNumber(str) {
    if(!str) return null;
    const cleaned = str.replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\\./gi, '').trim();
    if(cleaned === '') return null;
    if(cleaned.includes('/')) {
        const parts = cleaned.split('/').map(p => parseFloat(p.trim()));
        return parts.join(' / ');
    }
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? cleaned : parsed;
}

function parseScreenerHTML(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const company_name = $('h1').text().trim();
    const about = $('.company-profile .about').text().trim();
    
    // Ratios
    const ratios = {};
    $('#top-ratios li').each((i, el) => {
        const name = $(el).find('.name').text().trim();
        const numbers = [];
        $(el).find('.number').each((j, num) => {
            numbers.push(cleanScrapedNumber($(num).text()));
        });
        if (name && numbers.length > 0) {
            ratios[name] = numbers.join(' / ');
        }
    });

    const parseTable = (selector) => {
        const table = [];
        $(selector).find('tr').each((i, el) => {
            const row = [];
            $(el).find('th, td').each((j, td) => {
                row.push($(td).text().trim());
            });
            if (row.length > 0) table.push(row);
        });
        return table;
    };

    return {
        screenerStatus: "Live",
        company_name,
        about,
        ratios,
        is_consolidated: $('.company-links a.active').text().toLowerCase().includes('consolidated'),
        tables: {
            'profit-loss': parseTable('#profit-loss table'),
            'balance-sheet': parseTable('#balance-sheet table'),
            'cash-flow': parseTable('#cash-flow table'),
            'ratios': parseTable('#ratios table'),
            'shareholding': parseTable('#shareholding table')
        }
    };
}
`;

// Insert it before generateFallbackData
const index = js.indexOf('function generateFallbackData');
js = js.substring(0, index) + parseScreenerHTML + '\n' + js.substring(index);
fs.writeFileSync('scraper.js', js);
console.log("Injected parseScreenerHTML");
