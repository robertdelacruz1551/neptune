var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

let FeedsSchema = mongoose.Schema({
  name: String,
  description: String,
  tenant: String,
  route: String
});

FeedsSchema.methods.FindFeed = function(feed, callback) {
  this.model('feeds').findById(feed, function(err, feed) {
    if (feed) {
      callback(feed);
    } else {
      callback({});
      if (err) console.log(err);
    }
  })
};

module.exports = mongoose.model('feeds', FeedsSchema);

let r = mongoose.model('feeds', FeedsSchema);
let p = new r({
  name: 'List of roles',
  description: 'Returns a list of roles to be displayed in the in the Roles form',
  tenant: '598d0e04a848bf4e7f8df53d',
  route: 'feed/tenant-role-list'
});

// p.save(function(err, feed) {
//   if (err) console.log(err);
//   if (feed) console.log(feed);
// });