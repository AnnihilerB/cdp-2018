const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'cdp',
  connectionLimit: 100});

module.exports = {
  pool: pool,
};
