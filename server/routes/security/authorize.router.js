const config			= require('../../neptune.configuration.js');
let express				= require('express');
let router				= express.Router();
let jwt    				= require('jsonwebtoken');
let Roles					= require('../../models/roles.model.js');

const CERT						 = config.CERT;
const EXPIRE_IN_MINUTE = config.EXPIRE_IN_MINUTE;

let AssetAccessVerification = function(asset, userPermittedAsset) {
	// the interfacepermission variable is used 
	// to store the type of access the user is allowed
	let AssetPermission = -1;

	// Find inteface in list of assets
	let AssetLocator = function(Asset) {
		return Asset._id === asset
	};

	// Find the asset in the asset array
	let AssetFound = userPermittedAsset.find(AssetLocator);
  if ( AssetFound ) {
		AssetPermission = AssetFound.permission
	};

	return 1 // AssetPermission;
}

let JWT_CHECKPOINT = function(req, res, next) {
	let jwtAuthenticationToken = req.headers['authorization'];
	jwt.verify(jwtAuthenticationToken, CERT, function(err, operator) {
		if(err) {
			// if the validation failes return valid false and 401 code
			res.json({valid: false}).status(401);
		} else if(operator) {
			// if validation passes then return the operator data and store locally
			res.locals.operator = operator;
			res.locals.token 		= jwtAuthenticationToken;
			next();
		}
	});
};

let JWT_REFRESH = function(req, res) {
	const OPERATOR = res.locals.operator;
	delete OPERATOR.iat;
	delete OPERATOR.exp;

	let current = new Date();
	let expire  = new Date(current.getTime() + (EXPIRE_IN_MINUTE * 60000));

	let jwtAuthenticationToken = jwt.sign(OPERATOR, CERT, { expiresIn: EXPIRE_IN_MINUTE * 60 });
	res.json({jwt: jwtAuthenticationToken, valid: true, expire: expire }).status(200);
};

let INTERFACE_AUTHORIZATION = function(req, res, next) {
	let interface = req.params.interface;
	let tenant 		= res.locals.operator.tenant;
	let user 			= res.locals.operator;

	Role = new Roles({});
	Role.VerifyUserAccessToInterface(user, tenant, interface, function(permission) {
		if ( permission ) {
			res.locals.permission = permission;
			next();
		} else {
			res.sendStatus(403);
		}
	});
}

router.use(JWT_CHECKPOINT);

router.get( '/app/*');
router.get( '/token', JWT_REFRESH);

router.post('/action/:action');
router.put( '/action/:action');
router.get( '/feed/:feed');
router.get(['/authenticated/interface/:interface',
						'/authenticated/interface/:interface/:document'], INTERFACE_AUTHORIZATION);


module.exports = router;