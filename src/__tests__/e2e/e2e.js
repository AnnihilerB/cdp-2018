const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto('http://webappcdp:3000');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
