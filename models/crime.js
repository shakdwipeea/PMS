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
                cb(err, rows);
            });
        });
    },

    getPrisonersOfCrime: (prisoner, cb) => {
        var prisoner_id = prisoner.id;
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT crime.name AS name, crime.severity AS severity FROM crime " +
                "INNER JOIN crime_committed AS cc ON cc.crime_id = crime.id " +
                "INNER JOIN prisoner AS p ON cc.prisoner_id = p.id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },

    getAll: (cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM crime", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Crime;