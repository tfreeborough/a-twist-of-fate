var shortid = require('shortid');

var match = {
	io: undefined,
	queue: [],
	games: {},
	startGames: function(){
		var $player1 = this.queue[0];
        var $player2 = this.queue[1];
        var id = this.createGame($player1, $player2);
        $player1.socket.emit('matchFound', { gameId: id, player: 1 });
        $player2.socket.emit('matchFound', { gameId: id, player: 2 });
        
        //update queue size and broadcast to world
        this.queue.shift();
        this.queue.shift();

        this.io.of('/queue').emit('queueClientCount', { connections: this.queue.length });
	},
	createGame: function(player1, player2){
		//generate unique gameid
		var id = shortid.generate();

		player1.gameId = id;
		player2.gameId = id;

		//create match object
		var $new_match = new Game(player1, player2, id);

		//add to global games objects mapped with the unique id
		this.games[id] = $new_match;

		return id;
	},
	sendPlayerMessage: function(game, data){
		game[data.playerTo]['socket'].emit("receivePlayerMessage", data.msg);
	}
}

function Game(player1, player2, id) {
    this.player1 = player1;
    this.player1.connected = false;
    this.player2 = player2;
    this.player2.connected = false;
    this.id = id;
    this.inProgress = false;
}

module.exports = match;