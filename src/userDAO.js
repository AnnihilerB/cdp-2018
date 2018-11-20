const pool = require('./databaseDAO').pool;

/**
 * Create a new user.
 * @param {string} name The username
 * @param {string} psw The password of the user
 * @param {string} mail The email address of the user
 */
async function createUser(name, psw, mail) {
  const conn = await pool.getConnection();
  conn.query(`INSERT INTO users(username, password, email) VALUE ('${name}', '${psw}', '${mail}')`);
}
/**
 * Log the user into the app
 * @param {string} name The username.
 * @param {string} pass the password.
 * @return {boolean} true if user is connected.
 */
async function logUser(name, pass) {
  console.log(pool);
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM users where username='${name}'`);
  return verifyCredentials(rows, name, pass);
};

/**
 * Verify that the provided credentials are correct.
 * @param {object} rows Row extracted from database.
 * @param {string} name The username.
 * @param {string} pass the password.
 * @return {boolean} true if the credentials are correct else otherwise.
 */
function verifyCredentials(rows, name, pass) {
  if (rows[0] !== undefined && rows[0].username === name && rows[0].password === pass) {
    return true;
  }
  return false;
}
/**
 * Verify that the User Password is good
 * @param {string} psw1 The first Password entered
 * @param {string} psw2 The second Password entered
 * @return {boolean} true if psw1 and psw2 are the same
 */
function verifyPassword(psw1, psw2) {
  if (psw1 == psw2) {
    return true;
  }
  return false;
}
module.exports = {
  createUser: createUser,
  logUser: logUser,
  verifyPassword: verifyPassword,
  verifyCredentials: verifyCredentials,
};
