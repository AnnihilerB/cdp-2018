const pool = require('./databaseDAO').pool;
const table = 'issues';
const columns = 'description_issue, state_issue, difficulty_issue, priority_issue, id_project';

/**
 * Register a project into the database.
 * @param {string} descIssue Names of the sprint.
 * @param {string} stateIssue Sprint state.
 * @param {int} difficultyIssue Sprint state.
 * @param {int} priorityIssue Sprint state.
 * @param {int} idProject sprint's project id.
 */
async function createIssue(descIssue, stateIssue, difficultyIssue, priorityIssue, idProject) {
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM projects WHERE id_project="${idProject}"`);
  if (rows[0] === undefined) {
    return false;
  }
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${descIssue}', '${stateIssue}', '${difficultyIssue}', '${priorityIssue}',  '${idProject}');`);
  conn.end();
  return true;
};

module.exports = {
  createIssue: createIssue,
};
