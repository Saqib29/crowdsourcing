const db            = require('./dbConnection');

module.exports = {
    delete_admin: (id, callback) => {
        var sql = `DELETE FROM user WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    },

    delete_buyer: (id, callback) => {
        var sql = `DELETE FROM user WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    },
    delete_seller: (id, callback) => {
        var sql = `DELETE FROM user WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    }
}