/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var async = require('async');

var Prisoner = require('../models/prisoner'),
    Prescription = require('../models/prescription');

router.get('/', (req, res) => {
    async.parallel([
        (callback) => Prescription.getAll(callback),
        (callback) => Prisoner.getAll(callback)
    ], (err, results) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.render("prescription", {
                prisoners: results[1],
                prescriptions: results[0]
            });
        }
    });

});

router.post('/', (req, res) => {
    Prescription.add(req.body, (err) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.redirect("home");
        }
    })
});

module.exports = router;