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
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${nameSprint}', '${stateSprint}', '${idProject}');`);
};

module.exports = {
  createSprint: createSprint,
};
