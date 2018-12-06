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

/**
 * Parse the rawdata from the database and returns a simpler JSON array.
 * @param {JSON[]} sprints raw array of sprints coming fromt the DB.
 * @return {JSON[]} a simpler array with only two fields id and name.
 */
function toSimplerObject(sprints) {
  const parsedProjects = [];
  for (let i = 0; i < sprints.length; i++) {
    const project = {
      id: sprints[i].id_sprint,
      name: sprints[i].name_sprint,
    };
    parsedProjects.push(project);
  }
  return parsedProjects;
}

module.exports = {
  createSprint: createSprint,
  getSprints: getSprints,
  toSimplerObject: toSimplerObject,
};
