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

app.post('/user/login', function(req, res) {
  const username = req.body.uname;
  const pass = req.body.psw;
  dao.logUser(username, pass).then((connected) => {
    if (connected) {
      res.send('<h1>Bienvenue</h1>');
      return;
    }
    res.send('<h1>Incorrect credentials</h1>');
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
