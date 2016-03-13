/** @jsx React.DOM */

var RegisterContent = React.createClass({
	getInitialState: function(){
        return({
            email:"",
            password: "",
            displayName: ""
        })
    },
    updateInput: function(event){
    	var id = event.target.id;
    	this.state[id] = event.target.value.replace(/[^a-zA-Z]/g,'');
    },
	// requestQueue: function(){
 //        queueSocket.removeAllListeners("queueRequestAccepted");
 //        queueSocket.removeAllListeners("queueRequestCancelAccepted");
 //        if(this.state.queueName != '') {
 //            var that = this;
 //            if(this.state.inQueue == 'false') {
 //                queueSocket.emit('requestQueue', {username: this.state.queueName});
 //                queueSocket.on('queueRequestAccepted', function (data) {
 //                    that.setState({queueText:'Leave Queue'});
 //                    that.setState({inQueue: 'true'});
 //                    that.setState({queueId: data.id.replace('/queue#','')});
 //                    that.matchFound();
 //                });
 //            }else if(this.state.inQueue == 'true'){
 //                queueSocket.emit('requestQueueCancel',{id:this.state.queueId});
 //                queueSocket.on('requestQueueCancelAccepted', function (data) {
 //                    that.setState({queueText:'Queue'});
 //                    that.setState({inQueue: 'false'});
 //                    that.setState({queueId:''});
 //                    venti.trigger('resetQueueTimer');
 //                });
 //            }
 //        }else{
 //            venti.trigger('promptForUsername');
 //        }
 //    },
    register: function(){

    },
	render: function(){
		return (
			<div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="email" id="email" className="validate" value={this.state.email} />
						<label for="email" data-error="Invalid email" data-success="">Email</label>
					</div>
				</div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="text" id="name" className="validate" min="3" max="8" value={this.state.displayName}/>
						<label for="name">Display Name</label>
					</div>
				</div>
				<div className="row">
					<div className='input-field col s6'>
						<input type="password" id="password" className="validate" min="5" max="12" value={this.state.displayName}/>
						<label for="password">Password</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
						<div onClick="" className="waves-effect waves-ligh btn">
							Register
						</div>
					</div>
				</div>
			</div>
		)
	}
})