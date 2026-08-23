import fs from 'fs';

let code = fs.readFileSync('app/static/style.css', 'utf8');

code = code.replace("perspective: 1000px;", "perspective: 1200px;");

fs.writeFileSync('app/static/style.css', code);
console.log("perspective updated");
