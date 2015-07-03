//      app

var express = require('express');
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



var app = express();
var router = express.Router();


//
//io.listen(8000);


//var io = require('socket.io').listen(server);


app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

require('routes')(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var server = app.listen(config.get('port'));
var server = http.listen(config.get('port'));