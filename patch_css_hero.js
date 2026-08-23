import fs from 'fs';

let code = fs.readFileSync('app/static/style.css', 'utf8');

const cssAdditions = `
/* Premium 3D Hero Additions */
.hero-3d-card.thick-frosted {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 -4px 8px rgba(0, 0, 0, 0.2);
}

.hero-shimmer.sweep {
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmerSweep 3s infinite linear;
}

@keyframes shimmerSweep {
  0% { left: -100%; }
  50% { left: 200%; }
  100% { left: 200%; }
}

.hero-3d-title.extruded {
  background: none;
  -webkit-background-clip: initial;
  background-clip: initial;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6), 0 8px 16px rgba(255,255,255,0.2);
  filter: none;
}

.hero-badges-wrapper {
  transform: translateZ(25px);
}

.badge-yahoo {
  background: rgba(123, 31, 162, 0.25);
  border: 1px solid #9C27B0;
  color: #E1BEE7;
}

.hero-disclaimer-bar.amber-glow {
  background: rgba(255, 179, 0, 0.1);
  border: 1.5px solid #FFB300;
  box-shadow: 0 0 15px rgba(255, 179, 0, 0.35);
  color: #FFB300;
  border-top: none; /* remove original border top if any, but border handles it */
}
.hero-disclaimer-bar.amber-glow i {
  color: #FFB300;
}
`;

code = code + '\n' + cssAdditions;
fs.writeFileSync('app/static/style.css', code);
console.log("style.css patched with premium hero additions");
