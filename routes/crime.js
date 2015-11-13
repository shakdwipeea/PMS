/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var async = require('async');

var Crime = require('../models/crime'),
    Prisoner = require('../models/prisoner');

router.get('/', (req, res) => {
    async.parallel([
        (callback) => Crime.getAll(callback),
        (callback) => Prisoner.getNames(callback)
    ], (err, results) => {
        if (err) {
            res.render("error", {
                message: err
            });
        } else {
            console.log(results);
            res.render("crime", {
                crimes: results[0],
                prisoners: results[1]
            });
        }
    });
});

router.post('/', (req, res) => {
    var crime = {
        name: req.body.name,
        severity: req.body.severity
    };

    Crime.add(crime, (err) => {
        res.redirect('/home');
    })
});

router.post('/committed', (req, res) => {
    console.log(req.body);
    Crime.crimeCommitted(req.body.crime_id, req.body.prisoner_id, (err) => {
        if (err) {
            res.render("error", {
                message:err
            })
        } else {
            res.redirect('/home');
        }
    });
});

module.exports = router;