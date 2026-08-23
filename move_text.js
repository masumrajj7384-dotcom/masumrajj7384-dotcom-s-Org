import fs from 'fs';

// 1. Update index.html
let html = fs.readFileSync('app/static/index.html', 'utf8');
html = html.replace(/\s*<div class="creator-3d">by Masum Raj<\/div>/g, '');
html = html.replace(
  /<h1>Screener<span>Insight<\/span> <em class="pro-tag">PRO<\/em><\/h1>/, 
  `<div class="logo-text-group" style="display: flex; flex-direction: column;">
          <h1 style="line-height: 1;">Screener<span>Insight</span> <em class="pro-tag">PRO</em></h1>
          <div class="creator-3d">by Masum Raj</div>
        </div>`
);
fs.writeFileSync('app/static/index.html', html);

// 2. Update style.css
let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(
  /\.creator-3d \{[\s\S]*?\}/,
  `.creator-3d {
  font-family: var(--font-family-title);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-primary);
  letter-spacing: 2px;
  text-shadow: 
    1px 1px 0px var(--accent-cyan),
    1.5px 1.5px 0px var(--accent-blue),
    2px 2px 0px var(--accent-purple),
    2px 2px 5px rgba(0,0,0,0.8);
  white-space: nowrap;
  pointer-events: none;
  margin-top: 0.25rem;
  padding-left: 0.15rem;
}`
);
fs.writeFileSync('app/static/style.css', css);
