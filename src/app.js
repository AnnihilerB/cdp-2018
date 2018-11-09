const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const dao = require('./dataDAO');

// Setting up the app
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  // res.send('Hello !');
  res.sendFile('index.html', {root: __dirname});
});

app.post('/user/login', function(req, res) {
  const username = req.body.uname;
  const pass = req.body.psw;
  dao.logUser(username, pass).then((data) => {
    if (data !== null && data.user === username && data.pass === pass) {
      res.send('<h1>Bienvenue</h1>');
      return;
    }
    res.send('Incorrect credentials');
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});


