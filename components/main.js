/** @jsx React.DOM */

var Main = React.createClass({
    componentDidMount: function(){
        console.log('EMITTING - my other event');
        socket.emit('my other event', { my: 'data' });
        socket.on('testing', function (data) {
            console.log(data);
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