var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var draft = require('../models/Draft.js');

/* GET draft listing. */
router.get('/', function(req, res, next) {
  draft.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

module.exports = router;
