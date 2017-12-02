var express			= require('express');
var router			= express.Router();
var Links 			= require('../models/interfaces.model.js');

const Sidebar = {
	operator: {},
	links: []
}


router.get('/app/sidebar',
	// get user information
	function(req, res, next) {
		res.locals.sidebar = Sidebar;
		res.locals.sidebar.operator.name 		 = res.locals.operator.name;
		res.locals.sidebar.operator.username = res.locals.operator.username;
		res.locals.sidebar.operator.title 	 = res.locals.operator.title;
		next();
	},

	// get links
	function(res, res, next) {
		var link = new Links({});
		link.AuthorizedLinks(res.locals.operator.tenant, res.locals.operator.roles, function(err, links) {
			if(links) {
				res.locals.sidebar.links = links
			}
			next();
		});
	},

	// return the sidebar site
	function(req, res){
		let sidebar = res.locals.sidebar
		res.json(sidebar).status(200);
});

module.exports = router;