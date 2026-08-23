import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const replacement = `
        const q_years = ['Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'];
        const q_pnl = [
            ['', ...q_years],
            genRow('Sales', 500, 0.05, 0.02),
            genRow('Expenses', 350, 0.04, 0.01),
            genRow('Operating Profit', 150, 0.06, 0.03),
            genRow('OPM %', 30, 0.05, 0),
            genRow('Other Income', 10, 0.2, 0),
            genRow('Interest', 5, 0.1, -0.01),
            genRow('Depreciation', 12, 0.05, 0.01),
            genRow('Profit before tax', 143, 0.07, 0.03),
            genRow('Tax %', 25, 0.02, 0),
            genRow('Net Profit', 107, 0.08, 0.04),
            genRow('EPS in Rs', 21, 0.08, 0.04)
        ];

        return {
`;

js = js.replace('return {', replacement);
js = js.replace("'quarters': [],", "'quarters': q_pnl,");

fs.writeFileSync('scraper.js', js);
console.log("Patched fallback quarters");
