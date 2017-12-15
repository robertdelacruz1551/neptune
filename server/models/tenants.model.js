var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

var exp = function() {
	var now = new Date();
	return now.setDate(now.getDate() + 30);
};

var UsersSchema = mongoose.Schema({
	_id: String,
	title: String,
	password: String,
	name: String,
	fname: String,
	mname: { type: String, default: null },
	lname: String,
	email: String,
	department: String,
	created: { type: Date, default: Date.now },
	expiration: {type: Date, default: exp},
	failed: {type: Number, default: 0, min: 0, max: 3},
	status: { type: String, enum: ['Active', 'Suspended', 'Locked', 'Terminated'], default: 'Active' },
	roles: [{ type: mongoose.Schema.Types.ObjectId }]
	//home: {type:String, default: '/authenticated/home'},
});

var ContactSchema = mongoose.Schema({
	name: String,
	title: String,
	mobile: String,
	telephone: String,
	email: String
});

var AddressSchema = mongoose.Schema({
	street1: String,
	street2: {type: String, default: null},
	city: String,
	state: String,
	postal: String	
});

// var RoleSchema = mongoose.Schema({
// 	_id: { type: String, default: mongoose.Schema.Types.ObjectId.toString },
// 	name: String,
// 	description: String,
// 	created: { type: Date, default: Date.new },
// 	status: { type: String, enum: ['Active', 'Inactive', 'Suspended'] }
// });

var TenantSchema = mongoose.Schema({
	tenant: String,
	name: String,
	headquarter: AddressSchema,
	address: [AddressSchema],
	contacts: [ContactSchema],
	// roles: [RoleSchema],
	departments: [ { name: String,
									 description: String } ],
	users: [UsersSchema]
});

TenantSchema.methods.findTenantById = function(callback) {
	this.model('tenants').findOne({_id: this._id}, function(err,tenant) {
			callback(tenant);
	});
};

TenantSchema.methods.findTenantByTenant = function(callback) {
	this.model('tenants').findOne({tenant: this.tenant}, function(err,tenant) {
		callback(tenant);
	});
};

TenantSchema.methods.authenticate = function(username, password) {
	let auth = {};
	
	let user = this.users.id(username);
	if(user) {
		if(user.status != 'Active' || user.failed === 3) {
			auth.message = 'User Account ' + user.status;
		} else if(user.password !== password) {
			user.failed ++;
			if(user.failed === 3) {
				user.status = 'Locked';
			};
			this.save();
			auth.message = 'Invalid username or password';
		}else if(user.password === password) {
			if(user.expiration <= new Date()) {
				auth.message = 'Password expired';
			}else{
				if(user.failed > 0) {
					user.failed = 0;
					this.save();
				}
				auth.authenticated 	= true;
				auth.username				= username;
				auth.name						= user.name;
				auth.roles					= user.roles;
				auth.tenant 				= this.tenant;
				auth.title					= user.title;
			}
		}
		return auth;
	}else{
		auth.message = 'Invalid username or password';
		return auth;
	}
};

TenantSchema.methods.TenantUsers = function() {
	let Users = this.users;
	if (Users) {
		Users.forEach(function(user) {
			user.password 	= undefined;
		});
		return Users;
	} else {
		return [];
	};
};

TenantSchema.methods.Name = function(fname, lname, mname = null) {
	if (mname) {
		return fname + ' ' + mname + '. ' + lname;
	} else { 
		return fname + ' ' + lname;
	}
};

TenantSchema.methods.UpdateRole = function(user, role, action) {
	let User = this.users.id(user);
	if (User) {
		if (action == 1  && User.roles.indexOf(role) === -1) User.roles.push(role);
		if (action == 0) {
			let index = User.roles.indexOf(role);
			if (index != -1) {
				User.roles.splice(index, 1);
				this.UpdateRole(user, role, 0);
			};
		}
	}
	this.save()
};

TenantSchema.methods.UpdateUser = function(user, roles) {
	if (roles.indexOf('tenant-user-manager:edit-user') !== -1) {
		let User = this.users.id(user._id);
		if (User) {
			// update the user object with the new data
			User.title 		= user.title;
			User.name 		= this.Name(user.fname, user.lname, user.mname);
			User.email 		= user.email;
			User.fname 		= user.fname;
			User.mname 		= user.mname;
			User.lname 		= user.lname;

			// updates the status
			User.status 	= user.status;

			this.save();
			
			// update Roles
			// if (User.roles.length !== user.roles.length || User.roles.every((role) => user.roles.indexOf(role) === -1)) {
			// 	this.UpdateRole(user._id, user.roles, roles);
			// }
		}
	}
};

TenantSchema.methods.ResetUserPassword = function(user, roles) {
	if (roles.indexOf('tenant-user-manager:password-reset')!== -1) {
		let User = this.users.id(user);
		if (User) {
			User.password 	= 'test2';
			User.expiration = exp();
			this.save();
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

module.exports = mongoose.model('tenants', TenantSchema);