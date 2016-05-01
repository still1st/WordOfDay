var express = require('express');
var router = express.Router();
var wordService = require('../services/wordService');

// GET words/list
router.get('/list', function (req, res) {
    wordService.findAll(function (err, words) {
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

// POST words/plus
router.get('/plus', function (req, res) {
    var wordId = req.query.wordId;
    var userId = req.user._id;

    wordService.increaseRating(wordId, userId, function (err, doc) {
        if (err) {
            throw err;
        }

        res.json(doc);
    });
});

// POST words/minus
router.get('/minus', function (req, res) {
    var wordId = req.query.wordId;
    var userId = req.user._id;

    wordService.decreaseRating(wordId, userId, function (err, doc) {
        if (err) { 
            throw err;
        }

        res.json(doc);
    });
});

module.exports = router;