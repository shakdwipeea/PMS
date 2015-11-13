/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Prisoner = require('../models/prisoner'),
    Prescription = require('../models/prescription');

router.get('/', (req, res) => {
    Prisoner.getNames((err, prisoners) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.render("prescription", {
                prisoners: prisoners
            });
        }
    })
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