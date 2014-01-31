var game = new Phaser.Game(1360, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
 
    //game.load.image("player", "assets/player.png");
    game.load.image("enemy", "assets/enemy.png");
    game.load.image("ground", "assets/ground.png");
    game.load.image("platform", "assets/platform.png");
    game.load.image("itemBigger", "assets/itemBigger.png");
    game.load.image("itemHigher", "assets/itemHigher.png");
    game.load.image("ladder", "assets/ladder.png");
    game.load.spritesheet("playerSheet", "assets/playerSheet.png", 64, 128);
 
}

var player;
var jumpForce;
var jumpForceDef;
var enemy;
var enemy2;
var enemy3;
var ground;
var singlePlatform;
var platformsGroup;
var ladder;
var cursors;
var jumpButton;
var itemsGroup;
var itemBigger;
var itemHigher;
var itemHigherStored;
var playerIsBig;
var playerIsClimbing;
var applyGravity;

 
function create() {
    
    // make the world larger than the displayed canvas
    game.world.setBounds(0, 0, 13600, 768);
    
    // change the background color of the displayed game canvas
	game.stage.backgroundColor = '#050039';
    
    enemy2 = game.add.sprite(2800,600,"enemy");
    enemy2.scale.setTo(6,1);
    
    enemy3 = game.add.sprite(4500,600,"enemy");
    enemy3.scale.setTo(9,1);
    
    // add ground to the game canvas
    ground = game.add.sprite(0,704,"ground");
    
    // make the ground ten times wider to fit the world bounds
    ground.scale.setTo(10, 1);
    
    // make the ground immovable, so it doesn't move when things fall on it
    ground.body.immovable = true;
    
    // add a ladder to the game
    ladder = game.add.sprite(4400,192,"ladder");
    
    // make the player a sprite
    player = game.add.sprite(100,500, "playerSheet");
    // make the player collide with the bounds of the world
    player.body.collideWorldBounds = true;
    // give the applyGravity boolean it's default value of true
    applyGravity = true;
    // give the playerIsClimbing boolean it's default value of false
    playerIsClimbing = false;
    // add gravity to the player, so he falls down when in the air
    player.body.gravity.y = 25;
    // give jumpForce a value
    jumpForce = -600;
    // save a copy of the jumpForce value in the jumpForceDef variable
    jumpForceDef = jumpForce;
    // set the playerIsBig boolean to it's default false value
    playerIsBig = false;
    // create animation from the preloaded spritesheet for the player
    player.animations.add("normal",[0,1],15, true);
    
    // make the enemy a sprite
    enemy = game.add.sprite(4000,500,"enemy");
    // make the enemy collide with the bounds of the world
    enemy.body.collideWorldBounds = true;
    // add gravity to the enemy, so he falls down when in the air
    enemy.body.gravity.y = 25;
    
    // create a group for all platforms
    platformsGroup = game.add.group();
    
    // add some platforms to the game
    singlePlatform = platformsGroup.create(1100,625,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(1900,625,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(2200,525,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(2500,425,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(3000,325,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(4600,525,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(5800,625,"platform");
    singlePlatform.body.immovable = true;
    
    // create a group for all the items in the game
    itemsGroup = game.add.group();
    
    // add an item to the game that makes the player bigger
    itemBigger = itemsGroup.create(3900,625,"itemBigger");
    
    // add an item to the game that makes the player jump higher
    itemHigher = itemsGroup.create(2600,350,"itemHigher");
    
    // give the boolean to see if itemHigher is available the value of false
    itemHigherStored = false;
    
    // give the cursors variable Phaser's cursor keys values
    cursors = game.input.keyboard.createCursorKeys();

    // make the jumpButton variable the value of spacebar
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // make the dashbutton variable the value of "s"
    dashButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    
    // make the camera follow the player
    game.camera.follow(player);

}

function update() {
    
    // make the player collide with the ground so he doesn't fall through it
    game.physics.collide(player, ground);
    
    // make the player collide with the platforms out of the same reason stated for ground
    game.physics.collide(player, platformsGroup);
    
    // make the enemy collide with the ground so he doesn't fall through it
    game.physics.collide(enemy, ground);
    
    // make the player stop when there's no input and he's in the air or climbing
    if(player.body.touching.down || playerIsClimbing){
        player.body.velocity.x = 0;
    }
    
    if(applyGravity){
        player.body.gravity.y = 25;
    }
    if(playerIsClimbing){
        player.body.gravity.y = 0;
    }
    else{
        player.body.gravity.y = 25;
    }
    
    // make the player move right when pressing the right cursor
    if(cursors.right.isDown){
        player.body.velocity.x = 300;
        player.animations.play("normal");
    }
    
    // make the player move left when pressing the left cursor
    else if(cursors.left.isDown){
        player.body.velocity.x = -300;
            player.animations.play("normal");
    }
    
    else{
        player.animations.stop();
        player.frame = 0;
    }
    
    // make the player jump if the jumpButton is pressed  
    if (jumpButton.isDown && player.body.touching.down){
        player.body.velocity.y = jumpForce;
        if(itemHigherStored){
            itemHigherStored = false;
            jumpForce = jumpForceDef;
        }
    }
    
    if(game.physics.overlap(player, itemBigger)){
        itemBigger.destroy();
        player.scale.setTo(2,1);
        playerIsBig = true;
    }
    
    if(game.physics.overlap(player, itemHigher)){
        itemHigher.destroy();
        itemHigherStored = true;
        jumpForce = -1200;
    }
    
    if(game.physics.overlap(player, enemy)){
        if(playerIsBig){
            enemy.destroy();
            player.scale.setTo(1,1);
        }
        else{
            player.destroy();
        }
    }
    
    if(game.physics.overlap(player, enemy2)){
            player.destroy();
        }
    
    if(game.physics.overlap(player, enemy3)){
            player.destroy();
        }
    
    // the player can climb if he overlaps with a ladder
    if(game.physics.overlap(player, ladder)){
        playerIsClimbing = true;
        applyGravity = false;
        player.body.velocity.y = 0;
        if(jumpButton.isDown){
            player.body.velocity.y = jumpForce;
            player.body.velocity.x = 300;
        }
        
        else if(jumpButton.isDown && cursors.left.isDown){
            player.body.velocity.y = jumpForce;
            player.body.velocity.x = -300;
        }
        
        else if(cursors.up.isDown){
            player.body.velocity.y = -75;

        }
        else if(cursors.down.isDown){
            player.body.velocity.y = 250;

        }
    }
    
    else{
        playerIsClimbing = false;
        applyGravity = true;
    }
    
}