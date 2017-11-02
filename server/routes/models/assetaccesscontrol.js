var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

var AssetControlSchema = mongoose.Schema({
  
});


module.exports = mongoose.model('assetaccesscontrol', AssetAccessControlSchema);
