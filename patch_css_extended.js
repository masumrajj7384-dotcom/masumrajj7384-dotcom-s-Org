import fs from 'fs';
let css = fs.readFileSync('app/static/style.css', 'utf8');

const newCSS = `
/* EXTENDED DASHBOARD STYLES */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
  margin-top: 15px;
}

.macro-bar {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none;
}
.macro-bar::-webkit-scrollbar {
  display: none;
}
.macro-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 10px 15px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.macro-name {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
}
.macro-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}
.heatmap-card {
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
}
.heatmap-card:hover {
  transform: translateY(-2px);
}
.heatmap-up {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.heatmap-down {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(244, 63, 94, 0.05));
  border: 1px solid rgba(244, 63, 94, 0.3);
}
.heatmap-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
.heatmap-pct {
  font-size: 1.1rem;
  font-weight: 700;
}

.inst-flow-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.inst-flow-row:last-child {
  border-bottom: none;
}
.flow-val {
  font-weight: 700;
  font-size: 1rem;
}
.flow-buy { color: var(--accent-emerald); }
.flow-sell { color: var(--accent-rose); }

.preset-shortcuts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.preset-badge {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c084fc;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.preset-badge:hover {
  background: rgba(139, 92, 246, 0.25);
  transform: translateY(-1px);
}
.preset-badge.value { border-color: rgba(6, 182, 212, 0.3); color: #22d3ee; background: rgba(6, 182, 212, 0.1); }
.preset-badge.value:hover { background: rgba(6, 182, 212, 0.25); }
.preset-badge.growth { border-color: rgba(245, 158, 11, 0.3); color: #fbbf24; background: rgba(245, 158, 11, 0.1); }
.preset-badge.growth:hover { background: rgba(245, 158, 11, 0.25); }

/* Breadth bar */
.breadth-bar {
  width: 100%;
  height: 8px;
  background: var(--accent-rose);
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
  display: flex;
}
.breadth-adv {
  height: 100%;
  background: var(--accent-emerald);
}
`;
css += "\n" + newCSS;
fs.writeFileSync('app/static/style.css', css);
console.log("Patched style.css");
