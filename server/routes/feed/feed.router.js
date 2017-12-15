/**==================
 * Feeds
 * ==================
 * the feeds router will handle all feed request 
 * once authorized through the authorize route.
 * 
 *  *** = if applicable
 * 
 * Requirements:
 * [x] only accept http GET
 * [x] feed response are return to the client in a standardized json object
 * [x] the feed alias/_id are of type ObjectId(). The middleware will lookup 
 *     the alias and return a static array or name of the utility.
 *     [x] tenant must have access to the feed
 *     [ ] feed must sanitize the array element based on the users roles ***
 * [ ] request must be logged no matter the outcome. in other words, all 
 *     traffic to this router will need to be stored in the db, even if the 
 *     request returned data
 */

// Declare
let express			      = require('express');
let router			      = express.Router();
let url               = require('url');
let Feeds             = require('../../models/feeds.model.js');
let utilities         = require('./utilities.router.js');



router.param('feed', function(req, res, next, feed) {
  let Feed = new Feeds({});
  Feed.FindFeed(feed, function(feed) {
    if (feed) res.locals.feed = feed;
    next();
  });
});

let setResponseContext = function(code, message, data) {
  res.locals.response.data    = data || [];
  res.locals.response.code    = code || res.locals.response.code;
  if (typeof message === 'string') {
    res.locals.response.message.push(message);
  } else if (message) {
    res.locals.response.message = [].concat(message, res.locals.response.message);
  };
};

router.get('/feed/:feed/', function(req, res, next) {
  // middleware to initialize the request
  res.locals.response = {
    code: 500,
    messages: [],
    records: 0,
    data: []
  };

  next();
}, function(req, res, next) {
  let tenant  = res.locals.operator.tenant;
  let roles   = res.locals.operator.roles;
  let feed    = res.locals.feed;

  /**
   * Check if the feed object returned is accessible to the operator by 
   * asserting the tenant value matches the operator's or if the feed feed 
   * is a neptune feed
   * 
   *  * if not authorized then set the response code and add a failure message
   *  * else execute route function
   */
  if (!feed) {
    next();
  } else if (feed.tenant !== tenant && feed.tenant !== 'neptune') {
    res.locals.response.code = 403;
    res.locals.response.messages.push('Not authorized');
    next();
  } else if (feed) {
    /**
     * once accessibility is confirmed insure the route exist in the utilities library
     *  * if not then set code and add failure message
     *  * else run the callback function. 
     *    Requirement:
     *      + function must accept a roles in case the feed contains 
     *        restricted information which require permission checks before 
     *        the data can be return
     *      + utility function must be a callback
     *      + utility function must return error, message, data
     */
    if ( !utilities[feed.route] ) {
      res.locals.response.code = 404;
      res.locals.response.messages.push('Not found');

      next();
    } else {
      /**
       * if the utility exist then call the utility 
       * and return the results via callback
       */
      let util = utilities[feed.route];
      util(req, res, roles, function(code, message, data) {
        res.locals.response.code    = code || 200;
        res.locals.response.messages= message || [];
        res.locals.response.records = data.length;
        res.locals.response.data    = data;

        next();
      });
    }
  }
}, function(req, res) {
  // middleware to return the data from the feed
  res.json(res.locals.response).status(res.locals.response.code);
});

module.exports = router;
