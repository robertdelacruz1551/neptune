var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

let ActionsSchema = mongoose.Schema({
  name: String,
  description: String,
  tenant: String,
  api: {
    route: String,
    protocol: { type: String, default: 'POST', enum: ['POST','PUT'] }
  }
})

module.exports = mongoose.model('actions', ActionsSchema);