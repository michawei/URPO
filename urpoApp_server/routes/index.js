var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var colors = require('colors');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/list', function(req, res) {
	var _p = path.join(__dirname, '..', 'node_modules', req.body.path);
	processReq(_p, res);
});

router.post('/api/mv', function(req, res) {
	/*
		{ "params": {
			"mode": "copy",
			"path": "/public_html/index.php",
			"newPath": "/public_html/index-copy.php"
		}}
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.body.params.path);
	var new_p = path.join(__dirname, '..', 'node_modules', req.body.params.newPath);
	fs.renameSync(_p, new_p);
	res.json({ "result": { "success": true, "error": null } });  // assume successful !!!!!
});

router.post('/api/cp', function(req, res) {
	/*
		{ "params": {
			"mode": "copy",
			"path": "/public_html/index.php",
			"newPath": "/public_html/index-copy.php"
		}}
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.body.params.path);
	var new_p = path.join(__dirname, '..', 'node_modules', req.body.params.newPath);
	fs.createReadStream(_p).pipe(fs.createWriteStream(new_p));
	res.json({ "result": { "success": true, "error": null } });  // assume successful !!!!!

});

router.post('/api/rm', function(req, res) {
	/*
		{ "params": {
			"mode": "delete",
			"path": "/public_html/index.php",
		}}
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.body.params.path);
	if(fs.statSync(_p).isDirectory())
		deleteFolderRecursive(_p);
	else
		fs.unlinkSync(_p);
	
	res.json({ "result": { "success": true, "error": null } });  // assume successful !!!!!

});

router.post('/api/mkdir', function(req, res) {
	/*
		{ "params": {
			"mode": "addfolder",
			"name": "new-folder",
			"path": "/public_html"
		}}
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.body.params.path, req.body.params.name);
	if (!fs.existsSync(_p)){
		fs.mkdirSync(_p);
		res.json({ "result": { "success": true, "error": null } });  // assume successful !!!!!
	}
});

router.post('/api/getContent', function(req, res) {
	/*
		{ "params": {
			"mode": "editfile",
			"path": "/public_html/index.php"
		}}
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.body.params.path);
	fs.readFile(_p, 'utf8', function read(err, data) {
		if (err) {
			throw err;
		}
		res.json({ "result": data });  // assume successful !!!!!
	});
});

router.get('/api/download', function(req, res) {
	/*
		get?mode=download&preview=true&path=/public_html/image.jpg
	*/
	var _p = path.join(__dirname, '..', 'node_modules', req.query.path);
	console.log(_p);
	res.sendFile(_p);

});

router.post('/api/resource', function(req, res) {
	res.send(fs.readFileSync(req.query.resource, 'UTF-8'));
});

function processReq(_p, res) {
	var resp = [];
	fs.readdir(_p, function(err, list) {
		for (var i = list.length - 1; i >= 0; i--) {
			resp.push(processNode(_p, list[i]));
		}
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

function deleteFolderRecursive(path) {
	var files = [];
	if( fs.existsSync(path) ) {
		files = fs.readdirSync(path);
		files.forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}



module.exports = router;