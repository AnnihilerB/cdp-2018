const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const userDAO = require('./userDAO');
const projectDAO = require('./projectDAO');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const renderer = require('./renderer');

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
    }
    res.send('<h1>Incorrect credentials</h1>');
  });
});

app.get('/project', function(req, res) {
  JSDOM.fromFile('src/public/form.html').then((dom) => {
    const form = dom.window.document.querySelector('form');
    form.innerHTML = renderer.renderProjectForm();
    res.send(dom.serialize());
  });
});

app.post('/project/add', function(req, res) {
  const projectName = req.body.project;
  const sprintDuration = req.body.sprint_duration;
  projectDAO.createProject(projectName, sprintDuration);
  res.send('<p>Project Created</p>');
});

app.get('/home', function(req, res) {
  res.sendFile('public/home.html', {root: __dirname});
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
