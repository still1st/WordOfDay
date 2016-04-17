var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = new Schema({
    title: String,
    description: String,
    example: String,
    date: Date,
    rating: { type: Number, default: 0 },
    voices: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('words', Word);