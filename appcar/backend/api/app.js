var express = require('express');
var cors = require('cors');
var app = express();

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'appcar'
});
 
connection.connect();

app.get('/test', function (req, res, next) {
  connection.query('SELECT * FROM `information`', function (error, results, fields) {
  if (error) throw error;
    res.json(results);
  });
});


app.listen(3333, function () {
  console.log('web server listening on port 3333');
});