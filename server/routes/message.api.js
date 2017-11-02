var express			= require('express');
var router			= express.Router();
var messages    = require('./models/messages');

router.get('/secure/messages', function(req, res) {
  if(res.locals.operator) {
    var tenant = res.locals.operator.tenant;
    var recipient = res.locals.operator.username;

    var Messages = new messages();
    Messages.getMessages(tenant, recipient, function(usermessages) {
      if(usermessages) {
        res.json(usermessages).status(200);
      }
    })
  }
});

module.exports = router;