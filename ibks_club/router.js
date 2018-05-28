var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	function rawBody(req, res, next) {
		var imagedata = ''
		req.setEncoding('binary')
		var chunks = [];
		req.on('data', function(chunk){
	        imagedata += chunk
	    });
	    req.on('end', function() {
	    	var time = Date.now();
	    	fs.writeFile('./gallery/' + time + '.jpg', imagedata, 'binary', function(err){
	    		if (err) throw err
	    		console.log('File saved.')
	    	});
	    	var buffer = Buffer.concat(chunks);
	    	req.bodyLength = buffer.length;
	        req.rawBody = buffer;
	        next();
	    });
	    req.on('error', function (err) {
	        console.log(err);
	        res.status(500);
	    });
	}
	
	app.get('/', function(req, res) {
		res.render('index.html');
	});
	app.get('/main', function(req, res) {
		res.render('html/main.html');
	});
	app.get('/add_photo', function(req, res) {
		res.render('html/add_photo.html');
	});
	app.post('/get_gallery_list', function(req, res) {
		var a = require('./js_server/add_photo_server').get_gallery();
		res.status(200).send({file_list: JSON.stringify(a)});
	});
	app.post('/get_registered_image_list', function(req, res) {
		var a = require('./js_server/add_photo_server').get_registered_image();
		res.status(200).send({file_list: JSON.stringify(a)});
	});
	app.post('/register_image', urlencodedParser, function(req, res) {
		var image_list = eval(req.body.image_list);
		var a = require('./js_server/add_photo_server').register_image(image_list);
		res.status(200).send();
	});
	app.post('/upload_image', rawBody, function(req, res) {
		if (req.rawBody) {
			 console.log("ok");
			 res.status(200).send({status: 'OK'});
		 } else {
			 res.status(500).send();
		 }
	});
	app.post('/select_board_list', function(req, res) {
		var res = require('./js_server/sql').get_board_list();
	});
}
