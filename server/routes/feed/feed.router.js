var express			= require('express');
var router			= express.Router();
var Feeds       = require('../../models/feeds.model.js');

/**==================
 * Feeds
 * ==================
 * the feeds router will handle all feed request 
 * once authorized through the authorize route.
 * 
 * The router will find the feed in the feed collection 
 * and return the route url to call
 */
router.get('/app/feed/:feed', function(req, res, next) {
  let feed    = req.params.feed;
  let tenant  = res.locals.operator.tenant;

  let Feed = new Feeds({});
  Feed.FindFeed(feed, function(feed) {
    if (feed) {
      if (feed.tenant !== 'nuptune' && feed.tenant !== tenant) {
        res.json({code: 403, message: 'Not authorized', data: null}).status(403);
      } else {
        // if the feed is authorized then proceed to the route
        res.locals.authorizedRoute = feed.route;
        res.redirect(res.locals.authorizedRoute);
      }
    } else {
      res.json({code: 404, message: 'Not found', data: null}).status(403);
    }
  });
});


/**
 * Application routes
 */
router.use(require('./neptune-feed.router.js'));

module.exports = router;
