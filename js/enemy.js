
/* global Phaser*/
/* global player*/

var Enemy = (function () {
    function Enemy(startX, startY, game, player, group, hitGroup){
        this.sprite = game.add.sprite(startX, startY, "enemy");
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        //tmp
        var type =1;
        this.type=type;
		
		this.sprite.body.immovable = false;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
        
        this.sprite.go = this;
		
        Enemy.Enemys.push(this);
        // TODO effects
    }
    
    Enemy.Enemys = [];
    
    
    var p = Enemy.prototype;

    p.kill = function (){
        this.sprite.kill();
        this.hitBox.kill();
    }
    
    p.update = function (){
        this.sprite.kill();
        this.hitBox.kill();
    }
    
    return Enemy;
})();
