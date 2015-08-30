$(document).ready(function(){
	alert(WEBSOCKET_URI);

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
        uri: WEBSOCKET_URI+'foobar?subscribe-broadcast&publish-broadcast&echo',
        receive_message: receiveMessage,
        //heartbeat_msg: {{ WS4REDIS_HEARTBEAT }}
    });

    // attach this function to an event handler on your site
    function sendMessage() {
        var msg = getMessage();
        $.post('/chat/postajax/', {
				message: msg
			});
        //numerateMessage(msg);
    }

    // receive a message though the websocket from the server
    function receiveMessage(msg) {
        //alert('Message from Websocket: ' + msg);
        numerateMessage(msg);
    }


});