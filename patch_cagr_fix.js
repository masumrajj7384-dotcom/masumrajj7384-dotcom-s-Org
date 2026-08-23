import fs from 'fs';
let js = fs.readFileSync('app/static/app.js', 'utf8');

const regex = /if \(label\.includes\('10year'\)\) result\['10 Years'\] = val;\s*else if \(label\.includes\('5year'\)\) result\['5 Years'\] = val;\s*else if \(label\.includes\('3year'\)\) result\['3 Years'\] = val;/;

const replacement = `const cleanVal = val.replace(/%/g, '').trim();
        if (cleanVal !== '' && cleanVal !== '-') {
            if (label.includes('10year')) result['10 Years'] = val;
            else if (label.includes('5year')) result['5 Years'] = val;
            else if (label.includes('3year')) result['3 Years'] = val;
        }`;

if (js.includes("if (label.includes('10year'))")) {
   js = js.replace(regex, replacement);
   fs.writeFileSync('app/static/app.js', js);
   console.log("Patched parser to ignore empty % strings");
}
