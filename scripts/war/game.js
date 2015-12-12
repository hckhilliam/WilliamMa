var PlayerEnum = {
    Player1: 1, //red
    Player2: 2, //blue
    Player3: 3, //green
    Player4: 4, //pink
    Computer: 5
};

var skins = [ 'marineSkin',
                'greenSkin',
                'batSkin',
                'diamondSkin',
                'electricSkin',
                'zergSkin',
                'zealotSkin',
                'skullSkin',
                'minionSkin',
                'ninjaSkin',
                'superSkin',
                'richSkin',
                'loveSkin',
                'moneySkin'
];

War.Game.prototype = {
    players: [],
    wallGroup: null,
    create: function () {

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // The player and its settings
        this.players = [];
        this.players.push(new Player(skins[Math.floor(Math.random()*skins.length)], PlayerEnum.Player1));
        this.players.push(new Player(skins[Math.floor(Math.random()*skins.length)], PlayerEnum.Player2));
        this.players.push(new Player(skins[Math.floor(Math.random()*skins.length)], PlayerEnum.Player3));
        this.players.push(new Player(skins[Math.floor(Math.random()*skins.length)], PlayerEnum.Player4));

        this.wallGroup = game.add.group();
        this.wallGroup.enableBody = true;
        this.wallGroup.physicsBodyType = Phaser.Physics.ARCADE;
        var leftWall = this.wallGroup.create(0, 0, null);
        leftWall.body.setSize(0, 1400, 0, 0);
        leftWall.body.immovable = true;
        var topWall = this.wallGroup.create(0, 0, null);
        topWall.body.setSize(2520, 0, 0, 0);
        topWall.body.immovable = true;
        var rightWall = this.wallGroup.create(2520, 0, null);
        rightWall.body.setSize(0, 1400, 0, 0);
        rightWall.body.immovable = true;
        var bottomWall = this.wallGroup.create(0, 1260, null);
        bottomWall.body.setSize(2520, 0, 0, 0);
        bottomWall.body.immovable = true;

        var wall = game.add.bitmapData(10,10);
        wall.rect(0, 0, 10, 10, '#ffffff');
        renderMap(this.wallGroup, wall, 70);

    },

    update: function () {
    //    console.log('upd');
        for (var i = 0; i < this.players.length; i++) {
            var currPlayer = this.players[i];
            currPlayer.update();
            var bullets = currPlayer.getBullets();
            var sprite = currPlayer.getSprite();
            game.physics.arcade.collide(bullets, this.wallGroup, currPlayer.envCollide);
            game.physics.arcade.collide(sprite, this.wallGroup);
            for (var j = 0; j < this.players.length; j++) {
                if (i != j) {
                    var bulletPlayer = this.players[j];
                    game.physics.arcade.collide(sprite, bulletPlayer.getBullets(), currPlayer.bulletCollide);
                }
            }
        }
    }
};

