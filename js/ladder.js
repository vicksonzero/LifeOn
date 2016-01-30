
/* global Phaser*/

var Ladder = (function () {
    function Ladder(game, spriteName, startX, startY){
        this.sprite = game.add.sprite(startX, startY, "ladderSheet", 1);
        
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		
		this.sprite.body.immovable = true;
        Ladder.ladders.push(this);
    }
    
    Ladder.ladders = [];
    
    
    
    var p = Ladder.prototype;
    
    
    
    return Ladder;
})();
