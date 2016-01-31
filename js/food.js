
/* global Phaser*/
/* global player*/
var Food = (function () {
    function Food(startX, startY, game, player, group, name){
        this.sprite = game.add.sprite(startX, startY, name);
        
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		
		this.sprite.body.immovable = false;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
        
        this.type =name;
        this.sprite.go = this;
		
        
        // TODO effects
    }
    var p = Food.prototype;

    p.setDuration= function(lifeTime){
        this.lifeTime = lifeTime;
        this.flashingTimer = setTimeout(function(){
            this.setDisappearingFlash(true);
        }.bind(this), Math.max(lifeTime-2000,0));
        setTimeout(function(){
            this.sprite.destroy();
        }.bind(this), Math.max(lifeTime,0));
    }

    p.setDisappearingFlash = function (isVisible){
        this.sprite.alpha =isVisible;
        this.flasingTimer = setTimeout(function(){
            this.setDisappearingFlash(!isVisible);
        }.bind(this),200);
    }

    return Food;
})();
