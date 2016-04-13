var shortid = require('shortid');
var Logic = require('./match-logic'); // Import separated match logic
var deepcopy = require('deepcopy');




    /*
     @function      Game
     @param         String player1,
                    String player2,
                    String id
     @desc          Initialized a game object, this is required to create the base object that gets added to the matches object.
                    This is only used when the game is first created, we shouldn't change this really unless we start to overhaul
                    our code in a BIG way!
     */
    function Game(player1, player2, id) {
        this.player1 = player1;         //Set player1 to @param[0]
        this.player1.connected = false; //Set initial connection to false so we have to check before start
        this.player2 = player2;         //Set player1 to @param[1]
        this.player2.connected = false; //Set initial connection to false so we have to check before start
        this.id = id;                   //Set id of the game to @param[2]
        this.inProgress = false;        //Set the state of the game to not in progress, I.E. Don't trigger any match logic until game start
    }





// START OF MATCH OBJECT
var match = {
	io: undefined,
	queue: [],  //Current users who are in the queue
	games: {},  //Current games that are running





    /*
    @method     startGames
    @desc       Get top two players in the queue and match them together then update the queue
     */
	startGames: function(){
		var $player1 = this.queue[0];       //Get top player from queue
        var $player2 = this.queue[1];       //Get second player from queue

        var id = this.createGame($player1, $player2);   //Get id from createGame method which initialized a new game object

        $player1.socket.emit('matchFound', { gameId: id, player: 1 });      //emit matchFound event to player1
        $player2.socket.emit('matchFound', { gameId: id, player: 2 });      //emit matchFound event to player2
        
        //update queue size and broadcast to world
        this.queue.shift();
        this.queue.shift();

        //Broadcast to queue the updated queue count
        this.io.of('/queue').emit('queueClientCount', { connections: this.queue.length });
	},





    /*
    @method     createGame
    @param      Object player1,
                Object player2
    @return     String id
    @desc       Creates a new game object and generates a random Id that will be used for the game.
     */
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





    /*
    @method     disconnectGame
    @param      Object io,
                String gameId
    @desc       Fired from app.js when a client closes sends a disconnect, will invalidate the game by removing and
                firing a matchError event back to the remaining client. This should invalidate all existing games under
                this Id.
     */
    disconnectGame: function(io,gameId){
        delete this.games[gameId];
        console.log('DISCONNECT FIRED');
        io.of('/match').to(gameId).emit('matchError', {
            name: 'Your opponent has disconnected',
            msg:    'What sort of coward leaves in the middle of a duel? ' +
                    'COWARD! We are really sorry but because your opponent left, ' +
                    'that means you will need to re-queue. Our Apologies :('
        });
    },





    /*
    @method     sendPlayerMessage
    @param      Object game,
                Object data
    @desc       Sends a specific message to a player, must be passed the game object and the socket id of the player
                that the message will be sent, only ever sends receivePlayerMessage back to the client, only use this for
                sending messages, don't check against the message on the Front-end please :D
     */
    sendPlayerMessage: function(game, data){
        game[data.playerTo]['socket'].emit("receivePlayerMessage", data.msg);
    },





    /*
    @method     initializeGameDetails
    @param      string $gameId
    @desc       initialize all data required to get the ball rolling, such as details about first player, empty deck &
                hand information and boolean prompt to trigger deck draw method in match-logic.
     */
    initializeGameDetails: function($gameId){
        var $match = this.games[$gameId];                 //Make a copy of the current match details
        var $initializedGame = {};                       //Initialize an empty object
        $initializedGame.currentTurn = $match.player1.id; //Set the initial turn to player1
        $initializedGame.decksDrawn = false;             //Set initial deck draw to false so we force a draw

        var $initializedPlayerInfo = {};                 //Initialize an empty player Info object
        $initializedPlayerInfo.deck = {};                //Set an empty deck
        $initializedPlayerInfo.hand = {};                //Set an empty hand
        $initializedPlayerInfo.grave = {};               //Set an empty grave
        $initializedPlayerInfo.board = {};               //Set an empty board
        $initializedPlayerInfo.nexus = Logic.baseHealth; //Set nexus health from base health

        $initializedGame[$match.player1.id] = deepcopy($initializedPlayerInfo);          //Set player1 specific match info to false
        $initializedGame[$match.player2.id] = deepcopy($initializedPlayerInfo);          //Set player2 specific match info to false

        this.games[$gameId].match = $initializedGame;
    },




    checkSeeding: function($gameId){
        var $match = this.games[$gameId];
        if(!$match.decksDrawn){
            console.log('checkSeeding: SEEDING PLAYER DECKS');
            $match.match[$match.player1.id].deck = Logic.seedDeck([8,12,10],false); //Seed a deck in random assortment for each player
            $match.match[$match.player2.id].deck = Logic.seedDeck([8,12,10],false); //Seed a deck in random assortment for each player
            
            Logic.turnCardsUnique($match); //turns cards unique for both player decks
            
            $match.match[$match.player1.id].deckOrder = Object.keys($match.match[$match.player1.id].deck); //creates deck order
            $match.match[$match.player2.id].deckOrder = Object.keys($match.match[$match.player2.id].deck); //creates deck order

            Logic.shuffleDeck($match.match[$match.player1.id].deckOrder); //shuffles deck
            Logic.shuffleDeck($match.match[$match.player1.id].deckOrder); //shuffles deck

            Logic.drawCards(5, $match.match[$match.player1.id]); //draw 5 initial cards
            Logic.drawCards(5, $match.match[$match.player2.id]); //draw 5 initial cards

            $match.match.decksDrawn = true;
        }
        this.games[$gameId] = $match;
    }
};
// END OF MATCH OBJECT






module.exports = match;