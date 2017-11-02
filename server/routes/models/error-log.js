var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

var ErrorSchema = mongoose.Schema({
  tenant: String,
  user: String,
  api: String,
  position: String,
  details: { type: String, default: null },
  created: { type: Date, default: Date.now }
});

ErrorSchema.post('init', function(doc) {
  console.log(doc);
});

module.exports = mongoose.model('errors', ErrorSchema);