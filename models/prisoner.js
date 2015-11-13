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

            conn.query("SELECT * FROM prisoner AS p " +
                "INNER JOIN block AS b ON p.block_id = b.id " +
                "INNER JOIN crime_committed AS c ON c.prisoner_id = p.id " +
                "INNER JOIN crime ON crime.id = c.crime_id " +
                "INNER JOIN items AS i ON i.prisoner_id = p.id " +
                "INNER JOIN books ON books.prisoner_id = p.id " +
                "INNER JOIN prescription_prisoner AS pp ON pp.prisoner_id = p.id " +
                "INNER JOIN prescription AS pres ON pres.id = pp.prescription_id ",
                (err, rows) => {
                conn.release();
                    cb(err, rows);
            });
        });
    }
};

module .exports = Prisoner;