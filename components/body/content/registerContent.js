/** @jsx React.DOM */

var RegisterContent = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function(){
        return({
            email:"",
            password: "",
            name: ""
        })
    },
    register: function(){
    	console.log("Attempting to register...", this.state);

    	//do some validating
    	var validated = true; //hardcoded for now

    	if(validated){
    		registerSocket.emit("register", this.state);
    		registerSocket.on("registerComplete", function(data){
    			console.log("Registration was good", data);
    		})
    	}
    },
	render: function(){
		return (
			<div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="email" id="email" className="validate" valueLink={this.linkState('email')} />
						<label for="email" data-error="Invalid email" data-success="">Email</label>
					</div>
				</div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="text" id="name" className="validate" min="3" max="8" valueLink={this.linkState('name')}/>
						<label for="name">Display Name</label>
					</div>
				</div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="password" id="password" className="validate" min="5" max="12" valueLink={this.linkState('password')}/>
						<label for="password">Password</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
						<div onClick={this.register} className="waves-effect waves-ligh btn">
							Register
						</div>
					</div>
				</div>
			</div>
		)
	}
})