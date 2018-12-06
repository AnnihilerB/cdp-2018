let pool = require('./databaseDAO').pool;
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

/**
 * Parse the rawdata from the database and returns a simpler JSON array.
 * @param {JSON[]} projects raw array of projects coming fromt the DB.
 * @return {JSON[]} a simpler array with only two fields id and name.
 */
function toSimplerObject(projects) {
  const parsedProjects = [];
  for (let i = 0; i < projects.length; i++) {
    const project = {
      id: projects[i].id_project,
      name: projects[i].name,
    };
    parsedProjects.push(project);
  }
  return parsedProjects;
}

/**
 * Overrides the default pool.
 * Used for testing puposes
 * @param {Pool} newpool the new pool to be used
 */
function setPool(newpool) {
  pool = newpool;
}

module.exports = {
  createProject: createProject,
  getProjects: getProjects,
  toSimplerObject: toSimplerObject,
  setPool: setPool,
};
