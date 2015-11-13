var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Jailor = {
    getJailor: (data, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM jailor WHERE username = ? AND password = ?",
                [data.username, data.password], (err, rows) => {
                    conn.release();
                    if (rows.length == 0) {
                        cb("Not A user", rows[0]);
                    }
                    else {
                        cb(err, rows[0]);
                    }

             });
        });
    }
};

module.exports = Jailor;