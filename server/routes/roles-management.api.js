var express    = require('express');
var router     = express.Router();
var Interface  = require('./models/interfaces');
var Tenants    = require('./models/tenants');
var Roles      = require('./models/roles');
var Interfaces = require('./models/interfaces');


router.get('/api/feed/tenant-role-list', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let Role    = new Roles({});
  Role.GetTenantRoles(tenant, function(roles) {
    if (roles) {
      res.json(roles).status(200);
    }
  });
});

router.get('/api/feed/role-options-to-select-from', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let Role    = new Roles({});
  Role.TenantRolesForUserForm(tenant, function(roles) {
    if (roles) {
      res.json(roles);
    } else {
      res.json([]);
    }
  })
});

router.post('/api/secure/update-role', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let role    = req.body.role;
  let Role    = new Roles({});
  Role.UpdateRole(role, tenant, function(message) {
    res.json(message).status(message.code);
  });
});

module.exports = router;