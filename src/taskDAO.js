let pool = require('./databaseDAO').pool;
const table = 'tasks';
const columns = 'name_task, state_task, id, id_issue, id_sprint';

/**
 * Register a project into the database.
 * @param {string} nameTask Names of the task.
 * @param {string} stateTask task state.
 * @param {int} id task's project id.
 * @param {int} idIssue task's issue id.
 * @param {int} idSprint task's sprint id.
 */
async function createTask(nameTask, stateTask, id, idIssue, idSprint) {
  const conn = await pool.getConnection();
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${nameTask}', '${stateTask}', '${id}', '${idIssue}', '${idSprint}');`);
  conn.end();
  return true;
}

/**
 * Retrieve all tasks from database
 * @return {Array} Task's list
 */
async function getTasks() {
  const conn = await pool.getConnection();
  const rows = await conn.query(`Select * FROM tasks;`);
  conn.end();
  if (rows[0] === undefined) {
    return false;
  }
  return rows;
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
  createTask: createTask,
  getTasks: getTasks,
  setPool: setPool,
};
