import fs from 'fs';

let code = fs.readFileSync('app/static/style.css', 'utf8');

const pulseAdditions = `
@keyframes amberPulse {
  0% { box-shadow: 0 0 10px rgba(255, 179, 0, 0.2); }
  50% { box-shadow: 0 0 25px rgba(255, 179, 0, 0.5); }
  100% { box-shadow: 0 0 10px rgba(255, 179, 0, 0.2); }
}

.hero-disclaimer-bar.amber-glow {
  animation: amberPulse 2.5s infinite ease-in-out;
}
`;

code = code + '\n' + pulseAdditions;
fs.writeFileSync('app/static/style.css', code);
console.log("amber pulse added");
