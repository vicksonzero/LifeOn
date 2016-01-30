
/* global Phaser*/
/* global player*/

var Food = (function () {
    function Food(startX, startY, game, player, group){
        this.sprite = game.add.sprite(startX, startY, "food");
        
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		
		this.sprite.body.immovable = false;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
        
        this.type = "food";
        this.sprite.go = this;
		
        
        // TODO effects
    }
    
    Food.create
    
    var p = Food.prototype;
    
    
    
    return Food;
})();
