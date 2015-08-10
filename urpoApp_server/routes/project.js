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

/* Filter list */
router.get('/filter', function(req, res, next) {
	project.find(function (err, data) {
		if (err) return next(err);
		var filter_data = {
			'category': [],
			'dept': [],
			'region': [],
			'institution': [],
			'collaboration': [],
			'agreementStatus': [],
			'employee': [],
			'principal': []
		};
		// Use to post to Filter
		for ( var i=0 ; i < data.length ; i++){

			if ( filter_data['category'].indexOf(data[i].category) == -1 && data[i].category != "" ){
				filter_data['category'].push(data[i].category);
			}
			if ( filter_data['dept'].indexOf(data[i].dept) == -1 && data[i].dept != "" ){
				filter_data['dept'].push(data[i].dept);
			}
			if ( filter_data['region'].indexOf(data[i].region) == -1 && data[i].region != "" ){
				filter_data['region'].push(data[i].region);
			}
			if ( filter_data['institution'].indexOf(data[i].institution) == -1 && data[i].institution != "" ){
				filter_data['institution'].push(data[i].institution);
			}
			for ( var j=0 ; j < data[i].employee.length ; j++ ){
				if ( filter_data['employee'].indexOf(data[i].employee[j].name) == -1 && data[i].employee[j].name != "" ){
					filter_data['employee'].push(data[i].employee[j].name);
				}
			}
			for ( var j=0 ; j < data[i].principal.length ; j++ ){
				if ( filter_data['principal'].indexOf(data[i].principal[j].investigator) == -1 && data[i].principal[j].investigator != undefined ){
					filter_data['principal'].push(data[i].principal[j].investigator);
				}
			}
		}
		filter_data['agreementStatus'] = ["1 NDA Under Negotiation", "2 NDA Signed", "3 Project Agreement Under Negotiation", "4 Project Agreement Signed", "5 Project Agreement Pending", "6 Project Completed", "7 Others (Please use Remarks)", "8 Project Terminated"];
		filter_data['collaboration'] = ["0 Undecided", "1 On Radar Screen", "2 Targeted Research - Funding Support", "3 Targeted Research - Joint Lab", "4 Targeted Research - Corporate Lab", "5 Targeted Research - Research Center", "6 Do Things Together - Joint Development", "7 Do Things Together - Joint Venture", "8 Others (Please use Remarks)"];
		
		//console.log(filter_data);
		res.json(filter_data);
	});
});

/* employee list */
router.get('/employee', function(req, res, next) {
	project.find(function (err, data) {
		if (err) return next(err);
		
		var tmp_dict = {};
		for ( var i=0 ; i < data.length ; i++){
			for ( var j=0 ; j < data[i].employee.length ; j++ ){

				if ( !(data[i].employee[j].name in tmp_dict) ){
					tmp_dict[data[i].employee[j].name] = {'id': data[i].employee[j].id,'name': data[i].employee[j].name,'projectID': [data[i]._id]};
				} else {
					tmp_dict[data[i].employee[j].name]['projectID'].push(data[i]._id);
				}
			};
		};

		var pm_data = [];
		for ( var key in tmp_dict ){
			pm_data.push(tmp_dict[key]);
		}
		
		res.json(pm_data);
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
