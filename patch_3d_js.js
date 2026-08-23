import fs from 'fs';

let code = fs.readFileSync('app/static/app.js', 'utf8');

const jsCode = `
// 3D Hero Banner Tilt Effect
function init3DBanner() {
  const card = document.getElementById('hero-3d-banner');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
    card.style.boxShadow = \`0 30px 50px -10px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2)\`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.1)';
  });
}

document.addEventListener('DOMContentLoaded', init3DBanner);
`;

code = code + '\n' + jsCode;
fs.writeFileSync('app/static/app.js', code);
console.log("app.js patched with 3d js");
