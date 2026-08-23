import fs from 'fs';

let code = fs.readFileSync('app/static/style.css', 'utf8');

const additions = `
/* 3D Colorful Dynamic Tabs Overrides */
.tab-btn {
  background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.4)) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  box-shadow: 3px 4px 10px rgba(0,0,0,0.6), inset 1px 1px 2px rgba(255,255,255,0.1) !important;
  font-weight: 800 !important;
  color: #cbd5e1 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  transform: translateY(0) translateZ(0) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  position: relative;
  overflow: hidden;
}

.tab-btn:hover {
  transform: translateY(-4px) translateZ(10px) !important;
  box-shadow: 5px 8px 15px rgba(0,0,0,0.8), inset 1px 1px 3px rgba(255,255,255,0.2) !important;
  color: #fff !important;
  border-color: rgba(255,255,255,0.25) !important;
}

.tab-btn.active {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899) !important;
  background-size: 200% 200% !important;
  animation: gradientFlow 4s ease infinite !important;
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.5), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -4px 10px rgba(0,0,0,0.3) !important;
  border: 1px solid rgba(255,255,255,0.4) !important;
  transform: translateY(-2px) scale(1.05) !important;
}

.tab-btn.active i {
  color: #fff !important;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)) !important;
  transform: scale(1.1) !important;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

code = code + '\n' + additions;

fs.writeFileSync('app/static/style.css', code);
console.log("3d tabs patched");
