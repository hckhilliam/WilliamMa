var score = 0, timer = 0, initSize = 50, threshold = 50, standard = true;
var odd = 0; //index of block with lighter shade
var inc = 0; //increments for timer
var levelCounter = 0, increase = 1, modder = 0, size = 2;

$(function() {
	$('#standard').click(function() {
		standard = true;
		startNewGame();
	});

	$('#timed').click(function() {
		standard = false;
		startNewGame();
	});

	$('#highScores').click(function() {
		$('#instructions').hide();
		var standardScore = localStorage.ShadesStandardHighScore;
		if (standardScore) $('#standardScore').text('Standard: ' + standardScore);
		else $('#standardScore').text('Standard: ' + 0);
		var timedScore = localStorage.ShadesTimedHighScore;
		if (timedScore) $('#timedScore').text('Timed Mode: ' + timedScore);
		else $('#timedScore').text('Timed Mode: ' + 0);
		$('#scores').show();
	});

	$('#playAgain').click(function() {
		$('#conclusion').hide();
		startNewGame();
	});

	$('#menuBtn').click(function() {
		$('#conclusion').hide();
		$('#instructions').show();
	});

	$('#return').click(function() {
		$('#scores').hide();
		$('#instructions').show();
	});
});

function startNewGame() {
	score = 0;
	if (standard) 
		timer = 3;
	else
		timer = 60;

	initSize = 50;
	threshold = 50;
	inc = 0;
	levelCounter = 0;
	increase = 1;
	modder = 0;
	size = 2;

	$('#instructions').hide();
	$('#conclusion').hide();
	$('#game').show();
	randomize();	
	$('#score').text('Score: ' + score);
	$('#countdown').text('Time Left: ' + timer);
	var countdown = setInterval(function () {
		if (--timer > 0) {
			$('#countdown').text('Time Left: ' + timer);
		} else {
			clearInterval(countdown);
			$('#game').hide();
			$('#result').text('Your Score: ' + score);
			var highScore = 0;
			if (standard) {
				highScore = localStorage.ShadesStandardHighScore;
				if (score > highScore || !highScore) {
					localStorage.ShadesStandardHighScore = score;
					highScore = score;
				}
			} else {
				highScore = localStorage.ShadesTimedHighScore;
				if (score > highScore || !highScore) {
					localStorage.ShadesTimedHighScore = score;
					highScore = score;
				}
			}
			$('#highScore').text('High Score: ' + highScore);
			$('#conclusion').show();
		}
	}, 1000);
}

function randomize() {
	var content = $('#blocks');
	content.empty();
	var numBlocks = Math.pow(size, 2);
	var r = Math.floor(Math.random()*206), g = Math.floor(Math.random()*206), b = Math.floor(Math.random()*206);
	for (var i=0; i<numBlocks; i++) {
		content.append('<div id=' + i + ' style="float: left; margin: ' + initSize*0.05 + '%; background-color: rgb('+r+','+g+','+b+'); border-radius: ' + initSize*0.1 + '%; width: ' + initSize*0.9 + '%; height: ' + initSize*0.9 + '%; cursor: pointer;"></div>');
	}	
	odd = Math.floor(Math.random()*numBlocks);
	$('#' + odd).css('background-color', 'rgb('+(r+threshold)+','+(g+threshold)+','+(b+threshold)+')');
	$('#blocks > div').click(function() {
		if ($(this).attr('id') == odd) {
			score += 10;
			if (standard) {
				inc++;
				if (inc == 3) {
					timer += 5;
					inc = 0;
				}
			}
			$('#score').text('Score: ' + score);
			$('#countdown').text('Time Left: ' + timer);

			levelCounter++;
			if (levelCounter == increase) {
				levelCounter = 0;
				modder++;
				if (modder%2 == 0)
					increase++;
				var x = size-1;
				threshold = Math.ceil(-71*Math.pow(x,3)/4320 + 295*Math.pow(x,2)/432 - 847*x/90 + 50);
				size++;
				initSize = 100/size;
			}

			randomize();
		} else {
			score -= 5;
			$('#score').text('Score: ' + score);
		}
	});
}
