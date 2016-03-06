/** @jsx React.DOM */

var PlayContent = React.createClass({
    getInitialState: function(){
        return({
            inQueue:'false',
            queueId:''
        })
    },
    requestQueue: function(){
        var that = this;
        socket.emit('requestQueue');
        socket.on('queueRequestAccepted',function(data){
            console.log('queueRequestAccepted received');
            that.setState({inQueue:'true'});
            that.setState({queueId:data.id});
        });
    },
    render: function(){
        return(
            <div>
                <p className="flow-text">Whoa, so you wanna play a game buddy?</p>
                <h4><a className="purple-text darken-2" href="javascript:void(0)" onClick={this.requestQueue}>Connect</a></h4>
                <p className="flow-text">Connected to queue: {this.state.inQueue}</p>
                <p className="flow-text">Queue Id: {this.state.queueId}</p>
            </div>
        )
    }
})