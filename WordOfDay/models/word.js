var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = new Schema({
    title: String,
    description: String,
    example: String,
    author: ObjectId,
    date: Date,
    rating: { type: Number, default: 0 },
    voices: [ObjectId]
});

module.exports = mongoose.model('words', Word);