//      registration

// var mongo = require('../public/js/mongoConnect');
var bcrypt = require('bcrypt-nodejs');
var mongo = require('mongodb').MongoClient;
//var users = require('../public/js/users').Users;

exports.post = function (req, res) {
    var name = req.body.regUser
        , pass = req.body.regPass
        , mess = 'Извините, пользователь с таким именем уже существует.'
            + '<br/>'
            +  'Попробуйте придумать новый псевдоним';
    console.log('name=' + JSON.stringify(req.body));
    //users.addUser(name, pass, function (err, user) {
    //    if(err) callback(err, null);
    //    console.log('user=' + JSON.stringify(user));
    //    callback(null, user);
    //
    //})

    mongo.connect('mongodb://localhost/akuraChat', function (err, db) {
       if(err) throw err;
        var col = db.collection('accounts');
        col.findOne({username: name}, function (err, user) {
            if(err) throw err;
            console.log(user);
            if(user != null) {
                // user found, send an error
                //res.redirect('login');
                res.render('error');
            } else {
                // user not found, make user and make session for him
                var salt = bcrypt.genSaltSync();
                var passwordHash = bcrypt.hashSync(pass, salt);
                col.insert({username: name, password: passwordHash});
                res.redirect('/');
            }

        });
    });
};