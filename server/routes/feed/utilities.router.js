var express			= require('express');
var router			= express.Router();
var Feeds       = require('../../models/feeds.model.js');
var Interface   = require('../../models/interfaces.model.js');
var Tenants     = require('../../models/tenants.model.js');
var Roles       = require('../../models/roles.model.js');
var Interfaces  = require('../../models/interfaces.model.js');
var jwt    			= require('jsonwebtoken');
const config		= require('../../neptune.configuration.js');

router['tenant-role-list'] = function(req, res, roles, callback) {
  let tenant  = res.locals.operator.tenant;
  let Role    = new Roles({tenant: tenant});
  Role.GetTenantRoles(function(roles) {
    if (roles)  callback(null, null, roles);
    if (!roles) callback(null, null, []);
  });
};


// router.get('/app/feed/role-options-to-select-from', function(req, res) {
//   let tenant  = res.locals.operator.tenant;
//   let Role    = new Roles({});
//   Role.TenantRolesForUserForm(tenant, function(roles) {
//     if (roles) {
//       res.json(roles);
//     } else {
//       res.json([]);
//     }
//   })
// });

module.exports = router;