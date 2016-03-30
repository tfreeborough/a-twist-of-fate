/** @jsx React.DOM */

var MenuItem = React.createClass({
    getInitialState: function(){
        return({
            currentlyQueuing:'false'
        })
    },
    changeActivePage: function(){
        if(this.state.currentlyQueuing == 'false') {
            socket.emit('leaveChatEvent');
            venti.trigger('changePage', {page: this.props.name.toLowerCase(), originalName: this.props.name});
        }else{
            venti.trigger('changePageError',{page:this.props.name});
        }
    },
    setUserQueuing: function(data){
        this.setState({currentlyQueuing:data.queuing});
    },
    componentDidMount: function(){
        venti.on('userInQueue',this.setUserQueuing);
    },
    componentWillUnmount: function(){
        venti.off('userInQueue',this.setUserQueuing);
    },
    render: function(){
        if(this.props.active == this.props.name.toLowerCase()){
            return(
                <li onClick={this.changeActivePage} >
                    <a className="active" href="javascript:void(0)">{this.props.name}</a>
                </li>
            );
        }else{
            return(
                <li onClick={this.changeActivePage}>
                    <a href="javascript:void(0)">{this.props.name}</a>
                </li>
            );
        }

    }
})