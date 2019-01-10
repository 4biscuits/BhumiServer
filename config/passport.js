/*
 * Passport middleware to authenticate users based on jwt token
*/

var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('../config/database');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});


module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload,done){
    User.findOne({id:jwt_payload.id},function(err,user){
        if (err){
          return done(err,false);
        }
        if (user){
          done(null,user);
        }else{
          done(null,false);
        }
    });
  }))
};

passport.use('user.local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
      var messages = [];
      errors.forEach(function(error) {
          messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function (err, user) {
      if (err) {
          return done(err);
      }

      if (!user) {
          return done(null, false, {message: 'No user found.'});
      }
      

      if (!user.comparePassword(password, function(err, isMatch){
        if (!isMatch && err){
          return done(err, false, {message: 'Wrong Password'});
        }
      }));

      if (req.body.type != user.type){
          return done(null, false, {message: 'Not a user.'});
      }
      return done(null, user);
  });
}));
