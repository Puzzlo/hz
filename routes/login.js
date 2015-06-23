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
                // логин есть, сравним правильность пароля
                bcrypt.compare(pass, user.password, function (err, result) {
                    if ( err ) throw err;
                    if(result) {
                        // пароль совпал, запишем куки и пойдём в чат
                        if(getCookie(user.username)== undefined) {
                            // кук нету. установим
                            var date = new Date;
                            date.setDate(date.getDate()+1000*60*60*24*14).toUTCString(); // 2 недели
                            var opt = {expires: date, path: '/'};
                            setCookie(user.username, 'aChat_'+user.username, opt);
                        }
                        res.redirect('chat');
                    } else {
                        res.render('error', {errorText: JSON.stringify(user)});
                    }

                })


            }
        });
    });

};

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// установить куки.
// опция path=/ означает доступ со всех страниц сайта.
// формат даты expires = date.setDate(date.getDate()+100000).toUTCString()
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}