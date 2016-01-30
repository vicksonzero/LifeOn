

/*global Ladder*/

	
window.onload = function() {

	var game = new Phaser.Game(400,400,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate, render: render});

	// player object
	var player;
	// movement speed for player
	var playerSpeed = 150;
	
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
		game.load.image("player","assets/images/player.png");
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
		
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 150;
		
		
		addLadder(0,0,3);

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
		console.log("hi");
		const LADDER_HEIGHT = 32;
		for(var i=0; i < height; i++){
			new Ladder(posX, posY + i * LADDER_HEIGHT, game, player);
		}
	}

	function onUpdate() {
		player.body.velocity.x = 0;

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
	    	//go up stair
	    }
	    else if (cursors.down.isDown)
	    {
	    	//go down stair
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
		console.log("hi");
	}

	function movePlayer(){
		player.body.velocity.x = playerSpeed;
	}
	
	function floatPlayer() {
		player.bdy.velocity.y = 0;
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
		player.body.velocity.y=-150;
	}
	
	function tryJump() {
		if(canJump()){
			player.body.velocity.y=-150;
		}
	}
	
	function canJump(){
		return true;
	}
	
	function updateWorldBound() {
		
	}
	
	function updateMap() {
		
	}

	function render() {

	    game.debug.cameraInfo(game.camera, 32, 32);

	}

};
