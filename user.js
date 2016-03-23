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
	},
	logIn: function(userObj){
		var p = new Promise(function(resolve, reject){
			//userObj.password = bcrypt.hashSync(userObj.password);

			rdb.db("main").table("users").get(userObj.email).then(function(result){
				//if passwords match
				if(bcrypt.compareSync(userObj.password, result.password)){
					resolve(true);
				} else {
					reject(false);
				}
			})
		})

		return p;
	},
	//always returns message to return to client
	handleError: function(result){
        //handle if duplicate key
        if(result.errors > 0 && result.first_error.includes("Duplicate primary key")){
            console.error("User.handleError: duplicate email");

            return "This email is already taken.";
        }
	}
}

module.exports = user;