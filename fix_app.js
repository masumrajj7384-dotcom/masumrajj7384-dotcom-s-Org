import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

content = content.replace(
  /select\.addEventListener\('change', \(\) => \{\n    updateDonut\(parseInt\(select\.value\)\);\n  \}\);/,
  "select.onchange = () => { updateDonut(parseInt(select.value)); };"
);

fs.writeFileSync('app/static/app.js', content);
