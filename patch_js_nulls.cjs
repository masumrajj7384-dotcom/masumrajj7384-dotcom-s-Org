const fs = require('fs');
let js = fs.readFileSync('app/static/app.js', 'utf8');

js = js.replace(/const posList = document\.getElementById\('insights-positives'\);/g, "const posList = document.getElementById('insights-positives');\n  if (posList) {");
js = js.replace(/negList\.innerHTML = negatives\.map\(n => `<li><i class="fa-solid fa-circle-xmark"><\/i><span>\$\{markdownToHtml\(n\)\}<\/span><\/li>`\)\.join\(''\);/g, "negList.innerHTML = negatives.map(n => `<li><i class=\"fa-solid fa-circle-xmark\"></i><span>${markdownToHtml(n)}</span></li>`).join('');\n  }");

js = js.replace(/const scorecardContainer = document\.getElementById\('scorecard-content'\);/g, "const scorecardContainer = document.getElementById('scorecard-content');\n  if (!scorecardContainer) return;");

js = js.replace(/const growthContainer = document\.getElementById\('growth-quality-content'\);/g, "const growthContainer = document.getElementById('growth-quality-content');\n  if (!growthContainer) return;");

fs.writeFileSync('app/static/app.js', js);
console.log("Patched JS nulls");
