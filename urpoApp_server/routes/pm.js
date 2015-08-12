var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pm = require('../models/ProjectManager.js');

/* GET pm listing. */
router.get('/', function(req, res, next) {
	pm.find(function (err, data) {
		if (err) return next(err);
		res.json(data);
	});  
});

/* GET /header/:name 某個name的服務 */
router.get('/:name', function(req, res, next) {
	pm.find({ 'name': req.params.name }, function (err, data) {
		if (err) return next(err);
		res.json(data[0]);
	});
});

/*router.get('/:id', function(req, res, next) {
	pm.findById(req.params.id, function (err, data) {
	    if (err) return next(err);
	    res.json(data);
  	});  
/

/* Add/Edit頁面 */
router.post('/', function(req, res, next) {
	pm.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

router.put('/:id', function(req, res, next) {
	pm.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

router.delete('/:id', function(req, res, next) {
	pm.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

module.exports = router;
