

/*global Ladder*/

	
window.onload = function() {

	var game = new Phaser.Game(960,600,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate, render: render});

	var MAP_HEIGHT = 160;
	var MAP_WIDTH = 480;
	var LADDER_WIDTH = 36;
	var CAMERA_SIZE = 400;
	// player object
	var player;
	// movement speed for player
	var playerSpeed = 150;
	var playerJumpSpeed = 150;
	var playerClimbSpeed = 10;
	var playerOnLadder = false;
	var playerScore = {
		intel:0
	};
	var currentIndex = {
		x:0,
		y:1
	};
	var platformGroup;
	var oldCameraX = 0;
	// input object
	var cursors = null;
	var layer;
	// holder for key binding objects
	var keyMap = {};
	var ladderGroup;
	var foodGroup;
	var roomStartGroup;

	function onPreload() {
		game.load.image("platform180","assets/images/platform180.png");
		game.load.image("platform120","assets/images/platform120.png");
		game.load.image("startBox","assets/images/startBox.png");
		game.load.spritesheet("player","assets/images/FemaleWalkCycleYoungAdulthoodSpriteSheet.png", 64, 64, 4);
		game.load.image("ground","assets/images/ground.png");
		/*global Phaser*/
		//Load Tiled map
		game.load.image('spriteSheet', 'assets/tiled/spriteSheet.png');
		game.load.image('food', 'assets/images/food.png');
		
		game.load.atlas('ladderSheet', 'assets/tiled/spriteSheet.png', 'assets/tiled/spriteSheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	}

	function onCreate() {
		platformGroup = game.add.group();
		ladderGroup = game.add.group();
		foodGroup = game.add.group();
		roomStartGroup = game.add.group();

		cursors = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = addPlayer(30,200);
		addFood(170,50);
		addFood(40,50);
		addFood(200,150);
		addFood(170,250);

		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * (currentIndex.y - 1)), currentIndex.x, currentIndex.y - 1, false)
		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * currentIndex.y), currentIndex.x, currentIndex.y, false);
		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * (currentIndex.y + 1)), currentIndex.x, currentIndex.y + 1, false);
		currentIndex.x++;

		// bind keys to handlers
		keyMap.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   		keyMap.left.onDown.add(goLeft, this);
		keyMap.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   		keyMap.right.onDown.add(goRight, this);
		keyMap.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   		keyMap.space.onDown.add(tryJump, this);
		keyMap.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   		keyMap.up.onDown.add(tryJump, this);
   		
    	game.world.setBounds(-2000, -2000, 4000, 4000);
	}

	function addNewSetsOfRoom(){
		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * (currentIndex.y - 1)), currentIndex.x, currentIndex.y - 1, true)
		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * currentIndex.y), currentIndex.x, currentIndex.y, true);
		addRoom(currentIndex.x*MAP_WIDTH,(MAP_HEIGHT * (currentIndex.y + 1)), currentIndex.x, currentIndex.y + 1, false);
		currentIndex.x++;
	}

	function addRoom(x,y,roomX, roomY, ladder){
		if (ladder) {
			addLadder(x,y+150,3);
		}
		addPlatform(x+MAP_WIDTH/2,y+MAP_HEIGHT,'ground');
        startBox = game.add.sprite(x + LADDER_WIDTH * 1.1 + CAMERA_SIZE*1.1/2, y, "startBox", 1);
		game.physics.enable(startBox, Phaser.Physics.ARCADE);
		startBox.body.immovable = true;
		startBox.body.allowGravity = false;
		startBox.roomX=roomX;
		startBox.roomY=roomY;
		roomStartGroup.add(startBox);
	}
	
	function addPlayer(posX, posY) {
		
		var player = game.add.sprite(posX, posY, "player");
		player.anchor.setTo(0.5);
		player.animations.add('walk', [0,1], 60, true);
		player.animations.add('stay', [1], 60, true);
		
		game.physics.enable(player, Phaser.Physics.ARCADE);
    	player.body.setSize(32, 64, 0, 0);
		game.physics.arcade.gravity.y = 200;
		
		return player;
	}

	function addPlatform(posX,posY,asset){
		var platform = game.add.sprite(posX,posY,asset);
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
	
	function addFood(posX, posY) {
		new Food(posX, posY, game, player, foodGroup);
	}

	function onUpdate() {
		player.body.allowGravity = true;
		player.body.velocity.x = 0;
		playerOnLadder = false;

		// collision
		game.physics.arcade.collide(player, platformGroup, movePlayer);
		game.physics.arcade.collide(player, layer, movePlayer);
		game.physics.arcade.collide(platformGroup, foodGroup);
        game.physics.arcade.overlap(player, ladderGroup, onContactPlayer, null, this);
        game.physics.arcade.overlap(player, foodGroup, onCollideFood, null, this);
        game.physics.arcade.overlap(player, roomStartGroup, onCollideStartBox, null, this);
		
		// keep player from falling out of world
		if(player.y>game.height){
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
		game.camera.x = Math.max(player.x-CAMERA_SIZE/2,oldCameraX);
		oldCameraX = game.camera.x;
		game.camera.y = player.y-CAMERA_SIZE/2;
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
	    	moveOnLadder("left");
	    	movePlayer();
	    	goLeft();
	    }
	    else if (cursors.right.isDown)
	    {
	    	moveOnLadder("right");
	    	movePlayer();
	    	goRight();
	    }
	    else
	    {
	    	playerSpeed = 0;
			player.animations.play('stay', 10, true);
	    }
	    updateWorldBound();
	    updateMap();
	}
	
	function onContactPlayer(player, whateverCheckDoc) {
		floatPlayer();
		playerOnLadder = true;
	}
	
	function onCollideFood(player, food) {
		switch(food.go.type){
			case "food":
				changePlayerScore("intel", playerScore.intel + 1);
				break;
		}
		food.kill();
		
	}
	
	function onCollideStartBox(player, hit) {
		console.log("hit")
		currentIndex.y = hit.roomY;
		addNewSetsOfRoom();
		hit.kill();
	}
	

	function changePlayerScore(key, val) {
		playerScore[key] = val;
		
		console.log(key, playerScore[key]);
		playerOnScoreChanged();
	}
	
	function playerOnScoreChanged() {
		if(playerScore.intel>=2){
			player.loadTexture('food');
		}
	}

	function movePlayer(){
		player.body.velocity.x = playerSpeed;
	}
	
	function moveOnLadder(direction) {
		if(!playerOnLadder) 
		{
			player.body.enable=true;
			return;
		}
		player.body.enable=false;
		switch(direction){
			case "up":
				player.position.y -= playerClimbSpeed;
				break;
			case "down":
				player.position.y += playerClimbSpeed;
				break;
			case "left":
				player.position.x -= playerClimbSpeed;
				break;
			case "right":
				player.position.x += playerClimbSpeed;
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
		player.animations.play('walk', 10, true);
	}

	function goRight(){
		playerSpeed = Math.abs(150);
		player.animations.play('walk', 10, true);
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
		return player.body.touching.down && true;
	}
	
	
	function updateWorldBound() {
    	game.world.setBounds(player.x - 2000, player.y - 2000, 4000, 4000);
	}
	
	function updateMap() {
		
	}

	function render() {
	    game.debug.cameraInfo(game.camera, 32, 32);

	}

};



/*
[
{canGo:bool, roomID:int},
{canGo:bool, roomID:int},
{canGo:bool, roomID:int}

]



*/