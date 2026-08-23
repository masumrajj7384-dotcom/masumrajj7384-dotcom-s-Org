import fs from 'fs';

let code = fs.readFileSync('app/static/index.html', 'utf8');

const target = /<div id="yf-volume" style="font-size: 0\.9rem; font-weight: 600; color: var\(--text-primary\); margin-top: 2px;">--<\/div>\n            <\/div>\n        <\/div>/;

const replacement = `<div id="yf-volume" style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-top: 2px;">--</div>
            </div>
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Source</span>
                <div style="font-size: 0.8rem; font-weight: 600; color: #a855f7; margin-top: 2px;"><i class="fa-solid fa-bolt"></i> Yahoo Finance Real-Time</div>
            </div>
        </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('app/static/index.html', code);
console.log("header fixed");
