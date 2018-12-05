/**
 * Render the fields to add int the DOM for creating
 * the project form
 * @return {string} String representation of the form.
 */
function renderProjectForm() {
  const projectName = 'Project name: <br>';
  const input = '<input id="name" type="text" name="project"><br>';
  const sprintDuration = 'Sprint duration: <br>';
  const input2Weeks = '<input id="2weeks" type="radio" name="sprint_duration" value="2" checked> 2 weeks<br>';
  const input3Weeks = '<input id="3weeks" type="radio" name="sprint_duration" value="3"> 3 weeks<br>';
  const button = '<button id="sendProject" type="submit">Valider</button>';

  return projectName+input+sprintDuration+input2Weeks+input3Weeks+button;
}

/**
 * Render the fields to add int the DOM for creating
 * the sprint form
 * @return {string} String representation of the form.
 */
function renderSprintForm() {
  const sprintName = 'Sprint name: <br>';
  const input = '<input id="name" type="text" name="sprint"><br>';
  const sprintState = 'Sprint state: <br>';
  const inputCompleted = '<input id="complete" type="radio" name="sprint_state" value="Completed" checked> Completed<br>';
  const inputNotCompleted = '<input id="notComplete" type="radio" name="sprint_state" value="NotCompleted"> Not Completed<br>';
  const sprintProjectID = 'Project ID: <br>';
  const inputProjectID = '<input id="projectId" type="text" name="sprint_projectid"><br>';
  const button = '<button id="sendSprint" type="submit">Valider</button>';

  return sprintName+input+sprintState+inputCompleted+inputNotCompleted
        +sprintProjectID+inputProjectID+button;
}

/**
 * Render the fields to add int the DOM for creating
 * the adding a task to a sprint form
 * @return {string} String representation of the form.
 */
function renderTaskToSprintForm() {
  const sprintName = 'Sprint name: <br>';
  const input = '<select id="nameS" name="sprint" size="2"></select><br>';
  const taskName = 'Task Name: <br>';
  const inputTaskName = '<select id="nameT" name="task" size="2"></select><br>';
  const button = '<button id="sendTaskToSprint" type="submit">Valider</button>';

  return sprintName+input+taskName+inputTaskName+button;
}

module.exports = {
  renderProjectForm: renderProjectForm,
  renderSprintForm: renderSprintForm,
  renderTaskToSprintForm: renderTaskToSprintForm,
};
