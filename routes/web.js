/*
* This route handles the login, signup and forgot password functions
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);


router.get('/login', function (req, res, next) {
  var messages = req.flash('error');
  res.render('login', {messages: messages, hasErrors: messages.length > 0});
});

router.get('/', function(req, res, next) {
  res.send("Hello world!");
});

router.post('/signin', passport.authenticate('user.local.signin', {
  failureRedirect: '/web/login',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
  } else {
    res.send("Login Successful");
    res.redirect('/web/');
  }
});

module.exports = router;