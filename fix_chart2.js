import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

// Replace yAxisID: 'y1' with yAxisID: 'y'
content = content.replace(/yAxisID:\s*'y1'/g, "yAxisID: 'y'");

// Remove the y1 scale block
content = content.replace(/y1:\s*\{\s*type:\s*'linear',\s*position:\s*'right',\s*grid:\s*\{\s*drawOnChartArea:\s*false\s*\},\s*ticks:\s*\{\s*color:\s*'#94a3b8'\s*\},\s*title:\s*\{\s*display:\s*true,\s*text:\s*'Net Profit \(₹ Crores\)',\s*color:\s*'#94a3b8'\s*\}\s*\}/g, "");

// Clean up trailing commas in the y object
content = content.replace(/title:\s*\{\s*display:\s*true,\s*text:\s*'Sales \(₹ Crores\)',\s*color:\s*'#94a3b8'\s*\}\s*\},/g, "title: { display: true, text: '₹ Crores', color: '#94a3b8' } }");

fs.writeFileSync('app/static/app.js', content);
