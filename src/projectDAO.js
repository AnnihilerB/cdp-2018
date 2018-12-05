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
  conn.end();
};

/**
 * Get the list of projects.
 * @return{Object[]} rows returned by the database.
 */
async function getProjects() {
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM ${table}`);
  conn.end();
  return rows;
}

module.exports = {
  createProject: createProject,
  getProjects: getProjects,
};
