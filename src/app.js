const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userDAO = require('./userDAO');
const projectDAO = require('./projectDAO');
const sprintDAO = require('./sprintDAO');
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

app.post('/user/login', function(req, res) {
  const username = req.body.uname;
  const pass = req.body.psw;
  userDAO.logUser(username, pass).then((connected) => {
    if (connected) {
      res.redirect('/home');
    } else {
      res.send('<h1>Incorrect credentials</h1>');
    }
  });
});

app.post('/user/create', function(req, res) {
  const username = req.body.uname;
  const psw1 = req.body.psw1;
  const psw2 = req.body.psw2;
  const mail = req.body.email;
  assert.strictEqual(psw1, psw2);
  userDAO.userAlreadyExists(username).then((alreadyExists) => {
    if (!alreadyExists) {
      userDAO.createUser(username, psw1, mail).then(() => {
        userDAO.logUser(username, psw1).then((connected) => {
          res.redirect('/home');
        });
      });
    } else {
      res.send('<p>User already exists</p>');
    }
  });
});


app.get('/project', function(req, res) {
  JSDOM.fromFile('src/public/form.html').then((dom) => {
    changeHeader(dom, 'Créer mon projet');
    const form = dom.window.document.querySelector('form');
    form.action = '/project/add';
    form.innerHTML = renderer.renderProjectForm();
    res.send(dom.serialize());
  });
});

app.post('/project/add', function(req, res) {
  const projectName = req.body.project;
  const sprintDuration = req.body.sprint_duration;
  projectDAO.createProject(projectName, sprintDuration).then(()=>{
    res.send('<p>Project Created</p>');
  });
});

app.get('/sprint', function(req, res) {
  JSDOM.fromFile('src/public/form.html').then((dom) => {
    changeHeader(dom, 'Créer mon sprint');
    const form = dom.window.document.querySelector('form');
    form.action = '/sprint/add';
    form.innerHTML = renderer.renderSprintForm();
    res.send(dom.serialize());
  });
});

app.post('/sprint/add', function(req, res) {
  const sprintName = req.body.sprint;
  const sprintState = req.body.sprint_state;
  const projectID = req.body.sprint_projectid;
  sprintDAO.createSprint(sprintName, sprintState, projectID).then((isCreated)=>{
    if (isCreated) {
      res.send('<p>Sprint Created</p>');
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

/**
 * Change the text of the h2 element in the DOM.
 * @param {object} dom
 * @param {string} message
 */
function changeHeader(dom, message) {
  const h2 = dom.window.document.querySelector('h2');
  h2.innerHTML = message;
}
