/**
 * Created by William on 19/01/2016.
 */
War.GameOver.prototype = {
    create: function () {
        game.add.text(Math.floor(config.width / 2), 100, 'GAME OVER', {
            font: '200px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5, 0);

        game.add.text(Math.floor(config.width / 2), 400, War.Game.prototype.winner + ' wins!', {
            font: '100px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5,0);

        var statsFont = {
            font: '75px Stencil',
            fill: '#99FFCC'
        };
        for (var i = 0; i < War.Game.prototype.players.length; i++) {
            var player = War.Game.prototype.players[i];
            var space = '';
            if (player.isHuman) space += '\t\t\t';
            game.add.text(Math.floor(3*config.width / 10), 550 + i*100, space + player.getPlayerNum() + ':',
                $.extend({}, statsFont)).anchor.set(0.5,0);
            game.add.text(Math.floor(config.width / 2), 550 + i*100, 'KILLS: ' + player.getKills(),
                $.extend({}, statsFont)).anchor.set(0.5,0);
            game.add.text(Math.floor(7*config.width / 10), 550 + i*100, 'DEATHS: ' + player.getDeaths(),
                $.extend({}, statsFont)).anchor.set(0.5,0);
            game.add.sprite(2150, 550 + i*100, game.add.bitmapData(75,75).rect(0, 0, 75, 75, player.getColour()));
        }

        var playBtn = game.add.text(Math.floor(config.width / 2), 1200, 'Menu', $.extend({}, btnConfig));
        //playBtn.setSize
        playBtn.anchor.set(0.5,0.5);
        playBtn.inputEnabled = true;
        playBtn.events.onInputOver.add(hoverInBtn, this);
        playBtn.events.onInputOut.add(hoverOutBtn, this);
        playBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('Menu');
        });
    }
};