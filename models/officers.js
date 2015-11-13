/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
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
    },

    getAll: (cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT o.name AS name, b.name AS block FROM officers AS o INNER JOIN block AS b ON o.block_id = b.id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Officers;