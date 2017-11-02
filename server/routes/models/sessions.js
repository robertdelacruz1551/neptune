var express			= require('express');
var router			= express.Router();
var mongoose		= require('../connections/NeptuneConnection.js');
//var sessionHelp	 	= require('../authenticationFunctions.js');



// =====================================================
// The sessions connection will manage all transaction 
// to the sessions collection
// =====================================================
var application = mongoose.Schema({
	_id: String,
	type: String,
	title: String, // what appears in the sub heading of the link in the sidebar
	options: {}
});

var session = mongoose.Schema({
	username: String,
	name: String,
	tenant: String,
	applications: [application],
	key: { type: String, default: '57c8b260c4d8594b1caf4507' },
	destroy: { type: Date, default: null },
	create: { type: Date, default: Date.now },
	alive: { type: Boolean, default: true }
});

session.methods.myAuthorizedApps = function() {
	var myapps = [];
	for(i = 0; i < this.applications.length; i++) {
		if(this.applications[i].type === "app") {
			myapps.push(this.applications[i]);
		}
	}
	return myapps;
};

session.methods.authorized = function(app) {
	var auth = false;
	var authApps = this.applications.id(app);
	if(authApps) {
		auth = true;
	}
	return auth;
}

session.methods.start = function() {
	this.save();
};

session.methods.findSession = function(key, callback) {
	this.model('sessions').findOne({key:key, alive:true}, function(err, sess) {
		callback(sess);
	});
}


session.methods.renew = function() {
	newkey = '57c8b260c4d8594b1caf4507'; // needs to be a generated hash
	this.key = newkey;
	this.save();
	return newkey;
};

session.methods.kill = function() {
	this.alive = false;
	this.applications = [];
	this.destroy = new Date();
	this.save();
};

module.exports = mongoose.model('sessions', session);