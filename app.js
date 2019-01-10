var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var config = require('./config/database');
var indexRouter = require('./routes/index');
var webRouter = require('./routes/web');
var protectedRouter = require('./routes/protected');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');
var validator = require('express-validator');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var dotenv = require('dotenv');
var app = express();

var logger = require('morgan');

dotenv.load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(fileUpload());
app.use(validator());
app.use(flash());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(config.database);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', indexRouter);
app.use('/form', passport.authenticate('jwt', {session: false}), protectedRouter);
app.use('/web', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('Error 404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err;
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json(err)
});

module.exports = app;
