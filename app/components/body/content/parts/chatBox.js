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
        socket.on('clientJoinEvent',this.newClientJoined);
        socket.on('clientLeaveEvent',this.clientLeftChat);

    },
    componentWillUnmount: function(){
        venti.off('activateChatPanel',this.setShowing);
        venti.off('deactivateChatPanel',this.setHidden);
        venti.off('isChatboxShowing',this.isShowing);
        socket.removeListener('newChatMessageEvent',this.newChatMessage);
        socket.removeListener('clientJoinEvent',this.newClientJoined);
        socket.removeListener('clientLeaveEvent',this.clientLeftChat);
    },
    newChatMessage: function(data){
        /*
        Triggered when a new message is recieved to the chat room
         */
        var array = this.state.messages;
        var $now = new Date();
        data.time = pad($now.getHours(),2)+':'+pad($now.getMinutes(),2)+':'+pad($now.getSeconds(),2);
        data.type = 'message'
        array.push(data);
        this.setState({messages:array});
        console.log(this.state.messages);
        var log = $('#play-chat-box .messages ul');
        log.animate({ scrollTop: log.prop('scrollHeight')}, 10);
        if(!this.state.showing){
            venti.trigger('addUnseenMessageCounter');
        }
    },
    newClientJoined: function(data){
        var array = this.state.messages;
        data.type = 'join';
        array.push(data);
        this.setState({messages:array});
        var log = $('#play-chat-box .messages ul');
        log.animate({ scrollTop: log.prop('scrollHeight')}, 10);
        socket.emit('requestChatRoomList');
    },
    clientLeftChat: function(data){
        var array = this.state.messages;
        data.type = 'leave';
        array.push(data);
        this.setState({messages:array});
        var log = $('#play-chat-box .messages ul');
        log.animate({ scrollTop: log.prop('scrollHeight')}, 10);
        socket.emit('requestChatRoomList');
    },
    setShowing: function() {
        this.setState({showing: true});
        document.getElementById('chat-box-input').focus();
        var log = $('#play-chat-box .messages ul');
        log.animate({ scrollTop: log.prop('scrollHeight')}, 10);
        venti.trigger('clearUnseenMessageCounter');
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
    manuallyLeaveChat: function(){
        socket.emit('leaveChatEvent');
        var joinChat = new Howl({
            urls: ['/assets/sounds/front/chat-join.mp3']
        }).play();
        this.setHidden();
        socket.emit('requestChatRoomList');
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
                return (<ChatMessage name={i.name} room={i.room} message={i.msg} type={i.type} time={i.time}/>);
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
                        <div className="manual-chat-options">
                            <span onClick={this.manuallyLeaveChat}><a className="orange-text accent-4" href="javascript:void(0)">Leave Chat</a></span>
                            <span onClick={this.setHidden}><a className="orange-text accent-4" href="javascript:void(0)">Close Chat Window</a></span>
                        </div>
                    </div>
                    <div className="subscribed-chats">
                    </div>
                </div>
            );
        }else{ return (<div></div>) }
    }
});