/** @jsx React.DOM */

var Main = React.createClass({
    getInitialState: function(){
        return({
            viewing:'home'
        })
    },
    componentDidMount: function(){
        socket.emit('my other event', { my: 'data' });
        socket.on('testing', function (data) {
            console.log(data);
        });
        setInterval(function() {
            if (socket.connected) {
                venti.trigger('server_connection_success',{msg:'Currently connected to server.'});
            }
        },200);
        socket.on('connect_error', function (data) {
            venti.trigger('server_connection_error',{msg:'Your connection to the server is temporarily down, you may not play games.'});
        });
    },
    render: function(){
        return(
            <div>
                <SiteMenu activeLink={this.state.viewing} />
            </div>
        )
    }
});