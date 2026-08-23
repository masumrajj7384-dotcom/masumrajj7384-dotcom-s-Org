import fs from 'fs';
let code = fs.readFileSync('scraper.js', 'utf8');

code = code.replace(
    /const res = await axiosInstance\.get\(mcUrl\);/g,
    "const res = await axiosInstance.get(mcUrl, { headers: { 'User-Agent': 'curl/7.81.0', 'Accept': '*/*' } });"
);

fs.writeFileSync('scraper.js', code);
