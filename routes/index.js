//      index routes

var AM = require('public/js/account-manager');

module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index');
        //res.send('hello from hell');
    });
    app.get('/chat', function(req, res) {
        res.render('chat');
    });
    app.get('/registration', function(req, res) {
        res.render('registration');
    });
    app.post('/registration', require('./registration').post);
};
