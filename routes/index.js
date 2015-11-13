var express = require('express');
var router = express.Router();

var async = require('async');

var Jailor = require('../models/jailor'),
    Prisoner = require('../models/prisoner'),
    Items = require('../models/items');

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
            //res.json(results);
            res.render('home', {
                prisoners: results[1]
            });
        }
    });

});

router.get('/home', (req, res) => {
    Prisoner.getAll((err, prisoners) => {
        async.map(prisoners, Items.getItemOfPrisoner, (err, results) => {
           for (var i = 0; i < results.length; i++) {
               prisoners[i].items = results[i];
           }

            if (err) {
                console.log(err);
                res.render("error", {
                    message: err
                });
            } else {
                console.log("GNGN",prisoners);
                res.render("home", {
                    prisoners: prisoners
                });
            }
        });



    })
});

module.exports = router;
