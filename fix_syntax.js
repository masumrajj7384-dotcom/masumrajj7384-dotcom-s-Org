import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');
js = js.replace('  }\n}\n\nlet debounceTimer;', '  }\n}\nlet debounceTimer;');
js = js.replace(/}\n}\nlet debounceTimer;/, '}\n\nlet debounceTimer;');
fs.writeFileSync('app/static/app.js', js);
console.log("Fixed syntax");