function renderMap(wallGroup, wall, snap) {
    //takes start and how many positions left and computes place of hole in positions
    function getRandomPos(refP, posLeft) {
        return refP + Math.floor(Math.random()*posLeft);
    }

    //function create all walls horizontally
    function createHWalls(startPos, endPos, constantPos, holes) {
        var newPos = startPos;
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];
            var prelimWidth = hole*snap;
            var width = 0;

            //if newPos is larger than the start of the next wall, we can just skip this wall as it will be 0, and continue the hole
            if (newPos < prelimWidth + startPos) {
                var newWall = wallGroup.create(newPos, constantPos, wall);
                newWall.width = prelimWidth - newPos + startPos;
                newWall.body.immovable = true;
                while (newPos + newWall.width > endPos) { newWall.width -= snap; }
                width = newWall.width;
            }

            //note this spacing of 2-6 or more could cause to overlap to next wall so we handle that in while loop above
            newPos = newPos + width + snap*(Math.floor(Math.random()*5)+2);
        }

        //if the hole didnt reach the end we create wall for rest
        if (newPos < endPos) {
            var endWall = wallGroup.create(newPos, constantPos, wall);
            endWall.width = endPos - newPos;
            endWall.body.immovable = true;
        }
    }

    //function create all walls vertically
    function createVWalls(startPos, endPos, constantPos, holes) {
        var newPos = startPos;
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];
            var prelimHeight = hole*snap;
            var height = 0;

            if (newPos < prelimHeight + startPos) {
                var newWall = wallGroup.create(constantPos, newPos, wall);
                newWall.height = prelimHeight - newPos + startPos;
                newWall.body.immovable = true;
                while (newPos + newWall.height > endPos) { newWall.height -= snap; }
                height = newWall.height;
            }

            newPos = newPos + height + snap*(Math.floor(Math.random()*5)+2);
        }

        if (newPos < endPos) {
            var endWall = wallGroup.create(constantPos, newPos, wall);
            endWall.height = endPos - newPos;
            endWall.body.immovable = true;
        }
    }

    //compare function for integers
    function cmp(a, b) {
        return a > b;
    }

    function recurse(start, end) {
        //Everything calculated will be done with positions first

        //we do not want walls to be placed on the edges (ex. position startX, startY or position endX, endY), so we subtract 5 from possibilities since holes are max size 4
        var positionsX = (end.x - start.x)/snap - 3;
        var positionsY = (end.y - start.y)/snap - 3;

        //base case the box is small enough that we cant place walls
        if (positionsX > 0 && positionsY > 0) {
            //calculate 2 walls intersection point
            var inter = {x: Math.floor(Math.random() * positionsX) + 2, y: Math.floor(Math.random() * positionsY) + 2};

            var actualInter = {x: start.x + inter.x * snap, y: start.y + inter.y * snap};
            //generate the holes
            var hHoles = [];
            var vHoles = [];
            //add hole on each side of intersection to guarantee an opening to any room
            hHoles.push(getRandomPos(0, inter.x - 1));
            hHoles.push(getRandomPos(inter.x, positionsX - inter.x + 2));
            vHoles.push(getRandomPos(0, inter.y - 1));
            vHoles.push(getRandomPos(inter.y, positionsY - inter.y + 2));

            //extra math just to get more holes in the map
            var extraHHoles = Math.ceil(positionsX/7);
            var extraVHoles = Math.ceil(positionsY/7);
            var scale = 0.5;
            var random = Math.random();
            while (true) {
                if (random > scale) break;
                else if (extraHHoles == 0) { random = Math.random(); scale = 0.5; }
                scale /= 2;
                extraHHoles--;
            }
            random = Math.random();
            scale = 0.5;
            while (true) {
                if (random > scale) break;
                else if (extraVHoles == 0) { random = Math.random(); scale = 0.5; }
                scale /= 2;
                extraVHoles--;
            }

            for (var i = 0; i < extraHHoles; i++) {
                hHoles.push(getRandomPos(0, positionsX));
            }
            for (var j = 0; j < extraVHoles; j++) {
                vHoles.push(getRandomPos(0, positionsY));
            }

            createHWalls(start.x, end.x, actualInter.y - 10, hHoles.sort(cmp));
            createVWalls(start.y, end.y, actualInter.x - 10, vHoles.sort(cmp));

            recurse({x: start.x, y: start.y}, {x: actualInter.x, y: actualInter.y});    //NW
            recurse({x: actualInter.x, y: start.y}, {x: end.x, y: actualInter.y});      //NE
            recurse({x: start.x, y: actualInter.y}, {x: actualInter.x, y: end.y});      //SW
            recurse({x: actualInter.x, y: actualInter.y}, {x: end.x, y: end.y});        //SE
        }
    }

    recurse({x: 0, y: 0}, {x: 2520, y: 1260});
}

