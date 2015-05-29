//      index routes

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
};
