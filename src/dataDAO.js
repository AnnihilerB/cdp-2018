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
  return verifyCredentials(rows);
};

/**
 * Log the user into the app
 * @param {string} name The username.
 * @param {string} pass the password.
 */
function verifyCredentials(rows, name, pass) {
  if (rows[0] !== undefined && rows[0].username === name && rows[0].password === pass) {
    return true;
  }
  return false;
}

module.exports = {
  logUser: logUser,
  verifyCredentials: verifyCredentials,
};
