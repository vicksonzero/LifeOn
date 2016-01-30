
/* global Phaser*/
/* global player*/

var Food = (function () {
    function Food(startX, startY, game, player, group){
        this.sprite = game.add.sprite(startX, startY, "food");
        
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
		
        Food.foods.push(this);
    }
    
    Food.foods = [];
    
    
    
    var p = Food.prototype;
    function onContactPlayer(argument) {
        // body...
    }
    
    
    return Food;
})();
