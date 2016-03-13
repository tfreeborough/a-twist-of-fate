
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var $queue = [];
var $chatRooms = {
    global: {
        name: "Global",
        users: []
    }
};
var $games = [];

server.listen(80);

app.use("/react",express.static(__dirname + '/react'));
app.use("/components",express.static(__dirname + '/components'));
app.use("/external_scripts",express.static(__dirname + '/external_scripts'));
app.use("/styles",express.static(__dirname + '/styles'));
app.use("/assets",express.static(__dirname + '/assets'));
app.use("/font",express.static(__dirname + '/font'));
app.use("/match",express.static(__dirname + '/match'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/match', function (req, res) {
  res.sendFile(__dirname + '/match.html');
});

var queueMatches = setInterval(startGames, 15000);

/*
Not sure where to put this, needed for padding 0's on the chat messages
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


//  Function for handling connections on the server's root namespace
//	Does not handle queuing or game connections, only chat
io.on('connection', function (socket) {
    console.log('CONNECTION MADE');

    //  Server event testing event
    socket.on('my other event', function (socket) {
        io.emit('testing', { hello: 'world' });
    });

    //  Function for handling requests for the list of chat rooms
    //  Returns a rooms object
    socket.on('requestChatRoomList', function(data) {
        socket.emit('requestChatRoomListResponse',{rooms:$chatRooms});
    });

    //	Function for handling requests to join a chat room
    //  Accepts an object with properties for room name, username and id
    socket.on('requestToJoinChat', function(data) {
        console.log('Joining Chat');

        //	Checking if room exists
        if ($chatRooms.hasOwnProperty(data.room)) {
            var userAlreadyInChat = false;
            //Check if user is already connected
            $chatRooms[data.room]['users'].forEach(function (element, index, array) {
                if(element.id == socket.id.replace('/#','')){
                    userAlreadyInChat = true;
                }
            });
            if(!userAlreadyInChat) {

                $chatRooms[data.room]['users'].push({name: data.name, id: data.id});
                socket.join(data.room);
                socket.emit('requestToJoinChatAccepted');
                //socket joins chat 'room' and returns an accepted event
                io.to(data.room).emit('clientJoinEvent', {room: data.room, name: data.name});
                //	Emit event to the room that a new user is there
                console.log($chatRooms);

            }else{
            	//	If user is connected return error
                socket.emit('requestToJoinChatDenied', {msg: 'exists'});
            }
        } else {
        	//	If room not found emit error message back to the socket
            socket.emit('requestToJoinChatDenied', {msg: 'The room you have requested does not exist.'});
        }
	});

    //	Function for handling message events sent by clients to the room
    socket.on('sendMessageEvent', function (data) {
        //	Emit the message back to other sockets
        console.log('MESSAGE SENT TO SERVER');
        var $now = new Date()
        io.sockets.in(data.room).emit('newChatMessageEvent', {
            room: data.room,
            name: data.name,
            msg: data.message,
            time: pad($now.getHours(),2)+':'+pad($now.getMinutes(),2)+':'+pad($now.getSeconds(),2)
        });
        console.log('MESSAGE SENT');
    });

	//	Function for handling requests to leave the chat room
	socket.on('leaveChatEvent', function() {
        $i = 0;
        $socketId = socket.id.replace('/#','');
        Object.keys($chatRooms).map(function(value, index) {
            $chatRooms[value]['users'].forEach(function(e,i,a){
                console.log('DISCONNECTING FROM CHAT DUE TO PAGE CHANGE');
                if(e.id == $socketId){
                    $chatRooms[value]['users'].splice(i,1);
                    socket.leave(value);
                    io.to(value).emit('clientLeaveEvent', {room: value, name: e.name});
                }
            });
        });
	});

	//	Function for handling chat disconnects
	socket.on('disconnect', function() {
		$i = 0;
        $socketId = socket.id.replace('/#','');
        Object.keys($chatRooms).map(function(value, index) {
            $chatRooms[value]['users'].forEach(function(e,i,a){
                console.log('DISCONNECTING FROM CHAT DUE TO DISCONNECTION');
                if(e.id == $socketId){
                    $chatRooms[value]['users'].splice(i,1);
                    socket.leave(value);
                    io.to(value).emit('clientLeaveEvent', {room: value, name: e.name});
                }
            });
        });
	});
});

//	Function for handling requests to enter the game's matchmaking queue
//	Queue connections must be made on the /queue namespace to separate them from the other guff
var queueConnection = io.of('/queue').on('connection', function(socket) {
	console.log('Queueing Connection made');

	//	Function for handling requests to queue
	socket.on('requestQueue', function(data) {
		$data = data.username;
    	$id = socket.id.replace('/queue#', '');
    	// Id is based on the socket ID unguessable
    	console.log("Queueing connection " + $id + ".");
    	//	Return accepted event
    	socket.emit('queueRequestAccepted', {id: $id, name: $data});
    	$queue.push({id: $id, name: $data, socket: socket});
    	socket.broadcast.emit('queueClientCount', {connections: $queue.length});
    	io.of('/queue').emit('queueClientCount', {connections: $queue.length});
    	//	Pass the current people in queue to the socket and broadcast to other clients
    });

    //	Function for handling requests to leave the queue
    socket.on('requestQueueCancel', function(data) {
    	$id = socket.id.replace('/queue#', '');
    	$i = 0;
    	console.log($id);
    	$queue.forEach(function (element, index, array) {
    		console.log(element);
    		//	If user id passed in in queue
    		if (element.id == $id) {
    			$queue.splice($i, 1);
                console.log($queue);
    			socket.emit('requestQueueCancelAccepted', {id: $id});
    			//	Pass a cancel accept event back to the socket
                socket.broadcast.emit('queueClientCount', {connections: $queue.length});
                io.of('/queue').emit('queueClientCount', {connections: $queue.length});
                //	Pass an event to other queuers that informs them a client has left
    		}
    		$i++;
    	});
    	
    });

    //  Function for returning the client count upon request
    socket.on('requestQueueClientCount', function(data) {
    	socket.emit('queueClientCount', {connections: $queue.length});
    });

    //	Function for handling queue disconnects
	socket.on('disconnect', function(data) {
	$i = 0;
    $queue.forEach(function (element, index, array) {
    	//	If user id passed in in queue
   		if (element.id == data.id) {
    		$queue.splice($i, 1);
    	}
    	$i++;
    });
});
});


io.on('disconnect', function(socket) {});

//	Function for matching up sockets to create a game
function startGames() {
	if ($queue.length >= 2) {
		var $player1 = $queue[0];
		var $player2 = $queue[1];
		$player1.socket.emit('matchFound', {gameId:1, player:1});
		$player2.socket.emit('matchFound', {gameId:1, player:2});
		var $match = new Game($player1, $player2, 1);
		$match = {1: $match};
		$games.push($match);
		$queue.shift();
		$queue.shift();
		startGames();
	} else {
		console.log('No matches made!')
	}
}

io.of('/match').on('connection', function(socket) {
	$currentGame = null;
	socket.on('clientConnected', function(data) {
		if ($games.length >= 1) {
			$i = 0;
			$games.forEach(function(index, element, array) {
				if (element.hasOwnProperty(data.id)) {
					$currentGame = $games[$i];
					return false;
				}
				$i++;
			});
			if ($currentGame) {
				socket.join(data.id);
				$currentGame[player + data.player].connected = true;
				$games[$i] = $currentGame
				if ($currentGame.player1.connected && $currentGame.player2.connected) {
					io.to(data.id).emit('matchStart', {player1name:$currentGame.player1.name, player2name:$currentGame.player2.name});
				}
			} else {
				socket.emit('matchError', {name:'Game not found!', msg:'No game was found with this ID.'});
			}
		}
	});
});

function Game(player1, player2, id) {
	this.player1 = player1;
	this.player1.connected = false;
	this.player2 = player2;
	this.player2.connected = false;
	this.id = id;
	this.inProgress = false;
}