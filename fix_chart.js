import fs from 'fs';
let content = fs.readFileSync('app/static/app.js', 'utf8');

// We need to replace the configuration of the revenueProfitChart
// Specifically, removing yAxisID: 'y1' from the Net Profit dataset, 
// and removing the entire y1 scale object.

const searchRegex = /yAxisID:\s*'y1'/;
content = content.replace(searchRegex, "yAxisID: 'y'"); // Or simply remove it, but yAxisID: 'y' is explicit

// Also update the title of the primary Y axis
const yTitleRegex = /title:\s*\{\s*display:\s*true,\s*text:\s*'Sales \(₹ Crores\)'/;
content = content.replace(yTitleRegex, "title: { display: true, text: '₹ Crores'");

// And remove the y1 scale completely
const y1ScaleRegex = /y1:\s*\{\s*type:\s*'linear',\s*position:\s*'right',\s*grid:\s*\{\s*drawOnChartArea:\s*false\s*\},\s*ticks:\s*\{\s*color:\s*'#94a3b8'\s*\},\s*title:\s*\{\s*display:\s*true,\s*text:\s*'Net Profit \(₹ Crores\)',\s*color:\s*'#94a3b8'\s*\}\s*\}/;
content = content.replace(y1ScaleRegex, "");

// Clean up any trailing commas from removing y1 (if any, although since it's the last element it might not have one, but we should be careful).
// Actually, it's safer to just replace the whole scales object for that specific chart.
