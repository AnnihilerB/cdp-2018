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

module.exports = {
  createIssue: createIssue,
};
