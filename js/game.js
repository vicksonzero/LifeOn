window.onload = function() {

	var game = new Phaser.Game(400,400,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate, render: render});

	var playerSpeed = 150;
	var player;
	var platformGroup;
	var oldCameraX = 0;
	var cursors = null;
	var layer;
	var keyMap = {};

	function onPreload() {
		game.load.image("platform180","./img/platform180.png");
		game.load.image("platform120","./img/platform120.png");
		game.load.image("player","./img/player.png");
		game.load.image("ground","./img/ground.png");
		/*global Phaser*/
		game.load.tilemap("gameMap", "./assets/tiled/level.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image('level', 'assets/tiled/level.png');
		game.load.image('coin', 'assets/tiled/coin.png');
	}

	function onCreate() {
		//http://phaser.io/examples/v2/loader/load-tilemap-json
		var map = game.add.tilemap('gameMap');
		map.addTilesetImage('level', 'level');
		map.setCollisionBetween(1, 300, true, 'Foreground');
		map.addTilesetImage('coin', 'coin');
		map.createLayer('Background');
		layer = map.createLayer('Foreground');

		cursors = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = game.add.sprite(240, 0, "player");
		player.anchor.setTo(0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 150;
		platformGroup = game.add.group();
		keyMap.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   		keyMap.left.onDown.add(goLeft, this);
		keyMap.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   		keyMap.right.onDown.add(goRight, this);
		keyMap.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   		keyMap.space.onDown.add(jump, this);
		keyMap.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   		keyMap.up.onDown.add(jump, this);
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

	function onUpdate() {
		player.body.velocity.x = 0;

		// collision
		game.physics.arcade.collide(player, platformGroup, movePlayer);
		game.physics.arcade.collide(player, layer, movePlayer);

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

	function movePlayer(){
		player.body.velocity.x = playerSpeed;
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
	
	function updateWorldBound() {
		
	}
	
	function updateMap() {
		
	}

	function render() {

	    game.debug.cameraInfo(game.camera, 32, 32);

	}

};