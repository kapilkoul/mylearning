var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');

//Getting cf and local environment properties
var cfenv = require('cfenv');
var vcapLocal = null;
try { vcapLocal = require(__dirname+"/vcap-local.json"); } catch (e) {
    console.log("No local vcap settings found");
}
//If local properties found set
var appEnvOpts = vcapLocal ? {vcap:vcapLocal} : {};
var appEnv = cfenv.getAppEnv(appEnvOpts);
console.log(appEnv.getServices());

var mongoose = require('mongoose');
//Retrieve server certificates for verification
var fs = require('fs')
var ca = [fs.readFileSync(__dirname+"/servercert.crt")];
var options = {
    mongos: {
        ssl:true,
        sslValidate: true,
        sslCA: ca
    }
}
//Define mongoose error
var db = mongoose.connection;
db.on('error', function(err) {
    console.log("Mongoose default connection error: "+err);
});
//Define mongoose open error
db.once('open', function(err) {
    assert.equal(null, err);
    console.log("Connected to the server at: "+appEnv.getServiceCreds("Compose for MongoDB-u8").uri);
    mongoose.connection.db.listCollections().toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
    });   
});

mongoose.connect(appEnv.getServiceCreds("Compose for MongoDB-u8").uri ,options);

var index = require('./routes/index');
var users = require('./routes/users');
var accounts = require('./routes/accounts');
var transactions = require('./routes/transactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport config
app.use(passport.initialize());

//Set the public folder to be available in the application routes
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept, Authorization");
  next();
});

app.use('/', index);
app.use('/users', users);

//Add my specific routes
app.use('/accounts',accounts);
app.use('/transactions',transactions);


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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
