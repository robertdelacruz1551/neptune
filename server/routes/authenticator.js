var express				= require('express');
var router				= express.Router();
var passport 			= require('passport');
var passportLocal = require('passport-local').Strategy;
var sessions			= require('./models/sessions.js');
var tenants				= require('./models/tenants.js');
var jwt    				= require('jsonwebtoken');
var roles					= require('./models/roles.js');

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

// All calls to the secure or api go through this router
router.all(['/secure/*', '/api/*'], function(req, res, next) {
	let jwtAuthenticationToken = req.headers['authorization'];
	jwt.verify(jwtAuthenticationToken, CERT, function(err, operator) {
		if(err) {
			// if the validation failes return valid false and 401 code
			res.json({valid: false}).status(401);
		} else if(operator) {
			// if validation passes then return the operator data and
			// store locally
			res.locals.operator = operator;
			next();
		}
	});
}).get(['/secure/interface/:id', '/secure/interface/:id/*'], function(req, res, next) {
	// get the interface id and determin if the user has 
	// access to it by checking the assets array
	let id = req.params.id;
	if ( AssetAccessVerification(id, 'INTERFACE', res.locals.operator.assets) > -1 ) {
		res.locals.InterfacePermission = AssetAccessVerification(id, 'INTERFACE', res.locals.operator.assets);
		next();
	} else {
		res.sendStatus(403);
	}
}).all('/api/*', function(req, res, next) {
	// get the api url and determine if the user has 
	// access to it by checking the assets array
	let api = req.url
	if ( AssetAccessVerification(api, 'API', res.locals.operator.assets) > -1 ) {
		next();
	} else {
		res.sendStatus(403);
	}
});


let AssetAccessVerification = function(asset, assetType, userPermittedAsset) {
	// the interfacepermission variable is used 
	// to store the type of access the user is allowed
	AssetPermission = -1;

	// Find inteface in list of assets
	let AssetLocator = function(Asset) {
		return Asset._id === asset
	};

	// Find the asset in the asset array
	let AssetFound = userPermittedAsset.find(AssetLocator);
  if ( AssetFound && AssetFound.type === assetType ) {
		AssetPermission = AssetFound.permission
	};

	return AssetPermission;
}

router.get('/secure/token', function(req, res) {
	const OPERATOR = res.locals.operator;
	delete OPERATOR.iat;
	delete OPERATOR.exp;
	let jwtAuthenticationToken = jwt.sign(OPERATOR, CERT, { expiresIn: EXP });
	res.json({jwt: jwtAuthenticationToken, valid: true}).status(200);
});

module.exports = router;