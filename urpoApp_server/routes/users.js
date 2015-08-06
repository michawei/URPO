var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var urpo_user = require('../models/UrpoUser.js');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});*/

router.get('/', function(req, res, next) {
  urpo_user.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* 登入頁面 */
router.post('/login', function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);

    urpo_user.find({ 'username' : username }, function (err, user_query){
        if (user_query.length <= 0) {
            res.json({ error : 'This user does not exist.'});
        } else if (urpo_query.length > 1) {
            console.log('database has multiple user with username: ' + username);
            res.end();
        } else {
            var user = user_query[0];
            console.log(user);
            if(password != user.password) {
                res.json({ error: 'Incorrect password.'});
            } else {
                res.json({ success : user });
            }
        }
    });
    //console.log(user_query);
    //user_query.push(/*go look in the PM data base and set urpo_query to that*/);
});

router.post('/', function(req, res, next) {
    urpo_user.create(req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

module.exports = router;
