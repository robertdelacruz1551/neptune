var express    = require('express');
var router     = express.Router();
var Interface  = require('./models/interfaces');
var Tenants    = require('./models/tenants');
var Roles      = require('./models/roles');
var Interfaces = require('./models/interfaces');

router.post('/app/action/update-role', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let role    = req.body.role;
  let Role    = new Roles({});
  Role.UpdateRole(role, tenant, function(message) {
    res.json(message).status(message.code);
  });
});


router.post('/test', function(req, res) {
  let Role    = new Roles({});
  Role.Test(function(i) {
    if(i) {
      res.send(i).status(200);
    }
  });
});

router.post('/app/action/create-role', function(req, res) {
  let tenant  = res.locals.operator.tenant;
  let role    = req.body;
  let Role    = new Roles({
    name: role.name || null,
    description: role.description || null,
    tenant: tenant
  });
  Role.save(function(err, r) {
    if (err) res.json({code: 500, message: 'Could not create the role', data: err}).status(500);
    if (r) res.json({code: 200, message: 'Role created', data: r}).status(200);
  })
})

module.exports = router;