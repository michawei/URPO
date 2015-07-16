var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var filter = require('../models/FilterUse.js');

/* GET filter listing. */
/* 搜尋頁面 */
router.get('/', function(req, res, next) {
  filter.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

module.exports = router;
