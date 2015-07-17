var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var draft = require('../models/Draft.js');

/* GET draft listing. */

/* 個人頁面 */
router.get('/', function(req, res, next) {
  draft.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

/* 個人頁面 */
router.get('/:id', function(req, res, next) {
    draft.findById(req.params.id, function (err, data) {
	    if (err) return next(err);
	    res.json(data);
  	});
});

/* Add/Edit頁面 */
router.post('/', function(req, res, next) {
	draft.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* Add/Edit頁面 */
router.put('/:id', function(req, res, next) {
	draft.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* Add/Edit頁面 */
router.delete('/:id', function(req, res, next) {
	draft.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

module.exports = router;
