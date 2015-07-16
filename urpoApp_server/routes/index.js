var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Serve the Tree */
router.post('/api/list', function(req, res) {
	var _p = path.join(__dirname, '..', 'node_modules', req.body.path);
		console.log(_p);
		processReq(_p, res);
});

/* Serve a Resource */
router.post('/api/resource', function(req, res) {
	res.send(fs.readFileSync(req.query.resource, 'UTF-8'));
});

function processReq(_p, res) {
	var resp = [];
	fs.readdir(_p, function(err, list) {
		for (var i = list.length - 1; i >= 0; i--) {
			resp.push(processNode(_p, list[i]));
		}
		console.log(resp);
		res.json(resp);
	});
}

function processNode(_p, f) {
	var s = fs.statSync(path.join(_p, f));
	return {
		"id": path.join(_p, f),
		"name": f,
		"rights": "drwxr-xr-x",
        "size": "4096",
        "date": "2015-04-29 09:04:24",
		"type": (s.isDirectory() ? "dir" : "file")
	};
}

module.exports = router;