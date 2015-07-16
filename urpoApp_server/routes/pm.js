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

module.exports = router;
