import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

const newCSS = `
/* ========================================= */
/* ENHANCED INTERACTIVE UI FEATURES (PRO)    */
/* ========================================= */

/* Market Pulse Ribbon */
.market-pulse-ribbon {
  width: 100%;
  background: rgba(15, 20, 25, 0.8);
  border-bottom: 1px solid var(--border-color);
  border-top: 1px solid rgba(255,255,255,0.02);
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin-bottom: 15px;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(8px);
}
.marquee-content {
  display: inline-block;
  animation: marquee 35s linear infinite;
}
.marquee-content:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.pulse-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 50px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}
.pulse-item .idx-name { color: var(--text-secondary); font-weight: 600; }
.pulse-item .idx-val { color: var(--text-primary); font-weight: 700; }
.pulse-item .idx-change.pos { color: var(--accent-emerald); }
.pulse-item .idx-change.neg { color: var(--accent-rose); }

/* Recent Searches */
.recent-searches-container {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
}
.recent-searches-container.hidden { display: none !important; }
.recent-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.recent-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.recent-chip {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 5px 12px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}
.recent-chip i { font-size: 0.7rem; opacity: 0.7; }
.recent-chip:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
.recent-chip-delete {
  color: var(--text-muted);
  background: none;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}
.recent-chip-delete:hover {
  color: var(--accent-rose);
}

/* Enhanced Autocomplete UI */
.autocomplete-dropdown {
  padding: 4px;
}
.autocomplete-item {
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  flex-wrap: wrap;
  padding: 10px 14px;
  border-radius: 6px;
  border-bottom: none !important;
  margin-bottom: 2px;
}
.autocomplete-item.focused, .autocomplete-item:hover {
  background: rgba(255,255,255,0.06);
}
.ac-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}
.ac-left .name {
  color: var(--text-primary);
  font-size: 0.9rem;
}
.ac-left .ticker {
  background: rgba(56, 189, 248, 0.15);
  color: var(--accent-cyan);
  border: 1px solid rgba(56, 189, 248, 0.25);
  font-size: 0.75rem;
  padding: 2px 6px;
}
.ac-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-family: 'JetBrains Mono', monospace;
}
.ac-badge {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}
.ac-price {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}
.ac-change.pos { color: var(--accent-emerald); font-size: 0.75rem; }
.ac-change.neg { color: var(--accent-rose); font-size: 0.75rem; }
`;

css += newCSS;
fs.writeFileSync('app/static/style.css', css);
console.log("Updated style.css successfully.");
