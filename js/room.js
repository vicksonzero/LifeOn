
/* global Phaser*/
/* global player*/
/*global LADDER_WIDTH*/
/*global CAMERA_SIZE*/
/*global LADDER_WIDTH*/

var Room = (function () {
    function Room(currentIndex, game, player, bgGroup, platformGroup, roomStartGroup, ladderGroup, bgName, needLadder){
        
        var posX = Room.indexToCoordX(currentIndex);
        var posY = Room.indexToCoordY(currentIndex);
        // posX, posY in world coord
        this.x = posX;
        this.y = posY;
        this.sprite = game.add.sprite(posX, posY, bgName);
		bgGroup.add(this.sprite);
		// floor
		this.floor = Room.addPlatform(posX+MAP_WIDTH/2,posY+MAP_HEIGHT,'ground', game, platformGroup);
		
		if(needLadder) Room.addLadder(posX,posY+150,4, game, player, ladderGroup);


        this.startBox = game.add.sprite(posX + LADDER_WIDTH * 1.1 + CAMERA_SIZE*1.1/2, posY, "startBox", 1);
		game.physics.enable(this.startBox, Phaser.Physics.ARCADE);
		this.startBox.body.immovable = true;
		this.startBox.body.allowGravity = false;
		this.startBox.parentRoom = this;
		this.startBox.roomY = currentIndex.y;
		
		roomStartGroup.add(this.startBox);
		
		
        this.roomName = "Room";
        this.sprite.go = this;
        
        // TODO effects
    }
    
    Room.create = function create(currentIndex, game, player, bgGroup, platformGroup, roomStartGroup, ladderGroup, roomDef, needLadder) {
        console.log(roomDef);
        if(roomDef.name == "empty"){

        }
        //roomdef = {bg props name}
        var roomX = Room.indexToCoordX(currentIndex);
        var roomY = Room.indexToCoordY(currentIndex);
        console.log("HI 1");
        var result = new Room(currentIndex, game, player, bgGroup, platformGroup, roomStartGroup, ladderGroup, roomDef.bg, needLadder);
        
        var worldX
        var worldY;
        for(var i=0; i < roomDef.props.length; i++){
            /*global Props*/
            worldX = roomX + 480*(i+0.5)/roomDef.props.length;
            worldY = roomY + roomDef.props[i].y;
            addProp(roomDef.props[i], worldX, worldY, game);
        }
        result.roomName = roomDef.roomName;
        return result;
    };
    
	Room.indexToCoordX = function indexToCoordX(currentIndex){
		/*global MAP_WIDTH*/
		return MAP_WIDTH * currentIndex.x;
	}
	Room.indexToCoordY = function indexToCoordY(currentIndex){
		/*global MAP_HEIGHT*/
		return MAP_HEIGHT * (currentIndex.y - 1);
	}
	
	
	Room.addPlatform = function addPlatform(posX,posY,asset, game, platformGroup){
		var platform = game.add.sprite(posX,posY,asset);
		platform.anchor.setTo(0.5);
		game.physics.enable(platform, Phaser.Physics.ARCADE);
		platform.body.allowGravity = false;
		platform.body.immovable = true;
		platformGroup.add(platform);
		
		return platform;
	}
	Room.addLadder = function addLadder(posX, posY, height, game, player, ladderGroup){
		const LADDER_HEIGHT = 32;
		for(var i=0; i < height; i++){
			new Ladder(posX, posY + i * LADDER_HEIGHT, game, player, ladderGroup);
		}
	}
    
    
    
    var p = Room.prototype;
    
    
    
    return Room;
})();
