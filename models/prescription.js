/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
var async = require('async');

var Prescription = {
    add: (prescription, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            async.waterfall([
                (callback) => {
                    conn.query("INSERT INTO prescription SET ?", prescription, (err, rows) => {
                        callback(err, rows);
                    });
                },
                (rows, callback) => {
                    conn.query("INSERT INTO prescription_prisoner SET ?", {
                        prescription_id: rows.insertId,
                        prisoner_id: prescription.prisoner_id
                    }, (err, rows) => {
                        callback(err, rows);
                    });
                }
            ], (err, results) => {
                conn.release();
                cb(err, results);
            });


        });
    },

    getPrescriptionOfPrisoner: (prisoner_id) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM prescription_prisoner AS pp " +
                "INNER JOIN prescription ON prescription.id = pp.prescription_id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Prescription;