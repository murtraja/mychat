$(document).ready(function(){
	alert(GROUP_POST);

	var numerateMessage = function(message){
		$('#all_messages').append('<li> '+message+' </li>');
		console.log(message);
	};
	var getMessage = function(){
		var msg = $('#user_input').val();
		return msg;
	};
	$('#submit_button').click(sendMessage);
	$('#user_input').keydown(function(event){
		if(event.keyCode == 13) {
			sendMessage();
		}
	});

	var ws4redis = WS4Redis({
        uri: WEBSOCKET_URI+'myg?subscribe-group',
        receive_message: receiveMessage,
        heartbeat_msg: WS4REDIS_HEARTBEAT
    });

    // attach this function to an event handler on your site
    function sendMessage() {
        var msg = getMessage();
        $.post(GROUP_POST, {
				message: msg,
                user: $('#username').html(),
                group: $('#group').val()
			});
        //numerateMessage(msg);
    }

    // receive a message though the websocket from the server
    function receiveMessage(msg) {
        //alert('Message from Websocket: ' + msg);
        if(msg == WS4REDIS_HEARTBEAT)
        {
        	console.log("heatbeat received!");
        }
        else
        {
        	numerateMessage(msg);
        	
        }
    }


});