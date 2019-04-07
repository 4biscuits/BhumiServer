var express = require('express');
var Meetup = require ('../models/Meetup');
var Orientation = require ('../models/Orientation');
var router = express.Router();

router.post ('/add-orientation', function (err, res) {
	if (err) {
    res.json ({'success': false, msg: 'Some error, contact us'});
    return;
	}
	let orientation = new Orientation({
		city: req.body.city,
		time: req.body.time
	})
	orientation.save (function (err, res) {
		if (err) {
			res.json ({'success': false, msg: 'Unable to add orientation'});
		}
		else res.json ({'success': true, msg: 'Added orientation'});
	})
});

router.post ('/update-orientation', function (err, res) {
	if (err) {
		res.json ({'success': false, msg: 'Some error, contact us'});
	}
	let orientation = new Orientation({
		city: req.body.city,
		time: req.body.time
	})
	Orientation.findByIdAndUpdate (req.body.id, orientation, function (err, res) {
		if (err) {
			res.json ({'success': false, msg: 'Unable to update the orientation'});
		}
		else res.json ({'success': true, msg: 'updated the orientation'});
	})
})

router.post ('/delete-orientation', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	Meetup.findByIdAndRemove (req.body.id, function (err, res) {
		if (err) {
			res.json ({'success': false, msg: 'Unable to delete the orientation'});
		}
		else res.json ({'success': true, msg: 'Deleted the orientation'});
	})
})


router.post ('/add-event', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	let meetup = new Meetup({
		name: req.body.name,
		contact: req.body.contact,
		city: req.body.city,
		info: req.body.info,
		imageUrl: req.body.imageUrl,
		time: req.body.time
	});
	meetup.save (function (err, res) {
		if (err) res.json({'success':false, msg:'Unable to save the meetup'});
		else res.json ({'success':true, 'msg': 'Successfully created an event'});
	})
})

router.post ('/update-event', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	let meetup = new Meetup({
		name: req.body.name,
		contact: req.body.contact,
		city: req.body.city,
		info: req.body.info,
		imageUrl: req.body.imageUrl,
		time: req.body.time
	});
	meetup.save (function (err, res) {
		if (err) res.json({'success':false, msg:'Unable to save the meetup'});
		else res.json ({'success':true, 'msg': 'Successfully created an event'});
	})
})

router.post ('/delete-meetup', function (err, res) {
	if (err) {
		res.json ({'success':false, msg:'Some error, contact us'});
	}
	Meetup.findByIdAndRemove (req.body.id, function (err, res) {
		if (err) {
			res.json ({'success': false, msg: 'Unable to delete the meetup'});
		}
		else res.json ({'success': true, msg: 'Deleted the meetup'});
	})
})


module.exports = router;
