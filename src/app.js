const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userDAO = require('./userDAO');
const projectDAO = require('./projectDAO');
const sprintDAO = require('./sprintDAO');
const taskDAO = require('./taskDAO');
const issueDAO = require('./issueDAO');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const renderer = require('./renderer');
const assert = require('assert');

// Setting up the app
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.post('/user/login', async function(req, res) {
  const username = req.body.uname;
  const pass = req.body.psw;
  const connected = await userDAO.logUser(username, pass);
  if (connected) {
    res.redirect('/home');
  } else {
    res.send('<h1>Incorrect credentials</h1>');
  }
});

app.post('/user/create', async function(req, res) {
  const username = req.body.uname;
  const psw1 = req.body.psw1;
  const psw2 = req.body.psw2;
  const mail = req.body.email;
  assert.strictEqual(psw1, psw2);

  const alreadyExists = await userDAO.userAlreadyExists(username);
  console.log('already exists', alreadyExists);
  if (!alreadyExists) {
    await userDAO.createUser(username, psw1, mail);
    console.log('create user done');
    const connected = await userDAO.logUser(username, psw1);
    console.log('connected', connected);
    if (connected) {
      res.redirect('/home');
    }
  } else {
    res.send('<p>User already exists.</p>');
  }
});


app.get('/projects', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/category.html');
  const doc = dom.window.document;
  const projects = await projectDAO.getProjects();
  if (projects === undefined) {
    res.send('<p>No projects yet.</p>');
  } else {
    const list = doc.querySelector('.list-group');
    list.innerHTML = renderer.renderProjectList(projects);
    doc.querySelector('#creationButton').href = '/projects/add';
    doc.querySelector('.btn').innerHTML = 'Créer projet';
    res.send(dom.serialize());
  }
});


app.get('/projects/add', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/form.html');
  const form = dom.window.document.querySelector('form');
  form.method = 'POST';
  form.action = '/projects/add';
  form.innerHTML = renderer.renderProjectForm();
  dom.window.document.querySelector('.navbar-brand').innerHTML = 'Créer un projet';
  res.send(dom.serialize());
});

app.post('/projects/add', async function(req, res) {
  const projectName = req.body.project;
  const sprintDuration = req.body.sprint_duration;
  await projectDAO.createProject(projectName, sprintDuration);
  res.redirect('/projects');
});

app.get('/sprint', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/form.html');
  const form = dom.window.document.querySelector('form');
  form.action = '/sprint/add';
  form.innerHTML = renderer.renderSprintForm();
  dom.window.document.querySelector('.navbar-brand').innerHTML = 'Créer un sprint';
  res.send(dom.serialize());
});

app.post('/sprint/add', async function(req, res) {
  const sprintName = req.body.sprint;
  const sprintState = req.body.sprint_state;
  const projectID = req.body.sprint_projectid;
  const isCreated = await sprintDAO.createSprint(sprintName, sprintState, projectID);
  if (isCreated) {
    res.send('<p>Sprint Created</p>');
  } else {
    res.send('An error has occured');
  }
});

app.get('/issues', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/form.html');
  const form = dom.window.document.querySelector('form');
  form.action = '/issues/add';
  form.innerHTML = renderer.renderIssueForm();
  dom.window.document.querySelector('.navbar-brand').innerHTML = 'Créer une issue';
  res.send(dom.serialize());
});

app.post('/issues/add', async function(req, res) {
  const issueDesc = req.body.issue_description;
  const issueState = req.body.issue_state;
  const issueDif = req.body.issue_difficulty;
  const issuePrio = req.body.issue_priority;
  const idProject = req.body.id_project;
  const isCreated = await issueDAO.createIssue(issueDesc, issueState, issueDif, issuePrio, idProject);
  if (isCreated) {
    res.send('<p>Issue Created</p>');
  } else {
    res.send('An error has occured');
  }
});

app.get('/tasks', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/form.html');
  const form = dom.window.document.querySelector('form');
  form.action = '/tasks/add';
  form.innerHTML = renderer.renderTaskForm();
  dom.window.document.querySelector('.navbar-brand').innerHTML = 'Créer une tâche';
  res.send(dom.serialize());
});

app.post('/tasks/add', async function(req, res) {
  const taskName = req.body.task;
  const taskState = req.body.task_state;
  const id = req.body.id;
  const idIssue = req.body.id_issue;
  const idSprint = req.body.id_sprint;
  const isCreated = await taskDAO.createTask(taskName, taskState, id, idIssue, idSprint);
  if (isCreated) {
    res.send('<p>Task Created</p>');
  } else {
    res.send('An error has occured');
  }
});

app.get('/sprint/TaskToSprint', async function(req, res) {
  const dom = await JSDOM.fromFile('src/public/form.html');
  const form = dom.window.document.querySelector('form');
  form.action = '/sprint/TaskToSprint/add';
  form.innerHTML = renderer.renderTaskToSprintForm();
  const sprintSelect = dom.window.document.getElementById('nameS');
  const taskSelect = dom.window.document.getElementById('nameT');
  const sprints = await sprintDAO.getSprints();
  sprints.forEach((element) => {
    const option = dom.window.document.createElement('option');
    option.text = element.name_sprint;
    option.value = element.id_sprint;
    sprintSelect.add(option);
  });
  const tasks = await taskDAO.getTasks();
  tasks.forEach((element) => {
    const option = dom.window.document.createElement('option');
    option.text = element.name_task;
    option.value = element.id_task;
    taskSelect.add(option);
  });
  res.send(dom.serialize());
});

app.post('/sprint/TaskToSprint/add', function(req, res) {
  const sprintName = req.body.sprint;
  const taskName = req.body.task;
  taskDAO.addTaskToSprint(taskName, sprintName).then((isCreated)=>{
    if (isCreated) {
      res.send('<p>Task Added to Sprint</p>');
    } else {
      res.send('An error has occured');
    }
  });
});

app.get('/home', function(req, res) {
  res.sendFile('public/home.html', {root: __dirname});
});

app.get('/create_account', function(red, res) {
  res.sendFile('public/create_account.html', {root: __dirname});
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
