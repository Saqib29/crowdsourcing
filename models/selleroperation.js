const db        = require('./dbConnection');

module.exports = {
    update: (user, callback) => {
        var sql = 'UPDATE user SET full_name = ?, username = ?, email = ?, contact = ?, address = ? WHERE id = ?';
        var data = [user.full_name, user.username, user.email, user.contact, user.address, user.id];

        // console.log(user);
        db.execute(sql, data, (status) => {
            callback(status);
        });
    },
    get_all_posts: (callback) => {
        var sql = `SELECT * FROM post_table`;

        db.getResults(sql, null, (results) => {
            callback(results)
        });
    },
    get_recieved_messages: (username, callback) => {
        var sql = `SELECT * FROM message WHERE receiver = ? AND type = 'message'`;
        // console.log(username);
        db.getResults(sql, [username], (results) => {
            callback(results);
        });
    },
    get_sent_messages: (username, callback) => {
        var sql = `SELECT * FROM message WHERE username = ? AND type = 'message'`;
        db.getResults(sql, [username], (results) => {
            callback(results);
        });
    },
    get_history: (id, callback) => {
        var sql = `SELECT * FROM seller WHERE user_id = ?`;

        db.getResults(sql, [id], (results) => {
            callback(results);
        });
    },
    get_accounts: (id, callback) => {
        var sql = `SELECT * FROM account WHERE user_id = ?`;

        db.getResults(sql, [id], (result) => {
            callback(result);
        });
    }
}