var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'voicedocs'
})


connection.connect(function(err) {
    if (err) {
        console.error('NO!! ' + err.stack);
        return;
    }

    console.log('connected as id: ' + connection.threadId);
});

module.exports = connection;