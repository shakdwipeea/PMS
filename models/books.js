/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Books = {
    add: (book, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO books SET ?", book, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },

    issueBook: (book_id, prisoner_id, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("UPDATE books SET books.prisoner_id = ? WHERE books.id = ?",
                [prisoner_id, book_id ],(err, rows) => {
                conn.release();
                cb(err);
            });
        });
    },

    getBookIssuer: (book_id, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM books " +
                "INNER JOIN prisoner ON prisoner.id = books.id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Books;