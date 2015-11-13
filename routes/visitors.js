/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Prisoners = require('../models/prisoner'),
    Visitors = require('../models/visitors');

router.get('/', (req, res) => {
    Prisoners.getNames((err, prisoners) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.render("visitors", {
                prisoners: prisoners
            });
        }
    })
});

router.post('/', (req, res) => {
    Visitors.newVisitor(req.body, (err) => {
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