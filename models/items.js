/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Items = {
    add: (item) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO items SET ?", item, (err, rows) => {
                conn.release();
                cb(err);
            });
        });
    },

    getItemOfPrisoner: (prisoner_id) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM items WHERE items.prisoner_id = ?", prisoner_id, (err, rows) => {
                conn.release();
                cb(err, prisoner_id);
            });
        });
    }
};

module.exports = Items;