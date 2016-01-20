/**
 * Created by William on 19/01/2016.
 */
War.Settings.prototype = {
    create: function () {
        game.add.text(Math.floor(config.width / 2), 100, 'SETTINGS', {
            font: '200px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5, 0);

        var settingsStyle = {
            font: '100px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        };
        var settingsStyle2 = {
            font: '80px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        };

        var selectorBox = game.add.bitmapData(350, 100);
        selectorBox.rect(0, 0 , 350, 100, '#888');

       // var playerBtns = game.add.group();
        var labels = [
          ['HUMAN PLAYERS:', 'COMPUTER:', 'RESPAWN TIME:', 'KILLS TO WIN:'],
          [0, 1, 2, 1],
          [
              [1, 2, 3, 4],
              ['NONE', 'EASY', 'MEDIUM', 'HARD'],
              [0, 3, 5, 10],
              [10, 25, 50, 100]
          ]
        ];

        var selectors = [];
        var tweeners = [];
        var currentSettings = [1, 'EASY', 5, 25];
        var buttons = [[], [], [], []];
        var extraIncrement = 0;
        for (var j = 0; j < 4; j++) {
            game.add.text(1000, 390 + 150*j + extraIncrement, labels[0][j], $.extend({}, settingsStyle)).anchor.set(1, 0);
            var selector = game.add.sprite(Math.floor(config.width / 2) - 170 + labels[1][j]*350, 390 + 150*j + extraIncrement, selectorBox);
            selectors.push(selector);
            tweeners.push(game.add.tween(selector));
            var settings = labels[2][j];
            var buttonList = buttons[j];
            var copy = settingsStyle2;
            //special case for computer (yes i know this is bad but whatever)
            var textInc = 0;
            if (j == 1) {
                copy = {
                    font: '50px Stencil',
                    fill: '#99FFCC',
                    fontStyle: 'bold'
                };
                textInc = 10;
            }
            for (var i = 0; i < 4; i++) {
                var btn = game.add.text(Math.floor(config.width / 2) - 120 + 350 * i, 380 + 150 * j + 20 + extraIncrement + textInc, settings[i],
                    $.extend({}, copy));
                btn.inputEnabled = true;
                btn.events.onInputOver.add(hoverInBtn, this);
                btn.events.onInputOut.add(hoverOutBtn, this);
                btn.events.onInputDown.add(function () {
                    var button = this.button;
                    //prevent person from selecting no computers when players are set to 1
                    if (!(currentSettings[0] == 1 && button.text == 'NONE')) {
                        select(this.index, button);
                    }

                    //if person switches to 1 player, we make computer to easy if it was at none
                    if (currentSettings[this.index] == 1 && currentSettings[1] == 'NONE') {
                        select(1, buttons[1][1]);
                    }
                }, {button: btn, index: j});

                buttonList.push(btn);
            }
            if (j == 1) {
                var settings2 = ['WINDMILL', 'SHOTGUN', 'INSANE', 'FRENZY'];
                for (var i = 0; i < 4; i++) {
                    var btn = game.add.text(Math.floor(config.width / 2) - 120 + 350 * i, 380 + 150 * (j+1) + 30, settings2[i],
                        $.extend({}, copy));
                    btn.inputEnabled = true;
                    btn.events.onInputOver.add(hoverInBtn, this);
                    btn.events.onInputOut.add(hoverOutBtn, this);
                    btn.events.onInputDown.add(function () {
                        var button = this.button;
                        select(this.index, button);
                    }, {button: btn, index: j});

                    buttonList.push(btn);
                }
                extraIncrement += 150;
            }
        }

        function select(index, btn) {
            var tween = tweeners[index];
            tween.stop();
            tween = game.add.tween(selectors[index]);
            tween.to({ x: btn.x - 50, y: Math.round((btn.y - 390)/150)*150 + 390 }, 200, Phaser.Easing.Exponential.Out, true);
            currentSettings[index] = btn.text;
        }
   /*     game.add.text(Math.floor(config.width / 9), 540, 'HUMAN PLAYERS:', $.extend({}, settingsStyle));
        var pSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 540, selectorBox);
        var pTween = game.add.tween(pSelector);
        for (var i = 1; i <= 4; i++) {
            var playerBtn = game.add.text(Math.floor(config.width / 2) + 330*i, 560, i,
                $.extend({}, settingsStyle2));
            playerBtn.inputEnabled = true;
            playerBtn.events.onInputOver.add(hoverInBtn, this);
            playerBtn.events.onInputOut.add(hoverOutBtn, this);
            playerBtn.events.onInputDown.add(function (btn) {
                pTween.stop();
                pTween = game.add.tween(pSelector);
                pTween.to({ x: btn.x - 50 }, 200, Phaser.Easing.Exponential.Out, true);
            }, this);
        }

    //    var computerDifficulties = game.add.group();

        game.add.text(Math.floor(config.width / 9), 690, 'COMPUTER:', $.extend({}, settingsStyle));
        var cSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 690, selectorBox);
        var difficulties = ['NONE', 'EASY', 'MEDIUM', 'HARD'];
        for (var i = 1; i <= 4; i++) {
            var computerBtn = game.add.text(Math.floor(config.width / 2) + 330*i, 710, difficulties[i],
                $.extend({}, settingsStyle2));
            computerBtn.inputEnabled = true;
            computerBtn.events.onInputOver.add(hoverInBtn, this);
            computerBtn.events.onInputOut.add(hoverOutBtn, this);
        }

        game.add.text(Math.floor(config.width / 9), 840, 'RESPAWN TIME:', $.extend({}, settingsStyle));
        var rSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 840, selectorBox);
        var times = [0, 3, 5, 10];
        for (var i = 1; i <= 4; i ++) {
            var respawnBtn = game.add.text(Math.floor(config.width / 2) + 330*i, 860, times[i],
                $.extend({}, settingsStyle2));
            respawnBtn.inputEnabled = true;
            respawnBtn.events.onInputOver.add(hoverInBtn, this);
            respawnBtn.events.onInputOut.add(hoverOutBtn, this);
        }

        game.add.text(Math.floor(config.width / 9), 990, 'KILLS TO WIN:', $.extend({}, settingsStyle));
        var kSelector = game.add.sprite(Math.floor(config.width / 2) - 50, 990, selectorBox);
        var kills = [10, 25, 50, 100];
        for (var i = 1; i <= 4; i++) {
            var killsBtn = game.add.text(Math.floor(config.width / 2) + 330*i, 1010, kills[i],
                $.extend({}, settingsStyle2));
            killsBtn.inputEnabled = true;
            killsBtn.events.onInputOver.add(hoverInBtn, this);
            killsBtn.events.onInputOut.add(hoverOutBtn, this);
        }
*/
        var playBtn = game.add.text(Math.floor(config.width / 4), 1200, 'PLAY', $.extend({}, btnConfig));
        playBtn.anchor.set(0.5,0.5);
        playBtn.inputEnabled = true;
        playBtn.events.onInputOver.add(hoverInBtn, this);
        playBtn.events.onInputOut.add(hoverOutBtn, this);
        playBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            //setup
            War.Game.prototype.totalPlayers = currentSettings[0];
            War.Game.prototype.difficulty = currentSettings[1];
            War.Game.prototype.respawnTime = currentSettings[2]*1000;
            War.Game.prototype.targetKills = currentSettings[3];
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