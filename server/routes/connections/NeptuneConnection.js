var Mongoose = require('mongoose').Mongoose;
var neptuneConnection = new Mongoose();

neptuneConnection.connect('mongodb://localhost/neptune', function (err) {
	if(err) {
		console.log('Error connecting to Neptune database.');
	} else {
		console.log('Connected to Neptune database.');	
	}
});

module.exports = neptuneConnection;