/*
 * Update Schema model with its helper methods
*/
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrientationSchema = new Schema({
  city: {type: String, require: true},
  time: {type: Date, require: true}
});

module.exports = mongoose.model('Orientation', OrientationSchema);