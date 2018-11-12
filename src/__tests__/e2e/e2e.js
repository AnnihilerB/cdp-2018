module.exports = {
  'Authentication succes'(client) {
    client
        .url('http://webappcdp:3000/')
        .waitForElementVisible('body', 1000)
        .setValue('#name', 'admin')
        .setValue('#psw', 'pass')
        .click('#sub')
        .assert.containsText('h1', 'Bienvenue')
        .end();
  }, 'Authentication failure'(client) {
    client
        .url('http://webappcdp:3000/')
        .waitForElementVisible('body', 1000)
        .setValue('#name', 'admin')
        .setValue('#psw', 'false')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Incorrect credentials')
        .end();
  },
};
