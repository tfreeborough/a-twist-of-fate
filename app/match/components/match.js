/** @jsx React.DOM */

var Match = React.createClass({
    getInitialState: function(){
        return({
            valid:false,
            match_id:getCookie('match_id'),
            player_id:getCookie('player_id'),
            player_name:'',
            opponent_name:''
        });
    },
    matchStart: function(data){
        this.setState({valid:true});
        if(this.state.player_id == '1'){
            this.setState({player_name:data.player1});
            this.setState({opponent_name:data.player2});
        }else if(this.state.player_id == '2'){
            this.setState({player_name:data.player2});
            this.setState({opponent_name:data.player1});
        }

        var matchMusic = new Howl({
            urls: ['/assets/sounds/match/match-music-1.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onplay: function() {
                var matchPlay = new Howl({
                    urls: ['/assets/sounds/match/play.mp3'],
                    volume: 0.5
                }).play();
            }
        });
    },
    componentDidMount: function(){
        matchSocket.emit('clientConnected',{id:this.state.match_id,player:this.state.player_id});
        matchSocket.on('matchStart',this.matchStart);
        matchSocket.on("exampleRoomEvent", function(data){
            console.log("exampleRoomEvent", data);
        });

        delete_cookie('match_id');
        delete_cookie('player_id');

        //for example sake's delete this later
        var that = this;
        setInterval(function(){
            matchSocket.emit("exampleRoomEvent", {gameId:that.state.match_id, player: that.state.player_id});
        }, 3000);
    },
    componentWillUnmount: function(){

        matchSocket.removeListener('matchStart',this.matchStart);
        matchSocket.removeListener("exampleRoomEvent");        
    },
    render: function(){
        if(this.state.valid) {
            return (
                <div>
                    <GameBoard playerName={this.state.player_name} opponentName={this.state.opponent_name} />
                    <GameChat />
                    <GameTimer />
                    <Settings />
                    <MatchErrorModal />
                </div>
            )
        }else if(typeof getCookie('match_id') !== 'undefined'){
            return (
                <div>
                    <h1 className="faded">Waiting for opponent to connect...</h1>
                    <MatchErrorModal />
                </div>
            )
        }else{
            window.location.href = '/';
        }
    }
})