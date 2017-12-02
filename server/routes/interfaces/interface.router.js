var express			= require('express');
var router			= express.Router();
var Interfaces  = require('../../models/interfaces.model.js');
var Tenants     = require('../../models/tenants.model.js');
var Roles       = require('../../models/roles.model.js');

let STATUS = 404 // not found

const ListOfInterfaceUrls = [
  '/authenticated/interface/:id',
  '/authenticated/interface/:id/:record'
]

router.get(ListOfInterfaceUrls,
  function(req, res, next) {
    let id      = req.params.id;
    let tenant  = res.locals.operator.tenant;
    let roles   = res.locals.operator.roles;

    let interface = new Interfaces({});
    interface.AuthorizedInterface(tenant, roles, id, function(err, gui) {
      if (err) {
      // if there's an error then set status to 500
      // TOTO:
      //   * send to error handler
        STATUS = 500;
      } else if (gui) {
      // If gui is found then set status to 200
      // persist the gui in the interface variable
        STATUS = 200;
        res.locals.interface = gui;
      }
      next();
    });
  }
).get('/authenticated/interface/user/:user', function(req, res, next) {
    // find and return the interface. if not found/not authorized then return 403
    let Tenant = new Tenants({tenant: res.locals.operator.tenant});
    Tenant.findTenantByTenant(function(tenant) {
      if (tenant) {
        STATUS = 200;
        let User = tenant.users.id(req.params.user);
        if (User) {
          User.password = undefined;
          res.locals.interface.data = User;
        }
        next();
      } else {
        next();
      }
    });
  }// completes the router
).get('/authenticated/interface/role-edit/:role', function(req, res, next) {
    let role    = req.params.role;
    let tenant  = res.locals.operator.tenant;
    let Role = new Roles({_id: role, tenant: tenant});
    Role.FindRoleForRoleEditForm(function(role) {
      if (role) {
        STATUS = 200;
        res.locals.interface.data.role = role[0] ;
        next();
      }
    });
  }
).get(ListOfInterfaceUrls, function(req, res) {
  res.json(res.locals.interface).status(STATUS);
});;

module.exports = router;
