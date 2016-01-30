
/* global Phaser*/
/* global player*/

var Character = (function () {
    function Character(startX, startY, game, player, group){
        this.sprite = game.add.sprite(startX, startY, "character");
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        //tmp
        var type =1;
        this.type=type;
		
		this.sprite.body.immovable = false;
		this.sprite.body.allowGravity = true;
		group.add(this.sprite);
        
        this.sprite.go = this;
        this.interactionTime = 1000;
        // TODO effects
    }
    
    var p = Character.prototype;

    p.setInteractionCallBack= function (fn){
        this.interactionCallBack = fn;
    }

    p.onInteraction= function (player, onFinishCallBack){
        if(this.interactionCallBack){
            this.setFlashing();
            this.interactionCallBack()
            setTimeout(function(){
                if (onFinishCallBack) {
                    onFinishCallBack();
                }
            }, this.interactionTime);
        };
        return (this.interactionCallBack==undefined);
    }

    p.setFlashing = function () {
        setTimeout(function() {
            this.sprite.tint = 0xaaaaaa;
            setTimeout(function() {
                this.sprite.tint = 0xffffff;
                    setTimeout(function() {
                        this.sprite.tint = 0xaaaaaa;
                        setTimeout(function() {
                            this.sprite.tint = 0xffffff;
                    }.bind(this), 333);
                }.bind(this), 333);
            }.bind(this), 333);
        }.bind(this), 333);
    }

    return Character;
})();
