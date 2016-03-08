/** @jsx React.DOM */

var ChatBox = React.createClass({
    getInitialState: function(){
        return({
            currentMessage:'',
            showing:false
        })
    },
    setCurrentMessage: function(event){
        this.setState({currentMessage:event.target.value});
    },
    componentDidMount: function(){
        venti.on('activateChatPanel',this.setShowing);
        venti.on('deactivateChatPanel',this.setHidden);

    },
    componentWillUnmount: function(){
        venti.off('activateChatPanel',this.setShowing);
        venti.off('deactivateChatPanel',this.setHidden);
    },
    setShowing: function() {
        this.setState({showing: true});
        $(".send-message input").keyup(this.submitMessage);
    },
    submitMessage:function(e){
        if (e.which == 13) {
            socket.emit('sendMessageEvent',{
                room:ClientChat.currentlyRequestedRoom,
                name:this.props.name,
                message:this.state.currentMessage
            })
        }
    },
    setHidden: function(){
        this.setState({showing:false});
    },
    render: function(){
        if(this.state.showing) {
            return (
                <div id="play-chat-box">
                    <div className="chatbox-active-chat">
                        <div className="send-message">
                            <input className="flow-text" data-autoresize onChange={this.setCurrentMessage} placeholder="enter your message here..."/>
                        </div>
                    </div>
                    <div className="subscribed-chats">
                    </div>
                </div>
            );
        }else{ return (<div></div>) }
    }
});