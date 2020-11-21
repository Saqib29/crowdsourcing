const db            = require('./dbConnection');

module.exports = {
    post_work: (post,callback) => {
        var sql = `INSERT INTO post_table ( buyer_id,buyer_name,title,status,post_body,amount) VALUES (?,?,?,?,?,?)`;
        db.getResults(sql, [post.id, post.name,post.title,post.status,post.post_body,post.amount], (results) => {
            if(results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    getAll: (user_id,callback) => {
        var sql = `Select * from post_table WHERE buyer_id=?`;
        db.getResults(sql, [user_id.id], (results) => {
            if(results.length > 0) {
                callback(results);
            } else {
                callback(false);
            }
        });
    },

}