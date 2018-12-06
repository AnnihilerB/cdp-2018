const projectDAO = require('../../projectDAO');
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
  projectDAO.setPool(testpool);
  const conn = await testpool.getConnection();
  await conn.query('DELETE FROM tasks');
  await conn.query('DELETE FROM sprints');
  await conn.query(`DELETE FROM issues`);
  await conn.query(`DELETE FROM projects`);
  await conn.query(`DELETE FROM users WHERE username <>'admin';`);
  conn.end();
});

test('Should create a project', async () => {
  const name = 'Mon projet test';
  const sprintDuration = '2';
  await projectDAO.createProject(name, sprintDuration);

  const projects = await projectDAO.getProjects();
  expect(projects.length).toBe(1);
  expect(projects[0].name).toBe(name);
  expect(projects[0].sprint_duration).toBe(sprintDuration);
});

test('Should get the project list', async () => {
  const projects = await projectDAO.getProjects();
  expect(projects.length).toBe(1);
});


