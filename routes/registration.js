//      registration

var mongo = require('../public/js/mongoConnect');
var users = require('../public/js/users').Users;

exports.post = function (req, res) {
    var name = req.body.regUser,
        pass = req.body.regPass,
        mess = 'Извините, пользователь с таким именем уже существует.'
            + '<br/>'
            +  'Попробуйте придумать новый псевдоним';
    console.log('name=' + JSON.stringify(req.body));
    var user = users.addUser(name, pass, function (err, pers) {
        if(err) throw err;
    })
};