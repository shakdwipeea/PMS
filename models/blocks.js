/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;

var Block = {
    add: (block, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO block SET ?", block, (err, rows) => {
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

            conn.query("SELECT * FROM block", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Block;