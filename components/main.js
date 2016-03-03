/** @jsx React.DOM */

var Main = React.createClass({
    componentDidMount: function(){
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
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