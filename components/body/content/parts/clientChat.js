/** @jsx React.DOM */


var ClientChat = React.createClass({
    currentlyRequestedRoom:'',
    getInitialState: function(){
        return({
            roomsAvailable: {},
            lastError:''
        })
    },
    chatListResponse: function(data){
        this.setState({roomsAvailable:data.rooms});
    },
    checkForUsername: function(event){
        /*
        Triggered when a user clicks to join a room, we check to see if the current username they entered
         */
        this.currentlyRequestedRoom = event.currentTarget.getAttribute('data-name');
        /*
        Check if chatbox is showing as we will want to toggle it depending on if user is subscribed to the service
         */
        venti.trigger('isChatboxShowing');
    },
    chatboxShowingResponse: function(data){
        /*
        After a response from <ChatBox /> determine if user needs to be subscribed or if they are already subscribed and need the chat opening
         */
        if(data.showing){
            this.chatboxShowing();
        }else{
            this.chatboxNotShowing();
        }
    },
    chatboxShowing: function(){
        /*
        Triggers a bound event in <ChatBox /> to open the
         */
        venti.trigger('deactivateChatPanel');
    },
    chatboxNotShowing: function(){
        /*
        Trigger event to check if user has username and then proceed to request chat join
         */
        venti.trigger('requestCurrentUsername');
    },
    checkForUsernameResponse: function(data){
        /*
        If no username has been set throw an error, else send a request to join the chat room.

        Follows on from this.chatboxNotShowing
         */
        if(data.username.length > 0){
            socket.emit('requestToJoinChat',{
                room:this.currentlyRequestedRoom,
                name:data.username,
                id:socket.id
            });
        }else{
            /*
            Trigger promptUsernameModal
             */
            venti.trigger('promptForUsername');
        }
    },
    requestToJoinAccepted: function(data){
        /*
        If the request to join a room is accepted, load up a chat window
         */
        venti.trigger('setCurrentChatroom',{room:this.currentlyRequestedRoom});
        venti.trigger('activateChatPanel');
    },
    requestToJoinDenied: function(data){
        /*
        If the request to join is denied, throw an error modal in <ClientChatErrorModal />
         */
        this.setState({lastError:data.msg});
        venti.trigger('showClientChatError',{error:data.msg});
    },
    componentDidMount: function(){
        socket.emit('requestChatRoomList');

        socket.on('requestChatRoomListResponse', this.chatListResponse);
        socket.on('requestToJoinChatAccepted', this.requestToJoinAccepted);
        socket.on('requestToJoinChatDenied', this.requestToJoinDenied);
        venti.on('requestCurrentUsernameResponse',this.checkForUsernameResponse);
        venti.on('chatboxShowingResponse',this.chatboxShowingResponse);
    },
    componentWillUnmount: function(){
        socket.removeListener('requestChatRoomListResponse', this.chatListResponse);
        socket.removeListener('requestToJoinChatAccepted', this.requestToJoinAccepted);
        socket.removeListener('requestToJoinChatDenied', this.requestToJoinDenied);
        venti.off('requestCurrentUsernameResponse',this.checkForUsernameResponse);
        venti.off('chatboxShowingResponse',this.chatboxShowingResponse);
    },
    render: function(){
        var rooms = this.state.roomsAvailable;
        var that = this;
        return(
            <div id="client-chat">
                <div className="fixed-action-btn horizontal click-to-toggle client-chat-icon none-selectable" title="Join a chat room">
                    <a className="btn-floating btn-large transparent">
                        <i className="large material-icons">chat</i>
                    </a>
                    <ul>
                        {Object.keys(this.state.roomsAvailable).map(function(room) {
                            return (
                                <li className={rooms[room]['name'].toLowerCase()+'-room'} onClick={that.checkForUsername} data-name={rooms[room]['name'].toLowerCase()} title={rooms[room]['name']}>
                                    <a className="btn-floating purple darken-2">
                                        {rooms[room]['name']} ({rooms[room]['users'].length})
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
})