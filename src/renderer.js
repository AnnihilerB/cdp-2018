/**
 * Render the fields to add int the DOM for creating
 * the issue form
 * @param {JSON[]} projects list of projects to be rendered.
 * @return {string} String representation of the form.
 */
function renderIssueForm(projects) {
  let issuesForm = '';
  issuesForm = issuesForm.concat(createFormGroup('Issue description', 'description', 'issue_description'));
  issuesForm = issuesForm.concat(createFormGroup('State Issue', 'state', 'issue_state'));
  issuesForm = issuesForm.concat(createFormGroup('Issue difficulty', 'difficulty', 'issue_difficulty'));
  issuesForm = issuesForm.concat(createFormGroup('Issue priority', 'priority', 'issue_priority'));
  issuesForm = issuesForm.concat(createSelect('Project', 'projectid', projects));
  issuesForm = issuesForm.concat(createFormButton('sendIssue', 'Créer'));
  return issuesForm;
}

/**
 * Render the fields to add into the DOM for creating
 * the task form
 * @param {JSON[]} sprints Array of sprints to render
 * @param {JSON[]} issues Array of issues to render
 * @param {JSON[]} users Array of users to render
 * @return {string} String representation of the form.
 */
function renderTaskForm(sprints, issues, users) {
  let tasksForm = '';
  tasksForm = tasksForm.concat(createFormGroup('Task name', 'name', 'task'));
  tasksForm = tasksForm.concat(createFormGroup('State Task', 'state', 'task_state'));
  tasksForm = tasksForm.concat(createSelect('User', 'userid', users));
  tasksForm = tasksForm.concat(createSelect('Sprint', 'sprintid', sprints));
  tasksForm = tasksForm.concat(createSelect('Issue', 'issueid', issues));

  tasksForm = tasksForm.concat(createFormButton('sendTask', 'Créer'));
  return tasksForm;
}

/**
 * Render the fields to add int the DOM for creating
 * the project form
 * @return {string} String representation of the form.
 */
function renderProjectForm() {
  let projectForm = '';

  projectForm = projectForm.concat(createFormGroup('Project name', 'name', 'project'));
  projectForm = projectForm.concat(createFormRadio('2 weeks sprint duration', 'weeks2', 'sprint_duration', '2'));
  projectForm = projectForm.concat(createFormRadio('3 weeks sprint duration', 'weeks3', 'sprint_duration', '3'));
  projectForm = projectForm.concat(createFormButton('sendProject', 'Créer'));
  projectForm = projectForm.concat(createButton('/projects', 'Annuler'));
  return projectForm;
}

/**
 * Render the fields to add int the DOM for creating
 * the sprint form
 * @param {JSON[]} projects list of projects to be displayed.
 * @return {string} String representation of the form.
 */
function renderSprintForm(projects) {
  let sprintForm = '';

  sprintForm = sprintForm.concat(createFormGroup('Sprint name', 'name', 'sprint'));
  sprintForm = sprintForm.concat(createFormRadio('Sprint completed', 'complete', 'sprint_state', 'Completed'));
  sprintForm = sprintForm.concat(createFormRadio('Sprint not completed', 'notComplete', 'sprint_state', 'Not Completed'));
  sprintForm = sprintForm.concat(createSelect('Project', 'projectid', projects));
  sprintForm = sprintForm.concat(createFormButton('sendSprint', 'Créer'));

  return sprintForm;
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

/**
 * Renders the list of projects
 * @return {string} the HTML of a projects list.
 * @param {string} projects list of projects.
 */
function renderProjectList(projects) {
  let returnHTML='';
  for (let i = 0; i < projects.length; ++i) {
    returnHTML = returnHTML.concat(`<a href="#" class="list-group-item list-group-item-action">${projects[i].name}</a>`);
  }
  return returnHTML;
}

/**
 * Renders a classic input form in HTML.
 * @return {string} the HTML for a text form.
 * @param {string} label the label for the form field.
 * @param {string} inputID the ID for identifying the field.
 * @param {string} valueName name of the value transmitted in the form.
*/
function createFormGroup(label, inputID, valueName) {
  return `<div class="form-group row">
  <label class="col-form-label">${label}</label>
  <div class="col-sm-10">
  <input class="form-control" name="${valueName}" id="${inputID}">
  </div>
</div>`;
}

/**
 * Renders a classic radio form in HTML.
 * @return {string} the HTML for a radio form.
 * @param {string} label the label for the form field.
 * @param {string} inputID the ID for identifying the field.
 * @param {string} valueName name of the value transmitted in the form.
 * @param {string} value Value the radio field should have.
*/
function createFormRadio(label, inputID, valueName, value) {
  return `<div class="form-check">
  <input id="${inputID}" type="radio" name="${valueName}" value="${value}">
  <label>${label}</label>
</div>`;
}

/**
 * Renders a form button that triggers an action when clicked.
 * @return {string} the HTML for a form button.
 * @param {string} buttonID ID used to identify the button.
 * @param {string} buttonText Text of the button.
*/
function createFormButton(buttonID, buttonText) {
  return `<button id="${buttonID}" class="btn btn-primary" type="submit">${buttonText}</button>`;
}

/**
 * Renders a form button that triggers a redirection when clicked.
 * @return {string} the HTML for a button.
 * @param {string} action Path to be redirected to.
 * @param {string} buttonText Text of the button.
*/
function createButton(action, buttonText) {
  return `<a href="${action}">
  <button class="btn btn-secondary">${buttonText}</button>
</a>`;
}
/**
 * Create a select dropdown menu.
 * @param {string} labelName Name of the dropdown menu
 * @param {string} id the id of the select for gathering the selected value.
 * @param {JSON[]} options An array of options to display. Each item is a
 * JSON objects with two fields id and name.
 * @return {string} HTML code to be displayed
 */
function createSelect(labelName, id, options) {
  const header = `<label>${labelName}</label>
  <select class="form-control" name="${id}" id="${id}">`;
  const footer = '</select>';
  let displayOptions = '';
  for (let i = 0; i < options.length; i++) {
    displayOptions = displayOptions.concat(`<option value= ${options[i].id}>${options[i].name}</option>`);
  }
  return header+displayOptions+footer;
}

module.exports = {
  renderIssueForm: renderIssueForm,
  renderTaskForm: renderTaskForm,
  renderProjectForm: renderProjectForm,
  renderSprintForm: renderSprintForm,
  renderTaskToSprintForm: renderTaskToSprintForm,
  renderProjectList: renderProjectList,
};
