const db        = require('./dbConnection');

module.exports = {
    update: (user, callback) => {
        var sql = 'UPDATE user SET full_name = ?, username = ?, email = ?, contact = ?, address = ? WHERE id = ?';
        var data = [user.full_name, user.username, user.email, user.contact, user.address, user.id];

        // console.log(user);
        db.execute(sql, data, (status) => {
            callback(status);
        });
    }
}