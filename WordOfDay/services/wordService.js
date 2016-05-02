var Word = require('../models/word');
var moment = require('moment');

function save(data, callback) {
    var word = new Word({
        title: data.title,
        description: data.description,
        example: data.example,
        date: data.date,
    });
    
    word.save(function (err, word) {
        if (err) {
            return callback(err);
        }
        
        return callback(null, word);
    });
}

function findAll(callback) {
    Word.find({})
    .sort({ date: -1 })
    .exec(callback);
}

function findCurrentWord(callback) {
    var now = moment.utc();
    now.hour(0);
    now.minute(0);
    now.second(0);
    now.millisecond(0);
    
    Word.findOne({ date: now.toISOString() })
    .exec(callback);
}

function increaseRating(wordId, userId, callback) {
    Word.findOneAndUpdate({ _id: wordId }, {
        $inc: { rating: 1 },
        $addToSet: { voices: userId }
    }, { new: true }, callback);
}

function decreaseRating(wordId, userId, callback) {
    Word.findOneAndUpdate({ _id: wordId }, {
        $inc: { rating: -1 },
        $addToSet: { voices: userId }
    }, { new: true }, callback);
}

function getTop(count, callback) {
    Word.find()
        .sort({ rating: -1, date: -1 })
        .limit(count)
        .exec(callback);
}

function setFavorite(wordId, userId, callback) {
    Word.findById(wordId, function (err, word) {
        if (err) {
            throw err;
        }
        
        var query = { _id: wordId };
        
        // if there is already user id in the favorites collection
        // then remove it
        if (word.favorites && word.favorites.indexOf(userId) > -1) {
            Word.findOneAndUpdate(query, { $pull: { favorites: userId } }, { new: true }, callback);
        } else {
            Word.findOneAndUpdate(query, { $addToSet: { favorites: userId } }, { new: true }, callback);
        }
    });
}

module.exports = {
    save: save,
    findAll: findAll,
    findCurrentWord: findCurrentWord,
    increaseRating: increaseRating,
    decreaseRating: decreaseRating,
    getTop: getTop,
    setFavorite: setFavorite
};