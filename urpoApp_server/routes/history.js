var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var history = require('../models/History.js');

/* GET history listing. */
/* 個人頁面 */
router.get('/', function(req, res, next) {
	history.find(function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
});

router.get('/:id', function(req, res, next) {
    history.findById(req.params.id, function (err, data) {
	    if (err) return next(err);
	    res.json(data);
  	});
});

/* history頁面, Add/Edit頁面 */
router.put('/:id', function(req, res, next) {
	history.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* Add/Edit頁面 */
router.post('/', function(req, res, next) {
	history.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* history頁面, Add/Edit頁面 */
router.delete('/:id', function(req, res, next) {
	history.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

module.exports = router;