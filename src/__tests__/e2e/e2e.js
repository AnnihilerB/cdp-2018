const {Builder, By, Key} = require('selenium-webdriver');

(async function example() {
  const driver = await new Builder().forBrowser('safari').build();
  try {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('name')).sendKeys('admin', Key.RETURN);
    await driver.findElement(By.id('psw')).sendKeys('pass', Key.RETURN);
    await driver.sleep(1000);
    await driver.findElement(By.tagName('h1'));
  } finally {
    await driver.quit();
  }
})();