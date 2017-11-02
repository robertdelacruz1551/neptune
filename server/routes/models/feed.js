var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

var FeedSchema = mongoose.Schema({
  key: String,
  name: String,
  tenant: String,
  data: [mongoose.Schema.Types.Mixed]
});

FeedSchema.methods.FindFeed = function(key, tenant, callback) {
  this.model('feeds').findOne(
    {
      key: key,
      tenant: { $in: [ tenant , 'neptune' ] }
    },
    'data',
    function(err, feed) {
      if(feed) {
        callback(feed.data);
      } else {
        callback([]);
      } 
    }
  );
};

module.exports = mongoose.model('feeds', FeedSchema);
