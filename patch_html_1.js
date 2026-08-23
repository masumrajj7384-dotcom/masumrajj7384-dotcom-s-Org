import fs from 'fs';

let html = fs.readFileSync('app/static/index.html', 'utf8');

// Inject the Ribbon right after </header>
const headerEndTarget = `    </header>`;
const ribbonHtml = `    </header>
    <!-- LIVE MARKET PULSE RIBBON -->
    <div class="market-pulse-ribbon">
      <div class="marquee-content">
        <span class="pulse-item"><span class="idx-name">NIFTY 50</span> <span class="idx-val">24,567.80</span> <span class="idx-change pos">+1.24%</span></span>
        <span class="pulse-item"><span class="idx-name">SENSEX</span> <span class="idx-val">81,245.10</span> <span class="idx-change pos">+1.15%</span></span>
        <span class="pulse-item"><span class="idx-name">BANKNIFTY</span> <span class="idx-val">52,450.30</span> <span class="idx-change neg">-0.35%</span></span>
        <span class="pulse-item"><span class="idx-name">INDIA VIX</span> <span class="idx-val">12.45</span> <span class="idx-change neg">-2.10%</span></span>
        <span class="pulse-item"><span class="idx-name">NIFTY IT</span> <span class="idx-val">39,812.40</span> <span class="idx-change pos">+0.85%</span></span>
        <span class="pulse-item"><span class="idx-name">NIFTY AUTO</span> <span class="idx-val">25,120.60</span> <span class="idx-change pos">+0.40%</span></span>
        <!-- Duplicated for seamless loop -->
        <span class="pulse-item"><span class="idx-name">NIFTY 50</span> <span class="idx-val">24,567.80</span> <span class="idx-change pos">+1.24%</span></span>
        <span class="pulse-item"><span class="idx-name">SENSEX</span> <span class="idx-val">81,245.10</span> <span class="idx-change pos">+1.15%</span></span>
        <span class="pulse-item"><span class="idx-name">BANKNIFTY</span> <span class="idx-val">52,450.30</span> <span class="idx-change neg">-0.35%</span></span>
        <span class="pulse-item"><span class="idx-name">INDIA VIX</span> <span class="idx-val">12.45</span> <span class="idx-change neg">-2.10%</span></span>
        <span class="pulse-item"><span class="idx-name">NIFTY IT</span> <span class="idx-val">39,812.40</span> <span class="idx-change pos">+0.85%</span></span>
        <span class="pulse-item"><span class="idx-name">NIFTY AUTO</span> <span class="idx-val">25,120.60</span> <span class="idx-change pos">+0.40%</span></span>
      </div>
    </div>`;

html = html.replace(headerEndTarget, ribbonHtml);

// Inject the Recent Searches right after </form>
const formEndTarget = `          <button type="submit" class="search-btn"><span>Analyze</span><i class="fa-solid fa-wand-magic-sparkles"></i></button>
        </form>`;
const recentHtml = `          <button type="submit" class="search-btn"><span>Analyze</span><i class="fa-solid fa-wand-magic-sparkles"></i></button>
        </form>
        <!-- RECENT SEARCHES -->
        <div id="recent-searches-container" class="recent-searches-container hidden">
          <span class="recent-label">Recent:</span>
          <div id="recent-chips" class="recent-chips"></div>
        </div>`;

html = html.replace(formEndTarget, recentHtml);

fs.writeFileSync('app/static/index.html', html);
console.log("Updated index.html successfully.");
