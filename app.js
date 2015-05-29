//      app

var express = require('express');
//var config = require('config');
var config = require('config');
var path = require('path');


var app = express();
var server = app.listen(config.get('port'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

require('routes')(app);