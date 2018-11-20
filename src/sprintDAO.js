const pool = require('./databaseDAO').pool;
const table = 'sprints';
const columns = 'name_sprint, state_sprint, id_project';

/**
 * Register a project into the database.
 * @param {string} name_sprint Names of the sprint.
 * @param {string} state_sprint Sprint state.
 * @param {int} id_project sprint's project id.
 */
async function createSprint(name_sprint, state_sprint, id_project) {
  const conn = await pool.getConnection();
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${name_sprint}', '${state_sprint}', '${id_project}');`);
};

module.exports = {
  createSprint: createSprint,
};
