var score = 0;
var timer;

$(function() {
	$('#standard').click(function() {
		startNewGame(true);
	});

	$('#timed').click(function() {
		startNewGame(false);
	});

	$('#highScores').click(function() {

	});
});

function startNewGame(standard) {
	score = 0;
	if (standard) 
		timer = 5;
	else
		timer = 60;

	//randomize();
	$('#instructions').hide();
	$('#game').show();
	$('#countdown').text('Time Left: ' + timer);
	var countdown = setInterval(function () {
		if (--timer > 0) {
			$('#countdown').text('Time Left: ' + timer);
		} else {
			clearInterval(countdown);
			$('#game').hide();
			$('#instructions').show();
		}
	}, 1000);
}
