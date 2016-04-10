var config = require('../config.json');
var mongoose = require('mongoose');
mongoose.connect(config.database.connection);

var db = mongoose.connection;
db.on('error', function (err) { 
    console.error(err);
});
db.once('open', function () { 
    console.log('connected to ' + db.name + ' database on ' + db.host);
});

module.exports = db;