function Player(skin, playerNum) {
    var radius = 30;
    var speed = 300;
    var bulletSpeed = 350;
    var bulletRadius = 10;
    var bulletTime = 0;
    var maxBounces = 1;
    var bullets = game.add.group();
    var bulletDrawing = game.add.bitmapData(bulletRadius*2, bulletRadius*2);
    var sprite;
    var gunDrawing = game.add.bitmapData(10, 5);
    var gun;
    var color;
    var cursors;



    this.getSprite = function() {
        return sprite;
    };

    this.getBullets = function() {
        return bullets;
    };

    this.addBullet = _addBullet;

    this.increaseBounces = _increaseBounces;

    this.bulletCollide = function (player, bullet) {
        if (sprite.alive) {
            sprite.kill();
            bullet.killEm();

            setTimeout(_revive, 5000);
        }
    };

    this.envCollide = function (bullet) {
        bullet.bounce();
    };

    this.update = function() {
        if (sprite.alive) {
            //movement controls
            if (cursors.left.isDown) {
                sprite.body.velocity.x = -speed;
            } else if (cursors.right.isDown) {
                sprite.body.velocity.x = speed;
            } else {
                sprite.body.velocity.x = 0;
            }
            if (cursors.up.isDown) {
                sprite.body.velocity.y = -speed;
            } else if (cursors.down.isDown) {
                sprite.body.velocity.y = speed;
            } else {
                sprite.body.velocity.y = 0;
            }

            //normalize speed when moving diagonally
            if (sprite.body.velocity.y != 0 && sprite.body.velocity.x != 0) {
                var evenVelocity = Math.sqrt(Math.pow(speed, 2) / 2);
                sprite.body.velocity.y = evenVelocity * sprite.body.velocity.y / speed;
                sprite.body.velocity.x = evenVelocity * sprite.body.velocity.x / speed;
            }

            //aiming gun controls
            if (cursors.rotateLeft.isDown) {
                gun.angle -= 3;
            } else if (cursors.rotateRight.isDown) {
                gun.angle += 3;
            }
        }
    };

    function _addBullet() {
        var bullet = new Bullet(bulletSpeed, bulletRadius, maxBounces, bulletDrawing);
        game.add.existing(bullet);
        bullets.add(bullet);
        bullet.initialize();
    }

    function _increaseBounces() {
        maxBounces++;
        for (var i = 0; i < bullets.children.length; i++) {
            bullets.children[i].updateMaxBounces(maxBounces);
        }
    }

    function construct() {
        var pos = _getRandomPos();
        sprite = game.add.sprite(pos.x, pos.y, skin);

        switch (playerNum) {
            case PlayerEnum.Player1:
                cursors = game.input.keyboard.addKeys({
                    'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S,
                    'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D, 'rotateLeft': Phaser.Keyboard.Q,
                    'rotateRight': Phaser.Keyboard.E, 'fire': Phaser.Keyboard.TWO
                });
                color = '#FF0000';
                //aiming gun
        //        $(document).mousemove(function () {
       //             $('#mousecoord').text('mouse: x: ' + game.input.mousePointer.x + ' y: ' + game.input.mousePointer.y);
          //          gun.angle = game.math.radToDeg(game.math.angleBetween(sprite.x + radius, sprite.y + radius, game.input.mousePointer.x, game.input.mousePointer.y))+90;
           //     });
                break;
            case PlayerEnum.Player2:
                cursors = game.input.keyboard.addKeys({
                    'up': Phaser.Keyboard.Y, 'down': Phaser.Keyboard.H,
                    'left': Phaser.Keyboard.G, 'right': Phaser.Keyboard.J, 'rotateLeft': Phaser.Keyboard.T,
                    'rotateRight': Phaser.Keyboard.U, 'fire': Phaser.Keyboard.SIX
                });
                color = '#66FFFF';
                break;
            case PlayerEnum.Player3:
                cursors = game.input.keyboard.addKeys({
                    'up': Phaser.Keyboard.P, 'down': Phaser.Keyboard.COLON,
                    'left': Phaser.Keyboard.L, 'right': Phaser.Keyboard.QUOTES, 'rotateLeft': Phaser.Keyboard.O,
                    'rotateRight': Phaser.Keyboard.OPEN_BRACKET, 'fire': Phaser.Keyboard.ZERO
                });
                color = '#00FF00';
                break;
            case PlayerEnum.Player4:
                cursors = game.input.keyboard.addKeys({
                    'up': Phaser.Keyboard.UP, 'down': Phaser.Keyboard.DOWN,
                    'left': Phaser.Keyboard.LEFT, 'right': Phaser.Keyboard.RIGHT, 'rotateLeft': Phaser.Keyboard.DELETE,
                    'rotateRight': Phaser.Keyboard.PAGE_DOWN, 'fire': Phaser.Keyboard.HOME
                });
                color = '#FF00FF';
                break;
        }

        gunDrawing.context.fillStyle = color;
        gunDrawing.context.fillRect(0, 0, 10, 10);
        gun = game.make.sprite(16, 16, gunDrawing);

        sprite.addChild(gun);
        gun.pivot.y = 23;
        gun.pivot.x = 5;
        sprite.width = radius*2;
        sprite.height = radius*2;
        game.physics.arcade.enable(sprite);

        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bulletDrawing.circle(bulletRadius, bulletRadius, bulletRadius, color);

        for (var i = 0; i < 3; i++) { _addBullet(); }

        //fire only happens once when holding
        cursors.fire.onDown.add(function () {
            if (game.time.now > bulletTime) {
                var bullet = bullets.getFirstExists(false);
                if (bullet) {
                    bullet.fire(gun.angle, sprite.x, sprite.y, radius);
                    bulletTime = game.time.now + 100;
                }
            }
        });
    }

    function _revive() {
        var randomPos = _getRandomPos();
        sprite.reset(randomPos.x, randomPos.y);
    }

    function _getRandomPos() {
        War.Game.prototype.players;// CONTINUE WORK HERE
        return  { x:Math.floor(Math.random()*(2520/70))*70, y:Math.floor(Math.random()*(1260/70))*70 };
    }

    construct();
}

