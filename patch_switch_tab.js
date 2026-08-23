import fs from 'fs';
let code = fs.readFileSync('app/static/app.js', 'utf8');

const oldFunc = `// Switch dashboard tabs
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Activate selected
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');
  
  document.getElementById(tabId).classList.add('active');
  
  // Resize charts to fit their containers if visible
  if (tabId === 'tab-charts') {
    Object.values(charts).forEach(chart => {
      if (chart) chart.resize();
    });
  }
}`;

const newFunc = `// Switch dashboard tabs
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden'); // explicitly hide
  });
  
  // Activate selected
  const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');
  
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
    selectedTab.classList.remove('hidden'); // explicitly reveal
  }
  
  // Resize charts to fit their containers if visible
  if (tabId === 'tab-charts') {
    Object.values(charts).forEach(chart => {
      if (chart) chart.resize();
    });
  }
}`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('app/static/app.js', code);
console.log("patched switchTab");
