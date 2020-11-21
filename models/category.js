const db            = require('./dbConnection');

module.exports = {
    addCategory: (name, callback) => {
        var sql = `INSERT INTO category (category_name) VALUES (?)`;

        db.execute(sql, [name.category_name], (status) => {
            callback(status);
        });
    },
    getCategories: (callback) => {
        var sql = `SELECT * FROM category`;

        db.getResults(sql, null, (results) => {
            callback(results);
        });
    }
}