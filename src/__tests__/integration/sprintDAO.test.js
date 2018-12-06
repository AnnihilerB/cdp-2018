const sprintDAO = require('../../sprintDAO');
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


test('Should create a new sprint', async () => {
  const sname = 'sprint1';
  const sstate = 'NC';
  const idProject = 1;
  await sprintDAO.createSprint(sname, sstate, idProject);
  const conn = await testpool.getConnection();
  const rows = await conn.query(`SELECT * FROM sprints`);
  conn.end();
  expect(rows.length).toBe(1);
  expect(rows[0].name_sprint).toBe(sname);
  expect(rows[0].state_sprint).toBe(sstate);
  expect(rows[0].id_project).toBe(idProject);
});


test('Should get the sprints', async () => {
  const connected = await sprintDAO.getSprints();
  const obj = await sprintDAO.toSimplerObject(connected);
  expect(connected.length).toBe(1);
  expect(obj.length).toBe(1);
});

test('No sprints founded', async () => {
  const conn = await testpool.getConnection();
  await conn.query(`DELETE FROM sprints`);
  conn.end();
  const connected = await sprintDAO.getSprints();
  expect(connected).toBe(false);
});
