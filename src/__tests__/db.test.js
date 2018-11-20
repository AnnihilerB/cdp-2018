const userDAO = require('../userDAO');

const rows = [{id: 1, username: 'user', password: 'pass', email: 'mail@mail.com'}];

test('Login user exists', () => {
  const supposedUserName = 'user';
  const supposedPass = 'pass';

  const result = userDAO.verifyCredentials(rows, supposedUserName, supposedPass);
  expect(result).toBe(true);
});

test('Login user wrong username', () => {
  const wrongUserName = 'wrong';
  const supposedPass = 'pass';

  const result = userDAO.verifyCredentials(rows, wrongUserName, supposedPass);
  expect(result).toBe(false);
});

test('Login user wrong password', () => {
  const wrongUserName = 'user';
  const wrongPass = 'wrong';

  const result = userDAO.verifyCredentials(rows, wrongUserName, wrongPass);
  expect(result).toBe(false);
});
