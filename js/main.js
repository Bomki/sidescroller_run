var game = new Phaser.Game(1360, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
 
    game.load.image("player", "assets/player.png");
    game.load.image("enemy", "assets/enemy.png");
    game.load.image("ground", "assets/ground.png");
    game.load.image("platform", "assets/platform.png");
    game.load.image("itemBigger", "assets/itemBigger.png");
 
}

var player;
var enemy;
var enemy2;
var ground;
var singlePlatform;
var platformsGroup;
var cursors;
var jumpButton;
var dashButton;
var itemsGroup;
var itemBigger;
var playerIsBig;

 
function create() {
    
    // make the world larger than the displayed canvas
    game.world.setBounds(0, 0, 13600, 768);
    
    // change the background color of the displayed game canvas
	game.stage.backgroundColor = '#050039';
    
    enemy2 = game.add.sprite(2800,600,"enemy");
    enemy2.scale.setTo(6,1);
    
    // add ground to the game canvas
    ground = game.add.sprite(0,704,"ground");
    
    // make the ground ten times wider to fit the world bounds
    ground.scale.setTo(10, 1);
    
    // make the ground immovable, so it doesn't move when things fall on it
    ground.body.immovable = true;
    
    // make the player a sprite
    player = game.add.sprite(100,500, "player");
    // make the player collide with the bounds of the world
    player.body.collideWorldBounds = true;
    // add gravity to the player, so he falls down when in the air
    player.body.gravity.y = 25;
    // set the playerIsBig boolean to it's default false value
    playerIsBig = false;
    
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
    
    singlePlatform = platformsGroup.create(4800,625,"platform");
    singlePlatform.body.immovable = true;
    
    singlePlatform = platformsGroup.create(5800,625,"platform");
    singlePlatform.body.immovable = true;
    
    // create a group for all the items in the game
    itemsGroup = game.add.group();
    
    // add an item to the game that makes the player bigger
    itemBigger = itemsGroup.create(3900,625,"itemBigger");
    
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
    
    // make the player stop when there's no input
    player.body.velocity.x = 0;
    
    
    
    // make the player move right when pressing the right cursor
    if(cursors.right.isDown){
        player.body.velocity.x = 250;
        // make the player move faster when the dashButton is pressed
        if(dashButton.isDown){
            player.body.velocity.x = 400;
        }
    }
    
    // make the player move left when pressing the left cursor
    if(cursors.left.isDown){
        player.body.velocity.x = -250;
        // make the player move faster when the dashButton is pressed
        if(dashButton.isDown){
            player.body.velocity.x = -400;
        }
    }
    
    // make the player jump if the jumpButton is pressed  
    if (jumpButton.isDown && player.body.touching.down){
        player.body.velocity.y = -600;
    }
    
    if(game.physics.overlap(player, itemBigger)){
        itemBigger.destroy();
        player.scale.setTo(2,1);
        playerIsBig = true;
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
    
}