import fs from 'fs';
let js = fs.readFileSync('scraper.js', 'utf8');

const replacement = `
    const documents = {
        announcements: [],
        annual_reports: [],
        credit_ratings: [],
        concalls: []
    };

    $('#documents .documents').each((i, el) => {
        const title = $(el).find('h3').text().trim().toLowerCase();
        let targetArray = null;
        if (title.includes('announcement')) targetArray = documents.announcements;
        else if (title.includes('annual report')) targetArray = documents.annual_reports;
        else if (title.includes('credit rating')) targetArray = documents.credit_ratings;
        else if (title.includes('concall')) targetArray = documents.concalls;

        if (targetArray) {
            $(el).find('ul li').each((j, li) => {
                let link = $(li).find('a').attr('href');
                let text = $(li).find('a').text().trim() || $(li).text().trim();
                let date = $(li).find('.date').text().trim() || $(li).find('.time').text().trim() || '';
                
                // Sometimes text contains the date, clean it up if needed. For now just extract raw.
                // Replace newlines and extra spaces
                text = text.replace(/\\s+/g, ' ').trim();
                
                // If it doesn't have an absolute link, try to fix it, but most links in Screener are absolute or relative
                if(link && !link.startsWith('http')) {
                    if (link.startsWith('/')) {
                       link = 'https://www.screener.in' + link;
                    }
                }
                
                if (text && link) {
                    targetArray.push({ title: text, date: date, link: link });
                }
            });
        }
    });

    return {
        screenerStatus: "Live",
        company_name,
        about,
        ratios,
        documents,
`;

js = js.replace(`
    return {
        screenerStatus: "Live",
        company_name,
        about,
        ratios,
`, replacement);

fs.writeFileSync('scraper.js', js);
console.log("Patched scraper.js with documents extraction");
