//      app

var express = require('express');
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');



var app = express();
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


require('routes')(app);

var server = app.listen(config.get('port'));