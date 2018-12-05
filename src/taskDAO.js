const pool = require('./databaseDAO').pool;
const table = 'tasks';
const columns = 'name_task, state_task, id, id_issue, id_sprint';

/**
 * Register a project into the database.
 * @param {string} nameSprint Names of the sprint.
 * @param {string} stateSprint Sprint state.
 * @param {int} idProject sprint's project id.
 */
async function createTask(nameSprint, stateSprint, idProject) {
  const conn = await pool.getConnection();
  const rows = await conn.query(`SELECT * FROM projects WHERE id_project="${idProject}"`);
  if (rows[0] === undefined) {
    return false;
  }
  await conn.query(`INSERT INTO ${table} (${columns}) VALUES ('${nameSprint}', '${stateSprint}', '${idProject}');`);
  return true;
};

async function addTaskToSprint(id_task, id_sprint) {
  const conn = await pool.getConnection();

  await conn.query(`UPDATE tasks SET id_sprint = '${id_sprint}' WHERE id_task = '${id_task}';`);
  return true;
};

async function getTasks() {
  const conn = await pool.getConnection();
  const rows = await conn.query(`Select * FROM tasks;`);
  if (rows[0] === undefined) {
    return false;
  }
  return rows;
};

module.exports = {
  createTask: createTask,
  addTaskToSprint: addTaskToSprint,
  getTasks: getTasks,
};