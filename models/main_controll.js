const db            = require('./dbConnection');

module.exports = {
    insert: (user, callback) => {
        var sql = `INSERT INTO user (full_name, username, password, email, contact, address, user_roll) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        var data = [user.full_name, user.username, user.password, user.email, user.contact, user.address, user.user_roll];
        db.execute(sql, data, (status) => {
            callback(status);
        });
    }
}