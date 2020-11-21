const db            = require('./dbConnection');

module.exports = {
getAll: (callback) => {
        var sql = `Select * from seller`;
        db.getResults(sql, [], (results) => {
            if(results.length > 0) {
                callback(results);
            } else {
                callback(false);
            }
        });
    },
    getById: (id, callback) => {
        var sql = `SELECT * FROM seller WHERE user_id =?`;
        db.getResults(sql, [id.id], (result) => {
            callback(result);
        });
    },
    search: (search_item, callback) => {
        var sql = `SELECT * FROM seller WHERE id =?`;
        db.getResults(sql,[search_item.search], (results) => {
            callback(results);
        });
    },
}