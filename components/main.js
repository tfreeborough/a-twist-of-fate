/** @jsx React.DOM */

var Main = React.createClass({
    changePage: function(data){
        this.setState({viewing:data.page});
        this.setState({currentPage:data.originalName});
    },
    updateConnectionStatus: function(data){
        this.setState({connectionToServer:data.connection})
    },
    getInitialState: function(){
        return({
            viewing:'home',
            currentPage:'Home',
            connectionToServer:false
        })
    },
    componentDidMount: function(){
        socket.emit('my other event', { my: 'data' });
        socket.on('testing', function (data) {
            console.log(data);
        });


        /*
        Every 1s check connection to server and update status
         */
        setInterval(function() {
            if (socket.connected) {
                venti.trigger('server_connection_success',{msg:'Currently connected to server.'});
            }
        },1000);

        /*
        On connection error, update connectionStatus component
         */
        socket.on('connect_error', function (data) {
            venti.trigger('server_connection_error',{msg:'Your connection to the server is temporarily down, you may not play games.'});
        });

        /*
        Change active page from menuItem component Click
         */
        venti.on('changePage',this.changePage);
        /*
        Receive connection info from connectionStatus component
         */
        venti.on('send_connection_to_main',this.updateConnectionStatus);
    },
    componentWillUnmount: function(){
        venti.off('changePage',this.changePage);
        venti.off('send_connection_to_main',this.updateConnectionStatus);
    },
    render: function(){
        return(
            <div>
                <SiteMenu activeLink={this.state.viewing} connection={this.state.connectionToServer}/>
                <PageContent page={this.state.currentPage} connection={this.state.connectionToServer} />
            </div>
        )
    }
});