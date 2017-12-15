var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

let ActionsSchema = mongoose.Schema({
  name: String,
  description: String,
  tenant: String,
  call: String,
  protocol: { type: String, default: 'POST', enum: ['POST','PUT'] }
});

ActionsSchema.methods.FindAction = function(action, callback) {
  this.model('actions').findById(action, function(err, action) {
    if (action) callback(null, null, action);
    if (err) {
      callback(err, 'Internal server error', null);
    };
  })
};

module.exports = mongoose.model('actions', ActionsSchema);

let r = mongoose.model('actions', ActionsSchema);
let p = new r({
  name: 'Create role',
  description: 'Create tenant accessable roles',
  tenant: '598d0e04a848bf4e7f8df53d',
  call: 'create-role',
  protocol: 'POST'
});

// p.save(function(err, action) {
//   if (err) console.log(err);
//   if (action) console.log(action);
// });