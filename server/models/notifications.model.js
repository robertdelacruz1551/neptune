var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

var UserSchema = mongoose.Schema({
  _id: String,
  fullname: String
});

var NotificationSchema = mongoose.Schema({
  tenant: String,
  recipient: [UserSchema],
  from: String,
  subject: String,
  note: String,
  created: String,
});

var NotificationsSchema = mongoose.Schema([NotificationSchema]);

NotificationsSchema.methods.getNotifications = function(tenant, recipient, callback) {
  this.model('notifications').find({tenant: tenant, recipient: recipient}, function(err, notifications) {
    if(notifications) {
      callback(notifications);
    } else if (err) {
      callback([]);
    }
  });
};

module.exports = mongoose.model('notifications', NotificationsSchema);