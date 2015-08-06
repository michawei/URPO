var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/Project.js');

/* GET forms listing. */
/* 個人頁面, project頁面, Add/Edit頁面 */
router.get('/', function(req, res, next) {
  project.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

/* 個人頁面, project頁面, Add/Edit頁面 */
router.get('/:id', function(req, res, next) {
    project.findById(req.params.id, function (err, data) {
	    if (err) return next(err);
	    res.json(data);
  	});
});

/* project頁面, Add/Edit頁面 */
router.put('/:id', function(req, res, next) {
	project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* Add/Edit頁面 */
router.post('/', function(req, res, next) {
	project.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* project頁面, Add/Edit頁面 */
router.delete('/:id', function(req, res, next) {
	project.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

module.exports = router;
