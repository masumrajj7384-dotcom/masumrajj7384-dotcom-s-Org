import fs from 'fs';

let css = fs.readFileSync('app/static/style.css', 'utf8');

const newCSS = `
@keyframes fadeInTerm {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes blinkTerm {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

css += newCSS;
fs.writeFileSync('app/static/style.css', css);
console.log("Updated CSS.");
