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
    get_all_admin: (callback) => {
        var sql = `SELECT * FROM user WHERE user_roll = 'admin'`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    get_all_buyer: (callback) => {
        var sql = `SELECT * FROM user WHERE user_roll = 'buyer'`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    get_all_seller: (callback) => {
        var sql = `SELECT * FROM user WHERE user_roll = 'seller'`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    insert: (user, callback) => {
        var sql = `INSERT INTO user (full_name, username, password, email, contact, address, user_roll) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        var data = [user.full_name, user.username, user.password, user.email, user.contact, user.address, user.user_roll];
        db.execute(sql, data, (status) => {
            callback(status);
        });
    },
    update: (user, callback) => {
        var sql = `UPDATE user SET full_name = ?, username = ?, address = ?, contact = ?, email = ? WHERE id = ?`;
        var data = [user.full_name, user.username, user.address, user.contact, user.email, user.id];
        db.execute(sql, data, (status) => {
            callback(status);
        });
        // console.log(user);
    },
    buyer_profileUpdate: (user, callback) => {
        var sql = "UPDATE user SET full_name=?,username=?,password=?,email=?,contact=?,address=? WHERE id="+user.id+"";
        var data = [user.full_name, user.username, user.password, user.email, user.contact, user.address, user.id,];
        db.execute(sql, data, (status) => {
            callback(status);
        });
    },
    resetPassword: (set, callback) => {
        var sql = `UPDATE user SET password = ? WHERE id = ?`;
        var data = [set.password, set.id];
        db.execute(sql, data, (status) => {
            callback(status);
        });
    },
    delete_category: (id, callback) => {
        var sql = `DELETE FROM category WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    }
}