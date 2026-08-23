import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldOptions = `        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', callback: v => \`\${v}%\` } }
          }
        }`;

const newOptions = `        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + '%';
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#94a3b8', callback: v => \`\${v}%\` } }
          }
        }`;

if (js.includes(oldOptions)) {
  js = js.replace(oldOptions, newOptions);
  fs.writeFileSync('app/static/app.js', js);
  console.log("Successfully patched Chart 6 tooltips");
} else {
  console.log("Could not find the target options block to patch.");
}
