/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Crime = {
    add: (crime, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO crime SET ?",crime, (err, rows) => {
                conn.release();
                cb(err);
            });
        });
    },

    crimeCommitted: (crime_id, prisoner_id, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO crime_committed SET ?", {
                crime_id: crime_id,
                prisoner_id: prisoner_id
            }, (err, rows) => {
                conn.release();
            });
        });
    },

    getPrisonersOfCrime: (crime_id) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM crime " +
                "INNER JOIN crime_committed AS cc ON cc.crime_id = crime.id" +
                "INNER JOIN prisoner AS p ON cc.prisoner_id = p.id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Crime;