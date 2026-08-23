import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const targetStr = `
            const scId = item.sc_id || '';
            const link = item.link_src || '';
            const slugMatch = link.match(new RegExp(\`/([^/]+)/\${scId}$\`));
            const slugVal = slugMatch ? slugMatch[1] : scId;
`;

const replaceStr = `
            const link = item.link_src || '';
            const urlParts = link.split('/').filter(p => p.length > 0);
            const trueScId = urlParts.length > 0 ? urlParts[urlParts.length - 1] : (item.sc_id || '');
            const trueSlug = urlParts.length > 1 ? urlParts[urlParts.length - 2] : trueScId;
            const scId = trueScId;
            const slugVal = trueSlug;
`;

code = code.replace(targetStr, replaceStr);
code = code.replace(targetStr, replaceStr); // Run twice since there are two blocks (fallback & primary)

fs.writeFileSync('scraper.js', code);
