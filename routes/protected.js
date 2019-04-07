var express = require('express');
var router = express.Router();
var Meetup = require('../models/Meetup');
var Orientation = require ('../models/Orientation');

router.get ('/get-meetups', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	// Todo, implement pagination
	Meetup.find({}, function (err, meetups) {
		if (err) {
			res.json ({'success':false, msg:'Unable to fetch events'});
		}
		else res.json ({'success': true, 'meetups': meetups});
	});
	
})


router.get ('/get-orientations', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	// Todo, implement pagination
	Orientation.find({}, function (err, orientations) {
		if (err) {
			res.json ({'success':false, msg:'Unable to fetch events'});
		}
		else res.json ({'success': true, 'orientations': orientations});
	});
	
})

module.exports = router;
