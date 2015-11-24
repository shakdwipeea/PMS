/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Block = require('../models/blocks'),
    Prisoner = require('../models/prisoner');

router.get('/', (req, res) => {
    Block.getAll((err, blocks) => {
        if (err) {
            res.render("error", {
                message: err
            });
        } else {
            res.render("prisoners", {
                blocks: blocks
            });
        }
    })
});

router.post('/', (req, res) => {
    var prisoner = req.body;
    Prisoner.add(prisoner, (err) => {
        if (err) {
            res.render("error", {
                message: err
            });
        } else {
            res.redirect("home");
        }
    });
});

module.exports = router;