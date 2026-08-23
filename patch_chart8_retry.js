import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldStr = `      cutout: '70%',
      plugins: {
        legend: { display: false }
      }`;

const newConfig = `      cutout: '70%',
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
              return ' ' + context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }`;

if (js.includes(oldStr)) {
  js = js.replace(oldStr, newConfig);
  fs.writeFileSync('app/static/app.js', js);
  console.log("Successfully patched chart 8");
} else {
  console.log("Could not find the string. Snippet is:");
  const idx = js.indexOf("cutout: '70%'");
  console.log(js.substring(idx - 50, idx + 100));
}
