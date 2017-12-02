var express				= require('express');
var router				= express.Router();
var jwt    				= require('jsonwebtoken');
var roles					= require('../../models/roles.model.js');

const CERT				= 'secret-word';
const EXP 				= '1h';

// All calls to the secure or api go through this router
router.all(['/app/*', '/authenticated/*'], function(req, res, next) {
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
}).get(['/authenticated/interface/:id', '/authenticated/interface/:id/*'], function(req, res, next) {
	// get the interface id and determin if the user has 
	// access to it by checking the assets array
	let id = req.params.id;
	res.locals.InterfacePermission = AssetAccessVerification(id, res.locals.operator.assets);
	if ( res.locals.InterfacePermission = 1 ) {
		next();
	} else {
		res.sendStatus(403);
	}
}).all(['/app/feed/*', '/app/action/*', '/app/search/*'], function(req, res, next) {
	// get the api url and determine if the user has 
	// access to it by checking the assets array
	let api = req.url
	if ( AssetAccessVerification(api, res.locals.operator.assets) > -1 ) {
		next();
	} else {
		next() // remove after testing
		// res.sendStatus(403);
	}
});


let AssetAccessVerification = function(asset, userPermittedAsset) {
	// the interfacepermission variable is used 
	// to store the type of access the user is allowed
	AssetPermission = -1;

	// Find inteface in list of assets
	let AssetLocator = function(Asset) {
		return Asset._id === asset
	};

	// Find the asset in the asset array
	let AssetFound = userPermittedAsset.find(AssetLocator);
  if ( AssetFound ) {
		AssetPermission = AssetFound.permission
	};

	return AssetPermission;
}

router.get('/app/token', function(req, res) {
	const OPERATOR = res.locals.operator;
	delete OPERATOR.iat;
	delete OPERATOR.exp;
	let jwtAuthenticationToken = jwt.sign(OPERATOR, CERT, { expiresIn: EXP });
	res.json({jwt: jwtAuthenticationToken, valid: true}).status(200);
});

module.exports = router;