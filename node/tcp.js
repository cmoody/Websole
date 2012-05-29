// Load the net module to create a tcp server.
var net = require('net');

// Setup a tcp server
net.createServer(function (sock) {

  	// We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        if(data != 'apples'){
        	sock.write('Thats right you said ' + data);
        }else{
       		sock.write('Who doesnt like apples?');
       	}
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(7000);

// Put a friendly message on the terminal
console.log("TCP server listening on port 7000 at localhost.");