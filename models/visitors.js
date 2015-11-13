/**
 * Created by akash on 13/11/15.
 */
var pool = require('../lib/pool').pool;

var Visitors = {
    newVisitor: (visitor) => {
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

    getVisitorsOfPrisoner: (prisoner_id) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM visitors WHERE visitors.prisoner_id = ?", prisoner_id, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Visitors;