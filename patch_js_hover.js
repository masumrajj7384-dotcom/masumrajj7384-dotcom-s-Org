import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const targetHover = "card.style.boxShadow = `0 30px 50px -10px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2)`;";
const replacementHover = "card.style.boxShadow = `0 30px 60px -10px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.7), inset 0 -4px 8px rgba(0, 0, 0, 0.3)`;";

const targetLeave = "card.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.1)';";
const replacementLeave = "card.style.boxShadow = ''; // fallback to css class";

code = code.replace(targetHover, replacementHover);
code = code.replace(targetLeave, replacementLeave);

fs.writeFileSync('app/static/app.js', code);
console.log("app.js hover box-shadow patched");
