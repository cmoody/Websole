(function(){
	
	// Appends to body of page
	$('body').append('<div id="cosnole-wrapper"><section id="console"><ul><li>Type "connect &lt;IP Address&gt;" to start session.</li></ul></section><section id="cmdline"><input type="text" placeholder="Enter Command or Up/Down Arrow for History" class="cmd"/><button class="send">Send</button><ul id="cmdavailable"></ul></section></div>');
	
	/* Global Variables */
	var cmdHistory = [];
	var count = '';
	var connected = false;
	
	/* List of available commands */
	// Eventually move to Node
	// On connect return JSON data from TCP server of available
	var cmdAvailable = [
		{ name: "apples", description: "They are tasty" },
		{ name: "hud_show", description: "hud_show <variable> can be 1 for on or 0 for off" },
		{ name: "screenshot", description: "Saves screenshot" }
	];
	
	// For testing style
	/*
	for(i=0;i<=cmdAvailable.length-1;i++){
		$('#cmdavailable').append('<li>' + cmdAvailable[i]['name'] + '<span>&lt; ' + cmdAvailable[i]['description'] + ' &gt;</span></li>');
	}
	*/
	
	/* Socket.io Section */
	var socket = io.connect('http://10.202.0.91:8000');
	
	socket.on('consoleLog', function(data) {
		$('#console ul').append('<li>' + data + '</li>');
	});
	
	/* On click of send button take whats in input and send it */
	function cmdAction(cmd){
		// Add command to history
		cmdHistory.push(cmd);
		
		/* To keep the cmdHistory array from getting too large */
		//if(cmdHistory.lenght > 25) cmdHistory.splice(0,1);
		
		$('#console ul').append('<li>&gt; ' + cmd + '</li>');
		
		/* Send command to node.js server on websocket */
		socket.emit('cmd',cmd);
		
		// Resets input field & history count
		$('.cmd').val('');
		count = cmdHistory.length;
	};
	
	/* Search list of cmdAvailable and display in #cmdavailable */
	function cmdSearch(key){
		
	};
	
	function connectCheck(){
		var cmd = $('.cmd').val(),
			ip;
		
		if(cmd.match(/^connect/)){
			// Closes socket room and client connection just in case before connect
			//socket.emit('end');
			
			// Removes connect from cmd so just IP left over then sets channel
			ip = cmd.replace(/^connect /, '');
			socket.emit('setChannel',{'channelName': ip});
			
			// Resets input field
			$('.cmd').val('');
			
			// Sets connected so we know channel is setup
			connected = true;
			
		}else if(cmd.match(/^disconnect/)){
			// Closes socket room and client connection
			$('.cmd').val('');
			
			socket.emit('end');
			
			$('#console ul').append('<li>Disconnected from server</li>');
			
			// Resets being connected
			connected = false;
			
		}else{
			// Checks if connection has been made
			if(connected){
				// Sends command to terminal
				cmdAction(cmd);
			
			}else{
				$('#console ul').append('<li>No connection established</li>');
				$('.cmd').val('');
				
			}
		}
		
	};
	
	$('.send').click(function() {
		connectCheck();
	});
	
	/* Arrow key up goes through input history */
	$('.cmd').keyup(function(e) {
	  if(e.keyCode == 38) {
	  	// Arrow Key Up in History
	  	count = count-1;
	  	$('.cmd').val(cmdHistory[count]);
	  	
	  }else if(e.keyCode == 40){
	  	// Arrow Key Down in History
	  	count = count+1;
	  	$('.cmd').val(cmdHistory[count]);
	  	
	  }else if(e.keyCode == 13) {
	  	// Enter Key Sends CMD
	  	connectCheck();
	  	
	  }else{
	  	// Search Through Available CMDs
	  	cmdSearch($('.cmd').val());
	  	
	  }
	});
	
	$(document).keyup(function(e) {
		if(e.keyCode == 192) {
			$('#cosnole-wrapper').slideToggle();
			// Not the best work around for prevent ` in command line
			$('.cmd').val('');
		}
	});

})();

// Think about a way to utilize a push to inform
// This would be an admin console where messages (warning, alert, info) can be emitted from node to the browser window
