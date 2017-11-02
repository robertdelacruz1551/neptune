var express			  = require('express');
var router			  = express.Router();
var notifications = require('./models/notifications');

router.get('/secure/notifications', function(req, res) {
  if(res.locals.operator) {
    var tenant = res.locals.operator.tenant;
    var recipient = res.locals.operator.username;

    var Notifications = new notifications();
    Notifications.getNotifications(tenant, recipient, function(usernotifications) {
      if(usernotifications) {
        res.json(usernotifications).status(200);
      }
    })
  } else {
    res.status(403);
  }
});

module.exports = router;