var express = require('express');
var router = express.Router();
var repository = require('../services/repository');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;