var express			= require('express');
var router			= express.Router();
var Feeds       = require('../../models/feeds.model.js');
var Interface   = require('../../models/interfaces.model.js');
var Tenants     = require('../../models/tenants.model.js');
var Roles       = require('../../models/roles.model.js');
var Interfaces  = require('../../models/interfaces.model.js');

router.use(function(req, res, next) {
  res.locals.feed = { code: 403, message: null, data: [] };
  if (res.locals.authorizedRoute && res.locals.authorizedRoute === req.url) {
    res.locals.feed.code = 200;
  }
  console.log(res.locals.feed);
  next();
})

router.get('/feed/tenant-role-list', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let Role    = new Roles({tenant: tenant});
  Role.GetTenantRoles(function(roles) {
    res.locals.feed.data = roles;
    next()
  });
});

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