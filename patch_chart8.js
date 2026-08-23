import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /plugins:\s*\{\s*legend:\s*\{\s*display:\s*false\s*\}\s*\}/;

const newConfig = `plugins: {
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
              return ' ' + context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }`;

// Since the regex won't have the global flag, it will match the first occurrence. 
// Wait, the other 6 were already replaced. Are there any other occurrences?
// Let's just find exactly that string in the doughnut options.

if (js.includes("cutout: '70%',\\n      plugins: {")) {
   js = js.replace(/cutout: '70%',\s*plugins: \{\s*legend: \{\s*display: false\s*\}\s*\}/, "cutout: '70%',\\n      " + newConfig);
   fs.writeFileSync('app/static/app.js', js);
   console.log("Patched chart 8 tooltips");
}
