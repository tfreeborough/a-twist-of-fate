/** @jsx React.DOM */

var ConnectionStatus = React.createClass({
    getInitialState: function(){
        return ({
            connected:false,
            status:'Not Available',
            connectionMsg:'A connection has yet to be initialted with the server.'
        })
    },
    componentDidMount: function(){
        venti.on('server_connection_error',this.connectionLost);
        venti.on('server_connection_success',this.connectionCreated);
    },
    componentWillUnmount: function(){
        venti.off('server_connection_error',this.connectionLost);
        venti.off('server_connection_success',this.connectionCreated);
    },
    connectionCreated: function(data){
        this.setState({connected:true});
        this.setState({status:'Connected'});
        this.setState({connectionMsg:data.msg});
    },
    connectionLost: function(data){
        this.setState({connected:false});
        this.setState({status:'Not Connected'});
        this.setState({connectionMsg:data.msg});
    },
    render: function(){
        var color = 'green';
        if(!this.state.connected){
            if(this.state.status == 'Not Available'){
                color = 'yellow';
            }else{
                color = 'red';
            }
        }
        return(
            <div>
                <h2>Connection Status: <span className={color}>{this.state.status}</span></h2>
                <p>{this.state.connectionMsg}</p>
            </div>
        )
    }
})
