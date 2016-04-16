var config = require('../config.json');
var mongoose = require('mongoose');

var connect = function () {
    mongoose.connect(config.database.connection);
    
    var db = mongoose.connection;
    db.on('error', function (err) {
        console.error(err);
    });
    db.once('open', function () {
        console.log('connected to ' + db.name + ' database on ' + db.host);
    });
}

module.exports = {
    connect: connect
};

