/** @jsx React.DOM */

var PlayContent = React.createClass({
    getInitialState: function(){
        return({
            inQueue:'false',
            queueId:'',
            queueName:'',
            queueConnections:0
        })
    },
    updateQueueName: function(event){
        this.setState({queueName:event.target.value.replace(/[^a-zA-Z]/g,'')})
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
    componentDidMount: function(){
        var that = this;
        queueSocket.on('queueClientCount', function (data) {
            console.log(data);
            that.setState({queueConnections:data.connections});
        });
    },
    render: function(){
        return(
            <div>
                <p className="flow-text">Please enter your name and then click 'Click to Queue'.</p>
                <input type="text" onChange={this.updateQueueName} />
                <span>This is the username others will see: {this.state.queueName}</span>
                <div className="queue-button">
                    <a href="javascript:void(0)" onClick={this.requestQueue} className="waves-effect waves-light btn-large purple darken-2">
                        <div className="queue-button-inner">
                            <span>Queue</span>
                            <i className="medium material-icons">av_timer</i>
                        </div>
                    </a>
                </div>

                <p className="flow-text">Users in queue: {this.state.queueConnections}</p>
                <p className="flow-text">Queue Id: {this.state.queueId}</p>

                <QueueTimer inQueue={this.state.inQueue} />
            </div>
        )
    }
})