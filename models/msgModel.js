const db            = require('./dbConnection');

module.exports = {
	send_email: (username,message,callback) => {
        var sql = `INSERT INTO message ( username,name,receiver,subject,body,status,type) VALUES (?,?,?,?,?,?,?)`;
        db.getResults(sql, [username.uname, message.sender,message.receiver,message.subject,message.body,message.status,'email'], (results) => {
            if(results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },

    msgCount: (username,callback) => {
        var sql = `SELECT * FROM message WHERE receiver=? and status=? and type='message'`;
        db.getResults(sql, [username.uname,username.status], (results) => {
            if(results.length > 0) {
               
                callback(results);
            } else {
                callback(false);
            }
            /*console.log(results);*/
        });
    },
    emailCount: (username,callback) => {
        var sql = `SELECT * FROM message WHERE receiver=? and status=? and type='email'`;
        db.getResults(sql, [username.email,username.status], (results) => {
            if(results.length > 0) {
               
                callback(results);
            } else {
                callback(false);
            }
            /*console.log(results);*/
        });
    },
}