/** @jsx React.DOM */

var PlayContent = React.createClass({
    getInitialState: function(){
        return({
            inQueue:'false',
            queueId:'',
            queueName:''
        })
    },
    updateQueueName: function(event){
        this.setState({queueName:event.target.value})
    },
    requestQueue: function(){
        if(this.state.queueName != '') {
            var that = this;
            queueSocket.emit('requestQueue', {username: this.state.queueName});
            queueSocket.on('queueRequestAccepted', function (data) {
                console.log('queueRequestAccepted received');
                console.log(data);
                that.setState({inQueue: 'true'});
                that.setState({queueId: data.id});
            });
        }else{
            alert('Please enter something for your username');
        }
    },
    render: function(){
        return(
            <div>
                <p className="flow-text">Please enter your name and then click 'Click to Queue'.</p>
                <input type="text" onChange={this.updateQueueName} />
                <span>Username: {this.state.queueName}</span>

                <h4>
                    <a className="purple-text darken-2" href="javascript:void(0)" onClick={this.requestQueue}>Click to Queue</a>
                </h4>

                <p className="flow-text">Connected to queue: {this.state.inQueue}</p>
                <p className="flow-text">Queue Id: {this.state.queueId}</p>

                <QueueTimer inQueue={this.state.inQueue} />
            </div>
        )
    }
})