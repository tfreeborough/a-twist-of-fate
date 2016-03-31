/** @jsx React.DOM */

var LogInContent = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function(){
		return({
			email: "",
			password: ""
		})
	},
	logIn: function(){
		console.log("Log In Attempt...", this.state);

		var validated = true;

		if(validated) {
			logInSocket.emit("logIn", this.state);
		}
	},
	componentDidMount: function(){
		logInSocket.on("logInValid", function(data){
			console.info("Ya logged in ya fool");
		})

		logInSocket.on("logInFailed", function(data){
			console.info("Log in failed");
		})
	},
	componentWillUnmount: function(){
		logInSocket.removeAllListeners("logInValid");
		logInSocket.removeAllListeners("logInFailed");
	},
	render: function(){
		return (
			<div>
				<div className="row">
					<div className="input-field col s6">
						<input type="email" id="email" className="validate" valueLink={this.linkState('email')}/>
						<label for="email" data-error="Invalid email" data-success="">Email</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
						<input type="password" id="password" className="validate" valueLink={this.linkState('password')}/>
						<label for="password" data-error="" data-success="">Password</label>
					</div>
				</div>
				<div className="row">
					<div className="input-fied col s6">
						<div onClick={this.logIn} className="waves-effect waves-light btn">
							Log In
						</div>
					</div>
				</div>
			</div>
		)
	}
})