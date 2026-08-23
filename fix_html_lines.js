import fs from 'fs';
let lines = fs.readFileSync('app/static/index.html', 'utf8').split('\n');

// We want to remove the extra tags. The text "For educational purposes only." with circle-info is at line 332
const targetLine = lines.findIndex(l => l.includes('fa-circle-info') && l.includes('educational'));

if (targetLine !== -1) {
    // Delete lines around it
    // From 2 lines above to 3 lines below
    lines.splice(targetLine - 2, 6);
    fs.writeFileSync('app/static/index.html', lines.join('\n'));
    console.log("Deleted extra tags");
} else {
    console.log("Could not find line");
}
