/** @jsx React.DOM */

var ChatBox = React.createClass({
    getInitialState: function(){
        return({
            currentMessage:'',
            showing:false,
            messages:[]
        })
    },
    setCurrentMessage: function(event){
        this.setState({currentMessage:event.target.value});
    },
    componentDidMount: function(){
        venti.on('activateChatPanel',this.setShowing);
        venti.on('deactivateChatPanel',this.setHidden);
        venti.on('isChatboxShowing',this.isShowing);
        socket.on('newChatMessageEvent',this.newChatMessage);

    },
    componentWillUnmount: function(){
        venti.off('activateChatPanel',this.setShowing);
        venti.off('deactivateChatPanel',this.setHidden);
        venti.off('isChatboxShowing',this.isShowing);
        socket.removeListener('newChatMessageEvent',this.newChatMessage);
    },
    newChatMessage: function(data){
        /*
        Triggered when a new message is recieved to the chat room
         */
        var array = this.state.messages;
        var $now = new Date();
        data.time = pad($now.getHours(),2)+':'+pad($now.getMinutes(),2)+':'+pad($now.getSeconds(),2);
        array.push(data);
        this.setState({messages:array});
        console.log(this.state.messages);
        var log = $('#play-chat-box .messages ul');
        log.animate({ scrollTop: log.prop('scrollHeight')}, 10);

    },
    setShowing: function() {
        this.setState({showing: true});
        document.getElementById('chat-box-input').focus();
    },
    submitMessage:function(e){
        if (e.which == 13) {
            e.currentTarget.value = '';
            socket.emit('sendMessageEvent',{
                room:this.props.chatroom,
                name:this.props.name,
                message:this.state.currentMessage
            });
        }
    },
    isShowing: function(){
        venti.trigger('chatboxShowingResponse',{showing:this.state.showing});
    },
    setHidden: function(){
        this.setState({showing:false});
    },
    render: function(){
        if(this.state.showing) {
            var messages = this.state.messages.map(function (i) {
                return (<ChatMessage name={i.name} message={i.msg} time={i.time}/>);
            });
            return (
                <div id="play-chat-box">
                    <div className="chatbox-active-chat">
                        <div className="messages">
                            <ul>
                                {messages}
                            </ul>
                        </div>
                        <div className="send-message">
                            <input id="chat-box-input" className="flow-text" data-autoresize onKeyPress={this.submitMessage} onChange={this.setCurrentMessage} placeholder="enter your message here..."/>
                        </div>
                    </div>
                    <div className="subscribed-chats">
                    </div>
                </div>
            );
        }else{ return (<div></div>) }
    }
});