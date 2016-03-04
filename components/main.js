/** @jsx React.DOM */

var Main = React.createClass({
    componentDidMount: function(){
        socket.emit('my other event', { my: 'data' });
        socket.on('testing', function (data) {
            console.log(data);
        });

        setInterval(function() {
            if (socket.connected) {
                venti.trigger('server_connection_success',{msg:'Currently connected to server, good job!'});
            }
        },500);
        socket.on('connect_error', function (data) {
            venti.trigger('server_connection_error',{msg:'Lost connection to server, is the app running?'});
        });
    },
    render: function(){
        return(
            <div className="container">
                <h1>Hello</h1>
            </div>
        )
    }
});