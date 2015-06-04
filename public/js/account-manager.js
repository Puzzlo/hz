//      account-manager

var crypto = require('crypto');
var mongoose = require('lib/mongoose.js');
var mongoDb = require('mongodb').Db;
var server = require('mongodb').Server;
var config = require('config');
var User = require('lib/users').User;

/* establish connect to database */

//var db = new  mongoDb(config.get('mongoose:dbName'), new server(config.get('mongoose:uri'), config.get('port'), {auto_reconnect: true}), {w: 1});
var db = new  mongoDb('akuraChat', new server('localhost', '27017', {auto_reconnect: true}), {w: 1});

db.open(function(e, d){
    if (e) {
        console.log('error connection: '+e);
    }	else{
        console.log('connected to database :: ' );
    }
});
var accounts = db.collection('accounts');

exports.addNewAccount = function(data, callback)
{
    //console.log('name='+data.name);
    //console.log(accounts.find());
    User.findOne({username: data.name}, function(err, result) {
        if(err) {
          console.log('error '+err);
        }
        if (result){
            console.log('есть этот персонаж');
            callback('username-taken');
        }	else{
                console.log('result = '+mongoose.connection.db.collectionNames);
                //saltAndHash(newData.pass, function(hash){
                //    newData.pass = hash;
                //    // append date stamp when record was created //
                //    newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                //    accounts.insert(newData, {safe: true}, callback);
                //});
                //console.log('name='+data.name);
                var newUser = new User({username: data.name, password: data.pass});
                newUser.save();
                console.log(newUser);
                callback();
            }
    });
};
