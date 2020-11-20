const db            = require('./dbConnection');

module.exports = {
    validate: (user, callback) => {
        var sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
        db.getResults(sql, [user.username, user.password], (results) => {
            if(results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    get_user: (user, callback) => {
        var sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
        db.getResults(sql, [user.username, user.password], (result) => {
            callback(result);
        });
    },
    getById: (id, callback) => {
        var sql = `SELECT * FROM user WHERE id = ${id}`;
        db.getResults(sql, null, (result) => {
            callback(result);
        });
    },
    insert: (user, callback) => {
        var sql = `INSERT INTO user (full_name, username, password, email, contact, address, user_roll) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        var data = [user.full_name, user.username, user.password, user.email, user.contact, user.address, user.user_roll];
        db.execute(sql, data, (status) => {
            callback(status);
        });
    }
}