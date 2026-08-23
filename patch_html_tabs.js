import fs from 'fs';
let code = fs.readFileSync('app/static/index.html', 'utf8');

// Ensure all tab-content tags have .hidden initially, except the one with .active
code = code.replace(/class="tab-content([^"]*)"/g, (match, p1) => {
    let classes = p1.split(' ').filter(c => c.trim() !== '');
    if (classes.includes('active')) {
        classes = classes.filter(c => c !== 'hidden');
    } else {
        if (!classes.includes('hidden')) {
            classes.push('hidden');
        }
    }
    return 'class="tab-content ' + classes.join(' ') + '"';
});

fs.writeFileSync('app/static/index.html', code);
console.log("patched html tabs");
