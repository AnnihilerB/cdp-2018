const pool = require('./databaseDAO').pool;
const table = 'issues';
const columns = 'description_issue, state_issue, difficulty_issue, priority_issue, id_project';

/**
 * Register an into the database.
 * @param {string} descIssue Description of the issue.
 * @param {string} stateIssue State of an issue.
 * @param {int} difficultyIssue Issue Difficulty.
 * @param {int} priorityIssue Issue Priority.
 * @param {int} idProject Issue id.
 */
async function createIssue(descIssue, stateIssue, difficultyIssue, priorityIssue, idProject) {
  const conn = await pool.getConnection();
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${descIssue}', '${stateIssue}', '${difficultyIssue}', '${priorityIssue}',  '${idProject}');`);
  conn.end();
  return true;
}

/**
 * Get the issues from the DB.
 * @return {JSON[]} issues list;
 */
async function getIssues() {
  const conn = await pool.getConnection();
  const issues = await conn.query(`SELECT * FROM ${table}`);
  conn.end();
  if (issues[0] === undefined) {
    return false;
  }
  return issues;
}

/**
 * Parse the rawdata from the database and returns a simpler JSON array.
 * @param {JSON[]} issues raw array of issues coming fromt the DB.
 * @return {JSON[]} a simpler array with only two fields id and name.
 */
function toSimplerObject(issues) {
  const parsedProjects = [];
  for (let i = 0; i < issues.length; i++) {
    const project = {
      id: issues[i].id_issue,
      name: issues[i].description_issue,
    };
    parsedProjects.push(project);
  }
  return parsedProjects;
}

module.exports = {
  createIssue: createIssue,
  getIssues: getIssues,
  toSimplerObject: toSimplerObject,
};
