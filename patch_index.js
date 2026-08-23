import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const target = `            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Source</span>
                <div style="font-size: 0.8rem; font-weight: 600; color: #a855f7; margin-top: 2px;"><i class="fa-solid fa-bolt"></i> Yahoo Finance Real-Time</div>
            </div>`;

if (html.includes(target)) {
    html = html.replace(target, '');
    fs.writeFileSync('app/static/index.html', html);
    console.log("Replaced successfully!");
} else {
    console.log("Target not found!");
}
