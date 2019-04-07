/*
 * Event Schema model with its helper methods
*/
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
	name: { type: String, require: true},
	contact: {type: Number, require: true},
	city: {type: String, require: true},
	info: {type: String, require: true},
	imageUrl: {type: String, require: true},
	time: {type: Date, require: true}
});

module.exports = mongoose.model('Meetup', EventSchema);