/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Block = require('../models/blocks'),
    Officer = require('../models/officers');

router.get('/', (req, res) => {

    Officer.getAll((err, officers) => {
       if (err) {
           res.render("error",{
               message: err
           })
       } else {
           res.render("block", {
               officers: officers
           });
       }
    });
});

router.post('/', (req, res) => {
    var newBlock = req.body;
    Block.add(newBlock, (err) => {
        if (err) {
            res.render("error", {
                message: err
            });
        } else {
            res.redirect("home");
        }
    })
});

module.exports = router;