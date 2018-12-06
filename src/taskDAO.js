const pool = require('./databaseDAO').pool;
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
  const rows = await conn.query(`SELECT * FROM users WHERE id="${id}"`);
  if (rows[0] === undefined) {
    conn.end();
    return false;
  }
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${nameTask}', '${stateTask}', '${id}', '${idIssue}', '${idSprint}');`);
  conn.end();
  return true;
};

/**
 * Add a task to a sprint
 * @param {string} idTask Names of the sprint.
 * @param {string} idSprint Sprint state.
 */
async function addTaskToSprint(idTask, idSprint) {
  const conn = await pool.getConnection();
  await conn.query(`UPDATE tasks SET id_sprint = '${idSprint}' WHERE id_task = '${idTask}';`);
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

module.exports = {
  createTask: createTask,
  addTaskToSprint: addTaskToSprint,
  getTasks: getTasks,
};
