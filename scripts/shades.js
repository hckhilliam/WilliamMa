var score = 0, timer = 0, initSize = 0.5, threshold = 50, odd = 0, standard = true;

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

	$('#test').click(function() {
		timer += 5;
		$('#countdown').text('Time Left: ' + timer);
	});
});

function startNewGame() {
	score = 0;
	if (standard) 
		timer = 3;
	else
		timer = 60;

	initSize = 0.5;
	threshold = 50;

	randomize();
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

function randomize() {
	var content = $('#blocks');
	content.empty();
	var size = $('#shadesGame').width()*initSize;
	var margin = size*0.05;
	size *= 0.9;
	var numBlocks = Math.floor(Math.pow(1/initSize, 2));
	var r = Math.floor(Math.random()*206), g = Math.floor(Math.random()*206), b = Math.floor(Math.random()*206);
	for (var i=0; i<numBlocks; i++) {
		content.append('<div id=' + i + ' style="float: left; margin: ' + margin + 'px; background-color: rgb('+r+','+g+','+b+'); border-radius: ' + size*0.1 + 'px; width: ' + size + 'px; height: ' + size + 'px; cursor: pointer;"></div>');
	}	
	odd = Math.floor(Math.random()*numBlocks);
	$('#' + odd).css('background-color', 'rgb('+(r+threshold)+','+(g+threshold)+','+(b+threshold)+')');
	$('#blocks > div').click(function() {
		if ($(this).attr('id') == odd) {
			score += 10;
			if (standard)
				timer += 3;
			$('#score').text('Score: ' + score);
			$('#countdown').text('Time Left: ' + timer);

			if (score == 300 || score == 305) {
				threshold -= 5;
			} else if (score == 230 || score == 235) {
				initSize = 0.1;
				threshold -= 5;
			} else if (score == 150 || score == 155) {
				initSize = 0.125;
				threshold -= 5;
			} else if (score == 100 || score == 105) {
				initSize = 0.142857;
				threshold -= 5;
			} else if (score == 60 || score == 65) {
				initSize = 0.2;
				threshold -= 5;
			} else if (score == 30 || score == 35) {
				initSize = 0.25;
				threshold -= 5;
			} else if (score == 10) {
				initSize = 0.33;
				threshold -= 10;
			}  

			randomize();
		} else {
			score -= 5;
			$('#score').text('Score: ' + score);
		}
	});
}
