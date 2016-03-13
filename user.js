var rdb = require('rethinkdbdash')();
var bcrypt = require("bcrypt-nodejs");

var user = {
	register: function(userObj){
		//hash the password m8
		userObj.password = bcrypt.hashSync(userObj.password);

	    rdb.db("main").table("users").insert(userObj)
		    .then(function(result){
	        	console.log(result);
	    	})
	}
}

module.exports = user;