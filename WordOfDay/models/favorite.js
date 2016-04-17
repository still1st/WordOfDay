var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Favorite = new Schema({
    userId: Schema.Types.ObjectId,
    wordId: Schema.Types.ObjectId
});

module.exports = mongoose.model('favorites', Favorite);