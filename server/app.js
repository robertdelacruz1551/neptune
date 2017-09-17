// ================================
// Declaration and server configurations
// ================================
var express 		= require('express');
var cors				= require('cors');
var app 				= express();
var path 				= require('path');
var logger 			= require('morgan');
var session 		= require('express-session');
var cookieParser= require('cookie-parser');
var bodyParser 	= require('body-parser');
var flash 			= require('connect-flash');
var jwt    			= require('jsonwebtoken');

// ================================
// Port declaration
// ================================ 
var port 			= process.env.PORT || 1337;
app.listen(port, function() {	
	console.log('Starting Neptune Application Servers...');
	console.log('Neptune is running!');
	console.log('http://127.0.0.1:' + port + '/');
});	

// ================================
// General configurations
// ================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// app.use(session({ secret: process.env.SESSION_SECRET || 'anystringoftext'
// 				, cookie: { maxAge: 600000 } // Time in ms
// 				, rolling: true // will update the expiration date everytime an http request is called
// 				, resave: true
// 				, saveUninitialized: true}));
app.use(flash());

// ================================
// Configure view engine
// ================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ================================
// Configure routes 
// ================================
var authenticator	= require('./routes/authenticator.js');
var sidebar 			= require('./routes/sidebar.api.js');
var messages 			= require('./routes/message.api.js');
var notifications	= require('./routes/notification.api.js');
var interface			= require('./routes/interface.api.js');
var feeds					= require('./routes/feed.api.js');

// ================================
// CORS whitelist
// ================================
var whitelist = [
	'http://localhost:4200', 
	'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'
];
var corsOptions = {
  origin: function(origin, callback){
		var isWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(authenticator);
app.use(sidebar);
app.use(messages);
app.use(notifications);
app.use(interface); 
app.use(feeds);

// ================================
// Error handling for the application
// ================================
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
 
// ================================
// Development error handler
// will print stack trace
// ================================
if(app.get('env') === 'dev') {
	app.use(function(req, res, next) {
		req.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
};