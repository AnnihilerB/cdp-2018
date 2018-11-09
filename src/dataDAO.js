const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'cdp',
  connectionLimit: 5});

/**
 * Log the user into the app
 * @param {string} name The username.
 * @param {string} pass the password.
 */
async function logUser(name, pass) {
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM users where username='${name}'`);
  if (rows[0] === undefined) {
    return null;
  }
  return {
    user: rows[0].username,
    pass: rows[0].password,
  };
};

module.exports = {
  logUser: logUser,
};
