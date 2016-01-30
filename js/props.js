
/* global Phaser*/
/* global player*/

/*global Food*/
/*global Enemy*/
/*global Character*/

var Props = (function () {
    function Props(){
        // nothing
    }
    
    Props.create = function create(propsDef, worldX, worldY) {
        var result = null;
        switch(propsDef.type){
            case "food":
                result = Food.create(propsDef, worldX, worldY);
                break;
            case "enemy":
                //result = Enemy.create(propsDef, worldX, worldY);
                break;
            case "character":
                //result = Character.create(propsDef, worldX, worldY);
                break;
        }
        return result;
    };
    
    
    
    var p = Props.prototype;
    
    
    
    
    return Props;
})();
