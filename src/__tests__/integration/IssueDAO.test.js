const sprintDAO = require('../../IssueDAO');
const mariadb = require('mariadb');
let testpool = null;

beforeAll(async () => {
  jest.setTimeout(10000);
  testpool = mariadb.createPool({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'example',
    database: 'cdp',
    connectionLimit: 5});
  sprintDAO.setPool(testpool);
  const conn = await testpool.getConnection();
  await conn.query('DELETE FROM tasks');
  await conn.query('DELETE FROM sprints');
  await conn.query(`DELETE FROM issues`);
  await conn.query(`DELETE FROM projects`);
  await conn.query(`INSERT INTO projects(id_project) values ('1');`);
  await conn.query(`DELETE FROM users WHERE username <>'admin';`);
  conn.end();
});


test('Should create a new issue', async () => {
  const idescription = 'Test issue';
  const istate = 'todo';
  const idifficulty = '1';
  const ipriority = '1';
  const idProject = 1;
  await issueDAO.createIssue(idescription, istate, idifficulty, ipriority, idProject);
  const conn = await testpool.getConnection();
  const rows = await conn.query(`SELECT * FROM issues`);
  conn.end();
  expect(rows.length).toBe(1);
  expect(rows[0].description_issue).toBe(idescription);
  expect(rows[0].state_issue).toBe(istate);
  expect(rows[0].difficulty_issue).toBe(idifficulty);
  expect(rows[0].priority_issue).toBe(ipriority);
  expect(rows[0].id_project).toBe(idProject);
});


test('Should get the issues', async () => {
  const connected = await issueDAO.getIssues();
  const obj = await issueDAO.toSimplerObject(connected);
  expect(connected.length).toBe(1);
  expect(obj.length).toBe(1);
});

test('No issues founded', async () => {
  const conn = await testpool.getConnection();
  await conn.query(`DELETE FROM sprints`);
  conn.end();
  const connected = await issueDAO.getIssues();
  expect(connected).toBe(false);
});
