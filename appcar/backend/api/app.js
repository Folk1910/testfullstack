var express = require('express');
var cors = require('cors');
var app = express();

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.get('/test', function (req, res, next) {
  res.json({ msg: 'Hello world' });
});

app.listen(3333, function () {
  console.log('web server listening on port 3333');
});