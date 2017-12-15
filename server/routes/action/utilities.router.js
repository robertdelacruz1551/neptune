let express			= require('express');
let router			= express.Router();

let Roles       = require('../../models/roles.model.js');


router['update-role'] = function(req, res, operator_role, callback) {
  let tenant  = res.locals.operator.tenant;
  let role    = req.body.role;
  let Role    = new Roles({});

  Role.UpdateRole(role, tenant, function(code, message, data) {
    callback(code, message, data)
  });
};

router['create-role'] = function(req, res, operator_role, callback) {
  console.log('Function called');
  let tenant  = res.locals.operator.tenant;
  let role    = req.body;
  let Role    = new Roles({
    name: role.name || null,
    description: role.description || null,
    tenant: tenant
  });
  Role.save(function(err, r) {
    if (err) callback(500, 'Could not create the role');
    if (r) callback(200, 'Role created', r);
  })
}

module.exports = router;