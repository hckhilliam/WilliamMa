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

        game.load.image('batSkin', 'images/War/batBall.png');
        game.load.image('blackSkin', 'images/War/blackBall.png');
        game.load.image('blueSkin', 'images/War/blueBall.png');
        game.load.image('cookieSkin', 'images/War/cookieBall.png');
        game.load.image('cyanSkin', 'images/War/cyanBall.png');
        game.load.image('electricSkin', 'images/War/electricBall.png');
        game.load.image('fireSkin', 'images/War/fireBall.png');
        game.load.image('greenSkin', 'images/War/greenBall.png');
        game.load.image('happySkin', 'images/War/happyBall.png');
        game.load.image('loveSkin', 'images/War/loveBall.png');
        game.load.image('magentaSkin', 'images/War/magentaBall.png');
        game.load.image('marineSkin', 'images/War/marineBall2.png');
        game.load.image('minionSkin', 'images/War/minionBall.png');
        game.load.image('moneySkin', 'images/War/moneyBall.png');
        game.load.image('ninjaSkin', 'images/War/ninjaBall.png');
        game.load.image('pokeSkin', 'images/War/pokeBall.png');
        game.load.image('redSkin', 'images/War/redBall.png');
        game.load.image('richSkin', 'images/War/richBall.png');
        game.load.image('sadSkin', 'images/War/sadBall.png');
        game.load.image('enemySkin', 'images/War/skullBall.png');
        game.load.image('slimeSkin', 'images/War/slimeBall.png');
        game.load.image('superSkin', 'images/War/superBall.png');
        game.load.image('superHappySkin', 'images/War/superHappyBall.png');
        game.load.image('yellowSkin', 'images/War/yellowBall.png');
        game.load.image('zealotSkin', 'images/War/zealotBall.png');
        game.load.image('zergSkin', 'images/War/zergBall.png');
},
    create: function () {
        game.state.start('Game');
    }
};