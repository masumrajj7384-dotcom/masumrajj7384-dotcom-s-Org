import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

code = code.replace(
    /target="_blank"(?! rel="noopener noreferrer")/g, 
    'target="_blank" rel="noopener noreferrer"'
);

fs.writeFileSync('app/static/index.html', code);
console.log("index.html Patched successfully");
