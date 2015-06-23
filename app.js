//      app

var express = require('express');
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');



var app = express();
app.set('port', config.get('port'));
var io = require('socket.io').listen(app.listen(app.get('port')));
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


require('routes')(app);

//var server = app.listen(config.get('port'));