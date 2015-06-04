//      registration
var mongoose = require('lib/mongoose.js');
var AM = require('public/js/account-manager');


exports.post = function (req, res) {
    var name = req.body.regUser,
        pass = req.body.regPass;
    //console.log('name=' + JSON.stringify(req.body));
    //console.log('name = ' + name + ', pass = ' + pass);
    AM.addNewAccount({name: name, pass: pass
    }, function(error) {
        if(error) res.render('error', {errorText: error});
            else res.render('/');
        }

    );

};