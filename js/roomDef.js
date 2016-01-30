// room 480 x 160

var roomDef = {
    "spawnStreet1":{
        bg:"schoolbackground",
        props:[]
    },
    "home1":{
        bg:"schoolbackground",
        props:[
            {name:"bookGeneric", type:"enemy", x:240, y:100}
        ]
    },
    "spawnStreet2":{
        bg:"schoolbackground",
        props:[]
    },
    "home2":{
        bg:"schoolbackground",
        props:[
            {name:"milkBottle", type:"food", x:240, y:100}
        ]
    }
};
//TODO room type
for(var key in roomDef){
    if(roomDef.hasOwnProperty(key)){
        roomDef[key].name = key;
    }
}