import fs from 'fs';
let code = fs.readFileSync('app/static/index.html', 'utf8');

const badChunk = `                        <div class="hero-disclaimer-bar">
              <i class="fa-solid fa-circle-info"></i> For educational purposes only.
            </div>
          </div>
        </div>`;

code = code.replace(badChunk, "");

fs.writeFileSync('app/static/index.html', code);
console.log("fixed tags in html");