function Bullet(s, r, b, bD) {
    var initialBounces = 0;
    var speed = s;
    var radius = r;
    var maxBounces = b;
    Phaser.Sprite.call(this, game, 0, 0, bD);

    this.initialize = function () {
        this.visible = false;
        this.exists = false;
        this.width = r*2;
        this.height = r*2;
        this.body.bounce.set(1);
    };

    this.bounce = function() {
        initialBounces++;
        if (initialBounces == maxBounces) {
            this.killEm();
        }
    };

    this.killEm = function() {
        initialBounces = 0;
        this.kill();
    };

    //calculate gunpoint and fire it away
    this.fire = function (angle, refX, refY, playerRadius) {
        var gunpointRadius = playerRadius - radius; //extra 11 px for the gun part of the player + bullet size
        var transformedTheta;
        //angle here goe from 0 to 179 starting at top middle, and then continues to -180 to 0.
        //we will transform it to a normal circle where you start at 0 on the right and go around to 360
        if (angle > 90) {
            //if angle is > 90, then we will be in the 270-360 zone, so we do 360 + 90 - angle to transform it
            transformedTheta = 450 - angle;
        } else {
            //otherwise, we do 90 - angle which will add when angle is negative and subtract when angle is positive
            transformedTheta = 90 - angle;
        }
        transformedTheta = game.math.degToRad(transformedTheta); //convert to radians

        //equation of a circle: x = rcos(theta), y = rsin(theta)
        //x and y are reference to top left point of bullet, and that bullet is in reference to top left point of the player, so have to center it
        var newX = gunpointRadius*Math.cos(transformedTheta);
        var newY = -gunpointRadius*Math.sin(transformedTheta);
        this.reset(newX + playerRadius - radius + refX, newY + playerRadius - radius + refY);
        this.body.velocity.x = speed*Math.cos(transformedTheta);
        this.body.velocity.y = -speed*Math.sin(transformedTheta);
    };

    this.updateMaxBounces = function (newBounces) {
        maxBounces = newBounces;
    };
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;