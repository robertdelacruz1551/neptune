var express			= require('express');
var router			= express.Router();
var Tenants     = require('./models/tenants');

router.get('/api/feed/tenant-users-list', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let Tenant  = new Tenants({ tenant: tenant });
  Tenant.findTenantByTenant(function(tenant) {
    if (tenant) {
      let users = tenant.TenantUsers();
      res.json(users).status(200);
    }
  });
});



// update user object
router.put('/api/secure/tenant/user/update', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let roles   = res.locals.operator.roles;
  let user    = req.body;
  let Tenant  = new Tenants({ tenant: tenant });
  Tenant.findTenantByTenant(function(tenant) {
    if(tenant) {
      let result = tenant.UpdateUser(user, roles);
      res.json({}).status(200);
    }
  });
});

// unlock user account
router.post('/api/secure/admin/password-reset/user/:id', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let roles   = res.locals.operator.roles;
  let user    = req.params.id;

  let Tenant  = new Tenants({ tenant: tenant });
  Tenant.findTenantByTenant(function(tenant) {
    if(tenant) {
      let result = tenant.ResetUserPassword(user, roles);
      res.json({ text: result, code: result }).status(200);
    }
  });
});

module.exports = router; 