var net = require('net'),
	express = require('express'),
	app = express.createServer(),
	io = require('socket.io').listen(app),
	colors = require('colors');

app.listen(8000);
io.set('log level', 1);

var HOST,
	PORT = 23,
	client;

io.sockets.on('connection', function(socket) {
	socket.on('setChannel', function(data) {
		HOST = data.channelName;
		socket.room = HOST;
		
		socket.join(HOST);
	
		client = net.createConnection(PORT, HOST, function() {
			socket.emit('xboxconnect', 'connected');
			console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		});
		
		client.on('data', function(data) {
			console.log(colors.green('Xbox: ' + data));
		});
	});
	
	socket.on('command', function(data) {
		client.write(data+'\n', function() {
			console.log(data);
		});
	});

	socket.on('end', function() {
		socket.leave(socket.room);
		client.destroy();
		console.log('user disconnected ' + HOST);
	});

});
