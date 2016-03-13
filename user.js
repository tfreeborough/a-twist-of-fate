var rdb = require('rethinkdbdash')();
var bcrypt = require("bcrypt-nodejs");
var Promise = require("promise");

var user = {
	register: function(userObj){
		var p = new Promise(function(resolve, reject){
			//hash the password m8
			userObj.password = bcrypt.hashSync(userObj.password);

		    rdb.db("main").table("users").insert(userObj).then(function(result){

	        	if(result.errors > 0){
	        		reject(result);
	        	} else 
	        		resolve(result);
	    	})
		})

		return p;
			
	}
}

module.exports = user;