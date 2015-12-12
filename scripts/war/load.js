/**
 * Created by William on 27/09/2015.
 */
var War = {
    Boot: function (game) {},
    Load: function (game) {},
    Menu: function (game) {},
    Game: function (game) {}
};

var w = 2300;
var h = 1000;

War.Boot.prototype = {
    preload: function() {
        game.stage.backgroundColor = '#444';
    },
    create: function() {
        this.game.state.start('Load');
    }
};

War.Load.prototype = {
    preload: function () {
        label2 = game.add.text(Math.floor(w / 2) + 0.5, Math.floor(h / 2) - 15 + 0.5, 'loading...', {
            font: '30px Arial',
            fill: '#fff'
        });
        game.scale.startFullScreen();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVeritcally = true;
        game.scale.refresh();

        game.stage.disableVisibilityChange = true;
        // Load the bird sprite
        //game.load.image('enemy1', 'images/blockerMad.png');
        //game.load.image('grassMid', 'images/grassMid.png');
        //game.load.image('grassLeft', 'images/grassLeft.png');
       // game.load.image('grassRight', 'images/grassRight.png');
      //  game.load.image('grassCliffLeft', 'images/grassCliffLeft.png');
     //   game.load.image('grassCliffRight', 'images/grassCliffRight.png');
    //    game.load.tilemap('map', 'images/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
     //   game.load.spritesheet('player', 'images/player.png', 32, 48);

        game.load.image('marineSkin', 'images/marineBall2.png');
        game.load.image('greenSkin', 'images/greenBall.png');
        game.load.image('batSkin', 'images/batBall.png');
        game.load.image('diamondSkin', 'images/diamondBall.png');
        game.load.image('electricSkin', 'images/electricBall.png');
        game.load.image('zergSkin', 'images/zergBall.png');
        game.load.image('zealotSkin', 'images/zealotBall.png');
        game.load.image('skullSkin', 'images/skullBall.png');
        game.load.image('minionSkin', 'images/minionBall.png');
        game.load.image('ninjaSkin', 'images/ninjaBall.png');
        game.load.image('superSkin', 'images/superBall.png');
        game.load.image('richSkin', 'images/richBall.png');
        game.load.image('loveSkin', 'images/loveBall.png');
        game.load.image('moneySkin', 'images/moneyBall.png');
},
    create: function () {
        game.state.start('Game');
    }
};