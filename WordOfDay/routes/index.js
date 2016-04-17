var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var wordService = require('../services/wordService');

router.get('/', function (req, res) {
    wordService.findCurrentWord(function (err, word) {
        if (err) {
            throw err
        }

        res.render('index', { user: req.user, word: word });
    });
});

router.get('/register', function (req, res) { 
    res.render('register', {});
});

router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var account = new Account({ username: username });

    Account.register(account, password, function (err, account) {
        if (err) {
            return res.render('register', { error: err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function (req, res) { 
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;