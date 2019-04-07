/*
 * Update Schema model with its helper methods
*/
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FeedbackSchema = new Schema({
  title: {type: String, require: true},
  info : {type: String, require: true},
  type: {type: String, require: true}
});

module.exports = mongoose.model('Notification',FeedbackSchema);