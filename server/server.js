var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var accept = require('http-accept');
var application = require('./app');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(accept);

app.use(function (req, res, next) {
  res.header("Content-Type",'application/vnd.api+json');
  next();
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on [::]:' + port);

application.init(app);
