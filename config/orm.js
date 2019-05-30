// Require connection
const connection = require('./connection.js');

// Connect to MySQL database
connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	};
	console.log('connected as id ' + connection.threadId);
});

// Orm
var orm = {

	// select all burgers
	selectAll: function (callback) {

		connection.query('SELECT * FROM projects', function (err, result) {
			if (err) throw err;
			callback(result);
		});

	}

};


// Export the ORM object in module.exports.
module.exports = orm;