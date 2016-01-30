
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
        // TODO effects
    }
    
    var p = Character.prototype;

    p.setCallBack= function (fn){
        this.CallBack = fn;
    }

    p.onCallBack= function (player){
        if(this.CallBack){
            this.CallBack(player)
        };
        return (this.CallBack==undefined);
    }


    return Character;
})();
