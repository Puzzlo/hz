//      app

var express = require('express');
//var config = require('config');
var config = require('config');


var app = express();
var server = app.listen(config.get('port'));

app.get('/', function (req, res) {
    res.send('hello word!');
});