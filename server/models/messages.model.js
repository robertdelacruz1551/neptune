var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

var UserSchema = mongoose.Schema({
  _id: String,
  fullname: String
});

var MessageSchema = mongoose.Schema({
  tenant: String,
  recipient: [UserSchema],
  sender: UserSchema,
  subject: String,
  sent: {type: Date, default: Date.now},
  read: Date,
  body: String
});

var MessagesSchema = mongoose.Schema([MessageSchema]);

MessagesSchema.methods.getMessages = function(tenant, recipient, callback) {
  this.model('messages').find({tenant: tenant, recipient: recipient}, function(err, messages) {
    if(messages) {
      callback(messages);
    }
  });
};

module.exports = mongoose.model('messages', MessagesSchema);