War.Menu.prototype = {
    create: function () {
        game.add.text(Math.floor(config.width / 2), 100, 'WAR', {
            font: '400px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5, 0);

        var playBtn = game.add.text(Math.floor(config.width / 4), 1000, 'PLAY', $.extend({}, btnConfig));
        playBtn.anchor.set(0.5,0.5);
        playBtn.inputEnabled = true;
        playBtn.events.onInputOver.add(hoverInBtn, this);
        playBtn.events.onInputOut.add(hoverOutBtn, this);
        playBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('Settings');
        });

        var instructionsBtn = game.add.text(Math.floor(3*config.width / 4), 1000, 'HELP', $.extend({}, btnConfig));
        instructionsBtn.anchor.set(0.5,0.5);
        instructionsBtn.inputEnabled = true;
        instructionsBtn.events.onInputOver.add(hoverInBtn, this);
        instructionsBtn.events.onInputOut.add(hoverOutBtn, this);
        instructionsBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('Help');
        });
    }
};

//loading screen
War.StartGame.prototype = {
    preload: function () {
        game.add.text(Math.floor(config.width / 2), Math.floor(config.height / 2), 'Loading...', {
            font: '100px Stencil',
            fill: '#99FFCC'
        }).anchor.set(0.5, 0.5);
    },
    create: function () {
        game.state.start('Game');
    }
};

