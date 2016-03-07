
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var queue = [];

server.listen(80);

app.use("/react",express.static(__dirname + '/react'));
app.use("/components",express.static(__dirname + '/components'));
app.use("/external_scripts",express.static(__dirname + '/external_scripts'));
app.use("/styles",express.static(__dirname + '/styles'));
app.use("/assets",express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('CONNECTION MADE');
    socket.on('my other event', function (socket) {
        io.emit('testing', { hello: 'world' });
    });
});

var queueConnection = io.of('/queue').on('connection', function(socket) {
	console.log('Queueing Connection made');
	socket.on('requestQueue', function(data) {
		$data = data.username;
    	$id = socket.id.replace('/queue#', '');
    	console.log("Queueing connection " + $id + ".");
    	socket.emit('queueRequestAccepted', {id: $id, name: $data, socketObj: socket.id});
    	queue.push({id: $id, name: $data});
    	socket.broadcast.emit('queueClientCount', {connections: queue.length});
    	io.of('/queue').emit('queueClientCount', {connections: queue.length});
    	startGames();
    });
});

function startGames() {
	console.log('Starting Games!');
}
