var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'appcar'
});
 
connection.connect();

app.get('/list', function (req, res, next) {
  connection.query('SELECT * FROM `information`', function (error, results, fields) {
  if (error) throw error;
    res.json(results);
  });
});

app.get('/list/:id', function (req, res, next) {
  connection.query('SELECT * FROM `information` WHERE id = ?', [req.params.id], function (error, results, fields) {
  if (error) throw error;
    res.json(results);
  });
});

app.post('/add', function (req, res, next) {
  
  const vehicle_registration = req.body.vehicle_registration;
  const car_brand = req.body.car_brand;
  const car_model = req.body.car_model;
  const note = req.body.note;

  connection.query('INSERT INTO information (vehicle_registration, car_brand, car_model, note) VALUES (?, ?, ?, ?)', 
    [vehicle_registration, car_brand, car_model, note], 
    function (error, results, fields) {
    if (error) throw error;
    res.json({ message: req.body });
  });
});

app.put('/update', function (req, res, next) {
  const vehicle_registration = req.body.vehicle_registration;
  const car_brand = req.body.car_brand;
  const car_model = req.body.car_model;
  const note = req.body.note;
  const id = req.body.id;


  connection.query('UPDATE `information` SET `vehicle_registration` = ?, `car_brand` = ?, `car_model` = ?, `note` = ? WHERE `id` = ?', 
    [vehicle_registration, car_brand, car_model, note, id], 
    function (error, results, fields) {
    if (error) throw error;
    res.json({ message: req.body });
  });
});

app.listen(3333, function () {
  console.log('web server listening on port 3333');
});