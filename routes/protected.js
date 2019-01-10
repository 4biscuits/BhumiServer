/*
* Protected route to make a post request to the 
* google form based upon the obtained user details
*/
var express = require('express');
var router = express.Router();

router.get('/refer/:referer/:email', function(req, res) {
  var smtpTransport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });

  // Create the mail contents
  var mailOptions = {
    to: req.params.email,
    from: req.params.referer,
    subject: 'Bhumi RTE App Password Reset',
    text: 'Hello, \n\n'+' Join bhumi and change the world\n\n' +
      'Please click on the following link, or paste this into your browser register:\n\n' +
      'http://www.bhumi.ngo/volunteer/\n\n' +
      'If you do not want to be a part of this, please ignore this email.\n\n' + 'Thank You'
  };

  // Send the generated mail
  smtpTransport.sendMail(mailOptions, function(err) {
    // Done sending the mail
    if (err) {
      res.json({'success':false, 'msg': 'Server hangup, please try again after sometime'});
    }
    res.json({'success': true, 'msg': 'Successfully sent a referral mail to your friend'});
  });
});

module.exports = router;
