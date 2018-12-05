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
  projectForm = projectForm.concat(createFormButton('sendProject', 'Créér'));
  projectForm = projectForm.concat(createButton('/projects', 'Annuler'));
  return projectForm;
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
 * Render in HTML the prject list
 * @return {string} the HTML for the project list.
 * @param {String[]} projects to be rendered
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

module.exports = {
  renderProjectForm: renderProjectForm,
  renderSprintForm: renderSprintForm,
  renderProjectList: renderProjectList,
};
