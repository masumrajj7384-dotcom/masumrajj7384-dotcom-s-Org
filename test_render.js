import fs from 'fs';
const appJs = fs.readFileSync('app/static/app.js', 'utf8');
if (appJs.includes('window.currentDocs = data.documents;')) {
    console.log("Success");
} else {
    console.log("Failed to patch updateDashboard");
}
