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
        venti.trigger('requestCurrentUsername');
    },
    checkForUsernameResponse: function(data){
        /*
        If no username has been set throw an error, else send a request to join the chat room.
         */
        if(data.username.length > 0){
            socket.emit('requestToJoinChat',{
                room:this.currentlyRequestedRoom,
                name:data.username,
                id:socket.id
            });
        }else{
            venti.trigger('promptForUsername');
        }
    },
    requestToJoinAccepted: function(data){
        /*
        If the request to join a room is accepted, load up a chat window
         */
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
    },
    componentWillUnmount: function(){
        socket.removeListener('requestChatRoomListResponse', this.chatListResponse);
        socket.removeListener('requestToJoinChatAccepted', this.requestToJoinAccepted);
        socket.removeListener('requestToJoinChatDenied', this.requestToJoinDenied);
        venti.off('requestCurrentUsernameResponse',this.checkForUsernameResponse);
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