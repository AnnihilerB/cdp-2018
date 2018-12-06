const userDAO = require('../../userDAO');
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
  userDAO.setPool(testpool);
  const conn = await testpool.getConnection();
  await conn.query('DELETE FROM tasks');
  await conn.query('DELETE FROM sprints');
  await conn.query(`DELETE FROM issues`);
  await conn.query(`DELETE FROM projects`);
  await conn.query(`DELETE FROM users WHERE username <>'admin';`);
  conn.end();
});

test('Should return the list of all users', async () => {
  const users = await userDAO.getUsers();
  expect(users.length).toBe(1);
  expect(users[0].username).toBe('admin');
  expect(users[0].password).toBe('pass');
});

test('Should make user a simple object with 2 fields', async () => {
  let users = await userDAO.getUsers();
  users = userDAO.toSimplerObject(users);
  expect(users.length).toBe(1);
  expect(users[0].name).toBe('admin');
  expect(users[0].id).toBe(1);
});

test('Should log the user ', async () => {
  const connected = await userDAO.logUser('admin', 'pass');
  expect(connected).toBe(true);
});

test('Wrong password', async () => {
  const connected = await userDAO.logUser('admin', 'nope');
  expect(connected).toBe(false);
});

test('Should create a new user', async () => {
  const username = 'John';
  const pass = 'pass';
  const mail = 'a@a.com';
  await userDAO.createUser(username, pass, mail);
  const conn = await testpool.getConnection();
  const rows = await conn.query(`SELECT * FROM users`);
  conn.end();
  // admin and new user
  expect(rows.length).toBe(2);
  expect(rows[1].username).toBe(username);
  expect(rows[1].password).toBe(pass);
  expect(rows[1].email).toBe(mail);
});

test('User should exist', async () => {
  const res = await userDAO.userAlreadyExists('admin');
  expect(res).toBe(true);
});

test('User should not exist', async () => {
  const res = await userDAO.userAlreadyExists('Michael');
  expect(res).toBe(false);
});
