var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	name: {type:String},
	city: {type:String},
	password: {type:String},
	occupation: {type:String}
});

ProfileSchema.methods.summary = function() {
	var profileDetails = {
		'name':this.name,
		'city':this.city,
		'occupation':this.occupation,
		'id':this._id
	};
	
	return profileDetails;
};


module.exports = mongoose.model('ProfileSchema', ProfileSchema);