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
    },
    componentDidMount: function(){
        matchSocket.emit('clientConnected',{id:this.state.match_id,player:this.state.player_id});
        matchSocket.on('matchStart',this.matchStart);
        delete_cookie('match_id');
        delete_cookie('player_id');
    },
    componentWillUnmount: function(){
        matchSocket.removeListener('matchStart',this.matchStart);
    },
    render: function(){
        if(this.state.valid) {
            return (
                <div>
                    <h1>Me: {this.state.player_name}</h1>
                    <h1>Opponent: {this.state.opponent_name}</h1>
                    <GameBoard />
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