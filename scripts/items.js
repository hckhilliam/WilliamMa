var score = 0, timer = 0, standard = true, items = 0;
var inc = 0; //increments for timer
var maxNumItems = 10;	//current difficulty
var countdown; //timer
const NUM_BLOCKS = 25, MAX_SIZE = 20, ROW_SIZE = 5;

$(function () {
    $('#standard').click(function() {
        standard = true;
        startNewGame();
    });

    $('#timed').click(function() {
        standard = false;
        startNewGame();
    });

    $('#enter').click(answer);

    $('#answer').keypress(function(e) {
       if (e.which == 13) {
           answer();
       }
    });


    $('#highScores').click(function() {
        $('#instructions').hide();
        var standardScore = localStorage.ItemsStandardHighScore;
        if (standardScore) $('#standardScore').text('Standard: ' + standardScore);
        else $('#standardScore').text('Standard: ' + 0);
        var timedScore = localStorage.ItemsTimedHighScore;
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
                highScore = localStorage.ItemsStandardHighScore;
                if (score > highScore || !highScore) {
                    localStorage.ItemsStandardHighScore = score;
                    highScore = score;
                }
            } else {
                highScore = localStorage.ItemsTimedHighScore;
                if (score > highScore || !highScore) {
                    localStorage.ItemsTimedHighScore = score;
                    highScore = score;
                }
            }
            $('#highScore').text('High Score: ' + highScore);
            $('#conclusion').show();
            resetGame();
        }
    }, 1000);

    $('#answer').focus();
}

function randomize() {
    var content = $('#blocks');
    content.empty();
    items = Math.ceil(Math.random()*maxNumItems);
    var listOfPlacedItems = [];

    for (var i=0; i<items; i++) {
        var position;
        do { position = Math.floor(Math.random()*NUM_BLOCKS); } while (listOfPlacedItems.indexOf(position) >= 0);
        listOfPlacedItems.push(position);
        var left = (position%ROW_SIZE)*MAX_SIZE;
        var top = Math.floor(position/ROW_SIZE)*MAX_SIZE;
        content.append('<div id=' + i + ' style="left: ' + left + '%; top: ' + top + '%; width: ' + MAX_SIZE*0.9 + '%; height: ' + MAX_SIZE*0.9 + '%;"></div>');
    }
}

function resetGame() {
    score = 0;
    $('#answer').val('');
}

function answer() {
    var answer = parseInt($('#answer').val());
    $('#answer').val('');
    if (answer == items) {
        score += 10;
        $('#score').text('Score: ' + score);

        if (standard) {
            timer = 3;
            $('#countdown').text('Time Left: ' + timer);
        }

        randomize();
    } else {
        score -= 5;
        $('#score').text('Score: ' + score);
    }
}