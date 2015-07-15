var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var urpo_user = require('../models/UrpoUser.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    var user_query = urpo_user.find({ 'username' : username });
    user_query.push(/*go look in the PM data base and set urpo_query to that*/);
    if(user_query.length <= 0) {
    	res.json({ error : 'This user does not exist.'})
    } else if (urpo_query.length > 1) {
    	console.log('database has multiple user with username: ' + username);
    	res.end()
    } else {
    	var user = user_query[0];
    	if(password != user.password) {
    		res.json({ error: 'Incorrect password.'});
    	} else {
    		res.json({ success : user });
    	}
    }
});

module.exports = router;
