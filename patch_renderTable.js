import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const oldCode = `  // Extract headers (first row)
  const headers = table[0];
  const headerRow = document.createElement('tr');
  headers.forEach((h, i) => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  
  // Extract data rows
  for (let r = 1; r < table.length; r++) {
    const row = table[r];
    if (!row || row.length === 0) continue;
    
    // Skip totally empty rows
    if (row.every(cell => !cell || cell.trim() === '')) continue;
    
    const tr = document.createElement('tr');
    row.forEach((cell, c) => {`;

const newCode = `  // Extract headers (first row)
  const headers = table[0];
  const headerRow = document.createElement('tr');
  // Reverse chronological order for columns (index 1 to end)
  const invertedHeaders = headers.length > 1 ? [headers[0], ...headers.slice(1).reverse()] : headers;
  
  invertedHeaders.forEach((h, i) => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  
  // Extract data rows
  for (let r = 1; r < table.length; r++) {
    const row = table[r];
    if (!row || row.length === 0) continue;
    
    // Skip totally empty rows
    if (row.every(cell => !cell || cell.trim() === '')) continue;
    
    const tr = document.createElement('tr');
    // Align values with inverted headers
    const invertedRow = row.length > 1 ? [row[0], ...row.slice(1).reverse()] : row;
    
    invertedRow.forEach((cell, c) => {`;

if(js.includes(oldCode)) {
    js = js.replace(oldCode, newCode);
    fs.writeFileSync('app/static/app.js', js);
    console.log("Patched renderTable in app.js successfully");
} else {
    console.log("Could not find the target code to patch in app.js");
}
