const pool = require('./databaseDAO').pool;
const table = 'sprints';
const columns = 'name_sprint, state_sprint, id_project';

/**
 * Register a project into the database.
 * @param {string} nameSprint Names of the sprint.
 * @param {string} stateSprint Sprint state.
 * @param {int} idProject sprint's project id.
 */
async function createSprint(nameSprint, stateSprint, idProject) {
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM projects WHERE id_project="${idProject}"`);
  if (rows[0] === undefined) {
    conn.end();
    return false;
  }
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${nameSprint}', '${stateSprint}', '${idProject}');`);
  conn.end();
  return true;
};

/**
 * Retrieve all Sprints from database
 * @return {Array} Sprint's list
 */
async function getSprints() {
  const conn = await pool.getConnection();
  const rows = await conn.query(`Select * FROM sprints;`);
  conn.end();
  if (rows[0] === undefined) {
    return false;
  }
  return rows;
}

module.exports = {
  createSprint: createSprint,
  getSprints: getSprints,
};
