
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

server.listen(80);

app.use("/react",express.static(__dirname + '/react'));
app.use("/components",express.static(__dirname + '/components'));
app.use("/external_scripts",express.static(__dirname + '/external_scripts'));
app.use("/styles",express.static(__dirname + '/styles'));
app.use("/assets",express.static(__dirname + '/assets'));
app.use("/font",express.static(__dirname + '/font'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('CONNECTION MADE');
    socket.on('my other event', function (socket) {
        io.emit('testing', { hello: 'world' });
    });
    socket.on('requestChatRoomList', function(data) {
       socket.emit('requestChatRoomListResponse',{rooms:$chatRooms});
    });
    socket.on('joinChatEvent', function(data) {
        console.log('Joining Chat');
        if ($chatRooms.hasOwnProperty(data.room)) {
            socket.join(data.room);
            socket.emit('joinChatEventAccepted');
            io.to(data.room).emit('clientJoinEvent', {name: data.name});
            $chatRooms[data.room]['users'].push({name: data.name, id: data.id});
            console.log($chatRooms);
            socket.on('sendMessageEvent', function(data) {
                io.to(data.room).emit('newChatMessageEvent', {name: data.name, msg: data.msg, time: time()})
            });
        } else {
            socket.emit('joinChatEventDenied', {msg: 'Bad Room'});
        }
	});
	socket.on('leaveChatEvent', function(data) {
		$i = 0;
		$chatRooms[data.room].forEach(function(element, index, array) {
			if (element.id == data.id) {
				$chatRooms[data.room].splice($i, 1);
				socket.emit('leaveChatEventAccepted', {});
			}
			$i++;
		});
	});
});

var queueConnection = io.of('/queue').on('connection', function(socket) {
	console.log('Queueing Connection made');
	socket.on('requestQueue', function(data) {
		$data = data.username;
    	$id = socket.id.replace('/queue#', '');
    	console.log("Queueing connection " + $id + ".");
    	socket.emit('queueRequestAccepted', {id: $id, name: $data});
    	$queue.push({id: $id, name: $data});
    	socket.broadcast.emit('queueClientCount', {connections: $queue.length});
    	io.of('/queue').emit('queueClientCount', {connections: $queue.length});
    	startGames();
    });
    socket.on('requestQueueCancel', function(data) {
    	$id = socket.id.replace('/queue#', '');
    	$i = 0;
    	console.log($id);
    	$queue.forEach(function (element, index, array) {
    		console.log(element);
    		if (element.id == $id) {
    			$queue.splice($i, 1);
                console.log($queue);
    			socket.emit('requestQueueCancelAccepted', {id: $id});
                socket.broadcast.emit('queueClientCount', {connections: $queue.length});
                io.of('/queue').emit('queueClientCount', {connections: $queue.length});
    		}
    		$i++;
    	});
    	
    });
    socket.on('requestQueueClientCount', function(data) {
    	socket.emit('queueClientCount', {connections: $queue.length});
    });
});

function startGames() {
	console.log('Starting Games!');
}
