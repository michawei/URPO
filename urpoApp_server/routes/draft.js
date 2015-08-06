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

/*router.get('/sample', function(req, res) {
	_data = [
		{
			Category: "IoT",
    		Dept: "Urpo",
    		Project_Name: "智慧監控",
    		Project_Description: "無",
    		//Edit_Date: { type: Date, default: Date.now },
    		Project_Owners: [{Name: "Brian", EmpID: "51001"}, {Name: "Coke", EmpID: "1991"}],
    		Region: "Taiwan",
    		Institution: "NCKU",
    		Competence: "first",
    		Principal_Investigators: [{Name: "PupuDr", Email: "a@gmail.com", Website: "agar.io"}, {Name: "Pri", Email: "c@delta.com.tw", Website: "arag.io"}],
    		Collaboration_Model: "3-4",
    		Project_Agreement_Status: "none",
    		memo: "Hello World!",
    		edit_state: [{add_or_edit: "add", edit_person: "Me", edit_column: "3"}, {add_or_edit: "edit", edit_person: "Hey", edit_column: "2, 5"}],
    		file_system: {}
		},
		{
			Category: "server",
    		Dept: "D2D",
    		Project_Name: "server",
    		Project_Description: "無",
    		//Edit_Date: { type: Date, default: Date.now },
    		Project_Owners: [{Name: "Brian", EmpID: "51001"}, {Name: "Coke", EmpID: "1991"}],
    		Region: "Taiwan",
    		Institution: "NCCU",
    		Competence: "first",
    		Principal_Investigators: [{Name: "DG", Email: "a@gmail.com", Website: "agar.io"}, {Name: "CR", Email: "c@delta.com.tw", Website: "arag.io"}],
    		Collaboration_Model: "3-4",
    		Project_Agreement_Status: "none",
    		memo: "Hello World!",
    		edit_state: [{add_or_edit: "add", edit_person: "CS", edit_column: "3"}, {add_or_edit: "edit", edit_person: "Jade", edit_column: "2, 3, 4"}],
    		file_system: {}
		}
	];
    res.json(_data);  
});*/

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
