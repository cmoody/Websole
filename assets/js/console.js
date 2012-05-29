(function(){
	
	/* Global Variables */
	cmdHistory = [];
	count = '';
	
	/* List of available commands */
	// Eventually move to Node
	var cmdAvailable = [
		{ name: "apples", description: "They are tasty" },
		{ name: "hud_show", description: "hud_show <variable> can be 1 for on or 0 for off" },
		{ name: "screenshot", description: "Saves screenshot" }
	];
	
	/* On click of send button take whats in input and send it */
	function cmdAction(){
		var cmd = $('.cmd').val();
		
		cmdHistory.push(cmd);
		
		/* To keep the cmdHistory array from getting too large */
		//if(cmdHistory.lenght > 25) cmdHistory.splice(0,1);
		
		$('#console ul').append('<li>&gt; ' + cmd + '</li>');
		
		/* Send command to node.js server on websocket */
		// socket.emit('cmd',cmd);
		
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
	
	/*
	socket.on('response', function(data) {
		$('#console ul').append('<li>Console: ' + data + '</li>');
	});
	*/
	
	$(document).keyup(function(e) {
		if(e.keyCode == 192) {
			$('#cosnole-wrapper').slideToggle();
		}
	});
	
})();
