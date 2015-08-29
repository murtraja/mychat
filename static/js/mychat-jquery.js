$(document).ready(function(){
	alert("helllo there!");

	var numerateMessage = function(message){
		$('#all_messages').append('<li> '+message+' </li>');
		console.log(message);
	};
	var putMessage = function(){
		numerateMessage($('#user_input').val());
	};
	$('#submit_button').click(putMessage);
	$('#user_input').keydown(function(event){
		if(event.keyCode == 13) {
			putMessage();
		}
	});
});