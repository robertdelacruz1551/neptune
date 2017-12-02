var express				= require('express');
var router				= express.Router();
var passport 			= require('passport');
var passportLocal = require('passport-local').Strategy;
var tenants				= require('../../models/tenants.model.js');
var roles					= require('../../models/roles.model.js');
var jwt    				= require('jsonwebtoken');

const CERT				= 'secret-word';
const EXP 				= '1h';
//================================
//Configure the passport middleware. 
//ATT! must appear after the 
//bodyParser and the cookieParser 
//middleware
//================================
router.use(passport.initialize());
router.use(passport.session());

// Passport enabled login middleware
passport.use('login', new passportLocal.Strategy({passReqToCallback: true}, function (req, username, password, done) {	
	let tenantid = encodeURIComponent(req.params.tenant);
	let Tenant   = new tenants({tenant: tenantid});
	Tenant.findTenantByTenant(function(tenant) {
		if(tenant) {
			let operator = tenant.authenticate(username, password);
			if(operator.authenticated === true) {
				// find the roles and store locally
				let Roles = new roles({});
				Roles.GetActiveUserRoles( operator.tenant, operator.username, operator.roles, function(assets) {
					operator.assets = assets;
					// Create the JSON web token and call the callback
					let jwtAuthenticationToken = jwt.sign(operator, CERT, { expiresIn: EXP });
					done(null, jwtAuthenticationToken);
				});
			}else{
				done(null,null,operator.message);
			}
		}else{
			done(null, null, "Invalid username or password"); // Tenant not found.
		}
	});
}));

//Here we're asking passport to serialize the user object's session key
passport.serializeUser(function(user, done) {
	done(null,user);
});

//Here we're asking passport to fetch user information by session key
passport.deserializeUser(function(user, done) {
	done(null,user);
});


// ================================
// Handles post request from users 
// attempting to log in
// ================================
router.post('/login/:tenant', function(req, res, next) {
	passport.authenticate('login', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			return res.json({message: info}).status(401); 
		}
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			// upon successful login return the jwt token
			return res.json({jwt: user}).status(200);
		});
	})(req, res, next);
});


module.exports = router;