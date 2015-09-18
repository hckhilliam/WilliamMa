var score = 0, timer = 0, initSize = 50, threshold = 50, standard = true;
var odd = 0; //index of block with lighter shade
var inc = 0; //increments for timer
var levelCounter = 0;	//current level
var thresCount = 0, thresInc = 1, thresModder = 0;	//helpers for difficulty increase by lowering the threshold between a normal block and a lighter block
var sizeCount = 0, sizeInc = 1, size = 2;	//helpers for difficulty increase by increasing # of squares
var countdown; //timer

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
	if (standard) timer = 3;
	else timer = 60;

	$('#instructions').hide();
	$('#conclusion').hide();
	$('#game').show();
	randomize();	
	$('#score').text('Score: ' + score);
	$('#countdown').text('Time Left: ' + timer);
	countdown = setInterval(function () {
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
			resetGame();
		}
	}, 1000);
}

function randomize() {
	var content = $('#blocks');
	content.empty();
	var numBlocks = Math.pow(size, 2);
	var r = Math.floor(Math.random()*206), g = Math.floor(Math.random()*206), b = Math.floor(Math.random()*206);
	for (var i=0; i<numBlocks; i++) {
		content.append('<div id=' + i + ' style="margin: ' + initSize*0.05 + '%; background-color: rgb('+r+','+g+','+b+'); width: ' + initSize*0.9 + '%; height: ' + initSize*0.9 + '%;"></div>');
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
					$('#countdown').text('Time Left: ' + timer);
				}
			}
			$('#score').text('Score: ' + score);
			computeNewThreshold();
			computeNewSize();
			randomize();
		} else {
			score -= 5;
			$('#score').text('Score: ' + score);
		}
	});
}

//decrease threshold every 1 hit, 1 hit, 2, 2, 3, 3,....
function computeNewThreshold() {
	thresCount++;
	if (thresCount == thresInc) {
		levelCounter++;
		thresModder++; 
		thresCount = 0;
		if (thresModder == 2) {
			thresInc++;	
			thresModder = 0;
		}
		threshold = Math.ceil(250/(2.3*levelCounter + 5));	
	}
}

//increase 1 column and 1 row of blocks every 1 hit, 2 hits, 3, 4, ....
function computeNewSize() {
	sizeCount++;
	if (sizeCount == sizeInc) {
		sizeCount = 0;
		sizeInc++;
		size++;
		initSize = 100/size;
	}
}

function resetGame() {
	score = 0;
	initSize = 50;
	threshold = 50;
	inc = 0;
	levelCounter = 0;

	thresCount = 0;
	thresInc = 1;
	thresModder = 0;

	sizeCount = 0;
	sizeInc = 1;
	size = 2;
}

function endShadesGame() {
	resetGame();
	clearInterval(countdown);
}