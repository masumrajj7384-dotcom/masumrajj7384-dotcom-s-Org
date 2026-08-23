import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const replacement = `
        screener_url: 'https://www.screener.in/',
        bse_code: '5' + Math.round(10000 + seededRandom(seed++) * 80000),
        nse_symbol: ticker.toUpperCase(),
        documents: {
            announcements: [
                { title: 'Board Meeting Intimation for Q3 Results', date: '21 Aug 2026', link: '#' },
                { title: 'Disclosure under Regulation 30', date: '15 Aug 2026', link: '#' }
            ],
            annual_reports: [
                { title: 'Annual Report 2026', date: '', link: '#' },
                { title: 'Annual Report 2025', date: '', link: '#' }
            ],
            credit_ratings: [
                { title: 'Rating update from CRISIL', date: '30 Mar', link: '#' },
                { title: 'Rating update from ICRA', date: '15 Jan', link: '#' }
            ],
            concalls: [
                { title: 'Transcript Q2 2026', date: '', link: '#' },
                { title: 'PPT Q2 2026', date: '', link: '#' }
            ]
        },
        tables: {
`;

js = js.replace(`
        screener_url: 'https://www.screener.in/',
        bse_code: '5' + Math.round(10000 + seededRandom(seed++) * 80000),
        nse_symbol: ticker.toUpperCase(),
        tables: {
`, replacement);

fs.writeFileSync('scraper.js', js);
console.log("Patched scraper.js fallback documents");
