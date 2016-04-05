var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var prettyjson = require('prettyjson');
//our modules

var User = require("./user");
var Match = require("./match");
Match.io = io;

//utility variables
var $chatRooms = {
    global: {
        name: "Global",
        users: []
    }
};
var $games = [];
var logOptions = {
    keysColor: 'green',
    stringColor: 'magenta',
    numberColor: "yellow"
}; //default else pass your own object

server.listen(80);

app.use("/react", express.static(__dirname + '/app/react'));
app.use("/components", express.static(__dirname + '/app/components'));
app.use("/external_scripts", express.static(__dirname + '/app/external_scripts'));
app.use("/styles", express.static(__dirname + '/app/styles'));
app.use("/assets", express.static(__dirname + '/app/assets'));
app.use("/font", express.static(__dirname + '/app/font'));
app.use("/match", express.static(__dirname + '/app/match'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
});
app.get('/match', function(req, res) {
    res.sendFile(__dirname + '/app/match.html');
});

var queueMatches = setInterval(function(){
    if(Match.queue.length >= 2)
        Match.startGames();
}, 1000);

/*
Not sure where to put this, needed for padding 0's on the chat messages
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


//  Function for handling connections on the server's root namespace
//  Does not handle queuing or game connections, only chat
io.on('connection', function(socket) {
    console.log(prettyjson.render('CONNECTION MADE', {stringColor: "rainbow"}));

    //  Server event testing event
    socket.on('my other event', function(socket) {
        io.emit('testing', { hello: 'world' });
    });

    //  Function for handling requests for the list of chat rooms
    //  Returns a rooms object
    socket.on('requestChatRoomList', function(data) {
        socket.emit('requestChatRoomListResponse', { rooms: $chatRooms });
    });

    //  Function for handling requests to join a chat room
    //  Accepts an object with properties for room name, username and id
    socket.on('requestToJoinChat', function(data) {
        console.log('Joining Chat');

        //  Checking if room exists
        if ($chatRooms.hasOwnProperty(data.room)) {
            var userAlreadyInChat = false;
            //Check if user is already connected
            $chatRooms[data.room]['users'].forEach(function(element, index, array) {
                if (element.id == socket.id.replace('/#', '')) {
                    userAlreadyInChat = true;
                }
            });
            if (!userAlreadyInChat) {

                $chatRooms[data.room]['users'].push({ name: data.name, id: data.id });
                socket.join(data.room);
                socket.emit('requestToJoinChatAccepted');
                //socket joins chat 'room' and returns an accepted event
                io.to(data.room).emit('clientJoinEvent', { room: data.room, name: data.name });
                //  Emit event to the room that a new user is there
                console.log($chatRooms);

            } else {
                //  If user is connected return error
                socket.emit('requestToJoinChatDenied', { msg: 'exists' });
            }
        } else {
            //  If room not found emit error message back to the socket
            socket.emit('requestToJoinChatDenied', { msg: 'The room you have requested does not exist.' });
        }
    });

    //  Function for handling message events sent by clients to the room
    socket.on('sendMessageEvent', function(data) {
        //  Emit the message back to other sockets
        console.log('MESSAGE SENT TO SERVER');
        var $now = new Date()
        io.sockets.in(data.room).emit('newChatMessageEvent', {
            room: data.room,
            name: data.name,
            msg: data.message,
            time: pad($now.getHours(), 2) + ':' + pad($now.getMinutes(), 2) + ':' + pad($now.getSeconds(), 2)
        });
        console.log('MESSAGE SENT');
    });

    //  Function for handling requests to leave the chat room
    socket.on('leaveChatEvent', function() {
        $i = 0;
        $socketId = socket.id.replace('/#', '');
        Object.keys($chatRooms).map(function(value, index) {
            $chatRooms[value]['users'].forEach(function(e, i, a) {
                console.log('DISCONNECTING FROM CHAT DUE TO PAGE CHANGE');
                if (e.id == $socketId) {
                    $chatRooms[value]['users'].splice(i, 1);
                    socket.leave(value);
                    io.to(value).emit('clientLeaveEvent', { room: value, name: e.name });
                }
            });
        });
    });

    //  Function for handling chat disconnects
    socket.on('disconnect', function() {
        $i = 0;
        $socketId = socket.id.replace('/#', '');
        Object.keys($chatRooms).map(function(value, index) {
            $chatRooms[value]['users'].forEach(function(e, i, a) {
                console.log('DISCONNECTING FROM CHAT DUE TO DISCONNECTION');
                if (e.id == $socketId) {
                    $chatRooms[value]['users'].splice(i, 1);
                    socket.leave(value);
                    io.to(value).emit('clientLeaveEvent', { room: value, name: e.name });
                }
            });
        });
    });

});

var registerConnection = io.of('/register').on('connection', function(socket) {
    socket.on("register", function(data) {
        console.log("Received register data...\n", prettyjson.render(data, logOptions));

        User.register(data).then(function(result) {
                console.log("registerConnection.User.register: success\n", prettyjson.render(result, logOptions));
                io.of("/register").emit("registerComplete", true);
            })
            .catch(function(result) {
                //console.log("registerConnection.User.register: failed\n", prettyjson.render(result, logOptions));
                io.of("/register").emit("emailTaken", User.handleError(result));
            })
    })
});

var logInConnection = io.of("/logIn").on("connection", function(socket) {
    socket.on("logIn", function(data){
        console.log("logInAttempt data ....\n", prettyjson.render(data, logOptions));

        User.logIn(data).then(function(result){
            console.log("User.logIn: success - ", result);
            io.of("/logIn").emit("logInValid", true);
        })
        .catch(function(result){
            console.log("User.logIn: failed - ", result);
            io.of("/logIn").emit("logInFailed", false);
        })
    })
})

//  Function for handling requests to enter the game's matchmaking queue
//  Queue connections must be made on the /queue namespace to separate them from the other guff
var queueConnection = io.of('/queue').on('connection', function(socket) {

    //  Function for handling requests to queue
    socket.on('requestQueue', function(data) {
        $data = data.username;
        $id = socket.id.replace('/queue#', '');
        // Id is based on the socket ID unguessable
        //  Return accepted event
        socket.emit('queueRequestAccepted', { id: $id, name: $data });
        Match.queue.push({ id: $id, name: $data, socket: socket });
        socket.broadcast.emit('queueClientCount', { connections: Match.queue.length });
        io.of('/queue').emit('queueClientCount', { connections: Match.queue.length });
        //  Pass the current people in queue to the socket and broadcast to other clients
    });

    //  Function for handling requests to leave the queue
    socket.on('requestQueueCancel', function(data) {
        $id = socket.id.replace('/queue#', '');
        $i = 0;
        Match.queue.forEach(function(element, index, array) {
            //  If user id passed in in queue
            if (element.id == $id) {
                Match.queue.splice($i, 1);
                socket.emit('requestQueueCancelAccepted', { id: $id });
                //  Pass a cancel accept event back to the socket
                socket.broadcast.emit('queueClientCount', { connections: Match.queue.length });
                io.of('/queue').emit('queueClientCount', { connections: Match.queue.length });
                //  Pass an event to other queuers that informs them a client has left
            }
            $i++;
        });

    });

    //  Function for returning the client count upon request
    socket.on('requestQueueClientCount', function(data) {
        socket.emit('queueClientCount', { connections: Match.queue.length });
    });

    //  Function for handling queue disconnects
    socket.on('disconnect', function(data) {
        $i = 0;
        Match.queue.forEach(function(element, index, array) {
            //  If user id passed in in queue
            if (element.id == data.id) {
                Match.queue.splice($i, 1);
            }
            $i++;
        });
    });
});


io.on('disconnect', function(socket) {});

io.of('/match').on('connection', function(socket) {
    $currentGame = null;

    socket.on("clientConnected", function(data){
        if(Object.keys(Match.games).length > 0){
            console.log("clientConnected data", data);
            $currentGame = Match.games[data.id]; //booom! that easy!

            //assume the id maps to a define property
            if($currentGame) {
                console.log("Current game is", $currentGame);
                socket.join(data.id); //not sure what this does
                var playerId = "player" + data.player.toString();
                console.log("PlayerId", playerId);
                $currentGame[playerId]['connected'] = true; //beautiful
                $currentGame[playerId]['id'] = socket.id.replace("/#", ""); //wonderful
                $currentGame[playerId]['socket'] = socket;

                //if both are connected?
                if($currentGame['player1']['connected'] == true && $currentGame['player2']['connected']  == true) {
                    console.log("Game can start", "GLHF");
                    io.of('/match').to(data.id).emit('matchStart', {player1: $currentGame['player1']['name'], player2: $currentGame['player2']['name'] });
                } else {
                    console.log("Waiting on a player");
                }
            } else {
                socket.emit('matchError', { name: 'Game not found!', msg: 'No game was found with this ID.' });
            }
        }
    })

    socket.on("sendPlayerMessage", function(data){
        $currentGame = Match.games[data.id];
        Match.sendPlayerMessage($currentGame, data);
    })

    //to do
    socket.on("disconnect", function(data){
       console.log(data);
    })
});

