//      users

var bcrypt = require('bcrypt-nodejs');

function Users(db) {

    var users = db.collection("users");
    this.addUser = function (name, pass, callback) {

        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(pass, salt);

        // Create user document
        var user = {'_id': name, 'password': password_hash};

        callback(null, user);
    }

}

module.exports.Users = Users;