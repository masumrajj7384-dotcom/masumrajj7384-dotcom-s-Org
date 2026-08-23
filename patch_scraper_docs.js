import fs from 'fs';

let code = fs.readFileSync('scraper.js', 'utf8');

const target = `  const screenerResult = {
    ticker: baseSymbol,
    company_name: companyName,
    about: about,
    ratios: ratios,
    screener_url: successUrl,
    bse_code: bseCode,
    nse_symbol: nseSymbol,
    tables: tables
  };`;

const replacement = `
  const documents = {
    announcements: [],
    annual_reports: [],
    credit_ratings: [],
    concalls: []
  };

  // Announcements
  $('#company-announcements-tab ul.list-links li').each((_, el) => {
    if (documents.announcements.length >= 8) return;
    const a = $(el).find('a');
    if (!a.length) return;
    const link = a.attr('href');
    const timeEl = $(el).find('time');
    const date = timeEl.length ? timeEl.text().trim() : '';
    let title = a.contents().first().text().trim();
    let desc = $(el).find('.ink-600').text().trim().replace(/\\s+/g, ' ');
    documents.announcements.push({ title, date, link, description: desc });
  });

  // Annual reports
  $('.annual-reports ul.list-links li').each((_, el) => {
    const a = $(el).find('a');
    if (!a.length) return;
    const link = a.attr('href');
    let title = a.contents().first().text().trim(); 
    let desc = $(el).find('.ink-600').text().trim().replace(/\\s+/g, ' ');
    documents.annual_reports.push({ title, link, description: desc });
  });

  $('.documents').each((_, el) => {
    const header = $(el).find('h3').first().text().trim();
    if (header === 'Credit ratings') {
      $(el).find('ul.list-links li').each((_, li) => {
        const a = $(li).find('a');
        if (!a.length) return;
        documents.credit_ratings.push({
          title: a.contents().first().text().trim(),
          link: a.attr('href'),
          description: $(li).find('.ink-600').text().trim().replace(/\\s+/g, ' ')
        });
      });
    } else if (header === 'Concalls') {
      $(el).find('ul.list-links li').each((_, li) => {
        const date = $(li).find('.nowrap').first().text().trim();
        const links = [];
        $(li).find('a.concall-link').each((_, linkEl) => {
          const $le = $(linkEl);
          links.push({ title: $le.text().trim(), link: $le.attr('href') });
        });
        if (date && links.length > 0) {
          documents.concalls.push({ date, links });
        }
      });
    }
  });

  const screenerResult = {
    ticker: baseSymbol,
    company_name: companyName,
    about: about,
    ratios: ratios,
    screener_url: successUrl,
    bse_code: bseCode,
    nse_symbol: nseSymbol,
    tables: tables,
    documents: documents
  };`;

code = code.replace(target, replacement);
fs.writeFileSync('scraper.js', code);
console.log("scraper.js patched for documents");
