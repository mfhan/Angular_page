var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');

router.put('/:resource/:id', function(req, res, next) {

	var resource = req.params.resource;
	var id = req.params.id;

	if (resource == 'profile'){
		Profile.findByIdAndUpdate(id, req.body, {new:true}, function(err, profile){
			if (err){
				res.json({
					confirmation:'fail',
					message:err
				});
				return;
			}

			res.json({
				confirmation:'success',
				profile:profile.summary()
			});

			return;
		});
	}
});

router.post('/:resource', function(req, res, next) {

	var resource = req.params.resource;

	if (resource == 'login'){
		var credentials = req.body;
		console.log('LOGIN = '+JSON.stringify(credentials));
		Profile.find({name:credentials.name}, function(err, profiles){
			if (err){
				res.json({
					confirmation:'fail',
					message:'Could not find profile'
				});
				return;
			}

			if (profiles.length == 0){
				res.json({
					confirmation:'fail',
					message:'Could not find profile'
				});
				return;
			}

			var profile = profiles[0];
			if (profile.password != credentials.password){
				res.json({
					confirmation:'fail',
					message:'Incorrect Password'
				});
				return;
			}

			// TODO: install cookie to track current user:
			req.session.user = profile.id;

			res.json({
				confirmation:'success',
				profile: profile.summary()
			});

			return;
		});
	}


	if (resource == 'profile'){
		Profile.create(req.body, function(err, profile){

			if (err){

				res.json({
					confirmation:'fail',
					message: err
				});
				return;
			}

			var data = {
				confirmation: 'success',
				profile: profile.summary()
			}

			req.session.user = profile.id;
			res.json(data);
			return;
		});

	}

});

router.get('/:resource', function(req, res, next) {

	var resource = req.params.resource;

	if (resource == 'logout'){
		req.session.reset();
		res.redirect('/');
		return;
	}


	if (resource == 'currentuser'){
		if (req.session == null){
			res.json({
				confirmation:'fail',
				message:'User not logged in'
			});
			return;
		}

		if (req.session.user == null){
			res.json({
				confirmation:'fail',
				message:'User not logged in'
			});

			return;
		}

		var userId = req.session.user;
		Profile.findById(userId, function(err, profile){
			if (err){
				res.json({
					confirmation:'fail',
					message:err
				});
				return;
			}

			res.json({
				confirmation:'success',
				profile:profile.summary()
			});

			return;
		});

	}


	if (resource == 'profile'){
		Profile.find(req.query, function(err, profiles){
			if (err != null){
				res.json({
					confirmation:'fail',
					message: err
				});

				return;
			}

			var list = [];
			for (var i=0; i<profiles.length; i++){
				var p = profiles[i];
				list.push(p.summary());
			}

			var data = {
				confirmation: 'success',
				profiles: list
			}

			res.json(data);
			return;

		});

	}

});

module.exports = router;
