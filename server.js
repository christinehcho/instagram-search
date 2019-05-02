var express = require('express');
var app = express();
const httpRequest = require('request');
var authUser = require('./authService');
var generateSearch = require('./generateSearch');

exports.main = {
	data: null
}

var config = require('./config');
app.use(express.static(__dirname + '/views'));

app.get('/', function (request, response, data) {
	console.log("hi");
	console.log(data);
	response.sendfile('./views/index.html');
});

app.get('/renderProfile', function (request, response) {
	//response.sendfile('./client/hello.html');
	response.render('./hello.ejs', {name: exports.main['data']['username']});
});


app.get('/search/:value', function(req, res) {

    var keywords = req['params']['value'];

    var photos = [];

    var options = {
		url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + exports.main['data']['access_token'],
		method: 'GET',
		form: {
			client_id: config.instagram.client_id,
			client_secret: config.instagram.client_secret,
			redirect_uri: config.instagram.redirect_uri,
		}
	};

	httpRequest(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var r = JSON.parse(body);
			
			

			var images = r['data'];
			for (i in images) {

				//console.log(images[i]);
				if (images[i]['caption'] !== null && hasOverlap(images[i]['caption']['text'], keywords, false)){
					photos.push(images[i]);
				}
				else if (images[i]['tags'] !== null && hasOverlap(images[i]['tags'], keywords, true)) {
					photos.push(images[i]);
				}
				else if (images[i]['location'] !== null && hasOverlap(images[i]['location']['name'], keywords, false)) {
					photos.push(images[i]);
				}
			}
			console.log("photos are");
			console.log(photos);
			res.render('./photos.ejs', { instagram : photos });
		}
	});

	function hasOverlap (sentence1, keyword, sentence1IsArray) {
	
	
		
		if (sentence1IsArray) {
			for (i in sentence1) {
				if (sentence1[i] === keyword) return true;
			}
		}
		else if (sentence1.includes(keyword)) return true;

		else return false;

	}
	

});


app.get('/user', function(request, response) {
	console.log(data);
	response.sendfile('./views/hello.html')
});


app.get('/auth/callback/', authUser);


app.get('/login', function (request, response) {
	response.redirect(config.instagram.auth_url);
	console.log('hieyy');
});



//app.get('/auth/callback/', authUser);


app.listen(3000);

console.log('App is running on port 3000');
