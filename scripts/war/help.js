/**
 * Created by William on 19/01/2016.
 */
War.Help.prototype = {
    create: function () {
        game.add.text(Math.floor(config.width / 2), 100, 'HELP', {
            font: '400px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        }).anchor.set(0.5, 0);

        game.add.text(Math.floor(config.width / 2), 600, 'Fight against up to 3 other players and a computer in an arena.',
            {
                font: '40px Stencil',
                fill: '#99FFCC',
                fontStyle: 'bold'
            }).anchor.set(0.5, 0);


        game.add.text(40, 750, 'CONTROLS:', {
            font: '60px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        });
        game.add.sprite(0, 820,
            game.add.bitmapData(config.width, 5).rect(0, 0, config.width, 5, '#99FFCC'));

        var fontStyle = {
            font: '40px Stencil',
            fill: '#99FFCC',
            fontStyle: 'bold'
        };
        game.add.text(Math.floor(config.width / 8), 850, 'PLAYER 1: \n' +
                                                            'Arrow keys to move\n' +
                                                            'Del/PDown to rotate gun\n' +
                                                            'Home to fire', $.extend({}, fontStyle)).anchor.set(0.5,0);
        game.add.text(Math.floor(3*config.width / 8), 850, 'PLAYER 2: \n' +
                                                            'WASD to move\n' +
                                                            'Q/E to rotate gun\n' +
                                                            '2 to fire', $.extend({}, fontStyle)).anchor.set(0.5,0);
        game.add.text(Math.floor(5*config.width / 8), 850, 'PLAYER 3: \n' +
                                                            'YGHJ to move\n' +
                                                            'T/U to rotate gun\n' +
                                                            '6 to fire', $.extend({}, fontStyle)).anchor.set(0.5,0);
        game.add.text(Math.floor(7*config.width / 8), 850, 'PLAYER 4: \n' +
                                                            'PL;\' to move\n' +
                                                            'O/[ to rotate gun\n' +
                                                            '0 to fire', $.extend({}, fontStyle)).anchor.set(0.5,0);
        game.add.sprite(Math.floor(config.width / 8) + 250, 850, game.add.bitmapData(40,40).rect(0, 0, 40, 40, '#FF0000'));
        game.add.sprite(Math.floor(3*config.width / 8) + 250, 850, game.add.bitmapData(40,40).rect(0, 0, 40, 40, '#FF00FF'));
        game.add.sprite(Math.floor(5*config.width / 8) + 250, 850, game.add.bitmapData(40,40).rect(0, 0, 40, 40, '#66FFFF'));
        game.add.sprite(Math.floor(7*config.width / 8) + 250, 850, game.add.bitmapData(40,40).rect(0, 0, 40, 40, '#00FF00'));


        var backBtn = game.add.text(Math.floor(config.width / 2), 1200, 'BACK', $.extend({}, btnConfig));
        backBtn.anchor.set(0.5,0.5);
        backBtn.inputEnabled = true;
        backBtn.events.onInputOver.add(hoverInBtn, this);
        backBtn.events.onInputOut.add(hoverOutBtn, this);
        backBtn.events.onInputDown.add(function () {
            game.canvas.style.cursor = "default";
            game.state.start('Menu');
        });
    }
};