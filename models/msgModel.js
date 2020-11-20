const db            = require('./dbConnection');

module.exports = {
	send_message: (username,message,callback) => {
        var sql = `INSERT INTO message ( username,name,receiver,subject,body) VALUES (?,?,?,?,?)`;
        db.getResults(sql, [username.uname, message.sender,message.receiver,message.subject,message.body], (results) => {
            if(results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
}