var express = require('express');
var router = express.Router();

var async = require('async');

var Jailor = require('../models/jailor'),
    Prisoner = require('../models/prisoner');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prison Management System' });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: 'Prison Management System' });
});



router.post('/login', function (req, res) {
  console.log(req.body);

    async.parallel([
        (callback) => Jailor.getJailor(req.body, callback),
        (callback) => Prisoner.getAll(callback)
    ], (err, results) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(results);
        }
    });

});

module.exports = router;
