/** @jsx React.DOM */

var Debug = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function(){
		return ({
			game: {}
		})
	},
	updateGame: function(data){
		console.log("updateGame", data);
		this.setState({game: data});
	},
	debugById: function(id){
		debugSocket.emit("debugById", {id: id});
	},
	componentDidMount: function(){
		debugSocket.on("gameState", this.updateGame);
		window.debug = this;
	},
	componentWillUnmount: function(){
		debugSocket.removeListener("gameState");
		window.debug = undefined;
	},
	render: function(){
		return (
			<div>
				{JSON.stringify(this.state.game, null, 2)}
			</div>
			)
	}
});
