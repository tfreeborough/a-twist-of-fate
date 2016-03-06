
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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
    socket.on('requestQueue', function(socket) {
    	$id = (Math.random() * 10) + 1;
    	console.log("Queueing connection " + $id + ".")
    	io.emit('queueRequestÁccepted', {id: $id});
    });
});


