import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

code = code.replace(
    /target="_blank"(?! rel="noopener noreferrer")/g, 
    'target="_blank" rel="noopener noreferrer"'
);

fs.writeFileSync('app/static/app.js', code);
console.log("app.js Patched successfully");
