var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Favorite = new Schema({
    userId: ObjectId,
    wordId: ObjectId
});

module.exports = mongoose.model('favorites', Favorite);