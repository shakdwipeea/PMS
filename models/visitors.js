/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;

var Visitors = {
    newVisitor: (visitor, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("INSERT INTO visitors SET ?", visitor, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },

    getVisitorsOfPrisoner: (prisoner_id, cb) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM visitors WHERE visitors.prisoner_id = ?", prisoner_id, (err, rows) => {
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

            conn.query("SELECT v.name AS visitor_name, v.date_of_visit AS date_of_visit," +
                "v.duration AS duration, p.name AS prisoner_name FROM visitors AS v INNER JOIN prisoner AS p ON p.id = v.prisoner_id", (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Visitors;