
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.use("/react",express.static(__dirname + '/react'));
app.use("/components",express.static(__dirname + '/components'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('CONNECTION MADE');
    socket.on('my other event', function (socket) {
        io.emit('testing', { hello: 'world' });
    });
});


