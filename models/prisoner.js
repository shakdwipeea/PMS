/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Prisoner = {
    getAll : (cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }
            /**
             * SELECT * FROM prisoner AS p left JOIN block AS b ON p.block_id = b.id left JOIN crime_committed AS c ON c.prisoner_id = p.id left JOIN crime ON crime.id = c.crime_id left JOIN items AS i ON i.prisoner_id = p.id left JOIN books ON books.prisoner_id = p.id left JOIN prescription_prisoner AS pp ON pp.prisoner_id = p.id left JOIN prescription AS pres ON pres.id = pp.prescription_id
             */

            conn.query("SELECT p.id AS id, p.name AS name, p.date_of_joining AS date_of_joining, " +
                "p.date_of_release AS date_of_release, b.name AS block_name, " +
                "crime.name AS crime_name, " +
                "crime.severity AS crime_severity FROM prisoner AS p " +
                "LEFT JOIN block AS b ON p.block_id = b.id " +
                "LEFT JOIN crime_committed AS c ON c.prisoner_id = p.id " +
                "LEFT JOIN crime ON crime.id = c.crime_id ",
                (err, rows) => {
                conn.release();
                    cb(err, rows);
            });
        });
    },

    add: (prisoner, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO prisoner SET ?", prisoner, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },

    getNames: (cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT id, name FROM prisoner", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module .exports = Prisoner;