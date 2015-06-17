//      login


var bcrypt = require('bcrypt-nodejs');
var mongo = require('mongodb').MongoClient;

exports.post = function (req, res) {
    //res.render('error');
    console.log(' in post login ');
    var name = req.body.loginUser
        , pass = req.body.loginPass;

    mongo.connect('mongodb://localhost/akuraChat', function (err, db) {
        if (err) throw err;
        var col = db.collection('accounts');
        col.findOne({usename: name}, function (err, user) {
           if ( err ) res.render('error', {errorText: 'Ошибка при поиске в базе данного логина'});
            if(!user) {
                setTimeout(
                    res.render('error', {errorText: 'Нет такого логина'}),
                2000);
                //res.redirect('login');
            } else {
                console.log(user);
                res.render('error', {errorText: 'Есть такой логин, добро пожаловать'})
            }
        });
    });

};