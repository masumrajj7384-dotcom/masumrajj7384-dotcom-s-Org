import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const tooltipConfigStr = `          interaction: {
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
                  if (context.parsed.y !== null && context.parsed.y !== undefined) {
                    label += context.parsed.y;
                    if (context.dataset.label && context.dataset.label.includes('%')) {
                        label += '%';
                    }
                  } else {
                    label += 'N/A';
                  }
                  return label;
                }
              }
            }
          },`;

let count = 0;
js = js.replace(/plugins:\s*\{\s*legend:\s*\{\s*display:\s*false\s*\}\s*\},/g, (match) => {
    count++;
    return tooltipConfigStr;
});

console.log("Patched " + count + " charts.");
fs.writeFileSync('app/static/app.js', js);
