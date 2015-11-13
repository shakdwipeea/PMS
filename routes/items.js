/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Prisoners = require('../models/prisoner'),
    Items = require('../models/items');

router.get('/', (req, res) => {
    Prisoners.getNames((err, prisoners) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.render("items",{
                prisoners: prisoners
            });
        }
    });
});

router.post('/', (req, res) => {
    Items.add(req.body, (err, rows) => {
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