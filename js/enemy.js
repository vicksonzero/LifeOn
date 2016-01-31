
/* global Phaser*/
/* global player*/

var Enemy = (function () {
    function Enemy(startX, startY, game, player, group, name){
        this.sprite = game.add.sprite(startX, startY, name);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        //tmp
        this.type=name;
		
		this.sprite.body.immovable = false;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
        
        this.sprite.go = this;
        // TODO effects
    }
    
    var p = Enemy.prototype;

    return Enemy;
})();
