var net = require('net'),
	express = require('express'),
	app = express.createServer(),
	io = require('socket.io').listen(app),
	colors = require('colors');

// Sets up server listening on port 8000
app.listen(8000);
// Turns off io logs to terminal
io.set('log level', 1);

HOST = '';
var PORT = 7000; // Typically default 23
var client;

io.sockets.on('connection', function(socket) {
	
	socket.on('setChannel', function(data) {
		// Creates channel based on the IP connecting to for TCP
		//HOST = data.channelName;
		//socket.room = HOST;
		
		socket.join(data.channelName);
		
		// Connects to TCP server
		/*client = net.createConnection(PORT, HOST, function() {
			socket.emit('connect', 'connected');
			console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		});*/
		
		// Data from TCP server
		/*client.on('data', function(data) {
			console.log(colors.green('Console: ' + data));
		});*/
	});
	
	// Takes command sent in and sends it to TCP server
	socket.on('cmd', function(data) {
		/*client.write(data+'\n', function() {
			console.log(data);
		});*/
		console.log(data);
		// Fix channelName
		socket.emit('consoleLog', 'You said "' + data + '"');
	});
	
	// Closes TCP server connection, leaves socket room but KEEPS SOCKET OPEN this allows for disconnect without page refresh
	socket.on('end', function() {
		socket.leave(socket.room);
		//client.destroy();
		console.log('user disconnected ' + HOST);
	});

});