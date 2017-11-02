var express			= require('express');
var router			= express.Router();
var Feed        = require('./models/feed');

// this route will handle feed request 
// for static data sitting in the feeds 
// collection
// router.post('/api/secure/feed',
//   function(req, res) {
//     // console.log(req.body);
//     if(req.body._id) {
//       let tenant = res.locals.operator.tenant;
//       let key     = req.body._id;
//       let feed   = new Feed({});
//       feed.FindFeed(key, tenant, function(datafeed) {
//         res.json(datafeed).status(200);
//       });
//     } else {
//       res.json([]).status(200);
//     }
//   }
// );

module.exports = router;