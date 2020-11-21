const db            = require('./dbConnection');

module.exports = {
	send_message: (username,message,callback) => {
        var sql = `INSERT INTO post_table ( username,name,receiver,subject,body) VALUES (?,?,?,?,?)`;
        db.getResults(sql, [username.uname, message.sender,message.receiver,message.subject,message.body], (results) => {
            if(results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    msgCount: (username,callback) => {
        var sql = `SELECT * FROM message WHERE receiver=?`;
        db.getResults(sql, [username.uname], (results) => {
            if(results.length > 0) {
               
                callback(results);
            } else {
                callback(false);
            }
            /*console.log(results);*/
        });
    },
}