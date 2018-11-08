const express = require('express');
const mariadb = require('mariadb');
// const connection = require('express-mariaconnection');
const path = require('path');
const pool = mariadb.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'cdp',
  connectionLimit: 5});
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(connection(mariadb, pool));

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname});
  pool.getConnection('FROM * SELECT 1');
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
