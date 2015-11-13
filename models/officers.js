/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pol').pool;
var mysql = require('mysql');

var Officers = {
    add: (officer, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO officers SET ?", officer, (err, rows) => {
                conn.release();
                cb(err);
            });
        });
    },

    getOfficerOfBlock: (block_id, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM officers WHERE block_id = ?", block_id, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Officers;