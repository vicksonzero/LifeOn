

/*global Ladder*/
/*global roonGenRules*/

var MAP_HEIGHT = 160;
var MAP_WIDTH = 480;
var LADDER_WIDTH = 36;
var CAMERA_SIZE = 400;
var FOLLOWER_POSITION_THERSOLD = 20;;

window.onload = function() {

	var game = new Phaser.Game(960,600,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate, render: render});

	// player object
	var player;
	// movement speed for player
	var playerSpeed = 150;
	var playerJumpSpeed = 150;
	var playerClimbSpeed = 10;
	var playerOnLadder = false;
	var playerScore = {
		intellect:0,
		health:100,
		family:0,
		money:0,
		stress:0
	};
	var stat = {
		stompPeople:0,
		rocketBook:0,
		playGames:0
	};
	var trophy = {
		"married": false,
		"house": false,
		"travel": false,
		"nasa": false,
	}
	var currentIndex = {
		x:0,
		y:2
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
	var enemyGroup;
	var characterGroup;
	var roomStartGroup;
	var bgGroup;
	var tutorialIsRuning = true;
	var tutorialEnemy,tutorialFood;
	var currentTutorialState = 0;
    var partner;

	function onPreload() {
		// bg
		game.load.image("schoolbackground","assets/bg/schoolbackground.png");
		
		
		
		
		// sprites
		game.load.image("platform180","assets/images/platform180.png");
		game.load.image("platform120","assets/images/platform120.png");
		game.load.image("startBox","assets/images/startBox.png");
		game.load.spritesheet("player","assets/images/MEN_YoungAdulthood - Merge -sprite sheet.png", 64, 64, 4);
		game.load.spritesheet("partner","assets/images/FemaleWalkCycleYoungAdulthoodmerge.png", 64, 64, 4);
		game.load.image("ground","assets/images/ground.png");
		game.load.image("bookGeneric","assets/images/props/book.png");

		/*global Phaser*/
		//Load Tiled map
		game.load.image('spriteSheet', 'assets/tiled/spriteSheet.png');
		game.load.image('food', 'assets/images/food.png');
		game.load.image('enemy', 'assets/images/food.png');
		game.load.spritesheet('character','assets/images/childhood_merge1spritesheet.png',64,64,2)
		game.load.atlas('ladderSheet', 'assets/tiled/spriteSheet.png', 'assets/tiled/spriteSheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	}

	function onCreate() {
		bgGroup = game.add.group();
		platformGroup = game.add.group();
		ladderGroup = game.add.group();
		foodGroup = game.add.group();
		roomStartGroup = game.add.group();
		enemyGroup = game.add.group();
		characterGroup = game.add.group();

		cursors = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		player = addPlayer(30,260);
		
		updateMap();
		
		// addFood(170,50);
		// addFood(40,50);
		// addFood(200,150);
		// addFood(170,250);

		// bind keys to handlers
		keyMap.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   		keyMap.left.onDown.add(goLeft, this);
		keyMap.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   		keyMap.right.onDown.add(goRight, this);
		keyMap.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   		keyMap.space.onDown.add(tryJump, this);


   		keyMap.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		keyMap.up.onDown.add(onInteraction, this);

	}

    function addPartner(posX, posY){
        var partner = game.add.sprite(posX, posY, "partner");
        partner.anchor.setTo(0.5);
        partner.animations.add('walk', [0,1], 60, true);
        partner.animations.add('stay', [1], 60, true);

        game.physics.enable(partner, Phaser.Physics.ARCADE);
        partner.body.setSize(32, 64, 0, 0);
        game.physics.arcade.gravity.y = 200;
        partner.isFollowing = true;
        return partner
    }

    function removePartner(posX, posY){
        partner.Destroy();
    }


	function onInteraction(){
		if (player.touchingCharacter) {
			player.touchingCharacter.onInteraction(
				player,
				function(){
					game.input.keyboard.enabled =true;
				}
			);
			switch(player.touchingCharacter.type){
				case "schoolmateWithHeart":
				case "crush":
					changePlayerScore("family", 20);
					if (!partner) addPartner(player.x,player.y);
					break;
				case "schoolmateWithGame":
				case "officeManWithGame":
					changePlayerScore("intellect", 2);
					changePlayerScore("stress", -2);
					changePlayerScore("family", -1);
					stat.playGames++;
					addPartner(player.x,player.y);
					break;
				case "gangsterWithDrug":
					changePlayerScore("health", -5);
					changePlayerScore("stress", -5);
					changePlayerScore("family", -5);
					break;
				case "themePark":
					changePlayerScore("money", -2);
					changePlayerScore("stress", -10);
					changePlayerScore("family", 10);
					break;
				case "baby":
					if (partner){
						changePlayerScore("family", 20);
						changePlayerScore("stress", -10);
					}
					break;
				case "doctor":
					changePlayerScore("health",20);
					break;
			}
			game.input.keyboard.enabled=false;
		}

	}

	// roomSet: array of roomDef{bg, props[{name, type, x, y}]}
	function addNewSetsOfRoom(roomSet){
		if(roomSet.length<=0){
			throw new Error("roomSet.length cannot be 0");
		}
		if(roomSet.length==1){
			// create one room if only one
			/*global Room*/
			/*global roomDef*/
			Room.create({x:currentIndex.x, y:currentIndex.y}, game, player, bgGroup, platformGroup, roomStartGroup, ladderGroup, roomDef[roomSet[0].name], false);
		}else{
			// 0 = up, 1 = keep level, 2 (optional)= down
			for(var i=0; i < roomSet.length; i++){
				Room.create({x:currentIndex.x, y:currentIndex.y - 1 + i}, game, player, bgGroup, platformGroup, roomStartGroup, ladderGroup, roomDef[roomSet[i].name], (i+1 < roomSet.length));
			}
			
		}
		currentIndex.x++;
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

	function addProp(propsDef, worldX, worldY, game) {
		console.log("prop")
        switch(propsDef.type){
            case "food":
                addFood(worldX, worldY,  propsDef.name, propsDef.lifetime);
                break;
            case "enemy":
                addEnemy(worldX, worldY, propsDef.name);
                break;
            case "character":
                addCharacter(worldX, worldY, propsDef.name, propsDef.lifetime);
                break;
	    };
    }
    window.addProp = addProp;
	
	function addFood(posX, posY, name, lifetime) {
		/*global Food*/
		var food = new Food(posX, posY, game, player, foodGroup, name);
		if (lifetime){
			food.setDuration(lifetime);
		}
	}

	function addEnemy(posX, posY, name) {
		var enemy = new Enemy(posX, posY, game, player, enemyGroup, name);
		return enemy.sprite;
	}

	function addCharacter(posX, posY, name, time){
		var character = new Character(posX, posY, game, player, characterGroup, name);
		character.setInteractionCallBack(function(){console.log("YES")})
		character.interactionTime = time || 1000;
	}

	function onUpdate() {
		player.body.allowGravity = true;
		player.body.velocity.x = 0;
		playerOnLadder = false;
		player.touchingCharacter=null;

		// collision
		game.physics.arcade.collide(player, platformGroup, movePlayer);
		game.physics.arcade.collide(player, layer, movePlayer);
		game.physics.arcade.collide(platformGroup, foodGroup);
		game.physics.arcade.collide(platformGroup, enemyGroup);
		game.physics.arcade.collide(platformGroup, characterGroup);
		game.physics.arcade.collide(platformGroup, partner);
        game.physics.arcade.overlap(player, enemyGroup, onCollideEnemy, null, this);
        game.physics.arcade.overlap(player, ladderGroup, onContactPlayer, null, this);
        game.physics.arcade.overlap(player, foodGroup, onCollideFood, null, this);
        game.physics.arcade.overlap(player, roomStartGroup, onCollideStartBox, null, this);
        game.physics.arcade.overlap(player, characterGroup, onCollideCharacter, null, this);

        if (tutorialIsRuning) {
        	if (runTutorial(currentTutorialState)){
        		currentTutorialState++;
        	}
        }

		// keep player from going before camera
		if(player.x < 12 || player.x < game.camera.x){
			player.x= Math.max(12,game.camera.x);
		}

        if (partner && partner.isFollowing){
            if (Math.abs(partner.x - player.x) > FOLLOWER_POSITION_THERSOLD) {
                partner.body.velocity.x = 150 * (partner.x > player.x? -1:1);
                partner.scale.x=(partner.x > player.x? -1:1);
                partner.animations.play('walk', 10, true);
            } else {
                partner.body.velocity.x = 0;
                partner.animations.play('stay', 10, true);
            }
            if (partner.isFollowing) {
                partner.y = player.y;
            }
        }

		game.camera.x = Math.max(player.x-CAMERA_SIZE/2,oldCameraX);
		oldCameraX = game.camera.x;
		game.camera.y = player.y-CAMERA_SIZE/2;
		if (game.input.keyboard.enabled){
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
		} else {
			playerSpeed=0;
		}
	    updateWorldBound();
	    //updateMap();
	}
	
	function onContactPlayer(player, whateverCheckDoc) {
		floatPlayer();
		playerOnLadder = true;
	}
	
	function onCollideFood(player, food) {
		switch(food.go.type){
			case "milkBottle":
				changePlayerScore("health", 1);
				break;
			case "toy":
				changePlayerScore("intellect", 2);
				changePlayerScore("stress", -2);
				break;

		}
		food.kill();
	}
	
	function onCollideStartBox(player, hit) {
		currentIndex.y = hit.roomY;
		updateMap();
		hit.destroy();
	}
	
	function onCollideEnemy(player, enemy){
		switch(enemy.go.type){
			case "bookGeneric":
				changePlayerScore("intellect", 10);
				changePlayerScore("stress", 5);
				break;
			case "gangsterWithMoney":
				changePlayerScore("money", 5);
				changePlayerScore("intellect", -1);
				break;
			case "schoolmateWithGame":
				changePlayerScore("intellect", 2);
				changePlayerScore("stress", -2);
				changePlayerScore("family", -1);
				stat.playGames++;
				addPartner(player.x,player.y);
				break;
			case "Rocket":
				trophy.nasa=true;
				break;
		}
		if (enemy.body.touching.up && player.body.touching.down) {
			enemy.kill();
			console.log ("killed enemy" + enemy.go.type)
		}
	}

	function onCollideCharacter(player, character){
		player.touchingCharacter = character.go;
	}

	function changePlayerScore(key, val) {
		playerScore[key] += val;
		
		console.log("changePlayerScore", key, playerScore[key]);
		playerOnScoreChanged();
	}
	
	function playerOnScoreChanged() {
		if (playerScore.family < 10) {
			if (partner){
				removePartner();
			}
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
		var roomSet = generateNextRoomSet();
		console.log(roomSet);
		addNewSetsOfRoom(roomSet);
		
	}
	
	function generateNextRoomSet() {
		var result = [];
		var choices = game.rnd.integerInRange(2,3);

		var state = getStateObject();

		var candidates = {};
		/*global directorRules*/
		for(var i=0; i<directorRules.length; i++){
			var rule = directorRules[i];
			if(rule.condition(state) == true){
				// force result

				console.log(rule.mustHaveRooms);
				result = result.concat(rule.mustHaveRooms.map(function(elem){
					/*global roomDef*/
					return roomDef[elem.roomName];
				}));
				// fill if some spaces left
				choices = Math.min(choices,rule.maxRooms);



				return result;
			}
		}

		for(var j=0; j < choices; j++){
			if(j<result.length && result[j].roomName !== "empty") continue;
			result[j] = randomRoom();
		}


		return result;

		
		
	}

	function getStateObject(){
		return {
			currentIndex: currentIndex,
			playerScore: playerScore,
			stat: stat
		};
	}

	function randomRoom(){
		return roomDefArray[game.rnd.integerInRange(0,roomDefArray.length-1)];
	}

	function render() {
	    game.debug.cameraInfo(game.camera, 32, 32);

	}

	function runTutorial(state){
		game.input.keyboard.enabled=false;
		switch (state) {
			case 0 :
				player.body.velocity.x = 150;
			 	return( player.position.x > MAP_WIDTH + LADDER_WIDTH/2);
			case 1 :
				moveOnLadder("up");
			 	return( player.position.y < MAP_HEIGHT * 0.7);
			case 2 :
				moveOnLadder("right");
			 	return( player.position.y < MAP_HEIGHT * 0.75);
			case 3 :
				addCharacter(player.position.x, player.position.y-50,"character");
				player.loadTexture('partner');
				tutorialEnemy = addEnemy(player.position.x+200, player.position.y-50, "bookGeneric");
				return true;
			case 4 :
				player.body.velocity.x = 150;
			 	return( player.position.x >=  tutorialEnemy.position.x-20);
			case 5 :
				player.body.velocity.y = -150;
			 	return( player.position.y < MAP_HEIGHT*0.75);
			case 6 :
				player.body.velocity.x = 150;
			 	return( player.position.x >= tutorialEnemy.position.x);
			case 7 :
				player.body.velocity.x = 0;
				addFood(player.position.x+150, player.position.y-50,"milkBottle",4000);
			 	return true;
			case 8 :
			 	return( player.position.y > 119);
			case 9 :
				player.body.velocity.x = 150;
				return (player.position.x > MAP_WIDTH*2.5)
		}
		tutorialIsRuning = false;
		game.input.keyboard.enabled=true;
	}

};


/*
[
{canGo:bool, roomID:int},
{canGo:bool, roomID:int},
{canGo:bool, roomID:int}

]



*/