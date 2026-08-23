import fs from 'fs';

let css = fs.readFileSync('app/static/style.css', 'utf8');
css = css.replace(
  /\.creator-3d \{[\s\S]*?\}/,
  `.creator-3d {
  font-family: var(--font-family-title);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 2px;
  white-space: nowrap;
  pointer-events: none;
  margin-top: 0.15rem;
  padding-left: 0.15rem;
}`
);
fs.writeFileSync('app/static/style.css', css);
