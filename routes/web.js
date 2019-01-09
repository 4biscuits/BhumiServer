/*
* This route handles the login, signup and forgot password functions
*/
var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var config = require('../config/database');
var Feedback = require('../models/Feedback');







module.exports = router;