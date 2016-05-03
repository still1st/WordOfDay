var express = require('express');
var router = express.Router();
var wordService = require('../services/wordService');

// GET words/list
router.get('/list', function (req, res) {
    wordService.getAll(function (err, words) {
        if (err) {
            throw err;
        }
        
        return res.render('words/list', { user: req.user, words: words });
    });
});

// GET words/add
router.get('/add', function (req, res) {
    res.render('words/add', { user: req.user });
});

// POST words/add
router.post('/add', function (req, res) {
    wordService.save(req.body, function (err, word) {
        if (err) {
            throw err;
        }
        
        res.redirect('/words/list');
    });
});

// GET words/top
router.get('/top', function (req, res) {
    var count = 100;
    wordService.getTop(count, function (err, words) {
        if (err) {
            throw err;
        }
        
        res.render('words/top', { user: req.user, words: words });
    });
});

// GET words/plus
router.get('/plus', function (req, res) {
    var wordId = req.query.wordId;
    var userId = req.user._id;
    
    wordService.increaseRating(wordId, userId, function (err, word) {
        if (err) {
            throw err;
        }
        
        res.json(word);
    });
});

// GET words/minus
router.get('/minus', function (req, res) {
    var wordId = req.query.wordId;
    var userId = req.user._id;
    
    wordService.decreaseRating(wordId, userId, function (err, word) {
        if (err) {
            throw err;
        }
        
        res.json({ 'rating': word.rating });
    });
});

// GET words/favorite
router.get('/favorite', function (req, res) {
    var wordId = req.query.wordId;
    var userId = req.user._id;
    
    wordService.setFavorite(wordId, userId, function (err, word) {
        if (err) {
            throw err;
        }
        
        res.json({ 'favorite': word.favorites.indexOf(userId) > -1 });
    });
});

// GET words/favorite
router.get('/favorites', function (req, res) {
    var userId = req.user._id;

    wordService.getFavorites(userId, function (err, words) {
        if (err) {
            throw err;
        }

        res.render('words/favorites', { user: req.user, words: words });
    });
});

module.exports = router;