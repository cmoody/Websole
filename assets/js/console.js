(function(){
	
	/* Global Variables */
	cmdHistory = [];
	count = '';
	
	/* Socket.io Section */
	var socket = io.connect('http://10.202.0.91:8000');
	
	socket.on('connect', function(){
		socket.emit('setChannel',{'channelName': '10.202.0.91'});
	});
	
	socket.on('consoleLog', function(data) {
		$('#console ul').append('<li>Console: ' + data + '</li>');
	});
	
	/* List of available commands */
	// Eventually move to Node
	// On connect return array from TCP server
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
	
	/* On click of send button take whats in input and send it */
	function cmdAction(){
		var cmd = $('.cmd').val();
		
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
	
	$('.send').click(function() {
		cmdAction();
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
	  	cmdAction();
	  	
	  }else{
	  	// Search Through Available CMDs
	  	cmdSearch($('.cmd').val());
	  	
	  }
	});
	
	$(document).keyup(function(e) {
		if(e.keyCode == 192) {
			$('#cosnole-wrapper').slideToggle();
		}
	});
	
})();
