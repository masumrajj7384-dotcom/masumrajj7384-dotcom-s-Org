import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const docsBlockMatch = code.match(/(\s*<!-- Corporate Filings & Documents -->[\s\S]*?<\/div>)\n      <\/section>/);

if (docsBlockMatch) {
  const docsBlock = docsBlockMatch[1];
  
  // Remove it from current location
  code = code.replace(docsBlock, '');
  
  // Insert it after screener-hub
  const insertTarget = '          <div id="screener-hub" class="analytics-card-body">No data</div>\n        </div>';
  
  code = code.replace(insertTarget, insertTarget + '\n' + docsBlock);
  
  fs.writeFileSync('app/static/index.html', code);
  console.log("Documents block moved successfully.");
} else {
  console.log("Could not find documents block.");
}
