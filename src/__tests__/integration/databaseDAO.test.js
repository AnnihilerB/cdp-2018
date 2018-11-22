const databaseDAO = require('../../databaseDAO');

test('Starting the database', () => {
  const pool = databaseDAO.pool;
  expect(pool).toMatchSnapshot();
});
