var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var history = require('../models/History.js');

/* GET history listing. */
router.get('/', function(req, res, next) {
  history.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

module.exports = router;
