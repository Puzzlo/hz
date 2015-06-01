//      registration
var mongoose = require('lib/mongoose.js');


exports.post = function (req, res) {
    //var name = req.body.regUser,
    //    pass = req.body.regPass;
    console.log('name=' + JSON.stringify(req.body));
    res(200);
};