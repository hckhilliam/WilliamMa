/**
 * Created by William on 19/01/2016.
 */
War.Settings.prototype = {
    create: function () {
        game.add.text(Math.floor(config.width / 2), 100, 'SETTINGS', {
            font: '400px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5, 0);

        var settingsStyle = {
            font: '100px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        };
        var settingsStyle2 = {
            font: '60px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        };
        var selectorBox = game.add.bitmapData(300, 100);
        selectorBox.rect(0, 0 , 300, 100, '#888');

       // var playerBtns = game.add.group();
        game.add.text(Math.floor(config.width / 9), 540, 'HUMAN PLAYERS:', $.extend({}, settingsStyle));
        var pSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 540, selectorBox);
        for (var i = 1; i <= 4; i ++) {
            var playerBtn = game.add.text(Math.floor(config.width / 2) + 330*(i-1), 560, i,
                $.extend({}, settingsStyle2));
            playerBtn.inputEnabled = true;
            playerBtn.events.onInputOver.add(hoverInBtn, this);
            playerBtn.events.onInputOut.add(hoverOutBtn, this);
        }

    //    var computerDifficulties = game.add.group();

        game.add.text(Math.floor(config.width / 9), 690, 'COMPUTER:', $.extend({}, settingsStyle));
        var cSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 690, selectorBox);
        var difficulties = ['NONE', 'EASY', 'MEDIUM', 'HARD'];
        for (var i = 1; i <= 4; i ++) {
            var computerBtn = game.add.text(Math.floor(config.width / 2) + 330*(i-1), 710, difficulties[i-1],
                $.extend({}, settingsStyle2));
            computerBtn.inputEnabled = true;
            computerBtn.events.onInputOver.add(hoverInBtn, this);
            computerBtn.events.onInputOut.add(hoverOutBtn, this);
        }

        game.add.text(Math.floor(config.width / 9), 840, 'RESPAWN TIME:', $.extend({}, settingsStyle));
        var rSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 840, selectorBox);
        var times = [0, 3, 5, 10];
        for (var i = 1; i <= 4; i ++) {
            var respawnBtn = game.add.text(Math.floor(config.width / 2) + 330*(i-1), 860, times[i-1],
                $.extend({}, settingsStyle2));
            respawnBtn.inputEnabled = true;
            respawnBtn.events.onInputOver.add(hoverInBtn, this);
            respawnBtn.events.onInputOut.add(hoverOutBtn, this);
        }

        game.add.text(Math.floor(config.width / 9), 990, 'KILLS TO WIN:', $.extend({}, settingsStyle));
        var kSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 990, selectorBox);
        var kills = [10, 25, 50, 100];
        for (var i = 1; i <= 4; i++) {
            var killsBtn = game.add.text(Math.floor(config.width / 2) + 330*(i-1), 1010, kills[i-1],
                $.extend({}, settingsStyle2));
            killsBtn.inputEnabled = true;
            killsBtn.events.onInputOver.add(hoverInBtn, this);
            killsBtn.events.onInputOut.add(hoverOutBtn, this);
        }

        var playBtn = game.add.text(Math.floor(config.width / 4), 1200, 'PLAY', $.extend({}, btnConfig));
        playBtn.anchor.set(0.5,0.5);
        playBtn.inputEnabled = true;
        playBtn.events.onInputOver.add(hoverInBtn, this);
        playBtn.events.onInputOut.add(hoverOutBtn, this);
        playBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('StartGame');
        });

        var instructionsBtn = game.add.text(Math.floor(3*config.width / 4), 1200, 'BACK', $.extend({}, btnConfig));
        instructionsBtn.anchor.set(0.5,0.5);
        instructionsBtn.inputEnabled = true;
        instructionsBtn.events.onInputOver.add(hoverInBtn, this);
        instructionsBtn.events.onInputOut.add(hoverOutBtn, this);
        instructionsBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('Menu');
        });
    }
};