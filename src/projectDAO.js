const pool = require('./databaseDAO').pool;
const table = 'projects';
const columns = 'name, description, sprint_duration, deposit_url';

/**
 * Register a project into the database.
 * @param {string} name Names of the project.
 * @param {string} sprintDuration sprint duration.
 */
async function createProject(name, sprintDuration) {
  const conn = await pool.getConnection();
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${name}', NULL, '${sprintDuration}', NULL);`);
};

module.exports = {
  createProject: createProject,
};
