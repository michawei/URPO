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

router.get('/sample', function(req, res) {
	_data = {
		Category: ["Lo", "B", "C", "D"], 
		Dept: ["URPO", "LED", "Life Science", "F"], 
		Region: ["Taiwan", "USA", "Japan", "China"], 
		Institution: ["NCKU", "NTU", "NCTU"],
		Collaboration_Model: ["2 Targeted Research - Funding Support"],
		Project_Agreement_Status: ["A", "B", "c", "D", "e", "F"], 
		Project_Owners: ["Andy", "Ben", "Brian", "jimmy", "Alice", "Folder"], 
		Principal_Investigators: ["Peter", "Jerry", "Ken", "AD", "Eillfd", "Fred"]
	};
    res.json(_data);  
});

router.put('/data:id', function(req, res, next) {
	console.log(req.body);

	//拿到ID
	var tmp = req.params.id.substring(1, req.params.id.length);

	// Data = {
	// 	Category: ["GIS", "TALA"], 
	// 	Dept: ["URPO", "LED", "Life Science", "F"], 
	// 	Region: ["Taiwan", "USA", "Japan", "China"], 
	// 	Institution: ["NCKU", "NTU", "NCTU"], 
	// 	Project_Agreement_Status: ["A", "B", "c", "D", "e", "F"], 
	// 	Project_Owners: ["Andy", "Ben", "Brian", "jimmy", "Alice", "Folder"], 
	// 	Principal_Investigators: ["Peter", "Jerry", "Ken", "AD", "Eillfd", "Fred"]
	// };

	filter.findByIdAndUpdate(tmp, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	})
});

/* 搜尋頁面的filter部分
router.post('/data:id', function(req, res, next) {
	console.log(req.body);
	
	//拿到ID
	var tmp = req.params.id.substring(1, req.params.id.length);
	
	//拿到key
	var Key = Object.keys(req.body);
	console.log(Key);

	//把從前端拿到的資料加進filter
	var newFilter = [];
	filter.find(function(err, data) {
		console.log(data);
		if (err) return next(err);
		for (var i = 0; i < Key.length; i++) {
			newFilter[i] = req.body[Key[i]];
			//console.log(newFilter[i]);
			if (newFilter[i]) data[0][Key[i]].push(newFilter[i]);
			//console.log(data[0][Key[i]]);
		}
		console.log("After");
		//目前更新不了
		filter.findByIdAndUpdate(tmp, data, function(err, post) {
			if (err) return next(err);
			console.log(data);
			res.json(post);
		})
	});

	// filter.findByIdAndUpdate(tmp, newData, function(err, post) {
	// 	if (err) return next(err);
	// 	res.json(post);
	// })
});*/

module.exports = router;
