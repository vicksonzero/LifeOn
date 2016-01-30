

/*global Ladder*/

	
window.onload = function() {

	var game = new Phaser.Game(400,400,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate, render: render});

	// player object
	var player;
	var playerHair;
	// movement speed for player
	var playerSpeed = 150;
	var playerJumpSpeed = 150;
	var playerClimbSpeed = 100;
	var playerOnLadder = false;
	
	var platformGroup;
	var oldCameraX = 0;
	// input object
	var cursors = null;
	var layer;
	// holder for key binding objects
	var keyMap = {};
	var ladderGroup;

	function onPreload() {
		game.load.image("platform180","assets/images/platform180.png");
		game.load.image("platform120","assets/images/platform120.png");
		game.load.spritesheet("player","assets/images/FemaleWalkCycleYoungAdulthoodSpriteSheet.png", 64, 64, 4);
		game.load.image("ground","assets/images/ground.png");
		/*global Phaser*/
		//Load Tiled map
		game.load.tilemap("gameMap", "./assets/tiled/emptyRoom.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image('spriteSheet', 'assets/tiled/spriteSheet.png');
		
		game.load.atlas('ladderSheet', 'assets/tiled/spriteSheet.png', 'assets/tiled/spriteSheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	}

	function onCreate() {
		//Load the layers of tiled map as well as setting everything in the Collidable layer collidable with the player
		var map = game.add.tilemap('gameMap');
		platformGroup = game.add.group();
		ladderGroup = game.add.group();
		
		map.setCollisionBetween(1, 300, true, 'Collidable');
		map.addTilesetImage('spriteSheet', 'spriteSheet');
		map.createLayer('Background');
		layer = map.createLayer('Collidable');
		cursors = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = game.add.sprite(240, 0, "player");
		player.anchor.setTo(0.5);
		player.animations.add('walk', [2,3], 60, true);
		player.animations.play('walk', 10, true);

		playerHair = game.add.sprite(0, 0, "player");
		playerHair.anchor.setTo(0.5);
		playerHair.animations.add('fly', [0,1], 60, true);
		playerHair.animations.play('fly', 10, true);

		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 200;
		
		addLadder(192,0,3);

		// bind keys to handlers
		keyMap.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   		keyMap.left.onDown.add(goLeft, this);
		keyMap.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   		keyMap.right.onDown.add(goRight, this);
		keyMap.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   		keyMap.space.onDown.add(tryJump, this);
		keyMap.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   		keyMap.up.onDown.add(tryJump, this);
   		
    	game.world.setBounds(0, 0, 2000, 2000);
	}

	function addPlatform(posX,posY,asset){
		var platform = game.add.sprite(posX,posY,asset)
		platform.anchor.setTo(0.5);
		game.physics.enable(platform, Phaser.Physics.ARCADE);
		platform.body.allowGravity = false;
		platform.body.immovable = true;
		platformGroup.add(platform);
	}
	
	function addLadder(posX, posY, height){
		const LADDER_HEIGHT = 32;
		for(var i=0; i < height; i++){
			new Ladder(posX, posY + i * LADDER_HEIGHT, game, player, ladderGroup);
		}
	}

	function onUpdate() {
		player.body.allowGravity = true;
		player.body.velocity.x = 0;
		playerOnLadder = false;
		playerHair.x = player.x;
		playerHair.y = player.y;

		// collision
		game.physics.arcade.collide(player, platformGroup, movePlayer);
		game.physics.arcade.collide(player, layer, movePlayer);
        game.physics.arcade.overlap(player, ladderGroup, onContactPlayer, null, this);
		
		
		// keep player from falling out of world
		if(player.y>320){
			player.y = 0;
		}

		// keep player from going before camera
		if(player.x < 12 || player.x < game.camera.x){
			player.x= Math.max(12,game.camera.x);
		}
		// if(player.x>5000){
		// 	player.x=468;
		// 	playerSpeed*=-1;
		// }
		game.camera.x = Math.max(player.x-400/2,oldCameraX);
		oldCameraX = game.camera.x;
		game.camera.y = player.y-400/2;
		if (cursors.up.isDown)
	    {
	    	moveOnLadder("up");
	    }
	    else if (cursors.down.isDown)
	    {
	    	moveOnLadder("down");
	    }

	    if (cursors.left.isDown)
	    {
	    	movePlayer();
	    	goLeft();
	    }
	    else if (cursors.right.isDown)
	    {
	    	movePlayer();
	    	goRight();
	    }
	    else
	    {
	    	playerSpeed = 0;
	    }
	    updateWorldBound();
	    updateMap();
	}
	
	function onContactPlayer(player, whateverCheckDoc) {
		floatPlayer();
		playerOnLadder = true;
	}

	function movePlayer(){
		player.body.velocity.x = playerSpeed;
	}
	
	function moveOnLadder(direction) {
		if(!playerOnLadder) return;
		switch(direction){
			case "up":
				player.body.velocity.y = -1*playerClimbSpeed;
				break;
			case "down":
				player.body.velocity.y = playerClimbSpeed;
				break;
		}
	}
	
	function floatPlayer() {
		player.body.allowGravity = false;
		player.body.velocity.y = 0;
	}

	function changeDir(){
		playerSpeed *= -1;
	}

	function goLeft(){
		playerSpeed = Math.abs(150)*-1;
	}

	function goRight(){
		playerSpeed = Math.abs(150);
	}

	function jump(){
		player.body.velocity.y= -1*playerJumpSpeed;
	}
	
	function tryJump() {
		if(canJump()){
			jump();
		}
	}
	
	function canJump(){
		return player.body.onFloor() && true;
	}
	
	
	function updateWorldBound() {
		
	}
	
	function updateMap() {
		
	}

	function render() {

	    game.debug.cameraInfo(game.camera, 32, 32);

	}

};
