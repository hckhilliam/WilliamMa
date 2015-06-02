var score = 0, timer = 0, initSize = 50, threshold = 50, odd = 0, standard = true, inc = 0;

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

	});

	$('#playAgain').click(function() {
		$('#conclusion').hide();
		startNewGame();
	});

	$('#menuBtn').click(function() {
		$('#conclusion').hide();
		$('#instructions').show();
	})
});

function startNewGame() {
	score = 0;
	if (standard) 
		timer = 3;
	else
		timer = 60;

	initSize = 50;
	threshold = 50;

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
			var highScore = localStorage.ShadesHighScore;
			if (score > highScore || !highScore) {
				localStorage.ShadesHighScore = score;
				highScore = score;
			}
			$('#highScore').text('High Score: ' + highScore);
			$('#conclusion').show();
		}
	}, 1000);
}

function randomize() {
	var content = $('#blocks');
	content.empty();
	var numBlocks = Math.floor(Math.pow(100/initSize, 2));
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

			if (score == 300 || score == 295) {
				threshold -= 5;
			} else if (score == 230 || score == 225) {
				initSize = 10;
				threshold -= 5;
			} else if (score == 150 || score == 145) {
				initSize = 12.5;
				threshold -= 5;
			} else if (score == 100 || score == 95) {
				initSize = 14.2857;
				threshold -= 5;
			} else if (score == 60 || score == 55) {
				initSize = 20;
				threshold -= 5;
			} else if (score == 30 || score == 25) {
				initSize = 25;
				threshold -= 5;
			} else if (score == 10 || score == 5) {
				initSize = 33;
				threshold -= 10;
			}  

			randomize();
		} else {
			score -= 5;
			$('#score').text('Score: ' + score);
		}
	});
}
