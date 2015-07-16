var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/Project.js');

/* GET forms listing. */
router.get('/', function(req, res, next) {
  project.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

router.get('/:id', function(req, res, next) {
    project.findById(req.params.id, function (err, data) {
	    if (err) return next(err);
	    res.json(data);
  	});
});

module.exports = router;
