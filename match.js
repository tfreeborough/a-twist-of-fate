var shortid = require('shortid');


var match = {
	queue: {},
	games: {},
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
    disconnectGame: function(io,gameId){
        delete this.games[gameId];
        console.log('DISCONNECT FIRED');
        io.of('/match').to(gameId).emit('matchError', { name: 'Your opponent has disconnected', msg: 'What sort of coward leaves in the middle of a duel? COWARD! We are really sorry but because your opponent left, that means you will need to re-queue. Our Apologies :(' });
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