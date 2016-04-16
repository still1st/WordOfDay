var express = require('express');
var router = express.Router();

router.get('/list', function (req, res) { 
    res.render('words/list', { user: req.user });
});

router.get('/add', function (req, res) { 
    res.render('words/add', { user: req.user });
});

module.exports = router;