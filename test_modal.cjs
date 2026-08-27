const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  // wait for the API to load the default TCS data
  await page.waitForFunction('!!window.companyData', { timeout: 10000 }).catch(e => console.log("Timeout waiting for companyData"));
  
  console.log(await page.evaluate(() => !!window.companyData ? "companyData is loaded" : "companyData is NOT loaded"));
  
  // click the DCF button
  await page.evaluate(() => {
    document.querySelector('button[data-calc="dcf"]').click();
  });
  
  // wait for modal to be visible
  const display = await page.evaluate(() => document.getElementById('calc-modal').style.display);
  console.log("Modal display style after click: ", display);
  
  await browser.close();
})();
