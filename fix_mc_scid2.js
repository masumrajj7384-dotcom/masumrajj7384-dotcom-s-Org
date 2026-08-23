import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

const regex = /const scId = item\.sc_id \|\| '';\s*const link = item\.link_src \|\| '';\s*const slugMatch = link\.match\(new RegExp\(`\/\(\[\^\/\]\+\)\/\$\{scId\}\$`\)\);\s*const slugVal = slugMatch \? slugMatch\[1\] : scId;/g;

const replacement = `
      const link = item.link_src || '';
      const urlParts = link.split('/').filter(p => p.length > 0);
      const trueScId = urlParts.length > 0 ? urlParts[urlParts.length - 1] : (item.sc_id || '');
      const trueSlug = urlParts.length > 1 ? urlParts[urlParts.length - 2] : trueScId;
      const scId = trueScId;
      const slugVal = trueSlug;
`;

code = code.replace(regex, replacement);
fs.writeFileSync('scraper.js', code);
