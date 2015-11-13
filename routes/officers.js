/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Block = require('../models/blocks'),
    Officer = require('../models/officers');

router.get('/', (req, res) => {
    Block.getAll((err, blocks) => {
        if (err) {
            res.render("error",{
                message: err
            })
        } else {
            res.render("officers", {
                blocks: blocks
            });
        }
    });

});

router.post('/', (req, res) => {
    Officer.add(req.body, (err) => {
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