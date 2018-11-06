const express = require('express');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'cdp',
  connectionLimit: 5});
const app = express();
app.get('/', function(req, res) {
  // res.send('Hello !');
  pool.getConnection()
      .then((conn) => {
        conn.query('SELECT * FROM `table` LIMIT 50')
            .then((rows) => {
              console.log(rows); // [ {val: 1}, meta: ... ]
            })
            .then((res) => {
              conn.end();
            })
            .catch((err) => {
              // handle error
              console.log(err);
              conn.end();
            });
      }).catch((err) => {
      // not connected
        console.log(err);
      });
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


