module.exports = {
  'Authentication succes'(client) {
    client
        .url('http://localhost:3000/')
        .waitForElementVisible('body', 1000)
        .setValue('#name', 'admin')
        .setValue('#psw', 'admin')
        .click('#sub')
        .assert.containsText('h1', 'Bienvenue')
        .end();
  }, 'Authentication failure'(client) {
    client
        .url('http://localhost:3000/')
        .waitForElementVisible('body', 1000)
        .setValue('#name', 'admin')
        .setValue('#psw', 'false')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Incorrect credentials')
        .end();
  }, 'Project added'(client) {
    client
        .url('http://localhost:3000/home/projects')
        .waitForElementVisible('body', 1000)
        .setValue('#project_id', 'test')
        .setValue('#project_name', 'test')
        .setValue('#project_description', 'test')
        .setValue('#project_sprint_duration', 'test')
        .setValue('#project_deposit_url', 'test')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Project added successfully')
        .end();
  }, 'Sprint added'(client) {
    client
        .url('http://localhost:3000/home/sprints')
        .waitForElementVisible('body', 1000)
        .setValue('#sprint_id', 'test')
        .setValue('#sprint_name', 'test')
        .setValue('#sprint_state', 'test')
        .setValue('#sprint_project_id', 'test')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Sprint added successfully')
        .end();
  }, 'Task added'(client) {
    client
        .url('http://localhost:3000/home/tasks')
        .waitForElementVisible('body', 1000)
        .setValue('#task_id', 'test')
        .setValue('#task_name', 'test')
        .setValue('#task_sprint_id', 'test')
        .setValue('#task_issue_id', 'test')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Task added successfully')
        .end();
  }, 'issue added'(client) {
    client
        .url('http://localhost:3000/home/issues')
        .waitForElementVisible('body', 1000)
        .setValue('#issue_id', 'test')
        .setValue('#issue_description', 'test')
        .setValue('#issue_state', 'test')
        .setValue('#issue_difficulty', 'test')
        .setValue('#issue_priority', 'test')
        .setValue('#issue_project_id', 'test')
        .waitForElementVisible('#sub', 1000)
        .click('#sub')
        .assert.containsText('h1', 'Issue added successfully')
        .end();
  },
};
