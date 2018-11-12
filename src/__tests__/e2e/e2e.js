/*const {Builder, By, Key} = require('selenium-webdriver');

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
})();*/

module.exports = { 
  'Authentication succes'(client) {
    client
      .url('http://webappcdp:3000/')
      .waitForElementVisible('body')
      .setValue('#name', 'admin')
      .setValue('#psw', 'admin')
      .click('#sub')
      .assert.containsText('h1', 'Bienvenue')
      .end();
  },'Authentication failure'(client) {
    client
      .url('http://webappcdp:3000/')
      .waitForElementVisible('body')
      .setValue('#name', 'admin')
      .setValue('#psw', 'false')
      .waitForElementVisible('#sub')
      .click('#sub')
      .assert.containsText('h1', 'Incorrect credentials')
      .end();
  }
};