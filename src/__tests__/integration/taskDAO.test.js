const taskDAO = require('../../taskDAO');
const projectDAO = require('../../projectDAO');
const issueDAO = require('../../issueDAO');
const sprintDAO = require('../../sprintDAO');
const mariadb = require('mariadb');
let testpool = null;

beforeAll(async () => {
  jest.setTimeout(15000);
  testpool = mariadb.createPool({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'example',
    database: 'cdp',
    connectionLimit: 5});
  taskDAO.setPool(testpool);
  projectDAO.setPool(testpool);
  sprintDAO.setPool(testpool);
  issueDAO.setPool(testpool);
  const conn = await testpool.getConnection();
  await conn.query('SET FOREIGN_KEY_CHECKS = 0; ');
  await conn.query(`TRUNCATE TABLE tasks;`);
  await conn.query(`TRUNCATE TABLE issues;`);
  await conn.query(`TRUNCATE TABLE sprints;`);
  await conn.query(`TRUNCATE TABLE projects;`);
  await conn.query(`DELETE FROM users WHERE username <>'admin';`);
  conn.end();
});

/**
 * Prepare the project, sprint and issue needed by the test
 */
async function prepareRequirements() {
  await projectDAO.createProject('Projet', '2');
  await sprintDAO.createSprint('Sprint', 'NC', 1);
  await issueDAO.createIssue('DESC', 'TODO', 1, 1, 1);
}

test('Should create a task', async () => {
  await prepareRequirements();
  const name = 'Ma tache test';
  const taskState = 'TODO';
  await taskDAO.createTask(name, taskState, 1, 1, 1);

  const tasks = await taskDAO.getTasks();
  expect(tasks.length).toBe(1);
  expect(tasks[0].name_task).toBe(name);
  expect(tasks[0].state_task).toBe(taskState);
  expect(tasks[0].id).toBe(1);
  expect(tasks[0].id_issue).toBe(1);
  expect(tasks[0].id_sprint).toBe(1);
});

test('Should get the task list', async () => {
  const tasks = await taskDAO.getTasks();
  expect(tasks.length).toBe(1);
});


