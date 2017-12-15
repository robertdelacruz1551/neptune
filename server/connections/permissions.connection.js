var Mongoose = require('mongoose').Mongoose;
var neptuneConnection = new Mongoose();

let database = 'permisisons';
let host		 = 'localhost'

neptuneConnection.connect('mongodb://' + host + '/' + database, function (err) {
	if(err) {
		console.log('Error connecting to ' + database + ' database.');
	} else {
		console.log('Connected to ' + database + ' database.');	
	}
});

module.exports = neptuneConnection;