import fs from 'fs';
let html = fs.readFileSync('app/static/index.html', 'utf8');

const oldHeader = `          <div class="price-wrapper">
            <span class="price-label">Current Price <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Current Price" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.3rem;"></i></span>
            <span id="current-price" class="price-value">₹ 0.00</span>
            <span id="gf-change" class="price-change"></span>
          </div>
        </div>
        <p id="company-about" class="company-about"></p>
      </section>`;

const newHeader = `          <div class="price-wrapper">
            <span class="price-label">Current Price <i class="fa-regular fa-circle-question tooltip-icon" data-metric="Current Price" style="cursor: pointer; opacity: 0.8; font-size: 0.9em; margin-left: 0.3rem;"></i></span>
            <span id="current-price" class="price-value">₹ 0.00</span>
            <span id="gf-change" class="price-change"></span>
          </div>
        </div>
        <div id="live-market-strip" style="display:none; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05);">
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Prev Close</span>
                <div id="yf-prev-close" style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-top: 2px;">--</div>
            </div>
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">52-Wk High</span>
                <div id="yf-52w-high" style="font-size: 0.9rem; font-weight: 600; color: var(--accent-emerald); margin-top: 2px;">--</div>
            </div>
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">52-Wk Low</span>
                <div id="yf-52w-low" style="font-size: 0.9rem; font-weight: 600; color: var(--accent-rose); margin-top: 2px;">--</div>
            </div>
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Volume</span>
                <div id="yf-volume" style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-top: 2px;">--</div>
            </div>
            <div class="market-metric">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Data Source</span>
                <div style="font-size: 0.8rem; font-weight: 600; color: #a855f7; margin-top: 2px;"><i class="fa-solid fa-bolt"></i> Yahoo Finance Real-Time</div>
            </div>
        </div>
        <p id="company-about" class="company-about"></p>
      </section>`;

html = html.replace(oldHeader, newHeader);
fs.writeFileSync('app/static/index.html', html);
