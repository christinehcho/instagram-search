var httpRequest = require('request');

var User = require('./models/User');
var config = require('./config');
var data = require('./server');

module.exports = function (req, res) {

	console.log('hi');

	var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: config.instagram.client_id,
			client_secret: config.instagram.client_secret,
			grant_type: 'authorization_code',
			redirect_uri: config.instagram.redirect_uri,
			code: req.query.code
		}
	};

	console.log(options);

	httpRequest(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var r = JSON.parse(body);
			var user = {
				id: r.user.id,
				username: r.user.username,
				full_name: r.user.full_name,
				bio: r.user.bio,
				website: r.user.website,
				profile_picture: r.user.profile_picture,
				access_token: r.access_token
			};
			console.log(user);

			data['main']['data'] = user;
				
			res.redirect('/renderProfile');

		}
	});

};