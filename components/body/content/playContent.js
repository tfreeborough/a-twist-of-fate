/** @jsx React.DOM */

var $lastUsedUsername = '';

var PlayContent = React.createClass({
    getInitialState: function(){
        return({
            inQueue:'false',
            queueId:'',
            queueName:'',
            queueConnections:0,
            queueText:'Queue',
            currentChatroom:''
        })
    },
    updateQueueName: function(event){
        this.setState({queueName:event.target.value.replace(/[^a-zA-Z]/g,'')})
        $lastUsedUsername = event.target.value.replace(/[^a-zA-Z]/g,'');
    },
    requestQueue: function(){
        queueSocket.removeAllListeners("queueRequestAccepted");
        queueSocket.removeAllListeners("queueRequestCancelAccepted");
        if(this.state.queueName != '') {
            var that = this;
            if(this.state.inQueue == 'false') {
                queueSocket.emit('requestQueue', {username: this.state.queueName});
                queueSocket.on('queueRequestAccepted', function (data) {
                    that.setState({queueText:'Leave Queue'});
                    that.setState({inQueue: 'true'});
                    that.setState({queueId: data.id.replace('/queue#','')});
                    that.matchFound();
                });
            }else if(this.state.inQueue == 'true'){
                queueSocket.emit('requestQueueCancel',{id:this.state.queueId});
                queueSocket.on('requestQueueCancelAccepted', function (data) {
                    that.setState({queueText:'Queue'});
                    that.setState({inQueue: 'false'});
                    that.setState({queueId:''});
                    venti.trigger('resetQueueTimer');
                });
            }
        }else{
            venti.trigger('promptForUsername');
        }
    },
    programmaticallyLeaveQueue: function(){
        this.setState({queueText:'Queue'});
        this.setState({inQueue: 'false'});
        this.setState({queueId:''});
    },
    fetchCurrentUsername: function(){
        venti.trigger('requestCurrentUsernameResponse',{username:this.state.queueName})
    },
    setCurrentChatroom: function(data){
       this.setState({currentChatroom:data.room});
    },
    matchFound: function(data){
        document.cookie = "match_id=MYMATCH";
        document.cookie = "player_number=1";
        queueSocket.emit('requestQueueCancel',{id:this.state.queueId});
        $('#page-content').fadeToggle(1000,function(){
            window.location.href = "/match";
        });

    },
    componentDidMount: function(){
        var that = this;

        queueSocket.on('matchFound',this.matchFound);
        queueSocket.emit('requestQueueClientCount');
        queueSocket.on('queueClientCount', function (data) {
            that.setState({queueConnections:data.connections});
        });
        if($lastUsedUsername != ''){
            this.setState({queueName:$lastUsedUsername});
        }

        /*
        Bind this event in the case that a user is currently queuing but wants to change page and leave the queue, called from <QueueLeaveModal />
         */
        venti.on('programmaticallyLeaveQueue',this.programmaticallyLeaveQueue);
        venti.on('requestCurrentUsername', this.fetchCurrentUsername);
        venti.on('setCurrentChatroom', this.setCurrentChatroom);
    },
    componentWillUnmount: function(){
        queueSocket.removeAllListeners("queueRequestAccepted");
        queueSocket.removeAllListeners('matchFound');

        venti.off('programmaticallyLeaveQueue',this.programmaticallyLeaveQueue);
        venti.off('requestCurrentUsername', this.fetchCurrentUsername);
        venti.off('setCurrentChatroom', this.setCurrentChatroom);
    },
    render: function(){
        if(this.props.connection) {
            return (
                <div>
                    <p className="flow-text">Please enter your username and then click 'Click to Queue'.</p>
                    <div className="input-field">
                        <input id="queue-name" placeholder="Enter your username here:" value={this.state.queueName} type="text" maxLength="16" length="16" onChange={this.updateQueueName}/>
                    </div>
                    <span>This is the username others will see: <strong className="displayedUsername">{this.state.queueName}</strong></span>

                    <div className="queue-button">
                        <a href="javascript:void(0)" onClick={this.requestQueue}
                           className="waves-effect waves-light btn-large purple darken-2">
                            <div className="queue-button-inner">
                                <span>{this.state.queueText}</span>
                                <i className="medium material-icons">av_timer</i>
                            </div>
                        </a>
                    </div>
                    <QueueInformation usersInQueue={this.state.queueConnections} currentlyQueuing={this.state.inQueue}/>
                    <PromptUsernameModal />
                    <ClientChatErrorModal />
                    <ClientChat />
                    <ChatBox name={this.state.queueName} chatroom={this.state.currentChatroom} />
                </div>
            )
        }else{
            return (
                <div>
                    <h3>You are currently not connected to the server...</h3>
                    <p className="flow-text">Play will become available once you regain your connection to the server.</p>
                </div>
            )
        }
    }
})