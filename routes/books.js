/**
 * Created by akash on 13/11/15.
 */
var express = require('express');
var router = express.Router();

var Books = require('../models/books');

router.get('/:book_id', (req, res) => {
    var prisonerId = req.param(book_id);
    Books.getBookIssuer(book_id, (err, issuer) => {
        res.json(issuer);
    });
});

router.post('/', (req, res) => {
    var book = {
        author_name: req.body.author_name,
        name: req.body.name,
        prisoner_id: null
    };
    Books.add(book, (err) => {
        res.json(err);
    });
});

router.post('/issue', (req, res) => {
    var prisonerId = req.body.prisoner_id;
    var bookId = req.body.book_id;

    Books.issueBook(bookId, prisonerId, (err) => {
        res.json(err);
    })
});

module.exports = router;