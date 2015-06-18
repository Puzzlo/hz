//      login


var bcrypt = require('bcrypt-nodejs');
var mongo = require('mongodb').MongoClient;

exports.post = function (req, res) {
    //res.render('error');
    console.log(' in post login ');
    var name = req.body.loginUser
        , pass = req.body.loginPass;
    console.log('params in login is: ' + JSON.stringify(req.body));

    mongo.connect('mongodb://localhost/akuraChat', function (err, db) {
        if (err) throw err;
        var col = db.collection('accounts');
        col.findOne({username: name}, function (err, user) {
            console.log(JSON.stringify(user));
           if ( err ) res.render('error', {errorText: 'Ошибка при поиске в базе данного логина'});
            if(user == null) {
                setTimeout(
                    res.render('error', {errorText: 'Нет такого логина'}),
                2000);
                //res.redirect('login');
            } else {
                //console.log(user);
                //res.render('error', {errorText: 'Есть такой логин, добро пожаловать'})
                bcrypt.compare(pass, user.password, function (err, result) {
                    if ( err ) throw err;
                    if(result) {
                        res.redirect('chat');
                    } else {
                        res.render('error', {errorText: JSON.stringify(user)});
                    }

                })


            }
        });
    });

};