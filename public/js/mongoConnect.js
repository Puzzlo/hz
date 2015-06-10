//      mongoConnect

var mongo = require('mongodb').MongoClient;

module.exports = mongo.connect('mongodb://localhost:27017/baza1', function(err, db) {
    if (err) throw err;
});