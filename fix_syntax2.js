import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');
js = js.replace('  }\n}\n}\n\nlet debounceTimer;', '  }\n}\n\nlet debounceTimer;');
js = js.replace('  }\n}\n}\nlet debounceTimer;', '  }\n}\n\nlet debounceTimer;');
fs.writeFileSync('app/static/app.js', js);
console.log("Fixed syntax 2");
