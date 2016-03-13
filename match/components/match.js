/** @jsx React.DOM */

var Match = React.createClass({
    getInitialState: function(){
        return({
            valid:false,
            match_id:getCookie('match_id'),
            player_id:getCookie('player_id')
        });
    },
    matchStart: function(data){
        this.setState({valid:true});
    },
    componentDidMount: function(){
        delete_cookie('match_id');
        delete_cookie('player_id');
        matchSocket.emit('clientConnected',{id:this.state.match_id,player:this.state.player_id});
        matchSocket.on('matchStart',this.matchStart);
    },
    componentWillUnmount: function(){

    },
    render: function(){
        if(this.state.valid) {
            return (
                <div>
                    <h1>{this.state.match_id}</h1>
                    <GameBoard />
                    <GameChat />
                    <GameTimer />
                    <Settings />
                </div>
            )
        }else{
            return (
                <div>
                    <h1 className="faded">Waiting for opponent to connect...</h1>
                </div>
            )
        }
    }
})