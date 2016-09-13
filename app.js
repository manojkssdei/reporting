var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var db           = require('./db.js');
var request      = require("request");
var http         = require("http");
var qs           = require("querystring");
var session      = require('express-session');
var passport     = require('passport');
var morgan       = require('morgan');

var app = express();
app.use(session({ secret: CONSTANT.USE_SECRET,resave: true,saveUninitialized: true })); // session secret
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: CONSTANT.BODY_PARSER_LIMIT}));
app.use(bodyParser.urlencoded({limit: CONSTANT.BODY_PARSER_LIMIT, extended: true}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('publicfolder',path.join(__dirname, 'public/'));

require('./routes/networks')(app, express);
require('./routes/report_cron')(app, express);
require('./routes/social')(app, express,passport);

//app.use('/event_setting', venues);
//app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}




// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.on('uncaughtException', function (err) { console.log(err);});
//process.on('SIGTERM', function (err) { console.log(err);});
app.listen(5504, function(req, res){
  console.log('Servers listening at port 5504');  
 
})


module.exports = app;
