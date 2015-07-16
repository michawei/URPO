var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var filter = require('../models/FilterUse.js');

/* GET filter listing. */
router.get('/', function(req, res, next) {
    res.render('chatroom', { title: 'Express' });
});

/* 搜尋頁面 */
router.get('/data', function(req, res, next) {
  filter.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });  
});

router.get('/sample', function(req, res, next) {
	data = {
		Category: ["A", "B", "C", "D"], 
		Dept: ["URPO", "LED", "Life Science", "F"], 
		Region: ["Taiwan", "USA", "Japan", "China"], 
		Institution: ["NCKU", "NTU", "NCTU"], 
		Project_Agreement_Status: ["A", "B", "c", "D", "e", "F"], 
		Project_Owners: ["Andy", "Ben", "Brian", "jimmy", "Alice", "Folder"], 
		Principal_Investigators: ["Peter", "Jerry", "Ken", "AD", "Eillfd", "Fred"]
	};
    res.json(data);  
});

/*router.post('/data', function(req, res, next) {
	console.log(req.body);
	
	filter.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});*/

module.exports = router;
