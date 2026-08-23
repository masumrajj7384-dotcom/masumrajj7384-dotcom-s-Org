import fs from 'fs';

let code = fs.readFileSync('app/static/style.css', 'utf8');

code = code.replace("animation: shimmerSweep 3s infinite linear;", "opacity: 0;\n  transition: opacity 0.3s;");
code += `\n.hero-3d-card:hover .hero-shimmer.sweep { opacity: 1; animation: shimmerSweep 2.5s infinite linear; }\n`;

fs.writeFileSync('app/static/style.css', code);
console.log("shimmer hover patched");
