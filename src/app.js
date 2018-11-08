const express = require('express');
const mariadb = require('mariadb');
var path = require('path');
const pool = mariadb.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'cdp',
  connectionLimit: 5});
const app = express();
app.get('/', function(req, res) {
  // res.send('Hello !');
  app.use(express.static(path.join(__dirname, 'public')));
  res.sendFile('index.html', {root: __dirname});
  pool.getConnection('SELECT * FROM users');
});

app.get('/home', function(req, res) {
  res.send('Maison :-)');
});

app.get('/user/:uid', function(req, res) {
  res.send('Bonjour utilisateur ' + req.params.uid);
});

app.use(function(req, res, next) {
  res.status(404).send('Page introuvable !');
});

app.listen(3000, function() {
  console.log('Example app listening on port 8080!');
});