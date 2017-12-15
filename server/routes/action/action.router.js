/**==================
 * Actions
 * ==================
 * The actions router will handle all request involving 
 * an action calls (button clicks mostly). The initial 
 * route will take the alias from the feed requiest and 
 * find the item in the actions collection. The object 
 * returned should contain a url pointing to the router 
 * to be executed.
 * 
 * Requirements:
 * [x] only accepts http PUT & POST
 * [x] response to action request need to be returned in a standardized json object
 * [x] the action alias/_id are of type ObjectId(). The middleware will lookup 
 *     the alias and return name of the utility.
 *     [x] tenant must have access to the action
 *     [ ] actions will not be executed angaints protected objects
 * [ ] request must be logged no matter the outcome. in other words, all 
 *     traffic to this router will need to be stored in the db, even if the 
 *     request returned data
 */
let express			      = require('express');
let router			      = express.Router();
let Actions           = require('../../models/actions.model.js');
let utilities         = require('./utilities.router.js');

// router.use(function(req, res, next) {
//   console.log('Here');
//   next();
// });

router.param('action', function(req, res, next, action) {
  let Action = new Actions({});
  console.log(action);
  Action.FindAction(action, function(err, message, action) {
    if (action) res.locals.action = action; 
    if (err) {
      res.locals.response  = {
        code: 500,
        messages: [message],
        data: null
      }
    }
    next();
  });
});


let INIT = function(req, res, next) {
  // middleware to initialize the request
  res.locals.response  = {
    code: 500,
    messages: [],
    data: null
  };
  next();
}

let ACTION = function(req, res, next) {
  let tenant  = res.locals.operator.tenant;
  let roles   = res.locals.operator.roles;
  let action  = res.locals.action;

  /**
   * Check if the action object returned is accessible to the operator by 
   * confirming that the tenant value matches the operator's or if the feed feed 
   * is a neptune feed
   *  * if not authorized then set the response code and add a failure message
   *  * else execute route function
   */
  if (!action) {
    next();
  } else if (action.tenant !== tenant && action.tenant !== 'neptune') {
    res.locals.response.code = 403;
    res.locals.response.messages.push('Not authorized');
    next();
  } else if (action) {
    /**
     * once accessibility is confirmed insure the utility exist in the utilities library
     *  * if not then set code and add failure message
     *  * else run the callback function. 
     *    Requirement:
     *      + function must accept a roles in case the action is being executed on 
     *        restricted information which require permission checks before the 
     *        action alters/creats restricted datathe data
     *      + utility function must be a callback
     *      + utility function must return error, message, data
     */
    if ( !utilities[action.call] ) {
      res.locals.response.code = 404;
      res.locals.response.messages.push('Not found');

      next();
    } else {
      /**
       * if the utility exist then call the utility 
       * and return the results via callback
       */
      let util = utilities[action.call];
      util(req, res, roles, function(code, message, data) {
        res.locals.response.code    = code || 200;
        res.locals.response.messages= message || [];
        res.locals.response.data    = data;

        next();
      });
    }
  }
};

let END = function(req, res) {
  // middleware to return the data from the feed
  res.json(res.locals.response).status(res.locals.response.code);
}
router.post('/action/:action', INIT, ACTION, END);
router.put( '/action/:action', INIT, ACTION, END);

module.exports = router;