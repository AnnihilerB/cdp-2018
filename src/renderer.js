/**
 * Render the fields to add int the DOM for creating
 * the project form
 * @return {string} String representation of the form.
 */
function renderProjectForm() {
  const projectName = 'Project name: <br>';
  const input = '<input type="text" name="project"><br>';
  const sprintDuration = 'Sprint duration: <br>';
  const input2Weeks = '<input type="radio" name="sprint_duration" value="2" checked> 2 weeks<br>';
  const input3Weeks = '<input type="radio" name="sprint_duration" value="3"> 3 weeks<br>';
  const button = '<button id="sendProject" type="submit">Valider</button>';

  return projectName+input+sprintDuration+input2Weeks+input3Weeks+button;
}

module.exports = {
  renderProjectForm: renderProjectForm,
};
