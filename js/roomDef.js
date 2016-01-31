// room 480 x 160

var roomDef = {
    // special
    "empty":{
        bg:"",
        props:[]
    },
    // tutorial
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
    },
    // teen
    "school":{
        bg:"schoolbackground",
        props:[
            {name:"schoolmateWithHeart", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"book", type:"enemy", x:240, y:100},
            {name:"rocketBook", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "street":{
        bg:"schoolbackground",
        props:[
            {name:"schoolmateWithHeart", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    //adult
    "office":{
        bg:"office",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "office":{
        bg:"office",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "hospital":{
        bg:"schoolbackground",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },
    "nasa":{
        bg:"schoolbackground",
        props:[
            {name:"crush", type:"character", x:240, y:100},
            {name:"schoolmateWithGame", type:"character", x:240, y:100},
            {name:"gangsterWithDrug", type:"character", x:240, y:100},  // with drugs
            {name:"gangsterWithMoney", type:"enemy", x:240, y:100},
            {name:"themePark", type:"character", x:240, y:100}
        ]
    },




    "home2":{
        bg:"schoolbackground",
        props:[
            {name:"milkBottle", type:"food", x:240, y:100}
        ]
    },
    "houseWithWife":{
        bg:"schoolbackground",
        props:[
            {name:"baby", type:"character", x:240, y:100},
            {name:"wife", type:"character", x:240, y:100},
            {name:"gameController", type:"food", x:240, y:100}
        ]
    },
    "houseWithoutWife":{
        bg:"schoolbackground",
        props:[
            {name:"gameController", type:"food", x:240, y:100}
        ]
    }

};

var roomDefArray = [];

for(var key in roomDef){
    if(roomDef.hasOwnProperty(key)){
        roomDef[key].name = key;
        roomDefArray.push(roomDef[key]);
    }
}
